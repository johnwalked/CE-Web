import React, { useState, memo, Suspense, lazy } from 'react';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import { Product, Language } from '../types';
import { ProductModal } from './ProductModal';
import { Info, Battery, Activity, ImageOff, Wand2, Loader2, Search } from 'lucide-react';

const ImageStudioModal = lazy(() => import('./ImageStudioModal').then(module => ({ default: module.ImageStudioModal })));

interface ProductListProps {
  language: Language;
  brandFilter?: string | null;
}

export const ProductList: React.FC<ProductListProps> = memo(({ language, brandFilter }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [studioProduct, setStudioProduct] = useState<Product | null>(null);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Generator' | 'Pump'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[language];

  const filteredProducts = React.useMemo(() => PRODUCTS.filter(p => {
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesBrand = !brandFilter || p.brand === brandFilter;
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesBrand && matchesSearch;
  }), [typeFilter, brandFilter, searchQuery, language]);

  const getFilterLabel = (f: string) => {
    if (f === 'All') return t.products.all;
    if (f === 'Generator') return t.products.generator;
    if (f === 'Pump') return t.products.pump;
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

        {/* Search Bar */}
        <div className="relative group w-full max-w-xs md:max-w-sm">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-yellow-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.chat.search}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-zinc-500 shadow-inner"
          />
        </div>

        <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-lg shrink-0">
          {['All', 'Generator', 'Pump'].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${typeFilter === f
                ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {getFilterLabel(f)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 hover:scale-[1.02] z-0 hover:z-10"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-black/20 flex items-center justify-center relative rounded-t-3xl border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>

              {/* Refine Overlay Button - Special highlight for Yuchai YC100 */}
              <button
                onClick={(e) => handleRefineClick(e, product)}
                className={`absolute bottom-4 left-4 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${product.id === 'gen-1'
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
            <div className="p-4 space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-sm font-black text-white group-hover:text-yellow-400 transition-colors uppercase leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="bg-white/10 backdrop-blur-sm text-[10px] font-mono font-bold px-2 py-1 rounded text-white border border-white/10 whitespace-nowrap">
                    {product.powerKW} kW
                  </span>
                </div>
                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">{product.brand}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
                <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded border border-white/5">
                  <Battery className="w-3 h-3 text-yellow-500 shrink-0" />
                  <span className="truncate">{product.specs.phase}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded border border-white/5">
                  <Activity className="w-3 h-3 text-yellow-500 shrink-0" />
                  <span className="truncate">{product.specs.cooling}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-yellow-500/80 font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                {t.products.viewDetails} <Info className="w-3 h-3" />
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