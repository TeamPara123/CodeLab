// De instellingenpagina: naam, thema, meldingen, reset, admin.

/* =========================
   CODELAB INSTELLINGEN
========================= */

let codelabUsername =
    localStorage.getItem("codelabUsername") || "Leerling";

let codelabTheme =
    localStorage.getItem("codelabTheme") || "dark";

let codelabNotifications =
    localStorage.getItem("codelabNotifications") !== "false";


function renderSettings() {

    const usernameElement =
        document.getElementById("settingsUsername");

    const xpElement =
        document.getElementById("settingsXP");

    const lessonsElement =
        document.getElementById("settingsLessons");

    const badgesElement =
        document.getElementById("settingsBadges");

    const themeText =
        document.getElementById("themeText");

    const themeButton =
        document.getElementById("themeButton");

    const notificationButton =
        document.getElementById("notificationButton");


    /* Gebruikersnaam */

    if (usernameElement) {
        usernameElement.textContent = codelabUsername;
    }


    /* XP */

    if (xpElement) {
        xpElement.textContent = xp + " XP";
    }


    /* Lessen */

    const completedLessons =
        Object.keys(lessonScores).filter(function (lesson) {
            return Number(lessonScores[lesson]) > 5;
        }).length;

    if (lessonsElement) {
        lessonsElement.textContent =
            completedLessons + " lessen";
    }


    /* Badges */

    let passed =
        Object.values(lessonScores)
            .filter(function (score) {
                return Number(score) > 5;
            }).length;

    let badgeCount = 0;

    if (passed >= 1) badgeCount++;
    if (passed >= 5) badgeCount++;
    if (passed >= 10) badgeCount++;
    if (passed >= 15) badgeCount++;
    if (passed >= 20) badgeCount++;
    if (passed >= 30) badgeCount++;
    if (passed >= 40) badgeCount++;
    if (passed >= 50) badgeCount++;
    if (passed >= 60) badgeCount++;
    if (passed >= 70) badgeCount++;
    if (xp >= 100) badgeCount++;
    if (xp >= 500) badgeCount++;

    if (badgesElement) {
        badgesElement.textContent =
            badgeCount + " badges";
    }


    /* Thema */

    if (codelabTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeText) {
            themeText.textContent = "Licht thema";
        }

        if (themeButton) {
            themeButton.textContent = "🌙 Donker";
        }

    } else {

        document.body.classList.remove("light-mode");

        if (themeText) {
            themeText.textContent = "Donker thema";
        }

        if (themeButton) {
            themeButton.textContent = "☀️ Licht";
        }
    }


    /* Notificaties */

    if (notificationButton) {

        notificationButton.textContent =
            codelabNotifications
                ? "🔔 Aan"
                : "🔕 Uit";
    }
}


/* =========================
   GEBRUIKERSNAAM
========================= */

function changeUsername() {

    const newName =
        prompt(
            "Welke gebruikersnaam wil je gebruiken?",
            codelabUsername
        );

    if (!newName) {
        return;
    }

    const cleanName =
        newName.trim();

    if (cleanName.length < 2) {
        alert("Je gebruikersnaam moet minstens 2 tekens hebben.");
        return;
    }

    codelabUsername =
        cleanName;

    localStorage.setItem(
        "codelabUsername",
        codelabUsername
    );

    renderSettings();

    alert(
        "Je gebruikersnaam is gewijzigd naar " +
        codelabUsername + "!"
    );
}


/* =========================
   THEMA
========================= */

function toggleTheme() {

    if (codelabTheme === "dark") {
        codelabTheme = "light";
    } else {
        codelabTheme = "dark";
    }

    localStorage.setItem(
        "codelabTheme",
        codelabTheme
    );

    renderSettings();
}


/* =========================
   NOTIFICATIES
========================= */

function toggleNotifications() {

    codelabNotifications =
        !codelabNotifications;

    localStorage.setItem(
        "codelabNotifications",
        codelabNotifications
    );

    renderSettings();
}


/* =========================
   VOORTGANG RESETTEN
========================= */

function resetProgress() {

    const confirmed =
        confirm(
            "Weet je zeker dat je AL je lessen, XP en voortgang wilt verwijderen?"
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("codelabScores");
    localStorage.removeItem("codelabXP");

    lessonScores = {};
    xp = 0;

    updateStats();
    renderSettings();
    renderLessons();
    renderProgress();

    alert(
        "Je CodeLab-voortgang is verwijderd."
    );
}

window.makeAdmin = function () {

    if (window.codelabAdmin === true) {
        alert("Je bent al admin! 👑");
        return;
    }

    const code = prompt("Voer de admin-code in:");

    if (code === "ADMINONLY123") {

        window.codelabAdmin = true;

        localStorage.setItem(
            "codelabAdmin",
            "true"
        );

        updateAdminButton();
        updateAdminSection();

        alert("🎉 Admin geactiveerd!");

    }
};

window.stopBeingAdmin = function () {
    const confirmed = confirm(
        "Weet je zeker dat je geen admin meer wilt zijn?"
    );

    if (!confirmed) return;

    window.codelabAdmin = false;
    localStorage.removeItem("codelabAdmin");

    updateAdminButton();
    updateAdminSection();

    const adminStatusText =
        document.getElementById("adminStatusText");

    if (adminStatusText) {
        adminStatusText.textContent =
            "Je bent geen admin meer.";
    }

    alert("Je bent geen admin meer.");

    showPage("account");
};

function updateAdminSection() {
    const adminButton = document.getElementById("adminButton");
    const adminStatus = document.getElementById("adminStatus");

    if (!adminButton || !adminStatus) return;

    if (window.codelabAdmin === true) {
        adminButton.style.display = "none";
        adminStatus.textContent = "👑 Je bent admin!";
    } else {
        adminButton.style.display = "";
        adminStatus.textContent = "";
    }
}
