// popup windows
function js__popup(){
    // Author: http://www.asm32.net/
    // 2012-04-09
	var _this = this;
    this.displayWidth=450;
    this.displayHeight=400;
    this.displayStyleSheet = '';
    this.displayObject = null;
    this.frameParams = null;
    this.frameWidth=0;
    this.frameHeight=0;
    this.frameStyleSheet = '';
    this.frameObject = null;
    this.frameTitleObject = null;
    this.frameCloseObject = null;
    this.isInitialize = false;

    this.isExpanded = false;

    this.frameHeight__isTransitorily = false;
    this.frameHeight__transitorily=50; // 过渡值
    this.frameHeight__step=50;         // 递增
    this.frameHeight__interval=25;     // 片段时间
    this.frameHeight__nIntervalID = null;

    this.isIE = navigator.appVersion.indexOf("MSIE")!=-1?true:false;

    if(!js__popup.childs){
        js__popup.childs=[]
    };
    this.index1=js__popup.childs.length;
    js__popup.childs.push(this);

    this.init = function(){
        if(this.isInitialize) return fale;
        //this.frameObject = document.getElementById("divPopupFrame");
        //this.displayObject = document.getElementById("divPopupDisplay");

        this.displayObject = document.createElement("div");
        this.displayObject.id = "divPopupDisplay";
        with(this.displayObject.style){
            overflow = "hidden";
            clear = "both";
            //backgroundColor = "#CCCCCC";
            margin = "0px auto";
            textAlign = "left";
        };

        this.frameCloseObject = document.createElement("div");
        this.frameCloseObject.id = "divPopupClose";
        with(this.frameCloseObject.style){
            position="absolute";
            background = "no-repeat url(img/bg/popupFrameClose.gif) 0px 0px";
            width = "49px";
            height = "49px";
            right = "0px";
            top = "0px";
            zIndex = 1000;
        }

        this.frameTitleObject = document.createElement("div");
        this.frameTitleObject.id = "divPopupTitle";
        with(this.frameTitleObject.style){
            height = "49px";
            lineHeight = "49px";
            borderBottom = "1px dashed #2B5056";
            margin = "0px auto 10px auto";
            fontSize = "25px";
            fontWeight = "bold";
            fontFamily = "黑体";
            color: "#2B5056";
        }
        this.frameTitleObject.innerHTML = "title";

        this.frameObject = document.createElement("div");
        this.frameObject.id = "divPopupFrame";
        with(this.frameObject.style){
            marginLeft = "0px";
            backgroundColor = "#FFFFFF";
            border ="4px solid #2B5056";
            zIndex=999;
            position="absolute";
            display="none";
            padding="5px";
        };

        this.frameObject.appendChild(this.frameTitleObject);
        this.frameObject.appendChild(this.frameCloseObject);
        this.frameObject.appendChild(this.displayObject);

        this.addEvent(this.frameCloseObject,"click",Function("js__popup.childs["+this.index1+"].hide()"));
        if (this.isIE) {
            this.frameCloseObject.style.backgroundPosition="0px -49px";
        }else{
            this.addEvent(this.frameCloseObject,"mouseover", Function("this.style.backgroundPosition=\"0px -49px\";"));
            this.addEvent(this.frameCloseObject,"mouseout", Function("this.style.backgroundPosition=\"0px 0px\";"));
        }

        var objParent = document.getElementById("divPopupContainer");
        if(objParent){
            objParent.appendChild(this.frameObject);
        }else{
            alert("divPopupContainer not exists.");
        }

        this.resize({});
        this.isInitialize = true;
    };

    this.resize = function(json__param){
        if(json__param.width) this.displayWidth = json__param.width;
        if(json__param.height) this.displayHeight = json__param.height;

        this.frameWidth = this.displayWidth + 40;
        this.frameHeight = this.displayHeight + 80;

        with(this.displayObject.style){
            width = this.displayWidth + "px";
            height = this.displayHeight + "px";
        }
        with(this.frameTitleObject.style){
            width = this.displayWidth + "px";
        }
    };

    this.displayFrame = function(json__param){
        var windows__size = this.getWindowSize();
        var windows__size__w = windows__size.w;
        var windows__size__h = windows__size.h;
        var windows__offset__y = this.getScrollTop();
        var size__w = (json__param.width ? json__param.width : this.displayWidth) + 40;
        var size__h = (json__param.height ? json__param.height : this.displayHeight);
        var pos__x = (windows__size__w - size__w) / 2;
        var pos__y = windows__offset__y + (windows__size__h - size__h) / 2;

        var m_strStyleSheet = "display:block; top:" + pos__y + "px; left:" + pos__x + "px;" +
            " width:" + size__w + "px; height:" + size__h + "px;";

        with(this.frameObject.style){
            marginLeft = "0px";
            top = pos__y + "px";
            left = pos__x + "px";
            width = size__w + "px";
            height = size__h + "px";
            display = "block";
        };
        //this.displayObject.innerHTML = m_strStyleSheet;
    }

    this.show = function(json__param){
        if(this.isInitialize==false) this.init();
        this.resize(json__param);
        var m_strTitle = json__param.title ? json__param.title : "";
        var m_strContent = json__param.html ? json__param.html : "";
        this.frameHeight__isTransitorily = true;
        this.frameHeight__transitorily = 0;
        this.displayObject.style.display = "none";
        this.displayObject.innerHTML = m_strContent;
        this.frameTitleObject.style.display = "none";
        this.frameTitleObject.innerHTML = m_strTitle;
        this.frameObject.style.height = this.frameHeight__transitorily + "px";
        this.frameParams = json__param;
        this.show__callback();
    };

    this.show__callback = function(json__param){
        this.frameHeight__transitorily += this.frameHeight__step;
        var isDone = false;
        if(this.frameHeight__transitorily>=this.frameHeight){
            this.frameHeight__transitorily = this.frameHeight;
            isDone = true;
        }
        this.displayFrame({height:this.frameHeight__transitorily});
        if(isDone){
            this.frameTitleObject.style.display = "block";
            this.displayObject.style.display = "block";
            this.isExpanded = true;
            this.frameHeight__isTransitorily = false;
            var json__param = this.frameParams;
            //var m_nTimeout = json__param.nTimeout ? json__param.nTimeout : 0;
            var m_nTimeout = (json__param && json__param.nTimeout) || 0;
            if(m_nTimeout) setTimeout("js__popup.childs["+this.index1+"].hide();", m_nTimeout);
        }else{
            setTimeout("js__popup.childs["+this.index1+"].show__callback();", this.frameHeight__interval)
        }
    }

    this.hide = function(){
        this.frameHeight__isTransitorily = true;
        this.displayObject.style.display = "none";
        this.frameTitleObject.style.display = "none";
        this.displayObject.innerHTML = "";
        this.isExpanded = false;
        this.hide__callback();
    }

    this.hide__callback = function(){
        this.frameHeight__transitorily -= this.frameHeight__step;
        var isDone = false;
        if(this.frameHeight__transitorily<=50){
            this.frameHeight__transitorily = 50;
            isDone = true;
        }
        this.displayFrame({height:this.frameHeight__transitorily});
        if(isDone){
            this.frameObject.style.display = "none";
            this.frameHeight__isTransitorily = false;
            this.frameParams = null;
        }else{
            setTimeout("js__popup.childs["+this.index1+"].hide__callback();", this.frameHeight__interval)
        }
    }


    //
    this.addEvent = function(l,i,I){
        if(l.attachEvent){
            l.attachEvent("on"+i,I)
        }else{
            l.addEventListener(i,I,false)
        }
    };

    this.getScrollTop = function(){
        var m_nStrollTop=0;
        var d=document;
        if(d.documentElement&&d.documentElement.scrollTop){
            m_nStrollTop=d.documentElement.scrollTop;
        }else if(d.body){
            m_nStrollTop=d.body.scrollTop;
        } else if(window.innerHeight){
            m_nStrollTop=window.pageYOffset;
        }
        if(m_nStrollTop=="undefined")m_nStrollTop=0;
        return m_nStrollTop;
    };

    this.getWindowSize = function(){
        var size=new Object();
        var d=document;
        var db=d.body;
        var de=d.documentElement;
        if(de&&de.clientHeight){
            size.w=de.clientWidth;
            size.h=de.clientHeight;
        }else if(db){
            size.w=db.clientWidth;
            size.h=db.clientHeight;
        }else if(window.innerHeight){
            size.w=window.innerWidth;
            size.h=window.innerHeight;
        }
        var strict=document.compatMode&&document.compatMode=="CSS1Compat";
        if(!strict){
            size.w=db.clientWidth;
            size.h=db.clientHeight;
        }
		size.w = 890;
        return size;
    };

}

var js__popup1 = new js__popup();
//var js__popup2 = new js__popup();


function js__alert(){
	var _this = this;
	this.divAlertWindow = document.createElement("DIV");
	this.objContainer = document.createElement("DL");
	this.objTitle = document.createElement("DT");
	this.objMessage = document.createElement("DD");

	this.divAlertWindow.style.display = "none";
	this.objContainer.appendChild(this.objTitle);
	this.objContainer.appendChild(this.objMessage);
	this.divAlertWindow.appendChild(this.objContainer);
	with(this.divAlertWindow.style){
		position = "absolute";
		left = 0;
		top = 0;
		display = "none";
		zIndex = 9998;
		backgroundColor = "#000";
		opacity = 0.9;
	}
	with(this.objContainer.style){
		position = "relative";
		display = "block";
		width = "400px";
		height = "300px";
		padding = "10px";
		backgroundColor = "#FFF";
		border = "5px solid #666";
		borderRadius = "10px";
	}
	with(this.objTitle.style){
		display = "block";
		width = "400px";
		height = "40px";
		lineHeight = "40px";
		float = "left";
		fontFamily = "微软雅黑";
		fontSize = "24px";
		color = "#333";
		borderBottom = "1px dotted #333";
	}
	with(this.objMessage.style){
		display = "block";
		float = "left";
		width = "400px";
		height = "260px";
		paddingTop = "10px";
		fontSize = "14px";
	}
	document.body.appendChild( this.divAlertWindow );
    this.getWindowSize = function(){
        var size=new Object();
        var d=document;
        var db=d.body;
        var de=d.documentElement;
        if(de&&de.clientHeight){
            size.w=de.clientWidth;
            size.h=de.clientHeight;
        }else if(db){
            size.w=db.clientWidth;
            size.h=db.clientHeight;
        }else if(window.innerHeight){
            size.w=window.innerWidth;
            size.h=window.innerHeight;
        }
        var strict=document.compatMode&&document.compatMode=="CSS1Compat";
        if(!strict){
            size.w=db.clientWidth;
            size.h=db.clientHeight;
        }
		//size.w = 890;
        return size;
    };

	this.alert = function(s){
		var _size = this.getWindowSize();
		var _w = _size.w;
		var _h = document.body.scrollHeight;
		if(_h<_size.h) _h=_size.h;

		with(this.divAlertWindow.style){
			display = "block";
			width = _w + "px";
			height = _h + "px";
		}
		console.log(_h);
		with(this.objContainer.style){
			left = (890-430)/2 + "px";
			top = (document.body.scrollTop + (_size.h-330)/2) + "px";
		}
		this.objTitle.innerHTML = "提示信息";
		this.objMessage.innerHTML = s;
	}

	this.divAlertWindow.onclick = function(){
		this.style.display = "none";
	}
}

var js__alert1 = new js__alert();
//js__alert1.alert('test');

// localStroage
function js__stroage(){
	var _this = this;
	this.isReady = window.localStorage ? true : false;
	this._stroage = this.isReady ? window.localStorage : null;
	this.getJSON = function(key){
		if(this._stroage){
			var obj = this._stroage.getItem(key);
			if(obj){
				obj = JSON.parse(obj);
				return obj;
			}
		}
		return {};
	}
	this.setJSON = function(key, json){
		if(this._stroage){
			this._stroage.setItem(key, JSON.stringify(json))
		}
	}
}

var stroage1 = new js__stroage()

// common functions

function js__lib(fn){
    var js__name = "js__" + fn;
    var obj = document.getElementById(js__name);
    if(obj){
        js__lib__launch(fn);
    }else{
        obj = document.createElement("script");
        obj.id = js__name;
        document.getElementById("divHeader").appendChild(obj);
        var isIE = navigator.appVersion.indexOf("MSIE")!=-1?true:false;
        //alert("ie6=" + isIE);
        if(!isIE) obj.onload = function(){ js__lib__launch(fn); }
        obj.src = "js/lib/" + fn + ".js" + "?" + (new Date().getTime());
        if(isIE) js__lib__launch(fn);
    }
}

function js__lib__ex(url, fn){
    var js__name = "js__" + fn;
    var obj = document.getElementById(js__name);
    if(obj){
        js__lib__launch(fn);
    }else{
        obj = document.createElement("script");
        obj.id = js__name;
        document.getElementById("divHeader").appendChild(obj);
        var isIE = navigator.appVersion.indexOf("MSIE")!=-1?true:false;
        //alert("ie6=" + isIE);
        if(!isIE) obj.onload = function(){ js__lib__launch(fn); }
        obj.src = "js/lib/" + fn + ".js" + "?" + (new Date().getTime());
        if(isIE) js__lib__launch(fn);
    }
}

function js__lib__launch(fn){
    setTimeout("try{" + fn + "();}catch(ex){alert(\"" + fn + ": \"+ex.description);}", 100);
}





///////////////////////////////////////////////////////////////////
// for ajax start
///////////////////////////////////////////////////////////////////
function GetXmlHttpObject(){
	var xmlHttp=null;
	try{// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}catch (e){// Internet Explorer
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function PA_js_ajaxGetContent(url, param, callback_function, obj){
	var XHR;
	var date=new Date();
	var m_strUrl = url;
	var m_strParameter="timeStamp="+date.getTime()+"&ajax=1&" + param; //"act=getCheckCode";

	try{
		XHR = GetXmlHttpObject();
		if (XHR==null){
			alert ("您的浏览器不支持AJAX！");
			return;
		}
		XHR.open("POST",m_strUrl);
		XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		XHR.onreadystatechange=function(){
			if(XHR.readyState==4)
			{
				if(callback_function) {
					if(XHR.status==200) {
						//alert(XHR.responseText);
						//objDisplay.innerHTML = XHR.responseText;
						callback_function(true, 200, XHR.responseText, obj);
					} else {
						//alert("1:" + XHR.status);
						callback_function(false, XHR.status, '', obj);
					}
				}
			}
		}
		XHR.send(m_strParameter);

	}catch (e){
		alert(e.toString());
	}
}
///////////////////////////////////////////////////////////////////
// for ajax:end
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// for common:start
///////////////////////////////////////////////////////////////////
function PA_js__page__switchLoginDisplay(isLogin){
    var header2_search_form = document.getElementById("header2_search_form");
    if(header2_search_form){
        var list1 = header2_search_form.getElementsByTagName("li");
        if(isLogin){
            list1[0].innerHTML = "<span><a href=\"#\" onclick=\"js__lib(&quot;account_modify&quot;); return false;\">修改</a></span>";
            list1[1].innerHTML = "<span><a href=\"#\" onclick=\"js__lib(&quot;account_logout&quot;); return false;\">退出</a></span>";
        }else{
            list1[0].innerHTML = "<span><a href=\"#\" onclick=\"js__lib(&quot;account_signup&quot;); return false;\">登录</a></span>";
            list1[1].innerHTML = "<span><a href=\"#\" onclick=\"js__lib(&quot;account_signin&quot;); return false;\">注册</a></span>";
        }
    }
    var divCommentAccount = document.getElementById("divCommentAccount");
    if(divCommentAccount){
        PA_js__page__archive__switchLoginDisplay(isLogin, divCommentAccount);
    }

    var m_objDisplay = document.getElementById("section2_login");
    if(m_objDisplay){
        PA_js__page__index__switchLoginDisplay(isLogin, m_objDisplay);
    }
}




function addEvent(l,i,I){
	if(l.attachEvent){
		l.attachEvent("on"+i,I)
	}else{
		l.addEventListener(i,I,false)
	}
};

function _alert(s){
	js__alert1.alert(s);
};
