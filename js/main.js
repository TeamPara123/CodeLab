// Startcode: dit draait meteen bij het laden. Dit bestand laadt als laatste,
// zodat alle functies uit de andere bestanden al bestaan.

updateAdminButton();
updateAdminSection();

/* =====================================
   START
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    updateStats();
    renderLessons();
    renderQuiz();
    openEditor("html");

});
