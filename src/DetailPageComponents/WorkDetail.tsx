import * as React from 'react';
import Database from '../Database';
import {ILocalizedStrings} from '../LocalizedStrings';
import AppState from '../AppState';
import {observer} from 'mobx-react';
import {StringSection} from './StringSection';
import {RelatedRecordSection} from './RelatedRecordSection';
import {Work} from '../Records';
import {ShareButton} from './ShareButton';
import {Card} from 'react-onsenui';
import { observable } from 'mobx';
import { DatabaseResult } from '../DatabaseResult';

interface P_WorkDetail {
  work:Work;
  strings:ILocalizedStrings;
  db:Database;
  viewRelatedRecord:(record:DatabaseResult)=>void;
  appState:AppState;
}

@observer
export class WorkDetail extends React.Component<P_WorkDetail> {

  @observable authors: Array<DatabaseResult> = [];

  componentWillMount(){
    if(this.props.work && this.props.work.creator && this.props.work.creator.length>0){ 
      const creatorKeys = [];
      // Only want a single author. 
      creatorKeys.push(this.props.work.creator[0].id);
      this.props.db.searchForMatchingNodes(creatorKeys, this.receiveAuthors);
    }
  }

  receiveAuthors = (authors:Array<DatabaseResult>) => {
    if(authors && authors.length>0) {
      authors[0].title = this.props.work.creator[0].name;
    }
    this.setState({authors:authors});
  }

  render() {
    if(this.props.work) {

      const shareLink = this.props.appState.libraryServer.url+"/#!rid="+this.props.work.nodeId;
      const shareSubject = this.props.strings.linkToWorkPre+this.props.work.nodeId+this.props.strings.linkToWorkPost;


      const status = this.props.work.status ? this.props.strings.displayStatus(this.props.work.status) : '';

      return (
        <section>
          <Card modifier="material">

            <StringSection title={this.props.strings.Title} vals={this.props.work.title} />

            <RelatedRecordSection title={this.props.strings.Creator} 
              relatedRecords={this.authors} 
              viewRelatedRecord={this.props.viewRelatedRecord} 
              showOnlyFirstRecord={true} 
            />

            <StringSection title={this.props.strings.WorkRID} val={this.props.work.nodeId} /> 

            <StringSection title={this.props.strings.PublisherName} val={this.props.work.publisherName} /> 
            <StringSection title={this.props.strings.PublisherLocation} val={this.props.work.publisherLocation} />
            <StringSection title={this.props.strings.PublisherDate} val={this.props.work.publisherDate} />
            <StringSection title={this.props.strings.PrintType} val={this.props.work.printType} />
            <StringSection title={this.props.strings.Access} val={this.props.strings.accessString(this.props.work.access)} /> 

            <StringSection title={this.props.strings.Status} val={status} />

            <div className="action-bar">
              <div className="actions"> 
                <ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.work.nodeId} />               
              </div>
            </div>
          </Card>         

        </section>        
      );
    } else {
      return null;
    }
  } 
}




