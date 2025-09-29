// Thank You Popup Handler
class ThankYouPopup {
  constructor() {
    this.overlay = null;
    this.popup = null;
    this.init();
  }

  init() {
    this.createPopupHTML();
    this.bindEvents();
    this.checkURLParams();
    this.interceptFormSubmissions();
  }

  createPopupHTML() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'thank-you-popup-overlay';
    this.overlay.id = 'thankYouPopupOverlay';

    // Create popup content
    this.popup = document.createElement('div');
    this.popup.className = 'thank-you-popup';

    this.popup.innerHTML = `
      <button class="thank-you-popup-close" id="thankYouPopupClose">&times;</button>
      
      <div class="thank-you-popup-icon">
        <svg viewBox="0 0 24 24">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </div>
      
      <h3 class="thank-you-popup-title">Thank You!</h3>
      <p class="thank-you-popup-message" id="thankYouMessage">
        Your message has been sent successfully. We'll get back to you soon!
      </p>
      
      <div class="thank-you-popup-actions">
        <button class="thank-you-popup-btn primary" id="thankYouClose">Continue</button>
        <a href="packages.html" class="thank-you-popup-btn secondary">View Packages</a>
      </div>
    `;

    this.overlay.appendChild(this.popup);
    document.body.appendChild(this.overlay);
  }

  bindEvents() {
    // Use event delegation for buttons since they might not exist immediately
    document.addEventListener('click', (e) => {
      // Close button
      if (e.target.id === 'thankYouPopupClose' || e.target.closest('#thankYouPopupClose')) {
        e.preventDefault();
        this.hidePopup();
      }
      
      // Continue button
      if (e.target.id === 'thankYouClose' || e.target.closest('#thankYouClose')) {
        e.preventDefault();
        this.hidePopup();
      }
    });
    
    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hidePopup();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay && this.overlay.classList.contains('show')) {
        this.hidePopup();
      }
    });
  }

  showPopup(type = 'contact') {
    const messageElement = document.getElementById('thankYouMessage');
    
    if (type === 'newsletter') {
      messageElement.textContent = 'Thank you for subscribing to our newsletter! You\'ll receive the latest travel deals and destination guides.';
    } else {
      messageElement.textContent = 'Your message has been sent successfully. We\'ll get back to you soon!';
    }

    this.overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  hidePopup() {
    this.overlay.classList.remove('show');
    document.body.style.overflow = '';
    
    // Clean up URL parameters after closing popup
    this.cleanURLParams();
  }

  checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
      setTimeout(() => this.showPopup('contact'), 500);
    } else if (urlParams.get('newsletter') === 'success') {
      setTimeout(() => this.showPopup('newsletter'), 500);
    }
  }

  cleanURLParams() {
    const url = new URL(window.location);
    url.searchParams.delete('success');
    url.searchParams.delete('newsletter');
    window.history.replaceState({}, document.title, url.pathname + url.hash);
  }

  interceptFormSubmissions() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
      // Handle contact forms
      const contactForms = document.querySelectorAll('.contact-form');
      console.log('Found contact forms:', contactForms.length);
      
      contactForms.forEach(form => {
        // Also add click event to submit button directly
        const submitBtn = form.querySelector('.submit-btn, button[type="submit"]');
        if (submitBtn) {
          console.log('Found submit button:', submitBtn);
          
          submitBtn.addEventListener('click', (e) => {
            console.log('Submit button clicked');
            
            // Check if we're running locally only
            if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
              e.preventDefault();
              
              // Validate form
              if (this.validateForm(form)) {
                console.log('Form valid, showing popup');
                // Show success popup
                setTimeout(() => this.showPopup('contact'), 500);
                
                // Reset form
                form.reset();
              }
            }
          });
        }
        
        form.addEventListener('submit', (e) => {
          console.log('Form submitted, location:', window.location.protocol, window.location.hostname);
          
          // Check if we're running locally only
          if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Local environment detected, preventing default submission');
            e.preventDefault();
            
            // Validate form
            if (this.validateForm(form)) {
              console.log('Form valid, showing popup');
              // Show success popup
              setTimeout(() => this.showPopup('contact'), 500);
              
              // Reset form
              form.reset();
            }
          }
          // If not local, let FormSubmit handle it normally
        });
      });

      // Handle newsletter forms
      const newsletterForms = document.querySelectorAll('.newsletter-form');
      console.log('Found newsletter forms:', newsletterForms.length);
      newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
          console.log('Newsletter form submitted');
          
          // Check if we're running locally only
          if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            e.preventDefault();
            
            // Validate form
            if (this.validateForm(form)) {
              // Show success popup
              setTimeout(() => this.showPopup('newsletter'), 500);
              
              // Reset form
              form.reset();
            }
          }
          // If not local, let FormSubmit handle it normally
        });
      });
    }, 100);
  }

  validateForm(form) {
    // Basic form validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    for (const field of requiredFields) {
      // Skip package dropdown validation if it's still loading
      if (field.name === 'package' && field.value === '') {
        const firstOption = field.querySelector('option');
        if (firstOption && firstOption.textContent.includes('Loading')) {
          console.log('Package dropdown still loading, skipping validation');
          continue;
        }
      }
      
      if (!field.value.trim()) {
        // Show validation message
        console.log('Validation failed for field:', field.name);
        field.focus();
        isValid = false;
        break;
      }
    }

    console.log('Form validation result:', isValid);
    return isValid;
  }
}

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThankYouPopup();
});

// Fallback: Add global form submission handler
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('submit-btn') || e.target.type === 'submit') {
    console.log('Submit button clicked via global handler');
    
    const form = e.target.closest('form');
    if (form && (form.classList.contains('contact-form') || form.classList.contains('newsletter-form'))) {
      // Check if we're running locally only
      if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        for (const field of requiredFields) {
          // Skip package dropdown validation if it's still loading
          if (field.name === 'package' && field.value === '') {
            const firstOption = field.querySelector('option');
            if (firstOption && firstOption.textContent.includes('Loading')) {
              console.log('Package dropdown still loading, skipping validation for global handler');
              continue;
            }
          }
          
          if (!field.value.trim()) {
            field.focus();
            isValid = false;
            break;
          }
        }
        
        if (isValid) {
          const isNewsletter = form.classList.contains('newsletter-form');
          const popupType = isNewsletter ? 'newsletter' : 'contact';
          
          // Show popup
          if (window.ThankYouPopup) {
            setTimeout(() => {
              const popup = new ThankYouPopup();
              popup.showPopup(popupType);
            }, 300);
          }
          
          // Reset form
          form.reset();
        }
      }
    }
  }
});

// Export for potential use in other scripts
window.ThankYouPopup = ThankYouPopup;
