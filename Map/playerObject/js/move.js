//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	
	/*var d=require('common.js')
	//alert(d.getStyle);
	var getStyle=d.getStyle;
	getStyle();*/
	
	var getStyle=require('common.js').getStyle;
	
	exports.move=function(obj,json,optional){
		optional=optional||{};
		optional.time=optional.time||300;
		optional.type=optional.type||'ease-out';
		optional.fn=optional.fn||null;
		
		var start={};
		var dis={};
		for(var key in json){
			start[key]=parseFloat(getStyle(obj,key));
			dis[key]=json[key]-start[key];
		}
		var count=Math.round(optional.time/30);
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			
			for(var key in json){
				//1.运动类型
				//2.求a ,cur
				switch(optional.type){
					case 'linear':
						var a=n/count;
						var cur=start[key]+dis[key]*a;
						break;	
					case 'ease-in':
						var a=n/count;
						var cur=start[key]+dis[key]*a*a*a;
						break;	
					case 'ease-out':
						var a=1-n/count;
						var cur=start[key]+dis[key]*(1-a*a*a);
						break;
					case 'ease-in-out':
						if(n/count<0.5){
							var a=n/count*1.5;
							var cur=start[key]+dis[key]*a*a*a;
						}else{
							exports.move(obj,json,{time:optional.time/2,fn:optional.fn});
						}
						break;	
				}
				//3.使用
				if(key=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity='+cur*100+')';	
				}else{
					obj.style[key]=cur+'px';
				}
			}
			
			if(n==count){
				clearInterval(obj.timer);
				optional.fn&&optional.fn();	
			}
		},30);
			
	};
	
});