import * as React from 'react';
import {observer} from 'mobx-react';
import {List, ListItem, Radio, ListHeader} from 'react-onsenui';
import AppState, { libUSA, libChina } from './AppState';
import { en, bo, cn } from './LocalizedStrings';

interface P_SettingsPage {
  appState:AppState; 
}

@observer
export class SettingsPage extends React.Component<P_SettingsPage> {
  render() {    
    let strings = this.props.appState.strings;
    return (
      <div className="settingsPageContent">

        <div style={{height:'20px'}}/>

        <List modifier="material">
          <ListHeader modifier="material">{this.props.appState.strings.interfaceLanguage}</ListHeader>
          <ListItem modifier="material"><label className='left'><Radio modifier="material" inputId="bo" onChange={()=>{this.props.appState.setInterfaceLocalizationStrings(bo);}} checked={strings.id===bo.id} /></label><label htmlFor="bo" className='center'>{strings.tibetan}</label></ListItem>
          <ListItem modifier="material"><label className='left'><Radio modifier="material" inputId="en" onChange={()=>{this.props.appState.setInterfaceLocalizationStrings(en);}} checked={strings.id===en.id} /></label><label htmlFor="en" className='center'>{strings.english}</label></ListItem>
          <ListItem modifier="material"><label className='left'><Radio modifier="material" inputId="cn" onChange={()=>{this.props.appState.setInterfaceLocalizationStrings(cn);}} checked={strings.id===cn.id} /></label><label htmlFor="cn" className='center'>{strings.chinese}</label></ListItem>
        </List>

        <List modifier="material">
          <ListHeader modifier="material">{this.props.appState.strings.location}</ListHeader>
          <ListItem modifier="material"><label className='left'><Radio modifier="material" inputId="china" onChange={()=>{this.props.appState.setLibraryServer(libChina);}} checked={this.props.appState.libraryServer.id===libChina.id} /></label><label htmlFor="china" className='center'>{strings.serverInChina}</label></ListItem>
          <ListItem modifier="material"><label className='left'><Radio modifier="material" inputId="usa" onChange={()=>{this.props.appState.setLibraryServer(libUSA);}} checked={this.props.appState.libraryServer.id===libUSA.id} /></label><label htmlFor="usa" className='center'>{strings.serverInUSA}</label></ListItem>
        </List>

      </div>
    );
  }
}