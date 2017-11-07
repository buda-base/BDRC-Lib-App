// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Menu, MenuItem, MenuHeader, Divider} from './UIWidgets.jsx';
import AppState, {aboutRoute, helpRoute} from './AppState.jsx';
import type {LocalizedStringsType} from './LocalizedStrings.js';
import {en, bo, cn} from './LocalizedStrings.js';

@observer
export default class MOM extends Component {  

  props:{
    appState:AppState
  };

  toggleInfoPanel = () => {
    this.props.appState.momOpened = false;    
    this.props.appState.pushPage(aboutRoute);
  }

  toggleHelpPanel = () => {
    this.props.appState.momOpened = false;    
    this.props.appState.pushPage(helpRoute);
  }

  setInterfaceLocalizationStrings = (strings:LocalizedStringsType) => {
    this.props.appState.momOpened = false;
    this.props.appState.setInterfaceLocalizationStrings(strings); 
  }

  render() {
    if(this.props.appState.strings && this.props.appState.momOpened) {
      return (
        <div>
          <Menu open={this.props.appState.momOpened} onClose={()=>{this.props.appState.momOpened=false;}} >
            <MenuHeader>{this.props.appState.strings.interfaceLanguage}</MenuHeader>
            <MenuItem onClick={() => { this.setInterfaceLocalizationStrings(bo); }}><span>{this.props.appState.strings.id===bo.id ?<span><i className="zmdi zmdi-check"></i> </span>:null}{this.props.appState.strings.tibetan}</span></MenuItem>
            <MenuItem onClick={() => { this.setInterfaceLocalizationStrings(en); }}><span>{this.props.appState.strings.id===en.id ?<span><i className="zmdi zmdi-check"></i> </span>:null}{this.props.appState.strings.english}</span></MenuItem>
            <MenuItem onClick={() => { this.setInterfaceLocalizationStrings(cn); }}><span>{this.props.appState.strings.id===cn.id ?<span><i className="zmdi zmdi-check"></i> </span>:null}{this.props.appState.strings.chinese}</span></MenuItem>
            <Divider />
            <MenuItem onClick={this.toggleHelpPanel}>{this.props.appState.strings.Help}</MenuItem>
            <MenuItem onClick={this.toggleInfoPanel}>{this.props.appState.strings.about}</MenuItem>
          </Menu>
        </div>
        );
    } else {
      return null; 
    }  
  }
}