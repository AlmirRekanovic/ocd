// Content for the non-discipline landing pages.
//
// Each one targets a search intent that the club currently answers only as an
// anchor on the home page — or not at all. Competitor research found the
// Sarajevo results for several of these are held by Serbian and Croatian gyms,
// or by nothing at all, simply because no local club has a page for them.
//
// The pricing and schedule pages render live data (PRICES, WEEK) through the
// `blocks` field rather than restating numbers in prose, so the figures can
// never contradict the rest of the site.

import type { PageContent } from "../pages";

export type InfoKey = "pricing" | "schedule" | "location" | "students" | "glossary";

export const bs: Record<InfoKey, PageContent> = {
  pricing: {
    slug: "cijene-treninga-sarajevo",
    navLabel: "Cijene",
    inNav: false,
    blocks: ["pricing"],
    metaTitle: "Cijene treninga — koliko košta MMA i grappling u Sarajevu | OCD Fighters",
    metaDescription:
      "Cjenovnik OCD Fighters, Nedžarići 7, Sarajevo: 70 KM mjesečno za jedan program, 100 KM za MMA i grappling zajedno, 15 KM pojedinačni trening. Prvi trening besplatan, bez upisnine.",
    keywords: [
      "cijena MMA treninga Sarajevo",
      "koliko košta MMA trening",
      "cjenovnik borilački klub Sarajevo",
      "članarina MMA Sarajevo",
      "cijena grappling treninga",
      "koliko košta BJJ Sarajevo",
      "MMA cjenovnik Sarajevo",
    ],
    h1: "Cijene treninga u Sarajevu",
    lede:
      "Bez skrivenih troškova i bez upisnine. Plaćaš članarinu za program koji treniraš, ili pojedinačni trening ako ti ne odgovara mjesečni ritam. Prvi trening je besplatan.",
    sections: [
      {
        title: "Kako funkcioniše članarina",
        body:
          "Članarina traje 30 dana od dana uplate, a ne do kraja kalendarskog mjeseca. To znači da ne gubiš ništa ako se učlaniš sredinom mjeseca — period ti teče od dana kada si platio/la. Ako platiš ranije, novi period se nadovezuje na postojeći, pa ni tu nema gubitka. Status svoje članarine i datum isteka vidiš u svakom trenutku u članskom dijelu sajta.",
      },
      {
        title: "Šta je uključeno",
        body:
          "Mjesečna članarina pokriva sve treninge tog programa u sedmici — ne plaćaš po dolasku i ne postoji ograničenje broja treninga. Za grappling to znači ponedjeljak, srijedu i petak plus subotnji open mat; za MMA utorak i četvrtak. Kombinovana članarina otvara sve termine. Uz to ide i pristup članskom portalu za rezervaciju mjesta na treningu.",
      },
      {
        title: "Ako ti mjesečna članarina ne odgovara",
        body:
          "Pojedinačni trening (drop-in) je 15 KM i plaćaš ga samo kada dođeš. Ima smisla ako putuješ, radiš u smjenama ili tek provjeravaš koliko redovno možeš dolaziti. Isto važi i za goste iz drugih klubova koji su kratko u Sarajevu — dobrodošli ste na trening ili open mat.",
      },
      {
        title: "Plaćanje",
        body:
          "Članarina se plaća treneru u sali. Svaka uplata se evidentira s tačnim datumom, pa i ti i trener u svakom trenutku znate dokad ti članarina vrijedi. Nema upisnine, nema ugovora i nema otkaznog roka — ako prestaneš dolaziti, članarina jednostavno istekne.",
      },
    ],
    faq: [
      {
        q: "Koliko košta MMA trening u Sarajevu?",
        a: "Kod nas je mjesečna članarina za MMA 70 KM i pokriva sve MMA treninge u sedmici. Ako želiš i MMA i grappling, kombinovana članarina je 100 KM mjesečno. Pojedinačni trening je 15 KM.",
      },
      {
        q: "Ima li upisnina ili članarina za učlanjenje?",
        a: "Nema. Plaćaš samo mjesečnu članarinu ili pojedinačni trening. Nema upisnine, troškova registracije ni obaveznog ugovora.",
      },
      {
        q: "Je li prvi trening zaista besplatan?",
        a: "Jeste. Dođeš, odradiš cijeli trening i ništa ne plaćaš, bez obaveze da nastaviš. Dovoljno je da se prije toga javiš treneru kako bismo znali da dolaziš.",
      },
      {
        q: "Šta ako propustim treninge zbog bolesti ili puta?",
        a: "Javi se treneru. Članarina se vodi po datumu uplate, pa se duži prekidi rješavaju dogovorom — niko ne želi da plaćaš period u kojem nisi mogao/mogla trenirati.",
      },
      {
        q: "Mogu li plaćati po treningu umjesto mjesečno?",
        a: "Možeš — drop-in je 15 KM po treningu. Ako dolaziš više od pet puta mjesečno, mjesečna članarina ti se isplati više.",
      },
      {
        q: "Trebam li kupiti opremu odmah?",
        a: "Ne. Za početak su dovoljni sportska odjeća i flaša vode. Opremu nabavljaš tek kada budeš siguran/na da ostaješ, i trener će ti reći šta je stvarno potrebno.",
      },
    ],
    ctaTitle: "Dođi vidjeti kako izgleda",
    ctaBody:
      "Prvi trening je besplatan i ne obavezuje te ni na šta. Javi se treneru i dogovori termin.",
  },

  schedule: {
    slug: "raspored-treninga-sarajevo",
    navLabel: "Raspored",
    inNav: false,
    blocks: ["timetable"],
    metaTitle: "Raspored treninga — MMA, grappling i BJJ u Sarajevu | OCD Fighters",
    metaDescription:
      "Sedmični raspored treninga u OCD Fightersu, Nedžarići 7, Sarajevo. Jutarnji i večernji termini, grupe za početnike i napredne, ženski termin i open mat subotom.",
    keywords: [
      "raspored treninga Sarajevo",
      "termini MMA trening Sarajevo",
      "raspored MMA Sarajevo",
      "grappling termini Sarajevo",
      "večernji trening Sarajevo",
      "jutarnji trening Sarajevo",
      "open mat Sarajevo",
    ],
    h1: "Raspored treninga",
    lede:
      "Treniramo od ponedjeljka do subote, ujutro i uvečer, u grupama podijeljenim po nivou. Ispod je cijeli sedmični raspored — današnji dan je označen.",
    sections: [
      {
        title: "Kako je raspored postavljen",
        body:
          "Sedmica se dijeli na dvije šeme. Ponedjeljak, srijeda i petak su grappling dani; utorak i četvrtak MMA dani. Oba dana imaju jutarnji termin u 09:30 za one koji rade popodne ili treniraju profesionalno, naprednu grupu u 18:00 i početničku u 20:00. Subota je open mat od 10:00 do 12:00 — otvoren termin bez formalnog časa.",
      },
      {
        title: "Koji termin je za tebe",
        body:
          "Ako nikada nisi trenirao/la, ideš u termin u 20:00 — tempo je sporiji, fokus na tehnici i bez teškog sparinga. Napredna grupa u 18:00 podrazumijeva da već znaš osnove i da si spreman/na za sparing. Jutarnji termin je otvoren za oba nivoa, ali je po pravilu intenzivniji jer ga pohađaju iskusniji članovi. Ako nisi siguran/na, pitaj trenera prije nego dođeš.",
      },
      {
        title: "Ženski termin",
        body:
          "Ponedjeljkom, srijedom i petkom od 16:45 do 17:45 vodimo zatvoreni termin jiu-jitse za žene pod vodstvom trenerice Dalile. Termin je namjerno postavljen prije večernjih grupa i namijenjen je isključivo ženama, za sve nivoe iskustva.",
      },
      {
        title: "Rezervacija termina",
        body:
          "Za redovne treninge iz rasporeda ne treba rezervacija — samo dođeš. Za posebne termine koje trener objavi kroz članski portal mjesta su ograničena, pa se prijavljuješ unaprijed u članskom dijelu sajta. Tamo možeš i zatražiti individualni (privatni) trening.",
      },
    ],
    faq: [
      {
        q: "Trebam li se najaviti prije dolaska na trening?",
        a: "Za redovne termine ne moraš. Jedino za prvi dolazak je lijepo da se javiš treneru, da te očekujemo i da ti neko posveti pažnju na uvodu.",
      },
      {
        q: "Šta je open mat?",
        a: "Otvoren termin subotom od 10:00 do 12:00, bez formalnog časa. Radi se slobodno — ponavlja se tehnika, rola po volji, razgovara se. Dobar je i za potpune početnike jer nema pritiska da moraš pratiti nastavu.",
      },
      {
        q: "Trenirate li vikendom?",
        a: "Subotom da — open mat od 10:00 do 12:00. Nedjeljom ne treniramo.",
      },
      {
        q: "Mogu li dolaziti i na MMA i na grappling treninge?",
        a: "Možeš, uz kombinovanu članarinu od 100 KM mjesečno, koja otvara sve termine u sedmici.",
      },
      {
        q: "Mijenja li se raspored tokom godine?",
        a: "Osnovna šema je stalna. Povremene izmjene, dodatne termine i otkazane treninge trener objavljuje kroz članski portal, pa je tamo uvijek najsvježija informacija.",
      },
    ],
    ctaTitle: "Odaberi termin i javi se",
    ctaBody:
      "Nisi siguran/na koji termin ti odgovara? Napiši treneru na WhatsApp kada možeš i predložit će ti grupu.",
  },

  location: {
    slug: "borilacki-klub-nedzarici",
    navLabel: "Lokacija",
    inNav: false,
    blocks: ["map"],
    metaTitle: "Borilački klub u Nedžarićima — MMA i grappling sala | OCD Fighters",
    metaDescription:
      "OCD Fighters se nalazi u Nedžarićima, Sarajevo (Nedžarići 7). Blizu Alipašinog Polja, Dobrinje, Stupa, Mojmila i Aerodromskog naselja. Mapa, ruta i kontakt.",
    keywords: [
      "borilački klub Nedžarići",
      "MMA Nedžarići",
      "teretana Nedžarići",
      "borilački klub Alipašino Polje",
      "MMA Dobrinja",
      "borilački klub Stup",
      "borilački klub Novi Grad Sarajevo",
      "grappling Ilidža",
    ],
    h1: "Borilački klub u Nedžarićima",
    lede:
      "Naša sala je na adresi Nedžarići 7, u općini Novi Grad Sarajevo. Ispod je mapa i dugme za navigaciju — ako dolaziš prvi put, najlakše je pratiti rutu do same adrese.",
    sections: [
      {
        title: "Gdje se tačno nalazimo",
        body:
          "Nedžarići 7, Sarajevo. Nedžarići su naselje u općini Novi Grad, uz Bulevar Meše Selimovića, između Alipašinog Polja i Stupa. Ako ti adresa ne znači mnogo, koristi dugme za rutu ispod — otvara navigaciju direktno do ulaza u salu.",
      },
      {
        title: "Odakle nam najčešće dolaze članovi",
        body:
          "Zbog položaja uz glavnu saobraćajnicu do nas je jednako blizu iz više naselja: Alipašino Polje, Dobrinja, Stup, Mojmilo, Aerodromsko naselje, Otoka i Ilidža. Za većinu tih naselja riječ je o kratkoj vožnji ili nekoliko stanica javnim prijevozom, a iz bližih i o pješačenju.",
      },
      {
        title: "Studentski dom",
        body:
          "Studentski dom u Nedžarićima je u istom naselju, na pješačkoj udaljenosti od sale. Za studente koji tu stanuju to praktično znači da im je trening bliži nego bilo kojem drugom borilačkom klubu u gradu.",
      },
      {
        title: "Kada doći prvi put",
        body:
          "Najlakši prvi dolazak je početnički termin u 20:00 ili subotnji open mat u 10:00. Dođi petnaestak minuta ranije da stigneš upoznati trenera i pogledati salu prije nego trening počne.",
      },
    ],
    faq: [
      {
        q: "Koja je tačna adresa kluba?",
        a: "Nedžarići 7, Sarajevo, općina Novi Grad. Na ovoj stranici imaš mapu i dugme koje otvara navigaciju do sale.",
      },
      {
        q: "Koja naselja su blizu sale?",
        a: "Alipašino Polje, Dobrinja, Stup, Mojmilo, Aerodromsko naselje, Otoka i Ilidža — iz svih je do nas kratka vožnja ili nekoliko stanica javnim prijevozom.",
      },
      {
        q: "Ima li parking?",
        a: "Članovi uglavnom parkiraju u neposrednoj blizini sale. Ako dolaziš u večernjem terminu, računaj na koju minutu više za pronalazak mjesta.",
      },
      {
        q: "Kako da vas nađem ako dolazim prvi put?",
        a: "Pritisni dugme za rutu na ovoj stranici — vodi te do same adrese. Ako zapne, nazovi trenera ili piši na WhatsApp i navest će te.",
      },
    ],
    ctaTitle: "Svrati na trening",
    ctaBody:
      "Prvi trening je besplatan. Javi se treneru da dogovorite termin i dođi pogledati salu.",
  },

  students: {
    slug: "borilacke-vjestine-za-studente-sarajevo",
    navLabel: "Za studente",
    inNav: false,
    metaTitle: "Borilačke vještine za studente u Sarajevu — MMA i grappling | OCD Fighters",
    metaDescription:
      "MMA i grappling za studente u Sarajevu. Sala je u Nedžarićima, na pješačkoj udaljenosti od studentskog doma. Večernji termini poslije predavanja, prvi trening besplatan.",
    keywords: [
      "sport za studente Sarajevo",
      "MMA za studente Sarajevo",
      "borilački klub blizu studentskog doma",
      "trening Nedžarići studenti",
      "grappling za studente",
      "gdje trenirati kao student Sarajevo",
    ],
    h1: "Borilačke vještine za studente u Sarajevu",
    lede:
      "Sala je u Nedžarićima, na pješačkoj udaljenosti od studentskog doma. Termini su jutarnji i večernji, pa se uklapaju oko predavanja — a ako ti je raspored nepredvidiv, možeš plaćati i po treningu.",
    sections: [
      {
        title: "Blizu je — i to je pola posla",
        body:
          "Najčešći razlog zbog kojeg ljudi prestanu trenirati nije cijena nego put. Ako ti je do sale petnaest minuta u jednom smjeru, ideš i kada ti se ne ide. Studentski dom u Nedžarićima je u istom naselju kao i naša sala, pa za studente koji tu stanuju taj problem praktično ne postoji.",
      },
      {
        title: "Termini oko predavanja",
        body:
          "Večernje grupe počinju u 18:00 i 20:00, što ostavlja cijeli dan slobodnim. Jutarnji termin u 09:30 radi ako ti predavanja počinju popodne. Subotom je open mat od 10:00 do 12:00. Ne moraš se prijavljivati unaprijed za redovne termine — dođeš kada stigneš.",
      },
      {
        title: "Ako ti je semestar nepredvidiv",
        body:
          "Ispitni rokovi znaju pojesti tri sedmice. Zato postoji i pojedinačni trening od 15 KM koji plaćaš samo kada dođeš — nema smisla plaćati mjesečnu članarinu za period u kojem znaš da nećeš moći dolaziti. Kada se ritam vrati, prelazak na mjesečnu članarinu je stvar jednog dogovora s trenerom.",
      },
      {
        title: "Zašto grappling i MMA a ne teretana",
        body:
          "U teretani treniraš sam pored drugih ljudi; ovdje treniraš s njima. Za nekoga ko je došao studirati u Sarajevo iz drugog grada to je razlika između poznavanja nikoga i poznavanja tridesetak ljudi nakon dva mjeseca. Uz to, kondicija dolazi usput, a ne kao cilj za sebe.",
      },
    ],
    faq: [
      {
        q: "Koliko je klub udaljen od studentskog doma u Nedžarićima?",
        a: "Sala i studentski dom su u istom naselju, na pješačkoj udaljenosti. Tačnu rutu možeš otvoriti s naše stranice o lokaciji.",
      },
      {
        q: "Postoji li studentski popust?",
        a: "Cijene su iste za sve: 70 KM mjesečno za jedan program, 100 KM za oba, ili 15 KM po pojedinačnom treningu. Za studente je često najpraktičniji baš drop-in tokom ispitnih rokova.",
      },
      {
        q: "Mogu li trenirati ako nikada nisam bio/bila u borilačkom klubu?",
        a: "Da. Početničke grupe rade u 20:00 i tamo su svi počeli od nule. Nije potrebno nikakvo prethodno iskustvo ni posebna kondicija.",
      },
      {
        q: "Šta ako odem kući preko ljeta?",
        a: "Članarina se vodi po datumu uplate i ne obnavlja se sama, pa jednostavno prestane teći. Kada se vratiš, nastaviš — bez ikakve procedure.",
      },
    ],
    ctaTitle: "Prvi trening je besplatan",
    ctaBody:
      "Javi se treneru na WhatsApp, reci kada ti odgovara i dođi probati. Ništa ne plaćaš i ništa ne potpisuješ.",
  },

  glossary: {
    slug: "pojmovnik-grapplinga-i-mma",
    navLabel: "Pojmovnik",
    inNav: false,
    blocks: ["glossary"],
    metaTitle: "Pojmovnik grapplinga i MMA — šta znače gard, tap, sweep | OCD Fighters",
    metaDescription:
      "Objašnjenja osnovnih pojmova iz grapplinga, brazilske jiu-jitse i MMA na bosanskom: gard, mount, tap, sweep, pass, poluga, gušenje, open mat, no-gi i drugi.",
    keywords: [
      "grappling pojmovi",
      "BJJ pojmovnik",
      "šta znači tap",
      "šta je gard u jiu-jitsi",
      "MMA pojmovi objašnjenje",
      "no-gi značenje",
      "open mat značenje",
      "borilačke vještine rječnik",
    ],
    h1: "Pojmovnik grapplinga i MMA",
    lede:
      "Na treningu ćeš prvih sedmica čuti dosta engleskih riječi koje niko ne prevodi. Ovdje je objašnjeno šta znače — da ne moraš pitati usred serije.",
    sections: [
      {
        title: "Zašto se pojmovi ne prevode",
        body:
          "Grappling i brazilska jiu-jitsa došli su k nama preko engleskog, a pozicije i tehnike imaju uhodane nazive koje razumiju svi bez obzira na jezik. Prevod bi bio tačan ali beskoristan — kada odeš na seminar ili takmičenje, čut ćeš \"mount\" i \"sweep\", ne njihov bosanski ekvivalent. Zato se koriste originalni nazivi, često prilagođeni izgovoru.",
      },
    ],
    glossary: [
      { term: "Gard (guard)", def: "Pozicija u kojoj si na leđima, a nogama kontrolišeš protivnika ispred sebe. Za razliku od većine sportova, u jiu-jitsi biti na leđima nije gubitnička pozicija — iz garda se napada, obrće i završava." },
      { term: "Mount", def: "Pozicija u kojoj sjediš na protivnikovim prsima. Jedna od najdominantnijih pozicija u grapplingu i najnezgodnija za onoga ko je ispod." },
      { term: "Side control", def: "Kontrola sa strane: ležiš poprijeko preko protivnika koji je na leđima. Stabilna pozicija iz koje se lako prelazi u mount ili napada polugom." },
      { term: "Back control", def: "Kontrola s leđa, s kukama (nogama) oko protivnikovih bokova. Najbolja pozicija u sportu — otvara gušenje otpozadi, a protivnik te ne vidi." },
      { term: "Tap", def: "Predaja. Kucneš partnera ili strunjaču dva-tri puta i tehnika odmah prestaje. Tap nije poraz nego osnovno sigurnosno pravilo — tapa se rano i bez ega." },
      { term: "Roll (rolanje)", def: "Sparing u grapplingu. Dvoje ljudi radi punim ili djelimičnim intenzitetom, s pravim otporom, ali kontrolirano." },
      { term: "Drill", def: "Ponavljanje tehnike s partnerom koji ne pruža puni otpor, dok pokret ne postane automatski." },
      { term: "Sweep", def: "Obrtanje protivnika iz donje pozicije, tako da ti završiš gore a on dolje. Način na koji se gard pretvara u prednost." },
      { term: "Pass (prolaz garda)", def: "Zaobilaženje protivnikovih nogu da bi se došlo do side controla ili mounta. Jedna od najvažnijih vještina u grapplingu." },
      { term: "Escape", def: "Izlazak iz nepovoljne pozicije — ispod mounta, side controla ili iz gušenja. Početnici najviše vremena provode upravo na ovome." },
      { term: "Submission (završnica)", def: "Tehnika kojom se borba završava: poluga ili gušenje, nakon koje protivnik tapa." },
      { term: "Poluga (lock)", def: "Tehnika koja izvija zglob preko njegovog prirodnog opsega — najčešće lakat, rame ili koljeno. Izvodi se polako i pušta na prvi tap." },
      { term: "Gušenje (choke)", def: "Tehnika koja prekida dotok krvi u mozak ili zrak u pluća. Pravilno izvedeno gušenje krvotoka je brzo i bezbolno, i zato se tapa odmah." },
      { term: "Armbar", def: "Poluga na lakat izvedena nogama preko protivnikovih prsa. Vjerovatno najpoznatija završnica u jiu-jitsi." },
      { term: "Kimura", def: "Poluga na rame s dvostrukim hvatom za zglob. Nazvana po Masahiku Kimuri, judistu koji ju je upotrijebio protiv Hélija Gracieja." },
      { term: "Triangle (trokut)", def: "Gušenje nogama, u kojem se protivnikov vrat i jedna ruka zaključaju u trokut." },
      { term: "RNC (rear naked choke)", def: "Gušenje otpozadi golim rukama, iz back controla. Najčešći način završetka borbe u MMA-u." },
      { term: "Takedown (obaranje)", def: "Rušenje protivnika iz stojećeg stava na strunjaču. Dolazi iz hrvanja i u MMA-u često odlučuje ko diktira borbu." },
      { term: "Sprawl", def: "Odbrana od obaranja — naglo izbacivanje nogu unazad i spuštanje kukova na protivnika koji ulazi u noge." },
      { term: "Klinč", def: "Borba u bliskom kontaktu iz stava, hvatom za vrat, ruke ili tijelo. Prostor između udaranja i hrvanja." },
      { term: "No-gi", def: "Trening bez kimona, u kratkim hlačama i pripijenoj majici. Nema hvatova za tkaninu, tempo je brži. Naš redovni program je pretežno no-gi." },
      { term: "Gi (kimono)", def: "Klasična uniforma za brazilsku jiu-jitsu. Hvatovi za rukav, revere i pojas otvaraju tehnike kojih u no-giju nema." },
      { term: "Rashguard", def: "Pripijena sportska majica za no-gi trening. Štiti kožu od trenja o strunjaču i drži se na mjestu tokom rolanja." },
      { term: "Open mat", def: "Otvoren termin bez formalnog časa. Dolaziš, radiš tehniku koju želiš i rolaš po volji. Kod nas subotom od 10:00 do 12:00." },
      { term: "Shrimping", def: "Osnovno kretanje kukovima po strunjači, kojim se stvara prostor za izlazak iz pozicije. Jedna od prvih stvari koje naučiš i jedna od onih koje nikad ne prestaneš vježbati." },
      { term: "Ground and pound", def: "Udaranje protivnika iz dominantne pozicije na podu. Postoji u MMA-u, ne postoji u grapplingu." },
      { term: "Pojas", def: "Oznaka nivoa u brazilskoj jiu-jitsi: bijeli, plavi, ljubičasti, smeđi i crni. Napreduje se sporo — do crnog pojasa prosječno prođe deset i više godina." },
    ],
    faq: [
      {
        q: "Moram li znati ove pojmove prije prvog treninga?",
        a: "Ne. Trener sve pokazuje, a nazive pokupiš usput za nekoliko sedmica. Ova stranica postoji da ti ubrza taj period, a ne da bude uslov za dolazak.",
      },
      {
        q: "Šta znači kada neko kaže da je 'tapnuo'?",
        a: "Da je predao poziciju kucanjem po partneru ili strunjači. To je normalan i svakodnevan dio treninga — svi tapaju, uključujući trenere.",
      },
      {
        q: "Koja je razlika između grapplinga i jiu-jitse?",
        a: "Brazilska jiu-jitsa se klasično trenira u kimonu, grappling bez njega. Tehnike se uveliko preklapaju, a kod nas se trenira pretežno no-gi.",
      },
    ],
    ctaTitle: "Najbrže se uči na strunjači",
    ctaBody:
      "Pojmovi sjednu za par sedmica treninga. Prvi trening je besplatan — javi se treneru i dođi.",
  },
};

export const en: Record<InfoKey, PageContent> = {
  pricing: {
    slug: "training-prices-sarajevo",
    navLabel: "Prices",
    inNav: false,
    blocks: ["pricing"],
    metaTitle: "Prices — how much MMA and grappling training costs in Sarajevo | OCD Fighters",
    metaDescription:
      "OCD Fighters price list, Nedžarići 7, Sarajevo: 70 KM per month for one program, 100 KM for MMA and grappling together, 15 KM per single session. First session free, no joining fee.",
    keywords: [
      "MMA training price Sarajevo",
      "how much does MMA cost Sarajevo",
      "martial arts prices Sarajevo",
      "BJJ price Sarajevo",
      "gym membership Sarajevo",
      "drop in BJJ Sarajevo price",
    ],
    h1: "Training prices in Sarajevo",
    lede:
      "No hidden costs and no joining fee. You pay a membership for the program you train, or per session if a monthly rhythm doesn't suit you. Your first session is free.",
    sections: [
      {
        title: "How membership works",
        body:
          "Membership runs 30 days from the day you pay, not to the end of the calendar month. So joining mid-month costs you nothing — your period starts the day you pay. Pay early and the new period is added onto the existing one, so nothing is lost there either. You can check your status and expiry date any time in the member area.",
      },
      {
        title: "What's included",
        body:
          "Monthly membership covers every session of that program during the week — there's no per-visit charge and no cap on how often you train. For grappling that means Monday, Wednesday and Friday plus Saturday open mat; for MMA, Tuesday and Thursday. The combined membership opens every session. Access to the member portal for booking spots is included.",
      },
      {
        title: "If monthly doesn't suit you",
        body:
          "A single session (drop-in) is 15 KM, paid only when you come. That makes sense if you travel, work shifts, or are still working out how regularly you can train. The same applies to visitors from other clubs passing through Sarajevo — you're welcome at a session or at open mat.",
      },
      {
        title: "Payment",
        body:
          "Membership is paid to the coach at the gym. Every payment is recorded with its exact date, so both you and the coach always know when your membership runs to. No joining fee, no contract and no notice period — if you stop coming, the membership simply expires.",
      },
    ],
    faq: [
      {
        q: "How much does MMA training cost in Sarajevo?",
        a: "Our monthly MMA membership is 70 KM and covers every MMA session that week. If you want both MMA and grappling, the combined membership is 100 KM per month. A single session is 15 KM.",
      },
      {
        q: "Is there a joining or registration fee?",
        a: "No. You pay only the monthly membership or per session. No joining fee, no registration cost and no required contract.",
      },
      {
        q: "Is the first session really free?",
        a: "Yes. You come, train the full session and pay nothing, with no obligation to continue. Just message the coach beforehand so we know to expect you.",
      },
      {
        q: "Can I pay per session instead of monthly?",
        a: "You can — drop-in is 15 KM per session. If you come more than about five times a month, the monthly membership works out better.",
      },
      {
        q: "Do I need to buy gear straight away?",
        a: "No. Sportswear and a water bottle are enough to start. You buy gear once you're sure you're staying, and the coach will tell you what's actually needed.",
      },
    ],
    ctaTitle: "Come and see for yourself",
    ctaBody:
      "The first session is free and commits you to nothing. Message the coach to arrange a time.",
  },

  schedule: {
    slug: "training-schedule-sarajevo",
    navLabel: "Schedule",
    inNav: false,
    blocks: ["timetable"],
    metaTitle: "Training schedule — MMA, grappling and BJJ in Sarajevo | OCD Fighters",
    metaDescription:
      "Weekly training schedule at OCD Fighters, Nedžarići 7, Sarajevo. Morning and evening sessions, beginner and advanced groups, a women's session and Saturday open mat.",
    keywords: [
      "training schedule Sarajevo",
      "MMA class times Sarajevo",
      "BJJ schedule Sarajevo",
      "evening martial arts Sarajevo",
      "morning training Sarajevo",
      "open mat Sarajevo",
    ],
    h1: "Training schedule",
    lede:
      "We train Monday to Saturday, mornings and evenings, in groups split by level. The full weekly schedule is below, with today highlighted.",
    sections: [
      {
        title: "How the week is set up",
        body:
          "The week splits into two patterns. Monday, Wednesday and Friday are grappling days; Tuesday and Thursday are MMA days. Both have a 09:30 morning session for those working afternoons or training professionally, an advanced group at 18:00 and a beginner group at 20:00. Saturday is open mat, 10:00 to 12:00 — an informal session with no structured class.",
      },
      {
        title: "Which session is for you",
        body:
          "If you've never trained, you want the 20:00 session — slower pace, focused on technique, no hard sparring. The 18:00 advanced group assumes you know the basics and are ready to spar. The morning session is open to both levels but tends to be more intense, since experienced members train then. If you're unsure, ask the coach before you come.",
      },
      {
        title: "Women's session",
        body:
          "Monday, Wednesday and Friday from 16:45 to 17:45 we run a closed women's jiu-jitsu session led by coach Dalila. It sits deliberately before the evening groups and is for women only, at any experience level.",
      },
      {
        title: "Booking",
        body:
          "Regular sessions from the schedule need no booking — you just turn up. For special sessions the coach posts in the member portal, places are limited, so you sign up in advance in the member area. You can also request a private session there.",
      },
    ],
    faq: [
      {
        q: "Do I need to book before coming to a session?",
        a: "Not for regular sessions. For your first visit it's good to message the coach so we expect you and someone can walk you through the basics.",
      },
      {
        q: "What is open mat?",
        a: "An informal session on Saturdays, 10:00 to 12:00, with no structured class. People drill what they want and roll freely. It's a good entry point for complete beginners since there's no class to keep up with.",
      },
      {
        q: "Do you train at weekends?",
        a: "Saturdays, yes — open mat from 10:00 to 12:00. We don't train on Sundays.",
      },
      {
        q: "Can I attend both MMA and grappling sessions?",
        a: "Yes, with the combined membership at 100 KM per month, which opens every session in the week.",
      },
    ],
    ctaTitle: "Pick a session and get in touch",
    ctaBody:
      "Not sure which session suits you? Message the coach on WhatsApp with when you're free and they'll suggest a group.",
  },

  location: {
    slug: "martial-arts-gym-nedzarici-sarajevo",
    navLabel: "Location",
    inNav: false,
    blocks: ["map"],
    metaTitle: "Martial arts gym in Nedžarići, Sarajevo — MMA and grappling | OCD Fighters",
    metaDescription:
      "OCD Fighters is in Nedžarići, Sarajevo (Nedžarići 7), close to Alipašino Polje, Dobrinja, Stup, Mojmilo and Aerodromsko naselje. Map, directions and contact.",
    keywords: [
      "martial arts gym Nedžarići",
      "MMA gym Sarajevo Novi Grad",
      "BJJ gym near me Sarajevo",
      "martial arts Alipašino Polje",
      "MMA Dobrinja",
      "gym Stup Sarajevo",
    ],
    h1: "Martial arts gym in Nedžarići",
    lede:
      "Our gym is at Nedžarići 7, in the Novi Grad municipality of Sarajevo. There's a map and a directions button below — if it's your first visit, following the route straight to the address is easiest.",
    sections: [
      {
        title: "Where exactly we are",
        body:
          "Nedžarići 7, Sarajevo. Nedžarići is a neighbourhood in Novi Grad municipality, along Bulevar Meše Selimovića between Alipašino Polje and Stup. If the address doesn't mean much to you, use the directions button below — it opens navigation straight to the gym.",
      },
      {
        title: "Where our members come from",
        body:
          "Being on a main road makes us equally reachable from several neighbourhoods: Alipašino Polje, Dobrinja, Stup, Mojmilo, Aerodromsko naselje, Otoka and Ilidža. For most of those it's a short drive or a few stops on public transport, and from the closer ones it's walkable.",
      },
      {
        title: "Student halls",
        body:
          "The student halls in Nedžarići are in the same neighbourhood, within walking distance of the gym. For students living there, training is closer than at any other martial arts club in the city.",
      },
      {
        title: "When to come first",
        body:
          "The easiest first visit is the 20:00 beginner session or Saturday open mat at 10:00. Arrive about fifteen minutes early so you can meet the coach and look around before the session starts.",
      },
    ],
    faq: [
      {
        q: "What is the exact address?",
        a: "Nedžarići 7, Sarajevo, Novi Grad municipality. This page has a map and a button that opens navigation to the gym.",
      },
      {
        q: "Which neighbourhoods are nearby?",
        a: "Alipašino Polje, Dobrinja, Stup, Mojmilo, Aerodromsko naselje, Otoka and Ilidža — all a short drive or a few stops on public transport.",
      },
      {
        q: "Is there parking?",
        a: "Members generally park close to the gym. If you're coming to an evening session, allow an extra minute or two to find a space.",
      },
      {
        q: "How do I find you on a first visit?",
        a: "Use the directions button on this page — it takes you to the address. If you get stuck, call the coach or message on WhatsApp.",
      },
    ],
    ctaTitle: "Drop by for a session",
    ctaBody:
      "The first session is free. Message the coach to arrange a time and come see the gym.",
  },

  students: {
    slug: "martial-arts-for-students-sarajevo",
    navLabel: "Students",
    inNav: false,
    metaTitle: "Martial arts for students in Sarajevo — MMA and grappling | OCD Fighters",
    metaDescription:
      "MMA and grappling for students in Sarajevo. The gym is in Nedžarići, walking distance from the student halls. Evening sessions after lectures, first session free.",
    keywords: [
      "sport for students Sarajevo",
      "MMA for students Sarajevo",
      "gym near student halls Sarajevo",
      "martial arts Nedžarići students",
      "training for students Sarajevo",
    ],
    h1: "Martial arts for students in Sarajevo",
    lede:
      "The gym is in Nedžarići, walking distance from the student halls. Sessions run mornings and evenings so they fit around lectures — and if your schedule is unpredictable, you can pay per session.",
    sections: [
      {
        title: "It's close, and that's half the battle",
        body:
          "The most common reason people stop training isn't cost, it's the journey. If the gym is fifteen minutes away, you go even on the days you don't feel like it. The student halls in Nedžarići are in the same neighbourhood as our gym, so for students living there that problem effectively doesn't exist.",
      },
      {
        title: "Sessions around lectures",
        body:
          "Evening groups start at 18:00 and 20:00, leaving the whole day free. The 09:30 morning session works if your lectures start in the afternoon. Saturday is open mat, 10:00 to 12:00. No advance booking for regular sessions — you come when you can.",
      },
      {
        title: "If your semester is unpredictable",
        body:
          "Exam periods can swallow three weeks. That's what the 15 KM single session is for — you pay only when you come, so there's no sense paying a monthly membership for a period you know you'll miss. When your rhythm returns, switching to monthly is one conversation with the coach.",
      },
      {
        title: "Why grappling and MMA rather than a gym",
        body:
          "In a gym you train alone next to other people; here you train with them. For someone who moved to Sarajevo to study, that's the difference between knowing nobody and knowing thirty people after two months. Conditioning comes along the way rather than being the goal itself.",
      },
    ],
    faq: [
      {
        q: "How far is the club from the student halls in Nedžarići?",
        a: "The gym and the halls are in the same neighbourhood, within walking distance. You can open the exact route from our location page.",
      },
      {
        q: "Is there a student discount?",
        a: "Prices are the same for everyone: 70 KM per month for one program, 100 KM for both, or 15 KM per single session. For students the drop-in is often the most practical option during exam periods.",
      },
      {
        q: "Can I train with no previous experience?",
        a: "Yes. Beginner groups run at 20:00 and everyone there started from zero. No prior experience or particular fitness is expected.",
      },
      {
        q: "What if I go home over the summer?",
        a: "Membership runs from the date you pay and doesn't auto-renew, so it simply lapses. When you're back, you pick up again with no procedure.",
      },
    ],
    ctaTitle: "Your first session is free",
    ctaBody:
      "Message the coach on WhatsApp, say when suits you and come try it. Nothing to pay and nothing to sign.",
  },

  glossary: {
    slug: "grappling-and-mma-glossary",
    navLabel: "Glossary",
    inNav: false,
    blocks: ["glossary"],
    metaTitle: "Grappling and MMA glossary — guard, tap, sweep explained | OCD Fighters",
    metaDescription:
      "Plain explanations of the core grappling, Brazilian jiu-jitsu and MMA terms: guard, mount, tap, sweep, pass, submissions, chokes, open mat, no-gi and more.",
    keywords: [
      "grappling terms explained",
      "BJJ glossary",
      "what does tap mean BJJ",
      "what is guard jiu jitsu",
      "MMA terms explained",
      "no-gi meaning",
      "open mat meaning",
    ],
    h1: "Grappling and MMA glossary",
    lede:
      "In your first weeks you'll hear a lot of terms nobody stops to explain. Here's what they mean — so you don't have to ask mid-round.",
    sections: [
      {
        title: "Why the terms stay in English",
        body:
          "Grappling and Brazilian jiu-jitsu reached this region through English, and positions and techniques have established names that everyone recognises regardless of language. Translating them would be accurate but useless — at a seminar or competition you'll hear \"mount\" and \"sweep\", not a local equivalent. So the original names stick.",
      },
    ],
    glossary: [
      { term: "Guard", def: "The position where you're on your back using your legs to control an opponent in front of you. Unlike most sports, being on your back in jiu-jitsu isn't losing — you attack, sweep and finish from guard." },
      { term: "Mount", def: "Sitting on your opponent's chest. One of the most dominant positions in grappling and the most uncomfortable to be under." },
      { term: "Side control", def: "Controlling from the side, lying across an opponent who is on their back. A stable position that leads easily to mount or a submission." },
      { term: "Back control", def: "Controlling from behind with hooks around the opponent's hips. The best position in the sport — it opens the rear naked choke and your opponent can't see you." },
      { term: "Tap", def: "Submitting. You tap your partner or the mat two or three times and the technique stops immediately. Tapping isn't defeat, it's the basic safety rule — you tap early and without ego." },
      { term: "Roll", def: "Sparring in grappling. Two people working at full or partial intensity, with real resistance, under control." },
      { term: "Drill", def: "Repeating a technique with a partner who doesn't fully resist, until the movement becomes automatic." },
      { term: "Sweep", def: "Reversing an opponent from the bottom so you end up on top. How guard turns into an advantage." },
      { term: "Guard pass", def: "Getting past an opponent's legs to reach side control or mount. One of the most important skills in grappling." },
      { term: "Escape", def: "Getting out of a bad position — from under mount or side control, or out of a choke. Beginners spend most of their time here." },
      { term: "Submission", def: "A technique that ends the fight: a joint lock or choke, after which the opponent taps." },
      { term: "Joint lock", def: "A technique that takes a joint beyond its natural range — usually elbow, shoulder or knee. Applied slowly and released on the first tap." },
      { term: "Choke", def: "A technique that cuts blood flow to the brain or air to the lungs. A properly applied blood choke is fast and painless, which is why you tap straight away." },
      { term: "Armbar", def: "An elbow lock applied with the legs across the opponent's chest. Probably the best-known submission in jiu-jitsu." },
      { term: "Kimura", def: "A shoulder lock using a figure-four grip on the wrist. Named after Masahiko Kimura, the judoka who used it against Hélio Gracie." },
      { term: "Triangle", def: "A choke with the legs, trapping the opponent's neck and one arm in a triangle." },
      { term: "RNC (rear naked choke)", def: "A choke from back control using only the arms. The most common finish in MMA." },
      { term: "Takedown", def: "Putting an opponent from standing onto the mat. It comes from wrestling and in MMA often decides who dictates the fight." },
      { term: "Sprawl", def: "Takedown defence — throwing your legs back and dropping your hips onto an opponent shooting for them." },
      { term: "Clinch", def: "Close-range fighting from standing, gripping the neck, arms or body. The space between striking and wrestling." },
      { term: "No-gi", def: "Training without a kimono, in shorts and a close-fitting top. No fabric grips, faster pace. Our regular program is mostly no-gi." },
      { term: "Gi (kimono)", def: "The classic Brazilian jiu-jitsu uniform. Grips on sleeve, lapel and belt open techniques that don't exist in no-gi." },
      { term: "Rashguard", def: "A close-fitting top for no-gi training. It protects the skin from mat friction and stays in place while rolling." },
      { term: "Open mat", def: "An informal session with no structured class. You come, drill what you like and roll freely. Ours is Saturdays, 10:00 to 12:00." },
      { term: "Shrimping", def: "The basic hip movement along the mat that creates space to escape a position. One of the first things you learn and one you never stop practising." },
      { term: "Ground and pound", def: "Striking an opponent from a dominant position on the ground. It exists in MMA, not in grappling." },
      { term: "Belts", def: "Rank in Brazilian jiu-jitsu: white, blue, purple, brown and black. Progress is slow — black belt typically takes ten years or more." },
    ],
    faq: [
      {
        q: "Do I need to know these terms before my first session?",
        a: "No. The coach demonstrates everything, and you pick the names up within a few weeks. This page exists to speed that up, not to be a prerequisite.",
      },
      {
        q: "What does it mean when someone says they tapped?",
        a: "That they submitted, by tapping their partner or the mat. It's a normal, everyday part of training — everyone taps, coaches included.",
      },
      {
        q: "What's the difference between grappling and jiu-jitsu?",
        a: "Brazilian jiu-jitsu is classically trained in a kimono, grappling without one. The techniques overlap heavily, and we train mostly no-gi.",
      },
    ],
    ctaTitle: "It sinks in fastest on the mat",
    ctaBody:
      "The terms settle after a couple of weeks of training. The first session is free — message the coach and come along.",
  },
};
