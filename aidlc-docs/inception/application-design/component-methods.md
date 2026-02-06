# Component Methods - Kiro Dash

## Overview
This document defines method signatures for each component. Detailed business rules and algorithms will be specified in Functional Design (CONSTRUCTION phase).

---

## 1. Game Class

### Constructor
```javascript
constructor(canvas)
```
- Initialize game with canvas reference
- Create all game systems and components
- Load assets and high score

### Core Loop Methods
```javascript
start()
```
- Start the game loop
- Initialize game state to PLAYING

```javascript
update(deltaTime)
```
- Update all game systems
- Handle game logic based on current state

```javascript
render()
```
- Render all game elements via Renderer

```javascript
gameLoop(timestamp)
```
- Main game loop using requestAnimationFrame
- Calculate delta time and call update/render

### State Management
```javascript
restart()
```
- Reset game state for new game
- Clear entities and reset score/distance

```javascript
gameOver()
```
- Transition to GAME_OVER state
- Update high score if needed
- Play game over sound

### Utility Methods
```javascript
increaseSpeed(deltaTime)
```
- Gradually increase game speed over time

```javascript
addActivePowerUp(type, duration)
```
- Add power-up to active list with duration

```javascript
updateActivePowerUps(deltaTime)
```
- Update power-up durations, remove expired

---

## 2. Player Class

### Constructor
```javascript
constructor(x, y, lane)
```
- Initialize player at starting position and lane

### Movement Methods
```javascript
switchLane(targetLane)
```
- Move player to target lane (0 or 1)

```javascript
jump()
```
- Initiate jump if on ground

```javascript
slide()
```
- Initiate slide action

```javascript
update(deltaTime)
```
- Update player position, velocity, animation
- Handle gravity and jump physics

### State Methods
```javascript
isJumping()
```
- Return true if player is in air

```javascript
isSliding()
```
- Return true if player is sliding

```javascript
getCollisionBounds()
```
- Return circle bounds for collision detection (x, y, radius)

### Rendering
```javascript
render(renderer)
```
- Draw player sprite/shape via renderer

---

## 3. Obstacle Class

### Constructor
```javascript
constructor(x, y, lane, type)
```
- Initialize obstacle with position, lane, and type (ground/air)

### Update Methods
```javascript
update(deltaTime, speed)
```
- Move obstacle left based on game speed

```javascript
isOffScreen()
```
- Return true if obstacle has moved past left edge

### Collision Methods
```javascript
getCollisionBounds()
```
- Return circle bounds for collision detection

### Rendering
```javascript
render(renderer)
```
- Draw obstacle sprite/shape via renderer

---

## 4. Coin Class

### Constructor
```javascript
constructor(x, y, lane)
```
- Initialize coin with position and lane

### Update Methods
```javascript
update(deltaTime, speed)
```
- Move coin left based on game speed

```javascript
isOffScreen()
```
- Return true if coin has moved past left edge

```javascript
collect()
```
- Mark coin as collected

### Collision Methods
```javascript
getCollisionBounds()
```
- Return circle bounds for collision detection

### Rendering
```javascript
render(renderer)
```
- Draw coin sprite/shape via renderer (skip if collected)

---

## 5. PowerUp Class

### Constructor
```javascript
constructor(x, y, lane, type)
```
- Initialize power-up with position, lane, and type

### Update Methods
```javascript
update(deltaTime, speed)
```
- Move power-up left based on game speed

```javascript
isOffScreen()
```
- Return true if power-up has moved past left edge

```javascript
collect()
```
- Mark power-up as collected

### Collision Methods
```javascript
getCollisionBounds()
```
- Return circle bounds for collision detection

### Rendering
```javascript
render(renderer)
```
- Draw power-up sprite/shape via renderer based on type

---

## 6. ActivePowerUp Class

### Constructor
```javascript
constructor(type, duration)
```
- Initialize active power-up with type and duration

### Update Methods
```javascript
update(deltaTime)
```
- Decrease remaining duration

```javascript
isExpired()
```
- Return true if duration <= 0

### Utility Methods
```javascript
getRemainingTime()
```
- Return remaining duration for UI display

```javascript
getType()
```
- Return power-up type

---

## 7. InputHandler Class

### Constructor
```javascript
constructor()
```
- Set up keyboard event listeners

### Event Handlers
```javascript
onKeyDown(event)
```
- Handle key press events

```javascript
onKeyUp(event)
```
- Handle key release events

### Input Query Methods
```javascript
isLeftPressed()
```
- Return true if left movement key is pressed

```javascript
isRightPressed()
```
- Return true if right movement key is pressed

```javascript
isJumpPressed()
```
- Return true if jump key is pressed

```javascript
isSlidePressed()
```
- Return true if slide key is pressed

```javascript
isRestartPressed()
```
- Return true if restart key is pressed

---

## 8. CollisionDetector Class

### Static Methods
```javascript
static checkCircleCollision(bounds1, bounds2)
```
- Check if two circles overlap
- Parameters: {x, y, radius} for each circle
- Return: boolean

```javascript
static checkPlayerObstacle(player, obstacle)
```
- Check collision between player and obstacle
- Return: boolean

```javascript
static checkPlayerCoin(player, coin)
```
- Check collision between player and coin
- Return: boolean

```javascript
static checkPlayerPowerUp(player, powerUp)
```
- Check collision between player and power-up
- Return: boolean

---

## 9. Renderer Class

### Constructor
```javascript
constructor(canvas, context)
```
- Initialize with canvas and 2D context

### Core Rendering
```javascript
clear()
```
- Clear entire canvas

```javascript
renderBackground()
```
- Draw parallax city background layers

### Entity Rendering
```javascript
renderPlayer(player)
```
- Draw player sprite/animation

```javascript
renderObstacle(obstacle)
```
- Draw obstacle based on type

```javascript
renderCoin(coin)
```
- Draw coin sprite/shape

```javascript
renderPowerUp(powerUp)
```
- Draw power-up based on type

### UI Rendering
```javascript
renderHUD(score, distance, activePowerUps)
```
- Draw score, distance, and power-up indicators

```javascript
renderStartScreen()
```
- Draw start/menu screen

```javascript
renderGameOverScreen(score, distance, highScore)
```
- Draw game over screen with stats

---

## 10. EntityManager Class

### Constructor
```javascript
constructor()
```
- Initialize entity arrays and spawn timers

### Spawning Methods
```javascript
spawnObstacle(x, lane, type)
```
- Create and add new obstacle

```javascript
spawnCoin(x, lane)
```
- Create and add new coin

```javascript
spawnPowerUp(x, lane, type)
```
- Create and add new power-up

```javascript
updateSpawning(deltaTime, speed)
```
- Handle spawn timing and logic

### Update Methods
```javascript
updateAll(deltaTime, speed)
```
- Update all entities
- Remove off-screen entities

```javascript
clearAll()
```
- Remove all entities (for restart)

### Accessor Methods
```javascript
getObstacles()
```
- Return obstacles array

```javascript
getCoins()
```
- Return coins array

```javascript
getPowerUps()
```
- Return power-ups array

---

## 11. ScoreManager Class

### Constructor
```javascript
constructor()
```
- Initialize score, distance, high score from localStorage

### Score Methods
```javascript
addCoinScore(multiplier)
```
- Add coin value to score (with multiplier)

```javascript
updateDistance(deltaTime, speed)
```
- Increment distance based on speed

```javascript
updateScore(deltaTime, speed)
```
- Update score based on distance

```javascript
getScore()
```
- Return current score

```javascript
getDistance()
```
- Return distance traveled

### High Score Methods
```javascript
getHighScore()
```
- Return high score

```javascript
updateHighScore()
```
- Update high score if current score is higher

```javascript
saveHighScore()
```
- Persist high score to localStorage

```javascript
reset()
```
- Reset score and distance for new game

---

## 12. AudioManager Class

### Constructor
```javascript
constructor()
```
- Load audio assets
- Load audio settings from localStorage

### Playback Methods
```javascript
playJump()
```
- Play jump sound effect

```javascript
playCollect()
```
- Play coin/power-up collection sound

```javascript
playCollision()
```
- Play collision/game over sound

```javascript
playBackgroundMusic()
```
- Start looping background music

```javascript
stopBackgroundMusic()
```
- Stop background music

### Settings Methods
```javascript
toggleEffects()
```
- Mute/unmute sound effects

```javascript
toggleMusic()
```
- Mute/unmute background music

```javascript
saveSettings()
```
- Persist audio settings to localStorage

---

## 13. SpeedController Class

### Constructor
```javascript
constructor(baseSpeed, increaseRate)
```
- Initialize with base speed and increase rate

### Speed Methods
```javascript
update(deltaTime)
```
- Increase speed multiplier over time

```javascript
getCurrentSpeed()
```
- Return current speed value

```javascript
getSpeedMultiplier()
```
- Return speed multiplier for UI display

```javascript
reset()
```
- Reset speed to base value

---

## 14. UIManager Class

### Constructor
```javascript
constructor(renderer)
```
- Initialize with renderer reference

### Rendering Methods
```javascript
renderHUD(score, distance, activePowerUps)
```
- Render in-game HUD elements

```javascript
renderStartScreen()
```
- Render start/menu screen

```javascript
renderGameOverScreen(score, distance, highScore, isNewHighScore)
```
- Render game over screen with stats

### Interaction Methods
```javascript
checkRestartButtonClick(x, y)
```
- Check if click/tap is on restart button
- Return: boolean

---

## Method Summary

**Total Classes**: 14  
**Total Methods**: ~80+ methods across all components

**Note**: Detailed business logic, algorithms, and implementation details will be defined in Functional Design during the CONSTRUCTION phase.

---
