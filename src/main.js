// Rosalind Dixon
// Drip. Feed.
// Not sure yet
// Technical creative tilt: It's not very complicated or technically advanced, but I was happy with the movement feel. I wanted the player
//     to feel like they were being drawn backwards and I feel like I was able to balance that and player control.
// Visual creative tilt: I wanted to try and make very convensional tiles, but to use them in an unconventional way. I was inspired by
//     this image https://twitter.com/lootbndt/status/1515811010904473607?s=12&t=n20BpP6zux0w-ImiGmqAnA made by @LootBndt on Twitter/X.
// Rules:
// - the more particles it eats, the bigger it becomes. 
// - colliding with enemies bounces you and produces particles.
// - hitting ohs produces particles.
// - hitting exes produces ex particles, which counteract the particles the thing has eaten.
// - spending x amount of time in the thing kills you.

let config = {
    parent: 'endlessRunner',
    type: Phaser.AUTO,
    width: 980,
    height: 755,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Title, Menu, Play ]
}
const game = new Phaser.Game(config)
const { width, height } = game.config
let cursors

// [ ] Ask about normalizing
// [ ] Ask about the loading bar
// [ ] scene transition (game.renderer.snapshot)
// [ ] store hi-score
// [ ] display keys as pressed
// [ ] Limit teleportation
// [ ] damping
// [ ] make it so nothing goes into the UI box
// [ ] forward and backward animations
// [ ] check fsm for narmalizing and shirt+space
// [ ] destroy the oh collided with on impact
// [ ] hurt animation
// [ ] make randomizaion tile specific