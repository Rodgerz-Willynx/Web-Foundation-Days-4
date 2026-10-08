const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const MAX_CHARS = 200;
const WARNING_LIMIT = 180;

function updateCounts() {
    const text = noteText.value;
    const characterCount = text.length;

    const words = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    charCount.textContent = `${characterCount} / ${MAX_CHARS} characters`;
    wordCount.textContent = `${words} words`;

    charCount.classList.remove("warning", "over");

    if (characterCount > MAX_CHARS) {
        charCount.classList.add("over");
    } else if (characterCount > WARNING_LIMIT) {
        charCount.classList.add("warning");
    }
}

function saveDraft() {
    localStorage.setItem("noteDraft", noteText.value);
}

function clearEverything() {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
}

function updateThemeButton() {
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light mode";
    } else {
        themeToggle.textContent = "Dark mode";
    }
}

noteText.addEventListener("input", () => {
    updateCounts();
    saveDraft();
});

clearBtn.addEventListener("click", clearEverything);

noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        clearEverything();
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("darkMode", isDark);
    updateThemeButton();
});

window.addEventListener("DOMContentLoaded", () => {
    const savedDraft = localStorage.getItem("noteDraft");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedDraft !== null) {
        noteText.value = savedDraft;
    }

    if (savedTheme === "true") {
        document.body.classList.add("dark");
    }

    updateThemeButton();
    updateCounts();
});