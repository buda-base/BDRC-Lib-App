declare var window: any;
declare var cordova: any;

// import {TextDecoder} from 'text-encoding';
//
// function readFileSolo(fileEntry:FileEntry, callback:(text:any)=>void) {
//
//   fileEntry.file(function (file:File) {
//     var reader = new FileReader();
//
//     reader.onloadend = function() {
//       console.log("Successful file read: " +fileEntry.fullPath);
//       callback(this.result);
//     };
//
//     reader.readAsText(file);
//
//   }, ()=>{ console.log('readFile error'); });
// }


const NativeUtil = {

  loadJSONFile: (rootFolder:string, filename:string, callback:(json:any)=>void) => {
    const filePath = rootFolder + filename;
    window.resolveLocalFileSystemURL(filePath,
      (fileEntry:any) => {
        NativeUtil.readFile(fileEntry, (fileContents:any) => {
          if(fileContents) {
            try {
              let json = JSON.parse(fileContents);
              callback(json);
            } catch(e) {
              console.log(e);
              callback(null);
            }
          } else {
            console.log('NativeUtil.loadJSONFile.readFile no file contents ');
            callback(null);
          }
      });
    }, 
    ()=> {
      console.log('NativeUtil.loadJSONFile.resolveLocalFileSystemURL error');
      callback(null);      
    });   
  },

   readFile: (fileEntry:any, callback:(text:string|null)=>void) => {
    fileEntry.file(
      (file:any) => {
        var reader = new FileReader();
        reader.onloadend = function() {
          const decoded = new TextDecoder('utf-8').decode(reader.result as ArrayBuffer);
          callback(decoded);
        };
        reader.readAsArrayBuffer(file);
      },
      (e:any) => {
        console.log(e);
        callback(null);
      }
    );
  }

};

export default NativeUtil;
