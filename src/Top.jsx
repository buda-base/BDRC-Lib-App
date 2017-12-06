// @flow
declare var cordova: any;
declare var document: any;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ons from 'onsenui';
import {Navigator, Page, BackButton, Toolbar, ProgressCircular, Modal, ToolbarButton, Icon, Button, AlertDialog, List, ListItem, ListHeader} from 'react-onsenui';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import Database from './Database.js';
import AppState, {searchRoute, libChina, libUSA} from './AppState.jsx';
import type {LocalizedStringsType} from './LocalizedStrings.js';
import {bo, en, cn} from './LocalizedStrings.js';


import styles from './Top.pcss';

@observer
export default class Top extends Component {

  onLocalizedStringsSelection = (id:?string) => {
    if(id) {
      let strings:LocalizedStringsType|null = null;

      if(id===en.id) {
        strings = en;
        this.props.appState.setLibraryServer(libUSA);
      } else if(id===cn.id) {
        strings = cn;
        this.props.appState.setLibraryServer(libChina);
      } else {       
        strings = bo;
        this.props.appState.setLibraryServer(libChina);
      }

      if(null!=strings) {
        this.props.appState.setInterfaceLocalizationStrings(strings);
      }
    }
  }

  render() {
    if(this.props.appState.strings) {
      return <Main db={this.props.appState.db} appState={this.props.appState} />;
    } else {
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{bo.pleaseSelectInterfaceLanguage}</h2>
              <h2>{en.pleaseSelectInterfaceLanguage}</h2>
              <h2>{cn.pleaseSelectInterfaceLanguage}</h2>

              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.onLocalizedStringsSelection(bo.id);}}>{bo.tibetan}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.onLocalizedStringsSelection(en.id);}}>{en.english}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.onLocalizedStringsSelection(cn.id);}}>{cn.chinese}</Button>
            </div>
          </div>
        </Page>
      );
    }
  }
}


@observer
class Main extends Component {

  @observable statusMessage:string;
  @observable showStatusMessage:boolean;

  constructor(props:{db:Database, appState:AppState}){
    super(props);

    this.statusMessage = props.appState.strings.InitializingDatabase;
    this.showStatusMessage = true; 
  }

  componentDidMount() {
    if(!this.props.db.isInitialized()) {
      ons.notification.alert(
        {
          title:this.props.appState.strings.Alert,
          buttonLabel:this.props.appState.strings.OK,
          message: this.props.appState.strings.Welcome,
          callback: () => {
            this.props.db.initialize(
              (success, error)=>{
                if(!success) {
                  ons.notification.alert(
                    { 
                      message: this.props.appState.strings.databaseInitFailed,
                      title:this.props.appState.strings.Alert,
                      buttonLabel:this.props.appState.strings.OK
                    }
                  );
                }
                setTimeout(this.hideStatusMessage, 2000);
              }, 
              this.handleStatusUpdate
            );
          }
        }
      );
    } else {
      setTimeout(this.hideStatusMessage, 1000);
    }
  }  

  handleStatusUpdate = (statusMessage:string) =>{
    this.statusMessage = statusMessage;
  }

  hideStatusMessage = () => {
    this.statusMessage = '';
    this.showStatusMessage = false;
  }

	render() {
		return (
      <div>
  			<Navigator 
  				modifier="material"
  				renderPage={this.props.appState.renderPage}
  				initialRoute={searchRoute}
  			/>
        <PleaseWait showStatusMessage={this.showStatusMessage} statusMessage={this.statusMessage} />
      </div>
		);
	}
}


@observer
class PleaseWait extends Component {
  props:{
    statusMessage:string,
    showStatusMessage:boolean
  }
  render(){
    let pleaseWaitClass = this.props.showStatusMessage?'show':'';    
    return (
      <div id="PleaseWait" className={pleaseWaitClass}>
        <ProgressCircular indeterminate />
        <p>{this.props.statusMessage}</p>
      </div>    
    );
  }
}

