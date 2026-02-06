# Business Logic Model - Kiro Dash

## Game State Machine

### States
1. **MENU** - Start screen
2. **PLAYING** - Active gameplay
3. **GAME_OVER** - Game ended

### State Transitions
```
MENU → PLAYING (on start button/space press)
PLAYING → GAME_OVER (on collision without shield)
GAME_OVER → PLAYING (on restart)
```

---

## Player Movement Logic

### Lane Switching
- **Input**: Left/Right arrow or A/D keys
- **Logic**: Instant lane switch between lane 0 (left) and lane 1 (right)
- **Constraint**: Cannot switch if already in target lane

### Jump Mechanics (Variable Jump)
- **Input**: Space key press and hold
- **Logic**:
  - On key press: Apply initial upward velocity
  - While held (up to max duration): Continue applying upward force
  - On key release or max duration: Stop upward force, gravity takes over
  - Gravity constantly pulls player down
- **Parameters**:
  - Initial jump velocity: -12 (upward)
  - Gravity: 0.6 (downward acceleration)
  - Max jump hold time: 0.3 seconds
  - Ground level: Fixed Y position
- **Constraint**: Can only jump when on ground

### Slide Mechanics
- **Input**: Up/Down arrow key press
- **Logic**:
  - On key press: Enter slide state, reduce player height
  - Fixed slide duration: 0.5 seconds
  - After duration: Return to normal running state
- **Constraint**: Cannot slide while jumping

---

## Obstacle Spawning Logic

### Spawn Timing
- **Base spawn interval**: 1.5 seconds
- **Adjusted by speed**: interval / speedMultiplier
- **Randomization**: ±20% variance

### Spawn Parameters
- **Lane**: Random (0 or 1)
- **Type**: Random (ground 60%, air 40%)
- **Position**: Right edge of screen (x = canvas.width)
- **Y Position**:
  - Ground obstacles: Ground level
  - Air obstacles: Jump height level

### Movement
- **Speed**: baseSpeed × speedMultiplier
- **Direction**: Left (toward player)
- **Cleanup**: Remove when x < -obstacleWidth

---

## Collectible Spawning Logic

### Coin Spawning
- **Spawn interval**: 0.8 seconds (adjusted by speed)
- **Lane**: Random (0 or 1)
- **Position**: Right edge of screen
- **Y Position**: Mid-height (collectible level)
- **Movement**: Same as obstacles
- **Value**: 10 points (before multiplier)

### Power-up Spawning
- **Spawn interval**: 8 seconds (adjusted by speed)
- **Type Distribution**:
  - Shield: 30%
  - Speed Boost: 25%
  - Coin Multiplier: 25%
  - Magnet: 20%
- **Lane**: Random (0 or 1)
- **Position**: Right edge of screen
- **Movement**: Same as obstacles

---

## Collision Detection Algorithm

### Circle-to-Circle Collision
```
distance = sqrt((x1 - x2)² + (y1 - y2)²)
collision = distance < (radius1 + radius2)
```

### Collision Radii
- Player: 20 pixels
- Obstacles: 25 pixels
- Coins: 15 pixels
- Power-ups: 20 pixels

### Collision Checks (per frame)
1. Player vs all obstacles
2. Player vs all coins
3. Player vs all power-ups

---

## Power-up Activation Logic

### Shield Power-up
- **Effect**: Absorb next collision
- **Duration**: 15 seconds (time-based)
- **Logic**:
  - On collision with obstacle: Remove shield, continue game
  - Shield expires after duration or one use

### Speed Boost Power-up
- **Effect**: Increase game speed by 50%
- **Duration**: 10 seconds (time-based)
- **Logic**:
  - Multiply speedMultiplier by 1.5
  - After duration: Return to normal speed progression

### Coin Multiplier Power-up
- **Effect**: Double coin value
- **Duration**: 12 seconds (time-based)
- **Logic**:
  - Coins collected worth 20 points instead of 10
  - Applies to all coins collected during duration

### Magnet Power-up
- **Effect**: Auto-collect coins within range
- **Duration**: 8 seconds (time-based)
- **Logic**:
  - Check distance to all coins
  - If distance < magnetRange (100 pixels): Collect coin
  - No need for direct collision

---

## Scoring Logic (Simple Additive)

### Distance Scoring
- **Milestone-based**: Award points at distance milestones
- **Milestones**: Every 100 meters
- **Points per milestone**: 50 points
- **Calculation**: floor(distance / 100) × 50

### Coin Scoring
- **Base value**: 10 points per coin
- **With multiplier**: 20 points per coin
- **Added immediately on collection**

### Total Score
```
score = distanceMilestonePoints + coinPoints
```

### Distance Tracking
- **Increment**: distance += speed × deltaTime
- **Display**: Round to nearest meter

---

## Speed Progression Algorithm

### Gradual Increase
- **Base speed**: 5 (pixels per frame at 60 FPS)
- **Initial multiplier**: 1.0
- **Increase rate**: 0.01 per second
- **Max multiplier**: 3.0 (caps at 3x base speed)

### Calculation
```
speedMultiplier += increaseRate × deltaTime
speedMultiplier = min(speedMultiplier, maxMultiplier)
currentSpeed = baseSpeed × speedMultiplier
```

### Effects
- Obstacles move faster
- Spawn intervals decrease
- Distance accumulates faster
- Game becomes progressively harder

---

## Game Over Logic

### Trigger Conditions
1. Player collides with obstacle AND no shield active

### Game Over Actions
1. Stop game loop updates
2. Play game over sound
3. Update high score if current score > high score
4. Save high score to localStorage
5. Transition to GAME_OVER state
6. Display game over screen

---

## Restart Logic

### Reset Actions
1. Clear all entities (obstacles, coins, power-ups)
2. Reset player to starting position and lane
3. Reset score to 0
4. Reset distance to 0
5. Reset speed multiplier to 1.0
6. Clear active power-ups
7. Transition to PLAYING state
8. Resume game loop

---

## Summary

**State Machine**: 3 states with clear transitions  
**Player Physics**: Variable jump with gravity, instant lane switch, timed slide  
**Spawning**: Time-based with speed adjustment and randomization  
**Collision**: Circle-based distance calculation  
**Power-ups**: 4 types, time-based durations (8-15 seconds)  
**Scoring**: Milestone-based distance + coin collection  
**Progression**: Gradual speed increase (0.01/sec, max 3x)

---
