// @flow
declare var cordova: any;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navigator, Page, BackButton, Toolbar, ProgressCircular} from 'react-onsenui';
import ons from 'onsenui';
import uuidV1 from 'uuid/v1';


//import FileUtil from './FileUtil.js'

import Database, {DatabaseResult} from './Database.js';
import SearchPage from './SearchPage.jsx';
import DetailPage from './DetailPage.jsx';
import {en, bo} from './LocalizedStrings.js';
import type {Route} from './TypeAliases.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './Top.pcss';

const searchRoute: Route = { page: 'Search', hasBackButton: false, data:{} };
const detailRoute: Route = { page: 'Detail', hasBackButton: true, data:{} };




class Top extends Component {

  state:{
    statusMessage:string,
    showStatusMessage:boolean,
    strings:LocalizedStringsType,
    databaseResultStack:Array<DatabaseResult>;
  }

  constructor(props:{db:Database, initializeDatabase:boolean}){
    super(props);

    let strings = bo;

    this.state = {
      statusMessage:props.initializeDatabase?'Initializing Database':'',
      showStatusMessage:props.initializeDatabase,
      strings:strings,
      databaseResultStack:[]
    }
  }

  componentDidMount() {
    if(this.props.initializeDatabase) {
      this.props.db.initialize(
        (success, error)=>{
          if(!success) {
            ons.notification.alert({ message: 'Failed to initialize the database. Please quit the app and try again.'});
            console.log(error);
          }
          setTimeout(this.hideStatusMessage, 2000);
        }, 
        this.handleStatusUpdate 
      );    
    } 
  }  

  handleStatusUpdate = (statusMessage:string) =>{
    //console.log('handleStatusUpdate '+statusMessage);
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
    const backButton = route.hasBackButton ? <BackButton modifier="material" onClick={this.handleBack.bind(this, navigator)}>Back</BackButton> : null;

    return (
      <Toolbar modifier="material">
        <div className='left'>{backButton}</div>
        <div className='center'>{pageTitle}</div>
      </Toolbar>
    );
  }

  renderPage = (route:Route, navigator:Navigator) => {

  	let content = "";
  	let pageTitle = "";
    let pageKey = '';
  	if(route.page===searchRoute.page) {
  		content = <SearchPage strings={this.state.strings} db={this.props.db} navigateTo={(databaseResult:DatabaseResult)=>this.navigateTo(databaseResult, navigator)} />;
  		pageTitle = this.state.strings.appName;
      pageKey='search';
  	} else if(route.page===detailRoute.page)  {
  		content = <DetailPage strings={this.state.strings} db={this.props.db} databaseResult={route.data.databaseResult} navigateTo={(databaseResult)=>this.navigateTo(databaseResult, navigator)} />;
  		pageTitle = route.data.databaseResult.nodeId; //this.state.databaseResultStack[this.state.databaseResultStack.length].nodeId; //this.props.db.selectedDatabaseResult.nodeId;  		
      // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
      // filename of the outline, and the node within the outline that the title represents.
      let dashIndex = pageTitle.indexOf('-');
      if(dashIndex>0){ pageTitle = pageTitle.substring(dashIndex+1);}
      pageKey = route.data.key; 
    }
    return (
      <Page strings={this.state.strings} modifier="material" key={pageKey} renderToolbar={this.renderToolbar.bind(this, route, navigator, pageTitle)}>
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
        <PleaseWait showStatusMessage={this.state.showStatusMessage} statusMessage={this.state.statusMessage} />;
      </div>
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
