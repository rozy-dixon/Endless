class Oh extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, velocity) {
        super(scene, x, y, 'ohCharacterWhite')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true

        if(direction == 1) { // normalize and organize
            this.setVelocityX(velocity/1.3)
            this.setVelocityY(velocity/1.3) 
        } else if(direction == 2) { 
            this.setVelocityX(velocity)
        } else if(direction == 3) {
            this.setVelocityX(velocity/1.3)
            this.setVelocityY(-velocity/1.3)
        } else if(direction == 4) { 
            this.setVelocityY(-velocity)
        } else if(direction == 5) { 
            this.setVelocityX(-velocity/1.3)
            this.setVelocityY(-velocity/1.3)
        } else if(direction == 6) { 
            this.setVelocityX(-velocity)
        } else if(direction == 7) { 
            this.setVelocityX(-velocity/1.3)
            this.setVelocityY(velocity/1.3)
        } else if(direction == 8) { 
            this.setVelocityY(velocity)
        }
    }

    update() {
        if(this.x < -this.width || this.x > width+this.width) {
            this.destroy()
        }
        if(this.y < -this.height || this.y > height+this.height) {
            this.destroy()
        }
    }
}