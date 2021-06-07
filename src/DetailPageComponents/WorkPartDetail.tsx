import {openExternalLink} from "./openExternalLink";

declare var navigator: any;
declare var Connection: any;
declare var window: any;

import * as React from 'react';
import {observer} from 'mobx-react';
import {Work, WorkPart, WorkPartItem} from '../data/Records';
import Database from '../data/Database';
import {ILocalizedStrings} from '../data/LocalizedStrings';
import AppState from '../data/AppState';
import {Card} from 'react-onsenui';
import {StringSection} from './StringSection';
import {RelatedRecordSection} from './RelatedRecordSection';
import {ShareButton} from './ShareButton';
import {ViewButton} from './ViewButton';
import {NetworkAlert} from './NetworkAlert';
import { DatabaseResult } from '../data/DatabaseResult';
import { observable } from 'mobx';

interface P_WorkPartDetail {
  workPart?:WorkPart;
  workPartItem?:WorkPartItem;
  strings:ILocalizedStrings;
  db:Database;
  viewRelatedRecord:(record:DatabaseResult)=>void;
  appState:AppState;
}

/**
 *
 *  This class renders an WorkPart
 * 
 * Sample search:
 * ཆོས་མངོན་པའི་མཛོད་ཀྱི་འགྲེལ་པ་གནད་ཀྱི་སྒྲོན་མེ
 *
 */
@observer
export class WorkPartDetail extends React.Component<P_WorkPartDetail> {
  @observable relatedWorks:Array<DatabaseResult> = [];
  @observable work: Work|null = null;
  @observable alertOpen:boolean = false;
  @observable downloadPDFOpen:boolean = false;

  componentWillMount(){
    if(this.props.workPart && this.props.workPart.workId){
      this.props.db.searchForMatchingNodes([this.props.workPart.workId], this.receiveWorks);
    } 
  }

  receiveWorks = (works:Array<DatabaseResult>) => {
    this.relatedWorks = works;
    if(works.length>0) {
      works[0].load( this.props.appState.fileTool.fs.root.toURL()+'/BDRCLIB/',(work:any)=>{this.receiveWork(work)} );
    }
  }

  receiveWork = (work:Work) => {
    if(work) {
      this.work = work;
    }
  }

  onAlertClose = () =>{
    this.alertOpen = false;
  }

  handleViewButtonClicked = (workPart:WorkPart) =>{
    window.ga.trackEvent('DetailPage', 'Gallery', workPart.nodeId);
    if(navigator.connection.type===Connection.NONE) {
      this.alertOpen = true;
    } else {
      const externalLink = this.props.appState.generateViewLink(workPart.nodeId);
      openExternalLink(externalLink);
    }
  }

  render() {
    const { workPart, strings, appState, viewRelatedRecord} = this.props;

    return (
      <section>

        <WorkPartTopLevel
          workPart={workPart}
          strings={strings}
          appState={appState}
          onViewButtonClicked={this.handleViewButtonClicked}
          relatedWorks={this.relatedWorks}
          work={this.work}
          viewRelatedRecord={viewRelatedRecord}
        />

        {this.alertOpen?<NetworkAlert show={this.alertOpen} onClose={this.onAlertClose} strings={this.props.strings} />:null}

      </section>
    );

  }
}


interface IWorkPartTopLevelProps {
  workPart?:WorkPart;
  strings:ILocalizedStrings;
  appState:AppState;
  work:Work|null;
  relatedWorks:Array<DatabaseResult>;
  viewRelatedRecord:(record:DatabaseResult)=>void;
  onViewButtonClicked:(workPart:WorkPart)=>void;
}


class WorkPartTopLevel  extends React.Component<IWorkPartTopLevelProps> {

  handleViewButtonClicked = () => {
    if(this.props.workPart) {
      this.props.onViewButtonClicked(this.props.workPart);
    }
  }

  render() {
    const { strings, appState, workPart, relatedWorks, viewRelatedRecord } = this.props;

    if (!workPart) {
      return null;
    } else {

      const shareLink = appState.generateShareLink(workPart.nodeId);
      const shareSubject = strings.linkToTextPre + workPart.nodeId + strings.linkToTextPost;

      let workPartParentDatabaseResult:DatabaseResult|null = null;
      if(workPart.parent) {
        const syntheticRecord = {
          title:workPart.parent.title,
          nodeId:workPart.parent.id,
          type:'WorkPart'
        }
        workPartParentDatabaseResult = new DatabaseResult(appState.db, syntheticRecord);
      }

      return (
        <Card modifier="material">
          <StringSection title={strings.Title} val={workPart.title}/>
          <StringSection title={strings.WorkPartRID} val={workPart.nodeId}/>
          <RelatedRecordSection title={strings.IsWorkPartOf} relatedRecords={relatedWorks} viewRelatedRecord={viewRelatedRecord}/>

          {workPartParentDatabaseResult && workPartParentDatabaseResult.title!=='top' &&
            <RelatedRecordSection title={strings.parentWorkPart} relatedRecords={[workPartParentDatabaseResult]} viewRelatedRecord={viewRelatedRecord}/>
          }

          <WorkPartItemsList appState={appState} strings={strings} workPartItems={workPart.workPartItems} />

          <div className="action-bar">
            <div className="actions">
              <ShareButton strings={strings} subject={shareSubject} url={shareLink} nodeId={workPart.nodeId} />
              <ViewButton strings={strings} handleViewButtonClicked={this.handleViewButtonClicked} />
            </div>
          </div>
        </Card>
      );
    }
  }
}

export const WorkPartItemsList = (props:{
  workPartItems:WorkPartItem[],
  appState:AppState,
  strings:ILocalizedStrings,
}) => {
  if(props.workPartItems.length>0) {
    return (
      <div className={"WorkPartItemsList"}>
        <h4>{props.strings.Parts}</h4>
        <div>
          {props.workPartItems.map(wpi =>
            <WorkPartItemLink
              key={wpi.id}
              workPartItem={wpi}
              appState={props.appState}
            />
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

interface IWorkPartItemLinkProps {
  workPartItem:WorkPartItem;
  appState:AppState;
}

@observer
class WorkPartItemLink extends React.Component<IWorkPartItemLinkProps> {

  openSubSection = () => {
    this.props.appState.navigateToWorkPartItem(this.props.workPartItem);
  }

  render() {
    const {workPartItem} = this.props;
    return (
      <li className="list-item list-item--material" onClick={this.openSubSection}>{workPartItem.title}</li>
    );
  }
}

