// 🎉 CONFETTI EFFECT

function createConfetti() {

    const colors = ["#d4a017", "#ffcc70", "#ffffff", "#ff4d6d"];

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

window.addEventListener("load", () => {
    createConfetti();
});