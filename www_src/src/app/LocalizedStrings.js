// @flow
 
type LocalizedStringsType = {
	displayNum: (number)=>string;
	displayStatus: (string)=>string;
	appName: string;
	appName: string;
	searchHintText: string;
	searchRequirementText: string;
	resultsFoundPre:string;
	resultsFoundPost:string;
	Name:string;
	CreatorOf:string;	
	Birth:string;	
	Death:string;	
	Status:string;	
	Creator:string;	
	Title:string;	
	Volume:string;
	Volumes:string;	
	IsOutlineOf:string;	
	VIEW:string;
	SHARE:string;
};


var en:LocalizedStringsType = {
	displayNum(num:number){
		return ''+num;
	},
	displayStatus(status:string){
		if('seekingOut') return this.statusSeekingOut;
		else if('acquiring') return this.statusAcquiring; 
		else if('accessioned') return this.statusAccessioned;
		else if('released') return this.statusReleased;
		else return this.statusUnknown;
	},
	statusSeekingOut: 'Seeking Out',
	statusAcquiring: 'Acquiring',
	statusAccessioned: 'Accessioned',
	statusReleased: 'Released',
	statusUnknown: 'Unknown',
	appName: 'BDRC Lib',
	searchHintText: 'Search',
	searchRequirementText: 'Two syllables are required for search',
	resultsFoundPre:'',
	resultsFoundPost:' results found',
	Name:'Name',	
	CreatorOf:'Creator Of',	
	Birth:'Birth',	
	Death:'Death',	
	Status:'Status',	
	Creator:'Creator',	
	Title:'Title',	
	Volume:'Volume',
	Volumes:'Volumes',	
	IsOutlineOf:'Is Outline Of',	
	VIEW:'VIEW',
	SHARE:'SHARE'
};


var bo_nums = ["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"];
var bo:LocalizedStringsType = {
	displayNum(num:number){
		let result = '';
		if(num  && num == parseInt(num)) {
			while(num>0){
				let v = num%10;
				result = bo_nums[v]+result;
				num = parseInt(num/10);
			}
		}
		return result;
	},
	displayStatus(status:string){
		if('seekingOut') return this.statusSeekingOut;
		else if('acquiring') return this.statusAcquiring; 
		else if('accessioned') return this.statusAccessioned;
		else if('released') return this.statusReleased;
		else return this.statusUnknown;
	},
	statusSeekingOut: 'Seeking Out',
	statusAcquiring: 'Acquiring',
	statusAccessioned: 'Accessioned',
	statusReleased: 'Released',
	statusUnknown: 'Unknown',
	appName: 'དཔེ་ཀློག་སྙེ་ཆས།',
	searchHintText: 'འཚོལ།',
	searchRequirementText: 'ཉུང་མཐར་ཡིག་འབྲུ་གཉིས་འཚོལ་དགོས།',
	resultsFoundPre:'འཚོལ་འབྲས་',
	resultsFoundPost:'་རྙེད།',
	Name:'མཚན།',	
	CreatorOf:'མཛད་པ་པོ།',	
	Birth:'སྐྱེས་ལོ།',	
	Death:'འདས་ལོ།',	
	Status:'གནས་ཚུལ།',	
	Creator:'མཚན་བྱང་།',	
	Title:'མཛད་པ་པོ།',	
	Volume:'པོད་',
	Volumes:'པོད་གྲངས།',	
	IsOutlineOf:'དཀར་ཆག',	
	VIEW:'ཀློག',
	SHARE:'བརྒྱུད་བསྐུར།'
};

export {en, bo};
export type {LocalizedStringsType};

