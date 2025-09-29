import { destinationsCarouselMarquee } from "./destinationsCarouselMarquee.js";
import { destinationToggle } from "./destinationToggle.js";

export function renderDestinations() {
    const container = document.querySelector(".destinations-carousel");

    const renderDestinations = (destinations) => {
        container.innerHTML = '';

        if (destinations.length === 0) {
            container.innerHTML = '<div class="no-packages-message"><p>No packages available at the moment.</p></div>';
            return;
        }

        destinations.forEach((destination) => {
            // Use hero-images for destination cards instead of main package image
            const destinationImage = destination['hero-images'] && destination['hero-images'].length > 0 
                ? destination['hero-images'][0] 
                : destination.image;
                
            container.innerHTML += `
        <article class="destination-card ${destination['location-type']}">
              <div class="dest-card-bg" style="background-image: url(${destinationImage});">
              </div>
              <a class="dest-card-link" href="packages.html?filter=${encodeURIComponent(destination.location)}"></a>
              <div class="dest-card-content">
                <h3 class="dest-card-title ${destination['location']}">${destination.location}</h3>
                <div class="dest-card-price-box">
                  <p class="dest-price-label">Starting Price</p>
                  <p class="dest-price">${destination.price}</p>
                </div>
              </div>
            </article>
        `;
        });

        destinationsCarouselMarquee();
        destinationToggle();
    };

    // Fetch packages data with cache busting
    fetch(`packages.json?v=${Date.now()}`)
        .then((res) => res.json())
        .then((data) => {
            console.log('Total packages loaded:', data.length);
            
            // Create a Map to store unique locations with their first occurrence
            const locationMap = new Map();
            
            data.forEach(packageItem => {
                const location = packageItem.location?.toLowerCase();
                if (location && !locationMap.has(location)) {
                    locationMap.set(location, packageItem);
                    console.log('Added unique location:', packageItem.location);
                }
            });
            
            // Convert Map values back to array
            const uniqueLocations = Array.from(locationMap.values());
            
            console.log('Unique locations found:', uniqueLocations.length);
            console.log('Unique locations:', uniqueLocations.map(p => p.location));
            
            renderDestinations(uniqueLocations);
        })
        .catch(error => {
            console.error('Error loading packages:', error);
            container.innerHTML = '<p>Unable to load packages. Please try again later.</p>';
        });
}
