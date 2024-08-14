let cards = [];
let player1 = 0;
let player2 = 0;
let isFirstPlayer = true;
let isCheat = false;

function bind() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');

    p1.querySelector("p").innerText = player1;
    p2.querySelector("p").innerText = player2;

    if (isFirstPlayer) {
        p1.classList.add("current");
        p2.classList.remove("current");
    } else {
        p2.classList.add("current");
        p1.classList.remove("current");
    }
}

async function newGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    cards = [];
    player1 = 0;
    player2 = 0;

    const res = await fetch("/images");
    const images = await res.json();

    images.forEach((image, i) => {
        // הוספנו פעמיים
        cards.push({ i, image }, { i, image });
    });

    cards.sort((a, b) => Math.random() - 0.5);

    cards.forEach(c => {
        const div = document.createElement("div");
        div.style.backgroundImage = `url("/images/${c.image}")`;
        board.appendChild(div);
        c.div = div;

        div.addEventListener("mouseover", () => {
            if (!isCheat) return;

            cards.filter(x => x.i == c.i).forEach(card => {
                card.div.classList.add("cheat");
            });
        });

        div.addEventListener("mouseout", () => {
            cards.forEach(card => card.div.classList.remove("cheat"));
        });

        div.addEventListener("click", () => {
            if (c.showed) {
                return;
            }

            const showed = cards.filter(c => c.showed);

            if (showed.length < 2) {
                div.classList.add("showed");
                c.showed = true;
            }
            
            if (showed.length === 2) {
                return;
            }

            if (showed.length) {
                const prev = showed[0];
                const current = c;

                if (prev.i === current.i) {
                    setTimeout(() => {
                        prev.div.classList.add('found');
                        current.div.classList.add('found');

                        prev.div.classList.remove('showed');
                        current.div.classList.remove('showed');

                        prev.showed = false;
                        current.showed = false;

                        if (isFirstPlayer) {
                            player1++;
                        } else {
                            player2++;
                        }

                        bind();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        prev.div.classList.remove('showed');
                        current.div.classList.remove('showed');

                        prev.showed = false;
                        current.showed = false;
                        
                        isFirstPlayer = !isFirstPlayer;
                        bind();
                    }, 1500);
                }
            }
        });
    });

    bind();
}

newGame();