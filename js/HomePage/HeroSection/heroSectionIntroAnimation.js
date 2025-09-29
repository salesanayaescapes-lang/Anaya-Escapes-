export function heroSectionIntroAnimation() {

function loader() {
    let loadertl = gsap.timeline()

    loadertl.to('.bg-loader', {
        height: '100vh',
        delay: .3,
    })

    loadertl.from('.text-loader-1 span', {
        opacity: 0,
        duration: .6,
        ease: 'power3.out',
    })

    loadertl.to('.text-loader-1 span', {
        opacity: 0,
    })

    loadertl.from('.text-loader-2 span', {
        opacity: 0,
        delay: -.2
    })

    loadertl.to('.text-loader-2 span', {
        opacity: 0,
        delay: .25
    })


    loadertl.to('.bg-loader, .loader', {
        top: 0,
        height: '0vh',
        delay: .3,
        onComplete: titleAppearAnimation
    })

    loadertl.to('.loader', {
        display: 'none',
    })
}
loader()

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
            ".hero-image-slider",
            {
                scale: 0.8,
                autoAlpha: 0,
                duration: 0.4,
            },
            "-=0.7"
        );
}
