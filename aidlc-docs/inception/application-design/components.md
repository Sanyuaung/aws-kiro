# Components - Kiro Dash

## Overview
This document defines the main components of the Kiro Dash game using an Object-Oriented architecture with global game state management.

---

## Core Game Components

### 1. Game
**Purpose**: Main game controller and state manager

**Responsibilities**:
- Initialize game systems and components
- Manage global game state (MENU, PLAYING, GAME_OVER)
- Coordinate game loop (update and render cycles)
- Handle game start, restart, and game over logic
- Manage game speed progression
- Track score and distance

**State Data**:
- Current game state (menu, playing, game over)
- Score and distance
- High score
- Game speed multiplier
- Active power-ups list
- Frame counter

---

### 2. Player
**Purpose**: Represents Kiro, the player character

**Responsibilities**:
- Manage player position and movement
- Handle lane switching (left/right)
- Handle jumping mechanics
- Handle sliding mechanics
- Track player state (running, jumping, sliding)
- Manage player animation state
- Provide collision bounds for detection

**State Data**:
- Position (x, y)
- Current lane (0 = left, 1 = right)
- Velocity (vertical for jumping)
- Current action (running, jumping, sliding)
- Animation frame
- Collision radius

---

### 3. Obstacle
**Purpose**: Represents obstacles that the player must avoid

**Responsibilities**:
- Move horizontally across screen
- Provide collision bounds
- Render obstacle sprite/shape
- Determine if off-screen (for cleanup)

**State Data**:
- Position (x, y)
- Type (ground or air)
- Lane (0 = left, 1 = right)
- Width and height
- Collision radius
- Speed

**Types**:
- Ground obstacles (require jump)
- Air obstacles (require slide)

---

### 4. Coin
**Purpose**: Represents collectible coins for scoring

**Responsibilities**:
- Move horizontally across screen
- Provide collision bounds
- Render coin sprite/shape
- Determine if off-screen (for cleanup)
- Track if collected

**State Data**:
- Position (x, y)
- Lane (0 = left, 1 = right)
- Collision radius
- Collected flag
- Speed

---

### 5. PowerUp
**Purpose**: Represents collectible power-ups with special effects

**Responsibilities**:
- Move horizontally across screen
- Provide collision bounds
- Render power-up sprite/shape based on type
- Determine if off-screen (for cleanup)
- Track if collected

**State Data**:
- Position (x, y)
- Lane (0 = left, 1 = right)
- Type (shield, speed_boost, coin_multiplier, magnet)
- Collision radius
- Collected flag
- Speed

**Types**:
- Shield: Protects from one collision
- Speed Boost: Temporarily increases game speed
- Coin Multiplier: Multiplies coin value
- Magnet: Auto-collects nearby coins

---

### 6. ActivePowerUp
**Purpose**: Tracks active power-up effects and durations

**Responsibilities**:
- Track power-up type and remaining duration
- Update duration each frame
- Determine if expired
- Provide UI display information

**State Data**:
- Type (shield, speed_boost, coin_multiplier, magnet)
- Duration remaining (frames or seconds)
- Effect multiplier (for coin multiplier)
- Active flag

---

## System Components

### 7. InputHandler
**Purpose**: Manages keyboard input and control mapping

**Responsibilities**:
- Listen for keyboard events
- Map keys to game actions (lane switch, jump, slide, restart)
- Provide input state to game systems
- Handle key press and release events

**State Data**:
- Key states (pressed/released)
- Input queue for buffering

**Controls**:
- Arrow Left / A: Move to left lane
- Arrow Right / D: Move to right lane
- Space: Jump
- Arrow Up / Down: Slide
- Space / Click: Restart (on game over)

---

### 8. CollisionDetector
**Purpose**: Detects collisions between game entities

**Responsibilities**:
- Check player vs obstacles (circle collision)
- Check player vs coins (circle collision)
- Check player vs power-ups (circle collision)
- Return collision results

**Algorithm**: Circle-to-circle collision detection using distance calculation

---

### 9. Renderer
**Purpose**: Handles all canvas drawing operations

**Responsibilities**:
- Clear canvas each frame
- Render background (parallax city layers)
- Render player sprite/animation
- Render obstacles
- Render coins
- Render power-ups
- Render UI (score, distance, power-up indicators)
- Render game over screen
- Render start screen

**Rendering Mode**: Immediate mode (redraw everything every frame)

---

### 10. EntityManager
**Purpose**: Manages collections of game entities

**Responsibilities**:
- Store arrays of obstacles, coins, and power-ups
- Spawn new entities based on game rules
- Update all entities each frame
- Remove off-screen entities
- Provide entity lists for collision detection and rendering

**State Data**:
- Obstacles array
- Coins array
- Power-ups array
- Spawn timers and counters

---

### 11. ScoreManager
**Purpose**: Manages scoring and distance tracking

**Responsibilities**:
- Calculate score from distance and collectibles
- Track distance traveled
- Apply coin multiplier effects
- Update high score
- Persist high score to localStorage

**State Data**:
- Current score
- Distance traveled
- High score
- Coin multiplier value

---

### 12. AudioManager
**Purpose**: Manages sound effects and background music

**Responsibilities**:
- Load audio assets
- Play sound effects (jump, collect, collision)
- Play/stop background music
- Handle mute/unmute for effects and music separately
- Persist audio settings to localStorage

**State Data**:
- Audio elements (jump, collect, collision, game over, background music)
- Mute states (effects muted, music muted)

---

### 13. SpeedController
**Purpose**: Manages game speed progression

**Responsibilities**:
- Gradually increase game speed over time
- Calculate current speed multiplier
- Apply speed to entity movement
- Adjust spawn rates based on speed

**State Data**:
- Base speed
- Current speed multiplier
- Speed increase rate

---

### 14. UIManager
**Purpose**: Manages UI elements and overlays

**Responsibilities**:
- Render HUD (score, distance, power-ups)
- Render start screen
- Render game over screen with stats
- Handle UI interactions (restart button)

**State Data**:
- UI element positions
- Font sizes and styles
- Button bounds for click detection

---

## Component Summary

**Entity Components** (7):
- Game, Player, Obstacle, Coin, PowerUp, ActivePowerUp

**System Components** (7):
- InputHandler, CollisionDetector, Renderer, EntityManager, ScoreManager, AudioManager, SpeedController, UIManager

**Total Components**: 14

---

## Architecture Notes

- **Object-Oriented Design**: Each component is a class with encapsulated state and behavior
- **Global State**: Game class holds global state and coordinates all systems
- **Immediate Rendering**: Renderer redraws entire scene every frame
- **Circle Collision**: Simple and efficient for 2D endless runner
- **Array-Based Entities**: Simple array management for obstacles, coins, power-ups

---
