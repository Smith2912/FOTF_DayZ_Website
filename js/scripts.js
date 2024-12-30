document.addEventListener('DOMContentLoaded', function() {
    // Audio setup
    var audio = document.getElementById('background-audio');
    if (audio) {
        audio.volume = 0.1;
        audio.muted = false;
    }

    // Slideshow setup
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slideshow-image");
    
    if (slides.length > 0) {
        showSlides();
    }

    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        
        // Move to next slide
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Show current slide
        slides[slideIndex - 1].classList.add("active");
        
        // Call showSlides again after 5 seconds
        setTimeout(showSlides, 5000);
    }
});

// BattleMetrics resize function
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