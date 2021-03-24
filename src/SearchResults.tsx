import * as React from 'react';
import { Waypoint } from 'react-waypoint'; // https://brigade.github.io/react-waypoint/
import { observer } from 'mobx-react';
import Database from './data/Database';
import AppState from './data/AppState';
import { ILocalizedStrings } from './data/LocalizedStrings';
import { observable } from 'mobx';

import './SearchResults.pcss';
import { DatabaseResult } from './data/DatabaseResult';
import { BubbleWrapper } from './SearchPageComponents/BubbleWrapper';
import { SearchResult } from './SearchPageComponents/SearchResult';

interface P_SearchResults { 
	db:Database; 
	strings:ILocalizedStrings;
	appState:AppState;
}

@observer
export class SearchResults extends React.Component<P_SearchResults> {
	@observable searchResults: Array<DatabaseResult> = [];
	@observable searchString: string;
	@observable moreResultsAvailable: boolean;

	constructor(props:P_SearchResults){
		super(props);

		// TODO: document the reasoning behind this ordering 
		const moreResultsAvailable = props.db.moreResultsAvailable();
		this.searchResults = props.db.searchResults;
		this.searchString = props.db.searchString;
		this.moreResultsAvailable = moreResultsAvailable;
	}

	componentDidMount(){
		this.props.db.addChangeListener(this.updateSearchResults);
	}

	componentWillUnmount() {
		this.props.db.removeChangeListener(this.updateSearchResults);		
	}

	updateSearchResults = () => {
		let moreResultsAvailable = this.props.db.moreResultsAvailable();
		this.searchResults = this.props.db.searchResults;
		this.searchString = this.props.db.searchString;
		this.moreResultsAvailable = moreResultsAvailable;
	}

	selectSearchResult = (databaseResult:DatabaseResult) => {
		this.props.appState.navigateTo(databaseResult);
	}
	handleWaypointLeave(){

	}
	handleWaypointEnter = () => {
		if(this.moreResultsAvailable){
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
					{this.searchResults.map((item:DatabaseResult)=><SearchResult key={item.id} item={item} selectItem={this.selectSearchResult} />)}
					</ul>

						<Waypoint
						  onEnter={this.handleWaypointEnter}
						  onLeave={this.handleWaypointLeave}
						/>
						<BubbleWrapper show={this.moreResultsAvailable} />

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
					{this.searchString?null:
						<div style={helpTextStyle}>
							{this.props.strings.searchHelpText}
						</div>
					}
				</div>
			);
		}
	}
}
