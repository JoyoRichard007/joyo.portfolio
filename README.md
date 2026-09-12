# Portfolio — RAJAONARIVELO Joyo Richard

Portfolio personnel animé, statique (HTML/CSS/JS), prêt pour GitHub Pages.

## Structure

```
├── index.html        # Page unique
├── css/style.css     # Styles + animations
├── js/script.js      # Interactions (curseur, particules, reveal, compteurs…)
└── Joyo IDEV.jpg     # Photo de profil
```

## Lancer en local

Ouvre simplement `index.html` dans ton navigateur, ou lance un petit serveur :

```bash
python -m http.server 8000
# puis http://localhost:8000
```

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt sur GitHub (par ex. `portfolio`), en **public**.
2. Dans ce dossier, initialise git et pousse le code :

```bash
git init
git add .
git commit -m "Portfolio initial"
git branch -M main
git remote add origin https://github.com/<ton-username>/portfolio.git
git push -u origin main
```

3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → Branch : `main` / `/ (root)` → Save**.
4. Attends 1–2 minutes : le site est en ligne sur `https://<ton-username>.github.io/portfolio/`.

> Si le dépôt s'appelle `<ton-username>.github.io`, l'URL sera directement `https://<ton-username>.github.io/`.

## Personnaliser

- Couleurs : variables CSS en haut de `css/style.css` (`--accent`, `--bg`…)
- Textes, liens, expériences : directement dans `index.html`
- Animations du texte défilant : tableau `roles` dans `js/script.js`
