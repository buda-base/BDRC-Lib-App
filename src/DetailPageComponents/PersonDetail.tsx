import * as React from 'react';
import {observer} from 'mobx-react';
import {Person} from '../Records';
import Database from '../Database';
import {ILocalizedStrings} from '../LocalizedStrings';
import AppState from '../AppState';
import {Card} from 'react-onsenui';
import {StringSection} from './StringSection'; 
import {RelatedRecordSection} from './RelatedRecordSection';
import {ShareButton} from './ShareButton';
import { DatabaseResult } from '../DatabaseResult';

@observer
export class PersonDetail extends React.Component {  
  state: {
    authoredWorks: Array<DatabaseResult>
  };
  props:{
    person:Person|null,
    strings:ILocalizedStrings,
    db:Database, 
    viewRelatedRecord:(record:DatabaseResult)=>void,
    appState:AppState
  };

  constructor(props:{db:Database, person:any, strings:ILocalizedStrings, viewRelatedRecord:(record:DatabaseResult)=>void, appState:AppState}) {
    super(props);   
    this.state = {
      authoredWorks: []
    };
  }

  componentWillMount(){
    if(this.props.person && this.props.person.creatorOf && this.props.person.creatorOf.length>0){ 
      this.props.db.searchForMatchingNodes(this.props.person.creatorOf, this.receiveAuthoredWorks);
    } 
  }

  receiveAuthoredWorks = (authoredWorks:Array<DatabaseResult>) => {
    this.setState({authoredWorks:authoredWorks});
  }

  render() {    
    if(this.props.person) {

      let shareLink = this.props.appState.libraryServer.url+"/#!rid="+this.props.person.nodeId;
      let shareSubject = this.props.strings.linkToAuthorPre+this.props.person.nodeId+this.props.strings.linkToAuthorPost;

      return (
        <section>
          <Card modifier="material">
            <StringSection title={this.props.strings.Name} vals={this.props.person.name} />
            <StringSection title={this.props.strings.PersonRID} val={this.props.person.nodeId} /> 
            <StringSection title={this.props.strings.Birth} val={this.props.person.birth} />
            <StringSection title={this.props.strings.Death} val={this.props.person.death} />
            
            <RelatedRecordSection title={this.props.strings.CreatorOf} relatedRecords={this.state.authoredWorks} viewRelatedRecord={this.props.viewRelatedRecord} />

            <div className="action-bar">
              <div className="actions"> 
                <ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.person.nodeId} />               
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
