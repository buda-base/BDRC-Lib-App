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

  render() {

    if(!this.props.appState.strings){
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{bo.pleaseSelectInterfaceLanguage}</h2>
              <h2>{en.pleaseSelectInterfaceLanguage}</h2>
              <h2>{cn.pleaseSelectInterfaceLanguage}</h2>

              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(bo);}}>{bo.tibetan}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(en);}}>{en.english}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(cn);}}>{cn.chinese}</Button>
            </div>
          </div>
        </Page>
      );
    } else if(!this.props.appState.libraryServer) {
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{this.props.appState.strings.pleaseSelectLocation}</h2>
              <p>{this.props.appState.strings.pleaseSelectLocationDescription}</p>

              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libChina);}}>{this.props.appState.strings.serverInChina}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libUSA);}}>{this.props.appState.strings.serverInUSA}</Button>

            </div>
          </div>
        </Page>
      );
    } else {
      return <Main db={this.props.appState.db} appState={this.props.appState} />;            
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

