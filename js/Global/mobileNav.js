document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  // Create mobile navigation overlay
  function createMobileNavOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.innerHTML = `
      <div class="mobile-nav-content">
        <div class="mobile-nav-header">
          <div class="mobile-nav-logo">
            <img src="/assets/images/logo.png" alt="Anaya Escapes" class="logo-image">
          </div>
          <button class="mobile-nav-close" aria-label="Close mobile menu">
            <span class="close-line"></span>
            <span class="close-line"></span>
          </button>
        </div>
        <nav class="mobile-nav-menu">
          <ul>
            <li><a href="index.html" class="mobile-nav-link">Home</a></li>
            <li><a href="about.html" class="mobile-nav-link">About</a></li>
            <li><a href="services.html" class="mobile-nav-link">Services</a></li>
            <li class="mobile-dropdown">
              <a href="packages.html" class="mobile-nav-link mobile-dropdown-toggle">Packages</a>
              <div class="mobile-dropdown-content">
                <a href="packages.html?filter=international" class="mobile-dropdown-item">International</a>
                <a href="packages.html?filter=domestic" class="mobile-dropdown-item">Domestic</a>
              </div>
            </li>
            <li><a href="Contact.html" class="mobile-nav-link">Contact Us</a></li>
          </ul>
        </nav>
        <div class="mobile-nav-footer">
          <a href="Contact.html" class="mobile-nav-cta cta-button-mobile">Book Now</a>
          <div class="mobile-nav-contact">
            <p>+91 84484 24042</p>
            <p>sales@anayaescapes.com</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }
  
  // Initialize mobile navigation
  function initMobileNav() {
    if (!mobileMenuToggle) return;
    
    let mobileOverlay = document.querySelector('.mobile-nav-overlay');
    
    // Create overlay if it doesn't exist
    if (!mobileOverlay) {
      mobileOverlay = createMobileNavOverlay();
    }
    
    const closeBtn = mobileOverlay.querySelector('.mobile-nav-close');
    const dropdownToggles = mobileOverlay.querySelectorAll('.mobile-dropdown-toggle');
    const navLinks = mobileOverlay.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
      const isActive = mobileMenuToggle.classList.contains('active');
      
      if (isActive) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
    
    // Open mobile menu
    function openMobileMenu() {
      mobileMenuToggle.classList.add('active');
      mobileOverlay.classList.add('active');
      body.style.overflow = 'hidden';
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
    
    // Close mobile menu
    function closeMobileMenu() {
      mobileMenuToggle.classList.remove('active');
      mobileOverlay.classList.remove('active');
      body.style.overflow = '';
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      
      // Close all dropdowns
      const dropdowns = mobileOverlay.querySelectorAll('.mobile-dropdown');
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
    
    // Handle dropdown toggles in mobile menu
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.closest('.mobile-dropdown');
        const isActive = dropdown.classList.contains('active');
        
        // Close all other dropdowns
        const allDropdowns = mobileOverlay.querySelectorAll('.mobile-dropdown');
        allDropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active', !isActive);
      });
    });
    
    // Event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on overlay background
    mobileOverlay.addEventListener('click', function(e) {
      if (e.target === mobileOverlay) {
        closeMobileMenu();
      }
    });
    
    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Only close if it's not a dropdown toggle
        if (!this.classList.contains('mobile-dropdown-toggle')) {
          closeMobileMenu();
        }
      });
    });
    
    // Close menu when clicking dropdown items
    const dropdownItems = mobileOverlay.querySelectorAll('.mobile-dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
        closeMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1200 && mobileOverlay.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
  
  // Initialize when DOM is ready
  initMobileNav();
});
