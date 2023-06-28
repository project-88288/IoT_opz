var i2c = require('i2c-bus');
var oled = require('oled-i2c-bus');

var opts = {
  width: 128,
  height: 64,
  address: 0x3C,
  bus: 1,
  driver:"SSD1306"
};

var i2cbus = i2c.openSync(opts.bus)
var _oled = new oled(i2cbus, opts);

//_oled.clearDisplay();
_oled.turnOnDisplay();
_oled.clearDisplay();
_oled.update();

var font = require('oled-font-5x7');

// sets cursor to x = 1, y = 1
_oled.setCursor(1, 1);
_oled.writeString(font, 1, 'Cats and dogs are really cool animals, you know.', 1, true);

_oled.update();
