// @flow
declare var cordova: any;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navigator, Page, BackButton, Toolbar, ProgressCircular, Modal, ToolbarButton, Icon, Button, AlertDialog} from 'react-onsenui';
import ons from 'onsenui';
import uuidV1 from 'uuid/v1';

import Database, {DatabaseResult} from './Database.js';
import SearchPage from './SearchPage.jsx';
import DetailPage from './DetailPage.jsx';
import type {Route} from './TypeAliases.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './Top.pcss';

const searchRoute: Route = { page: 'Search', hasBackButton: false, data:{} };
const detailRoute: Route = { page: 'Detail', hasBackButton: true, data:{} };


class Top extends Component {

  state:{
    statusMessage:string,
    showStatusMessage:boolean,
    databaseResultStack:Array<DatabaseResult>,
    infoPanelIsOpen:boolean
  }

  constructor(props:{db:Database, strings:LocalizedStringsType}){
    super(props);

    this.state = {
      statusMessage:props.strings.InitializingDatabase,
      showStatusMessage:true,
      databaseResultStack:[],
      infoPanelIsOpen:false
    }
  }

  componentDidMount() {
    if(!this.props.db.isInitialized()) {
      ons.notification.alert(
        {
          title:this.props.strings.Alert,
          buttonLabel:this.props.strings.OK,
          message: this.props.strings.Welcome,
          callback: () => {
            this.props.db.initialize((success, error)=>{
                if(!success) {
                  ons.notification.alert(
                    { 
                      message: this.props.strings.databaseInitFailed,
                      title:this.props.strings.Alert,
                      buttonLabel:this.props.strings.OK
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
    this.setState({statusMessage:statusMessage});
  }

  hideStatusMessage = () => {
    this.setState({statusMessage:'', showStatusMessage:false});    
  }

  pushPage(route:Route, navigator:Navigator){
    let data = route.data;
    data.key = uuidV1();
    navigator.pushPage({
      page: route.page,
      hasBackButton: route.hasBackButton,
      data:data
    });
  }

  handleBack(navigator:Navigator){
    navigator.popPage();
    let state = this.state;
    state.databaseResultStack.pop();
    this.setState(state);
  }

  navigateTo = (databaseResult:DatabaseResult, navigator:Navigator) => {
    let route:Route = { page: 'Detail', hasBackButton: true, data:{databaseResult:databaseResult}};
    this.pushPage(route, navigator);    
  }

  renderToolbar(route:Route, navigator:Navigator, pageTitle:string) {
    const backButton = route.hasBackButton ? <BackButton modifier="material" onClick={this.handleBack.bind(this, navigator)}>{this.props.strings.BACK}</BackButton> : null;

    return (
      <Toolbar modifier="material">
        <div className='left'>{backButton}</div>
        <div className='center'>{pageTitle}</div>
        <div className='right'>
          <ToolbarButton modifier="material" onClick={()=>{this.toggleInfoPanel(navigator);}}>
            <Icon modifier="material" icon='ion-info, material:md-info'></Icon>
          </ToolbarButton>
        </div>

      </Toolbar>
    );
  }

  toggleInfoPanel = (navigator:Navigator) =>{
    this.setState({infoPanelIsOpen:!this.state.infoPanelIsOpen});
  }

  closeInfoPanel = () =>{
    this.setState({infoPanelIsOpen:false});
  }

  renderPage = (route:Route, navigator:Navigator) => {

  	let content = "";
  	let pageTitle = "";
    let pageKey = '';
  	if(route.page===searchRoute.page) {
  		content = <SearchPage strings={this.props.strings} db={this.props.db} navigateTo={(databaseResult:DatabaseResult)=>this.navigateTo(databaseResult, navigator)} />;
  		pageTitle = this.props.strings.appName;
      pageKey='search';
  	} else if(route.page===detailRoute.page)  {
  		content = <DetailPage strings={this.props.strings} db={this.props.db} databaseResult={route.data.databaseResult} navigateTo={(databaseResult)=>this.navigateTo(databaseResult, navigator)} />;
      pageTitle = route.data.databaseResult.title;  
      // pageTitle = route.data.databaseResult.nodeId;		

      // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
      // filename of the outline, and the node within the outline that the title represents.
      let dashIndex = pageTitle.indexOf('-');
      if(dashIndex>0){ pageTitle = pageTitle.substring(dashIndex+1);}
      pageKey = route.data.key; 
    }
    return (
      <Page strings={this.props.strings} modifier="material" key={pageKey} renderToolbar={this.renderToolbar.bind(this, route, navigator, pageTitle)}>
        {content}        
      </Page>
    );
  }

	render() {
		return (
      <div>
  			<Navigator 
  				modifier="material"
  				renderPage={this.renderPage}
  				initialRoute={searchRoute}
  			/>
        <InfoPanel strings={this.props.strings} isOpen={this.state.infoPanelIsOpen} closeInfoPanel={this.closeInfoPanel} />
        <PleaseWait showStatusMessage={this.state.showStatusMessage} statusMessage={this.state.statusMessage} />;
      </div>
		);
	}
}

class InfoPanel extends Component {
  props:{
    isOpen:boolean,
    closeInfoPanel:()=>void,
    strings: LocalizedStringsType
  };
  render(){
    return (
      <Modal isOpen={this.props.isOpen} style={{backgroundColor:'white', color:'black'}} modifier="material">
        <div style={{fontWeight:'bold'}}>{this.props.strings.appName}</div>
        <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>
        <div style={{color:'black'}}>{this.props.strings.BuddhistDigitalResourceCenter}</div>
        <div><a href="https://www.tbrc.org">www.tbrc.org</a></div>
        <div style={{marginTop: '15px', marginBottom:'30px'}}><Button modifier="material" onClick={this.props.closeInfoPanel}>{this.props.strings.OK}</Button></div>
      </Modal>
    );
  }  
}


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



export {Top, detailRoute};
