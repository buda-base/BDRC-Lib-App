/* @flow */

// export type ID = number;

/**
 * Used in Database.js, defines an Index file that is loaded on the initial run
 * 
 * @type {Object}
 */
export type IndexFile = {
	type: string,
	filename: string,
	desc: string
};

/**
 * Used in Records.js to describe the content of the Work JSON file
 * 
 * @type {Object}
 */
export type WorkJSON = {
	title: Array<string>;
	hasCreator: Array<string>;
	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
	archiveInfo_vols: string;	
	volumeMap: Array<VolumeJSON>;
	publisherName: string;
	publisherDate: string;
	publisherLocation: string;
	printType: string;
};

export type VolumeJSON = {
	id: string,
  total: number,
  num: number
};


/**
 * Used in Records.js to describe the content of the Work JSON file
 * 
 * @type {Object}
 */
export type PersonJSON = {
	name: Array<string>;
	creatorOf: Array<string>;
	birth: string;
	death: string;	
};


export type OutlineJSON = {
	isOutlineOf: string; // references a Work	
	nodes: Array<OutlineNodeJSON>;
}

/**
 * A node inside of an outline JSON file that has an id and titles
 * 
 * @type {Object}
 */
export type OutlineNodeJSON = {
	id: string;
	title: Array<string>;
  volumeEnd: number;
  beginsAt: number;
  volume: number;
  endsAt: number;
};

/**
 * Describes a route that is used with the Navigation system
 * 
 * @type {Object}
 */
export type Route = {
	page: string,
	hasBackButton: boolean,
	isModal:boolean,
	data: any
};


export type ImageGroup = {
	imageGroupId:string,
	total:number,
	start:number,
	end:number
};



