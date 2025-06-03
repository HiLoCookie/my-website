document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.blog-grid');
    const searchInput = document.querySelector('.blog-search');
    const searchButton = document.querySelector('.search-button');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    const filterToggle = document.querySelector('.filter-toggle');
    const filterOptions = document.querySelector('.filter-options');
  
    let posts = []; // Store posts globally after fetching
  
    // Fetch posts from JSON
    fetch('/data/posts.json')
      .then(response => response.json())
      .then(postsData => {
        posts = postsData;
        renderPosts(posts);
      })
      .catch(error => {
        console.error('Error loading posts:', error);
        postsContainer.innerHTML = '<p>Failed to load posts.</p>';
      });
  
    // Render Posts
    function renderPosts(postsArray) {
      postsContainer.innerHTML = ''; // Clear any existing posts
  
      if (postsArray.length === 0) {
        postsContainer.innerHTML = '<p class="no-posts-message">There is no post like this, sorry.</p>';
        return;
      }
  
      postsArray.forEach(post => {
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
  
        requestAnimationFrame(() => {
          postElement.style.opacity = '1';
          postElement.style.transform = 'translateY(0)';
        });
      });
    }
  
    // Apply Filters
    function applyFilters() {
      const query = searchInput.value.toLowerCase();
      const selectedCategories = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value.toLowerCase());
  
      const filteredPosts = posts.filter(post => {
        const matchesQuery = post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query);
        const matchesCategory = selectedCategories.length === 0 ||
          selectedCategories.some(cat => post.categories.includes(cat));
        return matchesQuery && matchesCategory;
      });
  
      renderPosts(filteredPosts);
    }
  
// Search without button - automaticaly searches while typing
  // Debounce function
//  function debounce(func, delay) {
//    let timeout;
//    return function (...args) {
//      clearTimeout(timeout);
//      timeout = setTimeout(() => {
//        func.apply(this, args);
//      }, delay);
//    };
//  }

  // Event listeners
//  if (searchInput) {
//    searchInput.addEventListener('input', debounce(applyFilters, 300)); // 300ms debounce
//  }
//  filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));


    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            applyFilters();
          }
        });
      }
    
      if (searchButton) {
        searchButton.addEventListener('click', applyFilters);
      }
    
      filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  
    // Toggle filter dropdown
    filterToggle.addEventListener('click', () => {
      filterOptions.classList.toggle('show');
    });
  });