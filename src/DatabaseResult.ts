declare var device: any;

import { Work, Person, WorkPart } from './Records';
import Database from './Database';
import BrowserUtil from './BrowserUtil';
import NativeUtil from './NativeUtil';
import {  v1 as uuidV1 } from 'uuid';

export class DatabaseResult {

	db:Database;

	id: string;
	title: string;
	nodeId: string;
	type: ('Person'|'Work'|'WorkPart');

	isPerson:boolean = false;
	isWork:boolean = false;
	isWorkPart:boolean = false;

	load = (callback:(record:Work|Person|WorkPart|null)=>void) => {

		let filename = this.nodeId;

		// WorkParts may contain references to the part in their Ids.
		if(this.isWorkPart) {
			const lastUnderscoreIdx = filename.lastIndexOf('_');
			if(-1!=lastUnderscoreIdx) {
				filename = filename.substring(0,lastUnderscoreIdx);				
			}
		}

		let relativeFilePath = this.type.toLowerCase()+'s/';

		// if this is namedspaced, include the namespace as a subfolder in the 
		// record file reference
		const colonIdx = filename.indexOf(':');
		if(-1!=colonIdx) {
			relativeFilePath += filename.substring(0,colonIdx) + '/' + filename.substring(colonIdx+1);
		} else {
			relativeFilePath += filename;
		}
		relativeFilePath += '.json';



		if('browser'===device.platform) {
			BrowserUtil.loadJSONFile(relativeFilePath, (json:any) => { this.loaded(json, callback); });			
		} else {
			NativeUtil.loadJSONFile(relativeFilePath, (json:any) => { this.loaded(json, callback); });
		}
	}

	loaded = (json:any, callback:(record:Work|Person|WorkPart|null)=>void) => {
		if(null==json) {
			callback(null);
		} else if(this.isPerson) {
			callback(new Person(json, this.nodeId));
		} else if(this.isWork) {
			callback(new Work(json, this.nodeId));
		} else if(this.isWorkPart) {
			callback(new WorkPart(json, this.nodeId));
		}
	} 

	constructor(db:Database, row: any) {		
		this.db = db;

		this.id = uuidV1(); //.row.id;
		this.title = row.title;
		this.nodeId = row.nodeId;
		this.type = row.type;
		if('Person'===this.type) this.isPerson = true;
		if('Work'===this.type) this.isWork = true;
		if('WorkPart'===this.type) this.isWorkPart = true;
	}

}