// @flow
declare var cordova: any;

import React, {Component} from 'react';
import Spinner from 'react-spinkit';	// https://github.com/KyleAMathews/react-spinkit
import Waypoint from 'react-waypoint'; // https://brigade.github.io/react-waypoint/
import {Page, Button, Input, Icon, ListItem, List} from 'react-onsenui';

import Database, {DatabaseResult} from './Database.js';
import type {Route} from './TypeAliases.js';
import type {LocalizedStringsType} from './LocalizedStrings.js';

import style from './SearchResults.pcss';

class SearchResults extends Component {
	state: {
		searchResults: Array<DatabaseResult>,
		searchString: string,
		searchStringIsValid: boolean,
		moreResultsAvailable: boolean
	}

	constructor(props:{ db: Database, navigateTo:(DatabaseResult)=>void, strings:LocalizedStringsType}){
		super(props);
		let moreResultsAvailable = props.db.moreResultsAvailable();
		this.state = {
			searchResults: props.db.searchResults,
			searchString: props.db.searchString,
			searchStringIsValid: props.db.searchStringIsValid,
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
		this.setState({searchResults: this.props.db.searchResults, searchString:this.props.db.searchString, searchStringIsValid: this.props.db.searchStringIsValid, moreResultsAvailable:moreResultsAvailable});
	}

	selectSearchResult = (databaseResult:DatabaseResult) => {
		// this.props.db.setSelectedDatabaseResult(databaseResult);
		this.props.navigateTo(databaseResult);
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
		if(this.state.searchStringIsValid) {
			let totalFoundResults = this.props.db.totalFoundResults();
			return (
				<div className="search-results">
					<div className="status">{this.props.strings.resultsFoundPre}{this.props.strings.displayNum(totalFoundResults)}{this.props.strings.resultsFoundPost}</div>
					<ul className="list list--material">

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
			return (
				<div className="search-results">
					<div className="status">{this.props.strings.searchRequirementText}</div>
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
		let subtitle = null;

		if(this.props.item.type==='Person'){
			icon = <Icon icon="md-account-circle" modifier="material" size={{default: 40, material: 36}}/>;
		} else if(this.props.item.type==='Work'){
			icon = <Icon icon="md-collection-text" modifier="material" size={{default: 40, material: 36}}/>;
		} else {
			icon = <Icon icon="md-file-text" modifier="material" size={{default: 40, material: 36}} style={{marginLeft: '4px'}} />;
			subtitle = this.props.item.workTitleForOutline();
		}

		return (
		  <li className="list-item list-item--material" onTouchTap={this.handleSelect}>
		    <div className="list-item__left list-item--material__left">
					{icon}
		    </div>
		    <div className="list-item__center list-item--material__center">
		      <div className="list-item__title list-item--material__title title" style={{lineHeight:'30px'}}>{this.props.item.title}</div>
		      {subtitle?<div className="list-item__subtitle list-item--material__subtitle">{subtitle}</div>:null}
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