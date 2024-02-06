class Vertical extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x) {
        super(scene, x, height/2, 'vertical')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setImmovable(true)
        this.body.onCollide = true
        this.anims.play('vertical-active')
    }

    update() {
        // empty
    }
}