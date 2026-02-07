import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import professionsData from '../data/professions.json';
import { Briefcase, Sparkles } from 'lucide-react';

const ProfessionsPage = () => {
    const [search, setSearch] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState(professionsData.categories[0].id);

    const activeCategory = useMemo(() => {
        return professionsData.categories.find(cat => cat.id === activeCategoryId);
    }, [activeCategoryId]);

    const filteredPhrases = useMemo(() => {
        const phrases = professionsData.phrases[activeCategoryId] || [];
        return phrases.filter(item =>
            item.german.toLowerCase().includes(search.toLowerCase()) ||
            item.azeri.toLowerCase().includes(search.toLowerCase()) ||
            item.context.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, activeCategoryId]);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 md:py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Peşələr</h2>
                            <p className="text-slate-500 font-medium max-w-md hidden md:block text-sm">İş sahələrinə uyğun gündəlik ifadələr və dialoqlar.</p>
                        </div>
                        {/* Active Category Info - Mobile Only */}
                        <div className="flex md:hidden items-center gap-2 bg-white/50 rounded-lg px-2 py-1 border border-slate-100">
                            <span className="text-2xl">{activeCategory.icon}</span>
                            <span className="text-xs font-bold text-slate-700 max-w-[80px] truncate">{activeCategory.title}</span>
                        </div>
                    </div>

                    {/* Category Icons - Scrollable on Mobile */}
                    <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
                        <div className="flex md:grid md:grid-cols-9 gap-2 min-w-max md:min-w-0">
                            {professionsData.categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategoryId(cat.id)}
                                    className={`
                                        group flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300 shrink-0
                                        ${activeCategoryId === cat.id
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-105'
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:text-primary'}
                                    `}
                                >
                                    <span className={`text-2xl transition-transform duration-300 ${activeCategoryId === cat.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        {cat.icon}
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-tight text-center leading-tight hidden md:block">
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <SearchBar value={search} onChange={setSearch} placeholder="İfadə və ya tərcümə axtar..." />

                    {/* Active Category Info - Desktop Only */}
                    <div className="hidden md:flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-slate-100">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0">
                            {activeCategory.icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg font-black text-slate-900 truncate">{activeCategory.title}</h3>
                            <p className="text-xs text-slate-500">{activeCategory.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-white rounded-[40px] p-4 md:p-12 shadow-premium border border-slate-100 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

                <div className="grid grid-cols-1 gap-6">
                    {filteredPhrases.map((item, idx) => (
                        <DataCard
                            key={idx}
                            item={item}
                        />
                    ))}
                </div>

                {filteredPhrases.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles size={24} className="text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Nəticə tapılmadı</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionsPage;
