class Rules extends Phaser.Scene {
    constructor() {
        super("rulesScene")
    }

    create() {
        //console.log("RULES SCENE! AMAZING!") // just checking :)

        // set background
        this.add.image(0, 0, 'rules').setOrigin(0, 0)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(cursors.left.isDown) {
            this.sound.play('click3')
            this.scene.start('menuScene')
        }
    }
}