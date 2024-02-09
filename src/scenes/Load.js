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

        // load spritesheets
        // all-caps futura was used as reference for playerCharacter sprite, but loosely (the main goal was to fill out each tile)
        this.load.spritesheet('playerCharacter', './assets/spritesheets/playerCharacter.png', { frameWidth: 35, frameHeight: 35 })
        this.load.spritesheet('enemyCharacter', './assets/spritesheets/enemyCharacter.png', { frameWidth: 70, frameHeight: 70 })
        this.load.spritesheet('thing', './assets/spritesheets/thing.png', { frameWidth: 980, frameHeight: 700 })
        //this.load.spritesheet('horizontal', './assets/spritesheets/horizontal.png', { frameWidth: 980, frameHeight: 35 })
        //this.load.spritesheet('vertical', './assets/spritesheets/vertical.png', { frameWidth: 35, frameHeight: 700 })
        this.load.spritesheet('uiBar', './assets/spritesheets/uiBar.png', { frameWidth: 350, frameHeight: 35 })
        // ex, oh, and square (cross prep) loaded as spritesheets incase I want to add animations
        this.load.spritesheet('exCharacter', './assets/exCharacter.png', { frameWidth: 35, frameHeight: 35 })
        this.load.spritesheet('ohCharacterGreen', './assets/ohCharacterGreen.png', { frameWidth: 35, frameHeight: 35 })
        this.load.spritesheet('ohCharacterWhite', './assets/ohCharacterWhite.png', { frameWidth: 35, frameHeight: 35 })
        this.load.spritesheet('crossPrep', './assets/crossPrep.png', { frameWidth: 35, frameHeight: 35 })
        // load images
        this.load.image('background', './assets/background.png')        // scrolling background
        this.load.image('circleEmpty', './assets/circleEmpty.png')      // empty circle particle
        this.load.image('circleFilled', './assets/circleFilled.png')    // filled circle particle
        this.load.image('exParticle', './assets/exParticle.png')        // ex particle
        this.load.image('keyDown', './assets/keyDown.png')              // KEYS ->
        this.load.image('keyLeft', './assets/keyLeft.png')
        this.load.image('keyRight', './assets/keyRight.png')
        this.load.image('keyUp', './assets/keyUp.png')
        // load audio
        this.load.audio('enemyCollide1', './assets/audio/enemyCollide1.wav')
        this.load.audio('enemyCollide2', './assets/audio/enemyCollide2.wav')
        this.load.audio('enemyCollide3', './assets/audio/enemyCollide3.wav')
        this.load.audio('exCollide', './assets/audio/exCollide.wav')
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
            frameRate: 20,
            repeat: -1
        })
        // enemy animation config
        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNames('enemyCharacter', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        })
        // drip feed
        this.anims.create({
            key: 'ui-bar',
            frames: this.anims.generateFrameNames('uiBar', {start: 0, end: 9 }),
            framRate: 10,
            repeat: -1
        })

        // check for local storage browser support
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')
        this.scene.start('titleScene')  // No need to stick around here
    }
}