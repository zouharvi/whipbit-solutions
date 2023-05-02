Indicators = function () {
 this.gProject = game.add.group();

 this.gProjectButN = this.gProject.add(createButton(-6, 160, 'button_project_select', null, this, 0, 0, 0));
 this.gProjectButA = this.gProject.add(createButton(-6, 160, 'button_project_select', function(b) {
  this.tryAddProject(b);
  this.gProject.visible = false;
 }, this, 1, 1, 0));
 this.gProject.add(createText(2, 168, 'NEW PROJECT AVAILABLE', 14));
 this.gProject.visible = false;

 this.gDev = game.add.group();
 this.gDev.add(createButton(-6, 200, 'button_project_select', function() {
  this.tryNewDev();
  this.gDev.visible = false;
 }, this, 1, 1, 0));
 this.gDev.add(createText(2, 208, 'NEW DEV AVAILABLE', 14));
 this.gDev.visible = false;

 this.gDevLvl = game.add.group();
 this.gDevLvl.add(createButton(-6, 240, 'button_project_select', function() {
  this.tryDisplayDev();
  this.gDevLvl.visible = false;
 }, this, 1, 1, 0));
 this.devLvlText = this.gDevLvl.add(createText(2, 248, 'X LEVELED UP', 14));
 this.gDevLvl.visible = false;
}

Indicators.prototype.newProject = function(id) {
 this.newProjectId = id+1;
 var available = false;
 for(var i = 0; i < projects.length; i++) {
  if(projects[i] == null) {
   available = true;
   break;
  }
 }
 if(available) {
  this.gProjectButA.visible = true;
  this.gProjectButN.visible = false;
 } else {
  this.gProjectButA.visible = false;
  this.gProjectButN.visible = true;
 }
 this.gProject.visible = true;
 game.time.events.add(4000, function() {
  this.gProject.visible = false;
 }, this);
}

Indicators.prototype.newDev = function(cN) {
 this.gDev.visible = true;
 this.newDevId = cN+1;
 game.time.events.add(4000, function() { this.gDev.visible = false; }, this);
}

Indicators.prototype.devLvlUp = function(id) {
 this.devId = id;
 this.devLvlText.setText(developers[id].name + ' LEVELED UP');
 this.gDevLvl.visible = true;
 game.time.events.add(4000, function() {  this.gDevLvl.visible = false; }, this);
}

Indicators.prototype.tryNewDev = function() {
 hireDev.display(this.newDevId, true);
}

Indicators.prototype.tryDisplayDev = function() {
 managementMenu.skillsDev(this.devId, true);
}

Indicators.prototype.tryAddProject = function(b) {
 for(var i = 0; i < projects.length; i++) {
  if(projects[i] == null) {
   b.place = i;
   newProject.display(b, this.newProjectId);
   return;
  }
 }
}
