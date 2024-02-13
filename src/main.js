// Rosalind Dixon
// Drip. Feed.
// Time spent: a little longer than I should have? probably around 35~ hrs total
// Technical creative tilt: I made a font without the help of any font-creation programs, which meant I wrote an xml file,
//     something I didn't expect to do. I used the sml file from paddle parkour for reference, because it was hard to find info to work off.
//     this tutorial talks about xml files and was helpful in understanding what I needed to make (from scratch):
//     https://youtu.be/eejnHjgiy3I?si=u8rmChthc6akwMU- 
//     It's not very complicated or technically advanced, but I was also happy with the movement feel. I enjoy the almost pinball
//     physics that came out of the gravity and bounce.
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
    scene: [ Load, Menu, Rules, Play, GameOver ]
}
const game = new Phaser.Game(config)
const { width, height } = game.config
let cursors
let hiScore
let newHiScore = false

// uncomment the following line if you need to purge local storage data
//localStorage.clear()

// OFFICE HOURS
// [ ] why is the ui bar going so fast????