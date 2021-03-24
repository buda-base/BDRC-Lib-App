import * as React  from 'react';
import * as ons from 'onsenui';

import {Page, Button} from 'react-onsenui';
import {observer} from 'mobx-react';
import AppState from './data/AppState';
import {bo, en, cn} from './data/LocalizedStrings';
import { Main } from './Main';
import './Top.pcss';
import {valueForLang} from "./data/interfaces/I_LangString";
import {Mirrors} from "./data/interfaces/I_MirrorSite";

interface P_Top {
  appState:AppState;
}

@observer
export class Top extends React.Component<P_Top> {

  constructor(props:P_Top) {
    super(props);
    if(ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }

  render() {
    // SETUP: Step 1, language
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
    }
    // SETUP: Step 2, Select Mirror
    else if(this.props.appState.updater.noMirrorSelected) {
      return (
        <Page modifier="material">
          <div className="selectLanguage">
            <div>
              <div><img src="img/bdrc_logo.png" style={{width:'100px'}}/></div>

              <h2>{this.props.appState.strings.pleaseSelectLocation}</h2>
              <p>{this.props.appState.strings.pleaseSelectLocationDescription}</p>

              {this.props.appState.updater.mirrors.map((mirror)=> {
                if (mirror.id === Mirrors.Custom.id) {
                  return null;
                } else {
                  return (
                    <Button
                      key={mirror.id}
                      style={{margin: '6px'}}
                      modifier='material'
                      onClick={() => {
                        this.props.appState.setLibraryMirror(mirror);
                      }}
                    >
                      {valueForLang(mirror.name, this.props.appState.strings.id)}
                    </Button>
                  );
                }
              })}

              {/*<Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libChina);}}>{this.props.appState.strings.serverInChina}</Button>*/}
              {/*<Button style={{margin: '6px'}} modifier='material' onClick={()=>{this.props.appState.setLibraryServer(libUSA);}}>{this.props.appState.strings.serverInUSA}</Button>*/}

            </div>
          </div>
        </Page>
      );
    }
    // SETUP IS COMPLETE
    else {
      return <Main db={this.props.appState.db} appState={this.props.appState} />;            
    }

  }

}





