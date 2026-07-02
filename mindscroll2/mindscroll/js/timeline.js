/**
 * MindScroll — timeline.js
 * Scroll-triggered reveal animations for timeline items
 * Written in ES6 class syntax as required
 */

class TimelineReveal {
  constructor() {
    this.items = document.querySelectorAll('.timeline-item');
    this.init();
  }

  init() {
    if (!this.items.length) return;

    // Use IntersectionObserver for performant scroll detection
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    this.items.forEach((item) => observer.observe(item));
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TimelineReveal();
});
