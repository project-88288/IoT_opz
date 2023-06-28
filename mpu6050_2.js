const MPU6050 = require('mpu6050');

// Instantiate MPU6050
const mpu6050 = new MPU6050();

// Initialize MPU6050
mpu6050.initialize();

// Read accelerometer data
function readAccelerometerData() {
  const { x, y, z } = mpu6050.getAcceleration();
  return {
    x,
    y,
    z,
  };
}

// Read and display accelerometer data every second
setInterval(() => {
  const accelerometerData = readAccelerometerData();
  console.log('Accelerometer data:', accelerometerData);
}, 1000);

