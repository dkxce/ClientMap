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
			
			class TLayerEllipse
			{
					// Инициализация линии... нач. и кон. точки, ширина линии, цвет, имя
				public void init(x,y,width,height,color,fiilcolor,name)
					// установка имени объекта clmap (vname)
				void setCLMAP(iClientMap clmap)
					// установка дива
				public void setDiv(div)
					// Установка зума
				public void SetZoom(zoom)
					// установка ширины в метрах
				public void SetWidth(line_width)
					// установка высоты в метрах
				public void SetHeight(line_width)
					// установка цвета границы
				public void SetColor(color)
					// установка цвета заливки
				public void SetFillColor(fillcolor)
					// установка цвета и ширины линии
				public void SetWidthHeightAndColor(line_width,line_color)
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
		
		function TLayerEllipse()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.type = 'TLayerEllipse';
			this.name = 'layerellipse_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			this.parent = null;
			this.zoom = 1;
			this.zoom_ind = 1;
			this.zoom_min = 0;
			this.zoom_max = 16;
			this.zIndex = 0;
			
			this.offset_x = 0;
			this.offset_y = 0;
			
			this.limiter = 4000; // canvas maxsize for FireFox
			this.canvas_obj = null;
		}
		
		TLayerEllipse.prototype = new TLayerObject();
		
		TLayerEllipse.prototype.init = function(x,y,width,height,color,fillcolor,name)
		{
			this.name = 'layerellipse_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			if(name) this.name = name;
			this.xx = x;
			this.yy = -1*y;
			this.wi_or = width;
			this.he_or = height;
			this.line_wi = this.wi_or / this.zoom;
			this.line_he = this.he_or / this.zoom;
			this.color = color;
			this.fillcolor = fillcolor;
			this.clmap_vname = null;
			
			this.limiter = 4000;
			
			this.selectable = false;
			this.onclick_function = function(sender){};
		}
		
		TLayerEllipse.prototype.GetBounds = function()
		{
			return {Left:this.xx-this.wi_or/2,Right:this.xx+this.wi_or/2,Top:-1*this.yy-this.he_or/2,Bottom:-1*this.yy+this.he_or/2};
		}
		
		// установка 
		TLayerEllipse.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
		
		// установка возможности кликать
		TLayerEllipse.prototype.SetSelectable = function(selectable, onclick_function)
		{
			this.selectable = selectable;
			if(onclick_function) this.onclick_function = onclick_function;
			if(this.parent != null) this.setDiv();
		}
		
		// инициализация DIV'а
		TLayerEllipse.prototype.setDiv = function(div)
		{	
			var bounds_up = this.line_wi;
			if(div) this.parent = div;
			if(this.zoom == 0) return;
			
			this.x = this.xx / this.zoom - this.offset_x;
			this.y = this.yy / this.zoom - this.offset_y;
			this.line_wi = this.wi_or / this.zoom;
			this.line_he = this.he_or / this.zoom;
		
			if(this.canvas_obj) this.canvas_obj.Kill();
			
			if(this.line_wi > this.limiter || this.line_he > this.limiter) return;
			
			this.canvas_obj = new TCanvas();
			this.canvas_obj.initSize(this.x - this.line_wi/2, this.y - this.line_he/2, this.line_wi,this.line_he);
			this.canvas_obj.initDiv(this.parent);
			// this.canvas_obj.div.style.cursor = 'default';
				
			this.canvas_obj.div.style.zIndex = this.zIndex;
				
				//SET OWNER FOR CANVAS
			this.canvas_obj.div.owner = this;
			this.canvas_obj.canvas.owner = this;
				
			this.canvas_obj.CTX.lineWidth = 1;
			this.canvas_obj.CTX.strokeStyle = this.color;
			this.canvas_obj.CTX.beginPath();
			this.canvas_obj.CTX.moveTo(0,this.line_he/2);
			this.canvas_obj.CTX.bezierCurveTo(0, this.line_he/2, 0, 0, this.line_wi/2, 0);
			this.canvas_obj.CTX.bezierCurveTo(this.line_wi/2, 0, this.line_wi, 0, this.line_wi, this.line_he/2);
			this.canvas_obj.CTX.bezierCurveTo(this.line_wi, this.line_he/2, this.line_wi, this.line_he, this.line_wi/2, this.line_he);
			this.canvas_obj.CTX.bezierCurveTo(this.line_wi/2, this.line_he, 0, this.line_he, 0, this.line_he/2);
			this.canvas_obj.CTX.closePath();
			this.canvas_obj.CTX.fillStyle = this.fillcolor;
			this.canvas_obj.CTX.fill();
			this.canvas_obj.CTX.stroke();
			
			// var img = new Image();
			// img.ctx = this.canvas_obj.CTX;
			// img.onload = function (){this.ctx.drawImage(this,0,0);};
			// img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
			// this.canvas_obj.DIV.style.border = 'dashed 1px black';
			
			this.SetVisible(this.visible);
		}
		
		TLayerEllipse.prototype.SetVisible = function(visible)
		{
			this.visible = visible;
			this.SetZoomIND();
			return;
			
			this.canvas_obj.div.style.visibility = visible ? 'visible' : 'hidden';
			this.canvas_obj.div.style.display = visible ? 'block' : 'none';
		}
		
		// Вхождение точки в эллипс (PXLS)
		TLayerEllipse.prototype.InPointPXLs = function(x,y,call_onclick,obj_index)
		{		
			x = x - this.offset_x;
			y = y - this.offset_y;
			//if(obj_index > 0) return false;
			if((Math.pow(x-this.x,2)/Math.pow(this.line_wi/2,2)+Math.pow(y-this.y,2)/Math.pow(this.line_he/2,2)) <= 1) 
			{	
				if(this.selectable && call_onclick && this.visible) this.onclick_function(this,0,0);
				return true;
			};
			return false;
		}
		
		TLayerEllipse.prototype.Killed = false;
		
		// события при убивании
		TLayerEllipse.prototype.OnKill = function(sender) {  };
		
		// убить
		TLayerEllipse.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;

			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// Получение стартовой точки
		TLayerEllipse.prototype.GetXY = function()
		{
			return {x:this.xx,y:-1*this.yy};
		}
		
		// установка ширины
		TLayerEllipse.prototype.SetWidth = function(width)
		{
			this.line_wi = width;
			if(this.parent != null) this.setDiv();
		}
		
		// установка высоты
		TLayerEllipse.prototype.SetHeight = function(height)
		{
			this.line_he = height;
			if(this.parent != null) this.setDiv();
		}
		
		
		// установка цвета линии
		TLayerEllipse.prototype.SetColor = function(color)
		{
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка цвета линии
		TLayerEllipse.prototype.SetFillColor = function(color)
		{
			this.fillcolor = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка ширины линии и цвета
		TLayerEllipse.prototype.SetWidthHeightAndColor = function(width,height,color)
		{
			this.line_wi = width;
			this.line_he = height;
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка z-index'a
		TLayerEllipse.prototype.SetZIndex = function(z_index)
		{
			this.zIndex = z_index;
			if(this.parent != null) this.setDiv();
		}
		
		TLayerEllipse.prototype.SetOffset = function(off_x,off_y)
		{
			this.SetZoom(this.zoom,off_x,off_y);
		}
		
		// изменение зума карты
		TLayerEllipse.prototype.SetZoom = function(zoom,off_x,off_y)
		{	
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;
			
			if(zoom) this.zoom = zoom;
			this.x = this.xx / this.zoom - this.offset_x;
			this.y = this.yy / this.zoom - this.offset_y;
			
			if(this.parent != null) this.setDiv();
		}
		
		// private
		TLayerEllipse.prototype.SetZoomIND = function(ind)
		{
			if(ind || ind == 0) this.zoom_ind = ind;
			if(this.visible && this.zoom_min <= this.zoom_ind && this.zoom_max >= this.zoom_ind)
			{
				this.canvas_obj.div.style.visibility = 'visible';
				this.canvas_obj.div.style.display = 'block';
			}
			else
			{
				this.canvas_obj.div.style.visibility = 'hidden';
				this.canvas_obj.div.style.display = 'none';
			};
		}
		
		//public
		TLayerEllipse.prototype.SetMinMaxZoom = function(min,max)
		{
			this.zoom_min = min;
			this.zoom_max = max;
			if(this.canvas_obj) this.SetZoomIND();
		}