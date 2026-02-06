import { sounds } from './assets.js';
import { state, ghosty, setState } from './gameState.js';
import { restart } from './game.js';

let spacePressed = false;

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!spacePressed) {
            spacePressed = true;
            if (state === 'START') {
                setState('PLAYING');
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
