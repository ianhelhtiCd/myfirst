/*
 * 获取平台公共接口的令牌
 * 必须是以exmobi为基座才可用
 */

//访问码
var baseset = {
	"accessCode":"77504b40-2db7-462b-b47d-150afeca8529"
};

 var authToken = "";
 //获取公共服务访问token
 function cgs_gettoken(){
    	var csgData = {};
    	csgData.accessCode = baseset.accessCode;
	    if (csgData.accessCode == "") {
		  alert("请设置从南网管理平台申请的访问码");
		  return;
		}else{
			//获取bcs地址
			var settingInfo= ClientUtil.getSetting();
            var bcsurl = "http://"+settingInfo.ip+":"+settingInfo.port; 

			//初始化鉴权sdk
			CsgAuthUtil.init(csgData);
			var bcsajax = {};
			bcsajax.url =bcsurl;
			CsgAuthUtil.getToken(bcsajax,cgs_callbackFun);
		}
	}
	
//南网用户授权认证回调函数
function cgs_callbackFun(data) {
	var code = data.code;
	var token = data.token;
	var text = "";
	if (code == 0) {
		authToken = token;
		//text = "获取token值成功，回应状态码：" + code;
		//getdataAjax(authToken);
	} else if (code == 1) {
		text = "访问码不存在，回应状态码：" + code;
		alert(text);
	} else if (code == 2) {
		text = "应用包不存在，回应状态码：" + code;
		alert(text);
	} else if (code == 3) {
		text = "鉴权失败，回应状态码：" + code;
		alert(text);
	} else if (code == 4) {
		text = "系统异常，回应状态码：" + code;
		alert(text);
	} else {
		text = "回应状态码异常，值为：" + code;
		alert(text);
	}
}

/*调用获取token
 */
function Cgs_token(){
	authToken="";
	cgs_gettoken();
	return authToken;
}
