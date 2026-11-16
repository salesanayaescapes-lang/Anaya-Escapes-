import { titleReveal, subtitleReveal } from "./Global/headingRevealAnimation.js"

import { heroSectionIntroAnimation } from "./HomePage/HeroSection/heroSectionIntroAnimation.js"
import { handleHeroImageSlider } from "./HomePage/HeroSection/handleHeroImageSlider.js"
import { handlePaperPlaneAnimation } from "./HomePage/HeroSection/handlePaperPlaneAnimation.js"
import { handleScrollSpeed } from "./HomePage/BannerSection/handleScrollSpeed.js"
import { textColorFade } from "./HomePage/AboutSection/textColorFade.js"
import { headingSlideIn } from "./HomePage/AboutSection/headingSlideIn.js"
import { handleServiceAnimations } from "./HomePage/ServicesSection/handleServiceAnimations.js"
import { renderPackages } from "./HomePage/PackagesSection/renderPackages.js"
// import { destinationToggle } from "./HomePage/DestinationSection/destinationToggle.js"
import { renderDestinations } from "./HomePage/DestinationSection/renderDestinations.js"
import { imageGrow } from "./HomePage/GallerySection/imageGrow.js"
import { testimonialMarquee } from "./HomePage/TestimonialsSection/testimonialMarquee.js"
import { whatsaapIcon } from "./HomePage/Other/Whatsappicon.js"
import { initAutoPopupModal } from "./HomePage/autoPopupModal.js"

// Mobile Menu Toggle Functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileToggle || !mainNav) return;
    
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileToggle.classList.contains('active');
        
        if (isActive) {
            // Close menu
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileToggle.classList.add('active');
            mainNav.classList.add('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close menu when clicking on navigation links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('mobile-active')) {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Global
    const scroll = new LocomotiveScroll();
    titleReveal(".packages-title");
    subtitleReveal(".packages-subtitle");
    titleReveal(".destinations-title");
    subtitleReveal(".destinations-subtitle");
    titleReveal(".testimonials-title");
    subtitleReveal(".testimonials-subtitle");
    titleReveal(".contact-title");

    // Initialize mobile menu
    initMobileMenu();

    heroSectionIntroAnimation();
    handleHeroImageSlider();
    handlePaperPlaneAnimation();
    handleScrollSpeed();
    textColorFade();
    headingSlideIn();
    handleServiceAnimations();
    renderPackages();
    renderDestinations();
    imageGrow();
    testimonialMarquee();
    whatsaapIcon();
    
    // Initialize auto popup modal
    initAutoPopupModal();
});