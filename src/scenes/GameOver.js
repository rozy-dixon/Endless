class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        console.log("GAME OVER SCENE! PARTY TIME!") // just checking :)

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
        this.gameOver = this.add.text(width/2, 35, 'game over').setOrigin(0.5)
        this.pressUp = this.add.text(width/2, 70, 'press ^ to begin again.').setOrigin(0.5)
        // [ ] check for new hi score
        // [ ] display score and seconds played
        // [ ] display hi score
    }

    update() {
        if(cursors.up.isDown) {
            this.ocarina.stop()
            this.scene.start('playScene')
        }
    }
}