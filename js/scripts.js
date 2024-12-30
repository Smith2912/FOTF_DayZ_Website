document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('background-audio');
    audio.volume = 0.1;
    audio.muted = false;
});

// Slideshow script
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slideshow-image");
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "previous");
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].classList.add("active");
    if (slideIndex > 1) {
        slides[slideIndex-2].classList.add("previous");
    } else {
        slides[slides.length-1].classList.add("previous");
    }
    setTimeout(showSlides, 5000);
}

function resizeBattleMetrics() {
    const wrapper = document.querySelector('.battlemetrics-wrapper');
    if (wrapper) {
        const width = wrapper.offsetWidth;
        const iframe = wrapper.querySelector('iframe');
        if (iframe) {
            iframe.style.width = width + 'px';
        }
    }
}

window.addEventListener('resize', resizeBattleMetrics);
window.addEventListener('load', resizeBattleMetrics);
window.addEventListener("beforeunload", this.onUnloadBinded); 