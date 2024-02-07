class Oh extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, velocity) {
        super(scene, x, y, 'ohCharacterWhite')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true

        this.direction = direction
        this.velocity = velocity

        this.shoot()
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
        if(this.direction == 1) { // normalize and organize with switch()
            this.setVelocityX(this.velocity/1.3)
            this.setVelocityY(this.velocity/1.3) 
        } else if(this.direction == 2) { 
            this.setVelocityX(this.velocity)
        } else if(this.direction == 3) {
            this.setVelocityX(this.velocity/1.3)
            this.setVelocityY(-this.velocity/1.3)
        } else if(this.direction == 4) { 
            this.setVelocityY(-this.velocity)
        } else if(this.direction == 5) { 
            this.setVelocityX(-this.velocity/1.3)
            this.setVelocityY(-this.velocity/1.3)
        } else if(this.direction == 6) { 
            this.setVelocityX(-this.velocity)
        } else if(this.direction == 7) { 
            this.setVelocityX(-this.velocity/1.3)
            this.setVelocityY(this.velocity/1.3)
        } else if(this.direction == 8) { 
            this.setVelocityY(this.velocity)
        }
    }
}