# NFR Design Patterns - Kiro Dash

## Performance Optimization Patterns

### Pattern 1: Efficient Game Loop
**Pattern**: Fixed timestep with variable rendering
**Implementation**:
```javascript
let lastTime = 0;
const targetFPS = 60;
const targetFrameTime = 1000 / targetFPS;

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;
    
    update(deltaTime);
    render();
    
    requestAnimationFrame(gameLoop);
}
```
**Benefits**: Consistent physics, smooth rendering, browser-optimized

### Pattern 2: Object Pooling (Simplified)
**Pattern**: Reuse entity objects instead of creating/destroying
**Implementation**: Mark entities as inactive instead of removing
**Benefits**: Reduce garbage collection, stable memory usage
**Note**: For this game, simple array cleanup is sufficient given entity count

### Pattern 3: Spatial Culling
**Pattern**: Only render entities within canvas bounds
**Implementation**:
```javascript
if (entity.x + entity.width < 0 || entity.x > canvas.width) {
    continue; // Skip rendering off-screen entities
}
```
**Benefits**: Reduce draw calls, improve rendering performance

### Pattern 4: Minimize Canvas State Changes
**Pattern**: Batch similar drawing operations
**Implementation**:
- Draw all obstacles, then all coins, then all power-ups
- Minimize fillStyle/strokeStyle changes
**Benefits**: Reduce canvas API overhead

---

## Memory Management Patterns

### Pattern 5: Entity Cleanup
**Pattern**: Remove off-screen entities promptly
**Implementation**:
```javascript
obstacles = obstacles.filter(obs => obs.x > -obs.width);
coins = coins.filter(coin => coin.x > -coin.radius);
powerUps = powerUps.filter(pu => pu.x > -pu.radius);
```
**Benefits**: Prevent memory growth, maintain performance

### Pattern 6: Avoid Memory Leaks
**Pattern**: Proper event listener cleanup
**Implementation**:
- Use named functions for event listeners
- Remove listeners on game restart if needed
- Avoid creating new closures in loops
**Benefits**: Stable memory usage over time

---

## Rendering Optimization Patterns

### Pattern 7: Immediate Mode Rendering
**Pattern**: Clear and redraw entire canvas each frame
**Implementation**:
```javascript
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBackground();
    renderEntities();
    renderPlayer();
    renderUI();
}
```
**Benefits**: Simple, predictable, sufficient for 2D game

### Pattern 8: Layered Rendering Order
**Pattern**: Render in back-to-front order
**Implementation**:
1. Background (parallax layers)
2. Entities (obstacles, coins, power-ups)
3. Player
4. UI (HUD, overlays)
**Benefits**: Correct visual layering, no z-fighting

### Pattern 9: Canvas Scaling
**Pattern**: Scale canvas to fit screen while maintaining aspect ratio
**Implementation**:
```javascript
const scale = Math.min(
    window.innerWidth / baseWidth,
    window.innerHeight / baseHeight
);
canvas.style.transform = `scale(${scale})`;
```
**Benefits**: Responsive design, maintain game proportions

---

## Input Handling Patterns

### Pattern 10: Event-Driven Input
**Pattern**: Capture keyboard events, query state in game loop
**Implementation**:
```javascript
const keys = {};
window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

// In update loop
if (keys['ArrowLeft'] || keys['KeyA']) player.switchLane(0);
```
**Benefits**: Responsive, handles multiple simultaneous inputs

### Pattern 11: Input Buffering (Optional)
**Pattern**: Queue inputs if needed for precise timing
**Implementation**: Not needed for this game (instant response preferred)
**Benefits**: N/A for this use case

---

## Audio Optimization Patterns

### Pattern 12: Audio Preloading
**Pattern**: Load all audio assets on game init
**Implementation**:
```javascript
const sounds = {
    jump: new Audio('assets/jump.wav'),
    collect: new Audio('assets/collect.wav'),
    gameOver: new Audio('assets/game_over.wav')
};
// Preload
Object.values(sounds).forEach(audio => audio.load());
```
**Benefits**: No loading delay during gameplay

### Pattern 13: Audio Pooling for Rapid Sounds
**Pattern**: Clone audio elements for overlapping sounds
**Implementation**:
```javascript
function playSound(audio) {
    const clone = audio.cloneNode();
    clone.play();
}
```
**Benefits**: Allow multiple simultaneous sound effects

---

## Collision Detection Optimization

### Pattern 14: Broad Phase Culling
**Pattern**: Only check collisions for entities in same lane
**Implementation**:
```javascript
const sameLineObstacles = obstacles.filter(obs => obs.lane === player.lane);
sameLineObstacles.forEach(obs => checkCollision(player, obs));
```
**Benefits**: Reduce collision checks by ~50%

### Pattern 15: Early Exit on Collision
**Pattern**: Stop checking once collision found
**Implementation**:
```javascript
for (const obstacle of obstacles) {
    if (checkCollision(player, obstacle)) {
        gameOver();
        return; // Early exit
    }
}
```
**Benefits**: Avoid unnecessary checks after game over

---

## Code Organization Patterns

### Pattern 16: Class-Based Architecture
**Pattern**: Encapsulate entities and systems in classes
**Implementation**:
```javascript
class Player {
    constructor(x, y) { /* ... */ }
    update(deltaTime) { /* ... */ }
    render(ctx) { /* ... */ }
}
```
**Benefits**: Clear responsibilities, maintainable code

### Pattern 17: Configuration Constants
**Pattern**: Centralize tunable parameters
**Implementation**:
```javascript
const CONFIG = {
    GRAVITY: 0.6,
    JUMP_VELOCITY: -12,
    BASE_SPEED: 5,
    SPAWN_INTERVAL_OBSTACLE: 1.5,
    // ... more constants
};
```
**Benefits**: Easy tuning, clear parameters

---

## Error Handling Patterns

### Pattern 18: Graceful Degradation
**Pattern**: Continue game even if non-critical features fail
**Implementation**:
```javascript
try {
    audio.play();
} catch (e) {
    console.warn('Audio playback failed:', e);
    // Continue without audio
}
```
**Benefits**: Robust gameplay experience

### Pattern 19: Asset Loading Fallbacks
**Pattern**: Use colored shapes if images fail to load
**Implementation**:
```javascript
if (!spriteImage.complete || spriteImage.naturalHeight === 0) {
    // Draw colored rectangle instead
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(x, y, width, height);
}
```
**Benefits**: Game remains playable

---

## Persistence Patterns

### Pattern 20: localStorage Wrapper
**Pattern**: Wrap localStorage with error handling
**Implementation**:
```javascript
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('localStorage save failed:', e);
    }
}
```
**Benefits**: Handle quota exceeded, unavailable storage

---

## Browser Compatibility Patterns

### Pattern 21: Feature Detection
**Pattern**: Check for required APIs before use
**Implementation**:
```javascript
if (!window.requestAnimationFrame) {
    alert('Browser not supported');
    return;
}
```
**Benefits**: Clear error messages for unsupported browsers

### Pattern 22: Vendor Prefix Handling (Not Needed)
**Pattern**: Handle vendor prefixes for APIs
**Implementation**: Not needed - all target browsers support standard APIs
**Benefits**: N/A for modern browsers

---

## Testing Patterns

### Pattern 23: Console Logging for Debug
**Pattern**: Use console.log for development debugging
**Implementation**:
```javascript
const DEBUG = false;
if (DEBUG) console.log('Player position:', player.x, player.y);
```
**Benefits**: Easy debugging, removable for production

### Pattern 24: Performance Monitoring
**Pattern**: Track frame times for performance analysis
**Implementation**:
```javascript
const frameTimes = [];
function trackFrameTime(deltaTime) {
    frameTimes.push(deltaTime);
    if (frameTimes.length > 60) frameTimes.shift();
    const avgFPS = 1 / (frameTimes.reduce((a,b) => a+b) / frameTimes.length);
}
```
**Benefits**: Identify performance issues

---

## Pattern Summary

**Performance**: 9 patterns (game loop, culling, batching, cleanup)  
**Memory**: 2 patterns (entity cleanup, leak prevention)  
**Rendering**: 3 patterns (immediate mode, layering, scaling)  
**Input**: 2 patterns (event-driven, state query)  
**Audio**: 2 patterns (preloading, pooling)  
**Collision**: 2 patterns (broad phase, early exit)  
**Code**: 2 patterns (classes, configuration)  
**Error**: 2 patterns (graceful degradation, fallbacks)  
**Persistence**: 1 pattern (localStorage wrapper)  
**Compatibility**: 2 patterns (feature detection)  
**Testing**: 2 patterns (debug logging, performance monitoring)

**Total**: 24 design patterns for NFR implementation

---
