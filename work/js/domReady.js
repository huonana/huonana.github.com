// JavaScript Document
function $(fn){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);
	}else{
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState=="complete"){
				fn && fn();
			}
		});
	}
};