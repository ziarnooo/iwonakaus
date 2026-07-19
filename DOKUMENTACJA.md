# Dokumentacja strony iwonakaus.pl

Ten dokument opisuje jak działa strona i **jak samodzielnie wprowadzać zmiany** — także
dla osoby nietechnicznej. Nie trzeba instalować żadnych programów; większość zmian robi
się w przeglądarce na GitHubie.

---

## 1. Co to jest (w skrócie)

- **Strona-wizytówka + portfolio + mały sklep** malarki Iwony Kaus.
- Trzy podstrony:
  - **Strona główna** → `https://iwonakaus.pl`
  - **Sklep** → `https://iwonakaus.pl/sklep`
  - **Kasa (checkout)** → `https://iwonakaus.pl/checkout`
- Strona jest „statyczna" — to znaczy szybka, tania (hosting za darmo) i bezpieczna,
  ale nie ma panelu administracyjnego jak WordPress. Zmiany robi się edytując pliki
  (patrz punkt 3 — to prostsze niż brzmi).
- Dwa języki: **polski i angielski** (przełącznik PL/EN w prawym górnym rogu).

---

## 2. Gdzie co „mieszka" (adresy i konta)

| Rzecz | Gdzie | Do czego |
|---|---|---|
| Kod strony | GitHub: `github.com/ziarnooo/iwonakaus` | tu edytujesz treść i pliki |
| Hosting | GitHub Pages (darmowy) | tu strona „stoi" w internecie |
| Domena | `iwonakaus.pl` — zarejestrowana w **cyberfolks.pl** | adres strony |
| Ustawienia DNS | panel cyberfolks.pl | kierują domenę na GitHub |
| Zamówienia (maile) | **Web3Forms** (web3forms.com) | formularz zamówienia wysyła maila |
| Statystyki | **Google Analytics 4**, ID `G-F8HZFG7MYT` | ile osób odwiedza stronę |
| E-mail kontaktowy | `iwonkaus@wp.pl` | widoczny w stopce + odbiór zamówień |

> ⚠️ **Do potwierdzenia:** czy e-mail to na pewno `iwonkaus@wp.pl` (bez „a"), czy `iwonakaus@wp.pl`.

---

## 3. Jak samodzielnie zmienić treść (bez programisty)

**Zasada:** wszystko robisz na `github.com/ziarnooo/iwonakaus` w przeglądarce.

### Jak w ogóle edytować plik (raz się nauczysz — działa wszędzie)
1. Wejdź na `github.com/ziarnooo/iwonakaus` (zaloguj się na konto `ziarnooo`).
2. Kliknij w plik, który chcesz zmienić (np. `assets/js/data.js`).
3. Kliknij **ikonę ołówka** (✏️ „Edit this file") w prawym górnym rogu podglądu.
4. Wprowadź zmianę w tekście.
5. Na dole/na górze kliknij zielony **„Commit changes"** → jeszcze raz **„Commit changes"**.
6. Gotowe. Strona **sama się zaktualizuje w ~1 minutę**. Odśwież `iwonakaus.pl`.

> 💡 Zasada bezpieczeństwa: zmieniaj tylko **tekst między cudzysłowami** `"tak jak tutaj"`.
> Nie ruszaj nawiasów, dwukropków, przecinków na końcach linii. Jak coś pójdzie nie tak,
> historia zmian na GitHubie pozwala cofnąć każdą edycję.

---

### 3a. Zmiana ceny, tytułu lub wymiarów obrazu
**Plik:** `assets/js/data.js` (sekcja `ORIGINALS` — obrazy, oraz `PRINTS` — printy)

Każdy obraz to taki blok:
```
title:{pl:"Dziewczynka z małpką", en:"Girl with a Monkey"},
medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
dim:"70 × 90 cm", year:"[rok]", price:8000, sold:true,
```
- **Cena:** zmień liczbę po `price:` (np. `price:8000` → `price:6500`). Bez spacji, bez „zł".
- **Tytuł:** zmień tekst po `pl:` (polski) i `en:` (angielski).
- **Wymiary:** zmień `dim:"70 × 90 cm"`.
- **Rok:** zmień `year:"[rok]"` na np. `year:"2019"`.

### 3b. Oznaczyć obraz jako sprzedany / znów dostępny
W tym samym bloku (punkt 3a) jest `sold:`:
- `sold:true` → obraz pokazuje się jako **„Sprzedane"**, nie można go kupić.
- `sold:false` → obraz jest **dostępny** (pojawia się przycisk „Do koszyka").

Obecnie **wszystkie obrazy** mają `sold:true`, a **printy** `sold:false` (dostępne).

### 3c. Dodać nowy obraz
1. **Wgraj zdjęcie:** na GitHubie wejdź do folderu `assets/img/` → „Add file" → „Upload files"
   → wrzuć plik (najlepiej nazwa bez spacji i polskich znaków, np. `art-08-nowy.jpg`).
2. **Dodaj wpis** w `assets/js/data.js`: skopiuj istniejący blok obrazu (od `{ id:...`
   do zamykającego `}`), wklej jako kolejny w liście `ORIGINALS`, i zmień w nim:
   - `id:"o8"` (unikalny, kolejny numer),
   - `img:IMG+"art-08-nowy.jpg"` (nazwa Twojego pliku),
   - `title`, `medium`, `dim`, `price`, `sold`, `desc`.
   Pamiętaj o przecinku po `}` między obrazami.

### 3d. Zmiana tekstów (bio, hasła, opisy) + wersje językowe
**Plik:** `assets/js/data.js` — sekcja `I18N`.
Jest podzielona na dwa bloki: `pl:{ ... }` (polski) i `en:{ ... }` (angielski).
Każdy tekst ma swój „klucz". Najważniejsze:
- `"about.p1"` i `"about.p2"` → **biografia malarki** (do uzupełnienia — teraz jest wersja
  robocza oznaczona `[DO UZUPEŁNIENIA]`).
- `"hero.title"`, `"hero.lede"` → wielki napis i podpis na górze strony głównej.
- `"quote.text"` → cytat na środku strony.
- `"facts.tech.*"` i `"facts.edu.*"` → techniki i wykształcenie.

> Zmieniając tekst PL pamiętaj, by zmienić też jego odpowiednik w bloku EN (ten sam klucz).

### 3e. Zmiana e-maila kontaktowego
- **Widoczny w stopce:** pliki `index.html` i `sklep/index.html` — szukaj `iwonkaus@wp.pl`
  (występuje 2×: w `mailto:` i jako tekst).
- **Odbiór zamówień:** to ustawienie jest po stronie Web3Forms — patrz punkt 5.

### 3f. Zdjęcie w sekcji „O malarce"
**Plik:** `index.html` — szukaj `about-portrait`. Podmień nazwę pliku w `src="assets/img/..."`
na zdjęcie portretowe artystki (najpierw wgraj je do `assets/img/`, jak w 3c).

---

## 4. Jak działa publikacja

Każda zmiana zapisana na GitHubie (commit) **automatycznie** publikuje się na stronie
w ciągu ~1 minuty. Nie ma osobnego „wysyłania na serwer". Historia wszystkich zmian jest
zapisana — zawsze można cofnąć.

---

## 5. Zamówienia — co się dzieje, gdy ktoś kupuje

1. Klient klika **„Do koszyka"** (na kaflu w sklepie albo w podglądzie obrazu) — pozycja
   trafia do koszyka i **od razu otwiera się Kasa** (`/checkout`). Kolejne dodania podbijają
   ilość i aktualizują koszyk.
2. Wypełnia dane (imię, e-mail, adres) i klika **„Złóż zamówienie"**.
3. Zamówienie (lista dzieł + dane klienta) leci przez **Web3Forms** na skrzynkę
   e-mail skonfigurowaną w koncie Web3Forms.
4. Klient widzi podziękowanie, koszyk się czyści.

> W podglądzie pojedynczego obrazu przycisk obok to **„Powrót do sklepu"**. Obrazy oznaczone
> jako sprzedane mają zablokowane kupno (widnieje „Sprzedane").

> 💳 **Płatności jeszcze nie są podpięte.** Na razie zamówienie to zgłoszenie mailowe —
> po jego otrzymaniu kontaktujecie się z klientem w sprawie płatności i wysyłki.
> Docelowo można podpiąć bramkę (np. Przelewy24 / Autopay / Stripe).

**Gdzie zmienić adres, na który przychodzą zamówienia:**
zaloguj się na `web3forms.com` (na konto, na które był zakładany klucz) i zmień adres
odbiorcy. Klucz formularza jest wpisany w `assets/js/app.js` (linia `WEB3FORMS_KEY`).

---

## 6. Statystyki (Google Analytics)

Wpięty jest Google Analytics 4 (ID `G-F8HZFG7MYT`). Ruch zobaczysz na `analytics.google.com`
→ raporty (na żywo: „Realtime"). Statystyki liczą się dopiero od momentu, gdy strona
działa na `iwonakaus.pl` (nie liczą testów lokalnych).

---

## 7. Domena i HTTPS (kłódka)

- Domena `iwonakaus.pl` jest w **cyberfolks**. W jej **edytorze strefy DNS** ustawione są
  rekordy kierujące na GitHub:
  ```
  A     @     185.199.108.153
  A     @     185.199.109.153
  A     @     185.199.110.153
  A     @     185.199.111.153
  CNAME www   ziarnooo.github.io.
  ```
- **HTTPS (kłódka): DZIAŁA** ✅ — certyfikat SSL jest wystawiony, a „Enforce HTTPS"
  (wymuszanie szyfrowania) jest włączone. Strona zawsze otwiera się po `https://`.
- **(Opcjonalnie, zalecane) rekordy IPv6 (AAAA):** dla pełnej zgodności (m.in. scraper
  Facebooka działa po IPv6) warto dodać w edytorze strefy DNS w cyberfolks obok rekordów A:
  ```
  AAAA  @  2606:50c0:8000::153
  AAAA  @  2606:50c0:8001::153
  AAAA  @  2606:50c0:8002::153
  AAAA  @  2606:50c0:8003::153
  ```
- **Gdyby kiedyś wrócił błąd „NotServedByPagesError / improperly configured":** to zwykle
  opóźnienie po stronie GitHuba. Reset: GitHub → repo `iwonakaus` → **Settings → Pages** →
  w polu „Custom domain" usuń `iwonakaus.pl`, Save, wpisz ponownie, Save (wymusza ponowne
  sprawdzenie i odnowienie certyfikatu).

---

## 8. Decyzje projektowe (dlaczego tak wygląda)

- **Styl:** elegancki, minimalistyczny, ciemne ciepłe tło (grafit) + krem, jeden akcent
  **terakota** (`#C4623E`). Inspiracja: portfolio w duchu Egona Schiele (podział obraz/tekst).
- **Czcionki:**
  - Nagłówki: **PP Hatton** (cienki, wydłużony szeryf; „Iwona" cieńsza, „Kaus" grubsza).
  - Tekst: **Hanken Grotesk** (Google Fonts).
  - Podpis artystki: **Mrs Saint Delafield** (odręczny).
  - ⚠️ **Ważne o licencji:** PP Hatton jest na licencji **„Free for Personal Use"**. Sklep
    sprzedający obrazy to użycie komercyjne, a pliki fontu leżą w publicznym repo. **Zalecane:**
    dokupić licencję webową PP Hatton (Pangram Pangram) **albo** podmienić na font z licencją
    komercyjną (np. Cormorant — darmowy, wyglądał podobnie).
- **Hero:** slider 4 obrazów (auto-przewijanie, pauza po najechaniu, strzałki, kropki).
- **Sklep:** podział **Obrazy** (oryginały: olej 8000/5000 zł, akwarela 5000 zł) i
  **Printy** (sygnowane odbitki 500 zł). Koszyk + kasa.
- **Adresy bez `.html`** (czyste URL-e) — dzięki strukturze katalogów.
- **Płatności:** świadomie odłożone „na później".

---

## 9. Struktura plików (co gdzie)

```
index.html            → strona główna (iwonakaus.pl)
sklep/index.html      → sklep (/sklep)
checkout/index.html   → kasa (/checkout)
assets/
  css/style.css       → wygląd (kolory, czcionki, układ)
  js/data.js          → TREŚĆ: obrazy, ceny, teksty PL/EN   ← najczęściej tu edytujesz
  js/app.js           → mechanika (slider, koszyk, wysyłka zamówień)
  img/                → zdjęcia obrazów
  fonts/              → pliki czcionki PP Hatton
  og/og-image.png     → obrazek podglądu przy udostępnianiu linku
favicon.svg           → ikonka w karcie przeglądarki (monogram „IK")
robots.txt            → pozwala wyszukiwarkom/scraperom (nie ruszać)
sitemap.xml           → mapa strony dla wyszukiwarek
CNAME                 → informacja o domenie iwonakaus.pl (nie ruszać)
```

---

## 10. Grafiki: favicon i podgląd linku (OG)

- **Favicon** (ikonka w karcie): `favicon.svg` (monogram „IK") + `favicon-32.png`,
  `apple-touch-icon.png`.
- **Podgląd przy udostępnianiu** (Facebook, Messenger, iMessage): `assets/og/og-image.png`
  (obraz + „Iwona Kaus"). Podpięty w `index.html` i `sklep/index.html` (znacznik `og:image`).
- Aby podmienić podgląd: zastąp plik `assets/og/og-image.png` nowym w proporcjach **1200 × 630 px**.
- **Po zmianie podglądu odśwież cache Facebooka:** wejdź na `developers.facebook.com/tools/debug/`,
  wklej `https://iwonakaus.pl` i kliknij **„Scrape Again"** (Facebook trzyma stary podgląd w pamięci).

---

## 11. Otwarte zadania (do zrobienia)

- [ ] **Biografia** malarki (`about.p1`, `about.p2` w `data.js`, PL + EN) — teraz wersja robocza.
- [ ] **Tytuły / wymiary / lata** obrazów — obecnie robocze, do potwierdzenia.
- [ ] **Zdjęcie artystki** do sekcji „O malarce".
- [ ] **Potwierdzić e-mail:** `iwonkaus@wp.pl` czy `iwonakaus@wp.pl`.
- [ ] **Licencja fontu PP Hatton** — dokupić webową albo podmienić font.
- [ ] **Płatności online** — podpiąć bramkę (Przelewy24 / Autopay / Stripe).
- [ ] *(opcjonalnie)* dodać rekordy **AAAA (IPv6)** w cyberfolks — patrz pkt 7.
- [x] ~~HTTPS / „Enforce HTTPS"~~ — **zrobione, kłódka działa.**
- [x] ~~Favicon + podgląd OG~~ — **zrobione.**

---

## 12. Słowniczek

- **Repo / repozytorium** — folder z plikami strony na GitHubie.
- **Commit** — zapisanie zmiany (z krótkim opisem). Uruchamia publikację.
- **DNS** — „książka adresowa" internetu; kieruje `iwonakaus.pl` na właściwy serwer.
- **GitHub Pages** — darmowy hosting stron prosto z repozytorium.
- **SSL / HTTPS** — szyfrowane połączenie (kłódka w pasku adresu).
- **OG image** — obrazek, który pokazuje się, gdy ktoś wkleja link do strony w social mediach.
- **Web3Forms** — usługa, która zamienia formularz na stronie w e-mail.
