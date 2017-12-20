// @flow
declare var cordova: any;
declare var device: any;
declare var navigator: any;
declare var Connection: any;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import Lightbox from 'react-image-lightbox';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {Card, AlertDialog, Dialog, Button, ProgressCircular, Fab, Icon} from 'react-onsenui';

import Database, {DatabaseResult} from './Database.js';
import {Work, Person, Outline, Volume} from './Records.js';
import AppState from './AppState.jsx';

import type {ImageGroup} from './TypeAliases.js';
import type {Record} from './Records.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './DetailPage.pcss';

@observer
export default class DetailPage extends Component {

	props: {
		db:Database;
		databaseResult:DatabaseResult;
		strings:LocalizedStringsType;
		appState:AppState;
		files:any;
	};

	constructor(props:{db:Database, databaseResult:DatabaseResult, strings:LocalizedStringsType, appState:AppState, files:any}) {
		super(props);
		window.ga.trackEvent('DetailPage', 'Load', props.databaseResult.nodeId);
	}
	
	viewRelatedRecord = (databaseResult:DatabaseResult) => {
		this.props.appState.navigateTo(databaseResult);
	}

	render() {
		if(this.props.databaseResult) {
			if(this.props.files.person) return <PersonDetail db={this.props.db} strings={this.props.strings} person={this.props.files.person} viewRelatedRecord={this.viewRelatedRecord}  appState={this.props.appState} />;
			else if(this.props.files.work) return <WorkDetail db={this.props.db} strings={this.props.strings} work={this.props.files.work} viewRelatedRecord={this.viewRelatedRecord} appState={this.props.appState} />;
			else if(this.props.files.outline) return <OutlineDetail db={this.props.db} strings={this.props.strings} outline={this.props.files.outline} viewRelatedRecord={this.viewRelatedRecord} appState={this.props.appState} />;
			else return null;
		} else {
			return null;
		}
	}
}

@observer
class PersonDetail extends Component {	
	state: {
		authoredWorks: Array<DatabaseResult>
	};
	props:{
		person:Person|null,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void,
		appState:AppState
	};

	constructor(props:{db:Database, person:any, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void, appState:AppState}) {
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

@observer
class WorkDetail extends Component {
	props:{
		work:Work,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void,
		appState:AppState,
	};

	state: {
		authors: Array<DatabaseResult>
	};


	constructor(props:{db:Database, work:Work, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void, appState:AppState }) {
		super(props);		
		this.state = {
			authors: []
		};
	}

	componentWillMount(){
		if(this.props.work && this.props.work.hasCreator && this.props.work.hasCreator.length>0){ 
			let creatorKeys = [];
			// Only want a single author. Push the first key of the first hasCreator 
			// object, which is in the form { PersonRID:NameOfPerson }
			creatorKeys.push(Object.keys(this.props.work.hasCreator[0])[0]);
			this.props.db.searchForMatchingNodes(creatorKeys, this.receiveAuthors);
		}
	}

	receiveAuthors = (authors:Array<DatabaseResult>) => {
		if(authors && authors.length>0) {
			let title = this.props.work.hasCreator[0][Object.keys( this.props.work.hasCreator[0] )[0]];
			authors[0].title = title;
		}
		this.setState({authors:authors});
	}

	render() {
		if(this.props.work) {

			let shareLink = this.props.appState.libraryServer.url+"/#!rid="+this.props.work.nodeId;
			let shareSubject = this.props.strings.linkToWorkPre+this.props.work.nodeId+this.props.strings.linkToWorkPost;

			let vols = null;
			if(this.props.work.archiveInfo_vols) {
				try {
					vols = this.props.strings.displayNum(parseInt(this.props.work.archiveInfo_vols));
				} catch(error){ }
			}

			let status = this.props.work.status ? this.props.strings.displayStatus(this.props.work.status) : '';

			return (
				<section>
					<Card modifier="material">

						<StringSection title={this.props.strings.Title} vals={this.props.work.title} />

						<RelatedRecordSection title={this.props.strings.Creator} 
							relatedRecords={this.state.authors} 
							viewRelatedRecord={this.props.viewRelatedRecord} 
							showOnlyFirstRecord={true} 
						/>

						<StringSection title={this.props.strings.WorkRID} val={this.props.work.nodeId} /> 

						<StringSection title={this.props.strings.PublisherName} val={this.props.work.publisherName} /> 
						<StringSection title={this.props.strings.PublisherLocation} val={this.props.work.publisherLocation} />
						<StringSection title={this.props.strings.PublisherDate} val={this.props.work.publisherDate} />
						<StringSection title={this.props.strings.PrintType} val={this.props.work.printType} />
						<StringSection title={this.props.strings.License} val={this.props.strings.licenseString(this.props.work.license)} />  
						<StringSection title={this.props.strings.Access} val={this.props.strings.accessString(this.props.work.access)} /> 

						<StringSection title={this.props.strings.Status} val={status} />

		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.work.nodeId} />		  	  			
		  	  		</div>
			    	</div>
					</Card>					

					<VolumeMap workId={this.props.work.nodeId} volumeMap={this.props.work.volumeMap} strings={this.props.strings} appState={this.props.appState} />

				</section>				
			);
		} else {
			return null;
		}
	}	
}





@observer
class VolumeMap extends Component {
	props:{
		volumeMap:Array<Volume>,
		strings:LocalizedStringsType,
		workId:string,
		appState:AppState
	};
	render(){
		if(this.props.volumeMap) {
			return (
				<div>
					{this.props.volumeMap.map((volume)=><VolumeCard key={volume.id} workId={this.props.workId} volume={volume} strings={this.props.strings} appState={this.props.appState} />)}
				</div>
			);
		} else {
			return null;
		}
	}
}

@observer
class VolumeCard extends Component {
	props:{
		volume:Volume,
		strings:LocalizedStringsType,
		workId:string,
		appState:AppState
	};
	state:{
		pechaViewerOpen:boolean,
		alertOpen:boolean,
		downloadPDFOpen:boolean
	}
	constructor(props){
		super(props);
		this.state = {
			pechaViewerOpen:false,
			alertOpen:false,
			downloadPDFOpen:false
		}
	}

	onGalleryClose = () =>{
		this.setState({pechaViewerOpen:false});
	}

	onAlertClose = () =>{
		this.setState({alertOpen:false});
	}

	onViewButtonClicked = () =>{
		window.ga.trackEvent('DetailPage', 'Gallery', this.props.workId+'-'+this.props.volume.num);

		if(navigator.connection.type===Connection.NONE) {
			this.setState({alertOpen:true});
		} else {
			this.setState({pechaViewerOpen:true});
		}
	}

	// /browser/PdfServiceApp/?endPage=4&startPage=1&work=W00KG01653&volume=I00KG02965 
	onPDFButtonClicked = () => {
		window.ga.trackEvent('DetailPage', 'PDF', this.props.workId+'-'+this.props.volume.num);
		this.setState({downloadPDFOpen:true});
	}

	render(){

		let imageGroup = {
			imageGroupId: this.props.volume.id,
			total:this.props.volume.total,
			start:1,
			end:this.props.volume.total,
			volumeNum:this.props.volume.num
		};

		return (
				<Card modifier="material">
					
					<div>{this.props.strings.VolumePre}{this.props.strings.displayNum(this.props.volume.num)}{this.props.strings.VolumePost}{this.props.strings.pagesPre} {this.props.strings.displayNum(this.props.volume.total)} {this.props.strings.pagesPost}</div>

					{/*<div>{this.props.strings.viewWarning}</div>*/}

		    		<div className="action-bar">
		    			<div className="actions"> 
			    			<PDFButton strings={this.props.strings} handlePDFButtonClicked={this.onPDFButtonClicked} />	
		    				<ViewButton strings={this.props.strings} volume={this.props.volume} handleViewButtonClicked={this.onViewButtonClicked}/>	  		
			  	  	</div>
			    	</div>
					
					{this.state.pechaViewerOpen?<PechaViewer appState={this.props.appState} workId={this.props.workId} imageGroups={[imageGroup]} onGalleryClose={this.onGalleryClose} startPhotoIndex={2} />:null}
					{this.state.downloadPDFOpen?<PDFDownload appState={this.props.appState} strings={this.props.strings} workId={this.props.workId} volumeId={imageGroup.imageGroupId} endPage={imageGroup.total} startPage={imageGroup.start} volumeNum={imageGroup.volumeNum} afterClose={()=>{ this.setState({downloadPDFOpen:false}); }} />:null}

					{this.state.alertOpen?<NetworkAlert show={this.state.alertOpen} onClose={this.onAlertClose} strings={this.props.strings} />:null}

				</Card>
		);
	}
}


/**
 *
 *	This class renders an Outline
 * 
 * Sample search:
 * ཆོས་མངོན་པའི་མཛོད་ཀྱི་འགྲེལ་པ་གནད་ཀྱི་སྒྲོན་མེ
 *
 */
 @observer
class OutlineDetail extends Component {
	state:{
		imageGroups: Array<ImageGroup>,
		relatedWorks:Array<DatabaseResult>,
		work: Work|null,
		pechaViewerOpen:boolean,
		alertOpen:boolean
	};
	props:{
		outline:Outline,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void,
		appState:AppState
	};

	@observable downloadPDFOpen:boolean = false;

	constructor(props:{db:Database, outline:Outline, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void, appState:AppState} ) {
		super(props);
		this.state = {
			work: null,
			imageGroups:[],
			pechaViewerOpen:false,
			relatedWorks: [],
			alertOpen:false
		};
	}

	componentWillMount(){
		if(this.props.outline && this.props.outline.isOutlineOf){ 
			this.props.db.searchForMatchingNodes([this.props.outline.isOutlineOf], this.receiveWorks);
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
			let imageGroups = [];
			let beginsAt = this.props.outline.beginsAt;
			let endsAt = this.props.outline.endsAt;
			let volumeBegin = this.props.outline.volume;

			if(beginsAt && endsAt && volumeBegin) {

				if(this.props.outline.volumeEnd && this.props.outline.volumeEnd>volumeBegin) {

					for(let v=volumeBegin;v<=this.props.outline.volumeEnd;v++){
						for(let i=0;i<work.volumeMap.length;i++) {
							if(v===work.volumeMap[i].num) {
								let imageGroup = {
									imageGroupId:work.volumeMap[i].id,
									total:work.volumeMap[i].total,
									start:v===volumeBegin?beginsAt:1,
									end:v===this.props.outline.volumeEnd?endsAt:work.volumeMap[i].total,
									volumeNum:work.volumeMap[i].num
								};
								imageGroups.push(imageGroup);
								break;
							}
						}						
					}
				} else {
					for(let i=0;i<work.volumeMap.length;i++) {
						if(volumeBegin===work.volumeMap[i].num) {
							let imageGroup = {
								imageGroupId:work.volumeMap[i].id,
								total:work.volumeMap[i].total,
								start:beginsAt,
								end:endsAt<work.volumeMap[i].total?endsAt:work.volumeMap[i].total,
								volumeNum:work.volumeMap[i].num
							};
							imageGroups.push(imageGroup);
							break;
						}
					}
				}
			}
			let state = this.state;
			state.work = work;
			state.imageGroups = imageGroups;			
			this.setState(state);
		}
	}


	onGalleryClose = () =>{
		this.setState({pechaViewerOpen:false});
	}

	onAlertClose = () =>{
		this.setState({alertOpen:false});
	}



	onViewButtonClicked = () =>{
		window.ga.trackEvent('DetailPage', 'Gallery', this.props.outline.nodeId);

		if(navigator.connection.type===Connection.NONE) {
			this.setState({alertOpen:true});
		} else {
			this.setState({pechaViewerOpen:true});
		}
	}

/* བཀྲ་ཤིས་ཆེན་པོའི་མདོ། */
	render() {
		if(this.props.outline) {

			let work = this.state.work;

			//console.log(this.props.outline);

			// /#!rid=O4JW333|O4JW3334CZ90006$W22084
			let shareLink = work ? this.props.appState.libraryServer.url+'/?locale='+this.props.strings.id+'#!rid='+this.props.outline.outlineNodeId+'%7C'+this.props.outline.nodeId+'%24'+work.nodeId : '';
			let shareSubject = this.props.strings.linkToTextPre+this.props.outline.outlineNodeId+this.props.strings.linkToTextPost;

			return (
				<section>
					<Card modifier="material">
						<StringSection title={this.props.strings.Title} vals={this.props.outline.title} />
						<StringSection title={this.props.strings.OutlineRID} val={this.props.outline.nodeId} /> 
						<RelatedRecordSection title={this.props.strings.IsOutlineOf} relatedRecords={this.state.relatedWorks} viewRelatedRecord={this.props.viewRelatedRecord} />						
		    		<div className="action-bar">
		    			<div className="actions"> 	
		    				{work ? <ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} nodeId={this.props.outline.nodeId} /> : null } 	  			
		    				{work && this.state.imageGroups && 1===this.state.imageGroups.length ? <PDFButtonWrapper strings={this.props.strings} appState={this.props.appState} imageGroup={this.state.imageGroups[0]} workId={work?work.nodeId:''} /> : null }
		    				{work ? <ViewButton strings={this.props.strings} handleViewButtonClicked={this.onViewButtonClicked}/> : null }
		  	  		</div>
			    	</div>	
			    	{work ? (this.state.pechaViewerOpen?<PechaViewer appState={this.props.appState} workId={work.nodeId} imageGroups={this.state.imageGroups} onGalleryClose={this.onGalleryClose} startPhotoIndex={0} />:null):null}
						{this.state.alertOpen?<NetworkAlert show={this.state.alertOpen} onClose={this.onAlertClose} strings={this.props.strings} />:null}
					</Card>
					{work && this.state.imageGroups && 1 < this.state.imageGroups.length ? (this.state.imageGroups.map((imageGroup, idx)=>{ return <OutlineDetailSection part={idx} appState={this.props.appState} key={imageGroup.imageGroupId} workId={work?work.nodeId:''} imageGroup={imageGroup} strings={this.props.strings} />; })) : null }
				</section>				
			);

		} else {
			return null;
		}
	}
}

@observer
class OutlineDetailSection extends Component {
	render() {
		let volumeNum = this.props.imageGroup.volumeNum?this.props.imageGroup.volumeNum:0;

		return (
			<Card modifier="material">
  			<div><h4>{this.props.strings.VolumePre}{this.props.strings.displayNum(volumeNum)}{this.props.strings.VolumePost}{this.props.strings.pagesPre} {this.props.strings.displayNum(this.props.imageGroup.end - this.props.imageGroup.start)} {this.props.strings.pagesPost}</h4></div>
  			<div className="action-bar">
  				<div className="actions"> 
						<PDFButtonWrapper strings={this.props.strings} appState={this.props.appState} imageGroup={this.props.imageGroup} workId={this.props.workId} />
					</div>
				</div>
			</Card>
		);
	}
}

@observer
class PDFButtonWrapper extends Component {
	@observable downloadPDFOpen:boolean = false;

	// /browser/PdfServiceApp/?endPage=4&startPage=1&work=W00KG01653&volume=I00KG02965 
	onPDFButtonClicked = () => {
		let volumeNum = this.props.imageGroup.volumeNum?this.props.imageGroup.volumeNum:0;
		window.ga.trackEvent('DetailPage', 'PDF', this.props.workId+'-'+volumeNum);
		this.downloadPDFOpen = true;
	}

	render()  {
		return (
			<span>
				<PDFButton strings={this.props.strings} handlePDFButtonClicked={this.onPDFButtonClicked} />
				{this.downloadPDFOpen?<PDFDownload appState={this.props.appState} strings={this.props.strings} startPage={this.props.imageGroup.start} endPage={this.props.imageGroup.end} workId={this.props.workId} volumeId={this.props.imageGroup.imageGroupId} volumeNum={this.props.imageGroup.volumeNum} afterClose={()=>{ this.downloadPDFOpen = false; }} />:null}
			</span>
		);
	}
}

@observer
class PDFButton extends Component {
	constructor(props:{strings:LocalizedStringsType, handlePDFButtonClicked:()=>void}) {
		super(props)
	}
	render(){
		return <button onClick={this.props.handlePDFButtonClicked} className="button button--material--flat firstCardAction">{this.props.strings.PDF}</button>;
	}		
}

@observer
class ViewButton  extends Component {
	constructor(props:{strings:LocalizedStringsType, handleViewButtonClicked:()=>void}) {
		super(props)
	}
	render(){
		return <button onClick={this.props.handleViewButtonClicked} className="button button--material--flat firstCardAction">{this.props.strings.VIEW}</button>;
	}	
}

@observer
class ShareButton extends Component {
	
	constructor(props:{subject:string, url:string, strings:LocalizedStringsType, nodeId:string}) {
		super(props)
	}
	
	share = () =>{
		let options = {
			subject: this.props.subject,
			url:this.props.url 			
		};
		window.plugins.socialsharing.shareWithOptions(
			options, 
			(success)=>{
				window.ga.trackEvent('DetailPage', 'Share', this.props.nodeId);
			}, 
			(error)=>{
				console.log(error);

			}
		);
	}

	shareViaEmail = () => {
		let href = 'mailto:?subject='+encodeURIComponent(this.props.subject)+'&body='+encodeURIComponent(this.props.url);
		window.ga.trackEvent('DetailPage', 'Share', this.props.nodeId);
		window.location=href;
	}

	render(){
		if('browser'===device.platform){
			let href = 'mailto:?subject='+encodeURIComponent(this.props.subject)+'&body='+encodeURIComponent(this.props.url);
			return (<button onClick={this.shareViaEmail} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>)
		} else {
			return (<button onClick={this.share} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>);
		}
	}	
}

@observer
class StringSection extends Component {
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

@observer
class RelatedRecordSection extends Component {
	props: {
		relatedRecords:Array<DatabaseResult>,
		title:string,
		viewRelatedRecord:(record:DatabaseResult)=>void,
		showOnlyFirstRecord?:boolean
	};
	render(){
		if(this.props.relatedRecords && this.props.relatedRecords.length>0) {
			return(
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
class RelatedRecordLink extends Component {
	props:{
		record:DatabaseResult,
		viewRelatedRecord:(record:DatabaseResult)=>void
	};
	handleClick = (e) => {
		this.props.viewRelatedRecord(this.props.record);
	}
	render() {
		return (
			<div><a href="#" onClick={this.handleClick}>{this.props.record.title}</a>{/*<br/>{this.props.record.nodeId}*/}</div>		
		);
	}
}

@observer
class PDFDownload extends Component {

	@observable visible:boolean = true;
	@observable errorMode:boolean = false;
	@observable errorMessage:string;
	@observable pdfHasBeenGenerated:boolean = false;
	@observable downloadLink:string;
	@observable pdfPageLink:string;

	@observable currentlyDownloading:boolean = false;
	// @observable currentlyCopyingLink:boolean = false;

	@observable toastShown:boolean = false;
	@observable toastMessage:string;

	componentDidMount(){
		this.queryForPDF();
	}	

	hideDialog = () => {
		this.visible = false;
	}

	queryForPDF = () => {
		let startPage = this.props.startPage ? this.props.startPage : 1;
		let generationURL = this.props.appState.libraryServer.url+'/browser/PdfServiceApp/?endPage='+this.props.endPage+'&startPage='+startPage+'&work='+this.props.workId+'&volume='+this.props.volumeId;
    $.getJSON(generationURL)
    .done((json) => {
      this.responseHandler(json);
    })
    .fail((xhr, status, err) => {
      this.responseHandler(null);
    });
	}

	responseHandler = (json:any|null) => {
		if(null==json) {

			this.errorMode = true;
			this.errorMessage = this.props.strings.NoInternetMessagePDF;

		} else {
			if(false==json.success) {

				this.errorMode = true;
				this.errorMessage = this.props.strings.anErrorOccurred;

				// Type 2
				if('noAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noAccessRight + this.props.strings.type2PDFErrorMessage;
				} else if('noneSealedRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noneSealedRight + this.props.strings.type2PDFErrorMessage;
				} else if('noneTemporaryRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noneTemporaryRight + this.props.strings.type2PDFErrorMessage;
				} else if('noneQualityRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noneQualityRight + this.props.strings.type2PDFErrorMessage;
				} else if('noneTbrcRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noneTbrcRight + this.props.strings.type2PDFErrorMessage;
				} else if('noneChinaRight'===json.errorCode) {
					this.errorMessage = this.props.strings.noneChinaRight + this.props.strings.type2PDFErrorMessage;
				} else if('fairUseRight'===json.errorCode) {
					this.errorMessage = this.props.strings.fairUseRight + this.props.strings.type2PDFErrorMessage;
				} 

				// Type 3
				else if('noneByCopyright'===json.errorCode) {
					this.errorMessage = this.props.strings.noneByCopyright + this.props.strings.type3PDFErrorMessage;
				} 

				// Type 1
				else if('ExceptionRaised'===json.errorCode) {
					this.errorMessage = this.props.strings.ExceptionRaised + this.props.strings.type1PDFErrorMessage;
				} else if('ProcessTimeout'===json.errorCode) {
					this.errorMessage = this.props.strings.ProcessTimeout + this.props.strings.type1PDFErrorMessage;
				} else if('noImages'===json.errorCode) {
					this.errorMessage = this.props.strings.noImages + this.props.strings.type1PDFErrorMessage;
				} else if('pdfFailed'===json.errorCode) {
					this.errorMessage = this.props.strings.pdfFailed + this.props.strings.type1PDFErrorMessage;
				} else if('exceptionOccurred'===json.errorCode) {
					this.errorMessage = this.props.strings.exceptionOccurred + this.props.strings.type1PDFErrorMessage;
				} else if('unknownError'===json.errorCode) {
					this.errorMessage = this.props.strings.unknownError + this.props.strings.type1PDFErrorMessage;
				} else if('notInArchive'===json.errorCode) {
					this.errorMessage = this.props.strings.notInArchive + this.props.strings.type1PDFErrorMessage;
				} else if('noWorkDirectory'===json.errorCode) {
					this.errorMessage = this.props.strings.noWorkDirectory + this.props.strings.type1PDFErrorMessage;
				} else if('sampleAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.sampleAccessRight + this.props.strings.type1PDFErrorMessage;
				} else if('openAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.openAccessRight + this.props.strings.type1PDFErrorMessage;
				} else if('allAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.allAccessRight + this.props.strings.type1PDFErrorMessage;
				} else if('ctcAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.ctcAccessRight + this.props.strings.type1PDFErrorMessage;
				} else if('openAccessRight'===json.errorCode) {
					this.errorMessage = this.props.strings.openAccessRight + this.props.strings.type1PDFErrorMessage;
				}


			} else {
				if('done'===json.status) {	
					let startPage = this.props.startPage ? this.props.startPage : 1;
					this.downloadLink = json.pdfUrl;
					this.pdfPageLink = this.props.appState.libraryServer.url+'/'+('cn'===this.props.strings.id?'locale=zh':'')+'#pdfdl?endPage='+this.props.endPage+'&startPage='+startPage+'&work='+this.props.workId+'&volume='+this.props.volumeId;
					this.pdfHasBeenGenerated = true;
				} else {
					if(this.visible) setTimeout(this.queryForPDF,1000);
				}
			}
		}
	}

	triggerSnackBar = (message) => {
    this.props.appState.openSnackBar(message);
	}

	download = () => {

		if(!this.currentlyDownloading) {	
			
			this.currentlyDownloading = true;
			
			window.ga.trackEvent('DetailPage', 'Download', this.props.workId+'-'+this.props.volumeNum);

			if(device.platform=='Android') {
				// https://github.com/vasani-arpit/cordova-plugin-downloadmanager
				cordova.plugins.DownloadManager.download(this.downloadLink, 
					(successResult) => { 
						this.triggerSnackBar(this.props.strings.snackbarDownloading);						
						this.currentlyDownloading = false; 
					}, 
					(errorResult) => { 
						this.triggerSnackBar(this.props.strings.snackbarDownloadFailed);
						this.currentlyDownloading = false; 
					}
				);

			} else {
				//window.open(this.downloadLink+'?loadpdf=true', '_system');
				// https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/blob/master/README.md
				window.plugins.socialsharing.share(null/*message*/, null/*subject*/, this.downloadLink/*file*/, null/*url*/, 
					(successResult) => { this.currentlyDownloading = false; }, 
					(errorResult) => { this.currentlyDownloading = false; }
				); 
			}

		}
	}

	copyLink = () => {

		window.ga.trackEvent('DetailPage', 'CopyLink', this.props.workId+'-'+this.props.volumeNum);

		// https://github.com/niconaso/cordova-plugin-clipboard-x
		cordova.plugins.clipboard.copy(this.pdfPageLink, 
			()=>{  
				this.triggerSnackBar(this.props.strings.snackbarLinkCopiedToClipboard);
			},
			()=>{
				this.triggerSnackBar(this.props.strings.snackbarFailedToCopyLink);
			}				
		);
	}

	handlePostHide = () => {
		this.visible = false;
		this.props.afterClose();
	}

	render() {
		return (
			<Dialog isOpen={this.visible} onPostHide={this.handlePostHide}>
				<div className="PDFDownload">
					<h1>{this.props.strings.downloadOrCopyLink}</h1>
					<p>

					{this.pdfHasBeenGenerated 
						?
						this.props.strings.yourPDFHasBeenGenerated
						:
	  				(this.errorMode ? '' : this.props.strings.pleaseWaitWhileWeGenerateYourPDF)
	  			}
	  			</p>
	  			<div>
	  			{this.pdfHasBeenGenerated ?
	  				<div className="fabContainer">
	  					<Fab onClick={this.download} ripple={true} disabled={this.currentlyDownloading} >
	  						<Icon icon='md-download' spin={this.currentlyDownloading} />
							</Fab>
							<Fab onClick={this.copyLink} ripple={true}>
	  						<Icon icon='md-link' />
							</Fab>
	  				</div>
	  				:
	  				(this.errorMode ?
	  					<span>{this.errorMessage}</span>
	  					:
	  					<ProgressCircular indeterminate />
	  				)
	  			}
	  			</div>
	  		</div>
	  		<Button modifier="material--flat" onClick={this.hideDialog}>{this.props.strings.CLOSE}</Button>
			</Dialog>
		);
	}
}



class NetworkAlert extends Component {
	props:{
		strings:LocalizedStringsType,
		show:boolean,
		onClose:()=>void
	};
	render() {
		return (
      <AlertDialog
        isOpen={this.props.show}
        isCancelable={false}>
        <div className='alert-dialog-title'>{this.props.strings.Alert}</div>
        <div className='alert-dialog-content'>{this.props.strings.NoInternetMessage}</div>
        <div className='alert-dialog-footer'>
          <button onClick={this.props.onClose} className='alert-dialog-button'>{this.props.strings.OK}</button>
        </div>
      </AlertDialog>
		);
	}
}


class PechaViewer extends Component {
	state:{
		images:Array<string>,
		photoIndex:number
	};
	props:{
		workId:string, 
		imageGroups:Array<ImageGroup>, 
		onGalleryClose:()=>void,
		startPhotoIndex:number,
		appState:AppState
	};
	/**
	 *	This function provides a workaround for legacy ImageGroup Ids that can be recognized by their lack of alphabetical characters other than the
	 *	initial character "I" - the ImageService 
	 * 
	 *	https://www.tbrc.org/xmldoc?rid=W12827
	 *	https://www.tbrc.org/xmldoc?rid=I2061
	 *	https://www.tbrc.org/browser/ImageService?work=W12827&igroup=2061&image=1&first=1&last=459&fetchimg=yes
	 * 
	 * @param  {[type]} ig:string [description]
	 * @return {[type]}           [description]
	 *
	normalizeIg(ig:string) {
		let s = ig;
		if(!s.match(/.+[A-Z]+.+/i)){
			s = s.substring(1);
		}		
		return s;
	}*/
	
	constructor(props:{workId:string, imageGroups:Array<ImageGroup>, onGalleryClose:()=>void, startPhotoIndex:number, appState:AppState}){
		super(props);
		let images = [];
		if(props.imageGroups){
			for(let x=0;x<props.imageGroups.length;x++){
				//let ig = this.normalizeIg(props.imageGroups[x].imageGroupId);
				let ig = props.imageGroups[x].imageGroupId;
				for(let i=props.imageGroups[x].start;i<=props.imageGroups[x].end;i++){
					images.push(this.props.appState.libraryServer.url+'/browser/ImageService?work='+props.workId+'&igroup='+ig+'&image='+i+'&first=1&last='+this.props.imageGroups[x].total+'&fetchimg=yes');
				}
				if(0==x){
					window.ga.trackEvent('DetailPage', 'GalleryView', this.props.workId+'-'+ig+'-'+props.imageGroups[x].start);
				}
			}
		}
		this.state = {
			images: images,
			photoIndex:props.startPhotoIndex 
		};
	}

	render(){	
		return (
			<Lightbox
        mainSrc={this.state.images[this.state.photoIndex]}
        nextSrc={this.state.images[(this.state.photoIndex + 1) % this.state.images.length]}
        prevSrc={this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length]}
        onCloseRequest={this.props.onGalleryClose}
        discourageDownloads={false}
        onMovePrevRequest={
        	() => {
        		let photoIndex = (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length;
        		this.setState({ photoIndex: photoIndex });
        	}
        }
        onMoveNextRequest={
        	() => {
        		let photoIndex = (this.state.photoIndex + 1) % this.state.images.length;
        		this.setState({photoIndex: photoIndex});
        		let image = this.state.images[photoIndex];
        		let ig_loc = image.indexOf('&igroup=');
        		let img_loc = image.indexOf('&image=');
        		let end_img_loc = image.indexOf('&first=');
        		let ig =  image.substring(ig_loc+8, img_loc);
        		let img =  image.substring(img_loc+7, end_img_loc);
        		window.ga.trackEvent('DetailPage', 'GalleryView', this.props.workId+'-'+ig+'-'+img);
      	  }
      	}
    	/>			
		);
	}
}


