// De quiz aan het einde van les 1 en de score daarvan.

/* =====================================
   LES 1 QUIZ
===================================== */

function createLesson1Quiz() {

    const quiz =
        document.getElementById("lessonQuiz");


    const questions = [

        {
            question: "Waarvoor gebruik je HTML?",
            answers: [
                "Voor de structuur van een website",
                "Voor alleen kleuren",
                "Voor muziek",
                "Voor WiFi"
            ],
            correct: 0
        },

        {
            question: "Welke tag gebruik je voor een grote titel?",
            answers: [
                "<p>",
                "<h1>",
                "<img>",
                "<button>"
            ],
            correct: 1
        },

        {
            question: "Welke tag gebruik je voor een paragraaf?",
            answers: [
                "<p>",
                "<h1>",
                "<img>",
                "<a>"
            ],
            correct: 0
        },

        {
            question: "Welke tag gebruik je voor een afbeelding?",
            answers: [
                "<photo>",
                "<picture>",
                "<img>",
                "<image>"
            ],
            correct: 2
        },

        {
            question: "Welke tag gebruik je voor een link?",
            answers: [
                "<url>",
                "<a>",
                "<linkbutton>",
                "<go>"
            ],
            correct: 1
        },

        {
            question: "Waar staat HTML voor?",
            answers: [
                "HyperText Markup Language",
                "High Tech Machine Language",
                "Home Tool Mark Language",
                "Hyper Tool Making Language"
            ],
            correct: 0
        },

        {
            question: "Welke tag bevat normaal de zichtbare pagina-inhoud?",
            answers: [
                "<head>",
                "<title>",
                "<body>",
                "<meta>"
            ],
            correct: 2
        },

        {
            question: "Welke tag maakt een knop?",
            answers: [
                "<click>",
                "<button>",
                "<press>",
                "<btn>"
            ],
            correct: 1
        },

        {
            question: "Welke tag gebruik je voor een titel?",
            answers: [
                "<h1>",
                "<titletext>",
                "<heading>",
                "<big>"
            ],
            correct: 0
        },

        {
            question: "Waarvoor is een HTML-tag bedoeld?",
            answers: [
                "Om de structuur/betekenis van inhoud aan te geven",
                "Om je computer sneller te maken",
                "Om WiFi te maken",
                "Om foto's te tekenen"
            ],
            correct: 0
        }

    ];


    let html = "";

    questions.forEach(function (q, index) {

        html += `

    <div style="
        margin-top:20px;
        padding:15px;
        background:#11182d;
        border-radius:10px;
    ">

        <b>
            ${index + 1}. ${q.question}
        </b>

        <div>

            ${q.answers.map(function (answer, i) {

            return `

                    <button
                        class="quiz-answer"
                        data-question="${index}"
                        data-answer="${i}"
                        style="
                            display:block;
                            width:100%;
                            margin-top:8px;
                            padding:10px;
                            background:#202945;
                            color:white;
                            border:1px solid #303a5b;
                            border-radius:7px;
                            text-align:left;
                            cursor:pointer;
                        ">

                            ${answer.replace(/</g, "&lt;").replace(/>/g, "&gt;")}

                    </button>

                `;

        }).join("")}

        </div>

    </div>

`;

    });


    html += `

<button
    class="primary"
    style="width:100%;margin-top:25px;"
    onclick="finishLesson1()">

    Bekijk mijn score

</button>

<div
    id="lesson1Result"
    class="result"
    style="margin-top:15px;">
</div>

    `;


    quiz.innerHTML = html;


    document.querySelectorAll(".quiz-answer")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const question =
                    this.dataset.question;

                const buttons =
                    document.querySelectorAll(
                        `.quiz-answer[data-question="${question}"]`
                    );


                buttons.forEach(function (b) {

                    b.style.opacity = "0.5";

                });


                this.style.opacity = "1";

                this.dataset.selected = "true";

            });

        });


    window.lesson1Questions = questions;

}


/* =====================================
   LES 1 SCORE
===================================== */

function finishLesson1() {

    const questions =
        window.lesson1Questions;


    let score = 0;


    questions.forEach(function (q, index) {

        const selected =
            document.querySelector(
                `.quiz-answer[data-question="${index}"][data-selected="true"]`
            );


        if (
            selected &&
            Number(selected.dataset.answer) === q.correct
        ) {

            score++;

        }

    });


    lessonScores[1] = score;


    localStorage.setItem(
        "codelabScores",
        JSON.stringify(lessonScores)
    );


    const result =
        document.getElementById("lesson1Result");


    if (score > 5) {

        result.style.color = "#37d996";

        result.innerHTML =
            `
    🎉 <b>${score}/10!</b><br>
    Je hebt meer dan de helft gehaald.
    <br>
    🔓 Les 2 is nu unlocked!
    `;


        addXP(score);


    } else {

        result.style.color = "#ff7777";

        result.innerHTML =
            `
    ❌ <b>${score}/10</b><br>
    Je hebt meer dan 5 punten nodig.
    Probeer de les opnieuw.
    `;

    }


    renderLessons();

    updateStats();

}
