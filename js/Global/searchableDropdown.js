/**
 * Searchable Package Dropdown Component
 * Creates a responsive dropdown with search functionality
 */

class SearchablePackageDropdown {
    constructor(selectElement, packages) {
        this.originalSelect = selectElement;
        this.packages = packages;
        this.filteredPackages = [...packages];
        this.selectedPackage = null;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.createDropdownHTML();
        this.bindEvents();
        this.hideOriginalSelect();
    }
    
    createDropdownHTML() {
        // Create wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'searchable-dropdown';
        
        // Create input field
        this.input = document.createElement('input');
        this.input.className = 'dropdown-input';
        this.input.type = 'text';
        this.input.placeholder = 'Select packages';
        this.input.setAttribute('aria-expanded', 'false');
        this.input.setAttribute('aria-haspopup', 'listbox');
        
        // Create arrow
        this.arrow = document.createElement('span');
        this.arrow.className = 'dropdown-arrow';
        this.arrow.innerHTML = '▼';
        
        // Create dropdown list
        this.dropdownList = document.createElement('div');
        this.dropdownList.className = 'dropdown-list';
        this.dropdownList.setAttribute('role', 'listbox');
        
        // Create options container (no separate search input)
        this.optionsContainer = document.createElement('div');
        this.optionsContainer.className = 'dropdown-options';
        
        // Assemble dropdown
        this.dropdownList.appendChild(this.optionsContainer);
        
        this.wrapper.appendChild(this.input);
        this.wrapper.appendChild(this.arrow);
        this.wrapper.appendChild(this.dropdownList);
        
        // Insert after original select
        this.originalSelect.parentNode.insertBefore(this.wrapper, this.originalSelect.nextSibling);
        
        this.renderOptions();
    }
    
    renderOptions() {
        this.optionsContainer.innerHTML = '';
        
        if (this.filteredPackages.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No packages found';
            this.optionsContainer.appendChild(noResults);
            return;
        }
        
        // Group packages by location-type
        const domesticPackages = this.filteredPackages.filter(pkg => pkg['location-type'] === 'domestic');
        const internationalPackages = this.filteredPackages.filter(pkg => pkg['location-type'] === 'international');
        
        // Create International group FIRST
        if (internationalPackages.length > 0) {
            const internationalHeader = document.createElement('div');
            internationalHeader.className = 'dropdown-group-header';
            internationalHeader.textContent = 'International Packages';
            this.optionsContainer.appendChild(internationalHeader);
            
            internationalPackages.forEach((pkg, index) => {
                const option = document.createElement('div');
                option.className = 'dropdown-option international';
                
                // Create container for package title and tags
                const optionContent = document.createElement('div');
                optionContent.className = 'option-content';
                
                // Add package title
                const titleSpan = document.createElement('span');
                titleSpan.className = 'package-title';
                titleSpan.textContent = pkg.title;
                
                // Add package tags if they exist
                if (pkg.tags && pkg.tags.length > 0) {
                    const tagsContainer = document.createElement('div');
                    tagsContainer.className = 'package-tags';
                    
                    pkg.tags.slice(0, 2).forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.className = 'tag';
                        tagSpan.textContent = tag;
                        tagsContainer.appendChild(tagSpan);
                    });
                    
                    if (pkg.tags.length > 2) {
                        const moreTag = document.createElement('span');
                        moreTag.className = 'tag more-tag';
                        moreTag.textContent = `+${pkg.tags.length - 2} more`;
                        moreTag.title = pkg.tags.slice(2).join(', ');
                        tagsContainer.appendChild(moreTag);
                    }
                    
                    optionContent.appendChild(titleSpan);
                    optionContent.appendChild(tagsContainer);
                } else {
                    optionContent.textContent = pkg.title;
                }
                
                option.appendChild(optionContent);
                option.setAttribute('data-value', pkg.title);
                option.setAttribute('data-id', pkg.id);
                option.setAttribute('data-location-type', pkg['location-type']);
                option.setAttribute('role', 'option');
                option.setAttribute('tabindex', '0');
                
                option.addEventListener('click', () => this.selectOption(pkg));
                option.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.selectOption(pkg);
                    }
                });
                
                this.optionsContainer.appendChild(option);
            });
        }
        
        // Create Domestic group SECOND
        if (domesticPackages.length > 0) {
            const domesticHeader = document.createElement('div');
            domesticHeader.className = 'dropdown-group-header';
            domesticHeader.textContent = 'Domestic Packages';
            this.optionsContainer.appendChild(domesticHeader);
            
            domesticPackages.forEach((pkg, index) => {
                const option = document.createElement('div');
                option.className = 'dropdown-option domestic';
                
                // Create container for package title and tags
                const optionContent = document.createElement('div');
                optionContent.className = 'option-content';
                
                // Add package title
                const titleSpan = document.createElement('span');
                titleSpan.className = 'package-title';
                titleSpan.textContent = pkg.title;
                
                // Add package tags if they exist
                if (pkg.tags && pkg.tags.length > 0) {
                    const tagsContainer = document.createElement('div');
                    tagsContainer.className = 'package-tags';
                    
                    pkg.tags.slice(0, 2).forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.className = 'tag';
                        tagSpan.textContent = tag;
                        tagsContainer.appendChild(tagSpan);
                    });
                    
                    if (pkg.tags.length > 2) {
                        const moreTag = document.createElement('span');
                        moreTag.className = 'tag more-tag';
                        moreTag.textContent = `+${pkg.tags.length - 2} more`;
                        moreTag.title = pkg.tags.slice(2).join(', ');
                        tagsContainer.appendChild(moreTag);
                    }
                    
                    optionContent.appendChild(titleSpan);
                    optionContent.appendChild(tagsContainer);
                } else {
                    optionContent.textContent = pkg.title;
                }
                
                option.appendChild(optionContent);
                option.setAttribute('data-value', pkg.title);
                option.setAttribute('data-id', pkg.id);
                option.setAttribute('data-location-type', pkg['location-type']);
                option.setAttribute('role', 'option');
                option.setAttribute('tabindex', '0');
                
                option.addEventListener('click', () => this.selectOption(pkg));
                option.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.selectOption(pkg);
                    }
                });
                
                this.optionsContainer.appendChild(option);
            });
        }
    }
    
    bindEvents() {
        // Toggle dropdown on arrow click
        this.arrow.addEventListener('click', () => this.toggle());
        
        // Make input searchable when clicked or focused
        this.input.addEventListener('click', () => this.open());
        this.input.addEventListener('focus', () => this.open());
        
        // Search functionality on main input
        this.input.addEventListener('input', (e) => {
            this.filterOptions(e.target.value);
            if (!this.isOpen) {
                this.open();
            }
        });
        
        // Keyboard navigation
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) {
                this.close();
            }
        });
        
        // Prevent form submission on Enter
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }
    
    filterOptions(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            this.filteredPackages = [...this.packages];
        } else {
            this.filteredPackages = this.packages.filter(pkg => {
                // Search in title
                if (pkg.title.toLowerCase().includes(term)) return true;
                
                // Search in location
                if (pkg.location && pkg.location.toLowerCase().includes(term)) return true;
                
                // Search in tags
                if (pkg.tags && pkg.tags.some(tag => 
                    typeof tag === 'string' && tag.toLowerCase().includes(term)
                )) return true;
                
                // Search in description
                if (pkg.description && pkg.description.toLowerCase().includes(term)) return true;
                
                return false;
            });
        }
        
        this.renderOptions();
    }
    
    selectOption(pkg) {
        this.selectedPackage = pkg;
        this.input.value = pkg.title;
        
        // Find and select the correct option in the original select
        let optionFound = false;
        for (let i = 0; i < this.originalSelect.options.length; i++) {
            if (this.originalSelect.options[i].value === pkg.title) {
                this.originalSelect.selectedIndex = i;
                optionFound = true;
                break;
            }
        }
        
        // If option not found, add it to ensure it's available
        if (!optionFound) {
            const newOption = document.createElement('option');
            newOption.value = pkg.title;
            newOption.textContent = pkg.title;
            this.originalSelect.appendChild(newOption);
            this.originalSelect.selectedIndex = this.originalSelect.options.length - 1;
        }
        
        // Also set the value directly as fallback
        this.originalSelect.value = pkg.title;
        
        // Trigger change event on original select
        const event = new Event('change', { bubbles: true });
        this.originalSelect.dispatchEvent(event);
        
        // Log for debugging
        console.log('Package selected:', pkg.title);
        console.log('Original select value after selection:', this.originalSelect.value);
        console.log('Original select selectedIndex:', this.originalSelect.selectedIndex);
        
        // Update visual selection
        this.updateSelection();
        this.close();
    }
    
    updateSelection() {
        const options = this.optionsContainer.querySelectorAll('.dropdown-option');
        options.forEach(option => {
            option.classList.remove('selected');
            if (this.selectedPackage && option.getAttribute('data-value') === this.selectedPackage.title) {
                option.classList.add('selected');
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.dropdownList.classList.add('open');
        this.arrow.classList.add('open');
        this.input.setAttribute('aria-expanded', 'true');
        this.input.placeholder = 'Type to search packages...';
        
        // Clear input if it shows a selected package, to allow searching
        if (this.selectedPackage && this.input.value === this.selectedPackage.title) {
            this.input.value = '';
        }
        
        this.updateSelection();
    }
    
    close() {
        this.isOpen = false;
        this.dropdownList.classList.remove('open');
        this.arrow.classList.remove('open');
        this.input.setAttribute('aria-expanded', 'false');
        this.input.placeholder = 'Select packages';
        
        // Restore selected package value or clear if none selected
        if (this.selectedPackage) {
            this.input.value = this.selectedPackage.title;
        } else {
            this.input.value = '';
        }
        
        // Reset filtered packages
        this.filteredPackages = [...this.packages];
        this.renderOptions();
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (this.isOpen && this.filteredPackages.length === 1) {
                    // If only one option matches, select it
                    this.selectOption(this.filteredPackages[0]);
                } else if (!this.isOpen) {
                    this.open();
                }
                break;
            case 'Escape':
                this.close();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                } else {
                    this.focusNextOption();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (this.isOpen) {
                    this.focusPrevOption();
                }
                break;
        }
    }
    
    focusNextOption() {
        const options = this.optionsContainer.querySelectorAll('.dropdown-option');
        const focused = document.activeElement;
        const currentIndex = Array.from(options).indexOf(focused);
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        
        if (options[nextIndex]) {
            options[nextIndex].focus();
        }
    }
    
    focusPrevOption() {
        const options = this.optionsContainer.querySelectorAll('.dropdown-option');
        const focused = document.activeElement;
        const currentIndex = Array.from(options).indexOf(focused);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        
        if (options[prevIndex]) {
            options[prevIndex].focus();
        }
    }
    
    hideOriginalSelect() {
        this.originalSelect.style.display = 'none';
    }
    
    showOriginalSelect() {
        this.originalSelect.style.display = 'block';
    }
    
    destroy() {
        if (this.wrapper && this.wrapper.parentNode) {
            this.wrapper.parentNode.removeChild(this.wrapper);
        }
        this.showOriginalSelect();
    }
}

// Auto-initialize function
function initializeSearchableDropdowns() {
    const dropdowns = document.querySelectorAll('#package-name, select[name="package"]');
    
    dropdowns.forEach(async (dropdown) => {
        try {
            // Load packages
            const response = await fetch('./packages.json');
            if (!response.ok) throw new Error('Failed to load packages');
            
            const packages = await response.json();
            
            // Initialize searchable dropdown
            new SearchablePackageDropdown(dropdown, packages);
            
        } catch (error) {
            console.error('Error initializing searchable dropdown:', error);
            // Fallback to regular dropdown population
            dropdown.innerHTML = `
                <option value="">Select a package</option>
                <option value="Kerala Backwaters">Kerala Backwaters</option>
                <option value="Himalayan Adventure">Himalayan Adventure</option>
                <option value="Bali Relaxation Escape">Bali Relaxation Escape</option>
                <option value="Bali Escape">Bali Escape</option>
                <option value="Bali Explorer">Bali Explorer</option>
                <option value="Dubai Dream Escape">Dubai Dream Escape</option>
            `;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearchableDropdowns);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SearchablePackageDropdown, initializeSearchableDropdowns };
}
