/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const model: BluetoothlePlugin.ScanParams = {
  services: ["180D", "180F"],
  allowDuplicates: true,
  scanMode: 2,
  matchMode: 1,
  matchNum: 3,
  callbackType: 1,
  name: ""
};

export default () => clone(model);
