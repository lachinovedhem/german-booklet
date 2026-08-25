import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import { getFavorites } from '../utils/favorites';
import { Star } from 'lucide-react';

const FavoritesPage = () => {
    const [search, setSearch] = useState('');
    // Seçilmişlər localStorage-dən ilk render zamanı yüklənir (lazy init).
    const [favorites, setFavorites] = useState(getFavorites);

    const filteredData = useMemo(() => {
        return favorites.filter(item => {
            const word = (item.word || item.infinitive || item.german || item.phrase || '').toLowerCase();
            const trans = (item.translation || item.meaning || item.trans || item.comp || item.azeri || '').toLowerCase();
            const searchLower = search.toLowerCase();

            return word.includes(searchLower) || trans.includes(searchLower);
        });
    }, [search, favorites]);

    // Function to refresh favorites list when one is removed
    const handleRefresh = () => {
        setFavorites(getFavorites());
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                            <Star size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Seçilmişlər</h2>
                            <p className="text-slate-500 hidden md:block">Ulduzladığınız sözlər və ifadələr.</p>
                        </div>
                    </div>
                </div>

                <SearchBar value={search} onChange={setSearch} placeholder="Seçilmişlərdə axtar..." />
            </div>

            {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredData.map((item) => (
                        <DataCard
                            key={`${item._type}-${item.word || item.infinitive || item.german || ''}`}
                            type={item._type}
                            item={item}
                            onToggle={handleRefresh}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="flex justify-center mb-4">
                        <Star size={48} className="text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-medium max-w-xs mx-auto">
                        {search ? 'Axtarışa uyğun seçilmiş söz tapılmadı.' : 'Hələ heç bir sözü ulduzlamamısınız.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
