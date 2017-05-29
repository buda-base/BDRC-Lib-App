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
import type {Route} from './TypeAliases.js';

import styles from './Top.pcss';

const searchRoute: Route = { title: 'Search', hasBackButton: false };
const detailRoute: Route = { title: 'Detail', hasBackButton: true };


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

class Top extends Component {

  state:{
    statusMessage:string,
    showStatusMessage:boolean
  }

  constructor(props:{db:Database, initializeDatabase:boolean}){
    super(props);
    this.state = {
      statusMessage:props.initializeDatabase?'Initializing Database':'',
      showStatusMessage:props.initializeDatabase
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
    //console.log('hideStatusMessage');
    this.setState({statusMessage:'', showStatusMessage:false});    
  }

  pushPage(route:Route, navigator:Navigator){
  	// console.log('pushPage');
  	// console.log(route);
    navigator.pushPage({
      title: route.title,
      hasBackButton: route.hasBackButton
    });
  }

  handleBack(navigator:Navigator){
  	navigator.popPage();
    // ons.notification.confirm('Do you really want to go back?')
    //   .then((response) => {
    //     if (response === 1) {
    //       navigator.popPage();
    //     }
    //   });
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
  	//console.log("renderPage");
  	//console.log(route);
  	if(route.title===searchRoute.title) {
  		content = <SearchPage db={this.props.db} navigateTo={(route)=>this.pushPage(route, navigator)} />;
  		pageTitle = "BDRC Lib 0.1";
  	} else if(route.title===detailRoute.title)  {
  		content = <DetailPage databaseResult={this.props.db.selectedDatabaseResult} />;
  		pageTitle = this.props.db.selectedDatabaseResult.nodeId;  		
    }
    return (
      <Page modifier="material" key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator, pageTitle)}>
        {content}
      </Page>
    );
  }

	render() {
		//console.log('render');
		// let initialContent = <SearchPage db={this.props.db} />
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



export {Top, detailRoute};
