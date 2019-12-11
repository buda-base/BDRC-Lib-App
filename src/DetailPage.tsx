
declare var window:any;

import * as React from 'react';
import {observer} from 'mobx-react';
import Database from './Database';
import AppState from './AppState';
import {LocalizedStringsType} from './LocalizedStrings';
import {PersonDetail} from './DetailComponents/PersonDetail';
import {WorkDetail} from './DetailComponents/WorkDetail';
import {WorkPartDetail} from './DetailComponents/WorkPartDetail';

import './DetailPage.pcss';
import { DatabaseResult } from './DatabaseResult';


@observer
export default class DetailPage extends React.Component {

	props: {
		db:Database;
		databaseResult:DatabaseResult;
		strings:LocalizedStringsType;
		appState:AppState;
		files:any;
	};

	constructor(props:{db:Database, databaseResult:DatabaseResult, strings:LocalizedStringsType, appState:AppState, files:any}) {
		super(props);
		window.ga.trackEvent('DetailPage', 'Load', props.databaseResult.nodeId);
	}
	
	viewRelatedRecord = (databaseResult:DatabaseResult) => {
		this.props.appState.navigateTo(databaseResult);
	}

	render() {
		if(this.props.databaseResult) {
			if(this.props.files.person) return <PersonDetail db={this.props.db} strings={this.props.strings} person={this.props.files.person} viewRelatedRecord={this.viewRelatedRecord}  appState={this.props.appState} />;
			else if(this.props.files.work) return <WorkDetail db={this.props.db} strings={this.props.strings} work={this.props.files.work} viewRelatedRecord={this.viewRelatedRecord} appState={this.props.appState} />;
			else if(this.props.files.workPart) return <WorkPartDetail db={this.props.db} strings={this.props.strings} workPart={this.props.files.workPart} viewRelatedRecord={this.viewRelatedRecord} appState={this.props.appState} />;
			else return null;
		} else {
			return null;
		}
	}
}









