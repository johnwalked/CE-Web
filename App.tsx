import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Tab, ChatMessage, Language } from './types';
import { Layout } from './components/Layout';
import { AIAssistantOrb } from './components/AIAssistantOrb';
import { Loader2 } from 'lucide-react';

// Lazy load heavy tab components to improve TTI
const ProductList = lazy(() => import('./components/ProductList').then(module => ({ default: module.ProductList })));

const LoadingSpinner = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-sm font-light">Loading...</span>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ALL);

  // Auto-detect browser language
  const detectLanguage = (): Language => {
    try {
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      const supported: Language[] = ['en', 'am', 'zh', 'ti', 'om'];
      return supported.includes(browserLang as Language) ? (browserLang as Language) : 'en';
    } catch (e) {
      return 'en';
    }
  };

  const [language, setLanguage] = useState<Language>(detectLanguage);

  // Optimization: Lift chat state so it persists between tab switches/orb toggles
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI for CE Generators and Pumps. We provide Weichai, Yuchai, Yunnei, Kefo, Perkins, Cummins generators and all kinds of pumps. Ask me anything in English, Amharic, Chinese, Tigrinya, or Oromifa.' }
  ]);

  // Handle tab change with smooth scroll to top
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Optimization: Memoize the tab content to prevent unnecessary re-renders
  const content = useMemo(() => {
    // If Tab is ALL, pass null to filter. Otherwise pass the brand name.
    const brandFilter = activeTab === Tab.ALL ? null : activeTab;
    return <ProductList language={language} brandFilter={brandFilter} />;
  }, [activeTab, language]);

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange} language={language} setLanguage={setLanguage}>
      <main className="w-full h-full flex flex-col relative">
        <Suspense fallback={<LoadingSpinner />}>
          {content}
        </Suspense>
      </main>

      {/* Floating Assistant Orb (Persistent Overlay) */}
      <AIAssistantOrb chatMessages={chatMessages} setChatMessages={setChatMessages} language={language} />
    </Layout>
  );
}