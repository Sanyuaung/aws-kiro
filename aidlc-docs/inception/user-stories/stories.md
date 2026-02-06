# User Stories - Kiro Dash

## Overview
This document contains user stories for Kiro Dash, organized by user journey from game start to game over and restart. Stories are written at feature-level granularity with standard acceptance criteria.

**Organization**: User Journey-Based (following player experience chronologically)  
**Granularity**: Feature-level (one story per major feature)  
**Prioritization**: Must-Have (M), Should-Have (S), Nice-to-Have (N)

**Total Stories**: 15

---

## User Journey: Starting the Game

### US-01: Start Game
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to start the game with a simple action so that I can begin playing immediately.

**Acceptance Criteria**:
- Given the game has loaded, when I press Space or click Start button, then the game begins
- Given the game starts, when gameplay begins, then Kiro appears and starts running forward
- Given the game starts, when gameplay begins, then obstacles begin spawning
- Given the game starts, when gameplay begins, then the score counter starts at 0

---

## User Journey: Core Gameplay

### US-02: Switch Lanes
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to move Kiro between left and right lanes so that I can avoid obstacles and collect items.

**Acceptance Criteria**:
- Given Kiro is in the left lane, when I press Right Arrow or D key, then Kiro moves to the right lane
- Given Kiro is in the right lane, when I press Left Arrow or A key, then Kiro moves to the left lane
- Given Kiro switches lanes, when the transition occurs, then it is smooth and responsive
- Given Kiro is switching lanes, when an obstacle is in the target lane, then collision detection works correctly

---

### US-03: Jump Over Obstacles
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to jump over ground obstacles so that I can avoid collisions and continue playing.

**Acceptance Criteria**:
- Given Kiro is running, when I press Space key, then Kiro jumps upward
- Given Kiro jumps, when the jump occurs, then a jump sound effect plays
- Given Kiro is in the air, when a ground obstacle passes below, then no collision occurs
- Given Kiro lands, when Kiro returns to the ground, then normal running resumes
- Given Kiro is already jumping, when I press Space again, then no double jump occurs

---

### US-04: Slide Under Obstacles
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to slide under air obstacles so that I can avoid collisions and continue playing.

**Acceptance Criteria**:
- Given Kiro is running, when I press Down Arrow key, then Kiro slides low
- Given Kiro slides, when an air obstacle passes above, then no collision occurs
- Given Kiro finishes sliding, when the slide animation completes, then normal running resumes
- Given Kiro is sliding, when the slide duration ends, then Kiro returns to normal height

---

### US-05: Detect Collisions
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want the game to detect when Kiro hits an obstacle so that the game ends fairly.

**Acceptance Criteria**:
- Given Kiro collides with a ground obstacle, when collision occurs, then the game ends
- Given Kiro collides with an air obstacle, when collision occurs, then the game ends
- Given collision occurs, when the game ends, then a game over sound plays
- Given collision detection is active, when collision occurs, then it uses medium difficulty (balanced, not too strict)

---

## User Journey: Collecting Items

### US-06: Collect Coins
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to collect coins during gameplay so that I can increase my score.

**Acceptance Criteria**:
- Given a coin appears in a lane, when Kiro touches the coin, then the coin is collected
- Given a coin is collected, when collection occurs, then a collection sound plays
- Given a coin is collected, when collection occurs, then the score increases
- Given coins spawn, when they appear, then they are visible and distinguishable from obstacles

---

### US-07: Collect Power-ups
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to collect power-ups (shield, speed boost, coin multiplier, magnet) so that I can gain temporary advantages.

**Acceptance Criteria**:
- Given a power-up appears, when Kiro touches it, then the power-up is collected
- Given a power-up is collected, when collection occurs, then a power-up sound plays
- Given a power-up is collected, when collection occurs, then the power-up effect activates
- Given a power-up is active, when the duration expires, then the effect ends

---

### US-08: Use Shield Power-up
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer)

**Story**:  
As a player, I want a shield power-up to protect me from one collision so that I can survive mistakes.

**Acceptance Criteria**:
- Given shield is active, when Kiro collides with an obstacle, then the shield absorbs the collision
- Given shield absorbs a collision, when collision occurs, then the shield is consumed
- Given shield absorbs a collision, when collision occurs, then gameplay continues
- Given shield is active, when displayed, then a visual indicator shows shield status

---

### US-09: Use Speed Boost Power-up
**Priority**: Should-Have (S)  
**Persona**: Jordan (Score Chaser)

**Story**:  
As a player, I want a speed boost power-up to temporarily increase game speed so that I can earn more points faster.

**Acceptance Criteria**:
- Given speed boost is collected, when activated, then Kiro's forward speed increases
- Given speed boost is active, when the duration expires, then speed returns to normal
- Given speed boost is active, when displayed, then a visual indicator shows remaining duration
- Given speed boost is active, when obstacles spawn, then spawn rate adjusts to match speed

---

### US-10: Use Coin Multiplier Power-up
**Priority**: Should-Have (S)  
**Persona**: Jordan (Score Chaser)

**Story**:  
As a player, I want a coin multiplier power-up to increase coin value so that I can achieve higher scores.

**Acceptance Criteria**:
- Given coin multiplier is active, when a coin is collected, then score increases by multiplied value
- Given coin multiplier is active, when the duration expires, then coin value returns to normal
- Given coin multiplier is active, when displayed, then a visual indicator shows multiplier and duration

---

### US-11: Use Magnet Power-up
**Priority**: Nice-to-Have (N)  
**Persona**: Alex (Casual Gamer)

**Story**:  
As a player, I want a magnet power-up to automatically collect nearby coins so that I don't miss collectibles.

**Acceptance Criteria**:
- Given magnet is active, when coins are nearby, then they are automatically collected
- Given magnet is active, when the duration expires, then manual collection resumes
- Given magnet is active, when displayed, then a visual indicator shows magnet status

---

## User Journey: Progression & Feedback

### US-12: Track Score and Distance
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to see my current score and distance traveled so that I can track my progress.

**Acceptance Criteria**:
- Given the game is running, when gameplay occurs, then score is displayed on screen
- Given the game is running, when gameplay occurs, then distance in meters is displayed
- Given score or distance changes, when updates occur, then the display updates in real-time
- Given UI is displayed, when shown, then it doesn't obstruct gameplay view

---

### US-13: Experience Progressive Difficulty
**Priority**: Must-Have (M)  
**Persona**: Jordan (Score Chaser)

**Story**:  
As a player, I want the game to gradually get faster over time so that the challenge increases as I improve.

**Acceptance Criteria**:
- Given the game is running, when time passes, then forward speed gradually increases
- Given speed increases, when obstacles spawn, then spawn frequency adjusts appropriately
- Given speed increases, when gameplay continues, then the increase feels smooth and continuous
- Given difficulty increases, when playing, then the game remains fair and beatable

---

### US-14: View Active Power-ups
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to see which power-ups are currently active so that I know my current advantages.

**Acceptance Criteria**:
- Given a power-up is active, when displayed, then an icon or indicator appears on screen
- Given a power-up has duration, when time passes, then remaining duration is shown
- Given multiple power-ups are active, when displayed, then all active power-ups are visible
- Given a power-up expires, when duration ends, then the indicator disappears

---

## User Journey: Game Over & Restart

### US-15: View Game Over Screen
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to see my final score, distance, and high score when the game ends so that I can evaluate my performance.

**Acceptance Criteria**:
- Given the game ends, when game over occurs, then final score is displayed
- Given the game ends, when game over occurs, then total distance traveled is displayed
- Given the game ends, when game over occurs, then high score is displayed
- Given a new high score is achieved, when displayed, then it is highlighted or indicated clearly

---

### US-16: Restart Game
**Priority**: Must-Have (M)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to restart the game quickly after game over so that I can play again immediately.

**Acceptance Criteria**:
- Given the game over screen is shown, when I click Restart or press a key, then the game restarts
- Given the game restarts, when restart occurs, then all game state resets (score, distance, speed)
- Given the game restarts, when restart occurs, then Kiro returns to starting position
- Given the game restarts, when restart occurs, then gameplay begins immediately

---

## User Journey: Audio Experience

### US-17: Hear Sound Effects
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to hear sound effects for my actions so that I get audio feedback during gameplay.

**Acceptance Criteria**:
- Given I jump, when jump occurs, then jump sound plays
- Given I collect a coin, when collection occurs, then coin sound plays
- Given I collect a power-up, when collection occurs, then power-up sound plays
- Given I collide with an obstacle, when collision occurs, then game over sound plays

---

### US-18: Hear Background Music
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer)

**Story**:  
As a player, I want background music during gameplay so that the game feels more engaging and immersive.

**Acceptance Criteria**:
- Given the game starts, when gameplay begins, then background music plays
- Given background music plays, when playing, then it loops continuously
- Given the game ends, when game over occurs, then background music stops

---

### US-19: Control Audio Settings
**Priority**: Should-Have (S)  
**Persona**: Alex (Casual Gamer), Jordan (Score Chaser)

**Story**:  
As a player, I want to mute sound effects and music independently so that I can play in different environments.

**Acceptance Criteria**:
- Given audio controls exist, when I toggle sound effects, then sound effects mute/unmute
- Given audio controls exist, when I toggle music, then background music mutes/unmutes
- Given I change audio settings, when settings change, then preferences are saved
- Given I reload the game, when game loads, then previous audio settings are restored

---

## User Journey: Persistence

### US-20: Save High Score
**Priority**: Must-Have (M)  
**Persona**: Jordan (Score Chaser)

**Story**:  
As a player, I want my high score to be saved so that I can track my best performance across sessions.

**Acceptance Criteria**:
- Given I achieve a new high score, when the game ends, then the high score is saved
- Given the high score is saved, when I close the browser, then the score persists
- Given I reopen the game, when the game loads, then my previous high score is displayed
- Given I play again, when I beat my high score, then the new high score replaces the old one

---

## Story Summary

### By Priority
- **Must-Have (M)**: 9 stories
- **Should-Have (S)**: 8 stories
- **Nice-to-Have (N)**: 1 story

### By Feature Area
- **Core Gameplay**: 5 stories (lane switching, jumping, sliding, collision, difficulty)
- **Collectibles**: 6 stories (coins, power-ups: shield, speed, multiplier, magnet)
- **UI & Feedback**: 3 stories (score/distance, power-up display, game over screen)
- **Game Flow**: 2 stories (start game, restart game)
- **Audio**: 3 stories (sound effects, music, audio controls)
- **Persistence**: 1 story (high score)

### By Persona
- **Both Alex & Jordan**: 11 stories
- **Alex (Casual Gamer)**: 3 stories
- **Jordan (Score Chaser)**: 4 stories

---

## INVEST Criteria Validation

All stories have been validated against INVEST criteria:
- **Independent**: Stories can be implemented in any order within technical constraints
- **Negotiable**: Implementation details are flexible, stories focus on user value
- **Valuable**: Each story provides clear value to players
- **Estimable**: Stories are well-defined and can be estimated
- **Small**: Stories are feature-level, appropriately sized for implementation
- **Testable**: All stories have clear, measurable acceptance criteria

---
