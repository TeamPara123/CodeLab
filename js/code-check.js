// Controleren of de code die je in een les typt klopt.

/* =====================================
   CODE OEFENING
===================================== */

function checkCodeLesson(id) {

    const textarea =
        document.getElementById("lessonCode");


    const result =
        document.getElementById("codeResult");


    if (!textarea) {
        return;
    }


    const code =
        textarea.value.toLowerCase();


    let correct = false;


    if (id === 2) {

        correct =
            code.includes("<h1") &&
            code.includes("<p");

    }


    else if (id === 3) {

        correct =
            code.includes("<a") &&
            code.includes("href");

    }


    else if (id === 4) {

        correct =
            code.includes("<img") &&
            code.includes("src");

    }


    else if (id === 5) {

        correct =
            code.includes("<ul") &&
            code.includes("<li");

    }


    else {

        correct =
            code.trim().length > 10;

    }


    if (correct) {

        result.style.color = "#37d996";

        result.innerHTML =
            "✅ Goed gedaan! Je hebt deze oefening gehaald.";

        const currentScore =
            Number(
                lessonScores[id] || 0
            );


        if (currentScore <= 5) {

            lessonScores[id] = 10;

            localStorage.setItem(
                "codelabScores",
                JSON.stringify(lessonScores)
            );

            addXP(10);

        }


        renderLessons();

    }

    else {

        result.style.color = "#ff7777";

        result.innerHTML =
            "❌ Nog niet goed. Kijk naar de uitleg en probeer opnieuw.";

    }

}
