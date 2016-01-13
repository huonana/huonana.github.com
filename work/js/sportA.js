// JavaScript Document
$(function(){
	var oDiv=document.getElementById('play');
	var aBtn=oDiv.getElementsByTagName('ol')[0].children;
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	var now=0;
	
	for(var i=0;i<aBtn.length;i++)
	{
		(function (index){
			aBtn[i].onmouseover=function ()
			{
				now=index;
				
				tab();
			};
		})(i);
	}
	
	function tab()
	{
		for(var i=0;i<aBtn.length;i++)
		{
			aBtn[i].className='';
		}
		aBtn[now].className='active';
		move(oUl, -aLi[0].offsetHeight*now, 400);
	}
	
	//下一个
	function next()
	{
		now++;
		if(now==aBtn.length)
			now=0;
		
		tab();
	}
	
	var timer=setInterval(next, 2000);
	
	oDiv.onmouseover=function ()
	{
		clearInterval(timer);
	};
	oDiv.onmouseout=function ()
	{
		timer=setInterval(next, 2000);
	};
});
var timer=null;

function move(obj, target, time)
{
	var start=obj.offsetTop;
	var dis=target-start;
	
	var count=Math.round(time/30);
	var n=0;
	
	clearInterval(timer);
	timer=setInterval(function (){
		n++;
		
		obj.style.top=start+dis*n/count+'px';
		
		if(n==count)
		{
			clearInterval(timer);
		}
	}, 30);
}
