export const TOP_FAVORITES_KEY = 'german_app_favorites';

export const getFavorites = () => {
    try {
        const favorites = localStorage.getItem(TOP_FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
        console.error("Error loading favorites:", e);
        return [];
    }
};

export const isFavorite = (item, type) => {
    if (!item) return false;
    const favorites = getFavorites();
    const itemKey = getItemKey(item, type);
    return favorites.some(fav => getItemKey(fav) === itemKey);
};

export const toggleFavorite = (item, type) => {
    if (!item) return false;
    const favorites = getFavorites();
    const itemWithType = { ...item, _type: type };
    const itemKey = getItemKey(itemWithType);

    const index = favorites.findIndex(fav => getItemKey(fav) === itemKey);

    if (index === -1) {
        favorites.push(itemWithType);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem(TOP_FAVORITES_KEY, JSON.stringify(favorites));
    return index === -1;
};

const getItemKey = (item, providedType) => {
    if (!item) return '';
    const word = item.word || item.infinitive || item.german || item.phrase || '';
    const trans = item.translation || item.meaning || item.trans || item.comp || item.azeri || '';
    const type = providedType || item._type || '';
    return `${word}|${trans}|${type}`;
};
