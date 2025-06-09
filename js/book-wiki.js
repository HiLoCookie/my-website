document.addEventListener('DOMContentLoaded', () => {
  const characterCards = document.querySelectorAll('.character-card');
  const characterModal = document.getElementById('character-modal');
  const characterProfile = document.getElementById('character-profile');
  const modalCloseBtns = document.querySelectorAll('.modal .close');

  let charactersData = [];

  // Load characters from JSON
  fetch('/data/projects/character-template.json')
    .then(response => response.json())
    .then(data => {
      charactersData = data;
    })
    .catch(error => {
      console.error("Failed to load character data:", error);
    });

  // Add click event to each character card
  characterCards.forEach(card => {
    card.addEventListener('click', () => {
      const characterId = card.getAttribute('data-id');
      const character = charactersData.find(c => c.id === characterId);

      if (character) {
        // Split relationships into a list
        const relationshipsList = character.relationships
          ? character.relationships.split(',').map(rel => rel.trim())
          : [];

        let relationshipsHTML = '';
        if (relationshipsList.length > 0) {
          relationshipsHTML = `
            <p><strong>Relationships:</strong></p>
            <ul>
              ${relationshipsList.map(rel => `<li>${rel}</li>`).join('')}
            </ul>
          `;
        }

        // Split abilities
        const abilitiesList = character.abilities
          ? character.abilities.split(',').map(ability => ability.trim())
          : [];

        let abilitiesHTML = '';
        if (abilitiesList.length > 0) {
          abilitiesHTML = `
            <p><strong>Abilities:</strong></p>
            <ul>
              ${abilitiesList.map(ability => `<li>${ability}</li>`).join('')}
            </ul>
          `;
        }

        let weaponHTML = '';
        if (character.weapon) {
          weaponHTML = `
            <p><strong>Weapon:</strong> ${character.weapon}</p>
          `;
        }

        characterProfile.innerHTML = `
          <h3>${character.name}</h3>
          <p><strong>Age:</strong> ${character.age}</p>
          <p><strong>Race:</strong> ${character.race}</p>
          <p><strong>Affiliation:</strong> ${character.affiliation}</p>
          ${weaponHTML}
          ${abilitiesHTML}
          <p><strong>Quote: </strong><em>"${character.quote}"</em></p>
          <p>${character.bio}</p>
          ${relationshipsHTML}
        `;
        characterModal.style.display = 'flex';
      } else {
        characterProfile.innerHTML = `<p>Character data not found.</p>`;
        characterModal.style.display = 'flex';
      }
    });
  });

  // Modal close buttons
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  // Click outside modal to close
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});



// Map
