// XP geven, statistieken bijwerken en de voortgangspagina.

/* =====================================
   XP
===================================== */

function addXP(amount) {

    xp += amount;


    localStorage.setItem(
        "codelabXP",
        xp
    );


    updateStats();

}


/* =====================================
   STATS
===================================== */

function updateStats() {

    const passed =
        Object.values(lessonScores)
            .filter(function (score) {

                return Number(score) > 5;

            }).length;


    const percent =
        Math.round(
            passed /
            lessons.length *
            100
        );


    const level =
        Math.floor(xp / 100) + 1;


    document.getElementById("xp")
        .innerText = xp;


    document.getElementById("statLessons")
        .innerText = passed;


    document.getElementById("statXP")
        .innerText = xp;


    document.getElementById("statLevel")
        .innerText = level;


    document.getElementById("statPercent")
        .innerText = percent + "%";


    document.getElementById("homeProgress")
        .style.width = percent + "%";

}


/* =====================================
   VOORTGANG
===================================== */

function renderProgress() {

    const passed =
        Object.values(lessonScores)
            .filter(function (score) {

                return Number(score) > 5;

            }).length;


    const percent =
        Math.round(
            passed /
            lessons.length *
            100
        );


    document.getElementById("progressText")
        .innerText =
        `${passed} / ${lessons.length} lessen`;


    document.getElementById("progressBar")
        .style.width =
        percent + "%";


    const badges = [
        ["🌱", "Eerste stap", passed >= 1],
        ["🎯", "Doorzetter", passed >= 5],
        ["🔥", "Op dreef", passed >= 10],
        ["📚", "HTML leerling", passed >= 15],
        ["🏗️", "HTML bouwer", passed >= 20],
        ["🎨", "CSS coder", passed >= 30],
        ["⚡", "JavaScript coder", passed >= 40],
        ["💻", "Developer", passed >= 50],
        ["🚀", "PRO CODER", passed >= 60],
        ["🏆", "CodeLab legende", passed >= 70],
        ["🌟", "XP-verzamelaar", xp >= 100],
        ["💎", "XP-meester", xp >= 500]
    ];


    document.getElementById("badges")
        .innerHTML = badges.map(function (b) {

            return `

        <div class="badge ${b[2] ? "" : "locked"
                }">

            <div class="badge-icon">
                ${b[0]}
            </div>

            <b>
                ${b[1]}
            </b>

            <p style="
                color:#7f89a7;
                margin-top:7px;
            ">

                ${b[2]
                    ? "Vrijgespeeld!"
                    : "🔒 Vergrendeld"
                }

            </p>

        </div>

    `;

        }).join("");

}
