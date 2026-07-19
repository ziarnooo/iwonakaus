/* ============================================================
   DATA - artworks + i18n dictionary
   [DO UZUPEŁNIENIA] tytuły, wymiary, rok, opisy - podmień na realne.
   ============================================================ */

const IMG = "/assets/img/";

/* ---- ORIGINALS (obrazy) ---- */
const ORIGINALS = [
  {
    id:"o1", img:IMG+"art-05-dziewczynka-malpka.jpeg", hero:true,
    title:{pl:"Dziewczynka z małpką", en:"Girl with a Monkey"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"70 × 90 cm", year:"[rok]", price:8000, sold:true,
    desc:{pl:"Portret utkany ze spojrzenia i ciszy - sfora spojrzeń i zwierzę-towarzysz na skraju baśni.",
          en:"A portrait woven from gaze and stillness - a companion animal at the edge of a fairy tale."}
  },
  {
    id:"o2", img:IMG+"art-07-kobieta-zolta.png", hero:true,
    title:{pl:"Kobieta w żółci", en:"Woman in Ochre"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"60 × 80 cm", year:"[rok]", price:8000, sold:true,
    desc:{pl:"Światło osiada na tkaninie jak kurz na starym instrumencie. Studium spokoju i ciężaru.",
          en:"Light settles on fabric like dust on an old instrument. A study of calm and weight."}
  },
  {
    id:"o3", img:IMG+"art-03-dziewczyna-roza.png", hero:true,
    title:{pl:"Dziewczyna z różą", en:"Girl with a Rose"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"50 × 65 cm", year:"[rok]", price:8000, sold:true,
    desc:{pl:"Ciemne włosy i czerwony akcent róży - portret pełen wyczekiwania i chłodnego blasku skóry.",
          en:"Dark hair and the red accent of a rose - a portrait full of anticipation and cool luminous skin."}
  },
  {
    id:"o4", img:IMG+"art-02-kobieta-siwa.png", hero:true,
    title:{pl:"Portret kobiety", en:"Portrait of a Woman"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"55 × 75 cm", year:"[rok]", price:8000, sold:true,
    desc:{pl:"Faktura twarzy zapisana śmiałym pociągnięciem - czas jako materia malarska.",
          en:"The texture of a face recorded in bold strokes - time as painterly matter."}
  },
  {
    id:"o5", img:IMG+"art-04-dziecko-bluzka.png", hero:false,
    title:{pl:"Dziecko", en:"Child"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"45 × 60 cm", year:"[rok]", price:5000, sold:true,
    desc:{pl:"Ciepła, ziemista gama i niedokończony rysunek koszuli - obraz uchwycony w pół oddechu.",
          en:"A warm, earthy palette and the unfinished drawing of a shirt - a painting caught mid-breath."}
  },
  {
    id:"o6", img:IMG+"art-06-dziewczynka-jagnie.jpeg", hero:false,
    title:{pl:"Dziewczynka z jagnięciem", en:"Girl with a Lamb"},
    medium:{pl:"Olej na płótnie", en:"Oil on canvas"},
    dim:"60 × 80 cm", year:"[rok]", price:8000, sold:true,
    desc:{pl:"Impresyjne, migotliwe pociągnięcia pędzla - czułość sceny rodzajowej bez sentymentu.",
          en:"Impressionistic, shimmering brushwork - the tenderness of a genre scene without sentimentality."}
  },
  {
    id:"o7", img:IMG+"art-01-akwarela-portret.png", hero:false,
    title:{pl:"Portret w sepii", en:"Portrait in Sepia"},
    medium:{pl:"Akwarela i rysunek ołówkiem", en:"Watercolour and pencil"},
    dim:"40 × 55 cm", year:"[rok]", price:5000, sold:true,
    desc:{pl:"Woda i grafit spotykają się w półmroku - twarz wyłania się z laserunków jak z pamięci.",
          en:"Water and graphite meet in half-light - a face emerging from washes like a memory."}
  }
];

/* Dostępność obrazu ustawiasz przy każdym obrazie powyżej:
   sold:true  = "Sprzedane" (nie da się kupić)
   sold:false = dostępny w sklepie (przycisk "Do koszyka")               */

/* ---- PRINTS (printy) - sygnowane odbitki, 500 zł ---- */
const PRINTS = ["o1","o2","o3","o5","o6","o7"].map((rid,i)=>{
  const src = ORIGINALS.find(o=>o.id===rid);
  return {
    id:"p"+(i+1), img:src.img, hero:false,
    title:src.title,
    medium:{pl:"Print sygnowany, papier archiwalny", en:"Signed giclée print, archival paper"},
    dim:"30 × 40 cm", year:"", price:500, sold:false,
    desc:{pl:"Odbitka giclée na papierze archiwalnym, ręcznie sygnowana przez artystkę. Edycja limitowana.",
          en:"Giclée print on archival paper, hand-signed by the artist. Limited edition."}
  };
});

const ARTWORKS = { obraz:ORIGINALS, print:PRINTS };
const ALL_BY_ID = {};
[...ORIGINALS, ...PRINTS].forEach(a=>{ALL_BY_ID[a.id]=a;});

/* portfolio order on the homepage */
const PORTFOLIO = ORIGINALS;

/* ============================================================ i18n */
const I18N = {
  pl:{
    "nav.about":"O malarce","nav.portfolio":"Portfolio","nav.shop":"Sklep","nav.contact":"Kontakt",
    "hero.eyebrow":"Malarstwo · Portret",
    "hero.title":"Twarze, które <em>pamiętają</em> światło",
    "hero.lede":"Olej, akwarela i rysunek. Portrety wydobyte z półmroku - kolekcja i sygnowane printy do kupienia wprost z pracowni.",
    "hero.cta1":"Zobacz portfolio","hero.cta2":"Kup obraz",
    "hero.scroll":"Przewiń",
    "about.eyebrow":"O malarce",
    "about.title":"Iwona <em>Kaus</em>",
    "about.lede":"Malarka portrecistka. Pracuję w oleju, akwareli i rysunku, szukając momentu, w którym twarz przestaje pozować, a zaczyna istnieć.",
    "about.p1":"[DO UZUPEŁNIENIA] Maluję ludzi - najczęściej kobiety i dzieci - w gamie ciepłej ziemi i chłodnego światła. Interesuje mnie napięcie między precyzją rysunku a swobodą plamy, między tym, co widoczne, a tym, co tylko przeczuwane.",
    "about.p2":"[DO UZUPEŁNIENIA] Każdy obraz powstaje w pracowni, z natury i z pamięci. Prace znajdują się w kolekcjach prywatnych w Polsce i za granicą.",
    "about.signrole":"Malarka · pracownia malarstwa",
    "facts.tech.title":"Techniki",
    "facts.tech.1k":"Olej","facts.tech.1v":"Olej na płótnie - <b>portret i scena rodzajowa</b>",
    "facts.tech.2k":"Akwarela","facts.tech.2v":"Laserunki, monochromatyczna sepia, światło z papieru",
    "facts.tech.3k":"Rysunek","facts.tech.3v":"Ołówek i węgiel jako podstawa i samodzielny język",
    "facts.edu.title":"Wykształcenie",
    "facts.edu.1k":"UMCS","facts.edu.1v":"Uniwersytet Marii Curie-Skłodowskiej w Lublinie",
    "facts.edu.2k":"WSSP","facts.edu.2v":"Wyższa Szkoła Sztuk Plastycznych - <b>malarstwo</b>",
    "facts.edu.3k":"Dyplom","facts.edu.3v":"Dyplom w pracowni malarstwa",
    "pf.eyebrow":"Wybrane prace","pf.title":"Portfolio","pf.cta":"Cały sklep",
    "pf.explore":"Kliknij, aby powiększyć",
    "quote.text":"Portret to nie podobizna. To próba zatrzymania kogoś na chwilę dłużej, niż pozwala czas.",
    "quote.cite":"Iwona Kaus",
    "shopcta.eyebrow":"Kolekcja",
    "shopcta.title":"Zabierz obraz do domu",
    "shopcta.lede":"Oryginały olejne i akwarele oraz limitowane, sygnowane printy. Wysyłka z pracowni, z certyfikatem autentyczności.",
    "shopcta.btn":"Przejdź do sklepu",
    "foot.tagline":"Malarstwo portretowe - olej, akwarela, rysunek. Oryginały i sygnowane printy prosto z pracowni.",
    "foot.explore":"Nawigacja","foot.shopcol":"Sklep","foot.contact":"Kontakt",
    "foot.originals":"Obrazy oryginalne","foot.prints":"Printy sygnowane",
    "foot.rights":"Wszelkie prawa zastrzeżone.","foot.made":"Portfolio & sklep",
    /* shop */
    "shop.eyebrow":"Sklep","shop.title":"Kup dzieło","shop.lede":"Oryginalne obrazy i limitowane printy. Ceny zawierają certyfikat autentyczności. Wysyłka po całej Polsce.",
    "shop.tab.obraz":"Obrazy","shop.tab.print":"Printy",
    "shop.add":"Do koszyka","shop.sold":"Sprzedane","shop.view":"Podgląd",
    "shop.pricenote":"cena obrazu",
    /* cart */
    "cart.title":"Koszyk","cart.empty":"Twój koszyk jest pusty.","cart.total":"Razem","cart.checkout":"Do kasy","cart.remove":"Usuń",
    "cart.added":"Dodano do koszyka",
    /* lightbox */
    "lb.add":"Do koszyka","lb.shop":"Powrót do sklepu",
    /* checkout */
    "co.eyebrow":"Zamówienie","co.title":"Do kasy","co.contact":"Dane kontaktowe","co.shipping":"Adres wysyłki","co.payment":"Płatność",
    "co.firstname":"Imię","co.lastname":"Nazwisko","co.email":"E-mail","co.phone":"Telefon",
    "co.street":"Ulica i numer","co.city":"Miasto","co.zip":"Kod pocztowy","co.country":"Kraj","co.notes":"Uwagi do zamówienia (opcjonalnie)",
    "co.paynote":"Płatności online zostaną podpięte wkrótce. Złóż zamówienie, a skontaktujemy się w sprawie płatności i wysyłki.",
    "co.summary":"Podsumowanie","co.subtotal":"Wartość dzieł","co.shippingfee":"Wysyłka","co.free":"gratis","co.grand":"Do zapłaty",
    "co.place":"Złóż zamówienie","co.sending":"Wysyłanie…","co.empty":"Koszyk jest pusty.","co.emptycta":"Wróć do sklepu",
    "co.error":"Nie udało się wysłać zamówienia. Spróbuj ponownie lub napisz na iwonkaus@wp.pl.",
    "co.placed":"Dziękujemy! Zamówienie zostało wysłane - odezwiemy się w sprawie płatności i wysyłki."
  },
  en:{
    "nav.about":"About","nav.portfolio":"Portfolio","nav.shop":"Shop","nav.contact":"Contact",
    "hero.eyebrow":"Painting · Portraiture",
    "hero.title":"Faces that <em>remember</em> the light",
    "hero.lede":"Oil, watercolour and drawing. Portraits drawn out of half-light - a collection and signed prints available straight from the studio.",
    "hero.cta1":"View portfolio","hero.cta2":"Buy a painting",
    "hero.scroll":"Scroll",
    "about.eyebrow":"About the artist",
    "about.title":"Iwona <em>Kaus</em>",
    "about.lede":"Portrait painter. I work in oil, watercolour and drawing, chasing the moment a face stops posing and begins to exist.",
    "about.p1":"[TO FILL] I paint people - most often women and children - in a palette of warm earth and cool light. I'm drawn to the tension between the precision of drawing and the freedom of the mark, between the seen and the merely sensed.",
    "about.p2":"[TO FILL] Each painting is made in the studio, from life and from memory. Works are held in private collections in Poland and abroad.",
    "about.signrole":"Painter · painting studio",
    "facts.tech.title":"Techniques",
    "facts.tech.1k":"Oil","facts.tech.1v":"Oil on canvas - <b>portrait and genre scene</b>",
    "facts.tech.2k":"Watercolour","facts.tech.2v":"Washes, monochrome sepia, light from the paper",
    "facts.tech.3k":"Drawing","facts.tech.3v":"Pencil and charcoal as both foundation and language",
    "facts.edu.title":"Education",
    "facts.edu.1k":"UMCS","facts.edu.1v":"Maria Curie-Skłodowska University, Lublin",
    "facts.edu.2k":"WSSP","facts.edu.2v":"Academy of Fine Arts - <b>painting</b>",
    "facts.edu.3k":"Diploma","facts.edu.3v":"Diploma in the painting studio",
    "pf.eyebrow":"Selected works","pf.title":"Portfolio","pf.cta":"Full shop",
    "pf.explore":"Click to enlarge",
    "quote.text":"A portrait is not a likeness. It is an attempt to hold someone a moment longer than time allows.",
    "quote.cite":"Iwona Kaus",
    "shopcta.eyebrow":"Collection",
    "shopcta.title":"Take a painting home",
    "shopcta.lede":"Original oils and watercolours, plus limited signed prints. Shipped from the studio with a certificate of authenticity.",
    "shopcta.btn":"Enter the shop",
    "foot.tagline":"Portrait painting - oil, watercolour, drawing. Originals and signed prints straight from the studio.",
    "foot.explore":"Explore","foot.shopcol":"Shop","foot.contact":"Contact",
    "foot.originals":"Original paintings","foot.prints":"Signed prints",
    "foot.rights":"All rights reserved.","foot.made":"Portfolio & shop",
    "shop.eyebrow":"Shop","shop.title":"Acquire a work","shop.lede":"Original paintings and limited prints. Prices include a certificate of authenticity. Shipping across Poland.",
    "shop.tab.obraz":"Paintings","shop.tab.print":"Prints",
    "shop.add":"Add to cart","shop.sold":"Sold","shop.view":"Preview",
    "shop.pricenote":"artwork price",
    "cart.title":"Cart","cart.empty":"Your cart is empty.","cart.total":"Total","cart.checkout":"Checkout","cart.remove":"Remove",
    "cart.added":"Added to cart",
    "lb.add":"Add to cart","lb.shop":"Back to shop",
    "co.eyebrow":"Order","co.title":"Checkout","co.contact":"Contact details","co.shipping":"Shipping address","co.payment":"Payment",
    "co.firstname":"First name","co.lastname":"Last name","co.email":"Email","co.phone":"Phone",
    "co.street":"Street and number","co.city":"City","co.zip":"Postcode","co.country":"Country","co.notes":"Order notes (optional)",
    "co.paynote":"Online payments will be connected soon. Place your order and we'll be in touch about payment and shipping.",
    "co.summary":"Summary","co.subtotal":"Artwork value","co.shippingfee":"Shipping","co.free":"free","co.grand":"Total due",
    "co.place":"Place order","co.sending":"Sending…","co.empty":"Your cart is empty.","co.emptycta":"Back to shop",
    "co.error":"We couldn't send your order. Please try again or email iwonkaus@wp.pl.",
    "co.placed":"Thank you! Your order has been sent - we'll be in touch about payment and shipping."
  }
};
