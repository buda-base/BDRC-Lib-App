import * as React from 'react';
import Database from '../data/Database';
import {ILocalizedStrings} from '../data/LocalizedStrings';
import AppState from '../data/AppState';
import {observer} from 'mobx-react';
import {StringSection} from './StringSection';
import {RelatedRecordSection} from './RelatedRecordSection';
import {Work, WorkPart} from '../data/Records';
import {ShareButton} from './ShareButton';
import {Card} from 'react-onsenui';
import {action, observable} from 'mobx';
import { DatabaseResult } from '../data/DatabaseResult';
import { ViewButton } from './ViewButton';
import { openExternalLink } from './openExternalLink';
import {WorkPartItemsList} from "./WorkPartDetail";

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
  @observable workPart: WorkPart;



  componentWillMount(){
    if(this.props.work) {
      if(this.props.work.creator && this.props.work.creator.length>0){
        // Only want a single author.
        const creatorKeys = [this.props.work.creator[0]];
        // Only want a single author.
        //creatorKeys.push(this.props.work.creator[0].id);
        this.props.db.searchForMatchingNodes(creatorKeys, this.receiveAuthors);
      }
    }
    if(this.props.work.hasParts){
      this.props.appState.loadWorkPartsForWork(this.props.work)
        .then(this.receiveWorkPart)
        .catch(()=>{
          console.log('failed to load workparts for ', this.props.work);
        });
    }
  }

  @action
  receiveWorkPart = (workPart:WorkPart) => {
    this.workPart = workPart;
  }

  @action
  receiveAuthors = (authors:Array<DatabaseResult>) => {
    this.authors = authors;
  }
  handleViewButtonClicked = () => {
    openExternalLink(this.props.appState.generateViewLink(this.props.work.nodeId));
  }

  render() {
    if(this.props.work) {

      const shareLink = this.props.appState.generateShareLink(this.props.work.nodeId);
      const shareSubject = this.props.strings.linkToWorkPre+this.props.work.nodeId+this.props.strings.linkToWorkPost;
      const printType = this.props.strings.printTypeForCode(this.props.work.printType);

      return (
        <section>
          <Card modifier="material">

            <StringSection title={this.props.strings.Title} vals={this.props.work.title} />

            <RelatedRecordSection
              title={this.props.strings.Creator}
              relatedRecords={this.authors} 
              viewRelatedRecord={this.props.viewRelatedRecord} 
              showOnlyFirstRecord={true} 
            />

            <StringSection title={this.props.strings.WorkRID} val={this.props.work.nodeId} /> 

            <StringSection title={this.props.strings.PublisherName} val={this.props.work.publisherName} /> 
            <StringSection title={this.props.strings.PublisherLocation} val={this.props.work.publisherLocation} />
            <StringSection title={this.props.strings.PublisherDate} val={this.props.work.publisherDate} />
            <StringSection title={this.props.strings.PrintType} val={printType} />

            {this.workPart && this.workPart.workPartItems &&
            <WorkPartItemsList
              appState={this.props.appState}
              strings={this.props.strings}
              workPartItems={this.workPart.workPartItems}
            />
            }

            <div className="action-bar">
              <div className="actions"> 
                <ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.work.nodeId} />               
                <ViewButton strings={this.props.strings} handleViewButtonClicked={this.handleViewButtonClicked} />
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




