export function whatsaapIcon(){
    

// Show WhatsApp icon on desktop scroll (wheel event)
window.addEventListener('wheel', (dets) => {
    gsap.to('.whtsp-icon', {
        y: 0,
        opacity: 1,
        duration: .4,
        display: 'block',
    })
})

// Show WhatsApp icon on mobile scroll (touch events)
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    const touchCurrentY = e.touches[0].clientY;
    const touchDiff = Math.abs(touchCurrentY - touchStartY);
    
    // If user has scrolled more than 10px, show the WhatsApp icon
    if (touchDiff > 10) {
        gsap.to('.whtsp-icon', {
            y: 0,
            opacity: 1,
            duration: .4,
            display: 'block',
        })
    }
});
}