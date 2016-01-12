//版权 北京智能社©, 保留所有权利

var $ = {};
$.ajax = ajax;

function json2url(json){
	var arr = [];
	json.t = Math.random();
	for(var name in json){
		arr.push(name + "=" + encodeURIComponent(json[name]));
	}
	return arr.join("&");
}
//options : url data timeout type success error
function ajax(options){
	
	options = options || {};
	if(!options.url){
		return;
	}
	
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	options.type = options.type || "get";
	
	var str = json2url(options.data)
	
	// 1 创建
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 2 连接
	// 3 发送
	if(options.type == "get"){
		xhr.open("get",options.url + "?" + str,true);
		xhr.send();
	} else {
		xhr.open("post",options.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(str);
	}
	
	// 4 接收
	xhr.onreadystatechange = function(){
		
		//判断xhr状态
		if(xhr.readyState == 4){//完成
			clearTimeout(timer);
			//判断http状态码
			
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ){
				options.success && options.success(xhr.responseText);
			} else {
				options.error && options.error(xhr.status);
			}
		} 
		
	};
	
	//超时
	
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();	
		},options.timeout);
	}
	
	
}


