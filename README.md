# Gobinda Chandra Das — Portfolio Website
# Live 
https://gobinda1710.github.io/Portfolio/

A custom-designed, responsive, **four-page** personal portfolio built from scratch using semantic HTML5, CSS3, and vanilla JavaScript. No copied templates, build tools, frameworks, or external services are needed to run the site. Google Fonts is optional; system fonts are used if it is unavailable.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home / introduction / selected projects |
| `about.html` | Biography, education table, skills, interests |
| `projects.html` | Seven project cards with interactive category filters |
| `contact.html` | Contact details, external profile links, validated contact form |

## How to run

Open `index.html` in a browser, or run a local web server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How to deploy

**GitHub Pages:** Upload the *contents* of this directory to a repository, then go to **Settings → Pages → Deploy from a branch → main → /(root)**. Wait until GitHub provides your website URL.

**Vercel:** Import the repository in Vercel. Use **Other** as the framework preset, leave build command blank, and deploy. The entry point is `index.html`.

Keep the folder structure as is; all internal links and assets use relative paths.

## Features / assignment coverage

- Semantic headings, paragraphs, ordered/unordered lists (see below), images and links.
- An accessible, common navigation menu with current-page indicators.
- A responsive mobile menu, light/dark theme switch, scroll effects and back-to-top button.
- Education table on the About page.
- Project filter buttons on Projects page.
- A contact form with text, email, dropdown, radio buttons, checkbox, textarea and submit button.
- JavaScript/HTML5 form validation with no server dependency.
- Original illustration SVGs for project cards, and the provided portrait photo converted to WebP.
- Keyboard-friendly controls, alt text, reduced-motion support.

## Important: How the contact form works

This is a static website with no email backend. Pressing **Prepare message** validates the fields and generates a `mailto:` draft. Press **Open email app** to open the draft and **Send** in your own email software. The **Copy message** button is provided as a fallback. The site **does not** claim the message was sent. To send messages directly from the website in the future, configure a backend or form provider (such as Formspree or EmailJS).

## Project details / verification

Public repositories were checked against the GitHub links provided. The Domestic Bot Dashboard also has a live demo link. The Hospital Management System and User Activity Tracker appear as portfolio studies because public source URLs were not provided. No papers, awards, employment history, or unverifiable technical achievements were invented.

## Personalization checklist

1. Replace text in the HTML files if interests, project descriptions, or education status change.
2. Replace `assets/gobinda-portrait.webp` if a new professional headshot is available.
3. If contact-form backend is added later, update the form behavior in `js/main.js`.
4. If publishing a report, collect your *own* screenshots of the live pages and verify them in Chrome and Firefox. Do not claim browser tests you have not performed yourself.

## Technologies

1. HTML5
2. CSS3
3. Vanilla JavaScript

Original portfolio implementation created for Gobinda Chandra Das. The attached portrait was supplied by the website owner. Project links are attributed to his own repositories.
