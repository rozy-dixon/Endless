class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        console.log("GAME OVER SCENE! PARTY TIME!") // just checking :)

        // set background
        this.add.image(0, 0, 'gameOver').setOrigin(0, 0)

        // play the the creepy tune
        this.ocarina = this.sound.add('ocarina', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        })
        this.ocarina.play()

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        // [ ] check for new hi score
        // [ ] display score and seconds played
        // [ ] display hi score
    }

    update() {
        if(cursors.up.isDown) {
            this.ocarina.stop()
            this.sound.play('click1')
            this.scene.start('playScene')
        }
        if(cursors.left.isDown) {
            this.ocarina.stop()
            this.sound.play('click2')
            this.scene.start('menuScene')
        }
        if(cursors.right.isDown) {
            this.ocarina.stop()
            this.sound.play('click3')
            this.scene.start('rulesScene')
        }
        this.cameras.main.shake(10, 0.001)
    }
}