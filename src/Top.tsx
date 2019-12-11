import * as React  from 'react';
import {Page, Button} from 'react-onsenui';
import {observer} from 'mobx-react';
import AppState, {libChina, libUSA} from './AppState';
import {bo, en, cn} from './LocalizedStrings';
import { Main } from './Main';
import './Top.pcss';

interface P_Top {
  appState:AppState;
}

@observer
export default class Top extends React.Component<P_Top> {

  render() {

    if(!this.props.appState.strings){
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{bo.pleaseSelectInterfaceLanguage}</h2>
              <h2>{en.pleaseSelectInterfaceLanguage}</h2>
              <h2>{cn.pleaseSelectInterfaceLanguage}</h2>

              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(bo);}}>{bo.tibetan}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(en);}}>{en.english}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setInterfaceLocalizationStrings(cn);}}>{cn.chinese}</Button>
            </div>
          </div>
        </Page>
      );
    } else if(!this.props.appState.libraryServer) {
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{this.props.appState.strings.pleaseSelectLocation}</h2>
              <p>{this.props.appState.strings.pleaseSelectLocationDescription}</p>

              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libChina);}}>{this.props.appState.strings.serverInChina}</Button>
              <Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libUSA);}}>{this.props.appState.strings.serverInUSA}</Button>

            </div>
          </div>
        </Page>
      );
    } else {
      return <Main db={this.props.appState.db} appState={this.props.appState} />;            
    }

  }

}





