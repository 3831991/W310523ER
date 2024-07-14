fetch("http://localhost:4444/files")
.then(res => res.json())
.then(data => {
    data.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "img";
        div.style.backgroundImage = `url('http://localhost:4444/files/${imgUrl}')`;

        const btn = document.createElement("button");
        btn.innerText = 'x';
        btn.className = "remove";

        btn.addEventListener("click", () => {
            if (!confirm("האם למחוק את התמונה?")) {
                return;
            }

            fetch(`http://localhost:4444/files/${imgUrl}`, {
                method: "DELETE",
            })
            .then(() => div.remove());
        });

        div.appendChild(btn);

        document.querySelector("#grid").appendChild(div);
    });
});