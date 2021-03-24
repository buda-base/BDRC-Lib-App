import * as ons from "onsenui";

declare var document:any;

import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Database from './data/Database';
import AppState from './data/AppState';
import { SearchResults } from './SearchResults'; 
import { ILocalizedStrings } from './data/LocalizedStrings';

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
	@observable searchInputFocused:boolean = false;

	// handleSearch = () => {
	// 	this.props.db.search(this.query);
	// }

	handleQueryChange = (e:any) => {		
		let query = e.currentTarget.value;
		this.props.db.search(query);
		this.query = query;
	}

	render(){
		return (
			<div>
				<input

					id="SearchInput" 
					onFocus={()=>{ this.searchInputFocused = true;}}
					onBlur={()=>{ this.searchInputFocused = false; }}
					onChange={this.handleQueryChange}
					type="search"
					value={this.query}
					placeholder={this.searchInputFocused?'':this.props.strings.searchHintText} 
					className={`search-input search-input--material pasteArea ${this.searchInputFocused?'focused':''}`} 
					style={{width: '100%', userSelect:'all'}}
					onClick={(e)=>{
						document.getElementById("SearchInput").focus();
					}}
				/>
				<SearchResults strings={this.props.strings} db={this.props.db} appState={this.props.appState} />
			</div>
		);
	}
}


