const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load sprite
const ghostySprite = new Image();
ghostySprite.src = 'assets/ghosty.png';

// Rain effect
const raindrops = [];
for (let i = 0; i < 100; i++) {
    raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 15 + 10
    });
}

// Lightning effect
let lightningTimer = 0;
let lightningActive = false;
let lightningDuration = 0;

function triggerLightning() {
    if (Math.random() < 0.01) {
        lightningActive = true;
        lightningDuration = 3;
    }
}

// Game state
let state = 'START';
let score = 0;
let highScore = parseInt(localStorage.getItem('kiro-ninja-high-score') || '0');
let gameOverTime = 0;
let explosionParticles = [];

// Ghosty (player)
const ghosty = {
    x: 150,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jump: -10
};

// Walls
const walls = [];
const wallWidth = 80;
const wallGap = 180;
const wallSpeed = 3;
let wallTimer = 0;
const wallInterval = 90;

// Audio
const sounds = {
    jump: new Audio('assets/jump.wav'),
    gameOver: new Audio('assets/game_over.wav')
};

// Input
let spacePressed = false;
window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!spacePressed) {
            spacePressed = true;
            if (state === 'START') {
                state = 'PLAYING';
            } else if (state === 'PLAYING') {
                ghosty.velocity = ghosty.jump;
                sounds.jump.currentTime = 0;
                sounds.jump.play().catch(() => {});
            } else if (state === 'GAME_OVER') {
                restart();
            }
        }
    }
});
window.addEventListener('keyup', e => {
    if (e.code === 'Space') spacePressed = false;
});

function spawnWall() {
    const minGapY = 100;
    const maxGapY = canvas.height - wallGap - 100;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
    
    walls.push({
        x: canvas.width,
        gapY: gapY,
        scored: false
    });
}

function update() {
    // Update rain
    raindrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
    
    // Update lightning
    triggerLightning();
    if (lightningActive) {
        lightningDuration--;
        if (lightningDuration <= 0) {
            lightningActive = false;
        }
    }
    
    // Update explosion particles
    if (explosionParticles.length > 0) {
        explosionParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.life -= 0.02;
        });
        explosionParticles = explosionParticles.filter(p => p.life > 0);
    }
    
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
    wallTimer++;
    if (wallTimer > wallInterval) {
        spawnWall();
        wallTimer = 0;
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
            score++;
        }
        
        if (ghosty.x + ghosty.radius > wall.x + 10 && ghosty.x - ghosty.radius < wall.x + 70) {
            const topPhoenixY = wall.gapY - 40;
            const bottomPhoenixY = wall.gapY + wallGap + 40;
            
            if (ghosty.y - ghosty.radius < topPhoenixY + 25 && ghosty.y + ghosty.radius > topPhoenixY - 25) {
                gameOver();
                return;
            }
            
            if (ghosty.y - ghosty.radius < bottomPhoenixY + 25 && ghosty.y + ghosty.radius > bottomPhoenixY - 25) {
                gameOver();
                return;
            }
        }
    }
}

function gameOver() {
    state = 'GAME_OVER';
    gameOverTime = Date.now();
    sounds.gameOver.currentTime = 0;
    sounds.gameOver.play().catch(() => {});
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('kiro-ninja-high-score', highScore.toString());
    }
    
    explosionParticles = [];
    for (let i = 0; i < 30; i++) {
        explosionParticles.push({
            x: ghosty.x,
            y: ghosty.y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            size: Math.random() * 8 + 4,
            color: Math.random() > 0.5 ? '#ff6b6b' : '#ffd93d'
        });
    }
}

function restart() {
    state = 'PLAYING';
    score = 0;
    ghosty.y = canvas.height / 2;
    ghosty.velocity = 0;
    walls.length = 0;
    wallTimer = 0;
    explosionParticles = [];
}

function drawPhoenix(x, y, isTop) {
    const time = Date.now() / 100;
    const wingFlap = Math.sin(time * 2) * 10;
    
    // Fire trail
    for (let i = 0; i < 8; i++) {
        const trailX = x - i * 15;
        const trailFlicker = Math.sin(time + i * 0.5) * 5;
        const trailSize = 20 - i * 2;
        
        ctx.fillStyle = `rgba(255, ${100 + Math.random() * 100}, 0, ${0.7 - i * 0.08})`;
        ctx.beginPath();
        ctx.arc(trailX, y + trailFlicker, trailSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 255, 0, ${0.5 - i * 0.06})`;
        ctx.beginPath();
        ctx.arc(trailX, y + trailFlicker, trailSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Body
    ctx.fillStyle = '#ff4500';
    ctx.beginPath();
    ctx.ellipse(x + 30, y, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.fillStyle = '#ff6347';
    ctx.beginPath();
    ctx.arc(x + 50, y - 5, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(x + 60, y - 5);
    ctx.lineTo(x + 70, y - 5);
    ctx.lineTo(x + 65, y);
    ctx.closePath();
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x + 55, y - 8, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Wings
    ctx.fillStyle = '#ff8c00';
    ctx.beginPath();
    ctx.moveTo(x + 30, y - 10);
    ctx.lineTo(x + 10, y - 30 + wingFlap);
    ctx.lineTo(x + 35, y - 5);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 10);
    ctx.lineTo(x + 10, y + 30 - wingFlap);
    ctx.lineTo(x + 35, y + 5);
    ctx.closePath();
    ctx.fill();
    
    // Tail feathers
    for (let i = 0; i < 3; i++) {
        const tailX = x + 5 - i * 8;
        const tailY = y + (i - 1) * 8;
        const tailFlicker = Math.sin(time + i) * 3;
        
        ctx.fillStyle = i === 0 ? '#ff0000' : i === 1 ? '#ff4500' : '#ff8c00';
        ctx.beginPath();
        ctx.ellipse(tailX, tailY + tailFlicker, 12, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 200, 0, 0.6)`;
        ctx.beginPath();
        ctx.arc(tailX - 10, tailY + tailFlicker, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255, 100, 0, 0.5)';
    ctx.fillStyle = '#ff6347';
    ctx.beginPath();
    ctx.arc(x + 50, y - 5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function render() {
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Lightning
    if (lightningActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        let x = startX, y = 0;
        ctx.moveTo(x, y);
        while (y < canvas.height) {
            x += (Math.random() - 0.5) * 50;
            y += Math.random() * 50 + 30;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    // Rain
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.3)';
    ctx.lineWidth = 1;
    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
    });
    
    // Ground
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    // Lava
    const time = Date.now() / 200;
    const lavaY = canvas.height - 50;
    
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(255, 100, 0, 0.8)';
    
    ctx.beginPath();
    ctx.moveTo(0, lavaY);
    for (let x = 0; x <= canvas.width; x += 10) {
        const wave1 = Math.sin((x + time * 50) * 0.02) * 8;
        const wave2 = Math.sin((x + time * 30) * 0.03) * 5;
        ctx.lineTo(x, lavaY + wave1 + wave2);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    const lavaGradient = ctx.createLinearGradient(0, lavaY, 0, canvas.height);
    lavaGradient.addColorStop(0, '#ff4500');
    lavaGradient.addColorStop(0.3, '#ff6347');
    lavaGradient.addColorStop(0.6, '#ff8c00');
    lavaGradient.addColorStop(1, '#8b0000');
    ctx.fillStyle = lavaGradient;
    ctx.fill();
    
    // Lava bubbles
    for (let i = 0; i < 8; i++) {
        const bubbleX = (time * 15 + i * 100) % canvas.width;
        const bubblePhase = (time + i * 0.5) % 3;
        
        if (bubblePhase < 2) {
            const bubbleY = lavaY + 15 - (bubblePhase * 15);
            const bubbleSize = 5 + bubblePhase * 4;
            const bubbleAlpha = 0.8 - (bubblePhase * 0.3);
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(255, 100, 0, ${bubbleAlpha})`;
            
            const bubbleGradient = ctx.createRadialGradient(bubbleX, bubbleY, 0, bubbleX, bubbleY, bubbleSize);
            bubbleGradient.addColorStop(0, `rgba(255, 255, 100, ${bubbleAlpha})`);
            bubbleGradient.addColorStop(0.5, `rgba(255, 150, 0, ${bubbleAlpha})`);
            bubbleGradient.addColorStop(1, `rgba(255, 50, 0, ${bubbleAlpha * 0.5})`);
            ctx.fillStyle = bubbleGradient;
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = `rgba(255, 255, 200, ${bubbleAlpha * 0.6})`;
            ctx.beginPath();
            ctx.arc(bubbleX - bubbleSize * 0.3, bubbleY - bubbleSize * 0.3, bubbleSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    ctx.shadowBlur = 0;
    
    // Phoenix birds
    walls.forEach(wall => {
        drawPhoenix(wall.x, wall.gapY - 40, true);
        drawPhoenix(wall.x, wall.gapY + wallGap + 40, false);
    });
    
    // Ghosty
    if (ghostySprite.complete && ghostySprite.naturalHeight !== 0) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(174, 194, 224, 0.6)';
        const spriteSize = ghosty.radius * 2;
        ctx.drawImage(ghostySprite, ghosty.x - ghosty.radius, ghosty.y - ghosty.radius, spriteSize, spriteSize);
        ctx.shadowBlur = 0;
    } else {
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(174, 194, 224, 0.8)';
        ctx.fillStyle = '#aec2e0';
        ctx.beginPath();
        ctx.arc(ghosty.x, ghosty.y, ghosty.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Explosion particles
    explosionParticles.forEach(p => {
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    // UI
    if (state === 'START') {
        ctx.font = 'bold 72px Arial';
        const titleGradient = ctx.createLinearGradient(0, canvas.height / 2 - 100, 0, canvas.height / 2 - 20);
        titleGradient.addColorStop(0, '#ff6b6b');
        titleGradient.addColorStop(0.5, '#ffd93d');
        titleGradient.addColorStop(1, '#6bcf7f');
        ctx.fillStyle = titleGradient;
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('KIRO NINJA', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = '28px Arial';
        ctx.fillStyle = '#aec2e0';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(174, 194, 224, 0.8)';
        ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2 + 30);
        ctx.shadowBlur = 0;
        
    } else if (state === 'PLAYING') {
        ctx.font = 'bold 64px Arial';
        ctx.textAlign = 'center';
        
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#00ffff';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 4;
        ctx.strokeText(`${score}`, canvas.width / 2, 80);
        
        const scoreGradient = ctx.createLinearGradient(0, 40, 0, 80);
        scoreGradient.addColorStop(0, '#ffffff');
        scoreGradient.addColorStop(1, '#00ffff');
        ctx.fillStyle = scoreGradient;
        ctx.shadowBlur = 20;
        ctx.fillText(`${score}`, canvas.width / 2, 80);
        ctx.shadowBlur = 0;
        
    } else if (state === 'GAME_OVER') {
        ctx.textAlign = 'center';
        
        const timeSinceGameOver = (Date.now() - gameOverTime) / 1000;
        if (timeSinceGameOver < 0.5) {
            const shakeX = (Math.random() - 0.5) * 10;
            const shakeY = (Math.random() - 0.5) * 10;
            ctx.translate(shakeX, shakeY);
        }
        
        if (timeSinceGameOver < 0.3) {
            ctx.fillStyle = `rgba(255, 0, 0, ${0.5 - timeSinceGameOver * 1.5})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.font = 'bold 72px Arial';
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#ff0000';
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 4;
        ctx.strokeText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
        
        const gameOverGradient = ctx.createLinearGradient(0, canvas.height / 2 - 80, 0, canvas.height / 2 - 20);
        gameOverGradient.addColorStop(0, '#ff6b6b');
        gameOverGradient.addColorStop(1, '#ff0000');
        ctx.fillStyle = gameOverGradient;
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = '36px Arial';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(174, 194, 224, 0.6)';
        ctx.fillStyle = '#aec2e0';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        
        ctx.font = '32px Arial';
        ctx.fillStyle = '#ffd93d';
        ctx.shadowColor = 'rgba(255, 217, 61, 0.6)';
        ctx.fillText(`Best: ${highScore}`, canvas.width / 2, canvas.height / 2 + 60);
        
        ctx.font = '24px Arial';
        const pulseAlpha = 0.5 + Math.sin(Date.now() / 300) * 0.5;
        ctx.fillStyle = `rgba(174, 194, 224, ${pulseAlpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(174, 194, 224, ${pulseAlpha})`;
        ctx.fillText('Press SPACE to Restart', canvas.width / 2, canvas.height / 2 + 110);
        ctx.shadowBlur = 0;
        
        if (timeSinceGameOver < 0.5) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    
    ctx.textAlign = 'left';
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
