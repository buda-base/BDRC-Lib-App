import {findWorkPart} from "./findWorkPart";

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

		let baseRid = this.nodeId;

		// WorkParts may contain references to the part in their Ids.
		if(this.isWorkPart) {
			const lastUnderscoreIdx = baseRid.lastIndexOf('_');
			if(-1!=lastUnderscoreIdx) {
				baseRid = baseRid.substring(0,lastUnderscoreIdx);
			}
		}

		// Use the base RID to find the file that contains the associated JSON
		const hash = SparkMD5.hash(baseRid);

		// let relativeFilePath = this.type.toLowerCase()+'s/'+filename+'.json';
		let relativeFilePath = this.type.toLowerCase()+'s/'+hash.substring(0, 2)+'.json';
		console.log(' loading '+relativeFilePath);

		if('browser'===device.platform) {
			BrowserUtil.loadJSONFile(relativeFilePath, (json:any) => { this.loaded(json, this.nodeId, afterLoaded); });
		} else {
			NativeUtil.loadJSONFile(rootFolder, relativeFilePath, (json:any) => { this.loaded(json, this.nodeId, afterLoaded); });
		}
	}

	loaded = (json:any, rid:string, afterLoaded:(record:Work|Person|WorkPart|null)=>void) => {

		console.log('DatabaseResult.loaded '+rid, json);

		if(null==json) {
			console.log('DatabaseResult.loaded: json empty');
			afterLoaded(null);
		} else {
			const doc = this.isWorkPart ? findWorkPart(json, rid) : json[rid];
			if(doc) {
				if (this.isPerson) {
					console.log("DatabaseResult.loaded: loading person "+this.nodeId);
					afterLoaded(new Person(doc, this.nodeId));
				} else if (this.isWork) {
					console.log("DatabaseResult.loaded: loading work "+this.nodeId);
					afterLoaded(new Work(doc, this.nodeId));
				} else if (this.isWorkPart) {
					console.log("DatabaseResult.loaded: loading work part "+this.nodeId);
					afterLoaded(new WorkPart(doc, this.nodeId, this.title));
				}
			} else {
				console.log('DatabaseResult.loaded: no doc');
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
