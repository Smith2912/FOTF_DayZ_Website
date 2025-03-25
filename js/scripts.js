document.addEventListener('DOMContentLoaded', function() {
    // Audio setup
    var audio = document.getElementById('background-audio');
    if (audio) {
        audio.volume = 0.1;
        audio.muted = false;
    }

    // Slideshow setup
    function initSlideshow() {
        const slides = document.getElementsByClassName("slideshow-image");
        if (slides.length === 0) return;
        
        // Set first slide as active initially
        slides[0].classList.add("active");
        
        let currentIndex = 0;
        
        function showNextSlide() {
            // Hide current slide
            slides[currentIndex].classList.remove("active");
            
            // Move to next slide
            currentIndex = (currentIndex + 1) % slides.length;
            
            // Show new slide
            slides[currentIndex].classList.add("active");
            
            // Schedule next transition
            setTimeout(showNextSlide, 5000);
        }
        
        // Start slideshow after initial delay
        setTimeout(showNextSlide, 5000);
    }

    // Initialize slideshow
    initSlideshow();
    
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
    
    // Call resize functions
    resizeBattleMetrics();
    
    // Event listeners
    window.addEventListener('resize', resizeBattleMetrics);
}); 