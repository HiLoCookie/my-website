document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll with offset for CTA button
  const ctaButton = document.querySelector('.cta-button');
  const booksSection = document.querySelector('#books');
  const headerOffset = 80; // Adjust this if your header height is different

  if (ctaButton && booksSection) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default jump
      const sectionTop = booksSection.offsetTop - headerOffset;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    });
  }
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
