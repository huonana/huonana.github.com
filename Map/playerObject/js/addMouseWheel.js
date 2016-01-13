//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	
	var getByClass=require('common.js').getByClass;
	
	exports.addMouseWheel=function(obj,fn){
		if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			//ff
			obj.addEventListener('DOMMouseScroll',fnWheel,false);	
		}else{
			//other	
			obj.onmousewheel=fnWheel;
		}
		function fnWheel(ev){
			oEvt=ev||event;
			var down=true;
			if(oEvt.detail){
				//ff
				down=oEvt.detail>0?true:false;	
			}else{
				//other	
				down=oEvt.wheelDelta<0?true:false;
			}
			//fn(obj,down);
			fn(down);
			oEvt.preventDefault && oEvt.preventDefault();
			return false;
		}
		
	};	
	
	exports.initMouseWheel=function(sClass){
		var aScr=getByClass(document,sClass);
		for(var i=0;i<aScr.length;i++){
			//添加滚轮
			(function(index){
				exports.addMouseWheel(aScr[i],function(down){
					var oBar=getByClass(aScr[index],'rollBar')[0];
					var t=oBar.offsetTop;
					if(down){
						//alert('↓');	
						t+=10;
					}else{
						//alert('↑');	
						t-=10;
					}
					
					toScroll(aScr[index],t);
				});
			})(i);
			
			//添加拖拽
			exports.drag(aScr[i]);
		}

	};
	
	exports.drag=function(obj){
		var oBar=getByClass(obj,'rollBar')[0];
		
		oBar.onmousedown=function(ev){
			var oEvt=ev||event;
			var disY=oEvt.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				var t=oEvt.clientY-disY;//计算
				toScroll(obj,t);
			};	
			document.onmouseup=function(){
				document.onmousemove=document.onmosueup=null;	
			};
			return false;
		};	
	};
	
	function toScroll(obj,t){
		var oBar=getByClass(obj,'rollBar')[0];
		var oBarParent=getByClass(obj,'rollBox')[0];
		var oUp=getByClass(obj,'rollBarUp')[0];
		var oDown=getByClass(obj,'rollBarDown')[0];
		var oContent=obj.children[1];
		var oContentParent=obj;
		//限定
		if(t<0+oUp.offsetHeight) t=0+oUp.offsetHeight;
		if(t>oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight)
			t=oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight;
				
		oBar.style.top=t+'px';	//使用
		
		//滚内容	a/b=c/d		scale=a/b
		var scale=oBar.offsetTop/(oBarParent.offsetHeight-oBar.offsetHeight-oDown.offsetHeight);
		oContent.style.top=scale*(oContentParent.offsetHeight-oContent.offsetHeight)+'px';	
	}
	
});