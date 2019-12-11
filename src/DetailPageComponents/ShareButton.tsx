declare var device: any;
declare var window: any;

import * as React from 'react';
import {observer} from 'mobx-react';
import {ILocalizedStrings} from '../LocalizedStrings';


interface P_ShareButton {
  subject:string;
  url:string;
  strings:ILocalizedStrings;
  nodeId:string;
}

@observer
export class ShareButton extends React.Component<P_ShareButton> {

  share = () =>{
    let options = {
      subject: this.props.subject,
      url:this.props.url      
    };
    window.plugins.socialsharing.shareWithOptions(
      options, 
      (success:any)=>{
        window.ga.trackEvent('DetailPage', 'Share', this.props.nodeId);
      }, 
      (error:any)=>{
        console.log(error);

      }
    );
  }

  shareViaEmail = () => {
    let href = 'mailto:?subject='+encodeURIComponent(this.props.subject)+'&body='+encodeURIComponent(this.props.url);
    window.ga.trackEvent('DetailPage', 'Share', this.props.nodeId);
    window.location=href;
  }

  render(){
    if('browser'===device.platform){
      // let href = 'mailto:?subject='+encodeURIComponent(this.props.subject)+'&body='+encodeURIComponent(this.props.url);
      return (<button onClick={this.shareViaEmail} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>);
    } else {
      return (<button onClick={this.share} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>);
    }
  } 
}