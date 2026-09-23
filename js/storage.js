// Voortgang (scores, XP, admin) inlezen uit localStorage.

/* =====================================
   OPSLAG
===================================== */

let lessonScores =
    JSON.parse(
        localStorage.getItem("codelabScores") || "{}"
    );

let xp =
    Number(
        localStorage.getItem("codelabXP") || 0
    );

window.codelabAdmin =
    localStorage.getItem("codelabAdmin") === "true";
