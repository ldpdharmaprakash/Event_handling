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

function showTab(tabName) {
  // Hide all tab panes
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    pane.classList.remove('active');
  });

  // Show the selected tab pane
  const selectedPane = document.getElementById(tabName);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }

  // Update button active state
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });
}

function toggleEventDetails(button) {
  const cardBody = button.closest('.event-card').querySelector('.card-body');
  const details = cardBody.querySelector('.event-details');
  
  if (details.classList.contains('hidden')) {
    details.classList.remove('hidden');
    button.textContent = "Hide Details";
    button.style.background = "#f0f0f0";
  } else {
    details.classList.add('hidden');
    button.textContent = "View Details";
    button.style.background = "transparent";
  }
}

/* --- MODAL LOGIC START --- */

// Function to open the modal with the specific URL
function openRegisterModal(url) {
  if (!url) {
    alert("Registration link for this event will be available soon!");
    return;
  }
  
  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');
  const newTabBtn = document.getElementById('newTabLink'); // Get the button
  
  // Set the source for the iframe
  iframe.src = url;
  
  // Set the source for the "Open in New Tab" button
  // (We remove '?embedded=true' for the direct link so it looks cleaner)
  const cleanUrl = url.replace('?embedded=true', '');
  newTabBtn.href = cleanUrl;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; 
}

// Function to close the modal
function closeRegisterModal() {
  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');
  
  modal.style.display = "none";
  iframe.src = ""; 
  document.body.style.overflow = "auto"; 
}

// Close modal when clicking outside the box
window.onclick = function(event) {
  const modal = document.getElementById('registrationModal');
  if (event.target == modal) {
    closeRegisterModal();
  }
}
/* --- MODAL LOGIC END --- */

function showTab(tabName) {
  // Hide all tab panes
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    pane.classList.remove('active');
  });

  // Show the selected tab pane
  const selectedPane = document.getElementById(tabName);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }

  // Update button active state
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    }
  });
}

function toggleEventDetails(button) {
  const cardBody = button.closest('.event-card').querySelector('.card-body');
  const details = cardBody.querySelector('.event-details');
  
  if (details.classList.contains('hidden')) {
    details.classList.remove('hidden');
    button.textContent = "Hide Details";
    button.style.background = "#f0f0f0";
  } else {
    details.classList.add('hidden');
    button.textContent = "View Details";
    button.style.background = "transparent";
  }
}

/* --- MODAL LOGIC START --- */

// Function to open the modal with the specific URL
function openRegisterModal(url) {
  if (!url) {
    alert("Registration link for this event will be available soon!");
    return;
  }
  
  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');
  const newTabBtn = document.getElementById('newTabLink');
  
  // Set the source for the iframe
  iframe.src = url;
  
  // Set the source for the "Open in New Tab" button
  const cleanUrl = url.replace('?embedded=true', '');
  newTabBtn.href = cleanUrl;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; 
}

// Function to close the modal
function closeRegisterModal() {
  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');
  
  modal.style.display = "none";
  iframe.src = ""; 
  document.body.style.overflow = "auto"; 
}

// Close modal when clicking outside the box
window.onclick = function(event) {
  const modal = document.getElementById('registrationModal');
  if (event.target == modal) {
    closeRegisterModal();
  }
}
/* --- MODAL LOGIC END --- */

/* --- COUNTDOWN TIMER LOGIC --- */
// Target Date: Feb 11, 2026
const targetDate = new Date("Feb 11, 2026 00:00:00").getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update DOM elements with 0-padding
  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

  // If the countdown is finished
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "<div style='color:white; font-size:1.5rem; font-weight:bold;'>Event Started!</div>";
  }
}, 1000);