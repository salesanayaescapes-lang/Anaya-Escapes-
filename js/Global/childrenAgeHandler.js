// Children Age Handler - Shows/hides children age field based on children count
class ChildrenAgeHandler {
  constructor() {
    this.init();
  }

  init() {
    // Handle both regular contact form and modal contact form
    this.setupChildrenAgeToggle('children', 'children-ages');
    this.setupChildrenAgeToggle('modal-children', 'modal-children-ages');
  }

  setupChildrenAgeToggle(childrenInputId, ageInputId) {
    const childrenInput = document.getElementById(childrenInputId);
    const ageGroup = document.querySelector(`#${ageInputId}`);
    
    if (!childrenInput) return;

    childrenInput.addEventListener('input', (e) => {
      const childrenCount = parseInt(e.target.value) || 0;
      const ageContainer = ageGroup ? ageGroup.closest('.children-age-group') : null;
      
      if (ageContainer) {
        if (childrenCount > 0) {
          ageContainer.style.display = 'block';
          ageGroup.setAttribute('required', 'true');
        } else {
          ageContainer.style.display = 'none';
          ageGroup.removeAttribute('required');
          ageGroup.value = '';
        }
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChildrenAgeHandler();
});
