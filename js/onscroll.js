$(function(){
var byUser=false;

addEvent(document, 'scroll', function (){
	if(byUser)
	{
		clearInterval(document.timer);
	}
	
	byUser=true;
});

function moveScroll(target, time)
{
	var count=Math.round(time/30);
	var n=0;
	
	var start=document.documentElement.scrollTop||document.body.scrollTop;
	var dis=target-start;
	
	byUser=false;
	
	clearInterval(document.timer);
	document.timer=setInterval(function (){
		n++;
		
		var a=1-n/count;
		var cur=start+dis*(1-a*a*a);
		
		byUser=false;
		document.documentElement.scrollTop=cur;
		document.body.scrollTop=cur;
		
		if(n==count)
		{
			clearInterval(document.timer);
			byUser=false;
		}
	}, 30);
}

window.onload=function(){
	var oMain=document.getElementById("main");	
	var oUl=document.getElementById("ul1");
	var aPage=document.getElementsByClassName("page");
	var aLi=oUl.children;
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onclick=function(){
				moveScroll(aPage[index].offsetTop,700);
			};
		})(i)
	}
};
});
