HireDev = function() {
 this.g = game.add.group();
 this.g.add(createButton(0, 0, 'window_background', function() {}, this, 0, 0, 0));
 
 this.devName = this.g.add(createText(105, 110, '', 16));
 this.devDesc = this.g.add(createText(105, 150, '', 16));
 this.devSkillsText = this.g.add(createText(105, 370, 'SKILLS:', 16));
 this.devSkills = this.g.add(createText(220, 370, '', 16));
 this.devSalary = this.g.add(createText(105, 230, '', 16));
 this.devHireFee = this.g.add(createText(105, 265, '', 16));
 this.devSpeed = this.g.add(createText(105, 300, '', 16));
 this.devSkillPoints = this.g.add(createText(105, 335, '', 16));
 
 this.buttonPrev = this.g.add(createButton(105, 437, 'button_whip', function() { this.showNext(-1); }, this, 1, 1, 0));
 this.buttonPrevText = this.g.add(createText(114, 444, 'PREV', 16));
 this.devsIndicator = this.g.add(createText(213, 444, "0/0", 16));
 this.buttonNext = this.g.add(createButton(318, 437, 'button_whip', function() { this.showNext(1); }, this, 1, 1, 0));
 this.buttonNextText = this.g.add(createText(327, 444, 'NEXT', 16));
 this.g.add(createButton(588, 437, 'button_whip', function() {
  this.g.visible = false;
  if(this.pauseLater)
   pause(false);
 }, this, 1, 1, 0));
 this.g.add(createText(597, 444, 'BACK', 16));
 
 this.placeholderTable = this.g.add(createSprite(521, 249, 'placeholder_table'));
 this.prevSprite = this.g.add(createSprite(520, 160, 'developers'));

 this.buttonHire = this.g.add(createButton(478, 103, 'button_bottom_ui', function(b) {
  stats.money -= allDevelopers[b.i]['hire_fee'];
  stats.update();
  new Developer(b.i);
  managementMenu.update();
  this.showNext(-1);
  this.update();
  windowOverlaySwitch(-1);
  this.g.visible = false;
 }, this, 1, 1, 0));
 this.buttonHireText = this.g.add(createText(535, 112, 'HIRE', 16));
 this.unavailableText = this.g.add(createText(400, 112, 'NOT ENOUGHT MONEY', 16));
 this.g.visible = false;
 this.currentN = 1;
}

HireDev.prototype.showNext = function(off) {
 this.currentN += off;
 if(this.currentN > this.maxN)
  this.currentN = this.maxN;
 if(this.currentN < 1)
  this.currentN = 1;
 
 this.update();
}

HireDev.prototype.display = function(cN, pauseLater) {
 if(pauseLater)
  pause(true);
 this.currentN = cN;
 this.pauseLater = pauseLater;
 this.update();
 this.g.visible = true;
 game.world.bringToTop(this.g);
}

HireDev.prototype.update = function() {
 this.maxN = availableDevelopers.length;
 
 if(this.maxN == 0) {
  this.devName.setText('No candidates\n\nPositive reputation will attract\nmore next month');
  this.devDesc.visible = false;
  this.devSalary.visible = false;
  this.devHireFee.visible = false;
  this.devSpeed.visible = false;
  this.devSpeed.visible = false;
  this.devSkillPoints.visible = false;
  this.devSkills.visible = false;
  this.devSkillsText.visible = false;
  this.prevSprite.visible = false;
  this.placeholderTable.visible = false;

  this.buttonHire.visible = false;
  this.buttonHireText.visible = false;
  this.unavailableText.visible = false;
  this.devsIndicator.visible = false;
  this.buttonPrev.visible = false;
  this.buttonPrevText.visible = false;
  this.buttonNext.visible = false;
  this.buttonNextText.visible = false;
  return;
 }
 
 this.devDesc.visible = true;
 this.devSalary.visible = true;
 this.devHireFee.visible = true;
 this.devSpeed.visible = true;
 this.devSpeed.visible = true;
 this.devSkillPoints.visible = true;
 this.devSkills.visible = true;
 this.devSkillsText.visible = true;
 this.prevSprite.visible = true;
 this.placeholderTable.visible = true;
 this.buttonHire.visible = false;
 this.buttonHireText.visible = true;
 this.unavailableText.visible = true;
 this.devsIndicator.visible = true;
 this.buttonPrev.visible = true;
 this.buttonPrevText.visible = true;
 this.buttonNext.visible = true;
 this.buttonNextText.visible = true;

 this.devsIndicator.setText(this.currentN + '/' + this.maxN);
 var curDev = availableDevelopers[this.currentN-1];

 this.buttonHire.i = allDevelopers.indexOf(curDev);
 if(curDev['hire_fee'] <= stats.money) {
  this.buttonHire.visible = true;
  this.buttonHireText.visible = true;
  this.unavailableText.visible = false;
 } else {
  this.buttonHire.visible = false;
  this.buttonHireText.visible = false;
  this.unavailableText.visible = true;
 }
 
 this.buttonPrev.visible = true;
 this.buttonPrevText.visible = true;
 this.buttonNext.visible = true;
 this.buttonNextText.visible = true;
  
 this.devName.setText(curDev['name']);
 this.devDesc.setText(curDev['description']);
 this.devSkillPoints.setText('FREE SKILL POINTS: ' + curDev['skill_points']);
 this.devSalary.setText('SALARY: $' + curDev['salary']);
 this.devHireFee.setText('HIRE FEE: $' + curDev['hire_fee']);
 this.devSpeed.setText('SPEED: ' + curDev['speed']);
 
 this.prevSprite.frame = (curDev['id'])*3;

 var skillsWords = '';
 var skillsList = curDev['skills'];
 var acc = 0;
 for(var i = 0; i < skillsList.length; i++) {
  if(acc + skillsList[i].length > 29) {
   skillsWords += '\n';
   acc = 0;
  }
  acc += skillsList[i].length + 2;
  skillsWords += skillsList[i];
  if(i != skillsList.length -1)
   skillsWords += ', ';
 }
 this.devSkills.setText(skillsWords);
}

HireDev.prototype.unlock = function(index) {
 if(availableDevelopers.indexOf(allDevelopers[index]) == -1 && allDevelopers[index].active == false) {
  availableDevelopers.push(allDevelopers[index]);
  return true;
 } else {
  return false;
 }
}

HireDev.prototype.lock = function(index) {
 var v = availableDevelopers.indexOf(allDevelopers[index]);
 if(v != -1) availableDevelopers.splice(v, 1);
}

HireDev.prototype.randomHire = function(indicate) {
 if(developers.length >= studio.capacity)
  return;
 // do some more calculations in relations with salary and hire fee
 for(var i = 0; i < 2; i++) {
  if(Math.random() > 0.40-stats.reputation/90 + availableDevelopers.length/14) {
   // 10 attempts
   for(var j = 0; j < 10; j++) {
    var newDevI = Math.floor(Math.random() * allDevelopers.length);
    if(this.unlock(newDevI)) {
     if(indicate) indicators.newDev(availableDevelopers.indexOf(allDevelopers[newDevI]));
     break;
    }
   }
  } else if(Math.random() > 0.4) {
   this.lock(Math.floor(Math.random() * availableDevelopers.length));
  }
 }
}
