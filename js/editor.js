// De oefen-editor: code tonen en uitvoeren.

/* =====================================
   EDITOR
===================================== */

function openEditor(type, button) {

    if (button) {

        document.querySelectorAll(".tab")
            .forEach(function (b) {

                b.classList.remove("active");

            });

        button.classList.add("active");

    }


    const area =
        document.getElementById("editorArea");


    if (type === "css") {

        const passedHTML =
            Object.keys(lessonScores)
                .filter(function (id) {

                    return Number(id) <= 20 &&
                        Number(lessonScores[id]) > 5;

                }).length;


        if (passedHTML < 20) {

            area.innerHTML = `

        <div class="locked-box">

            <h2>🔒 CSS is nog locked</h2>

            <p>
                Haal meer dan 5/10 bij alle HTML-lessen.
            </p>

        </div>

    `;

            return;

        }

    }
    //test
    if (type === "js") {

        const passed =
            Object.keys(lessonScores)
                .filter(function (id) {

                    return Number(lessonScores[id]) > 5;

                }).length;


        if (passed < 34) {

            area.innerHTML = `

        <div class="locked-box">

            <h2>🔒 JavaScript is nog locked</h2>

            <p>
                Voltooi eerst de HTML- en CSS-lessen.
            </p>

        </div>

    `;

            return;

        }

    }


    let code = "";


    if (type === "html") {

        code = `<!DOCTYPE html>
<html>

<head>
    <title>Mijn website</title>
</head>

<body>

    <h1>Hallo wereld!</h1>

    <p>Mijn eerste website.</p>

</body>

</html>`;

    }


    if (type === "css") {

        code = `body {
    background: #111;
    color: white;
    font-family: Arial;
}

h1 {
    color: cyan;
}`;

    }


    if (type === "js") {

        code = `document.body.innerHTML =
    "<h1>Hallo vanuit JavaScript!</h1>";`;

    }


    area.innerHTML = `

<div class="editor">

    <div class="editor-box">

        <div class="editor-title">
            ${type.toUpperCase()} CODE
        </div>

        <textarea
            id="codeEditor"
            oninput="runCode('${type}')"
            spellcheck="false">${code}</textarea>

    </div>


    <div class="editor-box">

        <div class="editor-title">
            PREVIEW
        </div>

        <iframe
            id="preview"
            class="preview">
        </iframe>

    </div>

</div>

    `;


    runCode(type);

}


/* =====================================
   CODE UITVOEREN
===================================== */

function runCode(type) {

    const editor =
        document.getElementById("codeEditor");


    const preview =
        document.getElementById("preview");


    if (!editor || !preview) {
        return;
    }


    const code =
        editor.value;


    if (type === "html") {

        preview.srcdoc = code;

    }


    if (type === "css") {

        preview.srcdoc = `

    <style>

        ${code}

    </style>

    <h1>Mijn website</h1>

    <p>Dit is een test.</p>

    <button>Knop</button>

`;

    }


    if (type === "js") {

        const scriptOpen = "<" + "script>";
        const scriptClose = "<" + "/script>";

        preview.srcdoc = `
<h1 id="titel">JavaScript</h1>

<button
    onclick="document.getElementById('titel').innerText='Gelukt!'">
    Klik mij
</button>

${scriptOpen}
    ${code}
${scriptClose}
    `;

    }

}

function toggleExplanation(type) {
    const shortText = document.getElementById("shortExplanation");
    const fullText = document.getElementById("fullExplanation");

    if (type === "short") {
        shortText.style.display = "block";
        fullText.style.display = "none";
    } else {
        shortText.style.display = "none";
        fullText.style.display = "block";
    }
}
