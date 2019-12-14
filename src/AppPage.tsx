import * as React from 'react';
import {observer} from 'mobx-react';
import { Page } from 'react-onsenui';
import { SearchPage } from './SearchPage';
import { DetailPage } from './DetailPage';
import { AboutPage } from './AboutPage';
import { HelpPage } from './HelpPage';
import { SettingsPage } from './SettingsPage';
import {Route} from './TypeAliases';
import AppState, { searchRoute, detailRoute, aboutRoute, helpRoute, settingsRoute } from './AppState';
import { AppToolbar } from './AppToolbar';

export const AppPage = observer(( props:{route:Route, appState:AppState} ) => {
  let content:any = "";
  let pageTitle = "";
  let pageKey = '';

  if(props.route.page===searchRoute.page) {
    content = <SearchPage strings={props.appState.strings} db={props.appState.db} appState={props.appState} />;
    pageTitle = props.appState.strings.appName;
    pageKey='search';
  } else if(props.route.page===detailRoute.page)  {
    content = <DetailPage strings={props.appState.strings} db={props.appState.db} databaseResult={props.route.data.databaseResult} files={props.route.data.files} appState={props.appState}  />; 
    pageTitle = props.route.data.databaseResult.title;  
    // Account for compound nodeId that is brought in with the workPart Index files in order to provide both the 
    // filename of the workPart, and the node within the workPart that the title represents.
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
    <Page modifier="material" key={pageKey} renderToolbar={ () => <AppToolbar appState={props.appState} route={props.route} pageTitle={pageTitle} />} >
      {content}    
    </Page>
  );

});

