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
    }
}