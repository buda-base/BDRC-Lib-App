declare var cordova: any;
declare var device: any;
declare var lasca: any;
declare var window:any;

import NativeUtil from './NativeUtil'
import * as $ from 'jquery';
import AppState from './AppState';
import {IndexFile} from './TypeAliases';
import {ILocalizedStrings} from './LocalizedStrings';
import undefined = require('../_node_modules/sockjs-client/lib/transport/browser/websocket');
import { DatabaseResult } from './DatabaseResult';

const indexFiles: Array<IndexFile> = [ 
	{ type:'Work', filename:'work-0.json', desc:'Works1' },
	{ type:'Work', filename:'work-1.json', desc:'Works2' },
	{ type:'Person', filename:'person-0.json', desc:'Authors1' },
	{ type:'Person', filename:'person-1.json', desc:'Authors2' },
	{ type:'WorkPart', filename:'workparts-0.json', desc:'WorkParts1' },
	{ type:'WorkPart', filename:'workparts-1.json', desc:'WorkParts2' },
	{ type:'WorkPart', filename:'workparts-2.json', desc:'WorkParts3' },
	{ type:'WorkPart', filename:'workparts-3.json', desc:'WorkParts4' },
	{ type:'WorkPart', filename:'workparts-4.json', desc:'WorkParts5' },
	{ type:'WorkPart', filename:'workparts-5.json', desc:'WorkParts6' },
	{ type:'WorkPart', filename:'workparts-6.json', desc:'WorkParts7' },
	{ type:'WorkPart', filename:'workparts-7.json', desc:'WorkParts8' },
	{ type:'WorkPart', filename:'workparts-8.json', desc:'WorkParts9' },
	{ type:'WorkPart', filename:'workparts-9.json', desc:'WorkParts10' },
	{ type:'WorkPart', filename:'workparts-10.json', desc:'WorkParts11' },
	{ type:'WorkPart', filename:'workparts-11.json', desc:'WorkParts12' },
	{ type:'WorkPart', filename:'workparts-12.json', desc:'WorkParts13' },
];

const SORT_ENABLED = false;

/* When this value does not match the stored value, the database is reinitialized. */
const DATABASE_VERSION = "2019.11.26.01";

const LINE_SEP = "\u2028";
const PARA_SEP = "\u2029";

const TSHEG = "\u0F0B";
const RESULT_BATCH_SIZE = 50;

type StatusListenerFunc = (message:string) => void;

class Database {
	appState:AppState;

	runningInBrowser: boolean = 'browser'===device.platform;

	// searchCount:number = 0;

	// Android and IOS database
	database:any = {};

	// localization
	strings:ILocalizedStrings;

	// browser database, just for testing
	jsondata: Array<DatabaseResult> = [];

	// data that listeners are interested in
	searchString:string = '';
	searchResults: Array<DatabaseResult> = [];
	moreSearchResults: Array<DatabaseResult> = [];

	moreResultsAvailable():boolean{
		return this.moreSearchResults && this.moreSearchResults.length>0;
	}

	loadMoreResults():void{
		for(let i=0;i<RESULT_BATCH_SIZE && this.moreSearchResults.length>0;i++){
			const result:DatabaseResult|undefined = this.moreSearchResults.pop();
			if(undefined!=result) {
				this.searchResults.push(result);
			}
		}
		this.update();
	}

	totalFoundResults():number{
		return this.searchResults.length + this.moreSearchResults.length;
	}

	selectedDatabaseResult: DatabaseResult;

	statusListeners:Array<StatusListenerFunc> = [];

	addStatusListener(listenerToAdd:StatusListenerFunc ) {
		var idx = this.statusListeners.indexOf(listenerToAdd);
		if(-1===idx) {
			this.statusListeners.push(listenerToAdd);
		}
	}

	removeStatusListener(listenerToRemove:StatusListenerFunc ) {
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
	listeners:Array<()=>void> = [];

	addChangeListener(listenerToAdd: ()=>void ) {
		console.log('Adding a change listener');
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
		console.log('notifying listeners');

		this.listeners.forEach(listener => {
			listener();
		});
	}

	setSelectedDatabaseResult(databaseResult: DatabaseResult){
		this.selectedDatabaseResult = databaseResult;
		this.update();
	}

	searchForMatchingNodes(nodeIds:Array<string>, callback:(results:Array<DatabaseResult>)=>void) {
		
		if(this.runningInBrowser) {				

			let results = [];
			let nodeIdsArray = nodeIds.slice(0); // duplicate the array

			for(let n=0;n<nodeIdsArray.length;n++) {
				let nodeId = nodeIdsArray[n];
				for(let i=0,ii=this.jsondata.length;i<ii;i++) {	
					if(nodeId===this.jsondata[i].nodeId) {
						results.push(this.jsondata[i]);						
					}
					// let idx = nodeIdsArray.indexOf(this.jsondata[i].nodeId);				
					// if(-1!=idx) {
					// 	results.push(this.jsondata[i]);
					// 	nodeIdsArray.splice(idx, 1);
					// }
					// if(0==nodeIdsArray.length) break;
				}	
			}

			callback(results);			
		} else {
			let orIds = '';

			// for(let i=0;i<nodeIds.length;i++) {
			// 	orIds += i>0?" OR nodeId = ?":" nodeId = ?";
			// }
			

			for(let i=0;i<nodeIds.length;i++) {
				orIds += i>0?" OR nodeId MATCH ?":" nodeId MATCH ?";
			}

			let query = 'SELECT id, title, nodeId, type FROM indices WHERE '+orIds;
			this.database.executeSql(query, nodeIds, 
				(resultSet:any) => {
					let searchResults = [];
					let moreSearchResults = [];
					for(let x = 0; x < resultSet.rows.length; x++) {
						searchResults.push(new DatabaseResult(this, resultSet.rows.item(x)));
					}
					callback(searchResults);
				}, 
				(error:any) => {
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
	search(searchStringSrc:string) {
		this.appState.currentQueryString = searchStringSrc;
		this.searchString = searchStringSrc;



		let searchByNodeId = false;
		let searchString = searchStringSrc;

		// Figure out whether this is a node id search, and 
		// allow for a namespaced or non-namespaced version 
		// of the search
		if(searchString && searchString.length>0) {
			const namespaceIdx = searchString.indexOf(":");
			let nodeIdStartIdx = 0;
			if(namespaceIdx>0) {
				nodeIdStartIdx = namespaceIdx + 1;
			} 
			if(searchString.length>nodeIdStartIdx) {
				const testChar = searchString.charAt(nodeIdStartIdx);
				searchByNodeId = (testChar==='W' || testChar==='P');

				// Add the namespace if it is not included
				if(searchByNodeId && 0==nodeIdStartIdx) {
					searchString = "bdr:"+searchString;
				}
			}			
		}


		// SEARCH BY STRING
		if(!searchByNodeId) {
			let tsheg_loc = searchString.indexOf(TSHEG);
			this.appState.searchStringIsValid = (tsheg_loc>0 && searchString.length > tsheg_loc+1);

			if(this.appState.searchStringIsValid) {

				this.appState.searchCount++;		

				// SEARCH BROWSER ARRAY BY STRING, NO DATABASE
				if(this.runningInBrowser) {

					let allSearchResults = [];

					for(let i=0,ii=this.jsondata.length;i<ii;i++) {					
						if(this.jsondata[i].title===searchString || -1!=this.jsondata[i].title.indexOf(searchString)) {
							allSearchResults.push(this.jsondata[i]);
						}
					}

					if(SORT_ENABLED) {
						console.log('About to sort');
						allSearchResults = lasca.sort(allSearchResults, 'title');
						console.log('Done sorting');
					}

					let searchResults = [];
					let moreSearchResults = [];
					if(allSearchResults.length>RESULT_BATCH_SIZE){
						this.searchResults = allSearchResults.slice(0,RESULT_BATCH_SIZE+1);
						this.moreSearchResults = allSearchResults.slice(RESULT_BATCH_SIZE+1);
					} else {
						this.searchResults = allSearchResults;
						this.moreSearchResults = [];
					}
					this.appState.searchCount--;	
					this.update();
				} 
				// SEARCH THE DATABASE BY STRING
				else {
					let query = 'SELECT id, title, nodeId, type FROM indices WHERE (title LIKE ?)';
					let queryParams = ['%'+searchString+'%'];
					if('$'===searchString[0]) {
						query =  'SELECT id, title, nodeId, type FROM indices WHERE (title MATCH ?)';
						queryParams = ['"'+searchString+'*"']
					}

					try {
						//console.time('Search'+query);
						this.database.executeSql(query, queryParams, (resultSet:any) => {

							if(searchString!=this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}	

							let rows =  [];					
							if(SORT_ENABLED) {
								console.log('About to sort');
								rows = lasca.sort(resultSet.rows, 'title');			
								console.log('Done sorting');
							} else {
								rows = resultSet.rows;
							}

							let searchResults = [];
							let moreSearchResults = [];						

							//console.time('ProcessingRecords'+query);
							for(let x = 0; x < rows.length && x < RESULT_BATCH_SIZE; x++) {
								searchResults.push(new DatabaseResult(this, rows.item(x)));
							}

							if(searchString!=this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}	

							if(rows.length>RESULT_BATCH_SIZE){								
								for(let x=rows.length-1;x>=RESULT_BATCH_SIZE;x--){
									moreSearchResults.push(new DatabaseResult(this, rows.item(x)));
								}
							}

							if(searchString!=this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}	

							//console.timeEnd('ProcessingRecords'+query);


							//console.time('AssignResults'+query);
							this.searchResults = searchResults;
							this.moreSearchResults = moreSearchResults;
							//console.timeEnd('AssignResults'+query);

							this.appState.searchCount--;	
							this.update();
						  }, (error:any) => {
						    console.log('SELECT SQL statement ERROR: ' + error.message);
							  this.searchResults = [];
							  this.appState.searchCount--;	
								this.update();
						  }
						);	
					} catch(badException) {
						console.log(badException);
					}

					
				}
			} else {
			  this.searchResults = [];
				this.update();			
			}
		} 
		// SEARCH BY RID
		else {

			this.appState.searchStringIsValid = searchString.length > 1;

			if(this.appState.searchStringIsValid){
				let exactMatchRequired = searchString.charAt(searchString.length-1) === ' ';

				this.appState.searchCount++;		

				// NO DATABASE SEARCH BY RID
				if(this.runningInBrowser) {

					let allSearchResults = [];
					let ss = exactMatchRequired ? searchString.substring(0, searchString.length-1) : searchString;
					for(let i=0,ii=this.jsondata.length;i<ii;i++) {											
						if(i<5) {
							console.log(this.jsondata[i].nodeId);
						}
						if(exactMatchRequired ? ss===this.jsondata[i].nodeId : 0==this.jsondata[i].nodeId.indexOf(searchString)   ) {
							allSearchResults.push(this.jsondata[i]);
						}
					}
					
					if(SORT_ENABLED) {
						console.log(allSearchResults.length);
						if(allSearchResults.length>1) {
							console.log('About to sort');
							let t1 = performance.now();
							allSearchResults = lasca.sort(allSearchResults, 'title');
							let t2 = performance.now();
							console.log("Sort Time: "+( (t2-t1)/1000 ) + "s " +( (t2-t1)%1000 ) + "ms" );
							console.log('Done sorting');
						}
					}

					if(allSearchResults.length>RESULT_BATCH_SIZE){
						this.searchResults = allSearchResults.slice(0,RESULT_BATCH_SIZE+1);
						this.moreSearchResults = allSearchResults.slice(RESULT_BATCH_SIZE+1);
					} else {
						this.searchResults = allSearchResults;
						this.moreSearchResults = [];
					}
					this.appState.searchCount--;	
					this.update();
				

				} 
				// DATABASE SEARCH BY RID
				else {
					let query = 'SELECT id, title, nodeId, type FROM indices WHERE ' + (exactMatchRequired ? '(nodeId = ?)' : '(nodeId MATCH ?)' );					
					//let searchParams = exactMatchRequired ? [searchString] :[searchString+'%'];
					let searchParams = exactMatchRequired ? [searchString] :['"'+searchString+'*"'];
					this.database.executeSql(query, searchParams, 
						(resultSet:any) => {

							if(searchString!=this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}

							let rows =  [];					
							if(SORT_ENABLED) {
								console.log('About to sort');
								rows = lasca.sort(resultSet.rows, 'title');			
								console.log('Done sorting');
							} else {
								rows = resultSet.rows;
							}

							let searchResults = [];
							let moreSearchResults = [];
							for(let x = 0; x < rows.length && x < RESULT_BATCH_SIZE; x++) {
								searchResults.push(new DatabaseResult(this, rows.item(x)));
							}

							if(searchString!==this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}	

							if(rows.length>RESULT_BATCH_SIZE){
								for(let x=rows.length-1;x>=RESULT_BATCH_SIZE;x--){
									moreSearchResults.push(new DatabaseResult(this, rows.item(x)));
								}
							}

							if(searchString!=this.appState.currentQueryString) {
								this.appState.searchCount--;	
								return;
							}	

							this.searchResults = searchResults;
							this.moreSearchResults = moreSearchResults;
							this.appState.searchCount--;	
							this.update();

					  }, (error:any) => {
					    console.log('SELECT SQL statement ERROR: ' + error.message);
						  this.searchResults = [];
						  this.appState.searchCount--;	
							this.update();
					  }
					);	
	
				}				
			} else {
			  this.searchResults = [];
				this.update();						
			}
		}
	}

	rowCount(){
		if(this.runningInBrowser){
			console.log('Record count: ' + this.jsondata.length);
		} else {
			this.database.executeSql('SELECT count(*) AS mycount FROM indices', [], (rs:any)=>{
				// alert(rs.rows.item(0).mycount+' records!');
		    console.log('Record count: ' + rs.rows.item(0).mycount);
		  }, (error:any) => {
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


			return new Promise((resolve, reject)=>{ 

				//this.shareStatus(this.strings.IndexFileLoadingDescriptions[obj.indexFile.desc]);
				if(this.runningInBrowser) {

					let startingIndex = this.jsondata.length;

					let debugIdx = 0;

					for(var key in obj.indexFileContents) {
						obj.indexFileContents[key].forEach((nodeId:string)=>{
						  
						  debugIdx++;	
							
							/*
							// HACK: Because the work index files contain references not only to alternative titles, but to publishers, 
							// we do not create database entries for any RIDs that contain a "-" 
							let thisEntryIsGoodData = true; 
							let dashIdx = nodeId.indexOf('-');
							if(-1!=dashIdx && nodeId.charAt(0)==='W') {
								thisEntryIsGoodData = false;
							}

							if(thisEntryIsGoodData) {
								
								if(debugIdx<10) {
									console.log(startingIndex+' '+key+' '+nodeId+' '+obj.indexFile.type);
								}

								this.jsondata.push( new DatabaseResult(this, {
									id: startingIndex,
									title: key,
									nodeId: nodeId,
									type: obj.indexFile.type
								}));
								startingIndex++;
							}*/


							if(debugIdx<10) {
								console.log(startingIndex+' '+key+' '+nodeId+' '+obj.indexFile.type);
							}

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
					//let batch = ['CREATE TABLE IF NOT EXISTS indices (id INTEGER PRIMARY KEY, title, nodeId, type)']; //, 'CREATE INDEX nodeId_index ON indices (nodeId)', 'CREATE INDEX title_index ON indices (title)'];
					// CREATE VIRTUAL TABLE indices USING fts3()
					let batch:Array<Array<any>> = []; //, 'CREATE INDEX nodeId_index ON indices (nodeId)', 'CREATE INDEX title_index ON indices (title)'];
					for(var key in obj.indexFileContents) {
						obj.indexFileContents[key].forEach((nodeId:string)=>{

							// HACK: https://github.com/BuddhistDigitalResourceCenter/BDRC-Lib-App/issues/41							 
							if(-1!=key.indexOf(LINE_SEP)){
								key = key.replace(LINE_SEP, '');
							}

							if(-1!=key.indexOf(PARA_SEP)){
								key = key.replace(PARA_SEP, '');								
							}


							/*
							// HACK: Because the work index files contain references not only to alternative titles, but to publishers, 
							// we do not create database entries for any RIDs that contain a "-" 
							let thisEntryIsGoodData = true; 
							let dashIdx = nodeId.indexOf('-');

							if(-1!=dashIdx && nodeId.charAt(0)==='W') {
								thisEntryIsGoodData = false;
							}

						
							if(thisEntryIsGoodData) {
								batch.push([ 'INSERT INTO indices VALUES (?,?,?,?)', [null, key, nodeId, obj.indexFile.type] ]);
							}
							*/

							batch.push([ 'INSERT INTO indices VALUES (?,?,?,?)', [null, key, nodeId, obj.indexFile.type] ]);

						});
					}
					this.database.sqlBatch(batch, 
				  	()=>{
			    		resolve(obj.indexFile);
				  	}, 
				  	(error:any)=>{
				    	reject({ indexFile: obj.indexFile, error:error});
				  	}
				  );
				}
			});
		
	}



	/**
	 * Loads the index represented by IndexFile into memory.
	 * 
	 * @param  {IndexFile} indexFile: IndexFile
	 * @return {Promise}
	 */
	loadIndex(indexFile: IndexFile){
		console.log('loadIndex '+indexFile.filename);
		if(this.runningInBrowser) {
			console.log('runningInBrowser');
			return new Promise((resolve, reject) => {
				//this.shareStatus('loading '+indexFile.desc);
				this.shareStatus((this.strings.IndexFileLoadingDescriptions as any)[indexFile.desc]);
	    	$.getJSON('data/'+indexFile.filename)
	      	.done((json) => {
	      		resolve({indexFile:indexFile, indexFileContents:json});
	      	})
	      	.fail((xhr, status, err) => reject({ indexFile: indexFile, error:err}));
	  		})
				.then(this.processIndex.bind(this));
		} else {
			return new Promise((resolve, reject)=>{ 
				// this.shareStatus('loading '+indexFile.desc);
				this.shareStatus((this.strings.IndexFileLoadingDescriptions as any)[indexFile.desc]);
				let filePath = cordova.file.applicationDirectory+'www/data/'+indexFile.filename;
				window.resolveLocalFileSystemURL(filePath, (fileEntry:any) => {
		 			NativeUtil.readFile(fileEntry, (fileContents:any)=> {
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

			this.database.executeSql('CREATE VIRTUAL TABLE indices USING fts3(id INTEGER PRIMARY KEY, title, nodeId, type)');

				// CREATE VIRTUAL TABLE indices USING fts3()
			// creating indices slowed the iOS version down
			// this.database.executeSql('CREATE TABLE IF NOT EXISTS indices (id INTEGER PRIMARY KEY, title, nodeId, type)');						
			// this.database.executeSql('CREATE INDEX nodeId_index ON indices (nodeId)');						
			// this.database.executeSql('CREATE INDEX title_index ON indices (title)');						
		}
	}

	isInitialized():boolean{
		return localStorage.getItem('DatabaseStatus')==='Loaded' && localStorage.getItem('DatabaseVersion')===DATABASE_VERSION && !this.runningInBrowser;
	}

	/**
	 * Should be called only once to initialize the database when the app is
	 * first loaded
	 * 
	 * @param  {[type]} callback:(success:boolean, error:any     [description]
	 * @return {[type]}                            [description]
	 */
	initialize(callback:(success:boolean, error?:any)=>void, statusListener:StatusListenerFunc) {

		console.log('initialize');

		this.addStatusListener(statusListener);
	
		this.shareStatus('Database Initialization Started');
		
		// clear the database
		this.clearDatabase();

		/*
		 * serial executes Promises sequentially.
		 * @param {funcs} An array of funcs that return promises.
		 * @example
		 * const urls = ['/url1', '/url2', '/url3']
		 * serial(urls.map(url => () => $.ajax(url)))
		 *     .then(console.log.bind(console))
		 */
		const serial = (funcs:Array<any>) =>
			funcs.reduce((promise, func) =>
		  	promise.then((result:any) => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));

		const loadingPromises = indexFiles.map(indexFile => () => this.loadIndex(indexFile) );

		const cb = () => new Promise(
			(resolve, reject) => { 
				callback(true); 
				localStorage.setItem('DatabaseStatus', 'Loaded'); 
				localStorage.setItem('DatabaseVersion', DATABASE_VERSION); 
				resolve([]); 
			} 
		);

		loadingPromises.push(cb);

		serial(loadingPromises).then();

	}

	constructor(strings:ILocalizedStrings, onready: () => void, appState:AppState) {
		this.strings = strings;
		this.appState = appState;
		lasca.setLanguage("real_tibetan");
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