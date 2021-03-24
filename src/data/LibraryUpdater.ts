import {I_MirrorSite, Mirrors} from "./interfaces/I_MirrorSite";

declare var zip: any;
declare var navigator: any;

import AppState from './AppState';
import {observable, computed, action} from 'mobx';
import * as $ from 'jquery';
import {I_LibraryMetaData, validateLibraryMetaData} from "./interfaces/I_LibraryMetaData";
import {LocalStorageStore} from "./LocalStorageStore";


export class LibraryUpdater {
  private appState:AppState;

  // process status
  @observable downloading:boolean = false;
  @observable downloaded:boolean = false;
  @observable unpacking:boolean = false;
  @observable downloadProgress:number = 0;

  // mirror and library data
  @observable mirrors:Array<I_MirrorSite> = [];
  @observable currentMirror:I_MirrorSite|undefined = undefined;
  @observable storedLibraryMetaData:I_LibraryMetaData|undefined = undefined;
  @observable latestLibraryMetaData:I_LibraryMetaData|undefined = undefined;

  @computed get noMirrorSelected() {
    return this.currentMirror?false:true;
  }

  @computed get noLibraryMetaData() {
    return this.storedLibraryMetaData?false:true;
  }

  // if there are determinable updates available
  @computed get updateAvailable() {
    return (this.latestLibraryMetaData && (!this.storedLibraryMetaData || (!this.storedLibraryMetaData || this.storedLibraryMetaData.releaseSerialNumber<this.latestLibraryMetaData.releaseSerialNumber)));
  }

  @action setCurrentMirror = (mirror:I_MirrorSite) => {
    LocalStorageStore.setItem(LocalStorageStore.KEYS.currentMirrorId, mirror.id);
    LocalStorageStore.removeItem(LocalStorageStore.KEYS.customMirrorMetaDataURL);
    this.currentMirror = mirror;
  }

  @action saveStoredLibraryMetaData = () => {
    if(this.latestLibraryMetaData) {
      LocalStorageStore.saveJson(LocalStorageStore.KEYS.storedLibraryMetaData, this.latestLibraryMetaData);
      this.storedLibraryMetaData = this.latestLibraryMetaData;
    }
  }


  // @action setCustomMirrorMetaDataUrl = (customMirrorMetaDataURL:string) => {
  //   if(this.currentMirror && this.currentMirror.id===Mirrors.Custom.id) {
  //     LocalStorageStore.setItem(LocalStorageStore.KEYS.customMirrorMetaDataURL, customMirrorMetaDataURL);
  //     this.currentMirror.metaDataUrl = customMirrorMetaDataURL;
  //   }
  // }

  constructor(appState:AppState) {
    this.appState = appState;

    this.mirrors.push(Mirrors.International);
    this.mirrors.push(Mirrors.China);

    // // check for a stored custom mirror URL
    // const customMirrorMetaDataURL = LocalStorageStore.getItem(LocalStorageStore.KEYS.customMirrorMetaDataURL);
    // if(customMirrorMetaDataURL) {
    //   Mirrors.Custom.metaDataUrl =  customMirrorMetaDataURL;
    // }
    // this.mirrors.push(Mirrors.Custom);

    const currentMirrorId = LocalStorageStore.getItem(LocalStorageStore.KEYS.currentMirrorId);
    if(currentMirrorId) {
      this.currentMirror = this.mirrors.find(m=>m.id===currentMirrorId);
      if(this.currentMirror) {
        // Retrieve the stored library meta data
        const storedLibraryMetaData:I_LibraryMetaData = LocalStorageStore.getJson(LocalStorageStore.KEYS.storedLibraryMetaData);
        // All good
        if(storedLibraryMetaData && storedLibraryMetaData.mirrorId===currentMirrorId) {
          this.storedLibraryMetaData = storedLibraryMetaData;
        }
        // library meta does not match, or does not exist
        else {
          LocalStorageStore.removeItem(LocalStorageStore.KEYS.storedLibraryMetaData);
          // TODO: stored library metadata mirror id does not match mirror
          console.log('stored library metadata mirror id does not match mirror');
        }
      } else {
        // TODO: selected mirror does not appear to exist
        console.log('selected mirror does not appear to exist');
      }
    }
    // new setup, no mirror selected
    else {
      // TODO: No mirror selected
      console.log('No mirror selected');
    }

  }




  /**
   * Called by AppState
   */
  getLatestLibraryMetadata = () => new Promise((resolve, reject)=> {
      if (!this.currentMirror) {
        reject('no current mirror');
      } else {
        $.getJSON(this.currentMirror.metaDataUrl)
          .done((libraryMetaData: any) => {
            if(validateLibraryMetaData(libraryMetaData)) {
              this.latestLibraryMetaData = libraryMetaData;
              resolve();
            } else {
              reject('invalid meta data');
            }
          })
          .fail((xhr: any, status: any, err: any) => {
            reject(err);
          });
      }
    });



  runUpdate = async () => { //new Promise((resolve, reject)=>{

    const url = this.latestLibraryMetaData?.releaseZipUrl;
    if(url) {
      try {
        this.appState.showStatusMessage = true;
        this.appState.statusMessage = this.appState.strings.DownloadingLibrary;

        // Download
        const downloadResult = await this.downloadZip(url);

        // Unzip
        await this.unzipDatabase(downloadResult);

        // Clear the database and import all of the new goodies
        await this.appState.initializeDatabase();

        // Save the library meta-data that was retrieved
        this.saveStoredLibraryMetaData();

        this.appState.showStatusMessage = false;
      } catch(err) {
        this.appState.statusMessage = '';
        this.appState.showStatusMessage = false;
        throw err;
      }

    } else {
      const err = 'no release zip url in meta-data';
      console.log(err);
      // reject(err);
      throw err;
    }
  }

  unzipDatabase = (databaseZip:any) => new Promise(action((resolve:()=>void, reject:(error:any)=>void)=> {
    this.appState.statusMessage = this.appState.strings.ExtractingFiles;
      zip.unzip(databaseZip, this.appState.fileTool.fs.root.toURL(),
        (msg: any) => {
          if(msg == 0) {
            resolve();
          }
          if(msg == -1) {
            reject('Failed to extract files.');
          }
        },
        (progressEvent: any) => {
          const percent =  Math.round((progressEvent.loaded / progressEvent.total) * 100);
          this.appState.statusMessage = this.appState.strings.ExtractingFiles+' '+percent+"%";
        }
      );
    }
  ));



  //const uri = this.latestLibraryMetaData?.releaseZipUrl;
  @action
  downloadZip = (url:string) => new Promise(action((resolve:(result:any)=>void, reject:(error:any)=>void)=>{

    try {
      this.appState.fileTool.downloadFile(
        url,
        'data',
        action((downloadProgress:number) => {
          this.appState.statusMessage = this.appState.strings.DownloadingLibrary+" "+downloadProgress+"%";
          this.downloadProgress = downloadProgress;
        }),
        action((result:any, error:any)=>{
          if(null==result) {
            // this.downloading = false;
            // this.downloaded = false;
            this.appState.statusMessage = 'Download Failed';

            // navigator.notification.alert('Failed to download guide. Your Internet connection may be unstable. Please try again.', ()=>{}, "Error", "ok");
            reject('failed to download '+url);
          } else {
            // this.downloading = false;
            // this.downloaded = true;
            this.appState.statusMessage = '';
            resolve(result);
          }
        })
      );
    } catch(err) {
      this.appState.statusMessage = 'Download Failed';
      reject(err);
    }
  }));

}
