import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Böyük siyahıları hissə-hissə render etmək üçün sadə "infinite scroll" hook-u.
 * Bütün elementləri (məs. 1730 isim) birdən DOM-a yükləmək əvəzinə,
 * əvvəlcə `step` qədərini göstərir, istifadəçi aşağı sürüşdükcə əlavə edir.
 *
 * @param {Array} items - tam (filtrlənmiş) siyahı
 * @param {number} step - hər dəfə neçə element əlavə olunsun
 * @returns {{ visible: Array, hasMore: boolean, sentinelRef: Function, total: number }}
 */
export const useIncremental = (items, step = 40) => {
    const [count, setCount] = useState(step);
    const [prevItems, setPrevItems] = useState(items);

    // Siyahı (axtarış/filtr) dəyişəndə render zamanı sayğacı sıfırlayırıq.
    // (React-in "əvvəlki dəyəri state-də saxla" nümunəsi — effekt lazım deyil.)
    if (items !== prevItems) {
        setPrevItems(items);
        setCount(step);
    }

    const hasMore = count < items.length;

    const observerRef = useRef(null);
    const sentinelRef = useCallback((node) => {
        if (observerRef.current) observerRef.current.disconnect();
        if (!node || !hasMore) return;

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setCount((c) => c + step);
            }
        }, { rootMargin: '600px' });

        observerRef.current.observe(node);
    }, [hasMore, step]);

    useEffect(() => () => {
        if (observerRef.current) observerRef.current.disconnect();
    }, []);

    return {
        visible: items.slice(0, count),
        hasMore,
        sentinelRef,
        total: items.length,
    };
};
