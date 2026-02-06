# Business Rules - Kiro Dash

## Player Movement Rules

### BR-PM-01: Lane Switching
- Player can only be in lane 0 (left) or lane 1 (right)
- Lane switch is instant (no animation transition)
- Cannot switch to current lane (no-op)
- Lane switch allowed during jump or slide

### BR-PM-02: Jump Initiation
- Jump can only be initiated when player is on ground
- Cannot jump while already jumping
- Cannot jump while sliding
- Space key press triggers jump

### BR-PM-03: Jump Physics (Variable Jump)
- Initial upward velocity applied on key press: -12
- Holding space continues upward force for max 0.3 seconds
- Releasing space stops upward force, gravity takes over
- Gravity constant: 0.6 (downward acceleration per frame)
- Player lands when y >= groundY

### BR-PM-04: Slide Initiation
- Slide can be initiated when player is on ground
- Cannot slide while jumping
- Cannot slide while already sliding
- Up/Down arrow triggers slide

### BR-PM-05: Slide Duration
- Slide lasts exactly 0.5 seconds
- Player height reduced during slide
- Automatically returns to running after duration
- Slide cannot be canceled early

---

## Collision Rules

### BR-COL-01: Obstacle Collision Detection
- Collision occurs when distance between player and obstacle < (playerRadius + obstacleRadius)
- Collision checked every frame for all active obstacles
- Only obstacles in same lane as player can collide

### BR-COL-02: Obstacle Collision Outcome
- **If shield active**: Shield consumed, player continues, no game over
- **If no shield**: Game over immediately
- Collision sound plays on game over

### BR-COL-03: Ground Obstacle Avoidance
- Player must be jumping (y < groundY) to avoid ground obstacle
- If player is on ground or sliding, collision occurs

### BR-COL-04: Air Obstacle Avoidance
- Player must be sliding (reduced height) to avoid air obstacle
- If player is running or jumping at normal height, collision occurs

### BR-COL-05: Coin Collection
- Coin collected when distance between player and coin < (playerRadius + coinRadius)
- Coin can only be collected once
- Collection sound plays
- Coin marked as collected and removed from rendering

### BR-COL-06: Power-up Collection
- Power-up collected when distance between player and power-up < (playerRadius + powerUpRadius)
- Power-up can only be collected once
- Collection sound plays
- Power-up effect activates immediately
- Power-up marked as collected and removed from rendering

---

## Spawning Rules

### BR-SP-01: Obstacle Spawn Timing
- Base spawn interval: 1.5 seconds
- Adjusted interval: baseInterval / speedMultiplier
- Random variance: ±20% of adjusted interval
- Minimum interval: 0.5 seconds (safety limit)

### BR-SP-02: Obstacle Spawn Parameters
- Lane: Random (50% chance for each lane)
- Type: 60% ground, 40% air
- Position: Right edge of canvas (x = canvas.width)
- Y position: groundY for ground, jumpHeight for air

### BR-SP-03: Coin Spawn Timing
- Base spawn interval: 0.8 seconds
- Adjusted interval: baseInterval / speedMultiplier
- Random variance: ±15% of adjusted interval

### BR-SP-04: Coin Spawn Parameters
- Lane: Random (50% chance for each lane)
- Position: Right edge of canvas
- Y position: Mid-height (collectible level)

### BR-SP-05: Power-up Spawn Timing
- Base spawn interval: 8 seconds
- Adjusted interval: baseInterval / speedMultiplier
- No random variance (consistent spawning)

### BR-SP-06: Power-up Spawn Distribution
- Shield: 30% probability
- Speed Boost: 25% probability
- Coin Multiplier: 25% probability
- Magnet: 20% probability
- Random selection on each spawn

### BR-SP-07: Entity Cleanup
- Entities removed when x < -entityWidth (off left edge)
- Cleanup checked every frame
- Prevents memory accumulation

---

## Power-up Effect Rules

### BR-PU-01: Shield Effect
- Duration: 15 seconds (time-based)
- Effect: Absorbs next collision with obstacle
- On collision: Shield consumed, removed from active list
- On expiration: Removed from active list
- Only one shield can be active at a time (new shield replaces old)

### BR-PU-02: Speed Boost Effect
- Duration: 10 seconds (time-based)
- Effect: Multiply speedMultiplier by 1.5
- On activation: Increase current speed
- On expiration: Return to normal speed progression
- Multiple speed boosts stack multiplicatively

### BR-PU-03: Coin Multiplier Effect
- Duration: 12 seconds (time-based)
- Effect: Coins worth 20 points instead of 10
- Applies to all coins collected during duration
- On expiration: Coins return to base value (10 points)
- Multiple multipliers do not stack (2x max)

### BR-PU-04: Magnet Effect
- Duration: 8 seconds (time-based)
- Effect: Auto-collect coins within 100 pixel radius
- Checked every frame for all coins
- Collected coins still play collection sound
- On expiration: Return to normal collision-based collection

### BR-PU-05: Power-up Stacking
- Multiple different power-ups can be active simultaneously
- Same power-up type: New replaces old (resets duration)
- Active power-ups displayed in UI with remaining time

---

## Scoring Rules

### BR-SC-01: Distance Milestone Scoring
- Milestones at every 100 meters
- Award 50 points per milestone
- Calculated: floor(distance / 100) × 50
- Points awarded once per milestone (not retroactive)

### BR-SC-02: Coin Scoring
- Base coin value: 10 points
- With coin multiplier active: 20 points
- Points added immediately on collection
- No limit to coins collected

### BR-SC-03: Total Score Calculation
```
totalScore = distanceMilestonePoints + coinPoints
```

### BR-SC-04: Distance Tracking
- Distance increments based on speed and time
- Formula: distance += currentSpeed × deltaTime × conversionFactor
- Displayed in meters (rounded to nearest integer)
- Distance never decreases

### BR-SC-05: High Score
- High score updated only when game ends
- Condition: currentScore > highScore
- Persisted to localStorage immediately
- Displayed on game over screen

---

## Speed Progression Rules

### BR-SPD-01: Speed Increase
- Base speed: 5 pixels per frame
- Initial multiplier: 1.0
- Increase rate: 0.01 per second
- Formula: speedMultiplier += 0.01 × deltaTime

### BR-SPD-02: Speed Cap
- Maximum multiplier: 3.0
- Speed capped at: baseSpeed × 3.0 = 15 pixels per frame
- No further increase after cap reached

### BR-SPD-03: Speed Effects
- Affects obstacle movement speed
- Affects coin movement speed
- Affects power-up movement speed
- Affects spawn interval calculations
- Affects distance accumulation rate

### BR-SPD-04: Speed on Restart
- Speed multiplier resets to 1.0
- Progression starts over from base speed

---

## Game State Rules

### BR-GS-01: Game Start
- Triggered by space key or start button in MENU state
- Transition from MENU to PLAYING
- Initialize all game entities
- Start game loop
- Start background music

### BR-GS-02: Game Over Trigger
- Only triggered by obstacle collision without shield
- Cannot be triggered by going off-screen or other means

### BR-GS-03: Game Over Actions
- Stop game loop updates (entities stop moving)
- Play game over sound
- Stop background music
- Update high score if applicable
- Save high score to localStorage
- Transition to GAME_OVER state
- Display game over screen

### BR-GS-04: Game Restart
- Triggered by space key or restart button in GAME_OVER state
- Clear all entities (obstacles, coins, power-ups)
- Reset player to starting position (lane 0, ground level)
- Reset score to 0
- Reset distance to 0
- Reset speed multiplier to 1.0
- Clear active power-ups
- Transition to PLAYING state
- Resume game loop
- Restart background music

---

## Audio Rules

### BR-AUD-01: Sound Effect Triggers
- Jump sound: On jump initiation
- Collect sound: On coin or power-up collection
- Collision sound: On game over

### BR-AUD-02: Background Music
- Starts when game enters PLAYING state
- Loops continuously during gameplay
- Stops on game over
- Restarts on game restart

### BR-AUD-03: Mute Controls
- Effects and music can be muted independently
- Mute states persist across sessions (localStorage)
- Muted sounds do not play but game continues normally

---

## UI Display Rules

### BR-UI-01: HUD Display (During PLAYING)
- Score: Top-left corner
- Distance: Top-center (in meters)
- Active power-ups: Top-right corner with icons and timers

### BR-UI-02: Game Over Screen
- Final score: Centered
- Distance traveled: Below score
- High score: Below distance
- "NEW HIGH SCORE!" indicator if applicable
- Restart button/prompt

### BR-UI-03: Start Screen
- Game title
- "Press SPACE to Start" prompt
- Optional: Controls display

---

## Persistence Rules

### BR-PER-01: High Score Persistence
- Saved to localStorage on game over
- Key: "kiro-dash-high-score"
- Loaded on game initialization
- Default: 0 if not found

### BR-PER-02: Audio Settings Persistence
- Saved to localStorage on toggle
- Keys: "kiro-dash-effects-muted", "kiro-dash-music-muted"
- Loaded on game initialization
- Default: false (unmuted) if not found

---

## Validation Rules

### BR-VAL-01: Input Validation
- Only accept valid key codes
- Ignore invalid or unmapped keys
- Prevent rapid repeated inputs (debouncing not required)

### BR-VAL-02: Entity Bounds Validation
- Entities cannot have negative positions
- Entities must be within or near canvas bounds
- Off-screen entities cleaned up

### BR-VAL-03: State Validation
- Game can only be in one state at a time
- State transitions must follow defined paths
- Invalid state transitions ignored

---

## Business Rules Summary

**Total Rules**: 50+ rules across 13 categories  
**Critical Rules**: Collision detection, power-up effects, scoring, game state transitions  
**Safety Rules**: Speed caps, spawn limits, entity cleanup  
**User Experience Rules**: Audio feedback, UI display, persistence

All rules are deterministic and testable, ensuring consistent game behavior.

---
