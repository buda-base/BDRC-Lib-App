// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx';
import uuidV1 from 'uuid/v1';
import {Navigator, Page, BackButton, Toolbar, ProgressCircular, Modal, ToolbarButton, Icon, Button, AlertDialog, List, ListItem, ListHeader} from 'react-onsenui';

import SearchPage from './SearchPage.jsx';
import DetailPage from './DetailPage.jsx';
import AboutPage from './AboutPage.jsx';
import HelpPage from './HelpPage.jsx';
import SettingsPage from './SettingsPage.jsx';
import Database, {DatabaseResult} from './Database.js';
import { Work, Outline, Person } from './Records.js';
import type {Route} from './TypeAliases.js';
import {bo, en, cn} from './LocalizedStrings.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import './AppState.pcss';

export const searchRoute: Route = { page: 'Search', hasBackButton: false, isModal:false, data:{} };
export const detailRoute: Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{} };
export const aboutRoute: Route = { page: 'About', hasBackButton: false, isModal:true, data:{} };
export const helpRoute: Route = { page: 'Help', hasBackButton: false, isModal:true, data:{} };
export const settingsRoute: Route = { page: 'Settings', hasBackButton: false, isModal:true, data:{} };

export type LibraryServer = {
  id:string;
  name:string;
  url:string;
}

export const libUSA:LibraryServer = {    
  id:'USA',
  name:'USA',
  url:'https://www.tbrc.org'
}

export const libChina:LibraryServer = {    
  id:'China',
  name:'China',
  url:'http://www.bdrc.info'
}

export default class AppState {

  @observable libraryServer:LibraryServer;  
  @observable strings:LocalizedStringsType; 

  @observable infoPanelIsOpen:boolean;
  @observable momOpened:boolean;
  @observable navigatorAnimation:string; 

  @observable searchStringIsValid:boolean;
  @observable currentQueryString:string;
  @observable searchCount:number = 0;

  @observable snackBarMessage:string;
  @observable closeSnackBarDate:number;
  @observable snackBarOpen:boolean;

  db:Database;
  navigator:Navigator;
  databaseResultStack:Array<DatabaseResult> = [];

  @action openSnackBar = (message:string) => {
    this.snackBarMessage = message;
    this.closeSnackBarDate = Date.now() + 2500;
    this.snackBarOpen = true;
  }

  @action 
  setInterfaceLocalization = (id:string) => {
    if(id) {
      if(id===en.id) {
        this.setInterfaceLocalizationStrings(en);
      } else if(id===cn.id) {
       this.setInterfaceLocalizationStrings(cn);
      } else {       
        this.setInterfaceLocalizationStrings(bo);
      }
    } else {
      this.setInterfaceLocalizationStrings(bo);
    }
  }

  @action 
  setLibraryServerFromString = (libraryServerId:string) => {
    if(libraryServerId===libUSA.id) this.setLibraryServer(libUSA);
    else if(libraryServerId===libChina.id) this.setLibraryServer(libChina);
  }

  @action
  setLibraryServer = (libraryServer:LibraryServer) => {
    localStorage.setItem('libraryServerId', libraryServer.id);
    this.libraryServer = libraryServer;
  }

  @action
  setInterfaceLocalizationStrings = (strings:LocalizedStringsType) => {

    localStorage.setItem('language', strings.id);

    this.strings = strings;
    this.momOpened = false;
    this.infoPanelIsOpen = false;

    if(!this.db){
      this.db = new Database(this.strings, ()=>{ }, this);
    }
  }

  @action
  openMOM = () => {
    this.momOpened = true;
  }

  @action
  renderToolbar = (route:Route, pageTitle:string) => {
    return <AppToolbar appState={this} route={route} pageTitle={pageTitle} />; 
  }

  @action
  renderPage = (route:Route, navigator:Navigator) => {
    this.navigator = navigator;
    return <AppPage appState={this} route={route} />; // navigator={navigator} />; 
  }

  @action
  pushPage = (route:Route) => {
    let animation = route.isModal ? 'lift-md' : 'slide-md' ;
    let data = route.data;
    data.key = uuidV1();
    this.navigator.pushPage({
      page: route.page,
      hasBackButton: route.hasBackButton,
      isModal:route.isModal,
      data:data
    }, {animation:animation});
  }

  @action
  handleBack = () => {
    this.navigator.popPage();
    this.databaseResultStack.pop();
  }
  
  @action
  handleClose = () => {
    this.navigator.popPage();
  }
  
  @action
  navigateTo = (databaseResult:DatabaseResult, navigator:Navigator) => {

    let work:Work|null = null;
    let person:Person|null = null;
    let outline:Outline|null = null;

    // Load the file before the page transition to prevent jerky animation
    databaseResult.load((record:any) => {
      if(databaseResult.isWork){
        work = record;
      } else if(databaseResult.isPerson){
        person = record;
      } else if(databaseResult.isOutline){
        outline = record;
      }      

      // NOTE: If performance is jerky do to loading related records, either through a database search, or through a file load, 
      // that work should be done here and passed through the "data" object

      let route:Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{ databaseResult:databaseResult, files:{ work:work, person:person, outline:outline }, relatedDatabaseResults:{}}};
      this.pushPage(route, navigator);    
    });

  }

  constructor() {
    let libraryServerId = localStorage.getItem('libraryServerId');
    if(libraryServerId) {
      if(libUSA.id == libraryServerId) {
        this.setLibraryServer(libUSA);
      } else if(libChina.id == libraryServerId) {
        this.setLibraryServer(libChina);
      }
    }
  }

}


const AppToolbar = observer(( props:{route:Route, appState:AppState, pageTitle:string} ) => {
    let leftButton = null;
    let rightButton = null;
    let toolbarClassName = '';

    if(props.route.isModal) {
      rightButton = <ToolbarButton modifier="material" onClick={()=>{ props.appState.handleClose(); }}><i className="zmdi zmdi-close"></i></ToolbarButton>;
      toolbarClassName = 'tbmodal';
    } else {
      leftButton = props.route.hasBackButton ? <BackButton modifier="material" onClick={()=>{ props.appState.handleBack(); }}></BackButton> : null;
      rightButton = <ToolbarButton modifier="material" onClick={()=>{props.appState.openMOM(); }}><i className="zmdi zmdi-more-vert"></i></ToolbarButton>
    }

    return (
      <Toolbar modifier="material" className={toolbarClassName}>
        <div className='left'>{leftButton}</div>
        <div className='center'>{props.pageTitle}</div>
        <div className='right'>{rightButton}</div>
      </Toolbar>
    );
  }
);



const AppPage = observer(( props:{route:Route, appState:AppState} ) => {
    let content = "";
    let pageTitle = "";
    let pageKey = '';

    if(props.route.page===searchRoute.page) {
      content = <SearchPage strings={props.appState.strings} db={props.appState.db} appState={props.appState} />;
      pageTitle = props.appState.strings.appName;
      pageKey='search';
    } else if(props.route.page===detailRoute.page)  {
      content = <DetailPage strings={props.appState.strings} db={props.appState.db} databaseResult={props.route.data.databaseResult} files={props.route.data.files} appState={props.appState}  />; 
      pageTitle = props.route.data.databaseResult.title;  
      // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
      // filename of the outline, and the node within the outline that the title represents.
      let dashIndex = pageTitle.indexOf('-');
      if(dashIndex>0){ pageTitle = pageTitle.substring(dashIndex+1);}
      pageKey = props.route.data.key; 
    } else if(props.route.page===aboutRoute.page) {
      pageTitle = props.appState.strings.about;
      content = <AboutPage appState={props.appState} />;
      pageKey = 'about'; 
    } else if(props.route.page===helpRoute.page) {
      pageTitle = props.appState.strings.NeedHelpAskALibrarian;
      content = <HelpPage strings={props.appState.strings}  />;
      pageKey = 'help'; 
    } else if(props.route.page===settingsRoute.page) {
      pageTitle = props.appState.strings.settings;
      content = <SettingsPage appState={props.appState} />; 
      pageKey = 'settings'; 
    }

    return (
      <Page strings={props.appState.strings} modifier="material" key={pageKey} renderToolbar={ () => { return props.appState.renderToolbar(props.route, pageTitle); }}>
        {content}    
      </Page>
    );
  }
);


