import { canvas, ctx } from './assets.js';
import { walls, wallWidth, wallGap } from './gameState.js';

export function drawPhoenix(x, y, isTop) {
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

export function spawnWall() {
    const lanes = [120, 200, 280, 360, 440]; // 5 different lanes
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    
    walls.push({
        x: canvas.width,
        y: lane,
        scored: false
    });
}
