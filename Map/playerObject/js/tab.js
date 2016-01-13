//版权 北京智能社©, 保留所有权利
define(function(require,exports,module){
	exports.tab=function(obj){
		var aHead=obj.children[0].getElementsByTagName('li');
		var aContent=obj.children[1].children;
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onclick=function(){
					for(var i=0;i<aHead.length;i++){
						aHead[i].className='';
						aContent[i].style.display='none';
					}	
					this.className='active'
					aContent[index].style.display='block';
				};	
			})(i);
		}
	};
	
	exports.tabAll=function(sClass){
		var aTab=document.getElementsByClassName(sClass);
		for(var i=0;i<aTab.length;i++){
			exports.tab(aTab[i]);	
		}
	};
	
});