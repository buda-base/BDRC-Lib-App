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
	RID:string;
	PublisherName:string;
	PublisherDate:string;
	PublisherLocation:string;
	PrintType:string;	
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
	NoInternetMessage:string;
	linkToWorkPre:string;
	linkToWorkPost:string;
	linkToTextPre:string;
	linkToTextPost:string;
	linkToAuthorPre:string;
	linkToAuthorPost:string;

};

type IndexFileLoadingDescriptionsType = {
	Works1:string;
	Works2:string;
	Authors:string;
	Outline1:string;
	Outline2:string;
	Outline3:string;
	Outline4:string;
	Outline5:string;
	Outline6:string;
	Outline7:string;
	Outline8:string;
	Outline9:string;
	Outline10:string;
	Outline11:string;
	Outline12:string;
	Outline13:string;
	Outline14:string;
	Outline15:string;
	Outline16:string;
	Outline17:string;
	Outline18:string;
	Outline19:string;
	Outline20:string;
	Outline21:string;
	Outline22:string;
	OutlineWorkTitles:string;
};



var en:LocalizedStringsType = {
	displayNum(num:number){
		return ''+num;
	},
	displayStatus(status:string){
		if(status==='seekingOut') return this.statusSeekingOut;
		else if(status==='acquiring') return this.statusAcquiring; 
		else if(status==='accessioned') return this.statusAccessioned;
		else if(status==='released') return this.statusReleased;
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
	RID:'RID',
	PublisherName:'Publisher Name',
	PublisherDate:'Publisher Date',
	PublisherLocation:'Publisher Location',
	PrintType:'Print Type',
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
		Works1:'Loading Works 1',
		Works2:'Loading Works 2',
		Authors:'Loading Authors',
		Outline1:'Loading Outline 1',
		Outline2:'Loading Outline 2',
		Outline3:'Loading Outline 3',
		Outline4:'Loading Outline 4',
		Outline5:'Loading Outline 5',
		Outline6:'Loading Outline 6',
		Outline7:'Loading Outline 7',
		Outline8:'Loading Outline 8',
		Outline9:'Loading Outline 9',
		Outline10:'Loading Outline 10',
		Outline11:'Loading Outline 11',
		Outline12:'Loading Outline 12',
		Outline13:'Loading Outline 13',
		Outline14:'Loading Outline 14',
		Outline15:'Loading Outline 15',
		Outline16:'Loading Outline 16',
		Outline17:'Loading Outline 17',
		Outline18:'Loading Outline 18',
		Outline19:'Loading Outline 19',
		Outline20:'Loading Outline 20',
		Outline21:'Loading Outline 21',
		Outline22:'Loading Outline 22',
		OutlineWorkTitles:'Loading Outline Work Titles'	
	},
	Alert:'Alert',
	NoInternetMessage:'It appears that you are not connected to the Internet. In order to view scanned pages, you will need an Internet connection - preferably a high speed connection.',
	linkToWorkPre:'A link to BDRC work ',
	linkToWorkPost:'',
	linkToTextPre:'A link to BDRC text ',
	linkToTextPost:'',
	linkToAuthorPre:'A link to BDRC author ',
	linkToAuthorPost:'',
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
		if(status==='seekingOut') return this.statusSeekingOut;
		else if(status==='acquiring') return this.statusAcquiring; 
		else if(status==='accessioned') return this.statusAccessioned;
		else if(status==='released') return this.statusReleased;
		else return this.statusUnknown;
	},
	statusSeekingOut: 'འཚོལ་མུས།',
	statusAcquiring: 'མངགས་ཟིན།',
	statusAccessioned: 'ཐོབ་ཟིན་པ།',
	statusReleased: 'སྤེལ་ཟིན་པ།',
	statusUnknown: 'མི་གསལ།',
	appName: 'དཔེ་ཀློག་མཉེན་ཆས།',
	searchHintText: 'འཚོལ།',
	searchRequirementText: 'ཉུང་མཐར་ཚེག་བར་གཉིས་འཚོལ་དགོས།',
	resultsFoundPre:'འཚོལ་འབྲས་ ',
	resultsFoundPost:'',
	Name:'མཚན།',	
	CreatorOf:'མཛད་པ་པོ།',	
	Birth:'འཁྲུངས་ལོ།',	
	Death:'འདས་ལོ།',	
	Status:'གནས་བབས།',	
	Creator:'མཛད་པ་པོ།',	
	RID:'བརྩམས་ཆོས་ངོ་རྟགས།',
	Title:'མཚན་བྱང་།',	
	PublisherName:'པར་མཁན།',
	PublisherDate:'པར་དུས།',
	PublisherLocation:'པར་གནས།',
	PrintType:'པར་གཞི།',
	Volume:'པོད་',
	Volumes:'པོད་གྲངས།',	
	IsOutlineOf:'ས་བཅད།',	
	VIEW:'ཀློག',
	SHARE:'བརྒྱུད་བསྐུར།',
	pagesPre:' ཤོག་གྲངས་',
	pagesPost:'',
	viewWarning:'དཔེ་ཀློག་བརྒྱབ་ཆེད་དྲ་རྒྱ་ཡོད་དགོས།',
	Information:'པར་སྐྲུན་གནས་ཚུལ།',
	BuddhistDigitalResourceCenter:'ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས།',
	OK:'ལེགས་སོ།',
	BACK:'ཕྱིར་ལོག',
	InitializingDatabase:'དཔེ་མཛོད་མ་ལག་སྒྲིག་མུས་ཡིན།',
	ProcessingPre:'',
	ProcessingPost:' སྒྲིག་མུས་ཡིན།',
	LoadingPre:'Loading ',
	LoadingPost:'',
	Welcome:'བྱོན་པ་ལེགས། མཉེན་ཆས་ནང་དཔེ་མཛོད་མ་ལག་བསྒྲིག་དགོས་པས་སྐར་མ་འགའ་ཤས་སྒུགས།',
	databaseInitFailed: 'དཔེ་མཛོད་མ་ལག་བསྒྲིགས་ཐུབ་མ་སོང་། མཉེན་ཆས་སྒོ་བརྒྱབ་ནས་བསྐྱར་དུ་འབྱེད་རོགས།',
	IndexFileLoadingDescriptions:{
		Works1:'མཚན་བྱང་སྒྲིག་མུས་ཡིན།',
		Works2:'མཚན་བྱང་སྒྲིག་མུས་ཡིན།',
		Authors:'མཛད་པ་པོ་སྒྲིག་མུས་ཡིན།',
		Outline1:'དཀར་ཆག་ཨང་ ༡ སྒྲིག་མུས་ཡིན།',
		Outline2:'དཀར་ཆག་ཨང་ ༢ སྒྲིག་མུས་ཡིན།',
		Outline3:'དཀར་ཆག་ཨང་ ༣ སྒྲིག་མུས་ཡིན།',
		Outline4:'དཀར་ཆག་ཨང་ ༤ སྒྲིག་མུས་ཡིན།',
		Outline5:'དཀར་ཆག་ཨང་ ༥ སྒྲིག་མུས་ཡིན།',
		Outline6:'དཀར་ཆག་ཨང་ ༦ སྒྲིག་མུས་ཡིན།',
		Outline7:'དཀར་ཆག་ཨང་ ༧ སྒྲིག་མུས་ཡིན།',
		Outline8:'དཀར་ཆག་ཨང་ ༨ སྒྲིག་མུས་ཡིན།',
		Outline9:'དཀར་ཆག་ཨང་ ༩ སྒྲིག་མུས་ཡིན།',
		Outline10:'དཀར་ཆག་ཨང་ ༡༠ སྒྲིག་མུས་ཡིན།',
		Outline11:'དཀར་ཆག་ཨང་ ༡༡ སྒྲིག་མུས་ཡིན།',
		Outline12:'དཀར་ཆག་ཨང་ ༡༢ སྒྲིག་མུས་ཡིན།',
		Outline13:'དཀར་ཆག་ཨང་ ༡༣ སྒྲིག་མུས་ཡིན།',
		Outline14:'དཀར་ཆག་ཨང་ ༡༤ སྒྲིག་མུས་ཡིན།',
		Outline15:'དཀར་ཆག་ཨང་ ༡༥ སྒྲིག་མུས་ཡིན།',
		Outline16:'དཀར་ཆག་ཨང་ ༡༦ སྒྲིག་མུས་ཡིན།',
		Outline17:'དཀར་ཆག་ཨང་ ༡༧ སྒྲིག་མུས་ཡིན།',
		Outline18:'དཀར་ཆག་ཨང་ ༡༨ སྒྲིག་མུས་ཡིན།',
		Outline19:'དཀར་ཆག་ཨང་ ༡༩ སྒྲིག་མུས་ཡིན།',
		Outline20:'དཀར་ཆག་ཨང་ ༢༠ སྒྲིག་མུས་ཡིན།',
		Outline21:'དཀར་ཆག་ཨང་ ༢༡ སྒྲིག་མུས་ཡིན།',
		Outline22:'དཀར་ཆག་ཨང་ ༢༢ སྒྲིག་མུས་ཡིན།',
		OutlineWorkTitles:'བསྒྲིགས་ཟིན།'	       	// NOTE: This means "initialization done" and because it is the last file processed, everything works out just fine
	},
	Alert:'གསལ་བརྡ།',
	NoInternetMessage:'སྐུ་ཉིད་དྲ་བར་འཐུད་མེད་པར་སྣང་། དཔེ་ཀློག་གནང་བའི་ཆེད་དུ་དྲ་ལམ་གྱི་བརྡ་རྟགས་ལེགས་པོ་ཡོད་དགོས།',
	linkToWorkPre:'ཆོས་ཚན་ཨང་རྟགས་ ',
	linkToWorkPost:' གི་དྲ་ཐག',
	linkToTextPre:'ཆོས་ཚན་ཨང་རྟགས་ ',
	linkToTextPost:' གི་དྲ་ཐག',
	linkToAuthorPre:'ཆོས་ཚན་ཨང་རྟགས་ ',
	linkToAuthorPost:' གི་དྲ་ཐག',
};


export {en, bo};
export type {LocalizedStringsType};

