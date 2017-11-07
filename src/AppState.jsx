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
import Database, {DatabaseResult} from './Database.js';
import type {Route} from './TypeAliases.js';
import {bo, en, cn} from './LocalizedStrings.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import './AppState.pcss';

export const searchRoute: Route = { page: 'Search', hasBackButton: false, isModal:false, data:{} };
export const detailRoute: Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{} };
export const aboutRoute: Route = { page: 'About', hasBackButton: false, isModal:true, data:{} };
export const helpRoute: Route = { page: 'Help', hasBackButton: false, isModal:true, data:{} };

export default class AppState {

  @observable infoPanelIsOpen:boolean;
  @observable momOpened:boolean;
  @observable strings:LocalizedStringsType;  
  @observable navigatorAnimation:string; 
  @observable currentQueryString:string;

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
    let route:Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{databaseResult:databaseResult}};
    this.pushPage(route, navigator);    
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
      content = <SearchPage strings={props.appState.strings} db={props.appState.db} navigateTo={(databaseResult:DatabaseResult)=>props.appState.navigateTo(databaseResult)} />;
      pageTitle = props.appState.strings.appName;
      pageKey='search';
    } else if(props.route.page===detailRoute.page)  {
      content = <DetailPage strings={props.appState.strings} appState={props.appState} db={props.appState.db} databaseResult={props.route.data.databaseResult} navigateTo={(databaseResult)=>props.appState.navigateTo(databaseResult)} />;
      pageTitle = props.route.data.databaseResult.title;  
      // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
      // filename of the outline, and the node within the outline that the title represents.
      let dashIndex = pageTitle.indexOf('-');
      if(dashIndex>0){ pageTitle = pageTitle.substring(dashIndex+1);}
      pageKey = props.route.data.key; 
    } else if(props.route.page===aboutRoute.page) {
      pageTitle = props.appState.strings.about;
      content = <AboutPage strings={props.appState.strings}  />;
      pageKey = 'about'; 
    } else if(props.route.page===helpRoute.page) {
      pageTitle = props.appState.strings.NeedHelpAskALibrarian;
      content = <HelpPage strings={props.appState.strings}  />;
      pageKey = 'help'; 
    }

    return (
      <Page strings={props.appState.strings} modifier="material" key={pageKey} renderToolbar={ () => { return props.appState.renderToolbar(props.route, pageTitle); }}>
        {content}    
      </Page>
    );
  }
);


