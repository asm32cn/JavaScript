// action__1123_01_01.js

function action__1123_01_01__onOK(){
	if(window.localStorage){
		var A_objText = document.getElementById("divForm1123_01_01").getElementsByTagName("input");
		var jsonItemNew = {"code":A_objText[0].value, "title":A_objText[1].value}
		if(jsonItemNew.code.length==0 || jsonItemNew.title.length==0){
			alert("代码 或者 名称 不能为空!");
			return;
		}

		var obj = window.localStorage.getItem("jsonItems");
		if(obj){
			obj = JSON.parse(obj);

			if(obj.length>=5){
				alert("本测试最多只能加5项目，多了就要考虑表头和滚动条方案了");
				js__popup1.hide();
				return;
			}
			var isFound = false;
			for(var i=0; i<obj.length; i++){
				if(!jsonItemNew.code.localeCompare(obj[i].code)){
					isFound = true;
					break;
				}
			}
			if(isFound){
				alert("这一项已经存在了");
			}else{
				obj.push(jsonItemNew);
			}
		}else{
			obj = [jsonItemNew];
		}
		console.log(JSON.stringify(obj));
		window.localStorage.setItem("jsonItems", JSON.stringify(obj));

	}else{
		alert("不支持 HTML5 本地存储 localStorage!");
	}
	js__popup1.hide();
	menu_actions1.doAction('1123-01-05');
}

function action__1123_01_01(){
	var m_strDisplay = '<div id="divForm1123_01_01">\n' +
		'	<dl>\n' +
		'    		<dt>本级代码:</dt>\n' +
		'		<dd><input name="txtCode" type="text" value="" /></dd>\n' +
		'	</dl>\n' +
		'	<dl>\n' +
		'		<dt>本级名称:</dt>\n' +
		'		<dd><input name="txtTitle" type="text" value="" /></dd>\n' +
		'	</dl>\n' +
		'	<ul>\n' +
		'    		<li><a href="#" onclick="action__1123_01_01__onOK(); return false;">确定</a></li>\n' +
		'    		<li><a href="#" onclick="js__popup1.hide(); return false;">取消</a></li>\n' +
		'	</ul>\n' +
		'</div>\n';

	js__popup1.show({"title":"增加一级科目", width:260, height:90, "html":m_strDisplay});
}