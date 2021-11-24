import Phaser from 'phaser';

let game, WIDTH = 500, HEIGHT = 500, pipeL, pipeI, pipeT, pipeX, groupePipe;
const PI=Math.PI;
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'wrap_canvas',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

window.onload = function () {
  game = new Phaser.Game(config);
};

function preload() {
  // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  this.load.image('background', 'assets/img/background/backgroundEmpty.png');

  this.load.image('pipe_1', 'assets/img/pipes/pipeGreen_1.png');
  this.load.image('pipe_2', 'assets/img/pipes/pipeGreen_2.png');
  this.load.image('pipe_3', 'assets/img/pipes/pipeGreen_3.png');
  this.load.image('pipe_4', 'assets/img/pipes/pipeGreen_4.png');
};

function create() {
  pipeL = this.add.sprite(0,0, 'background');
  pipeL.scale=.5;
  pipeL.setOrigin(0, 0);

// console.log(Phaser. Math.Between(1, 4));

// this.groupePipe.add(this.obj);
groupePipe = this.add.group();
let x = 0;
for (let i = 0; i < 4; i++) {
  const random = Phaser.Math.Between(1, 4);
  const spritePipe = this.add.sprite(x+=115, 58, 'pipe_'+ random);
  
  spritePipe.scale=0.5;
  groupePipe.add (spritePipe);
  
}
console.log(groupePipe.getChildren())

  // pipeL = this.add.sprite(58, 58, 'pipe_L');
  // pipeI = this.add.sprite(58, 173, 'pipe_I'); //115
  // pipeT = this.add.sprite(50, 50, 'pipe_T');
  // pipeX = this.add.sprite(50, 50, 'pipeX');
  // pipeL.scale=0.5;
  // pipeL.setOrigin(.5,.5);
  // pipeI.scale=0.5;
  // pipeI.setOrigin(.5,.5);


  Phaser.Actions.Call(groupePipe.getChildren(), function(child) {
    child.setInteractive({ cursor: 'pointer' });
    child.on('pointerdown', function() {
      child.rotation += PI/2;
    });
  });

};

function update() {

};

