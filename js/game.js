import { canvas, sounds } from './assets.js';
import { state, score, highScore, ghosty, walls, wallWidth, wallGap, wallSpeed, wallTimer, wallInterval, setState, setScore, setHighScore, setGameOverTime, setWallTimer } from './gameState.js';
import { updateRain, triggerLightning, updateLightning } from './weather.js';
import { updateExplosion, createExplosion, clearExplosion } from './particles.js';
import { spawnWall } from './phoenix.js';

export function update() {
    updateRain();
    triggerLightning();
    updateLightning();
    updateExplosion();
    
    if (state !== 'PLAYING') return;
    
    // Update Ghosty
    ghosty.velocity += ghosty.gravity;
    ghosty.y += ghosty.velocity;
    
    // Ground collision
    if (ghosty.y + ghosty.radius > canvas.height) {
        gameOver();
        return;
    }
    
    // Ceiling collision
    if (ghosty.y - ghosty.radius < 0) {
        ghosty.y = ghosty.radius;
        ghosty.velocity = 0;
    }
    
    // Spawn walls
    setWallTimer(wallTimer + 1);
    if (wallTimer > wallInterval) {
        spawnWall();
        setWallTimer(0);
    }
    
    // Update walls
    for (let i = walls.length - 1; i >= 0; i--) {
        const wall = walls[i];
        wall.x -= wallSpeed;
        
        if (wall.x + wallWidth < 0) {
            walls.splice(i, 1);
            continue;
        }
        
        if (!wall.scored && wall.x + wallWidth < ghosty.x) {
            wall.scored = true;
            setScore(score + 1);
        }
        
        if (ghosty.x + ghosty.radius > wall.x + 10 && ghosty.x - ghosty.radius < wall.x + 70) {
            if (ghosty.y - ghosty.radius < wall.y + 25 && ghosty.y + ghosty.radius > wall.y - 25) {
                gameOver();
                return;
            }
        }
    }
}

function gameOver() {
    setState('GAME_OVER');
    setGameOverTime(Date.now());
    sounds.gameOver.currentTime = 0;
    sounds.gameOver.play().catch(() => {});
    if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('kiro-ninja-high-score', score.toString());
    }
    createExplosion(ghosty.x, ghosty.y);
}

export function restart() {
    setState('PLAYING');
    setScore(0);
    ghosty.y = canvas.height / 2;
    ghosty.velocity = 0;
    walls.length = 0;
    setWallTimer(0);
    clearExplosion();
}
