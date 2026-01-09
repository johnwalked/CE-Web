import React, { useState, memo, Suspense, lazy } from 'react';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import { Product, Language } from '../types';
import { ProductModal } from './ProductModal';
import { Info, Battery, Activity, ImageOff, Wand2, Loader2 } from 'lucide-react';

const ImageStudioModal = lazy(() => import('./ImageStudioModal').then(module => ({ default: module.ImageStudioModal })));

interface ProductListProps {
  language: Language;
  brandFilter?: string | null;
}

export const ProductList: React.FC<ProductListProps> = memo(({ language, brandFilter }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [studioProduct, setStudioProduct] = useState<Product | null>(null);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Generator' | 'Pump'>('All');

  const t = TRANSLATIONS[language];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesBrand = !brandFilter || p.brand === brandFilter;
    return matchesType && matchesBrand;
  });

  const getFilterLabel = (f: string) => {
     if(f === 'All') return t.products.all;
     if(f === 'Generator') return t.products.generator;
     if(f === 'Pump') return t.products.pump;
     return f;
  };

  const handleRefineClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setStudioProduct(product);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
            {brandFilter ? brandFilter : t.products.title}
          </h2>
          {brandFilter && <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest mt-1">Authorized Provider</p>}
        </div>
        
        <div className="flex bg-zinc-900 rounded-full p-1.5 border border-white/10 shadow-lg">
          {['All', 'Generator', 'Pump'].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f as any)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                typeFilter === f 
                  ? 'bg-yellow-500 text-black shadow-lg' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {getFilterLabel(f)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-500 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.3)] transform hover:-translate-y-2 hover:scale-[1.02] z-0 hover:z-10"
          >
            <div className="aspect-video w-full overflow-hidden bg-black flex items-center justify-center relative m-2 rounded-xl mb-0 w-[calc(100%-1rem)]">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
               
               {/* Refine Overlay Button - Special highlight for Yuchai YC100 */}
               <button 
                 onClick={(e) => handleRefineClick(e, product)}
                 className={`absolute bottom-4 left-4 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                   product.id === 'gen-1' 
                   ? 'bg-yellow-500 text-black shadow-xl animate-pulse scale-105' 
                   : 'bg-black/60 text-white hover:bg-yellow-500 hover:text-black opacity-0 group-hover:opacity-100'
                 }`}
               >
                 <Wand2 className="w-3.5 h-3.5" />
                 {t.products.refine}
               </button>

               <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-yellow-500 z-20"></div>
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 rounded-xl"
              />
              <div className="hidden flex flex-col items-center text-zinc-500">
                <ImageOff className="w-8 h-8 mb-2" />
                <span className="text-xs">{t.products.unavailable}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors uppercase leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-yellow-500 font-bold uppercase mt-1 tracking-wider">{product.brand}</p>
                </div>
                <span className="bg-zinc-800 text-xs font-mono font-bold px-3 py-1.5 rounded text-white border border-zinc-700">
                  {product.powerKW} kW
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400 mt-2">
                <div className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                  <Battery className="w-3.5 h-3.5 text-yellow-500" />
                  {product.specs.phase}
                </div>
                <div className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                  <Activity className="w-3.5 h-3.5 text-yellow-500" />
                  {product.specs.cooling}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-yellow-500 font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                {t.products.viewDetails} <Info className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center text-zinc-600 bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-800">
          <p className="text-lg font-bold uppercase tracking-widest">No matching items found</p>
          <p className="text-sm mt-1">Please try another brand or filter.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          language={language}
        />
      )}

      {studioProduct && (
        <Suspense fallback={<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60"><Loader2 className="animate-spin text-yellow-500" /></div>}>
          <ImageStudioModal 
            product={studioProduct} 
            onClose={() => setStudioProduct(null)} 
            language={language} 
          />
        </Suspense>
      )}
    </div>
  );
});