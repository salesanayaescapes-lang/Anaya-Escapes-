export function packageDetailHeroIntroAnimation() {
    function titleAppearAnimation() {
        SplitText.create(".hero-title", {
            type: "lines, words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.lines, {
                    duration: 0.5,
                    y: 100,
                    rotate: 5,
                    autoAlpha: 0,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            },
        });
    }

    gsap.set(".hero-title", { opacity: 0 });

    let tl = gsap.timeline({ delay: 0.3 });
    tl.from("#header", {
        autoAlpha: 0,
        y: -40,
        duration: 0.4,
    })
        .from(".hero-cta", {
            autoAlpha: 0,
            y: 60,
            duration: 0.5,
            onanimationstart: setTimeout(() => {
                gsap.set(".hero-title", { opacity: 1 });
                titleAppearAnimation();
            }, 500),
        })
        .from(
            ".hero-subtitle",
            {
                autoAlpha: 0,
                y: 2,
                duration: 0.3,
            },
            "-=0.4"
        )
        .from(
            ".hero-description",
            {
                autoAlpha: 0,
                y: 20,
                duration: 0.3,
                delay: 0.2,
                ease: "power2.out",
            },
            "-=0.4"
        )
        .from(
            ".package-detail-images img",
            {
                scale: 0.8,
                autoAlpha: 0,
                duration: 0.4,
                stagger: 0.15,
            },
            "-=0.7"
        );
}
