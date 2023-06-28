const i2c = require('i2c-bus');

// MPU6050 I2C address
const MPU6050_ADDR = 0x68;

// MPU6050 registers
const PWR_MGMT_1 = 0x6B;
const ACCEL_XOUT_H = 0x3B;
const ACCEL_XOUT_L = 0x3C;
const ACCEL_YOUT_H = 0x3D;
const ACCEL_YOUT_L = 0x3E;
const ACCEL_ZOUT_H = 0x3F;
const ACCEL_ZOUT_L = 0x40;

// Open I2C bus
const i2c1 = i2c.openSync(1); // Use 1 for Raspberry Pi 2+

// Initialize MPU6050
i2c1.writeByteSync(MPU6050_ADDR, PWR_MGMT_1, 0);

// Read accelerometer data
function readAccelerometerData() {
  const accelX = combineBytes(i2c1.readByteSync(MPU6050_ADDR, ACCEL_XOUT_H), i2c1.readByteSync(MPU6050_ADDR, ACCEL_XOUT_L));
  const accelY = combineBytes(i2c1.readByteSync(MPU6050_ADDR, ACCEL_YOUT_H), i2c1.readByteSync(MPU6050_ADDR, ACCEL_YOUT_L));
  const accelZ = combineBytes(i2c1.readByteSync(MPU6050_ADDR, ACCEL_ZOUT_H), i2c1.readByteSync(MPU6050_ADDR, ACCEL_ZOUT_L));

  return {
    x: accelX,
    y: accelY,
    z: accelZ,
  };
}

// Helper function to combine two bytes into a signed integer
function combineBytes(msb, lsb) {
  const value = (msb << 8) | lsb;
  return value >= 0x8000 ? -(65536 - value) : value;
}

// Read and display accelerometer data every second
setInterval(() => {
  const accelerometerData = readAccelerometerData();
  console.log('Accelerometer data:', accelerometerData);
}, 1000);
