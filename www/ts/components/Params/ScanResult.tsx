/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import BluetoothService from "../../services/bluetooth";

const ScanResult = (scanResult: BluetoothlePlugin.ScanStatus) => {
  return <h1>{scanResult.address}</h1>;
};

export default ScanResult;
