// @flow

import type {WorkJSON, PersonJSON, OutlineJSON, VolumeJSON} from './TypeAliases.js';

class Work {
	nodeId: string;
	title: Array<string>;
	hasCreator: Array<any>; // references Person records
	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
	archiveInfo_vols: string;
	volumeMap: Array<Volume>
	publisherName: string;
	publisherDate: string;
	publisherLocation: string;
	printType: string;
	access: string;
	license: string;

	constructor(json: WorkJSON, nodeId:string){

		this.nodeId = nodeId;
		this.title = json.title;
		this.hasCreator = json.hasCreator;
		this.status = json.status;
		this.title = json.title;
		this.archiveInfo_vols = json.archiveInfo_vols;
		this.publisherName = json.publisherName;
		this.publisherDate = json.publisherDate;
		this.publisherLocation = json.publisherLocation;
		this.printType = json.printType;
		this.access = json.access;
		this.license = json.license;

		if(json.volumeMap) {
			this.volumeMap = [];
			for(let i=0;i<json.volumeMap.length;i++) {
				this.volumeMap.push(new Volume(json.volumeMap[i]));
			}
		}
	}
}

class Volume {
	id: string;
  total: number;
  num: number;
  constructor(json:VolumeJSON){
  	this.id = json.id;
  	this.total = json.total;
  	this.num = json.num;
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

class Outline {
	nodeId: string;
	outlineNodeId: string;
	isOutlineOf: string; // references a Work
  volumeEnd: number;
  beginsAt: number;
  volume: number;
  endsAt: number;
  title: Array<string>;

	constructor(json: OutlineJSON, nodeId: string, outlineNodeId: string) {
		this.nodeId = nodeId;
		this.outlineNodeId = outlineNodeId;
		this.isOutlineOf = json.isOutlineOf;
		for(let i=0,ii=json.nodes.length;i<ii;i++){
			if(nodeId===json.nodes[i].id){
				this.volumeEnd = json.nodes[i].volumeEnd;
				this.volume = json.nodes[i].volume;
				this.beginsAt = json.nodes[i].beginsAt;
				this.endsAt = json.nodes[i].endsAt;
				this.title = json.nodes[i].title;
				break;
			}
		}
	}
}



export type Record = Work | Person | Outline | null;
export {Work, Person, Outline, Volume};







