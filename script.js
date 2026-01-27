// Tab functionality
function showTab(tabName) {
  // Hide all tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab pane
  const selectedPane = document.getElementById(tabName);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  // Add active class to clicked button
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (selectedBtn) {
    selectedBtn.classList.add('active');
  }
  
  // Re-trigger animations for event cards in the active tab
  const activeCards = selectedPane.querySelectorAll('.event-card');
  activeCards.forEach((card, index) => {
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = `slideUp 0.7s ease ${index * 0.1}s both`;
  });
}

// Toggle event details
function toggleEventDetails(btn) {
  const eventCard = btn.closest('.event-card');
  const details = eventCard.querySelector('.event-details');
  
  if (details.classList.contains('hidden')) {
    details.classList.remove('hidden');
    btn.textContent = 'Hide Details';
    btn.style.background = 'linear-gradient(45deg, #ee5a24, #ff6b6b)';
  } else {
    details.classList.add('hidden');
    btn.textContent = 'Details';
    btn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
  }
}

// Legacy functions for compatibility
function toggleDetails(btn) {
  toggleEventDetails(btn);
}

function toggle(btn) {
  toggleEventDetails(btn);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Show communication tab by default
  showTab('communication');
  
  // Add smooth scroll behavior for CTA button
  const ctaButton = document.querySelector('.cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector('#events-section');
      if (targetSection) {
        // Calculate offset to account for sticky nav
        const stickyNav = document.querySelector('.sticky-nav');
        const navHeight = stickyNav ? stickyNav.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Handle scroll behavior for sticky navigation
  let lastScrollTop = 0;
  const stickyNav = document.querySelector('.sticky-nav');
  
  if (stickyNav) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add shadow when scrolling
      if (scrollTop > 100) {
        stickyNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      } else {
        stickyNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // Fix parallax effect to work with fixed hero height
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = hero.querySelector('.hero-content');
      if (parallax && scrolled < hero.offsetHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        parallax.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.3;
      }
    });
  }
  
  // Add keyboard navigation for tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const nextIndex = e.key === 'ArrowRight' 
          ? (index + 1) % tabButtons.length 
          : (index - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[nextIndex].click();
        tabButtons[nextIndex].focus();
      }
    });
  });
  
  // Add touch swipe support for mobile (disabled for sticky nav)
  // Swipe functionality removed to prevent conflicts with sticky navigation
  
  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      img.style.animation = 'fadeIn 0.5s ease';
    });
  });
  
  // Ensure proper scroll positioning when hash is present
  if (window.location.hash === '#events-section') {
    setTimeout(() => {
      const targetSection = document.querySelector('#events-section');
      const stickyNav = document.querySelector('.sticky-nav');
      const navHeight = stickyNav ? stickyNav.offsetHeight : 0;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }, 100);
  }
});

// Add CSS animation for image loading
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
