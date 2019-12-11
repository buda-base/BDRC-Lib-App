declare var navigator: any;
declare var Connection: any;
declare var window: any;

import * as React from 'react';
import {observer} from 'mobx-react';
import {Work, WorkPart} from '../Records';
import Database from '../Database';
import {ILocalizedStrings} from '../LocalizedStrings';
import AppState from '../AppState';
import {Card} from 'react-onsenui';
import {StringSection} from './StringSection';
import {RelatedRecordSection} from './RelatedRecordSection';
import {ShareButton} from './ShareButton';
import {ViewButton} from './ViewButton';
import {NetworkAlert} from './NetworkAlert';
import { DatabaseResult } from '../DatabaseResult';
import { observable } from 'mobx';

interface P_WorkPartDetail {
  workPart:WorkPart;
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
    this.setState({relatedWorks:works});
    if(works.length>0) {
      works[0].load( (work:any)=>{this.receiveWork(work)} );
    }
  }

  receiveWork = (work:Work) => {
    if(work) {
      this.work = work;
    }
  }


  onGalleryClose = () =>{
    //this.setState({pechaViewerOpen:false});
  }

  onAlertClose = () =>{
    this.alertOpen = false;
  }



  onViewButtonClicked = () =>{
    window.ga.trackEvent('DetailPage', 'Gallery', this.props.workPart.nodeId);

    if(navigator.connection.type===Connection.NONE) {
      this.alertOpen = true;
    } else {
      // this.setState({pechaViewerOpen:true});
    }
  }

/* བཀྲ་ཤིས་ཆེན་པོའི་མདོ། */
  render() {
    if(this.props.workPart) {

      const work = this.work;


      // /#!rid=O4JW333|O4JW3334CZ90006$W22084
      const shareLink = work ? this.props.appState.libraryServer.url+'/?locale='+this.props.strings.id+'#!rid='+this.props.workPart.nodeId : '';
      const shareSubject = this.props.strings.linkToTextPre+this.props.workPart.nodeId+this.props.strings.linkToTextPost;

      return (
        <section>
          <Card modifier="material">
            <StringSection title={this.props.strings.Title} vals={this.props.workPart.workTitle} />
            <StringSection title={this.props.strings.WorkPartRID} val={this.props.workPart.nodeId} /> 
            <RelatedRecordSection title={this.props.strings.IsWorkPartOf} relatedRecords={this.relatedWorks} viewRelatedRecord={this.props.viewRelatedRecord} />            
            <div className="action-bar">
              <div className="actions">   
                {work ? <ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.workPart.nodeId} /> : null }          
                {work ? <ViewButton strings={this.props.strings} handleViewButtonClicked={this.onViewButtonClicked}/> : null }
              </div>
            </div>  
            {this.alertOpen?<NetworkAlert show={this.alertOpen} onClose={this.onAlertClose} strings={this.props.strings} />:null}
          </Card>
        </section>        
      );

    } else {
      return null;
    }
  }
}