import type { Locale } from "./config";

// Public + member-area copy. Admin is intentionally Bosnian-only and lives in
// the admin components directly (see project spec).
const dictionaries = {
  bs: {
    nav: {
      home: "Početna",
      about: "O nama",
      training: "Treninzi",
      contact: "Kontakt",
      memberArea: "Članski dio",
      login: "Prijava",
      logout: "Odjava",
    },
    hero: {
      kicker: "Grappling & MMA · Sarajevo",
      title: "OCD Fighters Sarajevo",
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
    },
    contact: {
      title: "Kontakt",
      body: "Nedžarići 7, Sarajevo. Prati nas i javi se putem Instagrama.",
      instagram: "Instagram",
    },
    footer: {
      rights: "Sva prava zadržana.",
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
      forMonth: "za mjesec",
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
      contact: "Contact",
      memberArea: "Member area",
      login: "Login",
      logout: "Logout",
    },
    hero: {
      kicker: "Grappling & MMA · Sarajevo",
      title: "OCD Fighters Sarajevo",
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
    },
    contact: {
      title: "Contact",
      body: "Nedžarići 7, Sarajevo. Follow us and reach out on Instagram.",
      instagram: "Instagram",
    },
    footer: {
      rights: "All rights reserved.",
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
      forMonth: "for",
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
