import $ from 'jquery';

/**
  This utility is used when in browser mode to load local data files.
*/
const BrowserUtil = {
  loadJSONFile: (relativeFilePath, callback) => {
    $.getJSON('data/'+relativeFilePath)
    .done((json) => {
      callback(json);
    })
    .fail((xhr, status, err) => {
      callback(null);
    });
    }

}

export default BrowserUtil;