// 🎬 INTRO ANIMATION

window.addEventListener("load", () => {

    const intro = document.createElement("div");

    intro.innerHTML = `
        <div class="intro-box">
            <h1>🎓 Graduation 2026</h1>
            <p>Қош келдіңіздер...</p>
        </div>
    `;

    intro.classList.add("intro-screen");

    document.body.appendChild(intro);

    setTimeout(() => {
        intro.classList.add("hide");
    }, 2500);

    setTimeout(() => {
        intro.remove();
    }, 4000);

});
