class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        // define variables
        this.ACCELERATION = 3000
        this.MAX_VELOCITY = 1000
        this.DRAG = .05
        this.BOUNCE = .7
        this.SPEED = 4
        this.ENEMY_SPEED = -800
        this.DELAY = 2000
    }

    create() {
        console.log("PLAY SCENE! YIPPPEEEEE!!") // just checking :)
        // set background
        this.background = this.add.tileSprite(0, 0, 980, 700, 'background').setOrigin(0, 0)

        // COLLISION CONFIG
        // https://github.com/nathanaltice/BigBodies used as reference
        // player character physics and movement config
        this.player = this.physics.add.sprite(width/2, height/2, 'playerCharacter', 1)
        this.player.body.setCollideWorldBounds(true)
        this.player.setBounce(this.BOUNCE)
        this.player.body.setCircle(this.player.width/2) // While tiles are typically square, I chose to use a circular body. ->
        this.player.setMaxVelocity(this.MAX_VELOCITY)   // I wanted the player to have a little wiggle room considering ->
        this.player.setDamping(true)                    // the sprite is both a little unconventional and less visually stable.
        this.player.setDrag(this.DRAG)
        this.player.body.onCollide = true
        this.player.body.onOverlap = true
        this.player.anims.play('neutral')
        // thing collision config
        this.thing = this.physics.add.sprite(0, 0, 'thing', 1).setOrigin(0, 0)
        this.thing.body.immovable = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')
        // ex collision config
        this.ex = this.physics.add.sprite(width-50, height/4, 'exCharacter', 1)
        this.ex.body.setCircle(this.ex.width/2)
        this.ex.body.onOverlap = true
        this.ex.anims.play('ex')
        // ex collision config
        this.oh = this.physics.add.sprite(width-50, (height/4)*3, 'ohCharacter', 1)
        this.oh.body.setCircle(this.ex.width/2)
        this.oh.body.onOverlap = true
        this.oh.anims.play('oh')
        
        // enemy group config
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(this.DELAY, () => { 
            this.addEnemy() 
        })

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        this.message = this.add.text(width/2, 32, 'Awaiting physics world events...').setOrigin(0.5)

        // tracking collisions visually
        // https://github.com/nathanaltice/BigBodies used as reference
        this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
            if (obj1 == this.player && obj2 == this.thing) {
                this.message.text = `EVACUATE.`
            } else {
                this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`
            }
        })
    }

    update() {
        this.background.tilePositionX += this.SPEED
        // handle input
        if(cursors.up.isDown) {
            this.player.body.setAccelerationY(-this.ACCELERATION)
        }
        if(cursors.down.isDown) {
            this.player.body.setAccelerationY(this.ACCELERATION)
        } 
        if(!cursors.up.isDown && !cursors.down.isDown) {
            this.player.setAccelerationY(0)
        }
        if(cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION)
        } else if (cursors.right.isDown) {
            this.player.body.setAccelerationX(this.ACCELERATION*.2)
        } else {
            this.player.setAccelerationX(-this.ACCELERATION*.2)
        }

        // detecting collisions
        // https://github.com/nathanaltice/BigBodies used as reference
        this.physics.collide(this.player, this.enemyGroup)
        var overlapThingPlayer = this.physics.overlap(this.player, this.thing)
        var overlapExPlayer = this.physics.overlap(this.player, this.ex)
        var overlapOhPlayer = this.physics.overlap(this.player, this.oh)
        if (!overlapThingPlayer && !overlapExPlayer && !overlapOhPlayer) {
            this.message.text = 'Awaiting physics world events...';
        }
    }

    addEnemy() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let enemy = new Enemy(this, this.ENEMY_SPEED)
        this.enemyGroup.add(enemy)
    }
}