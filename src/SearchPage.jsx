
declare var cordova: any;

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import Database, {DatabaseResult} from './Database';
import AppState from './AppState.jsx';
import SearchResults from './SearchResults.jsx'; 
import {LocalizedStringsType} from './LocalizedStrings';

import style from './SearchPage.pcss';

@observer
export default class SearchPage extends Component {

  @observable query:string;
  @observable queryIsValid:boolean;

	constructor(props:{db:Database, strings:LocalizedStringsType, appState:AppState}) {
		super(props);
		this.query = '';
		this.queryIsValid = false;
	}

	handleSearch = (e:Event) => {
		this.props.db.search(this.query);
	}

	handleQueryChange = (e:Event & { currentTarget: HTMLInputElement }) => {		
		let query = e.currentTarget.value;
		this.props.db.search(query);
		this.query = query;
	}

	render(){
		return (
			<div>
				<input id="SearchInput" onChange={this.handleQueryChange} type="search" value={this.query} placeholder={this.props.strings.searchHintText} className="search-input search-input--material pasteArea" style={{width: '100%'}} />
				<SearchResults strings={this.props.strings} db={this.props.db} searchQuery={this.query} appState={this.props.appState} />
			</div>
		);
	}
}


