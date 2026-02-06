# Manual Testing Checklist - Kiro Dash

## Test Environment Setup
- [ ] Browser: Chrome/Firefox/Safari/Edge (modern version)
- [ ] Local server running OR file opened directly
- [ ] Browser DevTools open (F12) for console monitoring
- [ ] Audio enabled in browser

---

## User Story Testing

### US-01: Start Game
- [ ] Open game in browser
- [ ] Verify start screen displays "KIRO DASH" title
- [ ] Verify controls instructions visible
- [ ] Press SPACE key
- [ ] Verify game transitions to PLAYING state
- [ ] Verify Kiro appears and starts running
- [ ] Verify obstacles begin spawning

**Expected**: Game starts immediately on SPACE press

---

### US-02: Switch Lanes
- [ ] Start game
- [ ] Press LEFT ARROW or A key
- [ ] Verify Kiro moves to left lane smoothly
- [ ] Press RIGHT ARROW or D key
- [ ] Verify Kiro moves to right lane smoothly
- [ ] Verify lane switching works during jump
- [ ] Verify lane switching works during slide

**Expected**: Instant, smooth lane transitions

---

### US-03: Jump Over Obstacles
- [ ] Start game
- [ ] Wait for ground obstacle to approach
- [ ] Press SPACE key
- [ ] Verify Kiro jumps upward
- [ ] Verify jump sound plays
- [ ] Hold SPACE for longer jump
- [ ] Verify higher jump when held
- [ ] Release SPACE mid-jump
- [ ] Verify Kiro falls with gravity
- [ ] Verify Kiro lands on ground
- [ ] Verify successful jump avoids ground obstacle

**Expected**: Variable jump height, smooth physics, obstacle avoided

---

### US-04: Slide Under Obstacles
- [ ] Start game
- [ ] Wait for air obstacle to approach
- [ ] Press UP or DOWN ARROW key
- [ ] Verify Kiro enters slide state (reduced height)
- [ ] Verify slide lasts ~0.5 seconds
- [ ] Verify Kiro returns to running after slide
- [ ] Verify successful slide avoids air obstacle

**Expected**: Timed slide, obstacle avoided

---

### US-05: Detect Collisions
- [ ] Start game
- [ ] Intentionally collide with ground obstacle (don't jump)
- [ ] Verify game ends immediately
- [ ] Verify game over sound plays
- [ ] Verify transition to GAME_OVER state
- [ ] Restart and collide with air obstacle (don't slide)
- [ ] Verify same game over behavior

**Expected**: Fair collision detection, immediate game over

---

### US-06: Collect Coins
- [ ] Start game
- [ ] Move to lane with coin
- [ ] Verify coin collection on contact
- [ ] Verify coin disappears
- [ ] Verify score increases by 10 points
- [ ] Collect multiple coins
- [ ] Verify score increases each time

**Expected**: Coins collected on contact, score increases

---

### US-07: Collect Power-ups
- [ ] Start game
- [ ] Wait for power-up to spawn (~8 seconds)
- [ ] Move to lane with power-up
- [ ] Verify power-up collection on contact
- [ ] Verify power-up disappears
- [ ] Verify power-up appears in active list (top-right)
- [ ] Verify duration countdown visible

**Expected**: Power-up collected, effect activates, UI shows status

---

### US-08: Use Shield Power-up
- [ ] Start game
- [ ] Collect shield power-up (cyan square)
- [ ] Verify "shield" appears in active power-ups list
- [ ] Intentionally collide with obstacle
- [ ] Verify shield is consumed
- [ ] Verify game continues (no game over)
- [ ] Verify shield removed from active list

**Expected**: Shield absorbs one collision, game continues

---

### US-09: Use Speed Boost Power-up
- [ ] Start game
- [ ] Collect speed boost power-up (red square)
- [ ] Verify "speed_boost" appears in active list
- [ ] Verify game speed increases noticeably
- [ ] Wait for duration to expire (~10 seconds)
- [ ] Verify speed returns to normal progression

**Expected**: Temporary speed increase, returns to normal

---

### US-10: Use Coin Multiplier Power-up
- [ ] Start game
- [ ] Collect coin multiplier power-up (yellow square)
- [ ] Verify "coin_multiplier" appears in active list
- [ ] Collect coins while multiplier active
- [ ] Verify coins worth 20 points instead of 10
- [ ] Wait for duration to expire (~12 seconds)
- [ ] Collect coin after expiration
- [ ] Verify coin worth 10 points again

**Expected**: Coins doubled during effect, normal after

---

### US-11: Use Magnet Power-up
- [ ] Start game
- [ ] Collect magnet power-up (green square)
- [ ] Verify "magnet" appears in active list
- [ ] Observe coins being collected automatically when nearby
- [ ] Verify no need to be in exact lane
- [ ] Wait for duration to expire (~8 seconds)
- [ ] Verify manual collection resumes

**Expected**: Auto-collection within range, manual after expiration

---

### US-12: Track Score and Distance
- [ ] Start game
- [ ] Verify score displays at top-left (starts at 0)
- [ ] Verify distance displays at top-center (starts at 0m)
- [ ] Play for 30 seconds
- [ ] Verify score increases with distance milestones
- [ ] Verify distance increases continuously
- [ ] Verify both values update in real-time

**Expected**: Score and distance visible and updating

---

### US-13: Experience Progressive Difficulty
- [ ] Start game
- [ ] Play for 2 minutes
- [ ] Verify game speed gradually increases
- [ ] Verify obstacles spawn more frequently
- [ ] Verify game becomes progressively harder
- [ ] Verify speed increase feels smooth (not sudden jumps)

**Expected**: Gradual, continuous difficulty increase

---

### US-14: View Active Power-ups
- [ ] Start game
- [ ] Collect multiple different power-ups
- [ ] Verify all active power-ups shown at top-right
- [ ] Verify each shows remaining duration in seconds
- [ ] Verify duration counts down
- [ ] Verify power-up removed when duration reaches 0

**Expected**: Clear display of active effects with timers

---

### US-15: View Game Over Screen
- [ ] Start game
- [ ] Play until collision (game over)
- [ ] Verify "GAME OVER" text displays
- [ ] Verify final score displays
- [ ] Verify distance traveled displays
- [ ] Verify high score displays
- [ ] If new high score achieved, verify indication

**Expected**: Complete game over screen with all stats

---

### US-16: Restart Game
- [ ] Reach game over screen
- [ ] Press SPACE key
- [ ] Verify game restarts immediately
- [ ] Verify Kiro returns to starting position
- [ ] Verify score resets to 0
- [ ] Verify distance resets to 0
- [ ] Verify speed resets to base speed
- [ ] Verify all entities cleared

**Expected**: Clean restart, all state reset

---

### US-17: Hear Sound Effects
- [ ] Ensure audio enabled
- [ ] Start game
- [ ] Press SPACE to jump
- [ ] Verify jump sound plays
- [ ] Collide with obstacle
- [ ] Verify game over sound plays
- [ ] Verify sounds are clear and appropriate

**Expected**: Sound effects play for key actions

---

### US-20: Save High Score
- [ ] Start game
- [ ] Achieve a score (e.g., 500 points)
- [ ] Reach game over
- [ ] Note the high score displayed
- [ ] Close browser completely
- [ ] Reopen game
- [ ] Reach game over again
- [ ] Verify previous high score is displayed
- [ ] Beat high score
- [ ] Verify new high score is saved and displayed

**Expected**: High score persists across sessions

---

## Performance Testing

### Frame Rate Test
- [ ] Open browser DevTools → Performance tab
- [ ] Start recording
- [ ] Play game for 60 seconds
- [ ] Stop recording
- [ ] Verify FPS stays at or near 60
- [ ] Verify no significant frame drops

**Expected**: Consistent 60 FPS

---

### Memory Test
- [ ] Open browser DevTools → Memory tab
- [ ] Take heap snapshot
- [ ] Play game for 5 minutes
- [ ] Take another heap snapshot
- [ ] Compare memory usage
- [ ] Verify no significant memory growth
- [ ] Verify no memory leaks

**Expected**: Stable memory usage

---

### Input Latency Test
- [ ] Start game
- [ ] Press SPACE to jump
- [ ] Observe time between key press and jump action
- [ ] Verify response feels immediate (< 50ms)
- [ ] Test lane switching responsiveness
- [ ] Verify all controls feel responsive

**Expected**: Immediate input response

---

## Browser Compatibility Testing

### Chrome
- [ ] Open in Chrome 90+
- [ ] Run through core gameplay tests
- [ ] Verify all features work
- [ ] Check console for errors

### Firefox
- [ ] Open in Firefox 88+
- [ ] Run through core gameplay tests
- [ ] Verify all features work
- [ ] Check console for errors

### Safari
- [ ] Open in Safari 14+
- [ ] Run through core gameplay tests
- [ ] Verify all features work
- [ ] Check console for errors

### Edge
- [ ] Open in Edge 90+
- [ ] Run through core gameplay tests
- [ ] Verify all features work
- [ ] Check console for errors

---

## Edge Case Testing

### Rapid Input Test
- [ ] Start game
- [ ] Rapidly press SPACE multiple times
- [ ] Verify no double jumps occur
- [ ] Rapidly switch lanes
- [ ] Verify smooth transitions, no glitches

### Multiple Power-ups Test
- [ ] Collect multiple power-ups simultaneously
- [ ] Verify all effects active
- [ ] Verify all shown in UI
- [ ] Verify no conflicts or crashes

### Long Play Session Test
- [ ] Play for 10+ minutes
- [ ] Verify no performance degradation
- [ ] Verify no memory issues
- [ ] Verify game remains playable

### localStorage Full Test
- [ ] Fill browser localStorage (use DevTools)
- [ ] Try to save high score
- [ ] Verify game continues even if save fails

---

## Test Summary Template

**Date**: ___________  
**Tester**: ___________  
**Browser**: ___________  
**Version**: ___________

**Tests Passed**: ___ / 20 User Stories  
**Performance**: ☐ Pass ☐ Fail  
**Compatibility**: ☐ Pass ☐ Fail  
**Edge Cases**: ☐ Pass ☐ Fail

**Issues Found**:
1. ___________
2. ___________
3. ___________

**Overall Result**: ☐ PASS ☐ FAIL

---
