document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.main-nav .dropdown-toggle');
  
  // Desktop dropdown behavior - only for main navigation
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth > 1200) {
        // On desktop, allow normal link behavior for dropdowns
        return;
      } else {
        // On mobile, prevent default navigation since mobile nav overlay will handle it
        e.preventDefault();
      }
    });
  });
  
  // Close dropdowns when clicking outside (desktop only)
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 1200 && !e.target.closest('.dropdown')) {
      const dropdownContents = document.querySelectorAll('.main-nav .dropdown-content');
      dropdownContents.forEach(content => {
        content.style.display = 'none';
      });
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1200) {
      // Reset dropdown display on desktop
      const dropdownContents = document.querySelectorAll('.main-nav .dropdown-content');
      dropdownContents.forEach(content => {
        content.style.display = '';
      });
    }
  });
});