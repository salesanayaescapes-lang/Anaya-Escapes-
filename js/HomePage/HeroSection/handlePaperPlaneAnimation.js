export function handlePaperPlaneAnimation() {
    const ANIMATION_DURATION = 1.6 // seconds

    const path = document.querySelector("#hero-line-path");
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to([".hero-deco-line", ".hero-deco-plane"], {
        opacity: 1,
    })

    gsap.to(path, {
        strokeDashoffset: 0,
        duration: ANIMATION_DURATION,
        ease: "power1.inOut",
    });

    gsap.to("#hero-plane", {
        duration: ANIMATION_DURATION,
        ease: "power1.inOut",
        motionPath: {
            path: "#hero-line-path",
            align: "#hero-line-path",
            alignOrigin: [0.5, 0.5],
        },
    });
}
