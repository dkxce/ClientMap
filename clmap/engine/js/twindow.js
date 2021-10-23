/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

		/*
			use canvas.js;
			
			class TWindow
			{
					// Инициализация
				void init(int x, int y)
				void init(int x, int y, int wi, int he)
					// Установка DIV'a
				void setDiv(object div)
				
					// Установка заголовка
				void SetCaption(string caption)
					// Получение заголовка
				string GetCaption()
				
					// Перемещение
				void Move(int x, int y)
					// Получение текущего положения
				{x: int, y: int}  GetPos()
					// Установка зума
				void setZoom(int zoom)
					// Установка скроллирования окна
				void SetScrollable(bool enabled)
					
					// Закрываем окно
				void Kill()
					// Получаем функцию для закрытия окна
				function GetKillFunction()
				
					// возвращает DIV рабочего поля окна
				object DIV;
					// возвращает див контейнера всех объектов формы (можно исп. для ContainerDIV.style.zIndex)
				object ContainerDIV;
			}
		*/
		
		try { if(!$) $ = false } catch(e) {$ = false;};
		
		function TWindow()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.iface = 'TWindow'; 
			this.type = 'TWindow'; 
			this.caption = 'Window';
			this.zoom = 1;
			this.zIndex = 1;
			
			this.canvas_obj = null;
			this.ctx = null;
			this.div = null;
			this.clmap = null;
			
			this.scroll = false;
			this.ie = (navigator.userAgent.indexOf("MSIE") > 0);
			
			this.name = 'TWindow_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			this.killed = false;
		}
		
		// инициализация
		TWindow.prototype.init = function(x,y,wi,he)
		{
			this.name = 'TWindow_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			this.xtrue = x;
			this.x = this.xtrue / this.zoom;
			this.ytrue = y;
			this.y = this.ytrue / this.zoom;
			this.wi = wi ? wi : 600;
			this.he = he ? he : 400;
		}
		
		// overflow текста
		TWindow.prototype.SetScrollable = function(enabled)
		{
			this.scroll = enabled;
			if(this.info) this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
		};
		
		// div текста
		TWindow.prototype.ContainerDIV = {};
		
		// двинуть
		TWindow.prototype.Move = function(x,y)
		{
			this.xtrue = x;
			this.x = this.xtrue / this.zoom;
			this.ytrue = y;
			this.y = this.ytrue / this.zoom;
			
			this.div.style.left = this.x + 'px';
			this.div.style.top = this.y + 'px';
		}
		
		// отзумить
		TWindow.prototype.SetZoom = function(zoom)
		{
			this.zoom = zoom;
			this.x = this.xtrue / this.zoom;
			this.y = this.ytrue / this.zoom;
			
			this.div.style.left = this.x + 'px';
			this.div.style.top = this.y + 'px';
		}
		
		// получить координаты
		TWindow.prototype.GetPos = function()
		{
			return {x:parseInt(this.div.style.left)*this.zoom,y:parseInt(this.div.style.top)*this.zoom};
		}
		
		// инициализация дива
		TWindow.prototype.setDiv = function(div)
		{
			this.parent = div;
			if(this.parent) this.Draw();
		}
		
		// убить
		TWindow.prototype.Kill = function()
		{
			if(this.onclose) this.onclose(this);			
			//document.getElementById(this.parent.id+'\').removeChild(document.getElementById(\'div_'+this.canvas_obj.id+'\'));
			this.parent.removeChild(this.div);
			this.killed = true;
		}
		
		//onclose
		TWindow.prototype.onclose = function(obj)
		{
			
		}
		
		// получить функцию убийства
		TWindow.prototype.GetKillFunction = function()
		{
			return new Function('','document.getElementById(\''+this.id+'\').owner.Kill();');
		}
		
		// установка caption'a
		TWindow.prototype.SetCaption = function(caption)
		{
			this.caption = caption;
			if(this.captiondiv) this.captiondiv.innerHTML = '&nbsp;'+this.caption;
		}
		
		// получение caption'a
		TWindow.prototype.GetCaption = function()
		{
			return this.caption;
		}
		
		// div текста
		TWindow.prototype.DIV = {};
		
		
		// private
		TWindow.prototype.fillStyle = "#FFFFFF"
		
		// private
		TWindow.prototype.Draw = function()
		{
			this.canvas_obj = new TCanvas();
			this.canvas_obj.initSize(this.x,this.y,this.wi,this.he);
			this.canvas_obj.initDiv(this.parent);
			
			//SET OWNER FOR CANVAS
			this.canvas_obj.div.owner = this;
			this.canvas_obj.canvas.owner = this;
					
			this.div = this.canvas_obj.div;
			this.DIV = this.div;
			this.ContainerDIV = this.div;
			this.div.style.zIndex = this.zIndex;
			this.div.style.display = 'none';
			this.ctx = this.canvas_obj.CTX;

			
			this.ctx.lineWidth = 2;
			this.ctx.fillStyle = this.fillStyle;
			this.ctx.fillRect(2,2,this.wi-4,this.he-4);
			this.ctx.strokeStyle = "rgb(0,0,0)";
			
    		this.ctx.beginPath();
			
			this.ctx.moveTo(2,7);
			this.ctx.quadraticCurveTo(2,2,7,2);
    		this.ctx.lineTo(this.wi-7,2);
			this.ctx.quadraticCurveTo(this.wi-2,2,this.wi-2,7);
			
			this.ctx.lineTo(this.wi-2,this.he-12);
			this.ctx.quadraticCurveTo(this.wi-2,this.he-2,this.wi-12,this.he-2);
			this.ctx.lineTo(12,this.he-2);
			this.ctx.quadraticCurveTo(2,this.he-2,2,this.he-12);
			this.ctx.lineTo(2,12)
			this.ctx.closePath();
			this.ctx.stroke();
			
			this.ctx.beginPath();
			this.ctx.strokeStyle = "rgb(25,25,25)";
			this.ctx.lineWidth = 1;
			this.ctx.moveTo(2,22)
			this.ctx.lineTo(this.wi-2,22)
    		this.ctx.closePath();
			this.ctx.stroke();
			//tmp.CTX.fill();
			
			
			// CAPTION
			this.captiondiv = document.createElement('div');
			this.captiondiv.id = 'caption_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.captiondiv.style.position = 'absolute';
			this.captiondiv.style.left = '5px';
			this.captiondiv.style.top = '3px';
			this.captiondiv.style.width = this.wi - 25 + 'px';
			this.captiondiv.style.height = 18 + 'px';
			this.captiondiv.style.zIndex = 3;
			this.captiondiv.style.fontWeight = 'bold';
			this.captiondiv.style.fontSize = '15px';
			this.captiondiv.style.fontFamily = 'Times New Roman';
			this.captiondiv.style.overflow = 'hidden';
			this.captiondiv.style.cursor = 'default';
			this.captiondiv.innerHTML = '&nbsp;'+this.caption;
			this.captiondiv.style.background = this.fillStyle;
			this.div.appendChild(this.captiondiv);
			
			//SET OWNER
			this.captiondiv.owner = this;
			
			var tmp_a = "sdiv_"+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.move = new Function('event',				
				'var sdiv = document.createElement("div");'+
				'sdiv.id = "'+tmp_a+'";'+
				'sdiv.style.position = "absolute";'+
				'sdiv.style.left = "0px";'+
				'sdiv.style.top = "0px";'+
				'var ws = GetWinSize();'+
				'sdiv.style.width = ws.wi+"px";'+
				'sdiv.style.height = ws.he+"px";'+
				'sdiv.style.zIndex = 101;'+
				'sdiv.style.cursor = "pointer";'+
				//'sdiv.style.background = "transparent url(\'fon'+(this.ie ? '_ie' : '')+'.png\')";'+
				'document.body.appendChild(sdiv);'+
				'sdiv.caption = this.innerHTML;'+
				'this.innerHTML = "";'+
				
				'sdiv.start_x = parseInt(document.getElementById(\"'+this.div.id+'\").style.left);'+
				'sdiv.start_y = parseInt(document.getElementById(\"'+this.div.id+'\").style.top);'+
				'sdiv.start_x0 = '+(this.ie ? 'window.' : '')+'event.clientX + getScrollXY().x;'+
				'sdiv.start_y0 = '+(this.ie ? 'window.' : '')+'event.clientY + getScrollXY().y;'+
				
				"sdiv.onmouseup = new Function('event','document.getElementById(\""+this.captiondiv.id+"\").innerHTML = this.caption;document.body.removeChild(document.getElementById(\""+tmp_a+"\"));');"+
				"sdiv.onmousemove = new Function('event','document.getElementById(\""+this.div.id+"\").style.left = '+sdiv.start_x+' + "+(this.ie ? 'window.' : '')+"event.clientX - '+sdiv.start_x0+' + getScrollXY().x + \"px\";document.getElementById(\""+this.div.id+"\").style.top = '+sdiv.start_y+' + "+(this.ie ? 'window.' : '')+"event.clientY - '+sdiv.start_y0+' + getScrollXY().y + \"px\";');"
			);
			
			// div above in IE
			if(this.ie) this.captiondiv.onmousedown = this.move;
			
			// div above in IE
			if(!this.ie) this.captiondiv.onmousedown = new Function('event','this.pressed = true; this.start_x = parseInt(document.getElementById(\"'+this.div.id+'\").style.left); this.start_y = parseInt(document.getElementById(\"'+this.div.id+'\").style.top); this.start_x0 = '+(this.ie ? 'window.' : '')+'event.clientX + getScrollXY().x; this.start_y0 = '+(this.ie ? 'window.' : '')+'event.clientY + getScrollXY().y; this.style.cursor = "pointer";');
			
			// div above in IE
			if(!this.ie) this.captiondiv.onmouseup = new Function('event','this.pressed = false; this.style.cursor = "default";');
			
			this.move2 = new Function('event','if(!this.pressed) return; document.getElementById("'+this.div.id+'").style.left = this.start_x+'+(this.ie ? 'window.' : '')+'event.clientX-this.start_x0 + getScrollXY().x + "px";document.getElementById("'+this.div.id+'").style.top = this.start_y+'+(this.ie ? 'window.' : '')+'event.clientY-this.start_y0 + getScrollXY().y + "px";');
			
			// div above in IE
			if(!this.ie) this.captiondiv.onmousemove =  this.move2;
			
			this.captiondiv.onmouseover = function() { this.style.color = 'navy';};
			this.captiondiv.onmouseout = function() { this.style.color = 'black';};
			
			// CLOSE
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.position = 'absolute';
			this.close.style.left = this.wi - 19 + 'px';
			this.close.style.top = '5px';
			this.close.style.width = 13 + 'px';
			this.close.style.height = 13 + 'px';
			this.close.style.zIndex = 2;
			this.close.innerHTML = '<div id="'+(this.close.id)+'_cb" style="position:absolute;left:0px;top:0px;font-size:10px;cursor:pointer;" onclick="this.owner.Kill();"><img src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="Закрыть" alt="Закрыть"/></div>';
			this.close.onmouseover = new Function('','var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('','var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			this.div.appendChild(this.close);
			
			//SET OWNER FOR CANVAS
			this.close.owner = this;
			document.getElementById(this.close.id+'_cb').owner = this;
			
			// CLIENTAREA
			this.info = document.createElement('div');
			this.info.id = 'infTWindow_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.DIV = this.info;
			this.info.style.position = 'absolute';
			this.info.style.left = 3 + 'px';
			this.info.style.top = 23 + 'px';
			this.info.style.width = this.wi - 6 + 'px';
			 //  this.info.style.border = 'solid 1px red';
			this.info.style.height = this.he - 25 + 'px';
			this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
			this.info.style.zIndex = 1;
			//this.info.style.background = '#FFCCCC';
			this.info.owner = this;
			this.div.appendChild(this.info);
			this.DIV = this.info;
			
			if($)
				$(this.div).show(200);
			else
				this.div.style.display = 'block';
		}
		
		////////////               ////////////                 ////////////
		
		function MessageDlg(caption,text,typ,buttons,on_result)
		{
			var dlg = new TDialog();
			dlg.init(typ ? typ : 0, buttons ? buttons : ['OK']);
			dlg.setDefaultButton(0);
			dlg.setDiv(document.getElementById('windowroot'));
			dlg.SetCaption(caption ? caption : 'Диалог');
			dlg.SetText(text ? text : '&nbsp;');
			dlg.Execute(on_result ? on_result : false);
		}
		
		function ShowMessage(text) { MessageDlg('Сообщение',text,0,['OK'],false); }
		function MessageBox(text,buttons,on_result) { MessageDlg('Сообщение',text,0,buttons,on_result); }
 
	/*
	
			// typ: mtWarning (4), mtError (3), mtInformation (2), mtConfirmation (1), mtCustom (0)
			// on_result = function(sender, choosed_item){}
			// choosed_item - номер нажатой кнопки из массива buttons
		function MessageDlg(string caption, string text, type typ, string[] buttons, func on_result)
		
		var dlg = new TDialog();
		dlg.init(2,['OK']);
		dlg.setDefaultButton(0);
		dlg.setDiv(document.getElementById('windowroot'));
		dlg.SetCaption('Информация');
		dlg.SetText('&nbsp;<br/>Пример работы класса TDialog из windows.js');
		dlg.Execute(DialogResult);
	
	class TDialog
	{
		// Инициализация  // typ:mtBookmark(5), mtWarning (4), mtError (3), mtInformation (2), mtConfirmation (1), mtCustom (0)
		// buttons: ['OK','CANCEL','YES'] - array of string
		void init(ityp,buttons)
		void init(typ,buttons,wi,he)
		// Установка DIV'a
		void setDiv(object div)
		
		// Установка заголовка
		void SetCaption(string caption)
		// Получение заголовка
		string GetCaption()
		// Установка текста
		string SetText(string text)
		
		// Вызов диалога
		// onclose = function(sender, choosed_item){}
		// choosed_item - номер нажатой кнопки из массива buttons
		bool Execute(onclose)
		
		// Закрываем окно
		void Kill()
		// Получаем функцию для закрытия окна
		function GetKillFunction()
	}
	*/
  
  function TDialog()
  {
	this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
   this.type = 'TDialog'; 
   this.caption = 'Dialog';
   this.name = 'TDialog_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
   this.id = this.name;
  }
  
  TDialog.prototype = new TWindow();
  
  TDialog.prototype.setDefaultButton = function(id)
  {
   this.defbtn = id;
  }
  
  // typ: mtBookmark(5), mtWarning (4), mtError (3), mtInformation (2), mtConfirmation (1), mtCustom (0)
  TDialog.prototype.init = function(typ,buttons,wi,he)
  {
   this.defbtn = 0;
   this.typ = typ ? typ : 'mtCustom';
   this.buttons = buttons ? buttons : ['OK'];
 if(this.buttons.length == 0) this.buttons = ['OK'];
   this.img = '';
   
   switch(typ)
   {
    case "mtConfirmation": 
    case 1:
     this.caption = 'Confirm'; 
     this.img = global_vars_array[0]+'engine/gif/mtConfirm.gif';
     break
    case "mtInformation": 
    case 2:
     this.caption = 'Information'; 
     this.img = global_vars_array[0]+'engine/gif/mtInformation.gif';
     break
    case "mtError": 
    case 3:
     this.caption = 'Error'; 
     this.img = global_vars_array[0]+'engine/gif/mtError.gif';
     break
    case "mtWarning": 
    case 4:
     this.caption = 'Warning'; 
     this.img = global_vars_array[0]+'engine/gif/mtWarning.gif';
     break
	case "mtBookmark":
	case 5:
     this.caption = 'Bookmark'; 
     this.img = global_vars_array[0]+'engine/gif/bookmark2.gif';
     break
	case "mtFind":
	case 6:
     this.caption = 'Поиск'; 
     this.img = global_vars_array[0]+'engine/gif/mtFind.gif';
     break
    default: this.caption = 'Dialog'; 
     this.img = '';
     break
   };
   
   this.name = 'TDialog_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
   this.id = this.name;
   
   this.xtrue = GetWinSize().wi/2-200;
   this.x = this.xtrue / this.zoom;
   this.ytrue = GetWinSize().he/2-150;
   this.y = this.ytrue / this.zoom;
   this.wi = wi ? wi : 400;
   this.he = he ? he : 150;
  }
  
  // private
  TDialog.prototype.fillStyle = "#FFFFFF"
   
  // private
  TDialog.prototype.Draw = function()
  {
   this.canvas_obj = new TCanvas();
   this.canvas_obj.initSize(this.x,this.y,this.wi,this.he);
   this.canvas_obj.initDiv(this.parent);
   this.canvas_obj.div.style.visibility = 'hidden';
   
   
   //SET OWNER FOR CANVAS
   this.canvas_obj.div.owner = this;
   this.canvas_obj.canvas.owner = this;
  
   this.div = this.canvas_obj.div;
   this.ContainerDIV = this.div;
   this.div.style.zIndex = this.zIndex;
   this.div.style.display = 'none';
   this.ctx = this.canvas_obj.CTX;
   
   this.ctx.lineWidth = 2;
   this.ctx.fillStyle = this.fillStyle;
   this.ctx.fillRect(2,2,this.wi-4,this.he-4);
   this.ctx.strokeStyle = "rgb(0,0,0)";
   
      this.ctx.beginPath();
   
   this.ctx.moveTo(2,7);
   this.ctx.quadraticCurveTo(2,2,7,2);
      this.ctx.lineTo(this.wi-7,2);
   this.ctx.quadraticCurveTo(this.wi-2,2,this.wi-2,7);
   
   this.ctx.lineTo(this.wi-2,this.he-12);
   this.ctx.quadraticCurveTo(this.wi-2,this.he-2,this.wi-12,this.he-2);
   this.ctx.lineTo(12,this.he-2);
   this.ctx.quadraticCurveTo(2,this.he-2,2,this.he-12);
   this.ctx.lineTo(2,12)
   this.ctx.closePath();
   this.ctx.stroke();
   
   this.ctx.beginPath();
   this.ctx.strokeStyle = "rgb(25,25,25)";
   this.ctx.lineWidth = 1;
   this.ctx.moveTo(2,22)
   this.ctx.lineTo(this.wi-2,22)
      this.ctx.closePath();
   this.ctx.stroke();
   //tmp.CTX.fill();
   
   
   // CAPTION
   this.captiondiv = document.createElement('div');
   this.captiondiv.id = 'caption_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
   this.captiondiv.style.position = 'absolute';
   this.captiondiv.style.left = '5px';
   this.captiondiv.style.top = '3px';
   this.captiondiv.style.width = this.wi - 25 + 'px';
   this.captiondiv.style.height = 18 + 'px';
   this.captiondiv.style.zIndex = 3;
   this.captiondiv.style.fontWeight = 'bold';
   this.captiondiv.style.fontSize = '15px';
   this.captiondiv.style.fontFamily = 'Times New Roman';
   this.captiondiv.style.overflow = 'hidden';
   this.captiondiv.style.cursor = 'default';
   this.captiondiv.style.backgroundColor = this.fillStyle;
   this.captiondiv.innerHTML = '&nbsp;'+this.caption;
   this.div.appendChild(this.captiondiv);
   
   //SET OWNER
   this.captiondiv.owner = this;
   
   var tmp_a = "sdiv_"+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
   this.move = new Function('event',
    'var sdiv = document.createElement("div");'+
    'sdiv.id = "'+tmp_a+'";'+
    'sdiv.style.position = "absolute";'+
    'sdiv.style.left = "0px";'+
    'sdiv.style.top = "0px";'+
    'var ws = GetWinSize();'+
    'sdiv.style.width = ws.wi+"px";'+
    'sdiv.style.height = ws.he+"px";'+
    'sdiv.style.zIndex = 101;'+
    'sdiv.style.cursor = "pointer";'+
    //'sdiv.style.background = "transparent url(\'fon'+(this.ie ? '_ie' : '')+'.png\')";'+
    'document.body.appendChild(sdiv);'+
	'sdiv.caption = this.innerHTML;'+
	'this.innerHTML = "";'+
    
    'sdiv.start_x = parseInt(document.getElementById(\"'+this.div.id+'\").style.left);'+
    'sdiv.start_y = parseInt(document.getElementById(\"'+this.div.id+'\").style.top);'+
    'sdiv.start_x0 = '+(this.ie ? 'window.' : '')+'event.clientX + getScrollXY().x;'+
    'sdiv.start_y0 = '+(this.ie ? 'window.' : '')+'event.clientY + getScrollXY().y;'+
    
    "sdiv.onmouseup = new Function('event','document.getElementById(\""+this.captiondiv.id+"\").innerHTML = this.caption;document.body.removeChild(document.getElementById(\""+tmp_a+"\"));');"+
    "sdiv.onmousemove = new Function('event','document.getElementById(\""+this.div.id+"\").style.left = '+sdiv.start_x+' + "+(this.ie ? 'window.' : '')+"event.clientX - '+sdiv.start_x0+' + getScrollXY().x + \"px\";document.getElementById(\""+this.div.id+"\").style.top = '+sdiv.start_y+' + "+(this.ie ? 'window.' : '')+"event.clientY - '+sdiv.start_y0+' + getScrollXY().y + \"px\";');"
   );
   
   // div above in IE
   if(this.ie) this.captiondiv.onmousedown = this.move;
   
   // div above in IE
   if(!this.ie) this.captiondiv.onmousedown = new Function('event','this.pressed = true; this.start_x = parseInt(document.getElementById(\"'+this.div.id+'\").style.left); this.start_y = parseInt(document.getElementById(\"'+this.div.id+'\").style.top); this.start_x0 = '+(this.ie ? 'window.' : '')+'event.clientX + getScrollXY().x; this.start_y0 = '+(this.ie ? 'window.' : '')+'event.clientY + getScrollXY().y; this.style.cursor = "pointer";');
   
   // div above in IE
   if(!this.ie) this.captiondiv.onmouseup = new Function('event','this.pressed = false; this.style.cursor = "default";');
   
   this.move2 = new Function('event','if(!this.pressed) return; document.getElementById("'+this.div.id+'").style.left = this.start_x+'+(this.ie ? 'window.' : '')+'event.clientX-this.start_x0 + getScrollXY().x + "px";document.getElementById("'+this.div.id+'").style.top = this.start_y+'+(this.ie ? 'window.' : '')+'event.clientY-this.start_y0 + getScrollXY().y + "px";');
   
   // div above in IE
   if(!this.ie) this.captiondiv.onmousemove =  this.move2;
   
   this.captiondiv.onmouseover = function() { this.style.color = 'navy';};
   this.captiondiv.onmouseout = function() { this.style.color = 'black';};
   
   // CLIENTAREA
   this.info = document.createElement('div');
   this.info.id = 'info_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
   this.DIV = this.info;
   this.info.style.position = 'absolute';
   this.info.style.left = 3 + 'px';
   this.info.style.top = 23 + 'px';
   this.info.style.width = this.wi - 6 + 'px';
    //  this.info.style.border = 'solid 1px red';
   this.info.style.height = this.he - 25 + 'px';
   this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
   this.info.style.zIndex = 1;
   //this.info.style.background = '#FFCCCC';
   this.info.owner = this;
   this.div.appendChild(this.info);
   this.DIV = this.info;
   if($)
		$(this.div).show(200);
	else
		this.div.style.display = 'block';
  }
   
  // onclose = function(sender, choosed_item){}
  TDialog.prototype.Execute = function(onclose)
  {
   this.onReady = onclose ? onclose : function(sender, choosed_item) {};
   this.canvas_obj.div.style.visibility = 'visible';
   
   this.blockwindow = document.createElement('div');
   this.blockwindow.id = 'blockwindow';
   this.blockwindow.style.position = 'absolute';
   this.blockwindow.style.left = '0px';
   this.blockwindow.style.top = '0px';
   this.blockwindow.style.width = GetWinSize().wi+getScrollXY().x+"px";
   this.blockwindow.style.height = GetWinSize().he+getScrollXY().y+"px";
   this.blockwindow.innerHTML = '&nbsp;';
   //this.blockwindow.style.background = 'white';
   //this.blockwindow.style.filter = 'alpha(opacity=15)';
   //this.blockwindow.style.opacity = '0.15';
   this.parent.appendChild(this.blockwindow);
   return true;
  }  
  
  // private
  TDialog.prototype.ChooseResult = function(ready)
  {
   this.parent.removeChild(this.blockwindow);
   this.onReady(this,ready);
   this.Kill();
  }
  
  // инициализация дива
  TDialog.prototype.setDiv = function(div)
  {
   this.parent = div;
   if(this.parent) this.Draw();
   if(this.DIV)
   {   
    this.DIV.style.padding = '10px 10px 10px 10px';
    var btns = '';
    for(i=0;i<this.buttons.length;i++)
    {
     btns += '<span style="border:solid 1px gray;height:22px;padding: 2px 2px 2px 2px;cursor:default;background:#'+(this.defbtn == i ? 'DDDDDD' : 'EEEEEE')+';" onmouseover="this.style.background=\'#FFFFAA\';"  onmouseout="this.style.background=\'#'+(this.defbtn == i ? 'DDDDDD' : 'EEEEEE')+'\';" onclick="document.getElementById(\''+this.div.id+'\').owner.ChooseResult('+i+');">&nbsp;<b>'+this.buttons[i]+'</b>&nbsp;</span> ';
    };
    var popr = 0;
    if(this.img.length == 0) popr = 48;
    this.DIV.innerHTML = (this.img.length > 0 ? '<div style="position:absolute;left:8px;top:5px;"><img src="'+this.img+'" width="40" height="40"/></div>' : '') +
     '<div id="dialog_text_'+this.id+'" style="position:absolute;padding: 5px 10px 10px 10px;top:0px;left:'+(50-popr)+'px;width:'+(this.wi-70+popr)+'px;height:'+(this.he-80)+'px;vertical-align:middle;text-align:left;" valign="middle">&nbsp;</div>'+
     '<div style=position:absolute;left:0px;top:'+(this.he-65)+'px;width:'+(this.wi-10)+';" align="center">'+btns+'</div>';
    
    this.ContainerDIV.style.zIndex = clmap.GetNext_zIndex();
    this.TextDiv = document.getElementById('dialog_text_'+this.id);
   };
  }   
  
  TDialog.prototype.SetText = function(text)
  {
   this.TextDiv.innerHTML = text;
  }
  
  TDialog.prototype.SetScrollable = function(enabled) { return false; };
  TDialog.prototype.Move = function(x,y) { return false; };
  TDialog.prototype.GetPos = function(x,y) { return false; };
  TDialog.prototype.SetZoom = function(zoom) { return false; };
  
  /*
	class MiniPopupTooltip(idNo)
	{
			// отображение всплывающего блока
			// Show(x,y)
			// Show(x,y,close_timeout) если close_timeout -1 то не закрываем пока не вызовется функция заново или не дернуть close()
		public Show(x,y,close_timeout)
			// DIV для вывода
		public DIV;
			// mainDIV - обрамляющий
		public mainDIV;
			// Закрыть 
		public Close();
	}
	*/
  
  function MiniPopupTooltip(idNo) { this.idNo = idNo ? idNo : 0; this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; }
  MiniPopupTooltip.prototype.DIV = {};
  MiniPopupTooltip.prototype.mainDIV = {};
  MiniPopupTooltip.prototype.killed = false;
  MiniPopupTooltip.prototype.Show = function(x,y,close_timeout) { this.DIV = ShowMiniPopupTooltip(x,y,close_timeout,this.idNo); this.mainDIV = this.DIV.parent; }
  MiniPopupTooltip.prototype.Close = function() { this.killed = true; this.DIV.close(); }
  
  // отображение всплывающего блока
  //	ShowMiniPopupTooltip(x,y)
  // ShowMiniPopupTooltip(x,y,close_timeout) если close_timeout -1 то не закрываем пока не вызовется функция заново или не дернуть close()
  // ShowMiniPopupTooltip(x,y,close_timeout,idNo)
  // returns DIV
  function ShowMiniPopupTooltip(x,y,close_timeout,idNo)
  {
		if(close_timeout == -1) close_timeout = 60*60*1000;
		var mid = idNo ? idNo : 0;
		var wr = document.getElementById("windowroot");
		var my_element = document.getElementById('popuptooltip'+mid);
		var not_ex = my_element == null;
		if(my_element && my_element.proc.func) clearTimeout(my_element.proc.func);
		
		if(not_ex)
		{
			my_element = document.createElement('div');
			my_element.id = 'popuptooltip'+mid;
			my_element.mid = mid;
			my_element.style.position = 'absolute';
			// my_element.style.display = 'none';
		};
		
		//this.maindiv = my_element;
		my_element.style.left = x+'px';
		my_element.style.top = y+'px';
		
		if(not_ex)
		{
			my_element.style.width = 'auto';
			my_element.style.height = 'auto';
			my_element.style.backgroundColor = '#EEEEEE';
			my_element.style.padding = '2px 2px 2px 2px';
			my_element.close = function() { this.killed = true; document.getElementById("windowroot").removeChild(this); };
			wr.appendChild(my_element);		
		};
		
		my_element.proc = {timeout:(close_timeout?close_timeout:2500),inarea:false};
		my_element.proc.func = setTimeout('document.getElementById("windowroot").removeChild(document.getElementById("popuptooltip'+mid+'"));',my_element.proc.timeout);
		my_element.onmouseout = function(){ if(this.proc.inarea) this.proc.func = setTimeout('document.getElementById("windowroot").removeChild(document.getElementById("popuptooltip'+this.mid+'"));',this.proc.timeout); this.proc.inarea = false; };
		my_element.onmouseover = function(){ this.proc.inarea = true; if(this.proc.func) clearTimeout(this.proc.func); };
		
		var in_element = document.getElementById('popuptooltip'+mid+'_in');
		if(not_ex)
		{
			in_element = document.createElement('div');
			in_element.id = 'popuptooltip'+mid+'_in';
			in_element.style.width = '300px';
			in_element.style.height = '180px';
			in_element.style.border = 'solid 1px #AAAAAA';
			in_element.style.backgroundColor = 'white';
			in_element.style.textAlign = 'center';
			in_element.innerHTML = '<span style="color:#DDDDDD;cursor:default;">[NO TEXT]</span>';
			my_element.appendChild(in_element);
			in_element.parent = my_element;
			in_element.close = function () { clearTimeout(this.parent.proc.func); document.getElementById("windowroot").removeChild(this.parent); };
		};
		// $(my_element).show("slide", { direction: "left" }, 100);
		in_element.mDIV = my_element;
		return in_element;
  }
		
		function GetWinSize()
		{
			var x,y;	
			// общий синтаксис	
			if (self.innerHeight) 
			{	    
				x = self.innerWidth;	    
				y = self.innerHeight;	
			//Non-IE
			} else if(typeof( window.innerWidth ) == 'number')
			{
				x = window.innerWidth;
				y = window.innerHeight;
			// IE 6 Strict Mode	
			} else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) 
			{
				x = document.documentElement.clientWidth;//clientWidth;	    
				y = document.documentElement.clientHeight;	
			// Остальные версии IE	
			} else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) 
			{
					x = document.body.clientWidth;//clientWidth;	    
					y = document.body.clientHeight;	
			};
			return {wi:x,he:y}
		}
		
		function getScrollXY() 
		{
			var scrOfX = 0, scrOfY = 0;
			if( typeof( window.pageYOffset ) == 'number' ) {
				//Netscape compliant
				scrOfY = window.pageYOffset;
				scrOfX = window.pageXOffset;
			} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
				//DOM compliant
				scrOfY = document.body.scrollTop;
				scrOfX = document.body.scrollLeft;
			} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
				//IE6 standards compliant mode
				scrOfY = document.documentElement.scrollTop;
				scrOfX = document.documentElement.scrollLeft;
			}
			return {x:scrOfX, y:scrOfY};
		}
		
		function CreateBookmarkLink(title,url) 
		{ 
			if (window.sidebar) 
			{ 
				// Mozilla Firefox Bookmark		
				window.sidebar.addPanel(title, url,"");	
			} 
			else if( window.external ) 
			{ 
				// IE Favorite		
				window.external.AddFavorite(url, title); 
			}	
			else if(window.opera && window.print) 
			{ 
				// Opera
				var mbm = document.createElement('a');
				mbm.setAttribute('rel','sidebar');
				mbm.setAttribute('href',url);
				mbm.setAttribute('title',title);
				mbm.click();
			} ;
		}