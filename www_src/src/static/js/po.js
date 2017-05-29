var hashParams;
(window.onpopstate = function () {
	var hash = location.hash.replace('#','');
	if(''!=hash) {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = hash;

		hashParams = {};
		while (match = search.exec(query)){
			hashParams[decode(match[1])] = decode(match[2]);
		}
		// clear the hash
		location.hash = '';
	}
})();

const orEmpty = function(val){
	if(!val || val.length==0) return "";
	else return val;
}



const Global = {
	_token: null,
	token: () => {
		//console.log("Global.token()");
		//console.log(" - "+localStorage.getItem('token'));
		return localStorage.getItem('token');
	},
	baseUploadPath: () => "/uploads/"
}

