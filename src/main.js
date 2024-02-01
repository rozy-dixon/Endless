let config = {
    type: Phaser.AUTO,
    width: 980,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}
const game = new Phaser.Game(config)
const { width, height } = game.config
let cursors

// [ ] Ask about drag
// [ ] Ask about making prefabs
// [ ] Ask about normalizing
// [ ] load.js
// [ ] scene transition (game.renderer.snapshot)
// [ ] bounce player from edge of screen and enemy
// [ ] store hi-score
// [ ] display keys as pressed
// [ ] display lives on player