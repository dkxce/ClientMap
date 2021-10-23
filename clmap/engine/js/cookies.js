/*******************************************
********************************************
		    * Milok Zbrozek *
	milokz [i hate spammers] gmail.com
********************************************
*******************************************/

// doc exists

<!--
	/* INTERFACE
	
		public class ClientCookies
		{
			public set(tClientCookie);
			public setNamed(name,value,expires,path, domain,secure);
			public getValue(tClientCookie);
			public getNamedValue(name);
			public del(tClientCookie);
			public delNamed(name, path, domain);
		}
		
		public class ClientCookie(name,value)
		{
			// name - имя cookie
			// value - значение cookie
			// [expires] - дата окончания действия cookie (по умолчанию - конец текущей  //  сессии)
			// [path] - путь, где cookie верны (по умолчанию - путь к текущему документу)
			// [domain] - домен, где cookie верны (по умолчанию - домен вызываемого документа)
			// [secure] - бинарная переменная, показывающая, что cookie должны передаваться через защищённое соединение

			public DaysTimeout(val);
			public MonthTimeout(val);
			
			public set();
			public get();
			public del();
		}
	*/
	
	/* EXAMPLE
		var myCookie = new ClientCookie('dkxce','lol');
		alert(myCookie.name+": "+myCookie.value);
		myCookie.set();
		var myCookie1 = new ClientCookie('dkxce');
		myCookie1.get();
		alert(myCookie1.name+": "+myCookie1.value);
		myCookie1.del();
		myCookie1.get();
		alert(myCookie1.name+": "+myCookie1.value);
	*/
	
	// * по умолчанию аргументу присвоено значение null
	// * нулевое значение не требуется присваивать пропущенным переменным
	
	function ClientCookies()
	{
		this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
		return this;
	}
	ClientCookies.prototype = {};
	ClientCookies.prototype.set = function(tClientCookie)
	{
		var curCookie = tClientCookie.name + "=" + escape(tClientCookie.value) +
			((tClientCookie.expires) ? "; expires=" + tClientCookie.expires.toGMTString() : "") +
			((tClientCookie.path) ? "; path=" + tClientCookie.path : "") +
			((tClientCookie.domain) ? "; domain=" + tClientCookie.domain : "") +
			((tClientCookie.secure) ? "; secure" : "");
			document.cookie = curCookie;
	}
	ClientCookies.prototype.setNamed = function(name,value,expires,path, domain,secure)
	{
		var curCookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires.toGMTString() : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
			document.cookie = curCookie;
	}
	ClientCookies.prototype.getValue = function(tClientCookie)
	{
		var dc = document.cookie;
		var prefix = tClientCookie.name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) 
		{
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		} 
		else begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) end = dc.length;
		return unescape(dc.substring(begin + prefix.length, end));
	}
	ClientCookies.prototype.getNamedValue = function(name)
	{
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) 
		{
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		} 
		else begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) end = dc.length;
		return unescape(dc.substring(begin + prefix.length, end));
	}
	ClientCookies.prototype.del = function(tClientCookie)
	{
		if (this.getValue(tClientCookie)) 
		{
			document.cookie = tClientCookie.name + "=" + 
			((tClientCookie.path) ? "; path=" + tClientCookie.path : "") +
			((tClientCookie.domain) ? "; domain=" + tClientCookie.domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		};
	}
	ClientCookies.prototype.delNamed = function(name, path, domain) 
	{
		if (this.getNamedValue(name)) 
		{
			document.cookie = name + "=" + 
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		};
	}

	function ClientCookie(name, value)
	{
		this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
		this.name = name;
		this.value = (value ? value : false);
		this.expires = false;
		this.path = false;
		this.domain = false;
		this.secure = false;
		return this;
	}
	ClientCookie.prototype = {};
	ClientCookie.prototype.set = function()
	{
		var _ClientCookies = new ClientCookies();
		_ClientCookies.set(this);
	}
	ClientCookie.prototype.get = function()
	{
		var _ClientCookies = new ClientCookies();
		this.value = _ClientCookies.getValue(this);
	}
	ClientCookie.prototype.DaysTimeout = function(val)
	{
		 this.expires = new Date();
         this.expires.setDate(val + this.expires.getDate());
	}
	ClientCookie.prototype.MonthTimeout = function(val)
	{
		 this.expires = new Date();
         this.expires.setDate(val*30 + this.expires.getDate());
	}	
	ClientCookie.prototype.del = function()
	{
		var _ClientCookies = new ClientCookies();
		_ClientCookies.del(this);
	}

	/*	
	var myCookie = new ClientCookie('dkxce','lol');
	alert(myCookie.name+": "+myCookie.value);
	myCookie.set();
	var myCookie1 = new ClientCookie('dkxce');
	myCookie1.get();
	alert(myCookie1.name+": "+myCookie1.value);
	myCookie1.del();
	myCookie1.get();
	alert(myCookie1.name+": "+myCookie1.value);
	*/

-->