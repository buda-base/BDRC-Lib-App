import * as React from 'react';
import {observer} from 'mobx-react';
import {ProgressCircular} from 'react-onsenui';
import './PleaseWait.pcss';

interface P_PleaseWait {
  statusMessage:string;
  showStatusMessage:boolean;
}

@observer
export class PleaseWait extends React.Component<P_PleaseWait> {
  render(){
    if(this.props.showStatusMessage) {
      return (
        <div id="PleaseWait" className={"show"}>
          <ProgressCircular indeterminate />
          <p>{this.props.statusMessage}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

