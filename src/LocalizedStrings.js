// @flow
 
export type LocalizedStringsType = {
	id:string,
	displayNum: (number)=>string;
	displayStatus: (string)=>string;
	accessString: (string)=>string;
	licenseString: (string)=>string;
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
	NoInternetMessagePDF:string;
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
	type1PDFErrorMessage:string;
	type2PDFErrorMessage:string;
	type3PDFErrorMessage:string;
	ExceptionRaised:string;
	ProcessTimeout:string;
	noImages:string;
	pdfFailed:string;
	exceptionOccurred:string;
	unknownError:string;
	notInArchive:string;
	noWorkDirectory:string;
	
	sampleAccessRight:string;
	openAccessRight:string;
	allAccessRight:string;
	ctcAccessRight:string;
	openAccessRight:string;

	noAccessRight:string;
	noneSealedRight:string;
	noneTemporaryRight:string;
	noneQualityRight:string;
	noneTbrcRight:string;
	noneChinaRight:string;

	fairUseRight:string;

	noneByCopyright:string;

	settings:string;
	librarySource:string;
	serverInChina:string;
	serverInUSA:string;
	librarySourceTitle:string;
	librarySourceDescription:string;
	License:string;
	Access:string;
	licenseCopyrighted:string;
	licensePublicdomain:string;
	licenseCcby:string;
	licenseMixed:string;
	accessOpen:string;
	accessFairuse:string;
	accessMixed:string;
	accessRestrictedinchina:string;
	accessRestrictedbytbrc:string;
	accessRestrictedsealed:string;
	accessRestrictedtemporarily:string;
	accessRestrictedbyquality:string;

	location:string;
	pleaseSelectLocation:string;
	pleaseSelectLocationDescription:string;
	SELECT:string;
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

function localizedLicenseString(licenseValue:string, strings:LocalizedStringsType) {
	if('publicdomain'===licenseValue)return strings.licensePublicdomain;
	else if('copyrighted'===licenseValue) return strings.licenseCopyrighted;
	else if('ccby'===licenseValue) return strings.licenseCcby;
	else if('mixed'===licenseValue) return strings.licenseMixed;
	else return '';
}

function localizedAccessString(accessValue:string, strings:LocalizedStringsType) {
	if('open'===accessValue)return strings.accessOpen;
	else if('restrictedbyquality'===accessValue) return strings.accessRestrictedbyquality;
	else if('restrictedbytbrc'===accessValue) return strings.accessRestrictedbytbrc;
	else if('restrictedsealed'===accessValue) return strings.accessRestrictedsealed;
	else if('restrictedtemporarily'===accessValue) return strings.accessRestrictedtemporarily;
	else if('restrictedinchina'===accessValue) return strings.accessRestrictedinchina;
	else if('fairuse'===accessValue) return strings.accessFairuse;
	else if('mixed'===accessValue) return strings.accessMixed;
	else return '';
}

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
	licenseString(licenseValue){
		return localizedLicenseString(licenseValue, this);
	},
	accessString(accessValue){
		return localizedAccessString(accessValue, this);
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
	SHARE:'WEB LINK',
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
	NoInternetMessagePDF:'It appears that you are not connected to the Internet. In order to download a PDF, you will need an Internet connection - preferably a high speed connection.',
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
	PDF:'Download',
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
	type1PDFErrorMessage:'We\'re sorry. Something went wrong. Please report this problem to inquiry@tbrc.org',
	type2PDFErrorMessage:'We\'re sorry, access to this material is restricted.',
	type3PDFErrorMessage:'We\'re sorry, this material is unavailable due to copyright restrictions.',

	ExceptionRaised:'', // 'Error 101: ',
	ProcessTimeout:'', // 'Error 102: ',
	noImages:'', // 'Error 103: ',
	pdfFailed:'', // 'Error 104: ',
	exceptionOccurred:'', // 'Error 105: ',
	unknownError:'', // 'Error 106: ',
	notInArchive:'', // 'Error 107: ',
	noWorkDirectory:'', // 'Error 108: ',
	sampleAccessRight:'', // 'Error 109: ',
	openAccessRight:'', // 'Error 110: ',
	allAccessRight:'', // 'Error 111: ',
	ctcAccessRight:'', // 'Error 112: ',
	openAccessRight:'', // 'Error 113: ',
	noAccessRight:'', // 'Error 201: ',
	noneSealedRight:'', // 'Error 202: ',
	noneTemporaryRight:'', // 'Error 203: ',
	noneQualityRight:'', // 'Error 204: ',
	noneTbrcRight:'', // 'Error 205: ',
	noneChinaRight:'', // 'Error 206: ',
	fairUseRight:'', // 'Error 207: ',
	noneByCopyright:'', // 'Error 301: ',

	settings: 'Settings',
	librarySource: 'Library Source',
	serverInChina: 'China',
	serverInUSA: 'All other countries',
	librarySourceTitle: 'Please select library source',
	librarySourceDescription: 'If you are using the BDRC Library app in China, please choose the servers in China so that images and PDFs are visible and downloadable.',
	License: 'License',
	Access: 'Access',
	licenseCopyrighted: 'Copyrighted',
	licensePublicdomain: 'Public Domain',
	licenseCcby: 'Creative Commons (CC BY)',
	licenseMixed: 'Mixed',
	accessFairuse: 'Fair Use',
	accessMixed: 'Mixed',
	accessOpen: 'Open',
	accessRestrictedinchina: 'Mixed',
	accessRestrictedbytbrc: 'Restricted by BDRC',
	accessRestrictedsealed: 'Sealed',
	accessRestrictedtemporarily: 'Temporarily Restricted',
	accessRestrictedbyquality: 'Restricted by Quality',

	location:'Location',
	pleaseSelectLocation:'Please select your location',
	pleaseSelectLocationDescription:'Select China as your location to view images and download PDFs in China. You can always change this later in settings.',
	SELECT:'Select',
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
	licenseString(licenseValue){
		return localizedLicenseString(licenseValue, this);
	},
	accessString(accessValue){
		return localizedAccessString(accessValue, this);
	},
	statusSeekingOut: '寻找',
	statusAcquiring: '正在取得该书',
	statusAccessioned: '正在编目中',
	statusReleased: '发布',
	statusUnknown: '未知',
	appName: '佛教数字资源中心图书资料库',	
	searchHintText: '用书名、作者或RID编号检索',
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
	SHARE:'网站',
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
	NoInternetMessage:'您可能尚未连上互联网。您必须有互联网才能下载PDF-最好有高速的网速。',
	NoInternetMessagePDF:'',
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
	searchHelpText: '在上方输入检索关键词：书名，如བཀའ་འགྱུར；作者，如བུ་སྟོན།；文本名，如བཀྲ་ཤིས་ཆེན་པོའི་མདོ།；BDRC RID编号如W22084。除了BDRC RID编号外，输入的关键词必须是 Unicode编码的藏文。',
	PDF:'下载',
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
	snackbarLinkCopiedToClipboard:'将链接复制到剪贴板',
	snackbarFailedToCopyLink:'无法复制链接',
	snackbarDownloading:'正在下载',
	snackbarDownloadFailed:'下载失败',
	invalidSearchText:'只有Unicode编码的藏文或BDRC的RID编号会得有效的检索结果。',
	type1PDFErrorMessage:'我们很抱歉，目前系统发生错误。请透过inquiry@tbrc.org将您遇到的这个问题回报给我们。',
	type2PDFErrorMessage:'我们很抱歉，这个文本只能开放部分浏览。',
	type3PDFErrorMessage:'我们很抱歉，这个文本因著作版权无法开放下载',

	ExceptionRaised:'', // '错误101: ',
	ProcessTimeout:'', // '错误102: ',
	noImages:'', // '错误103: ',
	pdfFailed:'', // '错误104: ',
	exceptionOccurred:'', // '错误105: ',
	unknownError:'', // '错误106: ',
	notInArchive:'', // '错误107: ',
	noWorkDirectory:'', // '错误108: ',
	sampleAccessRight:'', // '错误109: ',
	openAccessRight:'', // '错误110: ',
	allAccessRight:'', // '错误111: ',
	ctcAccessRight:'', // '错误112: ',
	openAccessRight:'', // '错误113: ',
	noAccessRight:'', // '错误201: ',
	noneSealedRight:'', // '错误202: ',
	noneTemporaryRight:'', // '错误203: ',
	noneQualityRight:'', // '错误204: ',
	noneTbrcRight:'', // '错误205: ',
	noneChinaRight:'', // '错误206: ',
	fairUseRight:'', // '错误207: ',
	noneByCopyright:'', // '错误301: ',

	settings:'设置',
	librarySource: '图书馆所在地',
	serverInChina: '中国',
	serverInUSA: '国外',
	librarySourceTitle: '请选择图书馆所在地',
	librarySourceDescription: '如果您使用的是BDRC在中国的图书资料库程序，请选择在中国的服务器，以确保图档和PDF文件皆能开启及下载。',
	License: '版权',
	Access: '使用权限',
	licenseCopyrighted: '受版权保护',
	licensePublicdomain: '公共场域',
	licenseCcby: '知识共享（CC BY）',
	licenseMixed: '不详',
	accessOpen:'开放使用',
	accessFairuse: '合理使用',
	accessMixed: '不详',
	accessRestrictedbyquality: '因质量问题限制',
	accessRestrictedinchina: '不详',
	accessRestrictedbytbrc: '为BDRC所限制',
	accessRestrictedsealed: '密封',
	accessRestrictedtemporarily: '暂时受限',

	location:'所在地',
	pleaseSelectLocation:'请选择您所在的国家。',
	pleaseSelectLocationDescription:'如果您希望在中国阅览或下载图像或PDF，请选择您的所在地为中国。您之后可以随时重新设定您的所在地。',
	SELECT:'请选择',
};


const bo_nums = ["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"];
export const bo:LocalizedStringsType = {
	id:'bo',
	displayNum(num:number){
		let result = '';

		if(0===num) return bo_nums[0];

		if(num && num == parseInt(num)) {
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
	licenseString(licenseValue){
		return localizedLicenseString(licenseValue, this);
	},
	accessString(accessValue){
		return localizedAccessString(accessValue, this);
	},
	statusSeekingOut: 'འཚོལ་མུས།',
	statusAcquiring: 'མངགས་ཟིན།',
	statusAccessioned: 'ཐོབ་ཟིན་པ།',
	statusReleased: 'སྤེལ་ཟིན་པ།',
	statusUnknown: 'མི་གསལ།',
	appName: 'དཔེ་ཀློག་མཉེན་ཆས།',
	searchHintText: 'དཔེ་ཆའི་མཚན་བྱང་ངམ་མཛད་པ་པོའི་མཚན་བྲིས་ཏེ་འཚོལ།',
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
	SHARE:'དྲ་ཚིགས།',
	pagesPre:' ཤོག་གྲངས་',
	pagesPost:'',
	viewWarning:'ཀློག་འདོན་བྱེད་པར་དྲ་རྒྱ་བརྟན་པོ་ཡོད་དགོས།',
	Information:'པར་སྐྲུན་གནས་ཚུལ།',
	BuddhistDigitalResourceCenter:'ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས།',
	OK:'འགྲིག་སོང་།',
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
	NoInternetMessage:'ཕལ་ཆེར་དྲ་རྒྱར་མཐུད་མེད་པ་འདྲ། PDFཕབ་ལེན་བྱེད་པར་དྲ་རྒྱ་ཤུགས་ཆེ་ཙམ་ཡོད་དགོས།',
	NoInternetMessagePDF:'',
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
	PDF:'ཕབ་ལེན།',
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
	type1PDFErrorMessage:'དཀའ་ངལ་ཞིག་འཕྲད་སོང་། inquiry@tbrc.org ཐོག་གནད་དོན་དེའི་གསལ་ཁ་སྐྱོན་དང་ང་ཚོས་རམ་འདེགས་བྱ་ངེས།',
	type2PDFErrorMessage:'དཔེ་ཆ་བཀག་རྒྱ་མ།',
	type3PDFErrorMessage:'བདག་དབང་ཅན་གྱི་དཔེ་ཆ།',
	
	ExceptionRaised:'', // 'གནད་དོན་ཨང་༡༠༡ ',
	ProcessTimeout:'', // 'གནད་དོན་ཨང་༡༠༢ ',
	noImages:'', // 'གནད་དོན་ཨང་༡༠༣ ',
	pdfFailed:'', // 'གནད་དོན་ཨང་༡༠༤ ',
	exceptionOccurred:'', // 'གནད་དོན་ཨང་༡༠༥ ',
	unknownError:'', // 'གནད་དོན་ཨང་༡༠༦ ',
	notInArchive:'', // 'གནད་དོན་ཨང་༡༠༧ ',
	noWorkDirectory:'', // 'གནད་དོན་ཨང་༡༠༨ ',
	sampleAccessRight:'', // 'གནད་དོན་ཨང་༡༠༩ ',
	openAccessRight:'', // 'གནད་དོན་ཨང་༡༡༠ ',
	allAccessRight:'', // 'གནད་དོན་ཨང་༡༡༡ ',
	ctcAccessRight:'', // 'གནད་དོན་ཨང་༡༡༢ ',
	openAccessRight:'', // 'གནད་དོན་ཨང་༡༡༣ ',
	noAccessRight:'', // 'གནད་དོན་ཨང་༢༠༡ ',
	noneSealedRight:'', // 'གནད་དོན་ཨང་༢༠༢ ',
	noneTemporaryRight:'', // 'གནད་དོན་ཨང་༢༠༣ ',
	noneQualityRight:'', // 'གནད་དོན་ཨང་༢༠༤ ',
	noneTbrcRight:'', // 'གནད་དོན་ཨང་༢༠༥ ',
	noneChinaRight:'', // 'གནད་དོན་ཨང་༢༠༦ ',
	fairUseRight:'', // 'གནད་དོན་ཨང་༢༠༧ ',
	noneByCopyright:'', // 'གནད་དོན་ཨང་༣༠༡ ',

	settings: 'སྒྲིག་འགོད།',
	librarySource: 'ཡིག་ཆ་ལེན་གནས།',
	serverInChina: 'རྒྱ་ནག',
	serverInUSA: 'ཕྱི་རྒྱལ།',
	librarySourceTitle: 'ཡིིག་ཆ་ལེན་གནས་གཅིག་འདེམ་རོགས།',
	librarySourceDescription: 'རྒྱ་ནག་ནང་ཁུལ་དུ་ PDF ཕབ་ལེན་བྱེད་མི་ཐུབ་པའི་དཀའ་ངལ་སེལ་ཕྱིར་ཡིག་ཆ་ལེན་གནས་ལས་རྒྱ་ནག་ཅེས་འདེམ་དགོས།',
	License: 'བདག་དབང་།',
	Access: 'བཀག་རྒྱ།',
	licenseCopyrighted: 'བདག་དབང་ཅན།',
	licensePublicdomain: 'སྤྱི་སྤྱོད་ཁྱབ་ཁོངས།',
	licenseCcby: 'གསལ་ཁ་མེད།',
	licenseMixed: 'གསལ་ཁ་མེད།',
	accessOpen:'བཀག་རྒྱ་མེད།',
	accessFairuse: 'ཚུལ་མཐུན་བཀོལ་སྤྱོད།',
	accessMixed: 'གསལ་ཁ་མེད།',
	accessRestrictedinchina: 'གསལ་ཁ་མེད།',
	accessRestrictedbytbrc: 'ངེད་དཔེ་མཛོད་ཀྱི་བཀག་རྒྱ།',
	accessRestrictedsealed: 'གསང་རྒྱ་ཅན།',
	accessRestrictedtemporarily: 'གནས་སྐབས་ཀྱི་བཀག་རྒྱ།',
	accessRestrictedbyquality: 'སྤུས་ཚད་ཞན་པའི་བཀག་རྒྱ།',

	location:'རྒྱལ་ཁབ།',
	pleaseSelectLocation:'རྒྱལ་ཁབ་འདེམ་རོགས།',
	pleaseSelectLocationDescription:'རྒྱ་ནག་ནང་ཁུལ་དུ་དཔེ་ཆ་ཀློག་པ་དང་ PDF ཕབ་ལེན་བྱེད་པར་རྒྱ་ནག་ཅེས་འདེམ་དགོས། སླད་མར་སྒྲིག་འགོད་མ་ཐོ་ནང་དེ་འགྱུར་བ་གཏང་ཆོག',
	SELECT:'འདོམ།',
};

