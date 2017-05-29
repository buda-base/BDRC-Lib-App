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

import styles from './DetailPage.pcss';

class DetailPage extends Component {
	state: {
		record: Record
	};

	constructor(props:{databaseResult:DatabaseResult}) {
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
			if(this.props.databaseResult.isPerson) return <PersonDetail person={this.state.record}  />;
			else if(this.props.databaseResult.isWork) return <WorkDetail work={this.state.record} />;
			else if(this.props.databaseResult.isOutline) return <OutlineDetail outline={this.state.record} />;
			else return null;
		} else {
			return null;
		}
	}
}

class PersonDetail extends Component {	
	props:{
		person:any
	};
	render() {

		if(this.props.person) {
			return (
				<section>
					<Card modifier="material">

						<h4>Name</h4>
						{this.props.person.name?
							
							this.props.person.name.map((name)=><div>{name}</div>)
							:
							<div>no name</div>
						}

						{this.props.person.birth?
							<div><h4>Birth</h4><div>{this.props.person.birth}</div></div>
						:
						null}

						{this.props.person.death?
							<div><h4>Death</h4><div>{this.props.person.death}</div></div>
						:
						null}
						
						{this.props.person.creatorOf ?
							<div>
								<h4>Creator Of</h4>
								{this.props.person.creatorOf.map((creatorOf)=><div>{creatorOf}</div>)}
							</div>
						:
						null}

		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<Share subject={"A link to BDRC Author "+this.props.person.nodeId} url="http://bdrc" />		  	  			
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


// W4CZ45266

// https://www.tbrc.org/xmldoc?rid=W4CZ45266
// https://www.tbrc.org/xmldoc?rid=I4CZ45274

class WorkDetail extends Component {
	props:{
		work:any
	};

	render() {
		if(this.props.work) {
			return (
				<section>
					<Card modifier="material">			
						<h4>Status</h4>
						<div>{this.props.work.status?this.props.work.status:'unknown status'}</div>					
						
						<h4>Title</h4>
						{this.props.work.title?
							this.props.work.title.map((title)=><div>{title}</div>)
							:
							<div>no title</div>
						}

						<h4>Creator</h4>
						{this.props.work.hasCreator?
							this.props.work.hasCreator.map((creator)=><div>{creator}</div>)
							:
							<div>no creator</div>
						}

						{this.props.work.archiveInfo_vols?
							<div><h4>Volumes</h4><div>{this.props.work.archiveInfo_vols}</div></div>
						:
						null}
						
		    		<div className="action-bar">
		    			<div className="actions"> 
		    				<Share subject={"A link to BDRC work "+this.props.work.nodeId} url="http://bdrc" />		  	  			
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
	
	constructor(props:{subject:string, url:string}) {
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
			return (<button onClick={() => { window.location=href;}} className="button button--material--flat firstCardAction">SHARE</button>)
		} else {
			return (<button onClick={this.share} className="button button--material--flat firstCardAction">SHARE</button>);
		}
	}
	
}


class OutlineDetail extends Component {
	
	render() {
		return null;
	}	
}



export default DetailPage;