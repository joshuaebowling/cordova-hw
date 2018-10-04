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
        var parms = {
            "request": true,
            "restoreKey" : "bluetoothlepluginPeripheral"
        };
        var onErr = (err) => {
            alert(JSON.stringify(err))
        };

        bluetoothle.initializePeripheral((result) => {
            // var params = {
            //     service: "1234",
            //     characteristics: [
            //       {
            //         uuid: "ABCD",
            //         permissions: {
            //           read: true,
            //           write: true,
            //           //readEncryptionRequired: true,
            //           //writeEncryptionRequired: true,
            //         },
            //         properties : {
            //           read: true,
            //           writeWithoutResponse: true,
            //           write: true,
            //           notify: true,
            //           indicate: true,
            //           //authenticatedSignedWrites: true,
            //           //notifyEncryptionRequired: true,
            //           //indicateEncryptionRequired: true,
            //         }
            //       }
            //     ]
            //   };
                var params = {
                    "services":["45745c60-7b1a-11e8-9c9c-2d42b21b1a3"], //iOS
                    "service":"45745c60-7b1a-11e8-9c9c-2d42b21b1a3", //Android
                    "name":"Hello World",
                  };
                  bluetoothle.isAdvertising((res) => {alert(res)});
                  bluetoothle.startAdvertising(onErr, onErr, params);
        }, onErr, parms);
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