
import {TextDecoder} from 'text-encoding';

const NativeUtil = {

  loadJSONFile: (filename, callback) => {
    let filePath = cordova.file.applicationDirectory+'www/data/'+filename;
    window.resolveLocalFileSystemURL(filePath, (fileEntry) => {
      NativeUtil.readFile(fileEntry, (fileContents) => {
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
  
   readFile: function(fileEntry, callback) {
    fileEntry.file(function (file) 
      {
        var reader = new FileReader();
        reader.onloadend = function() {
          let decoded = new TextDecoder('utf-8').decode(this.result);
          callback(decoded);
        };
        reader.readAsArrayBuffer(file);
      }, 
      (e) => { console.log(e); callback(null); }
    );
  }

};

export default NativeUtil;
