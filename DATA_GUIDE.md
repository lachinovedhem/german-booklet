# alida — Data Genişləndirmə Bələdçisi / Content-authoring Guide

Bu bələdçi tətbiqdəki məlumatları (isimlər, fellər, qrammatika və s.) necə manual olaraq artıra
biləcəyinizi izah edir. Bütün məlumatlar `src/data` qovluğunda JSON formatında yerləşir.

> ### 🌍 İkidillilik — vacib qayda / Bilingual — important rule
> Tətbiq **Azərbaycan və İngilis** dillərini dəstəkləyir. Yeni məzmun əlavə edərkən **həm Azərbaycanca
> sahəni** (`translation` / `meaning` / `azeri` / `trans`), **həm də `en` (İngiliscə) sahəsini** doldurun.
> Alman sözü və nümunə cümlələri **Almanca** qalır (öyrənmə hədəfidir) — yalnız izah/tərcümə dəyişir.
>
> When adding entries, always fill in **both** the Azerbaijani field **and** the `en` (English) field.
> German words and example sentences stay in German.

---

## Məlumat Faylları / Data files

### 1. İsimlər (`src/data/nouns.json`)
```json
{
  "art": "der",            // Artikl (der, die, das)
  "word": "Tisch",         // Alman sözü
  "plural": "die Tische",  // Cəm forması
  "translation": "Masa",   // Azərbaycanca tərcümə
  "en": "table",           // İngiliscə tərcümə  ← YENİ / NEW
  "cat": "Ev",             // Kateqoriya (labels.json-a uyğun)
  "priority": 1            // Vaciblik: 1=Çox vacib ... 4=Nadir
}
```

### 2. Fellər (`src/data/verbs.json`)
```json
{
  "infinitive": "gehen",             // Məsdər
  "meaning": "getmək",               // Azərbaycanca
  "en": "to go",                     // İngiliscə  ← YENİ / NEW
  "partizip": "gegangen",            // Partizip II
  "helper": "sein",                  // Köməkçi fel (haben/sein)
  "example": "Ich gehe nach Hause.", // Nümunə (Almanca qalır)
  "modal": false,                    // Modal fel?
  "irregular": true,                 // Qaydasız?
  "priority": 1
}
```

### 3. Sifətlər (`src/data/adjectives.json`)
```json
{
  "german": "gut",             // Sifət
  "meaning": "yaxşı",          // Azərbaycanca
  "en": "good",                // İngiliscə  ← YENİ / NEW
  "comparative": "besser",     // Müqayisə dərəcəsi
  "superlative": "am besten",  // Üstünlük dərəcəsi
  "example": "Das ist gut.",   // Nümunə (Almanca)
  "category": "positive",      // positive / neutral / negative
  "antonyms": ["schlecht"],
  "priority": 1
}
```

### 4. İfadələr (`src/data/phrases.json`)
Kateqoriya → alt-mövzu → `items[]` strukturu:
```json
{
  "category": "Gündəlik Salamlaşma və Əlaqə",
  "subcategory": "Salamlaşma",
  "items": [
    { "german": "Guten Morgen!", "azeri": "Sabahınız xeyir!", "en": "Good morning!" }
  ]
}
```

### 5. Peşələr və İfadələr (`src/data/professions.json`)
Bu fayl həm peşə kateqoriyalarını (`categories`), həm də onlara aid ifadələri (`phrases`) saxlayır.
```json
{
  "german": "Wie kann ich helfen?",
  "azeri": "Necə kömək edə bilərəm?",
  "en": "How can I help?",          // ← YENİ / NEW
  "context": "Müştəri xidməti"
}
```

### 6. Digər (`src/data/miscellaneous.json`)
Saylar, əvəzliklər, zərflər, bağlayıcılar, ədatlar:
```json
{ "type": "Say", "word": "Eins", "comp": "1", "trans": "Bir", "en": "one", "priority": 1 }
```

### 7. Qrammatika (`src/data/grammar.json`)
Hər bölmə `sections` massivindədir. İkidillilik üçün hər bölmədə **iki dəst** var:
- `title` + `content` — Azərbaycanca
- `titleEn` + `contentEn` — İngiliscə (eyni struktur; `content` və `contentEn` eyni uzunluqda və eyni
  `type`-larda olmalıdır). `content` elementləri: `h3`, `p`, `table`, `example-box`, `grid`, `tip`,
  `rule`, `html`. Alman nümunələri hər iki dildə Almanca qalır.

### 8. Kateqoriya etiketləri (`src/i18n/labels.json`)
Yeni kateqoriya/alt-mövzu dəyəri əlavə etsəniz, onun `az → en` qarşılığını da `labels.json`-a
əlavə edin (`nounCats`, `phraseCats`, `phraseSubcats`, `miscTypes`, `profContexts`, `profCats`).

### 9. Məsləhətlər (`src/data/tips.json`)
```json
{ "id": 1, "title": "Hər gün 10 yeni söz", "titleEn": "10 new words every day",
  "description": "...", "descriptionEn": "...", "icon": "📚" }
```

---

## Vacib Qeydlər / Notes

- JSON fayllarında vergüllərə və mötərizələrə diqqət yetirin (etibarlı JSON olmalıdır).
- Yeni məzmun **həm AZ, həm EN** sahələri ilə əlavə edin.
- Məlumatı dəyişdikdən sonra ana səhifə sayları üçün **`npm run counts`** işlədin.
- `npm run dev` işləyirsə, dəyişikliklər avtomatik yenilənir.
- İkonlar üçün Emoji istifadə edə bilərsiniz.
