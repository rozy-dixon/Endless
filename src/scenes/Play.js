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
        this.ENEMY_VELOCITY = -800
        this.DELAY = 3000
    }

    create() {
        console.log("PLAY SCENE! YIPPPEEEEE!!") // just checking :)

        // set background
        this.background = this.add.tileSprite(0, 0, 980, 755, 'background').setOrigin(0, 0)

        // COLLISION CONFIG
        // player collision config
        this.player = this.physics.add.sprite(width/2, (height-55)/2, 'playerCharacter', 1)
        this.player.body.setCollideWorldBounds(true)
        this.player.setBounce(this.BOUNCE)
        this.player.body.setCircle(this.player.width/2) // While tiles are typically square, I chose to use a circular body. ->
        this.player.setMaxVelocity(this.MAX_VELOCITY)   // I wanted the player to have a little wiggle room considering ->
        this.player.setDamping(true)                    // the sprite is both a little unconventional and less visually stable.
        this.player.setDrag(this.DRAG)
        this.player.body.onCollide = true
        this.player.body.onOverlap = true
        this.player.anims.play('neutral')
        // enemy group config
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })
        this.time.delayedCall(this.DELAY, () => {
            this.addEnemy() 
        })
        // ex config
        this.ex = new Ex(this)
        // thing collision config
        this.thing = this.physics.add.sprite(35, 0, 'thing', 1).setOrigin(1, 0)
        this.thing.body.immovable = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()
        this.message = this.add.text(width/2, 35, 'Awaiting physics world events...').setOrigin(0.5)

        // tracking collisions visually
        // https://github.com/nathanaltice/BigBodies used as reference
        this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
            if (obj1 == this.player && obj2 == this.thing) {
                this.message.text = `EVACUATE.`
            } else {
                this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`
            }
        })

        // UI CONFIG
        // https://phaser.io/examples/v3/category/geom/rectangle used as reference
        // https://janisjenny.medium.com/how-to-set-world-bounds-with-phaser-99bde692970e used as reference
        this.scoreText = this.add.text(width/2, height-60, 'Awaiting physics world events...').setOrigin(0.5)
        this.score = 0
        this.physics.world.setBounds(0, 0, width, height-55, true, true, true, true)
        const whiteStroke = this.add.graphics({ lineStyle: { width: 3, color: 0xF6F0DD }, fillStyle: { color: 0x000000 }})
        this.whiteFill = this.add.graphics({ lineStyle: { width: 0, color: 0xF6F0DD }, fillStyle: { color: 0xF6F0DD }})
        const emptyBarUI = new Phaser.Geom.Rectangle((width/2)-(500/2), 710, 485, 35)
        whiteStroke.strokeRectShape(emptyBarUI)
        this.scoreBarUI = new Phaser.Geom.Rectangle((width/2)-(500/2)+5, 715, this.score, 25)   // max size: 472.5
        this.whiteFill.fillRectShape(this.scoreBarUI)
    }

    update() {
        this.background.tilePositionX += this.SPEED
        // handle input
        // the goal here is responsive, yet fluid, running with the current
        if(cursors.up.isDown) { this.player.body.setAccelerationY(-this.ACCELERATION) }             // move up
        if(cursors.down.isDown) { this.player.body.setAccelerationY(this.ACCELERATION) }            // move down
        if(!cursors.up.isDown && !cursors.down.isDown) { this.player.setAccelerationY(0) }          // not moving up or down
        if(cursors.left.isDown) { this.player.body.setAccelerationX(-this.ACCELERATION) }           // move left
        else if (cursors.right.isDown) { this.player.body.setAccelerationX(this.ACCELERATION*.2) }  // move right
        else { this.player.setAccelerationX(-this.ACCELERATION*.2) }                                // not moving left or right
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
        var overlapThingPlayer = this.physics.overlap(this.player, this.thing)
        //var collideEnemyPlayer = this.physics.collide(this.player, this.enemyGroup)
        //var collideExPlayer = this.physics.collide(this.player, this.ex)
        if(!overlapThingPlayer) {
            this.message.text = 'Awaiting physics world events...'
        }
        if(this.physics.collide(this.player, this.enemyGroup)) {
            this.ohParticlesFilled()
            this.ohParticlesEmpty()
            this.handleScoreAdd()
        }
        if(this.physics.collide(this.player, this.ex)) {
            this.handleScoreSubtract()
        }
        // moving the thing
        if(this.score%35 == 0 || this.score == 0) {
            this.thing.x = ((this.score/35)*35)+35
        }
    }

    addEnemy() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let enemy = new Enemy(this, this.ENEMY_VELOCITY)
        this.enemyGroup.add(enemy)
    }

    handleScoreAdd() {
        if(this.score >= 0 && this.score <= width-35) {
            this.score += 5
            this.scoreText.text = this.score
            // https://phaser.io/examples/v3/category/geom/rectangle used as reference
            this.scoreBarUI.width = this.score/2
            this.whiteFill.clear()
            this.whiteFill.fillRectShape(this.scoreBarUI)
        }
    }

    handleScoreSubtract() {
        if(this.score >= 5 && this.score < width-35) {
            this.score -= 5
            this.scoreText.text = this.score
            // https://phaser.io/examples/v3/category/geom/rectangle used as reference
            this.scoreBarUI.width = this.score/2
            this.whiteFill.clear()
            this.whiteFill.fillRectShape(this.scoreBarUI)
        }
    }

    // PARTICLE EFFECTS

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