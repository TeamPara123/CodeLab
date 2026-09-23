// De grote quiz op de Quiz-pagina.

/* =====================================
   QUIZ
===================================== */

function renderQuiz() {

    const area = document.getElementById("quizArea");

    const questions = [
        {
            question: "Welke taal gebruik je voor de structuur van een website?",
            answers: ["HTML", "CSS", "JavaScript", "Python"],
            correct: 0
        },
        {
            question: "Welke taal gebruik je vooral om een website op te maken?",
            answers: ["HTML", "CSS", "JavaScript", "SQL"],
            correct: 1
        },
        {
            question: "Welke taal maakt een website interactief?",
            answers: ["HTML", "CSS", "JavaScript", "XML"],
            correct: 2
        },
        {
            question: "Welke HTML-tag gebruik je voor een paragraaf?",
            answers: ["<h1>", "<p>", "<img>", "<a>"],
            correct: 1
        },
        {
            question: "Welke HTML-tag gebruik je voor de grootste titel?",
            answers: ["<h1>", "<h6>", "<title>", "<head>"],
            correct: 0
        },
        {
            question: "Welke tag gebruik je voor een afbeelding?",
            answers: ["<image>", "<photo>", "<img>", "<picture>"],
            correct: 2
        },
        {
            question: "Welke tag gebruik je voor een link?",
            answers: ["<link>", "<a>", "<url>", "<href>"],
            correct: 1
        },
        {
            question: "Waarvoor gebruik je CSS?",
            answers: [
                "Voor de structuur",
                "Voor styling en opmaak",
                "Voor databases",
                "Voor bestanden"
            ],
            correct: 1
        },
        {
            question: "Welke CSS-eigenschap verandert de tekstkleur?",
            answers: ["background", "font-size", "color", "text"],
            correct: 2
        },
        {
            question: "Welke CSS-eigenschap verandert de achtergrondkleur?",
            answers: ["color", "background", "bg-color", "back"],
            correct: 1
        },
        {
            question: "Wat doet JavaScript?",
            answers: [
                "Het maakt websites interactief",
                "Het maakt alleen afbeeldingen",
                "Het vervangt HTML",
                "Het maakt internet"
            ],
            correct: 0
        },
        {
            question: "Welke HTML-tag maakt een knop?",
            answers: ["<click>", "<button>", "<btn>", "<inputbutton>"],
            correct: 1
        },
        {
            question: "Welke HTML-tag gebruik je voor een lijstitem?",
            answers: ["<list>", "<item>", "<li>", "<ulitem>"],
            correct: 2
        },
        {
            question: "Waarvoor staat HTML?",
            answers: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyper Tool Making Language",
                "Home Text Markup Language"
            ],
            correct: 0
        },
        {
            question: "Waarvoor staat CSS?",
            answers: [
                "Computer Style System",
                "Cascading Style Sheets",
                "Creative Style System",
                "Code Styling System"
            ],
            correct: 1
        },
        {
            question: "Welke JavaScript-opdracht toont iets in de console?",
            answers: [
                "console.log()",
                "print.console()",
                "show.console()",
                "console.show()"
            ],
            correct: 0
        },
        {
            question: "Welke CSS-eigenschap maakt tekst groter?",
            answers: ["font-size", "text-size", "size", "font"],
            correct: 0
        },
        {
            question: "Welke HTML-tag bevat normaal de zichtbare inhoud?",
            answers: ["<head>", "<body>", "<html>", "<title>"],
            correct: 1
        },
        {
            question: "Waarvoor gebruik je GitHub vaak?",
            answers: [
                "Om code online te bewaren en delen",
                "Om foto's te bewerken",
                "Om video's te maken",
                "Om een computer sneller te maken"
            ],
            correct: 0
        },
        {
            question: "Wat is een variabele in JavaScript?",
            answers: [
                "Een plek om gegevens op te slaan",
                "Een HTML-tag",
                "Een CSS-kleur",
                "Een afbeelding"
            ],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    function showQuestion() {

        const q = questions[currentQuestion];

        area.innerHTML = `
    <div class="exercise">

        <h2>🧠 CodeLab Quiz</h2>

        <p style="margin-top:10px;color:#9aa4c0;">
            Vraag ${currentQuestion + 1} van ${questions.length}
        </p>

        <div style="
            background:#293554;
            height:8px;
            border-radius:10px;
            margin-top:15px;
            overflow:hidden;
        ">
            <div style="
                width:${((currentQuestion + 1) / questions.length) * 100}%;
                height:100%;
                background:#4969e8;
            "></div>
        </div>

        <h3 style="margin-top:25px;">
            ${q.question}
        </h3>

        ${q.answers.map((answer, index) => `
            <button
                class="quiz-answer"
                onclick="answerGeneralQuiz(${index})">
                ${answer.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </button>
        `).join("")}

    </div>
`;
    }

    window.answerGeneralQuiz = function (answer) {

        const q = questions[currentQuestion];

        userAnswers.push(answer);

        if (answer === q.correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {

            showQuestion();

        } else {

            const percentage =
                Math.round((score / questions.length) * 100);

            window.quizQuestions = questions;
            window.quizUserAnswers = userAnswers;

            area.innerHTML = `
        <div class="exercise" style="text-align:center;">

            <h2>🏁 Quiz klaar!</h2>

            <p style="
                font-size:32px;
                margin:25px 0;
                font-weight:bold;
            ">
                ${score}/${questions.length}
            </p>

            <p>
                Je had ${percentage}% goed.
            </p>

            <button
                class="primary"
                onclick="showQuizAnswers()"
                style="margin-top:20px;">
                👀 Zie antwoorden
            </button>

            <button
                class="primary"
                onclick="renderQuiz()"
                style="margin-top:10px;">
                🔄 Opnieuw proberen
            </button>

        </div>
    `;

            addXP(score);
        }
    };

    window.showQuizAnswers = function () {

        const questions = window.quizQuestions;
        const answers = window.quizUserAnswers;

        area.innerHTML = `
    <div class="exercise">

        <h2>📋 Antwoorden</h2>

        ${questions.map((q, index) => {

            const userAnswer = answers[index];
            const correctAnswer = q.correct;
            const goed = userAnswer === correctAnswer;

            return `
                <div style="
                    padding:18px;
                    margin-top:15px;
                    border-radius:12px;
                    background:#151d33;
                    border:1px solid ${goed ? "#37d996" : "#ff7777"};
                ">

                    <h3>
                        ${index + 1}. ${q.question}
                    </h3>

                    <p style="margin-top:10px;">
                        Jouw antwoord:
                        <strong style="
                            color:${goed ? "#37d996" : "#ff7777"};
                        ">
                            ${q.answers[userAnswer]
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}
                        </strong>
                    </p>

                    <p style="margin-top:8px;">
                        Juiste antwoord:
                        <strong style="color:#37d996;">
                            ${q.answers[correctAnswer]
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}
                        </strong>
                    </p>

                    <p style="margin-top:8px;">
                        ${goed ? "✅ Goed!" : "❌ Fout"}
                    </p>

                </div>
            `;

        }).join("")}

        <button
            class="primary"
            onclick="renderQuiz()"
            style="margin-top:20px;">
            🔄 Opnieuw proberen
        </button>

    </div>
`;
    };

    showQuestion();
}
