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

  // ==============================
  // === GAME VARIABLES ===
  // ==============================
  let trustScore = 0;
  let betrayalScore = 0;

  // ==============================
  // === GAME DATA ===
  // ==============================
  const gameData = [
    {
      key: 'start',
      text: `
A sudden hiss of steam cuts the neon haze. The undercity’s shadows twist, smoke coiling like serpents around your boots.

Ruin stands there, leaning against the alley wall, smirk half-hidden in the glow. His eyes—a cocktail of mischief and regret—pin you in place.

“Long time, love,” he drawls, voice smooth as shattered glass. “Still chasing ghosts—or have you finally learned to make peace with them?”

His fingers tap the hilt of that infamous blade—tech-woven and gleaming. That same blade once traced a line down your neck in a different kind of heat.

A beat passes. You can almost taste the choice.

What do you do?
      `,
      choices: [
        { text: "Step into his space—call his bluff and flirt with the flames.", nextStep: 'flirtWithRuin', trustChange: 1, betrayalChange: 0 },
        { text: "Keep your distance—play it cold, but keep him talking.", nextStep: 'playItCold', trustChange: 0, betrayalChange: 1 },
        { text: "Draw your blade—no more games. It’s you or him.", nextStep: 'drawBlade', trustChange: 0, betrayalChange: 2 }
      ]
    },
    {
      key: 'flirtWithRuin',
      text: `
You step closer, close enough to catch the scent of ozone and the faint echo of old promises.

His smirk widens. “Dangerous game, love,” he murmurs, fingers grazing your jaw. “But I’ve always liked dangerous.”

His blade remains at his side—for now.

Do you trust him to stand with you, or is he the blade that cuts both ways?
      `,
      choices: [
        { text: "Trust him—maybe the past still matters.", nextStep: 'trustHim', trustChange: 2, betrayalChange: 0 },
        { text: "Kiss him—then steal the chip back.", nextStep: 'kissAndSteal', trustChange: -1, betrayalChange: 2 }
      ]
    },
    {
      key: 'playItCold',
      text: `
You cross your arms, leaning back. “You always liked to play both sides,” you say. “I’m not here to dance with ghosts.”

His smile fades, eyes narrowing. “You never did know when to let things die,” he growls.

A flicker of emotion crosses his face—regret? Fury? It’s gone in a heartbeat.

Do you push him for answers or draw the line here?
      `,
      choices: [
        { text: "Push him for the truth.", nextStep: 'pushForTruth', trustChange: 1, betrayalChange: 1 },
        { text: "Walk away—this dance is over.", nextStep: 'walkAway', trustChange: 0, betrayalChange: 0 }
      ]
    },
    {
      key: 'drawBlade',
      text: `
Steel sings in the neon night. His eyes widen—just a fraction—before that grin returns.

“Always so quick to violence,” he murmurs, blade sparking to life. “Let’s see who bleeds first.”

The alley erupts in a flurry of strikes and sparks. His blade hums with cruel energy.

Do you press the attack—or feint and slip away?
      `,
      choices: [
        { text: "Press the attack—end this.", nextStep: 'finalShowdown', trustChange: 0, betrayalChange: 3 },
        { text: "Feint and slip away—live to fight another day.", nextStep: 'escape', trustChange: 0, betrayalChange: 1 }
      ]
    },
    {
      key: 'trustHim',
      text: `
He tilts his head, studying you like a puzzle. “Maybe you’re not as broken as I thought,” he whispers, slipping his blade back into its sheath.

His hand finds yours—warm, dangerous, real.

“Let’s finish this together,” he says.

[WINNER! 🎉 CODE: NOVA123]
      `,
      choices: [],
      win: true
    },
    {
      key: 'kissAndSteal',
      text: `
You grab his collar, lips crashing against his. For a moment, time fractures—heat, memory, regret.

Then you twist away, the stolen chip in your palm.

His eyes blaze. “You never change,” he growls, blade leaping to life.

You run—fast, reckless—into the neon night.

[YOU ESCAPED… but at what cost? CODE: STORM456]
      `,
      choices: [],
      win: true
    },
    {
      key: 'pushForTruth',
      text: `
“Why, Ruin?” you ask. “Why betray me—betray us?”

For a heartbeat, his eyes soften. “Because you never belonged here,” he whispers. “And neither did I.”

He steps back. “Run, before it’s too late.” His blade hums—this time, not for you.

But the undercity’s predators aren’t so kind.

[GAME OVER 💀]
      `,
      choices: [],
      lose: true
    },
    {
      key: 'walkAway',
      text: `
You turn away, the neon haze swallowing his silhouette.

Behind you, a blade hums to life. “Coward,” he spits.

A single shot—silent, deadly—pierces the night.

[GAME OVER 💀]
      `,
      choices: [],
      lose: true
    },
    {
      key: 'finalShowdown',
      text: `
The world collapses into a blur of blades and sparks.

Steel meets steel. Sparks fly.

Then—silence. His blade at your throat, your dagger at his ribs.

A single breath.

A single choice.

You both step back, eyes locked. “Not tonight,” he whispers.

[WINNER! 🎉 CODE: BLADE789]
      `,
      choices: [],
      win: true
    },
    {
      key: 'escape',
      text: `
You slip into the shadows, neon lights swallowing you whole.

Behind you, his voice—a ghost. “Run while you can.”

You’re alive. For now.

[GAME OVER 💀]
      `,
      choices: [],
      lose: true
    }
  ];

  // ==============================
  // === EMAIL SUBMISSION ===
  // ==============================
  submitEmailButton.addEventListener('click', () => {
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!canPlay(email)) {
      alert("You've reached the maximum number of plays (3) in 24 hours. Please come back tomorrow!");
      return;
    }

    sessionStorage.setItem("currentEmail", email);

    emailCollector.style.display = 'none';
    startButton.style.display = 'inline-block';
  });

  // ==============================
  // === START GAME BUTTON ===
  // ==============================
  startButton.addEventListener('click', () => {
    const email = sessionStorage.getItem("currentEmail");

    if (!email) {
      alert("Please enter your email first.");
      emailCollector.style.display = 'block';
      startButton.style.display = 'none';
      return;
    }

    incrementPlayCount(email);

    startButton.style.display = 'none';
    gameInterface.style.display = 'block';

    showStep('start');
  });

  // ==============================
  // === SHOW A GAME STEP ===
  // ==============================
  function showStep(stepKey) {
    const step = gameData.find(s => s.key === stepKey);
  
    if (!step) {
      console.error(`Step not found: ${stepKey}`);
      return;
    }
  
    gameText.textContent = step.text.trim();
  
    const trustEl = document.getElementById('trust-score');
    const betrayalEl = document.getElementById('betrayal-score');
    trustEl.textContent = trustScore;
    betrayalEl.textContent = betrayalScore;
    trustEl.classList.add('score-change');
    betrayalEl.classList.add('score-change');
    setTimeout(() => {
      trustEl.classList.remove('score-change');
      betrayalEl.classList.remove('score-change');
    }, 500);
  
    // 🟣 Update the progress bars
    document.getElementById('trust-bar').style.width = `${Math.min(trustScore * 20, 100)}%`;
    document.getElementById('betrayal-bar').style.width = `${Math.min(betrayalScore * 20, 100)}%`;
  
    gameChoices.innerHTML = '';
  
    if (step.choices) {
      step.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice-button');
        button.addEventListener('click', () => {
          trustScore += choice.trustChange || 0;
          betrayalScore += choice.betrayalChange || 0;
          showStep(choice.nextStep);
        });
        gameChoices.appendChild(button);
      });
    }
  

    // Win or Lose handling 
    
    if (step.win) {
      triggerWinEffect();
      const code = getRewardCode(step.key);
      sendRewardEmail(code);
      showOverlay('win', 'You Win! 🎉', `Your prize code is being delivered to your email: ${code}`);
    }

    if (step.lose) {
      triggerLoseEffect();
      showOverlay('lose', 'Game Over 💀', 'Try again tomorrow!');
    }

    if (step.choices.length === 0) {
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Play Again';
      restartButton.classList.add('choice-button');
      restartButton.addEventListener('click', restartGame);
      gameChoices.appendChild(restartButton);
    }
  }

  

  // === GET REWARD CODE BASED ON ENDING ===
  function getRewardCode(stepKey) {
    switch (stepKey) {
      case 'trustHim':
        return 'NOVA123';
      case 'kissAndSteal':
        return 'STORM456';
      case 'finalShowdown':
        return 'BLADE789';
      default:
        return 'NOVA123';
    }
  }

  // === EMAIL VALIDATION ===
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // === PLAY LIMIT CHECK ===
  function canPlay(email) {
    const now = Date.now();
    let userData = JSON.parse(localStorage.getItem(email)) || { count: 0, lastPlay: 0 };


    if (now - userData.lastPlay > 24 * 60 * 60 * 1000) {
      userData.count = 0;
    }


    return userData.count < 3;
  }






  // === INCREMENT PLAY COUNT ===
  function incrementPlayCount(email) {
    const now = Date.now();
    let userData = JSON.parse(localStorage.getItem(email)) || { count: 0, lastPlay: 0 };

    if (now - userData.lastPlay > 24 * 60 * 60 * 1000) {
      userData.count = 0;
    }

    userData.count += 1;
    userData.lastPlay = now;

    localStorage.setItem(email, JSON.stringify(userData));
  }

  // === WIN EFFECT (Confetti) ===
  function triggerWinEffect() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // === LOSE EFFECT (Shake) ===
  function triggerLoseEffect() {
    gameText.classList.add('shake');
    setTimeout(() => {
      gameText.classList.remove('shake');
    }, 1000);
  }

  // === SHOW OVERLAY ===
  function showOverlay(type, title, subtitle) {
    overlay.className = `overlay ${type}`;
    overlayContent.innerHTML = `<div><h2>${title}</h2><p>${subtitle}</p></div>`;
    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 4000);
  }

  // === SEND REWARD EMAIL ===
  function sendRewardEmail(promoCode) {
    const email = sessionStorage.getItem("currentEmail");
    if (!email) {
      console.error("No email found. Cannot send email.");
      return;
    }

    emailjs.send("service_420kmfu", "RewardCodeTemplateNSA176", {
      email: email,
      promo_code: promoCode
    })
    .then(response => {
      console.log("Email sent successfully!", response);
    })
    .catch(error => {
      console.error("Failed to send email:", error);
    });
  }

  // === RESTART GAME ===
  function restartGame() {
    trustScore = 0;
    betrayalScore = 0;
    gameInterface.style.display = 'none';
    startButton.style.display = 'inline-block';
  }
});
