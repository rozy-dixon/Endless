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
        this.ENEMY_VELOCITY = -600
        this.OH_VELOCITY = 300
        this.DELAY = 3000
        this.SECONDS = 0
        this.FINAL_SCORE = 0
    }

    create() {
        //console.log("PLAY SCENE! YIPPPEEEEE!!") // just checking :)
        
        // play my little tune
        this.tune = this.sound.add('tune', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.tune.play()

        // set background
        this.background = this.add.tileSprite(0, 0, 980, 755, 'background').setOrigin(0, 0)

        // collision sounds
        const explosions = [ 'enemyCollide1', 'enemyCollide2', 'enemyCollide3' ]
        this.explosionSound = explosions[Math.floor(Math.random()*3)]

        // COLLISION CONFIG
        this.physics.world.setBounds(0, 0, width, height-55, true, true, true, true)
        // thing collision config
        this.thing = this.physics.add.sprite(35, 0, 'thing', 1).setOrigin(1, 0)
        this.thing.body.immovable = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')
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
        this.enemyGroup = this.add.group({ runChildUpdate: true })
        this.time.delayedCall(this.DELAY, () => { this.addEnemy() })
        // ex config
        this.ex = new Ex(this)
        // oh config
        this.ohGroup = this.add.group({ runChildUpdate: true })
        this.addOhGroup60()
        this.time.delayedCall(60000, () => { this.addOhGroup120() })
        this.time.delayedCall(120000, () => { this.addOhGroup() })
        
        // define cursors
        cursors = this.input.keyboard.createCursorKeys()

        // timer
        this.timer = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.levelUp,
            callbackScope: this
        })

        // UI & SCORE CONFIG
        // https://phaser.io/examples/v3/category/geom/rectangle used as reference
        // https://janisjenny.medium.com/how-to-set-world-bounds-with-phaser-99bde692970e used as reference
        this.thingScore = 70
        this.ohScore = 0
        this.gameOver = false
        // black out the UI box
        const blackFill = this.add.graphics({ fillStyle: { color: 0x101010 } })
        const blackBoxUI = new Phaser.Geom.Rectangle(0, 700, width, 55)
        blackFill.fillRectShape(blackBoxUI).setDepth(100)
        // ui bar temp
        this.cropValue = 0
        this.uiBarRed = this.add.sprite(width-10, 710, 'uiBarRed', 1).setOrigin(1, 0).setDepth(100)
        this.uiBarRed.anims.play('ui-red')
        this.uiBar = this.add.sprite(width-10, 710, 'uiBar', 1).setOrigin(1, 0).setDepth(100).setCrop(this.cropValue, 0, 525, 35)
        this.uiBar.anims.play('ui-white')
        // score display
        this.finalScoreUI = this.add.bitmapText(10, 710, 'rozyFont', this.FINAL_SCORE, 35).setOrigin(0, 0).setDepth(100)
    }

    update() {
        // game over
        if(this.gameOver) {
            this.tune.stop()
            this.timer.destroy()
            this.scene.start('gameOverScene', { 
                SECONDS: this.SECONDS,
                FINAL_SCORE: this.FINAL_SCORE
            })
        }

        // scrolling background
        this.background.tilePositionX += this.SPEED

        // detecting collisions
        // https://github.com/nathanaltice/BigBodies used as reference
        var slow = false
        if(this.physics.overlap(this.player, this.thing)) { slow = true }
        if(this.physics.collide(this.player, this.enemyGroup)) {
            this.ohParticlesFilled()
            this.ohParticlesEmpty()
            this.handleThingScoreAdd()
            this.cameras.main.shake(100, 0.015)
        }
        if(this.physics.collide(this.player, this.ohGroup)) {
            this.ohParticlesEmpty()
            this.handleThingScoreAdd()
            this.cameras.main.shake(100, 0.015)
        }
        if(this.physics.collide(this.player, this.ex)) {
            this.handleThingScoreSubtract()
            this.FINAL_SCORE++
            this.finalScoreUI.text = this.FINAL_SCORE
            this.exParticles()
            this.ex.move()
            this.cameras.main.shake(80, 0.01)
            this.sound.play('exCollide')
        }

        // handle input
        // the goal here is responsive, yet fluid, running with the current
        // I know this is horrifying. I'm sorry
        if(cursors.up.isDown && !slow) { this.player.body.setAccelerationY(-this.ACCELERATION) }            // move up
        else if(cursors.up.isDown && slow) { this.player.body.setAccelerationY(-this.ACCELERATION/2) }
        if(cursors.down.isDown && !slow) { this.player.body.setAccelerationY(this.ACCELERATION) }           // move down
        else if(cursors.down.isDown && slow) { this.player.body.setAccelerationY(this.ACCELERATION/2) }
        if(!cursors.up.isDown && !cursors.down.isDown) { this.player.setAccelerationY(0) }                  // not moving up or down
        if(cursors.left.isDown && !slow) { this.player.body.setAccelerationX(-this.ACCELERATION) }          // move left
        else if(cursors.left.isDown && slow) { this.player.body.setAccelerationX(-this.ACCELERATION/2) }
        else if (cursors.right.isDown && !slow) { this.player.body.setAccelerationX(this.ACCELERATION*.2) } // move right
        else if (cursors.right.isDown && slow) { this.player.body.setAccelerationX((this.ACCELERATION*.15)) }
        else { this.player.setAccelerationX(-this.ACCELERATION*.2) }                                        // not moving left or right

        // moving the thing
        if(this.thingScore%35 == 0 || this.thingScore == 0) {
            this.thing.x = ((this.thingScore/35)*35)+35
        }
    }

    // HANDLE SCORE & LEVELING/SECONDS-PLAYED

    handleThingScoreAdd() {
        if(this.thingScore >= 0 && this.thingScore <= width-35) {
            this.thingScore += 5
        }
        // https://phaser.io/examples/v3/category/geom/rectangle used as reference
        if(this.ohScore < 215) {
            this.ohScore += 5
            if(this.ohScore%15 == 0) {
                this.cropValue += 35
                this.uiBar.setCrop(this.cropValue, 0, 525, 35)
            }
        } else if(this.ohScore >= 215) {
            this.gameOver = true
        }
        this.sound.play(this.explosionSound)
        this.player.anims.play('hurt')
        this.player.on('animationcomplete', () => {
            this.player.anims.play('neutral')
        })
    }

    handleThingScoreSubtract() {
        if(this.thingScore >= 5 && this.thingScore < width-35) {
            this.thingScore -= 5
        }
        this.player.anims.play('collect')
        this.player.on('animationcomplete', () => {
            this.player.anims.play('neutral')
        })
    }

    levelUp() {
        this.SECONDS++
        if(this.SECONDS%6 == 0) {
            this.SPEED += .5
            this.OH_VELOCITY += 20
            this.ENEMY_VELOCITY -= 20
        }
    }

    // HANDLE ENEMIES

    addEnemy() {
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let enemy = new Enemy(this, this.ENEMY_VELOCITY, this.SECONDS)
        this.enemyGroup.add(enemy)
    }

    addOh() {
        let ohX = Phaser.Math.Between(35, width-35)
        let ohY = Phaser.Math.Between(35, height-55-35)
        for (let i = 1; i <= 8; i++) {
            let oh = new Oh(this, ohX, ohY, i, this.OH_VELOCITY, this.SECONDS)
            this.ohGroup.add(oh)
        }
    }

    addOhGroup60() {
        this.time.addEvent({
            delay: this.DELAY,
            repeat: 18, 
            callback: this.addOh, 
            callbackScope: this 
        })
    }

    addOhGroup120() {
        this.time.addEvent({
            delay: 2000,
            repeat: 29, 
            callback: this.addOh, 
            callbackScope: this 
        })
    }
    
    addOhGroup() {
        this.time.addEvent({
            delay: 1000,
            loop: true, 
            callback: this.addOh, 
            callbackScope: this 
        })
    }

    addCross() {
        let horizontalY = Phaser.Math.Between(35, height-55-35)
        let verticalX = Phaser.Math.Between(35, width-35)
        this.time.delayedCall(4000, () => {
            let horizontal = new Horizontal(this, horizontalY)
            let vertical = new Vertical(this, verticalX)
            this.crossGroup.add(horizontal)
            this.crossGroup.add(vertical)
        })
    }

    addCrossGroup() {
        this.time.addEvent({
            delay: this.DELAY+4000,
            loop: true,
            callback: this.addCross,
            callbackScope: this
        })
    }

    // PARTICLE EFFECTS

    ohParticlesFilled() {
        this.add.particles(this.player.x, this.player.y, 'circleFilled', {
            gravityX: -2000,
            speed: 100,
            lifespan: 10000,
            maxParticles: 10,
            blendMode: 'ADD'
        })
    }

    ohParticlesEmpty() {
        this.add.particles(this.player.x, this.player.y, 'circleEmpty', {
            gravityX: -1500,
            speed: 150,
            lifespan: 10000,
            maxParticles: 10,
            blendMode: 'ADD'
        })
    }

    exParticles() {
        this.add.particles(this.player.x, this.player.y, 'exParticle', {
            gravityX: -2000,
            speed: 100,
            lifespan: 10000,
            maxParticles: 20,
            blendMode: 'ADD'
        })
    }
}