class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    init(data) {
        this.SECONDS = data.SECONDS
        this.FINAL_SCORE = data.FINAL_SCORE
    }

    create() {
        //console.log("GAME OVER SCENE! PARTY TIME!") // just checking :)

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

        // hi-score config
        // https://github.com/nathanaltice/Paddle-Parkour-P360
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'))
            if(this.FINAL_SCORE > storedScore) {
                localStorage.setItem('hiscore', this.FINAL_SCORE.toString())
                hiScore = this.FINAL_SCORE
                newHiScore = true
            } else {
                hiScore = parseInt(localStorage.getItem('hiscore'))
                newHiScore = false
            }
        } else {
            hiScore = this.FINAL_SCORE
            localStorage.setItem('hiscore', hiScore.toString())
            newHiScore = true
        }

        this.add.bitmapText(35, 175, 'rozyFont', 'HISCORE', 35).setOrigin(0, 0)
        this.add.bitmapText(35, 210, 'rozyFont', 'SCORE', 35).setOrigin(0, 0)
        this.add.bitmapText(35, 245, 'rozyFont', 'TIME', 35).setOrigin(0, 0)

        this.add.bitmapText(315, 175, 'rozyFont', hiScore, 35).setOrigin(0, 0)
        this.add.bitmapText(315, 210, 'rozyFont', this.FINAL_SCORE, 35).setOrigin(0, 0)
        this.add.bitmapText(315, 245, 'rozyFont', `${this.SECONDS}S`, 35).setOrigin(0, 0)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.time.delayedCall(800, () => { // do not accept input immediately
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
        })
        this.cameras.main.shake(10, 0.001)
    }
}