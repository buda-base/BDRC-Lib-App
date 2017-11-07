// @flow
 
export type LocalizedStringsType = {
	id:string,
	displayNum: (number)=>string;
	displayStatus: (string)=>string;
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
	PersonRID:string;
	WorkRID:string;
	OutlineRID:string;
	PublisherName:string;
	PublisherDate:string;
	PublisherLocation:string;
	PrintType:string;	
	VolumePre:string;
	VolumePost:string;
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
	about:string;
	english:string;
	tibetan:string;
	chinese:string;
	interfaceLanguage:string;
	pleaseSelectInterfaceLanguage:string;
	searchHelpText:string;
	PDF:string;
	pleaseWaitWhileWeGenerateYourPDF:string;
	yourPDFHasBeenGenerated:string;
	downloadOrCopyLink:string;
	CLOSE:string;
	anErrorOccurred:string;
	Help:string;
	linkCopiedToClipboard:string;
	NeedHelpAskALibrarian:string;
	OnWeChatInChina:string;
	OnFacebookMessenger:string;
	OrContactUsEmail:string;
	snackbarLinkCopiedToClipboard:string;
	snackbarFailedToCopyLink:string;
	snackbarDownloading:string;	
	snackbarDownloadFailed:string;
	invalidSearchText:string;
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



export const en:LocalizedStringsType = {
	id:'en',
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
	PersonRID:'Person RID',
	WorkRID:'Work RID',
	OutlineRID:'Outline RID',
	PublisherName:'Publisher Name',
	PublisherDate:'Publisher Date',
	PublisherLocation:'Publisher Location',
	PrintType:'Print Type',
	VolumePre:'Volume ',
	VolumePost:'',
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
	about:'About',
	english:'english',
	tibetan:'བོད་ཡིག',
	chinese:'中文',
	interfaceLanguage:'Interface Language',
	pleaseSelectInterfaceLanguage:'Please select interface language.',
	searchHelpText: 'Search for works by title such as བཀའ་འགྱུར།, authors by name such as བུ་སྟོན།, texts by title such as  བཀྲ་ཤིས་ཆེན་པོའི་མདོ།, or BDRC RIDs such as W22084. Unicode Tibetan must be used, except in the case of an RID.',
	PDF:'PDF',
	pleaseWaitWhileWeGenerateYourPDF:'Please wait while we generate your PDF.',
	yourPDFHasBeenGenerated:'Your PDF has been generated.',
	downloadOrCopyLink:'Download or Copy Link',
	CLOSE:'CLOSE',
	anErrorOccurred:'An error occurred. Please contact inquiry@tbrc.org to describe what lead to this error.',
	Help:'Help',
	linkCopiedToClipboard:'Link copied to clipboard',
	NeedHelpAskALibrarian:'Need help? Ask a librarian',
	OnWeChatInChina:'On WeChat in China:',
	OnFacebookMessenger: 'On Facebook Messenger outside of China:',
	OrContactUsEmail:'Or send an email to inquiry@tbrc.org:',
	snackbarLinkCopiedToClipboard:'Link copied to clipboard',
	snackbarFailedToCopyLink:'Failed to copy link',
	snackbarDownloading:'Downloading in the background',
	snackbarDownloadFailed:'Download Failed',
	invalidSearchText:'Only Unicode Tibetan or BDRC RIDs will find valid results.',
};





export const cn:LocalizedStringsType = {
	id:'cn',
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
	statusSeekingOut: '寻找',
	statusAcquiring: '正在取得该书',
	statusAccessioned: '正在编目中',
	statusReleased: '发布',
	statusUnknown: '未知',
	appName: '佛教数字资源中心图书资料库',	
	searchHintText: '检索',
	searchRequirementText: '检索时须输入两个音节',
	resultsFoundPre:'',
	resultsFoundPost:'检索结果',
	Name:'名称',	
	CreatorOf:'作者',	
	Birth:'出生',	
	Death:'死亡',	
	Status:'状态',	
	Creator:'作者',	
	Title:'标题',	
	RID:'资源编号',
	PersonRID:'作者编号',
	WorkRID:'藏书编号',
	OutlineRID:'目录编号',
	PublisherName:'发行人名称',
	PublisherDate:'发行日期',
	PublisherLocation:'发行地点',
	PrintType:'打印类型',
	VolumePre:'第',
	VolumePost:'卷',
	Volumes:'卷',	
	IsOutlineOf:'概述',	
	VIEW:'阅读',
	SHARE:'分享',
	pagesPre:' ',
	pagesPost:'页',
	viewWarning:'阅读扫描文档需有稳定的互联网。',
	Information:'信息',
	BuddhistDigitalResourceCenter:'佛教数字资源中心',
	OK:'确认',
	BACK:'返回',
	InitializingDatabase:'初始化数据库',
	Welcome:'欢迎您！本应用程序需要初始化BDRC图书资料库。请耐心等待。这可能需要几分钟。',
	databaseInitFailed: '初始化数据失败。请退出应用程序再试一次。',
	IndexFileLoadingDescriptions:{
		Works1:'正在处理文本1',
		Works2:'正在处理文本2',
		Authors:'正在处理作者',
		Outline1:'正在处理图书目录1',
		Outline2:'正在处理图书目录2',
		Outline3:'正在处理图书目录3',
		Outline4:'正在处理图书目录4',
		Outline5:'正在处理图书目录5',
		Outline6:'正在处理图书目录6',
		Outline7:'正在处理图书目录7',
		Outline8:'正在处理图书目录8',
		Outline9:'正在处理图书目录9',
		Outline10:'正在处理图书目录10',
		Outline11:'正在处理图书目录11',
		Outline12:'正在处理图书目录12',
		Outline13:'正在处理图书目录13',
		Outline14:'正在处理图书目录14',
		Outline15:'正在处理图书目录15',
		Outline16:'正在处理图书目录16',
		Outline17:'正在处理图书目录17',
		Outline18:'正在处理图书目录18',
		Outline19:'正在处理图书目录19',
		Outline20:'正在处理图书目录20',
		Outline21:'正在处理图书目录21',
		Outline22:'正在处理图书目录22',
		OutlineWorkTitles:'数据库初始化完成'	  // means initialization done
	},
	Alert:'推送通知',
	NoInternetMessage:'您没有连接到互联网。为了查看扫描页面，您需要连接到互联网- 最好是高速连接。',
	linkToWorkPre:'链接到BDRC藏书',
	linkToWorkPost:'',
	linkToTextPre:'链接到BDRC文本',
	linkToTextPost:'',
	linkToAuthorPre:'链接到BDRC作者',
	linkToAuthorPost:'',
	about:'关于我们',
	english:'english',
	tibetan:'བོད་ཡིག',
	chinese:'中文',
	interfaceLanguage:'界面语言',
	pleaseSelectInterfaceLanguage:'请选择界面语言',
	searchHelpText: '首先在上方栏位中输入一个藏文关键词来进行检索，如བཀའ་འགྱུར或输入BDRC RID（编号）如W22084。',
	PDF:'PDF',
	pleaseWaitWhileWeGenerateYourPDF:'请稍候，我们正在生成您的PDF。',
	yourPDFHasBeenGenerated:'您的PDF已经生成。',
	downloadOrCopyLink:'下载或复制链接',
	CLOSE:'关闭',
	linkCopiedToClipboard:'链接复制到剪贴板',
	anErrorOccurred:'应用程序出现错误。请写信至inquiry@tbrc.org 并描述您使用的过程及所遇见的错误。谢谢您。',
	Help:'帮助与反馈',
	NeedHelpAskALibrarian:'您有使用上的疑问吗？欢迎您询问我们的图书馆员。',
	OnWeChatInChina:'如您在中国，请使用以下微信公众号与我们联系：',
	OnFacebookMessenger: '如您住在中国以外地区，请扫描以下的二维码：',
	OrContactUsEmail:'或者透过电子邮件与我们联系： inquiry@tbrc.org。',
	snackbarLinkCopiedToClipboard:'དྲ་ཐག་བཤུས་ཡོད།',
	snackbarFailedToCopyLink:'དྲ་ཐག་བཤུས་ཐུབ་མ་སོང་།',
	snackbarDownloading:'ཁ་པར་ནང་ཕབ་ལེན་བྱེད་བཞིན་ཡོད།',
	snackbarDownloadFailed:'ཕབ་ལེན་བྱེད་ཐུབ་མ་སོང་།',
	invalidSearchText:'[Only Unicode Tibetan or BDRC RIDs will find valid results.]',
};


const bo_nums = ["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"];
export const bo:LocalizedStringsType = {
	id:'bo',
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
	searchHintText: 'དཔེ་ཆའི་མཚན་བྱང་ངམ་མཛད་པ་པོའི་མཚན་འཚོལ།',
	searchRequirementText: 'ཉུང་མཐར་ཚེག་བར་གཉིས་འབྲི་དགོས།',
	resultsFoundPre:'བཙལ་འབྲས་ ',
	resultsFoundPost:'',
	Name:'མཚན།',
	CreatorOf:'བརྩམས་ཆོས།',	
	Birth:'འཁྲུངས་ལོ།',	
	Death:'འདས་ལོ།',	
	Status:'གནས་བབས།',	
	Creator:'མཛད་པ་པོ།',	
	RID:'ཨང་རྟགས།',
	PersonRID:'མི་སྣ་ཨང་།',
	WorkRID:'བརྩམས་ཆོས་ཨང་།',
	OutlineRID:'ས་བཅད་ཨང་།',
	Title:'མཚན་བྱང་།',	
	PublisherName:'པར་མཁན།',
	PublisherDate:'པར་དུས།',
	PublisherLocation:'པར་གནས།',
	PrintType:'པར་གཞི།',
	VolumePre:'པོད་ཨང་ ',
	VolumePost:'',
	Volumes:'པོད་གྲངས།',	
	IsOutlineOf:'ཁུངས།',		
	VIEW:'ཀློག',
	SHARE:'བརྒྱུད་བསྐུར།',
	pagesPre:' ཤོག་གྲངས་',
	pagesPost:'',
	viewWarning:'ཀློག་འདོན་བྱེད་པར་དྲ་རྒྱ་བརྟན་པོ་ཡོད་དགོས།',
	Information:'པར་སྐྲུན་གནས་ཚུལ།',
	BuddhistDigitalResourceCenter:'ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས།',
	OK:'ལེགས་སོ།',
	BACK:'ཕྱིར་ལོག',
	InitializingDatabase:'དཔེ་མཛོད་མ་ལག་སྒྲིག་མུས་ཡིན།',
	ProcessingPre:'',
	ProcessingPost:' སྒྲིག་མུས་ཡིན།',
	LoadingPre:'Loading ',
	LoadingPost:'',
	Welcome:'བྱོན་པ་ལེགས། མཉེན་ཆས་ནང་དཔེ་མཛོད་མ་ལག་སྒྲིག་དགོས་པས་སྐར་མ་འགར་སྒུགས།',
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
		OutlineWorkTitles:'དཔེ་མཛོད་བསྒྲིགས་ཟིན།'	       	// NOTE: This means "initialization done" and because it is the last file processed, everything works out just fine
	},
	Alert:'གསལ་བརྡ།',
	NoInternetMessage:'སྐུ་ཉིད་དྲ་བར་འཐུད་ཐུབ་མེད་པར་སྣང་། དཔེ་ཀློག་གནང་བའི་ཆེད་དུ་དྲ་རྒྱ་ལེགས་པོ་ཡོད་དགོས།',
	linkToWorkPre:'བརྩམས་ཆོས་ཨང་ ',
	linkToWorkPost:' གི་དྲ་ཐག',
	linkToTextPre:'ཆོས་ཚན་ཨང་རྟགས་ ',
	linkToTextPost:' གི་དྲ་ཐག',
	linkToAuthorPre:'ཆོས་ཚན་ཨང་རྟགས་ ',
	linkToAuthorPost:' གི་དྲ་ཐག',
	about:'ང་ཚོའི་སྐོར།',
	english:'english',
	tibetan:'བོད་ཡིག',
	chinese:'中文',
	interfaceLanguage:'སྐད་ཡིག་འདེམ་གསེས།',
	pleaseSelectInterfaceLanguage:'སྐད་ཡིག་ཅིག་འདེམ་རོགས།',
	searchHelpText: '',
	PDF:'PDF',
	pleaseWaitWhileWeGenerateYourPDF:'ཁྱེད་ཀྱི་ PDF བཟོ་མུས་ཡིན།',	
	yourPDFHasBeenGenerated:'ཁྱེད་ཀྱི་PDF བཟོས་ཟིན།',
	downloadOrCopyLink:'ཕབ་ལེེན་དང་ཕབ་ལེན་དྲ་ཐག',
	CLOSE:'སྒོ་རྒྱོབས།',
	linkCopiedToClipboard:'དྲ་ཐག་བཤུས་ཡོད།',
	anErrorOccurred:'གནད་དོན་ཞིག་ལྷག་སོང་བས། inquiry@tbrc.org ཐོག་གནད་དོན་དེའི་གསལ་ཁ་སྐྱོན་དང་ང་ཚོས་རམ་འདེགས་བྱ་ངེས།',
	Help:'རམ་འདེགས།',
	NeedHelpAskALibrarian:'འབྲེལ་གཏུགས།',
	OnWeChatInChina:'རྒྱ་ནག་ནང་ཁུལ་ནས་སྐད་འཕྲིན་མཐུད་ས།',
	OnFacebookMessenger: 'ཕྱི་རྒྱལ་ཁག་ནས་ངོ་དེབ་མཐུད་ས།',
	OrContactUsEmail:'inquiry@tbrc.org ཐོག་འབྲེལ་གཏུགས་བྱེད་ཀྱང་ཆོག',
	snackbarLinkCopiedToClipboard:'དྲ་ཐག་བཤུས་ཡོད།',
	snackbarFailedToCopyLink:'དྲ་ཐག་བཤུས་ཐུབ་མ་སོང་།',
	snackbarDownloading:'ཁ་པར་ནང་ཕབ་ལེན་བྱེད་བཞིན་ཡོད།',
	snackbarDownloadFailed:'ཕབ་ལེན་བྱེད་ཐུབ་མ་སོང་།',
	invalidSearchText:'བོད་ཡིག་གམ་BDRCཨང་རྟགས་འབྲི་དགོས།',
};

