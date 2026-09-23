// Account: registreren, inloggen, uitloggen, verwijderen en bijhouden wie ingelogd is.

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";


/* =========================
   ACCOUNT AANMAKEN
========================= */

window.registerAccount = async function () {

    const username =
        document.getElementById("registerUsername").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;


    if (!username || !email || !password) {
        alert("Vul alles in.");
        return;
    }


    if (password.length < 6) {
        alert("Je wachtwoord moet minstens 6 tekens hebben.");
        return;
    }


    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        await updateProfile(user, {
            displayName: username
        });


        /* Eerste gebruikersgegevens */

        await setDoc(
            doc(db, "users", user.uid),
            {
                username: username,
                email: email,
                role: "user",
                xp: 0,
                lessonScores: {},
                createdAt: new Date().toISOString()
            }
        );


        alert(
            "🎉 Account aangemaakt!"
        );


        showPage("lessons");


    } catch (error) {

        console.error(error);

        if (error.code === "auth/email-already-in-use") {

            alert(
                "Dit e-mailadres bestaat al."
            );

        } else if (error.code === "auth/invalid-email") {

            alert(
                "Dit e-mailadres is niet geldig."
            );

        } else if (error.code === "auth/weak-password") {

            alert(
                "Dit wachtwoord is te zwak."
            );

        } else {

            alert(
                "Er ging iets mis: " +
                error.message
            );
        }
    }
};


/* =========================
   INLOGGEN
========================= */

window.loginAccount = async function () {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {
        alert("Vul je e-mail en wachtwoord in.");
        return;
    }


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        alert("👋 Welkom terug!");

        showPage("lessons");


    } catch (error) {

        console.error(error);

        alert(
            "Inloggen mislukt. Controleer je e-mail en wachtwoord."
        );
    }
};


/* =========================
   UITLOGGEN
========================= */

window.logoutAccount = async function () {

    try {

        await signOut(auth);

        alert("Je bent uitgelogd.");

        showPage("lessons");

    } catch (error) {

        console.error(error);

        alert(
            "Uitloggen is mislukt."
        );
    }
};

window.deleteAccount = async function () {

    const user = auth.currentUser;

    if (!user) {
        alert("❌ Je bent niet ingelogd.");
        return;
    }

    const confirmed = confirm(
        "⚠️ Weet je zeker dat je je volledige account wilt verwijderen?\n\n" +
        "Je account, voortgang en gegevens worden verwijderd."
    );

    if (!confirmed) {
        return;
    }

    try {

        // Firebase Authentication-account verwijderen
        await user.delete();

        // Lokale gegevens verwijderen
        localStorage.removeItem("codelabScores");
        localStorage.removeItem("codelabXP");
        localStorage.removeItem("codelabUsername");
        localStorage.removeItem("codelabTheme");
        localStorage.removeItem("codelabNotifications");

        window.codelabUser = null;
        window.codelabAdmin = false;

        alert("✅ Je account is verwijderd.");

        showPage("account");

    } catch (error) {

        console.error("Account verwijderen:", error);

        if (error.code === "auth/requires-recent-login") {

            alert(
                "🔐 Om veiligheidsredenen moet je opnieuw inloggen " +
                "voordat je je account kunt verwijderen."
            );

        } else {

            alert(
                "❌ Account verwijderen mislukt:\n" +
                error.message
            );
        }
    }
};

/* =========================
   KIJKEN OF IEMAND INGELOGD IS
========================= */

onAuthStateChanged(auth, async function (user) {

    if (user) {

        // Gebruiker is ingelogd
        window.codelabUser = user;

        const token = await user.getIdTokenResult();

        // Rol uit Firestore lezen. Geen document of geen veld = gewone gebruiker.
        let role = "user";

        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().role) {
                role = userDoc.data().role;
            }
        } catch (error) {
            console.error("Rol ophalen mislukt:", error);
        }

        window.codelabRole = role;
        window.codelabAdmin = role === "admin" || role === "superadmin";

        console.log("🎭 Rol:", role);

        console.log(
            "👤 Ingelogd als:",
            user.displayName,
            user.email
        );

        const accountName =
            document.getElementById("accountName");

        if (accountName) {
            accountName.textContent =
                user.displayName || "Leerling";
        }

        // Navigatie zichtbaar maken
        document.querySelectorAll(".nav-button").forEach(function (button) {
            button.style.display = "";
        });

        updateAdminButton();
        updateAdminSection();

        // Naar lessen
        showPage("lessons");

    } else {

        // Niemand is ingelogd
        window.codelabUser = null;
        window.codelabRole = null;
        window.codelabAdmin = false;

        console.log("🔒 Geen gebruiker ingelogd.");

        // Alle navigatie verbergen
        document.querySelectorAll(".nav-button").forEach(function (button) {
            button.style.display = "none";
        });

        // Account-knop weer zichtbaar maken
        const accountButton =
            document.getElementById("accountNavButton");

        if (accountButton) {
            accountButton.style.display = "";
        }

        // Accountpagina openen
        showPage("account");
    }

});
