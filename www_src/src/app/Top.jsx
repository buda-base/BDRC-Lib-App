// @flow
declare var cordova: any;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Navigator, Page, BackButton, Toolbar, ProgressCircular} from 'react-onsenui';
import ons from 'onsenui';

//import FileUtil from './FileUtil.js'

import Database from './Database.js';
import SearchPage from './SearchPage.jsx';
import DetailPage from './DetailPage.jsx';
import {en, bo} from './LocalizedStrings.js';
import type {Route} from './TypeAliases.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './Top.pcss';

const searchRoute: Route = { title: 'Search', hasBackButton: false };
const detailRoute: Route = { title: 'Detail', hasBackButton: true };




class Top extends Component {

  state:{
    statusMessage:string,
    showStatusMessage:boolean,
    strings:LocalizedStringsType
  }

  constructor(props:{db:Database, initializeDatabase:boolean}){
    super(props);

    let strings = bo;

    this.state = {
      statusMessage:props.initializeDatabase?'Initializing Database':'',
      showStatusMessage:props.initializeDatabase,
      strings:strings
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
    navigator.pushPage({
      title: route.title,
      hasBackButton: route.hasBackButton
    });
  }

  handleBack(navigator:Navigator){
  	navigator.popPage();
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
  	if(route.title===searchRoute.title) {
  		content = <SearchPage strings={this.state.strings} db={this.props.db} navigateTo={(route)=>this.pushPage(route, navigator)} />;
  		pageTitle = this.state.strings.appName;
  	} else if(route.title===detailRoute.title)  {
  		content = <DetailPage strings={this.state.strings} databaseResult={this.props.db.selectedDatabaseResult} />;
  		pageTitle = this.props.db.selectedDatabaseResult.nodeId;  		
      // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
      // filename of the outline, and the node within the outline that the title represents.
      let dashIndex = pageTitle.indexOf('-');
      if(dashIndex>0){ pageTitle = pageTitle.substring(dashIndex+1);}
    }
    return (
      <Page strings={this.state.strings} modifier="material" key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator, pageTitle)}>
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
