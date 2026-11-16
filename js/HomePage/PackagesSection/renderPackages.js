import { packageCarouselMarquee } from "./packageCarouselMarquee.js";

export function renderPackages() {
    const container = document.querySelector(".packages-carousel");
    if (!container) return;

    const topPackageIds = [3, 6, 15, 19, 22, 26, 38, 41, 32];

    const render = (packages) => {
        container.innerHTML = "";
        if (!packages.length) {
            container.innerHTML = '<div class="no-packages-message"><p>No packages available at the moment.</p></div>';
            return;
        }

        const fragment = document.createDocumentFragment();
        packages.forEach((pkg) => {
            const starsHTML = Array.from({ length: Math.max(0, Number(pkg.stars) || 0) },
                () => '<img src="/assets/images/package-star.svg" alt="star">').join("");
            const tagsHTML = (Array.isArray(pkg.tags) ? pkg.tags : [])
                .map(tag => `<span class="tag">${tag}</span>`).join("");
            const card = document.createElement("article");
            card.className = "package-card";
            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                window.location.href = `package-detail.html?id=${encodeURIComponent(pkg.id)}`;
            });
            card.innerHTML = `
                <div class="package-card-bg" style="background-image: url('${pkg.image || ""}');"></div>
                <div class="package-card-overlay"></div>
                <div class="package-card-tags">${tagsHTML}</div>
                <div class="package-card-content">
                    <div class="package-card-info">
                        <h3>${pkg.title || ""}</h3>
                        <p>${pkg.description || ""}</p>
                        <div class="package-rating">${starsHTML}</div>
                    </div>
                    <div class="package-card-action">
                        <div class="package-price">${pkg.price || ""}</div>
                        <div class="package-arrow-btn"><img src="/assets/images/arrow-up.svg" alt="View Details"></div>
                    </div>
                </div>`;
            fragment.appendChild(card);
        });
        container.appendChild(fragment);

        // A marquee is decorative; a failure here must not remove the rendered cards.
        try { packageCarouselMarquee(); }
        catch (error) { console.error("Package cards loaded; carousel animation unavailable.", error); }
    };

    fetch("/packages.json")
        .then(response => {
            if (!response.ok) throw new Error(`packages.json returned HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error("packages.json must contain an array");
            render(data.filter(pkg => topPackageIds.includes(Number(pkg.id))));
        })
        .catch(error => {
            console.error("Error loading homepage packages:", error);
            container.innerHTML = '<p class="no-packages-message">Unable to load packages. Please refresh the page.</p>';
        });
}
