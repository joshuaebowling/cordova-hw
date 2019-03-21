/// <reference path="../index.d.ts" />

import bluetoothSerial from "cordova-plugin-bluetooth-serial";

const bluetoothSerialWrapper:Services.BluetoothSerial = {
  discover: () => {

  },
  enable: () => {
    return new Promise((resolve, reject) => {
      bluetoothSerial.enable(resolve, reject);
    });
  },
  isEnabled: () => {
    return new Promise((resolve, reject) => {
      bluetoothSerial.isEnabled(resolve, reject);
    });
  }
};

export default bluetoothSerialWrapper;