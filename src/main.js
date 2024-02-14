// Name: Rosalind Dixon
// Title: Drip. Feed.
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

/*
A NOTE ON ASSET CREATION:
    - sound effects were made in jsfxr: https://sfxr.me/
    - looping "music" was made in beepbox. If you want to mess around with it, these links will let you.
        - ocarina (just a big long sound): https://www.beepbox.co/#9n31s0k0l00e03t1Ua7g0fj07r1i0o432T1v1u18f0q00d23A0F0B0Q0000Pf600E1617T5v1ua5f60lc2dd2j02e02fd178q8141d26HK_Sziiirrqih99h0E0T5v0ud3f10m8q011d23HVxh90000000000h0E0T4v1uf0f0q011z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E0b4h400000000h4g000000014h000000004h400000000p1a002CZ7-w00
        - tune: https://www.beepbox.co/#9n31s0k0l00e07t2ca7g0fj07r1i0o432T1v1u18f0q00d23A0F0B0Q0000Pf600E1617T3v1uaef0q0x10p71d23Sp99f9c9Vppbaa9gE1b9T3v0uf4f0q0x10p61d08S09ajurqOiO99000E1b7T4v1uf0f0q011z6666ji8k8k3jSBKSJJAArriiiiii07JCABrzrrrrrrr00YrkqHrsrrrrjr005zrAqzrjzrrqr1jRjrqGGrrzsrsA099ijrABJJJIAzrrtirqrqjqixzsrAjrqjiqaqqysttAJqjikikrizrHtBJJAzArzrIsRCITKSS099ijrAJS____Qg99habbCAYrDzh00E0b00000000000i518j0000018Ol380000000000000000p21c0aq_miczlll2geNpplllnpImmlll6LGlllllkQxjtfWjq-3jNhwaq_GDIJLpGVr9FOsGDIJLpG00
            - I actually think the tempo on this link is off, but you get the idea
    - tiles, visual assets, and font were made in procreate: https://procreate.com/
        - pixel art brush: https://www.softwarehow.com/make-pixel-art-procreate/
*/

/*
GUIDELINES:
Use multiple Scene classes (dictated by your game's style) (1)
Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
    - see rules
Have some form of player input/control appropriate to your game design (1)
Include one or more animated characters that use a texture atlas* (1)
Simulate scrolling with a tileSprite (or equivalent means) (1)
Implement proper collision detection (via Arcade Physics or a custom routine) (1)
Have looping background music* (1)
Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
Be theoretically endless (1)
Be playable for at least 15 seconds for a new player of low to moderate skill (1)
Run without significant crashes or errors (1)
Include in-game credits for all roles, assets, music, etc. (1)
    - see rules also
*/