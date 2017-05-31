// @flow
declare var cordova: any;
declare var device: any;

import FileUtil from './FileUtil.js'
import WebUtil from './WebUtil.js'
import $ from 'jquery';

import type {IndexFile} from './TypeAliases.js';
import {Work, Person, Outline} from './Records.js';
import type {Record} from './Records.js';

const indexFiles: Array<IndexFile> = [ 
	{ type:'Work', filename:'workIndex.json', desc:'Works' },
	{ type:'Person', filename:'personIndex.json', desc:'Authors' },
	{ type:'Outline', filename:'outlineIndex-0.json', desc:'Outline 1' },
	{ type:'Outline', filename:'outlineIndex-1.json', desc:'Outline 2' },
	{ type:'Outline', filename:'outlineIndex-2.json', desc:'Outline 3' },
	{ type:'Outline', filename:'outlineIndex-3.json', desc:'Outline 4' },
	{ type:'Outline', filename:'outlineIndex-4.json', desc:'Outline 5' },
	{ type:'Outline', filename:'outlineIndex-5.json', desc:'Outline 6' },
	{ type:'Outline', filename:'outlineIndex-6.json', desc:'Outline 7' },
	{ type:'OutlineWorkTitle', filename:'outlineWorkTitle.json', desc:'Outline Work Titles' },
];


class DatabaseResult {

	db:Database;

	id: number;
	title: string;
	nodeId: string;
	type: ('Person'|'Work'|'Outline');

	isPerson:boolean = false;
	isWork:boolean = false;
	isOutline:boolean = false;

	_workTitleForOutline: string;
	
	workTitleForOutline(){
		if(this.isOutline) {
			if(!this._workTitleForOutline) {
				let dashIndex = this.nodeId.indexOf('-');
				if(dashIndex!=-1) {
					this._workTitleForOutline = this.db.outlineWorkIndex[this.nodeId.substring(0,dashIndex)];
				}
			}
			return this._workTitleForOutline;
		}
		return null;
	}

	load = (callback:(record:Work|Person|Outline|null)=>void) => {
		let filename = this.nodeId;
    // Account for compound nodeId that is brought in with the Outline Index files in order to provide both the 
    // filename of the outline, and the node within the outline that the title represents.
		if(this.isOutline) {
			let dashIndex = this.nodeId.indexOf('-');
			filename = filename.substring(0,dashIndex);
		}
		let relativeFilePath = this.type.toLowerCase()+'s/'+filename+'.json';
		if('browser'===device.platform) {
			WebUtil.loadJSONFile(relativeFilePath, (json) => { this.loaded(json, callback); });			
		} else {
			FileUtil.loadJSONFile(relativeFilePath, (json) => { this.loaded(json, callback); });
		}
	}

	loaded = (json:any, callback:(record:Work|Person|Outline|null)=>void) => {
		if(null==json) {
			callback(null);
		} else if(this.isPerson) {
			callback(new Person(json, this.nodeId));
		} else if(this.isWork) {
			callback(new Work(json, this.nodeId));
		} else if(this.isOutline) {
			let dashIndex = this.nodeId.indexOf('-');
			let nodeId = this.nodeId.substring(dashIndex+1);
			let outlineNodeId = this.nodeId.substring(0, dashIndex);
			callback(new Outline(json, nodeId, outlineNodeId));
		}
	} 

	constructor(db:Database, row: any) {		
		this.db = db;

		this.id = row.id;
		this.title = row.title;
		this.nodeId = row.nodeId;
		this.type = row.type;
		if('Person'===this.type) this.isPerson = true;
		if('Work'===this.type) this.isWork = true;
		if('Outline'===this.type) this.isOutline = true;
	}

}

const TSHEG = "\u0F0B";
const RESULT_BATCH_SIZE = 50;

class Database {

	runningInBrowser: boolean = 'browser'===device.platform;

	// Android and IOS database
	database = {};

	// browser database, just for testing
	jsondata: Array<DatabaseResult> = [];

	// lookup table for mobile and browser
	outlineWorkIndex: any = {};

	// data that listeners are interested in
	searchString: string = '';
	searchStringIsValid: boolean = false;
	searchResults: Array<DatabaseResult> = [];
	moreSearchResults: Array<DatabaseResult> = [];

	moreResultsAvailable():boolean{
		return this.moreSearchResults && this.moreSearchResults.length>0;
	}

	loadMoreResults():void{
		for(let i=0;i<RESULT_BATCH_SIZE && this.moreSearchResults.length>0;i++){
			this.searchResults.push(this.moreSearchResults.pop());
		}
		this.update();
	}

	totalFoundResults():number{
		return this.searchResults.length + this.moreSearchResults.length;
	}

	selectedDatabaseResult: DatabaseResult;

	statusListeners = [];

	addStatusListener(listenerToAdd: (string)=>void ) {
		var idx = this.statusListeners.indexOf(listenerToAdd);
		if(-1===idx) {
			this.statusListeners.push(listenerToAdd);
		}
	}

	removeStatusListener(listenerToRemove: (string)=>void ) {
		var idx = this.statusListeners.indexOf(listenerToRemove);
		if(-1!=idx){
			this.statusListeners.splice(idx, 1);
		}
	}	

	shareStatus(message:string){		
		this.statusListeners.forEach(listener => {			
			listener(message);			
		});		
	}

	// whenever a change happens that effects 
	// data that listeners might want to hear
	// about, the listeners in this array are 
	// notified
	listeners = [];

	addChangeListener(listenerToAdd: ()=>void ) {
		var idx = this.listeners.indexOf(listenerToAdd);
		if(-1===idx) {
			this.listeners.push(listenerToAdd);
		}
	}

	removeChangeListener(listenerToRemove: ()=>void ) {
		var idx = this.listeners.indexOf(listenerToRemove);
		if(-1!=idx){
			this.listeners.splice(idx, 1);
		}
	}

	/**
	 * Notifies listeners that something they might 
	 * be interested in has changed
	 * 
	 * @return {void}
	 */
	update(){
		this.listeners.forEach(listener => {
			listener();
		});		
	}

	setSelectedDatabaseResult(databaseResult: DatabaseResult){
		this.selectedDatabaseResult = databaseResult;
		this.update();
	}

	searchForMatchingNodes(nodeIds:Array<string>, callback:(Array<DatabaseResult>)=>void) {
		
		if(this.runningInBrowser) {				
			let results = [];
			let nodeIdsArray = nodeIds.slice(0); // duplicate the array
			for(let i=0,ii=this.jsondata.length;i<ii;i++) {	
				let idx = nodeIdsArray.indexOf(this.jsondata[i].nodeId);
				if(-1!=idx) {
					results.push(this.jsondata[i]);
					nodeIdsArray.splice(idx, 1);
				}
				if(0==nodeIdsArray.length) break;
			}
			callback(results);			
		} else {
			let orIds = '';
			for(let i=0;i<nodeIds.length;i++) {
				orIds += i>0?" OR nodeId = ?":" nodeId = ?";
			}
			let query = 'SELECT id, title, nodeId, type FROM indices WHERE '+orIds;
			this.database.executeSql(query, nodeIds, 
				(resultSet) => {
					let searchResults = [];
					let moreSearchResults = [];
					for(let x = 0; x < resultSet.rows.length; x++) {
						searchResults.push(new DatabaseResult(this, resultSet.rows.item(x)));
					}
					callback(searchResults);
				}, 
				(error) => {
			    console.log('SELECT SQL statement ERROR: ' + error.message);
				  this.searchResults = [];
					callback([]);
			  }
			);	

		}
		//return results;
	}

	/**
	 * Searches the database or the local jsondata. Calls update() 
	 * when complete.
	 * 
	 * @param  {string} searchString 
	 * @return {void}
	 */
	search(searchString:string) {
		this.searchString = searchString;

		let tsheg_loc = searchString.indexOf(TSHEG);
		this.searchStringIsValid = (tsheg_loc>0 && searchString.length > tsheg_loc+1);

		if(this.searchStringIsValid) {			
			if(this.runningInBrowser) {
				let searchResults = [];
				let moreSearchResults = [];
				for(let i=0,ii=this.jsondata.length;i<ii;i++) {					
					if(this.jsondata[i].title===searchString || -1!=this.jsondata[i].title.indexOf(searchString)) {
						if(searchResults.length<RESULT_BATCH_SIZE) {
							searchResults.push(this.jsondata[i]);
						} else {
							moreSearchResults.push(this.jsondata[i]);
						}
					}
				}
				this.searchResults = searchResults;				
				this.moreSearchResults = moreSearchResults;
				this.update();
			} else {
				let query = 'SELECT id, title, nodeId, type FROM indices WHERE (title LIKE ?)';
				this.database.executeSql(query, ['%'+searchString+'%'], (resultSet) => {
					let searchResults = [];
					let moreSearchResults = [];
					for(let x = 0; x < resultSet.rows.length && x < RESULT_BATCH_SIZE; x++) {
						searchResults.push(new DatabaseResult(this, resultSet.rows.item(x)));
					}
					if(resultSet.rows.length>RESULT_BATCH_SIZE){
						for(let x=resultSet.rows.length-1;x>=RESULT_BATCH_SIZE;x--){
							moreSearchResults.push(new DatabaseResult(this, resultSet.rows.item(x)));
						}
					}
					this.searchResults = searchResults;
					this.moreSearchResults = moreSearchResults;
					this.update();
				  }, (error) => {
				    console.log('SELECT SQL statement ERROR: ' + error.message);
					  this.searchResults = [];
						this.update();
				  }
				);	
			}
		} else {
		  this.searchResults = [];
			this.update();			
		}
	}

	rowCount(){
		if(this.runningInBrowser){
			console.log('Record count: ' + this.jsondata.length);
		} else {
			this.database.executeSql('SELECT count(*) AS mycount FROM indices', [], (rs)=>{
				// alert(rs.rows.item(0).mycount+' records!');
		    console.log('Record count: ' + rs.rows.item(0).mycount);
		  }, (error) => {
		    console.log('SELECT SQL statement ERROR: ' + error.message);
		  });		
		}
	}

	/**
	 * Always comes after loadIndex, stores the contents of the loaded indexFile
	 * in an sqlite database (Android, iOS) , or in a json array (browser)
	 * 
	 * @param  {[type]} obj a promise resolution that contains an IndexFile and its loaded contents
	 * @return {[type]}      [description]
	 */
	processIndex(obj: {indexFile: IndexFile,indexFileContents: any}){

		if(obj.indexFile.type==='OutlineWorkTitle') {
			return this.processOutlineWorkTitleIndex(obj);
		} else {
			return new Promise((resolve, reject)=>{ 
				this.shareStatus('Processing '+obj.indexFile.desc);
				if(this.runningInBrowser) {
					let startingIndex = this.jsondata.length;
					for(var key in obj.indexFileContents) {
						obj.indexFileContents[key].forEach((nodeId)=>{
							this.jsondata.push( new DatabaseResult(this, {
								id: startingIndex,
								title: key,
								nodeId: nodeId,
								type: obj.indexFile.type
							}));
							startingIndex++;
						});
					}
					resolve(obj.indexFile);			
				} else {
					let batch = ['CREATE TABLE IF NOT EXISTS indices (id INTEGER PRIMARY KEY, title, nodeId, type)'];
					for(var key in obj.indexFileContents) {
						obj.indexFileContents[key].forEach((nodeId)=>{
							batch.push([ 'INSERT INTO indices VALUES (?,?,?,?)', [null, key, nodeId, obj.indexFile.type] ]);
						});
					}
					this.database.sqlBatch(batch, 
				  	()=>{
			    		resolve(obj.indexFile);
				  	}, 
				  	(error)=>{
				    	reject({ indexFile: obj.indexFile, error:error});
				  	}
				  );
				}
			});
		}
	}

/**
 * [processOutlineWorkTitleIndex description]
 *
 * {
 *   "O1KG10746": "ས་ར་ཧ་པའི་རྡོ་རྗེའི་གསུང་རྣམས་ཕྱོགས་བསྒྲིགས།",
 *   "O1KG2938": "རྒྱན་འགྲེལ་སྤྱི་དོན་རོལ་མཚོ།（ཀྲུང་གོ་བོད་ཀྱི་ཤེས་རིག་དཔེ་སྐྲུན་ཁང་／）",
 *   "O00EGS109598": "གསུང་འབུམ། འཇམ་དབྱངས་དཔལ་ལྡན་རྒྱ་མཚོ",
 *   ...
 * }
 * 
 * @param  {[type]} obj: {indexFile:  IndexFile,indexFileContents: any} [description]
 * @return {[type]}      [description]
 */
	processOutlineWorkTitleIndex(obj: {indexFile: IndexFile,indexFileContents: any}) {
		return new Promise((resolve, reject)=>{ 
			this.shareStatus('Processing '+obj.indexFile.desc);
			localStorage.setItem('OutlineWorkIndex', JSON.stringify(obj.indexFileContents));
			this.outlineWorkIndex = obj.indexFileContents;
			resolve(obj.indexFile);
		});		
	}




	/**
	 * Loads the index represented by IndexFile into memory.
	 * 
	 * @param  {IndexFile} indexFile: IndexFile
	 * @return {Promise}
	 */
	loadIndex(indexFile: IndexFile){
		if(this.runningInBrowser) {
			return new Promise((resolve, reject) => {
				this.shareStatus('loading '+indexFile.desc);
	    	$.getJSON('data/'+indexFile.filename)
	      	.done((json) => {
	      		resolve({indexFile:indexFile, indexFileContents:json});
	      	})
	      	.fail((xhr, status, err) => reject({ indexFile: indexFile, error:err}));
	  		})
				.then(this.processIndex.bind(this));
		} else {
			return new Promise((resolve, reject)=>{ 
				this.shareStatus('loading '+indexFile.desc);
				let filePath = cordova.file.applicationDirectory+'www/data/'+indexFile.filename;
				window.resolveLocalFileSystemURL(filePath, (fileEntry) => {
		 			FileUtil.readFile(fileEntry, (fileContents)=> {
		 				if(fileContents) {
		 					try {
		 						let json = JSON.parse(fileContents);
		 						resolve({indexFile:indexFile, indexFileContents:json});
		 					} catch(e) {
								reject({ indexFile: indexFile, error:e});
		 					}
		 				} else {
		 					reject({ indexFile: indexFile, error:"Empty file"});
		 				}
		 			});

				}, 
				()=> { 
					reject({ indexFile: indexFile, error:"file system error"}); 
				});		
			})
			.then(this.processIndex.bind(this))
			;
		}
	}

	clearDatabase() {
		if(this.runningInBrowser) {
			this.jsondata = [];	
		} else {
			this.database.executeSql('DROP TABLE IF EXISTS indices');						
		}
	}

	/**
	 * Should be called only once to initialize the database when the app is
	 * first loaded
	 * 
	 * @param  {[type]} callback:(success:boolean, error:any     [description]
	 * @return {[type]}                            [description]
	 */
	initialize(callback:(success:boolean, error:any)=>void, statusListener:(string)=>void) {

		this.addStatusListener(statusListener);
		
		if(localStorage.getItem('DatabaseStatus')==='Loaded' && !this.runningInBrowser){
			callback(true);
		} else {
			this.shareStatus('Database Initialization Started');
			
			// clear the database
			this.clearDatabase();

			// Load all of the index files
			let loadingPromises = indexFiles.map(this.loadIndex.bind(this));

			Promise.all(loadingPromises)
		  .then((results) => {
		     // We only get here if ALL promises resolve
		  	this.shareStatus('Database Initialization Complete');
				
				localStorage.setItem('DatabaseStatus', 'Loaded');
		  	
		  	//this.rowCount();
		    callback(true);
		  })
		  .catch((err) => {
		    // Will catch failure of first failed promise
		  	this.shareStatus('Database Initialization Failed');

				localStorage.setItem('DatabaseStatus', 'Failed To Load');

		    callback(false, err);
		  });
		}
	}

	constructor(onready: () => void) {
		if(this.runningInBrowser){
			this.jsondata = [];
		} else {
			this.database = window.sqlitePlugin.openDatabase({name: 'bdrc.db', location: 'default'});
			if(localStorage.getItem('DatabaseStatus')!='Loaded') {
				this.database.executeSql('DROP TABLE IF EXISTS indices');
			}
		}
  	onready();
	}

}

export default Database;
export {DatabaseResult};