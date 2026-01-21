# alida - Data Genişləndirmə Bələdçisi

Bu bələdçi tətbiqdəki məlumatları (isimlər, fellər, qrammatika və s.) necə manual olaraq artıra biləcəyinizi izah edir. Bütün məlumatlar `src/data` qovluğunda JSON formatında yerləşir.

## Məlumat Faylları

### 1. İsimlər (`src/data/nouns.json`)
Hər bir isim aşağıdakı strukturda olmalıdır:
```json
{
  "art": "der",        // Artiklı (der, die, das)
  "word": "Tisch",     // Sözün özü
  "plural": "Tische",  // Cəm forması
  "translation": "Masa", // Tərcüməsi
  "category": "Ev"     // Kateqoriyası
}
```

### 2. Fellər (`src/data/verbs.json`)
Fellər üçün struktur:
```json
{
  "infinitive": "gehen", // Məsdər forması
  "meaning": "getmək",   // Mənası
  "partizip": "gegangen", // Partizip II forması
  "helper": "sein",      // Köməkçi feli (haben/sein)
  "example": "Ich gehe nach Hause.", // Nümunə cümlə
  "modal": false,        // Modal fel olub-olmaması
  "irregular": true      // Qaydasız olub-olmaması
}
```

### 3. Sifətlər (`src/data/adjectives.json`)
Sifətlər üçün struktur:
```json
{
  "german": "gut",         // Sifət
  "meaning": "yaxşı",      // Mənası
  "comparative": "besser", // Müqayisə dərəcəsi
  "superlative": "am besten", // Üstünlük dərəcəsi
  "example": "Das ist gut.", // Nümunə
  "category": "positive",  // Kateqoriya (positive/negative)
  "antonyms": ["schlecht"] // Antonimlər
}
```

### 4. Peşələr və İfadələr (`src/data/professions.json`)
Bu fayl həm peşə kateqoriyalarını, həm də onlara aid ifadələri saxlayır.
- **Kateqoriyalar**: `categories` massivinə yeni obyekt əlavə edin.
- **İfadələri**: `phrases` obyektində kateqoriya ID-sinə uyğun massiv yaradın.
```json
{
  "german": "Wie kann ich helfen?",
  "azeri": "Necə kömək edə bilərəm?",
  "context": "Müştəri xidməti"
}
```

### 5. Qrammatika (`src/data/grammar.json`)
Qrammatika bölməsi daha mürəkkəbdir. Hər bölmə `sections` massivində yerləşir və `content` hissəsində müxtəlif tipli elementlər (h3, p, table, example-box, tip, rule) ola bilər.

## Vacib Qeydlər
- JSON fayllarında vergüllərə və mötərizələrə diqqət yetirin.
- Yeni məlumat əlavə etdikdən sonra tətbiq avtomatik yenilənəcək (əgər `npm run dev` işləyirsə).
- Şəkillər və ya ikonlar üçün Emoji istifadə edə bilərsiniz.
