// JavaScript Document
//move
function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
	}

//options duration easing complete 
function move(obj,json,options){
	
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || "ease-out";
	
	//起点 
	var start = {};
	var dis = {};
	var count = Math.round(options.duration/30);
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		//算位置
		
		for(var name in json){
			switch(options.easing){
				case "linear":
					var a = n/count;
					var cur = start[name] + dis[name]*a;
					break;
				case "ease-in":
					var a = n/count;
					var cur = start[name] + dis[name]*Math.pow(a,3);
					break;
				case "ease-out":
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1 - Math.pow(a,3));
					break;
			}
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur +　"px";
			}
		
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
		
	},30);
	
}
//
function getPos(obj){
	var l=t=0;
	l-=document.documentElement.clientLeft;
	t-=document.documentElement.clientTop;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l, top:t};
};


//绑定
function addEvent(obj, name, fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(name, fn, false);
	}
	else
	{
		obj.attachEvent('on'+name, fn);
	}
}