import React, { memo } from 'react';
import { Tab, Language } from '../types';
import { Zap, Globe, Phone, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { SocialSidebar } from './SocialSidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = memo(({ children, activeTab, onTabChange, language, setLanguage }) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: Tab.ALL, label: t.nav.all, icon: Zap },
    { id: Tab.CE_POWER, label: 'CE Power', icon: ShieldCheck },
    { id: Tab.WEICHAI, label: 'Weichai', icon: ShieldCheck },
    { id: Tab.YUCHAI, label: 'Yuchai', icon: ShieldCheck },
    { id: Tab.CUMMINS, label: 'Cummins', icon: ShieldCheck },
    { id: Tab.PERKINS, label: 'Perkins', icon: ShieldCheck },
    { id: Tab.MTU, label: 'MTU', icon: ShieldCheck },
    { id: Tab.VOLVO, label: 'Volvo', icon: ShieldCheck },
    { id: Tab.YUNNEI, label: 'Yunnei', icon: ShieldCheck },
    { id: Tab.KEFO, label: 'Kefo', icon: ShieldCheck },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'am', label: 'Amharic' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ti', label: 'Tigrinya' },
    { code: 'om', label: 'Oromiffa' },
  ];

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-yellow-500/30">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="px-4 pt-4 z-50 sticky top-0">
        <header className="max-w-7xl mx-auto rounded-3xl md:rounded-full border border-white/10 bg-zinc-900/60 backdrop-blur-2xl shadow-xl ring-1 ring-white/5">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-yellow-500 p-2 rounded-lg backdrop-blur-sm shadow-lg shadow-yellow-500/20">
                <Zap className="w-5 h-5 text-black fill-black" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xs md:text-sm font-black tracking-wide leading-none text-white whitespace-nowrap">
                  CE <span className="font-bold text-yellow-500 uppercase tracking-tighter">Factory</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] font-mono text-yellow-400 font-bold whitespace-nowrap">0966330309</span>
                </div>
              </div>
            </div>

            <nav className="flex-1 flex gap-1 items-center px-4 overflow-x-auto no-scrollbar scroll-smooth">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-bold uppercase tracking-wide text-[10px] md:text-xs whitespace-nowrap flex-shrink-0 ${activeTab === item.id
                    ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <item.icon className={`w-3 h-3 md:w-4 md:h-4 ${activeTab === item.id ? 'text-black' : ''}`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-full text-zinc-400 hover:text-yellow-400 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-[10px] md:text-xs font-bold uppercase">{language}</span>
                </button>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-32 bg-zinc-900 border border-yellow-500/30 rounded-lg overflow-hidden shadow-2xl z-20 flex flex-col p-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`text-left px-4 py-2 text-sm rounded-md transition-colors font-medium ${language === lang.code ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      <SocialSidebar />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
});