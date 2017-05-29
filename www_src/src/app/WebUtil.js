import $ from 'jquery';

var WebUtil = {

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

export default WebUtil;