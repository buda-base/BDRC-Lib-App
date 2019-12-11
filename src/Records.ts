import { computed } from 'mobx';
import { PersonRefJSON, WorkJSON, PersonJSON, WorkPartJSON, WorkPartNodeJSON } from './TypeAliases';

class Work {
	nodeId: string;
	title: Array<string>;
	status: ('seekingOut'|'acquiring'|'accessioned'|'released');
	publisherName: string;
	publisherDate: string;
	publisherLocation: string;
	printType: string;
	access: string;
	creator: Array<PersonRefJSON>;

	constructor(json: WorkJSON, nodeId:string){
		this.nodeId = nodeId;
		this.title = json.title;
		this.creator = json.creator;
		this.status = json.status;
		this.publisherName = json.publisherName;
		this.publisherDate = json.publisherDate;
		this.publisherLocation = json.publisherLocation;
		this.printType = json.printType;
		this.access = json.access;
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

class WorkPart {
	nodeId:string;
	workTitle:Array<string>;
	nodes:Array<WorkPartNode>;

	@computed
	get workId() {
		const underscoreIdx = this.nodeId.lastIndexOf('_');
		return -1!=underscoreIdx ? this.nodeId.substring(0, underscoreIdx) : this.nodeId;
	}

	constructor(json: WorkPartJSON, nodeId:string) {
		this.nodeId = nodeId;
		this.workTitle = json.workTitle;
		this.nodes = [];
		if(json.nodes) {
			json.nodes.forEach(nodeJSON=>{
				this.nodes.push(new WorkPartNode(nodeJSON));
			});
		}		
	}
}

class WorkPartNode {
	id:string;
	title: Array<string>;
	nodes: Array<WorkPartNode>;
	constructor(json:WorkPartNodeJSON) {
		this.id = json.id;
		this.title = json.title;
		this.nodes = [];
		if(json.nodes) {
			json.nodes.forEach((nodeJSON:WorkPartNodeJSON)=>{
				this.nodes.push(new WorkPartNode(nodeJSON));
			});
		}
	}
}

/*
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
*/


export type Record = Work | Person | WorkPart | null;
export { Work, Person, WorkPart };







