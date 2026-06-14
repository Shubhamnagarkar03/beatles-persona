/* ============================================
   BEATLES QUIZ — script.js
   Logic: Weighted scoring (Option 2) +
          Percentage breakdown (Option 3)
   ============================================ */

// ---- BEATLE KEYS ----
const BEATLES = ["john", "paul", "george", "ringo"];

const BEATLE_META = {
  john: {
    name: "John Lennon",
    color: "#C0392B",
    desc: "You are the cut-throat pragmatist with a sharp tongue and sharper instincts. You don't sugarcoat, you don't waste time, and you have zero patience for nonsense. Under all that edge is a person who cares deeply — you just prefer results over sentiment. You get things done when no one else will."
  },
  paul: {
    name: "Paul McCartney",
    color: "#2980B9",
    desc: "You are the emotional anchor of every room you enter. Composed under pressure, warm by default, and deeply attuned to how the people around you feel. You're the one who finds the right words, holds things together, and somehow makes everyone feel like they matter — because to you, they genuinely do."
  },
  george: {
    name: "George Harrison",
    color: "#27AE60",
    desc: "You are the quiet one — not because you have nothing to say, but because you wait until it actually matters. Spiritually grounded, unhurried, and deeply inner-directed, you operate on a wavelength most people don't pick up on until later. You're the one whose ideas everyone borrows, years after the fact."
  },
  ringo: {
    name: "Ringo Starr",
    color: "#F39C12",
    desc: "You are the steady joy in the room. You don't overcomplicate things, you don't spiral, and you have a rare gift for being happy with what's in front of you. People gravitate toward you not because you're the loudest — but because you make things feel lighter just by showing up. That's harder than it looks."
  }
};

// ---- PER-QUESTION THEMES ----
// accent: progress bar, hover, q-number
// overlay: CSS rgba for the bg tint — pulled from the mood of the image
// image: filename in images/ folder
const Q_THEMES = [
  { // Q1 — Rubber Soul hedge portrait. Dark forest greens, warm brown leather.
    image: "images/q1.jpg",
    accent:  "#8B6914",           // warm dark gold — pulled from the suede jacket
    overlay: "rgba(18,28,16,0.64)",  // deep forest green tint
    accentBg:"rgba(139,105,20,0.09)"
  },
  { // Q2 — Revolver album art. Black ink on white, graphic & stark.
    image: "images/q2.jpg",
    accent:  "#C8882A",           // warm amber — the only warmth against the ink
    overlay: "rgba(34,28,22,0.68)",  // warm near-black, not cold
    accentBg:"rgba(200,136,42,0.09)"
  },
  { // Q3 — A Hard Day's Night cover. Cobalt blue grid, bold & cool.
    image: "images/q3.jpg",
    accent:  "#D4820A",           // warm burnt amber — contrast against the blue
    overlay: "rgba(12,24,52,0.64)",  // rich cobalt blue tint
    accentBg:"rgba(212,130,10,0.09)"
  },
  { // Q4 — Abbey Road. London summer, warm asphalt, green tree canopy.
    image: "images/q4.jpg",
    accent:  "#6B8C3A",           // warm leaf green from the tree canopy
    overlay: "rgba(236,232,220,0.74)",  // soft warm daylight cream
    accentBg:"rgba(107,140,58,0.08)"
  },
  { // Q5 — Rubber Soul/hedge, darker read. Olive, brown, deep earthy tones.
    image: "images/q5.jpg",
    accent:  "#A0692A",           // warm cognac brown — leather & earth
    overlay: "rgba(28,20,10,0.66)",  // deep warm brown
    accentBg:"rgba(160,105,42,0.09)"
  },
  { // Q6 — Maharishi India photo. Saffron marigolds, warm cream, terracotta flowers.
    image: "images/q6.jpg",
    accent:  "#D4781A",           // saffron orange — straight from the marigolds
    overlay: "rgba(42,28,8,0.58)",   // warm golden-brown, lets orange flowers breathe
    accentBg:"rgba(212,120,26,0.09)"
  },
  { // Q7 — Rooftop concert. Cold London sky, slate grey-blue, raw concert energy.
    image: "images/q7.jpg",
    accent:  "#C8882A",           // warm amber — warmth against the cold rooftop grey
    overlay: "rgba(20,26,32,0.66)",  // cold slate-blue tint
    accentBg:"rgba(200,136,42,0.09)"
  },
  { // Q8 — Beatles For Sale. Autumnal — amber leaves, rust, warm gold.
    image: "images/q8.jpg",
    accent:  "#C4661A",           // deep rust-amber — the autumn leaves
    overlay: "rgba(38,22,8,0.62)",   // warm dark amber tint
    accentBg:"rgba(196,102,26,0.09)"
  },
  { // Q9 — Sgt Pepper. Saturated magenta pink + chartreuse + warm gold.
    image: "images/q9.jpg",
    accent:  "#C4920A",           // warm gold — the epaulettes and trim
    overlay: "rgba(44,12,8,0.60)",   // deep warm red-magenta tint
    accentBg:"rgba(196,146,10,0.09)"
  },
  { // Q10 — Magical Mystery Tour. Burnt orange, jewel tones, warm psychedelic.
    image: "images/q10.jpg",
    accent:  "#D4621A",           // burnt sienna orange — the shirts and warm sky
    overlay: "rgba(36,16,4,0.62)",   // deep warm brown-orange tint
    accentBg:"rgba(212,98,26,0.09)"
  }
];

// ---- QUESTIONS ----
// weight: 3 = high diagnostic, 2 = medium, 1 = lifestyle/soft
// scores: { john, paul, george, ringo } — each answer maps scores to Beatles

const QUESTIONS = [
  {
    weight: 3,
    text: "What does success mean to you?",
    options: [
      { label: "Achieving exactly what I set out to do, on my own terms — nothing less.",         scores: { john: 3, paul: 0, george: 0, ringo: 0 } },
      { label: "Being someone the people in my life genuinely love and respect.",                  scores: { john: 0, paul: 3, george: 0, ringo: 0 } },
      { label: "Feeling at peace with who I am and what I'm contributing to the world.",           scores: { john: 0, paul: 0, george: 3, ringo: 0 } },
      { label: "Laughing a lot, staying healthy, and not stressing too much.",                     scores: { john: 0, paul: 0, george: 0, ringo: 3 } }
    ]
  },
  {
    weight: 3,
    text: "When you're going through a genuinely hard time, you...",
    options: [
      { label: "Channel it into productivity. Pain doesn't stop the work — it fuels it.",          scores: { john: 3, paul: 0, george: 0, ringo: 0 } },
      { label: "Lean on the people closest to me. Being vulnerable isn't weakness.",               scores: { john: 0, paul: 3, george: 0, ringo: 0 } },
      { label: "Retreat inward. Meditate, journal, detach from the noise until clarity comes.",    scores: { john: 0, paul: 0, george: 3, ringo: 0 } },
      { label: "Distract yourself and find something — anything — to laugh about.",                scores: { john: 0, paul: 0, george: 0, ringo: 3 } }
    ]
  },
  {
    weight: 3,
    text: "Someone wrongs you badly. What do you actually do?",
    options: [
      { label: "Cut them off and move forward. No energy wasted on people who've shown you who they are.", scores: { john: 3, paul: 0, george: 0, ringo: 0 } },
      { label: "Have an honest, direct conversation. I'd rather resolve it than let it fester.",           scores: { john: 0, paul: 3, george: 0, ringo: 0 } },
      { label: "Forgive them internally and quietly create distance. No drama necessary.",                 scores: { john: 0, paul: 0, george: 3, ringo: 0 } },
      { label: "Get mildly annoyed, maybe vent to one friend, then forget about it by dinner.",            scores: { john: 0, paul: 0, george: 0, ringo: 3 } }
    ]
  },
  {
    weight: 2,
    text: "You lose your job unexpectedly. What's your first move?",
    options: [
      { label: "Update the resume and start making calls that same evening. No time to mope.",     scores: { john: 2, paul: 0, george: 0, ringo: 0 } },
      { label: "Talk it through with someone I trust before deciding anything.",                   scores: { john: 0, paul: 2, george: 0, ringo: 0 } },
      { label: "See it as the universe redirecting me. Something better is coming.",               scores: { john: 0, paul: 0, george: 2, ringo: 0 } },
      { label: "Order food, watch something comforting. Tomorrow is a new day.",                   scores: { john: 0, paul: 0, george: 0, ringo: 2 } }
    ]
  },
  {
    weight: 2,
    text: "A close friend asks for your honest take on their business idea. It's not good.",
    options: [
      { label: "Tell them exactly what's wrong, point by point. That's what real friends do.",     scores: { john: 2, paul: 0, george: 0, ringo: 0 } },
      { label: "Find a kind way to raise concerns without crushing their excitement.",              scores: { john: 0, paul: 2, george: 0, ringo: 0 } },
      { label: "Ask them the right questions so they discover the gaps themselves.",               scores: { john: 0, paul: 0, george: 2, ringo: 0 } },
      { label: "Tell them it sounds fun and offer to help figure it out along the way.",           scores: { john: 0, paul: 0, george: 0, ringo: 2 } }
    ]
  },
  {
    weight: 2,
    text: "How do you typically make a big life decision?",
    options: [
      { label: "Pros and cons list, data, gut check — then act. Decisiveness is a skill.",        scores: { john: 2, paul: 0, george: 0, ringo: 0 } },
      { label: "I talk to everyone I trust and weigh what they say seriously.",                    scores: { john: 0, paul: 2, george: 0, ringo: 0 } },
      { label: "I sit with it quietly until the right answer surfaces. Rushing it helps no one.",  scores: { john: 0, paul: 0, george: 2, ringo: 0 } },
      { label: "Flip a mental coin. Either way, I'll make it work.",                               scores: { john: 0, paul: 0, george: 0, ringo: 2 } }
    ]
  },
  {
    weight: 2,
    text: "In a team or group project, you tend to be...",
    options: [
      { label: "The one who cuts through indecision and calls the direction.",                     scores: { john: 2, paul: 0, george: 0, ringo: 0 } },
      { label: "The one keeping morale up, checking in on people, reading the room.",              scores: { john: 0, paul: 2, george: 0, ringo: 0 } },
      { label: "The quiet contributor who submits the best idea with zero fanfare.",               scores: { john: 0, paul: 0, george: 2, ringo: 0 } },
      { label: "The one who lightens the mood when things get too serious.",                       scores: { john: 0, paul: 0, george: 0, ringo: 2 } }
    ]
  },
  {
    weight: 1,
    text: "You have a lump sum of money to put away. What do you do?",
    options: [
      { label: "Research, diversify, optimize returns. I've already read three articles on it.",   scores: { john: 1, paul: 0, george: 0, ringo: 0 } },
      { label: "Ask people I trust, then go with something stable and safe.",                      scores: { john: 0, paul: 1, george: 0, ringo: 0 } },
      { label: "Put it toward an experience, a course, or a cause that actually means something.", scores: { john: 0, paul: 0, george: 1, ringo: 0 } },
      { label: "Leave it in savings for now. Future me will figure it out.",                       scores: { john: 0, paul: 0, george: 0, ringo: 1 } }
    ]
  },
  {
    weight: 1,
    text: "Your ideal Sunday looks like...",
    options: [
      { label: "Clearing something I've been meaning to tackle. Productive rest is still rest.",   scores: { john: 1, paul: 0, george: 0, ringo: 0 } },
      { label: "A long brunch or evening with the people I love.",                                 scores: { john: 0, paul: 1, george: 0, ringo: 0 } },
      { label: "Alone — reading, meditating, walking, or just sitting somewhere quiet.",           scores: { john: 0, paul: 0, george: 1, ringo: 0 } },
      { label: "No plan at all. Go wherever the day takes me.",                                    scores: { john: 0, paul: 0, george: 0, ringo: 1 } }
    ]
  },
  {
    weight: 1,
    text: "What is your relationship with routine?",
    options: [
      { label: "I build systems and I stick to them. Routine is discipline made invisible.",       scores: { john: 1, paul: 0, george: 0, ringo: 0 } },
      { label: "I like structure but leave enough room for the people in my life.",                scores: { john: 0, paul: 1, george: 0, ringo: 0 } },
      { label: "I follow natural rhythms — not clocks. The body knows when to rest.",              scores: { john: 0, paul: 0, george: 1, ringo: 0 } },
      { label: "What's a routine?",                                                                scores: { john: 0, paul: 0, george: 0, ringo: 1 } }
    ]
  }
];

// ---- STATE ----
let currentQ = 0;
let totalScores = { john: 0, paul: 0, george: 0, ringo: 0 };
let answered = new Array(QUESTIONS.length).fill(null); // track selected option per Q

// ---- SCREENS ----
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

function startQuiz() {
  currentQ = 0;
  totalScores = { john: 0, paul: 0, george: 0, ringo: 0 };
  answered = new Array(QUESTIONS.length).fill(null);
  showScreen("screen-quiz");
  renderQuestion();
}

function restartQuiz() {
  startQuiz();
}

// ---- BACKGROUND CROSSFADE ----
let bgActive = "a"; // track which layer is on top

function applyTheme(idx) {
  const t = Q_THEMES[idx];
  const root = document.getElementById("screen-quiz");
  const overlay = document.getElementById("quiz-bg-overlay");

  const layerOn  = document.getElementById("quiz-bg-" + bgActive);
  const nextSlot = bgActive === "a" ? "b" : "a";
  const layerOff = document.getElementById("quiz-bg-" + nextSlot);

  // Load new image into the hidden layer
  layerOff.style.backgroundImage = `url('${t.image}')`;
  layerOff.style.opacity = "1";
  layerOn.style.opacity  = "0";
  bgActive = nextSlot;

  // Update tint overlay
  overlay.style.setProperty("--q-overlay", t.overlay);
  overlay.style.background = t.overlay;

  // Update accent CSS variables on root
  root.style.setProperty("--q-accent",    t.accent);
  root.style.setProperty("--q-accent-bg", t.accentBg);
}

// ---- RENDER QUESTION ----
function renderQuestion() {
  const q = QUESTIONS[currentQ];

  applyTheme(currentQ);

  // Progress
  const pct = ((currentQ) / QUESTIONS.length) * 100;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-label").textContent = `${currentQ + 1} / ${QUESTIONS.length}`;

  // Q number + text
  document.getElementById("q-number").textContent = `Q${currentQ + 1}`;
  document.getElementById("q-text").textContent = q.text;

  // Options
  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";

  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    if (answered[currentQ] === i) btn.classList.add("selected");

    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span>${opt.label}</span>
    `;

    btn.addEventListener("click", () => selectOption(i));
    grid.appendChild(btn);
  });

  // Re-trigger animation
  const card = document.getElementById("question-card");
  card.style.animation = "none";
  card.offsetHeight; // reflow
  card.style.animation = "";
}

// ---- SELECT OPTION ----
function selectOption(optionIndex) {
  const q = QUESTIONS[currentQ];

  // If re-answering, undo previous scores
  if (answered[currentQ] !== null) {
    const prev = q.options[answered[currentQ]];
    BEATLES.forEach(b => {
      totalScores[b] -= (prev.scores[b] || 0) * q.weight;
    });
  }

  // Apply new scores (weighted)
  const chosen = q.options[optionIndex];
  BEATLES.forEach(b => {
    totalScores[b] += (chosen.scores[b] || 0) * q.weight;
  });

  answered[currentQ] = optionIndex;

  // Flash selection then auto-advance
  renderQuestion(); // re-render to show selected state

  setTimeout(() => {
    if (currentQ < QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 420);
}

// ---- RESULT LOGIC ----
function showResult() {
  // Total weighted max per Beatle = sum of (weight × 3) for each Q = same for all
  const maxPerBeatle = QUESTIONS.reduce((acc, q) => acc + q.weight * 3, 0);

  // Percentage for each
  const percentages = {};
  BEATLES.forEach(b => {
    percentages[b] = Math.round((totalScores[b] / maxPerBeatle) * 100);
  });

  // Winner = highest %
  const winner = BEATLES.reduce((a, b) => percentages[a] >= percentages[b] ? a : b);

  // Second = second highest
  const sorted = [...BEATLES].sort((a, b) => percentages[b] - percentages[a]);
  const secondary = sorted[1];

  // Render result
  const meta = BEATLE_META[winner];
  document.getElementById("result-name").textContent = meta.name;
  document.getElementById("result-name").style.color = meta.color;
  document.getElementById("result-desc").textContent = meta.desc;

  // Portrait image
  const portraitImg = document.getElementById("beatle-portrait-img");
  const portraitFrame = document.getElementById("beatle-portrait-frame");
  const portraitLabel = document.getElementById("portrait-label");

  portraitImg.classList.remove("loaded");
  portraitImg.src = `images/${winner}.jpg`;
  portraitImg.alt = meta.name;
  portraitFrame.style.borderBottomColor = meta.color;
  portraitLabel.textContent = meta.name;

  portraitImg.onload = () => portraitImg.classList.add("loaded");
  portraitImg.onerror = () => {
    portraitImg.style.display = "none";
    portraitFrame.style.background = `${meta.color}22`;
  };

  const secMeta = BEATLE_META[secondary];
  document.getElementById("secondary-badge").innerHTML =
    `Also strongly: <span>${secMeta.name}</span> (${percentages[secondary]}%)`;

  // Breakdown bars
  const barsEl = document.getElementById("breakdown-bars");
  barsEl.innerHTML = "";

  sorted.forEach(b => {
    const pct = percentages[b];
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label-row">
        <span class="bar-name">${BEATLE_META[b].name}</span>
        <span class="bar-pct">${pct}%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${b}" data-pct="${pct}" style="width: 0%"></div>
      </div>
    `;
    barsEl.appendChild(row);
  });

  showScreen("screen-result");

  // Animate bars after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.pct + "%";
      });
    }, 150);
  });
}