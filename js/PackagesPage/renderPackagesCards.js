export function renderPackagesCards() {
  const container = document.querySelector(".packages-cards-container");
  let allPackages = [];
  let activeFilter = null;

  // Function to dynamically populate filter buttons
  const populateFilterButtons = (packages) => {
    const internationalLocations = new Set();
    const domesticLocations = new Set();

    // Extract unique locations from packages
    packages.forEach(pkg => {
      if (pkg.location && pkg['location-type']) {
        const locationName = pkg.location.charAt(0).toUpperCase() + pkg.location.slice(1);
        
        if (pkg['location-type'] === 'international') {
          internationalLocations.add(locationName);
        } else if (pkg['location-type'] === 'domestic') {
          domesticLocations.add(locationName);
        }
      }
    });

    // Populate International filters
    const internationalContainer = document.querySelector('.filter-group:first-child .filter-options');
    if (internationalContainer) {
      internationalContainer.innerHTML = '';
      Array.from(internationalLocations).sort().forEach(location => {
        const button = document.createElement('button');
        button.textContent = location;
        button.type = 'button';
        internationalContainer.appendChild(button);
      });
    }

    // Populate Domestic filters
    const domesticContainer = document.querySelector('.filter-group:last-child .filter-options');
    if (domesticContainer) {
      domesticContainer.innerHTML = '';
      Array.from(domesticLocations).sort().forEach(location => {
        const button = document.createElement('button');
        button.textContent = location;
        button.type = 'button';
        domesticContainer.appendChild(button);
      });
    }
  };

  const renderPackages = (packages) => {
    // Use a document fragment for better performance and to prevent layout shifts
    const fragment = document.createDocumentFragment();
    
    if (packages.length === 0) {
      container.innerHTML = '<div class="no-packages-message"><p>No packages found matching your criteria. Please try a different filter or clear all filters.</p></div>';
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
        
      const cardElement = document.createElement('article');
      cardElement.className = 'package-card';
      cardElement.setAttribute('data-location', pkg.location ? pkg.location.toLowerCase() : '');
      cardElement.style.cursor = 'pointer';
      cardElement.onclick = () => window.location.href = `package-detail.html?id=${encodeURIComponent(pkg.id)}`;
      
      cardElement.innerHTML = `
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
      `;
      
      fragment.appendChild(cardElement);
    });
    
    // Clear container and append all cards at once to prevent layout shifts
    container.innerHTML = '';
    container.appendChild(fragment);
  };

  // filter packages by location
  const filterPackagesByLocation = (location) => {
    if (!location || location.toLowerCase() === 'all') {
      renderPackages(allPackages);
      activeFilter = null;
    } else {
      const filteredPackages = allPackages.filter(pkg => 
        pkg.location && pkg.location.toLowerCase() === location.toLowerCase()
      );
      renderPackages(filteredPackages);
      activeFilter = location.toLowerCase();
    }
  };

  // Set up filter button event listeners
  const setupFilterButtons = () => {
    const filterButtons = document.querySelectorAll('.filter-options button');
    const clearAllButton = document.querySelector('.filter-header button');
    
    // Remove any existing active class
    const removeActiveClass = () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
    };
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const location = button.textContent.trim();
        
        // Toggle active state
        if (activeFilter === location.toLowerCase()) {
          removeActiveClass();
          filterPackagesByLocation('all');
          // Remove filter parameter from URL
          const url = new URL(window.location);
          url.searchParams.delete('filter');
          window.history.replaceState({}, '', url);
        } else {
          removeActiveClass();
          button.classList.add('active');
          filterPackagesByLocation(location);
          // Update URL with filter parameter
          const url = new URL(window.location);
          url.searchParams.set('filter', location);
          window.history.replaceState({}, '', url);
        }
      });
    });
    
    if (clearAllButton) {
      clearAllButton.addEventListener('click', () => {
        removeActiveClass();
        filterPackagesByLocation('all');
        // Remove filter parameter from URL
        const url = new URL(window.location);
        url.searchParams.delete('filter');
        window.history.replaceState({}, '', url);
      });
    }
  };

  // Function to get URL parameters
  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  // Function to apply filter from URL parameter
  const applyURLFilter = () => {
    const filterParam = getURLParameter('filter');
    if (filterParam) {
      if (filterParam.toLowerCase() === 'international') {
        // Select all international destinations
        const internationalButtons = document.querySelectorAll('.filter-group:first-child .filter-options button');
        internationalButtons.forEach(button => button.classList.add('active'));
        
        // Filter packages by international locations
        const internationalPackages = allPackages.filter(pkg => {
          const internationalLocations = ['thailand', 'dubai', 'malaysia', 'singapore', 'bali', 'vietnam', 'maldives'];
          return pkg.location && internationalLocations.includes(pkg.location.toLowerCase());
        });
        renderPackages(internationalPackages);
        activeFilter = 'international';
        
      } else if (filterParam.toLowerCase() === 'domestic') {
        // Select all domestic destinations
        const domesticButtons = document.querySelectorAll('.filter-group:last-child .filter-options button');
        domesticButtons.forEach(button => button.classList.add('active'));
        
        // Filter packages by domestic locations
        const domesticPackages = allPackages.filter(pkg => {
          const domesticLocations = ['andaman', 'goa', 'gujarat', 'himachal pradesh', 'karnataka', 'kashmir', 'kerala', 'rajasthan', 'sikkim', 'uttarakhand'];
          return pkg.location && domesticLocations.includes(pkg.location.toLowerCase());
        });
        renderPackages(domesticPackages);
        activeFilter = 'domestic';
        
      } else {
        // Individual location filter
        const filterButtons = document.querySelectorAll('.filter-options button');
        filterButtons.forEach(button => {
          if (button.textContent.trim().toLowerCase() === filterParam.toLowerCase()) {
            button.classList.add('active');
            filterPackagesByLocation(filterParam);
          }
        });
      }
      
      // Scroll to packages cards after a short delay to ensure content is loaded
      setTimeout(() => {
        const packagesCardsContainer = document.querySelector('.packages-cards-container');
        if (packagesCardsContainer) {
          // Calculate offset to show cards with some top padding
          const headerHeight = document.querySelector('#header')?.offsetHeight || 80;
          const offsetTop = packagesCardsContainer.offsetTop - headerHeight - 40;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  // Fetch packages data
  fetch("packages.json")
    .then((res) => res.json())
    .then((data) => {
      allPackages = data;
      
      // Dynamically populate filter buttons based on packages data
      populateFilterButtons(allPackages);
      
      // Initial render of all packages
      renderPackages(allPackages);
      
      setupFilterButtons();
      
      // Apply filter from URL parameter if present
      applyURLFilter();
      
      // Check if there's an active filter button on page load (fallback)
      const activeButton = document.querySelector('.filter-options button.active');
      if (activeButton && !getURLParameter('filter')) {
        filterPackagesByLocation(activeButton.textContent.trim());
      }
    })
    .catch(error => {
      console.error('Error loading packages:', error);
      container.innerHTML = '<p>Unable to load packages. Please try again later.</p>';
    });
}
