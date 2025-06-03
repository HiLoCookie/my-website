document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.blog-grid');
    const searchInput = document.querySelector('.blog-search');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    const filterToggle = document.querySelector('.filter-toggle');
    const filterOptions = document.querySelector('.filter-options');
  
    // Fetch posts from JSON
    fetch('/data/posts.json')
      .then(response => response.json())
      .then(postsData => {
        renderPosts(postsData);
  
        // Search & Filter Logic
        searchInput.addEventListener('input', () => applyFilters(postsData));
        filterCheckboxes.forEach(cb => cb.addEventListener('change', () => applyFilters(postsData)));
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        postsContainer.innerHTML = '<p>Failed to load posts.</p>';
      });
  
    // Render Posts
    function renderPosts(posts) {
      postsContainer.innerHTML = ''; // Clear any existing posts
      posts.forEach(post => {
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
  
    // Apply Filters
    function applyFilters(posts) {
      const query = searchInput.value.toLowerCase();
      const selectedCategories = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());
  
      const filteredPosts = posts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
        const matchesCategory = selectedCategories.length === 0 ||
          selectedCategories.some(cat => post.categories.includes(cat));
        return matchesQuery && matchesCategory;
      });
  
      renderPosts(filteredPosts);
    }
  
    // Toggle filter dropdown
    filterToggle.addEventListener('click', () => {
      filterOptions.classList.toggle('show');
    });
  });
  