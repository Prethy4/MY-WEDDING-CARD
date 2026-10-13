/**
 * LUXURY WEDDING INVITATION - INTERACTION ENGINE
 * Colors: Almond Gold, Emerald Red Velvet, Soft Blush Pink
 */

(function () {
  'use strict';

  // DOM Elements
  const weddingCard = document.getElementById('wedding-card');
  const cardContainer = document.getElementById('card-container');
  const cardStage = document.getElementById('card-stage');
  const bellyBand = document.getElementById('belly-band');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const waxSealWrapper = document.getElementById('wax-seal-wrapper');
  const sparkleEmitter = document.getElementById('sparkle-emitter');
  const btnReplay = document.getElementById('btn-replay');
  const btnEdit = document.getElementById('btn-edit');
  const btnRsvp = document.getElementById('btn-rsvp');
  
  // Modals
  const rsvpModal = document.getElementById('rsvp-modal');
  const rsvpClose = document.getElementById('rsvp-close');
  const btnSubmitRsvp = document.getElementById('btn-submit-rsvp');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccessMsg = document.getElementById('rsvp-success-msg');

  const editModal = document.getElementById('edit-modal');
  const editClose = document.getElementById('edit-close');
  const btnSaveEdit = document.getElementById('btn-save-edit');

  // Display Typography Elements
  const displayBride = document.getElementById('display-bride');
  const displayGroom = document.getElementById('display-groom');
  const displayDate = document.getElementById('display-date');
  const displayTime = document.getElementById('display-time');
  const displayVenue = document.getElementById('display-venue');
  const displayAddress = document.getElementById('display-address');
  const displayBlessing = document.getElementById('display-blessing');

  // Input Elements
  const inputBride = document.getElementById('input-bride');
  const inputGroom = document.getElementById('input-groom');
  const inputDate = document.getElementById('input-date');
  const inputTime = document.getElementById('input-time');
  const inputVenue = document.getElementById('input-venue');
  const inputAddress = document.getElementById('input-address');
  const inputBlessing = document.getElementById('input-blessing');

  // State
  let isOpen = false;

  /* ==========================================================================
     1. CARD OPENING & SEAL BREAKING MECHANISM (SILENT & ELEGANT)
     ========================================================================== */

  function openCard() {
    if (isOpen) return;
    isOpen = true;

    // Trigger golden sparkles burst around wax seal
    createSealSparkles();

    // Small delay for sparkle effect, then open doors
    setTimeout(() => {
      weddingCard.classList.add('is-open');
      btnReplay.classList.remove('hidden');

      // Burst an abundant shower of rose petals into the air
      burstFloralPetals();
    }, 250);
  }

  function closeCard() {
    if (!isOpen) return;
    isOpen = false;

    weddingCard.classList.remove('is-open');
    btnReplay.classList.add('hidden');
  }

  // Create golden sparkle burst on wax seal crack
  function createSealSparkles() {
    sparkleEmitter.innerHTML = '';
    const numSparkles = 32;
    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('seal-sparkle');

      const angle = (Math.PI * 2 * i) / numSparkles + (Math.random() - 0.5) * 0.5;
      const distance = 45 + Math.random() * 70;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      sparkle.style.setProperty('--tx', `${tx}px`);
      sparkle.style.setProperty('--ty', `${ty}px`);
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.animationDelay = `${Math.random() * 0.1}s`;

      sparkleEmitter.appendChild(sparkle);
    }

    setTimeout(() => {
      sparkleEmitter.innerHTML = '';
    }, 1000);
  }

  waxSealWrapper.addEventListener('click', openCard);
  btnReplay.addEventListener('click', closeCard);

  /* ==========================================================================
     2. REALISTIC 3D MOUSE PARALLAX TILT & WIND BREEZE
     ========================================================================== */
  let currentTiltX = 0;
  let currentTiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let mouseWindX = 0;
  let mouseWindY = 0;
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  function updateTilt() {
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;
    mouseWindX *= 0.94; // Decay wind draft
    mouseWindY *= 0.94;

    if (cardContainer) {
      cardContainer.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
    }
    requestAnimationFrame(updateTilt);
  }
  requestAnimationFrame(updateTilt);

  window.addEventListener('mousemove', (e) => {
    const rect = cardContainer.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

    // Limit tilt degree; softer tilt when open
    const maxTilt = isOpen ? 3.5 : 7;
    targetTiltX = -deltaY * maxTilt;
    targetTiltY = deltaX * maxTilt;

    // Calculate mouse speed for gentle petal wind draft
    const speedX = e.clientX - lastMouseX;
    const speedY = e.clientY - lastMouseY;
    mouseWindX = Math.max(-2.5, Math.min(2.5, speedX * 0.04));
    mouseWindY = Math.max(-1.5, Math.min(1.5, speedY * 0.03));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    targetTiltX = 0;
    targetTiltY = 0;
    mouseWindX = 0;
    mouseWindY = 0;
  });

  /* ==========================================================================
     3. ABUNDANT BOTANICAL ROSE PETAL & GOLD DUST PARTICLE ENGINE
     Rich Rose Palette: Velvet Ruby, Crimson, Peony Blush, Peach, Raspberry, Burgundy
     ========================================================================== */
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const maxPetals = 85; // Rich, abundant petal density

  class BotanicalRosePetal {
    constructor(x, y, isBurst = false) {
      this.reset(x, y, isBurst);
    }

    reset(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * (width + 160) - 80;
      this.y = y !== undefined ? y : -40 - Math.random() * 120;

      // 3 Depth layers: 0.55 = background, 0.95 = midground, 1.35 = close foreground
      const depthRand = Math.random();
      if (depthRand < 0.28) {
        this.depth = 0.6; // distant small petal
        this.alpha = 0.65 + Math.random() * 0.2;
      } else if (depthRand < 0.82) {
        this.depth = 1.0; // crisp midground petal
        this.alpha = 0.88 + Math.random() * 0.12;
      } else {
        this.depth = 1.4; // large foreground floating petal
        this.alpha = 0.96;
      }

      // Rich Rose Palette Types
      const paletteRand = Math.random();
      if (paletteRand < 0.32) {
        this.type = 'blush'; // Soft Peony Blush Pink
        this.baseWidth = (14 + Math.random() * 11) * this.depth;
        this.baseHeight = (18 + Math.random() * 14) * this.depth;
        this.isGoldDust = false;
      } else if (paletteRand < 0.54) {
        this.type = 'ruby'; // Deep Emerald-Ruby Velvet Rose
        this.baseWidth = (14 + Math.random() * 11) * this.depth;
        this.baseHeight = (18 + Math.random() * 13) * this.depth;
        this.isGoldDust = false;
      } else if (paletteRand < 0.68) {
        this.type = 'crimson'; // Royal Velvet Crimson
        this.baseWidth = (13 + Math.random() * 10) * this.depth;
        this.baseHeight = (17 + Math.random() * 13) * this.depth;
        this.isGoldDust = false;
      } else if (paletteRand < 0.80) {
        this.type = 'peach'; // Romantic Peach Champagne Rose
        this.baseWidth = (14 + Math.random() * 10) * this.depth;
        this.baseHeight = (18 + Math.random() * 13) * this.depth;
        this.isGoldDust = false;
      } else if (paletteRand < 0.90) {
        this.type = 'burgundy'; // Deep Wine Velvet Rose
        this.baseWidth = (13 + Math.random() * 10) * this.depth;
        this.baseHeight = (17 + Math.random() * 12) * this.depth;
        this.isGoldDust = false;
      } else {
        this.type = 'gold'; // Shimmering Almond Gold Leaf Mote
        this.size = (2.2 + Math.random() * 3.6) * this.depth;
        this.isGoldDust = true;
      }

      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (3.5 + Math.random() * 8.5);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 2.8;
      } else {
        this.vx = (Math.random() - 0.5) * 0.85;
        this.vy = (0.7 + Math.random() * 1.3) * this.depth;
      }

      // 3D Angles: Roll (flip), Pitch (tilt), Yaw (rotation)
      this.yaw = Math.random() * Math.PI * 2;
      this.yawSpeed = (Math.random() - 0.5) * 0.024;

      this.roll = Math.random() * Math.PI * 2;
      this.rollSpeed = 0.016 + Math.random() * 0.028;

      this.pitch = Math.random() * Math.PI * 2;
      this.pitchSpeed = 0.012 + Math.random() * 0.022;

      // Aerodynamic pendulum sway
      this.swayProgress = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.018 + Math.random() * 0.024;
      this.swayAmp = 1.0 + Math.random() * 1.8;

      // Natural organic petal asymmetry
      this.asymmetry = 0.86 + Math.random() * 0.28;
    }

    update() {
      this.roll += this.rollSpeed;
      this.pitch += this.pitchSpeed;
      this.yaw += this.yawSpeed;
      this.swayProgress += this.swaySpeed;

      // Realistic aerodynamics: pendulum wind sway + gentle mouse breeze
      const windSway = Math.sin(this.swayProgress) * this.swayAmp;
      this.x += this.vx + windSway + mouseWindX * this.depth;
      this.y += this.vy + Math.cos(this.swayProgress * 0.7) * 0.3 + mouseWindY * this.depth;

      // Reset when falling out of bounds
      if (this.y > height + 60 || this.x < -90 || this.x > width + 90) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      if (this.isGoldDust) {
        // Radiant Almond Gold Dust Mote
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        const goldGrad = ctx.createRadialGradient(0, 0, 0.4, 0, 0, this.size);
        goldGrad.addColorStop(0, 'rgba(255, 252, 235, 0.98)');
        goldGrad.addColorStop(0.5, 'rgba(235, 195, 80, 0.85)');
        goldGrad.addColorStop(1, 'rgba(170, 125, 25, 0)');
        ctx.fillStyle = goldGrad;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.75)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        return;
      }

      // Banking angle aligns with aerodynamic sway
      const bankAngle = this.yaw + Math.sin(this.swayProgress) * 0.28;
      ctx.rotate(bankAngle);

      // 3D Perspective Foreshortening (Roll & Pitch)
      const cosRoll = Math.cos(this.roll);
      const sinPitch = Math.sin(this.pitch);
      const scaleX = cosRoll;
      const scaleY = sinPitch * 0.85 + 0.15 * Math.sin(this.roll);

      ctx.scale(scaleX, scaleY);

      const w = this.baseWidth;
      const h = this.baseHeight;

      // Soft volumetric drop shadow (No cartoon lines)
      ctx.shadowColor = 'rgba(25, 4, 8, 0.18)';
      ctx.shadowBlur = 7 * this.depth;
      ctx.shadowOffsetY = 4 * this.depth;

      // Organic Botanical Rose Petal Geometry
      ctx.beginPath();
      ctx.moveTo(0, h * 0.44);
      // Left organic flank
      ctx.bezierCurveTo(-w * 0.55 * this.asymmetry, h * 0.28, -w * 0.52 * this.asymmetry, -h * 0.22, -w * 0.18, -h * 0.46);
      // Top ruffled cleft / heart tip
      ctx.bezierCurveTo(-w * 0.08, -h * 0.52, w * 0.08, -h * 0.48, w * 0.2, -h * 0.44);
      // Right organic flank
      ctx.bezierCurveTo(w * 0.54, -h * 0.2, w * 0.50, h * 0.32, 0, h * 0.44);
      ctx.closePath();

      // Multi-Stop Subsurface Scattering Radial Shading per Rose Palette Color
      const grad = ctx.createRadialGradient(-w * 0.12, -h * 0.15, w * 0.05, 0, 0, h * 0.65);

      if (this.type === 'blush') {
        // Soft Peony Blush Pink
        if (cosRoll >= 0) {
          grad.addColorStop(0, 'rgba(255, 246, 249, 0.98)');
          grad.addColorStop(0.32, 'rgba(252, 202, 216, 0.94)');
          grad.addColorStop(0.72, 'rgba(238, 150, 175, 0.90)');
          grad.addColorStop(1, 'rgba(198, 95, 125, 0.95)');
        } else {
          grad.addColorStop(0, 'rgba(255, 238, 242, 0.95)');
          grad.addColorStop(0.40, 'rgba(245, 188, 204, 0.90)');
          grad.addColorStop(0.80, 'rgba(225, 140, 164, 0.88)');
          grad.addColorStop(1, 'rgba(185, 88, 115, 0.92)');
        }
      } else if (this.type === 'ruby') {
        // Deep Emerald-Ruby Velvet Rose
        if (cosRoll >= 0) {
          grad.addColorStop(0, 'rgba(220, 42, 62, 0.98)');
          grad.addColorStop(0.35, 'rgba(170, 20, 40, 0.95)');
          grad.addColorStop(0.72, 'rgba(110, 10, 24, 0.94)');
          grad.addColorStop(1, 'rgba(58, 4, 12, 0.96)');
        } else {
          grad.addColorStop(0, 'rgba(190, 28, 46, 0.95)');
          grad.addColorStop(0.45, 'rgba(140, 14, 28, 0.92)');
          grad.addColorStop(0.80, 'rgba(90, 8, 18, 0.90)');
          grad.addColorStop(1, 'rgba(48, 3, 9, 0.94)');
        }
      } else if (this.type === 'crimson') {
        // Royal Velvet Crimson
        if (cosRoll >= 0) {
          grad.addColorStop(0, 'rgba(235, 55, 75, 0.98)');
          grad.addColorStop(0.35, 'rgba(185, 25, 45, 0.95)');
          grad.addColorStop(0.72, 'rgba(125, 12, 28, 0.94)');
          grad.addColorStop(1, 'rgba(72, 6, 16, 0.96)');
        } else {
          grad.addColorStop(0, 'rgba(205, 38, 56, 0.95)');
          grad.addColorStop(0.45, 'rgba(155, 18, 35, 0.92)');
          grad.addColorStop(0.80, 'rgba(102, 10, 22, 0.90)');
          grad.addColorStop(1, 'rgba(56, 4, 12, 0.94)');
        }
      } else if (this.type === 'peach') {
        // Romantic Peach Champagne Rose
        if (cosRoll >= 0) {
          grad.addColorStop(0, 'rgba(255, 248, 240, 0.98)');
          grad.addColorStop(0.32, 'rgba(255, 218, 204, 0.94)');
          grad.addColorStop(0.72, 'rgba(244, 162, 148, 0.90)');
          grad.addColorStop(1, 'rgba(215, 115, 105, 0.95)');
        } else {
          grad.addColorStop(0, 'rgba(255, 240, 232, 0.95)');
          grad.addColorStop(0.40, 'rgba(248, 205, 192, 0.90)');
          grad.addColorStop(0.80, 'rgba(230, 150, 138, 0.88)');
          grad.addColorStop(1, 'rgba(198, 105, 96, 0.92)');
        }
      } else {
        // Burgundy Wine Velvet Rose
        if (cosRoll >= 0) {
          grad.addColorStop(0, 'rgba(175, 22, 42, 0.98)');
          grad.addColorStop(0.35, 'rgba(125, 12, 26, 0.95)');
          grad.addColorStop(0.72, 'rgba(78, 6, 16, 0.94)');
          grad.addColorStop(1, 'rgba(38, 2, 8, 0.96)');
        } else {
          grad.addColorStop(0, 'rgba(145, 16, 32, 0.95)');
          grad.addColorStop(0.45, 'rgba(100, 8, 20, 0.92)');
          grad.addColorStop(0.80, 'rgba(60, 4, 12, 0.90)');
          grad.addColorStop(1, 'rgba(30, 2, 6, 0.94)');
        }
      }

      ctx.fillStyle = grad;
      ctx.globalAlpha = this.alpha;
      ctx.fill();

      // Translucent Curled Rim Highlight (Subsurface scattering on thin edge)
      ctx.beginPath();
      ctx.moveTo(-w * 0.32, -h * 0.38);
      ctx.bezierCurveTo(-w * 0.1, -h * 0.52, w * 0.1, -h * 0.48, w * 0.32, -h * 0.36);
      
      const rimHighlight = (this.type === 'blush' || this.type === 'peach') 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(255, 140, 160, 0.45)';
      
      ctx.strokeStyle = rimHighlight;
      ctx.lineWidth = Math.max(0.7, w * 0.045);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate initial abundant petals
  for (let i = 0; i < maxPetals; i++) {
    petals.push(new BotanicalRosePetal());
  }

  // Floral burst from center when card opens or on RSVP
  function burstFloralPetals() {
    const rect = cardContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 60; i++) {
      const burstPetal = new BotanicalRosePetal(centerX, centerY, true);
      petals.push(burstPetal);
    }

    // Maintain max pool size
    while (petals.length > maxPetals + 60) {
      petals.shift();
    }
  }

  // Main 60fps Animation Loop
  function animatePetals() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw(ctx);
    }

    requestAnimationFrame(animatePetals);
  }
  requestAnimationFrame(animatePetals);

  /* ==========================================================================
     4. RSVP & PERSONALIZATION MODALS
     ========================================================================== */

  // Open RSVP Modal
  btnRsvp.addEventListener('click', () => {
    rsvpModal.classList.remove('hidden');
    rsvpSuccessMsg.classList.add('hidden');
    rsvpForm.style.display = 'block';
  });

  rsvpClose.addEventListener('click', () => {
    rsvpModal.classList.add('hidden');
  });

  btnSubmitRsvp.addEventListener('click', () => {
    const guestName = document.getElementById('guest-name').value.trim();
    if (!guestName) {
      alert('Please enter your name to confirm your blessing.');
      return;
    }

    rsvpForm.style.display = 'none';
    rsvpSuccessMsg.classList.remove('hidden');

    // Shower celebratory petals!
    burstFloralPetals();

    setTimeout(() => {
      rsvpModal.classList.add('hidden');
      rsvpForm.reset();
      rsvpForm.style.display = 'block';
      rsvpSuccessMsg.classList.add('hidden');
    }, 3200);
  });

  // Open Edit Modal
  btnEdit.addEventListener('click', () => {
    editModal.classList.remove('hidden');
  });

  editClose.addEventListener('click', () => {
    editModal.classList.add('hidden');
  });

  btnSaveEdit.addEventListener('click', () => {
    const bride = inputBride.value.trim() || 'PRE THY';
    const groom = inputGroom.value.trim() || 'DONNO';
    const date = inputDate.value.trim() || 'INFINITY';
    const time = inputTime.value.trim() || "AT FIVE O'CLOCK IN THE EVENING";
    const venue = inputVenue.value.trim() || 'The Grand Glasshouse Pavilion';
    const address = inputAddress.value.trim() || 'Rosewood Estate • 1400 Beverly Foothills, CA';
    const blessing = inputBlessing.value.trim() || 'With the blessings of our families & the grace of Almighty';

    displayBride.textContent = bride;
    displayGroom.textContent = groom;
    displayDate.textContent = date;
    displayTime.textContent = time;
    displayVenue.textContent = venue;
    displayAddress.textContent = address;
    displayBlessing.textContent = blessing;

    // Update belly band ribbon initials/monogram
    const brideFirst = bride.split(' ')[0].toUpperCase();
    const groomFirst = groom.split(' ')[0].toUpperCase();
    const sideLeft = document.querySelector('.side-left');
    const sideRight = document.querySelector('.side-right');
    if (sideLeft) {
      sideLeft.innerHTML = `✦ ${brideFirst} &bull; ${groomFirst} ✦`;
    }
    if (sideRight) {
      sideRight.textContent = `✦ ${date} ✦`;
    }

    document.title = `Wedding Invitation | ${bride} & ${groom}`;

    editModal.classList.add('hidden');
  });

  // Close modals on overlay backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === rsvpModal) rsvpModal.classList.add('hidden');
    if (e.target === editModal) editModal.classList.add('hidden');
  });

})();
