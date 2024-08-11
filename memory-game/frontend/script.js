const board = document.getElementById('board');
const cards = [];

(async () => {
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
    });
})();

