const $ = require('jquery');
import React from 'react';
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
(() => {
    console.log(React);
    var advertiseParams, app, getAdvertisingParams, initialize, isAdvertise, onErr, setAdvertisingParams, startAdvertise, stopAdvertise,
        $advertiseInfo
    ;
        //"services":["45745c60-7b1a-11e8-9c9c-2d42b21b1a3"], //iOS
    advertiseParams = {
        "service":"45745c60-7b1a-11e8-9c9c",
        "name":"a"
    };
    
    onErr = (err) => {
        alert(JSON.stringify(err))
    };

    initialize = () => {
        var parms = {
            "request": true,
            "restoreKey" : "bluetoothlepluginPeripheral"
        };
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
    };
    startAdvertise = () => {
        return new Promise((resolve, reject) => {
            initialize().then(() => {
                stopAdvertise().then(() => {
                    bluetoothle.startAdvertising(d => { 
                        resolve();
                        alert('advertising started');
                    }, d => { alert('advertising failed'); onErr(d); reject(); }, getAdvertisingParams());
                });
            });
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