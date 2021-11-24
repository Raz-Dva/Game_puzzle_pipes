import Phaser from 'phaser';

let game, WIDTH = 500, HEIGHT = 500, pipeL, pipeI, pipeT, pipeX, groupePipe;
const PI = Math.PI;
const arrDirect = ['l', 't', 'r', 'b'];
const mapPipes = {
  '1': {
    numImg: '3',
    direct: ['l', 'r', 'b'],
    neighbors:{
      l:null,
      t:null,
      r:null,
      b:function(){return mapPipes['5']}
    }
  },
  '2': { numImg: '' },
  '3': { numImg: '' },
  '4': { numImg: '' },
  '5': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '6': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '7': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '8': {
    numImg: '1',
    direct: ['l', 't']
  },
  '9': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '10': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '11': {
    numImg: '2',
    direct: ['t', 'b']
  },
  '12': {
    numImg: '1',
    direct: ['l', 't']
  },
  '13': { numImg: '' },
  '14': { numImg: '' },
  '15': { numImg: '' },
  '16': { numImg: '' },
}
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
  pipeL = this.add.sprite(0, 0, 'background');
  pipeL.scale = .5;
  pipeL.setOrigin(0, 0);

  // console.log(Phaser. Math.Between(1, 4));
  // const random = Phaser.Math.Between(1, 4);
  // this.groupePipe.add(this.obj);
// console.log(mapPipes['1'].neighbors.b());


  groupePipe = this.add.group();
  let count = 0;

  for (let col = 1; col < 5; col++) {
    for (let row = 1; row < 5; row++) {
      let elem = mapPipes[++count];

      if (elem.numImg === '') {
        const r = this.add.rectangle(71 * row, 71 * col, 71, 71);
        r.setStrokeStyle(2, 0x1a65ac);
      } else {
        const spritePipe = this.add.sprite(71 * row, 71 * col, 'pipe_' + elem.numImg);
        spritePipe.scale = 0.3;
        spritePipe.direct = elem.direct;
        spritePipe.neighbors = elem.neighbors;
        groupePipe.add(spritePipe);
      }
    }
  }
  // console.log(groupePipe.getChildren())
  // pipeL = this.add.sprite(58, 58, 'pipe_L');
  // pipeI = this.add.sprite(58, 173, 'pipe_I'); //115
  // pipeT = this.add.sprite(50, 50, 'pipe_T');
  // pipeX = this.add.sprite(50, 50, 'pipeX');
  // pipeL.scale=0.5;
  // pipeL.setOrigin(.5,.5);
  // pipeI.scale=0.5;
  // pipeI.setOrigin(.5,.5);


  Phaser.Actions.Call(groupePipe.getChildren(), function (child) {
    child.setInteractive({ cursor: 'pointer' });
    child.on('pointerdown', function (e) {
      child.rotation += PI / 2;
      clickChangeDirect(this, arrDirect)
      changeStream(this)
    });
  });

};

function update() {
};

// ----------------------------------------
function clickChangeDirect(el, dirModel) {
  // let x = dirModel.indexOf(el.direct[0]); // l  0 
  // let y = dirModel.indexOf(el.direct[1]); // t  1
  // let w = dirModel.indexOf(el.direct[2]);
  // const z = dirModel.indexOf(el.direct[3]);


  //['l', 't', 'r', 'b'];
  for (let i = 0; i < dirModel.length; i++) {

    if (el.direct[i] === undefined) {
      continue;
    };

    let indexDir = dirModel.indexOf(el.direct[i]); // l  0 

    ++indexDir === 4 ?
      el.direct[i] = dirModel[0]
      : el.direct[i] = dirModel[indexDir]
  }
};

function changeStream(el){
// el имеет  direction, neighbors

console.log(el.neighbors.b())

}

