class Vertical extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x) {
        super(scene, x, (height-55)/2, 'vertical')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setImmovable(true)
        this.body.onCollide = true
        this.anims.play('vertical-active')

        this.scene.time.delayedCall(3000, () => {
            this.destroy()
        })
    }
}