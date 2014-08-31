(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(505, 288, Phaser.AUTO, 'partyhop');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":7,"./states/gameover":8,"./states/menu":9,"./states/play":10,"./states/preload":11}],2:[function(require,module,exports){
'use strict';

var MobA = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ea', frame);

  // initialize your prefab here
  this.boost = true;
  this.anchor.setTo(.5, .5);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.hasScored = false;
};

MobA.prototype = Object.create(Phaser.Sprite.prototype);
MobA.prototype.constructor = MobA;

MobA.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = MobA;

},{}],3:[function(require,module,exports){
'use strict';

var MobB = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'eb', frame);

  // initialize your prefab here
  this.anchor.setTo(.5,.5);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.hasScored = false;
};

MobB.prototype = Object.create(Phaser.Sprite.prototype);
MobB.prototype.constructor = MobB;

MobB.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = MobB;

},{}],4:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // initialize your prefab here
  this.autoScroll(-200, 0);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;

},{}],5:[function(require,module,exports){
'use strict';

var Killzone = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'killzone', frame);

  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Killzone.prototype = Object.create(Phaser.Sprite.prototype);
Killzone.prototype.constructor = Killzone;

Killzone.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Killzone;

},{}],6:[function(require,module,exports){
'use strict';

var Solo = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'solo', frame);

  // initialize your prefab here
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('splash');
  this.game.physics.arcade.enableBody(this);
  
};

Solo.prototype = Object.create(Phaser.Sprite.prototype);
Solo.prototype.constructor = Solo;

Solo.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Solo.prototype.jump = function()
{
  this.body.velocity.y = -400;
};

module.exports = Solo;

},{}],7:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
};

module.exports = Boot;

},{}],8:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You FAIL!!!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],9:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype =
{
  preload: function()
  {
  },
  create: function()
  {
    this.background = this.game.add.sprite(0,0, 'bg');
    this.ground = this.game.add.tileSprite(0, 238, 600, 50, 'ground');
    this.ground.autoScroll(-200, 0);
    this.title = this.game.add.bitmapText(this.game.width/2 + 0.5, 50,
      'partyfont', 'PartyHop', 64);
    this.title.x = this.game.width/2 - this.title.textWidth/2;
    this.startButton = this.game.add.button(this.game.width/2 + 0.5, 150,
        'playbutton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.startFullScreen();
  },
  startClick: function()
  {
    this.game.state.start('play');
  },
  update: function()
  {

  }
};

module.exports = Menu;

},{}],10:[function(require,module,exports){

  'use strict';
  var Solo = require('../prefabs/solo');
  var Ground = require('../prefabs/ground');
  var MobA = require('../prefabs/MobA');
  var MobB = require('../prefabs/MobB');
  var Killzone = require('../prefabs/killzone');
  var mobcount = 1;
  var jumptimer = 0;

  var cupsize = 8;
  var mobrarity = 4;
  var timetojump = 140;
  var jumpspeed = 300;
  var jumpmult = 2.5;
  var forwardspeed = 2;
  var mobfreq = 1;

  function Play() {}
  Play.prototype = 
  {
    create: function()
    {
      this.background = this.game.add.sprite(0,0,'bg');

      this.score = -3;

      this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 20,
          'partyfont', '',  36);
      
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1200;
      
      this.killzone = new Killzone(this.game, -48, 0);
      this.game.add.existing(this.killzone);

      this.solo = new Solo(this.game, 200, this.game.height/2);
      this.game.add.existing(this.solo);

      this.ground = new Ground(this.game, 0, 238, 600, 50);
      this.game.add.existing(this.ground);

      this.mobGenerator =  this.game.time.events.loop(Phaser.Timer.SECOND
          * mobfreq, this.generateMob, this);
      this.mobGenerator.timer.start();

      this.mob1 = this.game.add.existing(new MobA(this.game, -16, 0));
      this.mob2 = this.game.add.existing(new MobA(this.game, -16, 0));
      this.mob3 = this.game.add.existing(new MobA(this.game, -16, 0));

    },
    update: function()
    {

      this.checkScore(this.mob1);
      this.checkScore(this.mob2);
      this.checkScore(this.mob3);

      this.game.physics.arcade.collide(this.solo, this.ground);
      this.game.physics.arcade.collide(this.killzone, this.ground);

      this.game.physics.arcade.collide(this.solo, this.mob1);
      this.game.physics.arcade.collide(this.solo, this.mob2);
      this.game.physics.arcade.collide(this.solo, this.mob3);
      this.game.physics.arcade.collide(this.solo, this.killzone,
          this.deathHandler, null, this);

      if (this.mob1.body.x < -32)
      {
        this.mob1.destroy();
      }

      if (this.mob2.body.x < -32)
      {
        this.mob2.destroy();
      }

      if (this.mob3.body.x < -32)
      {
        this.mob3.destroy();
      }

      if (this.solo.body.x < -16)
      {
        this.deathHandler();
      }

      if (this.solo.body.touching.down)
      {
        this.solo.body.velocity.x = 0;
      }

      if ((this.mob1.key == 'ea' && this.mob1.body.touching.up) ||
          (this.mob2.key == 'ea' && this.mob2.body.touching.up) ||
          (this.mob3.key == 'ea' && this.mob3.body.touching.up))
      {
        this.solo.body.velocity.y = -jumpspeed * jumpmult;
        this.solo.body.velocity.x = forwardspeed;
      }

      if ((this.mob1.key == 'eb' && this.mob1.body.touching.up) ||
          (this.mob2.key == 'eb' && this.mob2.body.touching.up) ||
          (this.mob3.key == 'eb' && this.mob3.body.touching.up))
      {
        if ((this.solo.body.x < this.mob1.body.x + cupsize && this.solo.body.x >
            this.mob1.body.x - cupsize) ||
            (this.solo.body.x < this.mob2.body.x + cupsize && this.solo.body.x >
            this.mob2.body.x - cupsize) ||
            (this.solo.body.x < this.mob3.body.x + cupsize && this.solo.body.x >
            this.mob3.body.x - cupsize))
        {
          this.solo.animations.play('splash', 30, false, true);
          this.deathHandler();
        }
        else
        {
          this.solo.body.immovable = true;
          this.deathHandler();
        }
      }

      if (this.game.input.activePointer.isDown && this.solo.body.touching.down)
      {
        jumptimer = this.game.time.time;
        this.solo.body.velocity.y = -jumpspeed;
      }
      else if (this.game.input.activePointer.isDown && (jumptimer != 0))
      {
        if (jumptimer + timetojump < this.game.time.time)
        {
          jumptimer = 0;
        }
        else
        {
          this.solo.body.velocity.y = -jumpspeed;
        }
      }
      else if (jumptimer != 0)
      {
        jumptimer = 0;
      }

    },
    checkScore: function(mob)
    {
      if (!mob.hasScored && mob.body.x <= this.solo.body.x)
      {
        mob.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
      }
    },
    generateMob: function()
    {
      var mobSelector = this.game.rnd.integerInRange(1,mobrarity);
      var mob;
      if (mobSelector == 1)
      {
        mob = new MobA(this.game);
      }
      else
      {
        mob = new MobB(this.game);
      }
      mob.x = this.game.width;
      mob.y = 238 - 16;
      mob.body.velocity.x = -200;
      if (mobcount == 1)
      {
        this.mob1 = this.game.add.existing(mob);
        console.log("Spawned 1");
        mobcount++;
      }
      else if (mobcount == 2)
      {
        this.mob2 = this.game.add.existing(mob);
        console.log("Spawned 2");
        mobcount++;
      }
      else
      {
        this.mob3 = this.game.add.existing(mob)
        console.log("Spawned 3");
        mobcount = 1;
      }
      console.log(mobcount);
    },
    mobKill: function(mob)
    {
      mob.kill();
      console.log("killed!");
    },
    deathHandler: function()
    {
      var bestScore;
      if (!!localStorage)
      {
        bestScore = localStorage.getItem('bestScore');
        if (!bestScore || bestScore < this.score)
        {
          bestScore = this.score;
          localStorage.setItem('bestScore', bestScore);
        }
      }
      else
      {
        bestScore = 'xxx';
      }
      console.log('died');
      this.mobGenerator.timer.stop();
      this.mob1.body.velocity.x = 0;
      this.mob2.body.velocity.x = 0;
      this.mob3.body.velocity.x = 0;
      this.ground.autoScroll(0,0);
      this.scoreText.setText('');
      var gameover = this.game.add.bitmapText(this.game.width/2 + 0.5, 50, 
          'partyfont', 'Game Over', 64);
      gameover.x = this.game.width/2 - gameover.textWidth/2;

      var scored = this.game.add.bitmapText(this.game.width/2 + 0.5, 100,
          'partyfont', 'Score  ' + this.score.toString(), 32);
      scored.x = this.game.width/2 - scored.textWidth/2;

      var best = this.game.add.bitmapText(this.game.width/2 + 0.5, 125,
          'partyfont', 'Best   ' + bestScore.toString(), 32);
      best.x = this.game.width/2 - best.textWidth/2;

      var resetButton = this.game.add.button(this.game.width/2 + 0.5, 200,
          'playbutton', this.resetClick, this);
      resetButton.anchor.setTo(0.5, 0.5);

    },
    resetClick: function()
    {
      this.game.state.start('play');
    }
  };
  module.exports = Play;

},{"../prefabs/MobA":2,"../prefabs/MobB":3,"../prefabs/ground":4,"../prefabs/killzone":5,"../prefabs/solo":6}],11:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('bg', 'assets/bg.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('playbutton', 'assets/playbutton.png');
    this.load.spritesheet('solo', 'assets/solo.png', 16, 16, 6);
    this.load.image('ea', 'assets/a.png');
    this.load.image('eb', 'assets/b.png');
    this.load.image('killzone', 'assets/killzone.png');
    this.load.bitmapFont('partyfont', 'assets/partyfont1.png', 
        'assets/partyfont1.fnt');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])