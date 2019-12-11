import * as React from 'react';
import {observer} from 'mobx-react';
import {BackButton, Toolbar, ToolbarButton } from 'react-onsenui';
import {Route} from './TypeAliases';
import AppState from './AppState';

import './AppToolbar.pcss';

export const AppToolbar = observer(( props:{route:Route, appState:AppState, pageTitle:string} ) => {
    let leftButton = null;
    let rightButton = null;
    let toolbarClassName = '';

    if(props.route.isModal) {
      rightButton = <ToolbarButton modifier="material" onClick={()=>{ props.appState.handleClose(); }}><i className="zmdi zmdi-close"></i></ToolbarButton>;
      toolbarClassName = 'tbmodal';
    } else {
      leftButton = props.route.hasBackButton ? <BackButton modifier="material" onClick={()=>{ props.appState.handleBack(); }}></BackButton> : null;
      rightButton = (
        <span>
          {props.appState.hasUpdates ? <ToolbarButton modifier="material" onClick={()=>{props.appState.openMOM(); }}><i className="zmdi zmdi-notifications hasUpdates"></i></ToolbarButton> : null}
          <ToolbarButton modifier="material" onClick={()=>{props.appState.openMOM(); }}><i className="zmdi zmdi-more-vert"></i></ToolbarButton>
        </span>
        );
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


