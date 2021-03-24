import {I_LangString} from "./I_LangString";

export interface I_LibraryMetaData {
  mirrorId:string;
  siteUrl:string;
  tosUrl:string;
  libraryUrl:string;
  viewerUrlPrefix:string;
  changeLogUrl:string;
  releaseSerialNumber:number;
  releaseDate:Date|string;
  releaseZipUrl:string;
  releaseDescription?:Array<I_LangString>;
}

 export const exampleLibraryMetaData:I_LibraryMetaData = {
   "mirrorId":"us-east-1",
   "siteUrl":"https://www.tbrc.org",
   "tosUrl":"https://www.tbrc.org/tos",
   "libraryUrl":"https://library.bdrc.io",
   "viewerUrlPrefix":"http://library.bdrc.io/view/",
   "releaseSerialNumber":1,
   "releaseDate":"2019-12-13T18:25:43.511Z",
   "releaseZipUrl":"http://somewhere/data_20191213182543511.zip",
   "releaseDescription":[
    {
      "value":"287 new works from China",
      "language":"en"
    },
    {
      "value":"[description in Tibetan]",
      "language":"bo"
    },
    {
      "value":"[description in Chinese]",
      "language":"cn"
    }
   ],
   "changeLogUrl":"https://library.bdrc.io/data/release/20191213182543511.html"
};

export function validateLibraryMetaData(data:I_LibraryMetaData):boolean {

  let valid = true;

  if(data) {

    if (!data.mirrorId) {
      console.log('missing mirrorId');
      valid = false;
    }

    if (!validHttpUrl(data.siteUrl)) {
      console.log('invalid or missing siteUrl: ' + data.siteUrl);
      valid = false;
    }

    if (!validHttpUrl(data.libraryUrl)) {
      console.log('invalid or missing libraryUrl: ' + data.libraryUrl);
      valid = false;
    }

    if (!validHttpUrl(data.viewerUrlPrefix)) {
      console.log('invalid or missing viewerUrlPrefix: ' + data.viewerUrlPrefix);
      valid = false;
    }

    if (!validHttpUrl(data.changeLogUrl)) {
      console.log('invalid or missing changeLogUrl: ' + data.changeLogUrl);
      valid = false;
    }

    if (!data.hasOwnProperty('releaseSerialNumber') || data.releaseSerialNumber < 0) {
      console.log('invalid or missing releaseSerialNumber: ' + data.releaseSerialNumber);
      valid = false;
    }

    if (!data.releaseDate) {
      console.log('missing releaseDate');
      valid = false;
    }

    if (!validHttpUrl(data.releaseZipUrl)) {
      console.log('invalid or missing releaseZipUrl: ' + data.releaseZipUrl);
      valid = false;
    }

    if (!data.releaseDescription) {
      console.log('missing releaseDescription');
      valid = false;
    }
  } else {
    console.log('data null');
    valid = false;
  }

  return valid;
}

// from https://www.regextester.com/105539
const httpPattern = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const validHttpUrl = (url:string|undefined) => {
  if(url) {
    return httpPattern.exec(url);
  }
  return false;
}

