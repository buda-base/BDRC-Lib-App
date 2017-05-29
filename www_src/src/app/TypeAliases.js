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

/**
 * A node inside of an outline JSON file that has an id and titles
 * 
 * @type {Object}
 */
export type OutlineNode = {
	id: string,
	title: Array<string>
};

/**
 * Describes a route that is used with the Navigation system
 * 
 * @type {Object}
 */
export type Route = {
	title: string,
	hasBackButton: boolean
};

