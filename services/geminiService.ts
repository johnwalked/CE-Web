import {
  GoogleGenAI,
  LiveServerMessage,
  Modality
} from "@google/genai";
import { SYSTEM_INSTRUCTION, PRODUCTS } from '../constants';

// Type definition for optional AI Studio extension
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

let aiInstance: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!aiInstance) {
    const key = process.env.API_KEY;
    if (!key) {
      throw new Error("API Key not found. Please check your .env.local file.");
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
};

// --- Audio Utilities ---

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  // Use typed array for better performance
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    // Clamp values to [-1, 1] range before converting
    const s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }

  // Convert buffer to binary string chunk by chunk to avoid stack overflow on large arrays
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.byteLength; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
  }

  return {
    data: btoa(binary),
    // Live API expects this rate for raw PCM
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Chat & Search ---

export const sendMessage = async (
  history: Array<{ role: 'user' | 'model', parts: any[] }>,
  message: string,
  imageParts: string[] = [],
  videoPart: { data: string, mimeType: string } | null = null,
  options: {
    useThinking?: boolean;
    useSearch?: boolean;
  }
): Promise<{ text: string, groundingChunks?: any[] }> => {

  let model = options.useSearch ? 'gemini-3-flash-preview' : 'gemini-3-pro-preview';
  if (videoPart) {
    model = 'gemini-3-pro-preview';
  }

  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  if (options.useThinking && !options.useSearch) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  if (options.useSearch) {
    config.tools = [{ googleSearch: {} }];
  }

  const userParts: any[] = [];

  imageParts.forEach(img => {
    userParts.push({
      inlineData: { mimeType: 'image/jpeg', data: img }
    });
  });

  if (videoPart) {
    userParts.push({
      inlineData: { mimeType: videoPart.mimeType, data: videoPart.data }
    });
  }

  userParts.push({ text: message });

  try {
    const response = await getAiClient().models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: userParts }
      ],
      config
    });

    return {
      text: response.text || "I couldn't generate a text response.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Sorry, I encountered an error communicating with the AI service." };
  }
};

// --- Image Generation ---

export const generateImage = async (
  prompt: string,
  size: '1K' | '2K' | '4K'
): Promise<string> => {
  const isPro = size !== '1K';
  const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  // Check for AI Studio extension (optional)
  if (isPro && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) await window.aistudio.openSelectKey();
  }

  // Create a fresh client for image generation to ensure clean state
  const client = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const config: any = {
      imageConfig: { aspectRatio: '1:1' }
    };
    if (isPro) config.imageConfig.imageSize = size;

    const enhancedPrompt = prompt.toLowerCase().includes('generate')
      ? prompt
      : `Generate an image of ${prompt}`;

    const response = await client.models.generateContent({
      model,
      contents: { parts: [{ text: enhancedPrompt }] },
      config
    });

    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (inlineData) {
      return `data:image/png;base64,${inlineData.data}`;
    }

    throw new Error(response.text || "No image generated");

  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

// --- Image Editing ---

export const editImage = async (
  imageBase64: string,
  prompt: string
): Promise<string> => {
  try {
    const match = imageBase64.match(/^data:(image\/[a-z]+);base64,(.+)$/);
    if (!match) throw new Error("Invalid image data format. Expected Data URL.");

    const [_, mimeType, data] = match;

    const response = await getAiClient().models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt },
        ],
      },
    });

    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (inlineData) {
      return `data:image/png;base64,${inlineData.data}`;
    }

    throw new Error(response.text || "No edited image returned");

  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};

// --- Live API ---

export interface LiveCallbacks {
  onAudioData: (base64: string) => void;
  onTranscription?: (text: string) => void;
  onInterrupted: () => void;
  onClose: () => void;
}

export const connectLive = async (
  callbacks: LiveCallbacks,
  currentLanguage: string
): Promise<{
  sendAudio: (data: Float32Array) => void;
  close: () => void;
}> => {

  const productCatalog = PRODUCTS.map(p =>
    `ID: ${p.id} | Brand: ${p.brand} | Type: ${p.type} | Power: ${p.powerKW}kW / ${p.specs.maxPower} | Noise: ${p.specs.noiseLevel} | Desc: ${p.description} | Specs: ${JSON.stringify(p.specs)}`
  ).join('\n');

  const languageContext = `
[CRITICAL LANGUAGE PROTOCOL]
1. INITIALIZATION: The user's interface is currently in '${currentLanguage}'. Start by delivering the Mandatory Greeting in the language associated with '${currentLanguage}'.
2. DYNAMIC DETECTION: Match the user's spoken language instantly (Amharic, English, Chinese, Tigrinya, Oromiffa).
3. DO NOT ASK FOR CLARIFICATION about the language. Just switch.

[PRODUCT INVENTORY KNOWLEDGE - LIVE DATABASE]
You have direct access to the current warehouse inventory. Use this list to answer specific questions like "what do you have in 50kw?" or "list silent generators".
${productCatalog}
`;


  const sessionPromise = getAiClient().live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: {
      onopen: () => console.log("Live Session Open"),
      onmessage: (message: LiveServerMessage) => {
        const serverContent = message.serverContent;
        if (!serverContent) return;

        if (serverContent.modelTurn?.parts?.[0]?.inlineData?.data) {
          callbacks.onAudioData(serverContent.modelTurn.parts[0].inlineData.data);
        }

        if (serverContent.outputTranscription?.text && callbacks.onTranscription) {
          callbacks.onTranscription(serverContent.outputTranscription.text);
        }

        if (serverContent.interrupted) {
          callbacks.onInterrupted();
        }
      },
      onclose: () => {
        console.log("Live Session Closed");
        callbacks.onClose();
      },
      onerror: (e) => console.error("Live Session Error", e),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
      },
      systemInstruction: SYSTEM_INSTRUCTION + languageContext,
    },
  });

  return {
    sendAudio: (data: Float32Array) => {
      const pcmBlob = createBlob(data);
      sessionPromise.then(session => {
        session.sendRealtimeInput({ media: pcmBlob });
      });
    },
    close: () => {
      sessionPromise.then(session => session.close());
    }
  };
};
