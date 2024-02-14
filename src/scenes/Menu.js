class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        //console.log("MENU SCENE! YAHOOOO!") // just checking :)

        // set background
        this.add.image(0, 0, 'menu').setOrigin(0, 0)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()

        // hardcoding sorry (also taking advantage of my lack of lower-case letters) ->
        this.reset = this.add.bitmapText(210, 175, 'rozyFont', 'reset', 35).setOrigin(0, 0)
        this.successful = this.add.bitmapText(420, 175, 'rozyFont', 'successful', 35).setOrigin(0, 0)
    }

    update() {
        if(cursors.up.isDown) {
            this.sound.play('click3')
            this.scene.start('playScene')
        }
        if(cursors.right.isDown) {
            this.sound.play('click2')
            this.scene.start('rulesScene')
        }
        if(cursors.shift.isDown && cursors.left.isDown) {
            this.sound.play('click3')
            this.reset.text = 'RESET'
            this.successful.text = 'SUCCESSFUL'
            localStorage.clear()
        }
    }
}