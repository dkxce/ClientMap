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
			
			class TLayerPolygon
			{
					// Инициализация линии... нач. и кон. точки, ширина линии, цвет, имя
				public void init(xx[],yy[],line_width,line_color,fill_color,name)
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
					
					// установка обработчика onclick
					// onclick_function = function(sender){alert("Попал в "+sender.name);};
				public void SetSelectable(bool selectable, onclick_function)
				public void Kill()
				
					// EVENT
				OnKill = function(sender) {alert('Kill');};
								
					// убита?
				bool Killed;
			}
		*/
		
		function TLayerPolygon()
		{
			this.type = 'TLayerPolygon';
			this.name = 'layerpolygon_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
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
		
		TLayerPolygon.prototype = new TLayerObject();
		
		// инициализация линии
		TLayerPolygon.prototype.init = function(x_arr,y_arr,width,color,fillcolor,name)
		{
			this.name = 'layerpolygon_'+Math.round(Math.random()*100000)+'_'+Math.round(Math.random()*1000);
			this.id = this.name;
			
			this.xx_min = x_arr[0];
			this.xx_max = x_arr[0];
			this.yy_min = -1 * y_arr[0];
			this.yy_max = -1 * y_arr[0];
			this.xx_wi = 0;
			this.yy_he = 0;
			
			if(name) this.name = name;
			for(var i=0;i<x_arr.length;i++) 
			{
				this.xx[i] = x_arr[i];
				this.yy[i] = -1 * y_arr[i];
				// min max
				if(this.xx[i] < this.xx_min) this.xx_min = x_arr[i];
				if(this.xx[i] > this.xx_max) this.xx_max = x_arr[i];
				if(this.yy[i] < this.yy_min) this.yy_min = y_arr[i];
				if(this.yy[i] > this.yy_max) this.yy_max = y_arr[i];
			};
			
			this.xx[x_arr.length] = this.xx[0];
			this.yy[x_arr.length] = this.yy[0];
		
			this.line_wi = width;
			this.color = color;
			this.fillcolor = fillcolor;
			this.clmap_vname = null;
			
			this.selectable = false;
			this.onclick_function = function(sender){};
		}
		
		TLayerPolygon.prototype.GetBounds = function()
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
		TLayerPolygon.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
		
		// установка возможности кликать по линии
		TLayerPolygon.prototype.SetSelectable = function(selectable, onclick_function)
		{
			this.selectable = selectable;
			if(onclick_function) this.onclick_function = onclick_function;
			if(this.parent != null) this.setDiv();
		}
		
		// инициализация DIV'а
		TLayerPolygon.prototype.setDiv = function(div)
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
			
			var bnds = this.GetBounds();
			if((bnds.Right-bnds.Left)/this.zoom >= this.limiter || (bnds.Top-bnds.Bottom)/this.zoom >= this.limiter) return;
			
			this.canvas_obj = [];
			var ittl = 0;
			
			this.parent = document.getElementById(this.parent.id);
			if(this.parent && this.div_id)
			{
				for(var i=0;i<this.parent.childNodes.length;i++) if(this.parent.childNodes[i].id == this.id+'_b')
				this.parent.removeChild(this.parent.childNodes[i]);
			};
			
			tmpl = (this.xx_min / this.zoom - this.offset_x);
			tmpt = (-1* this.yy_min / this.zoom - this.offset_y);
			tmpx = [];
			tmpy = [];
			for(var i=0;i<this.xx.length;i++)
			{
				tmpx[i] = parseInt(this.xxpxls[i] - tmpl);
				tmpy[i] = parseInt(this.yypxls[i] - tmpt);
			};
			
			this.div = document.createElement('div');
			this.div_id = this.id+'_b';
			this.div.id = this.div_id;
			this.div.style.position = 'absolute';
			this.div.style.left = tmpl +'px';
			this.div.style.top = tmpt +'px';
			this.div.style.width = this.xx_wi +'px';
			this.div.style.height = this.yy_he +'px'
			this.div.style.zIndex = this.zIndex;			
			this.parent.appendChild(this.div);
			this.div.owner = this;			
			
			if(this.xx_wi > 0 && this.xx_wi < this.limiter && this.yy_he > 0 && this.yy_he < this.limiter)
			{
				//this.div.style.background = 'url(aspx/png.aspx?w='+this.xx_wi+'&h='+this.yy_he+'&x='+tmpx+'&y='+tmpy+') 0 0 no-repeat';
				this.fillcanvas = new TCanvas();
				this.fillcanvas.initSize(0,0,this.xx_wi,this.yy_he);
				this.fillcanvas.initDiv(this.div);
				
				this.fillctx = this.fillcanvas.CTX;
				this.fillctx.lineWidth = 0;
				this.fillctx.strokeStyle = this.color;
				this.fillctx.fillStyle =  this.fillcolor;
				this.fillctx.beginPath();
				this.fillctx.moveTo(this.xxpxls[0] - tmpl,this.yypxls[0] - tmpt);
				for(var i=1;i<this.xx.length;i++)
					this.fillctx.lineTo(this.xxpxls[i] - tmpl,this.yypxls[i] - tmpt);
				this.fillctx.fill();
				this.fillctx.stroke();
			};

			if(this.xx_wi >= this.limiter && this.yy_he >= this.limiter)
			{	
				  this.div.style.background = '#FF0000';
				  this.div.style.filter = 'alpha(opacity=50)';
				  this.div.style.opacity = 0.5;				
			};
			//this.div.innerHTML = '<img src="aspx/png.aspx?w='+this.xx_wi+'&h='+this.yy_he+'&x='+tmpx+'&y='+tmpy+'" border="0">';

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
					if(this.selectable && this.clmap_vname)
					{
						var dx = (this.yypxls[ip] - this.yypxls[ip-1]) / (this.xxpxls[ip] - this.xxpxls[ip-1]);
						var tmpf = ' var xy_map = '+this.clmap_vname+'.GetMapCenter(); var xy_mouse = '+this.clmap_vname+'.GetMouseXY(); if(Math.abs((xy_map.x+xy_mouse.x-('+(this.xxpxls[ip-1])+'))*'+dx+'+'+(this.yypxls[ip-1])+'-(xy_map.y+xy_mouse.y)) <= (5+'+this.line_wi+')) this.onuserclick(\''+this.name+'\',\''+this.id+'\',0,0); ';
						this.canvas_obj[ittl].div.onclick = new Function('event',tmpf);
					};
					this.canvas_obj[ittl].div.onuserclick = this.onclick_function;
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
		
		TLayerPolygon.prototype.SetVisible = function(visible)
		{
			this.visible = visible;
			this.SetZoomIND();
			return;
			
			for(var i=0;i<this.canvas_obj.length;i++) 
			{
				this.canvas_obj[i].div.style.visibility = visible ? 'visible' : 'hidden';
				this.canvas_obj[i].div.style.display = visible ? 'block' : 'none';
			};
			if(this.fillcanvas) 
			{
				this.fillcanvas.div.style.visibility = visible ? 'visible' : 'hidden';
				this.fillcanvas.div.style.display = visible ? 'block' : 'none';
			};
		}
		
		// убита ли линия?
		TLayerPolygon.prototype.Killed = false;
		
		// события при убивании
		TLayerPolygon.prototype.OnKill = function(sender) {  };
		
		// убить линию 
		TLayerPolygon.prototype.Kill = function(call_obj)
		{
			if(this.Killed) return;
			this.Killed = true;

			for(ivar in this.canvas_obj) this.canvas_obj[ivar].Kill();
			this.canvas_obj = [];
			
			if(call_obj == undefined || call_obj.type != 'TMapLayers') if(this.MapLayers) this.MapLayers.RemoveObject(this);
			if (this.OnKill) this.OnKill(this);
		}
		
		// Получение  точки
		TLayerPolygon.prototype.GetXY = function(index)
		{
			return {x:this.xx[index],y:-1*this.yy[index]};
		}
		
		// Получение  числа точек
		TLayerPolygon.prototype.GetXYCount = function()
		{
			return this.xx.length;
		}
		
		// установка ширины линии
		TLayerPolygon.prototype.SetWidth = function(width)
		{
			this.line_wi = width;
			if(this.parent != null) this.setDiv();
		}
		
		
		// установка цвета линии
		TLayerPolygon.prototype.SetColor = function(color,fillcolor)
		{
			this.color = color;
			this.fillcolor = fillcolor;
			if(this.parent != null) this.setDiv();
		}
		
		// установка ширины линии и цвета
		TLayerPolygon.prototype.SetWidthAndColor = function(width,color)
		{
			this.line_wi = width;
			this.color = color;
			if(this.parent != null) this.setDiv();
		}
		
		// установка z-index'a
		TLayerPolygon.prototype.SetZIndex = function(z_index)
		{
			this.zIndex = z_index;
			if(this.parent != null) this.setDiv();
		}
		
		TLayerPolygon.prototype.SetOffset = function(off_x,off_y)
		{
			this.SetZoom(this.zoom,off_x,off_y);
		}
		
		// изменение зума карты
		TLayerPolygon.prototype.SetZoom = function(zoom,off_x,off_y)
		{	
			if(off_x || off_x == 0) this.offset_x = off_x;
			if(off_y || off_y == 0) this.offset_y = off_y;

			if(zoom) this.zoom = zoom;
			for(var i=0;i<this.xx.length;i++)
			{
				this.xxpxls[i] = this.xx[i] / this.zoom - this.offset_x;
				this.yypxls[i] = this.yy[i] / this.zoom - this.offset_y;
			};
			this.xx_wi = parseInt(Math.abs(this.xx_max - this.xx_min) / this.zoom);
			this.yy_he = parseInt(Math.abs(this.yy_max - this.yy_min) / this.zoom);
			
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
		TLayerPolygon.prototype.SetZoomIND = function(ind)
		{
			if(ind || ind == 0) this.zoom_ind = ind;
			if(this.visible && this.zoom_min <= this.zoom_ind && this.zoom_max >= this.zoom_ind)
			{
				for(var i=0;i<this.canvas_obj.length;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'visible';
					this.canvas_obj[i].div.style.display = 'block';
				};
				if(this.fillcanvas) 
				{
					this.fillcanvas.div.style.visibility = 'visible';
					this.fillcanvas.div.style.display = 'block';
				};
			}
			else
			{
				for(var i=0;i<this.canvas_obj.length;i++) 
				{
					this.canvas_obj[i].div.style.visibility = 'hidden';
					this.canvas_obj[i].div.style.display = 'none';
				};
				if(this.fillcanvas) 
				{
					this.fillcanvas.div.style.visibility = 'hidden';
					this.fillcanvas.div.style.display = 'none';
				};
			};
		}
		
		//public
		TLayerPolygon.prototype.SetMinMaxZoom = function(min,max)
		{
			this.zoom_min = min;
			this.zoom_max = max;
			if(this.canvas_obj.length > 0) this.SetZoomIND();
		}
		
		// Вхождение точки в полигон (PXLS)
		TLayerPolygon.prototype.InPointPXLs = function(xx,yy,call_onclick,obj_index)
		{				
			var point = {X:parseInt(xx) - this.offset_x,Y:parseInt(yy)- this.offset_y};
			
			var polygonpoints = [];
			for(var i=0;i<this.xx.length-1;i++)
			{
				polygonpoints[i] = {X:this.xxpxls[i],Y:this.yypxls[i]};
			};	
			var in_ = PointInPolygon(point,polygonpoints);			
			if(in_ && call_onclick && this.visible) this.UserOnClick();
			return in_;
		}
		
		// return (r1.Left < r2.Right) && (r2.Left < r1.Right) && (r1.Top < r2.Bottom) && (r2.Top < r1.Bottom);
				
		//	Call User Click
		TLayerPolygon.prototype.UserOnClick = function()
		{
			if(this.selectable) this.onclick_function(this,0,0);
		}
						
		// число пересечений c отрезком; P, A1, A2 - points, ERR - ERROR
		function CRS(P,A1,A2)
		{
			var EPS = 0.0000001;
			var x = 0;
			var res = 0;
			if(Math.abs(A1.Y-A2.Y)<EPS) 
			{
				if((Math.abs(P.Y-A1.Y)<EPS) && ((P.X-A1.X)*(P.X-A2.X)<0.0)) res = -1;
				return res;
			};
			if((A1.Y-P.Y)*(A2.Y-P.Y)>0.0) return res;
			x = A2.X - (A2.Y-P.Y)/(A2.Y-A1.Y)*(A2.X-A1.X);
			if(Math.abs(x-P.X)<EPS) 
			{
				res = -1; 
			} 
			else
			{
				if(x<P.X)
				{
					res = 1;
					if((Math.abs(A1.Y-P.Y)<EPS) && (A1.Y<A2.Y)) res = 0; else
					if((Math.abs(A2.Y-P.Y)<EPS) && (A2.Y<A1.Y)) res = 0;
				};
			};
			return res;
		}
		
		// вхождение точки в полигон
		function PointInPolygon(point, polygonpoints)
		{
			var up = 0;
			count = 0;
			for(var i=0;i<polygonpoints.length-1;i++)
			{
				up = CRS(point,polygonpoints[i],polygonpoints[i+1]);
				if(up >= 0) count += up; else break;
			};
			up = CRS(point,polygonpoints[polygonpoints.length-1],polygonpoints[0]);
			if(up >= 0) 
				return ((count + up) & 1) == 1; 
			else return false;
		}
		