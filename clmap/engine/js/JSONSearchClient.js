/*******************************************
********************************************
Remote API Map Search json-javascript client
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

	/*
		Поиск объектов через базы GEOB и контента 2 
		для JS клиента
		
		public class JSONSearch
		{
			public string URL;
			public string directURL; // for XDomainRequest (non Proxy) browsers
			
			public Search(string mapName, string what, int where, string wheretype, int outfrom, int outcount, int byUser, CallReturnFunction call_return_funct, object call_return_obj)
			public Type CallReturnFunction = function(object call_return_object, obj returned_object_from_server);
		}
		
		SEARCH
		Параметры:
			string  mapn  - Имя карты    
			string  what  - Текст для поиска    
			integer  where  - Типы поиска по бит маске: 1 бит (0x01) - адрес, 2 бит (0x02) - объекты, 3 бит (0x04) - контент (4 бит (0x08) - запрашивать зум (откл. по умолч.); 5 бит (0x10) - выводить дома по улице (исп. вместе с 1 битом, откл. по умолч.); 7 бит (0x40) - выводить полный список объектов карты (исп. вместе с 2 битом, откл. по умолч.; перекрывает 9 бит); 8 бит (0x80) - выводить полный список объектов контентной базы (исп. вместе с 3 битом, откл. по умолч.; перекрывает 9 бит); 9 бит (0x100) - выводить первые outcount элементов от outfrom (исп. вместе с 2 и/или 3 битами)    
			string  wheretype  - В категории какого типа искать (bit 1, 2 или 3); пусто - во всех; при bit = 1 вывод домов по улице: orid; при bit = 2 вывод объектов карты: typecode; при bit = 3 вывод контента: typecode    
			integer  outfrom  - Выводить объекты с для bit 2 и 3(нумерация с 1), исп. если задан wheretype;    
			integer  outcount  - Количество выводимых объектов для bit 2 и 3(по умолчанию 20); исп. если задан wheretype    
			integer  byUser  - Использовать легенду для пользователя # (-1 не использовать) 
			
		Примеры:
			Пример для адреса: wm.Search.GEOB2 'MSKMO', 'Велозаводская 4', 1, '', 0, 0, -1
			- С выводом домов: wm.Search.GEOB2 'MSKMO', 'Велозаводская 4', 17, '', 0, 0, -1
			Дома по улице: wm.Search.GEOB2 'MSKMO', 'Велозаводская', 1, 132871, 0, 0, -1

		Пример для GEOB: wm.Search.GEOB2 'MSKMO', 'Cлобода', 2, '', 0, 0, -1
			- C выводом объектов: wm.Search.GEOB2 'MSKMO', 'Cлобода', 66, '', 0, 0, -1
			- C выводом первых 10: wm.Search.GEOB2 'MSKMO', 'Cлобода', 258, '', 1, 10, -1
			Список в категории GEOB: wm.Search.GEOB2 'MSKMO', 'Cлобода', 2, 5, 1, 20, -1

		Пример для Kontenta: wm.Search.GEOB2 'MSKMO', 'Бар', 4, '', 0, 0, -1
			- C выводом объектов: wm.Search.GEOB2 'MSKMO', 'Бар', 132, '', 0, 0, -1
			- C выводом первых 10: wm.Search.GEOB2 'MSKMO', 'Бар', 260, '', 1, 10, -1
			Список в категории Kontenta: wm.Search.GEOB2 'MSKMO', 'Бар', 4, 31, 1, 100, -1

			Поиск везде: wm.Search.GEOB2 'MSKMO', 'Повар', 7, '', 0, 0, -1
			
		Возвращаемый объект
		{
			mask: 'mask',
			map: 'Msk_Mail',
			where: 7,
			popup:
			[
				{type:'type',count:'items',typecode:'typecode',items:
				[
					{no:'no',name:'name',url:'url',cx:'cx',cy:'cy',zoom:'zoom'}
				]}
			],
			addresses:
			[
				{type:'type',count:'items',typecode:'typecode',items:
				[			
					{idil:'idil',layer:'layer',name:'name',number:'number',parent:'parent',street:'street',count:'houses',cx:'cx',cy:'cy',zoom:'zoom',houses:
					[
						{idil:'idil',layer:'layer',number:'number',cx:'cx',cy:'cy',zoom:'zoom'}
					]}
				]}
			],
			not_addresses:
			[
				{type:'type',count:'items',typecode:'typecode',items:
				[
					{no:'no',idil:'idil',layer:'layer',name:'name',tridname:'tridname',parent:'parent',cx:'cx',cy:'cy',zoom:'zoom',trid:'trid'}
				]}
			],
			// bit 3
			kontent:
			[
				{type:'type',count:'items',typecode:'typecode',items:
				[
					{no:'no',idil:'idil',layer:'layer',name:'name',address:'address',cx:'cx',cy:'cy',zoom:'zoom'}
				]}
			]
		}
	*/
	
	function JSONSearch() { this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; }

	// PUBLIC
	JSONSearch.prototype.URL = 'QRS/search.aspx';
	JSONSearch.prototype.directURL = 'QRS/search.aspx'; // For Not-Proxy Browsers
	
	// EXAMPLE // Call Return Function = function(call_return_object, returned_object_from_server) { alert(call_return_object+': '+returned_object_from_server); };
	JSONSearch.prototype.CallReturnFunction = function(call_return_object, returned_object_from_server) { };

	// PUBLIC
	JSONSearch.prototype.Search = function (mapName /*string*/, what /*string*/, where  /*int*/, wheretype  /*string */, outfrom /*int*/, outcount /*int*/, byUser /*int*/, call_return_funct, call_return_obj)
	{
		var _what = ReplaceString(ReplaceString(what,'=','%3D'),'&','%26');
		var _byUser = (byUser || _byUser == 0) ? byUser : -1;
		var msg = 'what='+_what+'&where='+where+'&wheretype='+wheretype;
		var call_return = {f:call_return_funct,o:call_return_obj,ro:{mapName:mapName,what:what,where:where,wheretype:wheretype,outfrom:outfrom,outcount:outcount,byUser:byUser,post:msg,timeBegin:new Date()}};
		var _url = (typeof XDomainRequest!='undefined') ? this.directURL : this.URL;
		makeRPCJSON(this.URL,msg,this.Return, call_return,{'Search-Type':'s','Search-User':'js','Search-Map':mapName,'Search-OutFrom':outfrom,'Search-OutCount':outcount,'Search-ByUser':byUser});
	}

	// PRIVATE
	JSONSearch.prototype.Return = function(call_return, status, receivedText, httpReq)
	{
		call_return.ro.timeEnd = new Date();
		call_return.ro.timeExecute = call_return.ro.timeEnd.getTime() - call_return.ro.timeBegin.getTime() + ' ms';
		var result = {};				
		try { result = (new Function('','return '+receivedText))(); } catch (e) { result.Error = 'Cannot parse response text';};
		
		result.serverstatus = status;
		result.servertext = receivedText;
		result.serverresponse = httpReq;
		result.serverrequest = call_return.ro;
		// result.serverheaders = httpReq.getAllResponseHeaders();
			
		if(!result.Error) result.Error = false;
		if(!result.popup) result.popup = [];
		if(!result.addresses) result.addresses = [];
		if(!result.not_addresses) result.not_addresses = [];
		if(!result.kontent) result.kontent = [];
		
		call_return.f(call_return.o, result);
	}

	
	/*
		Geocoding объектов через базы GEOB и контента 2 
		для JS клиента
		
		public class JSONGeocoder
		{
			public string URL;
			public string directURL; // for XDomainRequest (non Proxy) browsers
			
			public Search(x, y , int, ext, call_return_funct, call_return_obj)
			public Type CallReturnFunction = function(object call_return_object, object returned_object_from_server);
		}
		
		SEARCH
		Параметры:
			x ,y  - метровые координаты
			int - поиск в GEOB
			ext - поиск в контентной базе
			call_return_funct - функция, вызываемая при ответе
			call_return_obj - объект, передаваемый в функци. при ответе
			maxCount - число объектов в списке
			
		Возвращаемый объект
		{
			x: 0,
			y: 0,
			items:
			[
				{no:1,idil:0,layer:'',name:'',number:'',parent:'Россия',street:-1,x:0,y:0,dx:0,dy:0,eatrid:18,eatridname:'улицы в населенном пункте',tridname:'улица'},
				{no:2,idil:0,layer:'external',name:'',number:'',parent:'Велозаводская',street:-1,x:0,y:0,dx:0,dy:0,eatrid:-1,eatridname:'',tridname:'Офис'}
			]
		}
	*/
	
	
	function JSONGeocoder() { this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; }
	
	// PUBLIC
	JSONGeocoder.prototype.URL = 'QRS/search.aspx';
	JSONGeocoder.prototype.directURL = 'QRS/search.aspx'; // For Not-Proxy Browsers
	
	// EXAMPLE // Call Return Function = function(call_return_object, returned_object_from_server) { alert(call_return_object+': '+returned_object_from_server); };
	JSONGeocoder.prototype.CallReturnFunction = function(call_return_object, returned_object_from_server) { };

	// PUBLIC
	JSONGeocoder.prototype.Search = function (x /*double*/, y /*double*/, _int /*bool*/, _ext /*bool*/, call_return_funct, call_return_obj, maxCount)
	{
		var _top = maxCount ? maxCount : 10;
		var _x = Math.floor(parseFloat(x));
		var _y = Math.floor(parseFloat(y));
		var msg = 'x='+_x+'&y='+_y;
		var call_return = {f:call_return_funct,o:call_return_obj,ro:{post:msg,timeBegin:new Date()}};
		var _url = (typeof XDomainRequest!='undefined') ? this.directURL : this.URL;
		var _url = this.URL;
		makeRPCJSON(_url,msg,this.Return,call_return,{'Search-Type':'g','Search-User':'js','Search-Top':_top,'Search-Ext':(_ext ? '1' : '0'),'Search-Int':(_int ? '1' : '0')});
	}

	// PRIVATE
	JSONGeocoder.prototype.Return = function(call_return, status, receivedText, httpReq)
	{
		call_return.ro.timeEnd = new Date();
		call_return.ro.timeExecute = call_return.ro.timeEnd.getTime() - call_return.ro.timeBegin.getTime() + ' ms';
		var result = {};				
		try { result = (new Function('','return '+receivedText))(); } catch (e) { result.Error = 'Cannot parse response text';};
		if(receivedText == 'XYError')  result.Error = 'XYError';
		
		result.serverstatus = status;
		result.servertext = receivedText;
		result.serverresponse = httpReq;
		result.serverrequest = call_return.ro;
		// result.serverheaders = httpReq.getAllResponseHeaders();
			
		if(!result.Error) result.Error = false;
		if(!result.items) result.items = [];
		
		call_return.f(call_return.o, result);
	}

	
function makeRPCJSON(url,data,retFunc,objFor_retFunc_1stParam,_params)
{
	try  { netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"); }  catch (e) { };
    var httpReq = false; if(typeof XDomainRequest!='undefined') httpReq = new XDomainRequest();
    { if (typeof XMLHttpRequest!='undefined') httpReq = new XMLHttpRequest(); else { try {
	httpReq = new ActiveXObject("Msxml2.XMLHTTP.4.0"); } catch (e) { try { httpReq = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (ee) { try { httpReq = new ActiveXObject("Microsoft.XMLHTTP"); } catch (eee) { httpReq = false; }}}}};
	httpReq.onreadystatechange = function() { if(httpReq.readyState == 4) 
	retFunc(objFor_retFunc_1stParam,httpReq.status, httpReq.responseText, httpReq); };	
	httpReq.open("POST", url, true); httpReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	if((navigator.userAgent.indexOf('Chrome') < 0) && (navigator.userAgent.indexOf('Safari') < 0)) 
		httpReq.setRequestHeader('Content-Length', data.length); 
	for(var pn in _params) httpReq.setRequestHeader(pn, _params[pn]); 
	httpReq.send(data);
}
	
/***
****
**** GetResponseDoc
****
***/

// !!! You don't need any text after this line to use in your web pages !!! //

// CROSS-DOCUMENT MESSAGING
// http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
// http://developer.mozilla.org/en/docs/DOM:window.postMessage

// Example HTML: <a href="#" onclick="makeRPCSend('http://192.168.0.211/','',funct makeRPCSendOK(obj,status,text){alert(text);},'wolf')">click me</a>
// retFunc = Function(objFor_retFunc_1stParam, status, receivedText) {};
function makeRPCSend(url,postdata,retFunc,objFor_retFunc_1stParam,ctype)
{
	try 
	{
		netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserAccess");
	} 
	catch (e) 
	{
		//alert("Permission UniversalBrowserRead denied.");
	};
	
    var httpReq = false;
	if(typeof XDomainRequest!='undefined') httpReq = new XDomainRequest(); // IE8 Beta
    {
		if (typeof XMLHttpRequest!='undefined') httpReq = new XMLHttpRequest();
		else {
			try {
				httpReq = new ActiveXObject("Msxml2.XMLHTTP.4.0");
			} catch (e) {
				try {
					httpReq = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (ee) {
					try {
						httpReq = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (eee) {
						httpReq = false;
					}
				}
			}
		}
	};

	httpReq.onreadystatechange = function()
	{
	    // if(httpReq.readyState == 1) retFunc("Loading");
		// if(httpReq.readyState == 2) retFunc("Loaded");
		// if(httpReq.readyState == 3) retFunc("Interactive");
		// if(httpReq.readyState == 3) retFunc("Complete");
		if(httpReq.readyState == 4) retFunc(objFor_retFunc_1stParam,httpReq.status, httpReq.responseText, httpReq);
	};
	
	httpReq.open("POST", url, true);
	var _ctype = 'text/xml';
	if(ctype) _ctype = ctype;
	httpReq.setRequestHeader('Content-Type', _ctype);
	//httpReq.setRequestHeader("charset", "utf-8");
	if((navigator.userAgent.indexOf('Chrome') < 0) && (navigator.userAgent.indexOf('Safari') < 0))
	  httpReq.setRequestHeader('Content-Length', postdata.length);
	//httpReq.setRequestHeader("Cookie","a=b");
	//httpReq.abort() отменяет текущий запрос 
	//httpReq.getAllResponseHeaders() возвращает полный список HTTP-заголовков в виде строки 
	//httpReq.getResponseHeader(headerName) возвращает значение указанного заголовка 
	
	//httpReq.open(method, URL, async, userName, password) определяет метод, URL и другие опциональные параметры запроса;
		//httpReq.параметр async определяет, происходит ли работа в асинхронном режиме 
	
	//httpReq.send(content) отправляет запрос на сервер 
	//httpReq.setRequestHeader(label, value) добавляет HTTP-заголовок к запросу 
	//httpReq.overrideMimeType(mimeType) 
	
	// onreadystatechange Sets or retrieves the event handler for asynchronous requests. 
	// readyState Retrieves the current state of the request operation. 
	// responseBody Retrieves the response body as an array of unsigned bytes. 
	// responseText Retrieves the response body as a string. 
	// responseXML Retrieves the response body as an XML Document Object Model (DOM) object.  
	// status Retrieves the HTTP status code of the request. 
	// statusText Retrieves the friendly HTTP status of the request. 
	httpReq.send(postdata);
}


// Post text & get response
// var myReq;
function makeRPCCall(url,xmldata_ctype){

	try 
	{
		netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserAccess");
	} 
	catch (e) 
	{
		//alert("Permission UniversalBrowserRead denied.");
	};
	
    var httpReq = false;
    if (typeof XMLHttpRequest!='undefined') {
        httpReq = new XMLHttpRequest();
    } else {
        try {
            httpReq = new ActiveXObject("Msxml2.XMLHTTP.4.0");
        } catch (e) {
            try {
                httpReq = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (ee) {
                try {
                    httpReq = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (eee) {
                    httpReq = false;
                }
            }
        }
    }
	//var myReq = httpReq;
	window.status = 'Загрузка данных...';
	//httpReq.onreadystatechange = new Function('','return true;');
	
    httpReq.open("POST", url, false);
	var _ctype = 'text/xml';
	if(ctype) _ctype = ctype;
	httpReq.setRequestHeader('Content-Type', _ctype);
	//httpReq.setRequestHeader("Cookie","a=b");
	//httpReq.abort() отменяет текущий запрос 
	//httpReq.getAllResponseHeaders() возвращает полный список HTTP-заголовков в виде строки 
	//httpReq.getResponseHeader(headerName) возвращает значение указанного заголовка 
	//httpReq.open(method, URL, async, userName, password) определяет метод, URL и другие опциональные параметры запроса;
	//httpReq.параметр async определяет, происходит ли работа в асинхронном режиме 
	//httpReq.send(content) отправляет запрос на сервер 
	//httpReq.setRequestHeader(label, value) добавляет HTTP-заголовок к запросу 
	//httpReq.overrideMimeType(mimeType) 
	//
	// onreadystatechange Sets or retrieves the event handler for asynchronous requests. 
	// readyState Retrieves the current state of the request operation. 
	// responseBody Retrieves the response body as an array of unsigned bytes. 
	// responseText Retrieves the response body as a string. 
	// responseXML Retrieves the response body as an XML Document Object Model (DOM) object.  
	// status Retrieves the HTTP status code of the request. 
	// statusText Retrieves the friendly HTTP status of the request. 
	httpReq.send(xmldata);	
	if (httpReq.status == 200) {return httpReq.responseText;} else
	{
		if (httpReq.status == 500) alert("Server Exception: "+httpReq.status);
		return httpReq.status;
	};
  }
  
function leadingZero(n){
  if (n.length==1) n = "0" + n;
  return n;
}

function ReplaceQuotes(sString) 
{ 
	if (sString.indexOf("°") >= 0) return ReplaceString(ReplaceString(sString,'"','&quot;'),"'",'&#146;');
	return ReplaceString(ReplaceString(sString,'"','&quot;'),"'",'&rsquo;');
} 

function ReplaceString(sString, sReplaceThis, sWithThis) 
{ 
	if (sReplaceThis != "" && sReplaceThis != sWithThis)
	{  
		var counter = 0;  
		var start = 0;  
		var before = "";  
		var after = "";   
		while (counter<sString.length) 
		{    
			start = sString.indexOf(sReplaceThis, counter);    
			if (start == -1)
			{
				break;
			}
			else 
			{
				before = sString.substr(0, start);     
				after = sString.substr(start + sReplaceThis.length, sString.length);     
				sString = before + sWithThis + after;     
				counter = before.length + sWithThis.length;    
			} ;
		}  
	} 
	return sString;
} 
