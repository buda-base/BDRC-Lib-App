declare var zip: any;

import AppState from './AppState';


class UpdateData {

  @observable updateAvailable:boolean = false;
  @observable downloading:boolean = false;
  @observable downloaded:boolean = false;
  @observable unpacking:boolean = false;
  @observable downloadProgress:number = false;

  private appState:AppState;

  constructor(appState:AppState) {
    this.appState = appState;
    this.checkForUpdate();
  }

  checkForUpdate = () => {
    // if there is an update, then trigger a download
  }

  downloadZip = () => {
    try {
      const uri = this.appState.libraryServer + 'bdrc-lib-update.zip';

      this.appState.fileTool.downloadFile(
        uri,
        (downloadProgress)=>{
          this.downloadProgress = downloadProgress;
        }, 
        (result:any, error:any)=>{
          if(null==result) {
            downloadFailed(error, 'downloadZip-01: failed to download '+uri);
          } else {
            alert('successful download!');
            //unzipAssets(result);
          }
        }
      );
    } catch(err) {
      downloadFailed(err, 'downloadZip-02: failed to download '+uri);
    } 
  }

  downloadFailed = (error:any, message:string) => {     
    this.downloading = false;
    this.downloaded = false;      
    this.logger.error('downloadFailed/' + message);                   
    navigator.notification.alert('Failed to download guide. Your Internet connection may be unstable. Please try again.', ()=>{}, "Error", "ok");                
  }


/*
 loadFolder = (folderName:string) => {
    // TODO: Fix the server so that "/data/" functions exactly the same way that "guides does"
    let url = UIState.api.urlFor("/"+folderName, this.id);
    url = url.replace("/data/", "/guides/");
    $.ajax(GET(url)) 
    .done((result:any)=>{
      files = result.files;
      if(files.length>0) {
        downloadAFile(files.pop(), folderName);
      } else {
        nextFolder();         
      }
    })
    .fail(()=>{ 
      this.logger.error('downloadGuideAssets.downloadFileByFile.loadFolder: failed to get folder list for '+folderName);                              
      // failure(); 
      nextFolder();   
    });
  }






  downloadGuideAssets = () => {

    this.downloading = true;
    this.downloadProgress = 0;



    const loadJSONDataFromDisk = () => {
      this.guideManager.fileTool.loadGuideData(this.id,
        (guideData:GuideJSON)=>{
          this.downloading = false;
          if(null!=guideData) {
            this.downloaded = true;
            this.unpacking = false;
            this.data = guideData;
            if(this.newerVersion) {
              this.version = this.newerVersion;
            }
            this.save();
          } else {
            this.downloaded = false;
            this.unpacking = false;           
            this.logger.error('downloadGuideAssets.loadJSONDataFromDisk: guide data was not loaded for guide '+this.id);                    
          }
        }
      );
    }



    const unzipAssets = (result:any) => {
      this.downloading = false;
      this.unpacking = true;
      zip.unzip(result, this.guideManager.fileTool.fs.root.toURL(),           
        (msg:any)=>{          
          loadJSONDataFromDisk();         
        }, 
        (progressEvent:any) =>{                                    
          // progress was not showing anything, so not using
        }
      );
    }   


    const downloadZip = () => {
      try {
        let uri = UIState.api.urlFor("/"+this.id+".zip", this.id);

        this.guideManager.fileTool.downloadFile(
          uri,
          (downloadProgress)=>{
            this.downloadProgress = downloadProgress;
          }, 
          (result:any, error:any)=>{
            if(null==result) {
              this.downloading = false;
              this.downloaded = false;      
              this.logger.error('downloadGuideAssets.downloadZip: download of zip '+this.id+'.zip failed');                   
              downloadFailed(error);
            } else {
              unzipAssets(result);
            }
          }
        );
      } catch(err) {
        downloadFailed(err);
      } 
    }   

    const downloadFailed = (error:any) => {     
      this.downloading = false;

      UIState.api.isLoggedIn()
      .then((loggedIn:boolean)=>{

        let authProblem = false;
        let title = '';
        let message = '';

        if(!loggedIn) {
          authProblem = true;
          title = 'Not Logged In';
          message = 'In order to download this guide, you will need to log in again. Would you like to log in?';
        } else if(error && error.body) {
          try {
            const errorBody = JSON.parse(error.body);
            if(errorBody.errorCode) {
              title = 'Not Logged In';
              message = 'In order to download this guide, you will need to log in again. Would you like to log in?';
              if(errorBody.errorCode === NotLoggedInError.errorCode) {
                authProblem = true;
              } else if(errorBody.errorCode === 'AUTH-1' || errorBody.errorCode === 'AUTH-2' || errorBody.errorCode === 'AUTH-3'){
                title = 'Login Expired';
                message = 'Your session has expired. '+message;
                authProblem = true;
              }
            }
          } catch(exception) { }
        }

        // AUTH PROBLEM
        if(authProblem) {
          navigator.notification.confirm(message, (buttonIndex:number)=>{ if(1===buttonIndex){ UIState.showLoginPanel = true; }}, title, ["Yes", "Not right now"]);                 
        }
        // OTHERWISE IT IS PROBABLY THE INTERNET CONNECTION
        else if(isNetworkFailure(error)) {
          navigator.notification.alert('Failed to download guide. Your Internet connection may be unstable. Please try again.', ()=>{}, "Error", "ok");             
        } 
        // UNKOWN FAILURE
        else {
          navigator.notification.alert('Failed to download guide. You may need to completely close the application and try again.', ()=>{}, "Error", "ok");             
        }
        
      })
      .catch(()=>{
        navigator.notification.alert('Failed to download guide. You may need to completely close the application and try again.', ()=>{}, "Error", "ok");             
      });
    
    }
*/




}