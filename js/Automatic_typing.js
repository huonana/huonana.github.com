// JavaScript Document
$(function(){
	var str='熟练HTML，CSS，JavaScript等语言，熟练Jquery，AJAX，Jsonp，Seajs等前端技术，根据需求准确完成产品前端展示效果';
	
	var PageLeft=document.getElementById("page2_left");
	var PageCont=PageLeft.getElementsByClassName("page2_cont")[0];
	for(var i=0;i<str.length;i++){
		var oSpan=document.createElement("span");
		oSpan.innerHTML=str[i];
		PageCont.appendChild(oSpan);
		//alert(PageCont.innerHTML)
	}
	var aSpan =PageCont.children;
	var i = 0; 
	
	var timer = setInterval(function(){
		aSpan[i].className = "active";
		i++;
		if(i == str.length+1){
			clearInterval(timer);
		}
	},100);
});