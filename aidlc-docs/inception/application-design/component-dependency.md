# Component Dependencies - Kiro Dash

## Overview
This document maps dependencies and communication patterns between components in the Kiro Dash game.

---

## Dependency Matrix

### Legend
- **→** : Direct dependency (component A calls methods on component B)
- **←** : Provides data to (component B provides data to component A)
- **↔** : Bidirectional interaction

---

## Component Dependency Graph

```
                                    Game (Orchestrator)
                                         |
                    ┌────────────────────┼────────────────────┐
                    |                    |                    |
                    v                    v                    v
              InputHandler          Renderer            EntityManager
                                        |                    |
                                        |              ┌─────┴─────┐
                                        |              |     |     |
                                        |              v     v     v
                                        |         Obstacle Coin PowerUp
                                        |
                                        v
                                    Player
                                        |
                                        v
                              CollisionDetector
                                        |
                    ┌───────────────────┼───────────────────┐
                    v                   v                   v
              ScoreManager        AudioManager        SpeedController
                    |                   |                   |
                    v                   v                   v
              localStorage          Audio APIs          (internal)
```

---

## Detailed Dependencies

### 1. Game Class Dependencies

**Depends On** (Direct References):
- InputHandler → Queries input state
- Player → Updates and renders player
- EntityManager → Spawns, updates, renders entities
- CollisionDetector → Checks collisions (static methods)
- ScoreManager → Updates score/distance, queries values
- AudioManager → Plays sounds, manages audio
- SpeedController → Updates speed, queries current speed
- UIManager → Renders UI elements
- Renderer → Clears canvas, renders background
- ActivePowerUp → Creates and manages active power-ups

**Provides To**:
- All components (Game is the orchestrator)

**Communication Pattern**: Direct method calls

---

### 2. Player Class Dependencies

**Depends On**:
- None (self-contained entity)

**Provides To**:
- Game → Position, state, collision bounds
- Renderer → Rendering data
- CollisionDetector → Collision bounds

**Communication Pattern**: Query methods (getters)

---

### 3. Obstacle Class Dependencies

**Depends On**:
- None (self-contained entity)

**Provides To**:
- EntityManager → Managed in obstacles array
- Renderer → Rendering data
- CollisionDetector → Collision bounds

**Communication Pattern**: Query methods (getters)

---

### 4. Coin Class Dependencies

**Depends On**:
- None (self-contained entity)

**Provides To**:
- EntityManager → Managed in coins array
- Renderer → Rendering data
- CollisionDetector → Collision bounds

**Communication Pattern**: Query methods (getters)

---

### 5. PowerUp Class Dependencies

**Depends On**:
- None (self-contained entity)

**Provides To**:
- EntityManager → Managed in power-ups array
- Renderer → Rendering data
- CollisionDetector → Collision bounds

**Communication Pattern**: Query methods (getters)

---

### 6. ActivePowerUp Class Dependencies

**Depends On**:
- None (data container)

**Provides To**:
- Game → Power-up state and duration
- UIManager → Display information

**Communication Pattern**: Query methods (getters)

---

### 7. InputHandler Class Dependencies

**Depends On**:
- Browser keyboard events

**Provides To**:
- Game → Input state queries

**Communication Pattern**: Event listeners + query methods

---

### 8. CollisionDetector Class Dependencies

**Depends On**:
- Player → Collision bounds
- Obstacle → Collision bounds
- Coin → Collision bounds
- PowerUp → Collision bounds

**Provides To**:
- Game → Collision detection results

**Communication Pattern**: Static utility methods

---

### 9. Renderer Class Dependencies

**Depends On**:
- Canvas 2D context
- Player → Rendering data
- Obstacle → Rendering data
- Coin → Rendering data
- PowerUp → Rendering data

**Provides To**:
- Game → Rendering services
- UIManager → Drawing primitives

**Communication Pattern**: Command methods (draw operations)

---

### 10. EntityManager Class Dependencies

**Depends On**:
- Obstacle → Creates and manages instances
- Coin → Creates and manages instances
- PowerUp → Creates and manages instances

**Provides To**:
- Game → Entity arrays for collision and rendering

**Communication Pattern**: Factory + collection management

---

### 11. ScoreManager Class Dependencies

**Depends On**:
- localStorage → Persists high score

**Provides To**:
- Game → Score and distance values
- UIManager → Display values

**Communication Pattern**: Command + query methods

---

### 12. AudioManager Class Dependencies

**Depends On**:
- Web Audio API / HTML5 Audio
- localStorage → Persists audio settings

**Provides To**:
- Game → Audio playback services

**Communication Pattern**: Command methods (play/stop)

---

### 13. SpeedController Class Dependencies

**Depends On**:
- None (self-contained logic)

**Provides To**:
- Game → Current speed value
- EntityManager → Speed for entity movement

**Communication Pattern**: Update + query methods

---

### 14. UIManager Class Dependencies

**Depends On**:
- Renderer → Drawing operations

**Provides To**:
- Game → UI rendering services

**Communication Pattern**: Command methods (render UI)

---

## Data Flow Diagrams

### Input Flow
```
Keyboard Event
    ↓
InputHandler (captures)
    ↓
Game (queries InputHandler)
    ↓
Player (receives movement commands)
```

### Collision Flow
```
Game Loop
    ↓
CollisionDetector.checkPlayerObstacle(player, obstacle)
    ↓
Returns: boolean
    ↓
Game (handles result)
    ├─> If collision: gameOver() or remove shield
    └─> If no collision: continue
```

### Scoring Flow
```
Coin Collected
    ↓
Game detects collision
    ↓
ScoreManager.addCoinScore(multiplier)
    ↓
ScoreManager updates internal score
    ↓
UIManager renders updated score
```

### Rendering Flow
```
Game.render()
    ↓
Renderer.clear()
    ↓
Renderer.renderBackground()
    ↓
EntityManager entities → Renderer.renderObstacle/Coin/PowerUp()
    ↓
Player → Renderer.renderPlayer()
    ↓
UIManager.renderHUD() → Renderer drawing methods
```

---

## Dependency Rules

### 1. No Circular Dependencies
- Components do not depend on Game class
- Game depends on all components (one-way)
- Entities are self-contained (no cross-entity dependencies)

### 2. Dependency Direction
- **Top-down**: Game → Systems → Entities
- **Bottom-up**: Entities provide data via getters
- **Horizontal**: No direct entity-to-entity communication

### 3. Communication Patterns
- **Commands**: Game tells components what to do
- **Queries**: Game asks components for data
- **Events**: InputHandler listens to browser events
- **Static Utilities**: CollisionDetector provides pure functions

---

## Potential Circular Dependencies (None)

The architecture is designed to avoid circular dependencies:
- Game orchestrates but components don't reference Game
- Entities are independent and don't reference each other
- Systems provide services without depending on each other

---

## External Dependencies

### Browser APIs
- Canvas 2D Context (for rendering)
- requestAnimationFrame (for game loop)
- localStorage (for persistence)
- Keyboard Events (for input)
- Web Audio API / HTML5 Audio (for sound)

### Assets
- ghosty.png (player sprite)
- jump.wav (jump sound)
- game_over.wav (game over sound)
- Background music (to be sourced)
- Additional sprites/sounds (to be created)

---

## Dependency Summary

**Total Components**: 14  
**Dependency Pattern**: Centralized orchestration (Game class)  
**Circular Dependencies**: None  
**External Dependencies**: Browser APIs + Assets  
**Communication**: Direct method calls (synchronous)

The dependency structure is clean and maintainable, with Game class as the single orchestration point and all other components remaining focused and decoupled.

---
