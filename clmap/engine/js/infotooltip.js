/******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

		/*
			use clmap.js;
			
			interface TInfoToolTip
			{
					// Инициализация
				void init(int x, int y, int width, int height)
				void init(int x, int y, int width, int height, TColor color)
					// установка имени объекта clmap (vname)
				void setCLMAP(iClientMap clmap)
					// Установка DIV'a
				void setDiv(object div)
					// Убиваем окно
				void Kill()
					// Перемещаем окно
				void Move(int x, int y)
					// Устанавливаем зум
				void SetZoom(int zoom)
					// Устанавливаем скролл текста
				void SetScrollable(bool enabled)
				
					// возвращает DIV для вывода текста
				object DIV;
			}
		*/
		
		function TInfoToolTip() 
		{ 
			this.iface = 'TInfoToolTip'; 
			this.type = 'TInfoToolTip'; 
			this.zoom = 1;
			this.allow_only_one_type = '_TInfoToolTip_TInfoTypeDiv01_';
			this.allow_only_one = true;
			this.clmap = null;
			this.name = 'TInfoToolTip_'+(this.allow_only_one ? 'only_one' : Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000));
			this.id = this.name;
			
			this.ie = navigator.userAgent.indexOf('MSIE') > 0;
		}
		
		TInfoToolTip.prototype.init = function(x,y,wi,he,color) {}
		
		TInfoToolTip.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
				
		TInfoToolTip.prototype.setDiv = function(div) {}
		
		TInfoToolTip.prototype.SetZoom = function(zoom) {}
		
		TInfoToolTip.prototype.Kill = function() {}
		
		TInfoToolTip.prototype.Move = function(x,y) {}
		
		TInfoToolTip.prototype.DIV = {};
		
		TInfoToolTip.prototype.SetScrollable = function(enabled) {};
		TInfoToolTip.prototype.SetCaption = function(caption_text) {return false;};
		
		// ПОлучение координат точки
		TInfoToolTip.prototype.GetXY = function()
		{
			return {x:this.original_x,y:-1*this.original_y};
		}
		
		//////////////////////////////////////////////
		//////////////////////////////////////////////
		
		/*
			use canvas.js;
			
			class TInfoTip
			{	
					// Инициализация
					// height & width - размеры текстового поля
				void init(int x, int y, int width, int height)
				void init(int x, int y, int width, int height, TColor color)
					
					// Установки DIV'a
				void  setDiv(object div)
					// Убиваем окно
				void Kill()
					// Перемещаем окно
				void Move(int x, int y)
					// Устанавливаем зум - перемещаем окно
				void SetZoom(int zoom)
					// Устанавливаем скролл текста
				void SetScrollable(bool enabled)
				
					// возвращает DIV для вывода текста
				object DIV;
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
				
					// Устанавливаем ZIndex
				int SetZIndex(ind)
					// убита?
				bool Killed;
			}
		*/
		
		function TInfoTip()
		{
			this.type = 'TInfoTip';
			this.allow_only_one_type = '_TInfoTip_TInfoTypeDiv01_';
			this.allow_only_one = false;
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.scroll = true; 
			this.offset_x = 0;
			this.offset_y = 0;
		}
		
		TInfoTip.prototype = new TInfoToolTip();
		
		// инициализация
		TInfoTip.prototype.init = function(x,y,wi,he,color)
		{
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.wi = wi - 35;
			this.he = he - 55;
			this.color = color ? color : (this.ie ? '#FFFFCC' : 'rgba(255,255,204,0.80)');
			
			this.name = 'TInfoTip_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
		}
		
		TInfoTip.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// closeNormal
		TInfoTip.prototype.closeNormal = false;
		
		//private
		TInfoTip.prototype.CloseClick = function()
		{
			if(this.MapLayers) (new Function('',this.MapLayers.clmap+'.flag_ms_overs[1] = false;'))();
			this.Kill();
		}
		
		// public
		TInfoTip.prototype.blockMouse = true;
		
		// инициализация дива
		TInfoTip.prototype.setDiv = function(div)
		{
			if(div) this.parent = div;
			this.canvas_obj = new TCanvas();
			if(this.allow_only_one) 
			{
				this.id = this.allow_only_one_type+this.parent.id+'_div';
				if(child = document.getElementById(this.allow_only_one_type+this.parent.id))
				{
					if(this.clmap_vname)
					{
						var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');');
						tmp_func();
					};
				};
				this.canvas_obj.div.id = this.allow_only_one_type+this.parent.id;
			};
			this.canvas_obj.initSize(this.x-10,this.y-this.he-100,this.wi+100,this.he+100);
			this.canvas_obj.initDiv(this.parent);
			
			this.Draw();
			
			this.canvas_obj.div.style.cursor = 'default';
			
			//SET OWNER FOR CANVAS
			this.canvas_obj.div.owner = this;
			this.canvas_obj.canvas.owner = this;

			if(this.clmap_vname && this.blockMouse)
			{
				this.canvas_obj.div.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true;');
				this.canvas_obj.div.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
			};
			
			this.info = document.createElement('div');
			this.info.id = 'info_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.DIV = this.info;			
			this.info.style.position = 'absolute';
			this.info.style.left = 18 + 'px';
			this.info.style.top = 8 + 'px';
			this.info.style.width = this.wi + 35 + 'px';
			 //  this.info.style.border = 'solid 1px red';
			this.info.style.height = this.he + 55 + 'px';
			this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
			this.info.style.zIndex = 1;
			this.canvas_obj.div.appendChild(this.info);
			
			//SET OWNER FOR CANVAS
			this.info.owner = this;
			
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.position = 'absolute';
			this.close.style.left = (this.closeNormal ? (this.wi-1) : (this.wi + 15)) + 'px';
			this.close.style.top = (this.closeNormal ? (7) : (this.he + 71)) + 'px';
			this.close.style.width = 54 + 'px';
			this.close.style.height = 14 + 'px';
			this.close.style.zIndex = 4;
			if(!this.closeNormal)
			{
				this.close.style.borderBottom = 'dashed 1px black';
				this.close.style.borderRight = 'dashed 1px black';
				this.close.style.background = '#FFFFCC';
			};
			this.close.SelfObject = this;			
			this.close.innerHTML = '<div style="position:absolute;left:0px;top:0px;font-size:10px;cursor:pointer;" onclick="document.getElementById(\''+this.close.id+'\').SelfObject.CloseClick();">&nbsp;'+(this.closeNormal ? '' : 'закрыть ')+'<img style="position:absolute;left:40px;top:0px;" src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="Закрыть" alt="Закрыть"/></div>';
			this.canvas_obj.div.appendChild(this.close);
			this.close.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			
			//SET OWNER FOR CANVAS
			this.close.owner = this;
		}
		
		//private
		
		// установка zIndex'а
		TInfoTip.prototype.SetZIndex = function(ind)
		{
			if(ind) if(this.canvas_obj) this.canvas_obj.div.style.zIndex = ind;
			return this.canvas_obj.div.style.zIndex;
		}
		
		// private отрисовка
		TInfoTip.prototype.Draw = function()
		{
			if(navigator.userAgent.indexOf('irefox') >= 0) 
				this.Paint(true);
			else
			{
				this.Paint(true);
				this.Paint();
			};
		}
		
		// private 
		TInfoTip.prototype.Paint = function(fill)
		{
			this.ctx = this.canvas_obj.CTX;
			this.ctx.lineWidth = 2;			
			this.ctx.beginPath();
			this.ctx.strokeStyle = (this.ie ? '#000000' : "rgba(0,0,0,1)");
			this.ctx.fillStyle = this.color;
			this.ctx.moveTo(40,1);
			this.ctx.quadraticCurveTo(0,0,1,35);
			this.ctx.lineTo(1,35+this.he);
			this.ctx.quadraticCurveTo(0,70+this.he,15,70+this.he);
			this.ctx.quadraticCurveTo(25,83+this.he,10,100+this.he);
			this.ctx.lineTo(35,75+this.he);
			this.ctx.quadraticCurveTo(40,70+this.he,75,70+this.he);
			this.ctx.moveTo(40,1);
			this.ctx.lineTo(35+this.wi,1);
			this.ctx.quadraticCurveTo(70+this.wi,0,70+this.wi,35);
			this.ctx.lineTo(70+this.wi,35+this.he);
			this.ctx.quadraticCurveTo(70+this.wi,70+this.he,35+this.wi,70+this.he);
			this.ctx.lineTo(75,70+this.he);
			if(fill) this.ctx.fill();
			this.ctx.stroke();
		}
		
		// убита?
		TInfoTip.prototype.Killed = false;
		
		// при убийстве
		TInfoTip.prototype.OnKill = function(sender) {};
		
		// убить
		TInfoTip.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;
			if(this.clmap_vname)
			{
				var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
				tmp_func();				
			};
			this.canvas_obj.Kill();
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// дыинуть
		TInfoTip.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.canvas_obj.SetPos(this.x - 10  - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// изменить зум
		TInfoTip.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			if(this.canvas_obj)	this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// div текста
		TInfoTip.prototype.DIV = {};
		
		// overflow
		TInfoTip.prototype.SetScrollable = function(enabled)
		{
			this.scroll = enabled;
			if(this.info) this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
		};
		
		//////////////////////////////////////////////
		//////////////////////////////////////////////
		
		/*
			use canvas.js
			
			class TInfoCaptionTip
			{
					// Инициализация
					// height & width - размеры текстового поля
				void init(int x, int y, int width, int height)
				void init(int x, int y, int width, int height, TColor color)
					
					// Установки DIV'a
				void  setDiv(object div)
					// Убиваем окно
				void Kill()
					// Перемещаем окно
				void Move(int x, int y)
					// Устанавливаем зум - перемещаем окно
				void SetZoom(int zoom)
					// Устанавливаем скролл текста
				void SetScrollable(bool enabled)
				
					// Устанавливаем текст в заголовок окна
				void SetCaption(string caption)
					// Получаем зоголовок окна
				void GetCaption()
				
					// Устанавливаем ZIndex
				int SetZIndex(ind)
					// EVENT
				OnKill = function(sender) {alert('Kill');};
								
					// возвращает DIV для вывода текста
				object DIV;
					// убита?
				bool Killed;
			}
		*/
		
		function TInfoCaptionTip()
		{
			this.type = 'TInfoCaptionTip';
			this.allow_only_one_type = '_TInfoCaptionTip_TInfoTypeDiv01_';
			this.allow_only_one = false;
			this.scroll = true; 
			this.caption = '';
			
			this.offset_x = 0;
			this.offset_y = 0;
			
			this.name = 'TInfoCaptionTip_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
		}
		
		TInfoCaptionTip.prototype = new TInfoToolTip();
		
		// ицициализация
		TInfoCaptionTip.prototype.init = function(x,y,wi,he,color)
		{
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.wi = wi - 38;
			this.he = he - 40;
			this.color = color ? color : (this.ie ? '#FFFFCC' : 'rgba(255,255,204,0.80)');//'#FEFFE1';
		}
		
		TInfoCaptionTip.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// установка заголовка
		TInfoCaptionTip.prototype.SetCaption = function(caption)
		{
			this.caption = caption;
			if(this.captiondiv) this.captiondiv.innerHTML = '&nbsp;'+this.caption;
		}
		
		// получение заголовка
		TInfoCaptionTip.prototype.GetCaption = function()
		{
			return this.caption;
		}
		
		// установка zIndex'a
		TInfoCaptionTip.prototype.SetZIndex = function(ind)
		{
			if(ind) if(this.canvas_obj) this.canvas_obj.div.style.zIndex = ind;
			return this.canvas_obj.div.style.zIndex;
		}
		
		// closeNormal
		TInfoCaptionTip.prototype.closeNormal = false;
		
		// public
		TInfoCaptionTip.prototype.blockMouse = true;
		
		// инициализация дива
		TInfoCaptionTip.prototype.setDiv = function(div)
		{
			if(div) this.parent = div;
			this.canvas_obj = new TCanvas();
			if(this.allow_only_one) 
			{
				this.id = this.allow_only_one_type+this.parent.id+'_div';
				if(child = document.getElementById(this.allow_only_one_type+this.parent.id))
				{
					if(this.clmap_vname)
					{
						var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');');
						tmp_func();
					};
				};
				this.canvas_obj.div.id = this.allow_only_one_type+this.parent.id;
			};
			this.canvas_obj.initSize(this.x-10,this.y-this.he-100,this.wi+100,this.he+100);
			this.canvas_obj.initDiv(this.parent);
			
			this.Draw();

			this.canvas_obj.div.style.cursor = 'default';

			//SET OWNER FOR CANVAS
			this.canvas_obj.div.owner = this;
			this.canvas_obj.canvas.owner = this;

			if(this.clmap_vname && this.blockMouse)
			{
				this.canvas_obj.div.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true;');
				this.canvas_obj.div.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
			};
			
			this.info = document.createElement('div');
			this.info.id = 'info_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.DIV = this.info;
			this.info.style.position = 'absolute';
			this.info.style.left = 18 + 'px';
			this.info.style.top = 23 + 'px';
			this.info.style.width = this.wi + 38 + 'px';
			 //  this.info.style.border = 'solid 1px red';
			this.info.style.height = this.he + 40 + 'px';
			this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
			this.info.style.zIndex = 1;
			this.canvas_obj.div.appendChild(this.info);
			
			//SET OWNER FOR CANVAS
			this.info.owner = this;
			
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.position = 'absolute';
			this.close.style.left = (this.closeNormal ? (this.wi-1) : (this.wi + 15)) + 'px';
			this.close.style.top = (this.closeNormal ? (5) : (this.he + 71)) + 'px';
			
			this.close.style.width = 54 + 'px';
			this.close.style.height = 14 + 'px';
			this.close.style.zIndex = 4;
			if(!this.closeNormal)
			{
				this.close.style.borderBottom = 'dashed 1px black';
				this.close.style.borderRight = 'dashed 1px black';
				this.close.style.background = '#FFFFCC';
			};			
			this.close.innerHTML = '<div id="'+(this.close.id)+'_cb" style="position:absolute;left:0px;top:0px;font-size:10px;cursor:pointer;" onclick="this.owner.Kill();">&nbsp;'+(this.closeNormal ? '' : 'закрыть ')+'<img style="position:absolute;left:40px;top:0px;" src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="Закрыть" alt="Закрыть"/></div>';
			
			// return;'+(this.clmap_vname ? this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');' : '')+';
			
			this.close.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			
			// img_src = 'data:image/gif;base64,R0lGODlhDQANALMAAI1kZ8fS3eNBDscyBuNPI+VhPcM8GMREI+JXMuVnSedwVOh4XuqDaeSYhv///////yH5BAEAAA8ALAAAAAANAA0AAART8IVJa5CtraV6KgQwZQ3DbEqCHBPTOE5awOu0MLAz02ygbDkYgdBLcBS5IXFS6AQdQ8MEkcjtHILBhICAFQpdrDYg4CIQSkF2AjC434O4SGKxPCIAOw==';
			
			this.canvas_obj.div.appendChild(this.close);
			
			//SET OWNER FOR CANVAS
			this.close.owner = this;
			document.getElementById(this.close.id+'_cb').owner = this;
			
			this.captiondiv = document.createElement('div');
			this.captiondiv.id = 'caption_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.captiondiv.style.position = 'absolute';
			this.captiondiv.style.left = 20 + 'px';
			this.captiondiv.style.top = 2 + 'px';
			this.captiondiv.style.width = this.wi + 33 + 'px';
			this.captiondiv.style.height = 18 + 'px';
			this.captiondiv.style.zIndex = 3;
			this.captiondiv.style.borderBottom = 'dotted 1px #333333';
			this.captiondiv.style.fontWeight = 'bold';
			this.captiondiv.style.fontSize = '15px';
			this.captiondiv.style.fontFamily = 'Times New Roman';
			this.captiondiv.innerHTML = '&nbsp;'+this.caption;
			this.canvas_obj.div.appendChild(this.captiondiv);
			//this.captiondiv.onclick= function() { alert('a'); };
			this.captiondiv.onmouseover = new Function('','var tmpv = document.getElementById(\''+this.captiondiv.id+'\'); tmpv.style.borderBottom=\'solid 1px Navy\';tmpv.style.color=\'Navy\';');
			this.captiondiv.onmouseout = new Function('','var tmpv = document.getElementById(\''+this.captiondiv.id+'\'); tmpv.style.borderBottom=\'dotted 1px #333333\';tmpv.style.color=\'black\';');
			
			//SET OWNER FOR CANVAS
			this.captiondiv.owner = this;
		}
		
		// private 
		TInfoCaptionTip.prototype.Draw = function()
		{
			if(navigator.userAgent.indexOf('irefox') >= 0) 
				this.Paint(true);
			else
			{
				this.Paint(true);
				this.Paint();
			};
		}
		
		//private
		// private 
		TInfoCaptionTip.prototype.Paint = function(fill)
		{
			this.ctx = this.canvas_obj.CTX;
			
			if(navigator.userAgent.indexOf("Firefox") > 0)
			{
				this.ctx.lineWidth = 6;
				this.ctx.beginPath();
				this.ctx.strokeStyle = (this.ie ? '#FFFF00' : "rgba(255,255,0,0.3)");
				this.ctx.lineTo(1+1,35+this.he+2);
				this.ctx.quadraticCurveTo(0+1,70+this.he+2,15+1,70+this.he+2);
				this.ctx.lineTo(35+1,75+this.he+2);
				this.ctx.quadraticCurveTo(40+1,70+this.he+2,75+1,70+this.he+2);
				this.ctx.moveTo(35+this.wi+1,1+2);
				this.ctx.quadraticCurveTo(70+this.wi+1,0+2,70+this.wi+1,35+2);
				this.ctx.lineTo(70+this.wi+1,35+this.he+2);
				this.ctx.quadraticCurveTo(70+this.wi+1,70+this.he+2,35+this.wi+1,70+this.he+2);			
				this.ctx.lineTo(75+1,70+this.he+2);
				this.ctx.stroke();
			};

			this.ctx.lineWidth = 2;
			this.ctx.beginPath();
			this.ctx.strokeStyle = (this.ie ? '#000000' : "rgba(0,0,0,1)");
			this.ctx.fillStyle = this.color;			
			this.ctx.moveTo(40,1);
			this.ctx.quadraticCurveTo(0,0,1,35);
			this.ctx.lineTo(1,35+this.he);
			this.ctx.quadraticCurveTo(0,70+this.he,15,70+this.he);
			this.ctx.quadraticCurveTo(25,83+this.he,10,100+this.he);
			this.ctx.lineTo(35,75+this.he);
			this.ctx.quadraticCurveTo(40,70+this.he,75,70+this.he);
			this.ctx.moveTo(40,1);
			this.ctx.lineTo(35+this.wi,1);
			this.ctx.quadraticCurveTo(70+this.wi,0,70+this.wi,35);
			this.ctx.lineTo(70+this.wi,35+this.he);
			this.ctx.quadraticCurveTo(70+this.wi,70+this.he,35+this.wi,70+this.he);			
			this.ctx.lineTo(75,70+this.he);
			
			if(fill) this.ctx.fill();
			this.ctx.stroke();
		}
		
		// убито?
		TInfoCaptionTip.prototype.Killed = false;
		
		// при убийстве
		TInfoCaptionTip.prototype.OnKill = function(sender) {  };
		
		// убить
		TInfoCaptionTip.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;
			if(this.clmap_vname)
			{
			
				var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
				tmp_func();				
			};
			this.canvas_obj.Kill();
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// двинуть
		TInfoCaptionTip.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// установить зум
		TInfoCaptionTip.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			if(this.canvas_obj)	this.canvas_obj.SetPos(this.x - 10 - this.offset_x, this.y - this.he - 100 - this.offset_y);
		}
		
		// див текста
		TInfoCaptionTip.prototype.DIV = {};
		
		// overflow текста
		TInfoCaptionTip.prototype.SetScrollable = function(enabled)
		{
			this.scroll = enabled;
			if(this.info) this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
		};
		
		//////////////////////////////////////////////
		//////////////////////////////////////////////
		
		/*
			use canvas.js;
			
			class TInfoTip
			{	
					// Инициализация
					// height & width - размеры текстового поля
				void init(int x, int y, int width, int height)
				void init(int x, int y, int width, int height, TColor color)
					
					// Установки DIV'a
				void  setDiv(object div)
					// Убиваем окно
				void Kill()
					// Перемещаем окно
				void Move(int x, int y)
					// Устанавливаем зум - перемещаем окно
				void SetZoom(int zoom)
					// Устанавливаем скролл текста
				void SetScrollable(bool enabled)
				
					// возвращает DIV для вывода текста
				object DIV;
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
				
					// Устанавливаем ZIndex
				int SetZIndex(ind)
					// убита?
				bool Killed;
			}
		*/
		
		function THintTip()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'THintTip';
			this.allow_only_one_type = '_THintTip_TInfoTypeDiv01_';
			this.allow_only_one = false;
			this.scroll = true; 
			this.offset_x = 0;
			this.offset_y = 0;
		}
		
		THintTip.prototype = new TInfoToolTip();
		
		// инициализация
		THintTip.prototype.init = function(x,y,wi,he,color)
		{
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.wi = wi - 35;
			this.he = he - 55;
			this.color = color ? color : (this.ie ? '#FFFFCC' : 'rgba(255,255,204,0.80)');
			
			this.name = 'THintTip_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
		}
		
		THintTip.prototype.CloseButtonText = 'Закрыть';
		
		THintTip.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// public
		THintTip.prototype.blockMouse = true;
		
		// инициализация дива
		THintTip.prototype.setDiv = function(div)
		{
			if(div) this.parent = div;
			this.canvas_obj = new TCanvas();
			if(this.allow_only_one) 
			{
				this.id = this.allow_only_one_type+this.parent.id+'_div';
				if(child = document.getElementById(this.allow_only_one_type+this.parent.id))
				{
					if(this.clmap_vname)
					{
						var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');');
						tmp_func();
					};
				};
				this.canvas_obj.div.id = this.allow_only_one_type+this.parent.id;
			};
			this.canvas_obj.initSize(this.x-10,this.y-this.he-100,this.wi+100,this.he+100);
			this.canvas_obj.initDiv(this.parent);
			
			this.Draw();
			
			this.canvas_obj.div.style.cursor = 'default';
			
			//SET OWNER FOR CANVAS
			this.canvas_obj.div.owner = this;
			this.canvas_obj.canvas.owner = this;

			if(this.clmap_vname && this.blockMouse)
			{
				this.canvas_obj.div.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true;');
				this.canvas_obj.div.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
			};
			
			this.BDIV0 = [];
			for(var i=8;i<48;i+=2)
			{		
				this.binfo0 = document.createElement('div');
				this.binfo0.id = 'binfo'+(i-8)+'_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
				this.BDIV0[i-8] = this.binfo0;
				this.binfo0.style.position = 'absolute';
				this.binfo0.style.left = i + 'px';
				this.binfo0.style.top = 2 + 'px';
				this.binfo0.style.width = 2 + 'px';
				this.binfo0.style.height = this.he + 65 + 'px';
				this.binfo0.style.zIndex = 0;
				this.binfo0.style.background = (navigator.userAgent.indexOf("irefox") > 0 || this.color.substr(0,3 != 'rgb')) ? this.color : 'white';
				var op = (i-8)*2;
				this.binfo0.style.filter = 'alpha(opacity='+op+')';
				this.binfo0.style.opacity = '0.'+(op > 9 ? op : '0'+op);
				this.canvas_obj.div.appendChild(this.binfo0);
			};
									
			this.binfo = document.createElement('div');
			this.binfo.id = 'binfo_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.BDIV = this.binfo;
			this.binfo.style.position = 'absolute';
			this.binfo.style.left = 48 + 'px';
			this.binfo.style.top = 2 + 'px';
			this.binfo.style.width = this.wi + 20 + 'px';
			this.binfo.style.height = this.he + 65 + 'px';
			this.binfo.style.overflow = this.scroll ? 'auto' : 'hidden';
			this.binfo.style.zIndex = 1;
			this.binfo.style.background = (navigator.userAgent.indexOf("irefox") > 0 || this.color.substr(0,3 != 'rgb')) ? this.color : 'white';
			this.binfo.style.filter = 'alpha(opacity=75)';
			this.binfo.style.opacity = '0.75';
			this.canvas_obj.div.appendChild(this.binfo);
			
			this.info = document.createElement('div');
			this.info.id = 'info_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.DIV = this.info;
			this.info.style.position = 'absolute';
			this.info.style.left = 48 + 'px';
			this.info.style.top = 6 + 'px';
			this.info.style.width = this.wi + 5 + 'px';
			 //  this.info.style.border = 'solid 1px red';
			this.info.style.height = this.he + 55 + 'px';
			this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
			this.info.style.zIndex = 2;
			// this.info.style.background = 'white';
			// this.info.style.filter = 'alpha(opacity=50)';
			// this.info.style.opacity = '0.5';
			this.canvas_obj.div.appendChild(this.info);
			
			//SET OWNER FOR CANVAS
			this.info.owner = this;
			
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.position = 'absolute';
			this.close.style.left = this.wi + 14 + 'px';
			this.close.style.top = 3 + 'px';
			this.close.style.width = 54 + 'px';
			this.close.style.height = 14 + 'px';
			this.close.style.zIndex = 3;
			this.close.style.filter = 'alpha(opacity=65)';
			this.close.style.opacity = '0.65';
			this.close.SelfObject = this;
			this.close.innerHTML = '<div style="position:absolute;left:0px;top:0px;font-size:10px;cursor:pointer;" onclick="document.getElementById(\''+this.close.id+'\').SelfObject.CloseClick();"><img style="position:absolute;left:40px;top:0px;" src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="'+this.CloseButtonText+'" alt="'+this.CloseButtonText+'"/></div>';
			this.canvas_obj.div.appendChild(this.close);
			this.close.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			
			//SET OWNER FOR CANVAS
			this.close.owner = this;
		}
		
		//private
		THintTip.prototype.CloseClick = function()
		{
			if(this.MapLayers) (new Function('',this.MapLayers.clmap+'.flag_ms_overs[1] = false;'))();
			this.Kill();
		}
		
		// установка zIndex'а
		THintTip.prototype.SetZIndex = function(ind)
		{
			if(ind) if(this.canvas_obj) this.canvas_obj.div.style.zIndex = ind;
			return this.canvas_obj.div.style.zIndex;
		}
		
		// private отрисовка
		THintTip.prototype.Draw = function()
		{
			if(navigator.userAgent.indexOf('irefox') >= 0) 
				this.Paint(true);
			else
			{
				this.Paint(true);
				this.Paint();
			};
		}
		
		// private 
		THintTip.prototype.Paint = function(fill)
		{
			this.ctx = this.canvas_obj.CTX;
			this.ctx.lineWidth = 2;			
			this.ctx.beginPath();
			this.ctx.strokeStyle = (this.ie ? '#000000' : "rgba(0,0,0,1)");
			this.ctx.fillStyle = this.color;
			this.ctx.moveTo(20,80+this.he);
			this.ctx.quadraticCurveTo(25,83+this.he,10,100+this.he);
			this.ctx.moveTo(30,90+this.he);
			this.ctx.quadraticCurveTo(30,83+this.he,10,100+this.he);
			this.ctx.lineTo(40,70+this.he);
			//this.ctx.lineTo(35,75+this.he);			// rounded
			//this.ctx.quadraticCurveTo(40,69+this.he,75,70+this.he);		// rounded
			this.ctx.lineTo(68+this.wi,70+this.he);
			this.ctx.stroke();
		}
		
		// убита?
		THintTip.prototype.Killed = false;
		
		// при убийстве
		THintTip.prototype.OnKill = function(sender) {};
		
		// убить
		THintTip.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;
			if(this.clmap_vname)
			{
				var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
				tmp_func();				
			};
			this.canvas_obj.Kill();
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// дыинуть
		THintTip.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.canvas_obj.SetPos(this.x - 10  - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// изменить зум
		THintTip.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			if(this.canvas_obj)	this.canvas_obj.SetPos(this.x - 10 - this.offset_x,this.y - this.he - 100 - this.offset_y);
		}
		
		// div текста
		THintTip.prototype.DIV = {};
		
		// overflow
		THintTip.prototype.SetScrollable = function(enabled)
		{
			this.scroll = enabled;
			if(this.info) this.info.style.overflow = this.scroll ? 'auto' : 'hidden';
		};
		
		
		
		
		
		/* TClassicTip //
			{
					// Инициализация
					// height & width - размеры текстового поля
				void init(int x, int y,)
				void init(int x, int y, color)
					
					// Установки DIV'a
				void  setDiv(object div)
					// Убиваем окно
				void Kill()
					// Перемещаем окно
				void Move(int x, int y)
					// Устанавливаем зум - перемещаем окно
				void SetZoom(int zoom)
				
					// возвращает DIV для вывода текста
				object DIV;
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
				
					// Устанавливаем ZIndex
				int SetZIndex(ind)
					// убита?
				bool Killed;
			}
		*/
		
		function TFuckingTip()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'TFuckingTip';
			this.allow_only_one_type = '_TFuckingTip_TInfoTypeDiv01_';
			this.allow_only_one = false;
			this.offset_x = 0;
			this.offset_y = 0;
		}
		
		TFuckingTip.prototype = new TInfoToolTip();
		
		// инициализация
		//TClassicTip.prototype.init = function(x,y,color)
		TFuckingTip.prototype.init = function(x,y,wi,he,color)
		{			
			this.original_x = x;
			this.original_y = -1 * y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.wi = 4;
			//if((wi != undefined) && (parseInt(wi).toString() == wi)) this.wi = wi;
			this.he = 8;			
			//if((he != undefined) && (parseInt(he).toString() == he)) this.he = he;
			this.color = color ? color : (this.ie ? '#FFFFFF' : 'rgba(255,255,255,0.90)');
			//if((wi != undefined) && (parseInt(wi).toString() != wi)) this.color = wi;		
			
			this.name = 'TFuckingTip_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
		}
		
		TFuckingTip.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// public
		TFuckingTip.prototype.blockMouse = true;
		
		// инициализация дива
		TFuckingTip.prototype.setDiv = function(div)
		{
			if(div) this.parent = div;
			this.main_div = document.createElement('div');
			
			if(this.allow_only_one) 
			{
				this.id = this.allow_only_one_type+this.parent.id+'_div';
				if(child = document.getElementById(this.allow_only_one_type+this.parent.id))
				{
					if(this.clmap_vname)
					{
						var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');');
						tmp_func();
					};
				};
				this.main_div.id = this.allow_only_one_type+this.parent.id;
			};
			
			//SET OWNER FOR CANVAS
			this.parent.appendChild(this.main_div);
			this.main_div.owner = this;			
			this.main_div.owner = this;
			this.main_div.style.position = 'absolute';
			this.main_div.style.left = this.x +'px';
			this.main_div.style.top = this.y - this.he + 'px';
			this.main_div.style.width = this.wi + 'px';
			this.main_div.style.height = this.he + 'px';
			this.main_div.style.overflow = 'visible';	
			//	this.main_div.style.backgroundColor = this.color;
			
			// CLOSE DIV
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.zIndex = 3;
			this.close.SelfObject = this;
			this.close.owner = this;
			this.close.innerHTML = '<div style="cursor:pointer;" onclick="document.getElementById(\''+this.close.id+'\').SelfObject.CloseClick();" align="right"><img style="position:absolute;top:0px;left:'+(this.wi-13)+'px;" src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="'+this.CloseButtonText+'" alt="'+this.CloseButtonText+'"/></div>';
			this.main_div.appendChild(this.close);
			this.close.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			
			this.DIV = document.createElement('div');
			this.DIV.style.display = 'none';
			
			if(this.clmap_vname && this.blockMouse)
			{
				this.main_div.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true;');
				this.main_div.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
			};						
		}
		
		//private
		TFuckingTip.prototype.CloseClick = function()
		{
			if(this.MapLayers) (new Function('',this.MapLayers.clmap+'.flag_ms_overs[1] = false;'))();
			this.Kill();
		}
		
		// установка zIndex'а
		TFuckingTip.prototype.SetZIndex = function(ind)
		{
			if(ind) if(this.main_div) this.main_div.style.zIndex = ind;
			return this.main_div.style.zIndex;
		}
		
		// убита?
		TFuckingTip.prototype.Killed = false;
		
		// при убийстве
		TFuckingTip.prototype.OnKill = function(sender) {};
		
		// убить
		TFuckingTip.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;
			if(this.clmap_vname)
			{
				var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
				tmp_func();				
			};
			this.parent.removeChild(this.main_div);
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// дыинуть
		TFuckingTip.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// изменить зум
		TFuckingTip.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// div текста
		TFuckingTip.prototype.DIV = {};	
		
		
		
		
		function TClassicTip()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'TClassicTip';
			this.allow_only_one_type = '_TClassicTip_TInfoTypeDiv01_';
			this.allow_only_one = false;
			this.offset_x = 0;
			this.offset_y = 0;
		}
		
		TClassicTip.prototype = new TInfoToolTip();
		
		// инициализация
		//TClassicTip.prototype.init = function(x,y,color)
		TClassicTip.prototype.init = function(x,y,wi,he,color)
		{			
			this.original_x = x;
			this.original_y = -1 * y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			this.wi = 300;
			if((wi != undefined) && (parseInt(wi).toString() == wi)) this.wi = wi;
			this.he = 400;			
			if((he != undefined) && (parseInt(he).toString() == he)) this.he = he;
			this.color = color ? color : (this.ie ? '#FFFFFF' : 'rgba(255,255,255,0.90)');
			if((wi != undefined) && (parseInt(wi).toString() != wi)) this.color = wi;
			
			this.name = 'TClassicTip_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
		}
		
		TClassicTip.prototype.CloseButtonText = 'Закрыть';
		
		TClassicTip.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// public
		TClassicTip.prototype.blockMouse = true;
		
		// инициализация дива
		TClassicTip.prototype.setDiv = function(div)
		{
			if(div) this.parent = div;
			this.main_div = document.createElement('div');
			
			if(this.allow_only_one) 
			{
				this.id = this.allow_only_one_type+this.parent.id+'_div';
				if(child = document.getElementById(this.allow_only_one_type+this.parent.id))
				{
					if(this.clmap_vname)
					{
						var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;'+this.clmap_vname+'.MapLayers.RemoveObjID(\''+this.id+'\');');
						tmp_func();
					};
				};
				this.main_div.id = this.allow_only_one_type+this.parent.id;
			};
			
			//SET OWNER FOR CANVAS
			this.parent.appendChild(this.main_div);
			this.main_div.owner = this;			
			this.main_div.owner = this;
			this.main_div.style.position = 'absolute';
			this.main_div.style.left = this.x +'px';
			this.main_div.style.top = this.y - this.he + 'px';
			this.main_div.style.width = this.wi + 'px';
			this.main_div.style.height = this.he + 'px';
			this.main_div.style.overflow = 'hidden';			
			
			// BOTTOM VALIGN DIV
			var tmp_id = this.main_div.id + Math.round(Math.random()*10000);
			this.main_div.innerHTML = '<table border="0" cellpadding="0" cellspacing="0" style="height:100%;width:100%"><tr><td valign="bottom"><div id="'+tmp_id+'_bd"></div></td></tr></table>'
			this.bottom_div = document.getElementById(tmp_id+'_bd');
			this.bottom_div.style.opacity = '0.9';
			this.bottom_div.style.filter = 'alpha(opacity=90)';

			// CLOSE DIV
			this.close = document.createElement('div');
			this.close.id = 'close_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.close.style.zIndex = 3;
			this.close.SelfObject = this;
			this.close.owner = this;
			this.close.innerHTML = '<div style="cursor:pointer;" onclick="document.getElementById(\''+this.close.id+'\').SelfObject.CloseClick();" align="right"><img style="position:relative;top:16px;left:-3px;" src="'+global_vars_array[0]+'engine/gif/close_btn.gif" height="13" width="13" title="'+this.CloseButtonText+'" alt="'+this.CloseButtonText+'"/></div>';
			this.bottom_div.appendChild(this.close);
			this.close.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'red\';');
			this.close.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false; var tmpv = document.getElementById(\''+this.close.id+'\'); tmpv.style.color=\'black\';');
			
			// BLOCK DIV
			this.main_txt = document.createElement('div');
			try { this.main_txt.style.background = this.color; } 
			catch (e) { this.main_txt.style.background = 'white'; throw "Your browser doesn't support your format of color - " + this.color; };
			this.main_txt.style.border = 'solid 1px gray';
			this.bottom_div.appendChild(this.main_txt);						
			
			// TEXT DIV
			this.inner_txt_div = document.createElement('div');
			this.inner_txt_div.style.margin = '5px 20px 10px 10px';
			this.main_txt.appendChild(this.inner_txt_div);
			this.DIV = this.inner_txt_div;
			
			 // IMG DIV
			this.img_div = document.createElement('div');			
			this.img_div.innerHTML = '<img src="engine/gif/arr_leftdown.gif" style="position:relative;top:-1px;" border="0"/>';
			this.bottom_div.appendChild(this.img_div);

			if(this.clmap_vname && this.blockMouse)
			{
				this.main_txt.onmouseover = new Function('',this.clmap_vname+'.flag_ms_overs[1] = true;');
				this.main_txt.onmouseout = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
			};						
		}
		
		//private
		TClassicTip.prototype.CloseClick = function()
		{
			if(this.MapLayers) (new Function('',this.MapLayers.clmap+'.flag_ms_overs[1] = false;'))();
			this.Kill();
		}
		
		// установка zIndex'а
		TClassicTip.prototype.SetZIndex = function(ind)
		{
			if(ind) if(this.main_div) this.main_div.style.zIndex = ind;
			return this.main_div.style.zIndex;
		}
		
		// убита?
		TClassicTip.prototype.Killed = false;
		
		// при убийстве
		TClassicTip.prototype.OnKill = function(sender) {};
		
		// убить
		TClassicTip.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;
			if(this.clmap_vname)
			{
				var tmp_func = new Function('',this.clmap_vname+'.flag_ms_overs[1] = false;');
				tmp_func();				
			};
			this.parent.removeChild(this.main_div);
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// дыинуть
		TClassicTip.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.original_x = x;
			this.original_y = -1*y;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// изменить зум
		TClassicTip.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			
			this.x = this.original_x / this.zoom;
			this.y = this.original_y / this.zoom;
			
			this.main_div.style.left = this.x - this.offset_x +'px';
			this.main_div.style.top = this.y - this.he - this.offset_y + 'px';
		}
		
		// div текста
		TClassicTip.prototype.DIV = {};	