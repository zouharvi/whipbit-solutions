var overlayGroups = [];

function windowOverlaySwitch(i) {
 windowOverlay.visible = !windowOverlay.visible;
 if(i == -1)
  windowOverlay.visible = false;
 for(var k in overlayGroups) {
  overlayGroups[k].visible = windowOverlay.visible && (i==k)?true:false;
 }

 if(windowOverlay.visible) {
  pause(true)
  game.world.bringToTop(windowOverlay);
  if(i != -1) game.world.bringToTop(overlayGroups[i]);
 } else 
  pause(false);
}


var OverlayMenu = function() { 
 // creates big gray box for ui stuff
 windowOverlay = game.add.group(); 
 windowOverlay.add(createButton(0, 0, 'window_background', function() {}, this, 0, 0, 0));
 windowOverlay.add(createButton(652, -4, 'button_cancel', function() { windowOverlaySwitch(-1); }, this, 1, 1, 0));
 windowOverlay.add(createText(662, 3, 'PAUSED', 16));
 windowOverlay.add(createButton(588, 437, 'button_whip', function() { windowOverlaySwitch(-1); }, this, 1, 1, 0));
 windowOverlay.add(createText(597, 444, 'BACK', 16));
 windowOverlay.visible = false;
 
 
 managementMenu = new ManagementMenu();
 overlayGroups['management'] = managementMenu.g;
 
 upgradesMenu = new UpgradesMenu();
 overlayGroups['upgrades'] = upgradesMenu.g;
 
 statsMenu = new StatsMenu();
 overlayGroups['stats'] = statsMenu.g;
 
 helpMenu = new HelpMenu();
 overlayGroups['help'] = helpMenu.g;
}

var managementMenu, upgradesMenu, statsMenu;

var HelpMenu = function() {
 this.g = createText(105, 110, 'Your goal is to not to be in debt\n' +
 'at the end of each month.\n\n' + 
 
 'You can gain money by finishing\n' +
 'projects. For a new project,\n' +
 'click on one of those \'NEW PROJECT\'\n' +
 'buttons. You can have up to\n' + 
 '4 projects at the same time, but\n' + 
 'you\'ll have to pay penalty if you\n' + 
 'won\'t finish them before\n' + 
 'the deadline.\n\n' +
 
 'When your company gets bigger, you\n' + 
 'can hire more devs in the\n' +
 'managements menu.\n' + 
 'This menu can be also useful for\n' + 
 'upgrading developer\'s skills.\n\n' +

 'New offices or skills can be\n' +
 'bought in the upgrades menu.', 16); 
 this.g.visible = false;
}

var StatsMenu = function() {
 this.g = game.add.group(); 
 this.moneyText = createText(105, 110, '', 16);
 this.g.add(this.moneyText); 
 this.incomeText = createText(105, 150, '', 16);
 this.g.add(this.incomeText); 
 this.rentText = createText(155, 190, '', 16);
 this.g.add(this.rentText); 
 this.salariesText = createText(155, 230, '', 16);
 this.g.add(this.salariesText); 
 this.suppliesText = createText(155, 270, '', 16);
 this.g.add(this.suppliesText); 
 
 this.reputationText = createText(105, 320, '', 16);
 this.g.add(this.reputationText); 
 this.standingText = createText(105, 360, '', 16);
 this.g.add(this.standingText); 
}

StatsMenu.prototype.update = function() {
 stats.expences = stats.salaries + stats.rent + stats.supplies;
 this.moneyText.setText('MONEY: $' + stats.money);
 this.incomeText.setText('EXPENCES: $' + stats.expences + '/month');
 this.rentText.setText('RENT: $' + stats.rent);
 this.salariesText.setText('SALARIES: $' + stats.salaries);
 this.suppliesText.setText('SUPPLIES: $' + stats.supplies);
 
 this.reputationText.setText('REPUTATION: ' + stats.reputation + '*');
 this.standingText.setText('STANDING: ' + stats.reputationStanding + '*/month');
}
