import { titleReveal, subtitleReveal } from "./Global/headingRevealAnimation.js"
import { handleActiveTab } from "./PackageDetailPage/handleActiveTab.js";
import { packageDetailHeroIntroAnimation } from "./PackageDetailPage/packageDetailHeroIntroAnimation.js";
import { renderPackageDetail } from "./PackageDetailPage/renderPackageDetail.js";
import { handleModal } from "./PackageDetailPage/handleModal.js";

import { renderPackages } from "./HomePage/PackagesSection/renderPackages.js";
import { testimonialMarquee } from "./HomePage/TestimonialsSection/testimonialMarquee.js"
import { whatsaapIcon } from "./HomePage/Other/Whatsappicon.js"

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
    safeInit("testimonials title animation", () => titleReveal(".testimonials-title"));
    safeInit("testimonials subtitle animation", () => subtitleReveal(".testimonials-subtitle"));
    safeInit("contact title animation", () => titleReveal(".contact-title"));

    // Package Detail
    const packageDetailId = new URLSearchParams(window.location.search).get("id");
    if (!packageDetailId) {
        window.location.href = "/packages.html";
        return;
    }
    safeInit("package detail data", () => renderPackageDetail(packageDetailId));


    safeInit("package detail hero animation", () => packageDetailHeroIntroAnimation());
    safeInit("package detail tabs", () => handleActiveTab());
    safeInit("booking modal", () => handleModal());
    safeInit("related package cards", () => renderPackages());
    safeInit("testimonial marquee", () => testimonialMarquee());
    safeInit("WhatsApp icon", () => whatsaapIcon());
});