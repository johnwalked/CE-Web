import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Send, Image as ImageIcon, Video, Search, BrainCircuit, Loader2 } from 'lucide-react';

interface GeminiAssistantProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  language: Language;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ messages, setMessages, language }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{data: string, mimeType: string} | null>(null);

  const t = TRANSLATIONS[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'image') {
          const base64 = result.split(',')[1];
          setSelectedImage(base64);
          setSelectedVideo(null);
        } else {
          const base64 = result.split(',')[1];
          setSelectedVideo({ data: base64, mimeType: file.type });
          setSelectedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage && !selectedVideo) || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      images: selectedImage ? [selectedImage] : undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const apiHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }] 
    }));

    const response = await sendMessage(
      apiHistory,
      userMsg.text,
      selectedImage ? [selectedImage] : [],
      selectedVideo,
      { useThinking, useSearch }
    );

    setMessages(prev => [...prev, {
      role: 'model',
      text: response.text,
      groundingUrls: response.groundingChunks?.map((c: any) => c.web ? c.web : null).filter(Boolean)
    }]);

    setLoading(false);
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900 overflow-hidden relative">
      
      {/* Toolbar */}
      <div className="bg-zinc-950 p-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
        <h3 className="text-xs font-black text-yellow-500 uppercase tracking-widest pl-2">Gemini 3 Pro</h3>
        <div className="flex gap-2">
           <label className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent font-bold uppercase ${useSearch ? 'bg-blue-600/20 text-blue-400 border-blue-400/30' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}>
            <input type="checkbox" className="hidden" checked={useSearch} onChange={(e) => {
              setUseSearch(e.target.checked);
              if(e.target.checked) setUseThinking(false);
            }} />
            <Search className="w-3 h-3" /> {t.chat.search}
          </label>
          
          <label className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent font-bold uppercase ${useThinking ? 'bg-purple-600/20 text-purple-400 border-purple-400/30' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}>
            <input type="checkbox" className="hidden" checked={useThinking} onChange={(e) => {
              setUseThinking(e.target.checked);
              if(e.target.checked) setUseSearch(false);
            }} />
            <BrainCircuit className="w-3 h-3" /> {t.chat.think}
          </label>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-black/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-5 shadow-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black border border-yellow-400 rounded-tr-none font-medium' 
                : 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-none'
            }`}>
              {msg.images && (
                <img src={`data:image/jpeg;base64,${msg.images[0]}`} className="w-full h-auto rounded-xl mb-3 border border-black/10" alt="uploaded" />
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              
              {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-700 text-[10px]">
                  <p className="font-bold mb-2 text-zinc-500 uppercase">Sources:</p>
                  <ul className="space-y-1.5">
                    {msg.groundingUrls.map((url, idx) => (
                      <li key={idx}>
                        <a href={url.uri} target="_blank" rel="noreferrer" className="text-yellow-500 hover:underline truncate block hover:text-yellow-400 bg-black/20 p-1.5 rounded px-3">
                          {url.title || url.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 rounded-full p-4 px-6 flex items-center gap-3 text-zinc-400 border border-zinc-700 text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-500" />
              <span className="uppercase font-bold tracking-wider">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-800 shrink-0">
        {(selectedImage || selectedVideo) && (
           <div className="mb-3 flex items-center gap-2 bg-zinc-900 p-2 rounded-lg w-fit pl-3 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 font-bold uppercase">{t.chat.mediaAttached}</span>
              <button onClick={() => {setSelectedImage(null); setSelectedVideo(null)}} className="text-zinc-500 hover:text-white bg-black rounded-full w-5 h-5 flex items-center justify-center"><span className="text-xs font-bold">×</span></button>
           </div>
        )}
        <div className="flex items-center gap-3">
          <label className="p-3 text-zinc-400 hover:text-yellow-500 cursor-pointer bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800">
            <ImageIcon className="w-5 h-5" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, 'image')} />
          </label>
          <label className="p-3 text-zinc-400 hover:text-yellow-500 cursor-pointer bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-zinc-800">
            <Video className="w-5 h-5" />
            <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e, 'video')} />
          </label>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full px-6 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-yellow-500 focus:bg-black transition-all"
          />
          
          <button
            onClick={handleSend}
            disabled={loading || (!input && !selectedImage && !selectedVideo)}
            className="p-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-full transition-colors shadow-lg shadow-yellow-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};