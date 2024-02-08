// Rosalind Dixon
// Drip. Feed.
// Not sure yet
// Technical creative tilt: It's not very complicated or technically advanced, but I was happy with the movement feel. I wanted the player
//     to feel like they were being drawn backwards and I feel like I was able to balance that and player control.
// Visual creative tilt: I wanted to try and make very convensional tiles, but to use them in an unconventional way. I was inspired by
//     this image https://twitter.com/lootbndt/status/1515811010904473607?s=12&t=n20BpP6zux0w-ImiGmqAnA made by @LootBndt on Twitter/X.

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
    scene: [ Load, Title, Menu, Play ]
}
const game = new Phaser.Game(config)
const { width, height } = game.config
let cursors

// OFFICE HOURS
// [ ] github green box only
// [ ] delay not going down (send to nate and nathan)
// [ ] ohs going over UI box (set depth)

// [ ] change scoring system
// [ ] current score system controls thing (from slow down to slow down + pull)
// [ ] collecting ex and time = hi-score
// [ ] bar fills up *only* and cannot be brought down. it determines game over.
//     - rather than being a bar, it should spell out []DRIP[]FEED[]
// [ ] make X thicker

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
// [ ] make enemies and ohs collide
// [ ] setRandomPosition()

// OTHER THOUGHTS:
// - gradients and grains
// - tile by tile movement
// - scanlines, wave
// - enemy groupings of random type
// - animated shaky tile https://twitter.com/MrmoTarius/status/1746838312956911859
// - halftones & layering
// - photo cutout sprites
// - procedurally generated rooms, grid of 9? rooms redone on every entrance
//   - or two roooms
// - terminal-esque output