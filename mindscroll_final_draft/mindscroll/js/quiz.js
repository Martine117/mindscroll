/**
 * MindScroll -- quiz.js
 * Full-screen quiz gate using ES6 class
 * 5 questions -> manipulation score % + personality type
 */

const QUESTIONS = [
  {
    text: "How soon after waking up do you check your phone?",
    options: [
      { text: "After an hour or more", score: 0 },
      { text: "Within 30 minutes", score: 1 },
      { text: "Within 5 minutes", score: 2 },
      { text: "It's the first thing I do", score: 3 },
    ],
  },
  {
    text: "You posted something. How long before you check for likes?",
    options: [
      { text: "I don't really care about likes", score: 0 },
      { text: "After a few hours", score: 1 },
      { text: "Within 30 minutes", score: 2 },
      { text: "I refresh immediately and keep checking", score: 3 },
    ],
  },
  {
    text: "Have you ever felt anxious when you couldn't access social media?",
    options: [
      { text: "Never -- I enjoy the break", score: 0 },
      { text: "Slightly uncomfortable", score: 1 },
      { text: "Yes, I felt like I was missing something", score: 2 },
      { text: "Yes -- genuine anxiety or irritability", score: 3 },
    ],
  },
  {
    text: "You open an app 'just for a second'. What usually happens?",
    options: [
      { text: "I check what I needed and close it", score: 0 },
      { text: "I spend a few extra minutes", score: 1 },
      { text: "I'm there for 20+ minutes without realizing", score: 2 },
      { text: "I lose track of time completely", score: 3 },
    ],
  },
  {
    text: "How does seeing others' posts make you feel about your own life?",
    options: [
      { text: "No effect -- I know it's curated", score: 0 },
      { text: "Occasionally a little envious", score: 1 },
      { text: "Often like my life is less exciting", score: 2 },
      { text: "Frequently inadequate or left out", score: 3 },
    ],
  },
];

const PERSONALITIES = [
  {
    min: 0, max: 20,
    type: "The Free Mind",
    emoji: "🧘",
    desc: "You have a remarkably healthy relationship with social media. You use it on your terms, and the algorithms haven't found their grip on you yet. Either you're very self-aware -- or you barely use social media at all. Either way: rare.",
    mechanisms: ["Minimal Variable Reward exposure", "Low Social Comparison sensitivity", "Strong decision autonomy"],
  },
  {
    min: 21, max: 45,
    type: "The Casual Scroller",
    emoji: "😌",
    desc: "You're aware enough to resist most traps, but the platforms have found a few hooks. You check in more than you'd like to admit, and a compelling feed can pull you in longer than planned. You're not addicted -- but you're not free either.",
    mechanisms: ["Mild Infinite Scroll exposure", "Occasional FOMO triggers", "Some Social Validation Loop activity"],
  },
  {
    min: 46, max: 70,
    type: "The Hooked User",
    emoji: "🎣",
    desc: "The algorithm knows you well. You've developed real behavioral patterns that platforms designed and engineered -- the reflexive checking, the post anxiety, the comparison spirals. The good news: awareness is the first step out.",
    mechanisms: ["Active Dopamine Loop dependency", "Intermittent Reinforcement pattern", "Social Comparison Theory in effect", "Loss Aversion at play"],
  },
  {
    min: 71, max: 85,
    type: "The Doom Scroller",
    emoji: "📱",
    desc: "Social media has significantly shaped your daily emotional rhythms. The anxiety when offline, the compulsive checking, the comparison -- these aren't personality traits. They were engineered by teams of behavioral scientists. The first step is knowing that.",
    mechanisms: ["High Variable Reward dependency", "Red Badge anxiety response", "FOMO actively triggered", "Social Comparison deeply embedded", "Autoplay & Infinite Scroll trap"],
  },
  {
    min: 86, max: 100,
    type: "The Algorithm's Guest",
    emoji: "🤖",
    desc: "You are living inside a system designed to own your attention. Every reflex, every anxiety, every comparison you feel online was designed by engineers optimizing for engagement. The platform is not your friend. But knowing this changes everything.",
    mechanisms: ["Full Variable Reward conditioning", "Complete Dopamine Loop active", "Identity deeply platform-tied", "FOMO at maximum", "Loss Aversion fully exploited", "Algorithmic feed controls reality"],
  },
];

class Quiz {
  constructor() {
    this.currentQ    = 0;
    this.scores      = [];
    this.totalScore  = 0;

    this.screenIntro  = document.getElementById("screenIntro");
    this.screenQuiz   = document.getElementById("screenQuiz");
    this.screenCalc   = document.getElementById("screenCalc");
    this.screenResult = document.getElementById("screenResult");

    this.progressFill = document.getElementById("progressFill");
    this.progressLabel = document.getElementById("progressLabel");
    this.qNumber      = document.getElementById("qNumber");
    this.qText        = document.getElementById("qText");
    this.qOptions     = document.getElementById("qOptions");

    this.resultType   = document.getElementById("resultType");
    this.resultEmoji  = document.getElementById("resultEmoji");
    this.resultDesc   = document.getElementById("resultDesc");
    this.resultMechs  = document.getElementById("resultMechanisms");
    this.scoreNumber  = document.getElementById("scoreNumber");
    this.ringFill     = document.getElementById("ringFill");
    this.resultGlow   = document.getElementById("resultGlow");

    this.init();
  }

  init() {
    document.getElementById("btnStart").addEventListener("click", () => this.startQuiz());
    document.getElementById("btnSkip").addEventListener("click", () => this.skipToSite());
    document.getElementById("btnRetry").addEventListener("click", () => this.reset());
  }

  show(screen) {
    [this.screenIntro, this.screenQuiz, this.screenCalc, this.screenResult].forEach((s) => {
      s.classList.remove("active");
    });
    screen.classList.add("active");
  }

  startQuiz() {
    this.currentQ   = 0;
    this.scores     = [];
    this.show(this.screenQuiz);
    this.renderQuestion();
  }

  skipToSite() {
    sessionStorage.setItem("quizDone", "1"); window.location.href = "index.html";
  }

  renderQuestion() {
    const q = QUESTIONS[this.currentQ];
    const letters = ["A", "B", "C", "D"];

    // Progress
    const pct = ((this.currentQ) / QUESTIONS.length) * 100;
    this.progressFill.style.width = pct + "%";
    this.progressLabel.textContent = (this.currentQ + 1) + " / " + QUESTIONS.length;

    // Number
    this.qNumber.textContent = String(this.currentQ + 1).padStart(2, "0");

    // Text -- animate in
    this.qText.style.opacity = "0";
    this.qText.style.transform = "translateY(10px)";
    setTimeout(() => {
      this.qText.textContent = q.text;
      this.qText.style.transition = "opacity 0.4s, transform 0.4s";
      this.qText.style.opacity = "1";
      this.qText.style.transform = "translateY(0)";
    }, 50);

    // Options
    this.qOptions.innerHTML = "";
    this.qOptions.style.opacity = "0";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "q-option";
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.text}</span>`;
      btn.addEventListener("click", () => this.selectOption(opt.score, btn));
      this.qOptions.appendChild(btn);
    });

    setTimeout(() => {
      this.qOptions.style.transition = "opacity 0.4s";
      this.qOptions.style.opacity = "1";
    }, 150);
  }

  selectOption(score, btn) {
    // Highlight selected
    document.querySelectorAll(".q-option").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    this.scores.push(score);

    // Advance after short delay
    setTimeout(() => {
      this.currentQ++;
      if (this.currentQ < QUESTIONS.length) {
        this.renderQuestion();
      } else {
        this.calculate();
      }
    }, 400);
  }

  calculate() {
    this.show(this.screenCalc);

    // Calculate score as percentage of max possible (15)
    const raw = this.scores.reduce((a, b) => a + b, 0);
    const max = QUESTIONS.length * 3;
    this.totalScore = Math.round((raw / max) * 100);

    // Show result after 2.5 seconds of "calculating"
    setTimeout(() => this.showResult(), 2500);
  }

  showResult() {
    this.show(this.screenResult);

    const personality = PERSONALITIES.find(
      (p) => this.totalScore >= p.min && this.totalScore <= p.max
    ) || PERSONALITIES[PERSONALITIES.length - 1];

    // Mark quiz as done so index.html doesn't redirect back
    const enterBtn = document.getElementById("btnEnter");
    if (enterBtn) enterBtn.addEventListener("click", () => sessionStorage.setItem("quizDone", "1"));

    // Set text
    this.resultType.textContent = personality.type;
    this.resultEmoji.textContent = personality.emoji;
    this.resultDesc.textContent  = personality.desc;

    // Mechanism tags
    this.resultMechs.innerHTML = "";
    personality.mechanisms.forEach((m) => {
      const tag = document.createElement("span");
      tag.className = "mech-tag";
      tag.textContent = m;
      this.resultMechs.appendChild(tag);
    });

    // Animate score ring
    const circumference = 2 * Math.PI * 64; // 402
    const offset = circumference - (this.totalScore / 100) * circumference;

    setTimeout(() => {
      this.ringFill.style.strokeDashoffset = offset;
      this.resultGlow.classList.add("visible");

      // Count up number
      let count = 0;
      const target = this.totalScore;
      const step = Math.ceil(target / 60);
      const counter = setInterval(() => {
        count = Math.min(count + step, target);
        this.scoreNumber.textContent = count;
        if (count >= target) clearInterval(counter);
      }, 25);

    }, 200);
  }

  reset() {
    this.currentQ  = 0;
    this.scores    = [];
    this.totalScore = 0;
    this.ringFill.style.strokeDashoffset = 402;
    this.resultGlow.classList.remove("visible");
    this.scoreNumber.textContent = "0";
    this.show(this.screenIntro);
  }
}

document.addEventListener("DOMContentLoaded", () => { new Quiz(); });
