class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, width/2, (height-55)/2, 'playerCharacter')

        scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setCollideWorldBounds(true)
        this.setBounce(this.BOUNCE)
        this.body.setCircle(this.width/2)           // While tiles are typically square, I chose to use a circular body. ->
        this.setMaxVelocity(this.MAX_VELOCITY)      // I wanted the player to have a little wiggle room considering ->
        this.setDamping(true)                       // the sprite is both a little unconventional and less visually stable.
        this.setDrag(this.DRAG)
        this.anims.play('neutral')
    }

    update() {

    }
}