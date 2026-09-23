// Admin: alle spelers laden, tonen en zoeken.

import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

export let allPlayers = [];

window.loadPlayers = async function () {

    const playersList = document.getElementById("playersList");

    if (!playersList) return;

    if (window.codelabAdmin !== true) {
        playersList.innerHTML = "<p>🔒 Alleen admins kunnen dit zien.</p>";
        return;
    }

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
                role: player.role || "user",
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

        const isMe = player.id === auth.currentUser?.uid;
        let roleButton = "";

        if (window.codelabRole === "superadmin" && !isMe && player.role !== "superadmin") {
            const newRole = player.role === "admin" ? "user" : "admin";
            const label = newRole === "admin" ? "👑 Maak admin" : "👤 Maak gewone gebruiker";
            roleButton = `<button onclick="setRole('${player.id}', '${newRole}')">${label}</button>`;
        }

        playerCard.innerHTML = `
    <h3>👤 ${player.username}</h3>
    <p>🎭 Rol: ${player.role}</p>
    <p>⭐ XP: ${player.xp}</p>
    <p>📚 Lessen: ${lessons}</p>
    ${roleButton}
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

window.setRole = async function (uid, newRole) {
    if (!confirm(`Rol veranderen naar "${newRole}"?`)) return;

    try {
        await updateDoc(doc(db, "users", uid), { role: newRole });
        await loadPlayers();
    } catch (error) {
        console.error(error);
        alert("❌ Dat mag niet (of er ging iets mis).");
    }
};
