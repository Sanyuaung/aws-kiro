export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

export const ghostySprite = new Image();
ghostySprite.src = 'assets/ghosty.png';

export const sounds = {
    jump: new Audio('assets/jump.wav'),
    gameOver: new Audio('assets/game_over.wav')
};
