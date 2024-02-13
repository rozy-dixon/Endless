class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocityX, level) {
        super(scene, width+100, Phaser.Math.Between(height-35-55, 35), 'enemyCharacter')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setVelocityX(velocityX)
        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true
        this.anims.play('enemy')

        this.new = true
        this.level = level

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.levelUpEnemy,
            callbackScope: this
        })
    }

    update() {
        // When the first enemy is almost gone, throw in a new one
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        if(this.new && this.x <= width/9 && this.level <= 30) { 
            this.scene.addEnemy(this.parent, this.velocityX) 
            this.new = false
        } else if (this.new && this.x <= width/3 && this.level > 90) { 
            this.scene.addEnemy(this.parent, this.velocityX) 
            this.new = false
        } else if (this.new && this.x <= width/6 && this.level > 30) { 
            this.scene.addEnemy(this.parent, this.velocityX) 
            this.new = false
        }
        // Destroy enemy when no longer visible
        if(this.x < -this.width) {
            this.destroy()
        }
    }

    levelUpEnemy() {
        this.level++
    }
}