# Iwona Kaus — portfolio & sklep

Statyczna strona (HTML/CSS/vanilla JS, zero zależności). Preset A "Editorial Serif · dark warm"
z `moje-wymarzone-strony.md` — grafit + krem z referencji (Egon Schiele), Fraunces + Hanken Grotesk,
akcent terakota. Ujemny tracking nagłówków, hairline bordery, ruch 300–500 ms, `prefers-reduced-motion`.

## Uruchomienie
```bash
cd ~/contextPriv/projekty/iwonakaus
python3 -m http.server 4330
# → http://localhost:4330
```
(Wymaga serwera http, bo skrypty ładują się przez `<script src>`. `file://` też zadziała dla podglądu.)

## Struktura
- `index.html` — Hero slider (auto-play, pauza na hover, strzałki na hover, kropki, Ken Burns, crossfade),
  sekcja O malarce + animowany podpis, Portfolio (masonry + lightbox), cytat, CTA do sklepu, stopka.
- `sklep.html` — podział **Obrazy / Printy** (zakładki), karty produktów, koszyk (drawer), lightbox.
- `checkout.html` — mock checkout: formularz + podsumowanie koszyka. Płatności do podpięcia później.
- `assets/js/data.js` — **wszystkie dane obrazów + słownik PL/EN** (edytuj tutaj).
- `assets/js/app.js` — silnik (i18n, slider, koszyk w localStorage, lightbox, checkout).
- `assets/css/style.css` — design system.

## Ceny (wg briefu)
- Obrazy olejne: 8000 zł, część 5000 zł · Akwarela: 5000 zł · Printy sygnowane: 500 zł.

## DO UZUPEŁNIENIA (szukaj `[DO UZUPEŁNIENIA]` / `[rok]` / `[Miasto]`)
1. **Bio** — `data.js` klucze `about.p1`, `about.p2` (PL i EN). Wpisane placeholdery.
2. **Tytuły / wymiary / rok obrazów** — `data.js`, tablice `ORIGINALS` (tytuły robocze, wymiary szacunkowe).
3. **Kontakt** — e-mail (`kontakt@iwonakaus.pl` placeholder), telefon, miasto/pracownia w stopkach.
4. **Zdjęcie do sekcji "O malarce"** — teraz użyty jeden z obrazów; podmień na portret artystki
   (`index.html`, `.about-portrait img`).
5. **Płatności** — checkout zapisuje zamówienie i pokazuje podziękowanie; podepnij bramkę
   (np. Payments AI / Stripe / Przelewy24) w `app.js` → handler `coForm submit`.

## Języki
Przełącznik PL/EN w nawigacji (zapamiętywany w localStorage). Wszystkie teksty w `data.js` → `I18N`.
