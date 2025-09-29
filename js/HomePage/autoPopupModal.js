// Auto Popup Modal for Home Page - Shows after 5 seconds
export function initAutoPopupModal() {
    let modalShown = false;
    let modalOverlay = null;

    // Check if modal was already shown in this session
    if (sessionStorage.getItem('modalShown') === 'true') {
        return;
    }

    // Show modal after 5 seconds
    setTimeout(() => {
        if (!modalShown) {
            showAutoModal();
            modalShown = true;
            sessionStorage.setItem('modalShown', 'true');
        }
    }, 5000);

    function showAutoModal() {
        // Store current scroll position and prevent background scroll
        window.modalScrollY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
        
        // Create modal overlay if it doesn't exist
        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';

            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';

            // Add close button
            const closeButton = document.createElement('button');
            closeButton.className = 'modal-close';
            closeButton.innerHTML = `<p>Close</p> <svg fill="white" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
</svg>`;
            closeButton.addEventListener('click', closeModal);

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.id = 'modal-content';

            // Modal HTML
            modalContent.innerHTML = `
                <div id="modal-contact" class="contact-section">
      <div class="contact-form-container">
        <h2 class="contact-title" id="modal-title">Plan Your <span class="text-primary">Dream Trip!</span></h2>
        <form class="contact-form" method="POST">
          
          <div class="form-group">
            <label for="home-name">Name</label>
            <input type="text" id="home-name" name="name" required>
          </div>
          <div class="form-group">
            <label for="home-email">Email</label>
            <input type="email" id="home-email" name="email" required>
          </div>
          <div class="form-group">
            <label for="home-contact-no">Contact No.</label>
            <input type="tel" id="home-contact-no" name="phone" required>
          </div>
          <div class="form-group">
            <label for="home-package-name">Package Name (Domestic/International)</label>
            <select id="home-package-name" name="package" class="searchable-dropdown-select">
              <option value="">Select packages</option>
              <!-- Options will be populated dynamically -->
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="home-adults">Adults</label>
              <input type="number" id="home-adults" name="adults" min="1">
            </div>
            <div class="form-group">
              <label for="home-children">Children</label>
              <input type="number" id="home-children" name="children" min="0">
            </div>
          </div>
          <div class="form-group children-age-group" style="display: none;">
            <label for="home-children-ages">Children Ages (comma separated)</label>
            <input type="text" id="home-children-ages" name="children_ages" placeholder="e.g., 5, 8, 12">
          </div>
          <button type="submit" class="submit-btn">SUBMIT</button>
        </form>
      </div>
      <div class="contact-image-container"></div>
    </div>
            `;

            modalContainer.appendChild(closeButton);
            modalContainer.appendChild(modalContent);
            modalOverlay.appendChild(modalContainer);

            document.body.appendChild(modalOverlay);

            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            // Initialize children age handler for modal after DOM is ready
            initializeHomeModalChildrenAgeHandler();
        }

        // Auto-populate package dropdown
        populatePackageDropdown();
        
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    async function populatePackageDropdown() {
        try {
            const response = await fetch('./packages.json');
            if (!response.ok) throw new Error('Failed to load packages');
            
            const packages = await response.json();
            const packageSelect = document.getElementById('home-package-name');
            
            if (!packageSelect) return;
            
            // Initialize searchable dropdown
            if (typeof SearchablePackageDropdown !== 'undefined') {
                new SearchablePackageDropdown(packageSelect, packages);
            } else {
                console.warn('SearchablePackageDropdown is not available. Falling back to standard select.');
                // Fallback to standard select if searchable dropdown is not available
                packageSelect.innerHTML = '<option value="">Select packages</option>';
                packages.forEach(pkg => {
                    const option = document.createElement('option');
                    option.value = pkg.title;
                    option.textContent = pkg.title;
                    option.setAttribute('data-location-type', pkg['location-type']);
                    packageSelect.appendChild(option);
                });
            }
            
        } catch (error) {
            console.error('Error loading packages for home modal:', error);
            // Fallback to hardcoded options if there's an error
            const packageSelect = document.getElementById('home-package-name');
            if (packageSelect) {
                packageSelect.innerHTML = `
                    <option value="">Select packages</option>
                    <optgroup label="Domestic Packages">
                        <option value="Kerala Backwaters">Kerala Backwaters</option>
                        <option value="Himachal Adventure">Himachal Adventure</option>
                    </optgroup>
                    <optgroup label="International Packages">
                        <option value="Bali Paradise">Bali Paradise</option>
                        <option value="Dubai Luxury">Dubai Luxury</option>
                    </optgroup>
                `;
            }
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            // Restore scroll position
            document.body.style.top = '';
            window.scrollTo(0, window.modalScrollY || 0);
        }
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize children age handler for home modal
    function initializeHomeModalChildrenAgeHandler() {
        const childrenInput = document.getElementById('home-children');
        const ageGroup = document.querySelector('#home-children-ages');
        
        if (!childrenInput || !ageGroup) return;

        childrenInput.addEventListener('input', (e) => {
            const childrenCount = parseInt(e.target.value) || 0;
            const ageContainer = ageGroup.closest('.children-age-group');
            
            if (ageContainer) {
                if (childrenCount > 0) {
                    ageContainer.style.display = 'block';
                    ageGroup.setAttribute('required', 'true');
                    
                    // Scroll to children age section smoothly
                    setTimeout(() => {
                        ageContainer.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'nearest'
                        });
                    }, 100);
                } else {
                    ageContainer.style.display = 'none';
                    ageGroup.removeAttribute('required');
                    ageGroup.value = '';
                }
            }
        });
    }
}
