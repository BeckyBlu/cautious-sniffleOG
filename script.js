/**
 * Age Verification System
 * 
 * This script handles age verification for age-restricted content.
 * It uses browser localStorage to remember the user's verification status.
 */

// ============================================
// CONFIGURATION - You can customize these values
// ============================================
const AGE_REQUIREMENT = 18;                    // Minimum age required
const STORAGE_KEY = 'ageVerified';            // localStorage key name
const STORAGE_DURATION_DAYS = 30;             // How long to remember verification (0 = session only)

// ============================================
// AGE VERIFICATION LOGIC
// ============================================

function initAgeGate() {
  const modal = document.getElementById('ageGateModal');
  const form = document.getElementById('ageGateForm');
  const birthDateInput = document.getElementById('birthDate');
  const errorDiv = document.getElementById('ageGateError');
  const declineBtn = document.getElementById('declineBtn');
  
  // Check if user has already verified their age
  if (isAgeVerified()) {
    modal.classList.remove('show');
    return;
  }
  
  // Show the age gate modal
  modal.classList.add('show');
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const birthDate = new Date(birthDateInput.value);
    
    if (isValidBirthDate(birthDate)) {
      const age = calculateAge(birthDate);
      
      if (age >= AGE_REQUIREMENT) {
        // Age verified - save and close modal
        markAgeVerified();
        modal.classList.remove('show');
        errorDiv.textContent = '';
      } else {
        // User is too young
        errorDiv.textContent = `You must be ${AGE_REQUIREMENT}+ to enter.`;
      }
    } else {
      errorDiv.textContent = 'Please enter a valid date.';
    }
  });
  
  // Decline button
  declineBtn.addEventListener('click', () => {
    // Redirect to a safe page or show message
    window.location.href = 'https://www.google.com';
  });
}

/**
 * Calculate age from birth date
 * @param {Date} birthDate - User's birth date
 * @returns {number} Age in years
 */
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Validate that birth date is reasonable
 * @param {Date} date - Date to validate
 * @returns {boolean}
 */
function isValidBirthDate(date) {
  const today = new Date();
  
  // Check if it's a valid date
  if (isNaN(date.getTime())) {
    return false;
  }
  
  // Check if date is not in the future
  if (date > today) {
    return false;
  }
  
  // Check if person is not impossibly old (over 120 years)
  const age = calculateAge(date);
  if (age > 120) {
    return false;
  }
  
  return true;
}

/**
 * Check if age verification is already stored in localStorage
 * @returns {boolean}
 */
function isAgeVerified() {
  const verified = localStorage.getItem(STORAGE_KEY);
  
  if (!verified) {
    return false;
  }
  
  // Check if verification has expired
  if (STORAGE_DURATION_DAYS > 0) {
    const storedTime = JSON.parse(verified).timestamp;
    const expirationTime = storedTime + (STORAGE_DURATION_DAYS * 24 * 60 * 60 * 1000);
    
    if (Date.now() > expirationTime) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
  }
  
  return true;
}

/**
 * Mark user as age verified in localStorage
 */
function markAgeVerified() {
  const verificationData = {
    verified: true,
    timestamp: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(verificationData));
}

/**
 * Clear age verification (useful for testing)
 */
function clearAgeVerification() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('Age verification cleared. Reload page to see age gate again.');
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', initAgeGate);

console.log('Becky Taha Blu site loaded with age verification');
