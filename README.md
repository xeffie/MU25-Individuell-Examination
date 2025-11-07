# MU25-Individuell-Examination

## 🧭 Bookmarks Mini

Enkel bokmärkesapplikation byggd med HTML, CSS och JavaScript.
En individuell examination i kursen **Git & Agilt (MU25)**.  
Projektet demonstrerar ett komplett Git-flöde med feature-brancher, pull requests, reviews och en reflektion kring agilt arbete.

<img width="1000" height="821" alt="Screenshot 2025-11-07 093448" src="https://github.com/user-attachments/assets/d271d09a-12a2-480b-b163-5cd2d183d60d" />

---

## 📚 Funktioner

- Lägga till ett bokmärke med titel och URL (validering och normalisering till `https://` vid behov).
- Bokmärket sparas automatiskt i `localStorage`.
- Lista sparade bokmärken med senaste överst.
- Öppna ett bokmärke i en ny flik.
- Ta bort bokmärken från listan och `localStorage`.

---

## 💡 Syfte

Syftet med projektet är att bygga en enkel webbsida där användaren kan spara, visa, ta bort och hantera bokmärken.  
Projektet används för att visa förståelse för:

- Git-flöde (branch → PR → review → merge)
- Konflikthantering i Git
- Agila metoder (user stories, Acceptance Criteria, DoD och INVEST-principer)

---

## ⚙️ Hur man kör projektet

[Live demo](https://xeffie.github.io/MU25-Individuell-Examination/)

1. Klona detta repository:
   ```bash
   git clone <repo-url>
   ``` 

2. Öppna `index.html` i webbläsaren, eller starta en live-server i VS Code.

3. Lägg till, visa och ta bort bokmärken direkt i gränssnittet.

---

## 🧩 Struktur
```bash
.
├── .gitignore
├── css/
│   └── style.css
├── images/
│   └── .gitkeep
├── index.html
├── js/
│   ├── app.js
│   └── storage.js
├── README.md
└── reflection.md
```

---

## 🔗 Länkar

- **Trello-bräda:** [Öppna i Trello](https://trello.com/invite/b/690476f3b5991c60586c3316/ATTIa1c734b043614a71d91952a03bdfc2f83A3A18AA/individuell-examination-mu25)
- **Mina reviews:**
  -   Given: https://github.com/ThatMayBeTheCase/Bookmarks-lite/pull/2#pullrequestreview-3411508619
  -   Given: https://github.com/VitaliyBeletskiy/mu25-git-agile-bookmarks-mini/pull/3#pullrequestreview-3416439395
  -   Mottagen: https://github.com/xeffie/MU25-Individuell-Examination/pull/9
