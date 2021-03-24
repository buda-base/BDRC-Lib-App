import * as $ from 'jquery';

/**
  This utility is used when in browser mode to load local data files.
*/
const BrowserUtil = {
  loadJSONFile: (relativeFilePath:string, callback:(result:any)=>void) => {
    $.getJSON('data/'+relativeFilePath)
    .done((json:any) => {
      callback(json);
    })
    .fail((xhr:any, status:any, err:any) => {
      callback(null);
    });
    }

}

export default BrowserUtil;