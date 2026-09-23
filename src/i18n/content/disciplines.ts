// Content for the per-discipline landing pages.
//
// Each discipline gets its own URL because a single page cannot realistically
// rank for "mma sarajevo", "grappling sarajevo" and "brazilska jiu-jitsa
// sarajevo" at once — search engines rank *pages*, not sites, and a page that
// tries to be about everything reads as being about nothing in particular.
//
// The copy is deliberately specific and honest. Note the MMA entry: striking
// (boks / kickboks) is described as a component of MMA training, which is what
// the club actually teaches. That wording legitimately reaches people
// searching for boxing without claiming a standalone boxing program.

import type { PageContent } from "../pages";

export type DisciplineKey = "mma" | "grappling" | "bjj" | "women" | "beginners";

export const bs: Record<DisciplineKey, PageContent> = {
  mma: {
    slug: "mma-sarajevo",
    navLabel: "MMA",
    metaTitle: "MMA Sarajevo — treninzi mješovitih borilačkih vještina | OCD Fighters",
    metaDescription:
      "MMA treninzi u Sarajevu (Nedžarići 7) za početnike i takmičare. Hrvanje, grappling i udaračke tehnike — boks i kickboks u sklopu MMA-a. Jutarnji i večernji termini, prvi trening besplatan.",
    keywords: [
      "MMA Sarajevo",
      "MMA klub Sarajevo",
      "MMA trening Sarajevo",
      "mješovite borilačke vještine Sarajevo",
      "boks Sarajevo",
      "kickboks Sarajevo",
      "udaračke tehnike Sarajevo",
      "borilački klub Sarajevo",
      "MMA za početnike",
    ],
    h1: "MMA trening u Sarajevu",
    lede:
      "MMA je najkompletniji borilački sport — spaja udaračke tehnike, hrvanje i borbu na podu u jednu cjelinu. U OCD Fightersu treniramo sva tri segmenta, od prvog dana, u grupama podijeljenim po nivou znanja.",
    sections: [
      {
        title: "Šta obuhvata MMA trening",
        body:
          "MMA trening kod nas stoji na tri stuba. Prvi su udaračke tehnike — boks, kickboks, udarci nogama, koljenima i laktovima, rad na fokuserima i vrećama, te sparingovi u kontroliranim uvjetima. Drugi je hrvanje: obaranja, odbrana od obaranja i rad uz ogradu, dio koji najčešće odlučuje borbu. Treći je grappling i borba na podu — pozicije, prelazi, poluge i gušenja. Ne treniramo ih odvojeno kao tri različita sporta, nego ih povezujemo u prijelaze koji čine MMA onim što jeste.",
      },
      {
        title: "Boks i udaračke tehnike u sklopu MMA-a",
        body:
          "Ako te zanima boks ili kickboks, važno je da znaš kako mi radimo: klub nema zasebnu boks sekciju, ali udaračke tehnike su punopravan dio svakog MMA treninga. Učiš stav, kretanje, direkte, krošee, aperkate, odbranu i kontru — sve ono što čini temelj boksa — ali u kontekstu MMA-a, gdje moraš računati i na obaranje i na udarce nogama. Za mnoge je to potpunija škola udaranja nego čisti boks. Ako tražiš isključivo boks bez hrvanja i poda, budi slobodan/na pitati trenera — reći ćemo ti iskreno jesmo li pravo mjesto za tebe.",
      },
      {
        title: "Grupe po nivou",
        body:
          "Početnički termin (20:00–21:00, utorkom i četvrtkom) je za one koji nikada nisu trenirali — tempo je sporiji, fokus na tehnici i sigurnosti, bez teškog sparinga. Napredna grupa (18:00–19:45) radi intenzivnije, sa sparingom i pripremom za takmičenja. Jutarnji termin (09:30–11:00) je za one kojima večeri ne odgovaraju, najčešće profesionalni sportisti i oni koji rade popodne.",
      },
      {
        title: "Šta ti treba za prvi trening",
        body:
          "Sportska odjeća, patike za unutra, ručnik i flaša vode. Ništa drugo. Rukavice, štitnike i ostalu opremu ćeš nabaviti tek kad budeš siguran/na da ostaješ — trener će ti reći tačno šta i gdje, bez nametanja. Prvi trening je besplatan i bez ikakve obaveze.",
      },
    ],
    faq: [
      {
        q: "Mogu li trenirati MMA ako nikada nisam trenirao nijedan borilački sport?",
        a: "Da. Većina naših članova je počela bez ikakvog prethodnog iskustva. Početnička grupa postoji upravo zbog toga — radiš sa ljudima koji su na istom nivou, tempo je prilagođen, a sparing dolazi tek kada tehnika sjedne. Niko te neće bacati u duboku vodu.",
      },
      {
        q: "Trenirate li boks u Sarajevu?",
        a: "Nemamo zasebnu boks sekciju, ali udaračke tehnike — boks i kickboks — treniramo kao sastavni dio MMA treninga. Radiš stav, kretanje, udarce rukama i nogama, odbranu i sparing. Ako tražiš isključivo boks, javi se treneru pa ćemo ti iskreno reći odgovaramo li tvom cilju.",
      },
      {
        q: "Koliko košta MMA trening u Sarajevu?",
        a: "Mjesečna članarina za MMA je 70 KM i pokriva sve MMA treninge u sedmici. Kombinacija MMA + grappling je 100 KM mjesečno. Pojedinačni trening bez članarine je 15 KM. Prvi trening je besplatan.",
      },
      {
        q: "Koliko godina treba imati za MMA trening?",
        a: "Radimo sa punoljetnim članovima i starijim tinejdžerima uz saglasnost roditelja. Za tačne uslove po uzrastu najbolje je nazvati trenera.",
      },
      {
        q: "Moram li biti u formi prije nego počnem?",
        a: "Ne. To je najčešći razlog zbog kojeg ljudi odgađaju dolazak, i najmanje opravdan. Kondicija se gradi na treninzima — dolaziš takav kakav jesi, a tempo prilagođavaš sebi dok ne uhvatiš ritam.",
      },
    ],
    ctaTitle: "Dođi na prvi MMA trening",
    ctaBody:
      "Prvi trening je besplatan. Javi se treneru na WhatsApp ili telefon i dogovori termin koji ti odgovara.",
  },

  grappling: {
    slug: "grappling-sarajevo",
    navLabel: "Grappling",
    metaTitle: "Grappling Sarajevo — treninzi hrvanja i borbe na podu | OCD Fighters",
    metaDescription:
      "Grappling treninzi u Sarajevu (Nedžarići 7) — no-gi grappling, hrvanje, poluge i gušenja. Grupe za početnike i napredne, open mat subotom. Glavni trener crni pojas BJJ.",
    keywords: [
      "grappling Sarajevo",
      "grapling Sarajevo",
      "no-gi grappling Sarajevo",
      "hrvanje Sarajevo",
      "borba na podu Sarajevo",
      "submission wrestling Sarajevo",
      "grappling klub Sarajevo",
      "grappling za početnike",
    ],
    h1: "Grappling trening u Sarajevu",
    lede:
      "Grappling je borba bez udaraca — obaranja, kontrola, poluge i gušenja. Sport u kojem tehnika redovno pobjeđuje snagu, i vjerovatno najbrži način da naučiš kontrolirati nekoga ko je veći od tebe.",
    sections: [
      {
        title: "Šta je grappling",
        body:
          "Grappling obuhvata sve načine borbe u kojima nema udaraca: obaranje protivnika, zadržavanje dominantne pozicije, te završnice polugama i gušenjima. Mi treniramo pretežno no-gi — bez kimona, u kratkim hlačama i rashguardu — što je varijanta najbliža MMA-u i najčešća na takmičenjima u regiji. Elementi dolaze iz brazilske jiu-jitse, slobodnog i grčko-rimskog hrvanja te sambo škole.",
      },
      {
        title: "Zašto grappling prije svega ostalog",
        body:
          "Grappling ima nešto što malo koji sport ima: možeš trenirati punim intenzitetom, svaki dan, bez primanja udaraca u glavu. To znači da napreduješ brzo i da su povrede rjeđe nego u udaračkim sportovima. Uz to, sparing (\"roll\") je od prvih sedmica realan — ne čekaš mjesecima da probaš ono što si naučio/la.",
      },
      {
        title: "Raspored grappling treninga",
        body:
          "Grappling se trenira ponedjeljkom, srijedom i petkom. Napredna grupa radi od 18:00 do 19:45, početnička od 20:00 do 21:00. Jutarnji termin od 09:30 do 11:00 kombinuje grappling i MMA. Subotom od 10:00 do 12:00 je open mat — otvoreni termin bez formalnog časa, gdje se radi slobodno, ponavlja tehnika i rola po volji. Open mat je odličan prvi dolazak ako želiš samo vidjeti kako izgleda.",
      },
      {
        title: "Vodi te crni pojas",
        body:
          "Glavni trener Namik Alibašić nosilac je crnog pojasa u brazilskoj jiu-jitsi. To u praksi znači da ono što učiš nije prepričano s interneta — nego provjereno kroz godine treninga i takmičenja, i objašnjeno tako da razumiješ zašto tehnika radi, a ne samo kojim redoslijedom ide.",
      },
    ],
    faq: [
      {
        q: "Koja je razlika između grapplinga i BJJ-a?",
        a: "Brazilska jiu-jitsa se klasično trenira u kimonu (gi), gdje se hvataju rukavi, reveri i pojas. Grappling se trenira bez kimona (no-gi), pa su hvatovi za tijelo i tempo brži. Tehnike se uveliko preklapaju — ko trenira jedno, lako ulazi u drugo. Mi radimo pretežno no-gi.",
      },
      {
        q: "Treba li mi kimono za grappling trening?",
        a: "Ne. Za no-gi trening dovoljne su kratke hlače bez džepova i zatvarača te majica pripijena uz tijelo (rashguard ili obična sportska majica). Za prvi trening je bilo šta sportsko sasvim u redu.",
      },
      {
        q: "Je li grappling opasan?",
        a: "Manje nego većina borilačkih sportova, upravo zato što nema udaraca u glavu. Poluge i gušenja se u treningu izvode kontrolirano — partner kucne (tap) i tehnika odmah prestaje. Disciplina oko tapa je nešto na čemu inzistiramo od prvog dana.",
      },
      {
        q: "Koliko košta grappling u Sarajevu?",
        a: "Mjesečna članarina za grappling je 70 KM i pokriva sve grappling treninge u sedmici. MMA + grappling zajedno je 100 KM mjesečno, a pojedinačni trening 15 KM. Prvi dolazak je besplatan.",
      },
      {
        q: "Mogu li doći na open mat ako sam potpuni početnik?",
        a: "Možeš, i to je često najbezbolniji prvi korak. Subotom od 10 do 12 nema formalnog časa — dođeš, pogledaš, neko od članova te provede kroz osnove. Bez pritiska da moraš odmah rolati.",
      },
    ],
    ctaTitle: "Probaj grappling besplatno",
    ctaBody:
      "Dođi na trening ili na subotnji open mat. Prvi dolazak ne plaćaš — javi se treneru da znamo da dolaziš.",
  },

  bjj: {
    slug: "brazilska-jiu-jitsa-sarajevo",
    navLabel: "BJJ",
    metaTitle: "Brazilska jiu-jitsa (BJJ) Sarajevo — trener crni pojas | OCD Fighters",
    metaDescription:
      "BJJ i brazilska jiu-jitsa u Sarajevu (Nedžarići 7). Treninzi pod vodstvom crnog pojasa Namika Alibašića, za početnike i napredne. Poseban BJJ program za žene.",
    keywords: [
      "BJJ Sarajevo",
      "brazilska jiu-jitsa Sarajevo",
      "brazilski jiu jitsu Sarajevo",
      "džiu džicu Sarajevo",
      "jiu jitsu Sarajevo",
      "BJJ klub Sarajevo",
      "crni pojas BJJ Sarajevo",
    ],
    h1: "Brazilska jiu-jitsa (BJJ) u Sarajevu",
    lede:
      "Brazilska jiu-jitsa je vještina borbe na podu zasnovana na poluzi, uglu i tajmingu — ideji da manji i slabiji čovjek može kontrolirati jačeg ako zna šta radi. Kod nas je vodi trener s crnim pojasom.",
    sections: [
      {
        title: "Šta ćeš naučiti",
        body:
          "BJJ počinje od pozicija: kako doći u dominantnu poziciju, kako je zadržati i kako izaći iz loše. Tek onda dolaze završnice — poluge na lakat, rame i koljeno te gušenja. Naučit ćeš gardu i prolaz garde, escape iz mounta i side controla, obaranja i, jednako važno, kako se sigurno kretati pod težinom protivnika bez panike. To zadnje je ono što najviše mijenja ljude izvan sale.",
      },
      {
        title: "Ko predaje",
        body:
          "Glavni trener Namik Alibašić nosilac je crnog pojasa u brazilskoj jiu-jitsi — najviši pojas u sportu, koji se stiče nakon niza godina treninga, takmičenja i predavanja. U Bosni i Hercegovini crnih pojaseva nema mnogo, i to je razlika koju osjetiš u kvalitetu objašnjenja: ne dobiješ samo korake tehnike, nego razlog zbog kojeg funkcioniše i šta da radiš kada protivnik reaguje drugačije.",
      },
      {
        title: "Gi i no-gi",
        body:
          "Klasična BJJ se trenira u kimonu (gi), gdje hvatovi za tkaninu otvaraju cijeli arsenal kontrole i gušenja. Naš redovni program je pretežno no-gi — bez kimona, bliže MMA-u i bržeg tempa. Tehnički se to dvoje uveliko preklapa, a znanje se prenosi u oba smjera. Ako te posebno zanima gi trening, pitaj trenera za aktuelne termine.",
      },
      {
        title: "BJJ za žene",
        body:
          "Ponedjeljkom, srijedom i petkom od 16:45 do 17:45 vodimo poseban termin jiu-jitse za žene pod vodstvom trenerice Dalile. Grupa je zatvorena, atmosfera mirna, a nivo iskustva nebitan — dolaze i one koje nikada ništa nisu trenirale. Više o tome na stranici programa za žene.",
      },
    ],
    faq: [
      {
        q: "Šta znači crni pojas u brazilskoj jiu-jitsi?",
        a: "To je najviši pojas u sportu i u prosjeku se stiče nakon deset i više godina redovnog treninga, kroz bijeli, plavi, ljubičasti i smeđi pojas. Za razliku od nekih borilačkih vještina, u BJJ-u se pojasevi dodjeljuju sporo i strogo, pa crni pojas stvarno znači vrhunsko poznavanje sporta.",
      },
      {
        q: "Kako se piše — jiu jitsu, džiu džicu ili jiu-jitsa?",
        a: "Sve to se odnosi na isti sport. Zvanično je brazilska jiu-jitsa (skraćeno BJJ), ali ljudi ga traže i kao jiu jitsu, džiu džicu ili brazilski džijudžicu. Ako si tražio/la bilo koji od tih pojmova u Sarajevu — na pravom si mjestu.",
      },
      {
        q: "Mogu li trenirati BJJ bez ikakvog iskustva?",
        a: "Da, i tako počinju gotovo svi. Početnička grupa radi sporijim tempom, s fokusom na osnovne pozicije i sigurno kretanje. Ne postoji nivo forme ili znanja koji se očekuje unaprijed.",
      },
      {
        q: "Koliko treninga sedmično je dovoljno za napredak?",
        a: "Dva puta sedmično daju stabilan, vidljiv napredak. Tri i više ubrzavaju stvari osjetno. Najvažnija je ipak redovnost tokom mjeseci — u BJJ-u napreduje onaj ko dolazi konstantno, ne onaj ko odradi jednu intenzivnu sedmicu pa nestane.",
      },
    ],
    ctaTitle: "Prvi BJJ trening je besplatan",
    ctaBody:
      "Dogovori termin s trenerom — dođi, pogledaj salu i odradi trening bez obaveze.",
  },

  women: {
    slug: "borilacke-vjestine-za-zene-sarajevo",
    navLabel: "Za žene",
    metaTitle: "Borilačke vještine za žene Sarajevo — jiu-jitsa i samoodbrana | OCD Fighters",
    metaDescription:
      "Treninzi jiu-jitse i samoodbrane za žene u Sarajevu (Nedžarići 7). Zatvorena grupa pod vodstvom trenerice Dalile, utorkom, četvrtkom i petkom. Za sve nivoe, bez prethodnog iskustva.",
    keywords: [
      "borilačke vještine za žene Sarajevo",
      "samoodbrana za žene Sarajevo",
      "jiu-jitsa za žene Sarajevo",
      "ženski borilački klub Sarajevo",
      "BJJ za žene Sarajevo",
      "trening za žene Sarajevo",
      "grappling za žene",
    ],
    h1: "Borilačke vještine za žene u Sarajevu",
    lede:
      "Poseban termin jiu-jitse za žene, u zatvorenoj grupi, pod vodstvom trenerice Dalile. Bez potrebe za prethodnim iskustvom i bez atmosfere u kojoj se moraš nekome dokazivati.",
    sections: [
      {
        title: "Kako izgleda trening",
        body:
          "Trening traje sat vremena i vodi ga trenerica Dalila. Počinje zagrijavanjem i kretanjem po strunjači, zatim ide tehnika dana — pozicije, izlasci iz nepovoljnih pozicija, poluge i gušenja — i završava laganim radom s partnericom. Tempo određuje grupa, ne obrnuto. Nema udaranja i nema prisile na sparing prije nego što se osjećaš spremno.",
      },
      {
        title: "Zašto baš jiu-jitsa za samoodbranu",
        body:
          "Realni napad na ženu najčešće završi u klinču ili na podu, gdje razlika u snazi dolazi do punog izražaja — a upravo je to teren za koji je jiu-jitsa napravljena. Učiš kako ne paničiti pod težinom, kako stvoriti prostor, izaći i ustati, te kako kontrolirati napadača dugo dovoljno da pobjegneš. To je konkretna vještina, a ne osjećaj sigurnosti bez pokrića.",
      },
      {
        title: "Zatvorena grupa",
        body:
          "Termin je namijenjen isključivo ženama i odvija se u privatnijem okruženju, upravo zato što je to mnogima uslov da uopće probaju. Dolaze žene svih uzrasta i nivoa forme — studentice, majke, žene koje se nikada nisu bavile sportom. Niko nije počeo znajući išta.",
      },
      {
        title: "Termini",
        body:
          "Ponedjeljak, srijeda i petak od 16:45 do 17:45. Termin je namjerno popodnevni, prije večernjih grupa, da se uklopi između posla i večeri. Članice koje žele trenirati i više mogu se priključiti redovnim grappling terminima.",
      },
    ],
    faq: [
      {
        q: "Nikada nisam trenirala ništa. Mogu li doći?",
        a: "Da — grupa je upravo za to i napravljena. Većina žena koje dolaze nije imala nikakvo sportsko iskustvo prije prvog treninga. Prvi dolazak je uglavnom gledanje i osnovno kretanje, ništa naporno ni neugodno.",
      },
      {
        q: "Treniraju li muškarci u isto vrijeme?",
        a: "Ženski termin je zatvorena grupa i vodi ga trenerica. Zato je i postavljen u 16:45, prije nego što počnu redovne večernje grupe.",
      },
      {
        q: "Šta da obučem za prvi trening?",
        a: "Sportska odjeća u kojoj se možeš slobodno kretati — helanke ili kratke hlače i pripijena majica. Bez nakita, i ponesi flašu vode. Trenira se bosih nogu na strunjači.",
      },
      {
        q: "Hoću li morati da se borim s nekim?",
        a: "Ne prije nego što to sama poželiš. Sparing u jiu-jitsi je kontrolisan i dobrovoljan, a u ženskoj grupi se uvodi postepeno, tek kada osnovne tehnike sjednu.",
      },
      {
        q: "Koliko košta trening za žene?",
        a: "Vrijedi ista cjenovna lista kao za ostale programe — 70 KM mjesečno, odnosno 15 KM za pojedinačni trening. Prvi trening je besplatan.",
      },
    ],
    ctaTitle: "Dođi na prvi trening",
    ctaBody:
      "Javi se treneru na WhatsApp — dovoljno je da napišeš da te zanima ženski termin i dobit ćeš sve informacije.",
  },

  beginners: {
    slug: "borilacki-klub-za-pocetnike-sarajevo",
    navLabel: "Za početnike",
    metaTitle: "Borilački klub za početnike Sarajevo — prvi trening besplatan | OCD Fighters",
    metaDescription:
      "Počni trenirati borilačke vještine u Sarajevu bez ikakvog iskustva. Početničke grupe za MMA i grappling, Nedžarići 7. Prvi trening je besplatan, bez opreme i bez obaveze.",
    keywords: [
      "borilački klub Sarajevo",
      "borilačke vještine Sarajevo",
      "borilački sportovi Sarajevo",
      "MMA za početnike Sarajevo",
      "grappling za početnike Sarajevo",
      "trening borilačkih vještina za početnike",
      "gdje trenirati borilačke vještine u Sarajevu",
    ],
    h1: "Borilačke vještine za početnike u Sarajevu",
    lede:
      "Nikad nisi trenirao ili trenirala? To je najčešća polazna tačka naših članova, a ne prepreka. Imamo posebne početničke grupe za MMA i grappling, s tempom prilagođenim ljudima koji počinju od nule.",
    sections: [
      {
        title: "Kako izgleda prvi dolazak",
        body:
          "Dođeš petnaestak minuta ranije, upoznaš trenera i pogledaš salu. Trening počinje zagrijavanjem, zatim ide tehnika dana — pokazano polako i ponavljano s partnerom — i završava laganim radom. Na prvom treningu ne ideš u sparing. Gotovo sigurno nešto nećeš uspjeti izvesti kako treba, i to je potpuno očekivano; niko te ne gleda, svi su prošli isti prvi dan.",
      },
      {
        title: "Početničke grupe",
        body:
          "Grappling za početnike: ponedjeljak, srijeda i petak od 20:00 do 21:00. MMA za početnike: utorak i četvrtak od 20:00 do 21:00. Kasni termin je namjeran — da stigneš nakon posla. Kada tehnika sjedne, prelazak u naprednu grupu ide prirodno, po dogovoru s trenerom, bez ispita i bez roka.",
      },
      {
        title: "Šta ti ne treba",
        body:
          "Ne treba ti oprema — dovoljna je sportska odjeća i flaša vode. Ne treba ti kondicija, jer se ona gradi na treningu. Ne treba ti iskustvo iz drugog sporta. I ne treba ti odluka o članarini prije nego probaš: prvi trening je besplatan i ne obavezuje te ni na šta.",
      },
      {
        title: "Koji sport odabrati",
        body:
          "Ako nisi siguran/na, najjednostavnije pravilo: grappling ako te ne zanima primanje udaraca i želiš najbrži tehnički napredak, MMA ako te zanima cjelovita borba uključujući udaračke tehnike. Mnogi treniraju oba — kombinovana članarina i postoji zbog toga. Ako ni to ne pomaže, dođi jednom na svaki pa odluči.",
      },
    ],
    faq: [
      {
        q: "Star sam / stara sam preko 30. Je li kasno da počnem?",
        a: "Nije. Znatan dio naših članova počeo je nakon tridesete, a grappling i jiu-jitsa su sportovi u kojima se uspješno napreduje i mnogo kasnije. Tempo prilagođavaš sebi, a ne obrnuto.",
      },
      {
        q: "Šta ako sam potpuno van forme?",
        a: "Onda si na pravom mjestu, jer se forma ovdje i stiče. Na prvim treninzima ćeš stajati i disati kad ti zatreba — to niko ne komentariše. Nakon nekoliko sedmica razlika je osjetna.",
      },
      {
        q: "Je li prvi trening zaista besplatan?",
        a: "Jeste, i bez ikakve obaveze da nastaviš. Samo javi treneru da dolaziš kako bismo znali da te očekujemo.",
      },
      {
        q: "Gdje se nalazi sala?",
        a: "Nedžarići 7, Sarajevo. Na stranici lokacije imaš mapu i dugme za navigaciju do sale.",
      },
      {
        q: "Koliko košta članarina?",
        a: "70 KM mjesečno za jedan program (MMA ili grappling), 100 KM za oba, ili 15 KM po pojedinačnom treningu ako ne želiš mjesečnu članarinu.",
      },
    ],
    ctaTitle: "Počni ove sedmice",
    ctaBody:
      "Najteži je jedino prvi dolazak. Javi se treneru na WhatsApp i dogovori termin — dalje ide samo.",
  },
};

export const en: Record<DisciplineKey, PageContent> = {
  mma: {
    slug: "mma-sarajevo",
    navLabel: "MMA",
    metaTitle: "MMA Sarajevo — mixed martial arts training | OCD Fighters",
    metaDescription:
      "MMA training in Sarajevo (Nedžarići 7) for beginners and competitors. Wrestling, grappling and striking — boxing and kickboxing as part of MMA. Morning and evening sessions, first class free.",
    keywords: [
      "MMA Sarajevo",
      "MMA club Sarajevo",
      "MMA training Sarajevo",
      "mixed martial arts Sarajevo",
      "boxing Sarajevo",
      "kickboxing Sarajevo",
      "martial arts club Sarajevo",
      "MMA for beginners",
    ],
    h1: "MMA training in Sarajevo",
    lede:
      "MMA is the most complete combat sport — striking, wrestling and ground fighting in one. At OCD Fighters we train all three from day one, in groups split by experience level.",
    sections: [
      {
        title: "What MMA training covers",
        body:
          "Our MMA training rests on three pillars. First, striking — boxing, kickboxing, kicks, knees and elbows, pad and bag work, and controlled sparring. Second, wrestling: takedowns, takedown defence and work against the cage, the part that most often decides a fight. Third, grappling and ground work — positions, transitions, submissions and chokes. We don't train them as three separate sports but connect them through the transitions that make MMA what it is.",
      },
      {
        title: "Boxing and striking within MMA",
        body:
          "If you're looking for boxing or kickboxing, here's how we work: the club has no standalone boxing section, but striking is a full part of every MMA session. You'll learn stance, movement, jabs, hooks, uppercuts, defence and counters — the foundations of boxing — but in an MMA context, where you also have to account for takedowns and kicks. For many that's a more complete striking education than boxing alone. If you specifically want boxing with no wrestling or ground work, ask the coach and we'll tell you honestly whether we're the right fit.",
      },
      {
        title: "Groups by level",
        body:
          "The beginner session (20:00–21:00, Tuesday and Thursday) is for people who have never trained — slower pace, focus on technique and safety, no hard sparring. The advanced group (18:00–19:45) trains harder, with sparring and competition preparation. The morning session (09:30–11:00) suits those who can't make evenings, mostly professional athletes and people working afternoons.",
      },
      {
        title: "What to bring to your first session",
        body:
          "Sports clothing, indoor trainers, a towel and a water bottle. Nothing else. Gloves, guards and the rest can wait until you're sure you're staying — the coach will tell you exactly what and where, with no pressure. Your first session is free and carries no obligation.",
      },
    ],
    faq: [
      {
        q: "Can I train MMA with no combat sports experience at all?",
        a: "Yes. Most of our members started with none. That's exactly why the beginner group exists — you train alongside people at the same level, the pace is adjusted, and sparring only comes once your technique settles. Nobody gets thrown in at the deep end.",
      },
      {
        q: "Do you teach boxing in Sarajevo?",
        a: "We don't run a separate boxing section, but striking — boxing and kickboxing — is a core part of MMA training here. You'll work stance, movement, punches, kicks, defence and sparring. If you want boxing only, contact the coach and we'll tell you honestly whether we suit your goal.",
      },
      {
        q: "How much does MMA training cost in Sarajevo?",
        a: "Monthly MMA membership is 70 KM and covers every MMA session that week. MMA plus grappling is 100 KM per month. A single drop-in session is 15 KM. Your first session is free.",
      },
      {
        q: "Do I need to be fit before I start?",
        a: "No. That's the most common reason people delay starting, and the least justified. Conditioning is built in training — you come as you are and set your own pace until you find the rhythm.",
      },
    ],
    ctaTitle: "Come to your first MMA session",
    ctaBody:
      "The first session is free. Message the coach on WhatsApp or call to arrange a time that works for you.",
  },

  grappling: {
    slug: "grappling-sarajevo",
    navLabel: "Grappling",
    metaTitle: "Grappling Sarajevo — no-gi grappling and wrestling | OCD Fighters",
    metaDescription:
      "Grappling training in Sarajevo (Nedžarići 7) — no-gi grappling, wrestling, submissions and chokes. Beginner and advanced groups, open mat on Saturdays. Head coach is a BJJ black belt.",
    keywords: [
      "grappling Sarajevo",
      "no-gi grappling Sarajevo",
      "wrestling Sarajevo",
      "submission wrestling Sarajevo",
      "grappling club Sarajevo",
      "grappling for beginners",
      "ground fighting Sarajevo",
    ],
    h1: "Grappling training in Sarajevo",
    lede:
      "Grappling is fighting without strikes — takedowns, control, submissions and chokes. A sport where technique regularly beats strength, and probably the fastest way to learn to control someone bigger than you.",
    sections: [
      {
        title: "What grappling is",
        body:
          "Grappling covers every form of fighting without strikes: taking an opponent down, holding a dominant position, and finishing with submissions and chokes. We train mostly no-gi — no kimono, just shorts and a rashguard — the variant closest to MMA and the most common at competitions in the region. The techniques draw on Brazilian jiu-jitsu, freestyle and Greco-Roman wrestling, and sambo.",
      },
      {
        title: "Why grappling first",
        body:
          "Grappling has something few sports do: you can train at full intensity, every day, without taking shots to the head. That means fast progress and fewer injuries than striking sports. Sparring — rolling — is also realistic from the first weeks, so you're not waiting months to use what you've learned.",
      },
      {
        title: "Grappling schedule",
        body:
          "Grappling runs Monday, Wednesday and Friday. The advanced group trains 18:00–19:45, beginners 20:00–21:00. The morning session, 09:30–11:00, combines grappling and MMA. Saturdays 10:00–12:00 is open mat — an informal session with no structured class, for drilling and rolling freely. Open mat is an excellent first visit if you just want to see what it looks like.",
      },
      {
        title: "Taught by a black belt",
        body:
          "Head coach Namik Alibašić is a Brazilian jiu-jitsu black belt. In practice that means what you learn isn't repeated from the internet but tested over years of training and competition, and explained so you understand why a technique works rather than just the order of the steps.",
      },
    ],
    faq: [
      {
        q: "What's the difference between grappling and BJJ?",
        a: "Brazilian jiu-jitsu is classically trained in a kimono (gi), gripping sleeves, lapels and belt. Grappling is trained without one (no-gi), so grips are on the body and the pace is faster. The techniques overlap heavily — train one and you'll adapt to the other easily. We train mostly no-gi.",
      },
      {
        q: "Do I need a gi for grappling?",
        a: "No. For no-gi you need shorts without pockets or zips and a close-fitting top (a rashguard or any sports shirt). For a first session, any sportswear is fine.",
      },
      {
        q: "Is grappling dangerous?",
        a: "Less so than most combat sports, precisely because there are no strikes to the head. Submissions and chokes are applied under control — your partner taps and the technique stops immediately. We insist on tap discipline from day one.",
      },
      {
        q: "How much does grappling cost in Sarajevo?",
        a: "Monthly grappling membership is 70 KM and covers every grappling session that week. MMA and grappling together is 100 KM per month, and a single session is 15 KM. Your first visit is free.",
      },
      {
        q: "Can I come to open mat as a complete beginner?",
        a: "You can, and it's often the easiest first step. Saturdays 10:00–12:00 there's no formal class — come, watch, and one of the members will walk you through the basics. No pressure to roll straight away.",
      },
    ],
    ctaTitle: "Try grappling for free",
    ctaBody:
      "Come to a session or to Saturday open mat. Your first visit is free — message the coach so we know to expect you.",
  },

  bjj: {
    slug: "brazilian-jiu-jitsu-sarajevo",
    navLabel: "BJJ",
    metaTitle: "Brazilian jiu-jitsu (BJJ) Sarajevo — black belt coach | OCD Fighters",
    metaDescription:
      "BJJ and Brazilian jiu-jitsu in Sarajevo (Nedžarići 7). Training led by black belt Namik Alibašić, for beginners and advanced. Dedicated women's BJJ program.",
    keywords: [
      "BJJ Sarajevo",
      "Brazilian jiu-jitsu Sarajevo",
      "jiu jitsu Sarajevo",
      "BJJ club Sarajevo",
      "BJJ black belt Sarajevo",
      "jiu jitsu for beginners Sarajevo",
    ],
    h1: "Brazilian jiu-jitsu (BJJ) in Sarajevo",
    lede:
      "Brazilian jiu-jitsu is ground fighting built on leverage, angle and timing — the idea that a smaller, weaker person can control a stronger one who doesn't know what they're doing. Ours is taught by a black belt.",
    sections: [
      {
        title: "What you'll learn",
        body:
          "BJJ starts with positions: how to reach a dominant one, how to hold it, and how to escape a bad one. Submissions come after — arm, shoulder and knee locks, plus chokes. You'll learn guard and guard passing, escapes from mount and side control, takedowns, and — just as importantly — how to move calmly under someone's weight without panicking. That last part is what changes people most outside the gym.",
      },
      {
        title: "Who teaches",
        body:
          "Head coach Namik Alibašić holds a black belt in Brazilian jiu-jitsu — the highest rank in the sport, earned over many years of training, competing and teaching. There aren't many black belts in Bosnia and Herzegovina, and the difference shows in the quality of explanation: you get the reason a technique works and what to do when your opponent reacts differently, not just the sequence of steps.",
      },
      {
        title: "Gi and no-gi",
        body:
          "Classical BJJ is trained in a kimono (gi), where fabric grips open up a whole arsenal of control and chokes. Our regular program is mostly no-gi — closer to MMA and faster paced. The two overlap heavily and knowledge transfers both ways. If you're specifically interested in gi training, ask the coach about current sessions.",
      },
      {
        title: "BJJ for women",
        body:
          "Monday, Wednesday and Friday from 16:45 to 17:45 we run a dedicated women's jiu-jitsu session led by coach Dalila. It's a closed group, the atmosphere is calm, and experience level doesn't matter — plenty of members had never trained anything. More on the women's program page.",
      },
    ],
    faq: [
      {
        q: "What does a BJJ black belt mean?",
        a: "It's the highest rank in the sport and typically takes ten or more years of consistent training, passing through white, blue, purple and brown. Unlike some martial arts, BJJ awards belts slowly and strictly, so a black belt genuinely reflects mastery.",
      },
      {
        q: "Can I train BJJ with no experience?",
        a: "Yes, and that's how nearly everyone starts. The beginner group moves at a slower pace, focused on fundamental positions and safe movement. No level of fitness or knowledge is expected in advance.",
      },
      {
        q: "How many sessions a week do I need to progress?",
        a: "Twice a week gives steady, visible progress. Three or more speeds things up noticeably. What matters most is consistency over months — in BJJ, progress belongs to whoever keeps showing up, not to whoever trains hard for one week and disappears.",
      },
    ],
    ctaTitle: "Your first BJJ session is free",
    ctaBody: "Arrange a time with the coach — come, see the gym and train with no obligation.",
  },

  women: {
    slug: "martial-arts-for-women-sarajevo",
    navLabel: "For women",
    metaTitle: "Martial arts for women Sarajevo — jiu-jitsu & self-defence | OCD Fighters",
    metaDescription:
      "Jiu-jitsu and self-defence training for women in Sarajevo (Nedžarići 7). Closed group led by coach Dalila, Tuesdays, Thursdays and Fridays. All levels, no experience needed.",
    keywords: [
      "martial arts for women Sarajevo",
      "self defence for women Sarajevo",
      "women's jiu-jitsu Sarajevo",
      "women's BJJ Sarajevo",
      "women's training Sarajevo",
      "grappling for women",
    ],
    h1: "Martial arts for women in Sarajevo",
    lede:
      "A dedicated women's jiu-jitsu session, in a closed group, led by coach Dalila. No prior experience needed, and no atmosphere where you have to prove anything to anyone.",
    sections: [
      {
        title: "What a session looks like",
        body:
          "Sessions run an hour and are led by coach Dalila. They start with a warm-up and movement on the mat, move to the technique of the day — positions, escapes from bad positions, submissions and chokes — and finish with light work with a partner. The group sets the pace, not the other way round. There's no striking and no pressure to spar before you feel ready.",
      },
      {
        title: "Why jiu-jitsu for self-defence",
        body:
          "A real attack on a woman most often ends in a clinch or on the ground, where a strength difference matters most — and that is precisely the terrain jiu-jitsu was built for. You learn not to panic under someone's weight, how to create space, escape and get back to your feet, and how to control an attacker long enough to get away. That's a concrete skill, not a feeling of safety with nothing behind it.",
      },
      {
        title: "A closed group",
        body:
          "The session is for women only and runs in a more private setting — which for many is the condition for trying at all. Women of every age and fitness level come: students, mothers, women who have never played a sport. Nobody started knowing anything.",
      },
      {
        title: "Times",
        body:
          "Monday, Wednesday and Friday, 16:45 to 17:45. The afternoon slot is deliberate, sitting before the evening groups so it fits between work and the evening. Members who want to train more can join the regular grappling sessions.",
      },
    ],
    faq: [
      {
        q: "I've never trained anything. Can I come?",
        a: "Yes — the group exists for exactly that. Most women who come had no sporting background before their first session. A first visit is mostly watching and basic movement, nothing strenuous or uncomfortable.",
      },
      {
        q: "Do men train at the same time?",
        a: "The women's session is a closed group led by a female coach. That's why it's scheduled at 16:45, before the regular evening groups begin.",
      },
      {
        q: "What should I wear to my first session?",
        a: "Sportswear you can move freely in — leggings or shorts and a close-fitting top. No jewellery, and bring a water bottle. Training is barefoot on the mat.",
      },
      {
        q: "Will I have to fight someone?",
        a: "Not before you want to. Sparring in jiu-jitsu is controlled and voluntary, and in the women's group it's introduced gradually, once the basic techniques settle.",
      },
    ],
    ctaTitle: "Come to your first session",
    ctaBody:
      "Message the coach on WhatsApp — just say you're interested in the women's session and you'll get all the details.",
  },

  beginners: {
    slug: "martial-arts-for-beginners-sarajevo",
    navLabel: "Beginners",
    metaTitle: "Martial arts for beginners Sarajevo — first session free | OCD Fighters",
    metaDescription:
      "Start training martial arts in Sarajevo with no experience. Beginner groups for MMA and grappling at Nedžarići 7. First session free, no gear and no obligation.",
    keywords: [
      "martial arts club Sarajevo",
      "martial arts Sarajevo",
      "combat sports Sarajevo",
      "MMA for beginners Sarajevo",
      "grappling for beginners Sarajevo",
      "where to train martial arts in Sarajevo",
    ],
    h1: "Martial arts for beginners in Sarajevo",
    lede:
      "Never trained before? That's where most of our members started, and it isn't an obstacle. We run dedicated beginner groups for MMA and grappling, paced for people starting from zero.",
    sections: [
      {
        title: "What a first visit looks like",
        body:
          "Arrive about fifteen minutes early, meet the coach and look around the gym. Training opens with a warm-up, moves to the technique of the day — demonstrated slowly and drilled with a partner — and closes with light work. You won't spar on your first session. You'll almost certainly get something wrong, which is entirely expected; nobody is watching, and everyone there had the same first day.",
      },
      {
        title: "Beginner groups",
        body:
          "Grappling for beginners: Monday, Wednesday and Friday, 20:00–21:00. MMA for beginners: Tuesday and Thursday, 20:00–21:00. The late slot is deliberate, so you can make it after work. When your technique settles, moving up to the advanced group happens naturally, in agreement with the coach — no exam and no deadline.",
      },
      {
        title: "What you don't need",
        body:
          "You don't need gear — sportswear and a water bottle will do. You don't need to be fit, because fitness is built in training. You don't need experience from another sport. And you don't need to decide on a membership before trying: your first session is free and commits you to nothing.",
      },
      {
        title: "Which sport to choose",
        body:
          "If you're unsure, the simplest rule: grappling if you'd rather not take strikes and want the fastest technical progress, MMA if you want complete fighting including striking. Plenty of people train both — that's why the combined membership exists. If that still doesn't settle it, come once to each and decide.",
      },
    ],
    faq: [
      {
        q: "I'm over 30. Is it too late to start?",
        a: "No. A good share of our members started after thirty, and grappling and jiu-jitsu are sports where people progress well much later than that. You set the pace, not the other way round.",
      },
      {
        q: "What if I'm completely out of shape?",
        a: "Then you're in the right place, because this is where it gets built. In your first sessions you'll stop and catch your breath when you need to — nobody comments on it. After a few weeks the difference is noticeable.",
      },
      {
        q: "Is the first session really free?",
        a: "It is, with no obligation to continue. Just let the coach know you're coming so we can expect you.",
      },
      {
        q: "Where is the gym?",
        a: "Nedžarići 7, Sarajevo. The location section has a map and a directions button.",
      },
      {
        q: "How much is membership?",
        a: "70 KM per month for one program (MMA or grappling), 100 KM for both, or 15 KM per single session if you'd rather not commit monthly.",
      },
    ],
    ctaTitle: "Start this week",
    ctaBody:
      "The first visit is the only hard part. Message the coach on WhatsApp and arrange a time — the rest takes care of itself.",
  },
};
