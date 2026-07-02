/**
 * MindScroll — app.js
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
