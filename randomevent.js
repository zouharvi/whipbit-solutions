RandomEvent = function() {
 this.g = game.add.group();
 this.g.add(createButton(0, 0, 'window_alert_background', function() {}, this, 0, 0, 0));
 this.g.add(createButton(340, 337, 'button_whip', function() {
  this.g.visible = false;
  pause(false);
 }, this, 1, 1, 0));
 this.g.add(createText(362, 344, 'OK', 16));
 this.infoText = this.g.add(createText(185, 240, '', 16));
 this.infoText.align = 'center';
 this.g.visible = false;

}

RandomEvent.prototype.random = function() {
 var probability = Math.random();
 if(testBounds(probability, 1, 0.9)) {
  var dev = developers[Math.floor(Math.random() * developers.length)];
  var skill;
  var found = false;
  while(!found) {
   found = true;
   skill = allSkills[Math.floor(Math.random() * allSkills.length)];
   for(var i = 0; i < dev.skills.length; i++) {
    if(skill[0] == dev.skills[i]) {
     found = false;
     break;
    }
   }
  }
  dev.skills.push(skill[0]);
  var found = false;
  for(var i = 0; i < allSkillsAvailable.length; i++) {
   if(skill[0] == allSkillsAvailable[i][0]) {
    found = true;
    break;
   }
  }
  if(!found)
   allSkillsAvailable.push(skill);

  this.randomSkill = skill[0];
  this.devName = dev.name;
  this.display(0);
 } else if(testBounds(probability, 0.8, 0.7)) {
  var skill;
  var found = false;
  while(!found) {
   found = true;
   skill = allSkills[Math.floor(Math.random() * allSkills.length)];
   for(var i = 0; i < allSkillsAvailable.length; i++) {
    if(skill[0] == allSkillsAvailable[i][0]) {
     found = false;
     break;
    }
   }
  }
  allSkillsAvailable.push(skill);
  this.randomSkill = skill[0];
  this.display(1);
 } else if(testBounds(probability, 0.4, 0.3)) {
  if(stats.reputation > 10) {
   this.donation = stats.reputation*20;
   this.display(2);
  } else if(stats.reputation < -10) {
   this.fee = stats.reputation * 13;
   this.display(3);
  }
 }

 function testBounds(p, x, y) {
  if(p < x && p > y)
   return true;
  else
   return false;
 }
}

RandomEvent.prototype.display = function(op) {
 pause(true);
 switch(op) {
 case 0:
  this.infoText.x = 230;
  this.infoText.setText(this.devName + ' has learned\n' + this.randomSkill);
  break;
 case 1:
  this.infoText.x = 240;
  this.infoText.setText('You can now learn\n' + this.randomSkill);
  break;
 case 2:
  this.infoText.x = 180;
  this.infoText.setText('People love your company.\nYou received\na donation of $' + this.donation);
  stats.money += this.donation;
  stats.update();
 break;
 case 3:
  this.infoText.x = 180;
  this.infoText.setText('The police had found out\nabout some of your\nillegal activities.\nThe fee is $' + (-this.fee));
  stats.money += this.fee;
  stats.update();
 break;
 }
 this.g.visible = true;
 game.world.bringToTop(this.g);
}
