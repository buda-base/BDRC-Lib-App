import * as React from 'react';
import {observer} from 'mobx-react';
import {BackButton, Toolbar, ToolbarButton } from 'react-onsenui';
import AppState, { settingsRoute } from '../data/AppState';

import './AppToolbar.pcss';
import {Route} from "../data/interfaces/Route";

export const AppToolbar = observer(( props:{route:Route, appState:AppState, pageTitle:string} ) => {
    let leftButton = null;
    let rightButton = null;
    let toolbarClassName = '';
    const homeScreen = props.appState.strings.appName==props.pageTitle;

    if(props.route.isModal) {
      rightButton = <ToolbarButton modifier="material" onClick={()=>{ props.appState.handleClose(); }}><i className="zmdi zmdi-close"></i></ToolbarButton>;
      toolbarClassName = 'tbmodal';
    } else {
      //leftButton = props.route.hasBackButton ? <BackButton modifier="material" onClick={()=>{ props.appState.handleBack(); }} style={{color:'#333'}}></BackButton> : null;
      leftButton = props.route.hasBackButton ? <ToolbarButton modifier="material" onClick={()=>{ props.appState.handleBack(); }}><i className="zmdi zmdi-arrow-left"></i></ToolbarButton> : null;
      rightButton = (
        <span>
          {homeScreen && props.appState.updateAvailable ? <ToolbarButton modifier="material" onClick={()=>{ props.appState.pushPage(settingsRoute); }}><i className="zmdi zmdi-notifications hasUpdates"></i></ToolbarButton> : null}
          <ToolbarButton modifier="material" onClick={()=>{props.appState.openMOM(); }}><i className="zmdi zmdi-more-vert"></i></ToolbarButton>
        </span>
        );
    }
    return (
      <Toolbar modifier="material" className={toolbarClassName}>
        <div className='left'>{leftButton}</div>
        <div className='center'>{homeScreen && <img src="img/bdrc_logo_transparent.png" />}{props.pageTitle}</div>
        <div className='right'>{rightButton}</div>
      </Toolbar>
    );
  }
);


