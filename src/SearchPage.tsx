import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Database from './Database';
import AppState from './AppState.js';
import { SearchResults } from './SearchResults.js'; 
import { ILocalizedStrings } from './LocalizedStrings';

import './SearchPage.pcss';

interface P_SearchPage {
	appState:AppState;
	db:Database;
	strings:ILocalizedStrings;
}

@observer
export class SearchPage extends React.Component<P_SearchPage> {
  @observable query:string = '';
  @observable queryIsValid:boolean = false;

	handleSearch = (e:Event) => {
		this.props.db.search(this.query);
	}

	handleQueryChange = (e:any) => {		
		let query = e.currentTarget.value;
		this.props.db.search(query);
		this.query = query;
	}

	render(){
		return (
			<div>
				<input id="SearchInput" onChange={this.handleQueryChange} type="search" value={this.query} placeholder={this.props.strings.searchHintText} className="search-input search-input--material pasteArea" style={{width: '100%'}} />
				<SearchResults strings={this.props.strings} db={this.props.db} appState={this.props.appState} />
			</div>
		);
	}
}


