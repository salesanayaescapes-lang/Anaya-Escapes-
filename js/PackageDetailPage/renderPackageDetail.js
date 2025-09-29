export function renderPackageDetail(id) {
    const packageId = typeof id === "string" ? parseInt(id) : id;

    // Fetch the packages.json file
    fetch("/packages.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch packages data");
            }
            return response.json();
        })
        .then((packages) => {
            const packageData = packages.find((pkg) => pkg.id === packageId);

            if (!packageData) {
                console.error(`Package with id ${packageId} not found`);

                // Redirect to packages page if package not found
                window.location.href = "/packages.html";
                return;
            }

            // console.log("Package data found:", packageData);

            document.title = `${packageData.title} | Anaya Escapes`;

            // Update hero section
            updateHeroSection(packageData);

            // Update overview section
            updateOverviewSection(packageData);

            // Update itinerary section
            updateItinerarySection(packageData);

            // Update inclusions & exclusions
            updateInclusionsExclusions(packageData);

            // Update important notes
            updateImportantNotes(packageData);

            // Update Price Card
            updatePriceCard(packageData)
        })
        .catch((error) => {
            console.error("Error fetching package details:", error);
        });
}

function updateHeroSection(packageData) {
    // Update hero content
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroTitle = document.querySelector(".hero-title");
    const heroDescription = document.querySelector(".hero-description");

    if (heroSubtitle && packageData.subtitle) {
        heroSubtitle.textContent = packageData.subtitle;
    }

    if (heroTitle) {
        // Split the title into words and apply styling to the second word
        const words = packageData.title.split(" ");
        if (words.length >= 2) {
            heroTitle.innerHTML = `${words[0]} <span class="text-primary">${words[1]
                }</span> ${words.slice(2).join(" ")}`;
        } else {
            heroTitle.innerHTML = `${packageData.title}`;
        }
    }

    if (heroDescription && packageData.para) {
        heroDescription.textContent = packageData.para;
    }

    // Update hero images
    const packageDetailImages = document.querySelector(".package-detail-images");
    if (
        packageDetailImages &&
        packageData["hero-images"] &&
        packageData["hero-images"].length > 0
    ) {
        packageDetailImages.innerHTML = "";

        packageData["hero-images"].forEach((image, index) => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = `${packageData.title} Image ${index + 1}`;

            // Add 'large' class to the last image
            if (index === packageData["hero-images"].length - 1) {
                img.classList.add("large");
            }

            packageDetailImages.appendChild(img);
        });
    }
}

function updateOverviewSection(packageData) {
    // Update package title and subtitle in overview section
    const packageTitle = document.querySelector(".package-title");
    const packageSubtitle = document.querySelector(".package-subtitle");

    if (packageTitle) {
        packageTitle.textContent = packageData.title;
    }

    if (
        packageSubtitle &&
        packageData.overview &&
        packageData.overview.subtitle
    ) {
        packageSubtitle.textContent = packageData.overview.subtitle;
    }

    // Update rating
    const packageRating = document.querySelector(".package-rating");
    if (packageRating && packageData.stars) {
        const starHtml = `<img src="../../assets/images/testimonial-star.svg" alt="star">`
        packageRating.innerHTML = starHtml.repeat(packageData.stars)
    }

    // Update Descriptions
    const packageDescription1 = document.querySelector(".package-description-1");
    const packageDescription2 = document.querySelector(".package-description-2");

    if (
        packageDescription1 &&
        packageData.overview &&
        packageData.overview["description-1"]
    ) {
        packageDescription1.textContent = packageData.overview["description-1"];
    }

    if (
        packageDescription2 &&
        packageData.overview &&
        packageData.overview["description-2"]
    ) {
        packageDescription2.textContent = packageData.overview["description-2"];
    }

    // Update tags
    const packageIcons = document.querySelector(".package-icons");
    if (packageIcons && packageData.overview.icons) {
        packageIcons.innerHTML = packageData.overview.icons
            .map((icon) => `<span class="icon-box">${icon}</span>`)
            .join("");
    }
}

function updateItinerarySection(packageData) {
    if (!packageData.itinerary) return;

    const itineraryContainer = document.querySelector(".itinerary-card");
    if (!itineraryContainer) return;

    // Clear existing content
    itineraryContainer.innerHTML = "";

    let daysHtml = `<h3 class="itinerary-title">Itinerary</h3>`;

    packageData.itinerary.forEach((day, index) => {
        daysHtml += `<details ${index === 0 ? "open" : ""} class="itinerary-item">
              <summary>
                <span class="day-label">${day.label}</span>
                <span class="day-title">${day.title}</span>
              </summary>
              <div class="itinerary-body">
                <p>
                  ${day.para}
                </p>
                <p><strong>Included Experiences:</strong></p>
                <ul>
                  ${day.experiences.map((exp) => `<li>${exp}</li>`).join("")}
                </ul>
              </div>
            </details>`;
    });

    itineraryContainer.innerHTML = daysHtml;
}

function updateInclusionsExclusions(packageData) {
    // Update inclusions
    const inclusionsContainer = document.querySelector(".inc-list");
    if (inclusionsContainer && packageData.inclusions) {
        inclusionsContainer.innerHTML = packageData.inclusions
            .map((item) => `<li>${item}</li>`)
            .join("");
    }

    // Update exclusions
    const exclusionsContainer = document.querySelector(".exc-list");
    if (exclusionsContainer && packageData.exclusions) {
        exclusionsContainer.innerHTML = packageData.exclusions
            .map((item) => `<li>${item}</li>`)
            .join("");
    }
}

function updateImportantNotes(packageData) {
    const notesContainer = document.querySelector(".notes-list");
    if (notesContainer && packageData["important-notes"]) {
        notesContainer.innerHTML = packageData["important-notes"]
            .map((note) => `<li>${note}</li>`)
            .join("");
    }
}

function updatePriceCard(packageData) {
    const packagePrice = document.querySelector(".package-price");
    const packageName = document.querySelector(".package-right-name");

    const mobilePackagePrice = document.querySelector(".mobile-price-card .package-price");
    const mobilePackageName = document.querySelector(".mobile-price-card .package-right-name");
    
    if (packagePrice) {
        packagePrice.textContent = `${packageData.price}`;
    }
    if (packageName) {
        packageName.textContent = `${packageData.title}`;
    }

    if (mobilePackagePrice) {
        mobilePackagePrice.textContent = `${packageData.price}`;
    }
    if (mobilePackageName) {
        mobilePackageName.textContent = `${packageData.title}`;
    }
}