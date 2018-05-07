// menu-defined-main.js

var tabControls = document.getElementById("dlClassSelectTab").getElementsByTagName("dt")[0].getElementsByTagName("li");
var tabConPanes = document.getElementById("ulTabContentPanes").getElementsByTagName("li");
for(var i=0; i<tabControls.length; i++){
	tabControls[i].onclick = function(){
		for(var i=0; i<tabControls.length; i++){
			var className = (tabControls[i] == this ? "selected" : "");
			tabControls[i].className = className;
			tabConPanes[i].className = className;
		}
	}
}

// menu config
var jsonContextMenuConfig = [
	{"code":"01", "title":"增加一级科目(N)"},
	{"code":"02", "title":"增加同级科目块(P)"},
	{"code":"03", "title":"增加下级科目块(Q)"},
	{"code":"04", "title":"删除科目块"},
	{"code":"05", "title":"定义模块内科目"}];

var jsonFuncMenuConfig01 = [
	{"code":"1001", "title":"库存现金", "subItems":[{"code":"01", "title":"人民币"}]},
	{"code":"1002", "title":"银行存款", "subItems":[
		{"code":"01", "title":"交通银行", "subItems":[
			{"code":"01", "title":"省分行营业部"}]},
		{"code":"02", "title":"中国银行", "subItems":[
			{"code":"01", "title":"省府路支行营业部"}]},
		{"code":"03", "title":"贵阳银行", "subItems":[
			{"code":"01", "title":"齐兴支行"},
			{"code":"02", "title":"虹桥支行"}]},
		{"code":"04", "title":"兴业银行"},
		{"code":"05", "title":"光大银行"},
		{"code":"06", "title":"建设银行"}]},
	{"code":"1012", "title":"其他货币资金", "subItems":[
		{"code":"04", "title":" 信用卡"},
		{"code":"05", "title":"信用保证金"},
		{"code":"07", "title":"保函押金", "subItems":[
			{"code":"01", "title":"保证金账户", "subItems":[
				{"code":"01", "title":"贵州电网公司2012年…"},
				{"code":"02", "title":"普定农场110KV变电站…"},
				{"code":"03", "title":"110KV锦屏2号主变扩…"},
				{"code":"04", "title":"贵州电网公司2012年…"},
				{"code":"05", "title":"贵州电网公司2012年…"},
				{"code":"06", "title":"贵州织金三塘风电场…"},
				{"code":"07", "title":"贵阳客运东站(1396)"},
				{"code":"08", "title":"贵州省贵阳市国家税…"}]}]}]},
	{"code":"1013", "title":"备用金"},
	{"code":"1101", "title":"交易性金融资产"},
	{"code":"1121", "title":"应收票据"},
	{"code":"1122", "title":"应收账款"},
	{"code":"1123", "title":"预付账款", "subItems":[
		{"code":"01", "title":"预付工程款"/**/, "subItems":[
			{"code":"01", "title":"增加一级科目(N)"},
			{"code":"02", "title":"增加同级科目块(P)"},
			{"code":"03", "title":"增加下级科目块(Q)"},
			{"code":"04", "title":"删除科目块"},
			{"code":"05", "title":"定义模块内科目"}]},
		{"code":"02", "title":"预付材料款"},
		{"code":"03", "title":"预付青苗款"},
		{"code":"04", "title":"预付班组费用"},
		{"code":"05", "title":"预付零星抢修工程款"},
		{"code":"06", "title":"其他"}]},
	{"code":"1131", "title":"应收股利"},
	{"code":"1132", "title":"应收利息"},
	{"code":"1221", "title":"其他应收款"},
	{"code":"1231", "title":"坏账准备"},
	{"code":"1303", "title":"委托贷款"},
	{"code":"1304", "title":"委托贷款损失准备"},
	{"code":"1402", "title":"材料采购"},
	{"code":"1403", "title":"原材料"},
	{"code":"1471", "title":"融资租赁资产"},
	{"code":"", "title":""}];

var A_objMenuContainers = document.getElementById('ulTabContentPanes').getElementsByTagName('li');

function menu_actions(){
	this.arrActions = []
	this.addAction = function(codeEx, actionFile){
		this.arrActions.push({"codeEx":codeEx /*, "actionFile":actionFile */ });
	}
	this.doAction = function(codeEx){
		var isFound = false;
		for(var i=0; i<this.arrActions.length; i++){
			if(!codeEx.localeCompare( this.arrActions[i].codeEx )){
				isFound = true;
				break;
			}
		}
		if(isFound){
			this.jsAction("action__" + codeEx);
		}else{
			//this.loadJsFile("undefined.js");
		}
	}

	/*
	this.jsActionLaunch = function(fn){
		setTimeout("try{" + fn + "();}catch(ex){alert(\"" + fn + ": \"+ex.description);}", 100);
	}*/

	this.jsAction = function(fn){
		var fnX = fn.replace(/-/ig, "_");
		var js__name = "js__" + fnX;
		var obj = document.getElementById(js__name);
		if(obj){
			//this.jsActionLaunch(fnX);
			js__lib__launch(fnX);
		}else{
			obj = document.createElement("script");
			obj.id = js__name;
			document.getElementById("divPopupContainer").appendChild(obj);
			var isIE = navigator.appVersion.indexOf("MSIE")!=-1?true:false;
			//alert("ie6=" + isIE);
			// if(!isIE) obj.onload = function(){ this.jsActionLaunch(fnX); };
			if(!isIE) obj.onload = function(){ js__lib__launch(fnX); };
			obj.src = "js/actions/" + fnX + ".js" + "?" + (new Date().getTime());
			//if(isIE) this.jsActionLaunch(fnX);
			if(isIE) js__lib__launch(fnX);
		}
	}
}

var menu_actions1 = new menu_actions();
menu_actions1.addAction("1123-01-01");
menu_actions1.addAction("1123-01-05");
//menu_actions1.addAction("");





// menu render
function menu_render(contentObj, jsonConfig){
	// 这个类可以升级成 支持多个根菜单的
   if(!menu_render.childs){
        menu_render.childs=[]
    };
    this.ID=menu_render.childs.length;
    menu_render.childs.push(this);

	//var _this = this;
	this.contentObj = contentObj;
	this.jsonConfig = jsonConfig;
	this.rootMenu = new Array(); // 根目录菜单长期存在，不会被释放
	this.subMenu = new Array(); // 记录曾经用过的 UI 资源，释放 UI 和 事件的时候会用到
	if(!this.contentObj){
		throw new Error("必须指定contentObj.");
		return
	};

	this.createMenuItem = function (itemConfig){
		var obj = document.createElement("dl");
		var obj2 = document.createElement("dt");
		obj2.innerHTML = itemConfig.code;
		obj.appendChild(obj2);
		obj2 = document.createElement("dd");
		obj2.innerHTML = itemConfig.title;
		obj.appendChild(obj2);
		if(itemConfig.subItems) obj.className = "expandable";
		return obj;
	}

	this.createSubMenu = function (jsonConfig, arrParentIndex){
		var obj = document.createElement("div");
		obj.className = "divSubMenu";
		var itemsConfig = jsonConfig.subItems;
		var m_nCount = itemsConfig.length;
		for(var i=0; i<m_nCount; i++){
			var obj2 = document.createElement("dl");
			if(m_nCount==1){
				obj2.className = "dlTreeItem1";
			}else{ // m_nCount > 1
				if(i==0){
					obj2.className = "dlTreeItem2";
				}else if(i==m_nCount-1){
					obj2.className = "dlTreeItem4";
				} else{
					obj2.className = "dlTreeItem3";
				}
			}
			var obj3 = document.createElement("dt");
			obj3.innerHTML = itemsConfig[i].code;
			obj2.appendChild(obj3);
			obj3 = document.createElement("dd");
			obj3.innerHTML = itemsConfig[i].title;
			obj2.appendChild(obj3);
			if(itemsConfig[i].subItems) obj2.className += " expandable";
			obj.appendChild(obj2);

			var strArrIndex = "[" + arrParentIndex.join(",") + "," + i + "]"
			obj2.oncontextmenu = Function("e", "e.preventDefault();");
			/*this.addEvent(obj2,"mouseup",Function("e", "menu_render.childs["+this.ID+"].menuAction(" + strArrIndex + ");\n" +
				"menu_render.childs["+this.ID+"].stopPropagation(e);"));
			*/
			this.addEvent(obj2,"mouseup",Function("e", "e = e || window.event;" +
				"console.log('button=' + e.button);" +
				"if(e.button==0){ // 左键\n" +
				"	menu_render.childs["+this.ID+"].menuAction(" + strArrIndex + ", false);\n" +
				"}else if(e.button=2){ // 右键\n" +
				"	console.log('点了右键 " + strArrIndex + " ', true);\n" +
				"}\n" +
				"menu_render.childs["+this.ID+"].stopPropagation(e); // 阻止冒泡"));
		}
		return obj;
	}

    this.addEvent = function(l,i,I){
        if(l.attachEvent){
            l.attachEvent("on"+i,I)
        }else{
            l.addEventListener(i,I,false)
        }
	};

	this.removeEvent = function(l, i, I){ // 还没有测试正确性、稳定性和兼容性
		if(l.detachEvent){
			l.detachEvent("on"+i, I)
		}else{
			l.removeEventListener(i, I, false)
		}
	};

	this.stopPropagation = function(e) {  
		e = e || window.event;
		if(e.stopPropagation) { //W3C阻止冒泡方法
			e.stopPropagation();
		} else {
			e.cancelBubble = true; //IE阻止冒泡方法
		}
	}

	this.initialize=function(){
		for(var i=0; i<jsonConfig.length; i++){
			var menuItem = this.createMenuItem(jsonConfig[i]);
			this.addEvent(menuItem,"mouseup",Function("menu_render.childs["+this.ID+"].menuAction([" + i + "]);"));
			this.contentObj.appendChild( menuItem )
			this.rootMenu.push(menuItem);
		}
	}

	this.menuAction = function(arrIndex, isContextMenuCalled){
		try{ // try catch for ie6
			// console.clear();
			console.group("点击菜单");
		}catch(e){}

		// 先比对销毁用不上的资源
		// 释放用不上的事件，释放用不上的 UI 资源
		// 释放控制:开始
		var arrIndexPrev = new Array();
		var codeEx = "-";
		if(this.subMenu.length>0){
			for(var i=0; i<this.subMenu.length; i++){
				arrIndexPrev.push(this.subMenu[i].selectedIndex);
			}
			for(var i=0; i<this.subMenu.length; i++){
				this.subMenu[i]._parent.removeChild( this.subMenu[i].items );
			}
		}
		// 释放控制:结束 (代码未完成，事件未挨个释放，发布代码的时候需要完成这段)

		if(arrIndex.length>0){
			var arrCode = []
			try{
				for(var i=0; i<arrIndex.length; i++){
					var n = arrIndex[i];
					var item = i==0 ? this.jsonConfig[n] : item.subItems[n];
					arrCode.push( item.code)
				}
			}catch(e){}
			codeEx = arrCode.join("-");
		}
		try{ // try catch for ie6
			console.log("codeEx=", codeEx);
			console.log("arrIndex.length=" + arrIndex.length);
			console.log("arrIndex=", arrIndex);
			console.log("arrIndexPrev=", arrIndexPrev);
		}catch(e){}
		
		if(arrIndex.length>0){
			this.subMenu = new Array();
			var config = this.jsonConfig;
			var arrIndexNew = new Array();
			var _parent = null;
			for(var i=0; i<arrIndex.length; i++){
				var n = arrIndex[i];
				config = i==0 ? config[n] : config.subItems[n];
				arrIndexNew.push(n);
				if(config.subItems){
					_parent = i==0 ? this.rootMenu[ arrIndex[0] ].getElementsByTagName("dd")[0] : objItem._parent.getElementsByTagName("dd")[n];
					var objItem = {
						"selectedIndex" : n,
						"items": this.createSubMenu(config, arrIndexNew),
						"_parent": _parent}
					_parent.appendChild( objItem.items );
					this.subMenu.push(objItem);
				}
			}
		}
		menu_actions1.doAction(codeEx);
		try{ // try catch for ie6
			console.groupEnd();
		}catch(e){}
	}
};

var menu_render1 = new menu_render( A_objMenuContainers[0], jsonFuncMenuConfig01 );
menu_render1.initialize()
//A_objMenuContainers[1].innerHTML = "";
//var menu_render2 = new menu_render( A_objMenuContainers[1], jsonFuncMenuConfig01 );
//menu_render2.initialize()

