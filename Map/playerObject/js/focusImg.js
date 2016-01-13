//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	var getByClass=require('common.js').getByClass;
	var move=require('move.js').move;
	exports.focusImg=function(id){
		var obj=document.getElementById(id);
		var aHead=obj.children[1].getElementsByTagName('li');	
		var aContent=obj.children[0].getElementsByTagName('li');
		var oHeadActive=getByClass(obj,'fi_pointer')[0];
		var zIndex=2;
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onmouseover=function(){
					//oHeadActive.style.left=this.offsetLeft+'px';
					move(oHeadActive,{left:this.offsetLeft});
					for(var i=0;i<aHead.length;i++){
						//aContent[i].style.opacity=0;
						move(aContent[i],{opacity:0});
					}
					//aContent[index].style.opacity=1;
					move(aContent[index],{opacity:1});
					aContent[index].style.zIndex=zIndex++;
				};
			})(i);
		}
	};	
});