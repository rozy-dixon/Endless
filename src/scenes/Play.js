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
    }

    create() {
        console.log("PLAY SCENE! YIPPPEEEEE!!") // just checking :)

        // set background
        this.background = this.add.tileSprite(0, 0, 980, 755, 'background').setOrigin(0, 0)

        // collision sounds
        const explosions = [ 'enemyCollide1', 'enemyCollide2', 'enemyCollide3' ]
        this.explosionSound = explosions[Math.floor(Math.random()*3)]

        // COLLISION CONFIG
        // thing collision config
        this.thing = this.physics.add.sprite(35, 0, 'thing', 1).setOrigin(1, 0)
        this.thing.body.immovable = true
        this.thing.body.onOverlap = true
        this.thing.anims.play('thing-calm')
        this.thing.alpha = .3
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
        this.thingScore = 0
        this.exScore = 0
        this.ohScore = 0
        this.gameOver = false
        this.exScoreUI = this.add.text(width/2, 32, this.exScore).setOrigin(0.5)
        this.physics.world.setBounds(0, 0, width, height-55, true, true, true, true)
        // black out the UI box
        const blackFill = this.add.graphics({ fillStyle: { color: 0x101010 } })
        const blackBoxUI = new Phaser.Geom.Rectangle(0, 700, width, 55)
        blackFill.fillRectShape(blackBoxUI).setDepth(100)
        this.whiteFill = this.add.graphics({ lineStyle: { width: 0, color: 0xF6F0DD }, fillStyle: { color: 0xF6F0DD } })
        this.scoreBarUI = new Phaser.Geom.Rectangle((width/2)-(350/2), 710, this.ohScore, 35)      // max size: 472.5
        this.whiteFill.fillRectShape(this.scoreBarUI).setAlpha(.5).setDepth(100)
        // ui bar temp
        this.uiBar = this.add.sprite((width/2)-(350/2), 710, 'uiBar', 1).setOrigin(0, 0).setDepth(100)
        this.uiBar.anims.play('ui-bar')
    }

    update() {
        // game over
        if(this.gameOver) {
            this.scene.start("gameOverScene")
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
            this.exScore++
            this.exScoreUI.text = this.exScore
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
        if(this.ohScore < 350) {
            this.ohScore += 2.5
            this.scoreBarUI.width = this.ohScore
            this.whiteFill.clear()
            this.whiteFill.fillRectShape(this.scoreBarUI)
        } else if(this.ohScore >= 350) {
            this.gameOver = true
        }
        this.sound.play(this.explosionSound)
    }

    handleThingScoreSubtract() {
        if(this.thingScore >= 5 && this.thingScore < width-35) {
            this.thingScore -= 5
        }
    }

    levelUp() {
        this.SECONDS++
        if(this.SECONDS%6 == 0) {
            this.SPEED += .5
            this.OH_VELOCITY += 20
            this.ENEMY_VELOCITY -= 20
            // [ ] speed up animation
        }
        if(this.SECONDS%10 == 0) {
            console.log(this.SECONDS)
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