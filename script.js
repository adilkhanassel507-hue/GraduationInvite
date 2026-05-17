//////////////////////////////
// ⏳ COUNTDOWN TIMER
//////////////////////////////

// Кеш өтетін нақты дата (19.05.2026 18:00)
const targetDate = new Date("May 19, 2026 18:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();
    const distance = targetDate - now;

    // Күн есептеу
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    // Сағат есептеу
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Минут есептеу
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Секунд есептеу
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // HTML-ге шығару
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }

}, 1000);


//////////////////////////////
// 🎧 МУЗЫКА (ALL PAGES FIX)
//////////////////////////////

// Музыка элементін табу
const music = document.getElementById("bgMusic");

// Батырманы табу
const musicBtn = document.getElementById("musicBtn");

function getMusicIcon(active) {
    return active
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v16l12-8L5 4z" fill="currentColor"/></svg>';
}

// Егер элементтер жоқ болса (басқа бетте), қате шықпау үшін
if (music && musicBtn) {

    // LocalStorage-тен музыка күйін оқу
    let isPlaying = localStorage.getItem("music") === "true";

    // Егер бұрын қосулы болса → автоматты қосу
    if (isPlaying) {

        // Музыканы ойнату (кей браузер блоктауы мүмкін)
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Авто музыка браузермен бұғатталды");
            });
        }

        musicBtn.innerHTML = getMusicIcon(true);
    } else {
        music.pause();
        musicBtn.innerHTML = getMusicIcon(false);
    }

    
            // ==========================
            // Persistent player popup
            // ==========================

            let playerWindow = null;
            const openPlayerBtn = document.getElementById('openPlayerBtn');

            if (openPlayerBtn) {
                openPlayerBtn.addEventListener('click', () => {
                    try {
                        if (playerWindow && !playerWindow.closed) {
                            playerWindow.focus();
                            return;
                        }
                    } catch (e) {}

                    playerWindow = window.open('player.html', 'persistent-player', 'width=420,height=160');

                    // sync current state to popup
                    localStorage.setItem('music', (!music.paused).toString());
                    setTimeout(() => {
                        try { playerWindow && playerWindow.postMessage({ type: 'sync-play', playing: !music.paused }, '*'); } catch (e) {}
                    }, 300);
                });
            }

            // Listen to messages from popup
            window.addEventListener('message', (ev) => {
                if (!ev.data) return;
                if (ev.data.type === 'player-toggle') {
                    const playing = ev.data.playing;
                    if (playing) {
                        music.play().catch(() => {});
                        musicBtn && (musicBtn.innerHTML = getMusicIcon(true));
                        localStorage.setItem('music', 'true');
                    } else {
                        music.pause();
                        musicBtn && (musicBtn.innerHTML = getMusicIcon(false));
                        localStorage.setItem('music', 'false');
                    }
                } else if (ev.data.type === 'player-opened') {
                    try { ev.source.postMessage({ type: 'sync-play', playing: !music.paused }, '*'); } catch (e) {}
                }
            });

            // sync when localStorage changes (other tabs/windows)
            window.addEventListener('storage', (e) => {
                if (e.key === 'music') {
                    const shouldPlay = e.newValue === 'true';
                    if (shouldPlay) music.play().catch(() => {}); else music.pause();
                    if (musicBtn) musicBtn.innerHTML = getMusicIcon(shouldPlay);
                }
            });

            // ==========================
            // Lightweight SPA navigation
            // ==========================

            function initSPA() {
                document.addEventListener('click', (e) => {
                    const a = e.target.closest('a');
                    if (!a) return;
                    const href = a.getAttribute('href');
                    if (!href) return;
                    if (a.target === '_blank') return;
                    if (href.endsWith('.html') || href === 'index.html' || href === './' || href === '/') {
                        const url = new URL(href, location.href);
                        if (url.origin === location.origin) {
                            e.preventDefault();
                            loadPage(url.href);
                        }
                    }
                });

                window.addEventListener('popstate', () => {
                    loadPage(location.href, true);
                });
            }

            function loadPage(url, isPop = false) {
                fetch(url, { cache: 'no-store' }).then(r => r.text()).then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    const newMain = doc.getElementById('app');
                    const title = doc.querySelector('title') ? doc.querySelector('title').innerText : document.title;

                    if (newMain && document.getElementById('app')) {
                        document.getElementById('app').innerHTML = newMain.innerHTML;
                        document.title = title;

                        if (!isPop) history.pushState({}, title, url);

                        // execute external scripts from fetched doc (except this script.js)
                        const scripts = Array.from(doc.scripts || []).filter(s => s.src && !s.src.includes('script.js'));
                        scripts.forEach(s => {
                            const sc = document.createElement('script');
                            sc.src = s.src;
                            document.body.appendChild(sc);
                        });

                        setTimeout(() => {
                            if (music && musicBtn) {
                                const playing = localStorage.getItem('music') === 'true';
                                if (playing) music.play().catch(() => {}); else music.pause();
                                musicBtn.innerHTML = getMusicIcon(playing);
                            }
                        }, 250);

                    } else {
                        location.href = url;
                    }
                }).catch(() => { location.href = url; });
            }

            document.addEventListener('DOMContentLoaded', () => initSPA());

    // Батырма басылғанда
    musicBtn.addEventListener("click", () => {

        // Егер музыка қосулы болса → өшіру
        if (isPlaying) {

            music.pause();
            musicBtn.innerHTML = getMusicIcon(false);

            // күйді сақтау
            localStorage.setItem("music", "false");

        } else {

            music.play();
            musicBtn.innerHTML = getMusicIcon(true);

            // күйді сақтау
            localStorage.setItem("music", "true");
        }

        // күйді ауыстыру
        isPlaying = !isPlaying;
    });
}