// @flow
declare var cordova: any;

import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {Top} from './Top.jsx';
import Database from './Database.js';

var db:Database;

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
      // open the database
		  db = new Database(()=>{ console.log('database opened/created'); });


      // load the UI
      ons.ready(()=>{
      	if(true || confirm('ready?')){
	        ReactDOM.render( <Top db={db} initializeDatabase={true} />, document.getElementById('AppContainer'));
      	}
      });
    }
  }

};


app.initialize();





