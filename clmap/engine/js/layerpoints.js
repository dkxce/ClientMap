/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

		/*
			use layers.js;
			
			public class TLayerPoint()
			{
				// установка координат и имени точки
				public void init(x,y,name)
				
				// установка текста
				public void SetInnerHTML(string text)
				
				// получение текста
				public string GetInnerHTML()
				
				// добавление точки в слой
				public void setDiv(object parentDiv)
				
				// получение дива (контейнера)
				public object GetDiv()
				
				// перестановка точки
				public void Move(x,y)
				
				// получение координат x,y
				public object GetXY()
				
				// получение имени точки
				public string GetName
				
				// перерисовка точки
				public void SetZoom(zoom)
				
				// Выделение
				public void CheckedOn()
				public void CheckedOff()
				public void CheckedChange()
				
				// Мигание
				public void BlinkOn()
				public void BlinkOff()
				public void BlinkChange()
				
				// Колебание
				public void TrembleOn();
				public void TrembleOff();
				public void TrembleChange();
				
				// Вызов инициализации для дочерних классов; вызывается после setDiv
				public void ChildInit()
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
				
					// установка обработчика onclick
					// onclick_function = function(sender){alert("Попал в "+sender.name);};
				public void SetSelectable(bool selectable, onclick_function)
								
					// убита?
				bool Killed;
			}
		*/
		
		function TLayerPoint()
		{
			this.type = 'TLayerPoint';
			this.id = 'laypoint_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*10000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.div = null;
			this.parent = null;
			this.clmap_vname = null;
			this.zoom = 1;
			this.zoom_ind = 1;
			this.zoom_min = 0;
			this.zoom_max = 16;
			
			this.offset_x = 0;
			this.offset_y = 0;
			
			this._clientText = '&nbsp;';			
			this.init(0,0);			
		}
		
		TLayerPoint.prototype = new TLayerObject();
		
		// инициализацаия класса
		TLayerPoint.prototype.init = function(x,y,name)
		{
			this.selectable = false;
			this.onclick_function = function(sender){};
			this.id = 'laypoint_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*10000);
			this.x = x;
			this.y = -1*y;
			this.name = name ? name : 'TLayerPoint'+Math.round(Math.random()*10000);
		}
		
		// установка текста точки
		TLayerPoint.prototype.SetInnerHTML = function(text)
		{
			this._clientText = text;
			if(this.div) this.div.innerHTML = this._clientText;
			
			// if(this.div) this.div.style.background = 'red';
			// if(this.div) this.div.style.overflow = 'hidden';
		}
		
		// получение текста точки
		TLayerPoint.prototype.GetInnerHTML = function()
		{
			if(this.div) return this.div.innerHTML;
			return this._clientText;
		}
		
		// установка возможности кликать
		TLayerPoint.prototype.SetSelectable = function(selectable, onclick_function)
		{
			this.selectable = selectable;
			if(onclick_function) this.onclick_function = onclick_function;
		}
		
		// инициализация DIV'а родителя
		TLayerPoint.prototype.setDiv = function(parentDiv)
		{
			this.parent = parentDiv;
			this.div = document.createElement('div');
			this.div.id = this.id;
			this.div.style.position = 'absolute';
			this.div.style.left = this.x +'px';
			this.div.style.top = this.y +'px';
			this.div.style.width = 10 +'px';
			this.div.style.height = 10 +'px';
			this.div.innerHTML = this._clientText;
			//this.div.style.border='dashed 1px black';
			this.parent.appendChild(this.div);
			this.div.owner = this;
			this.ChildInit();			
		}
				
		
		// Попадание в точку
		TLayerPoint.prototype.InPointPXLs = function(xx,yy,call_onclick,obj_index)
		{					
			x = xx - 2;
			y = yy - 2;
			if(Math.abs(x - this.x / this.zoom) <= 7 && Math.abs(y - this.y / this.zoom) <= 7)
			{
				if(this.selectable && call_onclick && this.visible) this.onclick_function(this,0,0);
				return true;
			};
			return false;
		}
		
		// флаг убита ли точка
		TLayerPoint.prototype.Killed = false;
		
		// событие при убивании точки
		TLayerPoint.prototype.OnKill = function(sender) {  };
		
		// убивание точки
		TLayerPoint.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;

			if (this.OnKill) this.OnKill(this);
			this.parent = document.getElementById(this.parent.id);
			if(this.parent)
			{
				for(var i=0;i<this.parent.childNodes.length;i++) if(this.parent.childNodes[i].id == this.id)
				this.parent.removeChild(this.parent.childNodes[i]);
			};
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		
		// получение DIV'а точки
		TLayerPoint.prototype.GetDiv = function()
		{
			return this.div;
		}
		
		// ПОлучение координат точки
		TLayerPoint.prototype.GetXY = function()
		{
			return {x:this.x,y:-1*this.y};
		}
		
		// вкл. дрожание
		TLayerPoint.prototype.TrembleOn = function()
		{
			this.div.t_x = parseInt(this.div.style.left);
			this.div.t_y = parseInt(this.div.style.top);
			if(this.div.trembled) clearTimeout(this.div.trembled);
			this.div.tpla = new Function('','if(myidiv = document.getElementById("'+this.id+'")) myidiv.style.left = (myidiv.t_x+4-parseInt(Math.random()*8))+"px"; myidiv.style.top = (myidiv.t_y+2-parseInt(Math.random()*4))+"px"; myidiv.trembled = setTimeout(myidiv.tpla,150);');
			this.div.trembled = setTimeout(this.div.tpla,150);
		}
		
		// выкл. дрожание
		TLayerPoint.prototype.TrembleOff = function()
		{
			if(this.div.trembled) clearTimeout(this.div.trembled);
			this.div.trembled = false;
			this.div.style.left = this.div.t_x+'px';
			this.div.style.top = this.div.t_y+'px';
		}
		
		// изменить дрожание
		TLayerPoint.prototype.TrembleChange = function()
		{
			if(this.div.trembled) 
				this.TrembleOff();
			else
				this.TrembleOn();
		}
		
		// вкл. мерцание
		TLayerPoint.prototype.BlinkOn = function()
		{
			if(this.div.blinked) clearTimeout(this.div.blinked);
			this.div.npla = new Function('','if(myidiv = document.getElementById("'+this.id+'")) myidiv.style.visibility = myidiv.style.visibility == "hidden" ? "visible" : "hidden"; myidiv.blinked = setTimeout(myidiv.npla,500);');
			this.div.blinked = setTimeout(this.div.npla,500);
		}
		
		// выкл. мерцание
		TLayerPoint.prototype.BlinkOff = function()
		{
			if(this.div.blinked) clearTimeout(this.div.blinked);
			this.div.blinked = false;
		}
		
		// измен. мерцание
		TLayerPoint.prototype.BlinkChange = function()
		{
			if(this.div.blinked) 
				this.BlinkOff();
			else
				this.BlinkOn();
		}
		
		// вкл. обводку
		TLayerPoint.prototype.CheckedOn = function()
		{
			this.CheckedOff();
		
			var nd = document.createElement('div');
			nd.id = this.id+'_Checked';
			nd.style.background = "url('"+global_vars_array[0]+"engine/gif/selecteddot.gif') 0px 0px;";
			nd.style.width = '48px';
			nd.style.height = '48px';
			nd.style.position = 'absolute';
			nd.style.left = '-24px';
			nd.style.top = '-24px';
			nd.style.zIndex = -1;
			this.div.appendChild(nd);
		}
		
		// выкл. обводку
		TLayerPoint.prototype.CheckedOff = function()
		{
			if(itm = document.getElementById(this.id+'_Checked'))
			this.div.removeChild(itm);
		}
		
		// перекл. обводку
		TLayerPoint.prototype.CheckedChange = function()
		{
			if(itm = document.getElementById(this.id+'_Checked')) 
				this.CheckedOff();
			else 
				this.CheckedOn();
		}
		
		// получение имени точки
		TLayerPoint.prototype.GetName = function()
		{
			return this.name;
		}
		
		TLayerPoint.prototype.GetBounds = function()
		{
			return {Left:this.x,Right:this.x,Top:-1*this.y,Bottom:-1*this.y};
		}
		
		// переместить точку
		TLayerPoint.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.x = x;
			this.y = -1*y;
			this.div = document.getElementById(this.id);
			this.div.style.left = this.x / this.zoom - this.offset_x;
			this.div.style.top = this.y / this.zoom - this.offset_y;
		}
		
		TLayerPoint.prototype.SetOffset = function(off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			this.div = document.getElementById(this.id);
			this.div.style.left = this.x / this.zoom - this.offset_x;
			this.div.style.top = this.y / this.zoom - this.offset_y;
		}
		
		TLayerPoint.prototype.SetVisible = function(visible)
		{
			this.visible = visible;
			this.SetZoomIND();
			return;
						
			this.div.style.visibility = visible ? 'visible' : 'hidden';
			this.div.style.display = visible ? 'block' : 'none';
		}
		
		// пересчет зума и сдвиг
		TLayerPoint.prototype.SetZoom = function(zoom,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			this.zoom = zoom;
			this.div = document.getElementById(this.id);
			this.div.style.left = (this.x / this.zoom) - this.offset_x;
			this.div.style.top = (this.y / this.zoom) - this.offset_y;
			
			if(this.div.trembled) this.TrembleOn();
		}
		
		// обработка ZOOM_MAX ZOOM_MIN
		TLayerPoint.prototype.SetZoomIND = function(ind)
		{
			if(ind || ind == 0) this.zoom_ind = ind;
			if(this.visible && this.zoom_min <= this.zoom_ind && this.zoom_max >= this.zoom_ind)
			{
				this.div.style.visibility = 'visible';
				this.div.style.display = 'block'
			}
			else
			{
				this.div.style.visibility = 'hidden';
				this.div.style.display = 'none';
			};
		}
		
		//public
		TLayerPoint.prototype.SetMinMaxZoom = function(min,max)
		{
			this.zoom_min = min;
			this.zoom_max = max;
			if(this.div) this.SetZoomIND();
		}
		
		// события для инициализации дочерних классов
		TLayerPoint.prototype.ChildInit = function() {}
		
		/////////////////////
		
		function TPoint() 
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'TPoint';
		}
		
		TPoint.prototype = new TLayerPoint();
		
		TPoint.prototype.setDiv = function(parentDiv)
		{
			this.parent = parentDiv;
			this.div = document.createElement('div');
			this.div.id = this.id;
			this.div.style.position = 'absolute';
			this.div.style.left = this.x +'px';
			this.div.style.top = this.y +'px';
			this.div.style.width = 10 +'px';
			this.div.style.height = 10 +'px'
			this.div.innerHTML = this._clientText;
			this.parent.appendChild(this.div);
			this.div.owner = this;
			this.ChildInit();
		}
		
		/////////////
		/////////////
		/////////////
		/////////////
		
		//public
		function THistoryPoint() 
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'THistoryPoint';
			this.history = [];
			this.history_line = false;
			this.history_name = 'HistoryPointTail_'+Math.random();
			this.clear_next = false;
		}
		
		THistoryPoint.prototype = new TLayerPoint();
		
		//public
		THistoryPoint.prototype.setDiv = function(parentDiv)
		{
			this.parent = parentDiv;
			this.div = document.createElement('div');
			this.div.id = this.id;
			this.div.style.position = 'absolute';
			this.div.style.left = this.x +'px';
			this.div.style.top = this.y +'px';
			this.div.style.width = 10 +'px';
			this.div.style.height = 10 +'px'
			this.div.innerHTML = this._clientText;
			this.parent.appendChild(this.div);
			this.div.owner = this;
			this.ChildInit();
		}
		
		//public
		THistoryPoint.prototype.initHistory = function(length,color)
		{
			this.HistoryLength = length;
			if(color) this.HistoryColor = color;
		}
		
		//public
		THistoryPoint.prototype.HistoryLength = 10;
		
		//public
		THistoryPoint.prototype.HistoryColor = '#990099';
		
		//public
		THistoryPoint.prototype.Move = function(x,y,off_x,off_y)
		{
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			if(!this.clear_next) this.history.push( [this.x,-1*this.y] );
			if(this.history.length>this.HistoryLength) 
			{
				var tmp_a = [];
				for(var i=this.history.length-this.HistoryLength;i<this.history.length;i++) tmp_a.push(this.history[i]);
				this.history = tmp_a;
			};			
			
			this.x = x;
			this.y = -1*y;
			this.div = document.getElementById(this.id);
			this.div.style.left = this.x / this.zoom - this.offset_x;
			this.div.style.top = this.y / this.zoom - this.offset_y;
			
			if(this.clear_next) 
				this.clear_next = false;
			else
				this.Tail();
		}
		
		//public // удаляет все точки, включая текущую
		THistoryPoint.prototype.ClearHistory = function()
		{
			this.clear_next = true;
			
			this.history = [];
			if(this.history_line) 
			{
				this.MapLayers.RemoveObject(this.history_line);
				this.history_line.Kill();
			};
			this.history_line = false;
		}
		
		// private draw tail
		THistoryPoint.prototype.Tail = function()
		{
			if((id = this.MapLayers.GetLayerID("HistoryPointTail")) < 0) id = this.MapLayers.Add("HistoryPointTail");
			if(this.history_line) 
			{
				this.MapLayers.RemoveObject(this.history_line);
				this.history_line.Kill();
			};
			var xa = [];
			var ya = [];			
			for(var i=0;i<this.history.length;i++)
			{
				xa.push(this.history[i][0]);
				ya.push(this.history[i][1]);
			};
			xa.push(this.x);
			ya.push(-1*this.y);
						
			this.history_line = new TLayerMultiLine();// TLayerPolygon();// TLayerMultiLine();
			
			this.history_line.init(xa,ya,3,this.HistoryColor,this.history_name);
			this.MapLayers.AddLayerObject(id,this.history_line);
			this.history_line.SetSelectable(this.selectable, this.onclick_function );
			this.history_line.SetVisible(true);
			this.history_line.Hint = 'Хвост';
			if(this.Hint.length > 0) this.history_line.Hint = 'Хвост от объекта `'+this.Hint+'`';
		}