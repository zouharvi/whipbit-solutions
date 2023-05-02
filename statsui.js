var Stats = function() {
 createButton(5, 6, 'button_stats', function() { statsMenu.update(); windowOverlaySwitch('stats'); }, this, 1, 1, 0);
 this.moneyText = createText(12, 15, '', 16);
 this.moneyText.align = 'right';
 this.reputationText = createText(12, 55, '', 16);
 this.reputationText.align = 'right';
 this.monthText = createText(12, 95, '', 16);
 this.monthText.align = 'right';

 this.month = 1;
 this.days = -1;
 this.money = 4000;
 this.reputation = 5;
 this.reputationStanding = 0;
 this.rent = 0;
 this.salaries = 0;
 this.supplies = 0;
 this.expences = this.rent + this.salaries + this.supplies;
 this.incDay();
 this.update();

 this.timer = createTimer(false);
 this.timer.loop(1000, this.incDay, this);
 this.timer.start();
}

Stats.prototype.incMonth = function() {
 this.month++;
 this.expences = this.rent + this.salaries + this.supplies;
 this.money -= this.expences;
 this.reputation += this.reputationStanding;
 this.reputationStanding += (this.reputationStanding>0)?(-1-Math.floor(this.reputationStanding/10)):(1+Math.floor(-this.reputationStanding/15));
 for(var i = 0; i < projects.length; i++) {
  if(projects[i] == null)
   continue;
  if(projects[i].readyToCount)
   projects[i].decMonth();
  else
   projects[i].readyToCount = true;
 }
 this.update();
 hireDev.randomHire(true);
 if(this.money < 0)
  this.lostGame();
 else
  randomEvent.random();
}

Stats.prototype.lostGame = function() {
 pause(true);
 this.gLost = game.add.group();
 this.gLost.add(createButton(0, 0, 'window_alert_background', function() {}, this, 0, 0, 0));
 this.gLost.add(createButton(310, 337, 'button_cancel_long', function() {
  window.location.href = window.location.href;
 }, this, 1, 1, 0));
 this.gLost.add(createText(336, 344, 'RESTART', 16));
 this.gLost.add(createText(295, 270, 'You\'ve lost.', 16));
 game.world.bringToTop(this.gLost);
}

Stats.prototype.wonGame = function() {
 pause(true);
 this.gWon = game.add.group();
 this.gWon.add(createButton(0, 0, 'window_alert_background', function() {}, this, 0, 0, 0));
 this.gWon.add(createButton(310, 337, 'button_cancel_long', function() {
  window.location.href = window.location.href;
 }, this, 1, 1, 0));
 this.gWon.add(createText(336, 344, 'RESTART', 16));
 this.gWon.add(createText(305, 270, 'You\'ve won!', 16));
 game.world.bringToTop(this.gWon);
}

Stats.prototype.incDay = function() {
 this.days++;
 if(this.days >= 30) {
  this.incMonth();
  this.days = 0;
 }
 this.monthText.setText('MONTH: (' + (this.days > 20?'0':'') + (30-this.days) + ')  \n' + this.month);
}

Stats.prototype.update = function() {
 this.expences = this.rent + this.salaries + this.supplies;
 this.moneyText.setText('MONEY:        \n$'+ this.money+'/300000');
 this.reputationText.setText('REPUTATION:   \n'+ this.reputation +'/300*');

 if(this.money >= 300000 || this.reputation >= 300)
  this.wonGame();
}

var BottomUI = function() {
 createButton(5, 517, 'button_bottom_ui', function() { windowOverlaySwitch('management'); }, this, 1, 1, 0);
 createText(17, 525, 'MANAGEMENT', 16);

 createButton(193, 517, 'button_bottom_ui', function() { windowOverlaySwitch('upgrades');}, this, 1, 1, 0);
 createText(218, 525, 'UPGRADES', 16);

 createButton(381, 517, 'button_bottom_ui', function() { windowOverlaySwitch('help'); }, this, 1, 1, 0);
 createText(439, 525, 'HELP', 16);

 createButton(571, 517, 'button_bottom_ui', function() { window.open('https://twitter.com/ViliX64', '_blank'); }, this, 1, 1, 0);
 createText(597, 525, '@VILIX64', 16);
}
