export function handleModal() {
    const bookNowButtons = document.querySelectorAll('.btn-primary');
    const getInTouchButtons = document.querySelectorAll('.btn-outline');
    const bookLinks = document.querySelectorAll('.book-link');

    let modalOverlay = document.querySelector('.modal-overlay');

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
        <h2 class="contact-title" id="modal-title">Let's <span class="text-primary">Connect.</span></h2>
        <form class="contact-form" method="POST">
          
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="contact-no">Contact No.</label>
            <input type="tel" id="contact-no" name="phone" required>
          </div>
          <div class="form-group">
            <label for="package-name">Package Name</label>
            <select id="package-name" name="package">
              <option value="">Select a package</option>
              <!-- Options will be populated dynamically -->
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="adults">Adults</label>
              <input type="number" id="adults" name="adults" min="1">
            </div>
            <div class="form-group">
              <label for="modal-children">Children</label>
              <input type="number" id="modal-children" name="children" min="0">
            </div>
          </div>
          <div class="form-group children-age-group" style="display: none;">
            <label for="modal-children-ages">Children Ages (comma separated)</label>
            <input type="text" id="modal-children-ages" name="children_ages" placeholder="e.g., 5, 8, 12">
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
        initializeModalChildrenAgeHandler();
    }

    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => openModal('Let\'s <span class="text-primary">Connect.</span>'));
    });

    getInTouchButtons.forEach(button => {
        button.addEventListener('click', () => openModal('Get In <span class="text-primary">Touch.</span>'));
    });

    bookLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Let\'s <span class="text-primary">Connect.</span>');
        });
    });

    function openModal(title = 'Let\'s <span class="text-primary">Connect.</span>') {
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) {
            modalTitle.innerHTML = title;
        }
        
        // Store current scroll position and prevent background scroll
        window.modalScrollY = window.scrollY;
        document.body.style.top = `-${window.scrollY}px`;
        
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
            const packageSelect = document.getElementById('package-name');
            
            if (!packageSelect) return;
            
            console.log('Loaded packages:', packages.length);
            
            // Clear existing options except the first one
            packageSelect.innerHTML = '<option value="">Select a package</option>';
            
            // Add package options
            packages.forEach(pkg => {
                const option = document.createElement('option');
                option.value = pkg.title;
                option.textContent = pkg.title;
                packageSelect.appendChild(option);
            });
            
            // Auto-select current package if on package detail page
            const urlParams = new URLSearchParams(window.location.search);
            const packageId = urlParams.get('id');
            
            console.log('URL package ID:', packageId);
            
            if (packageId) {
                // Convert packageId to number since JSON has numeric IDs
                const numericPackageId = parseInt(packageId);
                const currentPackage = packages.find(pkg => pkg.id === numericPackageId);
                
                console.log('Found package:', currentPackage);
                
                if (currentPackage) {
                    // Set the selected option directly by title
                    packageSelect.value = currentPackage.title;
                    console.log('Auto-selected package:', currentPackage.title);
                    
                    // Double-check selection worked
                    if (packageSelect.value !== currentPackage.title) {
                        console.warn('Selection failed, trying manual approach');
                        const options = packageSelect.querySelectorAll('option');
                        for (let option of options) {
                            if (option.textContent === currentPackage.title) {
                                option.selected = true;
                                console.log('Manually selected:', option.textContent);
                                break;
                            }
                        }
                    }
                } else {
                    console.warn('Package not found for ID:', packageId);
                }
            } else {
                console.log('No package ID in URL');
            }
            
        } catch (error) {
            console.error('Error loading packages for modal:', error);
            // Keep default hardcoded options as fallback
            const packageSelect = document.getElementById('package-name');
            if (packageSelect && packageSelect.children.length <= 1) {
                packageSelect.innerHTML = `
                    <option value="">Select a package</option>
                    <option value="Kerala Backwaters">Kerala Backwaters</option>
                    <option value="Himachal Adventure">Himachal Adventure</option>
                    <option value="Bali Paradise">Bali Paradise</option>
                    <option value="Dubai Luxury">Dubai Luxury</option>
                `;
            }
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Restore scroll position
        document.body.style.top = '';
        window.scrollTo(0, window.modalScrollY || 0);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize children age handler for modal
    function initializeModalChildrenAgeHandler() {
        const childrenInput = document.getElementById('modal-children');
        const ageGroup = document.querySelector('#modal-children-ages');
        
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