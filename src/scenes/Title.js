class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log("TITLE SCENE! YOWZA!")  // just checking :)
        this.scene.start('menuScene')
    }
}