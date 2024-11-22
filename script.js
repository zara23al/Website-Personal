const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
  // Toggle nav
  nav.classList.toggle('nav-active');

  // Burger animation
  burger.classList.toggle('toggle');
  
  // Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

// Tambahkan smooth scrolling pada semua tautan navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
  
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

// Keyframes animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`, styleSheet.cssRules.length);

// Animasi ketika bagian "Tentang Saya" muncul di layar
const aboutSection = document.querySelector('.about');
const galleryPhotos = document.querySelectorAll('.gallery .photo');

window.addEventListener('scroll', () => {
  const sectionPos = aboutSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos) {
    galleryPhotos.forEach(photo => {
      photo.style.opacity = '1';
      photo.style.transform = 'scale(1)';
    });
  }
});

// Function to add fade-in effect to all text elements
document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll(".text-section h1, .text-section p, .section-heading, .text-content");

  textElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("fade-in-text");
    }, index * 200); // Delay each element for a staggered effect
  });
});
