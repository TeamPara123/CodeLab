// Lessenlijst tonen, bepalen welke les open is, een les openen.

/* =====================================
   LESSEN
===================================== */

function isUnlocked(id) {

    /* LES 1 ALTIJD OPEN */

    if (id === 1) {

        return true;

    }


    /* Kijk naar score vorige les */

    const previousScore =
        Number(
            lessonScores[id - 1] || 0
        );


    /* Meer dan de helft */

    return previousScore > 5;

}


/* =====================================
   LESSEN TONEN
===================================== */

function renderLessons() {

    const list =
        document.getElementById("lessonList");

    list.innerHTML = "";


    let currentLevel = "";

    let grid = null;


    lessons.forEach(function (lesson) {

        if (lesson.level !== currentLevel) {

            currentLevel = lesson.level;


            const level =
                document.createElement("div");

            level.className = "level";


            level.innerHTML = `

        <h2 class="level-title">
            ${lesson.level}
        </h2>

        <div class="lessons"></div>

    `;


            list.appendChild(level);


            grid =
                level.querySelector(".lessons");

        }


        const unlocked =
            isUnlocked(lesson.id);


        const score =
            lessonScores[lesson.id];


        const card =
            document.createElement("div");


        card.className =
            "lesson " +
            (!unlocked ? "locked" : "");


        let status = "";


        if (score !== undefined) {

            status =
                `<p style="color:#37d996;margin-top:10px;">
            ✅ Score: ${score}/10
        </p>`;

        }


        card.innerHTML = `

    <div class="lesson-number">
        LES ${lesson.id}
    </div>

    <h3>
        ${lesson.title}
    </h3>

    <p>
        ${lesson.description}
    </p>

    ${status}

    ${unlocked
                ?
                `
        <button
            class="lesson-button"
            onclick="openLesson(${lesson.id})">

            ${score !== undefined
                    ? "Opnieuw maken"
                    : "Start les →"}

        </button>
        `
                :
                `
        <p style="margin-top:15px;">
            🔒 Vorige les: meer dan 5/10 nodig
        </p>
        `
            }

`;


        grid.appendChild(card);

    });

}


/* =====================================
   LES OPENEN
===================================== */

function openLesson(id) {

    if (!isUnlocked(id)) {

        alert(
            "🔒 Deze les is nog vergrendeld.\n\n" +
            "Je moet meer dan de helft halen bij de vorige les."
        );

        return;

    }


    const lesson =
        lessons.find(function (l) {

            return l.id === id;

        });


    document.querySelectorAll(".page")
        .forEach(function (p) {

            p.classList.remove("active");

        });


    document.getElementById("lessonPage")
        .classList.add("active");


    document.getElementById("lessonContent")
        .innerHTML = lesson.content;


    /* LES 1 heeft een echte quiz */

    if (id === 1) {

        createLesson1Quiz();

    }

}
