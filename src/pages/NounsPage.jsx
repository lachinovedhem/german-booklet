import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import { useIncremental } from '../utils/useIncremental';
import { useLanguage } from '../i18n/LanguageContext';
import nounsData from '../data/nouns.json';

const NounsPage = () => {
    const { t, tCat } = useLanguage();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');

    const categories = useMemo(() => {
        const cats = new Set(nounsData.map(item => item.cat));
        return ['all', ...Array.from(cats)];
    }, []);

    const filteredData = useMemo(() => {
        const q = search.toLowerCase();
        return nounsData.filter(item => {
            const matchesSearch =
                item.word.toLowerCase().includes(q) ||
                (item.translation && item.translation.toLowerCase().includes(q)) ||
                (item.en && item.en.toLowerCase().includes(q));
            const matchesFilter = activeFilter === 'all' || item.cat === activeFilter;
            const matchesPriority = priorityFilter === 'all' || item.priority === parseInt(priorityFilter);
            return matchesSearch && matchesFilter && matchesPriority;
        });
    }, [search, activeFilter, priorityFilter]);

    const { visible, hasMore, sentinelRef, total } = useIncremental(filteredData);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{t('nouns_title')}</h2>
                        <p className="text-slate-500 hidden md:block">{t('nouns_sub')}</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? t('all') : tCat('nounCats', cat)}
                                </option>
                            ))}
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">{t('all')}</option>
                            <option value="1">{t('prio_1')}</option>
                            <option value="2">{t('prio_2')}</option>
                            <option value="3">{t('prio_3')}</option>
                            <option value="4">{t('prio_4')}</option>
                        </select>
                    </div>
                </div>

                <SearchBar value={search} onChange={setSearch} placeholder={t('nouns_search')} />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visible.map((item) => (
                    <DataCard
                        key={`${item.art}-${item.word}`}
                        type="noun"
                        item={item}
                    />
                ))}
            </div>

            {hasMore && (
                <div ref={sentinelRef} className="flex items-center justify-center py-8 text-xs font-medium text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-200 border-t-primary rounded-full animate-spin mr-2" />
                    {visible.length} / {total} {t('loading')}
                </div>
            )}

            {filteredData.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">{t('no_results')}</p>
                </div>
            )}
        </div>
    );
};

export default NounsPage;
