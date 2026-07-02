/**
 * MindScroll — explorer.js
 * ES6 class handling:
 * - Own curated data (15+ items)
 * - Client-side search
 * - Category filtering
 * - API Ninjas integration with loading/error/empty states
 * - Alert feedback messages
 */

// ── OWN DATA — 18 psychological mechanisms ──────────────────
const MECHANISMS = [
  {
    id: 1,
    name: 'Variable Reward',
    category: 'cognitive',
    description: 'Unpredictable rewards are far more addictive than predictable ones. B.F. Skinner proved this with pigeons in the 1950s. Your Instagram feed operates on the exact same principle.',
    platforms: 'Instagram, TikTok, Twitter/X',
  },
  {
    id: 2,
    name: 'Infinite Scroll',
    category: 'design',
    description: 'Invented in 2006 to remove the natural stopping point of pagination. Without a bottom to the page, there is no moment of conscious decision to continue. You scroll because stopping requires effort.',
    platforms: 'Every major platform',
  },
  {
    id: 3,
    name: 'Social Comparison Theory',
    category: 'social',
    description: 'Leon Festinger's 1954 theory: humans evaluate themselves by comparing to others. Social media creates an endless highlight reel — a comparison benchmark that no one can realistically match.',
    platforms: 'Instagram, LinkedIn, Facebook',
  },
  {
    id: 4,
    name: 'Loss Aversion',
    category: 'cognitive',
    description: 'We fear losing something 2x more than we value gaining the same thing. Snapchat streaks, Duolingo streaks, and notification counts all exploit this. You maintain them to avoid the pain of loss.',
    platforms: 'Snapchat, Duolingo, BeReal',
  },
  {
    id: 5,
    name: 'Dopamine Loop',
    category: 'cognitive',
    description: 'Every like, comment, and share triggers a small dopamine release. Platforms learned to delay and batch notifications — making the hit feel larger. The anticipation between posting and checking is engineered.',
    platforms: 'Instagram, Facebook, LinkedIn',
  },
  {
    id: 6,
    name: 'Red Notification Badge',
    category: 'design',
    description: 'Red is the color of urgency and danger. Platforms chose it deliberately for notifications. The badge creates a feeling of something unresolved — a cognitive itch that demands scratching.',
    platforms: 'All apps',
  },
  {
    id: 7,
    name: 'Autoplay',
    category: 'design',
    description: 'YouTube's autoplay (2015) exploits decision fatigue and inertia. Stopping requires active effort; continuing requires none. The default state is always engagement. Inertia becomes addiction.',
    platforms: 'YouTube, Netflix, TikTok',
  },
  {
    id: 8,
    name: 'FOMO (Fear of Missing Out)',
    category: 'social',
    description: 'First described clinically in 2013, FOMO is anxiety caused by the belief that others are having rewarding experiences you are absent from. Social media is a FOMO machine, running 24/7.',
    platforms: 'Instagram, Snapchat, Stories',
  },
  {
    id: 9,
    name: 'Parasocial Relationships',
    category: 'social',
    description: 'One-sided emotional bonds with creators, influencers, or characters. Platforms encourage this because parasocial attachment drives consistent viewing. You feel you know someone who doesn't know you exist.',
    platforms: 'YouTube, TikTok, Twitch',
  },
  {
    id: 10,
    name: 'Algorithmic Curation',
    category: 'design',
    description: 'Feeds no longer show content chronologically. Algorithms predict what will generate the most reaction and show that first. Outrage and anxiety drive more engagement than joy — the algorithm knows this.',
    platforms: 'Facebook, Instagram, Twitter/X',
  },
  {
    id: 11,
    name: 'Reciprocity Norm',
    category: 'social',
    description: 'We feel obligated to return favors. On social media: if someone follows you, you feel pressure to follow back. If someone comments, you feel you must reply. Engagement is partly coercion.',
    platforms: 'Instagram, Twitter/X, LinkedIn',
  },
  {
    id: 12,
    name: 'Echo Chambers',
    category: 'cognitive',
    description: 'Algorithms show you content you already agree with, creating a feedback loop that reinforces existing beliefs and filters out dissenting views. Confirmation bias is the feature, not the bug.',
    platforms: 'Facebook, YouTube, Twitter/X',
  },
  {
    id: 13,
    name: 'Gamification',
    category: 'design',
    description: 'Points, streaks, badges, and leaderboards transform behavior into a game. LinkedIn's profile strength bar, Snapchat streaks, and Twitter's verified badge are all game mechanics applied to social life.',
    platforms: 'LinkedIn, Snapchat, Twitter/X',
  },
  {
    id: 14,
    name: 'Intermittent Reinforcement',
    category: 'cognitive',
    description: 'The most powerful conditioning schedule is when rewards arrive unpredictably. Pull-to-refresh is the digital slot machine. You pull down not because you expect new content but because sometimes there is some.',
    platforms: 'Twitter/X, Instagram, Email',
  },
  {
    id: 15,
    name: 'Social Proof',
    category: 'social',
    description: 'Humans look to others' behavior to determine correct behavior. View counts, like counts, and follower numbers are all social proof mechanisms that signal: "many people chose this, so you should too."',
    platforms: 'All platforms',
  },
  {
    id: 16,
    name: 'Anchoring Effect',
    category: 'cognitive',
    description: 'The first number you see anchors your perception. A post with 10,000 likes feels more credible than one with 10, regardless of content quality. Platforms display numbers prominently to exploit this.',
    platforms: 'YouTube, Twitter/X, TikTok',
  },
  {
    id: 17,
    name: 'Zeigarnik Effect',
    category: 'cognitive',
    description: 'Uncompleted tasks occupy mental space more than completed ones. Unread notification counts, the red badge, the unfinished story — platforms use incompleteness to keep you returning to resolve the tension.',
    platforms: 'All apps',
  },
  {
    id: 18,
    name: 'Identity-Based Engagement',
    category: 'social',
    description: 'When your real identity is tied to your profile (Facebook, LinkedIn), the emotional stakes of every post rise dramatically. Social rejection online feels like real rejection — because your real self is on the line.',
    platforms: 'Facebook, LinkedIn, Instagram',
  },
];

// ── EXPLORER CLASS ───────────────────────────────────────────
class Explorer {
  constructor() {
    this.mechanisms    = MECHANISMS;
    this.filtered      = MECHANISMS;
    this.grid          = document.getElementById('explorerGrid');
    this.emptyState    = document.getElementById('emptyState');
    this.searchInput   = document.getElementById('searchInput');
    this.filterBtns    = document.querySelectorAll('.filter-btn');
    this.alertBox      = document.getElementById('alertBox');
    this.activeFilter  = 'all';

    // API elements
    this.apiInput      = document.getElementById('apiSearchInput');
    this.apiFetchBtn   = document.getElementById('apiFetchBtn');
    this.apiResults    = document.getElementById('apiResults');
    this.loadingSpinner = document.getElementById('loadingSpinner');
    this.errorState    = document.getElementById('errorState');

    this.API_KEY       = 'GnFVC3RbNNRmRCMtW3HDL29p0uBBgWFSkJsvJrW0';

    this.init();
  }

  init() {
    this.renderCards(this.mechanisms);
    this.bindSearch();
    this.bindFilters();
    this.bindApiSearch();
  }

  // ── RENDER CARDS ──
  renderCards(data) {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    if (!data.length) {
      this.emptyState.style.display = 'block';
      return;
    }

    this.emptyState.style.display = 'none';

    data.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'explorer-card';
      card.dataset.category = item.category;

      const tagClass = {
        cognitive: 'tag-cognitive',
        design:    'tag-design',
        social:    'tag-social',
      }[item.category] || 'tag-cognitive';

      const tagLabel = {
        cognitive: 'Cognitive Bias',
        design:    'Design Pattern',
        social:    'Social Psychology',
      }[item.category] || item.category;

      card.innerHTML = `
        <span class="explorer-card-tag ${tagClass}">${tagLabel}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="explorer-card-platforms">Platforms: ${item.platforms}</div>
      `;

      this.grid.appendChild(card);
    });
  }

  // ── SEARCH ──
  bindSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener('input', () => {
      const query = this.searchInput.value.trim().toLowerCase();
      this.applyFilters(query, this.activeFilter);

      if (query.length > 0) {
        this.showAlert(`Showing results for "${this.searchInput.value.trim()}"`, 'info');
      } else {
        this.hideAlert();
      }
    });
  }

  // ── FILTERS ──
  bindFilters() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        const query = this.searchInput ? this.searchInput.value.trim().toLowerCase() : '';
        this.applyFilters(query, this.activeFilter);
      });
    });
  }

  applyFilters(query, category) {
    let result = this.mechanisms;

    if (category !== 'all') {
      result = result.filter((item) => item.category === category);
    }

    if (query) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.platforms.toLowerCase().includes(query)
      );
    }

    this.renderCards(result);
  }

  // ── ALERT MESSAGES ──
  showAlert(message, type = 'info') {
    if (!this.alertBox) return;
    this.alertBox.textContent = message;
    this.alertBox.className   = `alert-box show ${type}`;
  }

  hideAlert() {
    if (!this.alertBox) return;
    this.alertBox.className = 'alert-box';
  }

  // ── API INTEGRATION ──
  bindApiSearch() {
    if (!this.apiFetchBtn) return;

    this.apiFetchBtn.addEventListener('click', () => {
      const query = this.apiInput ? this.apiInput.value.trim() : 'psychology';
      this.fetchFacts(query || 'psychology');
    });

    // Allow Enter key
    if (this.apiInput) {
      this.apiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = this.apiInput.value.trim();
          this.fetchFacts(query || 'psychology');
        }
      });
    }

    // Load default facts on page load
    this.fetchFacts('psychology');
  }

  async fetchFacts(query) {
    this.showLoading();

    try {
      const url = `https://api.api-ninjas.com/v1/facts?limit=6&category=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        headers: { 'X-Api-Key': this.API_KEY },
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      if (!data || data.length === 0) {
        this.showEmpty();
        return;
      }

      this.renderFacts(data);
    } catch (err) {
      console.error('API fetch error:', err);
      this.showError();
    }
  }

  renderFacts(facts) {
    this.hideLoading();

    if (!this.apiResults) return;
    this.apiResults.innerHTML = '';

    facts.forEach((fact) => {
      const card = document.createElement('div');
      card.className = 'api-fact-card';
      card.innerHTML = `
        <div class="fact-label">Research Fact</div>
        <p>${fact.fact}</p>
      `;
      this.apiResults.appendChild(card);
    });
  }

  // ── LOADING / ERROR / EMPTY STATES ──
  showLoading() {
    if (this.loadingSpinner) this.loadingSpinner.style.display = 'block';
    if (this.errorState)     this.errorState.style.display    = 'none';
    if (this.apiResults)     this.apiResults.innerHTML        = '';
  }

  hideLoading() {
    if (this.loadingSpinner) this.loadingSpinner.style.display = 'none';
  }

  showError() {
    this.hideLoading();
    if (this.errorState) this.errorState.style.display = 'block';
  }

  showEmpty() {
    this.hideLoading();
    if (this.apiResults) {
      this.apiResults.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
          No facts found for that topic. Try "dopamine", "habit", or "memory".
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Explorer();
});
