document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('background-audio');
    audio.volume = 0.1;
    audio.muted = false;
});

// Slideshow script
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slideshow-image");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 5000); // Change image every 5 seconds
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
window.addEventListener("beforeunload", function(event) {
    // Perform necessary actions
    // event.returnValue = ''; // Uncomment if you need to prompt the user
}); 