import * as React from 'react';
import {observer} from 'mobx-react';
import {ProgressCircular} from 'react-onsenui';

interface P_PleaseWait {
  statusMessage:string;
  showStatusMessage:boolean;
}

@observer
export class PleaseWait extends React.Component<P_PleaseWait> {
  render(){
    let pleaseWaitClass = this.props.showStatusMessage?'show':'';    
    return (
      <div id="PleaseWait" className={pleaseWaitClass}>
        <ProgressCircular indeterminate />
        <p>{this.props.statusMessage}</p>
      </div>    
    );
  }
}

