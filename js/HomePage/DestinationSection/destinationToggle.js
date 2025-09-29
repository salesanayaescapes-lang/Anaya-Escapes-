import { destinationsCarouselMarquee } from "./destinationsCarouselMarquee.js";

export function destinationToggle() {
    const destBtnDomestic = document.getElementById("dest-btn-domestic");
    const destBtnInternational = document.getElementById("dest-btn-international");
    const toggleBtns = document.querySelectorAll(".dest-toggle-btn");
    const track = document.querySelector(".destinations-carousel");

    // store original cards (uncloned)
    const originalCards = Array.from(track.querySelectorAll(".destination-card"));

    function showDestinations(type) {
        track.innerHTML = ""; // clear track
        originalCards
            .filter(card => card.classList.contains(type))
            .forEach(card => track.appendChild(card.cloneNode(true)));
    }

    function setActiveBtn(activeBtn) {
        toggleBtns.forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }

    destBtnDomestic.addEventListener("click", () => {
        showDestinations("domestic");
        setActiveBtn(destBtnDomestic);
        destinationsCarouselMarquee();
    });

    destBtnInternational.addEventListener("click", () => {
        showDestinations("international");
        setActiveBtn(destBtnInternational);
        destinationsCarouselMarquee();
    });

    // initial
    showDestinations("domestic");
    destinationsCarouselMarquee();
}
