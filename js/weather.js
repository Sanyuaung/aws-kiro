import { canvas } from './assets.js';

export const raindrops = [];
for (let i = 0; i < 100; i++) {
    raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 15 + 10
    });
}

export let lightningActive = false;
export let lightningDuration = 0;

export function triggerLightning() {
    if (Math.random() < 0.01) {
        lightningActive = true;
        lightningDuration = 3;
    }
}

export function updateLightning() {
    if (lightningActive) {
        lightningDuration--;
        if (lightningDuration <= 0) {
            lightningActive = false;
        }
    }
}

export function updateRain() {
    raindrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
}
