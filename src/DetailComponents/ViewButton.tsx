
import * as React from 'react';
import {observer} from 'mobx-react';
import {LocalizedStringsType} from '../LocalizedStrings';


interface P_ViewButton {
  strings:LocalizedStringsType;
  handleViewButtonClicked:(e:any)=>void;
}

@observer
export class ViewButton extends React.Component<P_ViewButton> {
  render(){
    return <button onClick={this.props.handleViewButtonClicked} className="button button--material--flat firstCardAction">{this.props.strings.VIEW}</button>;
  } 
}
