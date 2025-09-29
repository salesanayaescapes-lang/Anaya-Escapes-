function loader(){
    let loadertl = gsap.timeline()

    loadertl.from('.loader h1 span', {
        y: 150,
        stagger: 0.09,
        duration: 2.5,
        ease: "bounce.out"
    })

    loadertl.to('.loader h1 span', {
        x: 150,
        opacity: 0,
        delay: 0.4,
    })

    loadertl.to('.bg-loader', {
        height: "0%",
        top: 0
    })

    loadertl.to('.loader', {
        display: 'none',
        oncomplete: animatehomepage
    })
}
loader()

