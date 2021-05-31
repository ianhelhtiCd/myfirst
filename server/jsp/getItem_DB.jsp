<%-- ExMobi JSP文件，注释和取消快捷键统一为Ctrl+/ 多行注释为Ctrl+Shift+/ --%>
<%@ page language="java" import="java.util.*,org.json.*"
 contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/client/adapt.jsp"%>
<%@ include file="properties.jsp"%>
<%
     String outstr="";
     JSONArray lst = new JSONArray();
     JSONObject oj = new JSONObject();
	  //数据库协议获取数据
	  StringBuilder sb = new StringBuilder();
	  sb.append("SELECT top 10 ")
	      .append("[ID],[OBJECT_NAME],[OBJECT_CODE],[CATALOG_ID],[MANAGER_ID],[DEPARTMENT_ID]")
	      .append(",[COMPANY_ID],[UNIT_LEVEL],[PUTIN_STATUS],[REGISTER],[REGIST_TIME],[SUBMIT_TIME]")
	      .append(",[AUDITOR],[AUDITING_TIME] ,[BACK_TIME],[BACK_REASON],[USE_STATUS],[SCRAP_REASON]")
	      .append(",[REMARK],[SUPERIOR_ID],[MANAGER_NAME],[DEPARTMENT_NAME],[COMPANY_NAME],[UNIT]")
	      .append(",[USEDEPT_ID] ,[USEDEPT_NAME]")
	      .append(",CONVERT(varchar(100), [RECORD_DATE], 23) as recordtime ")
		  .append("FROM Mo_Material_object  ")
		  .append("where CATALOG_ID ='B4A3431BDAB64B688F6FA6C1014B9875'");
	  Object[] parms = new Object[]{};
	  List<TableRow> rows = aa.db.query("momis", sb.toString(), parms);
	  for(TableRow tr :rows){
		  lst.put(new JSONObject(tr.toJson()));
	  }
	  oj.put("list", lst);
	  oj.put("ret", "ok");
	  
   //System.out.println(oj.toString());
   String recalll = aa.req.getParameter("callback");
   outstr = jsonp(recalll,oj.toString());
   out.print(outstr);
%>
