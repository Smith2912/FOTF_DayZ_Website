document.addEventListener('DOMContentLoaded', function() {
    // Audio setup
    var audio = document.getElementById('background-audio');
    if (audio) {
        audio.volume = 0.1;
        audio.muted = false;
    }

    // Enhanced Slideshow
    function initSlideshow() {
        const slides = document.getElementsByClassName("slideshow-image");
        if (slides.length === 0) return;
        
        const slideContainer = document.querySelector('.slideshow-container');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const dotsContainer = document.getElementById('slide-dots');
        const captionElement = document.getElementById('slide-caption');
        
        let currentIndex = 0;
        let slideInterval;
        const slideDelay = 5000; // Time between auto-slides in ms
        
        // Create pagination dots
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slide-dot');
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
                resetInterval();
            });
        }
        
        // Initialize the first slide and dots
        updateSlide();
        
        // Add event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToPrevSlide();
                resetInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToNextSlide();
                resetInterval();
            });
        }
        
        // Start the slideshow timer
        startInterval();
        
        // Pause slideshow when hovering over it
        if (slideContainer) {
            slideContainer.addEventListener('mouseenter', stopInterval);
            slideContainer.addEventListener('mouseleave', startInterval);
            
            // Add touch events for mobile
            slideContainer.addEventListener('touchstart', handleTouchStart, false);
            slideContainer.addEventListener('touchmove', handleTouchMove, false);
        }
        
        // Functions
        function updateSlide() {
            // Update slides
            for (let i = 0; i < slides.length; i++) {
                if (i === currentIndex) {
                    slides[i].classList.add('active');
                } else {
                    slides[i].classList.remove('active');
                }
            }
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.slide-dot');
            for (let i = 0; i < dots.length; i++) {
                if (i === currentIndex) {
                    dots[i].classList.add('active');
                } else {
                    dots[i].classList.remove('active');
                }
            }
            
            // Update caption
            if (captionElement && slides[currentIndex].dataset.caption) {
                captionElement.textContent = slides[currentIndex].dataset.caption;
            }
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlide();
        }
        
        function goToNextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        }
        
        function goToPrevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlide();
        }
        
        function startInterval() {
            // Clear any existing interval first
            stopInterval();
            slideInterval = setInterval(goToNextSlide, slideDelay);
        }
        
        function stopInterval() {
            clearInterval(slideInterval);
        }
        
        function resetInterval() {
            stopInterval();
            startInterval();
        }
        
        // Touch events for swipe functionality
        let xDown = null;
        
        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
        }
        
        function handleTouchMove(evt) {
            if (!xDown) return;
            
            const xUp = evt.touches[0].clientX;
            const xDiff = xDown - xUp;
            
            // Detect swipe direction
            if (Math.abs(xDiff) > 50) { // Minimum swipe distance
                if (xDiff > 0) {
                    // Swipe left - next slide
                    goToNextSlide();
                } else {
                    // Swipe right - previous slide
                    goToPrevSlide();
                }
                resetInterval();
                
                // Reset touch position
                xDown = null;
            }
        }
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