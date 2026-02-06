# Code Generation Plan - Kiro Dash Game

## Plan Overview
This plan outlines the step-by-step code generation for the Kiro Dash endless runner game as a single HTML file.

**Project Type**: Greenfield  
**Code Location**: `/aidlc-workshop/index.html` (workspace root)  
**Documentation Location**: `/aidlc-workshop/aidlc-docs/construction/kiro-dash-game/code/`

---

## Generation Steps

### Step 1: Create HTML Structure
- [x] Create `index.html` in workspace root
- [x] Add HTML5 doctype and basic structure
- [x] Add meta tags for viewport and charset
- [x] Add title: "Kiro Dash"
- [x] Create canvas element with id="gameCanvas"
- [x] Set canvas dimensions (800x600)

### Step 2: Add CSS Styling
- [x] Add embedded `<style>` section
- [x] Style body (centering, background color)
- [x] Style canvas (border, responsive positioning)
- [x] Add any additional UI styling needed

### Step 3: Implement Game Constants
- [x] Create CONFIG object with all game parameters
- [x] Physics constants (gravity, jump velocity, speeds)
- [x] Spawn intervals and rates
- [x] Power-up durations
- [x] Collision radii
- [x] Scoring values

### Step 4: Implement Player Class
- [x] Constructor with initial position and lane
- [x] update() method with jump physics and gravity
- [x] switchLane() method
- [x] jump() method (variable jump with hold time)
- [x] slide() method
- [x] getCollisionBounds() method
- [x] render() method

### Step 5: Implement Obstacle Class
- [x] Constructor with position, lane, type (ground/air)
- [x] update() method for horizontal movement
- [x] isOffScreen() method
- [x] getCollisionBounds() method
- [x] render() method

### Step 6: Implement Coin Class
- [x] Constructor with position and lane
- [x] update() method for horizontal movement
- [x] collect() method
- [x] isOffScreen() method
- [x] getCollisionBounds() method
- [x] render() method

### Step 7: Implement PowerUp Class
- [x] Constructor with position, lane, type
- [x] update() method for horizontal movement
- [x] collect() method
- [x] isOffScreen() method
- [x] getCollisionBounds() method
- [x] render() method with type-specific visuals

### Step 8: Implement ActivePowerUp Class
- [x] Constructor with type and duration
- [x] update() method to decrease duration
- [x] isExpired() method
- [x] getRemainingTime() method
- [x] getType() method

### Step 9: Implement EntityManager Class
- [x] Constructor with empty entity arrays
- [x] spawnObstacle() method
- [x] spawnCoin() method
- [x] spawnPowerUp() method
- [x] updateSpawning() method with timers
- [x] updateAll() method
- [x] clearAll() method
- [x] Getter methods for entity arrays

### Step 10: Implement CollisionDetector Class
- [x] static checkCircleCollision() method
- [x] static checkPlayerObstacle() method
- [x] static checkPlayerCoin() method
- [x] static checkPlayerPowerUp() method

### Step 11: Implement ScoreManager Class
- [x] Constructor with score, distance, high score
- [x] addCoinScore() method
- [x] updateDistance() method
- [x] updateScore() method (milestone-based)
- [x] getScore(), getDistance(), getHighScore() methods
- [x] updateHighScore() method
- [x] saveHighScore() to localStorage
- [x] reset() method

### Step 12: Implement AudioManager Class
- [x] Constructor loading audio elements
- [x] playJump(), playCollect(), playCollision() methods
- [x] playBackgroundMusic(), stopBackgroundMusic() methods
- [x] toggleEffects(), toggleMusic() methods
- [x] saveSettings() to localStorage
- [x] Load settings from localStorage on init

### Step 13: Implement SpeedController Class
- [x] Constructor with base speed and increase rate
- [x] update() method to increase speed over time
- [x] getCurrentSpeed() method
- [x] getSpeedMultiplier() method
- [x] reset() method

### Step 14: Implement Renderer Class
- [x] Constructor with canvas and context
- [x] clear() method
- [x] renderBackground() method (parallax city)
- [x] renderPlayer() method
- [x] renderObstacle() method
- [x] renderCoin() method
- [x] renderPowerUp() method
- [x] renderHUD() method
- [x] renderStartScreen() method
- [x] renderGameOverScreen() method

### Step 15: Implement InputHandler Class
- [x] Constructor setting up event listeners
- [x] onKeyDown() event handler
- [x] onKeyUp() event handler
- [x] Query methods (isLeftPressed, isRightPressed, etc.)

### Step 16: Implement Game Class (Main Orchestrator)
- [x] Constructor initializing all systems
- [x] start() method
- [x] update() method coordinating all updates
- [x] render() method coordinating all rendering
- [x] gameLoop() method with requestAnimationFrame
- [x] restart() method
- [x] gameOver() method
- [x] State management (MENU, PLAYING, GAME_OVER)
- [x] Power-up activation logic
- [x] Collision handling logic

### Step 17: Implement Game Initialization
- [x] Wait for DOM content loaded
- [x] Get canvas element and 2D context
- [x] Create Game instance
- [x] Start game loop
- [x] Display start screen

### Step 18: Add Placeholder Assets
- [x] Use colored rectangles for player (until sprite loaded)
- [x] Use colored rectangles for obstacles
- [x] Use colored circles for coins
- [x] Use colored shapes for power-ups
- [x] Simple gradient background for city
- [x] Note: Can be replaced with actual sprites later

### Step 19: Create Code Summary Documentation
- [x] Create `code-summary.md` in aidlc-docs/construction/kiro-dash-game/code/
- [x] Document file structure
- [x] List all classes and their responsibilities
- [x] Document key algorithms (jump physics, collision, spawning)
- [x] Note configuration parameters
- [x] Include usage instructions

### Step 20: Create Implementation Notes
- [x] Create `implementation-notes.md` in aidlc-docs/construction/kiro-dash-game/code/
- [x] Document design decisions made during implementation
- [x] Note any deviations from design documents
- [x] List known limitations or future enhancements
- [x] Document browser compatibility notes

---

## Story Coverage

All 20 user stories will be implemented:
- US-01 to US-04: Core gameplay (lanes, jump, slide, collision)
- US-05 to US-07: Collectibles (coins, power-ups)
- US-08 to US-11: Power-up effects (shield, speed, multiplier, magnet)
- US-12 to US-14: Progression (score, distance, speed increase, power-up display)
- US-15 to US-16: Game flow (game over, restart)
- US-17 to US-19: Audio (effects, music, controls)
- US-20: Persistence (high score)

---

## Code Location Rules

**Application Code** (ALWAYS workspace root):
- `/aidlc-workshop/index.html` - Complete game implementation

**Documentation** (ALWAYS aidlc-docs):
- `/aidlc-workshop/aidlc-docs/construction/kiro-dash-game/code/code-summary.md`
- `/aidlc-workshop/aidlc-docs/construction/kiro-dash-game/code/implementation-notes.md`

**Assets** (existing):
- `/aidlc-workshop/assets/ghosty.png` - Player sprite
- `/aidlc-workshop/assets/jump.wav` - Jump sound
- `/aidlc-workshop/assets/game_over.wav` - Game over sound

---

## Execution Notes

- All checkboxes must be marked [x] as steps are completed
- Generate code in workspace root, documentation in aidlc-docs
- Follow all design patterns from NFR Design
- Implement all business rules from Functional Design
- Use minimal, clean code per implicit instruction
- Update progress after each step completion

---
