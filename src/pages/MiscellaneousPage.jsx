import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import { useIncremental } from '../utils/useIncremental';
import miscData from '../data/miscellaneous.json';
import { Layers, Sparkles } from 'lucide-react';

const MiscellaneousPage = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

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
            const matchesPriority = priorityFilter === 'all' || item.priority === parseInt(priorityFilter);
            return matchesSearch && matchesFilter && matchesPriority;
        });
    }, [search, filter, priorityFilter]);

    const { visible, hasMore, sentinelRef, total } = useIncremental(filteredData);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Digər</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">Saylar, əvəzliklər, zərflər və digər vacib qrammatik elementlər.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            {types.map(t => (
                                <option key={t} value={t}>
                                    {t === 'all' ? 'Hamısı' : t}
                                </option>
                            ))}
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">Hamısı</option>
                            <option value="1">Çox vacib</option>
                            <option value="2">Vacib</option>
                            <option value="3">Orta</option>
                            <option value="4">Nadir</option>
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder="Söz və ya tərcümə axtar..." />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {visible.map((item) => (
                    <DataCard
                        key={`${item.type}-${item.word}`}
                        item={item}
                        type="miscellaneous"
                    />
                ))}
            </div>

            {hasMore && (
                <div ref={sentinelRef} className="flex items-center justify-center py-8 text-xs font-medium text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-200 border-t-primary rounded-full animate-spin mr-2" />
                    {visible.length} / {total} yüklənir...
                </div>
            )}

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
