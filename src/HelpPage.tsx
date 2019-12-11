import * as React from 'react';
import {LocalizedStringsType} from './LocalizedStrings';
import './HelpPage.pcss';

export default class HelpPage extends React.Component {
  props:{
    strings:LocalizedStringsType;
  };
  render() {
    return (
      <div>
        <div className="scan_container">
          <div className="scan_block">
           <h2>{this.props.strings.OnWeChatInChina}</h2>
            <img src="img/bdrc-wechat.png" />
          </div>
          <div className="scan_block">
            <h2>{this.props.strings.OnFacebookMessenger}</h2>
            <img src="img/bdrc-facebook-messenger.png" />
            <a href="https://m.me/TBRC.org" target="_blank">https://m.me/TBRC.org</a>
          </div>
          <div className="scan_block">
            <h2><a href="mailto:inquiry@tbrc.org">{this.props.strings.OrContactUsEmail}</a></h2>
          </div>
        </div>        
      </div>
    );          
  }
}


