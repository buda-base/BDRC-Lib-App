
// import {TextDecoder} from 'text-encoding';

const NativeUtil = {

  loadJSONFile: (filename:string, callback:(json:any)=>void) => {
    let filePath = cordova.file.applicationDirectory+'www/data/'+filename;
    window.resolveLocalFileSystemURL(filePath, (fileEntry) => {
      NativeUtil.readFile(fileEntry, (fileContents:any) => {
        if(fileContents) {
          try {
            let json = JSON.parse(fileContents);
            callback(json);
          } catch(e) {
            callback(null);
          }
        } else {
          callback(null);
        }
      });
    }, 
    ()=> { 
      callback(null);      
    });   
  },
  
   readFile: function(fileEntry:any, callback:(text:string|null)=>void) {
    fileEntry.file(function (file:any) 
      {
        var reader = new FileReader();
        reader.onloadend = function() {
          const decoded = new TextDecoder('utf-8').decode(reader.result as ArrayBuffer);
          callback(decoded);
        };
        reader.readAsArrayBuffer(file);
      }, 
      (e:any) => { console.log(e); callback(null); }
    );
  }

};

export default NativeUtil;
