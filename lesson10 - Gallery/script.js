let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

fetch("http://localhost:4444/files")
.then(res => res.json())
.then(data => {
    data.forEach(imgUrl => {
        const div = document.createElement("div");
        div.className = "mySlides fade";

        const img = document.createElement("img");
        img.style.width = "100%";
        img.src = `http://localhost:4444/files/${imgUrl}`;

        div.appendChild(img);

        document.querySelector("#frame").appendChild(div);
    });

    showSlides(slideIndex);
});