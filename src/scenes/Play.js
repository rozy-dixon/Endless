class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        // define variables
        this.ACCELERATION = 3000
        this.MAX_VELOCITY = 1000
        this.DRAG = .05
    }

    create() {
        console.log("PLAY SCENE! Yippeeee!!")
        // set background
        //this.cameras.main.setBackgroundColor('#101010')
        this.background = this.add.tileSprite(0, 0, 980, 700, 'background').setOrigin(0, 0)
        // player character physics and movement config
        this.player = this.physics.add.sprite(width/2, height/2, 'playerCharacter', 1)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setCircle(this.player.width/2)
        this.player.setMaxVelocity(this.MAX_VELOCITY)
        this.player.setDamping(true)
        this.player.setDrag(this.DRAG)
        this.player.body.onCollide = true
        this.player.body.onOverlap = true
        // thing collision config
        this.thing = this.physics.add.sprite(0, 0, 'thing', 1).setOrigin(0, 0)
        this.thing.body.immovable = true
        this.thing.body.onCollide = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')
        // enemy collision config
        this.enemy = this.physics.add.sprite(width-50, height/2, 'enemyCharacter', 1)
        this.enemy.body.setCircle(this.enemy.width/2)
        this.enemy.body.onCollide = true
        this.enemy.body.onOverlap = true
        this.enemy.anims.play('enemy')
        // ex collision config
        this.ex = this.physics.add.sprite(width-50, height/4, 'exCharacter', 1).setScale(.5)
        this.ex.body.setCircle(this.ex.width/2)
        this.ex.body.onCollide = true
        this.ex.body.onOverlap = true
        this.ex.anims.play('ex')
        // ex collision config
        this.oh = this.physics.add.sprite(width-50, (height/4)*3, 'ohCharacter', 1).setScale(.5)
        this.oh.body.setCircle(this.ex.width/2)
        this.oh.body.onCollide = true
        this.oh.body.onOverlap = true
        this.oh.anims.play('oh')
        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        this.message = this.add.text(width/2, 32, 'Awaiting physics world events...').setOrigin(0.5)
        this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
            this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`
        })
    }

    update() {
        this.background.tilePositionX += 4
        // handle input
        if(cursors.up.isDown) {
            this.player.body.setAccelerationY(-this.ACCELERATION)
        } else if(cursors.down.isDown) {
            this.player.body.setAccelerationY(this.ACCELERATION)
        } else {
            this.player.setAccelerationY(0)
        }
        if(cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION)
            this.player.anims.play('neutral', true)
        } else if (cursors.right.isDown) {
            this.player.body.setAccelerationX(this.ACCELERATION*.25)
            this.player.anims.play('neutral', true)
        } else {
            this.player.setAccelerationX(-this.ACCELERATION*.15)
            this.player.anims.play('neutral', true)
        }

        var overlapThingPlayer = this.physics.overlap(this.player, this.thing)
        if (!overlapThingPlayer) {
            this.message.text = 'Awaiting physics world events...';
        }
    }
}