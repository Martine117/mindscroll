# MindScroll — The Psychology of Social Media

**Student:** Martine Mazloum
**Course:** Full Stack Development — Final Project 2026
**University:** Lebanese University, Faculty of Engineering, Branch 2
**Due Date:** July 5, 2026

---

## Project Description

MindScroll is a research-driven website that exposes the psychological mechanisms social media platforms use to manipulate user behavior. It presents serious behavioral science in an accessible, visually striking format — designed to be both informative and genuinely unsettling.

The site opens with a fullscreen quiz that calculates your personal "manipulation score," then guides you through a chronological history of how social media learned to hijack human attention, and finally gives you a searchable database of 18 psychological weapons platforms use against you — each with a practical resistance tip.

---

## Live URL

[your-deployment-url-here]

## GitHub Repository

[your-repo-url-here]

---

## Pages

1. **Home (index.html)** — Hero section, six interactive hover cards, live real-time counters showing global social media statistics, pull quote, and CTA
2. **Timeline (timeline.html)** — Alternating Flexbox timeline from 1985 to 2024 tracing how social media evolved its psychological grip
3. **The Manipulation Toolkit (explorer.html)** — Searchable, filterable database of 18 psychological mechanisms with hover-reveal cards, "How to resist" toggles, and live API quotes
4. **Quiz (quiz.html)** — Fullscreen gate quiz: 5 questions, animated calculating screen, score ring, and personality type result

---

## API Used

**API Ninjas** — `https://api.api-ninjas.com/v1/quotes`

Used on the Explorer/Toolkit page to fetch psychology-related quotes dynamically based on user search input. The search term is mapped to a valid API Ninjas category (mind, fear, happiness, technology, etc.) and 6 matching quotes are returned and displayed as styled cards.

Features implemented:
- Live keyword-to-category mapping
- Loading spinner while fetching
- Error state if API unreachable
- Empty state for no results
- Local fallback quotes for localhost development (API works fully once deployed)

---

## Unique Front-End Requirement

**Create a timeline-style section using Flexbox or Grid**

Implemented on `timeline.html`. The `.timeline` container uses `display: flex; flex-direction: column` as the spine wrapper. Each `.timeline-item` uses `flex-direction: row` (left items) or `flex-direction: row-reverse` (right items) to create the alternating left/right layout. The central spine is a CSS `::before` pseudo-element on `.timeline`. Timeline dots are absolutely positioned at `left: 50%` on the spine. On mobile, items collapse to a single column via media queries. Scroll-reveal animations are handled by an `IntersectionObserver` in `timeline.js`. See `css/timeline.css` for the full commented implementation.

---

## Technologies Used

- HTML5 (semantic elements: nav, section, footer, article)
- CSS3 (Flexbox, Grid, custom properties, animations, transitions)
- Bootstrap 5.3
- Vanilla JavaScript ES6 (6 classes: App, LiveCounters, TimelineReveal, Explorer, Quiz)
- Google Fonts (Playfair Display + Inter)
- API Ninjas (quotes endpoint)

---

## Features Beyond Requirements

- **Fullscreen quiz gate** — 5-question manipulation assessment with animated SVG score ring and 5 personality type results
- **Live counters** — 6 statistics that tick up in real time (Instagram scrolls, TikTok hours, Meta ad impressions, etc.) based on published platform data
- **18 interactive toolkit cards** — hover to reveal full explanation + "How to resist" toggle on each card
- **Scroll-triggered timeline animations** — each item fades in using IntersectionObserver
- **Smart API fallback** — curated local quotes shown on localhost, live API loads automatically when deployed

---

## AI-Use Appendix

### Tools Used

- **Claude (Anthropic)** — Used throughout the project for HTML structure, CSS architecture, JavaScript class design, debugging, and content writing.

### Prompts Used

1. *"I have a full stack web dev final project. My unique requirement is a timeline-style section using Flexbox or Grid. I want the site to be about the psychology of social media — not cliched, sleek and minimal with a deep navy and gold palette. Please generate all the HTML, CSS, and JS files I need with ES6 classes."*

2. *"The explorer page has 18 psychological mechanisms. I want big cards with an icon and a short teaser on the front, and hover reveals the full explanation. Add a 'How to resist' toggle button on the back of each card that shows a practical resistance tip."*

3. *"Build a fullscreen quiz gate that appears before the homepage. 5 questions about social media habits, a calculating animation screen, then a result showing a manipulation score percentage with an animated SVG ring and a personality type label like 'The Doom Scroller' or 'The Free Mind'."*

### What the AI Got Wrong

1. **Syntax error from special characters** — The generated JavaScript files contained Unicode smart quotes (curly apostrophes like ' and ") and em dashes (—) inside JS strings, which caused an `Uncaught SyntaxError: Unexpected identifier` error that crashed the entire explorer page. The browser console showed the error on line 31. I fixed it by running a Python script to replace all non-ASCII characters with plain ASCII equivalents, then verified all files with Node.js syntax checking.

2. **API endpoint mismatch** — The AI initially used the `/v1/facts` endpoint from API Ninjas, which does not support keyword/category filtering — it returns random facts regardless of the search term. Searching "mind" or "sadness" returned completely unrelated results. I identified this by testing the API directly and reading the API Ninjas documentation, then switched to the `/v1/quotes` endpoint which properly supports category-based filtering.

3. **Timeline dots misaligned** — The dots were appearing to the right of the spine instead of centered on it. The initial flexbox margin approach was unreliable across screen sizes. I fixed this by switching to `position: absolute; left: 50%; transform: translateX(-50%)` on a wrapper element, which always places the dot exactly on the spine line regardless of content width.

---

## Screenshots

*(Add screenshots at mobile, tablet, and desktop widths here — take them after deployment)*

---

## Commit History

Built incrementally across the project period:
- `initial project structure and HTML pages`
- `add global CSS with navy gold palette`
- `implement flexbox timeline with alternating layout`
- `add explorer page with 18 mechanism cards and search filter`
- `integrate API Ninjas quotes endpoint with fallback system`
- `fix syntax errors and API endpoint`
- `add fullscreen quiz gate with score ring and personality types`
- `add live counters and resist toggle feature`
- `responsive fixes and final polish`
