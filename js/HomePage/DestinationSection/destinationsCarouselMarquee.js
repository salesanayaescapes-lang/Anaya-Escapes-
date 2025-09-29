export function destinationsCarouselMarquee() {
    const wrapper = document.querySelector(".destinations-carousel-wrapper");
    const track = document.querySelector(".destinations-carousel");
    const prevBtn = document.querySelector(".dest-arrow-btn.prev");
    const nextBtn = document.querySelector(".dest-arrow-btn.next");
    if (!wrapper || !track) return;

    const originalItems = Array.from(track.children);
    const gap = parseFloat(getComputedStyle(track).gap || 30);

    const fragment = document.createDocumentFragment();
    originalItems.forEach(node => fragment.appendChild(node.cloneNode(true)));
    track.appendChild(fragment);

    function measureSegmentWidth() {
        return originalItems.reduce((sum, el, i) => {
            const w = el.offsetWidth;
            return sum + w + (i > 0 ? gap : 0);
        }, 0);
    }

    let segmentWidth = measureSegmentWidth();
    let x = 0;
    const baseSpeed = 60; // px per second
    let speed = baseSpeed;

    const wrapX = v => {
        let r = v % segmentWidth;
        if (r > 0) r -= segmentWidth;
        return r;
    };

    function setX(value) {
        x = value;
        gsap.set(track, { x: wrapX(x) });
    }

    let last = performance.now();
    let raf;

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

    // ---------------------------
    // Dragging
    // ---------------------------
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
        const dx = point(e) - startX;
        const kick = gsap.utils.clamp(-300, 300, dx * 6);
        speed = baseSpeed + (-kick * 0.05); // dampened
        gsap.to({ s: speed }, {
            s: baseSpeed,
            duration: 1.2,
            ease: "power2.out",
            onUpdate() { speed = this.targets()[0].s; }
        });
        start();
    }

    // Resize
    const ro = new ResizeObserver(() => {
        const newWidth = measureSegmentWidth();
        if (newWidth > 0 && Math.abs(newWidth - segmentWidth) > 1) {
            const progress = (wrapX(x)) / segmentWidth;
            segmentWidth = newWidth;
            setX(progress * segmentWidth);
        }
    });
    ro.observe(wrapper);

    // For Touch Events
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

    // ---------------------------
    // Prev / Next buttons
    // ---------------------------
    function shiftByCard(dir = 1) {
        stop();
        const card = track.querySelector(".destination-card");
        if (!card) return;
        const cardWidth = card.offsetWidth + gap;
        gsap.to({ val: x }, {
            val: x - dir * cardWidth,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate() {
                setX(this.targets()[0].val);
            },
            onComplete() {
                start();
            }
        });
    }

    if (nextBtn) nextBtn.addEventListener("click", () => shiftByCard(1));
    if (prevBtn) prevBtn.addEventListener("click", () => shiftByCard(-1));

    // Start animation
    start();

}
