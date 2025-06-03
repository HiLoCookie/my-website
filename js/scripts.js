// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Elevator animations
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && sectionBottom > 100) {
      section.classList.add('show');
    } else {
      section.classList.remove('show');
    }
  });
});

// Category Blog Filter
const filterToggle = document.querySelector('.filter-toggle');
const filterOptions = document.querySelector('.filter-options');

if (filterToggle) {
  filterToggle.addEventListener('click', () => {
    if (filterOptions.style.display === 'flex') {
      filterOptions.style.display = 'none';
    } else {
      filterOptions.style.display = 'flex';
    }
  });
}
