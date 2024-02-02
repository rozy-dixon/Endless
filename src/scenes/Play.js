class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        // define variables
        this.ACCELERATION = 3000
        this.MAX_VELOCITY = 1000
        this.DRAG = .05
        this.BOUNCE = .5
        this.SPEED = 4
        this.ENEMY_SPEED = -800
        this.DELAY = 3000
    }

    create() {
        console.log("PLAY SCENE! YIPPPEEEEE!!") // just checking :)

        // set background
        this.background = this.add.tileSprite(0, 0, 980, 755, 'background').setOrigin(0, 0)

        // UI CONFIG
        // https://phaser.io/examples/v3/category/geom/rectangle used as reference
        // https://janisjenny.medium.com/how-to-set-world-bounds-with-phaser-99bde692970e used as reference
        this.physics.world.setBounds(0, 0, width, height-55, true, true, true, true)
        const graphics = this.add.graphics({ lineStyle: { width: 3, color: 0xFFFFFF }, fillStyle: { color: 0x000000 }})
        const emptyBarUI = new Phaser.Geom.Rectangle((width/2)-(500/2), 710, 500, 35)
        graphics.strokeRectShape(emptyBarUI)

        // COLLISION CONFIG
        // https://github.com/nathanaltice/BigBodies used as reference
        this.player = new Player(this)
        this.player.body.onCollide = true
        this.player.body.onOverlap = true
        // thing collision config
        this.thing = this.physics.add.sprite(0, 0, 'thing', 1).setOrigin(0, 0)
        this.thing.body.immovable = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')
        // ex collision config
        this.ex = this.physics.add.sprite(width-50, (height-55)/4, 'exCharacter', 1)
        this.ex.body.setCircle(this.ex.width/2)
        this.ex.body.onOverlap = true
        this.ex.anims.play('ex')
        // ex collision config
        this.oh = this.physics.add.sprite(width-50, ((height-55)/4)*3, 'ohCharacter0', 1)
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
        // the goal here is responsive, yet fluid, running with the current
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
        // no just down property for cursors, handle teleportation (not sure I like this)
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.player.x += 200
            this.player.setAccelerationY(0)
            this.player.setAccelerationX(0)
            // burst forward animation
        } else if(Phaser.Input.Keyboard.JustDown(cursors.shift)) {
            this.player.x -= 200
            this.player.setAccelerationY(0)
            this.player.setAccelerationX(0)
            // burst backward animation
        }

        // detecting collisions
        // https://github.com/nathanaltice/BigBodies used as reference
        var collideEnemyPlayer = this.physics.collide(this.player, this.enemyGroup)
        var overlapThingPlayer = this.physics.overlap(this.player, this.thing)
        var overlapExPlayer = this.physics.overlap(this.player, this.ex)
        var overlapOhPlayer = this.physics.overlap(this.player, this.oh)
        if(!overlapThingPlayer && !overlapExPlayer && !overlapOhPlayer) {
            this.message.text = 'Awaiting physics world events...';
        } else if(overlapExPlayer) {
            this.exParticles()
        } else if(overlapOhPlayer) {
            this.ohParticlesEmpty()
        }
        if(collideEnemyPlayer) {
            this.ohParticlesFilled()
            this.ohParticlesEmpty()
        }
    }

    addEnemy() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let enemy = new Enemy(this, this.ENEMY_SPEED)
        this.enemyGroup.add(enemy)
    }

    ohParticlesFilled() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        this.add.particles(this.player.x, this.player.y, 'circleFilled', {
            gravityX: -2000,
            speed: 100,
            lifespan: 10000,
            maxParticles: 10,
            blendMode: 'ADD'
        })
    }

    ohParticlesEmpty() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        this.add.particles(this.player.x, this.player.y, 'circleEmpty', {
            gravityX: -1500,
            speed: 150,
            lifespan: 10000,
            maxParticles: 10,
            blendMode: 'ADD'
        })
    }

    exParticles() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        this.add.particles(this.player.x, this.player.y, 'exParticle', {
            gravityX: -2000,
            speed: 100,
            lifespan: 10000,
            maxParticles: 20,
            blendMode: 'ADD'
        })
    }
}