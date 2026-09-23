// Admin: groepen maken, beheren en verwijderen.

import { doc, setDoc, collection, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import { allPlayers } from "./players.js";

// =====================================
// 👥 GROEPEN
// =====================================

let allGroups = [];

window.createGroup = async function () {

    if (window.codelabAdmin !== true) {
        alert("❌ Alleen admins kunnen groepen maken.");
        return;
    }

    const input = document.getElementById("groupName");

    if (!input) {
        alert("❌ Groep-veld niet gevonden.");
        return;
    }

    const groupName = input.value.trim();

    if (!groupName) {
        alert("❌ Geef de groep een naam.");
        return;
    }

    if (!auth.currentUser) {
        alert("❌ Je bent niet ingelogd.");
        return;
    }

    try {

        const groupId =
            groupName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-")
            + "-" + Date.now();

        await setDoc(
            doc(db, "groups", groupId),
            {
                name: groupName,
                createdAt: new Date().toISOString(),
                createdBy: auth.currentUser.uid,
                players: []
            }
        );

        input.value = "";

        alert("✅ Groep aangemaakt!");

        await loadGroups();

    } catch (error) {

        console.error("Groep maken:", error);

        alert(
            "❌ Groep kon niet worden aangemaakt:\n" +
            error.message
        );
    }
};


window.loadGroups = async function () {
    const groupsList =
        document.getElementById("groupsList");

    if (!groupsList) {
        return;
    }

    if (window.codelabAdmin !== true) {
        groupsList.innerHTML = "<p>🔒 Alleen admins kunnen dit zien.</p>";
        return;
    }

    groupsList.innerHTML =
        "<p>⏳ Groepen laden...</p>";

    try {

        const snapshot =
            await getDocs(
                collection(db, "groups")
            );

        allGroups = [];

        snapshot.forEach(function (groupDoc) {

            const group =
                groupDoc.data();

            allGroups.push({
                id: groupDoc.id,
                name: group.name || "Naamloos",
                players: group.players || []
            });

        });

        displayGroups();

    } catch (error) {

        console.error("Groepen laden:", error);

        groupsList.innerHTML =
            "<p>❌ Groepen konden niet worden geladen.</p>";
    }
};


function displayGroups() {

    const groupsList = document.getElementById("groupsList");

    if (!groupsList) return;

    if (allGroups.length === 0) {
        groupsList.innerHTML = "<p>📭 Nog geen groepen.</p>";
        return;
    }

    groupsList.innerHTML = "";

    allGroups.forEach(function (group) {

        const card = document.createElement("div");

        card.className = "settings-card";

        card.innerHTML = `
    <h3>👥 ${escapeHTML(group.name)}</h3>

    <p style="margin-top:10px;">
        👑 Owner:
        <strong>
            ${escapeHTML(group.ownerName || "Geen owner")}
        </strong>
    </p>

    <p style="margin-top:8px;">
        👤 ${group.players.length} speler(s)
    </p>

    <div style="margin-top:15px;">

        <button onclick="manageGroupPlayers('${group.id}')">
            👥 Spelers beheren
        </button>

        <button onclick="groupSettings('${group.id}')">
            ⚙️ Groepsinstellingen
        </button>

        <button
            class="danger-button"
            onclick="deleteGroup('${group.id}')">
            🗑️ Groep verwijderen
        </button>

    </div>

    <div
        id="groupPanel-${group.id}"
        style="margin-top:15px;">
    </div>
`;

        groupsList.appendChild(card);
    });
}
window.manageGroupPlayers = async function (groupId) {

    const group = allGroups.find(function (g) {
        return g.id === groupId;
    });

    if (!group) return;

    const panel = document.getElementById(
        "groupPanel-" + groupId
    );

    if (!panel) return;

    if (allPlayers.length === 0) {
        await loadPlayers();
    }

    let html = `
<div class="settings-card">
    <h3>👥 Spelers in ${escapeHTML(group.name)}</h3>
    `;

    if (group.players.length === 0) {

        html += `
    <p>📭 Deze groep heeft nog geen spelers.</p>
`;

    } else {

        group.players.forEach(function (playerId) {

            const player = allPlayers.find(function (p) {
                return p.id === playerId;
            });

            const playerName =
                player ? player.username : "Onbekende speler";

            html += `
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:12px;
            margin-top:8px;
            background:#151d33;
            border-radius:10px;
        ">

            <span>
                👤 ${escapeHTML(playerName)}
            </span>

            <button
                class="danger-button"
                onclick="removePlayerFromGroup(
                    '${group.id}',
                    '${playerId}'
                )">
                ❌ Verwijderen
            </button>

        </div>
    `;
        });
    }

    html += `
<button
    style="margin-top:15px;"
    onclick="addPlayerToGroup('${group.id}')">
    ➕ Speler toevoegen
</button>
</div>
    `;

    panel.innerHTML = html;
};

window.removePlayerFromGroup = async function (
    groupId,
    playerId
) {

    const group = allGroups.find(function (g) {
        return g.id === groupId;
    });

    if (!group) return;

    const confirmed = confirm(
        "Weet je zeker dat je deze speler uit de groep wilt verwijderen?"
    );

    if (!confirmed) return;

    const newPlayers = group.players.filter(function (id) {
        return id !== playerId;
    });

    try {

        await setDoc(
            doc(db, "groups", groupId),
            {
                players: newPlayers
            },
            {
                merge: true
            }
        );

        alert("✅ Speler verwijderd!");

        await loadGroups();

    } catch (error) {

        console.error(error);

        alert(
            "❌ Speler verwijderen mislukt:\n" +
            error.message
        );
    }
};
window.groupSettings = async function (groupId) {

    const group = allGroups.find(function (g) {
        return g.id === groupId;
    });

    if (!group) return;

    const panel = document.getElementById(
        "groupPanel-" + groupId
    );

    if (!panel) return;

    panel.innerHTML = `
<div class="settings-card">

    <h3>⚙️ Groepsinstellingen</h3>

    <p style="margin-top:10px;">
        👑 Huidige owner:
        <strong>
            ${escapeHTML(
        group.ownerName || "Geen owner"
    )}
        </strong>
    </p>

    <button
        style="margin-top:15px;"
        onclick="addGroupOwner('${group.id}')">
        👑 Owner toevoegen
    </button>

    <button
        style="margin-top:8px;"
        onclick="removeGroupOwner('${group.id}')">
        ❌ Owner verwijderen
    </button>

</div>
    `;
};
window.addGroupOwner = async function (groupId) {

    if (allPlayers.length === 0) {
        await loadPlayers();
    }

    const username = prompt(
        "Typ de gebruikersnaam van de nieuwe owner:"
    );

    if (!username) return;

    const player = allPlayers.find(function (p) {

        return p.username.toLowerCase() ===
            username.trim().toLowerCase();

    });

    if (!player) {

        alert(
            "❌ Speler niet gevonden.\n\n" +
            "Controleer de gebruikersnaam."
        );

        return;
    }

    try {

        await setDoc(
            doc(db, "groups", groupId),
            {
                ownerId: player.id,
                ownerName: player.username
            },
            {
                merge: true
            }
        );

        alert(
            "👑 " +
            player.username +
            " is nu owner!"
        );

        await loadGroups();

    } catch (error) {

        console.error(error);

        alert(
            "❌ Owner instellen mislukt:\n" +
            error.message
        );
    }
};
window.removeGroupOwner = async function (groupId) {

    const confirmed = confirm(
        "Weet je zeker dat je de owner wilt verwijderen?"
    );

    if (!confirmed) return;

    try {

        await setDoc(
            doc(db, "groups", groupId),
            {
                ownerId: "",
                ownerName: ""
            },
            {
                merge: true
            }
        );

        alert("✅ Owner verwijderd!");

        await loadGroups();

    } catch (error) {

        console.error(error);

        alert(
            "❌ Owner verwijderen mislukt:\n" +
            error.message
        );
    }
};

window.setGroupOwner = async function (groupId) {

    const username = prompt(
        "Typ de gebruikersnaam van de nieuwe owner:"
    );

    if (!username) return;

    const player = allPlayers.find(function (p) {
        return p.username.toLowerCase() ===
            username.toLowerCase();
    });

    if (!player) {
        alert("❌ Speler niet gevonden.");
        return;
    }

    try {

        await setDoc(
            doc(db, "groups", groupId),
            {
                ownerId: player.id,
                ownerName: player.username
            },
            { merge: true }
        );

        alert("👑 Owner ingesteld!");
        await loadGroups();

    } catch (error) {

        console.error(error);

        alert(
            "❌ Owner instellen mislukt:\n" +
            error.message
        );
    }
};

window.addPlayerToGroup = async function (groupId) {

    if (allPlayers.length === 0) {
        await loadPlayers();
    }

    const username = prompt(
        "Typ de gebruikersnaam van de speler:"
    );

    if (!username) return;

    const player = allPlayers.find(function (p) {
        return p.username.toLowerCase() ===
            username.toLowerCase();
    });

    if (!player) {
        alert("❌ Speler niet gevonden.");
        return;
    }

    const group = allGroups.find(function (g) {
        return g.id === groupId;
    });

    if (!group) return;

    if (group.players.includes(player.id)) {
        alert("Deze speler zit al in de groep.");
        return;
    }

    group.players.push(player.id);

    try {

        await setDoc(
            doc(db, "groups", groupId),
            {
                players: group.players
            },
            { merge: true }
        );

        alert("✅ Speler toegevoegd!");

        await loadGroups();

    } catch (error) {

        console.error(error);

        alert(
            "❌ Speler toevoegen mislukt:\n" +
            error.message
        );
    }
};

window.deleteGroup = async function (groupId) {

    if (window.codelabAdmin !== true) {
        alert("❌ Alleen admins kunnen groepen verwijderen.");
        return;
    }

    const confirmed =
        confirm(
            "Weet je zeker dat je deze groep wilt verwijderen?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "groups", groupId)
        );

        alert("🗑️ Groep verwijderd!");

        await loadGroups();

    } catch (error) {

        console.error("Groep verwijderen:", error);

        alert(
            "❌ Groep verwijderen mislukt:\n" +
            error.message
        );
    }
};


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
