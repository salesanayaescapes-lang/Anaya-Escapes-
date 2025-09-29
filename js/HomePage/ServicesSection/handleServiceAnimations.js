export function handleServiceAnimations() {
    function isMobile() {
        return window.innerWidth < 768;
    }

    function servicesTitleReveal() {
        SplitText.create(".split-target", {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.lines, {
                    y: 100,
                    autoAlpha: 0,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".services-title",
                        start: "top 70%",
                    },
                });
            },
        });
    }

    // Animate the title lines
    servicesTitleReveal();

    // Animate the subtitle
    gsap.from(".services-subtitle", {
        y: 50,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: {
            trigger: ".services-title",
            start: "top 70%",
        },
    });

    // Mini image animation (responsive)
    let miniImageTween = gsap.to(".services-title-mini-image", {
        width: isMobile() ? "100px" : "170px",
        scrollTrigger: {
            trigger: ".services-title",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
        },
    });

    // Update on resize
    window.addEventListener("resize", () => {
        miniImageTween.kill(); // remove old tween
        miniImageTween = gsap.to(".services-title-mini-image", {
            width: isMobile() ? "100px" : "170px",
            scrollTrigger: {
                trigger: ".services-title",
                start: "top 70%",
                end: "bottom 50%",
                scrub: 1,
            },
        });
        ScrollTrigger.refresh();
    });

    // Animate the CTA
    gsap.from(".services-cta", {
        x: 130,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: {
            trigger: ".services-description",
            start: "top 80%",
        }
    });

    // Animate the description
    gsap.from(".services-description", {
        x: isMobile() ? 0 : 60,
        y: isMobile() ? 30 : 0,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: {
            trigger: ".services-description",
            start: "top 75%",
            // markers: true,
        }
    });

    // Animate each service card
    gsap.utils.toArray(".service-card").forEach((card) => {
        gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            ease: "power2.out",
            duration: 0.5,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            }
        });
    });
}
