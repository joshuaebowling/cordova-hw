/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const advert: BluetoothlePlugin.AdvertisingParamsAndroid = {
  //  services: ["1234"], //iOS
  service: "1234",
  mode: "balanced",
  connectable: true,
  timeout: 20000,
  txPowerLevel: "high",
  includeDeviceName: true,
  includeTxPowerLevel: true
};

const txPowerLevels: Array<string> = ["high", "low", "ultralow", "medium"];

export { txPowerLevels };

export default () => clone(advert);
