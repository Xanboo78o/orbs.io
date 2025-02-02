const UPGRADES = {
    ORBS_GALORE: {
        name: "Orbs Galore",
        description: "Increase orb spawn count by 50%",
        effect: (scene) => {
            scene.baseOrbCount = Math.floor(scene.baseOrbCount * 1.5);
            scene.spawnOrbs(5); // Spawn some extra orbs immediately
        }
    },
    TITAN_SPHERES: {
        name: "Titan Spheres",
        description: "Fewer orbs, but they're 50% bigger",
        effect: (scene) => {
            scene.baseOrbCount = Math.max(4, Math.floor(scene.baseOrbCount * 0.7));
            scene.orbSizeMultiplier = (scene.orbSizeMultiplier || 1) * 1.5;
            scene.orbs.getChildren().forEach(orb => {
                orb.setScale(orb.scale * 1.5);
            });
        }
    },
    SWIFT_HUNTER: {
        name: "Swift Hunter",
        description: "20% more speed, but 10% smaller size",
        effect: (scene) => {
            scene.moveSpeed *= 1.2;
            scene.player.baseScale *= 0.9;
            scene.player.setScale(scene.player.baseScale);
        }
    },
    GENTLE_GIANT: {
        name: "Gentle Giant",
        description: "20% slower, but 25% larger size",
        effect: (scene) => {
            scene.moveSpeed *= 0.8;
            scene.player.baseScale *= 1.25;
            scene.player.setScale(scene.player.baseScale);
        }
    },
    SHIELD_MASTER: {
        name: "Shield Master",
        description: "Shield power-ups last 50% longer",
        effect: (scene) => {
            scene.shieldDurationMultiplier = (scene.shieldDurationMultiplier || 1) * 1.5;
        }
    },
    GROWTH_EXPERT: {
        name: "Growth Expert",
        description: "Orbs provide 25% more growth",
        effect: (scene) => {
            scene.growthMultiplier = (scene.growthMultiplier || 1) * 1.25;
        }
    },
    SHRINK_RESISTANT: {
        name: "Shrink Resistant",
        description: "Reduce shrinking rate by 20%",
        effect: (scene) => {
            scene.shrinkResistance = (scene.shrinkResistance || 0) + 0.2;
        }
    },
    SPEED_DEMON: {
        name: "Speed Demon",
        description: "Speed power-ups last twice as long",
        effect: (scene) => {
            scene.speedBoostDurationMultiplier = (scene.speedBoostDurationMultiplier || 1) * 2;
        }
    },
    ORB_MAGNET: {
        name: "Orb Magnet",
        description: "Orbs move slightly toward you (very weak pull)",
        effect: (scene) => {
            scene.magnetStrength = (scene.magnetStrength || 0) + 0.3;
        }
    },
    SPEED_SURGE: {
        name: "Speed Surge",
        description: "Tiny speed boost",
        effect: (scene) => {
            scene.moveSpeed *= 1.1;
        }
    },
    STICKY_TRAIL: {
        name: "Sticky Trail",
        description: "Orbs just behind you get nudged forward",
        effect: (scene) => {
            scene.stickyTrail = true;
        }
    },
    GHOST_FLICKER: {
        name: "Ghost Flicker",
        description: "Can pass through one obstacle per level",
        effect: (scene) => {
            scene.ghostCharges = (scene.ghostCharges || 0) + 1;
        }
    },
    GLUTTONY: {
        name: "Gluttony",
        description: "Every 10 orbs, grow 5% bigger",
        effect: (scene) => {
            scene.gluttonyCount = 0;
            scene.hasGluttony = true;
        }
    },
    MINI_ORBIT: {
        name: "Mini Orbit",
        description: "A small orb circles you and can collect one orb",
        effect: (scene) => {
            scene.createOrbitalHelper();
        }
    },
    QUICK_TURN: {
        name: "Quick Turn",
        description: "Slightly smoother turning",
        effect: (scene) => {
            scene.turnSpeed = (scene.turnSpeed || 1) * 1.2;
        }
    },
    CHAIN_PULL: {
        name: "Chain Pull",
        description: "The next orb you eat pulls in one more nearby",
        effect: (scene) => {
            scene.chainPullEnabled = true;
        }
    },
    PHANTOM_NUDGE: {
        name: "Phantom Nudge",
        description: "Orbs just outside your reach shift toward you slightly",
        effect: (scene) => {
            scene.phantomRange = (scene.phantomRange || 0) + 50;
        }
    },
    HEAVY_CORE: {
        name: "Heavy Core",
        description: "Move 5% slower but push small orbs slightly",
        effect: (scene) => {
            scene.moveSpeed *= 0.95;
            scene.pushStrength = (scene.pushStrength || 0) + 0.5;
        }
    },
    LIGHTWEIGHT: {
        name: "Lightweight",
        description: "Move 5% faster but orbs are normal",
        effect: (scene) => {
            scene.moveSpeed *= 1.05;
        }
    },
    MOMENTUM_DRIFT: {
        name: "Momentum Drift",
        description: "Tiny speed boost when moving in straight line for 3s",
        effect: (scene) => {
            scene.hasMomentumDrift = true;
            scene.straightLineTime = 0;
        }
    },
    GROWTH_SPURTS: {
        name: "Growth Spurts",
        description: "Every 15 orbs, get slightly bigger for a few seconds",
        effect: (scene) => {
            scene.growthSpurtCount = 0;
            scene.hasGrowthSpurts = true;
        }
    },
    MINI_FEAST: {
        name: "Mini Feast",
        description: "One random orb per level gives double points",
        effect: (scene) => {
            scene.miniFeastEnabled = true;
        }
    },
    REACTIVE_BOUNCE: {
        name: "Reactive Bounce",
        description: "Orbs that hit walls bounce slightly toward you",
        effect: (scene) => {
            scene.hasReactiveBounce = true;
        }
    },
    DOUBLE_UP: {
        name: "Double Up",
        description: "Every 20 orbs, one spawns slightly bigger",
        effect: (scene) => {
            scene.doubleUpCount = 0;
            scene.hasDoubleUp = true;
        }
    },
    SHRUNKEN_LUCK: {
        name: "Shrunken Luck",
        description: "A few small orbs appear instead of normal ones",
        effect: (scene) => {
            scene.hasShrunkenLuck = true;
        }
    },
    SOFT_MAGNET: {
        name: "Soft Magnet",
        description: "Orbs move toward you, but very slowly",
        effect: (scene) => {
            scene.softMagnetStrength = (scene.softMagnetStrength || 0) + 0.2;
        }
    },
    SPEED_DIP: {
        name: "Speed Dip",
        description: "Lose a tiny bit of speed but grow slightly bigger",
        effect: (scene) => {
            scene.moveSpeed *= 0.95;
            scene.growthMultiplier = (scene.growthMultiplier || 1) * 1.1;
        }
    },
    FINAL_BITE: {
        name: "Final Bite",
        description: "The last orb before leveling up gives tiny score boost",
        effect: (scene) => {
            scene.hasFinalBite = true;
        }
    }
};

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.currentTip = 0;
        this.tips = [
            'Collect orbs to grow bigger',
            'Don\'t let your size drop too low',
            'Rainbow orbs are rare but valuable!',
            'Colored orbs have special effects',
            'The bigger you are, the harder to maintain size',
            'Red orbs, or Speed boost orbs, help catch distant orbs',
            'Yellow orbs, or Shield orbs, prevent shrinking temporarily',
            'Purple orbs provide extra large growth',
            'Green orbs split into two new orbs',
            'Rainbow orbs grant random powerful bonuses',
            'Gold orbs are rare and worth massive points',
            'Lime orbs grant permanent speed increases',
            'Gray orbs reduce shrinking temporarily',
            'Orange orbs reward you for moving fast',
            'Blue orbs give bonuses based on your size',
            'Pink orbs are small but worth extra points',
            'Cyan orbs are common but reliable points',
            'Legend says there\'s an ultra rare invisible orb',
            'Eating orbs is part of a balanced breakfast',
            'No orbs were harmed in the making of this game',
            'Pro tip: Don\'t play while skydiving',
            'That one orb is definitely following you',
            'Sometimes the orbs dream of becoming squares',
            'Warning: Game may cause unexpected joy',
            'Tip: Moving helps you move',
            'Fun fact: You\'re reading this instead of playing',
            'The orbs appreciate your dedication',
            'Studies show winners collect more orbs',
            'Conspiracy theory: All orbs are cake',
            'Your character is just a very hungry circle',
            'Orbs taste like their color (probably)',
            'High score = More bragging rights',
            'Plot twist: You were the orb all along',
            'Try not to think about how many orbs you\'ve eaten',
            'The orbs have names, but they\'re shy',
            'Pressing ALT+F4 definitely doesn\'t give extra points',
            'Press F to pay respects to fallen orbs',
            'The orb is a lie',
            'It\'s dangerous to go alone, take these orbs',
            'Gotta catch \'em all... wait, wrong game',
            'Do a barrel roll! (Actually, don\'t)',
            'Orbs are the only ones who know what it\'s like to be a circle',
            'sigma',
            'skibidi',
            'Stop looking at random tips and play the game',
            'C\'mon, keep playing',
            'You\'re doing great!',
            'Technoblade never dies',
            'Gluten-Free.',
            'I\'m not like the other girls',
            'I\'m not like the other girls, I\'m a pterodactyl',
            'It\'s wednesday my dudes!',
            'Alexander hamilton.',
            'NO DON\'T DO IT WITH MARIA REYNOLDS',
            'I am cool, I am very cool',
            'I am cool, I am very cool, I am super cool',
            'I am cool, I am very cool, I am super cool, I am mega cool',
            'I am cool, I am very cool, I am super cool, I am mega cool, I am ultra cool',
            'I am cool, I am very cool, I am super cool, I am mega cool, I am ultra cool, I am hyper cool',
            'I am cool, I am very cool, I am super cool, I am mega cool, I am ultra cool, I am hyper cool, I am mega hyper cool',
            'I am speed',
            'Ka-Chow',
            'meow',
            'Are you the rizzler?',
            'I am the rizzler',
            'Gronkowski',
            'She was a fairy',
            'Raise your YA YA YAAAAA',
            'Raise your right finger',
            'I am your father',
            'IT\'S A TRAP!',
            'To infinity and beyond!',
            'What if its all a simulation?',
            'MICHEAL',
            'I am the god of war',
            'GLAD0S is pretty /jasltext/',
            'KEEP GOING!',
            'Praise the Sun! \\[T]/',
            '✧༺ JUMBALAYA ༻✧',
            'Æ',
            '🐖⚔️👑',
            'Shakira',
        ];
        this.isTransitioning = false;
        this.lastTip = 0;
        this.specialTips = [
            '✧༺ JUMBALAYA ༻✧',
            'Technoblade never dies'
        ];
        this.specialColors = {
            '✧༺ JUMBALAYA ༻✧': 'rainbow',
            'Technoblade never dies': '#00b7ff'  // Bright blue color
        };
    }

    create() {
        // Add semi-transparent overlay
        this.add.rectangle(0, 0, 800, 600, 0x000000, 0.5).setOrigin(0);

        // Create background orbs group
        this.backgroundOrbs = this.add.group();
        
        // Spawn some background orbs
        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 600);
            const orb = this.add.circle(x, y, 4, 0x00ffff, 0.5);
            this.backgroundOrbs.add(orb);
            
            // Give each orb slow random movement
            this.tweens.add({
                targets: orb,
                x: Phaser.Math.Between(0, 800),
                y: Phaser.Math.Between(0, 600),
                duration: Phaser.Math.Between(4000, 8000),
                repeat: -1,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
        }

        // Add title
        const title = this.add.text(400, 200, '[Name goes here]', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Add username input
        const usernamePrompt = this.add.text(400, 250, 'Enter your username:', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const usernameInput = document.createElement('input');
        usernameInput.setAttribute('type', 'text');
        usernameInput.setAttribute('placeholder', 'Username');
        usernameInput.style.position = 'absolute';
        usernameInput.style.left = '50%';
        usernameInput.style.top = '50%';
        usernameInput.style.transform = 'translate(-50%, -50%)';
        usernameInput.style.padding = '8px';
        usernameInput.style.width = '200px';
        usernameInput.style.textAlign = 'center';
        usernameInput.style.fontSize = '18px';
        document.body.appendChild(usernameInput);

        // Modify start button
        const startButton = this.add.text(400, 350, 'Start Game', {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => startButton.setStyle({ color: '#ffff00' }))
        .on('pointerout', () => startButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => {
            const username = usernameInput.value.trim();
            if (username) {
                document.body.removeChild(usernameInput);
                this.scene.start('GameScene', { username: username });
            } else {
                usernameInput.style.borderColor = 'red';
            }
        });

        // Move tip text down
        this.instructionText = this.add.text(400, 500, this.tips[0], {
            fontSize: '24px',
            color: '#cccccc',
            align: 'center',
            wordWrap: { width: 600 },
            lineSpacing: 10,
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            if (!this.isTransitioning) {
                this.cycleTip(true);
                // Reset the timer
                if (this.tipTimer) this.tipTimer.reset();
            }
        });

        // Auto-cycle tips every 7 seconds
        this.tipTimer = this.time.addEvent({
            delay: 7000,
            callback: () => {
                if (!this.isTransitioning) {
                    this.cycleTip(false);
                }
            },
            loop: true
        });

        // Add keyboard listener for F key
        this.input.keyboard.on('keydown-F', () => {
            if (!this.respectsPaid) { // Prevent spam
                this.payRespects();
            }
        });

        // Clean up input when leaving scene
        this.events.on('shutdown', () => {
            if (document.body.contains(usernameInput)) {
                document.body.removeChild(usernameInput);
            }
        });
    }

    cycleTip(isClick) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Stop any existing rainbow animation
        if (this.rainbowTween) {
            this.rainbowTween.stop();
            this.rainbowTween = null;
        }

        // Fade out current tip
        this.tweens.add({
            targets: this.instructionText,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                // Update text
                if (isClick) {
                    let newTip;
                    do {
                        newTip = Phaser.Math.Between(0, this.tips.length - 1);
                    } while (newTip === this.currentTip);
                    this.currentTip = newTip;
                } else {
                    this.currentTip = (this.currentTip + 1) % this.tips.length;
                }
                
                this.instructionText.setText(this.tips[this.currentTip]);
                
                // Check if this is a special tip
                const currentTip = this.tips[this.currentTip];
                if (this.specialTips.includes(currentTip)) {
                    if (this.specialColors[currentTip] === 'rainbow') {
                        this.startRainbowAnimation();
                    } else {
                        this.instructionText.setColor(this.specialColors[currentTip]);
                    }
                } else {
                    this.instructionText.setColor('#cccccc'); // Reset to default color
                }
                
                // Add a slight scale effect
                this.instructionText.setScale(0.9);
                
                // Fade in new tip with scale animation
                this.tweens.add({
                    targets: this.instructionText,
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 500,
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        this.isTransitioning = false;
                        
                        // Adjust position based on text height, but keep it lower
                        const targetY = 500 - (this.instructionText.height > 30 ? 
                            (this.instructionText.height - 30) / 2 : 0);
                        this.instructionText.y = targetY;
                    }
                });
            }
        });
    }

    startRainbowAnimation() {
        let hue = 0;
        this.rainbowTween = this.tweens.addCounter({
            from: 0,
            to: 360,
            duration: 2000,
            repeat: -1,
            onUpdate: (tween) => {
                hue = tween.getValue();
                const color = Phaser.Display.Color.HSLToColor(hue / 360, 1, 0.5).color;
                this.instructionText.setColor('#' + color.toString(16).padStart(6, '0'));
            }
        });
    }

    payRespects() {
        this.respectsPaid = true;

        // Create the respect text with initial settings
        const respectText = this.add.text(400, -50, 'Respects paid to the eaten orbs.', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5)
        .setAlpha(0);

        // Slide in from top with bounce
        this.tweens.add({
            targets: respectText,
            y: 150,
            alpha: 1,
            duration: 1000,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                // Add a gentle floating effect
                this.tweens.add({
                    targets: respectText,
                    y: '+=10',
                    duration: 1500,
                    yoyo: true,
                    repeat: 2,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        // Fade out and cleanup
                        this.tweens.add({
                            targets: respectText,
                            alpha: 0,
                            y: 100,
                            duration: 1000,
                            ease: 'Back.easeIn',
                            onComplete: () => {
                                respectText.destroy();
                                this.respectsPaid = false;
                            }
                        });
                    }
                });
            }
        });

        // Add some particle effects
        const particles = this.add.particles(0, 0, 'orb_normal', {
            x: 400,
            y: 150,
            quantity: 1,
            frequency: 100,
            lifespan: 2000,
            scale: { start: 0.5, end: 0 },
            speed: { min: 50, max: 100 },
            angle: { min: 0, max: 360 },
            alpha: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        // Clean up particles after animation
        this.time.delayedCall(4500, () => {
            particles.destroy();
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Create a smiley face instead of a circle
        const graphics = this.add.graphics();
        
        // Yellow circle for face
        graphics.fillStyle(0xffff00);
        graphics.lineStyle(2, 0x000000);
        graphics.fillCircle(16, 16, 16);
        graphics.strokeCircle(16, 16, 16);
        
        // Black eyes
        graphics.fillStyle(0x000000);
        graphics.fillCircle(10, 12, 3);
        graphics.fillCircle(22, 12, 3);
        
        // Smile
        graphics.lineStyle(2, 0x000000);
        graphics.beginPath();
        graphics.arc(16, 16, 8, 0, Math.PI, false);
        graphics.strokePath();
        
        // Generate texture from graphics
        graphics.generateTexture('player', 32, 32);
        graphics.destroy();

        // Create different colored orbs with simple color names
        const orbColors = {
            normal: 0x00ffff,    // cyan
            red: 0xff0000,       // red
            yellow: 0xffff00,    // yellow
            purple: 0xff00ff,    // magenta
            green: 0x00ff00,     // green
            rainbow: 0xff0000,   // starts red, will animate
            gold: 0xffd700,      // gold
            lime: 0x7fff00,      // lime
            gray: 0x808080,      // gray
            orange: 0xff4500,    // orange
            blue: 0x4169e1,      // royal blue
            pink: 0xff69b4       // pink
        };
        
        Object.entries(orbColors).forEach(([type, color]) => {
            const orbGraphics = this.add.graphics();
            orbGraphics.fillStyle(color);
            orbGraphics.fillCircle(4, 4, 4);
            orbGraphics.generateTexture(`orb_${type}`, 8, 8);
            orbGraphics.destroy();
        });

        this.load.audio('coin', 'assets/audio/coin.mp3');
    }

    create(data) {
        // Initialize ALL properties FIRST with default starting values
        this.gameActive = false;
        this.score = 30;  // Starting size
        this.highestScore = 30;  // Track highest score
        this.moveSpeed = 300;
        this.timeSinceLastOrb = 0;
        this.upgradesLeft = 7;
        this.baseOrbCount = 7;
        this.orbSizeMultiplier = 1;
        this.growthMultiplier = 1;
        this.shrinkResistance = 0;
        this.shieldDurationMultiplier = 1;
        this.speedBoostDurationMultiplier = 1;
        this.nextUpgradeScore = 100;
        this.speedBoostTime = 0;
        this.shieldTime = 0;
        this.graceTime = 420;  // Reset grace period (7 seconds)
        this.straightLineTime = 0;
        this.orbiters = [];
        this.orbiterCount = 0;
        
        this.username = data.username || (data.upgrades ? this.username : 'Player');
        
        // Create game objects
        this.createGameObjects();
        
        // Only apply upgrades if this is a rebirth (data.upgrades exists)
        // Regular restart won't have any data
        if (data && data.upgrades) {
            data.upgrades.forEach(upgrade => {
                if (UPGRADES[upgrade]) {
                    UPGRADES[upgrade].effect(this);
                }
            });
        }
        
        this.gameActive = true;

        // Add username display
        this.usernameText = this.add.text(400, 16, this.username, {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.survivalTime = 0;
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.gameActive) {
                    this.survivalTime++;
                }
            },
            loop: true
        });
    }

    createGameObjects() {
        // Initialize groups first
        this.orbs = this.physics.add.group();
        
        // Then clean up existing objects
        if (this.player) this.player.destroy();
        if (this.gameOverText) this.gameOverText.destroy();
        if (this.restartButton) this.restartButton.destroy();
        if (this.scoreText) this.scoreText.destroy();
        
        // Create the player sprite
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.baseScale = this.score / 30;
        this.player.setScale(this.player.baseScale);
        
        // Create score text
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
            fontSize: '32px',
            color: '#ffffff'
        });
        
        // Add grace period timer text
        this.graceText = this.add.text(400, 100, 'Grace Period: 7 seconds', {
            fontSize: '24px',
            color: '#00ff00'
        }).setOrigin(0.5);
        
        // Create initial orbs
        this.spawnOrbs(7);
        
        // Add collisions
        this.physics.add.overlap(
            this.player, 
            this.orbs, 
            this.collectOrb, 
            null, 
            this
        );
        
        this.physics.add.overlap(
            this.orbs,
            this.orbs,
            this.orbCollision,
            null,
            this
        );
        
        // Add shrinking timer
        this.time.addEvent({
            delay: 100,
            callback: this.shrinkPlayer,
            callbackScope: this,
            loop: true
        });
        
        // Add pause button
        const pauseButton = this.add.text(780, 20, 'PAUSE', {
            fontSize: '24px',
            fontFamily: 'Impact, fantasy',
            color: '#ffffff',
            padding: { x: 12, y: 8 },
            backgroundColor: '#000000',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 2,
                fill: true
            }
        })
        .setOrigin(1, 0)
        .setInteractive()
        .on('pointerover', () => {
            pauseButton.setStyle({ color: '#ffff00' });
            pauseButton.setScale(1.1);
        })
        .on('pointerout', () => {
            pauseButton.setStyle({ color: '#ffffff' });
            pauseButton.setScale(1.0);
        })
        .on('pointerdown', () => this.showPauseMenu());
    }

    gameOver() {
        this.gameActive = false;
        
        // Calculate coins based on survival time and highest score
        const timeBonus = Math.floor(this.survivalTime * 0.5);
        const sizeBonus = Math.floor(this.highestScore / 2);
        const totalCoins = timeBonus + sizeBonus;
        
        // Create semi-transparent overlay with high depth
        const overlay = this.add.rectangle(0, 0, 800, 600, 0x000000, 0.7)
            .setOrigin(0)
            .setDepth(9000);
        
        // Create container for game over elements with even higher depth
        const container = this.add.container(400, 300).setDepth(9001);
        
        // Display game over text with animation
        const gameOverText = this.add.text(0, -150, 'GAME OVER', {
            fontSize: '64px',
            color: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setScale(0);
        
        // Show username
        const usernameText = this.add.text(0, -50, this.username, {
            fontSize: '48px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        // Show highest score with animation
        const scoreText = this.add.text(0, 0, `Highest Size: ${Math.round(this.highestScore)}`, {
            fontSize: '32px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        // Add survival time text
        const survivalText = this.add.text(0, 50, `Survived: ${Math.floor(this.survivalTime / 60)}m ${this.survivalTime % 60}s`, {
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        // Add coin counter text
        const coinText = this.add.text(0, 100, 'Coins Earned: 0', {
            fontSize: '32px',
            color: '#ffd700',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        // Add return to menu button
        const menuButton = this.add.text(0, 200, 'Return to Menu', {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(0)
        .on('pointerover', () => menuButton.setStyle({ color: '#ffff00' }))
        .on('pointerout', () => menuButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MenuScene'));
        
        // Add all elements to container
        container.add([gameOverText, usernameText, scoreText, survivalText, coinText, menuButton]);
        
        // Clean up game objects
        this.orbs.clear(true, true);
        if (this.player) this.player.destroy();
        if (this.scoreText) this.scoreText.destroy();
        if (this.dangerEffect) this.dangerEffect.destroy();
        if (this.graceText) this.graceText.destroy();
        
        // Animate elements in sequence
        this.tweens.add({
            targets: gameOverText,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Back.out',
            onComplete: () => {
                this.tweens.add({
                    targets: [usernameText, scoreText, survivalText],
                    alpha: 1,
                    duration: 500,
                    onComplete: () => {
                        // Start coin counting animation
                        coinText.setAlpha(1);
                        let currentCoins = 0;
                        
                        // Emit coins event immediately when starting count
                        this.game.events.emit('addCoins', totalCoins);
                        
                        const coinInterval = setInterval(() => {
                            currentCoins++;
                            coinText.setText(`Coins Earned: ${currentCoins}`);
                            
                            if (currentCoins >= totalCoins) {
                                clearInterval(coinInterval);
                                this.tweens.add({
                                    targets: menuButton,
                                    alpha: 1,
                                    duration: 500
                                });
                            }
                        }, 50);
                    }
                });
            }
        });
    }

    update() {
        if (!this.gameActive) return;
        
        // Check for upgrade trigger
        if (this.upgradesLeft > 0 && this.score >= this.nextUpgradeScore) {
            this.showUpgradeOptions();
        }
        
        // Update grace period counter
        if (this.graceTime > 0) {
            this.graceTime--;
            const secondsLeft = Math.ceil(this.graceTime / 60);
            this.graceText.setText(`Grace Period: ${secondsLeft} seconds`);
            
            if (this.graceTime <= 0) {
                this.graceText.destroy();
            }
        }
        
        const pointer = this.input.activePointer;
        
        // Handle movement and upgrades
        if (pointer.isDown) {
            const distanceToPointer = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                pointer.x, pointer.y
            );
            
            const angle = Phaser.Math.Angle.Between(
                this.player.x, this.player.y,
                pointer.x, pointer.y
            );
            
            // Calculate base speed with more balanced scaling
            let baseSpeed = this.moveSpeed * Math.sqrt(this.player.baseScale);
            
            // Scale speed based on distance to pointer (max speed at 200 pixels away)
            const speedMultiplier = Math.min(distanceToPointer / 200, 1);
            let targetSpeed = baseSpeed * speedMultiplier;
            
            // If very close to target, slow down
            if (distanceToPointer < 10) {
                targetSpeed *= distanceToPointer / 10;
            }
            
            // Smoothly adjust current velocity towards target velocity
            const currentVelX = this.player.body.velocity.x;
            const currentVelY = this.player.body.velocity.y;
            const targetVelX = Math.cos(angle) * targetSpeed;
            const targetVelY = Math.sin(angle) * targetSpeed;
            
            // Lerp between current and target velocity (0.1 for smooth acceleration)
            this.player.setVelocity(
                Phaser.Math.Linear(currentVelX, targetVelX, 0.1),
                Phaser.Math.Linear(currentVelY, targetVelY, 0.1)
            );
            
            // Apply momentum drift if enabled
            if (this.hasMomentumDrift) {
                this.straightLineTime++;
                if (this.straightLineTime > 180) { // 3 seconds
                    this.player.body.velocity.x *= 1.2;
                    this.player.body.velocity.y *= 1.2;
                }
            } else {
                this.straightLineTime = 0;
            }
        } else {
            // Gradually slow down when not moving
            this.player.setVelocity(
                Phaser.Math.Linear(this.player.body.velocity.x, 0, 0.05),
                Phaser.Math.Linear(this.player.body.velocity.y, 0, 0.05)
            );
            this.straightLineTime = 0;
        }

        // Update orbs with upgrade effects
        this.orbs.getChildren().forEach(orb => {
            // Base movement
            if (Math.random() < 0.02) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 50 * (orb.scale || 1);
                orb.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }
            
            // Apply magnet effects
            if (this.magnetStrength || this.softMagnetStrength) {
                const totalMagnet = (this.magnetStrength || 0) + (this.softMagnetStrength || 0);
                const dist = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    orb.x, orb.y
                );
                if (dist < 200) { // Magnet range
                    const angle = Phaser.Math.Angle.Between(
                        orb.x, orb.y,
                        this.player.x, this.player.y
                    );
                    const pull = (200 - dist) * totalMagnet;
                    orb.setVelocity(
                        orb.body.velocity.x + Math.cos(angle) * pull,
                        orb.body.velocity.y + Math.sin(angle) * pull
                    );
                }
            }
            
            // Apply sticky trail
            if (this.stickyTrail) {
                const behindPlayer = Phaser.Math.Distance.Between(
                    this.player.x - Math.cos(this.player.rotation) * 50,
                    this.player.y - Math.sin(this.player.rotation) * 50,
                    orb.x, orb.y
                ) < 30;
                if (behindPlayer) {
                    orb.setVelocity(
                        orb.body.velocity.x * 1.1,
                        orb.body.velocity.y * 1.1
                    );
                }
            }

            // Update rainbow orbs with smoother animation
            if (orb.type === 'rainbow') {
                // Update the hue (cycles through colors)
                orb.rainbowHue = (orb.rainbowHue + 1) % 360;
                const color = Phaser.Display.Color.HSLToColor(orb.rainbowHue / 360, 1, 0.5).color;
                orb.setTint(color);
            }
        });

        // Update counters for various upgrades
        if (this.hasGluttony && this.gluttonyCount >= 10) {
            this.player.baseScale *= 1.05;
            this.gluttonyCount = 0;
        }
        
        if (this.hasGrowthSpurts && this.growthSpurtCount >= 15) {
            this.player.baseScale *= 1.1;
            this.growthSpurtTimer = 180; // 3 seconds
            this.growthSpurtCount = 0;
        }
        
        if (this.growthSpurtTimer > 0) {
            this.growthSpurtTimer--;
            if (this.growthSpurtTimer === 0) {
                this.player.baseScale /= 1.1;
            }
        }
        
        // Update power-up timers
        if (this.speedBoostTime > 0) {
            this.speedBoostTime--;
        }
        if (this.shieldTime > 0) {
            this.shieldTime--;
        }

        // Update username position to follow player
        if (this.usernameText && this.player) {
            this.usernameText.setPosition(this.player.x, this.player.y - (40 * this.player.baseScale));
        }
    }

    orbCollision(orb1, orb2) {
        // Bigger orb eats smaller orb with reduced growth
        const scale1 = orb1.scale || 1;
        const scale2 = orb2.scale || 1;
        
        if (scale1 > scale2) {
            // Increased growth for orb-to-orb collision
            orb1.setScale(scale1 + 0.1);
            orb2.destroy();
            this.spawnOrbs(1);
        } else if (scale2 > scale1) {
            // Increased growth for orb-to-orb collision
            orb2.setScale(scale2 + 0.1);
            orb1.destroy();
            this.spawnOrbs(1);
        }
        // If equal size, they bounce off each other
    }

    shrinkPlayer() {
        if (!this.gameActive) return;
        
        // Don't shrink during grace period or shield
        if (this.shieldTime > 0 || this.graceTime > 0) {
            if (this.graceTime > 0) {
                this.graceTime--;
                if (this.graceText) {
                    this.graceText.setText(`Grace Period: ${Math.ceil(this.graceTime / 60)}s`);
                    if (this.graceTime <= 0) {
                        this.graceText.destroy();
                    }
                }
            }
            return;
        }
        
        // Reduced base decrease rate
        let scoreDecrease = 0.15;
        
        // Make size penalty less punishing
        if (this.score > 30) {
            const sizeMultiplier = Math.floor((this.score - 30) / 30) * 0.05;
            scoreDecrease += sizeMultiplier;
        }
        
        if (this.shrinkResistance) {
            scoreDecrease *= (1 - (this.shrinkResistance * 0.5));
        }
        
        this.score = Math.max(7, this.score - scoreDecrease);
        
        // Add danger effect when score is low (increased threshold to 20)
        if (this.score < 20) {
            if (!this.dangerEffect) {
                this.dangerEffect = this.add.circle(400, 300, 800, 0xff0000, 0.1)
                    .setDepth(-1);  // Put behind everything
            }
            
            // Pulse the danger effect more intensely based on how close to death
            if (!this.dangerEffect.activeTween) {
                const intensity = (20 - this.score) / 13;  // Increases as score drops
                
                this.dangerEffect.activeTween = this.tweens.add({
                    targets: this.dangerEffect,
                    alpha: 0.3 * intensity,
                    duration: 500 / intensity,  // Faster pulses when closer to death
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        } else if (this.dangerEffect) {
            if (this.dangerEffect.activeTween) {
                this.dangerEffect.activeTween.stop();
                this.dangerEffect.activeTween = null;
            }
            this.dangerEffect.destroy();
            this.dangerEffect = null;
        }
        
        if (this.player) {
            this.player.baseScale = this.score / 30;
            this.player.setScale(this.player.baseScale);
        }
        
        if (this.scoreText) {
            this.scoreText.setText(`Score: ${Math.round(this.score)}`);
        }
        
        if (this.score <= 7) {
            this.gameOver();
        }
    }

    spawnOrbs(count) {
        // Calculate how many orbs should exist based on score
        const baseOrbCount = 14; // Start with more orbs
        const desiredOrbCount = baseOrbCount + Math.floor(this.score / 50) * 7;
        const maxOrbs = 35; // Allow more orbs
        const targetOrbCount = Math.min(desiredOrbCount, maxOrbs);
        
        // Get current orb count
        const currentOrbCount = this.orbs.getChildren().length;
        
        // Only spawn new orbs if we're under the target count
        if (currentOrbCount < targetOrbCount) {
            count = Math.min(7, targetOrbCount - currentOrbCount);
        } else if (currentOrbCount > targetOrbCount + 7) { // Allow some buffer
            // Remove excess orbs
            const orbs = this.orbs.getChildren();
            for (let i = 0; i < currentOrbCount - targetOrbCount; i++) {
                orbs[i].destroy();
            }
            count = 0;
        }
        
        // Spawn new orbs if needed
        for (let i = 0; i < count; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            
            // Much rarer special orbs
            const rand = Math.random();
            let type = 'normal';

            if (this.score > 50) {
                if (rand > 0.997) type = 'rainbow';       // 0.3% chance
                else if (rand > 0.99) type = 'gold';      // 0.7% chance
                else if (rand > 0.97) type = 'orange';    // 2% chance
                else if (rand > 0.95) type = 'gray';      // 2% chance
                else if (rand > 0.93) type = 'lime';      // 2% chance
                else if (rand > 0.91) type = 'blue';      // 2% chance
                else if (rand > 0.89) type = 'pink';      // 2% chance
                else if (rand > 0.87) type = 'green';     // 2% chance
                else if (rand > 0.85) type = 'purple';    // 2% chance
                else if (rand > 0.83) type = 'yellow';    // 2% chance
                else if (rand > 0.81) type = 'red';       // 2% chance
            }
            
            const orb = this.orbs.create(x, y, `orb_${type}`);
            orb.type = type;
            
            // Adjust scale based on type
            let initialScale = Phaser.Math.FloatBetween(0.8, 1.2); // Increased minimum size
            if (type === 'pink') initialScale *= 0.6;
            if (type === 'purple') initialScale *= 1.5;
            if (type === 'gold') initialScale *= 1.3;
            if (type === 'rainbow') {
                initialScale = 2.5; // Made rainbow orbs even bigger
                orb.rainbowHue = 0;
                orb.setTint(0xff0000); // Start with red
            }
            
            initialScale *= (this.orbSizeMultiplier || 1);
            orb.setScale(initialScale);
            
            // Slower, more stable movement
            const angle = Math.random() * Math.PI * 2;
            const speed = 30 + (20 * Math.random()); // More consistent speed
            orb.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }

    collectOrb(player, orb) {
        if (!this.gameActive) return;
        
        const orbScale = orb.scale || 1;
        
        // Increase base values for orbs
        let baseValue = 0;
        switch(orb.type) {
            case 'red':
                baseValue = 0.8;  // Increased from 0.5
                break;
            case 'yellow':
                baseValue = 0.8;  // Increased from 0.5
                break;
            case 'purple':
                baseValue = 1.5 + (orbScale * 0.5);  // Increased from 1 + 0.3
                break;
            case 'green':
                baseValue = 0.8;  // Increased from 0.5
                break;
            case 'rainbow':
                baseValue = Phaser.Math.Between(2, 4);  // Increased from 1-3
                break;
            case 'gold':
                baseValue = 5;  // Increased from 3
                break;
            case 'lime':
                baseValue = 0.3;
                this.moveSpeed *= 1.05;
                break;
            case 'gray':
                baseValue = 0.7;
                this.shrinkResistance += 0.2;
                this.time.delayedCall(3000, () => {
                    this.shrinkResistance -= 0.2;
                });
                break;
            case 'orange':
                const speedBonus = this.player.body.speed / 400;
                baseValue = 0.5 + speedBonus;
                break;
            case 'blue':
                const sizeBonus = this.player.baseScale * 0.5;
                baseValue = 0.3 + sizeBonus;
                break;
            case 'pink':
                baseValue = 1 + (orbScale * 0.5);
                break;
            default: // normal cyan orb
                baseValue = 0.5 + (orbScale * 0.25);
        }
        
        // Make value multiplier decrease less aggressively
        this.orbValueMultiplier = Math.max(0.2, 1 - ((this.score - 30) / 150));  // Changed from 100
        
        // Apply growth multiplier and value multiplier
        const finalValue = baseValue * this.orbValueMultiplier * (this.growthMultiplier || 1);
        this.score = Math.round(this.score + finalValue);
        
        // Update highest score
        if (this.score > this.highestScore) {
            this.highestScore = this.score;
        }
        
        // Update player scale and UI
        this.player.baseScale = this.score / 30;
        this.player.setScale(this.player.baseScale);
        this.scoreText.setText(`Score: ${Math.round(this.score)}`);
        
        orb.destroy();
        this.spawnOrbs(1);
    }

    showUpgradeOptions() {
        this.gameActive = false;
        
        // Store and stop orb velocities
        this.orbs.getChildren().forEach(orb => {
            orb.savedVelocity = {
                x: orb.body.velocity.x,
                y: orb.body.velocity.y
            };
            orb.setVelocity(0, 0);
        });
        
        // Get seven random upgrades
        const availableUpgrades = Object.entries(UPGRADES);
        const upgrades = Phaser.Utils.Array.Shuffle(availableUpgrades).slice(0, 7);
        
        // Create semi-transparent background
        const overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.7);
        overlay.setOrigin(0);
        
        // Add title
        const title = this.add.text(400, 50, 'Choose Your Upgrade!', {
            fontSize: '32px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Adjust grid layout to fit screen better
        upgrades.forEach((upgrade, index) => {
            const [key, data] = upgrade;
            const row = Math.floor(index / 4); // Changed from 3 to 4 columns
            const col = index % 4;
            const x = 150 + (col * 180); // Adjusted spacing
            const y = 150 + (row * 100);
            
            const button = this.add.container(x, y);
            
            const bg = this.add.rectangle(0, 0, 160, 80, 0x333333) // Made buttons smaller
                .setInteractive()
                .on('pointerover', () => bg.setFillStyle(0x444444))
                .on('pointerout', () => bg.setFillStyle(0x333333))
                .on('pointerdown', () => this.selectUpgrade(key, data.effect));
            
            const name = this.add.text(0, -15, data.name, {
                fontSize: '16px', // Smaller font
                color: '#ffffff'
            }).setOrigin(0.5);
            
            const desc = this.add.text(0, 15, data.description, {
                fontSize: '12px', // Smaller font
                color: '#cccccc',
                wordWrap: { width: 150 } // Adjusted wrap width
            }).setOrigin(0.5);
            
            button.add([bg, name, desc]);
        });
    }

    selectUpgrade(key, effect) {
        // Apply the upgrade effect
        effect(this);
        
        // Clean up upgrade UI more carefully
        const itemsToRemove = this.children.list
            .filter(child => 
                (child.type === 'Rectangle' && child.fillColor === 0x000000) || // overlay
                (child.text && child.text.includes('Choose Your Upgrade')) || // title
                (child.type === 'Container') // upgrade buttons
            );
        
        itemsToRemove.forEach(child => {
            if (child && !child.destroyed) {
                child.destroy();
            }
        });
        
        // Restore orb velocities
        this.orbs.getChildren().forEach(orb => {
            if (orb.savedVelocity) {
                orb.setVelocity(orb.savedVelocity.x, orb.savedVelocity.y);
                delete orb.savedVelocity;
            }
        });
        
        // Update upgrade state
        this.upgradesLeft--;
        this.nextUpgradeScore += 100; // Next upgrade in 100 points
        
        // Resume game
        this.gameActive = true;
    }

    createOrbitalHelper() {
        // Initialize orbiters array if it doesn't exist
        if (!this.orbiters) {
            this.orbiters = [];
            this.orbiterCount = 0;
        }
        
        // Create the orbital helper
        const orbital = this.add.circle(0, 0, 4, 0x00ffff);
        this.physics.add.existing(orbital);
        
        // Set up orbital properties
        orbital.orbitalAngle = Math.PI * this.orbiterCount; // Space them out evenly
        orbital.baseOrbitalDistance = 20;
        orbital.orbitalSpeed = 0.05;
        orbital.magnetStrength = 0.2;
        orbital.magnetRange = 100;
        orbital.hasCollected = false;
        orbital.index = this.orbiterCount;
        
        // Add collision with orbs
        this.physics.add.overlap(
            orbital,
            this.orbs,
            (orbital, orb) => {
                if (!orbital.hasCollected) {
                    this.collectOrb(this.player, orb);
                    orbital.hasCollected = true;
                    
                    // Reset orbital after 3 seconds
                    this.time.delayedCall(3000, () => {
                        orbital.hasCollected = false;
                    });
                }
            },
            null,
            this
        );
        
        // Add to orbiters array
        this.orbiters.push(orbital);
        this.orbiterCount++;
        
        // Update all orbiters' positions in the game loop
        if (this.orbiterCount === 1) { // Only add this event listener once
            this.events.on('update', () => {
                if (this.player) {
                    this.orbiters.forEach((orbiter, index) => {
                        // Update orbital position with scaled distance
                        orbiter.orbitalAngle += orbiter.orbitalSpeed;
                        
                        // Add player's scale to base distance to maintain visual spacing
                        const currentDistance = orbiter.baseOrbitalDistance + (20 * this.player.baseScale);
                        
                        // Calculate position with offset based on index
                        const angleOffset = (2 * Math.PI / this.orbiterCount) * index;
                        const x = this.player.x + Math.cos(orbiter.orbitalAngle + angleOffset) * currentDistance;
                        const y = this.player.y + Math.sin(orbiter.orbitalAngle + angleOffset) * currentDistance;
                        orbiter.setPosition(x, y);
                        
                        // Scale orbital with player
                        const orbitalScale = this.player.baseScale * 0.5;
                        orbiter.setScale(orbitalScale);
                        
                        // Apply magnetic effect to nearby orbs
                        this.orbs.getChildren().forEach(orb => {
                            const dist = Phaser.Math.Distance.Between(
                                orbiter.x, orbiter.y,
                                orb.x, orb.y
                            );
                            if (dist < orbiter.magnetRange) {
                                const angle = Phaser.Math.Angle.Between(
                                    orb.x, orb.y,
                                    orbiter.x, orbiter.y
                                );
                                const pull = (orbiter.magnetRange - dist) * orbiter.magnetStrength;
                                orb.setVelocity(
                                    orb.body.velocity.x + Math.cos(angle) * pull,
                                    orb.body.velocity.y + Math.sin(angle) * pull
                                );
                            }
                        });
                    });
                }
            });
        }
    }

    showPauseMenu() {
        this.gameActive = false;
        
        // Store and stop orb velocities
        this.orbs.getChildren().forEach(orb => {
            orb.savedVelocity = {
                x: orb.body.velocity.x,
                y: orb.body.velocity.y
            };
            orb.setVelocity(0, 0);
        });
        
        // Create semi-transparent background
        const overlay = this.add.rectangle(0, 0, 800, 600, 0x000000, 0.7)
            .setOrigin(0)
            .setDepth(100);
        
        // Create menu container
        const menuContainer = this.add.container(400, 300).setDepth(101);
        
        // Add title
        const title = this.add.text(0, -150, 'PAUSED', {
            fontSize: '48px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Create menu buttons with background rectangles
        const createButton = (y, text, callback) => {
            const buttonBg = this.add.rectangle(0, y, 300, 50, 0x333333)
                .setInteractive()
                .on('pointerover', () => {
                    buttonBg.setFillStyle(0x444444);
                    buttonText.setColor('#ffff00');
                })
                .on('pointerout', () => {
                    buttonBg.setFillStyle(0x333333);
                    buttonText.setColor('#ffffff');
                })
                .on('pointerdown', callback);
            
            const buttonText = this.add.text(0, y, text, {
                fontSize: '24px',
                color: '#ffffff'
            }).setOrigin(0.5);
            
            return [buttonBg, buttonText];
        };
        
        const resumeButton = createButton(-50, 'Resume Game', () => {
            this.orbs.getChildren().forEach(orb => {
                if (orb.savedVelocity) {
                    orb.setVelocity(orb.savedVelocity.x, orb.savedVelocity.y);
                    delete orb.savedVelocity;
                }
            });
            menuContainer.destroy();
            overlay.destroy();
            this.gameActive = true;
        });
        
        const rebirthButton = createButton(20, 'Rebirth (Keep Upgrades)', () => {
            const currentUpgrades = this.getActiveUpgrades();
            menuContainer.destroy();
            overlay.destroy();
            this.scene.start('GameScene', { 
                upgrades: currentUpgrades,
                username: this.username 
            });
        });
        
        const exitButton = createButton(90, 'Exit to Menu', () => {  // Adjusted y position
            this.scene.start('MenuScene');
        });
        
        // Add all elements to container
        menuContainer.add([
            title,
            ...resumeButton,
            ...rebirthButton,
            ...exitButton
        ]);
    }

    // Helper function to get current upgrades
    getActiveUpgrades() {
        const activeUpgrades = [];
        
        // Check for each upgrade if it's active based on its properties
        if (this.baseOrbCount > 7) activeUpgrades.push('ORBS_GALORE');
        if (this.orbSizeMultiplier && this.orbSizeMultiplier > 1) activeUpgrades.push('TITAN_SPHERES');
        if (this.moveSpeed > 300) activeUpgrades.push('SWIFT_HUNTER');
        if (this.shieldDurationMultiplier && this.shieldDurationMultiplier > 1) activeUpgrades.push('SHIELD_MASTER');
        if (this.growthMultiplier && this.growthMultiplier > 1) activeUpgrades.push('GROWTH_EXPERT');
        if (this.shrinkResistance) activeUpgrades.push('SHRINK_RESISTANT');
        if (this.speedBoostDurationMultiplier && this.speedBoostDurationMultiplier > 1) activeUpgrades.push('SPEED_DEMON');
        if (this.magnetStrength) activeUpgrades.push('ORB_MAGNET');
        if (this.stickyTrail) activeUpgrades.push('STICKY_TRAIL');
        if (this.ghostCharges) activeUpgrades.push('GHOST_FLICKER');
        if (this.hasGluttony) activeUpgrades.push('GLUTTONY');
        if (this.orbiters && this.orbiters.length > 0) {
            for (let i = 0; i < this.orbiters.length; i++) {
                activeUpgrades.push('MINI_ORBIT');
            }
        }
        if (this.turnSpeed && this.turnSpeed > 1) activeUpgrades.push('QUICK_TURN');
        if (this.chainPullEnabled) activeUpgrades.push('CHAIN_PULL');
        if (this.phantomRange) activeUpgrades.push('PHANTOM_NUDGE');
        if (this.pushStrength) activeUpgrades.push('HEAVY_CORE');
        if (this.hasMomentumDrift) activeUpgrades.push('MOMENTUM_DRIFT');
        if (this.hasGrowthSpurts) activeUpgrades.push('GROWTH_SPURTS');
        if (this.miniFeastEnabled) activeUpgrades.push('MINI_FEAST');
        if (this.hasReactiveBounce) activeUpgrades.push('REACTIVE_BOUNCE');
        if (this.hasDoubleUp) activeUpgrades.push('DOUBLE_UP');
        if (this.hasShrunkenLuck) activeUpgrades.push('SHRUNKEN_LUCK');
        if (this.softMagnetStrength) activeUpgrades.push('SOFT_MAGNET');
        if (this.hasFinalBite) activeUpgrades.push('FINAL_BITE');
        
        return activeUpgrades;
    }
}

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
        this.totalCoins = 0;
    }

    preload() {
        // Create a better looking dollar bill sprite
        const graphics = this.add.graphics();
        
        // Green rectangle for the bill
        graphics.fillStyle(0x00aa00);
        graphics.fillRect(0, 0, 30, 16);
        
        // White highlight
        graphics.fillStyle(0xffffff);
        graphics.fillRect(2, 2, 26, 12);
        
        // Green details
        graphics.fillStyle(0x00aa00);
        graphics.fillRect(4, 4, 22, 8);
        
        // Dollar sign
        graphics.lineStyle(1.5, 0xffd700);
        const x = 15, y = 8;
        graphics.beginPath();
        graphics.moveTo(x, y - 5);
        graphics.lineTo(x, y + 5);
        graphics.moveTo(x - 2, y - 3);
        graphics.lineTo(x + 2, y - 3);
        graphics.moveTo(x - 2, y + 3);
        graphics.lineTo(x + 2, y + 3);
        graphics.strokePath();
        
        graphics.generateTexture('dollar', 30, 16);
        graphics.destroy();
    }

    create() {
        // Move coin counter to bottom left with better styling
        this.coinText = this.add.text(60, 560, `${this.totalCoins}`, {
            fontSize: '36px',
            fontFamily: 'Arial',
            color: '#ffd700',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 2, fill: true }
        }).setScrollFactor(0).setDepth(1000);

        this.dollarIcon = this.add.image(30, 575, 'dollar')
            .setScale(2)
            .setScrollFactor(0)
            .setDepth(1000);

        // Add event listener
        this.game.events.on('addCoins', this.animateCoins, this);
    }

    animateCoins(amount) {
        console.log('Animating coins:', amount);
        
        // Get coin counter text position
        const startX = this.coinText.x;
        const startY = this.coinText.y;

        for (let i = 0; i < amount; i++) {
            this.time.delayedCall(i * 50, () => {
                const dollar = this.add.image(startX, startY, 'dollar')
                    .setScale(2)
                    .setDepth(9002)
                    .setAlpha(0.8);

                const coinSound = this.sound.add('coin', { 
                    volume: 0.15,
                    rate: 0.8 + (Math.random() * 0.4)
                });
                coinSound.play();

                // Random initial position near the score
                const randomAngle = Math.random() * Math.PI * 2;
                const distance = 20;
                dollar.x += Math.cos(randomAngle) * distance;
                dollar.y += Math.sin(randomAngle) * distance;
                dollar.rotation = randomAngle;

                // Arc trajectory to coin counter
                this.tweens.add({
                    targets: dollar,
                    x: 30,
                    y: 575,
                    scale: 2,
                    rotation: 0,
                    alpha: 1,
                    duration: 1000,
                    ease: 'Back.out',
                    onComplete: () => {
                        this.tweens.add({
                            targets: [this.coinText, this.dollarIcon],
                            scale: 1.2,
                            duration: 100,
                            yoyo: true,
                            onComplete: () => {
                                dollar.destroy();
                                this.totalCoins++;
                                this.coinText.setText(`${this.totalCoins}`);
                            }
                        });
                    }
                });
            });
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [MenuScene, GameScene, UIScene]
};

const game = new Phaser.Game(config); 