class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0xFFFFFF, 1)
            loadingBar.fillRect(0, height/2, width * value, 5)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // load spritesheets, images, sound, and font
        this.load.spritesheet('playerCharacter', './assets/spritesheets/playerCharacter.png', {
            frameWidth: 35,
            frameHeight: 35
        })  // the playerCharacter sprite is inspired by all-caps futura, but is not faithful to it
        this.load.spritesheet('enemyCharacter', './assets/spritesheets/enemyCharacter.png', {   // temp
            frameWidth: 70,
            frameHeight: 70
        })
        this.load.spritesheet('exCharacter', './assets/exCharacter1.png', {
            frameWidth: 35,
            frameHeight: 35
        })
        this.load.spritesheet('ohCharacter', './assets/ohCharacter.png', {
            frameWidth: 35,
            frameHeight: 35
        })
        this.load.spritesheet('thing', './assets/spritesheets/thing.png', {
            frameWidth: 210,
            frameHeight: 700
        })
        this.load.image('background', './assets/background.png')
        this.load.image('circleEmpty', '/assets/circleEmpty.png')
        this.load.image('circleFilled', '/assets/circleFilled.png')
    }

    create() {
        console.log('LOADING SCREEN! OH BOY!')  // just checking :)

        // CONFIGURE ANIMATIONS
        // character animation config
        this.anims.create({
            key: 'neutral',
            frames: this.anims.generateFrameNames('playerCharacter', { start: 0, end: 20 }),
            frameRate: 15,
            repeat: -1
        })
        // thing animation config
        this.anims.create({
            key: 'thing-calm',
            frames: this.anims.generateFrameNames('thing', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'thing-agitated',
            frames: this.anims.generateFrameNames('thing', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1
        })
        // enemy animation config
        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNames('enemyCharacter', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        })
        // ex animation config
        this.anims.create({
            key: 'ex',
            frames: this.anims.generateFrameNames('exCharacter', { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        })
        // oh animation config
        this.anims.create({
            key: 'oh',
            frames: this.anims.generateFrameNames('ohCharacter', { start: 0, end: 0 }),
            frameRate: 0,
            repeat: -1
        })

        // check for local storage browser support
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        this.scene.start('titleScene')  // No need to stick around here
    }
}