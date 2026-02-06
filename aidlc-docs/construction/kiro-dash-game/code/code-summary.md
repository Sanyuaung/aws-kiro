# Code Summary - Kiro Dash

## File Structure

```
/aidlc-workshop/
├── index.html          # Complete game (HTML + CSS + JavaScript)
├── assets/
│   ├── ghosty.png     # Player sprite (available)
│   ├── jump.wav       # Jump sound (available)
│   └── game_over.wav  # Game over sound (available)
└── aidlc-docs/        # Documentation only
```

## Classes and Responsibilities

### 1. Player
**Responsibility**: Player character control and physics  
**Key Methods**: `switchLane()`, `jump()`, `slide()`, `update()`, `render()`  
**State**: Position, lane, velocity, jump/slide state

### 2. Obstacle
**Responsibility**: Obstacle entities (ground and air types)  
**Key Methods**: `update()`, `isOffScreen()`, `getCollisionBounds()`, `render()`  
**Types**: Ground (requires jump), Air (requires slide)

### 3. Coin
**Responsibility**: Collectible coins for scoring  
**Key Methods**: `update()`, `isOffScreen()`, `getCollisionBounds()`, `render()`  
**Value**: 10 points (20 with multiplier)

### 4. PowerUp
**Responsibility**: Collectible power-ups with special effects  
**Key Methods**: `update()`, `isOffScreen()`, `getCollisionBounds()`, `render()`  
**Types**: Shield, Speed Boost, Coin Multiplier, Magnet

### 5. ActivePowerUp
**Responsibility**: Track active power-up effects and durations  
**Key Methods**: `update()`, `isExpired()`  
**Durations**: 8-15 seconds (time-based)

### 6. EntityManager
**Responsibility**: Spawn and manage all game entities  
**Key Methods**: `updateSpawning()`, `updateAll()`, `clearAll()`  
**Manages**: Obstacles, coins, power-ups arrays

### 7. CollisionDetector
**Responsibility**: Circle-based collision detection  
**Key Methods**: `static checkCircle()`  
**Algorithm**: Distance-based circle collision

### 8. ScoreManager
**Responsibility**: Score, distance, and high score tracking  
**Key Methods**: `addCoinScore()`, `updateDistance()`, `updateHighScore()`  
**Persistence**: High score saved to localStorage

### 9. AudioManager
**Responsibility**: Sound effects playback  
**Key Methods**: `play()`  
**Sounds**: Jump, game over

### 10. SpeedController
**Responsibility**: Progressive speed increase  
**Key Methods**: `update()`, `getCurrentSpeed()`, `reset()`  
**Progression**: 0.01/sec increase, max 3x base speed

### 11. Game
**Responsibility**: Main orchestrator and game loop  
**Key Methods**: `start()`, `update()`, `render()`, `gameLoop()`, `restart()`, `gameOver()`  
**States**: MENU, PLAYING, GAME_OVER

## Key Algorithms

### Variable Jump Physics
```
On Space press: Apply initial upward velocity (-12)
While held (max 0.3s): Continue upward force
Always: Apply gravity (0.6 downward)
On ground contact: Reset to running state
```

### Collision Detection
```
For each entity:
  distance = sqrt((x1-x2)² + (y1-y2)²)
  collision = distance < (radius1 + radius2)
```

### Spawning Logic
```
Obstacles: Every 1.5s / speedMultiplier
Coins: Every 0.8s / speedMultiplier
Power-ups: Every 8s / speedMultiplier
Random lane selection (50/50)
```

### Scoring
```
Distance milestones: 50 points per 100 meters
Coins: 10 points each (20 with multiplier)
Total score = milestone points + coin points
```

## Configuration Parameters

All tunable parameters in CONFIG object:
- **Physics**: GRAVITY (0.6), JUMP_VELOCITY (-12)
- **Speed**: BASE_SPEED (5), SPEED_INCREASE (0.01/sec), MAX_SPEED_MULT (3.0)
- **Spawning**: OBSTACLE_INTERVAL (1.5s), COIN_INTERVAL (0.8s), POWERUP_INTERVAL (8s)
- **Collision**: PLAYER_RADIUS (20), OBSTACLE_RADIUS (25), COIN_RADIUS (15)
- **Scoring**: COIN_VALUE (10), MILESTONE_INTERVAL (100m), MILESTONE_POINTS (50)

## Usage Instructions

### To Play
1. Open `index.html` in a modern web browser
2. Press SPACE to start
3. Use Arrow Keys or A/D to switch lanes
4. Press SPACE to jump
5. Press Up/Down arrows to slide
6. Collect coins and power-ups
7. Avoid obstacles
8. Press SPACE to restart after game over

### Controls
- **Arrow Left / A**: Move to left lane
- **Arrow Right / D**: Move to right lane
- **Space**: Jump (hold for higher jump)
- **Arrow Up / Down**: Slide under air obstacles
- **Space** (on game over): Restart

### Power-ups
- **Shield** (cyan square): Absorbs one collision
- **Speed Boost** (red square): Increases game speed temporarily
- **Coin Multiplier** (yellow square): Doubles coin value
- **Magnet** (green square): Auto-collects nearby coins

## Browser Requirements
- HTML5 Canvas support
- JavaScript ES6+ support
- localStorage API (for high score)
- Web Audio API (for sounds)

## Performance
- Target: 60 FPS
- Optimizations: Entity cleanup, spatial culling, efficient rendering
- Memory: Stable usage, no leaks

---
