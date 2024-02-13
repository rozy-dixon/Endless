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
    }
}