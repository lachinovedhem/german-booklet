import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import miscData from '../data/miscellaneous.json';
import { Layers, Sparkles } from 'lucide-react';

const MiscellaneousPage = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const types = useMemo(() => {
        const t = new Set(miscData.map(item => item.type));
        return ['all', ...Array.from(t)];
    }, []);

    const filteredData = useMemo(() => {
        return miscData.filter(item => {
            const matchesSearch =
                item.word.toLowerCase().includes(search.toLowerCase()) ||
                item.trans.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'all' || item.type === filter;
            return matchesSearch && matchesFilter;
        });
    }, [search, filter]);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                            <Layers size={12} /> Əlavə Resurslar
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Digər</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">Saylar, əvəzliklər, zərflər və digər vacib qrammatik elementlər.</p>
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        {types.map(t => (
                            <option key={t} value={t}>
                                {t === 'all' ? 'Hamısı' : t}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder="Söz və ya tərcümə axtar..." />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredData.map((item, idx) => (
                    <DataCard
                        key={idx}
                        item={item}
                    />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Layers size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Heç bir nəticə tapılmadı</p>
                </div>
            )}
        </div>
    );
};

export default MiscellaneousPage;
