# Domain Entities - Kiro Dash

## 1. GameState Entity

### Attributes
```javascript
{
  state: String,              // 'MENU', 'PLAYING', 'GAME_OVER'
  score: Number,              // Current score
  distance: Number,           // Distance traveled in meters
  highScore: Number,          // Best score achieved
  speedMultiplier: Number,    // Current speed multiplier (1.0 - 3.0)
  frameCount: Number,         // Total frames elapsed
  activePowerUps: Array       // Array of ActivePowerUp entities
}
```

### Relationships
- Contains multiple ActivePowerUp entities
- References Player entity
- References EntityManager

---

## 2. Player Entity

### Attributes
```javascript
{
  x: Number,                  // X position (fixed, doesn't move horizontally)
  y: Number,                  // Y position (changes with jump/land)
  lane: Number,               // Current lane (0 = left, 1 = right)
  velocityY: Number,          // Vertical velocity for jump physics
  radius: Number,             // Collision radius (20)
  state: String,              // 'running', 'jumping', 'sliding'
  jumpHoldTime: Number,       // Time space key has been held
  slideTimer: Number,         // Remaining slide duration
  animationFrame: Number,     // Current animation frame
  groundY: Number,            // Y position when on ground
  isOnGround: Boolean         // True if player is on ground
}
```

### Constants
- **INITIAL_JUMP_VELOCITY**: -12
- **GRAVITY**: 0.6
- **MAX_JUMP_HOLD_TIME**: 0.3 seconds
- **SLIDE_DURATION**: 0.5 seconds
- **COLLISION_RADIUS**: 20

### Relationships
- Belongs to GameState
- Checked against Obstacles, Coins, PowerUps for collision

---

## 3. Obstacle Entity

### Attributes
```javascript
{
  x: Number,                  // X position
  y: Number,                  // Y position
  lane: Number,               // Lane (0 or 1)
  type: String,               // 'ground' or 'air'
  width: Number,              // Width (40)
  height: Number,             // Height (40 for ground, 30 for air)
  radius: Number,             // Collision radius (25)
  speed: Number               // Movement speed
}
```

### Types
- **Ground Obstacle**: Requires jump to avoid, positioned at ground level
- **Air Obstacle**: Requires slide to avoid, positioned at jump height

### Constants
- **COLLISION_RADIUS**: 25
- **WIDTH**: 40
- **HEIGHT_GROUND**: 40
- **HEIGHT_AIR**: 30

### Relationships
- Managed by EntityManager
- Checked for collision with Player

---

## 4. Coin Entity

### Attributes
```javascript
{
  x: Number,                  // X position
  y: Number,                  // Y position (mid-height)
  lane: Number,               // Lane (0 or 1)
  radius: Number,             // Collision radius (15)
  collected: Boolean,         // True if collected
  value: Number,              // Point value (10, or 20 with multiplier)
  speed: Number               // Movement speed
}
```

### Constants
- **COLLISION_RADIUS**: 15
- **BASE_VALUE**: 10
- **MULTIPLIED_VALUE**: 20

### Relationships
- Managed by EntityManager
- Checked for collision with Player
- Value affected by Coin Multiplier power-up

---

## 5. PowerUp Entity

### Attributes
```javascript
{
  x: Number,                  // X position
  y: Number,                  // Y position (mid-height)
  lane: Number,               // Lane (0 or 1)
  type: String,               // 'shield', 'speed_boost', 'coin_multiplier', 'magnet'
  radius: Number,             // Collision radius (20)
  collected: Boolean,         // True if collected
  speed: Number               // Movement speed
}
```

### Types
- **shield**: Protects from one collision
- **speed_boost**: Increases game speed temporarily
- **coin_multiplier**: Doubles coin value
- **magnet**: Auto-collects nearby coins

### Constants
- **COLLISION_RADIUS**: 20

### Relationships
- Managed by EntityManager
- Checked for collision with Player
- Creates ActivePowerUp when collected

---

## 6. ActivePowerUp Entity

### Attributes
```javascript
{
  type: String,               // 'shield', 'speed_boost', 'coin_multiplier', 'magnet'
  duration: Number,           // Remaining duration in seconds
  maxDuration: Number,        // Original duration for UI display
  active: Boolean             // True if still active
}
```

### Durations (Time-based)
- **Shield**: 15 seconds
- **Speed Boost**: 10 seconds
- **Coin Multiplier**: 12 seconds
- **Magnet**: 8 seconds

### Relationships
- Contained in GameState.activePowerUps array
- Affects game behavior while active

---

## 7. EntityManager Entity

### Attributes
```javascript
{
  obstacles: Array,           // Array of Obstacle entities
  coins: Array,               // Array of Coin entities
  powerUps: Array,            // Array of PowerUp entities
  obstacleSpawnTimer: Number, // Time until next obstacle spawn
  coinSpawnTimer: Number,     // Time until next coin spawn
  powerUpSpawnTimer: Number   // Time until next power-up spawn
}
```

### Spawn Intervals
- **Obstacles**: 1.5 seconds (base)
- **Coins**: 0.8 seconds (base)
- **Power-ups**: 8 seconds (base)

### Relationships
- Manages collections of Obstacle, Coin, PowerUp entities
- Referenced by GameState

---

## 8. ScoreManager Entity

### Attributes
```javascript
{
  score: Number,              // Current score
  distance: Number,           // Distance in meters
  highScore: Number,          // Best score
  lastMilestone: Number,      // Last milestone reached (for distance scoring)
  coinMultiplier: Number      // Current coin multiplier (1 or 2)
}
```

### Constants
- **MILESTONE_INTERVAL**: 100 meters
- **MILESTONE_POINTS**: 50 points
- **COIN_BASE_VALUE**: 10 points

### Relationships
- Referenced by GameState
- Persists highScore to localStorage

---

## 9. SpeedController Entity

### Attributes
```javascript
{
  baseSpeed: Number,          // Base movement speed (5)
  speedMultiplier: Number,    // Current multiplier (1.0 - 3.0)
  increaseRate: Number,       // Increase per second (0.01)
  maxMultiplier: Number       // Maximum multiplier (3.0)
}
```

### Constants
- **BASE_SPEED**: 5
- **INCREASE_RATE**: 0.01 per second
- **MAX_MULTIPLIER**: 3.0

### Relationships
- Referenced by GameState
- Affects all entity movement speeds

---

## 10. AudioManager Entity

### Attributes
```javascript
{
  jumpSound: Audio,           // Jump sound effect
  collectSound: Audio,        // Coin/power-up collection sound
  collisionSound: Audio,      // Game over sound
  backgroundMusic: Audio,     // Looping background music
  effectsMuted: Boolean,      // Sound effects mute state
  musicMuted: Boolean         // Music mute state
}
```

### Relationships
- Referenced by GameState
- Settings persisted to localStorage

---

## Entity Relationships Diagram

```
GameState
  ├─> Player (1)
  ├─> EntityManager (1)
  │   ├─> Obstacles (0..n)
  │   ├─> Coins (0..n)
  │   └─> PowerUps (0..n)
  ├─> ActivePowerUps (0..n)
  ├─> ScoreManager (1)
  ├─> SpeedController (1)
  └─> AudioManager (1)
```

---

## Entity Summary

**Total Entity Types**: 10  
**Core Entities**: GameState, Player  
**Collectible Entities**: Obstacle, Coin, PowerUp, ActivePowerUp  
**Manager Entities**: EntityManager, ScoreManager, SpeedController, AudioManager

All entities are self-contained with clear responsibilities and minimal coupling.

---
