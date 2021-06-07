export interface ILocalizedStrings	 {
	id:string,
	iifviewerlang:string,
	displayNum: (num:number)=>string;
	displayStatus: (str:string)=>string;
	accessString: (str:string)=>string;
	printTypeForCode:(str:string)=>string;
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
	WorkPartRID:string;
	PublisherName:string;
	PublisherDate:string;
	PublisherLocation:string;
	PrintType:string;	
	VolumePre:string;
	VolumePost:string;
	Volumes:string;	
	IsWorkPartOf:string;	
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

	statusSeekingOut:string;
	statusAcquiring:string;
	statusAccessioned:string;
	statusUnknown:string;
	statusReleased:string;
	
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
	Access:string;
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

	updateAvailable:string;
	updateDatabaseButtonLabel:string;
	viewChangeLog:string;
	changeMirrorConfirmation:string;
	WorkPartsLoading:string,
	AuthorsLoading:string,
	WorksLoading:string,
	Parts:string,
	International:string,
	China:string,
	ExtractingFiles:string,
	DownloadingLibrary:string,
	Complete:string,
	Cancel:string,
	Ok:string,
	PleaseConfirm:string,
	printTypeWoodblock:string,
	printTypeManuscript:string,
	printTypeModernPrint:string,
	printTypeXerography:string,
	parentWorkPart:string,
};


function localizedAccessString(accessValue:string, strings:ILocalizedStrings) {
	if('open'===accessValue)return strings.accessOpen;
	else if('restrictedbyquality'===accessValue) return strings.accessRestrictedbyquality;
	else if('restrictedbytbrc'===accessValue) return strings.accessRestrictedbytbrc;
	else if('restrictedsealed'===accessValue) return strings.accessRestrictedsealed;
	else if('restrictedtemporarily'===accessValue) return strings.accessRestrictedtemporarily;
	//else if('restrictedinchina'===accessValue) return strings.accessRestrictedinchina;
	else if('fairuse'===accessValue) return strings.accessFairuse;
	//else if('mixed'===accessValue) return strings.accessMixed;
	else return '';
}

function printTypeForCode(code:string, strings:ILocalizedStrings){
	if(null!=code) {
		if('x'===code) {
			return strings.printTypeWoodblock;
		} else	if('m'===code) {
			return strings.printTypeManuscript;
		} else	if('mo'===code) {
			return strings.printTypeModernPrint;
		} else	if('l'===code) {
			return strings.printTypeXerography;
		} else {
			return code;
		}
	} else {
		return code;
	}
}

export const en:ILocalizedStrings = {
	id:'en',
	iifviewerlang:'bo-x-ewts',
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
	accessString(accessValue){
		return localizedAccessString(accessValue, this);
	},
	printTypeForCode(code:string){
		return printTypeForCode(code, this);
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
	WorkRID:'Version RID',
	WorkPartRID:'Version RID',
	PublisherName:'Publisher Name',
	PublisherDate:'Publisher Date',
	PublisherLocation:'Publisher Location',
	PrintType:'Print Type',
	VolumePre:'Volume ',
	VolumePost:'',
	Volumes:'Volumes',	
	IsWorkPartOf:'Is Part Of',	
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
	Alert:'Alert',
	NoInternetMessage:'It appears that you are not connected to the Internet. In order to view scanned pages, you will need an Internet connection - preferably a high speed connection.',
	NoInternetMessagePDF:'It appears that you are not connected to the Internet. In order to download a PDF, you will need an Internet connection - preferably a high speed connection.',
	linkToWorkPre:'A link to BDRC version ',
	linkToWorkPost:'',
	linkToTextPre:'A link to BDRC text ',
	linkToTextPost:'',
	linkToAuthorPre:'A link to BDRC author ',
	linkToAuthorPost:'',
	about:'About',
	english:'English',
	tibetan:'བོད་ཡིག',
	chinese:'中文',
	interfaceLanguage:'Interface Language',
	pleaseSelectInterfaceLanguage:'Please select interface language.',
	searchHelpText: 'Search by title such as བཀའ་འགྱུར།, authors by name such as བུ་སྟོན།, texts by title such as  བཀྲ་ཤིས་ཆེན་པོའི་མདོ།, or BDRC RIDs such as MW22084. Unicode Tibetan must be used, except in the case of an RID.',
	PDF:'Download',
	pleaseWaitWhileWeGenerateYourPDF:'Please wait while we generate your PDF.',
	yourPDFHasBeenGenerated:'Your PDF has been generated.',
	downloadOrCopyLink:'Download or Copy Link',
	CLOSE:'CLOSE',
	anErrorOccurred:'An error occurred. Please contact help@bdrc.io to describe what lead to this error.',
	Help:'Help',
	linkCopiedToClipboard:'Link copied to clipboard',
	NeedHelpAskALibrarian:'Need help? Ask a librarian',
	OnWeChatInChina:'On WeChat in China:',
	OnFacebookMessenger: 'On Facebook Messenger outside of China:',
	OrContactUsEmail:'Or send an email to help@bdrc.io:',
	snackbarLinkCopiedToClipboard:'Link copied to clipboard',
	snackbarFailedToCopyLink:'Failed to copy link',
	snackbarDownloading:'Downloading in the background',
	snackbarDownloadFailed:'Download Failed',
	invalidSearchText:'Only Unicode Tibetan or BDRC RIDs will find valid results.',
	type1PDFErrorMessage:'We\'re sorry. Something went wrong. Please report this problem to help@bdrc.io',
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
	Access: 'Access',
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


	updateAvailable:'Updates Available',
	updateDatabaseButtonLabel:'Update Library',
	viewChangeLog:'View change log',
	changeMirrorConfirmation:'This will change the mirror for the BDRC library. The library data will need to be re-downloaded from the new mirror. This process requires a good Internet connection. Please confirm that you would like to proceed.',
	WorksLoading:'Loading Works {{COUNT}}',
	AuthorsLoading:'Loading Authors {{COUNT}}',
	WorkPartsLoading:'Loading WorkPart {{COUNT}}',
	Parts:'Parts',
	International:'International',
	China:'China',
	ExtractingFiles:'Extracting Files',
	DownloadingLibrary:'Downloading Library',
	Complete:'Complete!',
	Cancel:'Cancel',
	Ok:'Ok',
	PleaseConfirm:'Please Confirm',
	printTypeWoodblock:'Woodblock',
	printTypeManuscript:'Manuscript',
	printTypeModernPrint:'Modern print',
	printTypeXerography:'Xerography',
	parentWorkPart:'Parent Work Part',
};





export const cn:ILocalizedStrings = {
	id:'cn',
	iifviewerlang:'bo',
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
	accessString(accessValue){
		return localizedAccessString(accessValue, this);
	},
	printTypeForCode(code:string){
		return printTypeForCode(code, this);
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
	WorkRID:'实例编号',
	WorkPartRID:'实例编号',
	PublisherName:'发行人名称',
	PublisherDate:'发行日期',
	PublisherLocation:'发行地点',
	PrintType:'打印类型',
	VolumePre:'第',
	VolumePost:'卷',
	Volumes:'卷',	
	IsWorkPartOf:'概述',	
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
	english:'English',
	tibetan:'བོད་ཡིག',
	chinese:'中文',
	interfaceLanguage:'界面语言',
	pleaseSelectInterfaceLanguage:'请选择界面语言',
	searchHelpText: '在上方输入检索关键词：书名，如བཀའ་འགྱུར；作者，如བུ་སྟོན།；文本名，如བཀྲ་ཤིས་ཆེན་པོའི་མདོ།；BDRC RID编号如MW22084。除了BDRC RID编号外，输入的关键词必须是 Unicode编码的藏文。',
	PDF:'下载',
	pleaseWaitWhileWeGenerateYourPDF:'请稍候，我们正在生成您的PDF。',
	yourPDFHasBeenGenerated:'您的PDF已经生成。',
	downloadOrCopyLink:'下载或复制链接',
	CLOSE:'关闭',
	linkCopiedToClipboard:'链接复制到剪贴板',
	anErrorOccurred:'应用程序出现错误。请写信至help@bdrc.io 并描述您使用的过程及所遇见的错误。谢谢您。',
	Help:'帮助与反馈',
	NeedHelpAskALibrarian:'您有使用上的疑问吗？欢迎您询问我们的图书馆员。',
	OnWeChatInChina:'如您在中国，请使用以下微信公众号与我们联系：',
	OnFacebookMessenger: '如您住在中国以外地区，请扫描以下的二维码：',
	OrContactUsEmail:'或者透过电子邮件与我们联系： help@bdrc.io。',
	snackbarLinkCopiedToClipboard:'将链接复制到剪贴板',
	snackbarFailedToCopyLink:'无法复制链接',
	snackbarDownloading:'正在下载',
	snackbarDownloadFailed:'下载失败',
	invalidSearchText:'只有Unicode编码的藏文或BDRC的RID编号会得有效的检索结果。',
	type1PDFErrorMessage:'我们很抱歉，目前系统发生错误。请透过help@bdrc.io将您遇到的这个问题回报给我们。',
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
	Access: '使用权限',
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

	updateAvailable:'更新可用',
	updateDatabaseButtonLabel:'更新资源库',
	viewChangeLog:'查看升级',
	changeMirrorConfirmation:'转换服务器：这将转移BDRC的数据库。将该库的数据重新下载。这个过程需要一个良好的互联网连接。请确认您是否要继续。',
	WorkPartsLoading:'正在处理文本{{COUNT}}',
	AuthorsLoading:'正在处理作者{{COUNT}}',
	WorksLoading:'正在处理图书目录{{COUNT}}',
	Parts:'部分',
	International:'国际',
	China:'中国',
	ExtractingFiles:'解压文件',
	DownloadingLibrary:'下载库',
	Complete:'完成！',
	Cancel:'取消',
	Ok:'好',
	PleaseConfirm:'请确认',
	printTypeWoodblock:'雕版',
	printTypeManuscript:'雕版',
	printTypeModernPrint:'电脑输入',
	printTypeXerography:'静电复印',
	parentWorkPart:'Parent Work Part',
};


const bo_nums = ["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"];
export const bo:ILocalizedStrings = {
	id:'bo',
	iifviewerlang:'bo',
	displayNum(num:number){
		let result = '';
		if(0===num) return bo_nums[0];
		if(num) {
			while(num>0){
				let v = num%10;
				// console.log("v "+v+" num "+num+" bo_nums[v] "+bo_nums[v]+"result "+result);
				result = bo_nums[v]+result;
				num = Math.trunc(num/10);
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
	printTypeForCode(code:string){
		return printTypeForCode(code, this);
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
	WorkRID:'དཔེ་རྒྱུན་ཨང་།',
	WorkPartRID:'དཔེ་རྒྱུན་ཨང་།',
	Title:'མཚན་བྱང་།',	
	PublisherName:'པར་མཁན།',
	PublisherDate:'པར་དུས།',
	PublisherLocation:'པར་གནས།',
	PrintType:'པར་གཞི།',
	VolumePre:'པོད་ཨང་ ',
	VolumePost:'',
	Volumes:'པོད་གྲངས།',	
	IsWorkPartOf:'ཁུངས།',		
	VIEW:'ཀློག',
	SHARE:'དྲ་ཐག',
	pagesPre:' ཤོག་གྲངས་',
	pagesPost:'',
	viewWarning:'ཀློག་འདོན་བྱེད་པར་དྲ་རྒྱ་བརྟན་པོ་ཡོད་དགོས།',
	Information:'པར་སྐྲུན་གནས་ཚུལ།',
	BuddhistDigitalResourceCenter:'ནང་བསྟན་དཔེ་ཚོགས་ལྟེ་གནས།',
	OK:'འགྲིག་སོང་།',
	BACK:'ཕྱིར་ལོག',
	InitializingDatabase:'དཔེ་མཛོད་མ་ལག་སྒྲིག་མུས་ཡིན།',
	//ProcessingPre:'',
	//ProcessingPost:' སྒྲིག་མུས་ཡིན།',
	//LoadingPre:'Loading ',
	//LoadingPost:'',
	Welcome:'བྱོན་པ་ལེགས། མཉེན་ཆས་ནང་དཔེ་མཛོད་མ་ལག་སྒྲིག་དགོས་པས་སྐར་མ་འགར་སྒུགས།',
	databaseInitFailed: 'དཔེ་མཛོད་མ་ལག་བསྒྲིགས་ཐུབ་མ་སོང་། མཉེན་ཆས་སྒོ་བརྒྱབ་ནས་བསྐྱར་དུ་འབྱེད་རོགས།',
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
	anErrorOccurred:'གནད་དོན་ཞིག་ལྷག་སོང་བས། help@bdrc.io ཐོག་གནད་དོན་དེའི་གསལ་ཁ་སྐྱོན་དང་ང་ཚོས་རམ་འདེགས་བྱ་ངེས།',
	Help:'རམ་འདེགས།',
	NeedHelpAskALibrarian:'འབྲེལ་གཏུགས།',
	OnWeChatInChina:'རྒྱ་ནག་ནང་ཁུལ་ནས་སྐད་འཕྲིན་མཐུད་ས།',
	OnFacebookMessenger: 'ཕྱི་རྒྱལ་ཁག་ནས་ངོ་དེབ་མཐུད་ས།',
	OrContactUsEmail:'help@bdrc.io ཐོག་འབྲེལ་གཏུགས་བྱེད་ཀྱང་ཆོག',
	snackbarLinkCopiedToClipboard:'དྲ་ཐག་བཤུས་ཡོད།',
	snackbarFailedToCopyLink:'དྲ་ཐག་བཤུས་ཐུབ་མ་སོང་།',
	snackbarDownloading:'ཁ་པར་ནང་ཕབ་ལེན་བྱེད་བཞིན་ཡོད།',
	snackbarDownloadFailed:'ཕབ་ལེན་བྱེད་ཐུབ་མ་སོང་།',
	invalidSearchText:'བོད་ཡིག་གམ་BDRCཨང་རྟགས་འབྲི་དགོས།',
	type1PDFErrorMessage:'དཀའ་ངལ་ཞིག་འཕྲད་སོང་། help@bdrc.io ཐོག་གནད་དོན་དེའི་གསལ་ཁ་སྐྱོན་དང་ང་ཚོས་རམ་འདེགས་བྱ་ངེས།',
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
	Access: 'བཀག་རྒྱ།',
	accessOpen:'བཀག་རྒྱ་མེད།',
	accessFairuse: 'ཚུལ་མཐུན་བཀོལ་སྤྱོད།',
	accessMixed: 'གསལ་ཁ་མེད།',
	accessRestrictedinchina: 'གསལ་ཁ་མེད།',
	accessRestrictedbytbrc: 'ངེད་དཔེ་མཛོད་ཀྱི་བཀག་རྒྱ།',
	accessRestrictedsealed: 'གསང་རྒྱ་ཅན།',
	accessRestrictedtemporarily: 'གནས་སྐབས་ཀྱི་བཀག་རྒྱ།',
	accessRestrictedbyquality: 'སྤུས་ཚད་ཞན་པའི་བཀག་རྒྱ།',

	location:'རྒྱལ་ཁབ།',
	//pleaseSelectLocation:'རྒྱལ་ཁབ་འདེམ་རོགས།',
	//pleaseSelectLocationDescription:'རྒྱ་ནག་ནང་ཁུལ་དུ་དཔེ་ཆ་ཀློག་པ་དང་ PDF ཕབ་ལེན་བྱེད་པར་རྒྱ་ནག་ཅེས་འདེམ་དགོས། སླད་མར་སྒྲིག་འགོད་མ་ཐོ་ནང་དེ་འགྱུར་བ་གཏང་ཆོག',
	pleaseSelectLocation:'རྒྱལ་ཁབ་ཅིག་འདེམ།',
	pleaseSelectLocationDescription:'རྒྱ་ནག་ནང་བཀོལ་སྤྱོད་བྱེད་ན་རྒྱ་ནག་ཟེར་བ་དེ་འདེམ། གཞུག་ནས་ཀྱང་འདི་སྒྲིག་འགོད་ནང་འགྱུར་བ་གཏོང་ཐུབ།',
	SELECT:'འདོམ།',

	updateAvailable:'བསྐྱར་གསོ་ཡོད།',
	updateDatabaseButtonLabel:'ཡིག་མཛོད་བསྐྱར་གསོ་བྱོས།',
	viewChangeLog:'བསྐྱར་གསོའི་ཐོ་གཞུང་ལ་གཟིགས།',
	changeMirrorConfirmation:'འདིས་BDRC ཡི་ཡིག་མཛོད་ཀྱི་རྟེན་གནས་བསྒྱུར་འགྲོ་བས། ཡིག་མཛོད་ཀྱི་གཞི་གྲངས་ཁག་རྟེན་གནས་གསར་པའི་ཡིག་མཛོད་ནས་བསྐྱར་དུ་ཕབ་ལེན་བྱ་དགོས། བརྒྱུད་རིམ་འདི་ལ་དྲ་རྒྱ་ཡང་ལེགས་པོ་ཡོད་དགོས་པས། ཁྱེད་ཀྱིས་འདི་སྒྲུབ་ངེས་ཡིན་མིན་གཏན་འཁེལ་བྱ་རོགས།',
	WorkPartsLoading:'དཀར་ཆག་ཨང་ {{COUNT}} སྒྲིག་མུས་ཡིན།',
	AuthorsLoading:'མཛད་པ་པོ་སྒྲིག་མུས་ཡིན། {{COUNT}}',
	WorksLoading:'མཚན་བྱང་སྒྲིག་མུས་ཡིན། {{COUNT}}',
	Parts:'ཆ་ཤས།',
	International:'རྒྱལ་སྤྱི།',
	China:'རྒྱ་ནག',
	ExtractingFiles:'ཡིག་ཆའི་ཟྭ་ཕྱེ།',
	DownloadingLibrary:'ཡིག་མཛོད་ཕབ་ལེན་བྱེད་བཞིན་ཡོད།',
	Complete:'གྲུབ་སོང་།',
	Cancel:'ཕྱིར་འཐེན།',
	Ok:'འགྲིག',
	PleaseConfirm:'གཏན་འཁེལ་བྱ་རོགས།',
	printTypeWoodblock:'ཤིང་པར།',
	printTypeManuscript:'བྲིས་མ།',
	printTypeModernPrint:'རྩིས་འཁོར་ནང་དུ་འཇུག་པ།',
	printTypeXerography:'པར་སློག',
	parentWorkPart:'Parent Work Part',

};

