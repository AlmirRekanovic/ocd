# OCD Fighters

Web aplikacija za MMA klub **OCD Fighters** — javna (portfolio) stranica,
članski portal i admin panel za trenera.

> Public + member area are bilingual (Bosnian / English). The admin panel is
> Bosnian only, by design.

## Funkcionalnosti

### Javna stranica (`/bs`, `/en`)
- Portfolio / landing page kluba (hero, o nama, treninzi, kontakt).
- Prebacivanje jezika: **bosanski** i **engleski**.
- Link na [Instagram](https://www.instagram.com/ocdfighters.s/).

### Članski dio (`/bs/member`, `/en/member`)
- Prijava korisničkim imenom i lozinkom.
- Pregled statusa članarine za tekući mjesec.
- Lista dostupnih treninga + prijava/odjava na termine (s ograničenjem mjesta).
- Pregled vlastitih treninga.
- Slanje zahtjeva za **privatni (individualni) trening** i pregled statusa.

### Admin panel (`/admin`) — samo bosanski
- **Pregled**: broj članova, plaćene članarine, nadolazeći treninzi, zahtjevi.
- **Članovi**: kreiranje člana (samo *ime* + *broj telefona*).
  - Korisničko ime se generiše automatski.
  - Lozinka je **broj telefona** člana.
  - Dugme **„Pošalji WhatsApp"** otvara WhatsApp sa već popunjenom porukom
    (korisničko ime + lozinka) — trener samo klikne pošalji. Besplatno.
- **Članarine**: po mjesecu označi ko je platio, a ko nije.
- **Raspored**: pregled svih treninga, ko ih je kreirao i ko je prijavljen.
- **Dodaj treninge**: pojedinačni trening ili **ponavljajući raspored** za duži
  period (npr. cijela godina) odabirom dana u sedmici.
- **Privatni treninzi**: pregled i odobravanje/odbijanje zahtjeva.

## Tehnologije
- [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- SQLite preko [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- Autentikacija putem potpisanog JWT cookie-ja ([jose](https://github.com/panva/jose)),
  lozinke heširane sa bcrypt.
- [Tailwind CSS](https://tailwindcss.com/)

## Pokretanje lokalno

```bash
npm install
cp .env.example .env   # po želji prilagodi vrijednosti
npm run dev
```

Aplikacija je dostupna na <http://localhost:3000>.

### Inicijalni admin nalog
Pri prvom pokretanju kreira se admin (trener) nalog iz `.env`:

- korisničko ime: `ADMIN_USERNAME` (zadano `admin`)
- lozinka: `ADMIN_PASSWORD` (zadano `admin123`)

Prijava na <http://localhost:3000/admin/login>.
**Promijeni ove podatke prije produkcije**, kao i `SESSION_SECRET`.

## Konfiguracija (`.env`)
Vidi [`.env.example`](./.env.example). Najvažnije:

- `SESSION_SECRET` — tajni ključ za potpisivanje sesija (obavezno promijeniti).
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — inicijalni trenerov nalog.
- `DEFAULT_COUNTRY_CODE` — pozivni broj za WhatsApp linkove (BiH = `387`).
- `DATABASE_PATH` — putanja do SQLite baze (zadano `./data/ocd.db`).

## Produkcija

```bash
npm run build
npm run start
```

> SQLite baza se čuva u `./data/ocd.db`. Za hosting koristi platformu sa
> trajnim diskom (npr. Railway, Fly.io, VPS). Za platforme bez trajnog
> fajl-sistema (npr. Vercel serverless) baza se ne čuva između deploya —
> u tom slučaju zamijeniti SQLite eksternom bazom.
