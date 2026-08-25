# alida — Alman Dili Kitabçası

Azərbaycandilli istifadəçilər üçün Alman dili öyrənmə tətbiqi: isimlər, fellər, sifətlər,
qrammatika, peşə ifadələri, gündəlik danışıq qəlibləri, **A1 başlanğıc bələdçisi** və
**flashcard/quiz məşq rejimi**. Bütün məlumat lokal JSON fayllarında saxlanılır — backend yoxdur.

## Texnologiyalar
- React 19 + Vite 7
- React Router 7 (route-lar `React.lazy` ilə bölünür)
- Tailwind CSS 3 (+ `tailwindcss-animate`)
- lucide-react (ikonlar)
- Web Speech API (tələffüz), localStorage (seçilmişlər + məşq statistikası)

## Quraşdırma və işə salma
```bash
npm install      # asılılıqları quraşdır
npm run dev      # inkişaf serveri (HMR)
npm run build    # produksiya üçün build (dist/)
npm run preview  # build-i lokal yoxla
npm run lint     # ESLint
npm run counts   # ana səhifədəki sayları yenilə (src/data/counts.json)
npm run pwa-icons # PWA ikonlarını yenidən yarat (public/)
```

## PWA (offline) və yayım (nginx)
Tətbiq **PWA**-dır: `vite-plugin-pwa` (Workbox) ilə service worker və manifest yaradılır,
bütün tətbiq + lüğət **offline** keşlənir, yeni build avtomatik yenilənir (`autoUpdate`).

Yayım üçün `npm run build` edin və `dist/` qovluğunu nginx ilə serve edin —
hazır nümunə konfiqurasiya: [`nginx.conf.example`](nginx.conf.example)
(SPA fallback, `sw.js` üçün no-cache, `.webmanifest` MIME, hash-li fayllar üçün uzun keş).

> ⚠️ Service worker yalnız **HTTPS** və ya `http://localhost`-da işləyir. Real domendə
> PWA-nın quraşdırılması (install) üçün SSL sertifikatı lazımdır.

## Səhifələr
| Yol | Səhifə |
|-----|--------|
| `/` | Ana səhifə (kateqoriyalar, məsləhət) |
| `/start` | A1 başlanğıc bələdçisi (əlifba, tələffüz, artikllər) |
| `/practice` | Məşq — flashcard və quiz |
| `/grammar` | Qrammatika (18 bölmə) |
| `/nouns`, `/verbs`, `/adjectives` | Söz siyahıları (axtarış, filtr, artımlı yüklənmə) |
| `/professions`, `/phrases`, `/miscellaneous` | İfadələr və digər |
| `/favorites` | Seçilmişlər |

## Layihə strukturu
```
src/
  components/   # DataCard, Layout, SearchBar, ScrollToTop
  pages/        # hər route üçün bir səhifə
  data/         # *.json — bütün məzmun + counts.json (avtomatik)
  utils/        # speech.js, favorites.js, useIncremental.js
scripts/
  generate-counts.mjs   # counts.json-u yaradır
```

## Məlumatı genişləndirmək
Yeni söz/ifadə/qrammatika əlavə etmək üçün [DATA_GUIDE.md](DATA_GUIDE.md) faylına baxın.
Məlumatı dəyişdikdən sonra ana səhifədəki saylar üçün `npm run counts` işlədin.
