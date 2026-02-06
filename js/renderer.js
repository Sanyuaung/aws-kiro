import { canvas, ctx, ghostySprite } from './assets.js';
import { raindrops, lightningActive } from './weather.js';
import { explosionParticles } from './particles.js';
import { state, score, highScore, gameOverTime, ghosty, walls, wallGap } from './gameState.js';
import { drawPhoenix } from './phoenix.js';

export function render() {
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
        drawPhoenix(wall.x, wall.y, false);
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
