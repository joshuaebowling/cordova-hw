// bluetoothle is a global var created/set by cordova
/// <reference path="../../ts/services/services.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
export default class BluetoothService implements Services.BluetoothService {
    constructor(bluetoothle: BluetoothlePlugin.Bluetoothle) {
        this.bluetoothle = bluetoothle;
        this.initializePeripheral = this.initializePeripheral.bind(this);
        this.initialize = this.initialize.bind(this);
    }
    bluetoothle: BluetoothlePlugin.Bluetoothle
    initialize() {
        console.log('initialize');
        return new Promise((resolve, reject) => {
            this.bluetoothle.initialize(resolve);
        });
    }
    initializePeripheral(params: BluetoothlePlugin.InitPeripheralParams) {
        console.log('initializePeripheral');
        return new Promise((resolve, reject) =>{ 
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
        return new Promise((resolve:any, reject) => {
            this.bluetoothle.isAdvertising(resolve, reject);
        });
    }
    startAdvertising(params: Params.advertising) {
        console.log('startAdvertising');
        const self = this;
        return new Promise<{status: Services.Status}>((resolve:any, reject:any) => {
            self.isAdvertising()
                .then((result:{status: boolean}) => {
                    if(!result.status) {
                        self.bluetoothle.startAdvertising(resolve, reject, params)
                    }
                });
        });
    }
    advertise(params: any) {
        console.log('advertise');
        const self:any = this;
        const {service, peripheral, advertisement} = params;
        var advertiseResult: any = {intialize: {}, service: {}, peripheral: {}, advertise: {}};
        return new Promise((resolve, reject) => {
            self.initialize()
                .then((result: any) => { 
                    advertiseResult.initialize = result;
                    self.addService(service); 
                })
                .then((result: any) => { advertiseResult.service = result; self.initializePeripheral(peripheral); })
                .then((result: any) => { advertiseResult.peripherial = result; self.startAdvertising(advertisement); })
                .then((result:any) => {
                    advertiseResult.advertise = result;
                    if( "advertisingStarted" === "advertisingStarted") {
                        resolve(advertiseResult);
                    } else {
                        reject(advertiseResult);
                    }
                })
            ;
        });
    }
}
