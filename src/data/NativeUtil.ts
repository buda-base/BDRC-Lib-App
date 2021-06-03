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
    console.log('NativeUtil.loadJSONFile');
    // let filePath = cordova.file.applicationDirectory+'www/data/'+filename;
    const filePath = rootFolder + filename;
    window.resolveLocalFileSystemURL(filePath,
      (fileEntry:any) => {
        console.log('NativeUtil.loadJSONFile.resolveLocalFileSystemURL success');
        NativeUtil.readFile(fileEntry, (fileContents:any) => {
          console.log('NativeUtil.loadJSONFile.readFile');
          if(fileContents) {
            //console.log('NativeUtil.loadJSONFile.readFile parse', fileContents);
            //let json = JSON.parse(fileContents);
            //callback(json);

            try {
              let json = JSON.parse(fileContents);
              console.log('NativeUtil.loadJSONFile.readFile success ');
              callback(json);
            } catch(e) {
              console.log('NativeUtil.loadJSONFile.readFile error ');
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

  //
  // readFile: (fileEntry:any, callback:(text:string|null)=>void) => {
  //   fileEntry.file(function(file:any) {
  //     console.log();
  //     const reader = new FileReader();
  //     console.log('NativeUtil.readFile ', file);
  //
  //     reader.onloadend = function(e) {
  //       console.log('NativeUtil.readFile.reader.onloadend');
  //       if(this.result) {
  //         callback(this.result as string);
  //       } else {
  //         console.log('no result');
  //       }
  //     }
  //     reader.readAsText(file);
  //   });
  // },
  //
   readFile: (fileEntry:any, callback:(text:string|null)=>void) => {
    fileEntry.file(
      (file:any) => {
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('NativeUtil.readFile.reader.onloadend');
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
