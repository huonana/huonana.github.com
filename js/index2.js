// JavaScript Document
$(function(){
	var oUl=document.getElementById("ul1");
	var aLi=oUl.children;
	var oBox=aLi[aLi.length-1];
	for(var i=0;i<aLi.length-1;i++){
		aLi[i].onmouseover=function(){
			move(oBox,this.offsetLeft);
		};
	}
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
	}
});
/*首页切换*/
$(function(){
	var aBaoza=document.getElementById("baoza");
	var oNext=document.getElementsByClassName("next")[0];
	var oPrev=document.getElementsByClassName("prev")[0];
	var R = 4;
	var C = 6;
	for(var r = 0; r < R; r++){
		for(var c = 0; c < C; c++){
			var oSpan = document.createElement("span");
			oSpan.style.width = Math.round(aBaoza.offsetWidth/C )+ "px";
			oSpan.style.height = aBaoza.offsetHeight/R + "px";
			aBaoza.appendChild(oSpan);
			oSpan.style.left = oSpan.offsetWidth*c + "px";
			oSpan.style.top  = oSpan.offsetHeight*r + "px";
			
oSpan.style.backgroundPosition = -oSpan.offsetLeft + "px " + -oSpan.offsetTop + "px"; 
		}
	}
	var aSpan = aBaoza.children;
	var iNow = 0;
	oNext.onclick = function next(){
	
	 	 oldPic();
		iNow++;
		if(iNow == 4){
			iNow = 0;
		}
		newPic();
	};
	var timer=setInterval(function(){
		oldPic();
		iNow++;
		if(iNow == 4){
			iNow = 0;
		}
		newPic();
	},3000);
	oPrev.onclick = function(){
	
	 	 oldPic();
		
		if(iNow == 0){
			iNow = 3;
		}else{
			iNow--;
		}
		newPic();
	};
		//显示老图
	function oldPic(){
		for(var i = 0; i < aSpan.length; i++){
			aSpan[i].style.opacity = "1";
			aSpan[i].style.transition = "none";
			aSpan[i].style.transform = "none";
			//console.log(aSpan[0].style.transform);
			aSpan[i].style.backgroundImage = "url(image/mac"+iNow+".jpg)";			
		}
	};
		//显示新图
	function newPic(){
		aBaoza.style.backgroundImage = "url(image/mac"+iNow+".jpg)";
		 
		for(var i = 0; i < aSpan.length; i++){
			//延迟演示
			(function(oSpan){
				setTimeout(function(){
					oSpan.style.transition = "1s all ease";
					oSpan.style.opacity = "0";
					var x = oSpan.offsetWidth/2 + oSpan.offsetLeft - aBaoza.offsetWidth/2;
					var y  = oSpan.offsetHeight/2 + oSpan.offsetTop - aBaoza.offsetHeight/2;
					oSpan.style.transform = "translate("+x+"px,"+y+"px) rotateX("+rnd(0,180)+"deg) " + "rotateY("+rnd(0,180)+"deg)";
				},0);
			})(aSpan[i]);
		} 
	};
});
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}


/*我的作品*/
$(function(){
	tab(0);
	function tab(a){
		var oUl=document.getElementById("ul2");
		var oA=oUl.children[a].children;
		
		for(var i = 0; i < oA.length; i++){
			lagou(oA[i]);
		//alert(oA.length)	
		}
		function getDir(obj,oEvent){
			var x = oEvent.pageX - getPos(obj).left - obj.offsetWidth/2;
			var y = getPos(obj).top + obj.offsetHeight/2 - oEvent.pageY;
			
			// n 0 左 1 下  2 右   3 上
			return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
		}
		function lagou(oDiv){
			oDiv.onmouseover = function(ev){
				var oEvent = ev || event;
				var oFrom = oEvent.fromElement || oEvent.relatedTarget;
				
				if(oDiv.contains(oFrom)){
					return ;
				}
				
				var oSpan = this.children[1];
				var n = getDir(this,oEvent);
				var L=this.offsetWidth+"px";
				var T=this.offsetHeight+"px";
				switch(n){
					case 0:
						oSpan.style.left = "-300px";
						oSpan.style.top = "0";
						break;
					case 1:
						oSpan.style.left = "0";
						oSpan.style.top = "300px";
						break;
					case 2:
						oSpan.style.left = "300px";
						oSpan.style.top = "0";
						break;
					case 3:
						oSpan.style.left = "0";
						oSpan.style.top = "-300px";
						break;
				}
				
				move(oSpan,{left:0,top:0});
				
					
			};
			oDiv.onmouseout = function(ev){
				var oEvent = ev || event;
				var oTo = oEvent.toElement || oEvent.relatedTarget;
				
				if(oDiv.contains(oTo)){
					return ;
				}
				var oSpan = this.children[1];
				var n = getDir(this,oEvent);
				
				switch(n){
					case 0:
						move(oSpan,{left:-300,top:0});
						break;
					case 1:
						move(oSpan,{left:0,top:300});
						break;
					case 2:
						move(oSpan,{left:300,top:0});
						break;
					case 3:
						move(oSpan,{left:0,top:-300});
						break;
				}
			};
		}
	};

	var oSrc=document.getElementById("src");
	var oHead=oSrc.getElementsByTagName("span");
	var oUl=document.getElementById("ul2");
	var oContent=oUl.children;
	
	for(var i=0;i<oHead.length;i++){
		(function(index){
			oHead[i].onclick=function(){
				for(var i=0;i<oHead.length;i++){
					oHead[i].className="";
					oContent[i].className="";
				}
				oHead[index].className="active";
				for(var i=0;i<oHead.length;i++){
					tab(i);
				}
				oContent[index].className="cur";
			};
		})(i);
	}
	
});
$(function(){
	var oUl=document.getElementById("ul3");	
	var aLi=oUl.children;
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			var thisLiDiv=this.children[1];
			move(thisLiDiv,{opacity:1,bottom:0},{duration:300});

		};
		aLi[i].onmouseout=function(){
			var thisLiDiv=this.children[1];
			move(thisLiDiv,{opacity:0, bottom:-80},{duration:300});
		}
	}
});

