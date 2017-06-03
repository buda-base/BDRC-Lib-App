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
	pagesPre:string;
	pagesPost:string;
	viewWarning:string;
	Information:string;
	BuddhistDigitalResourceCenter:string;
	OK:string;
	BACK:string;
	InitializingDatabase:string;
	Welcome:string;
	databaseInitFailed:string;
	IndexFileLoadingDescriptions:IndexFileLoadingDescriptionsType;
	Alert:string;
};

type IndexFileLoadingDescriptionsType = {
	Works:string;
	Authors:string;
	Outline1:string;
	Outline2:string;
	Outline3:string;
	Outline4:string;
	Outline5:string;
	Outline6:string;
	Outline7:string;
	OutlineWorkTitles:string;
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
	Volume:'Volume ',
	Volumes:'Volumes',	
	IsOutlineOf:'Is Outline Of',	
	VIEW:'VIEW',
	SHARE:'SHARE',
	pagesPre:', ',
	pagesPost:' pages',
	viewWarning:'Viewing scans requires a reliable Internet connection.',
	Information:'Information',
	BuddhistDigitalResourceCenter:'Buddhist Digital Resource Center',
	OK:'OK',
	BACK:'BACK',
	InitializingDatabase:'Initializing Database',
	Welcome:'Welcome! The application needs to initialize the BDRC library. Please be patient. This may take a few minutes.',
	databaseInitFailed: 'Failed to initialize the database. Please quit the app and try again.',
	IndexFileLoadingDescriptions:{
		Works:'Loading Works',
		Authors:'Loading Authors',
		Outline1:'Loading Outline 1',
		Outline2:'Loading Outline 2',
		Outline3:'Loading Outline 3',
		Outline4:'Loading Outline 4',
		Outline5:'Loading Outline 5',
		Outline6:'Loading Outline 6',
		Outline7:'Loading Outline 7',
		OutlineWorkTitles:'Loading Outline Work Titles'	
	},
	Alert:'Alert'
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
	statusSeekingOut: 'ང་ཚོར་དགོས་པ།',
	statusAcquiring: 'ལས་བཞིན་པ།',
	statusAccessioned: 'ཐོབ་ཟིན་པ།',
	statusReleased: 'སྤེལ་ཟིན་པ།',
	statusUnknown: 'མི་གསལ།',
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
	SHARE:'བརྒྱུད་བསྐུར།',
	pagesPre:' ཤོག་གྲངས་',
	pagesPost:'',
	viewWarning:'དཔེ་ཀློག་བརྒྱབ་ཆེད་དྲ་རྒྱ་ཡོད་དགོས།',
	Information:'པར་སྐྲུན་གནས་ཚུལ།',
	BuddhistDigitalResourceCenter:'ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས།',
	OK:'ཕྱིར་འབུད།',
	BACK:'ཕྱིར་ལོག',
	InitializingDatabase:'དཔེ་མཛོད་མ་ལག་སྒྲིག་མུས་ཡིན།',
	ProcessingPre:'',
	ProcessingPost:' སྒྲིག་མུས་ཡིན།',
	LoadingPre:'Loading ',
	LoadingPost:'',
	Welcome:'བཀྲ་ཤིས་བདེ་ལེགས། མཉེན་ཆས་ནང་དཔེ་མཛོད་མ་ལག་བསྒྲིག་དགོས་པས་སྐར་མ་འགའ་ཤས་བསྒུག་རོགས་ཞུ།',
	databaseInitFailed: 'དཔེ་མཛོད་མ་ལག་བསྒྲིགས་ཐུབ་མ་སོང་། མཉེན་ཆས་སྒོ་བརྒྱབ་ནས་བསྐྱར་དུ་འབྱེད་རོགས།',
	IndexFileLoadingDescriptions:{
		Works:'མཚན་བྱང་སྒྲིག་མུས་ཡིན།',
		Authors:'མཛད་པ་པོ་སྒྲིག་མུས་ཡིན།',
		Outline1:'དཀར་ཆག་ཨང་ ༡ སྒྲིག་མུས་ཡིན།',
		Outline2:'དཀར་ཆག་ཨང་ ༢ སྒྲིག་མུས་ཡིན།',
		Outline3:'དཀར་ཆག་ཨང་ ༣ སྒྲིག་མུས་ཡིན།',
		Outline4:'དཀར་ཆག་ཨང་ ༤ སྒྲིག་མུས་ཡིན།',
		Outline5:'དཀར་ཆག་ཨང་ ༥ སྒྲིག་མུས་ཡིན།',
		Outline6:'དཀར་ཆག་ཨང་ ༦ སྒྲིག་མུས་ཡིན།',
		Outline7:'དཀར་ཆག་ཨང་ ༧ སྒྲིག་མུས་ཡིན།',
		OutlineWorkTitles:'སྒྲིག་མུས་ཡིན།'	
	},
	Alert:'གནས་ཚུལ།'
};


export {en, bo};
export type {LocalizedStringsType};

