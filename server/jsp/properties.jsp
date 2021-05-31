<%@ page language="java" import="java.util.*,org.json.*" pageEncoding="UTF-8"%>
<%! 
//配置变量
  String servurl = "http://172.16.4.74:8080/order_inside";
 
public JSONObject getPropertes(){
	JSONObject retJson= new JSONObject();
	try{
		//retJson.put("business_url", "http://172.16.4.74:8080/BLBE");
		retJson.put("business_url", "http://172.16.8.121:9191/mobile");
		retJson.put("download", "/mobilecontorl/downloadDB");
		retJson.put("upload", "/mobilecontorl/uploadDB");
		retJson.put("checkServer", "/mobilecontorl/checkServer");
		retJson.put("flag", true);
	}catch(Exception e){
		System.out.println(e);
	}
	return retJson;
}

//jsonp处理
public String jsonp(String callbakstr,String jsonstr) throws Exception{
  return (((callbakstr==null)||(callbakstr.trim()==""))?jsonstr:callbakstr+"("+jsonstr+")");
}
public String  getUUID(){
	return UUID.randomUUID().toString().replaceAll("-", "");
}
%>