// Searchable Country Code Dropdown Functionality
class CountryCodeDropdown {
  constructor() {
    this.countries = [
      { code: '+1', name: 'United States', iso: 'US', flag: '🇺🇸' },
      { code: '+1', name: 'Canada', iso: 'CA', flag: '🇨🇦' },
      { code: '+44', name: 'United Kingdom', iso: 'GB', flag: '🇬🇧' },
      { code: '+91', name: 'India', iso: 'IN', flag: '🇮🇳' },
      { code: '+86', name: 'China', iso: 'CN', flag: '🇨🇳' },
      { code: '+81', name: 'Japan', iso: 'JP', flag: '🇯🇵' },
      { code: '+49', name: 'Germany', iso: 'DE', flag: '🇩🇪' },
      { code: '+33', name: 'France', iso: 'FR', flag: '🇫🇷' },
      { code: '+39', name: 'Italy', iso: 'IT', flag: '🇮🇹' },
      { code: '+34', name: 'Spain', iso: 'ES', flag: '🇪🇸' },
      { code: '+61', name: 'Australia', iso: 'AU', flag: '🇦🇺' },
      { code: '+55', name: 'Brazil', iso: 'BR', flag: '🇧🇷' },
      { code: '+7', name: 'Russia', iso: 'RU', flag: '🇷🇺' },
      { code: '+82', name: 'South Korea', iso: 'KR', flag: '🇰🇷' },
      { code: '+52', name: 'Mexico', iso: 'MX', flag: '🇲🇽' },
      { code: '+31', name: 'Netherlands', iso: 'NL', flag: '🇳🇱' },
      { code: '+46', name: 'Sweden', iso: 'SE', flag: '🇸🇪' },
      { code: '+47', name: 'Norway', iso: 'NO', flag: '🇳🇴' },
      { code: '+45', name: 'Denmark', iso: 'DK', flag: '🇩🇰' },
      { code: '+41', name: 'Switzerland', iso: 'CH', flag: '🇨🇭' },
      { code: '+43', name: 'Austria', iso: 'AT', flag: '🇦🇹' },
      { code: '+32', name: 'Belgium', iso: 'BE', flag: '🇧🇪' },
      { code: '+351', name: 'Portugal', iso: 'PT', flag: '🇵🇹' },
      { code: '+30', name: 'Greece', iso: 'GR', flag: '🇬🇷' },
      { code: '+90', name: 'Turkey', iso: 'TR', flag: '🇹🇷' },
      { code: '+971', name: 'UAE', iso: 'AE', flag: '🇦🇪' },
      { code: '+966', name: 'Saudi Arabia', iso: 'SA', flag: '🇸🇦' },
      { code: '+65', name: 'Singapore', iso: 'SG', flag: '🇸🇬' },
      { code: '+60', name: 'Malaysia', iso: 'MY', flag: '🇲🇾' },
      { code: '+66', name: 'Thailand', iso: 'TH', flag: '🇹🇭' },
      { code: '+84', name: 'Vietnam', iso: 'VN', flag: '🇻🇳' },
      { code: '+62', name: 'Indonesia', iso: 'ID', flag: '🇮🇩' },
      { code: '+63', name: 'Philippines', iso: 'PH', flag: '🇵🇭' },
      { code: '+64', name: 'New Zealand', iso: 'NZ', flag: '🇳🇿' },
      { code: '+27', name: 'South Africa', iso: 'ZA', flag: '🇿🇦' },
      { code: '+20', name: 'Egypt', iso: 'EG', flag: '🇪🇬' },
      { code: '+234', name: 'Nigeria', iso: 'NG', flag: '🇳🇬' },
      { code: '+254', name: 'Kenya', iso: 'KE', flag: '🇰🇪' },
      { code: '+92', name: 'Pakistan', iso: 'PK', flag: '🇵🇰' },
      { code: '+880', name: 'Bangladesh', iso: 'BD', flag: '🇧🇩' },
      { code: '+94', name: 'Sri Lanka', iso: 'LK', flag: '🇱🇰' },
      { code: '+977', name: 'Nepal', iso: 'NP', flag: '🇳🇵' },
      { code: '+975', name: 'Bhutan', iso: 'BT', flag: '🇧🇹' },
      { code: '+960', name: 'Maldives', iso: 'MV', flag: '🇲🇻' }
    ];
    
    this.filteredCountries = [...this.countries];
    this.selectedCountry = this.countries.find(c => c.code === '+91'); // Default to India
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDropdowns());
    } else {
      this.setupDropdowns();
    }
    
    // Also setup dropdowns when modals are opened (for dynamic content)
    this.observeModalChanges();
  }

  observeModalChanges() {
    // Watch for modal content changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const phoneInputs = node.querySelectorAll ? node.querySelectorAll('input[type="tel"]') : [];
              phoneInputs.forEach(input => {
                if (!input.closest('.phone-input-container')) {
                  this.convertToSearchableCountryCodeInput(input);
                }
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  setupDropdowns() {
    // Find all phone input fields and convert them to country code dropdowns
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      this.convertToSearchableCountryCodeInput(input);
    });
  }

  convertToSearchableCountryCodeInput(phoneInput) {
    // Store original attributes
    const originalId = phoneInput.id;
    const originalRequired = phoneInput.required;
    const parentElement = phoneInput.parentNode;
    
    // Create container for the phone input with country code
    const container = document.createElement('div');
    container.className = 'phone-input-container';
    
    // Create country code dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'country-code-dropdown';
    
    // Create searchable input for country code
    const countryInput = document.createElement('input');
    countryInput.type = 'text';
    countryInput.className = 'country-code-input';
    countryInput.placeholder = 'Search country...';
    countryInput.value = `🇮🇳 +91`; // Default to India
    countryInput.readOnly = true;
    
    // Create dropdown list
    const dropdownList = document.createElement('div');
    dropdownList.className = 'country-dropdown-list';
    
    // Create hidden input to store the selected country code
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'country_code';
    hiddenInput.value = '+91';
    
    // Create new phone number input
    const phoneNumberInput = document.createElement('input');
    phoneNumberInput.type = 'tel';
    phoneNumberInput.className = 'phone-number-input';
    phoneNumberInput.placeholder = 'Enter 10-digit number';
    phoneNumberInput.name = 'phone';
    phoneNumberInput.required = originalRequired;
    phoneNumberInput.id = originalId;
    
    // Build the structure
    dropdownContainer.appendChild(countryInput);
    dropdownContainer.appendChild(dropdownList);
    dropdownContainer.appendChild(hiddenInput);
    
    container.appendChild(dropdownContainer);
    container.appendChild(phoneNumberInput);
    
    // Replace the original input with the container
    parentElement.replaceChild(container, phoneInput);
    
    // Populate dropdown options
    this.populateDropdown(dropdownList);
    
    // Add event listeners
    this.addSearchableEventListeners(countryInput, dropdownList, hiddenInput, phoneNumberInput);
  }

  populateDropdown(dropdownList) {
    dropdownList.innerHTML = '';
    
    this.filteredCountries.forEach((country, index) => {
      const option = document.createElement('div');
      option.className = 'country-option';
      option.dataset.code = country.code;
      option.dataset.iso = country.iso;
      option.dataset.name = country.name;
      
      option.innerHTML = `
        <span class="flag-emoji">${country.flag}</span>
        <span class="country-code">${country.code}</span>
      `;
      
      dropdownList.appendChild(option);
    });
  }

  addSearchableEventListeners(countryInput, dropdownList, hiddenInput, phoneInput) {
    let highlightedIndex = -1;
    
    // Show dropdown when input is clicked
    countryInput.addEventListener('click', () => {
      countryInput.readOnly = false;
      countryInput.value = '';
      countryInput.placeholder = 'Search...';
      dropdownList.classList.add('active');
      this.filteredCountries = [...this.countries];
      this.populateDropdown(dropdownList);
    });
    
    // Handle search input
    countryInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      this.filteredCountries = this.countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.includes(searchTerm) ||
        country.iso.toLowerCase().includes(searchTerm)
      );
      this.populateDropdown(dropdownList);
      highlightedIndex = -1;
    });
    
    // Handle keyboard navigation
    countryInput.addEventListener('keydown', (e) => {
      const options = dropdownList.querySelectorAll('.country-option');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex = Math.min(highlightedIndex + 1, options.length - 1);
        this.updateHighlight(options, highlightedIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIndex = Math.max(highlightedIndex - 1, -1);
        this.updateHighlight(options, highlightedIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          this.selectCountry(options[highlightedIndex], countryInput, hiddenInput, phoneInput);
          dropdownList.classList.remove('active');
        }
      } else if (e.key === 'Escape') {
        this.resetInput(countryInput, hiddenInput);
        dropdownList.classList.remove('active');
      }
    });
    
    // Handle option clicks
    dropdownList.addEventListener('click', (e) => {
      const option = e.target.closest('.country-option');
      if (option) {
        this.selectCountry(option, countryInput, hiddenInput, phoneInput);
        dropdownList.classList.remove('active');
      }
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownList.contains(e.target) && !countryInput.contains(e.target)) {
        if (!hiddenInput.value) {
          this.resetInput(countryInput, hiddenInput);
        }
        dropdownList.classList.remove('active');
      }
    });
  }

  updateHighlight(options, index) {
    options.forEach((option, i) => {
      option.classList.toggle('highlighted', i === index);
    });
    
    if (index >= 0 && options[index]) {
      options[index].scrollIntoView({ block: 'nearest' });
    }
  }

  selectCountry(option, countryInput, hiddenInput, phoneInput) {
    const code = option.dataset.code;
    const name = option.dataset.name;
    const flag = option.querySelector('.flag-emoji').textContent;
    
    countryInput.value = `${flag} ${code}`;
    countryInput.readOnly = true;
    hiddenInput.value = code;
    
    // Update phone input placeholder
    this.updatePhonePlaceholder(phoneInput, code);
    
    // Store selected country
    this.selectedCountry = this.countries.find(c => c.code === code && c.name === name);
  }

  resetInput(countryInput, hiddenInput) {
    if (this.selectedCountry) {
      countryInput.value = `${this.selectedCountry.flag} ${this.selectedCountry.code}`;
    } else {
      countryInput.value = `🇮🇳 +91`;
      hiddenInput.value = '+91';
    }
    countryInput.readOnly = true;
  }

  addEventListeners(countrySelect, phoneInput) {
    // Format phone number based on country code
    phoneInput.addEventListener('input', (e) => {
      this.formatPhoneNumber(e.target, countrySelect.value);
    });
    
    // Update phone input placeholder when country changes
    countrySelect.addEventListener('change', (e) => {
      this.updatePhonePlaceholder(phoneInput, e.target.value);
    });
  }

  formatPhoneNumber(input, countryCode) {
    // Remove all non-numeric characters
    let value = input.value.replace(/\D/g, '');
    
    // Apply basic formatting based on country code
    if (countryCode === '+91') {
      // Indian format: 10 digits
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      if (value.length > 5) {
        value = value.substring(0, 5) + ' ' + value.substring(5);
      }
    } else if (countryCode === '+1') {
      // US/Canada format: (XXX) XXX-XXXX
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      if (value.length > 6) {
        value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
      } else if (value.length > 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3);
      }
    } else {
      // Generic formatting for other countries
      if (value.length > 15) {
        value = value.substring(0, 15);
      }
      if (value.length > 7) {
        value = value.substring(0, 4) + ' ' + value.substring(4, 7) + ' ' + value.substring(7);
      } else if (value.length > 4) {
        value = value.substring(0, 4) + ' ' + value.substring(4);
      }
    }
    
    input.value = value;
  }

  updatePhonePlaceholder(phoneInput, countryCode) {
    const placeholders = {
      '+91': 'Enter 10-digit number',
      '+1': 'Enter 10-digit number',
      '+44': 'Enter phone number',
      '+86': 'Enter phone number',
      '+81': 'Enter phone number',
      '+49': 'Enter phone number',
      '+33': 'Enter phone number',
      '+39': 'Enter phone number',
      '+34': 'Enter phone number',
      '+61': 'Enter phone number',
      '+55': 'Enter phone number',
      '+7': 'Enter phone number'
    };
    
    phoneInput.placeholder = placeholders[countryCode] || 'Enter phone number';
  }

  // Method to get the complete phone number with country code
  getCompletePhoneNumber(formElement) {
    const countrySelect = formElement.querySelector('.country-code-select');
    const phoneInput = formElement.querySelector('.phone-number-input');
    
    if (countrySelect && phoneInput && countrySelect.value && phoneInput.value) {
      return countrySelect.value + phoneInput.value.replace(/\s/g, '');
    }
    
    return '';
  }
}

// Initialize country code dropdowns when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CountryCodeDropdown();
});

// Export for use in other scripts
window.CountryCodeDropdown = CountryCodeDropdown;
