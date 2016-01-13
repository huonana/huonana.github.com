// JavaScript Document
window.onload=function(){
	var oPlay=document.getElementById('play');
	var aLi=oPlay.children[2].children;
	var oUl=oPlay.children[3];
	var oPrev=oPlay.children[0];
	var oNext=oPlay.children[1];
	var now=0;
	var ready=true;
	//1.复制一份ul下面的li
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=oUl.children[0].offsetWidth*oUl.children.length+'px';
	//2.切换
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onclick=function(){
				now=index;
				tab();
			};	
		})(i);
	}
	function tab(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className='';
		}
		if(now==5){
			aLi[0].className='active';	
		}else{
			aLi[now].className='active';	
		}
		move(oUl,{left:-now*oUl.children[0].offsetWidth},{fn:function(){
			//运动结束了
			ready=true;
			if(now==5){
				oUl.style.left=0;
				now=0;
			}
		}});
	}
	
	oNext.onclick=function(){
		if(!ready) return;
		ready=false;
		now++;
		tab();	//先动
	};
	oPrev.onclick=function(){
		if(!ready) return;
		ready=false;
		if(now==0){
			//先归位
			now=4;
			oUl.style.left=-oUl.offsetWidth/2+'px';	
		}else{
			now--	
		}
		tab();//再动
	};
};