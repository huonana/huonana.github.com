//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

//options={time, fn, type}
//type:
/*
linear		匀速
ease-in		加速
ease-out	减速
*/
function move(obj, json, options)
{
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';
	
	var start={};
	var dis={};
	
	for(var name in json)
	{
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.round(options.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					//匀速
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					//加速
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					//减速
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.fn && options.fn();
		}
	}, 30);
}






