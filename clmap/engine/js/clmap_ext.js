/*******************************************
********************************************
	     Extended ClientMap JS Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

	// Поддержка плагинов введена в версии 1.4.0.8 //
	
	/* documentation
		
		// добавление плагина
		ClientMapExternalPlugins.push(
			{
				name: 'Plugin name',
				version: 'Plugin version',
				author: 'Plugin author',
				about: 'About text information',

				onstate: 'prototype function name on plugin get state',
					// ничего не передает, просто присабачивает onstate к вызову: ``return clmap.onstate``
					
				onclick: 'prototype function name on map click', 
					// params_obj.sender  params_obj.x  params_obj.y
				ondblclick: 'prototype function name on map double click', 
					// params_obj.sender  params_obj.x  params_obj.y
				onload: 'prototype function name on plugin load',
					// params_obj.sender (clmap obj)				
				onzoom: 'prototype function name on map change zoom', 
					// params_obj.zoom
				onmousedown: 'prototype function name on map mouse down', 
					// params_obj.sender  params_obj.x  params_obj.y
				onmouseup: 'prototype function name on map mouse up', 
					// params_obj.sender  params_obj.x  params_obj.y
				onsleep: 'prototype function name on mouse sleep', 
					// params_obj.sender  params_obj.x  params_obj.y
				onidle: 'prototype function name on mouse idle',
					// params_obj.sender  params_obj.x  params_obj.y
				onmapmovedSquared: 'prototype function name on map moved squared'
					// params_obj.sender
				onmapmoved: 'prototype function name on map moved',
					// params_obj.sender  params_obj.x  params_obj.y
			}
		);
		// во все функции передается параметр params_obj, кроме onstate
	*/
	
	// Координаты точек //
	ClientMapExternalPlugins.push( {name:'GeoClick Points',version:'0.2.1',author:'Milok Zbrozek',about:'<center>GeoClick Points v0.2.1<br/>Автор: Milok Zbrozek<br/></center><br/><i>Описание:</i> Плагин позволяет устанавливать временные точки на карту для определения координат этих точек.<br/><br/><i>Использование:</i> На панеле инструментов выберите соответствующий инструмент (`Получение координат точек`, если таковой имеется), либо в контекстном меню карты выберите пункт `Получение координат точек (инструмент)`. Откроется окошко `Координаты точек`. Кликнув по карте, на ней появится пронумерованная точка, ее координаты автоматически добавятся в список с уже ранее проставленными точками. Для отключения возможности установки точек, просто закройте окно с координатами или переключите инструмент карты на любой другой.',onclick:'GeoClickPointsClick',onstate:'GeoClickPoints'} );
	ClientMap.prototype.GeoClickPointsClick = function(params_obj)
	{
		if(this.nav_mode != 7) return;
					var sz_x = this.mouse_x-this.map_width/2+this.center_x;
					var sz_y = this.mouse_y-this.map_height/2+this.center_y;
					var tmp_w = this.ConvertPointToLatLon(sz_x*this.zoom,-1*sz_y*this.zoom);
					tmp_w.lat = Math.floor(tmp_w.lat*1000000)/1000000;
					tmp_w.lon = Math.floor(tmp_w.lon*1000000)/1000000;
					
					var nm7 = this.GeoClickPoints(); // CREATE NM7
					this.window_NM7_c++;
					var pid = IntToBase(this.window_NM7_c,10,2);
					var pnt01 = new TLayerPoint();
					pnt01.init(sz_x*this.zoom,-1*sz_y*this.zoom,'Точка_NM7_'+pid);
					pnt01.SetInnerHTML('<div border="0" style="position:absolute;left:-4px;top:-4px;width:80px;height:18px;background:url('+global_vars_array[0]+'engine/gif/dot8x8n.gif) 0px 0px no-repeat;font-size:12px;color:navy;">&nbsp;&nbsp;&nbsp;'+this.window_NM7_c+'</div><br/>');
					this.MapLayers.AddLayerObject(nm7,pnt01);
					pnt01.Hint = 'Координатная точка '+pid;
					pnt01.SetVisible(true);					
										
					if(this.window_NM7.dt) 
					{
						this.window_NM7.dt = false;
						this.window_NM7.DIV.innerHTML = '';
					};
					this.window_NM7.DIV.innerHTML += '<table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-bottom:solid 1px silver;"><tr><td rowspan="2" style="border-right:dashed 1px silver;font-size:12px;" width="30px" align="center">'+pid+'</td><td>&nbsp;&nbsp;<b>'+(tmp_w.lat >= 0 ? 'N' : 'S')+'</b> '+tmp_w.lat+' &ordm;</td></tr><tr><td>&nbsp;&nbsp;<b>'+(tmp_w.lon >= 0 ? 'E' : 'W')+'</b> '+tmp_w.lon + ' &ordm;</td></tr></table>';
					this.window_NM7.DIV.scrollTop = 1000000;
	};
	ClientMap.prototype.GeoClickPoints = function()
	{
					var nm7 = this.MapLayers.GetLayerID("window_NM7");
					if( !this.window_NM7 || (this.window_NM7 && this.window_NM7.killed) )
					{
						this.window_NM7_c = 0;
						this.window_NM7 = new TWindow();
						this.window_NM7.clmap = this;
						this.window_NM7.init(this.global.mouse_x+10,this.global.mouse_y-10,180,350);
						this.window_NM7.setDiv(document.getElementById('windowroot'));
						this.window_NM7.SetCaption('<b style="color:navy;font-size:14px;"> Координаты точек</b>');
						this.window_NM7.DIV.style.padding = '5px 5px 5px 5px';
						this.window_NM7.DIV.style.overflowY = 'auto';
						this.window_NM7.DIV.style.width = 163 + (this.ie ? 10 : 0);
						this.window_NM7.DIV.style.height = 310 + (this.ie ? 10 : 0);
						this.window_NM7.DIV.style.fontSize = '14px';
						this.window_NM7.ContainerDIV.style.zIndex = this.GetNext_zIndex();
						this.window_NM7.onclose = function(obj)
						{
							obj.clmap.MapLayers.Remove(obj.clmap.MapLayers.GetLayerID("window_NM7"));
							obj.clmap.NavigateMode(1);
						};											
						this.window_NM7.DIV.innerHTML = '<div align="center"><br/><br/>Для получения координат<br/>щелкните на карте мышкой.<br/><br/>Возможность двигать и<br/>зуммировать карту без<br/>необходимости переключения<br/>инструмента сохраняется!</div>';
						this.window_NM7.dt = true;
						if(nm7 < 0) nm7 = this.MapLayers.Add("window_NM7");
					};
					return nm7;
	}
	
	// Справка //
	ClientMapExternalPlugins.push( {name:'GeoClick Tool',version:'0.1',author:'Milok Zbrozek',about:'<center>GeoClick Tool v0.1<br/>Автор: Milok Zbrozek<br/></center><br/><i>Описание:</i> Плагин позволяет получать информацию об адресной точке, используя JSONGeocoder и директирву JSON Geocoding Engine сервиса Remote API Map Search JSON Service.<br/><br/><i>Использование:</i> На панеле инструментов выберите `Инструмент справка`. Для получения информации об объекте, щелкните на него один раз мышкой. При этом возможность навигации по карте (передвинуть, изменить зум) сохраняется.',onclick:'GEOClick',onstate:'GEOClick(null,true)'} );
	ClientMap.prototype.JGEO = false;
	ClientMap.prototype.GEOClick = function(params_obj,_check)
	{
		if(_check) return true;
		if(this.nav_mode != 6) return;
		
		var _x = (this.mouse_x-this.map_width/2+this.center_x) * this.zoom;
		var _y = (this.mouse_y-this.map_height/2+this.center_y) * this.zoom * -1;
		
		if(!this.JGEO) 
		{		
			this.JGEO = new JSONGeocoder();
			this.JGEO.URL = global_vars_array[2];
			this.JGEO.directURL = global_vars_array[3];
			this.JGEO.Tip = false;
			this.JGEO.ret_f = function(clmo,reto)
			{
				clmo.JGEO.result = reto;
				if(reto.items && reto.items.length > 0)
				{
					var itm = reto.items[0];
					var str = '<b>' + itm.name;
					if(itm.number.length > 0) str += ', '+itm.number;
					str += '</b><br/>';
					str += itm.parent;
				
					if(clmo.JGEO.Tip && (!clmo.JGEO.Tip.Killed)) clmo.JGEO.Tip.Kill();
					clmo.JGEO.Tip = new TClassicTip();
					clmo.JGEO.Tip.init(itm.x,itm.y,250,90,'white');
					var id = -1;
					if((id = clmo.MapLayers.GetLayerID("geocoderTip")) < 0) id = clmo.MapLayers.Add("geocoderTip");
					clmo.MapLayers.AddLayerObject(id,clmo.JGEO.Tip);				
					clmo.JGEO.Tip.DIV.style.fontSize = '13px';
					clmo.JGEO.Tip.DIV.innerHTML = str;
				}
				else
				{
					if(clmo.JGEO.Tip && (!clmo.JGEO.Tip.Killed)) clmo.JGEO.Tip.Kill();
					clmo.JGEO.Tip = false;
				};
			};
		};
		this.JGEO.Search(_x,_y,true,false,this.JGEO.ret_f,this,1);
	}