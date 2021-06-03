declare var window:any;

import * as React from 'react';
import {observer} from 'mobx-react';
import Database from './data/Database';
import AppState from './data/AppState';
import {ILocalizedStrings} from './data/LocalizedStrings';
import {PersonDetail} from './DetailPageComponents/PersonDetail';
import {WorkDetail} from './DetailPageComponents/WorkDetail';
import {WorkPartDetail} from './DetailPageComponents/WorkPartDetail';
import { DatabaseResult } from './data/DatabaseResult';

import './DetailPage.pcss';

interface P_DetailPage {
	db:Database;
	databaseResult:DatabaseResult;
	strings:ILocalizedStrings;
	appState:AppState;
	files:{
		work?:any;
		workPart?:any;
		person?:any;
		workPartItem?:any;
	};
}

@observer
export class DetailPage extends React.Component<P_DetailPage> {

	constructor(props:P_DetailPage) {
		super(props);
		if(props.databaseResult) {
			window.ga.trackEvent('DetailPage', 'Load', props.databaseResult.nodeId);
		} else {
			window.ga.trackEvent('DetailPage', 'Load', props.files.workPartItem.id);
		}
	}
	
	viewRelatedRecord = (databaseResult:DatabaseResult) => {
		this.props.appState.navigateTo(databaseResult);
	}

	render() {
		console.log('render DetailPage');
		console.log(this.props);
		if(this.props.databaseResult) {
			if(this.props.files.person) {
				console.log(' person');
				return (
					<PersonDetail
						db={this.props.db}
						strings={this.props.strings}
						person={this.props.files.person}
						viewRelatedRecord={this.viewRelatedRecord}
						appState={this.props.appState}
					/>);
			} else if(this.props.files.work) {
				console.log(' work');
				return (
					<WorkDetail
						db={this.props.db}
						strings={this.props.strings}
						work={this.props.files.work}
						viewRelatedRecord={this.viewRelatedRecord}
						appState={this.props.appState}
					/>);
			} else if(this.props.files.workPart) {
				console.log(' workPart');
				return (
					<WorkPartDetail
						db={this.props.db}
						strings={this.props.strings}
						workPart={this.props.files.workPart}
						viewRelatedRecord={this.viewRelatedRecord}
						appState={this.props.appState}
					/>);
			} else {
				console.log(' null #1');
				return null;
			}
		} else if(this.props.files.workPartItem) {
			console.log(' workPartItem');

			return (
				<WorkPartDetail
					db={this.props.db}
					strings={this.props.strings}
					workPartItem={this.props.files.workPartItem}
					viewRelatedRecord={this.viewRelatedRecord}
					appState={this.props.appState}
				/>);
		} else {
			console.log(' null #2');

			return null;
		}
	}
}









