/**
 * Dynamic Location Filters for Packages Page
 * Automatically populates filter buttons from packages.json
 */

class LocationFiltersManager {
    constructor() {
        this.packages = [];
        this.internationalLocations = [];
        this.domesticLocations = [];
        this.init();
    }

    async init() {
        try {
            await this.loadPackages();
            this.extractLocations();
            this.populateFilters();
            this.bindFilterEvents();
        } catch (error) {
            console.error('Error initializing location filters:', error);
            this.handleError();
        }
    }

    async loadPackages() {
        try {
            const response = await fetch('./packages.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.packages = await response.json();
            console.log(`Loaded ${this.packages.length} packages for filtering`);
        } catch (error) {
            console.error('Error loading packages:', error);
            throw error;
        }
    }

    extractLocations() {
        const internationalSet = new Set();
        const domesticSet = new Set();

        this.packages.forEach(pkg => {
            const locationName = this.formatLocationName(pkg.location);
            
            if (pkg['location-type'] === 'international') {
                internationalSet.add(locationName);
            } else if (pkg['location-type'] === 'domestic') {
                domesticSet.add(locationName);
            }
        });

        this.internationalLocations = Array.from(internationalSet).sort();
        this.domesticLocations = Array.from(domesticSet).sort();

        console.log('International locations:', this.internationalLocations);
        console.log('Domestic locations:', this.domesticLocations);
    }

    formatLocationName(location) {
        // Capitalize first letter and handle special cases
        return location.charAt(0).toUpperCase() + location.slice(1);
    }

    populateFilters() {
        // Find filter groups
        const filterGroups = document.querySelectorAll('.filter-group');
        
        filterGroups.forEach(group => {
            const title = group.querySelector('h4').textContent.toLowerCase();
            const optionsContainer = group.querySelector('.filter-options');
            
            if (title === 'international') {
                this.populateFilterGroup(optionsContainer, this.internationalLocations);
            } else if (title === 'domestic') {
                this.populateFilterGroup(optionsContainer, this.domesticLocations);
            }
        });
    }

    populateFilterGroup(container, locations) {
        // Clear existing buttons
        container.innerHTML = '';
        
        // Add location buttons
        locations.forEach(location => {
            const button = document.createElement('button');
            button.textContent = location;
            button.className = 'filter-btn';
            button.dataset.location = location.toLowerCase();
            container.appendChild(button);
        });
    }

    bindFilterEvents() {
        // Clear All button
        const clearAllBtn = document.querySelector('.filter-header button');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearAllFilters());
        }

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
        });
    }

    handleFilterClick(button) {
        const location = button.dataset.location;
        
        // Toggle active state
        button.classList.toggle('active');
        
        // Get all active filters
        const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.dataset.location);
        
        // Apply filters
        this.applyFilters(activeFilters);
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('filtersChanged', {
            detail: { activeFilters, location }
        }));
    }

    applyFilters(activeFilters) {
        // Disabled to prevent conflicts with main filtering system
        console.log('Active filters:', activeFilters);
        // Main filtering is handled by renderPackagesCards.js
    }

    clearAllFilters() {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show all packages
        this.applyFilters([]);
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('filtersCleared'));
    }

    handleError() {
        console.warn('Using fallback location filters due to loading error');
        // Keep existing hardcoded filters as fallback
    }

    // Method to get packages by location
    getPackagesByLocation(location) {
        return this.packages.filter(pkg => 
            pkg.location.toLowerCase() === location.toLowerCase()
        );
    }

    // Method to get all locations
    getAllLocations() {
        return {
            international: this.internationalLocations,
            domestic: this.domesticLocations
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.locationFiltersManager = new LocationFiltersManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationFiltersManager;
}
