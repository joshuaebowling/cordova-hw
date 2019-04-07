/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

const serviceParams: Params.initService = {
  service: "1234",
  characteristics: [
    {
      uuid: "ABCD",
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
    }
  ]
};
