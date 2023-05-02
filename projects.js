var posX = [253, 513, 253, 513];
var posY = [5, 5, 73, 73];

var lastProjectLocation = -1;

var Project = function (projectAssigment) {
 this.projectAssigment = projectAssigment;
 this.rewardMoney = projectAssigment['reward'];
 this.rewardReputationStanding = projectAssigment['publicity'];
 this.description = projectAssigment['description'];
 this.name = projectAssigment['title'];
 this.requirements = projectAssigment['requirements'];
 this.monthsLeft = projectAssigment['time'];
 this.height = 5;
 this.width = projectAssigment['length'];

 this.cells = {};
 this.cellWidth = this.width/this.requirements.length;
 for(var i = 0; i < this.requirements.length; i++)
  this.cells[this.requirements[i]] = this.cellWidth*this.height;

 var place = 0;
 for(; place < projects.length; place++)
  if(projects[place] == null) break;

 if(lastProjectLocation != -1)
  place = lastProjectLocation;

 projects[place] = this;
 this.place = place;

 // group for this.overlay
 this.g = game.add.group();
 this.g.add(createText(105, 110, this.name, 16));
 this.progressText = this.g.add(createText(105, 150, 'PROGRESS: 0%', 16));
 this.g.add(createText(105, 190, 'REWARD: $' + this.rewardMoney, 16));
 this.remMonthsText = this.g.add(createText(105, 230, 'REMAINING MONTHS ' + this.monthsLeft, 16));
 this.g.add(createText(395, 190, 'PUBLICITY: ' + this.rewardReputationStanding + '*', 16));
 var requirementsWords = '';
 for(var i = 0; i < this.requirements.length; i++) {
  requirementsWords += this.requirements[i];
  if(i != this.requirements.length -1)
   requirementsWords += ', ';
 }
 this.g.add(createText(105, 270, 'REQUIREMENTS: ' + requirementsWords, 16));
 this.g.add(createText(105, 305, this.description, 16));
 this.g.add(createButton(105, 437, 'button_whip', function() { this.gShip.visible = true; }, this, 1, 1, 0));
 this.g.add(createText(113, 444, 'SHIP', 16));
 this.g.add(createButton(195, 437, 'button_cancel', function() { this.gCancel.visible = true;}, this, 1, 1, 0));
 this.g.add(createText(208, 444, 'CANCEL', 16));
 this.g.visible = false;
 overlayGroups[this.name+this.description] = this.g;

 // group for shipping unfinished project:
 this.gShip = game.add.group();
 this.gShip.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gShip.add(createText(170,240,'DO YOU REALLY WANT TO SHIP\n  AN UNFINISHED PROJECT?\n   (REPUTATION PENALTY)\n     (SOME MONEY GAIN)', 16));
 this.gShip.add(createButton(272, 337, 'button_whip', function() {
  this.done = true;
  windowOverlaySwitch(-1);
  stats.money += Math.ceil(this.rewardMoney * this.assigned/(this.capacity*1.2)) * (Math.floor(Math.random() * 3) + 1);
  stats.reputationStanding -= Math.abs(this.rewardReputationStanding * (Math.floor(Math.random() * 3) + 1));
  stats.update();
  this.all.destroy(true);
  this.g.visible = false;
  this.removeFromLists();
 }, this, 1, 1, 0));
 this.gShip.add(createText(285, 344, 'YES', 16));
 this.gShip.add(createButton(410, 337, 'button_whip', function() { this.gShip.visible = false; }, this, 1, 1, 0));
 this.gShip.add(createText(418, 344, 'BACK', 16));
 this.g.add(this.gShip);
 this.gShip.visible = false;

 // group for canceling project:
 this.gCancel = game.add.group();
 this.gCancel.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gCancel.add(createText(200, 240, '  DO YOU REALLY WANT TO\n   CANCEL THIS PROJECT?\n(SMALL REPUTATION PENALTY)', 16));
 this.gCancel.add(createButton(272, 337, 'button_whip', function() {
  this.done = true;
  windowOverlaySwitch(-1);
  stats.reputationStanding -= Math.abs(this.rewardReputationStanding * Math.floor(Math.random() * 1.2));
  stats.update();
  this.all.destroy(true);
  this.g.visible = false;
  this.removeFromLists();
 }, this, 1, 1, 0));
 this.gCancel.add(createText(285, 344, 'YES', 16));
 this.gCancel.add(createButton(410, 337, 'button_whip', function() { this.gCancel.visible = false; }, this, 1, 1, 0));
 this.gCancel.add(createText(418, 344, 'NOPE', 16));
 this.g.add(this.gCancel);
 this.gCancel.visible = false;

 // group for failing in completing the project:
 this.gFail = game.add.group();
 this.gFail.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gFailText = this.gFail.add(createText(220,240,'', 16));
 this.gFail.add(createButton(340, 337, 'button_whip', function() {
  this.done = true;
  this.g.visible = false;
  this.gFail.destroy(true);
  this.all.destroy(true);
  this.removeFromLists();
  pause(false);
 }, this, 1, 1, 0));
 this.gFail.add(createText(362, 344, 'OK', 16));
 this.gFail.visible = false;

 // initializes main project button and text
 this.all = game.add.group();
 this.all.add(createButton(posX[place]-8, posY[place], 'button_project', function() { this.display(); }, this, 1, 1, 0));
 this.all.add(createText(posX[place], posY[place]+10, this.name, 16));
 this.monthsIndicator = this.all.add(createText(posX[place]+215, posY[place]+35, '' + this.monthsLeft, 16));

 // various points variables
 this.capacity = this.height*this.width;
 this.points = 0;
 this.assigned = -1;
 this.done = false;
 this.readyToCount = false;

 // initializes background for points
 for(var i = this.requirements.length-1; i >= 0; i--) {
  var bd = game.add.bitmapData(this.width, this.height);
  bd.ctx.beginPath();
  bd.ctx.rect(i*this.cellWidth, 0, this.cellWidth, this.height);
  bd.ctx.fillStyle = '#000000';
  bd.ctx.fill();
  this.backgroundSprite = createSprite(posX[place], posY[place]+30, bd);
  this.backgroundSprite.alpha = 0.1+i*0.05;
  this.all.add(this.backgroundSprite);
 }

}

Project.prototype.display = function() {
 this.gShip.visible = false;
 this.gCancel.visible = false;
 var tmpAssigned = this.assigned;
 if(tmpAssigned < 0) tmpAssigned = 0;
 this.progressText.setText('PROGRESS: ' + Math.floor(tmpAssigned/this.capacity*100) + '%');
 this.remMonthsText.setText('REMAINING MONTHS: ' + this.monthsLeft);
 windowOverlaySwitch(this.name+this.description);
}

Project.prototype.getPosition = function(type) {
 if(this.cells[type] <= 0) {
  return 'one';
 }
 this.assigned++;
 this.cells[type]--;
 if(this.assigned +1 == this.capacity)
  this.done = true;
 return [((this.cellWidth*this.height - this.cells[type] -1) % this.cellWidth + this.requirements.indexOf(type)*this.cellWidth) * 4 + this.backgroundSprite.x,
         Math.floor((this.cellWidth*this.height - this.cells[type]-1)/this.cellWidth) * 4 + this.backgroundSprite.y];
}

Project.prototype.arrived = function(fpoint) {
 this.all.add(fpoint.sprite);
 this.points++;
 if(this.points == this.capacity) {
  this.all.destroy(true);
  this.finished();
 }
}

Project.prototype.finished = function() {
 stats.money += this.rewardMoney;
 stats.reputationStanding += Math.floor(this.rewardReputationStanding * (Math.floor(Math.random() * 2.5) + 1));
 stats.update();
 this.removeFromLists();
}

Project.prototype.decMonth = function() {
 this.monthsLeft--;
 this.monthsIndicator.setText(''+this.monthsLeft);
 if(this.monthsLeft <= 0) {
  pause(true);
  var percentage = 0;
  if(this.assigned > 0)
   percentage = Math.floor(this.assigned/this.capacity*100);

  var actuallReward = percentage/100*this.rewardMoney*Math.floor(Math.random() * 3 + 1);
  this.gFailText.setText("You completed\n" + percentage + "% of the project.\n" +
  "\nWe will pay you $" + actuallReward);
  this.gFailText.align = 'center';
  stats.money += actuallReward;
  stats.reputationStanding -= Math.floor(Math.abs(this.rewardReputationStanding / (Math.floor(Math.random() * 3) + 1)));
  stats.update();
  this.gFail.visible = true;
  game.world.bringToTop(this.gFail);
 }
}

Project.prototype.removeFromLists = function() {
 this.projectAssigment['active'] = false;
 this.projectAssigment['date_finished'] = stats.month;
 delete windowOverlay[this.name + this.description];
 this.g.destroy(true);
 newProject.replace(this.place);
}
