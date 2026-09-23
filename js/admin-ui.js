// Open- en dichtklappen van de spelers- en groepenlijst (admin).

/* =====================================
   CODELAB
===================================== */

function togglePlayers() {

    const content =
        document.getElementById("playersContent");

    const button =
        document.getElementById("playersToggle");

    if (content.style.display === "none") {

        content.style.display = "block";
        button.textContent = "▼ Verstoppen";

        loadPlayers();

    } else {

        content.style.display = "none";
        button.textContent = "▶ Tonen";
    }
}


function toggleGroups() {

    const content =
        document.getElementById("groupsContent");

    const button =
        document.getElementById("groupsToggle");

    if (content.style.display === "none") {

        content.style.display = "block";
        button.textContent = "▼ Verstoppen";

        loadGroups();

    } else {

        content.style.display = "none";
        button.textContent = "▶ Tonen";
    }
}
