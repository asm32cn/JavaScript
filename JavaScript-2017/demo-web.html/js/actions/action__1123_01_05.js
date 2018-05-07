// action__1123_01_01.js

function action__1123_01_05__class(){
	var _this = this;
	this._selected = -1;
	this._storage = window.localStorage ? window.localStorage : null;
	this.objDialog = null;
	this.objContainer = null;
	this.arrButtons = [];


	this.init = function(){
		_this._selected = -1;
		_this.objDialog = document.getElementById("divForm1123_01_05");
		_this.objContainer = _this.objDialog.getElementsByTagName("tbody")[0];
		_this.arrButtons = _this.objDialog.getElementsByTagName("a");

		_this.doRefreshItems();

		// bind button action
		addEvent(_this.arrButtons[0], "mousedown", Function("e", "js__popup1.hide();\n" +
			"menu_actions1.doAction(\"1123-01-01\");\n" +
			"return false;"));
		addEvent(_this.arrButtons[1], "mousedown", Function("e", "action__1123_01_05__class1.doItemRemove(); return false;" ));
		addEvent(_this.arrButtons[2], "mousedown", Function("e", "action__1123_01_05__class1.doItemDisable(); return false;" ));
		addEvent(_this.arrButtons[3], "mousedown", Function("e", "action__1123_01_05__class1.doItemEnable(); return false;" ));
		addEvent(_this.arrButtons[4], "mousedown", Function("e", "js__popup1.hide(); return false;" ));
		addEvent(_this.arrButtons[5], "mousedown", Function("e", "js__popup1.hide(); return false;" ));
	}

	this.doRefreshItems = function(){
		var A_objList = _this.objContainer.getElementsByTagName("tr");
		for(var i=0; i<5; i++){
			var n = 5-i;
			if(A_objList[n]){
				this.objContainer.removeChild(A_objList[n]);
			}
		}
		if(_this._storage){
			var obj = _this._storage.getItem("jsonItems");
			if(obj){
				obj = JSON.parse(obj);
				for(var i=0; i<obj.length; i++){
					var tr = document.createElement("tr");
					var td = document.createElement("td");
					td.innerHTML = obj[i].code;
					tr.appendChild(td);
					td = document.createElement("td");
					td.innerHTML = obj[i].title;
					tr.appendChild(td);
					td = document.createElement("td");
					td.innerHTML = obj[i].isDisabled ? "停用" : "";
					tr.appendChild(td);
					tr.appendChild(document.createElement("td"));
					addEvent(tr, "mouseup", Function("action__1123_01_05__class1.onClickItem(" + i + ")"));
					_this.objContainer.appendChild(tr);
				}
			}
		}
	}

	this.onClickItem = function(n){
		var A_objList = _this.objContainer.getElementsByTagName("tr");
		for(var i=1; i<A_objList.length; i++){
			A_objList[i].className = (i==n+1) ? "selected" : "";
		}
		this._selected = n;
	}

	this.doItemRemove = function(){
		var A_objList = _this.objContainer.getElementsByTagName("tr");
		var n = _this._selected;
		if(n==-1){
			_alert("请选择要删除的项!");
			return;
		}
		if(_this._storage){
			var obj = _this._storage.getItem("jsonItems");
			if(obj){
				obj = JSON.parse(obj);
				for(var i=0; i<obj.length; i++){
					if (i==n){
						obj.splice(i, 1);
						this._selected = -1;
						break;
					}
				}
				if(this._selected == -1){
					this._storage.setItem("jsonItems", JSON.stringify(obj));
					this.doRefreshItems();
				}
			}
		}
	}

	this.doItemDisable = function(){
		var A_objList = _this.objContainer.getElementsByTagName("tr");
		var n = _this._selected;
		if(n==-1){
			_alert("请选择要禁止的项!");
			return;
		}
		if(_this._storage){
			var obj = _this._storage.getItem("jsonItems");
			if(obj){
				obj = JSON.parse(obj);
				for(var i=0; i<obj.length; i++){
					if (i==n){
						obj[i].isDisabled=true;
						A_objList[n+1].getElementsByTagName("td")[2].innerHTML = "停用";
						break;
					}
				}
				this._storage.setItem("jsonItems", JSON.stringify(obj));
			}
		}
	}

	this.doItemEnable = function(){
		var A_objList = _this.objContainer.getElementsByTagName("tr");
		var n = _this._selected;
		if(n==-1){
			_alert("请选择要恢复的项!");
			return;
		}
		if(_this._storage){
			var obj = _this._storage.getItem("jsonItems");
			if(obj){
				obj = JSON.parse(obj);
				for(var i=0; i<obj.length; i++){
					if (i==n){
						obj[i].isDisabled=false;
						A_objList[n+1].getElementsByTagName("td")[2].innerHTML = "";
						break;
					}
				}
				this._storage.setItem("jsonItems", JSON.stringify(obj));
			}
		}
	}
}

var action__1123_01_05__class1 = new action__1123_01_05__class();

function action__1123_01_05(){
	var m_strDisplay = '<div id="divForm1123_01_05">\n' +
		'  <dl>\n' +
		'    <dt>\n' +
		'      <table width="305" border="0" cellpadding="5" cellspacing="0" class="tableListView" bordercolor="#333333">\n' +
		'        <tr>\n' +
		'          <th width="60">科目代码</th>\n' +
		'          <th width="150">科目名称</th>\n' +
		'          <th width="30">停用</th>\n' +
		'          <th>&nbsp;</th>\n' +
		'        </tr>\n' +
		/*'        <tr>\n' +
		'          <td scope="col">00</td>\n' +
		'          <td scope="col">测试项</td>\n' +
		'          <td scope="col">&nbsp;</td>\n' +
		'          <td scope="col">&nbsp;</td>\n' +
		'        </tr>\n' +*/
		'      </table>\n' +
		'    </dt>\n' +
		'    <dd>\n' +
		'    	<a href="#">新增</a>\n' +
		'    	<a href="#">删除</a>\n' +
		'    	<a href="#">停用</a>\n' +
		'    	<a href="#">恢复</a>\n' +
		'    </dd>\n' +
		'  </dl>\n' +
		'  <ul>\n' +
		'    <li><a href="#">确定</a></li>\n' +
		'    <li><a href="#">取消</a></li>\n' +
		'  </ul>\n' +
		'</div>\n';

	js__popup1.show({"title":"块内科目", width:400, height:255, "html":m_strDisplay});
	setTimeout(action__1123_01_05__class1.init, 500);
}