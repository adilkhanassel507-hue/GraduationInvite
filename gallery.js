// 📸 ФОТКАНЫ ҮЛКЕЙТУ

function openModal(src) {

    const modal = document.getElementById("modal");

    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";

    modalImg.src = src;
}

// ❌ MODAL ЖАБУ

function closeModal() {

    document.getElementById("modal").style.display = "none";
}

// FILTERING
document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.gallery-card'));

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            cards.forEach(c => {
                const cat = c.dataset.category || 'all';
                if (f === 'all' || cat === f) {
                    c.style.display = '';
                    c.classList.remove('is-hidden');
                } else {
                    c.style.display = 'none';
                    c.classList.add('is-hidden');
                }
            });
        });
    });

    // keyboard navigation for modal
    let currentIndex = null;
    function openAt(index) {
        const card = cards[index];
        if (!card) return;
        currentIndex = index;
        openModal(card.dataset.src);
    }

    // make openModal accept index too
    window.openModal = function(srcOrIndex) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modalImg');
        modal.style.display = 'flex';
        if (String(srcOrIndex).match(/^\d+$/)) {
            const i = Number(srcOrIndex);
            const c = cards[i];
            if (c) {
                modalImg.src = c.dataset.src;
                currentIndex = i;
            }
        } else {
            modalImg.src = srcOrIndex;
            // set currentIndex based on src
            const found = cards.findIndex(x => x.dataset.src === srcOrIndex);
            currentIndex = found >= 0 ? found : null;
        }
    };

    function showNext(delta) {
        if (currentIndex == null) return;
        let next = currentIndex + delta;
        if (next < 0) next = cards.length - 1;
        if (next >= cards.length) next = 0;
        const c = cards[next];
        if (c) {
            currentIndex = next;
            document.getElementById('modalImg').src = c.dataset.src;
        }
    }

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        if (!modal || modal.style.display !== 'flex') return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext(1);
        if (e.key === 'ArrowLeft') showNext(-1);
    });

    // add prev/next controls in modal
    const modalInner = document.querySelector('.modal-inner');
    if (modalInner) {
        const prev = document.createElement('button');
        prev.className = 'modal-nav modal-prev';
        prev.type = 'button';
        prev.innerHTML = '◀';
        prev.addEventListener('click', (e) => { e.stopPropagation(); showNext(-1); });
        const next = document.createElement('button');
        next.className = 'modal-nav modal-next';
        next.type = 'button';
        next.innerHTML = '▶';
        next.addEventListener('click', (e) => { e.stopPropagation(); showNext(1); });
        modalInner.appendChild(prev);
        modalInner.appendChild(next);
    }
});

// polish: close modal when clicking overlay (already handled in HTML), and stopPropagation inside inner