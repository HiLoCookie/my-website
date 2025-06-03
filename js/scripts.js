document.addEventListener('DOMContentLoaded', () => {
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

  // Filter dropdown toggle
  const filterToggle = document.querySelector('.filter-toggle');
  const filterOptions = document.querySelector('.filter-options');
  if (filterToggle && filterOptions) {
    filterToggle.addEventListener('click', () => {
      filterOptions.classList.toggle('show');
    });
  }

  // Blog posts JSON data
  const postsData = [
    {
      title: "Post Title One",
      excerpt: "A thrilling look into how morally gray characters shape a story’s heart—and why I love writing them.",
      date: "June 5, 2025",
      image: "/assets/images/post1.jpg",
      categories: ["fantasy", "romance"]
    },
    {
      title: "Post Title Two",
      excerpt: "Behind-the-scenes insights on my latest book release, from world-building to sizzling romance arcs.",
      date: "June 1, 2025",
      image: "/assets/images/post2.jpg",
      categories: ["romance", "writing-tips"]
    },
    {
      title: "Post Title Three",
      excerpt: "Exploring how cats as familiars add charm, mystery, and a dash of chaos to my stories.",
      date: "May 20, 2025",
      image: "/assets/images/post3.jpg",
      categories: ["author-life", "cats"]
    }
  ];

  // Generate blog posts dynamically
  const postsContainer = document.querySelector('.blog-grid');
  if (postsContainer) {
    postsData.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('blog-post');
      postElement.setAttribute('data-category', post.categories.join(' '));

      postElement.innerHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <div class="post-content">
          <h3>${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <p class="post-date">Published on ${post.date}</p>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  }

  // Search and category filtering
  const searchInput = document.querySelector('.blog-search');
  const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');

  function filterPosts() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategories = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.nextSibling.textContent.trim().toLowerCase());

    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      const postCategories = post.getAttribute('data-category').toLowerCase().split(' ');

      const matchesQuery = title.includes(query) || excerpt.includes(query);
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.some(cat => postCategories.includes(cat));

      if (matchesQuery && matchesCategory) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPosts);
  }
  filterCheckboxes.forEach(cb => cb.addEventListener('change', filterPosts));
});
