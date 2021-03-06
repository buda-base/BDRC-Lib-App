// @flow
declare var cordova: any;

import React from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import uuidV1 from 'uuid/v1';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Top from './Top.jsx';
import MOM from './MOM.jsx';
import AppState from './AppState.jsx';
import {SnackBar} from './UIWidgets.jsx';

const APP_VERSION = '1.1';

class app {
  appState:AppState;

  constructor() {
    this.appState = new AppState();
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady = () => {
    this.receivedEvent('deviceready');
  };

  /**
   * Meant to handle any event that needs to communicate with the UI
   * 
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  receivedEvent = (id) => {

    if(id==='deviceready') {

      // initialize language
      let language = localStorage.getItem('language');
      if(language && language.length>0) this.appState.setInterfaceLocalization(language);

      // initialize server location
      let location = localStorage.getItem('libraryServerId');
      if(location && location.length>0) this.appState.setLibraryServerFromString(location);

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

      // load the UI
      ons.ready(()=>{

        ReactDOM.render( <Top appState={this.appState} />, document.getElementById('AppContainer'));
        ReactDOM.render( <MOM appState={this.appState} />, document.getElementById('MOMContainer'));
        ReactDOM.render( <SnackBar appState={this.appState} />, document.getElementById('SnackBarContainer'));
        // Use this to pause execution and load the safari debugger 
        //if(confirm('ready?')){
	      // ReactDOM.render( <Top db={db}  />, document.getElementById('AppContainer'));
      	//}
      });
    }
  }
};





// Go!
new app();






