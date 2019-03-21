// bluetoothle is a global var created/set by cordova
/// <reference path="../../ts/services/services.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
var advertisementParams:Params.advertising, app, getAdvertisingParams, initialize, isAdvertise, onErr, setAdvertisingParams, startAdvertise, stopAdvertise,
$advertiseInfo
;



export default class BluetoothService implements Services.BluetoothService {
    constructor(bluetoothle: BluetoothlePlugin.Bluetoothle) {
        this.bluetoothle = bluetoothle;
        this.initializePeripheral = this.initializePeripheral.bind(this);
        this.initialize = this.initialize.bind(this);
        this.addService = this.addService.bind(this);
        this.isAdvertising = this.isAdvertising.bind(this);
        this.startAdvertising = this.startAdvertising.bind(this);
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
        console.log('advertise', params);
        const self:any = this;
        const {serviceParams, peripheralParams, advertisementParams} = params;
        console.log(params);
        var advertiseResult: any = {intialize: {}, service: {}, peripheral: {}, advertise: {}};
        return new Promise((resolve, reject) => {
            self.initialize()
                .then(() => self.initializePeripheral(peripheralParams))
                .then(() => self.addService(serviceParams))
                .then(() => self.startAdvertising(advertisementParams)
                .then(r => alert(JSON.stringify(r))
                .catch((e) => onErr(e))

            // self.initialize()
            // .then((result: any) => { alert(JSON.stringify(result)); advertiseResult.initialize = result; self.initializePeripheral(peripheralParams); })
            // .then((result: any) => {
            //         alert(JSON.stringify(result));
            //         advertiseResult.peripheral = result;
            //         self.addService(serviceParams);
            //     })
            //     .then((result: any) => { alert(JSON.stringify(result)); advertiseResult.peripherial = result; self.startAdvertising(advertisementParams); })
            //     .then((result:any) => {
            //         alert(JSON.stringify(result));
            //         advertiseResult.advertise = result;
            //         if( "advertisingStarted" === "advertisingStarted") {
            //             resolve(advertiseResult);
            //         } else {
            //             reject(advertiseResult);
            //         }
            //     })
            // ;
        });
    }
}
