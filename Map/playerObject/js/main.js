//版权 北京智能社©, 保留所有权利
/*seajs.use([
	'tab.js',
	'focusImg.js'
],function(
	modTab,
	modFoImg
){
	modTab.tabAll('movie_moreMsg');	
	modFoImg.focusImg('playerIndexFocus');	
});*/


define(function(require,exports,module){
	require('tab.js').tabAll('movie_moreMsg');//
	require('focusImg.js').focusImg('playerIndexFocus');//
});