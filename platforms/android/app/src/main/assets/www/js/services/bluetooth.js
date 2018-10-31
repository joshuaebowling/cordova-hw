"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// bluetoothle is a global var created/set by cordova
/// <reference path="../../ts/services/services.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
class BluetoothService {
    constructor(bluetoothle) {
        this.bluetoothle = bluetoothle;
        this.initializePeripheral = this.initializePeripheral.bind(this);
        this.initialize = this.initialize.bind(this);
    }
    initialize() {
        console.log('initialize');
        return new Promise((resolve, reject) => {
            this.bluetoothle.initialize(resolve);
        });
    }
    initializePeripheral(params) {
        console.log('initializePeripheral');
        return new Promise((resolve, reject) => {
            this.bluetoothle.initializePeripheral(resolve, reject, params);
        });
    }
    addService(params) {
        console.log('addservice');
        return new Promise((resolve, reject) => {
            /// TODO check for existent service against params
            this.bluetoothle.addService(resolve, reject, params);
        });
    }
    isAdvertising() {
        console.log('isAdvertising');
        return new Promise((resolve, reject) => {
            this.bluetoothle.isAdvertising(resolve, reject);
        });
    }
    startAdvertising(params) {
        console.log('startAdvertising');
        const self = this;
        return new Promise((resolve, reject) => {
            self.isAdvertising()
                .then((result) => {
                if (!result.status) {
                    self.bluetoothle.startAdvertising(resolve, reject, params);
                }
            });
        });
    }
    advertise(params) {
        console.log('advertise');
        const self = this;
        const { service, peripheral, advertisement } = params;
        var advertiseResult = { intialize: {}, service: {}, peripheral: {}, advertise: {} };
        return new Promise((resolve, reject) => {
            self.initialize()
                .then((result) => {
                advertiseResult.initialize = result;
                self.addService(service);
            })
                .then((result) => { advertiseResult.service = result; self.initializePeripheral(peripheral); })
                .then((result) => { advertiseResult.peripherial = result; self.startAdvertising(advertisement); })
                .then((result) => {
                advertiseResult.advertise = result;
                if ("advertisingStarted" === "advertisingStarted") {
                    resolve(advertiseResult);
                }
                else {
                    reject(advertiseResult);
                }
            });
        });
    }
}
exports.default = BluetoothService;
//# sourceMappingURL=bluetooth.js.map