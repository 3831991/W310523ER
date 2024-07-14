fetch("http://localhost:4444/files")
.then(res => res.json())
.then(data => {
    data.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "img";
        div.style.backgroundImage = `url(http://localhost:4444/files/${imgUrl})`;

        document.querySelector("#grid").appendChild(div);
    });
});