import * as React from 'react';
import {observer} from 'mobx-react';

interface P_StringSection {
  title:string;
  val?:any;
  vals?:Array<any>;
}

@observer
export class StringSection extends React.Component<P_StringSection> {
  render(){
    if(this.props.val) {
      return <div><h4>{this.props.title}</h4><div>{this.props.val}</div></div>
    } else if(this.props.vals) {
      return <div><h4>{this.props.title}</h4>{this.props.vals.map((val, idx)=><div key={idx}>{val}</div>)}</div>      
    } else {
      return null;
    }
  }
}