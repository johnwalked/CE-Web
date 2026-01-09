import React, { useState, useEffect } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { Wand2, ImagePlus, Download, RefreshCw, X, Sparkles } from 'lucide-react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../constants';

interface ImageStudioModalProps {
  product: Product;
  language: Language;
  onClose: () => void;
}

export const ImageStudioModal: React.FC<ImageStudioModalProps> = ({ product, language, onClose }) => {
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState(`A high-end cinematic photo of the ${product.name} generator, ${product.specs.noiseLevel} version, in a professional industrial power room, 8k resolution, highly detailed.`);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  
  const t = TRANSLATIONS[language];

  const handleAction = async () => {
    if (!prompt) return;
    setLoading(true);
    setResultImage(null);
    setError(null);

    try {
      let result = '';
      if (mode === 'generate') {
        result = await generateImage(prompt, size);
      } else if (mode === 'edit') {
        result = await editImage(product.imageUrl, prompt);
      }
      setResultImage(result);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-zinc-900 border border-zinc-700 w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500">
        
        <button onClick={onClose} className="absolute top-6 right-6 z-[210] p-2 bg-black/50 hover:bg-yellow-500 rounded-full transition-all border border-white/10 group">
          <X className="w-5 h-5 text-white group-hover:text-black" />
        </button>

        {/* Controls */}
        <div className="w-full md:w-[350px] p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Sparkles className="text-black w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">AI Refine</h2>
          </div>

          <div className="flex bg-black rounded-xl p-1 mb-8 border border-zinc-800">
            <button onClick={() => setMode('generate')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'generate' ? 'bg-yellow-500 text-black' : 'text-zinc-500'}`}>New</button>
            <button onClick={() => setMode('edit')} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === 'edit' ? 'bg-yellow-500 text-black' : 'text-zinc-500'}`}>Edit Current</button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 no-scrollbar">
            <div>
              <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white text-xs focus:outline-none focus:border-yellow-500 h-32 resize-none transition-all font-mono"
              />
            </div>

            {mode === 'generate' && (
               <div>
                 <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Resolution</label>
                 <select value={size} onChange={(e: any) => setSize(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white text-xs outline-none">
                   <option value="1K">1K Standard</option>
                   <option value="2K">2K Professional</option>
                   <option value="4K">4K Industrial</option>
                 </select>
               </div>
            )}
            
            {mode === 'edit' && (
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <p className="text-[10px] text-yellow-500 font-bold uppercase leading-relaxed">
                  Refining current image for <br/>"{product.name}"
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleAction}
            disabled={loading || !prompt}
            className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_0_rgb(161,98,7)] disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            Apply AI
          </button>
        </div>

        {/* Display Area */}
        <div className="flex-1 bg-zinc-950 flex items-center justify-center p-8 relative min-h-[400px]">
           {loading && (
             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
               <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-yellow-500 font-black tracking-widest uppercase text-[10px]">Processing Vision...</p>
             </div>
           )}

           {error ? (
             <div className="text-center max-w-md p-8 border border-red-500/30 rounded-2xl">
               <h3 className="text-red-400 font-bold mb-2 uppercase text-sm">Vision Error</h3>
               <p className="text-red-300 text-xs">{error}</p>
             </div>
           ) : resultImage ? (
             <div className="relative group max-h-full">
               <img src={resultImage} alt="AI Refinement" className="max-w-full max-h-[60vh] md:max-h-[70vh] rounded-2xl shadow-2xl border border-white/5" />
               <a href={resultImage} download={`refined-${product.name}.png`} className="absolute top-4 right-4 bg-yellow-500 text-black p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                 <Download className="w-5 h-5" />
               </a>
             </div>
           ) : (
             <div className="text-center text-zinc-700">
               <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                 <ImagePlus className="w-10 h-10 opacity-20" />
               </div>
               <p className="text-sm font-bold uppercase tracking-widest text-zinc-600">Preview Area</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};