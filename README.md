# 🧁 To My Cupcake — A Friendship Website

A warm, golden-toned personal website built to celebrate a one-of-a-kind friendship.  
Filled with real photos, heartfelt quotes, a memory timeline, and little details that make it feel alive.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🧁 **Cupcake tab icon** | Shows in the browser tab |
| 🎞️ **Polaroid photo gallery** | 12 real photos in a tilted scrapbook collage layout |
| 🔄 **Flip cards** | Click any photo to flip it and reveal a personal note |
| 💬 **Quotes section** | 5 original heartfelt quotes signed *— Muffin* |
| 🕰️ **Memory timeline** | Key milestones of the friendship |
| 🎵 **Background music** | *The Metro Proposal* plays automatically with a volume slider |
| 🐱 **Running cats** | A white cat and a black cat run across the footer |
| 🫶 **Hand heart** | Animated heart in the footer |
| ✨ **Cursor sparkle trail** | Gold sparkles follow your mouse |
| 🌟 **Floating particles** | Soft golden particles drift in the background |
| 📊 **Scroll progress bar** | Gold bar at the top tracks reading progress |
| 📱 **Mobile friendly** | Swipeable photo rows, responsive layout |

---

## 📁 File Structure

```
friendship-site/
├── index.html    ← Main HTML (includes all embedded photos + audio)
├── style.css     ← All styles, animations, layout, flip cards, cats
├── script.js     ← Scroll reveal, flip logic, particles, music player
└── README.md     ← This file
```

> **Note:** All 12 photos and the background music are base64-embedded directly in `index.html`, so the site works as a single self-contained file with no external assets needed.

---

## 🚀 Deploy to GitHub Pages

1. **Create a new GitHub repository** (e.g. `cupcake-friendship-site`)
2. **Upload all 4 files** into the root of the repo:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Go to **Settings → Pages**
4. Set **Branch:** `main` → **Folder:** `/ (root)` → click **Save**
5. Wait ~60 seconds, then visit:

```
https://your-username.github.io/cupcake-friendship-site
```

---

## 🎵 Music

The background music (*The Metro Proposal*) is embedded directly in the HTML as base64.  
Use the player bar in the footer to **play/pause** and **control the volume**.  
Music starts muted automatically — it unmutes on your first click.

---

## 🐱 The Cats

- 🤍 **White cat** — runs left to right across the footer  
- 🖤 **Black cat** (glowing amber eyes) — runs right to left  
Both are fully CSS-animated SVGs with leg movement, tail sway, and a little body bounce.

---

## 🛠️ Built With

- Pure **HTML5**, **CSS3**, **Vanilla JavaScript** — no frameworks, no dependencies
- Google Fonts: *Playfair Display* + *Lato*
- All animations via CSS `@keyframes` and the Web Animations API
- Photos embedded as `base64` JPEG data URIs

---

## 💛 Made with love · Just for you
