/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/
		/*
			use canvas.js
			use layers.js;
			
			// Create -> init -> setDiv
			
			class TLayerLine
			{
					// Инициализация линии... нач. и кон. точки, ширина линии, цвет, имя
				public void init(x0,y0,x1,y1,line_width,line_color,name)
					// установка имени объекта clmap (vname)
				void setCLMAP(iClientMap clmap)
					// установка дива
				public void setDiv(div)
					// Установка зума
				public void SetZoom(zoom)
					// установка ширины линии
				public void SetWidth(line_width)
					// установка цвета линии
				public void SetColor(line_color)
					// установка цвета и ширины линии
				public void SetWidthAndColor(line_width,line_color)
					// установка zIndex'a
				public void SetZIndex(z_index)
				
					// Получение координат точек
				public object GetXYFrom()
				public object GetXYTo()
					
					// установка обработчика onclick на линии
					// onclick_function = function(sender){alert("Попал в "+sender.name);};
				public void SetSelectable(bool selectable, onclick_function)
				public void Kill()
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
								
					// убита?
				bool Killed;
			}
		*/
		
		function TLayerLine()
		{
			this.type = 'TLayerLine';
			this.name = 'layerline_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
			
			this.parent = null;
			this.zoom = 0;
			this.zoom_ind = 1;
			this.zoom_min = 0;
			this.zoom_max = 16;
			this.zIndex = 0;
			
			this.offset_x = 0;
			this.offset_y = 0;
			
			this.limiter = 4000; // canvas maxsize for FireFox
			this.canvas_obj = [];
		}
		
		TLayerLine.prototype = new TLayerObject();
		
		// инициализация линии
		TLayerLine.prototype.init = function(x0,y0,x1,y1,width,color,name)
		{
			this.name = 'layerline_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			if(name) this.name = name;
			this.xx0 = x0;
			this.yy0 = -1*y0;
			this.xx1 = x1;
			this.yy1 = -1*y1;
			this.line_wi = width;
			this.color = color;
			this.clmap_vname = null;
			
			this.minxx = x0 < x1 ? x0 : x1;
			this.maxxx = x0 > x1 ? x0 : x1;
			this.minyy = y0 < y1 ? y0 : y1;
			this.maxyy = y0 > y1 ? y0 : y1;
			
			this.selectable = false;
			this.onclick_function = function(sender){};
		}
		
		TLayerLine.prototype.GetBounds = function()
		{
			return {Left:this.xx0,Right:this.xx1,Top:-1*this.yy1,Bottom:-1*this.yy0};
		}
		
		// установка 
		TLayerLine.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
		
		// установка возможности кликать по линии
		TLayerLine.prototype.SetSelectable = function(selectable, onclick_function)
		{
			this.selectable = selectable;
			if(onclick_function) this.onclick_function = onclick_function;
			if(this.parent != null) this.setDiv();
		}
		
		// инициализация DIV'а
		TLayerLine.prototype.setDiv = function(div)
		{	
			var bounds_up = this.line_wi;
			if(div) this.parent = div;
			if(this.zoom == 0) return;
			
			this.x0 = this.xx0 / this.zoom - this.offset_x;
			this.y0 = this.yy0 / this.zoom - this.offset_y;
			this.x1 = this.xx1 / this.zoom - this.offset_x;
			this.y1 = this.yy1 / this.zoom - this.offset_y;
		
			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];
			if(this.max_wh < 5 || this.max_wh < this.line_w) return;
		
			for(var i=0;i<this.max_ttl;i++)
			{
				this.canvas_obj[i] = new TCanvas();
				var start_x = this.min_x+this.argx(i);
				var start_y = this.min_y+this.argy(i);
				this.canvas_obj[i].initSize(start_x-bounds_up,start_y-bounds_up,this.wi > this.limiter ? this.limiter : this.wi,this.he > this.limiter ? this.limiter : this.he);
				this.canvas_obj[i].initDiv(this.parent);
				// this.canvas_obj[i].div.style.cursor = 'default';
				
				this.canvas_obj[i].div.style.zIndex = this.zIndex;
				
				//SET OWNER FOR CANVAS
				this.canvas_obj[i].div.owner = this;
				this.canvas_obj[i].canvas.owner = this;
				
				this.canvas_obj[i].CTX.lineWidth = this.line_wi;
				this.canvas_obj[i].CTX.strokeStyle = this.color;
				this.canvas_obj[i].CTX.beginPath();
				this.canvas_obj[i].CTX.moveTo(this.x0-start_x+bounds_up,this.y0-start_y+bounds_up);
				var st = this.canvas_obj[i].CTX.lineTo(this.x1-start_x+bounds_up,this.y1-start_y+bounds_up);
				this.canvas_obj[i].CTX.closePath();
				this.canvas_obj[i].CTX.stroke();
			};
			this.SetVisible(this.visible);
		}
		
		TLayerLine.prototype.SetVisible = function(visible)
		{
			this.visible = visible;
			this.SetZoomIND();
			return;
			
			for(var i=0;i<this.max_ttl;i++) 
			{
				this.canvas_obj[i].div.style.visibility = visible ? 'visible' : 'hidden';
				this.canvas_obj[i].div.style.display = visible ? 'block' : 'none';
			};
		}
		
		// Попадание в линию
		TLayerLine.prototype.InPointPXLs = function(x,y,call_onclick,obj_index)
		{					
			xx = x * this.zoom;
			yy = -1 * (y+2) * this.zoom;
			
			if(xx < this.minxx) return;
			if(xx > this.maxxx) return;
			if(yy < this.minyy) return;
			if(yy > this.maxyy) return;
			
			var dx = (this.yy1 - this.yy0) / (this.xx1 - this.xx0);
			if(Math.abs((xx-this.xx0)*dx + (this.yy0+yy)) < ((5+this.line_wi)*this.zoom))
			{
				if(this.selectable && call_onclick && this.visible) this.onclick_function(this,0,0);
				return true;
			}
			return false;
		}
		
		// убита ли линия?
		TLayerLine.prototype.Killed = false;
		
		// события при убивании
		TLayerLine.prototype.OnKill = function(sender) {  };
		
		// убить линию 
		TLayerLine.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;

			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];
			
			this.parent = document.getElementById(this.parent.id);
			if(this.parent)
			{
				for(var i=0;i<this.parent.childNodes.length;i++) if(this.parent.childNodes[i].id == this.id)
				this.parent.removeChild(this.parent.childNodes[i]);
			};
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// Получение стартовой точки
		TLayerLine.prototype.GetXYFrom = function()
		{
			return {x:this.xx0,y:-1*this.yy0};
		}
		
		// получение конечной точки
		TLayerLine.prototype.GetXYTo = function()
		{
			return {x:this.xx1,y:-1*this.yy1};
		}
		
		// установка ширины линии
		TLayerLine.prototype.SetWidth = function(width)
		{
			this.line_wi = width;
			if(this.parent != null) this.setDiv();
		}
		
		
		// установка цвета линии
		TLayerLine.prototype.SetColor = function(color)
		{
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка ширины линии и цвета
		TLayerLine.prototype.SetWidthAndColor = function(width,color)
		{
			this.line_wi = width;
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка z-index'a
		TLayerLine.prototype.SetZIndex = function(z_index)
		{
			this.zIndex = z_index;
			if(this.parent != null) this.setDiv();
		}
		
		TLayerLine.prototype.SetOffset = function(off_x,off_y)
		{
			this.SetZoom(this.zoom,off_x,off_y);
		}
		
		// изменение зума карты
		TLayerLine.prototype.SetZoom = function(zoom,off_x,off_y)
		{	
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			if(zoom) this.zoom = zoom;
			this.x0 = this.xx0 / this.zoom - this.offset_x;
			this.y0 = this.yy0 / this.zoom - this.offset_y;
			this.x1 = this.xx1 / this.zoom - this.offset_x;
			this.y1 = this.yy1 / this.zoom - this.offset_y;
			
			this.min_x = this.x0 < this.x1 ? this.x0 : this.x1;
			this.min_y = this.y0 < this.y1 ? this.y0 : this.y1;
		
			this.wi = Math.abs(this.x1-this.x0) + this.line_wi*2;
			this.he = Math.abs(this.y1-this.y0) + this.line_wi*2;
			this.max_wh = this.wi > this.he ? this.wi : this.he;
		
			this.max_ttl = this.max_wh / this.limiter;
			if(this.max_wh % this.limiter > 0) this.max_ttl = parseInt(this.max_ttl)+1;
		
			this.argx = new Function('no','return '+(this.wi/this.max_ttl)+'*no;');
			this.argy = new Function('no','return '+(this.he/this.max_ttl)+'*no;');

			if(this.parent != null) this.setDiv();
		}
		
		// private
		TLayerLine.prototype.SetZoomIND = function(ind)
		{
			if(ind || ind == 0) this.zoom_ind = ind;
			if(this.visible && this.zoom_min <= this.zoom_ind && this.zoom_max >= this.zoom_ind)
			{
				for(var i=0;i<this.max_ttl;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'visible';
					this.canvas_obj[i].div.style.display = 'block';
				};
			}
			else
			{
				for(var i=0;i<this.max_ttl;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'hidden';
					this.canvas_obj[i].div.style.display = 'none';
				};
			};
		}
		
		//public
		TLayerLine.prototype.SetMinMaxZoom = function(min,max)
		{
			this.zoom_min = min;
			this.zoom_max = max;
			if(this.canvas_obj.length > 0) this.SetZoomIND();
		}
		
		/*
			use canvas.js
			use layers.js;
			
			// Create -> init -> setDiv
			
			class TLayerMultiLine
			{
					// Инициализация линии... нач. и кон. точки, ширина линии, цвет, имя
				public void init(xx[],yy[],line_width,line_color,name)
					// установка имени объекта clmap (vname)
				void setCLMAP(iClientMap clmap)
					// установка дива
				public void setDiv(div)
					// Установка зума
				public void SetZoom(zoom)
					// установка ширины линии
				public void SetWidth(line_width)
					// установка цвета линии
				public void SetColor(line_color)
					// установка цвета и ширины линии
				public void SetWidthAndColor(line_width,line_color)
					// установка zIndex'a
				public void SetZIndex(z_index)
				
					// Получение координат точек
				public object GetXY(index)
					// Получение числа точек
				public int GetXYCount()
					
					// установка обработчика onclick на линии
					// onclick_function = function(sender){alert("Попал в "+sender.name);};
				public void SetSelectable(bool selectable, onclick_function)
				public void Kill()
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
								
					// убита?
				bool Killed;
			}
		*/
		
		function TLayerMultiLine()
		{
			this.type = 'TLayerMultiLine';
			this.name = 'layermultiline_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.id = this.name;
			
			this.parent = null;
			this.zoom = 0;
			this.zoom_ind = 1;
			this.zoom_min = 0;
			this.zoom_max = 16;
			this.zIndex = 0;
			
			this.offset_x = 0;
			this.offset_y = 0;
			
			this.xx = [];
			this.yy = [];
			this.xxpxls = [];
			this.yypxls = [];
			this.min_x = [];
			this.min_y = [];
			this.max_wh = [];
			this.max_ttl = [];
			this.wi = [];
			this.he = [];
			
			this.limiter = 3500; // canvas maxsize for FireFox
			this.canvas_obj = [];
		}
		
		TLayerMultiLine.prototype = new TLayerObject();
		
		// инициализация линии
		TLayerMultiLine.prototype.init = function(x_arr,y_arr,width,color,name)
		{
			this.name = 'layermultiline_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			if(name) this.name = name;
			this.minxx = [];
			this.maxxx = [];
			this.minyy = [];
			this.maxyy = [];
			for(var i=0;i<x_arr.length;i++) 
			{
				this.xx[i] = x_arr[i];
				this.yy[i] = -1 * y_arr[i];
				if(i>0)
				{
					this.minxx[i-1] = x_arr[i-1] < x_arr[i] ? x_arr[i-1] : x_arr[i];
					this.maxxx[i-1] = x_arr[i-1] > x_arr[i] ? x_arr[i-1] : x_arr[i];
					this.minyy[i-1] = y_arr[i-1] < y_arr[i] ? y_arr[i-1] : y_arr[i];
					this.maxyy[i-1] = y_arr[i-1] > y_arr[i] ? y_arr[i-1] : y_arr[i];
				};
			};
		
			this.line_wi = width;
			this.color = color;
			this.clmap_vname = null;
			
			this.selectable = false;
			this.onclick_function = function(sender){};
		}
		
		TLayerMultiLine.prototype.GetBounds = function()
		{
			var bounds_l = this.xx[0];
			var bounds_r = this.xx[0];
			var bounds_t = this.yy[0];
			var bounds_b = this.yy[0];
			for(var i=1;i<this.xx.length;i++) 
			{
				if(this.xx[i] < bounds_l) bounds_l = this.xx[i];
				if(this.xx[i] > bounds_r) bounds_r = this.xx[i];
				if(this.yy[i] > bounds_t) bounds_t = this.yy[i];
				if(this.yy[i] < bounds_b) bounds_b = this.yy[i];
			};
			return {Left:bounds_l,Right:bounds_r,Top:-1*bounds_t,Bottom:-1*bounds_b};
		}
		
		// установка 
		TLayerMultiLine.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
		
		// установка возможности кликать по линии
		TLayerMultiLine.prototype.SetSelectable = function(selectable, onclick_function)
		{
			this.selectable = selectable;
			if(onclick_function) this.onclick_function = onclick_function;
			if(this.parent != null) this.setDiv();
		}
		
		// инициализация DIV'а
		TLayerMultiLine.prototype.setDiv = function(div)
		{	
			var bounds_up = this.line_wi;
			if(div) this.parent = div;
			if(this.zoom == 0) return;
			
			for(var i=0;i<this.xx.length;i++)
			{
				this.xxpxls[i] = this.xx[i] / this.zoom - this.offset_x;
				this.yypxls[i] = this.yy[i] / this.zoom - this.offset_y;
			};
			
			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];
			var ittl = 0;
			
			var bnds = this.GetBounds();
			if((bnds.Right-bnds.Left)/this.zoom >= this.limiter || (bnds.Top-bnds.Bottom)/this.zoom >= this.limiter) return;
			
			for(ip=1;ip<this.xx.length;ip++)
			{				
				if(this.max_wh[ip-1] < 5 || this.max_wh[ip-1] < this.line_w) return;
		
				for(var i=0;i<this.max_ttl[ip-1];i++)
				{
					this.canvas_obj[ittl] = new TCanvas();
					var start_x = this.min_x[ip-1]+this.argx(ip,i);
					var start_y = this.min_y[ip-1]+this.argy(ip,i);
					this.canvas_obj[ittl].initSize(start_x-bounds_up,start_y-bounds_up,this.wi[ip-1] > this.limiter ? this.limiter : this.wi[ip-1],this.he[ip-1] > this.limiter ? this.limiter : this.he[ip-1]);
					this.canvas_obj[ittl].initDiv(this.parent);
					// this.canvas_obj[ittl].div.style.cursor = 'default';
				
					this.canvas_obj[ittl].div.style.zIndex = this.zIndex;
				
					//SET OWNER FOR CANVAS
					this.canvas_obj[ittl].div.owner = this;
					this.canvas_obj[ittl].canvas.owner = this;
				
					this.canvas_obj[ittl].CTX.lineWidth = this.line_wi;
					this.canvas_obj[ittl].CTX.strokeStyle = this.color;
					this.canvas_obj[ittl].CTX.beginPath();
					this.canvas_obj[ittl].CTX.moveTo(this.xxpxls[ip-1]-start_x+bounds_up,this.yypxls[ip-1]-start_y+bounds_up);
					this.canvas_obj[ittl].CTX.lineTo(this.xxpxls[ip]-start_x+bounds_up,this.yypxls[ip]-start_y+bounds_up);
					this.canvas_obj[ittl].CTX.closePath();
					this.canvas_obj[ittl].CTX.stroke();
					ittl++;
				};
			};
			this.SetVisible(this.visible);			
		}
		
		TLayerMultiLine.prototype.SetVisible = function(visible)
		{
			this.visible = visible;
			this.SetZoomIND();
			return;
			
			for(var i=0;i<this.canvas_obj.length;i++) 
			{
				this.canvas_obj[i].div.style.visibility = visible ? 'visible' : 'hidden';
				this.canvas_obj[i].div.style.display = visible ? 'block' : 'none';
			};
		}
		
		// Попадание в полилинию
		TLayerMultiLine.prototype.InPointPXLs = function(x,y,call_onclick,obj_index)
		{					
			xx = x * this.zoom;
			yy = -1 * (y+2) * this.zoom;
			for(var i=1;i<this.xx.length;i++)
			{
				if(xx >= this.minxx[i-1] && xx <= this.maxxx[i-1] && yy >= this.minyy[i-1] && yy <= this.maxyy[i-1])
				{
					var dx = (this.yy[i] - this.yy[i-1]) / (this.xx[i] - this.xx[i-1]);
					if(Math.abs((xx-this.xx[i-1])*dx + (this.yy[i-1]+yy)) < ((5+this.line_wi)*this.zoom))
					{
						if(this.selectable && call_onclick && this.visible) this.onclick_function(this,0,0);
						return true;
					}
				};
			};
			return false;
		}
		
		// убита ли линия?
		TLayerMultiLine.prototype.Killed = false;
		
		// события при убивании
		TLayerMultiLine.prototype.OnKill = function(sender) {  };
		
		// убить линию 
		TLayerMultiLine.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;

			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];						
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// Получение  точки
		TLayerMultiLine.prototype.GetXY = function(index)
		{
			return {x:this.xx[index],y:-1*this.yy[index]};
		}
		
		// Получение  числа точек
		TLayerMultiLine.prototype.GetXYCount = function()
		{
			return this.xx.length;
		}
		
		// установка ширины линии
		TLayerMultiLine.prototype.SetWidth = function(width)
		{
			this.line_wi = width;
			if(this.parent != null) this.setDiv();
		}
		
		
		// установка цвета линии
		TLayerMultiLine.prototype.SetColor = function(color)
		{
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка ширины линии и цвета
		TLayerMultiLine.prototype.SetWidthAndColor = function(width,color)
		{
			this.line_wi = width;
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка z-index'a
		TLayerMultiLine.prototype.SetZIndex = function(z_index)
		{
			this.zIndex = z_index;
			if(this.parent != null) this.setDiv();
		}
		
		TLayerMultiLine.prototype.SetOffset = function(off_x,off_y)
		{
			this.SetZoom(this.zoom,off_x,off_y);
		}
		
		// изменение зума карты
		TLayerMultiLine.prototype.SetZoom = function(zoom,off_x,off_y)
		{	
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;

			if(zoom) this.zoom = zoom;
			for(var i=0;i<this.xx.length;i++)
			{
				this.xxpxls[i] = this.xx[i] / this.zoom - this.offset_x;
				this.yypxls[i] = this.yy[i] / this.zoom - this.offset_y;
			};

			for(ip=1;ip<this.xx.length;ip++)
			{
				this.min_x[ip-1] = this.xxpxls[ip-1] < this.xxpxls[ip] ? this.xxpxls[ip-1] : this.xxpxls[ip];
				this.min_y[ip-1] = this.yypxls[ip-1]< this.yypxls[ip] ? this.yypxls[ip-1] : this.yypxls[ip];
		
				this.wi[ip-1] = Math.abs(this.xxpxls[ip]-this.xxpxls[ip-1]) + this.line_wi*2;
				this.he[ip-1] = Math.abs(this.yypxls[ip]-this.yypxls[ip-1]) + this.line_wi*2;
				this.max_wh[ip-1] = this.wi[ip-1] > this.he[ip-1] ? this.wi[ip-1] : this.he[ip-1];
		
				this.max_ttl[ip-1] = this.max_wh[ip-1] / this.limiter;
				if(this.max_wh[ip-1] % this.limiter > 0) this.max_ttl[ip-1] = parseInt(this.max_ttl[ip-1])+1;
		
				this.argx = new Function('ip,no','return '+(this.wi[ip-1]/this.max_ttl[ip-1])+'*no;');
				this.argy = new Function('ip,no','return '+(this.he[ip-1]/this.max_ttl[ip-1])+'*no;');
			};
			if(this.parent != null) this.setDiv();
		}
		
		// private
		TLayerMultiLine.prototype.SetZoomIND = function(ind)
		{
			if(ind || ind == 0) this.zoom_ind = ind;
			if(this.visible && this.zoom_min <= this.zoom_ind && this.zoom_max >= this.zoom_ind)
			{
				for(var i=0;i<this.canvas_obj.length;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'visible';
					this.canvas_obj[i].div.style.display = 'block';
				};
			}
			else
			{
				for(var i=0;i<this.canvas_obj.length;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'hidden';
					this.canvas_obj[i].div.style.display = 'none';
				};
			};
		}
		
		//public
		TLayerMultiLine.prototype.SetMinMaxZoom = function(min,max)
		{
			this.zoom_min = min;
			this.zoom_max = max;
			if(this.canvas_obj.length > 0) this.SetZoomIND();
		}