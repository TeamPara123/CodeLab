# CodeLab

Een website waarop je leert programmeren: lessen, quizzen, een oefen-editor en een admin-gedeelte met Firebase.

## Opstarten

Open de map in VS Code en start **Live Server** (rechtsonder "Go Live").
Dubbelklikken op `index.html` werkt **niet** meer: de Firebase-code gebruikt ES-modules (`import`/`export`), en de browser laadt die alleen via een webserver. Op GitHub Pages werkt het gewoon.

## Welk bestand doet wat?

Vroeger stond alles in één `index.html` van 4348 regels. Nu staat elk onderdeel in een eigen bestand.

```
index.html              De HTML: de pagina's, knoppen en invulvelden.
                        In <head> laadt hij de CSS, onderaan de JS-bestanden.
css/
  base.css              Basisopmaak: kleuren, header, navigatie, main.
  lessons.css           De lessenlijst, de lespagina, codeblokken, tekstvakken.
  components.css        Knoppen, quiz, voortgang, editor, slotjes, statistieken.
  responsive.css        Aanpassingen voor kleine schermen (gsm).
  settings.css          De instellingenpagina.
  theme-light.css       Het lichte thema.
  admin.css             De admin-pagina.
js/
  data/lessons-data.js  Alle lessen (de inhoud zelf).
  utils.js              escapeHTML: tekst veilig in HTML zetten.
  storage.js            Scores, XP en admin inlezen uit localStorage.
  navigation.js         showPage: wisselen tussen pagina's.
  lessons.js            Lessenlijst tonen en een les openen.
  lesson1-quiz.js       De quiz van les 1.
  code-check.js         Nakijken van de code die je in een les typt.
  progress.js           XP, statistieken en de voortgangspagina.
  quiz.js               De grote quiz.
  editor.js             De oefen-editor.
  settings.js           Instellingen: naam, thema, meldingen, reset, admin.
  admin-ui.js           Spelers- en groepenlijst open- en dichtklappen.
  main.js               Startcode: draait als alles geladen is.
  firebase/
    index.js            Startpunt: laadt de andere Firebase-bestanden.
    firebase.js         Verbinding met Firebase (auth en db).
    players.js          Admin: spelers laden en zoeken.
    groups.js           Admin: groepen beheren.
    auth.js             Registreren, inloggen, uitloggen, wie is ingelogd.
```

## Waarom is de volgorde van de `<script>`-tags belangrijk?

- **CSS:** als twee regels hetzelfde element opmaken, wint de regel die later komt. Daarom moeten de `<link>`-tags in deze volgorde blijven staan (bijvoorbeeld `theme-light.css` na `base.css`).
- **Gewone JS-bestanden** (`js/*.js`) delen alles met elkaar: een functie uit `lessons.js` kun je aanroepen vanuit `quiz.js`. Maar je kunt een functie pas aanroepen **als het bestand waar ze in staat al geladen is**. Daarom staat alle code die meteen iets doet in `main.js`, en dat bestand laadt als laatste.
- **Modules** (`js/firebase/*.js`) werken anders. Ze delen niets vanzelf: wat een ander bestand nodig heeft, zet je bij `export`, en het andere bestand haalt het op met `import`. Kijk maar bovenaan `groups.js`. Modules draaien pas nadat de gewone scripts klaar zijn.
- De `onclick="..."` in de HTML kan alleen functies vinden die op `window` staan. Daarom zie je in de Firebase-bestanden `window.loginAccount = ...`.

## Wat kan er beter? (stap voor stap, in deze volgorde)

Bij het opsplitsen is **niets** aan de werking veranderd. Dit zijn goede volgende stappen:

- [x] **Beveiliging van admin.** Iedereen kan zichzelf admin maken: typ in de console `localStorage.setItem("codelabAdmin", "true")`, of lees de admin-code in `js/settings.js`. Alles wat in de browser staat, kan de gebruiker zien en aanpassen. Echte bescherming hoort in de **Firestore Security Rules** (in de Firebase-console) en in custom claims (`token.claims.admin`, zie `auth.js`). Dat de `firebaseConfig` in de code staat is normaal; die mag publiek zijn.
- [ ] **Dubbele code opruimen.** `escapeHTML` staat twee keer (`utils.js` en `firebase/groups.js`). `togglePlayers` en `toggleGroups` in `admin-ui.js` zijn bijna hetzelfde: maak er één functie van.
- [ ] **Unieke id's.** Meerdere lessen gebruiken `id="codeResult"`. Een id moet op de pagina uniek zijn.
- [ ] **Eén plek voor voortgang.** Scores en XP staan in `localStorage` én in Firestore. Kies één "bron van waarheid".
- [ ] **Extra lessen.** De lessen die automatisch uit `extraLessons` gemaakt worden, hebben allemaal dezelfde algemene tekst. Schrijf ze echt uit.
- [ ] **Van `onclick` naar `addEventListener`.** Als de HTML geen `onclick` meer gebruikt, kunnen alle JS-bestanden modules worden en zijn de `window.X = ...` regels niet meer nodig.

Tip: maak voor elke stap een aparte commit, dan kun je altijd terug.
