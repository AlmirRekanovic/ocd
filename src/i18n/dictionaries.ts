import type { Locale } from "./config";

// Public + member-area copy. Admin is intentionally Bosnian-only and lives in
// the admin components directly (see project spec).
const dictionaries = {
  bs: {
    nav: {
      home: "Početna",
      about: "O nama",
      training: "Treninzi",
      schedule: "Raspored",
      pricing: "Cijene",
      location: "Lokacija",
      contact: "Kontakt",
      memberArea: "Članski dio",
      login: "Prijava",
      logout: "Odjava",
    },
    hero: {
      kicker: "Grappling & MMA · Sarajevo",
      title: "OCD Fighters Sarajevo",
      // The visible <h1>. It leads with what the club *is* and where, because
      // that is the phrase people actually search — the brand name is carried
      // by the logo directly above it.
      h1: "MMA i grappling klub u Sarajevu",
      subtitle:
        "Klub specijaliziran za grappling i MMA, osnovan 2026. u Sarajevu. Profesionalno, disciplinovano i ozbiljno sportsko okruženje za sve nivoe.",
      ctaJoin: "Postani član",
      ctaTraining: "Pogledaj treninge",
    },
    about: {
      title: "O klubu",
      body:
        "OCD Fighters je klub specijaliziran za grappling i MMA, osnovan 2026. godine u Sarajevu, na adresi Nedžarići 7. Okupljamo sportiste koji žele trenirati u profesionalnom, disciplinovanom i ozbiljnom sportskom okruženju. Na čelu tima je glavni trener Namik Alibašić, nosilac crnog pojasa u brazilskoj jiu-jitsi, čije iskustvo, rezultati i posvećenost predstavljaju temelj rada kluba. Naša misija je izgradnja zajednice boraca koji kroz rad, disciplinu i međusobno poštovanje pomjeraju vlastite granice i ostvaruju vrhunske sportske rezultate.",
      points: [
        { title: "Glavni trener Namik Alibašić", text: "Nosilac crnog pojasa u brazilskoj jiu-jitsi — iskustvo, rezultati i posvećenost temelj su rada kluba." },
        { title: "Programi za sve nivoe", text: "Posebni programi za početnike, napredne takmičare i profesionalne sportiste." },
        { title: "Treninzi za žene", text: "Poseban program pod vodstvom trenerice Dalile, u privatnom okruženju, za sve nivoe iskustva." },
      ],
    },
    trainingSection: {
      title: "Treninzi",
      body:
        "Treninzi grapplinga i MMA prilagođeni svim nivoima — od početnika do profesionalnih takmičara. Moderno opremljena sala i vrhunski sportisti stvaraju sredinu u kojoj se svakodnevno razmjenjuju znanje, iskustvo i pobjednički mentalitet. Članovi rezervišu termine direktno kroz članski portal.",
      disciplines: ["Grappling", "MMA", "BJJ", "Hrvanje", "Kondicija", "Treninzi za žene"],
      more: "Saznaj više",
    },
    highlights: {
      location: "Lokacija",
      training: "Treninzi",
      trainingValue: "Pon – Sub · jutro i večer",
      coach: "Trener",
    },
    schedule: {
      title: "Raspored treninga",
      subtitle:
        "Sedmični raspored po danima i nivoima. Nisi siguran/na koji termin je za tebe? Javi se treneru.",
      today: "Danas",
      rest: "Nema treninga",
      cta: "Dogovori prvi trening",
      classes: {
        grapplingMma: "Grappling / MMA",
        womenBjj: "Jiu-jitsu za žene",
        grappling: "Grappling",
        mma: "MMA",
        openMat: "Open mat",
      },
      levels: {
        advanced: "Napredni",
        beginner: "Početnici",
        women: "Žene",
        all: "Svi nivoi",
      },
    },
    pricing: {
      title: "Članarine",
      subtitle: "Mjesečna članarina po programu ili pojedinačni trening.",
      perMonth: "mjesečno",
      perSession: "jedan trening",
      bestValue: "Najbolja ponuda",
      save: "Uštedi",
      cta: "Javi se treneru",
      plans: {
        grappling: { name: "Grappling", desc: "Svi grappling treninzi u sedmici." },
        mma: { name: "MMA", desc: "Svi MMA treninzi u sedmici." },
        combo: { name: "MMA + Grappling", desc: "Neograničen pristup MMA i grappling treninzima." },
        dropIn: { name: "Drop-in", desc: "Jedan trening, bez mjesečne članarine." },
      },
    },
    location: {
      title: "Gdje treniramo",
      body: "Naša sala se nalazi u Nedžarićima, Sarajevo. Klikni na dugme ispod za rutu do sale.",
      route: "Planiraj rutu",
      openMaps: "Otvori u Google Maps",
    },
    contact: {
      title: "Kontakt",
      body: "Imaš pitanje ili želiš doći na prvi trening? Pozovi trenera, pošalji WhatsApp poruku ili nas prati na Instagramu.",
      instagram: "Instagram",
      call: "Pozovi",
      whatsapp: "WhatsApp",
      whatsappAction: "Pošalji poruku",
      whatsappMessage: "Zdravo! Zanima me trening u OCD Fighters.",
    },
    footer: {
      rights: "Sva prava zadržana.",
      programs: "Programi",
      club: "Klub",
    },
    faq: {
      title: "Česta pitanja",
      otherPrograms: "Ostali programi",
    },
    // Homepage FAQ. These are the questions people actually type into Google
    // as full sentences ("gdje trenirati MMA u Sarajevu", "koliko košta
    // članarina") — answering them verbatim on the page is what makes the
    // page eligible for those results.
    homeFaq: [
      {
        q: "Gdje trenirati MMA i grappling u Sarajevu?",
        a: "OCD Fighters se nalazi na adresi Nedžarići 7 u Sarajevu. Treniramo MMA, grappling i brazilsku jiu-jitsu, u grupama za početnike i napredne, jutarnjim i večernjim terminima od ponedjeljka do subote.",
      },
      {
        q: "Koliko košta članarina u borilačkom klubu u Sarajevu?",
        a: "Kod nas je mjesečna članarina 70 KM za jedan program (MMA ili grappling), 100 KM za oba programa zajedno, a pojedinačni trening bez članarine je 15 KM. Prvi trening je besplatan.",
      },
      {
        q: "Mogu li početi bez ikakvog iskustva?",
        a: "Da. Imamo posebne početničke grupe za MMA i grappling, u kojima se radi sporijim tempom i bez teškog sparinga. Većina naših članova je počela bez prethodnog iskustva u borilačkim sportovima.",
      },
      {
        q: "Trenirate li boks?",
        a: "Nemamo zasebnu boks sekciju, ali udaračke tehnike — boks i kickboks — sastavni su dio MMA treninga. Ako tražiš isključivo boks bez hrvanja i borbe na podu, javi se treneru i reći ćemo ti iskreno odgovaramo li tvom cilju.",
      },
      {
        q: "Postoji li trening samo za žene?",
        a: "Postoji. Ponedjeljkom, srijedom i petkom od 16:45 do 17:45 vodimo zatvoreni termin jiu-jitse za žene pod vodstvom trenerice Dalile, za sve nivoe iskustva.",
      },
      {
        q: "Koje dane i u koje vrijeme se trenira?",
        a: "Treninzi se održavaju od ponedjeljka do petka, ujutro od 09:30 i uvečer od 18:00 i 20:00, te subotom od 10:00 do 12:00 (open mat). Cijeli sedmični raspored je na ovoj stranici u sekciji Raspored.",
      },
    ],
    seo: {
      title: "MMA i grappling klub Sarajevo — treninzi za sve nivoe | OCD Fighters",
      description:
        "OCD Fighters — MMA, grappling i BJJ klub u Sarajevu (Nedžarići 7). Treninzi za početnike i takmičare, udaračke tehnike u sklopu MMA-a, program za žene. Glavni trener crni pojas BJJ. Prvi trening besplatan.",
      keywords: [
        "MMA Sarajevo",
        "grappling Sarajevo",
        "BJJ Sarajevo",
        "brazilska jiu-jitsa Sarajevo",
        "borilački klub Sarajevo",
        "borilačke vještine Sarajevo",
        "MMA klub Sarajevo",
        "boks Sarajevo",
        "kickboks Sarajevo",
        "hrvanje Sarajevo",
        "samoodbrana Sarajevo",
        "trening za žene Sarajevo",
        "Nedžarići",
        "Namik Alibašić",
      ],
    },
    login: {
      title: "Prijava člana",
      subtitle: "Prijavi se da rezervišeš treninge.",
      username: "Korisničko ime",
      password: "Lozinka",
      submit: "Prijavi se",
      error: "Pogrešno korisničko ime ili lozinka.",
      hint: "Tvoju lozinku ti je dao trener (tvoj broj telefona).",
    },
    member: {
      title: "Dobrodošao",
      greeting: "Zdravo",
      paymentStatus: "Status članarine",
      paid: "Plaćeno",
      unpaid: "Neplaćeno",
      expiresSoon: "Ističe uskoro",
      expiresToday: "Ističe danas",
      expired: "Istekla",
      validUntil: "Vrijedi do",
      expiredOn: "Istekla",
      lastPaid: "Zadnja uplata",
      upcomingTitle: "Dostupni treninzi",
      noSlots: "Trenutno nema zakazanih treninga.",
      capacity: "Mjesta",
      join: "Prijavi se",
      leave: "Odjavi se",
      full: "Popunjeno",
      joined: "Prijavljen/a",
      mySlotsTitle: "Moji treninzi",
      noMySlots: "Još nisi prijavljen/a ni na jedan trening.",
      privateTitle: "Zatraži privatni trening",
      privateBody: "Pošalji zahtjev za individualni trening sa trenerom.",
      privateDate: "Željeni datum/vrijeme",
      privateNote: "Napomena (opcionalno)",
      privateSubmit: "Pošalji zahtjev",
      privateMine: "Moji zahtjevi",
      noPrivate: "Nemaš poslanih zahtjeva.",
      statusPending: "Na čekanju",
      statusApproved: "Odobreno",
      statusDeclined: "Odbijeno",
      createdBy: "Vodi",
    },
    days: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      training: "Training",
      schedule: "Schedule",
      pricing: "Pricing",
      location: "Location",
      contact: "Contact",
      memberArea: "Member area",
      login: "Login",
      logout: "Logout",
    },
    hero: {
      kicker: "Grappling & MMA · Sarajevo",
      title: "OCD Fighters Sarajevo",
      h1: "MMA and grappling club in Sarajevo",
      subtitle:
        "A club specialised in grappling and MMA, founded in 2026 in Sarajevo. A professional, disciplined and serious training environment for all levels.",
      ctaJoin: "Become a member",
      ctaTraining: "See training",
    },
    about: {
      title: "About the club",
      body:
        "OCD Fighters is a club specialised in grappling and MMA, founded in 2026 in Sarajevo at Nedžarići 7. We bring together athletes who want to train in a professional, disciplined and serious sporting environment. The team is led by head coach Namik Alibašić, a Brazilian jiu-jitsu black belt whose experience, results and dedication form the foundation of the club. Our mission is to build a community of fighters who, through hard work, discipline and mutual respect, push their own limits and achieve top results.",
      points: [
        { title: "Head coach Namik Alibašić", text: "A Brazilian jiu-jitsu black belt — his experience, results and dedication are the foundation of the club." },
        { title: "Programs for all levels", text: "Dedicated programs for beginners, advanced competitors and professional athletes." },
        { title: "Women's training", text: "A dedicated program led by coach Dalila, in a private setting, for all experience levels." },
      ],
    },
    trainingSection: {
      title: "Training",
      body:
        "Grappling and MMA sessions tailored to all levels — from beginners to professional competitors. A modern, fully-equipped gym and elite athletes create an environment where knowledge, experience and a winning mindset are shared every day. Members book slots directly through the member portal.",
      disciplines: ["Grappling", "MMA", "BJJ", "Wrestling", "Conditioning", "Women's training"],
      more: "Learn more",
    },
    highlights: {
      location: "Location",
      training: "Training",
      trainingValue: "Mon – Sat · mornings & evenings",
      coach: "Coach",
    },
    schedule: {
      title: "Training schedule",
      subtitle:
        "Weekly schedule by day and level. Not sure which session is right for you? Contact the coach.",
      today: "Today",
      rest: "No training",
      cta: "Book your first session",
      classes: {
        grapplingMma: "Grappling / MMA",
        womenBjj: "Women's jiu-jitsu",
        grappling: "Grappling",
        mma: "MMA",
        openMat: "Open mat",
      },
      levels: {
        advanced: "Advanced",
        beginner: "Beginners",
        women: "Women",
        all: "All levels",
      },
    },
    pricing: {
      title: "Membership",
      subtitle: "Monthly membership per program, or pay for a single session.",
      perMonth: "per month",
      perSession: "single session",
      bestValue: "Best value",
      save: "Save",
      cta: "Contact the coach",
      plans: {
        grappling: { name: "Grappling", desc: "All grappling sessions each week." },
        mma: { name: "MMA", desc: "All MMA sessions each week." },
        combo: { name: "MMA + Grappling", desc: "Unlimited access to MMA and grappling sessions." },
        dropIn: { name: "Drop-in", desc: "One session, no monthly membership." },
      },
    },
    location: {
      title: "Where we train",
      body: "Our gym is in Nedžarići, Sarajevo. Use the button below to get directions.",
      route: "Get directions",
      openMaps: "Open in Google Maps",
    },
    contact: {
      title: "Contact",
      body: "Have a question or want to come to your first session? Call the coach, send a WhatsApp message or follow us on Instagram.",
      instagram: "Instagram",
      call: "Call",
      whatsapp: "WhatsApp",
      whatsappAction: "Send a message",
      whatsappMessage: "Hi! I'm interested in training at OCD Fighters.",
    },
    footer: {
      rights: "All rights reserved.",
      programs: "Programs",
      club: "Club",
    },
    faq: {
      title: "Frequently asked questions",
      otherPrograms: "Other programs",
    },
    homeFaq: [
      {
        q: "Where can I train MMA and grappling in Sarajevo?",
        a: "OCD Fighters is at Nedžarići 7 in Sarajevo. We train MMA, grappling and Brazilian jiu-jitsu, in beginner and advanced groups, with morning and evening sessions Monday through Saturday.",
      },
      {
        q: "How much does a martial arts membership in Sarajevo cost?",
        a: "Our monthly membership is 70 KM for one program (MMA or grappling), 100 KM for both together, and a single drop-in session is 15 KM. Your first session is free.",
      },
      {
        q: "Can I start with no experience at all?",
        a: "Yes. We run dedicated beginner groups for MMA and grappling, at a slower pace and without hard sparring. Most of our members started with no combat sports background.",
      },
      {
        q: "Do you teach boxing?",
        a: "We don't run a separate boxing section, but striking — boxing and kickboxing — is a core part of MMA training here. If you want boxing only, with no wrestling or ground work, contact the coach and we'll tell you honestly whether we're the right fit.",
      },
      {
        q: "Is there a women-only session?",
        a: "There is. Monday, Wednesday and Friday from 16:45 to 17:45 we run a closed women's jiu-jitsu session led by coach Dalila, for all experience levels.",
      },
      {
        q: "What days and times do you train?",
        a: "Sessions run Monday to Friday, mornings from 09:30 and evenings at 18:00 and 20:00, plus Saturday 10:00–12:00 (open mat). The full weekly schedule is in the Schedule section of this page.",
      },
    ],
    seo: {
      title: "MMA & grappling club Sarajevo — training for all levels | OCD Fighters",
      description:
        "OCD Fighters — MMA, grappling and BJJ club in Sarajevo (Nedžarići 7). Training for beginners and competitors, striking as part of MMA, dedicated women's program. Head coach is a BJJ black belt. First session free.",
      keywords: [
        "MMA Sarajevo",
        "grappling Sarajevo",
        "BJJ Sarajevo",
        "Brazilian jiu-jitsu Sarajevo",
        "martial arts club Sarajevo",
        "martial arts Sarajevo",
        "MMA club Sarajevo",
        "boxing Sarajevo",
        "kickboxing Sarajevo",
        "wrestling Sarajevo",
        "self defence Sarajevo",
        "women's training Sarajevo",
        "Nedžarići",
      ],
    },
    login: {
      title: "Member login",
      subtitle: "Log in to book your training.",
      username: "Username",
      password: "Password",
      submit: "Log in",
      error: "Wrong username or password.",
      hint: "Your password was given to you by the coach (your phone number).",
    },
    member: {
      title: "Welcome",
      greeting: "Hi",
      paymentStatus: "Membership status",
      paid: "Paid",
      unpaid: "Unpaid",
      expiresSoon: "Expires soon",
      expiresToday: "Expires today",
      expired: "Expired",
      validUntil: "Valid until",
      expiredOn: "Expired on",
      lastPaid: "Last payment",
      upcomingTitle: "Available training",
      noSlots: "There are no scheduled sessions right now.",
      capacity: "Spots",
      join: "Join",
      leave: "Leave",
      full: "Full",
      joined: "Joined",
      mySlotsTitle: "My training",
      noMySlots: "You haven't joined any sessions yet.",
      privateTitle: "Request a private session",
      privateBody: "Send a request for an individual session with the coach.",
      privateDate: "Preferred date/time",
      privateNote: "Note (optional)",
      privateSubmit: "Send request",
      privateMine: "My requests",
      noPrivate: "You have no requests.",
      statusPending: "Pending",
      statusApproved: "Approved",
      statusDeclined: "Declined",
      createdBy: "Coach",
    },
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
};

export type Dictionary = (typeof dictionaries)["bs"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
