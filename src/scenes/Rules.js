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

        // credits (more hardcoding because of the space bar stuff sorry)
        this.add.bitmapText(35, 315, 'rozyFont', 'CREDS:', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 350, 'rozyFont', 'SOUND', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 385, 'rozyFont', 'ART', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 420, 'rozyFont', 'DESIGN', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 455, 'rozyFont', 'PROGRAMMING', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 490, 'rozyFont', 'ETC.', 35).setOrigin(0, 0)
        this.add.bitmapText(280, 315, 'rozyFont', 'ROSALIND', 35).setOrigin(0, 0)
        this.add.bitmapText(595, 315, 'rozyFont', 'DIXON', 35).setOrigin(0, 0)
        this.add.bitmapText(35, 560, 'rozyFont', 'CREDS:', 35).setOrigin(0, 0)
        this.add.bitmapText(280, 560, 'rozyFont', 'LOOTBNDT', 35).setOrigin(0, 0)
        this.add.bitmapText(70, 595, 'rozyFont', 'INSPIRATION', 35).setOrigin(0, 0)
    }

    update() {
        if(cursors.left.isDown) {
            this.sound.play('click3')
            this.scene.start('menuScene')
        }
    }
}