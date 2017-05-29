// @flow

import type {WorkJSON, PersonJSON, OutlineNode} from './TypeAliases.js';

// type WorkJSON = {
// 	title: Array<string>;
// 	hasCreator: Array<string>;
// 	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
// 	archiveInfo_vols: string;	
// };

class Work {
	nodeId: string;
	title: Array<string>;
	hasCreator: Array<string>; // references Person records
	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
	archiveInfo_vols: string;

	constructor(json: WorkJSON, nodeId:string){
		this.nodeId = nodeId;
		this.title = json.title;
		this.hasCreator = json.hasCreator;
		this.status = json.status;
		this.title = json.title;
		this.archiveInfo_vols = json.archiveInfo_vols;
	}
}

// P00KG03924.json contains name=[null]    -- {"creatorOf":["W00KG03892"],"name":[null],"death":"1865","birth":"1822?"}

class Person {
	nodeId: string;
	creatorOf: Array<string>;	// references Works
	name: Array<string>;
	birth: string;
	death: string;

	constructor(json: PersonJSON, nodeId:string){
		this.nodeId = nodeId;
		this.creatorOf = json.creatorOf;
		this.name = json.name;
		this.birth = json.birth;
		this.death = json.death;
	}

}

// type OutlineNode = {
// 	id: string,
// 	title: Array<string>
// };


class Outline {
	nodeId: string;
	isOutlineOf: string; // references a Work
	nodes: Array<OutlineNode>;
}




export type Record = Work | Person | Outline | null;
export {Work, Person, Outline};
