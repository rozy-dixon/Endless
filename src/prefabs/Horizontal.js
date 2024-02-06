class Horizontal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y) {
        super(scene, width/2, y, 'horizontal')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setImmovable(true)
        this.body.onCollide = true
        this.anims.play('horizontal-active')
    }

    update() {
        // empty
    }
}