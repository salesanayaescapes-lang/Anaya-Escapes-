// Contact Form Handler
function attachFormListeners() {
    const contactForms = document.querySelectorAll('.contact-form');
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    contactForms.forEach(form => {
        // Remove existing listener to avoid duplicates
        form.removeEventListener('submit', handleFormSubmit);
        form.addEventListener('submit', handleFormSubmit);
        
        // Add package dropdown change listener
        const packageDropdown = form.querySelector('select[name="package"]');
        if (packageDropdown) {
            packageDropdown.removeEventListener('change', handlePackageDropdownChange);
            packageDropdown.addEventListener('change', handlePackageDropdownChange);
        }
    });
    
    newsletterForms.forEach(form => {
        form.removeEventListener('submit', handleNewsletterSubmit);
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

function handlePackageDropdownChange(e) {
    console.log('Package dropdown changed:', e.target.value);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initial attachment of form listeners
    attachFormListeners();
    
    // Set up MutationObserver to handle dynamically created forms
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Check if any added nodes contain contact forms
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('contact-form')) {
                            attachFormListeners();
                        } else if (node.querySelector) {
                            const contactForms = node.querySelectorAll('.contact-form');
                            const newsletterForms = node.querySelectorAll('.newsletter-form');
                            if (contactForms.length > 0 || newsletterForms.length > 0) {
                                attachFormListeners();
                            }
                        }
                    }
                });
            }
        });
    });
    
    // Start observing the document body for added nodes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        
        // Get package value - handle both regular dropdown and searchable dropdown
        let selectedPackage = '';
        const packageDropdown = form.querySelector('select[name="package"]');
        
        if (packageDropdown) {
            selectedPackage = packageDropdown.value;
            
            // If the dropdown has a searchable wrapper, check the input value
            const searchableWrapper = packageDropdown.nextElementSibling;
            if (searchableWrapper && searchableWrapper.classList.contains('searchable-dropdown')) {
                const searchableInput = searchableWrapper.querySelector('.dropdown-input');
                if (searchableInput && searchableInput.value.trim()) {
                    selectedPackage = searchableInput.value.trim();
                }
            }
            
            // Log for debugging
            console.log('Package dropdown value:', selectedPackage);
            console.log('Package dropdown selectedIndex:', packageDropdown.selectedIndex);
        }
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country_code: formData.get('country_code'),
            package: selectedPackage,
            adults: formData.get('adults'),
            children: formData.get('children'),
            children_ages: formData.get('children_ages')
        };
        
        // Ensure package is captured correctly
        if (!data.package || data.package === '') {
            // Try to get package value again directly
            const packageSelect = form.querySelector('select[name="package"]');
            if (packageSelect && packageSelect.value && packageSelect.value !== '') {
                data.package = packageSelect.value;
            }
        }
        
        // Validate required fields
        if (!data.name || !data.email || !data.phone) {
            throw new Error('Please fill in all required fields: Name, Email, and Phone');
        }
        
        // Validate package selection
        if (!data.package || data.package === '') {
            throw new Error('Please select a package from the dropdown');
        }
        
        // Send data to API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Success - show thank you popup
            if (window.ThankYouPopup) {
                const popupInstance = new ThankYouPopup();
                popupInstance.showPopup('contact');
            } else {
                console.error('ThankYouPopup class not found');
            }
            form.reset();
            
            // Hide children age group if it was visible
            const childrenAgeGroup = document.querySelector('.children-age-group');
            if (childrenAgeGroup) {
                childrenAgeGroup.style.display = 'none';
            }
        } else {
            // Error from server
            throw new Error(result.error || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        showErrorMessage('Failed to send message. Please try again or contact us directly.');
        
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function showErrorMessage(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠️</span>
            <span class="error-text">${message}</span>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .error-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .error-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-newsletter');
    const originalBtnText = submitBtn.textContent;
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBSCRIBING...';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {
            newsletter_email: formData.get('newsletter_email'),
            type: 'newsletter'
        };
        
        // Send data to API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Success - show thank you message
            showSuccessMessage('Thank you for subscribing to our newsletter!');
            form.reset();
        } else {
            // Error from server
            throw new Error(result.error || 'Failed to subscribe');
        }
        
    } catch (error) {
        console.error('Newsletter submission error:', error);
        
        // Show error message
        showErrorMessage('Failed to subscribe. Please try again.');
        
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function showSuccessMessage(message) {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <span class="success-text">${message}</span>
            <button class="success-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}
