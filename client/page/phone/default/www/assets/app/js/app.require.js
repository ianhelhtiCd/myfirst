/*
*	ExMobi4.x+ JS
*	Version	: 1.0.0
*	Author	: nandy007
*	Email	: 
*	Weibo	: 
*	Copyright 2016 (c) 
*/

var $config = {
	exmobiSevice: '${$native.getAppSetting().domain}/process/service/${ClientUtil.getAppId()}',
	serverUrl:"http://172.16.4.74:8001/process/service/neworderserv"
};

require.config({
	//配置基准地址，请按照实际情况配置,模拟器无效
    //baseUrl: (document.currentScript.src.split('assets')[0])+'assets',
    //模拟器调试用
    baseUrl: '../assets',
    paths: {
    	//配置要引入的第三方类库，地址相对于baseUrl
        jquery: 'third/jquery/jquery-2.1.3.min',
        jqm: 'third/jquery/jquery.mobile.custom.min',
        vue: 'third/vue/vue',
        iscroll: 'third/iscroll/iscroll-probe',
        template: 'third/arttemplate/template-native',
        util: 'third/util/util',
        seedsui: 'third/seedsui/plugin/seedsui/seedsui.min',
        agile: 'agile/js/agile',
        jsondata: '../jsondata',
        bridge_al: 'bridge/agile.exmobi',
        bridge_ex: 'bridge/exmobi',
        datepicker: 'third/datepicker/lCalendar.min'
    }
});

//首先引入基础库
require(['jquery', 'jqm', 'template'], function($, jqm, template){
	if(!window.$) window.$ = $;
	if(!window.template) window.template = template;
	
	window.PointerEvent = undefined;//解决iscroll在chrome55.X版本的bug，需在iscroll加载前设置
	//由于iscroll有bug，需要先hack之后在引入
	require(['iscroll', 'agile'], function(){
		//引入agile后再进行扩展组件和控制器的添加
		(function(){
			A.event.add({
				beforeunload : function(){
					$(document).on('beforeunload', function(){
						A.Controller.close();
					});
				}
			});
			
			A.Controller.add({
				close : {
					selector : '[data-toggle="close"]',
					handler : function(hash){
						try{
							ExMobiWindow;
							$native.close();
						}catch(e){
							history.go(-1);
						}
						
					}
				},
				html : {
					selector : '[data-toggle="html"]',
					handler : function(hash, el){
						try{
							ExMobiWindow;
							var $el = $(el);
							var isBlank = $el.attr('target')=='_self'?false:true;
							var transition = $el.data('transition')||'';
							$native.openWebview(hash, isBlank, transition);
						}catch(e){
							location.href = A.util.parseURL(hash).getURL();
						}
						
					}
				}
			});
		})();
		
		//最后启动AL
		A.launch({
			//readyEvent设置为空串即立即启动
			readyEvent: '', //触发ready的事件，在ExMobi中为plusready;由于使用了requirejs，ready事件和plusready事件已失效，AL应立即启动
			backEvent: 'backmonitor',
			crossDomainHandler: function(opts) {
				$util.ajax(opts);
			},
			iScrollOptions : {
				click : true,
				tap : true
			}
		});
	});
});
