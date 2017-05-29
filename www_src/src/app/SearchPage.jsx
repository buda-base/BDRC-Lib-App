// @flow
declare var cordova: any;

import React, {Component} from 'react';

import Database from './Database.js';
import SearchResults from './SearchResults.jsx'; 
import type {LocalizedStringsType} from './LocalizedStrings.js';

import style from './SearchPage.pcss';

class SearchPage extends Component {
	// props: {
 //    db: Database
 //  };

  state: {
  	query: string,
  	queryIsValid: boolean
  }

	constructor(props:{db:Database, navigateTo:()=>{}, strings:LocalizedStringsType}) {
		super(props);
		this.state = {
			query:'',
			queryIsValid: false
		};				
	}

	handleSearch = (e:Event) => {
		this.props.db.search(this.state.query);
	}

	handleQueryChange = (e:Event & { currentTarget: HTMLInputElement }) => {		
		let state = this.state;
		state.query = e.currentTarget.value;
		this.props.db.search(state.query);
		this.setState(state);		
	}


	render(){

		return (
			<section>
				<input onChange={this.handleQueryChange} type="search" value={this.state.query} placeholder={this.props.strings.searchHintText} className="search-input search-input--material" style={{width: '100%'}} />
				<SearchResults strings={this.props.strings} db={this.props.db} searchQuery={this.state.query} navigateTo={this.props.navigateTo}/>
			</section>
		);
	}
}


export default SearchPage;