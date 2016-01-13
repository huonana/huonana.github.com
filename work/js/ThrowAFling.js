// JavaScript Document
$(function(){
	
	var oDiv = document.getElementById("div1");
	
	var speedX = 0;
	var speedY = 0;
	
	var lastX = 0;
	var lastY = 0;
	
	var timer = null;
	oDiv.onmousedown = function(ev){
		clearInterval(timer);
		var oEvent = ev || event;
		var disX = oEvent.clientX - oDiv.offsetLeft;
		var disY = oEvent.clientY - oDiv.offsetTop;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			oDiv.style.left = oEvent.clientX - disX + "px";
			oDiv.style.top  = oEvent.clientY - disY + "px";
			/*
			var oBox = document.createElement("div");
			document.body.appendChild(oBox);
			oBox.className = "box";
			oBox.style.left = oEvent.clientX - disX + "px";
			oBox.style.top  = oEvent.clientY - disY + "px";*/
			
			speedX = oDiv.offsetLeft - lastX;
			speedY = oDiv.offsetTop - lastY;
			
			lastX = oDiv.offsetLeft;
			lastY = oDiv.offsetTop;
			
			
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oDiv.releaseCapture && oDiv.releaseCapture();
			
			move();
			
		};	
		oDiv.setCapture && oDiv.setCapture();
		return false;
	};
	
	
	function move(){
		clearInterval(timer);
		timer = setInterval(function(){
			speedY += 3;
			
			var l = oDiv.offsetLeft + speedX;
			var t = oDiv.offsetTop + speedY;
			
			if(t >= document.documentElement.clientHeight - oDiv.offsetHeight){
				t = document.documentElement.clientHeight - oDiv.offsetHeight;
				speedY *= -0.8;
				speedX *= 0.8; 
			} else if(t <= 0){
				t = 0;
				speedY *= -0.8; 
				speedX *= 0.8;
			}
			
			if(l >= document.documentElement.clientWidth - oDiv.offsetWidth){
				l = document.documentElement.clientWidth - oDiv.offsetWidth;
				
				speedX *= -0.8;
				speedY *= 0.8;
			} else if(l <= 0){
				l = 0;
				speedX *= -0.8;
				speedY *= 0.8;
			}
			
			
			oDiv.style.left = l + "px";
			oDiv.style.top  = t + "px";
			
			if(Math.abs(speedX) < 1){
				speedX = 0;
			}
			if(Math.abs(speedY) < 1){
				speedY = 0;
			}
			
			if(speedX == 0 && speedY == 0 && t == document.documentElement.clientHeight - oDiv.offsetHeight){
				clearInterval(timer);
			}
			 
		},30);
 	
	}
 
});