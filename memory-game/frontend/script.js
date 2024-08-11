const board = document.getElementById('board');

(async () => {
    const res = await fetch("/images");
    const images = await res.json();

    images.forEach((image, i) => {
        const div = document.createElement("div");
        div.style.backgroundImage = `url("/images/${image}")`;
        board.appendChild(div);
    });
})();