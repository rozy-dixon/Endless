class Oh extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ohCharacterWhite')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setImmovable(true)
        this.body.onCollide = true
    }

    update() {
        // empty
    }
}