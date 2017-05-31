// @flow
declare var cordova: any;
declare var device: any;

import React, {Component} from 'react';
import $ from 'jquery';
import {Card} from 'react-onsenui';
import Database, {DatabaseResult} from './Database.js';
import {Work, Person, Outline, Volume} from './Records.js';
import type {ImageGroup} from './TypeAliases.js';
import FileUtil from './FileUtil.js'
import Lightbox from 'react-image-lightbox';


import type {Record} from './Records.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './DetailPage.pcss';

class DetailPage extends Component {
	state: {
		work: Work|null,
		person: Person|null,
		outline: Outline|null
	};

	constructor(props:{db:Database, databaseResult:DatabaseResult, strings:LocalizedStringsType, navigateTo:(databaseResult:DatabaseResult)=>void}) {
		super(props);		
		let filePath = props.databaseResult.type.toLowerCase()+'s/'+props.databaseResult.nodeId+'.json';		
		this.state = {
			work:null,
			person:null,
			outline:null
		};
		props.databaseResult.load(this.receiveObject);
	}

	receiveObject = (record:any) => {
		if(this.props.databaseResult.isWork){
			this.setState({work:record});
		} else if(this.props.databaseResult.isPerson){
			this.setState({person:record});
		} else if(this.props.databaseResult.isOutline){
			this.setState({outline:record});
		}
	}

	viewRelatedRecord = (databaseResult:DatabaseResult) => {
		this.props.navigateTo(databaseResult);
	}

	render() {
		if(this.props.databaseResult) {
			if(this.state.person) return <PersonDetail db={this.props.db} strings={this.props.strings} person={this.state.person} viewRelatedRecord={this.viewRelatedRecord} />;
			else if(this.state.work) return <WorkDetail db={this.props.db} strings={this.props.strings} work={this.state.work} viewRelatedRecord={this.viewRelatedRecord} />;
			else if(this.state.outline) return <OutlineDetail db={this.props.db} strings={this.props.strings} outline={this.state.outline} viewRelatedRecord={this.viewRelatedRecord} />;
			else return null;
		} else {
			return null;
		}
	}
}

class PersonDetail extends Component {	
	state: {
		authoredWorks: Array<DatabaseResult>
	};
	props:{
		person:Person|null,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void
	};

	constructor(props:{db:Database, person:any, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void}) {
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

			let shareLink = "https://www.tbrc.org/#!rid="+this.props.person.nodeId;
			let shareSubject = "A link to BDRC Author "+this.props.person.nodeId;

			return (
				<section>
					<Card modifier="material">
						<StringSection title={this.props.strings.Name} vals={this.props.person.name} />
						<StringSection title={this.props.strings.Birth} val={this.props.person.birth} />
						<StringSection title={this.props.strings.Death} val={this.props.person.death} />
						<RelatedRecordSection title={this.props.strings.CreatorOf} relatedRecords={this.state.authoredWorks} viewRelatedRecord={this.props.viewRelatedRecord}/>
		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} />		  	  			
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


class WorkDetail extends Component {
	props:{
		work:Work|null,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void
	};

	state: {
		authors: Array<DatabaseResult>
	};


	constructor(props:{db:Database, work:Work|null, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void}) {
		super(props);		
		this.state = {
			authors: []
		};
	}

	componentWillMount(){
		if(this.props.work && this.props.work.hasCreator && this.props.work.hasCreator.length>0){ 
			this.props.db.searchForMatchingNodes(this.props.work.hasCreator, this.receiveAuthors);
		}	
	}

	receiveAuthors = (authors:Array<DatabaseResult>) => {
		this.setState({authors:authors});
	}

	render() {
		if(this.props.work) {

			let shareLink = "https://www.tbrc.org/#!rid="+this.props.work.nodeId;
			let shareSubject = "A link to BDRC work "+this.props.work.nodeId;

			let vols = null;
			if(this.props.work.archiveInfo_vols) {
				try {
					vols = this.props.strings.displayNum(parseInt(this.props.work.archiveInfo_vols));
				} catch(error){ }
			}

			return (
				<section>
					<Card modifier="material">
						<StringSection title={this.props.strings.Status} val={this.props.work.status} />
						<StringSection title={this.props.strings.Title} vals={this.props.work.title} />
						<RelatedRecordSection title={this.props.strings.Creator} relatedRecords={this.state.authors} viewRelatedRecord={this.props.viewRelatedRecord}/>
		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} />		  	  			
		  	  		</div>
			    	</div>
					</Card>					

					<VolumeMap workId={this.props.work.nodeId} volumeMap={this.props.work.volumeMap} strings={this.props.strings} />

				</section>				
			);
		} else {
			return null;
		}
	}	
}


class VolumeMap extends Component {
	props:{
		volumeMap:Array<Volume>,
		strings:LocalizedStringsType,
		workId:string
	};
	render(){
		if(this.props.volumeMap) {
			return (
				<div>
					{this.props.volumeMap.map((volume)=><VolumeCard key={volume.id} workId={this.props.workId} volume={volume} strings={this.props.strings} />)}
				</div>
			);
		} else {
			return null;
		}
	}
}


class VolumeCard extends Component {
	props:{
		volume:Volume,
		strings:LocalizedStringsType,
		workId:string
	};
	state:{
		pechaViewerOpen:boolean
	}
	constructor(props){
		super(props);
		this.state = {
			pechaViewerOpen:false
		}
	}

	onGalleryClose = () =>{
		this.setState({pechaViewerOpen:false});
	}

	onViewButtonClicked = () =>{
		this.setState({pechaViewerOpen:true});
	}

	render(){

		let imageGroup = {
			imageGroupId: this.props.volume.id,
			total:this.props.volume.total,
			start:1,
			end:this.props.volume.total
		};

		return (
				<Card modifier="material">
					
					<div>{this.props.strings.Volume} {this.props.strings.displayNum(this.props.volume.num)}, {this.props.strings.displayNum(this.props.volume.total)} {this.props.strings.pages}</div>

					{/*<div>{this.props.strings.viewWarning}</div>*/}

	    		<div className="action-bar">
	    			<div className="actions"> 
	    				<ViewButton strings={this.props.strings} volume={this.props.volume} handleViewButtonClicked={this.onViewButtonClicked}/>	  			
	  	  		</div>
		    	</div>
					
					{this.state.pechaViewerOpen?<PechaViewer workId={this.props.workId} imageGroups={[imageGroup]} onGalleryClose={this.onGalleryClose} />:null}

				</Card>
		);
	}
}



class PechaViewer extends Component {
	state:{
		images:Array<string>,
		photoIndex:number
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
	 */
	normalizeIg(ig:string) {
		let s = ig;
		if(!s.match(/.+[A-Z]+.+/i)){
			s = s.substring(1);
		}		
		return s;
	}

	constructor(props:{workId:string, imageGroups:Array<ImageGroup>, onGalleryClose:()=>void}){
		super(props);
		let images = [];
		if(props.imageGroups){
			for(let x=0;x<props.imageGroups.length;x++){
				let ig = this.normalizeIg(props.imageGroups[x].imageGroupId);
				console.log( ig );
				for(let i=props.imageGroups[x].start;i<=props.imageGroups[x].end;i++){
					images.push('https://www.tbrc.org/browser/ImageService?work='+props.workId+'&igroup='+ig+'&image='+i+'&first=1&last='+this.props.imageGroups[x].total+'&fetchimg=yes');
				}
			}
		}
		this.state = {
			images: images,
			photoIndex:0
		};
	}

	render(){	
		return (
			<Lightbox
        mainSrc={this.state.images[this.state.photoIndex]}
        nextSrc={this.state.images[(this.state.photoIndex + 1) % this.state.images.length]}
        prevSrc={this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length]}
        onCloseRequest={this.props.onGalleryClose}
        onMovePrevRequest={() => this.setState({
        	photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
        })}
        onMoveNextRequest={() => this.setState({
        	photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
        })}
    	/>			
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
class OutlineDetail extends Component {
	state:{
		imageGroups: Array<ImageGroup>,
		work: Work|null,
		pechaViewerOpen:boolean	
	};
	props:{
		outline:Outline,
		strings:LocalizedStringsType,
		db:Database, 
		viewRelatedRecord:(record:DatabaseResult)=>void
	};

	constructor(props:{db:Database, outline:Outline, strings:LocalizedStringsType, viewRelatedRecord:(record:DatabaseResult)=>void} ) {
		super(props);
		this.state = {
			work: null,
			imageGroups:[],
			pechaViewerOpen:false
		};
	}

	componentWillMount(){
		if(this.props.outline && this.props.outline.isOutlineOf){ 
			this.props.db.searchForMatchingNodes([this.props.outline.isOutlineOf], this.receiveWorks);
		}	
	}

	receiveWorks = (works:Array<DatabaseResult>) => {
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
									end:v===this.props.outline.volumeEnd?endsAt:work.volumeMap[i].total
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
								end:endsAt<work.volumeMap[i].total?endsAt:work.volumeMap[i].total
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

	onViewButtonClicked = () =>{
		this.setState({pechaViewerOpen:true});
	}

	render() {

		if(this.props.outline) {

			let shareLink = "https://www.tbrc.org/#!rid="+this.props.outline.outlineNodeId;
			let shareSubject = "A link to BDRC text "+this.props.outline.outlineNodeId;

			return (
				<section>
					<Card modifier="material">
						<StringSection title={this.props.strings.Title} vals={this.props.outline.title} />
						<StringSection title={this.props.strings.IsOutlineOf} val={this.state.work?this.state.work.title:''} />

		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<ShareButton strings={this.props.strings} subject={shareSubject} url={shareLink} />		  	  			
		    				<ViewButton strings={this.props.strings} handleViewButtonClicked={this.onViewButtonClicked}/>	
		  	  		</div>
			    	</div>
						
						{this.state.pechaViewerOpen?<PechaViewer workId={this.state.work?this.state.work.nodeId:null} imageGroups={this.state.imageGroups} onGalleryClose={this.onGalleryClose} />:null}

					</Card>					


				</section>				
			);
		} else {
			return null;
		}
	}
}




class ViewButton  extends Component {
	constructor(props:{strings:LocalizedStringsType, handleViewButtonClicked:()=>void}) {
		super(props)
	}
	render(){
		return <button onClick={this.props.handleViewButtonClicked} className="button button--material--flat firstCardAction">{this.props.strings.VIEW}</button>;
	}	
}


class ShareButton extends Component {
	
	constructor(props:{subject:string, url:string, strings:LocalizedStringsType}) {
		super(props)
	}
	
	share = () =>{
		let options = {
			subject: this.props.subject,
			url:this.props.url 			
		};
		window.plugins.socialsharing.shareWithOptions(
			options, 
			(success)=>{console.log(success);}, 
			(error)=>{console.log(error);}
		);
	}

	render(){
		if('browser'===device.platform){
			let href = 'mailto:?subject='+encodeURIComponent(this.props.subject)+'&body='+encodeURIComponent(this.props.url);
			return (<button onClick={() => { window.location=href;}} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>)
		} else {
			return (<button onClick={this.share} className="button button--material--flat firstCardAction">{this.props.strings.SHARE}</button>);
		}
	}	
}


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


class RelatedRecordSection extends Component {
	props: {
		relatedRecords:Array<DatabaseResult>,
		title:string,
		viewRelatedRecord:(record:DatabaseResult)=>void
	};
	render(){
		if(this.props.relatedRecords) {
			return(
				<div>
					<h4>{this.props.title}</h4>
					{this.props.relatedRecords.map((record)=><RelatedRecordLink key={record.id} record={record} viewRelatedRecord={this.props.viewRelatedRecord} />)}
				</div>
			);
		} else {
			return null;
		}
	}
}


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


export default DetailPage;