/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

			/*
				interface TLayerObject()
				{
					setCLMAP(clmap);
					setDiv(div);
					SetZoom(zoom);
					SetVisible();
					Kill();
					string Hint;
					string name;
					string id;
				}
			*/
			
			function TLayerObject()
			{
				this.type   = 'TLayerObject';
				this.iface  = 'TLayerObject'; // интерфейс (прородитель)
				this.name   = 'LayerObject';
				this.id     = null;
				this.parent = null;
				this.clmap_vname  = null;
				this.visible = true;
			}
		
			TLayerObject.prototype.setDiv = function(div) {};
			TLayerObject.prototype.SetZoom = function(zoom) {};		
			TLayerObject.prototype.Kill = function() {};
			TLayerObject.prototype.setCLMAP = function(clmap) { this.clmap_vname = clmap; }
			TLayerObject.prototype.SetVisible = function(visible) { this.visible = visible; }
			TLayerObject.prototype.GetBounds = function() { return {Left:0,Right:0,Top:0,Bottom:0}; }
			
			// Событие при правом щелчке мыши, если возращает false - показываем стандартное меню браузера, если true - не показываем
			TLayerObject.prototype.onPopup = function(sender,x,y) { return false; };
			
			// Подсказка
			TLayerObject.prototype.Hint = '';
			
			/*
			public class Layers()
			{
				// Конструктор класса; div - контейнер слоев
				public Layres(object div)
				public setCLMAP(ClientMap clmap)
				
				// Добавление слоя
				public int Add(string layerName)
				public int Insert(string layerName, int index)
				
				// Меняем последовательность
				public bool Move(int from_index, int to_index)
				
				// Удаляем слой
				public bool Remove(int index)
				
				// Получаем DIV(контейнер) слоя
				public object GetDiv(int index)
				
				// Получаем имя слоя; null если нет
				public string GetLayerName(int index)
				
				// Получаем индекс слоя; -1 если нет
				public int GetLayerID(string name)
				
				// Устанавливаем видимость слоя
				public bool SetVisible(int index, bool visible)
				
				// Добавление точки в слой;  return point_id
				public int AddLayerObject(int index, TLayerObject object)
				
				// Удаление объекта из слоя
				public bool RemoveLayerObject(int index, TLayerObject object)
				
				// Удаление объекта из слоя
				public bool RemoveObject(TLayerObject object)
				
				// возвращает массив объектов слоя
				public object[] GetLayerObjects(int index)
				
				// возвращает объект с именем, если нет - null
				public object GetLayerObject(int index, string objname)
				
				// получаем список имен слоев
				public string[] GetLayersNames
				
				// получаем список ID div'ов слоев
				public string[] GetLayersDivIDs
				
				// получаем список объектов слоев
				public object[] [] GetLayersObjects
				
				// возвращает объект с именем, если нет - null
				public object FindObject(string objname)
				
				// возвращает номер слоя, в кот. находится объект, если не найден то -1
				public int FindObjectLayerId(object_name)
				
				// Пересчет точек слоя в новый зум
				public void SetZoom(double multier)
				
				// Получаем список объектов под точкой
				public obj[] GetObjectsInPointPXLs(x,y)
				// Получаем список объектов под точкой
				public obj[] GetObjectsInPoint(x_meters,y_meters)				
				
				// Получаем список видимых объектов под точкой
				public obj[] GetVisibleObjectInPoint(x,y)
				// Получаем список видимых объектов под точкой
				public obj[] GetVisibleObjectInPointPXLs(x_meters,y_meters)
				
				// Получаем список объектов карты из Bounds (координаты в метрах)
				public obj[] GetObjectsInBounds(x0_meters,y0_meters,x1_meters,y1_meters)
				// Получаем список объектов карты из Bounds
				public obj[] GetObjectsInBoundsPXLs(x0,y0,x1,y1)
				
				// Получаем список объектов слоя карты из Bounds (координаты в метрах)
				public obj[] GetLayerObjectsInBounds(id,x0_meters,y0_meters,x1_meters,y1_meters)
				// Получаем список объектов слоя карты из Bounds (координаты в метрах)
				public obj[] GetLayerObjectsInRect(id,rect)
				
				// Получаем список объектов карты из Bounds (координаты в метрах)
				public obj[] GetObjectsInRect(rect)
				
				// Получаем список видимых объектов карты из Bounds (координаты в метрах)
				public obj[] GetVisibleObjectsInBounds(x0_meters,y0_meters,x1_meters,y1_meters)
				// Получаем список видимых объектов карты из Bounds (координаты в метрах)
				public obj[] GetVisibleObjectsInBoundsPXLs(x0,y0,x1,y1)
																
				// Получаем список видимых объектов карты из Bounds (координаты в метрах)
				public obj[] GetVisibleObjectsInRect(rect)
				
				// Получаем список видимых объектов слоя карты из Bounds (координаты в метрах)
				public obj[] GetVisibleLayerObjectsInBounds(id,x0_meters,y0_meters,x1_meters,y1_meters)
				// Получаем список видимых объектов слоя карты из Bounds (координаты в метрах)
				public obj[] GetVisibleLayerObjectsInRect(id, rect)
			}
		*/
		
		function Layers(div)
		{			
			this.zoom = 1;
			this.type = 'TMapLayers';
			this.div = div;
			this.layers = []; // {name, id, div, points,}
			this.clmap = null;
			this.Bounds.parent = this;
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
		}
		
		Layers.prototype.setCLMAP = function(clmap)
		{
			this.clmap = clmap;
		}
		
		Layers.prototype.setCLMAPObj = function(clmapobj)
		{
			this.clmapobj = clmapobj;
		}
		
		// Создаем слой
		// return index
		Layers.prototype.Add = function(layerName)
		{
			for(var i=0;i<this.layers.length;i++) if(this.layers[i].name == layerName) return i;
		
			if(this.layers.length >= 256) throw "ELayersCountException - Maximum Layers Count is 256!";
		
			var _index = this.layers.length;
			var _id = 'lay_'+Math.round(Math.random()*10000)+'_'+Math.round(Math.random()*10000);
			var _lay = {name:layerName,id:_id,points:[],otypes:[0,0,0,0,0,0,0,0,0]};
			var el = document.createElement('div');
			el.id = _lay.id;
			el.style.position = 'absolute';
			el.style.left = '0px';
			el.style.top = '0px';
			el.style.zIndex = _index;
			this.div.appendChild(el);
			_lay.div = document.getElementById(_lay.id);
			//for(var i=0;i<this.div.childNodes.length;i++) alert(this.div.childNodes[i].id);
			this.layers[_index] = _lay;
			return _index;
		}
		
		// Создаем слой
		// return index
		Layers.prototype.Insert = function(layerName,index)
		{
			for(var i=0;i<this.layers.length;i++) if(this.layers[i].name == layerName) return i;
			
			if(this.layers.length >= 256) throw "ELayersCountException - Maximum Layers Count is 256!";
			
			if(this.layers.length == 0 || index > (this.layers.length-1)) return this.Add(layerName);
			var tmp_new_layer = this.layers[this.Add(layerName)];
			
			var tmp_layers = [];
			for(var i=0;i<this.layers.length-1;i++) tmp_layers[i >= index ? i+1 : i] = this.layers[i];
			tmp_layers[index] = tmp_new_layer;
			this.layers = tmp_layers;
			for(var i=0;i<this.layers.length;i++) this.layers[i].div.style.zIndex = i;
			return index;
		}
		
		// Меняем порядок слоев
		// return ok
		Layers.prototype.Move = function(from_index,to_index)
		{
			if(this.layers.length == 0) return false;
			if(from_index > (this.layers.length-1)) return false;
			
			var _to = to_index;
			if(_to > (this.layers.length-1)) _to = this.layers.length-1;
			if(_to < 0) _to = 0;
			
			var tmp_layers = [];
			for(var i=0;i<this.layers.length;i++) tmp_layers[i] = this.layers[i];
			tmp_layers[from_index] = this.layers[_to];
			tmp_layers[_to] = this.layers[from_index];
			this.layers = tmp_layers;
			for(var i=0;i<this.layers.length;i++) this.layers[i].div.style.zIndex = i;
			return true;
		}
		
		// Удаляем слой
		// return ok
		Layers.prototype.Remove = function(index,kill_obj)
		{
			if(index < 0 || index > (this.layers.length-1)) return false;

			var tmp_id = '0';
				
			var tmp_layers = [];
			var ii = 0;
			for(var i=0;i<this.layers.length;i++)  if(i != index) tmp_layers[ii++] = this.layers[i]; else 
			{
				tmp_id = this.layers[i].id;
				for(var i2=this.layers[i].points.length-1;i2>=0;i2--) 
				{
					if(this.layers[i] && this.layers[i].points[i2]) 
						{
							this.RemoveLayerObject(i,this.layers[i].points[i2]);
							if(kill_obj == true) if(this.layers[i].points[i2].Kill) this.layers[i].points[i2].Kill(this);
								//this.layers[i].points[i2].Kill(this.layers[i].points[i2]);
						};
				};
			};

			this.layers = tmp_layers;
			for(var i=0;i<this.layers.length;i++) this.layers[i].div.style.zIndex = i;
			
			for(var i=0;i<this.div.childNodes.length;i++) if(this.div.childNodes[i].id && this.div.childNodes[i].id == tmp_id) 
			this.div.removeChild(this.div.childNodes[i]);
			return true;
		}
		
		// Получаем DIV слоя
		// return object
		Layers.prototype.GetDiv = function(index)
		{
			if(index < 0 || index > (this.layers.length-1)) return null;
			return this.layers[index].div;
		}
		
		// Получаем массив имен слоев
		// string[]
		Layers.prototype.GetLayersNames = function()
		{
			var res = [];
			for(var i=0;i<this.layers.length;i++) res[i] = this.layers[i].name;
			return res;
		}
		
		// Получаем массив ID слоев
		// string[]
		Layers.prototype.GetLayersDivIDs = function()
		{
			var res = [];
			for(var i=0;i<this.layers.length;i++) res[i] = this.layers[i].id;
			return res;
		}
		
		// Получаем массив объектов слоев
		// objects[]
		Layers.prototype.GetLayersObjects = function()
		{
			var res = [];
			for(var i=0;i<this.layers.length;i++) res[i] = this.layers[i].points;
			return res;
		}
		
		// Получаем имя слоя
		// string
		Layers.prototype.GetLayerName = function(index)
		{
			if(index < 0 || index > (this.layers.length-1)) return null;
			return this.layers[index].name;
		}
		
		// Получаем индекс слоя
		// id; -1 если нет
		Layers.prototype.GetLayerID = function(name)
		{
			for(var i=0;i<this.layers.length;i++) if(this.layers[i].name == name) return i;
			return -1;
		}
		
		// устанавливаем видимость слоя
		// bool visibility
		Layers.prototype.SetVisible = function(index,visible)
		{
			if(index < 0 || index > (this.layers.length-1)) return null;
			if(visible || visible == undefined)
			{
				this.layers[index].div.style.visibility = 'visible';
				this.layers[index].div.style.display = 'block';
			}
			else
			{
				this.layers[index].div.style.visibility = 'hidden';
				this.layers[index].div.style.display = 'none';
			};
			return visible;
		}
		
		Layers.prototype.objects_ttl = 0;
		Layers.prototype.otypesMax = [1024,300,100,100,400,10,10,10,10];
		Layers.prototype.otypesTxt = ['Points','Lines','MultiLines','Polygons','Ellipses','InfoToolTips','InfoTips','InfoCaptionTips','HintTip'];
		
		// добавление объекта
		// return point_id
		Layers.prototype.AddLayerObject = function(index,point)
		{		
			var no_add = true;
			if(point.iface.indexOf('TLayerObject') >= 0) no_add = false;
			if(point.iface.indexOf('TInfoToolTip') >= 0) no_add = false;
			if(no_add) return -1;			
			
			if(index < 0 || index > (this.layers.length-1)) return false;
			
			var ii = this.layers[index].points.length;
			for(var i=0;i<ii;i++) if(this.layers[index].points[i].name == point.name) return i;
			for(var i=0;i<ii;i++) if(this.layers[index].points[i].id == point.id) return i;
			
			// CHECK
			if(this.objects_ttl >= 1500) throw "EDataCountException - Maximum Objects in Layers is 1500!";
			if(ii>=1024) throw "EDataCountException - Maximum Objects in Layer is 1024!";

			var otp = this.GetObjectType(point);
			
			if(this.layers[index].otypes[otp]>=this.otypesMax[otp]) throw "EDataCountException - Maximum "+this.otypesTxt[otp]+" in Layer is "+this.otypesMax[otp]+"!";
			// CHECK
			
			if(point.setCLMAP) point.setCLMAP(this.clmap);
			point.setDiv(document.getElementById(this.layers[index].id));
			point.SetZoom(this.zoom,this.clmapobj.opera_offset_x,this.clmapobj.opera_offset_y);
			if(point.SetZoomIND) point.SetZoomIND(this.clmapobj.zoomIndex);
			
			point.MapLayers = this;

			this.layers[index].points[this.layers[index].points.length] = point;
			this.layers[index].otypes[otp]++;
			this.objects_ttl++;
			return ii;
		}
		
		// public
		Layers.prototype.ClearLayer = function(index)
		{
			if(this.layers[index])
			{
				for(var i=this.layers[index].points.length-1;i>=0;i--)
				{
					var point = this.layers[index].points[i];
					var otp = this.GetObjectType(point);
					if(point.Kill) point.Kill();
							
					this.layers[index].otypes[otp]--;
					this.objects_ttl--;
				};
				this.layers[index].points = [];
				return true;
			};
			return false;
		}
		
		//private
		Layers.prototype.GetObjectType = function(point)
		{			
			var otp = 0;
			if(point.id.indexOf('layerline') >= 0)  otp = 1;
			if(point.id.indexOf('layermultiline') >= 0) otp = 2;
			if(point.id.indexOf('layerpolygon') >= 0) otp = 3;
			if(point.id.indexOf('layerellipse') >= 0) otp = 4;
			if(point.id.indexOf('TInfoToolTip') >= 0) otp = 5;
			if(point.id.indexOf('TInfoTip') >= 0) otp = 6;
			if(point.id.indexOf('TInfoCaptionTip') >= 0) otp = 7;
			if(point.id.indexOf('THintTip') >= 0) otp = 8;
			return otp;
		}
		
		// удаление объекта
		// bool
		Layers.prototype.RemoveLayerObject = function(index,point)
		{			
			var tmp_i = -1;
			for(var i=0;i<this.layers[index].points.length;i++) if(this.layers[index].points[i].id == point.id) tmp_i = i;
			if(tmp_i < 0) return false;
			
			var otp = this.GetObjectType(point);
			
			//point.Kill();
			/*
			if(point.Kill) 
				point.Kill(this);
			else if(this.layers[index].points[i].Kill) 
				this.layers[index].points[i].Kill();		
			*/
			
			if(this.layers[index]) this.layers[index].otypes[otp]--;
			this.objects_ttl--;
			
			if(this.layers[index])
			{
				var tmp_layers = [];
				var ii = 0;
				for(var i=0;i<this.layers[index].points.length;i++)  if(i != tmp_i) tmp_layers[ii++] = this.layers[index].points[i];
				this.layers[index].points = tmp_layers;
			};
			return true;
		}
		
		// удаление объекта
		// bool
		Layers.prototype.RemoveObject = function(point)
		{
			for(var a=0;a<this.layers.length;a++) if(this.RemoveLayerObject(a,point)) return true;
			return false;
		}
		
		// проверка слоев на удаленный объект
		Layers.prototype.RemoveObjID = function(oid)
		{		
			var id = oid;
			for(var i=this.layers.length-1;i>=0;i--)
			{
				if(this.layers[i])
				for(var i2=this.layers[i].points.length-1;i2>=0;i2--) 
					if(this.layers[i] && this.layers[i].points) 
						if(this.layers[i].points[i2].id == id) 
						{				
							this.RemoveLayerObject(i,this.layers[i].points[i2]);
						};
			};
		}

		// возвращает массив объектов слоя
		// return object[]
		Layers.prototype.GetLayerObjects = function(index)
		{
			if(index < 0 || index > (this.layers.length-1)) return [];
			return this.layers[index].points;	
		}
		
		// возвращает объект слоя по имени
		// return object or null
		Layers.prototype.GetLayerObject = function(index, pointname)
		{
			if(index < 0 || index > (this.layers.length-1)) return null;
			for(var i=0;i<this.layers[index].points.length;i++) if(this.layers[index].points[i].name == pointname) return this.layers[index].points[i];
			return null;	
		}
		
		// возвращает объект слоя по имени
		// return object or null
		Layers.prototype.FindObject = function(object_name)
		{
			for(var a=0;a<this.layers.length;a++)			
			for(var i=0;i<this.layers[a].points.length;i++) 
			if(this.layers[a].points[i].name == object_name) return this.layers[a].points[i];
			return null;	
		}
		
		// возвращает номер слоя, в кот. находится объект
		// return int or -1
		Layers.prototype.FindObjectLayerId = function(object_name)
		{
			for(var a=0;a<this.layers.length;a++)			
			for(var i=0;i<this.layers[a].points.length;i++) 
			if(this.layers[a].points[i].name == object_name) return a;
			return -1;	
		}
		
		// Установка отступов (Fuckin' Opera)
		Layers.prototype.SetOffset = function(offset_x,offset_y)
		{
			for(var i=0;i<this.layers.length;i++)
			{
				for(var ii=0;ii<this.layers[i].points.length;ii++) 
				{				
					var obj = this.layers[i].points[ii];
					if(obj.SetOffset) 
					{
						obj.SetOffset(offset_x,offset_y);
					};
				};
			};
		}
		
		// пересчет точек слоя в новый зум
		Layers.prototype.SetZoom = function(zoom)
		{
			this.zoom = zoom;
			for(var i=0;i<this.layers.length;i++)
			{
				for(var ii=0;ii<this.layers[i].points.length;ii++) 
				{
					var obj = this.layers[i].points[ii];
					obj.SetZoom(zoom,this.clmapobj.opera_offset_x,this.clmapobj.opera_offset_y);
					if(obj.SetZoomIND) obj.SetZoomIND(this.clmapobj.zoomIndex);
				};
			};
		}		

		// список объектов карты в bounds'ах (meters)
		Layers.prototype.GetObjectsInBounds = function(x0,y0,x1,y1)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = this.Bounds.GetBoundsXY(x0,y0,x1,y1);
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}
		
		// список объектов слоя карты в bounds'ах (meters)
		Layers.prototype.GetLayerObjectsInBounds = function(id,x0,y0,x1,y1)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = this.Bounds.GetBoundsXY(x0,y0,x1,y1);
			
				for(var ii=this.layers[id].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[id].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};

			return obj_array;
		}
		
		// список объектов карты в bounds'ах (meters)
		Layers.prototype.GetObjectsInRect = function(rect)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = rect;
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}
		
		// список объектов слоя карты в bounds'ах (meters)
		Layers.prototype.GetLayerObjectsInRect = function(id,rect)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = rect;
			
				for(var ii=this.layers[id].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[id].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};

			return obj_array;
		}
		
		// список объектов карты в bounds'ах (pxls)
		Layers.prototype.GetObjectsInBoundsPXLs = function(x0,y0,x1,y1)
		{
			return this.GetObjectsInBounds(x0 / this.clmapobj.zoom,-1 * y0 / this.clmapobj.zoom,x1 / this.clmapobj.zoom,-1 * y1 / this.clmapobj.zoom);
		}
		
		// список объектов карты в bounds'ах (pxls)
		Layers.prototype.GetLayerObjectsInBoundsPXLs = function(id,x0,y0,x1,y1)
		{
			return this.GetLayerObjectsInBounds(id, x0 / this.clmapobj.zoom,-1 * y0 / this.clmapobj.zoom,x1 / this.clmapobj.zoom,-1 * y1 / this.clmapobj.zoom);
		}
		
		// список видимых объектов карты в bounds'ах (meters)
		Layers.prototype.GetVisibleObjectsInBounds = function(x0,y0,x1,y1)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = this.Bounds.GetBoundsXY(x0,y0,x1,y1);
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && obj.visible && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}
		
		// список видимых объектов слоя карты в bounds'ах (meters)
		Layers.prototype.GetVisibleLayerObjectsInBounds = function(id,x0,y0,x1,y1)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = this.Bounds.GetBoundsXY(x0,y0,x1,y1);
			
				for(var ii=this.layers[id].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[id].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && obj.visible && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};

			return obj_array;
		}
		
		// список видимых объектов карты в bounds'ах (meters)
		Layers.prototype.GetVisibleObjectsInRect = function(rect)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = rect;
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && obj.visible && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}
		
		// список видимых объектов слоя карты в bounds'ах (meters)
		Layers.prototype.GetVisibleLayerObjectsInRect = function(id,rect)
		{
			var obj_count = 0;
			var obj_array = [];
			var bounds = rect;
			
				for(var ii=this.layers[id].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[id].points[ii];
					if(obj.GetBounds) 
					{						
						var bounds_obj = obj.GetBounds();
						if(bounds_obj && obj.visible && this.Bounds.CrossRectangles(bounds,bounds_obj)) obj_array[obj_count++] = obj;
					};
				};
			return obj_array;
		}
		
		// список видимых объектов карты в bounds'ах (pxls)
		Layers.prototype.GetVisibleObjectsInBoundsPXLs = function(x0,y0,x1,y1)
		{
			return this.GetVisibleObjectsInBounds(x0 / this.clmapobj.zoom,-1 * y0 / this.clmapobj.zoom,x1 / this.clmapobj.zoom,-1 * y1 / this.clmapobj.zoom);
		}
		
		
		// клик по карте
		Layers.prototype.CheckInPXLs = function(xx,yy,onclick,_follow)
		{
			var follow = false; // пропускать только одно событие если под мышкой несколько объектов
			if(_follow) follow = true;
			var obj_count = 0;
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.InPointPXLs) 
					{						
						var tofoll = obj.InPointPXLs(xx,yy,onclick,obj_count);
						if(tofoll) obj_count++;
						if(tofoll && follow && obj.visible) return obj_count;
					};
				};
			};
			return obj_count;
		}
		
		// popup menu по карте
		Layers.prototype.CheckInPXLsPopup = function(xx,yy,onclick,_follow)
		{
			var follow = false; // пропускать только одно событие если под мышкой несколько объектов
			if(_follow) follow = true;
			var obj_count = 0;
			var objs = [];
			var obj_popup = 0;
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.InPointPXLs) 
					{								
						var tofoll = obj.InPointPXLs(xx,yy,onclick,obj_count);
						if(tofoll) 
						{	
							objs[obj_count++] = obj;
							if(obj.visible) 
								if(!follow || (follow && obj_popup == 0))
									if(obj.onPopup) 
										if (obj.onPopup(this.clmapobj,this.clmapobj.global.mouse_x,this.clmapobj.global.mouse_y)) obj_popup++;
						};						
					};
				};
			};
			return {total:obj_count,popup:obj_popup,objects:objs};
		}
		
		// Получаем список объектов под точкой (метровые)
		Layers.prototype.GetObjectsInPoint = function(xx,yy)
		{
			return this.GetObjectsInPointPXLs(xx / this.clmapobj.zoom, -1 * yy / this.clmapobj.zoom);
		}
		
		// Получаем список объектов под точкой
		Layers.prototype.GetObjectsInPointPXLs = function(xx,yy)
		{
			var obj_count = 0;
			var obj_array = [];
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.InPointPXLs) 
					{						
						var tofoll = obj.InPointPXLs(xx,yy,false,obj_count);
						if(tofoll) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}
		
		// Получаем список видимых объектов под точкой (метровые)
		Layers.prototype.GetVisibleObjectInPoint = function(xx,yy)
		{
			return this.GetVisibleObjectInPointPXLs(xx / this.clmapobj.zoom, -1 * yy / this.clmapobj.zoom);
		}
		
		// Получаем список объектов под точкой
		Layers.prototype.GetVisibleObjectInPointPXLs = function(xx,yy)
		{
			var obj_count = 0;
			var obj_array = [];
			
			for(var i=this.layers.length-1;i>=0;i--)
			{
				for(var ii=this.layers[i].points.length-1;ii>=0;ii--) 
				{
					var obj = this.layers[i].points[ii];
					if(obj.InPointPXLs) 
					{						
						var tofoll = obj.InPointPXLs(xx,yy,false,obj_count);
						if(tofoll && obj.visible) obj_array[obj_count++] = obj;
					};
				};
			};
			return obj_array;
		}	
		
		/*
			//Работа с массивами
			public class SortArray
			{
					// добавление точки TLayerPoint
				void AddPoint(tlayerpoint)
					// добавление произвольного объекта
				void AddXY(x_meters,y_meters,_object)
					// установка сразу всего массива
				void SetLayerPointsArray(tlayerpoint[])
					// Очистка массива
				void Clear();
					// сортируем массив по удаленности от точки
				objs[] SortByDistance(x_meters,y_meters)
			}
		*/
		
		// Класс для работы с массивами
		function SortArray() { this.count = 0; this.arr = []; this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; }
		// добавление точки TLayerPoint
		SortArray.prototype.AddPoint = function(pnt) 
			{ this.arr[this.arr.length] = {x:pnt.x, y:pnt.y, el:pnt}; }
		// добавление произвольной точки
		SortArray.prototype.AddXY = function(pnt_x_meters,pnt_y_meters,_object) 
			{ this.arr[this.arr.length] = {x:pnt_x_meters, y:pnt_y_meters, el:_object}; }
		// устанавливаем сразу массив точек
		SortArray.prototype.SetLayerPointsArray = function(pnts)
			{ this.arr = []; for(var i=0;i<pnts.length;i++) this.arr[i] = {x:pnts[i].x,y:pnts[i].y,el:pnts[i]}; }
		// очищаем массив
		SortArray.prototype.Clear = function ()
			{ this.arr = []; }
		// сортируем массив по удаленности от точки
		SortArray.prototype.SortByDistance = function(x_meters,y_meters)
		{
			for(var i=0;i<this.arr.length;i++) this.arr[i].l = Math.sqrt(Math.pow(this.arr[i].x-x_meters,2)+Math.pow(this.arr[i].y-y_meters,2));
			// http://www.javascriptkit.com/javatutors/arraysort.shtml
			var ma = this.arr.sort( function SortArrayFunc01(a,b) { return (a.l-b.l); } );
			var res = []; for(var i=0;i<ma.length;i++) res[i] = ma[i].el; return res;
		}				

		
		// Bounds
		Layers.prototype.Bounds = new Bounds();
		
		
		/*
			// Работа с границами
			public class Bounds()
			{
				// Ширина зоны
				public int Width(bounds);
				// Высота зоны
				public int Height(bounds);
				
				// центр X зоны
				public int/double CenterX(bounds)
				// центр Y зоны
				public int/double CenterY(bounds)
				
				// границы слоя карты
				public {Left,Top,Bottom,Right} FromLayer(layer_id);
				// границы группы объектов
				public {Left,Top,Bottom,Right} FromObjects(objs_arr[]);
				
				// получение оптимального зума для отображения Rect'a при данных размерах карты
				public int OptimalZoom(bounds)
				
				// Bounds'ы карты
				public {Left,Top,Bottom,Right} MapBounds()
				
				// проверяем входит ли объект с координатами x_arr[] и y_arr[] в bounds
				public bool CrossXYArrayInBounds(x_arr[], y_arr[], x0, y0, x1, y1)
				// проверяем входит ли объект с координатами x_arr[] и y_arr[] в bounds
				public bool CrossXYArrayInRect(x_arr[], y_arr[], rect)
				
				// возвращаем Rectangle точки				
				public {Left,Top,Bottom,Right} GetDotBounds(x,y)
				// возвращаем Rectangle точек UL и BR
				public {Left,Top,Bottom,Right} GetBoundsXY(x0,y0,x1,y1)
				// возвращаем Rectangle полигонального объекта
				public {Left,Top,Bottom,Right} GetBoundsXYArr(x_arr[], y_arr[])
				
				// проверяем вхождение Rectangle'ов друг в друга
				public bool CrossRectangles(r1,r2)
				// Попадание точки в полигон
				public bool PointInPolygon(x,y,x_arr,y_arr)
				// Попадание точки в bounds'ы
				public bool PointInRect( x, y, rect)
				// Пересечение полигонов
				public bool CrossPolygons (x1_arr,y1_arr,x2_arr,y2_arr)
				
				// Возвращает общий Bounds для всех Bounds'ов в массиве
				public {Left,Top,Bottom,Right} TotalBounds(bounds_arr)
			}
		*/
		
		// Класс для работы с границами
		function Bounds() { this.parent = false; this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; return this; }
		
		// Ширина зоны
		Bounds.prototype.Width = function(rect) { return rect.Right-rect.Left; }
		
		// высота зоны
		Bounds.prototype.Height = function(rect) { return rect.Top-rect.Bottom; }
		
		// центр X зоны
		Bounds.prototype.CenterX = function(rect) { return (rect.Left+rect.Right)/2; };
		
		// центр Y зоны
		Bounds.prototype.CenterY = function(rect) { return (rect.Top+rect.Bottom)/2; };
		
		// границы слоя карты
		Bounds.prototype.FromLayer = function(id) // Bounds'ы слоя карты
		{				
			if(this.parent.layers.length < (this.parent.layers[id]+1)) return {Left:0,Top:0,Right:0,Bottom:0};
			
			var ttl_bounds = 0;
			var ttl_bounds_a = [];
			
			for(var ii=this.parent.layers[id].points.length-1;ii>=0;ii--)
			{						
				var obj = this.parent.layers[id].points[ii];						
				if(obj && obj.GetBounds) ttl_bounds_a[ttl_bounds++] = obj.GetBounds();
			};
			if(ttl_bounds == 0) return {Left:0,Top:0,Right:0,Bottom:0};
			return this.TotalBounds(ttl_bounds_a);
		}
		
		// границы группы объектов
		Bounds.prototype.FromObjects = function(objs_arr)
		{
			if(objs_arr.length == 0) return {Left:0,Top:0,Right:0,Bottom:0};
			
			var ttl_bounds = 0;
			var ttl_bounds_a = [];
			
			for(var i=0;i<objs_arr.length;i++) if(objs_arr[i].GetBounds) ttl_bounds_a[ttl_bounds++] = objs_arr[i].GetBounds();
			if(ttl_bounds == 0) return {Left:0,Top:0,Right:0,Bottom:0};
			return this.TotalBounds(ttl_bounds_a);
		}
		
		Bounds.prototype.OptimalZoom = function(rect)
		{	
			dx = rect.Right - rect.Left; dy = rect.Top - rect.Bottom;
			dx = (dx > dy ? dx : dy) / (this.parent.clmapobj.map_width > this.parent.clmapobj.map_height ? this.parent.clmapobj.map_width : this.parent.clmapobj.map_height );
			dy = this.parent.clmapobj.ZoomLevels[this.parent.clmapobj.ZoomLevels.length-1]; 
			for(var i=this.parent.clmapobj.ZoomLevels.length-1;i>=0;i--) if (this.parent.clmapobj.ZoomLevels[i] > dx) dy = this.parent.clmapobj.ZoomLevels[i];			
			return dy;
		}
		
		Bounds.prototype.MapBounds = function(b_left,b_top,b_right,b_bottom)
		{	
			var bl = b_left ? b_left : 0;
			var bt = b_top ? b_top : 0;
			var br = b_right ? b_right : 0;
			var bb = b_bottom ? b_bottom : 0;
			var res = {};
			res.Left = (this.parent.clmapobj.center_x - this.parent.clmapobj.map_width / 2 + bl) * this.parent.clmapobj.zoom;
			res.Right = (this.parent.clmapobj.center_x + this.parent.clmapobj.map_width / 2 - br) * this.parent.clmapobj.zoom;
			res.Top = (this.parent.clmapobj.center_y + this.parent.clmapobj.map_height / 2 - bt) * -1 * this.parent.clmapobj.zoom;
			res.Bottom = (this.parent.clmapobj.center_y - this.parent.clmapobj.map_height / 2 + bb) * -1 * this.parent.clmapobj.zoom;
			return res;
		}
		
		// Возвращает общий Bounds для всех Bounds'ов в массиве
		Bounds.prototype.TotalBounds = function(bounds_arr)
		{
			var bounds = {Left:bounds_arr[0].Left,Top:bounds_arr[0].Top,Right:bounds_arr[0].Right,Bottom:bounds_arr[0].Bottom};
			for(var i=1;i<bounds_arr.length;i++)
			{
				if(bounds_arr[i].Left < bounds.Left) bounds.Left = bounds_arr[i].Left;
				if(bounds_arr[i].Right > bounds.Right) bounds.Right = bounds_arr[i].Right;
				if(bounds_arr[i].Top > bounds.Top) bounds.Top = bounds_arr[i].Top;
				if(bounds_arr[i].Bottom < bounds.Bottom) bounds.Bottom = bounds_arr[i].Bottom;
			};			
			return bounds;
		}		
		
		// возвращаем Rectangle точек UL, BR или линии
		Bounds.prototype.GetBoundsXY = function( x0, y0, x1, y1)
		{
			return {Left:x0,Right:x1,Top:y1,Bottom:y0};
		}
		
		// возвращаем Rectangle для точки
		Bounds.prototype.GetDotBounds = function( x, y)
		{
			return {Left:x,Right:x,Top:y,Bottom:y};
		}
		
		// возвращаем Rectangle для полигонального объекта
		Bounds.prototype.GetBoundsXYArr = function( x_arr, y_arr)
		{
			var bounds_l = x_arr[0];
			var bounds_r = x_arr[0];
			var bounds_t = y_arr[0];
			var bounds_b = y_arr[0];
			for(var i=1;i<x_arr.length;i++) 
			{
				if(x_arr[i] < bounds_l) bounds_l = x_arr[i];
				if(x_arr[i] > bounds_r) bounds_r = x_arr[i];
				if(y_arr[i] < bounds_t) bounds_t = y_arr[i];
				if(y_arr[i] > bounds_b) bounds_b = y_arr[i];
			};
			return {Left:bounds_l,Right:bounds_r,Top:bounds_t,Bottom:bounds_b};
		}
		
		// проверяем Rectangle'ы на пересечение
		Bounds.prototype.CrossRectangles = function( r1, r2)
        {
			return (r1.Left < r2.Right) && (r2.Left < r1.Right) && (r1.Top < r2.Bottom) && (r2.Top < r1.Bottom);
        }
		
		// Попадание точки в полигон
		Bounds.prototype.CrossInPolygon = function( x, y, x_arr, y_arr)
		{
			var polygon = [];
			for(var i=0;i<x_arr.length;i++) polygon[i] = {X:x_arr[i],Y:y_arr[i]};
			return PointInPolygon( {X:x,Y:y}, polygon);
		}
		Bounds.prototype.PointInPolygon = function( x, y, x_arr, y_arr) { return this.CrossInPolygon(x,y,x_arr,y_arr); }
		
		// Попадание точки в bounds'ы
		Bounds.prototype.PointInRect = function( x, y, rect)
		{
			return (x < rect.Right) && (rect.Left < x) && (y < rect.Bottom) && (rect.Top < y);
		}
		
		// Пересечение полигонов
		Bounds.prototype.CrossPolygons = function( x1_arr, y1_arr, x2_arr, y2_arr)
		{
			var polygon1 = [];
			var polygon2 = [];			
			for(var i=0;i<x1_arr.length;i++) polygon1[i] = {X:x1_arr[i],Y:y1_arr[i]};
			for(var i=0;i<x2_arr.length;i++) polygon2[i] = {X:x2_arr[i],Y:y2_arr[i]};
			
			for(var i=0;i<polygon1.length;i++) if (PointInPolygon(polygon1[i],polygon2)) return true;
			for(var i=0;i<polygon2.length;i++) if (PointInPolygon(polygon2[i],polygon1)) return true;
			
			return false;
		}
		
		// попадаени границ объекта с координатами узлов x_arr и y_arr в bounds'ы (x0,y0,x1,y1)
		Bounds.prototype.CrossXYArrayInBounds = function( x_arr, y_arr, x0, y0, x1, y1)
		{						
			return this.CrossRectangles(this.GetBoundsXY(x0,y0,x1,y1),this.GetBoundsXYArr(x_arr,y_arr));
		}
		Bounds.prototype.XYArrayInBounds = function( x_arr, y_arr, x0, y0, x1, y1) { return this.CrossXYArrayInBounds( x_arr, y_arr, x0, y0, x1, y1); }
		
		// попадаение границ объекта с координатами x_arr и y_arr в rect
		Bounds.prototype.CrossXYArrayInRect = function( x_arr, y_arr, rect)
		{						
			return this.CrossRectangles(rect,this.GetBoundsXYArr(x_arr,y_arr));
		}
		Bounds.prototype.XYArrayInRect = function(x_arr, y_arr, rect) { return this.CrossXYArrayInRect(x_arr, y_arr, rect); }