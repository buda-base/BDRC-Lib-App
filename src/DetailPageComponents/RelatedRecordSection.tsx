import * as React from 'react';
import {observer} from 'mobx-react';
import { DatabaseResult } from '../data/DatabaseResult';

interface P_RelatedRecordSection {
  relatedRecords:Array<DatabaseResult>;
  title:string;
  viewRelatedRecord:(record:DatabaseResult)=>void;
  showOnlyFirstRecord?:boolean;
}

@observer
export class RelatedRecordSection extends React.Component<P_RelatedRecordSection> {
  
  render(){
    if(this.props.relatedRecords && this.props.relatedRecords.length>0) {
      return (
        <div>
          <h4>{this.props.title}</h4>
          {this.props.showOnlyFirstRecord ?
            <RelatedRecordLink record={this.props.relatedRecords[0]} viewRelatedRecord={this.props.viewRelatedRecord} />
          :
            this.props.relatedRecords.map((record)=><RelatedRecordLink key={record.id} record={record} viewRelatedRecord={this.props.viewRelatedRecord} />)
          }
        </div>
      );
    } else {
      return null;
    }
  }
}




@observer
class RelatedRecordLink extends React.Component {
  props:{
    record:DatabaseResult,
    viewRelatedRecord:(record:DatabaseResult)=>void
  };
  handleClick = (e:any) => {
    this.props.viewRelatedRecord(this.props.record);
  }
  render() {
    return (
      <div><a href="#" onClick={this.handleClick}>{this.props.record.title}</a>{/*<br/>{this.props.record.nodeId}*/}</div>    
    );
  }
}
