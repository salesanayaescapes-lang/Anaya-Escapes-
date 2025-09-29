export function packagesSectionAnimation() {
    function isMobile() {
        return window.innerWidth < 768;
    }

    gsap.from(".filter-section", {
        x: isMobile() ? 0 : 80,
        y: isMobile() ? 50 : 0,
        autoAlpha: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: ".filter-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
            // markers: true
        },
    })

    // setTimeout(() => {
    //     if (document.querySelector(".package-card")) {
    //         gsap.utils.toArray(".package-card").forEach((card) => {
    //             gsap.from(card, {
    //                 y: 60,
    //                 autoAlpha: 0,
    //                 ease: "power2.out",
    //                 duration: 0.5,
    //                 scrollTrigger: {
    //                     trigger: card,
    //                     start: "top 80%",
    //                     // markers: true
    //                 }
    //             });
    //         });
    //     }
    // }, 1000)

}