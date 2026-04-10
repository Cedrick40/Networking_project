// ========= SPOTLIGHT CAROUSEL =========
(function() {
    let currentSpotlight = 0;
    let spotlightInterval;
    
    function initSpotlightCarousel() {
        const spotlightSlides = document.querySelectorAll('.spotlight-slide');
        const spotlightDots = document.querySelectorAll('.spotlight-dot');
        
        if (!spotlightSlides.length) return;
        
        const totalSpotlights = spotlightSlides.length;
        
        function showSpotlight(index) {
            spotlightSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'translateX(0)';
                } else if (i < index) {
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateX(-100%)';
                } else {
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateX(100%)';
                }
            });
            
            spotlightDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.remove('bg-white/40');
                    dot.classList.add('bg-white');
                    dot.style.width = '8px';
                } else {
                    dot.classList.remove('bg-white');
                    dot.classList.add('bg-white/40');
                    dot.style.width = '6px';
                }
            });
        }
        
        function nextSpotlight() {
            currentSpotlight = (currentSpotlight + 1) % totalSpotlights;
            showSpotlight(currentSpotlight);
        }
        
        // Start auto-rotation
        spotlightInterval = setInterval(nextSpotlight, 5000);
        
        // Pause on hover
        const spotlightContainer = document.getElementById('spotlightCarousel');
        if (spotlightContainer) {
            spotlightContainer.addEventListener('mouseenter', () => {
                clearInterval(spotlightInterval);
            });
            spotlightContainer.addEventListener('mouseleave', () => {
                spotlightInterval = setInterval(nextSpotlight, 5000);
            });
        }
        
        // Dot click handlers
        spotlightDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(spotlightInterval);
                currentSpotlight = index;
                showSpotlight(currentSpotlight);
                spotlightInterval = setInterval(nextSpotlight, 5000);
            });
        });
        
        // Initialize first slide
        showSpotlight(0);
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpotlightCarousel);
    } else {
        initSpotlightCarousel();
    }
})();