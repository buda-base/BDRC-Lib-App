declare var device: any;

import { Work, Person, WorkPart } from './Records';
import Database from './Database';
import BrowserUtil from './BrowserUtil';
import NativeUtil from './NativeUtil';
import {  v1 as uuidV1 } from 'uuid';
import * as SparkMD5 from 'spark-md5';

export class DatabaseResult {

	db:Database;

	id: string;
	title: string;
	nodeId: string;
	type: ('Person'|'Work'|'WorkPart');

	isPerson:boolean = false;
	isWork:boolean = false;
	isWorkPart:boolean = false;

	load = (rootFolder:string, afterLoaded:(record:Work|Person|WorkPart|null)=>void) => {

		console.log('DatabaseResult.load '+this.nodeId);

		let rid = this.nodeId;

		// WorkParts may contain references to the part in their Ids.
		if(this.isWorkPart) {
			const lastUnderscoreIdx = rid.lastIndexOf('_');
			if(-1!=lastUnderscoreIdx) {
				rid = rid.substring(0,lastUnderscoreIdx);
			}
		}

		const hash = SparkMD5.hash(rid);

		// let relativeFilePath = this.type.toLowerCase()+'s/'+filename+'.json';
		let relativeFilePath = this.type.toLowerCase()+'s/'+hash.substring(0, 2)+'.json';
		console.log(' loading '+relativeFilePath);

		// // if this is namedspaced, include the namespace as a subfolder in the
		// // record file reference
		// const colonIdx = filename.indexOf(':');
		// if(-1!=colonIdx) {
		// 	relativeFilePath += filename.substring(0,colonIdx) + '/' + filename.substring(colonIdx+1);
		// } else {
		// 	relativeFilePath += filename;
		// }
		// relativeFilePath += '.json';



		if('browser'===device.platform) {
			BrowserUtil.loadJSONFile(relativeFilePath, (json:any) => { this.loaded(json, rid, afterLoaded); });
		} else {
			NativeUtil.loadJSONFile(rootFolder, relativeFilePath, (json:any) => { this.loaded(json, rid, afterLoaded); });
		}
	}

	loaded = (json:any, rid:string, afterLoaded:(record:Work|Person|WorkPart|null)=>void) => {

		console.log('DatabaseResult.loaded '+rid);


		if(null==json) {
			afterLoaded(null);
		} else {
			const doc = json[rid];
			if(doc) {
				console.log(doc);
				if (this.isPerson) {
					afterLoaded(new Person(doc, this.nodeId));
				} else if (this.isWork) {
					afterLoaded(new Work(doc, this.nodeId));
				} else if (this.isWorkPart) {
					afterLoaded(new WorkPart(doc, this.nodeId, this.title));
				}
			} else {
				afterLoaded(null);
			}
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
