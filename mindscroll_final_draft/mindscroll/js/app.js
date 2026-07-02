/**
 * MindScroll -- app.js
 * Shared functionality across all pages using ES6 classes
 */

class App {
  constructor() {
    this.scrollTopBtn = document.getElementById('scrollTopBtn');
    this.nav = document.getElementById('mainNav');
    this.init();
  }

  init() {
    this.bindScrollEvents();
  }

  bindScrollEvents() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Show/hide scroll to top button
    if (this.scrollTopBtn) {
      this.scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }

    // Darken navbar on scroll
    if (this.nav) {
      if (scrollY > 50) {
        this.nav.style.background = 'rgba(10,10,10,0.97)';
      } else {
        this.nav.style.background = 'rgba(10,10,10,0.85)';
      }
    }
  }
}

// Boot the app
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// ── LIVE COUNTERS ──────────────────────────────────────────
class LiveCounters {
  constructor() {
    // Only run on pages that have counters
    if (!document.getElementById('cntScrolls')) return;

    // Global per-second rates based on published platform statistics
    // Instagram: ~3.5B scrolls/day = ~40,509/sec
    // TikTok: ~1B hours/day = ~11,574/sec
    // Meta ads: ~10M impressions/sec (estimate)
    // Instagram posts: ~100M/day = ~1,157/sec
    // Push notifications: ~7B/day globally = ~80,000/sec
    // Meta revenue: ~$164B/year = ~$5,199/sec
    this.rates = {
      scrolls:  40509,
      hours:    11574,
      ads:      10000000,
      posts:    1157,
      notifs:   80000,
      revenue:  5199,
    };

    this.elapsed  = 0;
    this.values   = { scrolls: 0, hours: 0, ads: 0, posts: 0, notifs: 0, revenue: 0 };
    this.interval = null;

    this.els = {
      scrolls: document.getElementById('cntScrolls'),
      hours:   document.getElementById('cntHours'),
      ads:     document.getElementById('cntAds'),
      posts:   document.getElementById('cntPosts'),
      notifs:  document.getElementById('cntNotifs'),
      revenue: document.getElementById('cntRevenue'),
    };

    this.start();
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.elapsed++;
    for (const key of Object.keys(this.values)) {
      this.values[key] += this.rates[key];
    }
    this.render();
  }

  format(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000)     return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000)         return (num / 1_000).toFixed(0) + 'K';
    return Math.round(num).toLocaleString();
  }

  render() {
    if (this.els.scrolls) this.els.scrolls.textContent = this.format(this.values.scrolls);
    if (this.els.hours)   this.els.hours.textContent   = this.format(this.values.hours);
    if (this.els.ads)     this.els.ads.textContent      = this.format(this.values.ads);
    if (this.els.posts)   this.els.posts.textContent    = this.format(this.values.posts);
    if (this.els.notifs)  this.els.notifs.textContent   = this.format(this.values.notifs);
    if (this.els.revenue) this.els.revenue.textContent  = '$' + this.format(this.values.revenue);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LiveCounters();
});
