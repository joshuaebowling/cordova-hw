/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const Peripheral: Params.peripheral = {
  // this is only characteristic!!!
  name: "name",
  restoreKey: "",
  request: true
};

export default () => clone(Peripheral);
