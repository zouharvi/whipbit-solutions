var game = new Phaser.Game(768, 552, Phaser.AUTO, '');
var startDevId = 0;
game.state.add('game', Game);
game.state.add('menu', Menu);

game.state.start('menu');
