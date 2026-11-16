export function titleReveal(splitTarget) {
    if (typeof window.gsap === "undefined" || typeof window.SplitText === "undefined") return;
    if (!document.querySelector(splitTarget)) return;

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
                },
            });
        },
    });
}

export function subtitleReveal(target) {
    if (typeof window.gsap === "undefined") return;
    if (!document.querySelector(target)) return;

    gsap.from(target, {
        y: 50,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: {
            trigger: target,
            start: "top 82%",
            toggleActions: "play none none reverse",
        },
    });
}

// Optional gallery heading effects. These must never prevent page modules loading.
if (typeof window.gsap !== "undefined") {
    subtitleReveal(".gallery-subtitle");
    subtitleReveal(".gallery-title");
}
