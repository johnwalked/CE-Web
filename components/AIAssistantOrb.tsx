import React, { useState, Suspense, lazy } from 'react';
import { MessageSquare, Mic, X, Cog, Phone, Loader2 } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../constants';

// Lazy load to avoid loading the heavy Gemini SDK initially
const GeminiAssistant = lazy(() => import('./GeminiAssistant').then(m => ({ default: m.GeminiAssistant })));
const LiveSession = lazy(() => import('./LiveSession').then(m => ({ default: m.LiveSession })));

interface AIAssistantOrbProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  language: Language;
}

const AssistantLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
    <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
  </div>
);

export const AIAssistantOrb: React.FC<AIAssistantOrbProps> = ({ chatMessages, setChatMessages, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'chat' | 'live'>('live');
  const [isMinimized, setIsMinimized] = useState(false);

  const t = TRANSLATIONS[language];

  // Modified toggle behavior
  const toggleOpen = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeMode === 'live') {
      setIsMinimized(true);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Full Screen Overlay */}
      <div className={`fixed inset-2 md:inset-6 z-[100] bg-black/60 backdrop-blur-3xl flex flex-col transition-all duration-500 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl ring-1 ring-yellow-500/20 ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ visibility: isOpen ? 'visible' : 'hidden' }}>

        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-20 pointer-events-none">
          {/* Logo Area */}
          <div className="flex items-center gap-3 pointer-events-auto pl-2">
            <div className="bg-yellow-500 p-2.5 rounded-lg shadow-lg">
              <Cog className="w-6 h-6 text-black animate-spin-slow" />
            </div>
            <div className="hidden md:block">
              <h2 className="text-white font-black tracking-widest uppercase">CE <span className="text-yellow-500">LIVE</span></h2>
              <div className="flex items-center gap-1.5 opacity-80">
                <Phone className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-mono text-yellow-500 font-bold">0966330309</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="pointer-events-auto bg-black border border-zinc-800 rounded-full p-1.5 flex gap-1 shadow-2xl">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 uppercase tracking-wide ${activeMode === 'chat'
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{t.assistant.textChat}</span>
            </button>
            <button
              onClick={() => setActiveMode('live')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 uppercase tracking-wide ${activeMode === 'live'
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                }`}
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">{t.assistant.liveVoice}</span>
            </button>
          </div>

          {/* Window Controls */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Minimize Button */}
            <button
              onClick={handleMinimize}
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-colors"
            >
              <div className="w-4 h-0.5 bg-current rounded-full"></div>
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-zinc-900 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full h-full relative">
          <Suspense fallback={<AssistantLoader />}>
            {activeMode === 'chat' ? (
              <div className="max-w-4xl mx-auto h-full pt-28 pb-8 px-6">
                <div className="h-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                  <GeminiAssistant messages={chatMessages} setMessages={setChatMessages} language={language} />
                </div>
              </div>
            ) : (
              (isOpen || isMinimized) && <LiveSession language={language} />
            )}
          </Suspense>
        </div>
      </div>


      {/* Floating Orb Trigger (Only visible when closed) */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl border border-yellow-500/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl">
              <Phone className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs font-mono text-white font-bold">0966330309</span>
            </div>
          </div>
          <button
            onClick={toggleOpen}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] border-4 border-black transition-all duration-500 hover:scale-110 animate-float cursor-pointer ring-2 ring-yellow-500/50"
          >
            <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
              {/* Glass shine */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>

              {/* Engine Cog */}
              <Cog className="w-10 h-10 text-black drop-shadow-sm group-hover:rotate-90 transition-transform duration-700 relative z-10" strokeWidth={2.5} />

              {/* Call Center Mic Overlay / Minimized Indicator */}
              <div className={`absolute -bottom-1 -right-1 rounded-full p-2.5 border-[2px] shadow-lg z-20 transition-all duration-300 ${isMinimized ? 'bg-red-500 border-white animate-pulse' : 'bg-black border-yellow-500'}`}>
                {isMinimized ? (
                  <div className="w-4 h-4 flex items-center justify-center gap-0.5">
                    <div className="w-1 h-3 bg-white rounded-full animate-wave"></div>
                    <div className="w-1 h-2 bg-white rounded-full animate-wave animation-delay-75"></div>
                    <div className="w-1 h-3 bg-white rounded-full animate-wave animation-delay-150"></div>
                  </div>
                ) : (
                  <Mic className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
};