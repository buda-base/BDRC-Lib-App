declare var LocalFileSystem: any;
declare var FileTransfer: any;
declare var device: any;
declare var window: any;
declare var navigator: any;

import * as Logger from 'js-logger';

Logger.get('FileTool').setLevel(Logger.DEBUG);

export type EmptyVoidFunc = ()=>void;
export type FileEntryVoidFunc = (fileEntry:any) => void;
export type FileCreateResponseVoidFunc = (fileUrl:string|null, error?:any)=>void;
export type ProgressVoidFunc = (progress:number)=>void;

/**
 * 
 * https://stackoverflow.com/questions/31548292/copying-a-file-using-cordova
 * 
 * @param baseFileURI 
 * @param destPathName 
 * @param fileSystem 
 *
export function createPermanentFileCopy(baseFileURI:string):Promise<string> {
  return new Promise((resolve, reject)=> {
    window.resolveLocalFileSystemURL(baseFileURI, 
      function(dir:any){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
          function (fs:any) {
            const documentsPath = fs.root;
            //console.log(documentsPath);
            const destFileName = uuid.v1()+baseFileURI.substring(baseFileURI.lastIndexOf('/')+1);
            dir.copyTo(documentsPath, destFileName,
              function(res:any){                        
                //console.log('copying was successful to: ' + res.nativeURL)
                resolve(res.nativeURL);
              }, 
              function(){
                console.log('unsuccessful copying')
                reject();
              }
            );
          }
        );
      }, 
      function(){
        console.log('failure! file was not found')
        reject();
      }
    );
  });
}
*/

/**
 * Silently deletes a file.
 * 
 * @param filePath 
 *
export function deleteFile(filePath:string) {  
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs:any) {
    const fileName = filePath.substring(filePath.lastIndexOf('/')+1);
    //console.log("deleteFile: "+fileName);
    fs.root.getFile(fileName, {
      create: false,
      exclusive: false
    }, function(fileEntry:any) {
      fileEntry.remove(function (file:any) {
        // File deleted successfully
        //console.log('successful deletion')
      }, function (err:any) {
        console.log('Error while removing File')
        console.log(err); // Error while removing File
      });
    }, function(err:any) {
      console.log('Error while requesting File')
      console.log(err)  // Error while requesting File.
    });
  }, function(err:any) {
    console.log('Error while requesting FS')
    console.log(err)  // Error while requesting FS
  });  
}
*/



class FileTool {  
  logger = Logger.get('FileTool');
  
  fs:any;

  constructor(afterSuccessfulInit:EmptyVoidFunc, ifInitFails?:EmptyVoidFunc){
    this.loadFileSystem(afterSuccessfulInit, ifInitFails);
  }
  
    /*
  urlToFolder = (folder:string, onSuccess:(url:string)=>void ) => {
    this.fs.root.getDirectory(folder, { create: true }, 
      (productsFolder:any) => {
        onSuccess(productsFolder.toURL());
    });
  }
  */


  /**
   * Loads the data.json file into memory, replacing the URLs to assets with 
   * URLs to the asset location in persistant storage.
   * 
   * @type {[type]}
   *
  loadGuideData = (guideId:string, onLoaded:(data:GuideJSON|null)=>void ) => {
    const readFile = (fileEntry:any) => {
      fileEntry.file(function (file:any) {
        var reader = new FileReader();
        reader.onloadend = function() {
          let guideFolderUrl = fileEntry.toURL();     
          guideFolderUrl = guideFolderUrl.substring(0, guideFolderUrl.length - (guideId+'/data.json').length);
          let processedGuideData = "{}";
         
          if(this.result) { //} && (this.result instanceof String)){
            processedGuideData = (this.result as string).replace(/_BASE_PATH_/g, guideFolderUrl);
          } else {
            console.error('Guide JSON is not an instance of String');
            console.error(this.result);
          }
          onLoaded(JSON.parse(processedGuideData));
        };
        reader.readAsText(file);
      }, 
      ()=>{
        this.logger.error('loadGuideData: error reading file '+guideId+'/data.json');
        onLoaded(null);
      });
    }
    this.fs.root.getFile(guideId+'/data.json', { create: false, exclusive: false }, 
      (fileEntry:any) => {
        readFile(fileEntry);
      },
      () => {
        this.logger.error('loadGuideData: could not find file '+guideId+'/data.json');        
        onLoaded(null);
      }
    );
  }
  */

/**
 * Initialize persistant storage
 * 
 * @param  {[type]} whenDone [description]
 * @return {[type]}          [description]
 */
loadFileSystem = (whenDone:EmptyVoidFunc, onFailure?:EmptyVoidFunc) => {
  this.logger.debug('loadFileSystem');
  //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

  var handleFailure = (failureMessage:string, error?:any) => {
    this.logger.error(failureMessage);  
    if(error) {
      this.logger.error(error);  
    }
    if(onFailure) { 
      onFailure();
    }
  }
  
  var handleSuccess = (fs:any) => {
    this.fs = fs;
    whenDone();
  }

  if("iOS"===device.platform || ("browser"===device.platform && "Safari"===device.model)) {
    this.logger.debug('loadFileSystem: ios or safari');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, handleSuccess, ()=>{ handleFailure('loadFileSystem: file system failed to open (iOS)'); } );
  } else {    
    this.logger.debug('loadFileSystem: android or chrome');
    navigator.webkitPersistentStorage.requestQuota(500000*1024*1024,       
      (grantedBytes:any) => {
        this.logger.debug('loadFileSystem: grantedBytes: '+grantedBytes);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, handleSuccess, ()=>{ handleFailure('loadFileSystem: file system failed to open'); } );
      }, 
      (e:any) => { handleFailure('loadFileSystem: failed to grant quota', e); }
    );
  }
}



  /**
   * https://stackoverflow.com/questions/10961000/nested-directory-creator-phonegap?answertab=active#tab-top
   * 
   * @type {[type]}
   */
  createFullPath = (path:string, success:FileEntryVoidFunc, failure:EmptyVoidFunc) => {
    var dirs:Array<any> = path.split("/").reverse();
    var root = this.fs.root;

    var createDir = (dir:string) => {
      root.getDirectory(dir, { create : true, exclusive : false }, successCB, failCB);
    };

    var successCB = (entry:any) => {
      root = entry;
      if(dirs.length > 0){
        createDir(dirs.pop());
      } else{
        success(entry);
      }
    };

    var failCB = (res:any) => {
      this.logger.error('createFullPath: failed to create directory');
      this.logger.error(res);
      failure();
    };

    createDir(dirs.pop());
  }


  getFileNameFromURI = (uri:string) => {
    if(uri) {
      const lastSlash = uri.lastIndexOf('/');
      if(-1!=lastSlash && lastSlash+1<uri.length) {
        return uri.substring(lastSlash+1);
      }
    } 
    return null;
  }


  cleanDestinationFolder = (destinationFolder:string)  => {
    if(destinationFolder) {
      const lastSlash = destinationFolder.lastIndexOf('/');
      if(-1!=lastSlash && lastSlash+1==destinationFolder.length) {
        // remvoe last slash
        return destinationFolder.substring(0, lastSlash);
      } else {
        return destinationFolder;
      }
    }
    return null;
  }

  /**
   * Downloads a file into the specified destination folder
   * as the requested file
   * 
   * @type {[type]}
   */
  downloadFile = (sourceURI:string, specifiedDestinationFolder:string, progressHandler:ProgressVoidFunc, next:FileCreateResponseVoidFunc ) => {

    // STEP 0: Do some validation
    const filename = this.getFileNameFromURI(sourceURI);
    if(!filename) {
      this.logger.error('downloadFile: no filename in the uri '+sourceURI);                        
      next(null);  
      return;
    }

    const destinationFolder = this.cleanDestinationFolder(specifiedDestinationFolder);
    if(!destinationFolder) {
      this.logger.error('downloadFile: specifiedDestinationFolder '+specifiedDestinationFolder+' not valid');                        
      next(null);
      return;        
    }


    // STEP 3:  Download the file
    var downloadFileOnProgress  = (progressEvent:any) => {
      if(progressHandler) {
        if (progressEvent.lengthComputable) {
          progressHandler((Math.round((progressEvent.loaded / progressEvent.total) * 100)));
        } else {
          progressHandler(-1);
        }
      }
    }
    var downloadFileSuccess = (entry:any) => {
      next(entry.toURL());        
      return;
    }
    var downloadFileFailure = (error:any) => {
      this.logger.error('downloadFile: failed to download');              
      this.logger.error(JSON.stringify(error));              
      next(null, error);
      return;
    }
    var downloadFile = (fileEntry:any) => {
      var fileTransfer = new FileTransfer();
      fileTransfer.onprogress = downloadFileOnProgress;      
            this.logger.debug(fileEntry.toURL());              
            this.logger.debug(sourceURI);              

      fileTransfer.download(encodeURI(sourceURI), fileEntry.toURL(), downloadFileSuccess, downloadFileFailure, false);
    }


    // STEP 2: Link the file
    var onLinkFileSuccess = (fileEntry:any) =>{
      downloadFile(fileEntry);
    }
    var onLinkFileFailure = (error:any) => {
      this.logger.error('downloadFile: linkFile failed');              
      this.logger.error(JSON.stringify(error));
      next(null, error);  
      return;
    } 
    var linkFile = () => {
      var options = { create: true, exclusive: false };
      const destinationFile = destinationFolder + '/' + filename;
      this.fs.root.getFile( destinationFile, options, onLinkFileSuccess, onLinkFileFailure);
    }
    

    // STEP 1: First create folders, if they do not exist
    var onCreateFullPathSuccess = (baseDir:any) => {
      linkFile();
    }  
    var onCreateFullPathFailure = () => {
      this.logger.error('downloadFile: createFullPath failed for the path '+destinationFolder);                        
      next(null); 
      return;
    }    
    this.createFullPath(destinationFolder, onCreateFullPathSuccess, onCreateFullPathFailure);


  }





  /*
  deleteFolder = (path:string, onSuccess:()=>void, onFailure:()=>void) => {    
    this.fs.root.getDirectory(path, {create:false}, 
      (directoryEntry:any) => {
        directoryEntry.removeRecursively(
          () => {
            onSuccess();
          },
          (error:any) => {
            this.logger.error('deleteFolder: Error deleting the file \"'+path+'\"');                        
            // this.logger.error(error);                        
            onFailure();
          }
        );
      },
      () => {
        this.logger.debug('deleteFolder: The file doesn\'t exist \"'+path+'\"');        
        onSuccess();
      }
    );

  }
  

  checkFileExists = (path:string, whenDone:(exists:boolean)=>void) => {    
    this.fs.root.getFile(path, {create:false}, 
      (directoryEntry:any) => {
        whenDone(true);        
      },
      () => {
        whenDone(false);      
      }
    );
  }


  checkFolderExists = (path:string, whenDone:(exists:boolean)=>void) => {    
    this.fs.root.getDirectory(path, {create:false}, 
      (directoryEntry:any) => {
        whenDone(true);        
      },
      () => {
        whenDone(false);      
      }
    );
  }

  */

}


export default FileTool;

