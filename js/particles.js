export let explosionParticles = [];

export function createExplosion(x, y) {
    explosionParticles = [];
    for (let i = 0; i < 30; i++) {
        explosionParticles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            size: Math.random() * 8 + 4,
            color: Math.random() > 0.5 ? '#ff6b6b' : '#ffd93d'
        });
    }
}

export function updateExplosion() {
    if (explosionParticles.length > 0) {
        explosionParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.life -= 0.02;
        });
        explosionParticles = explosionParticles.filter(p => p.life > 0);
    }
}

export function clearExplosion() {
    explosionParticles = [];
}
