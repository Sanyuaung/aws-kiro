# Kiro Dash - Requirements Document

## Intent Analysis Summary

### User Request
Build "Kiro Dash" - an endless runner arcade game where the player controls Kiro, who automatically runs forward through a vibrant city track. The player navigates through obstacles, barriers, and gaps while collecting coins and power-ups.

### Request Type
**New Project** - Greenfield web-based game development

### Scope Estimate
**Single Component** - Single-page HTML5 Canvas web game

### Complexity Estimate
**Moderate** - Game mechanics, collision detection, power-up system, progressive difficulty, audio/visual elements

### Technology Stack
- **Platform**: Web Browser
- **Technology**: Vanilla HTML5 Canvas + JavaScript
- **Assets**: Existing Flappy Kiro assets (ghosty.png, jump.wav, game_over.wav)

---

## Functional Requirements

### FR1: Core Gameplay Mechanics

**FR1.1 - Character Movement**
- Kiro automatically runs forward at constant horizontal speed
- Player controls Kiro's lane position (2 lanes: left and right)
- Player can make Kiro jump over ground obstacles
- Player can make Kiro slide under air obstacles

**FR1.2 - Lane System**
- Game uses 2-lane system (left lane, right lane)
- Player can switch between lanes using directional controls
- Lane switching should be smooth and responsive

**FR1.3 - Control Scheme**
- Arrow keys or A/D keys: Move between left and right lanes
- Space key: Jump over ground obstacles
- Up/Down arrow keys: Slide under air obstacles
- Controls must be responsive for desktop keyboard input

**FR1.4 - Obstacle System**
- Ground obstacles: Require jumping to avoid
- Air obstacles: Require sliding to avoid
- Obstacles appear in either left or right lane
- Obstacles spawn at increasing frequency as game progresses

**FR1.5 - Collision Detection**
- Detect collision between Kiro and obstacles
- Medium difficulty: Balanced collision detection (not too forgiving, not too strict)
- Collision ends the game immediately

### FR2: Scoring and Progression

**FR2.1 - Score System**
- Score increases based on distance traveled
- Coins collected add bonus points to score
- Active power-ups may multiply score

**FR2.2 - Distance Tracking**
- Track total distance traveled in meters
- Display distance during gameplay
- Distance contributes to final score

**FR2.3 - Speed Progression**
- Game speed increases gradually and continuously over time
- Speed increase makes game progressively more challenging
- Speed affects obstacle spawn rate and scroll speed

### FR3: Collectibles and Power-ups

**FR3.1 - Coins**
- Coins spawn randomly in lanes
- Collecting coins increases score
- Coins are optional to collect (not required for survival)

**FR3.2 - Power-ups**
- **Shield**: Protects from one collision
- **Speed Boost**: Temporarily increases forward speed
- **Coin Multiplier**: Doubles or triples coin value for limited time
- **Magnet**: Automatically attracts nearby coins
- Power-ups spawn less frequently than coins
- Power-ups have limited duration (timed effects)

**FR3.3 - Power-up Display**
- Active power-ups shown in UI
- Visual indicator of remaining duration
- Multiple power-ups can be active simultaneously

### FR4: User Interface

**FR4.1 - Gameplay HUD**
- Display current score (top of screen)
- Display distance traveled in meters
- Display active power-ups with duration indicators
- UI should not obstruct gameplay view

**FR4.2 - Game Over Screen**
- Display final score
- Display total distance traveled
- Display high score (if current score exceeds previous high score)
- Display "Restart" button to play again
- Option to return to main menu (if implemented)

**FR4.3 - Start Screen**
- Game title display
- "Start Game" button or "Press Space to Start" prompt
- Optional: Instructions or controls display

### FR5: Visual Design

**FR5.1 - Visual Theme**
- Modern city aesthetic (skyscrapers, neon lights, urban environment)
- Vibrant color palette
- Parallax scrolling background for depth effect
- City elements scroll at different speeds to create depth

**FR5.2 - Character Animation**
- Simple running animation cycle for Kiro
- Use existing ghosty.png sprite as base
- Running animation loops continuously during gameplay

**FR5.3 - Obstacle Design**
- Distinct visual appearance for ground vs air obstacles
- Clear visual indicators to help player identify obstacle type
- Consistent art style matching city theme

### FR6: Audio System

**FR6.1 - Sound Effects**
- Jump sound (use existing jump.wav)
- Coin collection sound
- Power-up collection sound
- Collision/game over sound (use existing game_over.wav)
- Lane switch sound (optional)

**FR6.2 - Background Music**
- Looping background music during gameplay
- Music tempo matches game intensity
- Music stops on game over

**FR6.3 - Audio Controls**
- Ability to mute/unmute sound effects
- Ability to mute/unmute background music
- Audio settings persist across sessions

### FR7: Responsive Design

**FR7.1 - Screen Adaptation**
- Game canvas adapts to different screen sizes
- Maintain aspect ratio across devices
- Scale game elements proportionally
- Support desktop and tablet screen sizes

**FR7.2 - Layout Optimization**
- UI elements positioned appropriately for different screen sizes
- Readable text at various resolutions
- Touch-friendly button sizes for tablet devices

### FR8: Data Persistence

**FR8.1 - High Score Storage**
- Save high score to browser localStorage
- Persist high score across browser sessions
- Display high score on game over screen
- Update high score when player achieves new record

---

## Non-Functional Requirements

### NFR1: Performance

**NFR1.1 - Frame Rate**
- Maintain 60 FPS during gameplay
- Smooth animations without stuttering
- Efficient canvas rendering

**NFR1.2 - Load Time**
- Game loads and becomes playable within 3 seconds
- Assets preloaded before gameplay starts
- Loading indicator during asset loading

**NFR1.3 - Memory Usage**
- Efficient memory management
- No memory leaks during extended gameplay
- Proper cleanup of game objects

### NFR2: Usability

**NFR2.1 - Controls**
- Intuitive keyboard controls
- Immediate response to player input (< 50ms latency)
- Clear control instructions for new players

**NFR2.2 - Visual Clarity**
- Clear distinction between interactive elements
- High contrast for important UI elements
- Readable fonts and text sizes

**NFR2.3 - Feedback**
- Visual feedback for player actions (jump, slide, lane switch)
- Audio feedback for game events
- Clear indication of collision and game over

### NFR3: Compatibility

**NFR3.1 - Browser Support**
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- HTML5 Canvas support required
- JavaScript ES6+ features

**NFR3.2 - Device Support**
- Desktop computers (primary target)
- Tablets (secondary target)
- Keyboard input required

### NFR4: Maintainability

**NFR4.1 - Code Quality**
- Clean, readable JavaScript code
- Modular code structure
- Inline comments for complex logic

**NFR4.2 - Asset Organization**
- Organized asset directory structure
- Consistent naming conventions
- Easy to add new assets

### NFR5: Scalability

**NFR5.1 - Extensibility**
- Easy to add new obstacle types
- Easy to add new power-up types
- Configurable game parameters (speed, spawn rates, etc.)

**NFR5.2 - Content Addition**
- Simple process to add new visual themes
- Easy to modify difficulty parameters
- Flexible scoring system

---

## Technical Constraints

### TC1: Technology Stack
- Must use Vanilla HTML5 Canvas (no frameworks)
- Pure JavaScript (no TypeScript, no build tools)
- Single HTML file with embedded CSS and JavaScript
- No external dependencies or libraries

### TC2: Asset Requirements
- Use existing ghosty.png for character sprite
- Use existing jump.wav for jump sound
- Use existing game_over.wav for game over sound
- Additional assets may be created or sourced as needed

### TC3: Browser APIs
- localStorage for data persistence
- Canvas 2D rendering context
- Web Audio API for sound playback
- RequestAnimationFrame for game loop

---

## Success Criteria

### Gameplay
- Player can successfully play the game using keyboard controls
- Obstacles spawn and scroll smoothly
- Collision detection works accurately
- Power-ups provide noticeable benefits

### User Experience
- Game is fun and engaging
- Difficulty progression feels balanced
- Controls are responsive and intuitive
- Visual and audio feedback enhances gameplay

### Technical
- Game runs smoothly at 60 FPS
- No crashes or errors during gameplay
- High score persists across sessions
- Game works in all target browsers

---

## Out of Scope

The following features are explicitly out of scope for this version:

- Multiplayer functionality
- Online leaderboards
- Social media integration
- Mobile touch controls (keyboard only)
- Multiple character selection
- Level-based progression (endless only)
- In-game purchases or monetization
- User accounts or profiles
- Achievements system
- Tutorial mode

---

## Assumptions

- Player has access to a keyboard for input
- Player's browser supports HTML5 Canvas and Web Audio API
- Player's device has sufficient performance for 60 FPS gameplay
- Background music asset will be sourced or created separately
- Additional visual assets (obstacles, coins, power-ups, city background) will be created as simple geometric shapes or sourced as needed

---

## Dependencies

- Existing assets: ghosty.png, jump.wav, game_over.wav
- Browser support for HTML5 Canvas
- Browser support for localStorage
- Browser support for Web Audio API

---

## Risks and Mitigations

### Risk 1: Performance on Lower-End Devices
**Mitigation**: Optimize rendering, limit particle effects, provide quality settings

### Risk 2: Browser Compatibility Issues
**Mitigation**: Test on multiple browsers, use widely-supported APIs, provide fallbacks

### Risk 3: Asset Creation Complexity
**Mitigation**: Start with simple geometric shapes, iterate on visuals after core gameplay works

### Risk 4: Difficulty Balancing
**Mitigation**: Make difficulty parameters configurable, test with multiple players, iterate based on feedback

---

## Requirements Summary

**Total Functional Requirements**: 8 major categories (FR1-FR8)
**Total Non-Functional Requirements**: 5 major categories (NFR1-NFR5)
**Technology**: Vanilla HTML5 Canvas + JavaScript
**Target Platform**: Web Browser (Desktop/Tablet)
**Project Type**: Greenfield (new development)
**Complexity**: Moderate
**Estimated Scope**: Single-page game application

---
