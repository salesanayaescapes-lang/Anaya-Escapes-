export function titleReveal(splitTarget) {
    SplitText.create(splitTarget, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.from(self.words, {
                y: 100,
                autoAlpha: 0,
                stagger: 0.17,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: splitTarget,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    // markers: true
                },
            });
        },
    });
}

export function subtitleReveal(target) {
    gsap.from(target, {
        y: 50,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: {
            trigger: target,
            start: "top 82%",
            toggleActions: "play none none reverse",
            // markers: true
        },
    })
}

// titleReveal(".packages-title");
// subtitleReveal(".packages-subtitle");

// titleReveal(".destinations-title");
// subtitleReveal(".destinations-subtitle");

// titleReveal(".testimonials-title");
// subtitleReveal(".testimonials-subtitle");

subtitleReveal(".gallery-subtitle");
subtitleReveal(".gallery-title");

// titleReveal(".contact-title");
