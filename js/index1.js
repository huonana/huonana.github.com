// JavaScript Document
/*  导航  */
window.onload=function(){
	var oUl=document.getElementById("ul1");
	var aLi=oUl.children;
	var oBox=aLi[aLi.length-1];
	for(var i=0;i<aLi.length-1;i++){
		aLi[i].onmouseover=function(){
			move(oBox,this.offsetLeft);
		};
	}
};
var speed=0;
var left=0;
var i=0;
function move(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		speed+=(iTarget-left)/5;
		speed*=0.7;
		left+=speed;
		obj.style.left=Math.round(left)+"px";
		if(obj.offsetLeft==iTarget && Math.abs(speed)<1){
			clearInterval(obj.timer);
		}
	},30);

}  /* end 导航*/
