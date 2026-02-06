import { canvas } from './assets.js';

export let state = 'START';
export let score = 0;
export let highScore = parseInt(localStorage.getItem('kiro-ninja-high-score') || '0');
export let gameOverTime = 0;

export const ghosty = {
    x: 150,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jump: -10
};

export const walls = [];
export const wallWidth = 80;
export const wallGap = 180;
export const wallSpeed = 3;
export let wallTimer = 0;
export const wallInterval = 90;

export function setState(newState) {
    state = newState;
}

export function setScore(newScore) {
    score = newScore;
}

export function setHighScore(newHighScore) {
    highScore = newHighScore;
}

export function setGameOverTime(time) {
    gameOverTime = time;
}

export function setWallTimer(timer) {
    wallTimer = timer;
}
