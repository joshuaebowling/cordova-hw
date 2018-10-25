/// <reference path="../ts/services/services.d.ts" />

const $ = require('jquery');
import * as bluetoothService from "js/services/bluetooth";
import React, {Component, PropTypes} from 'react'


var InitPeriparams: Params.initService = {
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


const 
(() => {
    var advertiseParams, app, getAdvertisingParams, initialize, isAdvertise, onErr, setAdvertisingParams, startAdvertise, stopAdvertise,
        $advertiseInfo
    ;
        //"services":["45745c60-7b1a-11e8-9c9c-2d42b21b1a3"], //iOS
    advertiseParams: Params.advertising = {
        "service":"45745c60-7b1a-11e8-9c9c",
        "name":"a"
    };
    
    onErr = (err) => {
        alert(JSON.stringify(err))
    };
    var periphParms: Params.peripheral = {
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

    startAdvertise = () => {
        bluetoothService.advertise(serviceParams, advertiseParams, periphParms)
            .then((results) => {

            });
    };
    stopAdvertise = () => {
        return new Promise((resolve, reject) => {
            bluetoothle.stopAdvertising(() => {
                resolve();
                alert('advertising stopped');
            });
        });
    };
    isAdvertise = () => {
        return new Promise((resolve, reject) => {
            bluetoothle.isAdvertising((result) => {
                try {
                    resolve(result);
                    onErr(result);    
                } catch {
                    reject();
                }
            });
        });
    };
    setAdvertisingParams = (val) => {
        advertiseParams = JSON.parse($advertiseInfo.val());
    };
    getAdvertisingParams = () => {
        return JSON.parse($advertiseInfo.val());
    };
    var app = {
        // Application Constructor
        initialize: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },

        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function() {
            this.receivedEvent('deviceready');
            $advertiseInfo = $('#advertising-info');
            $advertiseInfo.val(JSON.stringify(advertiseParams));
            $('#start-advertising').on('click',() => {
                startAdvertise();
            });
            $('#stop-advertising').on('click',() => {
                stopAdvertise();
            });
            $('#is-advertising').on('click', () => {
                isAdvertise()
                 .then((result) => {
                        alert(`is advertising = ${JSON.stringify(result)}`)
                    })
            });
            document.removeEventListener('deviceready', this.onDeviceReady.bind(this), false);

        },

        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

app.initialize();
})($);