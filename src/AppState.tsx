import { observable, action } from 'mobx';
import { v1 as uuidV1 } from 'uuid';
import { Navigator } from 'react-onsenui';
import FileTool from './FileTool';
import Database from './Database';
import { Work, WorkPart, Person } from './Records';
import { Route } from './TypeAliases';
import { bo, en, cn } from './LocalizedStrings';
import { ILocalizedStrings} from './LocalizedStrings';
import { DatabaseResult } from './DatabaseResult';

export const searchRoute: Route = { page: 'Search', hasBackButton: false, isModal:false, data:{} };
export const detailRoute: Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{} };
export const aboutRoute: Route = { page: 'About', hasBackButton: false, isModal:true, data:{} };
export const helpRoute: Route = { page: 'Help', hasBackButton: false, isModal:true, data:{} };
export const settingsRoute: Route = { page: 'Settings', hasBackButton: false, isModal:true, data:{} };

export interface LibraryServer {
  id:string;
  name:string;
  url:string;
  viewerUrl:string;
}

export const libUSA:LibraryServer = {    
  id:'USA',
  name:'USA',
  url:'https://ssapi.hrdcstl.com',
  viewerUrl:'http://library.bdrc.io/view/'
}

// export const libUSA:LibraryServer = {    
//   id:'USA',
//   name:'USA',
//   url:'https://www.tbrc.org'
// }

export const libChina:LibraryServer = {    
  id:'China',
  name:'China',
  url:'http://www.bdrc.info',
  viewerUrl:'http://library.bdrc.io/view/'
}

export default class AppState {

  @observable libraryServer:LibraryServer;  
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

  @observable hasUpdates:boolean = true;

  db:Database;
  navigator:Navigator;
  databaseResultStack:Array<DatabaseResult> = [];
  fileTool: FileTool;

  @observable fileSystemFailedToLoad:boolean = false;
  @observable fileSystemLoaded:boolean = false;

  @action initializeFileSystem = () => {
      // Initialize the file system
    const fileTool = new FileTool(
      ()=>{  
        this.fileTool = fileTool;
        this.fileSystemFailedToLoad = false;
        this.fileSystemLoaded = true;
        console.log('file system initialized');
        this.fileTool.downloadFile(libUSA.url+'/nescor.jpg', 'data', (progress:number)=>{ console.log(progress); }, (fileUrl:string|null, error?:any)=>{ console.log(fileUrl); console.log(error); });
      }, 
      ()=>{ 
        this.fileSystemFailedToLoad = true;
        this.fileSystemLoaded = false;
        console.log('file system failed to initialize');
      }
    );    
  }

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

  @action 
  setLibraryServerFromString = (libraryServerId:string) => {
    if(libraryServerId===libUSA.id) this.setLibraryServer(libUSA);
    else if(libraryServerId===libChina.id) this.setLibraryServer(libChina);
  }

  @action
  setLibraryServer = (libraryServer:LibraryServer) => {
    localStorage.setItem('libraryServerId', libraryServer.id);
    this.libraryServer = libraryServer;
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
    return this.libraryServer.viewerUrl+id;
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
    this.navigator.popPage();
  }
  
  @action
  navigateTo = (databaseResult:DatabaseResult) => { // , navigator:Navigator) => {

    let work:Work|null = null;
    let person:Person|null = null;
    let workPart:WorkPart|null = null;

    // Load the file before the page transition to prevent jerky animation
    databaseResult.load((record:any) => {
      if(databaseResult.isWork){
        work = record;
      } else if(databaseResult.isPerson){
        person = record;
      } else if(databaseResult.isWorkPart){
        workPart = record;
      }      

      // NOTE: If performance is jerky do to loading related records, either through a database search, or through a file load, 
      // that work should be done here and passed through the "data" object

      const route:Route = { page: 'Detail', hasBackButton: true, isModal:false, data:{ databaseResult:databaseResult, files:{ work:work, person:person, workPart:workPart }, relatedDatabaseResults:{}}};
      this.pushPage(route); //, navigator);    
    });

  }

  constructor() {
    const libraryServerId = localStorage.getItem('libraryServerId');
    if(libraryServerId) {
      if(libUSA.id == libraryServerId) {
        this.setLibraryServer(libUSA);
      } else if(libChina.id == libraryServerId) {
        this.setLibraryServer(libChina);
      }
    }
  }

}
