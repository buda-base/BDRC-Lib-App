// @flow
declare var cordova: any;

import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import uuidV1 from 'uuid/v1';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {Top} from './Top.jsx';
import Database from './Database.js';
import {en, bo} from './LocalizedStrings.js';

var db:Database;
var APP_VERSION = '0.9';
let strings = en;

var app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  /**
   * Meant to handle any event that needs to communicate with the UI
   * 
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  receivedEvent: function(id) {

    if(id==='deviceready') {

      // https://github.com/danwilson/google-analytics-plugin
      //turn on google tracking
      window.ga.startTrackerWithId('UA-100374893-1', 30)

      // get, and or create a userId
      let userId = localStorage.getItem('UserUUID');
      if(!userId) {
        userId = uuidV1();
        localStorage.setItem('UserUUID', userId);
      }
      window.ga.setUserId(userId);
      window.ga.setAppVersion(APP_VERSION);
      //window.ga.debugMode();      

      // open the database
		  db = new Database(strings, ()=>{ });

      // load the UI
      ons.ready(()=>{
      	ReactDOM.render( <Top db={db} strings={strings} />, document.getElementById('AppContainer'));
        // Use this to pause execution and load the safari debugger 
        //if(confirm('ready?')){
	      // ReactDOM.render( <Top db={db}  />, document.getElementById('AppContainer'));
      	//}
      });
    }
  }

};


app.initialize();





