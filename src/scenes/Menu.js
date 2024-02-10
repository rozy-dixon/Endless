class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        console.log("MENU SCENE! YAHOOOO!") // just checking :)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        this.gameOver = this.add.text(width/2, 35, 'DRIP. FEED.').setOrigin(0.5)
        this.pressUp = this.add.text(width/2, 70, 'press ^ to begin.').setOrigin(0.5)
    }

    update() {
        if(cursors.up.isDown) {
            this.scene.start('playScene')
        }
    }
}