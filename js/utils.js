// Kleine hulpfuncties die overal gebruikt worden.

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
