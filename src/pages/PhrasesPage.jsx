import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import phrasesData from '../data/phrases.json';
import { MessageSquare, Sparkles } from 'lucide-react';

const PhrasesPage = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = useMemo(() => {
        const cats = new Set(phrasesData.map(item => item.category));
        return ['all', ...Array.from(cats)];
    }, []);

    const filteredData = useMemo(() => {
        return phrasesData.filter(section => {
            const matchesCategory = activeCategory === 'all' || section.category === activeCategory;
            if (!matchesCategory) return false;

            const filteredItems = section.items.filter(item =>
                item.german.toLowerCase().includes(search.toLowerCase()) ||
                item.azeri.toLowerCase().includes(search.toLowerCase())
            );

            return filteredItems.length > 0;
        }).map(section => ({
            ...section,
            items: section.items.filter(item =>
                item.german.toLowerCase().includes(search.toLowerCase()) ||
                item.azeri.toLowerCase().includes(search.toLowerCase())
            )
        }));
    }, [search, activeCategory]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">İfadələr</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">Gündəlik həyatda və işdə ən çox istifadə olunan cümlələr.</p>
                    </div>

                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'Hamısı' : cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder="İfadə və ya tərcümə axtar..." />
                </div>
            </div>

            <div className="space-y-10">
                {filteredData.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                        <div className="mb-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-50 rounded-lg inline-block">
                                {section.subcategory}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, iIdx) => (
                                <DataCard
                                    key={`${sIdx}-${iIdx}`}
                                    type="phrase"
                                    item={{
                                        german: item.german,
                                        translation: item.azeri,
                                        cat: section.subcategory
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Heç bir nəticə tapılmadı</p>
                </div>
            )}
        </div>
    );
};

export default PhrasesPage;
