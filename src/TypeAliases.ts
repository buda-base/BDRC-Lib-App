/**
 * Used in Database.ts, defines an Index file that is loaded on the initial run
 * 
 */
export interface IndexFile {
	type: string;
	filename: string;
	desc: string;
}

/**
 * Used in Records.ts to describe the content of the Work JSON file
 * 
 */
export interface WorkJSON {
	creator: Array<PersonRefJSON>;
	title: Array<string>;
	publisherName: string;
	publisherLocation: string;
	hasParts:boolean;	
	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
	publisherDate: string;
	printType: string;
	access:string;
}


export interface PersonRefJSON {
	id:string;
	name:string;
}


/**
 * Used in Records.ts to describe the content of the Person JSON file
 * 
 */
export interface PersonJSON {
	name: Array<string>;
	creatorOf: Array<string>;
	birth: string;
	death: string;	
}


/**
 * This type represents what is displayed inside of a work part file. All work part
 * files are named the exact same name as the work that they represent. Only one per
 * work. Each node in the work part may have sub nodes
 *
 */
export interface WorkPartJSON {
	workTitle:Array<string>;
	nodes:Array<WorkPartNodeJSON>;
}
export interface WorkPartNodeJSON {
	id:string;
	title:Array<string>;
	nodes:Array<WorkPartNodeJSON>;
}



/**
 * Describes a route that is used with the Navigation system
 * 
 */
export interface Route {
	page: string;
	hasBackButton: boolean;
	isModal:boolean;
	data: any;
}
