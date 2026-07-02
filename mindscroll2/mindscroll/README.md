# MindScroll — The Psychology of Social Media

**Student:** Martine Mazloum  
**Course:** Full Stack Development — Final Project 2026  
**Due Date:** July 5, 2026

---

## Project Description

MindScroll is a research-driven website exploring the psychology behind social media platforms. It exposes the behavioral design patterns, cognitive biases, and manipulation techniques that platforms use to maximize user engagement — often at the cost of user wellbeing.

The site is built to be informative, visually striking, and thought-provoking, presenting serious psychological research in an accessible format.

---

## Pages

1. **Home (index.html)** — Hero section, six core mechanism cards, pull quote, CTA
2. **Timeline (timeline.html)** — Chronological history from 1985 to 2024 of how social media evolved its grip on human psychology
3. **Explorer (explorer.html)** — Searchable, filterable database of 18 psychological mechanisms + live API facts

---

## API Used

**API Ninjas** — `https://api.api-ninjas.com/v1/facts`  
Used to fetch psychology-related research facts dynamically on the Explorer page.  
Features implemented: live search, loading state, error state, empty state.

---

## Unique Front-End Requirement

**Create a timeline-style section using Flexbox or Grid**

Implemented on `timeline.html`. The `.timeline` container uses `display: flex; flex-direction: column` as the main spine wrapper. Each `.timeline-item` uses flexbox with `flex-direction: row` (left items) or `flex-direction: row-reverse` (right items) to create the alternating left/right layout. The central spine line is drawn via a CSS `::before` pseudo-element on `.timeline`. On mobile screens (max-width: 768px), items collapse to a single left-aligned column using media queries. See `css/timeline.css` for full commented implementation.

---

## Technologies Used

- HTML5 (semantic elements throughout)
- CSS3 (Flexbox, Grid, custom properties, animations)
- Bootstrap 5.3
- Vanilla JavaScript ES6 (classes, async/await, IntersectionObserver, fetch API)
- Google Fonts (Syne + Inter)
- API Ninjas

---

## Deployment

- **Live URL:** [your-deployment-url-here]
- **GitHub Repo:** [your-repo-url-here]
- **Deployed via:** Vercel / Netlify / GitHub Pages

---

## AI-Use Appendix

### Tools Used
- **Claude (Anthropic)** — Used for initial project planning, code scaffolding, CSS architecture, and JavaScript class structure.

### Prompts Used

1. *"I have a full stack web dev project. My unique requirement is a timeline-style section using Flexbox or Grid. I want the site to be about the psychology of social media — not clichéd, sleek and minimal. Please generate all the HTML, CSS, and JS files I need."*

2. *"Generate 18 psychological mechanisms used by social media platforms as data objects in JavaScript, each with a name, category, description, and platforms field."*

3. *"Write the timeline CSS so that items alternate left and right using flexbox, with a vertical spine line, and collapse to a single column on mobile."*

### What the AI Got Wrong

1. **The timeline dot positioning** — The initial CSS used `position: absolute` on the dot without properly accounting for the flexbox layout, which caused dots to overlap content on certain screen sizes. I had to manually adjust the `margin` values and test at multiple breakpoints to fix the alignment.

2. **The API error handling** — The first version of the `fetchFacts()` method didn't handle the case where the API returns an empty array (valid response but no data). I added a separate `showEmpty()` state to handle this edge case after testing with obscure search terms that returned zero results.

---

## Screenshots

_(Add screenshots at mobile, tablet, and desktop widths here)_

---

## Commit History Note

This project was built incrementally over the project period with meaningful commits at each stage: project setup → HTML structure → CSS styling → JavaScript classes → API integration → responsive fixes → deployment.
