export function packageCarouselMarquee() {
    const wrapper = document.querySelector(".packages-carousel-wrapper");
    const track = document.querySelector(".packages-carousel");
    if (!wrapper || !track) return;

    // Keep only one set in HTML! cloning that once for a seamless loop
    const originalItems = Array.from(track.children);
    const gap = parseFloat(getComputedStyle(track).gap || 30);

    // Clone once for continuous track
    const fragment = document.createDocumentFragment();
    originalItems.forEach(node => fragment.appendChild(node.cloneNode(true)));
    track.appendChild(fragment);

    track.style.willChange = "transform";

    // Measure the width of the first set only
    function measureSegmentWidth() {
        // width of first N items (the original set)
        return originalItems.reduce((sum, el, i) => {
            const w = el.offsetWidth;
            return sum + w + (i > 0 ? gap : 0);
        }, 0);
    }

    let segmentWidth = measureSegmentWidth();
    let x = 0;
    const baseSpeed = 60; // px per second
    let speed = baseSpeed;

    // Wrap x between [-segmentWidth, 0)
    const wrapX = v => {
        let r = v % segmentWidth;
        if (r > 0) r -= segmentWidth;
        return r;
    };

    // Ticker based animation
    let last = performance.now();
    let raf;

    function setX(value) {
        x = value;
        const wrapped = wrapX(x);
        gsap.set(track, { x: wrapX(x) });

        let progress = Math.abs(wrapped) / segmentWidth;
        if (progress >= 1) progress = 0;

        document.querySelector(".packages-progress").style.width = (progress * 100) + "%";
    }

    function tick(now) {
        const dt = (now - last) / 1000;
        last = now;
        setX(x - speed * dt);
        raf = requestAnimationFrame(tick);
    }

    function start() {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(tick);
    }

    function stop() {
        cancelAnimationFrame(raf);
    }

    // User interactions
    let isDown = false;
    let startX = 0;
    let dragStartX = 0;

    function point(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onDown(e) {
        isDown = true;
        wrapper.classList.add("is-dragging");
        stop();
        startX = point(e);
        dragStartX = x;
    }

    function onMove(e) {
        if (!isDown) return;
        const dx = point(e) - startX;
        setX(dragStartX + dx);
    }

    function onUp(e) {
        if (!isDown) return;
        isDown = false;
        wrapper.classList.remove("is-dragging");

        // Add a bit of momentum based on the final drag distance, then ease back to base
        const dx = point(e) - startX;
        const kick = gsap.utils.clamp(-300, 300, dx * 6); // tweak as needed
        speed = baseSpeed + (-kick);
        gsap.to({ s: speed }, {
            s: baseSpeed,
            duration: 1.2,
            ease: "power2.out",
            onUpdate() { speed = this.targets()[0].s; }
        });

        start();
    }

    // Resize update so the wrap stays correct
    const ro = new ResizeObserver(() => {
        const newWidth = measureSegmentWidth();
        if (newWidth > 0 && Math.abs(newWidth - segmentWidth) > 1) {
            const progress = (wrapX(x)) / segmentWidth;
            segmentWidth = newWidth;
            setX(progress * segmentWidth);
        }
    });
    ro.observe(wrapper);

    function point(e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].clientX;
        }
        if (e.changedTouches && e.changedTouches.length) {
            return e.changedTouches[0].clientX; // for touchend
        }
        return e.clientX;
    }

    wrapper.addEventListener("mousedown", onDown);
    wrapper.addEventListener("touchstart", onDown, { passive: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);

    start();
}
