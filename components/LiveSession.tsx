import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connectLive } from '../services/geminiService';
import { Mic, PhoneOff, Cog, Wifi, Loader2, Phone, Copy, Check, X as XIcon, Pause, Play } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LiveSessionProps {
  language: Language;
}

const SPEECH_SPEED = 1.1;

const decodePCM16 = (base64String: string, ctx: AudioContext): AudioBuffer => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

export const LiveSession: React.FC<LiveSessionProps> = ({ language }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactToast, setShowContactToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[language];

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const liveClientRef = useRef<{ sendAudio: (d: Float32Array) => void; close: () => void } | null>(null);

  // Audio Scheduling Refs
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionBufferRef = useRef<string>("");

  // Ref for pause state to be accessible in audio processor
  const isPausedRef = useRef(false);

  // Sync state with ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    let mounted = true;
    const initSession = async () => {
      // Small delay to allow UI to settle
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mounted) {
        startSession();
      }
    };
    initSession();
    return () => {
      mounted = false;
      stopSession();
    };
  }, []); // Only run once on mount

  const startSession = async () => {
    if (isConnecting || isConnected) return;
    setError(null);
    setIsConnecting(true);
    setIsPaused(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        }
      });
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);

      // Input Context (16kHz for Gemini input)
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      inputAudioContextRef.current = inputCtx;

      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        // Only send audio if NOT paused
        if (!isPausedRef.current) {
          const inputData = e.inputBuffer.getChannelData(0);
          liveClientRef.current?.sendAudio(inputData);
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);

      // Output Context (24kHz for Gemini output)
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      if (outputCtx.state === 'suspended') {
        await outputCtx.resume();
      }
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      const client = await connectLive({
        onAudioData: async (base64Audio) => {
          try {
            if (!outputAudioContextRef.current) return;
            const buffer = decodePCM16(base64Audio, outputAudioContextRef.current);
            const sourceNode = outputAudioContextRef.current.createBufferSource();
            sourceNode.buffer = buffer;
            sourceNode.playbackRate.value = SPEECH_SPEED;

            sourceNode.connect(outputAudioContextRef.current.destination);
            audioSourcesRef.current.add(sourceNode);

            sourceNode.onended = () => {
              audioSourcesRef.current.delete(sourceNode);
            };

            const now = outputAudioContextRef.current.currentTime;
            // Schedule next chunk
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
            sourceNode.start(nextStartTimeRef.current);

            // Increment next start time
            nextStartTimeRef.current += buffer.duration / SPEECH_SPEED;
          } catch (e) {
            console.error("Audio Playback Error", e);
          }
        },
        onTranscription: (text) => {
          transcriptionBufferRef.current += text;
          const normalized = transcriptionBufferRef.current.replace(/\s/g, '');
          // Check for phone number sequences in any supported language format
          if (
            normalized.includes('966330309') ||
            normalized.includes('0966330309') ||
            normalized.includes('ዜሮዘጠኝስልሳስድስትሰላሳሶስትዜሮሶስትዜሮዘጠኝ')
          ) {
            setShowContactToast(true);
            transcriptionBufferRef.current = "";
            setTimeout(() => setShowContactToast(false), 12000);
          }
        },
        onInterrupted: () => {
          cancelPendingAudio();
        },
        onClose: () => {
          setIsConnected(false);
          setIsConnecting(false);
        }
      }, language);

      liveClientRef.current = client;
      setIsConnected(true);

      // Send initial silence to trigger the session
      client.sendAudio(new Float32Array(2048));

    } catch (err: any) {
      console.error(err);
      setError("Failed to access microphone or connect to API.");
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const cancelPendingAudio = () => {
    audioSourcesRef.current.forEach((source) => {
      try { source.stop(); } catch (e) { /* ignore */ }
    });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const togglePause = () => {
    if (isPaused) {
      // Resume
      outputAudioContextRef.current?.resume();
      setIsPaused(false);
    } else {
      // Pause
      outputAudioContextRef.current?.suspend();
      cancelPendingAudio(); // Stop current speech immediately
      setIsPaused(true);
    }
  };

  const stopSession = useCallback(() => {
    liveClientRef.current?.close();
    liveClientRef.current = null;

    inputAudioContextRef.current?.close();
    inputAudioContextRef.current = null;

    outputAudioContextRef.current?.close();
    outputAudioContextRef.current = null;

    cancelPendingAudio();

    setIsConnected(false);
    setIsConnecting(false);
    setIsPaused(false);
    setShowContactToast(false);

    transcriptionBufferRef.current = "";
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('0966330309');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black">

      {/* Contact Toast */}
      {showContactToast && (
        <ContactToast onClose={() => setShowContactToast(false)} onCopy={copyToClipboard} copied={copied} />
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial-at-c from-zinc-900 via-black to-black"></div>
        <div className={`absolute bottom-[-50%] left-0 w-[200%] h-[150%] bg-yellow-900/10 rounded-[40%] animate-wave blur-[100px] ${isConnected && !isPaused ? 'opacity-100' : 'opacity-30'}`}></div>
        <div className={`absolute bottom-[-50%] left-[-20%] w-[200%] h-[150%] bg-orange-900/10 rounded-[35%] animate-wave blur-[80px] animation-delay-2000 ${isConnected && !isPaused ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '-2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-12">
        <StatusHeader isConnected={isConnected} isConnecting={isConnecting} isPaused={isPaused} t={t} />

        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
          <OrbVisualizer isConnected={isConnected} isConnecting={isConnecting} isPaused={isPaused} />
        </div>

        <Controls
          isConnected={isConnected}
          isConnecting={isConnecting}
          isPaused={isPaused}
          error={error}
          onToggle={isConnected ? stopSession : startSession}
          onPause={togglePause}
          t={t}
        />
      </div>
    </div>
  );
};

// --- Subcomponents to declutter main component ---

const ContactToast = ({ onClose, onCopy, copied }: { onClose: () => void, onCopy: () => void, copied: boolean }) => (
  <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 z-[110] w-full max-w-sm px-4 animate-in slide-in-from-top-8 duration-500">
    <div className="bg-zinc-900 border border-yellow-500/30 rounded-[2.5rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center gap-5 relative overflow-hidden group">
      <button onClick={onClose} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors">
        <XIcon className="w-5 h-5" />
      </button>
      <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 mb-1">
        <Phone className="w-7 h-7 text-yellow-500 animate-pulse" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-1">Direct Contact</p>
        <h4 className="text-4xl font-black text-white tracking-tighter select-all">9 66 33 03 09</h4>
        <p className="text-xs text-zinc-400 font-light mt-2">Available for sales & technical support</p>
      </div>
      <button onClick={onCopy} className="w-full bg-yellow-500 hover:bg-yellow-400 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-black transition-all active:scale-95 shadow-xl shadow-yellow-900/20">
        {copied ? <Check className="w-5 h-5 text-black" /> : <Copy className="w-5 h-5" />}
        {copied ? 'Number Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  </div>
);

const StatusHeader = ({ isConnected, isConnecting, isPaused, t }: { isConnected: boolean, isConnecting: boolean, isPaused: boolean, t: any }) => (
  <div className="text-center space-y-6">
    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-mono uppercase tracking-widest transition-all ${isConnected ? (isPaused ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400') : 'bg-white/5 border-white/10 text-zinc-500'}`}>
      <Wifi className={`w-3 h-3 ${isConnected && !isPaused ? 'animate-pulse' : ''}`} />
      {isConnected ? (isPaused ? 'Session Paused' : t.live.connectionActive) : (isConnecting ? 'Connecting...' : t.live.standby)}
    </div>
    <h1 className={`text-4xl md:text-7xl font-black tracking-tighter transition-colors duration-500 uppercase ${isConnected ? 'text-white drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700'}`}>
      {isConnected ? (isPaused ? "Paused" : t.live.listening) : (isConnecting ? "Initializing..." : "Engine Expert")}
    </h1>
    <p className="text-lg md:text-xl text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
      {isConnected ? (isPaused ? "Tap resume to continue conversation." : t.live.desc_listening) : t.live.desc_standby}
    </p>
  </div>
);

const OrbVisualizer = ({ isConnected, isConnecting, isPaused }: { isConnected: boolean, isConnecting: boolean, isPaused: boolean }) => (
  <>
    {(isConnected || isConnecting) && (
      <>
        <div className={`absolute inset-0 bg-yellow-500/10 rounded-full blur-[80px] ${isConnected && !isPaused ? 'animate-pulse' : 'opacity-20'}`}></div>
        <div className={`absolute inset-0 border border-yellow-500/20 rounded-full ${isPaused ? 'rotate-12' : 'animate-[spin_10s_linear_infinite]'}`}></div>
        <div className={`absolute inset-4 border border-orange-500/20 rounded-full ${isPaused ? '-rotate-12' : 'animate-[spin_15s_linear_infinite_reverse]'}`}></div>
      </>
    )}
    <div className="relative z-10 transition-transform duration-700 hover:scale-105">
      <Cog className={`w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl transition-all duration-1000 ${isConnected || isConnecting ? (isPaused ? 'text-orange-500 opacity-80' : 'animate-spin text-yellow-500 opacity-90') : 'animate-spin-slow text-zinc-800 opacity-50'}`} strokeWidth={0.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-inner transition-all duration-500 ${isConnected || isConnecting ? (isPaused ? 'bg-orange-900/40 border-orange-500/30' : 'bg-yellow-500/20') : 'bg-black/50'}`}>
          {isConnecting ? (
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
          ) : isConnected ? (
            isPaused ? (
              <Pause className="w-12 h-12 text-orange-500" />
            ) : (
              <div className="flex items-center justify-center gap-1.5 h-16 w-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-1.5 bg-yellow-500 rounded-full animate-equalizer" style={{ animationDelay: `${i * 0.1}s`, animationDuration: `${0.8 + Math.random() * 0.5}s` }}></div>
                ))}
              </div>
            )
          ) : (
            <Mic className="w-12 h-12 text-zinc-500" />
          )}
        </div>
      </div>
    </div>
  </>
);

const Controls = ({ isConnected, isConnecting, isPaused, error, onToggle, onPause, t }: { isConnected: boolean, isConnecting: boolean, isPaused: boolean, error: string | null, onToggle: () => void, onPause: () => void, t: any }) => (
  <div className="flex flex-col items-center gap-4 z-20">
    {error && (
      <div className="animate-in fade-in slide-in-from-bottom-2 text-red-400 bg-red-950/30 px-6 py-3 rounded-2xl border border-red-500/30 text-sm mb-4 backdrop-blur-md">
        {error}
      </div>
    )}
    {!isConnecting && (
      <div className="flex items-center gap-4">
        {isConnected && (
          <button
            onClick={onPause}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border ${isPaused ? 'bg-orange-500 text-black border-orange-400 hover:bg-orange-400' : 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800'}`}
          >
            {isPaused ? <Play className="w-6 h-6 fill-current" /> : <Pause className="w-6 h-6" />}
          </button>
        )}
        <button
          onClick={onToggle}
          className={`group relative px-12 py-6 rounded-full font-black text-lg uppercase tracking-widest transition-all duration-500 transform hover:scale-105 active:scale-95 ${isConnected
            ? 'bg-red-600/90 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)]'
            : 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.4)]'
            }`}
        >
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <PhoneOff className="w-6 h-6" />
                <span>{t.live.end}</span>
              </>
            ) : (
              <>
                <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>{t.live.start}</span>
              </>
            )}
          </div>
        </button>
      </div>
    )}
    {(!isConnected && !isConnecting) && (
      <p className="text-zinc-500 text-sm font-medium">{t.live.desc_standby}</p>
    )}
  </div>
);