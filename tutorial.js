Tutorial = function() {
 this.g = game.add.group();
 var bd = game.add.bitmapData(1, 1);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, 1, 1);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 var background = this.g.add(game.add.button(0, 0, bd));
 background.scale.setTo(768, 552);
 background.alpha = 0.4;

 this.dialog = this.g.add(createSprite(0, 0, 'tutorial_background'));
 this.text = this.g.add(createText(0, 0, '', 16));
 this.text.align = 'center';

 this.ok = this.g.add(createButton(0, 0, 'button_whip', this.commence, this, 1, 1, 0));
 this.okT = this.g.add(createText(0, 0, 'OK', 16));

 this.g.visible = false;

 this.list = [];
 this.add(130, 200, 20, 25, 'Welcome to Whipbit Solutions.\nYour goal is to have lots\nof money or great reputation.\n($300 000 or 300*)\n\nBe careful not to be in debt\nat the end of each month.');
 this.add(220, 140, 40, 30, 'Create projects by clicking\non one of those buttons.\n\nYou get money by completing\nthem, but penalty when\nyou cross the deadline.');
 this.add(220, 140, 35, 35, 'Project requirements must\nmatch your skills.\n\nThey also have publicity,\nwhich results in reputation.');
 this.add(30, 140, 35, 30, 'Positive reputation is safer,\nbut projects with\nnegative publicity are\nsometimes a better deal.\n\nClick this stats button\nfor detailed report.');
 this.add(30, 310, 45, 60, 'Use the management menu to\nfire/hire developers\nor to improve their skills.');
 this.add(30, 225, 50, 60, '\'WHIP\' is used to increase\ndeveloper\'s motivation.\n\nGood luck.');

 this.commence();
}

Tutorial.prototype.add = function(x, y, x2, y2, text) {
 this.list.unshift([x, y, x2, y2, text]);
}

Tutorial.prototype.commence = function() {
 if(!this.g.visible) {
  pause(true);
  this.g.visible = true;
  game.world.bringToTop(this.g);
 }

 if(this.list.length == 0) {
  pause(false);
  this.g.destroy(true);
  return;
 }

 var current = this.list[this.list.length-1];
 this.dialog.x = current[0];
 this.dialog.y = current[1];
 this.ok.x = current[0] + 220;
 this.ok.y = current[1] + 150;
 this.okT.x = this.ok.x + 23;
 this.okT.y = this.ok.y + 6;
 this.text.x = current[0] + current[2];
 this.text.y = current[1] + current[3];
 this.text.setText(current[4]);
 this.list.pop();
}
