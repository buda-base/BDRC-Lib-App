import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Database from './Database';
import AppState from './AppState';
import * as ons from 'onsenui';
import {Navigator} from 'react-onsenui';

interface P_Main {
  db:Database;
  appState:AppState;
}

@observer
export class Main extends React.Component<P_Main> {

  @observable statusMessage:string;
  @observable showStatusMessage:boolean;

  constructor(props:P_Main){
    super(props);
    this.statusMessage = props.appState.strings.InitializingDatabase;
    this.showStatusMessage = true; 
  }

  componentDidMount() {
    if(!this.props.db.isInitialized()) {
      ons.notification.alert(
        {
          title:this.props.appState.strings.Alert,
          buttonLabel:this.props.appState.strings.OK,
          message: this.props.appState.strings.Welcome,
          callback: () => {
            this.props.db.initialize(
              (success, error)=>{
                if(!success) {
                  ons.notification.alert(
                    { 
                      message: this.props.appState.strings.databaseInitFailed,
                      title:this.props.appState.strings.Alert,
                      buttonLabel:this.props.appState.strings.OK
                    }
                  );
                }
                setTimeout(this.hideStatusMessage, 2000);
              }, 
              this.handleStatusUpdate
            );
          }
        }
      );
    } else {
      setTimeout(this.hideStatusMessage, 1000);
    }
  }  

  handleStatusUpdate = (statusMessage:string) =>{
    this.statusMessage = statusMessage;
  }

  hideStatusMessage = () => {
    this.statusMessage = '';
    this.showStatusMessage = false;
  }

	render() {
		return (
      <div>
  			<Navigator 
  				modifier="material"
  				renderPage={this.props.appState.renderPage}
  				initialRoute={searchRoute}
  			/>
        <PleaseWait showStatusMessage={this.showStatusMessage} statusMessage={this.statusMessage} />
      </div>
		);
	}
}