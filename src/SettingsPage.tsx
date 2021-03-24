import * as React from 'react';
import {observer} from 'mobx-react';
import {List, ListItem, Radio, ListHeader } from 'react-onsenui';
import AppState from './data/AppState';
import { en, bo, cn } from './data/LocalizedStrings';

import { computed } from 'mobx';
import './SettingsPage.pcss';
import {valueForLang} from "./data/interfaces/I_LangString";
import {I_MirrorSite, Mirrors} from "./data/interfaces/I_MirrorSite";
import * as ons from "onsenui";

interface P_SettingsPage {
  appState:AppState; 
}

@observer
export class SettingsPage extends React.Component<P_SettingsPage> {  
  handleSetMirror = (mirror:I_MirrorSite) => {
    if(this.props.appState.updater.currentMirror &&  mirror.id!=this.props.appState.updater.currentMirror.id) {
      const strings = this.props.appState.strings
      ons.notification.confirm(strings.changeMirrorConfirmation, {title:strings.PleaseConfirm, buttonLabels:[strings.Cancel, strings.Ok],
        callback:(idx:any)=>{
          console.log('callback',idx);
          if(idx===1) {
            this.props.appState.setLibraryMirror(mirror);
          }
        }
      });
    }
  }
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
          <MirrorOption label={strings.International} onSetMirror={this.handleSetMirror} currentMirror={this.props.appState.updater.currentMirror} mirror={Mirrors.International} lang={strings.id}  />
          <MirrorOption label={strings.China} onSetMirror={this.handleSetMirror} currentMirror={this.props.appState.updater.currentMirror} mirror={Mirrors.China} lang={strings.id}  />
        </List>

        {this.props.appState.updateAvailable && <UpdatesAvailable appState={this.props.appState} /> }

      </div>
    );
  }
}

@observer 
class UpdatesAvailable extends React.Component<{appState:AppState}> {

  handleUpdate = () => {
    this.props.appState.updater.runUpdate()
      .then(()=>{
        alert('update successful');
      })
      .catch((err)=>{
        console.log(err);
        alert('update failed '+JSON.stringify(err));
      });
  }

  @computed get description() {
    const latestLibraryMetaData = this.props.appState.updater.latestLibraryMetaData;
    if(latestLibraryMetaData) {
      return valueForLang(latestLibraryMetaData.releaseDescription, this.props.appState.strings.id);
    } else {
      return "library meta-data unavailable";
    }
  }
  
  render() {
    if(!this.props.appState.updateAvailable) {
      return null;
    } else {
      const latestLibraryMetaData = this.props.appState.updater.latestLibraryMetaData;
      return (
        <div className="updatesAvailable">
          <ListHeader modifier="material">{this.props.appState.strings.updateAvailable}</ListHeader>
          <p>{this.description}</p>
          <button onClick={this.handleUpdate} className="button button--material firstCardAction">{this.props.appState.strings.updateDatabaseButtonLabel}</button>

          <a className="viewChangeLog" href={latestLibraryMetaData?.changeLogUrl} target="_blank">{this.props.appState.strings.viewChangeLog}</a>
        </div>

      );

    }
  }
}




interface P_MirrorOption {
  onSetMirror:(mirror:I_MirrorSite)=>void;
  currentMirror:I_MirrorSite|undefined;
  mirror:I_MirrorSite;
  lang:string;
  isCustom?:boolean;
  label:string;
}
 
@observer
class MirrorOption extends React.Component<P_MirrorOption> {
  
  handleSetMirror = () => {
    this.props.onSetMirror(this.props.mirror);
  }

  @computed get checked() {
    return (this.props.currentMirror && this.props.currentMirror.id===this.props.mirror.id);
  }

  render() {
    return (
      <ListItem modifier="material" onClick={this.handleSetMirror}>
        <label className='left'>
          <i className={`radio zmdi ${this.checked?'zmdi-dot-circle selected':'zmdi-circle-o'}`} />
        </label>
        <label className={'center'} htmlFor={this.props.mirror.id}>{this.props.label}</label>
      </ListItem>
    );
  }
}


