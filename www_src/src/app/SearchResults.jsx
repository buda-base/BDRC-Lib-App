// @flow
declare var cordova: any;

import React, {Component} from 'react';
import Spinner from 'react-spinkit';	// https://github.com/KyleAMathews/react-spinkit
import Waypoint from 'react-waypoint'; // https://brigade.github.io/react-waypoint/

//import ReactDOM from 'react-dom';
import {Page, Button, Input, Icon, ListItem, List} from 'react-onsenui';
//import ons from 'onsenui';

import Database, {DatabaseResult} from './Database.js';
import {detailRoute} from './Top.jsx'; 
import type {Route} from './TypeAliases.js';

import style from './SearchResults.pcss';

class SearchResults extends Component {
	// props:{ db: Database, searchValue: string, qualifiedSearchValue: boolean };
	state: {
		searchResults: Array<DatabaseResult>,
		searchString: string,
		searchStringIsValid: boolean,
		moreResultsAvailable: boolean
	}

	constructor(props:{ db: Database, navigateTo:(Route)=>{} }){
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
		this.props.db.setSelectedDatabaseResult(databaseResult);
		this.props.navigateTo(detailRoute);
	}
	handleWaypointLeave(){

	}
	handleWaypointEnter = () => {
		if(this.state.moreResultsAvailable){
			// wait 1/4 of a second before dispatching the request
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
					<div className="status">{this.state.searchString} returned {totalFoundResults} result{totalFoundResults==1?'':'s'}</div>
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
					<div className="status">Two syllables are required for a search.</div>
				</div>
			);
		}
	}
}


class BubbleWrapper extends Component {
	render(){
		if(this.props.show){
			return (
				<div className="bubbleWrapper">
					<Spinner spinnerName="three-bounce" noFadeIn />
				</div>
			);
		} else {
			return <span></span>;
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
		let icon = this.props.item.type==='Person'? <Icon icon="md-account-circle" modifier="material" size={{default: 40, material: 36}}/> : <Icon icon="md-collection-text" modifier="material" size={{default: 40, material: 36}}/> ;
		let status = "fa-battery-"+(Math.floor(Math.random() * (3 - 0 + 1)) + 0);
		let statusIcon = this.props.item.type==='Person'? null : <Icon icon={status} />;

		return (
		  <li className="list-item list-item--material" onTouchTap={this.handleSelect}>
		    <div className="list-item__left list-item--material__left">
					{icon}
		      {/*<img className="list-item__thumbnail list-item--material__thumbnail" src="http://placekitten.com/g/42/41" alt="Cute kitten" />*/}
		    </div>
		    <div className="list-item__center list-item--material__center">
		      <div className="list-item__title list-item--material__title title">{this.props.item.title}</div>
		      <div className="list-item__subtitle list-item--material__subtitle">{this.props.item.nodeId}</div>
		    </div>
		    <div className="list-item__right list-item--material__right">
		      {statusIcon}
		    </div>
		  </li>
		);
	}
}

  	/*
			<div className="card card--material">
    		<div className="card__content card--material__content">
    			{this.props.item.id} | 
    			{this.props.item.title} |  
    			{this.props.item.nodeId} <br/>
    		</div>
    		<div className="action-bar">
    			<div className="actions"> 
  	  			<button onClick={this.handleSelect} className="button button--material--flat">VIEW</button>
  	  		</div>
	    	</div>
  		</div>
  	*/



export default SearchResults;