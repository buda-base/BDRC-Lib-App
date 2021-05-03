import { computed } from 'mobx';
import {PersonJSON, PersonRefJSON} from "./interfaces/PersonRefJSON";
import {WorkJSON} from "./interfaces/WorkJSON";
import {WorkPartItemJSON} from "./interfaces/WorkPartJSON";

class Work {
	nodeId: string;
	title: Array<string>;
	publisherName: string;
	publisherDate: string;
	publisherLocation: string;
	printType: string;
	creator: Array<string>;

	constructor(json: WorkJSON, nodeId:string){
		this.nodeId = nodeId;
		this.title = json.title;
		this.creator = json.creator;
		this.publisherName = json.pn;
		this.publisherDate = json.pd;
		this.publisherLocation = json.pl;
		this.printType = json.pt;
	}
}



class Person {
	nodeId: string;
	creatorOf: Array<string>;	// references Works
	name: Array<string>;
	birth: string;
	death: string;

	constructor(json: PersonJSON, nodeId:string){
		this.nodeId = nodeId;
		this.creatorOf = json.co;
		this.name = json.name;
		this.birth = json.b;
		this.death = json.d;
	}

}


/**
 * The structure is an array (which could be considered the first "n" array):
 *
 *  [
 *  	{
 *  		id:string,
 *  		t:string,
 *  		n:[
 *  	 		{id:string, t:string},
 *  	 		{
 *  	 			id:string,
 *  	 			t:string,
 *  	 			n: [
 *  	 			  {id:string, t:string},
 *  	 			  {id:string, t:string},
 *  	 			  ...
 *  	 			]
 *  	 		},
 *  	 		{id:string, t:string},
 *	  	 	...
 *  		]
 *  	},
 *  	...
 *  ]
 *
 *  For Example:
 *
[
 {
    "id": "MW22006_7FAF5A",
    "t": ["རྟོགས་བརྗོད་གསེར་གྱི་མེ་ཏོག་གི་ཚིག་འགྲེལ།"],
    "n": [
      {"id": "MW22006_480A88", "t": ["གླེང་གཞི།"]},
      {"id": "MW22006_36F328", "t": ["རྩོམ་པ་པོ་ངོ་སྤྲོད་མདོར་བསྡུས།"]},
      {"id": "MW22006_97F704", "t": ["རྟོགས་བརྗོད་དངོས།"]}
    ]
  },
 {
    "id": "MW22006_16B6DF",
    "t": ["རྟོགས་བརྗོད་དངུལ་གྱི་མེ་ཏོག་གི་ཚིག་འགྲེལ།"],
    "n": [
      {"id": "MW22006_E0D748", "t": ["ངོ་མཚར་བའི་གཏམ་དང་པོ།"]},
      {"id": "MW22006_B05308", "t": ["རྩོམ་པ་པོ་ངོ་སྤྲོད་མདོར་བསྡུས།"]},
      {"id": "MW22006_FBA8AE", "t": ["ངོ་མཚར་བའི་གཏམ་དྲུག་པ།"]},
      {"id": "MW22006_8B8F50", "t": ["ངོ་མཚར་བའི་གཏམ་གཉིས་པ།"]},
      {"id": "MW22006_E3BC90", "t": ["ངོ་མཚར་བའི་གཏམ་བདུན་པ།"]},
      {"id": "MW22006_E92874", "t": ["ངོ་མཚར་བའི་གཏམ་བཞི་པ།"]},
      {"id": "MW22006_EBA860", "t": ["ངོ་མཚར་བའི་གཏམ་ལྔ་པ།"]},
      {"id": "MW22006_2F1373", "t": ["ངོ་མཚར་བའི་གཏམ་གསུམ་པ།"]},
      {"id": "MW22006_4A616A", "t": ["དགེ་བསྔོ་དང་མཛད་བྱང་།"]},
      {"id": "MW22006_E26CF2", "t": ["ངོ་མཚར་བའི་གཏམ་བརྒྱད་པ།"]}
    ]
  }
 ]
 *
 */

class WorkPart {
	nodeId:string;
	title:string;
	workPartItems:WorkPartItem[];

	@computed
	get workId() {
		const underscoreIdx = this.nodeId.lastIndexOf('_');
		return -1!=underscoreIdx ? this.nodeId.substring(0, underscoreIdx) : this.nodeId;
	}

	constructor(json: WorkPartItemJSON[], nodeId:string, title: string) {
		this.nodeId = nodeId;
		this.title = title ;
		this.workPartItems = [];
		if(json) {
			json.forEach(nodeJSON=>{
				this.workPartItems.push(new WorkPartItem(nodeJSON));
			});
		}		
	}
}

class WorkPartItem {
	id:string;
	title: Array<string>;
	workPartItems: WorkPartItem[];

	constructor(json:WorkPartItemJSON) {
		this.id = json.id;
		this.title = json.t;
		this.workPartItems = [];
		if(json.n) {
			json.n.forEach((nodeJSON:WorkPartItemJSON)=>{
				this.workPartItems.push(new WorkPartItem(nodeJSON));
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
export { Work, Person, WorkPart, WorkPartItem };






