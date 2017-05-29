// @flow
declare var cordova: any;
declare var device: any;

import React, {Component} from 'react';
import $ from 'jquery';
import {Card} from 'react-onsenui';
import {DatabaseResult} from './Database.js';
import {Work, Person, Outline} from './Records.js';
import FileUtil from './FileUtil.js'

import type {Record} from './Records.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import styles from './DetailPage.pcss';

class DetailPage extends Component {
	state: {
		record: Record
	};

	constructor(props:{databaseResult:DatabaseResult, strings:LocalizedStringsType}) {
		super(props);		
		let filePath = props.databaseResult.type.toLowerCase()+'s/'+props.databaseResult.nodeId+'.json';		
		this.state = {
			record: null
		};
		props.databaseResult.load(this.receiveObject);
	}

	receiveObject = (record:Record) => {
		this.setState({record:record});
	}

	render() {
		if(this.props.databaseResult && null!=this.state.record) {
			if(this.props.databaseResult.isPerson) return <PersonDetail strings={this.props.strings} person={this.state.record}  />;
			else if(this.props.databaseResult.isWork) return <WorkDetail strings={this.props.strings} work={this.state.record} />;
			else if(this.props.databaseResult.isOutline) return <OutlineDetail strings={this.props.strings} outline={this.state.record} />;
			else return null;
		} else {
			return null;
		}
	}
}

class PersonDetail extends Component {	
	props:{
		person:any,
		strings:LocalizedStringsType
	};
	render() {

		if(this.props.person) {

			let shareLink = "https://www.tbrc.org/#!rid="+this.props.person.nodeId;
			let shareSubject = "A link to BDRC Author "+this.props.person.nodeId;

			return (
				<section>
					<Card modifier="material">

						{this.props.person.name?
							<div>
								<h4>{this.props.strings.Name}</h4>
								{this.props.person.name.map((name)=><div>{name}</div>)}
							</div>
						:
						null}

						{this.props.person.birth?
							<div><h4>{this.props.strings.Birth}</h4><div>{this.props.person.birth}</div></div>
						:
						null}

						{this.props.person.death?
							<div><h4>{this.props.strings.Death}</h4><div>{this.props.person.death}</div></div>
						:
						null}
						
						{this.props.person.creatorOf ?
							<div>
								<h4>{this.props.strings.CreatorOf}</h4>
								{this.props.person.creatorOf.map((creatorOf)=><div>{creatorOf}</div>)}
							</div>
						:
						null}

		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<Share strings={this.props.strings} subject={shareSubject} url={shareLink} />		  	  			
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
		work:any,
		strings:LocalizedStringsType
	};

	render() {
		if(this.props.work) {

			let shareLink = "https://www.tbrc.org/#!rid="+this.props.work.nodeId;
			let shareSubject = "A link to BDRC work "+this.props.work.nodeId;

			return (
				<section>
					<Card modifier="material">

						{this.props.work.status?
							<div>
								<h4>{this.props.strings.Status}</h4>
								<div>{this.props.strings.displayStatus(this.props.work.status)}</div>					
							</div>
						:
						null}

						{this.props.work.title?
							<div>
								<h4>{this.props.strings.Title}</h4>
								{this.props.work.title.map((title)=><div>{title}</div>)}
							</div>
						:
						null}

						{this.props.work.hasCreator?
							<div>
								<h4>{this.props.strings.Creator}</h4>
								{this.props.work.hasCreator.map((creator)=><div>{creator}</div>)}
							</div>
						:
						null}

						{this.props.work.archiveInfo_vols?
							<div><h4>{this.props.strings.Volumes}</h4><div>{this.props.strings.displayNum(this.props.work.archiveInfo_vols)}</div></div>
						:
						null}
						
		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<Share strings={this.props.strings} subject={shareSubject} url={shareLink} />		  	  			
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


class Share extends Component {
	
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


class OutlineDetail extends Component {
	
	render() {
		return null;
	}	
}



export default DetailPage;