/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

	// PUBLIC
	function TErrorCache()
	{
		this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
		
		this.Errors = [];
		this.dev = document.createElement('div');
		this.dev.style.position = 'absolute';
		this.dev.style.left = '0px';
		this.dev.style.top = '0px';
		this.dev.style.width = '4px';
		this.dev.style.height = '4px';
		this.dev.style.color = '#FF0000';
		this.dev.style.fontHeight = 'bold';
		//	this.dev.style.border = 'solid 1px red';
		//	this.dev.style.backgroundColor = 'red';
		this.dev.style.fontSize = '9px';
		this.dev.innerHTML = '&nbsp;&xi;';
		this.dev.style.cursor = 'default';
		this.dev.style.opacity = '0.5';
		this.dev.style.filter = 'alpha(opacity=50)';
		this.dev.style.title = 'Error Cache';
		this.dev.onclick = function()
		{
			_ErrorCache.ToDiv();
		};		
		setTimeout('if(document.body) document.body.appendChild(_ErrorCache.dev)',3500);
		this.tmpd = false;
	}
		
	// PUBLIC
	TErrorCache.prototype.Add = function(message,init_obj)
	{
		this.Errors.push( {message:message,sender:init_obj,time:new Date()} );
		if(this.tmpd) this.ToDivTxt();//
	}
	
	// PUBLIC
	TErrorCache.prototype.ToString = function()
	{
		var txt = '';
		for( var i=this.Errors.length-1;i>=0;i--)
		{
			txt += '<div style="background:#550000;margin:2px;">&nbsp;ERR <b>'+i+'</b></div>';
			txt += '<div style="background:#550000;margin:2px;">&nbsp;'+this.Errors[i].time+'</div>';
			txt += '<div>'+this.Errors[i].message;
			if(this.Errors[i].sender)
			{
				txt += '<ul>';
				for(pn in this.Errors[i].sender)
				{
					txt += '<li>';
					txt += pn + ': <b>' + this.Errors[i].sender[pn] + '</b>';
					txt += '</li>';
				};
				txt += '</ul>';
			};
			txt += '</div>';
		};
		return txt;
	}
	
	// PUBLIC
	TErrorCache.prototype.ToDiv = function()
	{
		if(this.tmpd)
		{
			document.body.removeChild(_ErrorCache.tmpd);
			_ErrorCache.tmpd=false;
			return;
		};
		var tmpd = document.createElement('div');
		tmpd.style.position = 'absolute';
		tmpd.style.left = '50%';
		tmpd.style.top = '50px';
		tmpd.style.margin = '0 0 0 -400px';
		tmpd.style.width = '800px';
		tmpd.style.height = '600px';
		tmpd.style.zIndex = '1024';		
		document.body.appendChild(tmpd);		
		this.tmpd = tmpd;		
		this.ToDivTxt();
	}
	
	// PRIVATE
	TErrorCache.prototype.ToDivTxt = function()
	{
		this.tmpd.innerHTML = '<div style="width:100%;height:100%;border:solid 2px maroon;background:maroon;color:white;"><div style="border-bottom:solid 1px maroon;font-weight:bold;width:100%;height:22px;background:red;">&nbsp;&nbsp;Error Cache</div><div style="width:100%;height:14px;font-size:12px;position:absolute;left:0px;top:3px;color:maroon;" align="right"><span style="cursor:pointer;" onclick="document.body.removeChild(_ErrorCache.tmpd);_ErrorCache.tmpd=false;" title="Закрыть окно">закрыть</span>&nbsp;</div><div style="width:790px;height:568px;margin:5px;overflow:auto;">' + this.ToString() + '<br/></div></div>';
	};
	
	// Example
	/*
		_ErrorCache.Add(e, {file: 'vector_utils.js', 'class': 'RotatedImage', object: this, line:76} );
	*/
	
	_ErrorCache = new TErrorCache();	
	window.onerror = function(e)
	{
		_ErrorCache.Add(e, {'class': 'Window', object: window} );
	}