class Oh extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, velocity, level) {
        super(scene, x, y, 'ohCharacterWhite')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true

        this.direction = direction
        this.velocity = velocity
        this.level = level

        this.shoot()
        /* 
        if(this.level > 10) {
            this.scene.time.addEvent({
                delay: 1500,
                repeat: 1,
                callback: this.shoot,
                callbackScope: this
            })
        }
        */
        /* 
        Uncaught TypeError: Cannot read properties of undefined (reading 'setVelocityX')
        at Oh.setVelocityX (phaser.js:150819:19)
        at Oh.shoot (Oh.js:38:26)
        at Clock.update (phaser.js:230237:36)
        at EventEmitter.emit (phaser.js:220:33)
        at Systems.step (phaser.js:197307:16)
        at SceneManager.update (phaser.js:194544:21)
        at Game.step (phaser.js:17206:20)
        at TimeStep.step (phaser.js:18230:14)
        at step (phaser.js:31330:19)
        */
    }

    update() {
        if(this.x < -this.width || this.x > width+this.width) {
            this.destroy()
        }
        if(this.y < -this.height || this.y > height+this.height) {
            this.destroy()
        }
    }

    shoot() {
        switch (this.direction) {
            case 1: this.setVelocityX(this.velocity/1.3)
                this.setVelocityY(this.velocity/1.3)
                break
            case 2: this.setVelocityX(this.velocity)
                break
            case 3: this.setVelocityX(this.velocity/1.3)
                this.setVelocityY(-this.velocity/1.3)
                break
            case 4: this.setVelocityY(-this.velocity)
                break
            case 5: this.setVelocityX(-this.velocity/1.3)
                this.setVelocityY(-this.velocity/1.3)
                break
            case 6: this.setVelocityX(-this.velocity)
                break
            case 7: this.setVelocityX(-this.velocity/1.3)
                this.setVelocityY(this.velocity/1.3)
                break
            case 8: this.setVelocityY(this.velocity)
                break
        }
        /* if(this.level > 10) {
            console.log('lvl greater than 10.')
            this.scene.time.delayedCall(1500, () => { 
            })
        } */
    }
}