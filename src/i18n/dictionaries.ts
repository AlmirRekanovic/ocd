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
      kicker: "MMA Klub",
      title: "OCD Fighters",
      subtitle:
        "Discipline. Posvećenost. Borba. Treniraj sa nama i otkrij šta sve možeš postići.",
      ctaJoin: "Postani član",
      ctaTraining: "Pogledaj treninge",
    },
    about: {
      title: "O klubu",
      body:
        "OCD Fighters je MMA klub posvećen razvoju boraca svih nivoa — od početnika do takmičara. Naš pristup spaja tehniku, kondiciju i mentalnu snagu u sigurnom i podržavajućem okruženju.",
      points: [
        { title: "Stručni treneri", text: "Iskusan trenerski tim koji prati svaki tvoj korak." },
        { title: "Svi nivoi", text: "Programi prilagođeni početnicima i naprednim borcima." },
        { title: "Zajednica", text: "Postani dio ekipe koja te gura naprijed." },
      ],
    },
    trainingSection: {
      title: "Treninzi",
      body:
        "Grupni treninzi tokom cijele sedmice, plus mogućnost individualnih (privatnih) sesija. Članovi rezervišu termine direktno kroz članski portal.",
      disciplines: ["MMA", "Boks", "Kickboks", "Hrvanje", "BJJ", "Kondicija"],
    },
    contact: {
      title: "Kontakt",
      body: "Prati nas i javi se putem Instagrama.",
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
      kicker: "MMA Club",
      title: "OCD Fighters",
      subtitle:
        "Discipline. Dedication. Fight. Train with us and discover what you are capable of.",
      ctaJoin: "Become a member",
      ctaTraining: "See training",
    },
    about: {
      title: "About the club",
      body:
        "OCD Fighters is an MMA club dedicated to developing fighters of all levels — from beginners to competitors. Our approach combines technique, conditioning and mental strength in a safe and supportive environment.",
      points: [
        { title: "Expert coaches", text: "An experienced coaching team that follows your every step." },
        { title: "All levels", text: "Programs tailored to beginners and advanced fighters." },
        { title: "Community", text: "Become part of a team that pushes you forward." },
      ],
    },
    trainingSection: {
      title: "Training",
      body:
        "Group sessions throughout the week, plus the option of individual (private) sessions. Members book slots directly through the member portal.",
      disciplines: ["MMA", "Boxing", "Kickboxing", "Wrestling", "BJJ", "Conditioning"],
    },
    contact: {
      title: "Contact",
      body: "Follow us and reach out on Instagram.",
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
