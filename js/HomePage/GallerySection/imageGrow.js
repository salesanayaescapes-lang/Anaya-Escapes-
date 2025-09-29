export function imageGrow() {
    function marquee() {
    window.addEventListener('wheel', (dets) => {
        if (dets.deltaY > 0) {
            gsap.to('.gallery__strip.two', {
                transform: ('translateX(35%)'),
                repeat: -1,
                yoyo: true,
                duration: 20,
                ease: 'none',
            })
            gsap.to('.gallery__strip.one, .gallery__strip.three', {
                transform: ('translateX(-35%)'),
                repeat: -1,
                yoyo: true,
                duration: 20,
                ease: 'none',
            })
        }
        else {
            gsap.to('.gallery__strip.two', {
                transform: ('translateX(-35%)'),
                repeat: -1,
                yoyo: true,
                duration:20,
                ease: 'none',
            })
            gsap.to('.gallery__strip.one, .gallery__strip.three', {
                transform: ('translateX(35%)'),
                repeat: -1,
                yoyo: true,
                duration: 20,
                ease: 'none',
            })
        }
    })

    gsap.to('.gallery__strip.one, .gallery__strip.three', {
        transform: ('translateX(36%)'),
        repeat: -1,
        yoyo: true,
        duration: 20,
        ease: 'none',
    })
    gsap.to('.gallery__strip.two', {
        transform: ('translateX(-36%)'),
        repeat: -1,
        yoyo: true,
        duration: 20,
        ease: 'none',
    })
}
marquee()
}
