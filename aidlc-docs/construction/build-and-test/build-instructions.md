# Build Instructions - Kiro Dash

## Overview
Kiro Dash is a single-file HTML5 game requiring no build process. Deployment is as simple as serving the HTML file.

---

## Prerequisites

### Required
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)
- Web server (for local testing) OR ability to open HTML files directly

### Optional
- Python 3 (for simple local server)
- Node.js with http-server (alternative local server)

---

## Build Steps

### Step 1: Verify File Structure
Ensure the following files exist:
```
/aidlc-workshop/
├── index.html          # Main game file
└── assets/
    ├── ghosty.png     # Player sprite (optional)
    ├── jump.wav       # Jump sound
    └── game_over.wav  # Game over sound
```

### Step 2: No Compilation Required
**There is no build process.** The game is ready to run as-is.

### Step 3: Local Testing Setup

**Option A: Python Simple Server**
```bash
cd /aidlc-workshop
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

**Option B: Direct File Open**
```bash
# Open directly in browser (may have CORS issues with audio)
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Option C: Node.js http-server**
```bash
cd /aidlc-workshop
npx http-server -p 8000
```
Then open: `http://localhost:8000`

---

## Deployment

### Static File Hosting

**GitHub Pages**:
1. Create GitHub repository
2. Push `index.html` and `assets/` folder
3. Enable GitHub Pages in repository settings
4. Access at: `https://username.github.io/repo-name/`

**AWS S3 + CloudFront**:
1. Create S3 bucket
2. Enable static website hosting
3. Upload `index.html` and `assets/` folder
4. Set bucket policy for public read access
5. (Optional) Create CloudFront distribution for CDN

**Netlify**:
1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Automatic deployment on push

**Any Web Server**:
1. Upload `index.html` and `assets/` folder
2. Ensure MIME types are correct:
   - `.html` → `text/html`
   - `.wav` → `audio/wav`
   - `.png` → `image/png`

---

## Configuration

### Tuning Game Parameters
Edit the `CONFIG` object in `index.html` (lines ~30-50):

```javascript
const CONFIG = {
    GRAVITY: 0.6,              // Adjust jump feel
    JUMP_VELOCITY: -12,        // Adjust jump height
    BASE_SPEED: 5,             // Adjust game speed
    OBSTACLE_INTERVAL: 1.5,    // Adjust difficulty
    // ... more parameters
};
```

### Common Adjustments
- **Easier Game**: Increase `OBSTACLE_INTERVAL`, decrease `SPEED_INCREASE`
- **Harder Game**: Decrease `OBSTACLE_INTERVAL`, increase `SPEED_INCREASE`
- **Higher Jumps**: Increase `JUMP_VELOCITY` (more negative)
- **Faster Gameplay**: Increase `BASE_SPEED`

---

## Verification

### Quick Verification Checklist
- [ ] `index.html` exists and is readable
- [ ] `assets/` folder exists with audio files
- [ ] File can be opened in browser
- [ ] Canvas displays (800x600)
- [ ] "KIRO DASH" title appears on start screen
- [ ] Controls instructions visible

### Browser Console Check
Open browser DevTools (F12) and check for:
- No JavaScript errors
- No 404 errors for assets
- Console shows no warnings

---

## Troubleshooting

### Issue: Audio doesn't play
**Solution**: Serve via HTTP server (not file://). Browsers block audio on file:// protocol.

### Issue: Canvas is blank
**Solution**: Check browser console for errors. Ensure JavaScript is enabled.

### Issue: Game runs slowly
**Solution**: Close other browser tabs. Check CPU usage. Try different browser.

### Issue: High score doesn't save
**Solution**: Ensure localStorage is enabled. Check browser privacy settings.

---

## Build Summary

**Build Time**: None (no compilation)  
**Build Tools**: None required  
**Dependencies**: None (vanilla JavaScript)  
**Output**: Single `index.html` file  
**Size**: ~15KB (HTML + CSS + JavaScript)  
**Assets**: ~500KB (audio files)

---
