class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        console.log("MENU SCENE! YAHOOOO!") // just checking :)
    }

    update() {
        this.scene.start('playScene')
    }
}