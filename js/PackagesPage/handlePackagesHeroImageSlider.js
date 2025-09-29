export function handlePackagesHeroImageSlider() {
    // Config
    const SLIDE_DURATION = 4.5; // seconds each slide stays visible
    const TRANSITION = 0.8; // seconds for the slide animation(transtion time)

    const slidesData = [
        {
            src: "https://i.pinimg.com/736x/f4/cc/fe/f4ccfeb14d420d4da28224c2c3ffa40d.jpg",
        },
        {
            src: "https://i.pinimg.com/736x/97/1d/4f/971d4f4a8f6d012bc30516e1e7b2cc6f.jpg",
        },
        {
            src: "https://i.pinimg.com/1200x/93/f8/72/93f87279a26304d8a8fcdc08bb4acd39.jpg",
        },
        {
            src: "https://i.pinimg.com/1200x/df/eb/77/dfeb77e5ef651c99829880db7d082ec6.jpg",
        },
    ];

    // DOM refs
    const slider = document.getElementById("hero-image-slider");
    const slidesRoot = document.getElementById("hero-image-slides");
    const progressBar = document.getElementById("progressBar");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Internal state
    let current = 0;
    let slides = [];
    let playing = true;
    let progressTween = null;
    let transitionLock = false;

    // Create slide elements
    function createSlides() {
        slidesData.forEach((item, i) => {
            const el = document.createElement("div");
            el.className = "slide";
            el.style.backgroundImage = `url(${item.src})`;
            el.setAttribute("role", "group");
            el.setAttribute("aria-roledescription", "slide");
            el.setAttribute("aria-label", `${i + 1} of ${slidesData.length}`);
            // Start with only the first visible
            gsap.set(el, { opacity: i === 0 ? 1 : 0, xPercent: 0 });
            slidesRoot.appendChild(el);
            slides.push(el);
        });
    }

    // Progress bar animation
    function startProgress() {
        if (progressTween) progressTween.kill();
        gsap.set(progressBar, { height: "0%" });
        progressTween = gsap.to(progressBar, {
            height: "100%",
            duration: SLIDE_DURATION,
            ease: "none",
            onComplete() {
                if (playing) next();
            },
        });
    }

    function stopProgress() {
        if (progressTween) progressTween.pause();
    }

    function resumeProgress() {
        if (progressTween) progressTween.resume();
    }

    // Core slide transition
    function goTo(targetIndex, dir = 1) {
        if (transitionLock || targetIndex === current) return;
        transitionLock = true;

        const from = slides[current];
        const to = slides[targetIndex];

        // Place incoming slide just outside viewport
        gsap.set(to, { opacity: 1, xPercent: dir > 0 ? 100 : -100 });

        // Timeline for a buttery transition
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete() {
                gsap.set(from, { opacity: 0, xPercent: 0 });
                current = targetIndex;
                startProgress();
                transitionLock = false;
            },
        });

        tl.to(to, { xPercent: 0, duration: TRANSITION }, 0).to(
            from,
            { xPercent: dir > 0 ? -20 : 20, opacity: 0.0, duration: TRANSITION },
            0
        );
    }

    function next() {
        const ni = (current + 1) % slides.length;
        goTo(ni, +1);
    }

    function prev() {
        const pi = (current - 1 + slides.length) % slides.length;
        goTo(pi, -1);
    }

    // Autoplay controls
    function pause() {
        playing = false;
        stopProgress();
    }
    function play() {
        playing = true;
        resumeProgress();
    }

    // Events
    nextBtn.addEventListener("click", () => {
        pause();
        next();
        play();
    });
    prevBtn.addEventListener("click", () => {
        pause();
        prev();
        play();
    });

    // Pause on hover or focus for accessibility
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", pause);
    slider.addEventListener("focusout", play);

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            pause();
            next();
            play();
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            pause();
            prev();
            play();
        }
    });

    // Basic touch swipe
    let startX = 0;
    let dx = 0;
    let touching = false;
    slider.addEventListener(
        "touchstart",
        (e) => {
            touching = true;
            startX = e.touches[0].clientX;
            pause();
        },
        { passive: true }
    );
    slider.addEventListener(
        "touchmove",
        (e) => {
            if (!touching) return;
            dx = e.touches[0].clientX - startX;
        },
        { passive: true }
    );
    slider.addEventListener("touchend", () => {
        if (!touching) return;
        touching = false;
        if (Math.abs(dx) > 40) {
            dx < 0 ? next() : prev();
        }
        dx = 0;
        play();
    });

    // Init
    createSlides();
    startProgress();

    // Replace images programmatically if you want:
    // window.setSliderImages([{src: '...', anyottherkey:'...'}, ...])
    window.setSliderImages = (arr) => {
        // clear
        slidesRoot.innerHTML = "";
        slides = [];
        current = 0;
        slidesData.length = 0;
        arr.forEach((o) => slidesData.push(o));
        createSlides();
        startProgress();
    };

}