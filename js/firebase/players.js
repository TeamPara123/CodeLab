// Admin: alle spelers laden, tonen en zoeken.

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { db } from "./firebase.js";

export let allPlayers = [];

window.loadPlayers = async function () {

    if (window.codelabAdmin !== true) {
        return;
    }

    const playersList = document.getElementById("playersList");

    if (!playersList) return;

    playersList.innerHTML = "<p>⏳ Spelers laden...</p>";

    try {

        const snapshot = await getDocs(
            collection(db, "users")
        );

        allPlayers = [];

        snapshot.forEach(function (playerDoc) {

            const player = playerDoc.data();

            allPlayers.push({
                id: playerDoc.id,
                username: player.username || "Onbekend",
                xp: player.xp || 0,
                lessonScores: player.lessonScores || {}
            });

        });

        displayPlayers(allPlayers);

    } catch (error) {

        console.error(error);

        playersList.innerHTML =
            "<p>❌ Spelers konden niet worden geladen.</p>";
    }
}

function displayPlayers(players) {

    const playersList =
        document.getElementById("playersList");

    if (!playersList) return;

    if (players.length === 0) {
        playersList.innerHTML =
            "<p>Geen spelers gevonden.</p>";
        return;
    }

    playersList.innerHTML = "";

    players.forEach(function (player) {

        const lessons =
            Object.keys(player.lessonScores).length;

        const playerCard =
            document.createElement("div");

        playerCard.className = "settings-card";

        playerCard.innerHTML = `
    <h3>👤 ${player.username}</h3>
    <p>⭐ XP: ${player.xp}</p>
    <p>📚 Lessen: ${lessons}</p>
`;

        playersList.appendChild(playerCard);
    });
}

window.searchPlayers = function () {
    const search = document.getElementById("playerSearch")
        .value
        .toLowerCase();

    const filteredPlayers = allPlayers.filter(function (player) {
        return player.username
            .toLowerCase()
            .includes(search);
    });

    displayPlayers(filteredPlayers);
};
