Studio = function() {
 this.level = 0;
 this.capacities = [2, 3, 4];
 this.posX = [
  [540, 250],
  [565, 310, 90],
  [615, 440, 260, 92],
 ];
 this.supplies = [50, 110, 200];
 this.rent = [100, 300, 600];
 this.officePrices = [4200, 9400];

// upgrades part
 this.coffeePrice = 30;
 this.coffeeBoost = 0;

 this.whipPrice = 50;
 this.whipBoost = 0;

 this.whip2Price = 70;
 this.whip2Boost = 0;
}

Studio.prototype.inc = function() {
 this.level++;
 stats.supplies += this.supplies[this.level-1];
 stats.rent += this.rent[this.level-1];
 if(this.level > 1) {
  stats.supplies -= this.supplies[this.level-2];
  stats.rent -= this.rent[this.level-2];
  background.loadTexture('level_' + this.level);
  this.relocateDevs();
 }
 this.capacity = this.capacities[this.level-1];
 stats.update();
 managementMenu.update();
 hireDev.update();
}

Studio.prototype.relocateDevs = function() {
 for(var i = 0; i < developers.length; i++) {
  developers[i].relocate();
 }
}

Studio.prototype.buyCoffee = function() {
 this.coffeePrice *= 1.5;
 this.coffeePrice += 50;
 this.coffeePrice = Math.floor(this.coffeePrice);
 this.coffeeBoost += 0.03;
}

Studio.prototype.buyWhip = function() {
 this.whipPrice *= 1.5;
 this.whipPrice += 50;
 this.whipPrice = Math.floor(this.whipPrice);
 this.whipBoost += 0.09;
}

Studio.prototype.buyWhip2 = function() {
 this.whip2Price *= 1.5;
 this.whip2Price += 50;
 this.whip2Price = Math.floor(this.whip2Price);
 this.whip2Boost += 0.005;
}
