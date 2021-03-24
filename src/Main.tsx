import * as React from 'react';
import { observer } from 'mobx-react';
import Database from './data/Database';
import AppState, { searchRoute } from './data/AppState';
import {Navigator} from 'react-onsenui';
import { PleaseWait } from './widgets/PleaseWait';
import { AppPage } from './AppPage';
import {Route} from "./data/interfaces/Route";

interface P_Main {
  db:Database;
  appState:AppState;
}

@observer
export class Main extends React.Component<P_Main> {

  constructor(props:P_Main){
    super(props);
    props.appState.statusMessage = '';
    props.appState.showStatusMessage = false;
  }

	render() {
		return (
      <div>
  			<Navigator 
  				renderPage={(route:Route, navigator:Navigator) => {
            this.props.appState.navigator = navigator;
            return <AppPage appState={this.props.appState} route={route} />;
          }}
  				initialRoute={searchRoute}

  			/>
        <PleaseWait showStatusMessage={this.props.appState.showStatusMessage} statusMessage={this.props.appState.statusMessage} />
      </div>
		);
	}
}
