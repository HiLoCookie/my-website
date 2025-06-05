document.addEventListener('DOMContentLoaded', () => {
    // ==============================
    // === DOM ELEMENT SELECTIONS ===
    // ==============================
    const submitEmailButton = document.getElementById('submit-email');
    const emailInput = document.getElementById('user-email');
    const emailCollector = document.getElementById('email-collector');
    const startButton = document.getElementById('start-button');
    const gameInterface = document.getElementById('game-interface');
    const gameText = document.getElementById('game-text');
    const gameChoices = document.getElementById('game-choices');
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');
  
    // ======================
    // === GAME DATA ===
    // ======================
    // This array contains each step of the game with text, choices, and outcomes.
    const gameData = [
      {
        text: "You stand at the crossroads. Which way?",
        choices: [
          { text: "Forest Path", nextStep: 1 },
          { text: "Mountain Trail", nextStep: 2 },
          { text: "River Crossing", nextStep: 3 }
        ]
      },
      {
        text: "The forest is dark. What do you do?",
        choices: [
          { text: "Investigate a sound", nextStep: 4 },
          { text: "Climb a tree", nextStep: 5 },
          { text: "Head back", nextStep: 0 }
        ]
      },
      {
        text: "You reach a cave. Do you enter?",
        choices: [
          { text: "Yes", nextStep: 4 },
          { text: "No", nextStep: 0 },
          { text: "Wait outside", nextStep: 5 }
        ]
      },
      {
        text: "You find a treasure chest! 🎉\n\nReward Code: NOVA123",
        choices: [],
        win: true // triggers win overlay
      },
      {
        text: "Game over! 💀",
        choices: [],
        lose: true // triggers lose overlay
      },
      {
        text: "You stumble but get back on track. Choose wisely!",
        choices: [
          { text: "Forest Path", nextStep: 1 },
          { text: "Mountain Trail", nextStep: 2 },
          { text: "River Crossing", nextStep: 3 }
        ]
      }
    ];
  
    // ==============================
    // === EMAIL SUBMISSION ===
    // ==============================
    submitEmailButton.addEventListener('click', () => {
      const email = emailInput.value.trim();
  
      // Validate email with regex
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      // Check if user can play (limit to 3 plays in 24 hours)
      if (!canPlay(email)) {
        alert("You've reached the maximum number of plays (3) in 24 hours. Please come back tomorrow!");
        return;
      }
  
      // Store email in sessionStorage for this session
      sessionStorage.setItem("currentEmail", email);
  
      // Hide email input, show start button
      emailCollector.style.display = 'none';
      startButton.style.display = 'inline-block';
    });
  
    // ==============================
    // === START GAME BUTTON ===
    // ==============================
    startButton.addEventListener('click', () => {
      const email = sessionStorage.getItem("currentEmail");
  
      // Safety check: if email somehow got lost
      if (!email) {
        alert("Please enter your email first.");
        emailCollector.style.display = 'block';
        startButton.style.display = 'none';
        return;
      }
  
      // Increment user's play count for today
      incrementPlayCount(email);
  
      // Hide start button, show game interface
      startButton.style.display = 'none';
      gameInterface.style.display = 'block';
  
      // Start game at step 0
      showStep(0);
    });
  
    // ==================================
    // === SHOW A GAME STEP ===
    // ==================================
    function showStep(stepIndex) {
      const step = gameData[stepIndex];
  
      // Display the step text
      gameText.textContent = step.text;
  
      // Clear any existing choices
      gameChoices.innerHTML = '';
  
      // Create choice buttons for each option
      step.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice-button');
        button.addEventListener('click', () => showStep(choice.nextStep));
        gameChoices.appendChild(button);
      });
  
      // Handle special outcomes (win or lose)
      if (step.win) {
        triggerWinEffect();
        sendRewardEmail(); // send promo code to email
        showOverlay('win', 'You Win! 🎉', 'Your prize will be delivered to your email shortly.');
      }
  
      if (step.lose) {
        triggerLoseEffect();
        showOverlay('lose', 'Game Over 💀', 'Try again tomorrow!');
      }
  
      // If no choices left, offer restart
      if (step.choices.length === 0) {
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Play Again';
        restartButton.classList.add('choice-button');
        restartButton.addEventListener('click', () => restartGame());
        gameChoices.appendChild(restartButton);
      }
    }
  
    // ==================================
    // === RESTART GAME ===
    // ==================================
    function restartGame() {
      gameInterface.style.display = 'none';
      startButton.style.display = 'inline-block';
    }
  
    // ==================================
    // === EMAIL VALIDATION ===
    // ==================================
    function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  
    // ==================================
    // === PLAY LIMIT CHECK ===
    // ==================================
    function canPlay(email) {
        const now = Date.now();
        let userData = JSON.parse(localStorage.getItem(email)) || { count: 0, lastPlay: 0 };
    
        // Reset count if 24 hours have passed
        if (now - userData.lastPlay > 24 * 60 * 60 * 1000) {
          userData.count = 0;
        }
    
        return userData.count < 5;
      }
  
     // ==================================
    // === INCREMENT PLAY COUNT ===
    // ==================================
    function incrementPlayCount(email) {
        const now = Date.now();
        let userData = JSON.parse(localStorage.getItem(email)) || { count: 0, lastPlay: 0 };
    
        // Reset count if 24 hours have passed
        if (now - userData.lastPlay > 24 * 60 * 60 * 1000) {
          userData.count = 0;
        }
    
        userData.count += 1;
        userData.lastPlay = now;
    
        localStorage.setItem(email, JSON.stringify(userData));
      }
    
   
    // ==================================
    // === WIN EFFECT (Confetti) ===
    // ==================================
    function triggerWinEffect() {
      // Requires canvas-confetti library
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  
    // ==================================
    // === LOSE EFFECT (Shake) ===
    // ==================================
    function triggerLoseEffect() {
      gameText.classList.add('shake');
      setTimeout(() => {
        gameText.classList.remove('shake');
      }, 1000);
    }
  
    // ==================================
    // === SHOW OVERLAY ===
    // ==================================
    function showOverlay(type, title, subtitle) {
      overlay.className = `overlay ${type}`;
      overlayContent.innerHTML = `<div><h2>${title}</h2><p>${subtitle}</p></div>`;
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 3000);
    }
  
    // ==================================
    // === SEND REWARD EMAIL ===
    // ==================================
    function sendRewardEmail() {
      const email = sessionStorage.getItem("currentEmail");
      const promoCode = "NOVA123";
    
      if (!email) {
        console.error("No email found. Cannot send email.");
        return;
      }
    
      console.log("Sending email to:", email);
    
      emailjs.send("service_420kmfu", "RewardCodeTemplateNSA176", {
        to_email: email,
        promo_code: promoCode
      })
      .then(response => {
        console.log("Email sent successfully!", response);
      })
      .catch(error => {
        console.error("Failed to send email:", error);
      });
    }
    
})