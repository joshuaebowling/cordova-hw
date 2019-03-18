import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';

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
        document.removeEventListener('deviceready', this.onDeviceReady.bind(this), false);
        window.React = React;
        ReactDom.render(<App />, document.getElementById("wrapperContainer"));	
        },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentEleComponentment.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




app.initialize();
