# Reflektion – Git & Agilt

## 1) Story #4 - Lägga till bokmärke

**Story:** 
Som *användare* vill jag *kunna lägga till ett bokmärke med titel och URL* så att *jag kan spara länkar jag vill återvända till*.

**Acceptance Criteria:**
- [x] Fält för titel och URL finns i formuläret.
- [x] Klick på "Add"-knappen sparar bokmärket i listan.
- [x] Tomma fält ska inte sparas.
 
**INVEST:**
- **I**ndependent: Enbart front-end som kan levereras separat från list/persistens stories.
- **N**egotiable: UI-detaljer som layout & feedback kan ändras.
- **V**aluable: Ger direkt nytta för användaren som kan spara länkar.
- **E**stimable: Tydliga regler som gör det lättare att tidsuppskatta.
- **S**mall: Ryms i en sprint.
- **T**estable: Går att testa enligt AC.

## 2) Story #7 - Ta bort bokmärke

**Story:** 
Som *användare* vill jag *kunna ta bort bokmräken från listan* så att *jag kan hålla listan aktuell och rensa bort felaktiga länkar*.

**Acceptance Criteria (checkboxar):**
- [x] Varje bokmärke har en "Ta bort"-knapp eller ikon.
- [x] Klick på knappen tar bort bokmärket direkt.
- [x] Listan uppdateras utan omladdning.
- [x] När listan blir tom visas empty state.
 
**INVEST – kort motivering (2–4 meningar):**
Vilka av I, N, V, E, S, T uppfyller storyn och varför?
- **I**ndependent: Bygger på befintlig kod men kan utvecklas isolerat.
- **N**egotiable: Ikon/position/hover kan ändras utan att ändra mål.
- **V**aluable: Håller listan relevant.
- **E**stimable: Liten med tydligt scope.
- **S**mall: Tydligt avgränsad del.
- **T**estable: Går att testa enligt AC.

## 2) Sprintmål + Definition of Done (DoD)
**Sprintmål:**
Leverera en minimal men komplett **Bookmarks Mini** för att lägga till, visa och ta bort bokmärken.

**DoD:**
- [x] Kod kör lokalt utan fel
- [x] PR granskad och godkänd (minst 1 review)
- [x] README uppdaterad
- [x] Issue/kort länkat och stängt vid merge

## 3) Retro: Start / Stop / Continue
- **Start:** 
  - Använda en PR template.
  - Skriva tydliga AC.

- **Stop:** 
  - Sluta snurra iväg och pilla med nåt som ser vajsing ut i t.ex. CSS när jag egentligen jobbar på något helt annat. 
- **Continue:**
  - Fortsätta med tydliga branchnamn
  - 1 US → 1 branch → 1 PR → squash till main

Minst **en** konkret förbättring du provar nästa sprint och *varför*.
- **Använda PR-template.** Då blir varje PR snabbare att skriva och enklare att granska. Det var först nu jag insåg vad en template gör och har således suttit och "finskrivit" varje PR. Hade istället bara kunna fylla i och vara klar.

- **Hålla bättre fokus per uppgift.** Jag tenderar att "passa på" att småfixa saker mitt i en annan feature vilket kan göra branchen lite spretig. 

## 4) Hänvisningar (VG)
- Förbättring 1 stöds av PR/commit: <länk/ID>
- Förbättring 2 stöds av PR/commit: <länk/ID>