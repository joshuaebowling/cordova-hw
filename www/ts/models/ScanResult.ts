/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const model = {
  status: "scanResult",
  advertisement: "awArG05L", //Android
  // "advertisement": { //iOS
  //   "serviceUuids": [
  //     "180D"
  //   ],
  // "manufacturerData": "awAvFFZY",
  // "txPowerLevel": 0,
  // "overflowServiceUuids": [
  // ],
  // "isConnectable": true,
  // "solicitedServiceUuids": [
  // ],
  // "serviceData": {
  // },
  // "localName": "Polar H7 3B321015"
  //  },
  rssi: -58,
  name: "Polar H7 3B321015",
  address: "ECC037FD-72AE-AFC5-9213-CA785B3B5C63"
};

export default () => clone(model);
