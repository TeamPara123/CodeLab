// Alle lessen: de 5 uitgeschreven lessen + de automatisch gemaakte extra lessen.

const lessons = [

    /* ===============================
       HTML
    =============================== */

    {
        id: 1,
        level: "HTML • Beginner",
        title: "Wat is HTML?",
        description: "Leer wat HTML is en hoe een website begint.",
        points: 10,

        content: `
    <h1>Les 1: Wat is HTML? 🌐</h1>

    <p>
        HTML is de taal waarmee je de structuur van een website maakt.
    </p>

    <h2>Een simpele website</h2>

    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
    &lt;title&gt;Mijn website&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;h1&gt;Hallo wereld!&lt;/h1&gt;

&lt;/body&gt;

&lt;/html&gt;</code></pre>

    <h2>Belangrijk</h2>

    <p>
        HTML gebruikt zogenaamde <b>tags</b>.
    </p>

    <ul>
        <li>&lt;h1&gt; = titel</li>
        <li>&lt;p&gt; = paragraaf</li>
        <li>&lt;button&gt; = knop</li>
        <li>&lt;img&gt; = afbeelding</li>
        <li>&lt;a&gt; = link</li>
    </ul>

    <h2>🎯 Lesdoel</h2>

    <p>
        Na deze les weet je wat HTML is en herken je de belangrijkste tags.
    </p>

    <div class="exercise">

        <h2>🧠 Test</h2>

        <p>
            Je moet <b>meer dan de helft</b> van de punten halen.
            Deze test heeft 10 punten.
        </p>

        <div id="lessonQuiz"></div>

    </div>
`
    },

    {
        id: 2,
        level: "HTML • Beginner",
        title: "Titels en paragrafen",
        description: "Leer h1, h2 en p.",
        points: 10,

        content: `
    <h1>Les 2: Titels en paragrafen 📝</h1>

    <p>
        Met HTML kun je titels en gewone tekst maken.
    </p>

    <pre><code>&lt;h1&gt;Mijn titel&lt;/h1&gt;

&lt;p&gt;
Dit is een paragraaf.
&lt;/p&gt;</code></pre>

    <h2>🎯 Oefening</h2>

    <p>
        Maak een h1 en een p.
    </p>

    <textarea id="lessonCode"
        placeholder="Schrijf je HTML hier..."></textarea>

    <button class="check-button"
        onclick="checkCodeLesson(2)">
        Controleer
    </button>

    <div id="codeResult" class="result"></div>
`
    },

    {
        id: 3,
        level: "HTML • Beginner",
        title: "Links",
        description: "Leer links maken.",
        points: 10,

        content: `
    <h1>Les 3: Links 🔗</h1>

    <p>
        Met de a-tag maak je een link.
    </p>

    <pre><code>&lt;a href="https://example.com"&gt;
Klik hier
&lt;/a&gt;</code></pre>

    <h2>🎯 Oefening</h2>

    <p>
        Maak een link met een href.
    </p>

    <textarea id="lessonCode"
        placeholder="Schrijf je HTML hier..."></textarea>

    <button class="check-button"
        onclick="checkCodeLesson(3)">
        Controleer
    </button>

    <div id="codeResult" class="result"></div>
`
    },

    {
        id: 4,
        level: "HTML • Beginner",
        title: "Afbeeldingen",
        description: "Leer afbeeldingen toevoegen.",
        points: 10,

        content: `
    <h1>Les 4: Afbeeldingen 🖼️</h1>

    <pre><code>&lt;img src="foto.jpg" alt="Mijn foto"&gt;</code></pre>

    <p>
        src bepaalt welke afbeelding wordt geladen.
    </p>

    <textarea id="lessonCode"
        placeholder="Schrijf je HTML hier..."></textarea>

    <button class="check-button"
        onclick="checkCodeLesson(4)">
        Controleer
    </button>

    <div id="codeResult" class="result"></div>
`
    },

    {
        id: 5,
        level: "HTML • Beginner",
        title: "Lijsten",
        description: "Maak opsommingen.",
        points: 10,

        content: `
    <h1>Les 5: Lijsten 📋</h1>

    <pre><code>&lt;ul&gt;
    &lt;li&gt;Minecraft&lt;/li&gt;
    &lt;li&gt;Roblox&lt;/li&gt;
&lt;/ul&gt;</code></pre>

    <textarea id="lessonCode"
        placeholder="Schrijf je HTML hier..."></textarea>

    <button class="check-button"
        onclick="checkCodeLesson(5)">
        Controleer
    </button>

    <div id="codeResult" class="result"></div>
`
    }

];


/* =====================================
   EXTRA LESSEN MAKEN
===================================== */

const extraLessons = [

    ["HTML", "Knoppen", "Leer buttons maken."],
    ["HTML", "Divs", "Leer onderdelen groeperen."],
    ["HTML", "Classes", "Leer classes gebruiken."],
    ["HTML", "IDs", "Leer IDs gebruiken."],
    ["HTML", "Tabellen", "Maak tabellen."],
    ["HTML", "Formulieren", "Leer inputvelden maken."],
    ["HTML", "Header", "Maak de bovenkant van een website."],
    ["HTML", "Main", "Maak het hoofdgedeelte."],
    ["HTML", "Footer", "Maak de onderkant."],
    ["HTML", "Audio", "Voeg geluid toe."],
    ["HTML", "Video", "Voeg video's toe."],
    ["HTML", "Semantische HTML", "Schrijf betere HTML."],
    ["HTML", "Toegankelijkheid", "Maak websites voor iedereen."],
    ["HTML", "HTML eindproject", "Combineer je HTML-kennis."],

    ["CSS", "Wat is CSS?", "Leer websites stylen."],
    ["CSS", "Kleuren", "Verander kleuren."],
    ["CSS", "Fonts", "Verander lettertypes."],
    ["CSS", "Margin", "Leer ruimte buiten elementen."],
    ["CSS", "Padding", "Leer ruimte binnen elementen."],
    ["CSS", "Borders", "Maak randen."],
    ["CSS", "Border radius", "Maak afgeronde hoeken."],
    ["CSS", "Flexbox", "Zet elementen naast elkaar."],
    ["CSS", "Grid", "Maak layouts."],
    ["CSS", "Hover", "Reageer op de muis."],
    ["CSS", "Transitions", "Maak animaties vloeiend."],
    ["CSS", "Responsive design", "Maak websites voor gsm."],
    ["CSS", "CSS eindproject", "Bouw een mooie website."],

    ["JavaScript", "Wat is JavaScript?", "Maak websites interactief."],
    ["JavaScript", "Variabelen", "Bewaar informatie."],
    ["JavaScript", "Strings", "Werk met tekst."],
    ["JavaScript", "Numbers", "Werk met getallen."],
    ["JavaScript", "If statements", "Laat code keuzes maken."],
    ["JavaScript", "Functies", "Maak herbruikbare code."],
    ["JavaScript", "Buttons", "Reageer op klikken."],
    ["JavaScript", "DOM", "Verander HTML."],
    ["JavaScript", "Events", "Reageer op gebeurtenissen."],
    ["JavaScript", "Arrays", "Bewaar meerdere waarden."],
    ["JavaScript", "Loops", "Herhaal code."],
    ["JavaScript", "Objects", "Maak objecten."],
    ["JavaScript", "Random", "Gebruik willekeurige getallen."],
    ["JavaScript", "Timers", "Laat code later uitvoeren."],
    ["JavaScript", "LocalStorage", "Bewaar gegevens."],
    ["JavaScript", "JavaScript eindproject", "Combineer JavaScript."],

    ["PRO", "Code organiseren", "Leer grote projecten organiseren."],
    ["PRO", "HTML + CSS + JS", "Combineer de drie talen."],
    ["PRO", "Debugging", "Leer fouten vinden."],
    ["PRO", "Developer Tools", "Gebruik browsertools."],
    ["PRO", "Git", "Leer versiebeheer."],
    ["PRO", "GitHub", "Zet code online."],
    ["PRO", "APIs", "Gebruik gegevens van andere systemen."],
    ["PRO", "JSON", "Leer gegevensstructuren."],
    ["PRO", "Webapps", "Bouw echte webapps."],
    ["PRO", "PRO CODER", "Bouw je ultieme eindproject."]
];


extraLessons.forEach(function (item, index) {

    const id = index + 6;

    let level = item[0];

    let levelName = "";

    if (level === "HTML") {
        levelName = "HTML • Gevorderd";
    }

    if (level === "CSS") {
        levelName = "CSS";
    }

    if (level === "JavaScript") {
        levelName = "JavaScript";
    }

    if (level === "PRO") {
        levelName = "Web Development • PRO";
    }

    lessons.push({

        id: id,

        level: levelName,

        title: item[1],

        description: item[2],

        points: 10,

        content: `
    <h1>Les ${id}: ${item[1]}</h1>

    <p>
        ${item[2]}
    </p>

    <h2>📚 Uitleg</h2>

    <p>
        In deze les leer je hoe je ${item[1].toLowerCase()}
        gebruikt tijdens het programmeren.
    </p>

    <h2>🎯 Oefening</h2>

    <p>
        Schrijf zelf code over dit onderwerp.
    </p>

    <textarea id="lessonCode"
        placeholder="Schrijf hier je code..."></textarea>

    <button class="check-button"
        onclick="checkCodeLesson(${id})">
        Controleer
    </button>

    <div id="codeResult" class="result"></div>
`
    });

});
