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
