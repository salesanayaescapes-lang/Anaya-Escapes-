import { packageCarouselMarquee } from "./packageCarouselMarquee.js"

export function renderPackages() {
    const container = document.querySelector(".packages-carousel");

    // Manually selected top 8 packages - you can modify these IDs to show different packages
    const topPackageIds = [3,6,15,19,22,26,38,41,32];

    const renderPackages = (packages) => {
        container.innerHTML = '';

        if (packages.length === 0) {
            container.innerHTML = '<div class="no-packages-message"><p>No packages available at the moment.</p></div>';
            return;
        }

        packages.forEach((pkg) => {
            let starsHTML = '';
            for (let i = 0; i < pkg.stars; i++) {
                starsHTML += `<img src="/assets/images/package-star.svg" alt="star">`;
            }

            let tagsHTML = '';
            pkg.tags.forEach(tag => {
                tagsHTML += `<span class="tag">${tag}</span>`;
            });

            container.innerHTML += `
        <article class="package-card" onclick="window.location.href='package-detail.html?id=${encodeURIComponent(pkg.id)}'" style="cursor: pointer;">
          <div class="package-card-bg" style="background-image: url('${pkg.image}');"></div>
          <div class="package-card-overlay"></div>

          <div class="package-card-tags">
            ${tagsHTML}
          </div>

          <div class="package-card-content">
            <div class="package-card-info">
              <h3>${pkg.title}</h3>
              <p>${pkg.description}</p>
              <div class="package-rating">
                ${starsHTML}
              </div>
            </div>

            <div class="package-card-action">
              <div class="package-price">${pkg.price}</div>
              <div class="package-arrow-btn">
                <img src="/assets/images/arrow-up.svg" alt="View Details">
              </div>
            </div>
          </div>
        </article>
        `;
        });

        packageCarouselMarquee();
    };

    // Fetch packages data and filter to show only top packages
    fetch("packages.json")
        .then((res) => res.json())
        .then((data) => {
            // Filter packages to show only the manually selected top packages
            const topPackages = data.filter(pkg => topPackageIds.includes(pkg.id));
            renderPackages(topPackages);
        })
        .catch(error => {
            console.error('Error loading packages:', error);
            container.innerHTML = '<p>Unable to load packages. Please try again later.</p>';
        });
}
