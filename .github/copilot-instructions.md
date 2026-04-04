---
description: "Workspace-level guidance for contributing to the Becky Taha'Blu static website."
---

# Workspace Instructions

This repository is a small static website built with plain HTML, CSS, and JavaScript.

## What this repository contains

- `index.html`, `about.html`, `sessions.html`, `contact.html`
- `style.css` and a backup copy `style.css.bak`
- `script.js` for the age gate interaction
- `assets/` for images and media
- `README.md` is HTML content used by the site, not a traditional developer guide
- `README.txt` is unrelated WordPress/Age Gate plugin metadata and should generally be ignored unless the task explicitly references it

## Use this guidance when

- editing or adding page content in HTML
- updating visual styles in `style.css`
- fixing or enhancing the age verification behavior in `script.js`
- changing the navigation, responsive layout, or page structure
- working with the `assets/` images and links

## Key project patterns

- This is a static site without a build step, package manager, or deployment script in the repository.
- Changes should be made directly to the source files and verified in a browser.
- The HTML uses a simple page-per-file structure and should stay semantic and accessible.
- `script.js` handles the age gate via `localStorage` and `DOMContentLoaded`.
- `style.css` drives the site visuals and responsive layout using CSS grid, flexbox, and media queries.

## Recommended style and code guidance

- Keep markup semantic: use proper headings, sections, navigation lists, and accessible link text.
- Preserve the age gate modal and privacy-related flow unless the user asks to remove or modify it.
- Maintain responsive design, especially the `.info-grid` layout and mobile breakpoints.
- Use existing color, typography, and spacing patterns when extending the visual design.
- Avoid introducing complex frameworks or tooling; this repository is intended to remain plain HTML/CSS/JS.

## Notes for reviewers and agents

- If a change touches `README.md`, confirm whether it is meant to be page content rather than documentation.
- If a task asks for build/test commands, note that none are present in this repo.
- Use the browser for local preview and manual verification after edits.
