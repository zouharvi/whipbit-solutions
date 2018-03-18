function createSprite(x, y, name) {
 var sprite = game.add.sprite(x, y, name);
 sprite.scale.setTo(4, 4);
 sprite.smoothed = false; 
 return sprite;
}

function createButton(x, y, name, func, context, s1, s2, s3) {
 var button = game.add.button(x, y, name, func, context, s1, s2, s3);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 return button;
}

function createText(x, y, text, size) {
 var text = game.add.bitmapText(x, y, 'visitor2', text, size); 
 text.scale.setTo(size/16, size/16);
 text.smoothed = false;
 return text;
}
