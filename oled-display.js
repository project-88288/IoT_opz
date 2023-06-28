const Oled = require('oled-i2c-bus');
const i2c = require('i2c-bus');

const bus = i2c.openSync(1); // Open I2C bus on Raspberry Pi 2/3

// OLED display configuration
const opts = {
  width: 128,
  height: 64,
  address: 0x3C
};

// Create an instance of the OLED display
const display = new Oled(bus, opts);

// Initialize the display
display.clearDisplay();
display.turnOnDisplay();

// Set text properties

const font = require('oled-font-5x7');

// sets cursor to x = 1, y = 1
display.setCursor(1, 1);
display.writeString(font, 1, 'Cats and dogs are really cool animals, you know.', 1, true);
//display.setTextFont('courier', 10); // Choose font and size
//display.setTextAlignment(0); // Align text to left

// Display text
//display.setCursor(0, 0); // Set the cursor position (x, y)
//display.writeString('Hello, World!');

// Update the display to show the text
display.update();

// Wait for 5 seconds and then clear the display
setTimeout(() => {
//  display.clearDisplay();
  display.update();
}, 50000);

