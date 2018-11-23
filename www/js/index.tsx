/// <reference path="../ts/services/services.d.ts" />
/// <reference path="../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
const $ = require('jquery');
import BluetoothService from "./services/bluetooth";
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';

var bluetoothService: any;
var peripheralParams: Params.initService = {
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

(() => {
    var advertisementParams:Params.advertising, app, getAdvertisingParams, initialize, isAdvertise, onErr, setAdvertisingParams, startAdvertise, stopAdvertise,
        $advertiseInfo
    ;
    advertisementParams = {
        "services":["1234"], //iOS
        "service":"1234",
        name:"my"
        mode: "balanced",
        connectable: true,
        timeout: 20000,
        powerLevel: "high",
        includeDeviceName: true
    };
    onErr = (err) => {
        alert(JSON.stringify(err))
    };
    var peripheralParams: Params.peripheral = {
        "request": true,
        "restoreKey" : "bluetoothlepluginPeripheral"
    };
    var serviceParams: Params.initService = {
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

    // startAdvertise = () => {
    //     bluetoothService.advertise({serviceParams, peripheralParams, advertisementParams})
    //     .then((r) => onErr(r))
    //     .catch(e => onErr(e))
    // };
    // stopAdvertise = () => {
    //     return new Promise((resolve, reject) => {
    //         bluetoothle.stopAdvertising(() => {
    //             resolve();
    //             alert('advertising stopped');
    //         }, () => {});
    //     });
    // };
    // isAdvertise = () => {
    //     return new Promise((resolve, reject) => {
    //         bluetoothle.isAdvertising((result) => {
    //             try {
    //                 resolve(result);
    //                 onErr(result);    
    //             } catch {
    //                 reject();
    //             }
    //         }, () => {});
    //     });
    // };
    // setAdvertisingParams = (val) => {
    //     advertisementParams = JSON.parse($advertiseInfo.val());
    // };
    // getAdvertisingParams = () => {
    //     return JSON.parse($advertiseInfo.val());
    // };
    var app: any = {
        // Application Constructor
        initialize: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },

        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function() {
            bluetoothService = new BluetoothService(bluetoothle);
            this.receivedEvent('deviceready');
            ReactDom.render(
                <App />,
                document.getElementById('wrapperContainer')
              )
              
            document.removeEventListener('deviceready', this.onDeviceReady.bind(this), false);

        },

        // Update DOM on a Received Event
        receivedEvent: function(id) {
            // var parentElement = document.getElementById(id);
            // var listeningElement = parentElement.querySelector('.listening');
            // var receivedElement = parentElement.querySelector('.received');

            // listeningElement.setAttribute('style', 'display:none;');
            // receivedElement.setAttribute('style', 'display:block;');

            // console.log('Received Event: ' + id);
        }
    };

app.initialize();
})();