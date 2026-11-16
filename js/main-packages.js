import { handlePackagesHeroImageSlider } from "./PackagesPage/handlePackagesHeroImageSlider.js"
import { renderPackagesCards } from "./PackagesPage/renderPackagesCards.js"
import { packagesSectionAnimation } from "./PackagesPage/packagesSectionAnimation.js"

import { titleReveal, subtitleReveal } from "./Global/headingRevealAnimation.js"
import { heroSectionIntroAnimation } from "./HomePage/HeroSection/heroSectionIntroAnimation.js"
import { handlePaperPlaneAnimation } from "./HomePage/HeroSection/handlePaperPlaneAnimation.js"
import { packageCarouselMarquee } from "./HomePage/PackagesSection/packageCarouselMarquee.js"
import { testimonialMarquee } from "./HomePage/TestimonialsSection/testimonialMarquee.js"
import { whatsaapIcon } from "./HomePage/Other/Whatsappicon.js"

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
    safeInit("testimonials title animation", () => titleReveal(".testimonials-title"));
    safeInit("testimonials subtitle animation", () => subtitleReveal(".testimonials-subtitle"));
    safeInit("contact title animation", () => titleReveal(".contact-title"));

    // Initialize mobile menu
    initMobileMenu();

    // Packages Exclusive Fn
    safeInit("packages hero slider", () => handlePackagesHeroImageSlider());
    safeInit("package cards", () => renderPackagesCards());
    safeInit("packages section animation", () => packagesSectionAnimation());

    // Imported from Home (same fn without any change chahiye the)
    safeInit("hero intro", () => heroSectionIntroAnimation());
    safeInit("paper plane animation", () => handlePaperPlaneAnimation());
    safeInit("package carousel", () => packageCarouselMarquee());
    safeInit("testimonial marquee", () => testimonialMarquee());
    safeInit("WhatsApp icon", () => whatsaapIcon());
});