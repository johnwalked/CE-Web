import React from 'react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { X, CheckCircle, Zap, Box, Wind, Droplets, Volume2, Maximize2, ImageOff } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  language: Language;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-zinc-900 border border-zinc-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 ring-1 ring-yellow-500/20">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-yellow-500 hover:text-black rounded-full transition-colors border border-white/10 group"
        >
          <X className="w-5 h-5 text-white group-hover:text-black transition-colors" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-zinc-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
            className="w-full h-full object-cover"
          />
           <div className="hidden flex flex-col items-center text-zinc-600">
              <ImageOff className="w-12 h-12 mb-2" />
              <span className="text-sm">{t.products.unavailable}</span>
           </div>
           
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-8 left-8 pointer-events-none drop-shadow-md">
            <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">{product.name}</h2>
            <div className="inline-block bg-yellow-500 text-black text-xs font-black uppercase px-4 py-1.5 rounded-sm shadow-lg">
              {product.brand}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 space-y-8 bg-zinc-900">
          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-3 border-b border-zinc-800 pb-2 uppercase tracking-widest">{t.modal.description}</h3>
            <p className="text-zinc-300 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-4 border-b border-zinc-800 pb-2 uppercase tracking-widest">{t.modal.specifications}</h3>
            <div className="grid grid-cols-2 gap-3">
              <SpecItem icon={Zap} label={t.modal.maxPower} value={product.specs.maxPower} />
              <SpecItem icon={CheckCircle} label={t.modal.pf} value={product.specs.powerFactor} />
              <SpecItem icon={Wind} label={t.modal.cooling} value={product.specs.cooling} />
              <SpecItem icon={Droplets} label={t.modal.fuel} value={product.specs.fuelConsumption} />
              <SpecItem icon={Volume2} label={t.modal.noise} value={product.specs.noiseLevel} />
              <SpecItem icon={Box} label={t.modal.phase} value={product.specs.phase} />
              <SpecItem icon={Maximize2} label={t.modal.dimensions} value={product.specs.dimensions} />
              <SpecItem icon={Box} label={t.modal.weight} value={product.specs.weight} />
            </div>
          </div>
          
          <div className="pt-2">
             <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider py-4 rounded-lg transition-all shadow-[0_4px_0_rgb(161,98,7)] hover:shadow-[0_2px_0_rgb(161,98,7)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]">
               {t.modal.requestQuote}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col gap-1.5 p-3 rounded bg-zinc-800/50 border border-zinc-800">
    <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
      <Icon className="w-3 h-3 text-yellow-500" />
      {label}
    </div>
    <div className="text-sm font-bold text-zinc-200 pl-5 font-mono">
      {value}
    </div>
  </div>
);