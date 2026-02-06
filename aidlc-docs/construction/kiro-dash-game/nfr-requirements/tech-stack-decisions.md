# Tech Stack Decisions - Kiro Dash

## Core Technologies

### HTML5
- **Version**: HTML5
- **Usage**: Page structure, canvas element
- **Rationale**: Standard, widely supported

### CSS3
- **Usage**: Styling, layout, canvas positioning
- **Rationale**: Simple styling needs, embedded in HTML

### JavaScript (ES6+)
- **Version**: ES6+ (ES2015 and later)
- **Usage**: Game logic, rendering, input handling
- **Rationale**: Native browser support, no transpilation needed
- **Features Used**: Classes, arrow functions, const/let, template literals

---

## Rendering Technology

### Canvas 2D API
- **API**: CanvasRenderingContext2D
- **Usage**: All game rendering
- **Rationale**: 
  - High performance for 2D graphics
  - Direct pixel manipulation
  - Widely supported
  - Suitable for game graphics
- **Alternative Considered**: WebGL (rejected - overkill for 2D game)

---

## Game Loop Technology

### requestAnimationFrame
- **Usage**: Main game loop timing
- **Rationale**:
  - Browser-optimized frame timing
  - Automatic pause when tab inactive
  - 60 FPS target
  - Better than setInterval/setTimeout

---

## Input Handling

### Keyboard Events API
- **Events**: keydown, keyup
- **Usage**: Player controls
- **Rationale**: Standard, reliable, keyboard-only requirement

---

## Audio Technology

### Web Audio API / HTML5 Audio
- **Primary**: HTML5 Audio elements
- **Usage**: Sound effects, background music
- **Rationale**:
  - Simple API for game audio needs
  - Good browser support
  - Sufficient for sound effects and music
- **Alternative**: Web Audio API (more complex, not needed)

---

## Data Persistence

### localStorage API
- **Usage**: High score, audio settings
- **Rationale**:
  - Simple key-value storage
  - Persistent across sessions
  - Synchronous API (simpler code)
  - No server needed
- **Limitations**: 5-10MB limit (sufficient for game data)

---

## No External Libraries

### Decision: Vanilla JavaScript Only
- **Rationale**:
  - No dependencies = no security vulnerabilities
  - Faster load time
  - Simpler deployment
  - Full control over code
  - Learning opportunity
- **Trade-offs**:
  - More code to write
  - No framework conveniences
  - Manual DOM manipulation

---

## Browser APIs Summary

**Required APIs**:
- Canvas 2D Context ✓
- requestAnimationFrame ✓
- Keyboard Events ✓
- localStorage ✓
- HTML5 Audio ✓

**All APIs**: Widely supported in modern browsers (Chrome, Firefox, Safari, Edge)

---

## Development Tools

### Code Editor
- Any text editor (VS Code, Sublime, Notepad++)
- No IDE required

### Testing
- Browser DevTools (Console, Performance, Network tabs)
- Manual testing in target browsers

### Debugging
- console.log() for debugging
- Browser DevTools debugger
- Performance profiling

---

## Deployment Stack

### Hosting
- **Type**: Static file hosting
- **Options**: GitHub Pages, AWS S3, Netlify, any web server
- **Requirements**: Serve single HTML file
- **No server-side processing needed**

### Build Process
- **None**: Direct HTML file, no compilation
- **Deployment**: Upload single file

---

## Tech Stack Rationale Summary

**Simplicity**: Vanilla stack, no build process, single file  
**Performance**: Canvas 2D + requestAnimationFrame = 60 FPS  
**Compatibility**: Standard APIs, wide browser support  
**Maintainability**: No dependencies, straightforward code  
**Deployment**: Static file, simple hosting  
**Security**: No external dependencies, client-side only

---
