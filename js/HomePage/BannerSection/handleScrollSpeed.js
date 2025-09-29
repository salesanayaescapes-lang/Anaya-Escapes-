export const handleScrollSpeed = () => {
    const updateScrollSpeeds = () => {
        const SCROLL_SPEED_MOBILE = "0.08"; // Reduced speed

        const isMobile = window.innerWidth <= 768;
        const scrollElements = document.querySelectorAll('[data-scroll-speed]');
        
        scrollElements.forEach(element => {
            if (!element.dataset.originalSpeed) {
                element.dataset.originalSpeed = element.dataset.scrollSpeed;
            }
            
            if (isMobile) {
                element.dataset.scrollSpeed = SCROLL_SPEED_MOBILE;
            } else {
                element.dataset.scrollSpeed = element.dataset.originalSpeed;
            }
        });
    };

    updateScrollSpeeds();

    window.addEventListener('resize', updateScrollSpeeds);
};
