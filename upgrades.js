var UpgradesMenu = function() {
 this.g = game.add.group();
 this.g.add(createText(105, 110, 'UPGRADES', 16));

 this.skillBut = this.g.add(createButton(395, 140, 'button_project', function() { this.showSkills(); }, this, 1, 1, 0));
 this.skillLabel = this.g.add(createText(404, 150, 'BUY SKILLS', 16));

 this.officeBut = this.g.add(createButton(105, 140, 'button_project', function() { this.tryBuy('new_office'); }, this, 1, 1, 0));
 this.officeLabel = this.g.add(createText(114, 150, 'NEW OFFICE', 16));
 this.officePrice = this.g.add(createText(260, 177, '$4200', 16));
 this.officePrice.align='right';

 this.coffeeBut = this.g.add(createButton(105, 220, 'button_project', function() { this.tryBuy('better_coffee'); }, this, 1, 1, 0));
 this.coffeeLabel = this.g.add(createText(114, 230, 'BETTER COFFEE   MORE PRODUCTIVITY', 16));
 this.coffeePrice = this.g.add(createText(260, 257, '$30', 16));
 this.officePrice.align='right';

 this.whipBut = this.g.add(createButton(105, 300, 'button_project', function() { this.tryBuy('whip_1'); }, this, 1, 1, 0));
 this.whipLabel = this.g.add(createText(114, 310,   'LONGER WHIP     MOTIVATION BOOST', 16));
 this.whipPrice = this.g.add(createText(260, 337, '$50', 16));
 this.whipPrice.align='right';

 this.whip2But = this.g.add(createButton(105, 380, 'button_project', function() { this.tryBuy('whip_2'); }, this, 1, 1, 0));
 this.whip2Label = this.g.add(createText(114, 390,  'STRONGER WHIP   LESS MOTIVATION LOSS', 16));
 this.whip2Price = this.g.add(createText(260, 417, '$50', 16));
 this.whip2Price.align='right';

 this.g.visible = false;
}


UpgradesMenu.prototype.tryBuy = function(code) {
 switch(code) {
 case 'new_office':
  if(this.confrim(studio.officePrices[studio.level-1])) {
   this.officePrice.setText('$' + studio.officePrices[studio.level]);
   studio.inc();
   if(studio.level >= 3) {
    this.officeBut.visible = false;
    this.officeLabel.visible = false;
    this.officePrice.visible = false;
   }
   windowOverlaySwitch(-1);
  }
  break;
 case 'better_coffee':
  if(this.confrim(studio.coffeePrice)) {
   studio.buyCoffee();
   this.coffeePrice.setText('$' + studio.coffeePrice);
   if(studio.coffeePrice > 9999) {
    this.coffeePrice.visible = false;
    this.coffeeLabel.visible = false;
    this.coffeeBut.visible = false;
   }
  }
  break;
 case 'whip_1':
  if(this.confrim(studio.whipPrice)) {
   studio.buyWhip();
   this.whipPrice.setText('$' + studio.whipPrice);
   if(studio.whipPrice > 9999) {
    this.whipPrice.visible = false;
    this.whipLabel.visible = false;
    this.whipBut.visible = false;
   }
  }
  break;
 case 'whip_2':
  if(this.confrim(studio.whip2Price)) {
   studio.buyWhip2();
   this.whip2Price.setText('$' + studio.whip2Price);
   if(studio.whipPrice > 9999) {
    this.whip2Price.visible = false;
    this.whip2Label.visible = false;
    this.whip2But.visible = false;
   }
  }
  break;

 }
}

UpgradesMenu.prototype.confrim = function(price) {
 if(price > stats.money) {
  this.gNM = game.add.group();
  this.gNM.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
  this.gNM.add(createText(166, 260, 'You don\'t have enough money', 16));
  this.gNM.add(createButton(344, 337, 'button_whip', function() {
   this.gNM.visible = false;
  }, this, 1, 1, 0));
  this.gNM.add(createText(370, 344, 'OK', 16));
  return false;
 }

 stats.money -= price;
 stats.update();
 return true;
}

UpgradesMenu.prototype.showSkills = function() {
 this.gSkills = game.add.group();
 this.gSkills.add(createButton(0, 0, 'window_background', function() {}, 0, 0, 0));
 for(var j = 0; j < allSkills.length; j++) {
  if(allSkillsAvailable.indexOf(allSkills[j]) == -1) {
   var skillButton = this.gSkills.add(createButton(105+Math.floor(j/8)*195, 140+(j%8)*37, 'button_bottom_ui', function(b) {
    this.buySkill(b.skill);
   }, this, 1, 1, 0));
   skillButton.skill = allSkills[j];
  } else {
   this.gSkills.add(createButton(105+Math.floor(j/8)*195, 140+(j%8)*37, 'button_bottom_ui', null, this, 0, 0, 0));
  }
  this.gSkills.add(createText(114+Math.floor(j/8)*195, 148+(j%8)*37, allSkills[j][0], 16));
 }
 this.gSkills.add(createButton(588, 437, 'button_whip', function() {
  this.gSkills.destroy(true);
 }, this, 1, 1, 0));
 this.gSkills.add(createText(597, 444, 'BACK', 16));
}

UpgradesMenu.prototype.buySkill = function(skill) {
 this.gSkillBuy = game.add.group();
 this.gSkillBuy.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 var price = skill[1]*300;

 if(stats.money >= price) {
  this.gSkillBuy.add(createText(200, 250, 'Study ' + skill[0] + ' for $' + price + '?', 16)).align = 'center';
  this.gSkillBuy.add(createButton(272, 337, 'button_whip', function() {
   allSkillsAvailable.push(skill);
   stats.money -= price;
   stats.update();
   this.gSkillBuy.destroy(true);
   this.gSkills.destroy(true);
   this.showSkills();
  }, this, 1, 1, 0));
  this.gSkillBuy.add(createText(285, 344, 'YES', 16));
 } else {
  this.gSkillBuy.add(createText(200, 260, skill[0] + ' costs $' + price, 16));
 }

 this.gSkillBuy.add(createButton(410, 337, 'button_whip', function() { this.gSkillBuy.destroy(true); }, this, 1, 1, 0));
 this.gSkillBuy.add(createText(418, 344, 'BACK', 16));
}
