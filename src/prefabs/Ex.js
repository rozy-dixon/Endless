class Ex extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, Phaser.Math.Between(35, width-35), Phaser.Math.Between(height-35-55, 35), 'exCharacter')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this).setOrigin(0, 0)

        this.body.setCircle(this.width/2)
        this.body.setImmovable(true)
        this.body.onCollide = true
    }

    move() {
        this.x = Phaser.Math.Between(35, width-35)
        this.y = Phaser.Math.Between(35, height-35-55)
    }
}