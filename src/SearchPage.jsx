// @flow
declare var cordova: any;

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import Database, {DatabaseResult} from './Database.js';
import SearchResults from './SearchResults.jsx'; 
import type {LocalizedStringsType} from './LocalizedStrings.js';

import style from './SearchPage.pcss';

@observer
export default class SearchPage extends Component {

  // state: {
  // 	query: string,
  // 	queryIsValid: boolean
  // }

  @observable query:string;
  @observable queryIsValid:boolean;

	constructor(props:{db:Database, navigateTo:(databaseResult:DatabaseResult)=>void, strings:LocalizedStringsType}) {
		super(props);
		// this.state = {
		// 	query:'',
		// 	queryIsValid: false
		// };				
		this.query = '';
		this.queryIsValid = false;
	}

	handleSearch = (e:Event) => {
		this.props.db.search(this.query);
	}

	handleQueryChange = (e:Event & { currentTarget: HTMLInputElement }) => {		
		// let state = this.state;
		// state.query = e.currentTarget.value;
		let query = e.currentTarget.value;
		this.props.db.search(query);
		this.query = query;
		//this.setState(state);		
	}


	render(){

		return (
			<div>
				<input id="SearchInput" onChange={this.handleQueryChange} type="search" value={this.query} placeholder={this.props.strings.searchHintText} className="search-input search-input--material pasteArea" style={{width: '100%'}} />
				<SearchResults strings={this.props.strings} db={this.props.db} searchQuery={this.query} navigateTo={this.props.navigateTo}/>
			</div>
		);
	}
}


