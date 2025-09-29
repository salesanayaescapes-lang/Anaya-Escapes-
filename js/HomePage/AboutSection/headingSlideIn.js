export function headingSlideIn() {
    if (window.innerWidth < 768) {
        return;
    }
    gsap.from(".about-bg-title", {
        x: 230,
        autoAlpha: 0,
        scrollTrigger: {
            trigger: ".about-bg-title",
            start: "top 83%",
            end: "bottom 20%",
            scrub: true,
            // markers: true
        }
    })
}