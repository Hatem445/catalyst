# Chemistry MindMap Pro (Arabic RTL)

Static educational chemistry web app (HTML/CSS/JS) designed for:
- Arabic RTL learning flow
- Offline/PWA usage
- GitHub Pages hosting

The app includes:
- Home learning dashboard
- Organic chemistry learning window
- Interactive periodic table with element detail panel
- Quiz and flashcards
- Adaptive daily plan (`خطة اليوم`) using `localStorage`

## Local Run

Run a static server from repository root:

```powershell
py -m http.server 5500
```

Open:

```text
http://localhost:5500
```

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. In GitHub, open:
   `Settings > Pages`
3. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
4. Save and wait for deployment to finish.
5. Open the published Pages URL.

Notes:
- `index.html` is at repository root.
- `.nojekyll` is included to avoid Jekyll processing issues.
- `404.html` is present as fallback shell for unknown paths.

## PWA / Offline Notes

- Manifest: `manifest.webmanifest`
- Service worker: `sw.js`
- Offline page: `offline.html`
- Fallback page: `404.html`

Service worker pre-caches the app shell listed in `sw.js` (`APP_SHELL`).
For first validation, clear old cache once:

1. Open DevTools
2. Application
3. Clear storage
4. Clear site data
5. Reload

## Testing Checklist (Pre-Release)

1. Home and bottom navigation.
2. Periodic table tab.
3. Periodic search:
   - type query
   - click `بحث`
   - click `مسح`
4. Home shortcut `السلسلة الانتقالية`.
5. Element detail panel:
   - atom/electron visualization
   - configuration/shell labels
6. Organic reactions controls:
   - `تشغيل`
   - `إيقاف مؤقت`
   - `خطوة تالية`
   - `إعادة`
7. Quiz flow.
8. Flashcards flow.
9. Adaptive plan actions.
10. Theme toggle.
11. Offline check:
    - load once online
    - disconnect internet
    - refresh
12. GitHub Pages unknown path fallback (`404.html`).

