class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocityX) {
        super(scene, velocityX)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setVelocityX(velocityX)
        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true
        this.anims.play('enemy')

        //this.enemy = this.physics.add.sprite(width-50, height/2, 'enemyCharacter', 1)
        //this.enemy.body.setCircle(this.enemy.width/2)
        //this.enemy.body.setImmovable(true)
        //this.enemy.body.onCollide = true
        //this.enemy.anims.play('enemy')

        this.new = true
    }

    update() {
        // When the first enemy is almost gone, throw in a new one
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        if(this.new && this.x <= width*.75) {
            this.scene.addEnemy(this.parent, this.velocityX)
            this.new = false
        }
        // Destroy enemy when no longer visible
        if(this.x < -this.width) {
            this.destroy()
        }
    }
}