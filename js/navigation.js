// Wisselen tussen pagina's en de admin-knop in het menu.

function updateAdminButton() {

    const adminButton =
        document.getElementById("adminNavButton");

    if (!adminButton) return;

    if (window.codelabAdmin === true) {
        adminButton.style.display = "";
    } else {
        adminButton.style.display = "none";
    }
}

/* =====================================
   PAGINA'S
===================================== */

function showPage(page, button) {

    // Account is altijd toegankelijk
    if (page !== "account" && !window.codelabUser) {
        page = "account";
    }

    document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
    });

    const selected = document.getElementById(page);

    if (selected) {
        selected.classList.add("active");
    }

    document.querySelectorAll(".nav-button").forEach(function (b) {
        b.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    if (page === "lessons") {
        renderLessons();
    }

    if (page === "progress") {
        renderProgress();
    }

    if (page === "quiz") {
        renderQuiz();
    }

    if (page === "practice") {
        openEditor("html");
    }

    if (page === "settings") {
        renderSettings();

        if (window.codelabAdmin === true) {
            loadGroups();
            loadPlayers();
        }
    }

    if (page === "adminSettings") {

        loadPlayers();
        loadGroups();

    }
}
