
/*
@observer
class PDFDownload extends Component {

  @observable visible:boolean = true;
  @observable errorMode:boolean = false;
  @observable errorMessage:string;
  @observable pdfHasBeenGenerated:boolean = false;
  @observable downloadLink:string;
  @observable pdfPageLink:string;

  @observable currentlyDownloading:boolean = false;
  // @observable currentlyCopyingLink:boolean = false;

  @observable toastShown:boolean = false;
  @observable toastMessage:string;

  componentDidMount(){
    this.queryForPDF();
  } 

  hideDialog = () => {
    this.visible = false;
  }

  queryForPDF = () => {
    let startPage = this.props.startPage ? this.props.startPage : 1;
    let generationURL = this.props.appState.libraryServer.url+'/browser/PdfServiceApp/?endPage='+this.props.endPage+'&startPage='+startPage+'&work='+this.props.workId+'&volume='+this.props.volumeId;
    $.getJSON(generationURL)
    .done((json) => {
      this.responseHandler(json);
    })
    .fail((xhr, status, err) => {
      this.responseHandler(null);
    });
  }

  responseHandler = (json:any|null) => {
    if(null==json) {

      this.errorMode = true;
      this.errorMessage = this.props.strings.NoInternetMessagePDF;

    } else {
      if(false==json.success) {

        this.errorMode = true;
        this.errorMessage = this.props.strings.anErrorOccurred;

        // Type 2
        if('noAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noAccessRight + this.props.strings.type2PDFErrorMessage;
        } else if('noneSealedRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noneSealedRight + this.props.strings.type2PDFErrorMessage;
        } else if('noneTemporaryRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noneTemporaryRight + this.props.strings.type2PDFErrorMessage;
        } else if('noneQualityRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noneQualityRight + this.props.strings.type2PDFErrorMessage;
        } else if('noneTbrcRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noneTbrcRight + this.props.strings.type2PDFErrorMessage;
        } else if('noneChinaRight'===json.errorCode) {
          this.errorMessage = this.props.strings.noneChinaRight + this.props.strings.type2PDFErrorMessage;
        } else if('fairUseRight'===json.errorCode) {
          this.errorMessage = this.props.strings.fairUseRight + this.props.strings.type2PDFErrorMessage;
        } 

        // Type 3
        else if('noneByCopyright'===json.errorCode) {
          this.errorMessage = this.props.strings.noneByCopyright + this.props.strings.type3PDFErrorMessage;
        } 

        // Type 1
        else if('ExceptionRaised'===json.errorCode) {
          this.errorMessage = this.props.strings.ExceptionRaised + this.props.strings.type1PDFErrorMessage;
        } else if('ProcessTimeout'===json.errorCode) {
          this.errorMessage = this.props.strings.ProcessTimeout + this.props.strings.type1PDFErrorMessage;
        } else if('noImages'===json.errorCode) {
          this.errorMessage = this.props.strings.noImages + this.props.strings.type1PDFErrorMessage;
        } else if('pdfFailed'===json.errorCode) {
          this.errorMessage = this.props.strings.pdfFailed + this.props.strings.type1PDFErrorMessage;
        } else if('exceptionOccurred'===json.errorCode) {
          this.errorMessage = this.props.strings.exceptionOccurred + this.props.strings.type1PDFErrorMessage;
        } else if('unknownError'===json.errorCode) {
          this.errorMessage = this.props.strings.unknownError + this.props.strings.type1PDFErrorMessage;
        } else if('notInArchive'===json.errorCode) {
          this.errorMessage = this.props.strings.notInArchive + this.props.strings.type1PDFErrorMessage;
        } else if('noWorkDirectory'===json.errorCode) {
          this.errorMessage = this.props.strings.noWorkDirectory + this.props.strings.type1PDFErrorMessage;
        } else if('sampleAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.sampleAccessRight + this.props.strings.type1PDFErrorMessage;
        } else if('openAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.openAccessRight + this.props.strings.type1PDFErrorMessage;
        } else if('allAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.allAccessRight + this.props.strings.type1PDFErrorMessage;
        } else if('ctcAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.ctcAccessRight + this.props.strings.type1PDFErrorMessage;
        } else if('openAccessRight'===json.errorCode) {
          this.errorMessage = this.props.strings.openAccessRight + this.props.strings.type1PDFErrorMessage;
        }


      } else {
        if('done'===json.status) {  
          let startPage = this.props.startPage ? this.props.startPage : 1;
          this.downloadLink = json.pdfUrl;
          this.pdfPageLink = this.props.appState.libraryServer.url+'/'+('cn'===this.props.strings.id?'locale=zh':'')+'#pdfdl?endPage='+this.props.endPage+'&startPage='+startPage+'&work='+this.props.workId+'&volume='+this.props.volumeId;
          this.pdfHasBeenGenerated = true;
        } else {
          if(this.visible) setTimeout(this.queryForPDF,1000);
        }
      }
    }
  }

  triggerSnackBar = (message) => {
    this.props.appState.openSnackBar(message);
  }

  download = () => {

    if(!this.currentlyDownloading) {  
      
      this.currentlyDownloading = true;
      
      window.ga.trackEvent('DetailPage', 'Download', this.props.workId+'-'+this.props.volumeNum);

      if(device.platform=='Android') {
        // https://github.com/vasani-arpit/cordova-plugin-downloadmanager
        cordova.plugins.DownloadManager.download(this.downloadLink, 
          (successResult) => { 
            this.triggerSnackBar(this.props.strings.snackbarDownloading);           
            this.currentlyDownloading = false; 
          }, 
          (errorResult) => { 
            this.triggerSnackBar(this.props.strings.snackbarDownloadFailed);
            this.currentlyDownloading = false; 
          }
        );

      } else {
        //window.open(this.downloadLink+'?loadpdf=true', '_system');
        // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/blob/master/README.md
        // share(message, subject, file, url)
        window.plugins.socialsharing.share(null, null, this.downloadLink, null, 
          (successResult) => { this.currentlyDownloading = false; }, 
          (errorResult) => { this.currentlyDownloading = false; }
        ); 
      }

    }
  }

  copyLink = () => {

    window.ga.trackEvent('DetailPage', 'CopyLink', this.props.workId+'-'+this.props.volumeNum);

    // https://github.com/niconaso/cordova-plugin-clipboard-x
    cordova.plugins.clipboard.copy(this.pdfPageLink, 
      ()=>{  
        this.triggerSnackBar(this.props.strings.snackbarLinkCopiedToClipboard);
      },
      ()=>{
        this.triggerSnackBar(this.props.strings.snackbarFailedToCopyLink);
      }       
    );
  }

  handlePostHide = () => {
    this.visible = false;
    this.props.afterClose();
  }

  render() {
    return (
      <Dialog isOpen={this.visible} onPostHide={this.handlePostHide}>
        <div className="PDFDownload">
          <h1>{this.props.strings.downloadOrCopyLink}</h1>
          <p>

          {this.pdfHasBeenGenerated 
            ?
            this.props.strings.yourPDFHasBeenGenerated
            :
            (this.errorMode ? '' : this.props.strings.pleaseWaitWhileWeGenerateYourPDF)
          }
          </p>
          <div>
          {this.pdfHasBeenGenerated ?
            <div className="fabContainer">
              <Fab onClick={this.download} ripple={true} disabled={this.currentlyDownloading} >
                <Icon icon='md-download' spin={this.currentlyDownloading} />
              </Fab>
              <Fab onClick={this.copyLink} ripple={true}>
                <Icon icon='md-link' />
              </Fab>
            </div>
            :
            (this.errorMode ?
              <span>{this.errorMessage}</span>
              :
              <ProgressCircular indeterminate />
            )
          }
          </div>
        </div>
        <Button modifier="material--flat" onClick={this.hideDialog}>{this.props.strings.CLOSE}</Button>
      </Dialog>
    );
  }
}
*/
