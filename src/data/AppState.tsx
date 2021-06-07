import { observable, action, computed } from 'mobx';
import { v1 as uuidV1 } from 'uuid';
import { Navigator } from 'react-onsenui';
import FileTool from './FileTool';
import Database from './Database';
import {Work, WorkPart, Person, WorkPartItem, IParentWorkPart} from './Records';
import { bo, en, cn } from './LocalizedStrings';
import { ILocalizedStrings} from './LocalizedStrings';
import { DatabaseResult } from './DatabaseResult';
import { LibraryUpdater } from './LibraryUpdater';
import {I_MirrorSite} from "./interfaces/I_MirrorSite";
import * as ons from "onsenui";
import {Route} from "./interfaces/Route";
import { STORAGE_KEY_PREFIX} from "./LocalStorageStore";

export const searchRoute: Route = { page: 'Search', hasBackButton: false, isModal:false, data:{} };
export const detailRoute: Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{} };
export const aboutRoute: Route = { page: 'About', hasBackButton: false, isModal:true, data:{} };
export const helpRoute: Route = { page: 'Help', hasBackButton: false, isModal:true, data:{} };
export const settingsRoute: Route = { page: 'Settings', hasBackButton: false, isModal:true, data:{} };


export default class AppState {

  @observable testImage:string = 'img/bdrc_logo.png';

  @observable statusMessage:string = '';
  @observable showStatusMessage:boolean = false;

  @observable strings:ILocalizedStrings;

  @observable infoPanelIsOpen:boolean;
  @observable momOpened:boolean;
  @observable navigatorAnimation:string; 

  @observable searchStringIsValid:boolean;
  @observable currentQueryString:string;
  @observable searchCount:number = 0;

  @observable snackBarMessage:string;
  @observable closeSnackBarDate:number;
  @observable snackBarOpen:boolean;

  @observable updater:LibraryUpdater;

  db:Database;
  navigator:Navigator;
  databaseResultStack:Array<DatabaseResult> = [];

  fileTool: FileTool;
  @observable fileSystemFailedToLoad:boolean = false;
  @observable fileSystemLoaded:boolean = false;

  /**
   * called from index.tsx after ons.ready
   */
  @action initializeFileSystem = () => new Promise((resolve, reject)=>{
      // Initialize the file system
    const fileTool = new FileTool(
      ()=>{  
        this.fileTool = fileTool;
        this.fileSystemFailedToLoad = false;
        this.fileSystemLoaded = true;
        resolve();
      }, 
      ()=>{ 
        this.fileSystemFailedToLoad = true;
        this.fileSystemLoaded = false;
        console.log('file system failed to initialize');
        reject();
      }
    );    
  });



  initializeDatabase = () => new Promise((resolve, reject) => {
    ons.notification.alert(
      {
        title:this.strings.Alert,
        buttonLabel:this.strings.OK,
        message: this.strings.Welcome,
        callback: () => {
          this.statusMessage = this.strings.InitializingDatabase;
          this.db.clearDatabase();
          this.db.initialize(
            (success, error)=>{
              if(!success) {
                this.statusMessage = '';
                this.showStatusMessage = false;
                ons.notification.alert(
                  {
                    message: this.strings.databaseInitFailed,
                    title:this.strings.Alert,
                    buttonLabel:this.strings.OK
                  }
                );
                reject();
              } else {
                this.statusMessage = this.strings.Complete;
                setTimeout(()=>{
                  resolve();
                }, 2000);

              }
            },
            (status:string) => {
              this.statusMessage = status;
            }
          );
        }
      }
    );
  });






  @computed get updateAvailable(){
    return this.updater.updateAvailable;
  }

  /**
   * Check for library update availability. Only runs if the file system
   * is available.
   */
  checkForLibraryUpdates = () => new Promise((resolve, reject)=>{
    if(this.fileSystemLoaded) {
      this.updater.getLatestLibraryMetadata()
      .then(()=>{
        resolve();
      })
      .catch((e:any)=>{
        reject(e);
      })
    }
  });



  @action openSnackBar = (message:string) => {
    this.snackBarMessage = message;
    this.closeSnackBarDate = Date.now() + 2500;
    this.snackBarOpen = true;
  }

  
  
  @action 
  setInterfaceLocalization = (id:string) => {
    if(id) {
      if(id===en.id) {
        this.setInterfaceLocalizationStrings(en);
      } else if(id===cn.id) {
       this.setInterfaceLocalizationStrings(cn);
      } else {       
        this.setInterfaceLocalizationStrings(bo);
      }
    } else {
      this.setInterfaceLocalizationStrings(bo);
    }
  }

  // @action
  // setLibraryServerFromString = (libraryServerId:string) => {
  //   if(libraryServerId===libUSA.id) this.setLibraryServer(libUSA);
  //   else if(libraryServerId===libChina.id) this.setLibraryServer(libChina);
  // }

  @action
   setLibraryMirror = async (mirror:I_MirrorSite) => {

    // set the mirror
    this.updater.setCurrentMirror(mirror);

    // attempt to load meta-data
     try {
       await this.updater.getLatestLibraryMetadata();
     } catch(err) {
       console.log(err);
       console.log('failed to get latest library metadata');
       return;
     }

     // attempt an update after a successful metadata
     try {
       await this.updater.runUpdate();
     } catch(err) {
       console.log('failed to download and install latest library data');
       return;
     }


  }

  @action
  setInterfaceLocalizationStrings = (strings:ILocalizedStrings) => {

    localStorage.setItem('language', strings.id);

    this.strings = strings;
    this.momOpened = false;
    this.infoPanelIsOpen = false;

    if(!this.db){
      this.db = new Database(this.strings, ()=>{ }, this);
    }
  }

  generateViewLink = (id:string) => {
    // ?work=bdr:MW22084&origin=BDRCLibApp1.2.0&lang=bo&uilang=0
    const url = this.updater.storedLibraryMetaData?.viewerUrlPrefix+"?work=bdr:"+id+"&origin="+STORAGE_KEY_PREFIX+"&lang="+this.strings.iifviewerlang+"&uilang="+this.strings.id;
    return url;
  }

  generateShareLink = (id:string) => {
    const url = this.updater.storedLibraryMetaData?.libraryUrl+'/show/bdr:'+id;
    return url;
  }

  @action
  openMOM = () => {
    this.momOpened = true;
  }

  @action
  pushPage = (route:Route) => {
    let animation = route.isModal ? 'lift-md' : 'slide-md' ;
    let data = route.data;
    data.key = uuidV1();
    this.navigator.pushPage({
      page: route.page,
      hasBackButton: route.hasBackButton,
      isModal:route.isModal,
      data:data
    }, {animation:animation});
  }

  @action
  handleBack = () => {
    this.navigator.popPage();
    this.databaseResultStack.pop();
  }
  
  @action
  handleClose = () => {
    this.navigator.popPage({animation:'lift-md'});
  }
  
  @action
  navigateTo = (databaseResult:DatabaseResult) => { // , navigator:Navigator) => {

    let work:Work|null = null;
    let person:Person|null = null;
    let workPart:WorkPart|null = null;

    // Load the file before the page transition to prevent jerky animation
    databaseResult.load(this.fileTool.fs.root.toURL()+'/BDRCLIB/', (record:any) => {
      if(databaseResult.isWork){
        work = record;
      } else if(databaseResult.isPerson){
        person = record;
      } else if(databaseResult.isWorkPart){
        workPart = record;
      }      

      // NOTE: If performance is jerky do to loading related records, either through a database search, or through a file load, 
      // that work should be done here and passed through the "data" object
      const route:Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{ databaseResult:databaseResult, files:{ work:work, person:person, workPart:workPart, workPartItem:null }, relatedDatabaseResults:{}}};
      this.pushPage(route); //, navigator);    
    });

  }

  @action
  navigateToWorkPartItem = (workPartItem:WorkPartItem) => {
    const syntheticRecord = {
      title:workPartItem.title,
      nodeId:workPartItem.id,
      type:'WorkPart'
    }
    const databaseResult = new DatabaseResult(this.db, syntheticRecord);
    return this.navigateTo(databaseResult);
  }

  /**
   * This method is called when a WorkDetail is rendered for a work that
   * "hasParts" and returns the top level parts for display in the Parts
   * section of the Work Detail page.
   *
   * @param work
   */
  loadWorkPartsForWork = (work:Work) => new Promise((resolve, reject)=> {
    const syntheticRecord = {
      title: '',
      nodeId: work.nodeId,
      type: 'WorkPart'
    }
    const databaseResult = new DatabaseResult(this.db, syntheticRecord);
    databaseResult.load(this.fileTool.fs.root.toURL() + '/BDRCLIB/', (record: any) => {
      resolve(record);
    });
  });

  constructor() {
    this.updater = new LibraryUpdater(this);
  }

}
