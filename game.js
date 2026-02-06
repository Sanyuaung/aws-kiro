import './js/input.js';
import { update } from './js/game.js';
import { render } from './js/renderer.js';

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
