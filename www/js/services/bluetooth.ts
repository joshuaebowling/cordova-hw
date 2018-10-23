// bluetoothle is a global var created/set by cordova
/// <reference types="IBluetoothService" />
export default class BluetoothService implements IBluetoothService {
    initialize() {}
    initializePeripheral(params) {
        return new Promise((resolve, reject) =>{ 
          bluetoothle.initialize(() => {
              bluetoothle.initializePeripheral((result) => {
                  var params = {
                      service: "1234",
                      characteristics: [
                      {
                          uuid: "ABCD",
                          permissions: {
                          read: true,
                          write: true,
                          //readEncryptionRequired: true,
                          //writeEncryptionRequired: true,
                          },
                          properties : {
                          read: true,
                          writeWithoutResponse: true,
                          write: true,
                          notify: true,
                          indicate: true,
                          //authenticatedSignedWrites: true,
                          //notifyEncryptionRequired: true,
                          //indicateEncryptionRequired: true,
                          }
                      }
                      ]
                  };
                  bluetoothle.addService((result) => {
                      resolve();
                  }, (err) => {reject(err); onErr(err);} , params);
              }, onErr, parms);
          });
      });
      }
}
