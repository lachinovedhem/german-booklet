import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import adjectivesData from '../data/adjectives.json';
import { Type } from 'lucide-react';

const AdjectivesPage = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const filteredData = useMemo(() => {
        return adjectivesData.filter(item => {
            const matchesSearch =
                item.german.toLowerCase().includes(search.toLowerCase()) ||
                item.meaning.toLowerCase().includes(search.toLowerCase());

            const matchesPriority = priorityFilter === 'all' || item.priority === parseInt(priorityFilter);

            if (filter === 'positive') return matchesSearch && matchesPriority && item.category === 'positive';
            if (filter === 'negative') return matchesSearch && matchesPriority && item.category === 'negative';
            return matchesSearch && matchesPriority;
        });
    }, [search, filter, priorityFilter]);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Sifətlər</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">Müqayisə dərəcələri, antonimlər və təsviri nümunələr.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">Hamısı</option>
                            <option value="positive">Müsbət</option>
                            <option value="negative">Mənfi</option>
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
                    <div className="absolute -inset-4 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder="Sifət və ya məna axtar..." />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredData.map((item, idx) => (
                    <DataCard
                        key={idx}
                        type="adjective"
                        item={item}
                    />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Type size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Heç bir nəticə tapılmadı</p>
                </div>
            )}
        </div>
    );
};

export default AdjectivesPage;
