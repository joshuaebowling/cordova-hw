"use strict";
// bluetoothle is a global var created/set by cordova
/// <reference path="../../ts/services/services.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
class BluetoothService {
    constructor(bluetoothle) {
        this.initializePeripheral = this.initializePeripheral.bind(this);
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.bluetoothle.initialize(resolve);
        });
    }
    initializePeripheral(params) {
        return new Promise((resolve, reject) => {
            this.bluetoothle.initialize(() => {
                this.bluetoothle.initializePeripheral((result) => {
                    var params = {
                        service: "1234",
                        characteristics: [
                            {
                                uuid: "ABCD",
                                permissions: {
                                    read: true,
                                    write: true,
                                },
                                properties: {
                                    read: true,
                                    writeWithoutResponse: true,
                                    write: true,
                                    notify: true,
                                    indicate: true,
                                }
                            }
                        ]
                    };
                    bluetoothle.addService((result) => {
                        resolve();
                    }, (err) => { reject(err); onErr(err); }, params);
                }, onErr, parms);
            });
        });
    }
}
exports.default = BluetoothService;
//# sourceMappingURL=bluetooth.js.map