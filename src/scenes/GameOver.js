class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        console.log("GAME OVER SCENE! PARTY TIME!") // just checking :)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        this.gameOver = this.add.text(width/2, 35, 'game over').setOrigin(0.5)
        this.pressUp = this.add.text(width/2, 70, 'press ^ to begin again').setOrigin(0.5)
        // [ ] check for new hi score
        // [ ] display score and seconds played
        // [ ] display hi score
    }

    update() {
        if(cursors.up.isDown) {
            this.scene.start('playScene')
        }
    }
}