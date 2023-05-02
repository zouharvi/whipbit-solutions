var allSkills = [
 ['.NET', 1],
 ['AJAX', 1],
 ['Assembly', 2],
 ['C/C++', 2],
 ['CSS', 1],
 ['Algorithms', 2],
 ['UI Design', 2],
 ['Games', 2],
 ['Git', 1],
 ['HTML5', 1],
 ['JS', 1],
 ['Java', 2],
 ['SQL', 1],
 ['Networking', 3],
 ['OpenGL', 3],
 ['PHP', 2],
 ['Web API', 1],
 ['Perl', 2],
 ['Python', 2],
 ['Ruby', 3],
 ['Servers', 2],
 ['TCP/IP', 3],
 ['Web Design', 1],
 ['Security', 2]
];

var allSkillsAvailable = [];

var ManagementMenu = function() {
 this.g = game.add.group();
 this.g.add(createText(105, 110, 'MANAGEMENT', 16));
 this.salariesText = this.g.add(createText(105, 150, '', 16));

 this.g.visible = false;
}

ManagementMenu.prototype.update = function() {
 this.salariesText.setText('SALARIES (TOTAL): $' + stats.salaries);

 if(typeof(this.devs) != 'undefined')
  this.devs.destroy(true);

 this.devs = game.add.group();
 this.g.add(this.devs);

 var posX = [105, 400, 105, 400, 105, 400];
 var posY = [190, 190, 270, 270, 350, 350];
 var i = 0;
 for(; i < developers.length; i++) {
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { this.displayDev(b.i); }, this, 1,1,0));
  button.i = i;
  this.devs.add(createText(posX[i]+10, posY[i]+10, developers[i].name, 16));
  this.devs.add(createText(posX[i]+10, posY[i]+40, 'Salary: $' + developers[i].salary, 16));
 }
 if(developers.length < studio.capacity) {
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { hireDev.display(1, false); }, this, 1,1,0));
  this.devs.add(createText(posX[i]+175, posY[i]+40, 'HIRE', 16));
 } else {
  this.devs.add(createText(105, 444, 'Your office is full', 16));
 }
}

ManagementMenu.prototype.displayDev = function(i) {
 this.gDev = game.add.group();
 var developer = developers[i];
 this.gDev.add(createButton(0, 0, 'window_background', function() {}, 0, 0, 0));
 this.gDev.add(createText(105, 110, developer.name, 16));
 var duration = stats.month - developer.startMonth;
 this.gDev.add(createText(105, 150, developer.description, 16));
 this.gDev.add(createText(105, 220, 'Employed for ' + duration + ' month' + (duration==1?'':'s'), 16));
 this.gDev.add(createText(105, 260, 'Level: ' + developer.level, 16));
 this.gDev.add(createText(105, 290, 'Salary: $' + developer.salary, 16));
 this.gDev.add(createText(105, 320, 'Speed: ' + developer.speed, 16));
 this.gDev.add(createText(105, 350, 'XP: ' + Math.floor(developer.exp) + '^/' + (developer.level * 100) + '^', 16));
 this.gDev.add(createText(105, 380, 'SKILL POINTS: ' + developer.skillPoints, 16));

this.gDev.add(createButton(105, 437, 'button_whip', function() { this.fireDev(i); }, this, 1, 1, 0));
 this.gDev.add(createText(114, 444, 'FIRE', 16));
 this.gDev.add(createButton(195, 437, 'button_cancel_long', function() { this.promoteDev(i); }, this, 1, 1, 0));
 this.gDev.add(createText(223, 444, 'PROMOTE', 16));
 this.gDev.add(createButton(365, 437, 'button_cancel', function() { this.skillsDev(i, false); }, this, 1, 1, 0));
 this.gDev.add(createText(378, 444, 'SKILLS', 16));

 var posY = [270, 310, 350, 390];
 var offQ = 0;
 for(var q = 0; q < projects.length; q++) {
  if(projects[q] == null) {
   offQ++;
   continue;
  }
  var project_select = this.gDev.add(createButton(410, posY[q-offQ], 'button_project_select', function(b) {
   if(b.avail_indicator.frame == 1) {
    if(developers[i].tryAddProject(b.project)) {
     b.avail_indicator.frame = 0;
    } else {
     b.avail_indicator.frame = 1;
    }
   } else {
    developers[i].removeProject(b.project);
    b.avail_indicator.frame = 1;
   }
  }, this, 1, 1, 0));
  project_select.avail_indicator = this.gDev.add(createButton(390, posY[q-offQ], 'button_allow', function() {  }, this, 0, 0, 0));
  project_select.project = projects[q];
  if(developers[i].projects.indexOf(projects[q]) == -1)
   project_select.avail_indicator.frame = 1;
  this.gDev.add(createText(431, posY[q-offQ]+7, projects[q].name, 16));
 }

 this.gDev.add(createButton(588, 437, 'button_whip', function() { this.gDev.destroy(true); }, this, 1, 1, 0));
 this.gDev.add(createText(597, 444, 'BACK', 16));
 this.gDev.visible = true;
}

ManagementMenu.prototype.buySkill = function(i, skill, q) {
 this.gDevSkillBuy = game.add.group();
 var developer = developers[i];
 this.gDevSkillBuy.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));

 if(developer.skillPoints >= skill[1]) {
  this.gDevSkillBuy.add(createText(240, 250, 'Learn ' + skill[0] + '\nfor ' + skill[1] + ' skill points?', 16)).align = 'center';
  this.gDevSkillBuy.add(createButton(272, 337, 'button_whip', function() {
   developer.skills.push(skill[0]);
   developer.skillPoints -= skill[1];
   this.gDevSkillBuy.destroy(true);
   this.gDevSkills.destroy(true);
   this.skillsDev(i, q);
  }, this, 1, 1, 0));
  this.gDevSkillBuy.add(createText(285, 344, 'YES', 16));
 } else {
  this.gDevSkillBuy.add(createText(180, 260, skill[0] + ' costs ' + skill[1] + ' skill points', 16));
 }

 this.gDevSkillBuy.add(createButton(410, 337, 'button_whip', function() { this.gDevSkillBuy.destroy(true); }, this, 1, 1, 0));
 this.gDevSkillBuy.add(createText(418, 344, 'BACK', 16));
}

ManagementMenu.prototype.skillsDev = function(i, p) {
 if(p)
  pause(true);
 this.gDevSkills = game.add.group();
 var developer = developers[i];
 this.gDevSkills.add(createButton(0, 0, 'window_background', function() {}, 0, 0, 0));
 this.gDevSkillPoints = this.gDevSkills.add(createText(105, 105, developer.name + ' has ' + developer.skillPoints + ' skill point' + (developer.skillPoints==1?'':'s'), 16));

 for(var j = 0; j < allSkillsAvailable.length; j++) {
  if(developer.skills.indexOf(allSkillsAvailable[j][0]) == -1) {
   var skillButton = this.gDevSkills.add(createButton(105+Math.floor(j/8)*195, 140+(j%8)*37, 'button_bottom_ui', function(b) { this.buySkill(i, b.skill, p); }, this, 1, 1, 0));
   skillButton.skill = allSkillsAvailable[j];
  } else {
   this.gDevSkills.add(createButton(105+Math.floor(j/8)*195, 140+(j%8)*37, 'button_bottom_ui', function() { }, this, 0, 0, 0));
  }
  this.gDevSkills.add(createText(114+Math.floor(j/8)*195, 148+(j%8)*37, allSkillsAvailable[j][0], 16));
 }

 this.gDevSkills.add(createButton(588, 437, 'button_whip', function() {
  this.gDevSkills.destroy(true);
  if(p)
   pause(false);
 }, this, 1, 1, 0));
 this.gDevSkills.add(createText(597, 444, 'BACK', 16));

 this.gDevSkills.visible = true;
}

ManagementMenu.prototype.fireDev = function(i) {
 this.gDevFire = game.add.group();
 var developer = developers[i];
 this.gDevFire.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gDevFire.add(createText(295, 260, 'Fire ' + developer.name + '?', 16));

 this.gDevFire.add(createButton(272, 337, 'button_whip', function() {
  this.gDevFire.destroy(true);
  this.gDev.destroy(true);
  stats.salaries -= developer.salary;
  developers.splice(i, 1);
  developer.g.destroy(true);
  stats.reputation -= 1;
  stats.update();
  studio.relocateDevs();
  this.update();
 }, this, 1, 1, 0));
 this.gDevFire.add(createText(285, 344, 'YES', 16));

 this.gDevFire.add(createButton(410, 337, 'button_whip', function() { this.gDevFire.destroy(true); }, this, 1, 1, 0));
 this.gDevFire.add(createText(418, 344, 'BACK', 16));

 this.gDevFire.visible = true;
}

ManagementMenu.prototype.promoteDev = function(i) {
 this.gDevProm = game.add.group();
 var developer = developers[i];
 this.gDevProm.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 var price = developer.level * 110 - Math.floor(developer.exp/2);

 if(price > stats.money) {
  this.gDevProm.add(createText(250, 230, "You need $" + price + '\nto promote ' + developer.name, 16)).align = 'center';
 } else {
  this.gDevProm.add(createText(170, 230, 'Promote ' + developer.name + '\n   to level ' + (developer.level + 1) + ' for $' + price + '?', 16)).align = 'center';
  this.gDevProm.add(createButton(272, 337, 'button_whip', function() {
   stats.money -= price;
   developer.incExp(developer.level * 100 - developer.exp, false);
   this.gDevProm.destroy(true);
   this.gDev.destroy(true);
   this.displayDev(i);
   stats.update();
   this.update();
  }, this, 1, 1, 0));
  this.gDevProm.add(createText(285, 344, 'YES', 16));
 }

 this.gDevProm.add(createButton(410, 337, 'button_whip', function() { this.gDevProm.destroy(true); }, this, 1, 1, 0));
 this.gDevProm.add(createText(418, 344, 'BACK', 16));

 this.gDevProm.visible = true;
}
