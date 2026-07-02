// MindScroll explorer.js v4 -- Manipulation Toolkit
console.log("MindScroll explorer.js v4 loaded");

const MECHANISMS = [
  {
    id: 1,
    resist: "Set a feed timer. Give yourself a fixed window (10 min max). When it ends, close the app. The unpredictability only works if you keep pulling.", icon: "🎰",
    name: "Variable Reward",
    category: "cognitive",
    teaser: "Why you can't stop refreshing your feed",
    description: "Unpredictable rewards are far more addictive than predictable ones. B.F. Skinner proved this with pigeons in the 1950s. Your Instagram feed operates on the exact same principle as a slot machine.",
    platforms: "Instagram, TikTok, Twitter/X",
  },
  {
    id: 2,
    resist: "Use pagination. Switch to apps that show a finite feed, or use browser extensions like News Feed Eradicator. A bottom to the page means a moment to decide.", icon: "infinity",
    name: "Infinite Scroll",
    category: "design",
    teaser: "The page that never ends -- by design",
    description: "Invented by Aza Raskin in 2006. He later said it's like behavioral cocaine sprinkled over the interface. No bottom means no natural stopping point -- you scroll because stopping takes effort.",
    platforms: "Every major platform",
  },
  {
    id: 3,
    resist: "Curate ruthlessly. Unfollow accounts that make you feel less-than. Your feed is an algorithm you train -- start teaching it differently.", icon: "🪞",
    name: "Social Comparison",
    category: "social",
    teaser: "Why everyone else looks more successful",
    description: "Leon Festinger's 1954 theory: humans evaluate themselves by comparing to others. Social media creates a 24/7 highlight reel -- a benchmark no one can realistically match, by design.",
    platforms: "Instagram, LinkedIn, Facebook",
  },
  {
    id: 4,
    resist: "Break the streak yourself. Deliberately miss a day. Once you survive the anxiety, its power over you drops significantly.", icon: "🔥",
    name: "Loss Aversion",
    category: "cognitive",
    teaser: "The streak you're afraid to break",
    description: "We fear losing something 2x more than we value gaining the same thing. A Snapchat streak is not a reward -- it is a hostage. Teens have skipped funerals to maintain streaks. That is not a bug.",
    platforms: "Snapchat, Duolingo, BeReal",
  },
  {
    id: 5,
    resist: "Turn off all non-essential notifications. Batch-check social media at set times only. You control when the reward comes.", icon: "💉",
    name: "Dopamine Loop",
    category: "cognitive",
    teaser: "The tiny hit you get with every like",
    description: "Every like triggers a small dopamine release. Platforms learned to delay and batch notifications to make the hit feel larger. The anticipation between posting and checking is engineered, not accidental.",
    platforms: "Instagram, Facebook, LinkedIn",
  },
  {
    id: 6,
    resist: "Set your phone to grayscale mode. iOS and Android both support this. Without the red urgency color, the badge loses most of its pull.", icon: "🔴",
    name: "Red Notification Badge",
    category: "design",
    teaser: "Why that little dot drives you crazy",
    description: "Red is the color of urgency and danger. Platforms chose it deliberately. Former Google Design Ethicist Tristan Harris called it a race to the bottom of the brain stem. The badge says: something needs you. Now.",
    platforms: "Every app on your phone",
  },
  {
    id: 7,
    resist: "Always choose the next video manually. Turn off autoplay in every platform settings. One deliberate click puts you back in control.", icon: "▶️",
    name: "Autoplay",
    category: "design",
    teaser: "Stopping requires effort. Playing requires none.",
    description: "YouTube's autoplay (2015) exploits decision fatigue and inertia. The default state is always more content. Stopping requires an active choice; continuing requires nothing. Inertia becomes addiction.",
    platforms: "YouTube, Netflix, TikTok",
  },
  {
    id: 8,
    resist: "Do a 48-hour offline experiment. You will quickly realize the events you feared missing were never that important.", icon: "😰",
    name: "FOMO",
    category: "social",
    teaser: "The anxiety of missing what you never had",
    description: "Fear of Missing Out was first described clinically in 2013. Social media is a FOMO machine running 24/7. Stories disappear, moments feel exclusive, and the platform profits from your anxiety about being left out.",
    platforms: "Instagram, Snapchat, Stories",
  },
  {
    id: 9,
    resist: "Remind yourself it is a performance. Creators are playing a role. Knowing this breaks the false intimacy.", icon: "🤝",
    name: "Parasocial Bonds",
    category: "social",
    teaser: "You feel close to someone who doesn't know you exist",
    description: "One-sided emotional bonds with creators and influencers. Platforms engineer this because parasocial attachment drives consistent, loyal viewing. You feel you know someone intimately -- they have never heard your name.",
    platforms: "YouTube, TikTok, Twitch",
  },
  {
    id: 10,
    resist: "Switch to chronological feed. Instagram and Twitter both offer this option. An unfiltered timeline is harder for the algorithm to weaponize.", icon: "🤖",
    name: "Algorithmic Feed",
    category: "design",
    teaser: "The machine decides what reality you see",
    description: "Feeds no longer show content chronologically. Algorithms show what generates the most reaction. Outrage drives more engagement than joy. A Facebook study found 64% of people who joined extremist groups were led there by the recommendation algorithm.",
    platforms: "Facebook, Instagram, Twitter/X",
  },
  {
    id: 11,
    resist: "Give yourself permission not to respond. You owe no one immediate digital attention. Silence is not rudeness.", icon: "↩️",
    name: "Reciprocity Norm",
    category: "social",
    teaser: "Follow back. Comment back. Engage back.",
    description: "We feel obligated to return favors. On social media, if someone follows you, you feel pressure to follow back. If someone comments, you feel you must reply. Engagement is partly social coercion disguised as connection.",
    platforms: "Instagram, Twitter/X, LinkedIn",
  },
  {
    id: 12,
    resist: "Intentionally follow one account you disagree with. Exposure to different views keeps your thinking from calcifying inside a bubble.", icon: "🫧",
    name: "Echo Chambers",
    category: "cognitive",
    teaser: "Your feed only agrees with you",
    description: "Algorithms show you content you already agree with, reinforcing existing beliefs and filtering out dissent. Confirmation bias is not a side effect -- it is the feature. Comfort keeps you on the platform longer.",
    platforms: "Facebook, YouTube, Twitter/X",
  },
  {
    id: 13,
    resist: "Hide all counts. Browser extensions like Hide YouTube Stats remove view counts. Judge content by quality, not numbers.", icon: "🏆",
    name: "Gamification",
    category: "design",
    teaser: "Your social life, turned into a video game",
    description: "Points, streaks, badges, leaderboards -- all game mechanics applied to real social life. LinkedIn's profile strength bar, Snapchat streaks, Twitter's blue check. The goal is to make leaving feel like losing a game.",
    platforms: "LinkedIn, Snapchat, Twitter/X",
  },
  {
    id: 14,
    resist: "When you feel the urge to pull-to-refresh, wait 60 seconds first. The impulse almost always passes on its own.", icon: "🎲",
    name: "Intermittent Reinforcement",
    category: "cognitive",
    teaser: "Pull to refresh. The digital slot machine.",
    description: "The most powerful conditioning schedule is unpredictable rewards. Pull-to-refresh mimics a slot machine lever. You pull down not because you expect new content -- but because sometimes there is some. That uncertainty is the trap.",
    platforms: "Twitter/X, Instagram, Email",
  },
  {
    id: 15,
    resist: "Ask yourself: would I value this with zero likes? If the answer is no, that is the algorithm talking, not you.", icon: "👁️",
    name: "Social Proof",
    category: "social",
    teaser: "10,000 likes can't be wrong. Or can they?",
    description: "Humans look to others' behavior to determine correct behavior. View counts, like counts, and follower numbers are social proof mechanisms. They signal: many people chose this. So you feel you should too. Regardless of quality.",
    platforms: "All platforms",
  },
  {
    id: 16,
    resist: "Ignore all metrics for one week. Read and watch content without looking at counts. Your instincts will recalibrate.", icon: "⚓",
    name: "Anchoring Effect",
    category: "cognitive",
    teaser: "The first number you see shapes everything after",
    description: "The first number you see anchors your perception of what follows. A post with 10,000 likes feels more credible than one with 10 -- regardless of content quality. Platforms display numbers prominently to exploit this bias.",
    platforms: "YouTube, Twitter/X, TikTok",
  },
  {
    id: 17,
    resist: "Use mark-all-read aggressively. An empty notification badge removes the Zeigarnik tension entirely.", icon: "🔔",
    name: "Zeigarnik Effect",
    category: "cognitive",
    teaser: "Unfinished things live rent-free in your mind",
    description: "Uncompleted tasks occupy more mental space than completed ones. The unread notification, the unfinished story, the unanswered message -- platforms use incompleteness to keep you returning to resolve the tension.",
    platforms: "All apps",
  },
  {
    id: 18,
    resist: "Create a secondary account with no real name. Notice how differently you behave when your identity is not on the line.", icon: "🪪",
    name: "Identity Leverage",
    category: "social",
    teaser: "When your real self is on the line",
    description: "When your real identity is tied to your profile, the emotional stakes of every post rise dramatically. Social rejection online feels like real rejection -- because your real self is exposed. Platforms profit from that vulnerability.",
    platforms: "Facebook, LinkedIn, Instagram",
  },
];

const FALLBACK_QUOTES = [
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "mind" },
  { quote: "The mind is everything. What you think, you become.", author: "Buddha", category: "mind" },
  { quote: "Technology is a useful servant but a dangerous master.", author: "Christian Lous Lange", category: "technology" },
  { quote: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "happiness" },
  { quote: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James", category: "fear" },
  { quote: "In the age of information, ignorance is a choice.", author: "Donny Miller", category: "knowledge" },
  { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "mind" },
  { quote: "He who controls others may be powerful, but he who has mastered himself is mightier still.", author: "Lao Tzu", category: "freedom" },
  { quote: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", category: "mind" },
  { quote: "Social media has given us this idea that we should all have a posse of friends when in reality, if we have one or two really good friends, we are lucky.", author: "Brene Brown", category: "technology" },
  { quote: "It is not the man who has too little, but the man who craves more, that is poor.", author: "Seneca", category: "fear" },
  { quote: "The secret of change is to focus all your energy not on fighting the old, but on building the new.", author: "Socrates", category: "success" },
];

class Explorer {
  constructor() {
    this.mechanisms     = MECHANISMS;
    this.grid           = document.getElementById("explorerGrid");
    this.emptyState     = document.getElementById("emptyState");
    this.searchInput    = document.getElementById("searchInput");
    this.filterBtns     = document.querySelectorAll(".filter-btn");
    this.alertBox       = document.getElementById("alertBox");
    this.activeFilter   = "all";
    this.apiInput       = document.getElementById("apiSearchInput");
    this.apiFetchBtn    = document.getElementById("apiFetchBtn");
    this.apiResults     = document.getElementById("apiResults");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.errorState     = document.getElementById("errorState");
    this.API_KEY        = "GnFVC3RbNNRmRCMtW3HDL29p0uBBgWFSkJsvJrW0";
    this.init();
  }

  init() {
    this.renderCards(this.mechanisms);
    this.bindSearch();
    this.bindFilters();
    this.bindApiSearch();
  }

  renderCards(data) {
    if (!this.grid) return;
    this.grid.innerHTML = "";

    if (!data.length) {
      if (this.emptyState) this.emptyState.style.display = "block";
      return;
    }
    if (this.emptyState) this.emptyState.style.display = "none";

    data.forEach((item) => {
      const tagClass = { cognitive: "tag-cognitive", design: "tag-design", social: "tag-social" }[item.category] || "tag-cognitive";
      const tagLabel = { cognitive: "Cognitive Bias", design: "Design Pattern", social: "Social Psychology" }[item.category] || item.category;
      const icon = item.icon === "infinity" ? "\u221e" : item.icon;

      const card = document.createElement("div");
      card.className = "explorer-card";
      card.dataset.category = item.category;
      card.innerHTML = `
        <div class="card-front">
          <span class="card-front-tag ${tagClass}">${tagLabel}</span>
          <div class="card-icon">${icon}</div>
          <h3>${item.name}</h3>
          <p class="card-teaser">${item.teaser}</p>
        </div>
        <div class="card-back">
          <div class="card-back-title">${item.name}</div>
          <p>${item.description}</p>
          <div class="card-platforms">${item.platforms}</div>
          <div class="resist-toggle">
            <button class="resist-btn" onclick="event.stopPropagation(); var rc=this.nextElementSibling; rc.classList.toggle('open'); this.textContent=rc.classList.contains('open')?'Hide resistance tip':'How to resist ↓'">How to resist ↓</button>
            <div class="resist-content">${item.resist}</div>
          </div>
        </div>
      `;
      this.grid.appendChild(card);
    });
  }

  bindSearch() {
    if (!this.searchInput) return;
    this.searchInput.addEventListener("input", () => {
      const query = this.searchInput.value.trim().toLowerCase();
      this.applyFilters(query, this.activeFilter);
      if (query.length > 0) {
        this.showAlert(`Showing results for "${this.searchInput.value.trim()}"`, "info");
      } else {
        this.hideAlert();
      }
    });
  }

  bindFilters() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilter = btn.dataset.filter;
        const query = this.searchInput ? this.searchInput.value.trim().toLowerCase() : "";
        this.applyFilters(query, this.activeFilter);
      });
    });
  }

  applyFilters(query, category) {
    let result = this.mechanisms;
    if (category !== "all") result = result.filter((item) => item.category === category);
    if (query) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.platforms.toLowerCase().includes(query) ||
        item.teaser.toLowerCase().includes(query)
      );
    }
    this.renderCards(result);
  }

  showAlert(message, type = "info") {
    if (!this.alertBox) return;
    this.alertBox.textContent = message;
    this.alertBox.className = `alert-box show ${type}`;
  }

  hideAlert() {
    if (!this.alertBox) return;
    this.alertBox.className = "alert-box";
  }

  bindApiSearch() {
    if (!this.apiFetchBtn) return;
    this.apiFetchBtn.addEventListener("click", () => {
      this.fetchQuotes(this.apiInput ? this.apiInput.value.trim() : "");
    });
    if (this.apiInput) {
      this.apiInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.fetchQuotes(this.apiInput.value.trim());
      });
    }
    this.fetchQuotes("");
  }

  resolveCategory(query) {
    const q = query.toLowerCase();
    const map = [
      [/mind|brain|psychology|mental|cognitive|conscious/, "mind"],
      [/success|motivation|inspire|goal|achieve/, "success"],
      [/happiness|happy|joy|wellbeing|peace/, "happiness"],
      [/truth|reality|knowledge|wisdom/, "knowledge"],
      [/technology|tech|digital|internet|social|phone/, "technology"],
      [/freedom|control|power|society/, "freedom"],
      [/future|change|time|progress/, "future"],
      [/fear|anxiety|stress|addiction|habit|sadness|sad|anger|anger|emotion|loneliness|lonely|depression|unhappy/, "fear"],
      [/love|relationship|connection|trust/, "love"],
    ];
    for (const [regex, cat] of map) {
      if (regex.test(q)) return cat;
    }
    return "knowledge";
  }

  async fetchQuotes(query) {
    this.showLoading();
    const category = this.resolveCategory(query);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=6`,
        { headers: { "X-Api-Key": this.API_KEY } }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) { this.useFallback(category); return; }
      this.renderQuotes(data, category, false);
    } catch (err) {
      console.warn("API unavailable, using fallback:", err.message);
      this.useFallback(category);
    }
  }

  useFallback(category) {
    const filtered = FALLBACK_QUOTES.filter((q) => q.category === category);
    const toShow = filtered.length >= 2 ? filtered : FALLBACK_QUOTES.slice(0, 6);
    this.renderQuotes(toShow, category, true);
  }

  renderQuotes(quotes, category, isFallback) {
    this.hideLoading();
    if (!this.apiResults) return;
    this.apiResults.innerHTML = "";

    if (isFallback) {
      const notice = document.createElement("p");
      notice.className = "fallback-notice";
      notice.textContent = "Showing curated quotes -- live API loads automatically once deployed online.";
      this.apiResults.appendChild(notice);
    }

    quotes.forEach((item) => {
      const card = document.createElement("div");
      card.className = "api-fact-card";
      card.innerHTML = `
        <div class="fact-label">${category}</div>
        <p>"${item.quote}"</p>
        <div class="fact-author">-- ${item.author}</div>
      `;
      this.apiResults.appendChild(card);
    });
  }

  showLoading() {
    if (this.loadingSpinner) this.loadingSpinner.style.display = "block";
    if (this.errorState)     this.errorState.style.display    = "none";
    if (this.apiResults)     this.apiResults.innerHTML        = "";
  }

  hideLoading() {
    if (this.loadingSpinner) this.loadingSpinner.style.display = "none";
  }

  showEmpty() {
    this.hideLoading();
    if (this.apiResults) {
      this.apiResults.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No quotes found. Try "mind", "fear", or "technology".</div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => { new Explorer(); });
