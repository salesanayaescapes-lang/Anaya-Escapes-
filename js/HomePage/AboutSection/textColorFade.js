export function textColorFade() {
    document.fonts.ready.then(() => {
        let split1 = SplitText.create(".about-text-1 p", { type: "words" });

        gsap.from(split1.words, {
            stagger: 0.05,
            color: "#d3d3d3ff",
            scrollTrigger: {
                trigger: ".about-text-1",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
                // markers: true
            },
        });


        let split2 = SplitText.create(".about-text-2 p", { type: "words" });

        gsap.from(split2.words, {
            stagger: 0.05,
            color: "#d3d3d3ff",
            scrollTrigger: {
                trigger: ".about-text-2",
                start: "top 65%",
                end: "bottom 25%",
                scrub: true,
                // markers: true
            },
        });
    });
}
