<div align="center">

# 🇩🇪 alida — Alman Dili Kitabçası / German Learning App

**Almancanı Azərbaycan _və_ İngilis dili üzərindən öyrən.**
**Learn German from _both_ Azerbaijani and English.**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-offline--ready-5a0fc8?logo=pwa&logoColor=white)](#-pwa--offline)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-lisenziya--license)

</div>

---

## 🌍 Bu nədir? / What is this?

**AZ —** **alida**, backend tələb etməyən, tamamilə brauzerdə işləyən Alman dili öyrənmə tətbiqidir.
İçində **4 400-dən çox söz və ifadə**, **18 bölməlik qrammatika arayışı**, iş sahələrinə görə peşə
dialoqları, gündəlik danışıq qəlibləri, **A1 başlanğıc bələdçisi** və **flashcard/quiz məşq rejimi** var.
Bütün məzmun lokal JSON fayllarında saxlanılır və **offline** işləyir (PWA).

**EN —** **alida** is a client-only German-learning app that runs entirely in the browser (no backend).
It ships **4,400+ words and phrases**, an **18-section grammar reference**, job-specific workplace
dialogues, everyday conversation patterns, an **A1 beginner guide**, and a **flashcard/quiz practice
mode**. All content lives in local JSON files and works **offline** (PWA).

> ### ✨ Yenilik / What's new: İkidillilik / Bilingual
> Tətbiq artıq **iki öyrənmə dilini** dəstəkləyir. Yuxarı-sağdakı **AZ / EN** düyməsi ilə bütün
> tərcümələri və interfeysi bir kliklə dəyişə bilərsiniz — hər Alman sözünün həm **Azərbaycanca**,
> həm də **İngiliscə** qarşılığı var. Seçim `localStorage`-də yadda saxlanılır.
>
> The app now supports **two learning languages**. The **AZ / EN** switch (top-right) flips every
> translation and all UI text with one click — every German word has both an **Azerbaijani** and an
> **English** gloss. Your choice is remembered in `localStorage`.

---

## 🔗 Canlı versiya / Live demo

| Ünvan / URL | Təsvir / Description |
|---|---|
| <https://alidadeutsch.simpler.az/> | Öz subdomeni / Own subdomain (`base = /`) |
| <https://lachinovedhem.github.io/german-booklet/> | GitHub Pages (`base = /german-booklet/`) |

---

## 📚 Məzmun / Content

Alman dili mənbədir; hər element həm Azərbaycan, həm İngilis dilinə tərcümə olunub.
_German is the source; every entry is translated into both Azerbaijani and English._

| Bölmə / Section | Say / Count | İçindəkilər / Contains |
|---|--:|---|
| İsimlər / Nouns | **1 730** | artikl (`der/die/das`), cəm forması, kateqoriya, prioritet |
| Fellər / Verbs | **503** | Partizip II, köməkçi fel, nümunə cümlə, qaydasız/modal işarəsi |
| Sifətlər / Adjectives | **211** | müqayisə/üstünlük dərəcəsi, antonimlər, nümunə |
| İfadələr / Phrases | **1 310** | 29 kateqoriya, 100+ alt-mövzu üzrə gündəlik cümlələr |
| Peşə ifadələri / Profession phrases | **521** | 19 iş sahəsi (IT, otel, restoran, tikinti, səhiyyə...) |
| Digər / Other | **212** | saylar, əvəzliklər, zərflər, bağlayıcılar, ədatlar |
| Qrammatika / Grammar | **18 bölmə / sections** | cədvəllər, nümunə qutuları, qaydalar və məsləhətlər |
| Məsləhətlər / Tips | **50** | ana səhifədə təsadüfi göstərilən öyrənmə məsləhətləri |

> **Cəmi ~4 487 ikidilli lüğət/ifadə** + tam ikidilli qrammatika arayışı.
> _~4,487 bilingual vocabulary entries total, plus a fully bilingual grammar reference._

---

## 🎯 Əsas imkanlar / Features

- 🔁 **İkidilli öyrənmə / Bilingual learning** — AZ ⇄ EN keçidi bütün data və interfeysi dəyişir.
- 🔊 **Tələffüz / Pronunciation** — Web Speech API ilə hər Alman sözünü/cümləsini səsləndir.
- 🔎 **Axtarış və filtrlər / Search & filters** — söz, tərcümə (AZ və EN), kateqoriya və prioritetə görə.
- ⭐ **Seçilmişlər / Favorites** — istənilən sözü ulduzla; `localStorage`-də saxlanılır.
- 🧠 **Məşq rejimi / Practice** — flashcard və quiz; DE→ana dil və ana dil→DE istiqamətləri; statistika.
- 📈 **Prioritet səviyyələri / Priority levels** — "Çox vacib → Nadir" (Essential → Rare) ilə vaciblik.
- 🎓 **A1 başlanğıc bələdçisi / Beginner guide** — əlifba, tələffüz qaydaları, `der/die/das`, ilk sözlər.
- ⚡ **İnfinite-scroll** — böyük siyahılar artımlı yüklənir (performans üçün).
- 📱 **Responsiv / Responsive** — masaüstü yan-panel + mobil aşağı naviqasiya.
- 🚀 **PWA / offline** — service worker ilə bütün tətbiq + lüğət keşlənir, quraşdırıla bilər.
- 🧩 **Backend yoxdur / No backend** — statik hostinqə (GitHub Pages, nginx) yerləşdirilə bilər.

---

## 🛠️ Texnologiyalar / Tech stack

| Sahə / Area | Texnologiya / Technology |
|---|---|
| UI | **React 19** (route-lar `React.lazy` ilə kod-bölünməsi) |
| Build | **Vite 7** |
| Marşrutlaşdırma / Routing | **React Router 7** |
| Üslub / Styling | **Tailwind CSS 3** + `tailwindcss-animate` |
| İkonlar / Icons | **lucide-react** |
| PWA | **vite-plugin-pwa** (Workbox) |
| Yerli saxlama / Storage | `localStorage` (dil seçimi, seçilmişlər, məşq statistikası) |
| Səs / Audio | Web Speech API (`SpeechSynthesis`) |

---

## 🚀 Quraşdırma və işə salma / Getting started

Tələb / Requirements: **Node.js 20+**.

```bash
# 1. Asılılıqları quraşdır / Install dependencies
npm install

# 2. İnkişaf serveri (HMR) / Dev server
npm run dev            # http://localhost:5173

# 3. Produksiya build-i / Production build
npm run build          # -> dist/

# 4. Build-i lokal yoxla / Preview the build
npm run preview
```

### Bütün skriptlər / All scripts

| Skript / Script | İş / What it does |
|---|---|
| `npm run dev` | Vite inkişaf serveri (hot reload) |
| `npm run build` | `dist/` qovluğuna produksiya build-i |
| `npm run preview` | Build-i lokal serve edir |
| `npm run lint` | ESLint |
| `npm run counts` | Ana səhifə saylarını yeniləyir → `src/data/counts.json` |
| `npm run pwa-icons` | PWA ikonlarını yenidən yaradır (`public/`) |

> ⚠️ **Data dəyişdikdən sonra `npm run counts` işlədin** — ana səhifə saylarını `src/data/counts.json`-dan
> oxuyur (ağır data fayllarını ana səhifə paketinə daxil etməmək üçün). / After editing any data file,
> run `npm run counts` or the homepage counts go stale.

---

## 🗂️ Layihə strukturu / Project structure

```
german-booklet/
├─ public/                     # statik fayllar, PWA ikonları
├─ scripts/
│  ├─ generate-counts.mjs      # counts.json yaradır / generates counts.json
│  └─ generate-pwa-icons.mjs   # PWA ikonları / PWA icons
├─ src/
│  ├─ components/              # DataCard, Layout (+ dil keçidi), SearchBar, ScrollToTop
│  ├─ pages/                   # hər route üçün bir səhifə / one page per route
│  ├─ i18n/                    # ★ ikidillilik / bilingual system
│  │  ├─ LanguageContext.jsx   #   dil provayderi + useLanguage() hook
│  │  ├─ strings.js            #   bütün interfeys mətnləri (az/en)
│  │  └─ labels.json           #   kateqoriya/etiket tərcümələri (az→en)
│  ├─ data/                    # *.json — bütün məzmun (+ counts.json avtomatik)
│  ├─ utils/                   # speech.js, favorites.js, useIncremental.js
│  ├─ App.jsx                  # route-lar
│  └─ main.jsx                 # kök + <LanguageProvider>
├─ .github/workflows/deploy.yml # GitHub Pages CI
├─ vite.config.js              # base yolu + PWA konfiqurasiyası
└─ DATA_GUIDE.md               # məzmun əlavə etmə bələdçisi / content-authoring guide
```

---

## 🌐 İkidillilik necə işləyir? / How the bilingual system works

Bütün i18n məntiqi `src/i18n/` qovluğundadır və üç hissədən ibarətdir:

1. **`LanguageContext.jsx`** — `<LanguageProvider>` cari **öyrənmə dilini** (`az` | `en`) saxlayır,
   `localStorage`-də (`alida_lang` açarı) qeyd edir və `useLanguage()` hook-u ilə bu köməkçiləri verir:

   | Köməkçi / Helper | Məqsəd / Purpose |
   |---|---|
   | `t(key)` | İnterfeys mətni (`strings.js`-dən) |
   | `tr(item)` | Data elementinin tərcüməsi — `en` və ya AZ sahəsini seçir |
   | `tCat(kind, azValue)` | Kateqoriya etiketi (`labels.json`-dan) |
   | `tLabel(azValue)` | Bütün etiket xəritələrində axtarır |
   | `tObj(kind, id, field, fallback)` | ID ilə etiket (məs. peşə kateqoriyaları) |
   | `lang`, `setLang`, `toggleLang` | Cari dil və dəyişdirmə |

2. **`strings.js`** — bütün statik interfeys mətnləri `{ az: {...}, en: {...} }` formatında.

3. **`labels.json`** — kateqoriya/alt-mövzu adlarının `az → en` xəritəsi. **Azərbaycanca dəyər həmişə
   daxili açar kimi qalır**; yalnız göstərilən mətn dilə görə dəyişir (filtrlərin sabit qalması üçün).

**Data tərəfi:** hər lüğət elementinə `en` sahəsi əlavə olunub (mövcud AZ sahələrinə toxunmadan).
Alman sözü/nümunə cümləsi **həmişə Almanca** qalır (öyrənmə hədəfidir); yalnız izah/tərcümə dəyişir.
Qrammatika bölmələrində `titleEn` və `contentEn`, məsləhətlərdə `titleEn`/`descriptionEn` var.

> **Yeni dil əlavə etmək / Adding a language:** `strings.js`-ə yeni dil obyekti, `labels.json`-a yeni
> xəritə əlavə edin, data fayllarına uyğun sahələr (`en`, `fr`, ...) əlavə edin və `tr`/`tCat`
> köməkçilərini yeni dili nəzərə alacaq şəkildə genişləndirin.

---

## 🧱 Data modeli / Data model

Bütün məzmun `src/data/*.json`-dadır. Əsas struktur (ikidilli sahələr **qalın**):

```jsonc
// nouns.json
{ "art": "das", "word": "Auge", "plural": "die Augen",
  "translation": "Göz", "en": "eye", "cat": "Bədən", "priority": 1 }

// verbs.json
{ "infinitive": "arbeiten", "meaning": "işləmək", "en": "to work",
  "partizip": "gearbeitet", "helper": "haben",
  "example": "Er hat den ganzen Tag gearbeitet.", "irregular": false, "priority": 1 }

// adjectives.json
{ "german": "alt", "meaning": "köhnə, yaşlı", "en": "old, elderly",
  "comparative": "älter", "superlative": "am ältesten",
  "antonyms": ["neu", "jung"], "category": "neutral", "priority": 1 }

// phrases.json  (kateqoriya → alt-mövzu → items[])
{ "german": "Guten Morgen!", "azeri": "Sabahınız xeyir!", "en": "Good morning!" }

// professions.json  (categories[] + phrases{ id: items[] })
{ "german": "Wie kann ich helfen?", "azeri": "Necə kömək edə bilərəm?",
  "en": "How can I help?", "context": "Müştəri xidməti" }

// miscellaneous.json
{ "type": "Say", "word": "Eins", "comp": "1", "trans": "Bir", "en": "one", "priority": 1 }

// grammar.json  (sections[]: hər bölmədə title/titleEn + content/contentEn)
```

Ətraflı sahə izahları və yeni məzmun əlavə etmə qaydaları üçün → **[DATA_GUIDE.md](DATA_GUIDE.md)**.

---

## 🧭 Səhifələr / Pages

| Yol / Route | Səhifə / Page |
|---|---|
| `/` | Ana səhifə — kateqoriyalar, təsadüfi məsləhət / Home |
| `/start` | A1 başlanğıc bələdçisi / Beginner guide |
| `/practice` | Məşq — flashcard və quiz / Practice |
| `/grammar` | Qrammatika (18 bölmə) / Grammar |
| `/nouns`, `/verbs`, `/adjectives` | Söz siyahıları / Word lists |
| `/professions`, `/phrases`, `/miscellaneous` | İfadələr və digər / Phrases & other |
| `/favorites` | Seçilmişlər / Favorites |
| `/words` | Söz ehtiyatı mərkəzi (mobil) / Vocabulary hub |

---

## 📴 PWA / offline

Tətbiq **PWA**-dır: `vite-plugin-pwa` (Workbox) service worker və manifest yaradır, bütün tətbiq +
lüğət **offline** keşlənir, yeni build avtomatik yenilənir (`autoUpdate`). Google Fonts üçün runtime
keş qaydaları var.

> ⚠️ Service worker yalnız **HTTPS** və ya `http://localhost`-da işləyir. Real domendə PWA quraşdırması
> üçün SSL lazımdır. / The service worker only runs on **HTTPS** or `localhost`.

---

## 📦 Yayım / Deployment

**Base yolu build zamanı təyin olunur** (`vite.config.js` → `process.env.BASE_PATH`):

- `BASE_PATH` verilməzsə → `base = '/'` (öz subdomeni üçün).
- `BASE_PATH=/german-booklet/` → GitHub Pages layihə səhifəsi üçün.

**GitHub Pages:** `main`-ə push edildikdə [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
avtomatik build edib `BASE_PATH=/german-booklet/` ilə yerləşdirir.

**Öz serveriniz (nginx):** `npm run build` → `dist/` qovluğunu serve edin. Hazır nümunə:
[`nginx.conf.example`](nginx.conf.example) (SPA fallback, `sw.js` üçün no-cache, `.webmanifest` MIME,
hash-li fayllar üçün uzun keş).

---

## ➕ Töhfə / Contributing

1. Məzmun (söz/ifadə/qrammatika) əlavə etmək üçün **[DATA_GUIDE.md](DATA_GUIDE.md)**-ə baxın.
2. **Hər elementə həm `translation`/`meaning`/`azeri`, həm də `en` sahəsi əlavə edin** ki, ikidillilik
   qorunsun. / Add **both** the Azerbaijani field and the `en` field to every new entry.
3. Data dəyişdikdən sonra `npm run counts` işlədin.
4. `npm run lint` və `npm run build` təmiz keçməlidir.

---

## 📄 Lisenziya / License

MIT — sərbəst istifadə, dəyişdirmə və paylaşma. / MIT — free to use, modify and share.

<div align="center">

**Made with ❤️ for German learners — Azərbaycanca & English.**

</div>
