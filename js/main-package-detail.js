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
    const scroll = new LocomotiveScroll();
    titleReveal(".packages-title");
    subtitleReveal(".packages-subtitle");
    titleReveal(".testimonials-title");
    subtitleReveal(".testimonials-subtitle");
    titleReveal(".contact-title");

    // Package Detail
    const packageDetailId = new URLSearchParams(window.location.search).get("id");
    if (!packageDetailId) {
        window.location.href = "/packages.html";
        return;
    }
    renderPackageDetail(packageDetailId);


    packageDetailHeroIntroAnimation();
    handleActiveTab();
    handleModal();
    renderPackages();
    testimonialMarquee();
    whatsaapIcon();
});