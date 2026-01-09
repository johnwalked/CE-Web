import React, { useState } from 'react';
import { generateImage, editImage } from '../services/geminiService';
import { Wand2, ImagePlus, Download, RefreshCw, Eraser } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ImageStudioProps {
  language: Language;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ language }) => {
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const t = TRANSLATIONS[language];

  // Generation Options
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  
  // Editing Options
  const [sourceImageForEdit, setSourceImageForEdit] = useState<string | null>(null);

  const handleAction = async () => {
    if (!prompt) return;
    setLoading(true);
    setResultImage(null);
    setError(null);

    try {
      let result = '';
      if (mode === 'generate') {
        result = await generateImage(prompt, size);
      } else if (mode === 'edit' && sourceImageForEdit) {
        result = await editImage(sourceImageForEdit, prompt);
      }
      setResultImage(result);
    } catch (e: any) {
      console.error(e);
      let errorMessage = "Failed to process image.";
      if (typeof e === 'string') {
        errorMessage = e;
      } else if (e.message) {
        if (e.message.includes('403') || e.message.includes('PERMISSION_DENIED')) {
          errorMessage = "Permission Denied: Please ensure you have selected a valid API Key with billing enabled for High Quality generation.";
        } else {
          errorMessage = e.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => setSourceImageForEdit(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Controls */}
      <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 uppercase italic">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Wand2 className="text-black w-5 h-5" />
          </div>
          {t.studio.title}
        </h2>

        <div className="flex bg-black rounded-lg p-1 mb-8 border border-zinc-800">
          <button 
            onClick={() => { setMode('generate'); setError(null); }} 
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${mode === 'generate' ? 'bg-yellow-500 text-black shadow' : 'text-zinc-500 hover:text-white'}`}
          >
            {t.studio.generate}
          </button>
          <button 
             onClick={() => { setMode('edit'); setError(null); }} 
             className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${mode === 'edit' ? 'bg-yellow-500 text-black shadow' : 'text-zinc-500 hover:text-white'}`}
          >
            {t.studio.edit}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 ml-1">{t.studio.prompt}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mode === 'generate' ? "A futuristic silent generator..." : "Remove the background..."}
              className="w-full bg-black border border-zinc-700 rounded-xl p-5 text-white text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 h-36 resize-none transition-all placeholder-zinc-600 font-mono"
            />
          </div>

          {mode === 'generate' && (
             <div>
               <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 ml-1">{t.studio.size}</label>
               <div className="relative">
                 <select value={size} onChange={(e: any) => setSize(e.target.value)} className="w-full appearance-none bg-black border border-zinc-700 rounded-xl p-4 px-6 text-white text-sm focus:outline-none focus:border-yellow-500">
                   <option value="1K" className="bg-zinc-900">1K (Standard)</option>
                   <option value="2K" className="bg-zinc-900">2K (High Res)</option>
                   <option value="4K" className="bg-zinc-900">4K (Ultra)</option>
                 </select>
               </div>
               {size !== '1K' && <p className="text-[10px] text-yellow-500/80 mt-2 ml-1 font-bold">* Requires billed API key</p>}
             </div>
          )}

          {mode === 'edit' && (
            <div>
               <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 ml-1">{t.studio.source}</label>
               <label className="block w-full border-2 border-dashed border-zinc-700 hover:border-yellow-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-black hover:bg-zinc-900">
                 <input type="file" className="hidden" accept="image/*" onChange={handleEditUpload} />
                 {sourceImageForEdit ? (
                    <img src={sourceImageForEdit} className="h-24 mx-auto object-contain rounded-lg shadow-lg" alt="source" />
                 ) : (
                   <div className="text-zinc-500 text-sm">
                     <ImagePlus className="w-8 h-8 mx-auto mb-3 opacity-60" />
                     <span className="font-bold uppercase text-xs">{t.studio.upload}</span>
                   </div>
                 )}
               </label>
            </div>
          )}

          <button
            onClick={handleAction}
            disabled={loading || !prompt || (mode === 'edit' && !sourceImageForEdit)}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_0_rgb(161,98,7)] hover:shadow-[0_2px_0_rgb(161,98,7)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            {mode === 'generate' ? t.studio.btnGenerate : t.studio.btnEdit}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center p-8 relative overflow-hidden shadow-xl min-h-[500px]">
        {/* Striped Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] pointer-events-none"></div>

         {loading && (
           <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
             <div className="text-center">
               <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
               <p className="text-yellow-500 animate-pulse font-black tracking-widest uppercase text-sm">Working...</p>
             </div>
           </div>
         )}
         
         {error ? (
           <div className="text-center max-w-md p-8 bg-red-900/20 border border-red-500/30 rounded-2xl relative z-10">
             <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
               <Wand2 className="w-10 h-10 text-red-500" />
             </div>
             <h3 className="text-red-400 font-bold text-xl mb-3 uppercase">Error</h3>
             <p className="text-red-300 text-sm leading-relaxed">{error}</p>
           </div>
         ) : resultImage ? (
           <div className="relative group max-h-full z-10">
             <img src={resultImage} alt="Result" className="max-w-full max-h-[70vh] rounded-xl shadow-2xl border border-white/10" />
             <a 
               href={resultImage} 
               download="generated-design.png"
               className="absolute top-6 right-6 bg-yellow-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border border-black/20 hover:scale-110 duration-200 shadow-lg"
             >
               <Download className="w-6 h-6" />
             </a>
           </div>
         ) : (
           <div className="text-center text-zinc-700 z-10">
             <div className="w-32 h-32 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-700">
                {mode === 'generate' ? <ImagePlus className="w-14 h-14 opacity-30" /> : <Eraser className="w-14 h-14 opacity-30" />}
             </div>
             <p className="text-xl font-bold uppercase tracking-wide text-zinc-600">{t.studio.placeholder}</p>
           </div>
         )}
      </div>
    </div>
  );
};