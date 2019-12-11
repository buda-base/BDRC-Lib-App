
declare var cordova: any;

import React, {Component} from 'react';
import Spinner from 'react-spinkit';	// https://github.com/KyleAMathews/react-spinkit
import Waypoint from 'react-waypoint'; // https://brigade.github.io/react-waypoint/
import {Page, Button, Input, Icon, ListItem, List} from 'react-onsenui';
import {observer} from 'mobx-react';

import Database, {DatabaseResult} from './Database';
import AppState from './AppState';
import type {Route} from './TypeAliases';
import {LocalizedStringsType} from './LocalizedStrings';

import style from './SearchResults.pcss';

@observer
class SearchResults extends Component {
	state: {
		searchResults: Array<DatabaseResult>,
		searchString: string,
		moreResultsAvailable: boolean
	}

	constructor(props:{ db:Database, strings:LocalizedStringsType, appState:AppState}){
		super(props);
		let moreResultsAvailable = props.db.moreResultsAvailable();
		this.state = {
			searchResults: props.db.searchResults,
			searchString: props.db.searchString,
			moreResultsAvailable: moreResultsAvailable
		};
	}

	componentDidMount(){
		this.props.db.addChangeListener(this.updateSearchResults);
	}

	componentWillUnmount() {
		this.props.db.removeChangeListener(this.updateSearchResults);		
	}

	updateSearchResults = () => {
		let moreResultsAvailable = this.props.db.moreResultsAvailable();
		this.setState({searchResults: this.props.db.searchResults, searchString:this.props.db.searchString, moreResultsAvailable:moreResultsAvailable});
	}

	selectSearchResult = (databaseResult:DatabaseResult) => {
		this.props.appState.navigateTo(databaseResult);
	}
	handleWaypointLeave(){

	}
	handleWaypointEnter = () => {
		if(this.state.moreResultsAvailable){
			// wait 1/4 of a second before dispatching the request
			// (UI effect, not a technical requirement)
			setTimeout(()=> {
				this.props.db.loadMoreResults();
			}, 250);
		}
	}
	render(){
		if(this.props.appState.searchStringIsValid) {
			let totalFoundResults = this.props.db.totalFoundResults();
			let stillSearching = (0!=this.props.appState.searchCount);
			return (
				<div className="search-results">
					{stillSearching?null:<div className="status">{this.props.strings.resultsFoundPre}{this.props.strings.displayNum(totalFoundResults)}{this.props.strings.resultsFoundPost}</div>}
					<ul className="list list--material">
					<BubbleWrapper show={stillSearching} />
					{this.state.searchResults.map((item:DatabaseResult)=><SearchResult key={item.id} item={item} selectItem={this.selectSearchResult} />)}
					</ul>

						<Waypoint
						  onEnter={this.handleWaypointEnter}
						  onLeave={this.handleWaypointLeave}
						/>
						<BubbleWrapper show={this.state.moreResultsAvailable} />

				</div>
			);
		} else {
			let helpTextStyle = {
			    lineHeight: '28px', 
			    padding:'32px 16px 0px 16px'
			};
			return (
				<div className="search-results">
					{/*<div className="status">{this.props.strings.searchRequirementText}</div>*/}
					{this.state.searchString?null:
						<div style={helpTextStyle}>
							{this.props.strings.searchHelpText}
						</div>
					}
				</div>
			);
		}
	}
}


class SearchResult extends Component {
	constructor(props: {item:DatabaseResult, selectItem:(DatabaseResult)=>{}}){
		super(props);
	}

	handleSelect = (e) => {
		this.props.selectItem(this.props.item);
	}

	render(){
		let icon = null;
		// let subtitle = null;

		if(this.props.item.type==='Person'){
			icon = <Icon icon="md-account-circle" modifier="material" size={{default: 40, material: 36}}/>;
		} else if(this.props.item.type==='Work'){
			icon = <Icon icon="md-collection-text" modifier="material" size={{default: 40, material: 36}}/>;
		} else {
			icon = <Icon icon="md-file-text" modifier="material" size={{default: 40, material: 36}} style={{marginLeft: '4px'}} />;
			// subtitle = this.props.item.workTitleForOutline();
		}

		return (
		  <li className="list-item list-item--material" onTouchTap={this.handleSelect}>
		    <div className="list-item__left list-item--material__left">
					{icon}
		    </div>
		    <div className="list-item__center list-item--material__center">
		      <div className="list-item__title list-item--material__title title" style={{lineHeight:'36px'}}>{this.props.item.title}</div>
		      {/*null!=subtitle?<div className="list-item__subtitle list-item--material__subtitle">{subtitle}</div>:null*/}
		      {/*<div className="list-item__subtitle list-item--material__subtitle">{this.props.item.nodeId}</div>*/}
		    </div>
		  </li>
		);
	}
}



class BubbleWrapper extends Component {
	render(){
		if(this.props.show){
			return (
				<div className="bubbleWrapper">
					<Spinner name="three-bounce" fadeIn="none" />
				</div>
			);
		} else {
			return <span></span>;
		}
	}	
}



export default SearchResults;