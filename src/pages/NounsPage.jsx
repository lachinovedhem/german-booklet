import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import nounsData from '../data/nouns.json';

const NounsPage = () => {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = useMemo(() => {
        const cats = new Set(nounsData.map(item => item.cat));
        return ['all', ...Array.from(cats)];
    }, []);

    const filteredData = useMemo(() => {
        return nounsData.filter(item => {
            const matchesSearch =
                item.word.toLowerCase().includes(search.toLowerCase()) ||
                item.translation.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = activeFilter === 'all' || item.cat === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [search, activeFilter]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900">İsimlər</h2>
                        <p className="text-slate-500 hidden md:block">Artikllər və cəm formaları ilə birlikdə.</p>
                    </div>
                    <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'Hamısı' : cat}
                            </option>
                        ))}
                    </select>
                </div>

                <SearchBar value={search} onChange={setSearch} placeholder="Söz və ya tərcümə axtar..." />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData.map((item, idx) => (
                    <DataCard
                        key={idx}
                        type="noun"
                        item={item}
                    />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">Heç bir nəticə tapılmadı.</p>
                </div>
            )}
        </div>
    );
};

export default NounsPage;
