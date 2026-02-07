function showTab(tabName) {

  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    pane.classList.remove('active');
  });

  const selectedPane = document.getElementById(tabName);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');

      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  if (selectedPane) {
      const activeCards = selectedPane.querySelectorAll('.event-card');
      activeCards.forEach((card, index) => {
        card.style.animation = 'none';
        card.offsetHeight; 
        card.style.animation = `slideUp 0.5s ease ${index * 0.1}s both`;
      });
  }
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

function openRegisterModal(url) {
  if (!url) {
    alert("Registration link for this event will be available soon!");
    return;
  }

  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');
  const newTabBtn = document.getElementById('newTabLink');

  iframe.src = url;

  const cleanUrl = url.replace('?embedded=true', '');
  newTabBtn.href = cleanUrl;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; 
}

function closeRegisterModal() {
  const modal = document.getElementById('registrationModal');
  const iframe = document.getElementById('registrationFrame');

  modal.style.display = "none";
  iframe.src = ""; 
  document.body.style.overflow = "auto"; 
}

window.onclick = function(event) {
  const modal = document.getElementById('registrationModal');
  if (event.target == modal) {
    closeRegisterModal();
  }
}

document.addEventListener('DOMContentLoaded', function() {

  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 900) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = hero.querySelector('.hero-content');
      if (parallax && scrolled < hero.offsetHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        parallax.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.3;
      }
    });
  }

  const ctaButton = document.querySelector('.cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector('#events-section');
      if (targetSection) {
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

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
});

const targetDate = new Date("Feb 11, 2026 00:00:00").getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const elDays = document.getElementById("days");
  if(elDays) {
      elDays.innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  }

  if (distance < 0) {
    clearInterval(timer);
    const cd = document.getElementById("countdown");
    if(cd) cd.innerHTML = "<div style='color:white; font-size:1.5rem; font-weight:bold;'>Event Started!</div>";
  }
}, 1000);