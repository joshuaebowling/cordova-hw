/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const Characteristic: BluetoothlePlugin.Characteristic = {
  // this is only characteristic!!!
  uuid: "uuid",
  permissions: {
    read: true,
    write: true,
    readEncryptionRequired: true,
    writeEncryptionRequired: true
  },
  properties: {
    read: true,
    writeWithoutResponse: true,
    write: true,
    notify: true,
    indicate: true,
    authenticatedSignedWrites: true,
    notifyEncryptionRequired: true,
    indicateEncryptionRequired: true
  }
};

export default () => clone(Characteristic);
