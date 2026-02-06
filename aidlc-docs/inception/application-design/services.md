# Services - Kiro Dash

## Overview
This document defines the service layer for Kiro Dash. Given the single-file game architecture, the service layer is minimal, with the Game class acting as the primary orchestrator.

---

## Service Architecture

### Single-File Game Pattern
For this implementation, a traditional multi-tier service layer is not needed. Instead:
- **Game class** acts as the main orchestrator/service
- **Component classes** provide focused functionality
- **Direct method calls** between components (no service abstraction layer)

---

## Primary Service: Game Class

### Role
The Game class serves as the central orchestration service, coordinating all game systems and components.

### Orchestration Responsibilities

#### 1. Initialization Orchestration
```
Game.constructor()
  ├─> Create InputHandler
  ├─> Create Renderer (with canvas)
  ├─> Create Player
  ├─> Create EntityManager
  ├─> Create CollisionDetector
  ├─> Create ScoreManager
  ├─> Create AudioManager
  ├─> Create SpeedController
  └─> Create UIManager
```

#### 2. Game Loop Orchestration
```
Game.gameLoop()
  ├─> Calculate deltaTime
  ├─> Game.update(deltaTime)
  │   ├─> InputHandler: Check inputs
  │   ├─> Player: Update based on inputs
  │   ├─> EntityManager: Update all entities
  │   ├─> SpeedController: Update speed
  │   ├─> CollisionDetector: Check collisions
  │   ├─> ScoreManager: Update score/distance
  │   ├─> AudioManager: Play sounds as needed
  │   └─> Game: Update active power-ups
  └─> Game.render()
      ├─> Renderer: Clear canvas
      ├─> Renderer: Draw background
      ├─> EntityManager: Render all entities
      ├─> Player: Render
      └─> UIManager: Render UI
```

#### 3. State Transition Orchestration
```
Game State Transitions:
  MENU → PLAYING (on start)
  PLAYING → GAME_OVER (on collision)
  GAME_OVER → PLAYING (on restart)
```

#### 4. Event Orchestration
```
Input Events:
  InputHandler detects → Game processes → Components react

Collision Events:
  CollisionDetector checks → Game handles → Audio/Score/State update

Power-up Events:
  Collision detected → Game activates → ActivePowerUp created → Effects applied
```

---

## Component Interaction Patterns

### Pattern 1: Direct Component Access
Game class holds references to all components and calls methods directly.

**Example**:
```javascript
// Game class orchestrates player movement
if (this.inputHandler.isLeftPressed()) {
    this.player.switchLane(0);
}
```

### Pattern 2: Query-Response
Components provide query methods, Game class uses responses for decisions.

**Example**:
```javascript
// Game queries collision detector
if (CollisionDetector.checkPlayerObstacle(this.player, obstacle)) {
    this.gameOver();
}
```

### Pattern 3: Command Pattern
Game class issues commands to components based on game logic.

**Example**:
```javascript
// Game commands audio manager
this.audioManager.playJump();
```

### Pattern 4: Observer Pattern (Implicit)
Game class monitors state changes and triggers appropriate responses.

**Example**:
```javascript
// Game observes score changes and updates high score
if (this.scoreManager.getScore() > this.scoreManager.getHighScore()) {
    this.scoreManager.updateHighScore();
}
```

---

## Service Interactions

### Initialization Flow
```
1. Game created with canvas
2. Game creates all component instances
3. Game loads persisted data (high score, audio settings)
4. Game sets up event listeners via InputHandler
5. Game starts game loop
```

### Update Flow (Each Frame)
```
1. Game receives frame timestamp
2. Game calculates deltaTime
3. Game checks current state (MENU, PLAYING, GAME_OVER)
4. If PLAYING:
   a. Process input via InputHandler
   b. Update Player based on input
   c. Update SpeedController
   d. Update EntityManager (spawn, move, cleanup entities)
   e. Check collisions via CollisionDetector
   f. Handle collision results (collect items, game over)
   g. Update ScoreManager
   h. Update ActivePowerUps
5. Render via Renderer and UIManager
```

### Collision Handling Flow
```
1. Game iterates through obstacles
2. CollisionDetector checks player vs each obstacle
3. If collision:
   a. Check if shield active
   b. If shield: Remove shield, continue
   c. If no shield: Call gameOver()
4. Game iterates through coins
5. CollisionDetector checks player vs each coin
6. If collision:
   a. Mark coin as collected
   b. ScoreManager adds coin score (with multiplier)
   c. AudioManager plays collect sound
7. Game iterates through power-ups
8. CollisionDetector checks player vs each power-up
9. If collision:
   a. Mark power-up as collected
   b. Game activates power-up effect
   c. AudioManager plays collect sound
```

### Power-up Activation Flow
```
1. Power-up collected
2. Game determines power-up type
3. Game creates ActivePowerUp with duration
4. Game applies immediate effects:
   - Shield: Add to active list
   - Speed Boost: Increase SpeedController multiplier
   - Coin Multiplier: Set multiplier in ScoreManager
   - Magnet: Add to active list (affects coin collection)
5. ActivePowerUp added to active list for UI display
6. Each frame, Game updates ActivePowerUps
7. When expired, Game removes effects
```

---

## Service Boundaries

### What Game Class Orchestrates
- Component lifecycle (creation, initialization)
- Game state management
- Frame-by-frame update coordination
- Collision detection coordination
- Event handling coordination
- State transitions

### What Components Handle Independently
- Player: Own physics and animation
- Entities: Own movement and rendering
- Renderer: Drawing operations
- AudioManager: Audio playback
- ScoreManager: Score calculations
- InputHandler: Keyboard events

---

## No External Services

This game does not require:
- Backend API services
- Database services
- Authentication services
- Network services
- Third-party integrations

All functionality is self-contained in the browser.

---

## Service Summary

**Primary Service**: Game class (orchestrator)  
**Service Pattern**: Direct component coordination  
**Communication**: Synchronous method calls  
**State Management**: Centralized in Game class  
**No External Services**: Fully client-side

The Game class acts as the single service layer, providing a clean orchestration point for all game systems while keeping components focused and decoupled.

---
