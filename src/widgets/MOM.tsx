import * as React from 'react';
import {observer} from 'mobx-react';
import {Menu, MenuItem} from './UIWidgets';
import AppState, {aboutRoute, helpRoute, settingsRoute} from '../data/AppState';

interface P_MOM {
  appState:AppState;
}

@observer
export class MOM extends React.Component<P_MOM> {  

  toggleInfoPanel = () => {
    this.props.appState.momOpened = false;    
    this.props.appState.pushPage(aboutRoute);
  }

  toggleSettingsPanel = () => {
    this.props.appState.momOpened = false;    
    this.props.appState.pushPage(settingsRoute);
  }

  toggleHelpPanel = () => {
    this.props.appState.momOpened = false;    
    this.props.appState.pushPage(helpRoute);
  }

  render() {
    if(this.props.appState.strings && this.props.appState.momOpened) {
      return (
        <div>
          <Menu open={this.props.appState.momOpened} onClose={()=>{this.props.appState.momOpened=false;}} >
            <MenuItem onClick={this.toggleSettingsPanel}>{this.props.appState.strings.settings}</MenuItem>
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