export function heroSectionIntroAnimation() {
    // The intro must work even if the optional loader markup or SplitText CDN is absent.
    if (typeof window.gsap === "undefined") {
        console.warn("GSAP unavailable; hero content is shown without entrance animation.");
        const title = document.querySelector(".hero-title");
        if (title) title.style.opacity = "1";
        return;
    }

    const hasLoader = document.querySelector(".loader") &&
        document.querySelector(".bg-loader") &&
        document.querySelector(".text-loader-1 span") &&
        document.querySelector(".text-loader-2 span");

    const titleAppearAnimation = () => {
        const title = document.querySelector(".hero-title");
        if (!title) return;
        if (typeof window.SplitText !== "undefined") {
            SplitText.create(".hero-title", {
                type: "lines, words",
                mask: "lines",
                autoSplit: true,
                onSplit(self) {
                    return gsap.from(self.lines, {
                        duration: 0.5, y: 100, rotate: 5, autoAlpha: 0,
                        stagger: 0.1, ease: "power2.out",
                    });
                },
            });
        } else {
            gsap.fromTo(title, { y: 35, autoAlpha: 0 }, {
                y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out",
            });
        }
    };

    if (hasLoader) {
        const loadertl = gsap.timeline();
        loadertl.to(".bg-loader", { height: "100vh", delay: 0.3 })
            .from(".text-loader-1 span", { opacity: 0, duration: 0.6, ease: "power3.out" })
            .to(".text-loader-1 span", { opacity: 0 })
            .from(".text-loader-2 span", { opacity: 0, delay: -0.2 })
            .to(".text-loader-2 span", { opacity: 0, delay: 0.25 })
            .to(".bg-loader, .loader", {
                top: 0, height: "0vh", delay: 0.3,
                onComplete: titleAppearAnimation,
            })
            .set(".loader", { display: "none" });
    }

    const title = document.querySelector(".hero-title");
    if (title) gsap.set(title, { opacity: hasLoader ? 0 : 1 });

    const tl = gsap.timeline({ delay: 0.3 });
    if (document.querySelector("#header")) {
        tl.from("#header", { autoAlpha: 0, y: -40, duration: 0.4 });
    }
    if (document.querySelector(".hero-cta")) {
        tl.from(".hero-cta", { autoAlpha: 0, y: 60, duration: 0.5 });
    }
    if (title) {
        if (!hasLoader) titleAppearAnimation();
        else gsap.delayedCall(0.8, () => { gsap.set(title, { opacity: 1 }); titleAppearAnimation(); });
    }
    if (document.querySelector(".hero-subtitle")) {
        tl.from(".hero-subtitle", { autoAlpha: 0, y: 2, duration: 0.3 }, "-=0.4");
    }
    if (document.querySelector(".hero-description")) {
        tl.from(".hero-description", { autoAlpha: 0, y: 20, duration: 0.3, ease: "power2.out" }, "-=0.4");
    }
    if (document.querySelector(".hero-image-slider")) {
        tl.from(".hero-image-slider", { scale: 0.8, autoAlpha: 0, duration: 0.4 }, "-=0.7");
    }
}
