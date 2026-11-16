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
    // Optional smooth-scroll enhancement: never let a missing CDN library
    // prevent the rest of the page (packages, navigation, and animations) from loading.
    try {
        if (typeof window.LocomotiveScroll === "function") {
            window.anayaScroll = new window.LocomotiveScroll();
        }
    } catch (error) {
        console.warn("Locomotive Scroll unavailable; using native scrolling.", error);
    }

    const safeInit = (name, callback) => {
        try { callback(); }
        catch (error) { console.error(`Anaya Escapes: ${name} could not initialize.`, error); }
    };
    safeInit("packages title animation", () => titleReveal(".packages-title"));
    safeInit("packages subtitle animation", () => subtitleReveal(".packages-subtitle"));
    safeInit("destinations title animation", () => titleReveal(".destinations-title"));
    safeInit("destinations subtitle animation", () => subtitleReveal(".destinations-subtitle"));
    safeInit("testimonials title animation", () => titleReveal(".testimonials-title"));
    safeInit("testimonials subtitle animation", () => subtitleReveal(".testimonials-subtitle"));
    safeInit("contact title animation", () => titleReveal(".contact-title"));

    // Initialize mobile menu
    initMobileMenu();

    safeInit("hero intro", () => heroSectionIntroAnimation());
    safeInit("hero slider", () => handleHeroImageSlider());
    safeInit("paper plane animation", () => handlePaperPlaneAnimation());
    safeInit("banner scroll effect", () => handleScrollSpeed());
    safeInit("about text animation", () => textColorFade());
    safeInit("about heading animation", () => headingSlideIn());
    safeInit("service animations", () => handleServiceAnimations());
    safeInit("package cards", () => renderPackages());
    safeInit("destinations", () => renderDestinations());
    safeInit("gallery animation", () => imageGrow());
    safeInit("testimonial marquee", () => testimonialMarquee());
    safeInit("WhatsApp icon", () => whatsaapIcon());
    
    // Initialize auto popup modal
    safeInit("popup modal", () => initAutoPopupModal());
});