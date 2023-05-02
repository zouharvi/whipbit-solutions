Menu = function() {}

Menu.prototype = {
 preload : function() {
  game.load.image('menu_screen', 'assets/menu_screen.png');
  game.load.image('window_background', 'assets/window_background.png');
  game.load.image('placeholder_table', 'assets/placeholder_table.png');
  game.load.spritesheet('developers', 'assets/developers.png', 32, 48);
  game.load.spritesheet('button_bottom_ui', 'assets/button_bottom_ui.png', 45, 8);
  game.load.audio('music_all', 'assets/music_all.mp3');
  game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
 },
 create : function() {
  var music = game.add.audio('music_all');
  music.loopFull();

  // developer choose dialog
  this.gChoose = game.add.group();
  this.gChoose.add(createButton(0, 0, 'window_background', null));
  this.gChoose.add(createText(105, 105, 'Choose your first developer:', 16));

  this.gChoose.add(createButton(100, 438, 'button_bottom_ui', function() { this.start(2); }, this, 1, 1, 0));
  this.gChoose.add(createText(154, 445, 'Paul', 16));
  this.gChoose.add(createSprite(160, 370, 'placeholder_table')).scale.setTo(2.3, 2.3);
  var sprite = this.gChoose.add(createSprite(150, 300, 'developers'));
  sprite.frame = 6;
  sprite.scale.setTo(2.7, 2.7);
  this.gChoose.add(createText(105, 145, '   EASY\n\nFast\nCheap\n\nSkills:\n\nPHP, JS,\nCSS, HTML5', 16));

  this.gChoose.add(createButton(300, 438, 'button_bottom_ui', function() { this.start(3); }, this, 1, 1, 0));
  this.gChoose.add(createText(354, 445, 'Carl', 16));
  this.gChoose.add(createSprite(360, 370, 'placeholder_table')).scale.setTo(2.3, 2.3);
  var sprite = this.gChoose.add(createSprite(350, 300, 'developers'));
  sprite.frame = 9;
  sprite.scale.setTo(2.7, 2.7);
  this.gChoose.add(createText(305, 145, '  MEDIUM\n\nAvg. speed\nCheap\n\nSkills:\n\n.NET, SQL,\nPython,\nNetworking', 16));

  this.gChoose.add(createButton(498, 438, 'button_bottom_ui', function() { this.start(7); }, this, 1, 1, 0));
  this.gChoose.add(createText(540, 445, 'Elicia', 16));
  this.gChoose.add(createSprite(545, 370, 'placeholder_table')).scale.setTo(2.3, 2.3);
  var sprite = this.gChoose.add(createSprite(530, 300, 'developers'));
  sprite.frame = 21;
  sprite.scale.setTo(2.7, 2.7);
  this.gChoose.add(createText(491, 145, '   HARD\n\nAvg. speed\nLoves games\n\nSkills:\n\nOpenGL, Java,\nC/C++,\nGames', 16));

  var but = createButton(0, 0, 'menu_screen', function() {
   this.gChoose.visible = true;
   game.world.bringToTop(this.gChoose);
  }, this);
  but.scale.setTo(1, 1);
  but.input.enable = true;
  but.input.useHandCursor = true;
 },
 start : function(id) {
  startDevId = id;
  game.state.start('game');
 }
}
