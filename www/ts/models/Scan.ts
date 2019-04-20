/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

const model: BluetoothlePlugin.ScanParams = {
  services: ["180D", "180F"],
  allowDuplicates: true,
  scanMode: BluetoothlePlugin.BluetoothScanMode.SCAN_MODE_LOW_LATENCY,
  matchMode: BluetoothlePlugin.BluetoothMatchMode.MATCH_MODE_AGGRESSIVE,
  matchNum: BluetoothlePlugin.BluetoothMatchNum.MATCH_NUM_MAX_ADVERTISEMENT,
  callbackType:
    BluetoothlePlugin.BluetoothCallbackType.CALLBACK_TYPE_ALL_MATCHES
};
