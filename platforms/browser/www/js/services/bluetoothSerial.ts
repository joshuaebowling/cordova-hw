/// <reference path="../index.d.ts" />

import bluetoothSerial from "cordova-plugin-bluetooth-serial";

const bluetoothSerialWrapper:Services.BluetoothSerial = {
  discover: () => {
    return new Promise((resolve, reject) => {
      bluetoothSerial.discoverUnpaired
    });
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
  },
  setDiscoverable: () => {
    return new Promise(() => {
      bluetoothSerial.setDiscoverable(120);
    })
  }
};

export default bluetoothSerialWrapper;