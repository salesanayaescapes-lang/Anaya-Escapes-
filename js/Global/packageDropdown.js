/**
 * Dynamic Package Dropdown Handler
 * Fetches packages from packages.json and populates all contact form dropdowns
 */

class PackageDropdownManager {
    constructor() {
        this.packages = [];
        this.init();
    }

    async init() {
        // Immediately populate dropdowns with fallback options
        this.ensureDropdownsPopulated();
        
        // Then try to load from JSON (will update if successful)
        try {
            await this.loadPackages();
            this.populateAllDropdowns();
        } catch (error) {
            console.error('Error loading packages from JSON:', error);
            // Fallback already populated, so no need to do anything
        }
    }

    async loadPackages() {
        try {
            // Try multiple paths to find packages.json
            const possiblePaths = [
                './packages.json',
                '../packages.json',
                '/packages.json',
                'packages.json'
            ];
            
            let response = null;
            let lastError = null;
            
            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        console.log(`Successfully loaded packages from: ${path}`);
                        break;
                    }
                } catch (err) {
                    lastError = err;
                    console.warn(`Failed to load from ${path}:`, err.message);
                }
            }
            
            if (!response || !response.ok) {
                throw new Error(`Could not load packages.json from any path. Last error: ${lastError?.message}`);
            }
            
            this.packages = await response.json();
            console.log(`Loaded ${this.packages.length} packages successfully`);
        } catch (error) {
            console.error('Error loading packages:', error);
            throw error;
        }
    }

    populateAllDropdowns() {
        // Find all package dropdowns on the page
        const packageDropdowns = document.querySelectorAll('#package-name, select[name="package"]');
        
        console.log(`Found ${packageDropdowns.length} dropdown(s) to populate`);
        
        if (packageDropdowns.length === 0) {
            console.warn('No package dropdowns found on this page');
            return;
        }
        
        packageDropdowns.forEach((dropdown, index) => {
            console.log(`Populating dropdown ${index + 1}:`, dropdown);
            this.populateDropdown(dropdown);
        });
    }

    populateDropdown(selectElement) {
        if (!selectElement) {
            console.error('No select element provided');
            return;
        }

        console.log(`Populating dropdown with ${this.packages.length} packages`);

        // Clear existing options
        selectElement.innerHTML = '';
        
        // Add default placeholder option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select package type first';
        selectElement.appendChild(defaultOption);

        // Group packages by location-type
        const domesticPackages = this.packages.filter(pkg => pkg['location-type'] === 'domestic');
        const internationalPackages = this.packages.filter(pkg => pkg['location-type'] === 'international');

        // Create Domestic optgroup
        if (domesticPackages.length > 0) {
            const domesticGroup = document.createElement('optgroup');
            domesticGroup.label = 'Domestic Packages';
            
            domesticPackages.forEach((package, index) => {
                const option = document.createElement('option');
                option.value = package.title;
                option.textContent = package.title;
                option.dataset.packageId = package.id;
                option.dataset.price = package.price;
                option.dataset.location = package.location;
                option.dataset.locationType = package['location-type'];
                domesticGroup.appendChild(option);
                console.log(`Added domestic package ${index + 1}: ${package.title}`);
            });
            
            selectElement.appendChild(domesticGroup);
        }

        // Create International optgroup
        if (internationalPackages.length > 0) {
            const internationalGroup = document.createElement('optgroup');
            internationalGroup.label = 'International Packages';
            
            internationalPackages.forEach((package, index) => {
                const option = document.createElement('option');
                option.value = package.title;
                option.textContent = package.title;
                option.dataset.packageId = package.id;
                option.dataset.price = package.price;
                option.dataset.location = package.location;
                option.dataset.locationType = package['location-type'];
                internationalGroup.appendChild(option);
                console.log(`Added international package ${index + 1}: ${package.title}`);
            });
            
            selectElement.appendChild(internationalGroup);
        }

        console.log(`Dropdown now has ${selectElement.options.length} total options (${domesticPackages.length} domestic, ${internationalPackages.length} international)`);

        // Add event listener for package selection
        selectElement.addEventListener('change', (e) => {
            this.handlePackageSelection(e.target);
        });
    }

    handlePackageSelection(selectElement) {
        const selectedOption = selectElement.selectedOptions[0];
        if (selectedOption && selectedOption.value) {
            const packageData = {
                id: selectedOption.dataset.packageId,
                title: selectedOption.value,
                price: selectedOption.dataset.price,
                location: selectedOption.dataset.location,
                locationType: selectedOption.dataset.locationType
            };
            
            console.log('Package selected:', packageData);
            
            // Dispatch custom event for other components to listen to
            document.dispatchEvent(new CustomEvent('packageSelected', {
                detail: packageData
            }));
        }
    }

    ensureDropdownsPopulated() {
        const packageDropdowns = document.querySelectorAll('#package-name, select[name="package"]');
        
        console.log(`Found ${packageDropdowns.length} dropdown(s) to ensure population`);
        
        packageDropdowns.forEach((dropdown, index) => {
            console.log(`Dropdown ${index + 1} before population:`, dropdown.options.length, 'options');
            
            // Always populate to ensure options are available
            dropdown.innerHTML = `
                <option value="">Select package type first</option>
                <optgroup label="Domestic Packages">
                    <option value="Kerala Backwaters">Kerala Backwaters</option>
                    <option value="Himalayan Adventure">Himalayan Adventure</option>
                </optgroup>
                <optgroup label="International Packages">
                    <option value="Bali Relaxation Escape">Bali Relaxation Escape</option>
                    <option value="Bali Escape">Bali Escape</option>
                    <option value="Bali Explorer">Bali Explorer</option>
                    <option value="Dubai Dream Escape">Dubai Dream Escape</option>
                </optgroup>
            `;
            
            console.log(`Dropdown ${index + 1} after population:`, dropdown.options.length, 'options');
        });
    }

    // Method to refresh dropdowns (useful if packages.json is updated)
    async refresh() {
        await this.init();
    }

    // Method to get all packages
    getPackages() {
        return this.packages;
    }

    // Method to get package by title
    getPackageByTitle(title) {
        return this.packages.find(pkg => pkg.title === title);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.packageDropdownManager = new PackageDropdownManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PackageDropdownManager;
}
