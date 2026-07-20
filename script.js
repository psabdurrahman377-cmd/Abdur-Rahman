document.addEventListener('DOMContentLoaded', () => {
  // --- THEME INITIALIZATION & SWITCHER ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleIcon = themeToggleBtn.querySelector('svg');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let nextTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      // Sun Icon
      themeToggleIcon.innerHTML = `<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>`;
    } else {
      // Moon Icon
      themeToggleIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
    }
  }

  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animate burger bars
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  });

  // Close mobile nav when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- HEADER SCROLL ACTION ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- TYPED EFFECT ---
  const typedTextSpan = document.querySelector('.typed-text');
  const textArray = ["B.Tech IT Student", "Software Developer", "Web Developer", "Problem Solver"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Start typing effect on load
  if (textArray.length) setTimeout(type, newTextDelay);

  // --- SCROLL REVEAL OBSERVER ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill bars animation if entry is skills section
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(element => {
    revealObserver.observe(element);
  });

  // --- ANIMATE SKILL BARS ---
  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-inner');
    bars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
  }

  // --- PROJECT MODALS EXPAND ---
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  
  const projectDetails = {
    attendance: {
      title: "RFID & Fingerprint Attendance System using ESP32",
      tags: ["ESP32", "Arduino IDE", "RFID", "Fingerprint Sensor", "C++"],
      img: "assets/project_dashboard.png",
      desc: "An innovative, hardware-integrated attendance system using the ESP32 microcontroller, biometric sensors, and RFID scanning designed to streamline student roll calls.",
      bullets: [
        "Constructed custom circuitry connecting an ESP32 devkit, optical fingerprint sensor (AS608), RFID reader (RC522), character LCD (16x2), and alarm buzzer.",
        "Programmed sensor polling algorithms with real-time feedback loops to verify card UID and fingerprint template ID matching.",
        "Created custom administrative software modules to enroll new fingerprint nodes and tie them to active registry keys.",
        "Significantly reduced class-taking time overhead by over 80% and minimized proxy attendance errors."
      ]
    },
    tracking: {
      title: "Real-Time Intelligent Bus Tracking & ETA Prediction",
      tags: ["HTML5", "CSS3", "JavaScript", "Node.js", "MySQL", "API Integration"],
      img: "assets/project_dashboard.png",
      desc: "A smart vehicle monitoring web platform that tracks institutional buses in real-time, predicting Estimated Time of Arrival (ETA) at various destination nodes.",
      bullets: [
        "Designed and implemented high-fidelity, mobile-responsive UI interfaces utilizing HTML, CSS, and clean Javascript structures.",
        "Integrated interactive web mapping APIs to visualize live coordinates, waypoints, and institutional transport routes.",
        "Constructed robust backend API modules using Node.js and Express to fetch live geographic telemetry.",
        "Implemented standard database schemas using MySQL to maintain scheduling logs, route indexes, and transport history reports."
      ]
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const details = projectDetails[projectId];
      
      if (details) {
        // Fill modal fields
        document.getElementById('modal-title').textContent = details.title;
        document.getElementById('modal-desc').textContent = details.desc;
        document.getElementById('modal-img').src = details.img;
        
        // Render tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        details.tags.forEach(tag => {
          const badge = document.createElement('span');
          badge.className = 'project-tag';
          badge.textContent = tag;
          tagsContainer.appendChild(badge);
        });

        // Render bullet points
        const bulletsContainer = document.getElementById('modal-bullets');
        bulletsContainer.innerHTML = '';
        details.bullets.forEach(bullet => {
          const item = document.createElement('li');
          item.className = 'modal-bullet-item';
          item.textContent = bullet;
          bulletsContainer.appendChild(item);
        });

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close modal functions
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple verification
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all fields before sending.", "error");
      return;
    }

    // Simulate sending API request
    showStatus("Establishing connection...", "system");
    
    setTimeout(() => {
      showStatus("Message sent successfully! Thank you, Abdur Rahman will get back to you shortly.", "success");
      contactForm.reset();
    }, 1500);
  });

  function showStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = 'form-status'; // Reset classes
    
    if (type === 'success') {
      formStatus.classList.add('success');
    } else if (type === 'error') {
      formStatus.classList.add('error');
    } else {
      formStatus.style.color = 'var(--accent-primary)';
      formStatus.style.display = 'block';
    }

    setTimeout(() => {
      if (type === 'success') {
        formStatus.style.display = 'none';
      }
    }, 6000);
  }



  // Active navigation highlight on scroll
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => navObserver.observe(section));
});
