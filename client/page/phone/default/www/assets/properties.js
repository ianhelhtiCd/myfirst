 var server_info = {
 	ip:"172.16.4.74",
 	port:"8001"
 };
 
function pro_getServerUrl(){
	var _url = "http://"+server_info.ip+":"+server_info.port+"/process/service";
	return _url;
}
