class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.spritesheet('playerCharacter', './assets/spritesheets/playerCharacter.png', {
            frameWidth: 35,
            frameHeight: 35
        })
        this.load.spritesheet('enemyCharacter', './assets/spritesheets/enemyCharacter.png', {
            frameWidth: 70,
            frameHeight: 70
        })
        this.load.spritesheet('exCharacter', './assets/spritesheets/enemyCharacter.png', {   // temp
            frameWidth: 70,
            frameHeight: 70
        })
        this.load.spritesheet('ohCharacter', './assets/spritesheets/enemyCharacter.png', {   // temp
            frameWidth: 70,
            frameHeight: 70
        })
        this.load.spritesheet('thing', './assets/spritesheets/thing.png', {
            frameWidth: 210,
            frameHeight: 700
        })
        this.load.image('background', './assets/background.png')
    }

    create() {
        console.log("MENU SCENE! YAHOOOO!")
        // set bg color
        this.cameras.main.setBackgroundColor('#9d300a')
        // character animation config
        this.anims.create({
            key: 'neutral',
            frames: this.anims.generateFrameNames('playerCharacter', { start: 0, end: 4 }),
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
            frames: this.anims.generateFrameNames('exCharacter', { start: 0, end: 13 }),
            frameRate: 5,
            repeat: -1
        })
        // oh animation config
        this.anims.create({
            key: 'oh',
            frames: this.anims.generateFrameNames('ohCharacter', { start: 0, end: 13 }),
            frameRate: 0,
            repeat: -1
        })
    }

    update() {
        this.scene.start('playScene')
    }
}