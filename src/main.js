// Rosalind Dixon
// Drip. Feed.
// Not sure yet
// Technical creative tilt: It's not very complicated or technically advanced, but I was happy with the movement feel. I wanted the player
//     to feel like they were being drawn backwards and I feel like I was able to balance that and player control.
// Visual creative tilt: I wanted to try and make very convensional tiles, but to use them in an unconventional way. I was inspired by
//     this image https://twitter.com/lootbndt/status/1515811010904473607?s=12&t=n20BpP6zux0w-ImiGmqAnA made by @LootBndt on Twitter/X.
//     The goal was to make something abstract, or at least something that didn't look like a creature or object.

let config = {
    parent: 'endlessRunner',
    type: Phaser.AUTO,
    width: 980,
    height: 755,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [ Load, Title, Menu, Play, GameOver ]
}
const game = new Phaser.Game(config)
const { width, height } = game.config
let cursors

// [ ] delay not going down (send to nate and nathan)

// [ ] Ask about the loading bar
// [ ] scene transition (game.renderer.snapshot)
// [ ] store hi-score
// [ ] display keys as pressed
// [ ] Limit teleportation ??
// [ ] damping
// [ ] forward and backward animations
// [ ] check fsm for narmalizing and shirt+space
// [ ] destroy the oh collided with on impact
// [ ] hurt animation
// [ ] make randomizaion tile specific
// [ ] make enemies and ohs collide
// [ ] setRandomPosition()