document.addEventListener('DOMContentLoaded', () => {
    // CHARACTER MODAL
    const characterCards = document.querySelectorAll('.character-card');
    const characterModal = document.getElementById('character-modal');
    const characterProfile = document.getElementById('character-profile');
    const modalCloseBtns = document.querySelectorAll('.modal .close');
  
    characterCards.forEach(card => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.character-bubble p:nth-child(1)').innerText.replace('Name: ', '');
        const age = card.querySelector('.character-bubble p:nth-child(2)').innerText.replace('Age: ', '');
        const race = card.querySelector('.character-bubble p:nth-child(3)').innerText.replace('Race: ', '');
        const quote = card.querySelector('.character-bubble p:nth-child(4)').innerText;
        const affiliation = card.querySelector('.character-bubble p:nth-child(5)').innerText.replace('Affiliation: ', '');
  
        characterProfile.innerHTML = `
          <h3>${name}</h3>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Race:</strong> ${race}</p>
          <p><em>${quote}</em></p>
          <p><strong>Affiliation:</strong> ${affiliation}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder for a longer character bio. You can replace this with real data later!</p>
        `;
  
        characterModal.style.display = 'flex';
      });
    });
  
    // LOCATION MODAL
    const mapMarkers = document.querySelectorAll('.map-marker');
    const locationModal = document.getElementById('location-modal');
    const locationName = document.getElementById('location-name');
    const locationInfo = document.getElementById('location-info');
  
    mapMarkers.forEach(marker => {
      marker.addEventListener('click', () => {
        const name = marker.getAttribute('data-name');
        const info = marker.getAttribute('data-info');
  
        locationName.textContent = name;
        locationInfo.textContent = info;
  
        locationModal.style.display = 'flex';
      });
    });
  
    // Close modals
    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
      });
    });
  
    // Close modals when clicking outside modal content
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    });
  });