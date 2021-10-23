/******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

// Google Maps 
//   	http://code.google.com/apis/maps/
// Yandex Maps
//   	http://api.yandex.ru/maps/
//  	http://clubs.ya.ru/4611686018427393745/

/*
			ClientMap
			
			СТРУКТУРЫ
				// координаты мыши
			public mouse_event = {int x, int y};
			
			МЕТОДЫ:
				// Конструктор класса; variable_name - имя переменной хранения класса; ParseURL_disabled - выключение url-update
			public ClientMap(string variable_name, bool debug,ParseURL_disabled);
				// Инициализация карты; map_w, map_h
			public void init(int map_w, int map_h)
				// Инициализация зума; zoom - масштаб; zoom_no_scale_crop - селектор пропорционален сторонам растра; zoom_no_bounds - не ограничивать зум полем карты (динамически)
				// zoomformat = function(x,y,z) { return string}
			public void InitZoom(int zoom, string zoomformat, bool zoom_no_scale_crop, bool zoom_no_bounds)
				// инициализация границ карты в метрах
			public void InitMapBounds(int minx, int miny, int maxx, int maxy)
				//Выводим в документ объект карты
			public void writeMainDiv( int x_pos, int y_pos)
				// Устанавливаем размер отображаемой карты (динамически)
			public void SetSize(int w,int h)	
				// Сдвигаем объект карты по странице
			public void MoveMainDiv( int x_pos, int y_pos)
				// Загрузка XYZ карты из URL
			public bool LoadMapXYZfromURL()
			
				// Установка видимости зумов карты
			public void SetZoomsVisible(visible)
				// Установка видимости масштабной линейки
			public void SetZoomScaleVisible(visible)
				// Зум карты справа?
			public bool zoomScaleRight;
				// Зумы карты справа
			public bool zoomsRight;
				// Использовать растягивание и сжатие карты при изменении зума
			public bool UseZooming;
				// Максимальное количество записей в Истории Карты
			public	int MCXYZHistory_count
				
				// Установка видимости кнопки История Карты
			public void SetMapHistoryVis(bool isVis)
				// Получаем статус видимости кнопки История Карты
			public bool GetMapHistoryVis()
			
				// подготовка к печати
			public void SetToPrint(print_page)
				// вывать после печати
			public void ClearToPrint()
				

		NEW!!!
				// Устанавливает следующий зум и возвращает false или новый зум
			public int ZoomIn()
			public int ZoomOut()
				// Устанавливаем линейку зумов для карты; zoom_arr - массив зумов от # до ##
			public int[] SetZoomLevels(zoom_arr)
				// Устанавливаем зум из линейки зумов и возвращает false или новый зум
			public int SetZoomFromLevels(zoomlev)
				// Устанавливаем зум по индексу линейки зумов и возвращает false или новый зум
			public int SetZoomFromIndex(zoomlev)
			
			
			ФУНКЦИИ
				// Устанавливает и/или возвращает режим навигации по карте; 1 - Move/Shift; 2 - Zoom in; 3 - Zoom out; 4 - Zoom in point ;5 - Scale; 6 - Custom
				// 128..255 - Move/Shift Map for Extended Functions
			public int NavigateMode(int mode_no)
				|| Установка custom - курсора `style.cursor`
			public bool SetCustomCursor(custrom_cursor)
				// Установка и/или получение статус-текста
			public string StatusText(string str)
				// Получение текущих координат мыши над картой; экранные в сдвиге относительного центра карты
			public mouse_event GetMouseXY()
				// Получение текущих координат центра карты в пикселях
			public mouse_event GetMapCenter(rounded)
				// Получение текущих координат центра карты в метрах
			public mouse_event GetMapCenterInMeters(rounded)
				// Получение текущих координат центра карты в WGS-84
			public {lat,lon} GetMapCenterInLatLon(rounded)
				// Установка позиции карты в пикселях; x,y - координаты центра
			public SetMapCenter(int x, int y)
				// Установка позиции карты в метрах; x,y - координаты центра
			public SetMapCenterInMeters(int mx, int my)
				//	Установка позиции карты в WGS-84
			public SetMapCenterInLatLon(lat,lon)
				// Получение позиции события мышки (для FF)
			public mouse_event getEventPos = function(object evnt)
				// Возвращает объект класса ParseURL для движка, disabled - выключение url-update
			public ParseURL ParseURL(disabled)
				// Устанавливает видимость крестика по центру карты
			public SetMapCrossVisible(visible)
			
				//Получения расстояния между 2-мя точками
			public double GetDistanceInMeters(x0,y0,x1,y1)
				//Получения расстояния между 2-мя точками
			public double GetDistanceInLatLon(sLat,sLon,eLat,eLon)
				//Преобразование метровых координат в Lat Lon result: {lat,lon}
			public {lat,lon} ConvertPointToLatLon(x_meters,y_meters)
				//Преобразование Lat Lon в метровые координаты result: {x,y}
			public {x,y} ConvertLatLonToPoint(lat,lon)
			
				// Блокирует события мыши над картой
			public void BlockMouse()
				// Разблокирует события мыши над картой
			public void UnBlockMouse()
				// Статус блокировки мыши над картой
			public bool GetBlockMouse()
			
			СВОЙСТВА public
				// Массив зумов карты
			public int ZoomLevels
				// Zoom карты
			public int MapZoom
				// Возвращает объект класса Layers для джвижка
			public Layers MapLayers
			
				// взвращает следующий свободный zIndex
			public int GetNext_zIndex()
				// Отображать кнопочку вызова меню настройки параметров карты
			public bool ShowConfigButton(bool visible);
						
			СВОЙСТВА:
				// Вызов при клике события у всех объектов над картой в точке клика
			public bool MultiSelect;
				// Использование всплывающих подсказок
			public bool UseHint;
				// Испольщование ID в подсказках (если не указано св-во hint)
			public bool UseHintID;
				// Использование заголовка (Caption) в подсказках (если не указано св-во hint)
			public bool UseHintNoCaption;
				// В всплывающей подсказке выводится только Hint верхнего объекта
			public bool UseHint_OnlyTopItem;
				// Использовать Status Bar Tips
			public bool UseStatusBar;
				// Отключение всплывающих меню карты
			public bool DisableContextMenus;
			
			ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
				// показывает хинт (если не указан only_set_text, либо false) и перекрывает текст до тех пор, пока не будет вызвана HideMyHint()
			public ShowMyHint(text,only_set_text)
				// скрывает хинт и убирает перекрытие текста
			public HideMyHint()			
			
			Перекрытие:
				// используется при вызове подсказки, если возвращается пустая строка то не используется, internal_text - свой текст
				// по умолчанию возращает internal_text
				// objs - векторные объекты под курсором мыши
			public string GetHintText(internal_text,objs)
			
			СВОЙСТВА (read-only):
				// ширина карты
			public int map_width
				// высота карты
			public int map_height
				// положение карты
			public int map_left
			public int map_top
				// границы карты
			public int map_minx
			public int map_miny
			public int map_maxx
			public int map_maxy
				//контейнеры DIVов
			public object mainDiv
			public object zoomDiv
			public object coverDiv
			public objects overMapDiv
			public object rastrProtection
			public object rastrDiv
				// формат зума
			public string zoom_format
				// не ограничивать зум по карту
			public bool zoom_nobounds
				// не пропорциональный зум
			public bool zoom_nocrop
				// Мультискролл - сколько прокрутили мышку, столько раз и зум изменили. Иначе выжидаем таймаут.
			public bool ScrollMultiZoom;
			
				// 0,1,2 - reserved; установка флагов, который определяет события мыши над картой (true - перекрывать события; false - пропускать)
			public bool[] flag_ms_overs
			
			
			СОБЫТИЯ КАРТЫ:
				// событие при изменении инструмента
			public event onNavigationModeChanged	= function(sender,mode_no)
			
			MapEvents
				// нажимаем мышу на карты; x, y - координаты мыши относительно центра карты
			public event MapEvents.MouseDown 		= function( object sender, int x, int y) {}
				// отпускаем мышу на карте; x, y - координаты мыши относительно центра карты
			public event MapEvents.MouseUp 		= function( object sender, int x, int y) {}
				// клик; x, y - координаты мыши относительно центра карты
			public event MapEvents.MouseClick 		= function(object sender, int x, int y) {}
				// клик; x, y - координаты мыши относительно центра карты
			public event MapEvents.MouseDblClick		= function(object sender, int x, int y) {}
				// Начинаем двигать карту (нажимаем мышку); x, y - координаты мыши относительно центра карты
			public event MapEvents.MapMoveBegin	= function(object sender, int x, int y) {}
				// Отпускаем мышу на сдвинутой карте; x, y - величина сдвига карты
			public event MapEvents.MapMoved 		= function(object sender, int x, int y) {}
				// Сдвиг карты более чем на квадрат 256x256 пкс.
			public event MapEvents.MapMovedSquared	= function(object sender) {}
				// Изменен центр карты
			public event MapEvents.MapCenterChanged    = function(object sender, squared, fixed) {}
				// Движение мыжки над областью карты, ; x, y - координаты мыши относительно центра карты
			public event MapEvents.MouseMove 		= function( object sender, int x, int y) {}
				// Двигаем карту мышой; x, y - величина сдвига карты
			public event MapEvents.MapMove 		= function(object sender, int x, int y) {}
				// Отрабатывает изменение зума по навигатору +; wi - ширина нового растра; he - высота нового растра; map_cx, map_cy -центр нового растра 
			public event MapEvents.MapZoomIn		= function (object sender, int wi, int he, int map_cx, int map_cy) {}
				// Отрабатывает изменение зума по навигатору - ; x, y - координаты сдвига относительно центра карты
			public event MapEvents.MapZoomOut		= function (object sender, int x, int y) {}
				// Отрабатывает изменение зума по навигатору + без области выбора ; x, y - координаты сдвига относительно центра карты
			public event MapEvents.MapZoomInPxls	= function (object sender, int x, int y) {}
				// Отрабатывает изменение зума по скроллу; x, y - координаты сдвига относительно левого верхнего угла карты; direct - направление скролла
			public event MapEvents.MapZoomScroll   	= function (object sender, int x, int y, int direct) {}
				// Изменение зума
			public event MapEvents.ChangeZoom		= function(sender,new_zoom) {}
			
			ГЛОБАЛЬНЫЕ СОБЫТИЯ
			GlobalEvents
				// события от document
			public event GlobalEvents.Mouse_Move	= function(evnt) {};
			public event GlobalEvents.Mouse_Down 	= function(evnt) {};
			public event GlobalEvents.Mouse_Up  		= function(evnt) {};
			public event GlobalEvents.Key_Down 		= function(evnt) {};
			public event GlobalEvents.Key_Up     		= function(evnt) {};
			
			//PRIVATE
			object zoomscaleDIV
*/
		var const_e_length = 40030000; // not CONST for IE error
		var const_zoom_count = 17; // not CONST for IE error
		var const_zooms = [];
		for(var i=0;i<const_zoom_count;i++) const_zooms[i] = const_e_length / Math.pow(2,(const_zoom_count-1-i)+10);
		
		var global_vars_array = ['' /* Site Path */,'/_narezka_/' /* image server path */,'QRS/search.aspx' /*geocoder path*/,'QRS/search.aspx' /*geocoder XDomainRequest Path*/, [] /*  javascript load array onready */, [] /*  CSS load array onready */];
		
		// config in engine/xml/config.xml
				
		// ERROR CACHE
		var _ErrorCache = false;
		try { if(!$) $ = false } catch(e) {$ = false;};
		include(global_vars_array[0]+'engine/js/error_cache.js',-1); // Layers, Layers.Bounds, SortArray   // +++ CAN BE LOAD IN BOTT0M +++		
		
		// ClientMap Plug-Ins		
		include(global_vars_array[0]+'engine/js/layers.js'); // Layers, Layers.Bounds, SortArray
		include(global_vars_array[0]+'engine/js/clnav.js'); // ClienMapNavigator
		include(global_vars_array[0]+'engine/js/paneltools.js'); // PanelTools		
		includeCSS(global_vars_array[0]+'engine/css/paneltools.css'); // PanelTools css // +++ CAN BE LOAD IN BOTT0M +++
		
		// ClientMap Extended Plugins
		include(global_vars_array[0]+'engine/js/clmap_ext.js',-1); // +++ CAN BE LOAD IN BOTT0M +++
		
		// VECTOR
		include(global_vars_array[0]+'engine/js/canvas.js',-1); // TCanvas  // +++ CAN BE LOAD IN BOTT0M +++
		include(global_vars_array[0]+'engine/js/layerpoints.js',-1); // TLayerPoint  // +++ CAN BE LOAD IN BOTT0M +++		
		include(global_vars_array[0]+'engine/js/layerlines.js',-1); // TLayerLine, TLayerMultiLine		
		include(global_vars_array[0]+'engine/js/infotooltip.js',-1); // TInfoTip, TInfoCaptionTip, THintTip // +++ CAN BE LOAD IN BOTT0M +++			
		// include(global_vars_array[0]+'engine/js/layerellipse.js',-1); // TLayerEllipse  // +++ CAN BE LOAD IN BOTT0M +++
		// include(global_vars_array[0]+'engine/js/layerpolygon.js',-1); // TLayerPolygon  // +++ CAN BE LOAD IN BOTT0M +++
		
		// GRAPHICS LIBRARIES
		include(global_vars_array[0]+'engine/js/Graphics/newExcanvas.js',-1); // ExCanvas  // +++ CAN BE LOAD IN BOTT0M +++		
		include(global_vars_array[0]+'engine/js/Graphics/raphael.js',-1); // Raphael  // +++ CAN BE LOAD IN BOTT0M +++		
		
		// jQUERY		
		include(global_vars_array[0]+'engine/js/jQuery/jquery.js',-1); // +++ CAN BE LOAD IN BOTTOM +++
		include(global_vars_array[0]+'engine/js/jQuery/jquery.timers.js',-1); // +++ CAN BE LOAD IN BOTT0M +++
		include(global_vars_array[0]+'engine/js/jQuery/effects.core.js',-1);  // +++ CAN BE LOAD IN BOTT0M +++
		include(global_vars_array[0]+'engine/js/jQuery/effects.slide.js',-1);  // +++ CAN BE LOAD IN BOTT0M +++			
		// include(global_vars_array[0]+'engine/js/jQuery/jquery.flot.js',-1); // need newExcanvas.js !!!  // +++ CAN BE LOAD IN BOTT0M +++
				
		// MILOK PLUGINS
		include(global_vars_array[0]+'engine/js/twindow.js'); // TWindow, TDialog, MiniPopupToolTip
		include(global_vars_array[0]+'engine/js/parseurl.js'); // ParseURL
		include(global_vars_array[0]+'engine/js/tpopupmenu.js'); // TPopupMenu
		include(global_vars_array[0]+'engine/js/cookies.js'); // ClientCookie
		include(global_vars_array[0]+'engine/js/scroll.js'); // documentScroll
		include(global_vars_array[0]+'engine/js/xml_xslt.js'); // XSLTParser, XMLConverter, JSLTConverter (use JSLT.js)
		// include(global_vars_array[0]+'engine/js/vector_utils.js',-1); // RotatedImage, SpinnerBar, TGaugeBar, TLoadingBar  // +++ CAN BE LOAD IN BOTT0M +++
		
		include(global_vars_array[0]+'engine/js/JSONSearchClient.js',-1); // +++ CAN BE LOAD IN BOTT0M +++ 

		// Other
		// include(global_vars_array[0]+'engine/js/JSLT.js',-1); // JSLT Parser  // +++ CAN BE LOAD IN BOTT0M +++
		// include(global_vars_array[0]+'engine/js/md5.js',-1);  // +++ CAN BE LOAD IN BOTT0M +++
		
		// Последовательность для ClientMap'a
		// new ClientMap() -> init() -> InitMapBounds() -> writeMainDiv -> !!! Только после все остальные методы !!! -> SetZoomLevels() -> InitZoom() / SetZoomFromLevels()-> SetMapCenter() ->
		
		// Конструктор класса
		// PUBLIC
		function ClientMap(variable_name,debug_mode,ParseURL_disabled)
		{		
			this.year = new Date().getYear();
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.Assembly = {Title:'ClientMap',Description:'ClientMap JS Engine',Company:'milokz@gmail.com',Product:'ClientMap Map/JS Framework',Copyright:'Copyright © milokz@gmail.com 2009',Trademark:'milokz@gmail.com',Author:'Milok Zbrozek',Version:'1.8.1.13[e] Beta',VersionDate:'27.03.2009',Watermark:'Copyright &copy; '+(this.year < 1000 ? this.year+1900 : this.year)+' milokz@gmail.com'};
			this.vname = variable_name;
			// about:config
			this.ua = navigator.userAgent;
			
			this.debug = debug_mode || this.ua.indexOf('clmap') > 0;
			
			this.ns = ((this.ua.indexOf("etscape") > 0) || (this.ua.indexOf("irefox") > 0));
			this.km = (this.ua.indexOf("K-Meleon") > 0);
			this.sm = (this.ua.indexOf("SeaMonkey") > 0);
			this.ie = (this.ua.indexOf("MSIE") > 0);
			this.op = (this.ua.indexOf("pera") > 0);
			
			this.opera_offset_x = 0;
			this.opera_offset_y = 0;
			this.prev_opera_offset_x = 0;
			this.prev_opera_offset_y = 0;
			
			this.border = 'solid 1px gray';
			this.nav_mode = 1;
			this.custom_cursor = "default";
			if(this.op) this.ns = true;
			this.init();
			this.Configuration.clmap = this;
			this.configurate();
			
			// URL INIT
			this.url = ParseURL_disabled ? {} : new ParseURL();
			this.url_update = ParseURL_disabled ? false : true;
			this.url_latlon = true;
			
			// 1-30 зарезервированы картой
			this.next_zIndex = 31;
			
			// CONFIG
			this.XMLConverter = new XMLConverter();
			this.XMLConfig = {};
			
			return this;
		}
		
		// плагины
		ClientMapExternalPlugins = [];
		ClientMap.prototype.LoadExtPlugins = function()
		{
			for(var i=0;i<ClientMapExternalPlugins.length;i++)
				if(ClientMapExternalPlugins[i].onload)
					(new Function('sender',this.vname+'.'+ClientMapExternalPlugins[i].onload+'({sender:sender});'))(this);
		}		
		ClientMap.prototype.GetExtPluginAbout = function(index)
		{
			var wabout = new TWindow();
			wabout.init(this.map_left + this.map_width/2-200,this.map_top+this.map_height/2-200,420,350);
			wabout.setDiv(document.getElementById('windowroot'));
			wabout.SetCaption('<b style="color:black;font-size:13px;font-family:MS Sans Serif,Arial,Verdana;">Плагины</b>')			
			wabout.DIV.style.padding = '5px 5px 5px 5px';
			wabout.DIV.style.fontSize = '14px';
			wabout.DIV.innerHTML = '<center>Информация о плагине <br/> <b>'+ClientMapExternalPlugins[index].name+'</b><br/><br/><div style="font-size:14px;border-top:solid 1px #AAAAAA;width:340px;height:250px;overflow-y:scroll;overflow-x:none;" align="justify">'+ClientMapExternalPlugins[index].about+'</div></center>';
			wabout.ContainerDIV.style.zIndex = this.GetNext_zIndex();
		}
		ClientMap.prototype.GetExtPlugins = function()
		{
			var text = '<ul style="list-style:none;padding:0;">';
			for(var i=0;i<ClientMapExternalPlugins.length;i++)
			{
				var pinfo = ClientMapExternalPlugins[i];
				var check = new Function('','return '+this.vname+'.'+pinfo.onstate+';');
				text += '<li><a href="#" onclick="'+this.vname+'.GetExtPluginAbout('+i+');return false;" title="О плагине...">' + pinfo.name + '</a> v' + pinfo.version + ' &nbsp;(author: ' + pinfo.author + ') - '+(check()?'подключен':'отключен')+'</li>';
			};
			text += '</ul>';
			return text;
		}
		ClientMap.prototype.CallExtPlugins = function(methodName,params_obj)
		{
			for(var i=0;i<ClientMapExternalPlugins.length;i++)
			if(ClientMapExternalPlugins[i][methodName])
			  (new Function('params_obj',this.vname+'.'+ClientMapExternalPlugins[i][methodName]+'(params_obj);'))(params_obj);
		}
		
		ClientMap.prototype.type = 'ClientMap';		
		
		//private PREDIRECT
		ClientMap.prototype.predirect = {};
		
		// public 
		ClientMap.prototype.LoadConfig = function(file_name)
		{
			// http://beta.eatlas.ru/IMAGES/
			var tmp_file = this.url.getHashParam('config');			
			var fname = file_name ? file_name : global_vars_array[0]+'engine/xml/config.xml';
			if(!file_name) if(tmp_file) fname = tmp_file;
			if(fname == 0) fname = global_vars_array[0]+'engine/xml/config.xml';
			this.XMLConfig = this.XMLConverter.fromXMLFile(fname).ClientMap.configuration;			
			
			//this.url.setHashParam('config',fname);
			//this.url.SetLoc();
			
			if(this.XMLConfig) this.ShowImgsBorderVis(this.debug = this.XMLConfig['@debug']);
			
			if(this.XMLConfig.init)
			{
				this.MultiSelect = this.XMLConfig.init['@MultiSelect'] == true;
				this.UseHint = this.XMLConfig.init['@UseHint'] == true;
				this.UseHint_OnlyTopItem = this.XMLConfig.init['@UseHint_OnlyTopItem'] == true;
				this.UseHintID = this.XMLConfig.init['@UseHintID'] == true;
				this.UseHintNoCaption = this.XMLConfig.init['@UseHintNoCaption'] == true;
				this.UseStatusBar = this.XMLConfig.init['@UseStatusBar'] == true;
				this.UseZooming = this.XMLConfig.init['@UseZooming'] == true;
				this.ScrollMultiZoom = this.XMLConfig.init['@ScrollMultiZoom'] == true;
				this.SetMapCrossVisible(this.XMLConfig.init['@SetMapCrossVisible'] == true);
				this.MapCrossBypass = this.XMLConfig.init['@MapCrossBypass'] == true;
				this.ShowConfigButton(this.XMLConfig.init['@ShowConfigButton'] == true);
				this.DisableContextMenus = this.XMLConfig.init['@DisableContextMenus'] == true;
				this.SetMapHistoryVis(this.XMLConfig.init['@SetMapHistoryVis'] == true);
				this.NoImageCache = this.XMLConfig.init['@NoImageCache'] == true;
			};
			
			if(this.XMLConfig.elements)
			{
				if(this.zoomScaleRight != this.XMLConfig.elements['@zoomScaleRight'])
				{
					this.zoomScaleRight = this.XMLConfig.elements['@zoomScaleRight'] == true;
					this.MoveMainDiv(this.map_left,this.map_top);
				};
				if(this.zoomsRight != this.XMLConfig.elements['@zoomsRight'])
				{
					this.zoomsRight = this.XMLConfig.elements['@zoomsRight'] == true;
					if(this.rightStatusDiv) this.rightStatusDiv.style.left = this.zoomsRight ? this.map_width-35 : 2;
				};
			};
			
			if(this.XMLConfig.PrintableArea)
			{
				this.PrintableAreaX = this.XMLConfig.PrintableArea['@width'];
				this.PrintableAreaY = this.XMLConfig.PrintableArea['@height'];
			};
			
			if(this.XMLConfig.zoom)
			{
				this.zoom_scale_visible = this.XMLConfig.zoom['@zoom_scale_visible'] == true;
				this.SetZoomsVisible(this.XMLConfig.zoom['@zoom_levels_visible'] == true);
				this.zoom_nobounds = this.XMLConfig.zoom['@zoom_nobounds'] == true;
				this.zoom_nocrop = this.XMLConfig.zoom['@zoom_nocrop'] == true;
			};
			
			if(this.XMLConfig.MaxCookiesSaves) this.Configuration.MaxCookiesSaves = this.XMLConfig.MaxCookiesSaves;			
			
			if(this.XMLConfig.imagePath) global_vars_array[1] = this.XMLConfig.imagePath;
			if(this.XMLConfig.geocoderPath) global_vars_array[2] = this.XMLConfig.geocoderPath;
			if(this.XMLConfig.geocoderXPath) global_vars_array[3] = this.XMLConfig.geocoderXPath;
			
			if(this.XMLConfig.mapborder) this.mainDiv.style.border = this.XMLConfig.mapborder;
			
			if(this.XMLConfig.MCXYZHistory_count) this.MCXYZHistory_count = this.XMLConfig.MCXYZHistory_count;
						
			// Status Bar Hints
			if(this.XMLConfig.StatusBarHints) 
			{
				if(this.XMLConfig.StatusBarHints.length) this.StatusBarHints = this.XMLConfig.StatusBarHints;
				if(this.XMLConfig.StatusBarHints.item) this.StatusBarHints = this.XMLConfig.StatusBarHints.item;
			};
			
			if(this.ie) 
			{
				this.StatusBarHints.push('Для использования полной функциональности установите <a href="http://www.mozilla-europe.org/ru/firefox/" target="_blank">Firefox!</a>');
				this.StatusBarHints.push('Карта работает криво?! Не мучайтесь!!! Установите <a href="http://www.mozilla-europe.org/ru/firefox/" target="_blank">Firefox!</a>');
			};
			
			// Mouse Sleep Time
			if(this.XMLConfig.MouseSleepTime) this.MouseSleepTime = this.XMLConfig.MouseSleepTime;
			
			// ClientMap Navigator
			//if(navigator.userAgent.indexOf('Chrome') < 0)
			if(this.XMLConfig.Navigator && this.XMLConfig.Navigator['@mode'] == 'auto' && this.clnav == undefined)
			{
				this.clnav = new ClientMapNavigator(this.vname+'.clnav',this,5);
				
				var onl = true;
				var ont = false;
				var nwi = 140;
				var nhe = 100;
				
				if(this.XMLConfig.Navigator.ModeAuto) 
				{
					onl = this.XMLConfig.Navigator.ModeAuto['@onleft'] == false ? false : true;
					ont = this.XMLConfig.Navigator.ModeAuto['@ontop'] == false ? false : true;
					if(this.XMLConfig.Navigator.ModeAuto['@width']) nwi = this.XMLConfig.Navigator.ModeAuto['@width'];
					if(this.XMLConfig.Navigator.ModeAuto['@height']) nhe = this.XMLConfig.Navigator.ModeAuto['@height'];
				};
				
				this.clnav.initAttached(onl, ont, nwi, nhe, true);
				
				
				// PREDIRECT
				var pfile = global_vars_array[0]+'engine/json/predirect.json';
				if(this.XMLConfig.predirect)
				{
					var fn = this.XMLConfig.predirect['@file'];
					if(fn && (fn.length > 0)) pfile = fn;
				};
				
				// LOAD PREDIRECT
				try { this.predirect = LoadJSONFile(pfile,this); }
				catch(e) { if(_ErrorCache) _ErrorCache.Add(e, {file: 'clmap.js', 'class': 'ClientMap', object: this, line:928} ); };
			};
			
			// PanelTools
			if(this.XMLConfig.PanelTools && this.XMLConfig.PanelTools['@mode'] == 'auto' && this.paneltools == undefined)
			{
				var ptleft = 5;				
				var pttop = 5;
				if(this.XMLConfig.PanelTools.ModeAuto) 
				{
					var tmp = this.XMLConfig.PanelTools.ModeAuto['@left'];
					if(tmp != undefined) ptleft = tmp;
					tmp = this.XMLConfig.PanelTools.ModeAuto['@top'];
					if(tmp != undefined) pttop = tmp;
					
					if(!this.zoomsRight)
					{
						if(this.rightStatusDiv) this.rightStatusDiv.style.top = 30;
						if(this.rightStatusDiv) this.rightStatusDiv.style.left = ptleft-1;
					}
					else
					{
						if(this.rightStatusDiv) this.rightStatusDiv.style.top = 5;
					};
				};
				
				this.paneltools = new PanelTools(this.vname+'.paneltools',this);
				this.paneltools.attached = true;
				this.paneltools.attached_left = ptleft;
				this.paneltools.attached_top = pttop;
				this.paneltools.LT(this.map_left+ptleft,this.map_top+pttop);
				this.paneltools.Create();
				
				if(this.XMLConfig.PanelTools.tool && this.XMLConfig.PanelTools.tool.length>0)
				for(var i=0;i<this.XMLConfig.PanelTools.tool.length;i++)
				{
					var nod = this.XMLConfig.PanelTools.tool[i];
					this.paneltools.SetVisTool(nod['@no'],nod['@visible'] == true);
					this.paneltools.SetLock(nod['@no'],nod['@locked'] == true);
				};						
				
				if(this.XMLConfig.PanelTools.options)
				{
					this.paneltools.demo = !(this.XMLConfig.PanelTools.options['@demo'] == false);
					this.paneltools.enable_captions = this.XMLConfig.PanelTools.options['@enable_captions'] == true;
					this.paneltools.allow_all_window = !(this.XMLConfig.PanelTools.options['@allow_all_window'] == false);
					this.paneltools.fucking_tip = !(this.XMLConfig.PanelTools.options['@simple'] == false);
					this.paneltools.fucking_hide = (this.XMLConfig.PanelTools.options['@onclick'] == false);
				};
				if(navigator.userAgent.indexOf('Chrome') > 0) this.paneltools.SetVisTool(4,false);
				if(navigator.userAgent.indexOf('Safari') > 0) this.paneltools.SetVisTool(4,false);
			};
						
			// Scripts
			if(this.XMLConfig && this.XMLConfig.script)			
			{		
				if(this.XMLConfig.script.length == 0 && this.XMLConfig.script.value.length > 0)
				{
					var fs = new Function('',this.XMLConfig.script.value);
					setTimeout(this.XMLConfig.script.value,parseInt(this.XMLConfig.script['@timeout']));
				};
				for(var i=0;i<this.XMLConfig.script.length;i++) if(this.XMLConfig.script[i].value.length > 0)
				{			
					var fs = new Function('',this.XMLConfig.script[i].value);
					setTimeout(this.XMLConfig.script[i].value,parseInt(this.XMLConfig.script['@timeout']));
				};
			};
		}
		
		//private
		ClientMap.prototype.ShowImgsBorderVis = function(isVis)
		{
			this.debug = isVis == true;
			for(var y=0;y<this.images_array_y;y++)
				for(var x=0;x<this.images_array_x;x++)
				{
					this.images_array[y][x].img.style.border = isVis ? 'dashed 1px red' : 'none';
					// multi layers++
					//if(this.support_multi_layers) 
					//	for(var i=0;i<this.rastrLayers.length;i++)  
					//		this.rastrLayers[i].images[y][x].style.border = isVis ? 'dashed 1px white' : 'none';
					// --multi layers
				};
		};
		
		//public
		ClientMap.prototype.ToString = function(noCopy)
		{
			var txt = this.Assembly.Title+' ('+(this.Assembly.Description)+') version '+this.Assembly.Version;
			if(noCopy != true) txt += ' \n'+this.Assembly.Copyright;
			return txt;
		}
		
		// Вызов при клике события у всех объектов над картой
		ClientMap.prototype.MultiSelect = true;
		
		// CALCULATE OPERA OFFSET
		ClientMap.prototype.ReOpera = function(xx,yy)
		{
			if((!this.op) && (navigator.userAgent.indexOf('Chrome') < 0) && (navigator.userAgent.indexOf('Safari') < 0)) return true;
			
			var x = xx ? xx : this.center_x;
			var y = yy ? yy : this.center_y;
			
			this.opera_offset_x = parseInt(x / 25600) * 25600;
			this.opera_offset_y = parseInt(y / 25600) * 25600;
			
			if((this.prev_opera_offset_x != this.opera_offset_x) || (this.prev_opera_offset_x != this.opera_offset_y))
			{
				if(this.map_layers) this.map_layers.SetOffset(this.opera_offset_x,this.opera_offset_y);
			};
			
			this.prev_opera_offset_x = this.opera_offset_x;
			this.prev_opera_offset_y = this.opera_offset_y;
		}
		
		ClientMap.prototype.configurate = function()
		{
			this.zoom_scale_visible = true; // отображение шкалы зума
			this.zoom_levels_visible = true; // отображение линейки изменения масштабов
			this.zoom_nobounds = false;
			this.zoom_nocrop = false;
			this.cfg_Presize = false;
		}
		
		ClientMap.prototype.SetZoomsVisible = function(visible)
		{
			this.zoom_levels_visible = visible;
			var val = false;
			if(val = document.getElementById('rightStatusDIV_zoom')) 
			{
				//val.style.visibility = this.zoom_levels_visible ? 'visible' : 'hidden';
				if(this.zoom_levels_visible) 
				{
					if($) $(val).slideDown(250); else val.style.display = 'block';
				}
				else
				{
					if($) $(val).slideUp(250); else val.style.display = 'none';
				};
			};
		}
		
		ClientMap.prototype.SetZoomScaleVisible = function(visible)
		{
			this.zoom_scale_visible = visible;
			if(this.zoomscaleDIV) this.UrlUpdate(true);
		}
		
		// Загрузка XYZ карты из урла
		ClientMap.prototype.LoadMapXYZfromURL = function()
		{
			if(this.Configuration.SetShortURL()) return true;
			if(this.url_latlon && this.url.getHashParam('lat') && this.url.getHashParam('lon') && this.url.getHashParam('z')) 
			{
				this.SetMapCenterInLatLon(parseFloat(this.url.getHashParam('lat')),parseFloat(this.url.getHashParam('lon')));
				this.SetZoomFromLevels(this.zoom_levels[parseInt(this.url.getHashParam('z'))]);
				this.upURL();
				return true;
			}
			else
			{
				if(this.url.getHashParam('x') && this.url.getHashParam('y') &&this.url.getHashParam('z')) 
				{
					this.SetMapCenterInMeters(this.url.getHashParam('x'),this.url.getHashParam('y'));
					this.SetZoomFromLevels(this.zoom_levels[parseInt(this.url.getHashParam('z'))]);
					
					if(this.url_latlon)
					{
						this.url.delHashParam('x');
						this.url.delHashParam('y');
					}
					else
					{
						this.url.delHashParam('lat');
						this.url.delHashParam('lon');
					};
					
					this.upURL();
					return true;
				};
			}			
			return false;
		}
		
		// Возвращает экземпляр объекта ParseURL
		ClientMap.prototype.ParseURL = function(disabled)
		{
			this.url_update = !disabled;
			return this.url;
		}								
		
		//PRIVATE
		ClientMap.prototype.initGlobalEvents = function()
		{
			this.allow_shift = false;
			this.allow_alt   = false;
			
			document.write('<script type="text/javascript">');			
			document.write('if ('+this.vname+'.ns) {');
			document.write('	try {');
			document.write('		document.captureEvents(Event.MOUSEDOWN|Event.MOUSEMOVE|Event.MOUSEUP);');
			document.write('	} catch (e) {};');
			document.write('	try {');
			document.write('		document.addEventListener("onmousemove",global_tmp_func_mouse_drag,false);');
			document.write('		document.addEventListener("onmouseup",global_tmp_func_mouse_drag_end,false);');
			document.write('		document.addEventListener("onmousedown",global_tmp_func_mouse_drag_start,false);');
			document.write('	} catch (e) {};');
			document.write('};');
			document.write('document.onmousemove = global_tmp_func_mouse_drag;');
			document.write('document.onmouseup   = global_tmp_func_mouse_drag_end;');
			document.write('document.onmousedown = global_tmp_func_mouse_drag_start;');
			
			if(this.ie) document.write('document.oncontextmenu = clickIE;');
			if(this.ns) document.write('document.onclick = clickNS;');
			
			document.write('function clickIE() ');
			document.write('{ if (document.all) return '+this.vname+'.onContextMenu(window.event); else return true; } ');
			
			document.write('function clickNS(e) { ');
			document.write('  if(document.layers || (document.getElementById && !document.all)) ');
			document.write('  if (e.which==2 || e.which==3) ');
			document.write('  return '+this.vname+'.onContextMenu(e); ');
			document.write('  return true; } ');
			
			document.write('var global_tmp_ms_x = 0;');
			document.write('var global_tmp_ms_y = 0;');
			
			document.write('function global_tmp_func_mouse_drag(evnt)');
			document.write('{');
			document.write('	if('+this.ie+') evnt = window.event;');
			document.write('	if('+this.vname+'.ns)');
			document.write('	{');
			document.write('		global_tmp_ms_x = clmap.getEventPos(evnt).x;');
			document.write('		global_tmp_ms_y = clmap.getEventPos(evnt).y;');
			document.write('	};');
			document.write('	'+this.vname+'.onMouseGlobalMove(evnt ? '+this.vname+'.getEventPos(evnt) : event);');
			document.write('	if('+this.vname+'.GlobalEvents.Mouse_Move) '+this.vname+'.GlobalEvents.Mouse_Move(evnt);');
			document.write('	return false;');
			document.write('}');
			
			document.write('function global_tmp_func_mouse_drag_end(evnt)');
			document.write('{');			
			document.write('	if('+this.ie+') evnt = window.event;');
			document.write('	if(evnt.button == 2) return true;');
			document.write('	if('+this.ie+') if(evnt.button == 0) return true;');
			document.write('	if(evnt.which == 3) return true;');
			document.write('	'+this.vname+'.onMouseGlobalUp(evnt ? '+this.vname+'.getEventPos(evnt) : event);');
			document.write('	if('+this.vname+'.GlobalEvents.Mouse_Up) '+this.vname+'.GlobalEvents.Mouse_Up(evnt);');
			document.write('	return false;');
			document.write('}');
			
			document.write('function global_tmp_func_mouse_drag_start(evnt)');
			document.write('{');						
			document.write('	if('+this.ie+') evnt = window.event;');
			document.write('	if(evnt.button == 2) return true;');
			document.write('	if('+this.ie+') if(evnt.button == 0) return true;');
			document.write('	if(evnt.which == 3) return true;');
			document.write('	'+this.vname+'.onMouseGlobalDown(evnt ? '+this.vname+'.getEventPos(evnt) : event);');
			document.write('	if('+this.vname+'.GlobalEvents.Mouse_Down) '+this.vname+'.GlobalEvents.Mouse_Down(evnt);');			
			document.write('	return true;'); // false
			document.write('}');
			
			document.write('function global_tmp_func_scrollevent(delta)');
			document.write('{');
			document.write('	return '+this.vname+'.onScrollEvent(delta);');
			document.write('}');
			
			document.write('var global_tmp_var_shift_pressed = false;');
			document.write('var global_tmp_var_alt_pressed = false;');
			document.write('document.onkeydown = global_tmp_function_keydown;');
			document.write('document.onkeyup = global_tmp_function_keyup;');

			document.write('function global_tmp_function_keydown(e)');
			document.write('{');
			document.write('	var evt = e || window.event;');			
			if(this.allow_shift) document.write('	if(evt.keyCode == 16) global_tmp_var_shift_pressed = true;');
			if(this.allow_alt) document.write('	if(evt.keyCode == 18) global_tmp_var_alt_pressed = true;');
			document.write('	if('+this.vname+'.GlobalEvents.Key_Down) '+this.vname+'.GlobalEvents.Key_Down(e);');
			document.write('}');

			document.write('function global_tmp_function_keyup(e)');
			document.write('{');
			document.write('	var evt = e || window.event;');
			document.write('	if(evt.keyCode == 16) global_tmp_var_shift_pressed = false;');
			document.write('	if(evt.keyCode == 18) global_tmp_var_alt_pressed = false;');
			document.write('	if('+this.vname+'.GlobalEvents.Key_Up) '+this.vname+'.GlobalEvents.Key_Up(e);');
			document.write('}');
			
			document.write('</script>');
		};
				
		// Инициализация карты
		// map_w, map_h - размеры
		// PUBLIC
		ClientMap.prototype.init = function(map_w,map_h)
		{
			// экранные размеры карты
			this.map_width  = map_w ? map_w : 768; // map_width
			this.map_height = map_h ? map_h : 512; // map_height
			
			// зум карты
			this.zoom = 1000;
			this.MapZoom = this.zoom;
			this.SetZoomLevels();
			//this.zoom_format = 'img_y{y}x{x}_z{z}';
			this.zoom_format = function(x,y,z) { return 'img_y{y}x{x}_z{z}'.formatXYZ(x,y,z); };			
			
			//границы карты
			this.InitMapBounds();
						
			// координаты центра карты в пикселях
			this.center_x = 0;
			this.center_y = 0;
			
			// контейнеры DIVов
			this.mainDiv  = null; //mainDiv
			this.hintDiv = null;
			this.hintCloseDiv = null;
			this.zoomDiv  = null; //zoomRect
			this.coverDiv = null; // coverDiv
			this.rastrProtection = null; // rastrProtection
			this.rastrDiv = null; // rastrDiv
			this.statusDiv = null;
			this.rightStatusDIV = null;
			this.rightStatusDIV_zoom_scale = null;
			this.zoomscaleDIV = null;
			this.map_objects_Div = null;
			
			this.flag_ms_over = false;
			this.flag_ms_overs = [false /* use for zoom levels*/, false /* use for layers objects */, false /* use for external dot (TLayerLine) items - BlockMouse() & UnBlockMouse() */,false /* use for CircleArea*/, false /* ShowPrintableArea */];
			this.flag_ms_move = false;
			this.flag_ms_zoom = false; this.flag_ms_zoom_sx = 0; this.flag_ms_zoom_sy = 0;
			this.ms_x  =    0; 
			this.ms_xs = -256;
			this.ms_y  =    0; 
			this.ms_ys = -256;
			
			// координаты мыши над картой
			this.mouse_x = 0;
			this.mouse_y = 0;
		}
		
		ClientMap.prototype.BlockMouse = function() { this.flag_ms_overs[2] = true;	}
		ClientMap.prototype.UnBlockMouse = function() { this.flag_ms_overs[2] = false;	}
		ClientMap.prototype.GetBlockMouse = function() { return this.flag_ms_overs[2];	}
		
		// private
		ClientMap.prototype.PathImage = function(xx,yy,zz)
		{				
			// -1 -- background			
			return this.PathImageCustom(xx,yy,zz,-1);
		}
		
		// public
		ClientMap.prototype.NoImageCache = false;
		
		// private
		ClientMap.prototype.PathImageCustom = function(xx,yy,zz,layer_index)
		{
			x = xx; y = yy; z = zz;
			if(Math.floor(z) != z) z = this.GetZoomArrayLevel(zz);
					
			var itms = Math.pow(2,16-z+2);
			while( x < -1*itms/2 ) x += itms;
			while( x > itms/2-1 ) x -= itms;

			var axis_dir = 'A';
			if((x>=0) && (y>=0)) axis_dir= 'A';
			if((x< 0) && (y>=0)) axis_dir= 'B';
			if((x< 0) && (y< 0)) axis_dir= 'C';
			if((x>=0) && (y< 0)) axis_dir= 'D';
					
			x = Math.abs(x);
			y = Math.abs(y);
					
			var x2 = parseInt(x/16);
			var y2 = parseInt(y/16);
			var x1 = parseInt(x2/16);
			var y1 = parseInt(y2/16);
					
			var xy2 = 'L2'+IntTo35(x2)+'Z'+IntTo35(y2);
			var xy1 = 'L1'+IntTo35(x1)+'Z'+IntTo35(y1);
			
			// if no img cache
			var rnd = Math.floor(Math.random()*10000);
						
			//var rrr = 'Z'+z+'/'+axis_dir+'/'+xy1+'/'+xy2+'/'+IntTo35(x)+'Z'+IntTo35(y)+'.png' + (this.NoImageCache ? '?='+rnd : '');
			//if(rrr = 'Z6/A/L10Z0/L20Z0/0Z0.png') alert(xx+' '+yy+' '+zz+' '+layer_index);

			if(layer_index == -1) return global_vars_array[1] + 'Z'+z+'/'+axis_dir+'/'+xy1+'/'+xy2+'/'+IntTo35(x)+'Z'+IntTo35(y)+'.png' + (this.NoImageCache ? '?='+rnd : '');
			return global_vars_array[0]+'engine/gif/devider.gif'; // прозрачный img
		}
		
		// Инициализация зума
		// zoom - масштаб
		// zoomformat - формат строки для урла {x} {y} {z}
		// zoom_no_scale_crop - селектор пропорционален сторонам растра
		// zoom_no_bounds - не ограничивать зум полем карты
		// PUBLIC
		ClientMap.prototype.InitZoom = function(zoom,zoomformat,zoom_no_scale_crop,zoom_no_bounds)
		{
			this.zoomIndex = -1;
			for(var i=this.zoom_start_from;i<this.zoom_levels.length; i++) if(this.zoom_levels[i] == zoom) this.zoomIndex = i;
			
			document.getElementById('waitDiv').innerHTML = 'подождите, выполняется загрузка элементов карты...';
			this.to_sst_c = 0;
			if(this.to_sst) clearTimeout(this.to_sst);
			this.to_sst = setTimeout("document.getElementById('waitDiv').innerHTML = '&nbsp;'",3500);
			
			this.prev_z = this.zoom;
			this.zoom = zoom ? zoom : const_zooms[1];
			this.MapZoom = this.zoom;
			this.zoom_format = zoomformat ? zoomformat : this.PathImage;
			if(zoom_no_bounds) this.zoom_nobounds = zoom_no_bounds;
			if(zoom_no_scale_crop) this.zoom_nocrop = zoom_no_scale_crop; 
			
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
			this.for_clnav_PreChangeZoom(this);					
		}
		
		// инициализация границ карты в метрах
		// PUBLIC
		ClientMap.prototype.InitMapBounds = function(minx,miny,maxx,maxy)
		{
			this.map_minx_m = minx ? minx : -4000000000;
			this.map_miny_m = miny ? miny : -4000000000;
			this.map_maxx_m = maxx ? maxx : 4000000000;
			this.map_maxy_m = maxy ? maxy : 4000000000;
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
		}
		
		ClientMap.prototype.MapCrossVisible = true;
		ClientMap.prototype.MapCrossBypass = true; // не отображать крестик (if false) при mapdown & mapmove
		ClientMap.prototype.SetMapCrossVisible = function(visible,bypass)
		{
			if(bypass) 
				{ 
					if(this.MapCrossBypass) return; 
				}
			else
				{ ClientMap.prototype.MapCrossVisible = visible ? true : false; };
			document.getElementById('mapCross').style.visibility = visible ? 'visible' : 'hidden';
		}
		
		// Установка и/или получение статус-текста
		// PUBLIC
		ClientMap.prototype.StatusText = function(str)
		{
			if(str) this.statusDiv.innerHTML = '&nbsp;'+str;
			return this.statusDiv.innerHTML;
		}
		
		ClientMap.prototype.ShowAbout = function()
		{
			if(this.T_E_M_P_001 && !this.T_E_M_P_001.killed) this.T_E_M_P_001.Kill();
			this.buttonOptionsCfgV = false;
			//this.buttonOptionsCfg.style.visibility = 'hidden';
			if($) $(this.buttonOptionsCfg).hide(200); else this.buttonOptionsCfg.style.display = 'none';
			var wabout = new TWindow();
			wabout.init(this.map_left + this.map_width/2-200,this.map_top+this.map_height/2-200,420,350);
			wabout.setDiv(document.getElementById('windowroot'));
			wabout.SetCaption('<b style="color:black;font-size:13px;font-family:MS Sans Serif,Arial,Verdana;">О картографическом модуле</b>')			
			wabout.DIV.style.padding = '5px 5px 5px 5px';
			wabout.DIV.innerHTML = '<center><br/><b>'+this.Assembly.Title+'</b> v'+this.Assembly.Version+' ('+this.Assembly.Description+')<br/><sup>от '+this.Assembly.VersionDate+'</sup><br/><br/><span style="font-size:13px;">'+this.Assembly.Copyright+'<br/></span><br/><br/><span style="font-size:12px;color:666666;">Map/JS Framework by Milok Zbrozek</span><br/><span style="font-size:12px;color:#A0A0A0;">Engine architecture & development by '+this.Assembly.Author+'</span><br/><br/><span style="font-size:12px;color:#333333;">Плагины:</span><div style="overflow-y:auto;overflow-x:none;width:320px;height:100px;font-size:12px;color:gray;" align="left">'+this.GetExtPlugins()+'</div></center>';
			wabout.ContainerDIV.style.zIndex = this.GetNext_zIndex();
			this.T_E_M_P_001 = wabout;
		}
		
		// public XSLT Example
		ClientMap.prototype.GetAboutText = function()
		{			
			var par = new XSLTParser();
			par.SetXMLText(  new XMLConverter({Assembly:this.Assembly}).toXml('ClientMap')  );
			par.SetXSLFile(global_vars_array[0]+'engine/xslt/about.xslt');
			return par.GetExecutedText();
		}
		
		// public JSLT Example
		ClientMap.prototype.GetAboutText2 = function()
		{			
			var par = new JSLTParser();
			par.SetXMLText(  new XMLConverter({Assembly:this.Assembly}).toXml('ClientMap')  );
			par.SetJSFile( global_vars_array[0]+'engine/xslt/about.jslt' );
			return par.GetExecutedText();
		}
		
		ClientMap.prototype.ShowConfigButtonIs = false;
		ClientMap.prototype.ShowConfigButton = function(vis)
		{
			this.ShowConfigButtonIs = vis ? vis : false;
			document.getElementById("buttonOptionsDiv").style.visibility = this.ShowConfigButtonIs ? 'visible' : 'hidden';
		}
		
		
		//Выводим в документ объект карты
		// PUBLIC
		ClientMap.prototype.writeMainDiv = function(x_pos,y_pos)
		{
			this.map_left = x_pos || x_pos == 0 ? x_pos : 300;
			this.map_top  = y_pos || y_pos == 0 ? y_pos : 100;
			var tmp_ua = '';
			
			document.write('<div id="windowroot" style="position:absolute;left:0px;top:0px;z-index:99;"></div><div id="mainDIV" style="border:'+this.border+';width:'+this.map_width+'px;height:'+this.map_height+'px;spacing:0px;position:absolute;left:'+this.map_left+'px;top:'+this.map_top+'px;z-index:12;overflow:hidden;background:url('+global_vars_array[0]+'engine/png/loading.png) #FFFFFF;" onMouseMove="ClientMap.prototype.global_mouse_over('+this.vname+');" onMouseOut="ClientMap.prototype.global_mouse_out('+this.vname+');" '+tmp_ua+'></div>');
			
			document.write('<div id="hintDIV" style="border:solid 1px gray;width:'+(this.map_width- (this.ie ? 0 :2))+'px;height:'+(this.ie ? '18' : '16')+'px;spacing:0px;position:absolute;left:'+(this.map_left)+'px;top:'+(this.map_top+this.map_height-18)+'px;z-index:12;overflow:hidden;background:#FEFFE1;'+(this.ie ? 'filter:alpha(opacity=0);' : 'opacity:0.0;padding:1px;')+'font-size:12px;font-family:MS Sans Serif,Arial,Verdana;overflow:hidden;visibility:visible;">&nbsp;Для изменения масштаба карты вы можете использовать колесо прокрутки мыши</div>   <div id="hintCloseDiv" style="width:13px;height:13px;spacing:0px;position:absolute;left:'+(this.map_left+this.map_width-15-(this.ie ? 1 : 0))+'px;top:'+(this.map_top+this.map_height-15-(this.ie ? 1 : 0))+'px;z-index:12;overflow:hidden;background:#FEFF99;'+(this.ie ? 'filter:alpha(opacity=0);' : 'opacity:0.0;padding:1px;')+'visibility:hidden;"><img src="'+global_vars_array[0]+'engine/gif/close_btn.gif" border="0" width="13" height="13" style="cursor:pointer;" title="Закрыть подсказку" onclick="'+this.vname+'.ssbTimeHClose();"/></div>');			
			
			this.mainDiv = document.getElementById("mainDIV");
			this.mainDiv.selfObject = this;
			this.hintDiv = document.getElementById("hintDIV");
			this.hintDiv.oplvl = 0;
			this.hintCloseDiv = document.getElementById("hintCloseDiv");
			this.SetStatusBar();
			
			document.write('<div id="buttonOptionsDiv" style="width:13px;height:13px;spacing:0px;position:absolute;left:'+(this.map_left+this.map_width-9-(this.ie ? 2 : 1))+'px;top:'+(this.map_top+this.map_height-27)+'px;z-index:12;overflow:hidden;'+(this.ie ? 'filter:alpha(opacity=70);' : 'opacity:0.7;padding:1px;')+'visibility:'+(this.ShowConfigButtonIs ? 'visible' : 'hidden')+';"><img src="'+global_vars_array[0]+'engine/gif/bo.gif" border="0" width="8" height="8" style="cursor:pointer;" title="Настройки отображения карты" onclick="'+this.vname+'.OpenCfgWindow();"/></div>   <div id="buttonOptionsCfg" style="width:400px;height:260px;spacing:0px;position:absolute;left:'+(this.map_left+this.map_width-414-(this.ie ? 2 : 0))+'px;top:'+(this.map_top+this.map_height - 290)+'px;z-index:12;overflow:hidden;'+(this.ie ? 'filter:alpha(opacity=80);' : 'opacity:0.8;padding:1px;')+'display:none;border:solid 1px black;background:white;font-family:MS Sans Serif;font-size:14px;"  onmouseover="'+this.vname+'.overcfg = true;" onmouseout="'+this.vname+'.overcfg = false;">&nbsp;<b>Настройки отображения карты</b>:<div style="position:absolute;width:'+(this.ie ? '390' : '395')+'px;height:10px;font-size:9px;left:0px;top:'+(this.ie ? '0' : '2')+'px;" align="right"><sup><a href="#" onclick="'+this.vname+'.ShowAbout();return false;" style="font-size:9px;font-family:Verdana;text-decoration:none;" title="О картографическом модуле..."><b>?</b></a></sup></div><br/><br/>&nbsp;<input id="_checkUseHint" type="checkbox" '+(this.UseHint ? 'checked' : '')+' onclick="'+this.vname+'.UseHint=this.checked;">Использовать всплывающие подсказки<br/>&nbsp;<input id="_checkUseHint_OnlyTopItem" type="checkbox" '+(this.UseHint_OnlyTopItem ? 'checked' : '')+' onclick="'+this.vname+'.UseHint_OnlyTopItem=this.checked;">Только верхний объект во всплывающей подсказке<br/>&nbsp;<input id="_checkUseStatusBar" type="checkbox" '+(this.UseStatusBar ? 'checked' : '')+' onclick="'+this.vname+'.UseStatusBar=this.checked;">Использывать подсказки строки состояния<br/>&nbsp;<input id="_checkMapCrossVisible" type="checkbox" '+(this.MapCrossVisible ? 'checked' : '')+' onclick="'+this.vname+'.SetMapCrossVisible(this.checked);">Отображать крестик в центре карты<br/>&nbsp;<input id="_checkMapCrossBypass" type="checkbox" '+(this.MapCrossBypass ? '' : 'checked')+' onclick="'+this.vname+'.MapCrossBypass=!this.checked;">Отображать крестик в центре карты при сдвиге<br/>&nbsp;<input id="_checkzoom_scale_visible" type="checkbox" '+(this.zoom_scale_visible ? 'checked' : '')+' onclick="'+this.vname+'.SetZoomScaleVisible(this.checked);">Отображать шкалу масштаба<br/>&nbsp;<input id="_checkzoom_levels_visible" type="checkbox" '+(this.zoom_levels_visible ? 'checked' : '')+' onclick="'+this.vname+'.SetZoomsVisible(this.checked);">Отображать масштабную линейку<br/>&nbsp;<input id="_checkMultiSelect" type="checkbox" '+(this.MultiSelect ? 'checked' : '')+' onclick="'+this.vname+'.MultiSelect=this.checked;">Пропускать события для всех объектов при клике<br/>&nbsp;<input id="_checkScrollMultiZoom" type="checkbox" '+(this.ScrollMultiZoom ? 'checked' : '')+' onclick="'+this.vname+'.ScrollMultiZoom=this.checked;">Использовать мультизуммирование при прокрутке<br/>&nbsp;<input id="_DisableContextMenus" type="checkbox" '+(this.DisableContextMenus ? 'checked' : '')+' onclick="'+this.vname+'.DisableContextMenus=this.checked;">Отключить контекстные меню карты<br/>&nbsp;<input id="_UseZooming" type="checkbox" '+(this.UseZooming ? 'checked' : '')+' onclick="'+this.vname+'.UseZooming=this.checked;">Растягивание и сжатие карты при изменении зума</div>');
			this.buttonOptionsDiv = document.getElementById("buttonOptionsDiv");
			this.buttonOptionsCfg = document.getElementById("buttonOptionsCfg");
			this.buttonOptionsCfgV = false;
			this.overcfg = false;
			
			document.write('<div id="zoomDiv" style="border-width:1px; border-style:solid; border-color:#18459F;position:absolute;left:0px;top:0px;width:0px;height:0px;overflow:hidden;z-index:13;visibility:hidden;display:block;"><img style="filter:alpha(opacity=20);-moz-opacity:0.2;opacity: 0.2;-khtml-opacity: 0.2;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=20);" src="'+global_vars_array[0]+'engine/png/zoom.png" border="0" alt="" width="2000" height="2000"></div>');			
			this.zoomDiv = document.getElementById("zoomDiv");
			this.writeRastrDiv();
			this.initGlobalEvents();
			this.LoadConfig();
			try { this.LoadExtPlugins(); } catch(e) {};
		}
		
		ClientMap.prototype.OpenCfgWindow = function()
		{
			this.buttonOptionsCfgV = !this.buttonOptionsCfgV;			
			if(this.buttonOptionsCfgV)
			{
				document.getElementById('_checkUseHint').checked = this.UseHint;
				document.getElementById('_checkUseHint_OnlyTopItem').checked = this.UseHint_OnlyTopItem;
				document.getElementById('_checkUseStatusBar').checked = this.UseStatusBar;
				document.getElementById('_checkMapCrossVisible').checked = this.MapCrossVisible;
				document.getElementById('_checkMapCrossBypass').checked = !this.MapCrossBypass;
				document.getElementById('_checkMultiSelect').checked = this.MultiSelect;
				document.getElementById('_checkzoom_levels_visible').checked = this.zoom_levels_visible;
				document.getElementById('_checkzoom_scale_visible').checked = this.zoom_scale_visible;
				document.getElementById('_checkScrollMultiZoom').checked = this.ScrollMultiZoom;
				document.getElementById('_DisableContextMenus').checked = this.DisableContextMenus;
			};
			
			//this.buttonOptionsCfg.style.display = this.buttonOptionsCfgV ? 'block' : 'none';
			if(this.buttonOptionsCfgV) 
			{
				if($) $(this.buttonOptionsCfg).show("slide", { direction: "down" }, 500); else this.buttonOptionsCfg.style.display = 'block';
			}
			else  
			{
				if($) $(this.buttonOptionsCfg).hide("slide", { direction: "down" }, 500); else this.buttonOptionsCfg.style.display = 'none';
			};
		}
		
		// Использувать StatusBar Tips
		ClientMap.prototype.UseStatusBar = true;
		
		// PRIVATE
		ClientMap.prototype.SetStatusBar = function()
		{
			this.ssbTimeS = 15000;
			this.ssbTimeH = 10000;
			this.ssbTimeST = setTimeout(this.vname+'.ssbTimeSC()',this.ssbTimeS);
		}
		
		// Tips
		ClientMap.prototype.StatusBarHints = [];
		/*
		[
		 'Для быстрого переключение между масштабами карты используйте линейку зумов справа. При этом центр карты не смещается.', //0
		 'Чтобы подвинуть карту нажмите левой кнопкой мыши в видимой области и не отпуская передвиньте указатель в соответствующую сторону',//1
		 'Для изменения масштаба карты вы можете использовать колесо прокрутки мыши. Центр карты будет выбран в соответствии с позицией курсора мыши',//2
		 'Для удобства навигации вы можете скопировать ссылку на карту в адресной строке браузера и передать, например, по почте. Карта откроется на том же месте.',//3
		 'Наиболее оптимальный браузер для просмотра Firefox 2-ой или 3-ий версии',//4
		 'Скорость загрузки карты зависит от скорости вашего интернет соединения',//5
		 'Для более быстрой работы с картой можно уменьшить размер видимой области',//6
		 'Поддержка браузеров Internet Explorer, Firefox, Opera, Flock, K-Meleon, SeaMonkey, Safari (частично), Google Chrome! (частично)',//7
		 'Engine architecture & development by Milok Zbrozek'//8
		];
		*/
		
		// Show Tip Call
		ClientMap.prototype.ssbTimeSC = function()
		{
			if(this.UseStatusBar) 
			{				
				setTimeout(this.vname+'.ssbHide(10)',120);
				setTimeout(this.vname+'.ssbHide(15)',180);
				setTimeout(this.vname+'.ssbHide(20)',240);
				setTimeout(this.vname+'.ssbHide(25)',300);
				setTimeout(this.vname+'.ssbHide(30)',360);
				setTimeout(this.vname+'.ssbHide(35)',420);
				setTimeout(this.vname+'.ssbHide(40)',480);
				setTimeout(this.vname+'.ssbHide(45)',540);
				setTimeout(this.vname+'.ssbHide(50)',600);
				setTimeout(this.vname+'.ssbHide(55)',660);
				setTimeout(this.vname+'.ssbHide(60)',720);
				setTimeout(this.vname+'.ssbHide(65)',780);
				setTimeout(this.vname+'.ssbHide(70)',840);
				// this.hintDiv.style.visibility = 'visible';
				// this.hintCloseDiv.style.visibility = 'visible';
			};
			this.hintDivTxt = this.UseStatusBar ? this.StatusBarHints[parseInt(Math.random()*this.StatusBarHints.length)] : '&nbsp;';
			this.ssbTimeSC_setText();			
			//if(this.clnav && this.clnav.minimizeLeft && !this.clnav.minimizeTop && this.isVisible) offset = this.clnav.width - 2;
			//this.hintDiv.innerHTML = '<div style="position:absolute;left:'+offset+';top:1px;width:auto;height:auto;">&nbsp;&nbsp;&nbsp;' + this.StatusBarHints[parseInt(Math.random()*this.StatusBarHints.length)]+'</div>'; //+parseInt(Math.random()*10);
			this.ssbTimeHT = setTimeout(this.vname+'.ssbTimeHC()',this.ssbTimeH);
		}
		
		ClientMap.prototype.ssbTimeSC_setText = function()
		{
			var offset = 0;
			if(this.clnav && this.clnav.minimizeLeft && !this.clnav.minimizeTop && this.clnav.Attached && this.clnav.realVisible) 
			{
				if(this.clnav.premin) offset = 6;
				if(!this.clnav.Minimized) offset = this.clnav.width - 3;
			};
			this.hintDiv.innerHTML = '<div style="position:absolute;left:'+offset+';top:1px;width:auto;height:auto;cursor:default;">&nbsp;&nbsp;&nbsp;' + this.hintDivTxt+'</div>'; //+parseInt(Math.random()*10);
		}
		
		// Hide Tip Call
		ClientMap.prototype.ssbTimeHC = function()
		{
			if(this.UseStatusBar) 
			{
				setTimeout(this.vname+'.ssbHide(60)',120);
				setTimeout(this.vname+'.ssbHide(55)',180);
				setTimeout(this.vname+'.ssbHide(50)',240);
				setTimeout(this.vname+'.ssbHide(45)',300);
				setTimeout(this.vname+'.ssbHide(40)',360);
				setTimeout(this.vname+'.ssbHide(35)',420);
				setTimeout(this.vname+'.ssbHide(30)',480);
				setTimeout(this.vname+'.ssbHide(25)',540);
				setTimeout(this.vname+'.ssbHide(20)',600);
				setTimeout(this.vname+'.ssbHide(15)',660);
				setTimeout(this.vname+'.ssbHide(10)',720);
				setTimeout(this.vname+'.ssbHide(0)',840);
			}
			else this.ssbHide(0);
			// this.hintDiv.style.visibility = 'hidden';
			// this.hintCloseDiv.style.visibility = 'hidden';
			this.ssbTimeST = setTimeout(this.vname+'.ssbTimeSC()',this.ssbTimeS);
		}
		
		// Close Tip Call
		ClientMap.prototype.ssbTimeHClose = function()
		{
			if(this.hintDiv.oplvl == 0) return;
			clearTimeout(this.ssbTimeHT);
			this.ssbTimeHC();
		}		
		
		// Slide Opacity
		ClientMap.prototype.ssbHide = function(level)
		{
			this.hintDiv.oplvl = level;
			this.hintCloseDiv.style.visibility = level == 0 ? 'hidden' : 'visible';
			if(this.ie)
			{
				this.hintDiv.style.filter = 'alpha(opacity='+level+')';
				this.hintCloseDiv.style.filter = 'alpha(opacity='+level+')';
			}
			else
			{
				this.hintDiv.style.opacity = '0.'+level;
				this.hintCloseDiv.style.opacity = '0.'+level;
			};
		}
		
		// Сдвигаем сам объект карты по страничке
		// public
		ClientMap.prototype.MoveMainDiv = function(x_pos,y_pos)
		{
			if(this.WGSHistoryForm && !this.WGSHistoryForm.killed) this.WGSHistoryForm.Close();
		
			this.map_left = x_pos || x_pos == 0 ? x_pos : 300;
			this.map_top  = y_pos || y_pos == 0 ? y_pos : 100;
			
			this.mainDiv.style.left = this.map_left + 'px';
			this.mainDiv.style.top = this.map_top + 'px';
			
			this.hintDiv.style.left = (this.map_left)+'px';
			this.hintDiv.style.top = (this.map_top+this.map_height-18)+'px';
			this.hintCloseDiv.style.top = (this.map_top+this.map_height-15-(this.ie ? 1 : 0))+'px';
			this.hintCloseDiv.style.left = (this.map_left+this.map_width-15-(this.ie ? 1 : 0))+'px';
			if(this.zoomScaleRight)
				this.buttonOptionsDiv.style.top = (this.map_top+this.map_height-36)+'px';
			else
			  this.buttonOptionsDiv.style.top = (this.map_top+this.map_height-27)+'px';
			this.buttonOptionsDiv.style.left = (this.map_left+this.map_width-9-(this.ie ? 2 : 1))+'px';
			if(this.zoomScaleRight)
			  this.buttonOptionsCfg.style.top = (this.map_top+this.map_height-290-10)+'px';
			else
			  this.buttonOptionsCfg.style.top = (this.map_top+this.map_height-290)+'px';
			this.buttonOptionsCfg.style.left = (this.map_left+this.map_width-414-(this.ie ? 2 : 0))+'px';
			
			if(this.clnav && this.clnav.Attached) this.clnav.MoveAttached();
			
			if(this.paneltools && this.paneltools.attached)
			{
				this.paneltools.div.style.left = this.map_left + this.paneltools.attached_left;
				this.paneltools.div.style.top = this.map_top + this.paneltools.attached_top;
			};
		}
		
		// private
		ClientMap.prototype.FormatWatermark = function()
		{
			return this.Assembly.Watermark+this.wma_postfix+(this.ie ? '&nbsp;' : '');
		}
		
		//public
		ClientMap.prototype.SetWatermark = function(str)
		{
			if(str) this.Assembly.Watermark = str;				
			this.statusDiv.innerHTML = this.FormatWatermark()+'&nbsp;';
			return this.Assembly.Watermark;
		}
		ClientMap.prototype.wma_postfix = ''; // Watermark PostFIX
		
		// Выводим в поле карты плоскость растра
		// PRIVATE
		ClientMap.prototype.writeRastrDiv = function()
		{	
			var txt = ('<div id="map_background" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></div>');
			txt += ('<div id="rastrDIV" style="border:none;spacing:0px;position:absolute;left:-256px;top:-256px;z-index:9;"></div>');			
			//url(engine/gif/devider.gif) repeat;
			txt += ('<div id="coverDIV" style="background:url('+global_vars_array[0]+'engine/gif/devider.gif) repeat;border:none;width:100%;height:100%;spacing:0px;position:absolute;left:0px;top:0px;z-index:10;" onMouseMove="return false;" onMouseDown="return false;"> <div id="subcoverDIV" style="position:absolute;left:0px;top:0px;background:url('+global_vars_array[0]+'engine/png/mmove.png) 0px 0px no-repeat;width:30px;height:30px;"></div> </div>');
			// subcoverDIV - отображается, когда нажата карта и ее двигают			
			txt += ('<div id="rastrProtection" style="background:url('+global_vars_array[0]+'engine/gif/devider.gif) repeat;border:none;width:100%;height:100%;spacing:0px;position:absolute;left:0px;top:0px;z-index:10;overflow:hidden;" onMouseMove="return false;" onMouseDown="return false;"><div id="mapCross" style="position:absolute;left:50%;top:50%;"><div style="position:absolute;left:-5px;top:-5px;background:url('+global_vars_array[0]+'engine/png/center_map.png) 0px 0px no-repeat;width:9px;height:10px;"></div></div></div>');			
			txt += ('<div id="overMapDiv" style="border:none;width:100%;height:100%;spacing:0px;position:absolute;left:0px;top:0px;z-index:10;overflow:hidden;visibility:visible;display:block;"></div>');
			txt += ('<div id="map_objects_Div" style="border:none;spacing:0px;position:absolute;left:-256px;top:-256px;z-index:11;"></div>');
			txt += ('<div id="printablePreview" style="border:none;width:100%;height:100%;spacing:0px;position:absolute;left:0px;top:0px;z-index:12;overflow:hidden;visibility:hidden;display:none;"></div>');
			txt += ('<div id="showCirclePreview" style="border:none;width:100%;height:100%;spacing:0px;position:absolute;left:0px;top:0px;z-index:12;overflow:hidden;visibility:hidden;display:none;"></div>');
			txt += '<div id="statusDIV" style="font-size:12px;border:none;spacing:0px;position:absolute;left:0px;top:'+(this.map_height-16-(this.ie ? 4 : 0))+'px;z-index:12;width:'+this.map_width+'px;visibility:visible;font-family:Ms Sans Serif,Arial,Verdana;color:#222222;cursor:default;" align="right">'+this.FormatWatermark()+'&nbsp;</div>';			
			// ZOOM LEVELS NAVIGATOR
			var tmp_a = '<div id="rightStatusDIV_zoom" style="border:none;position:relative;top:5px;width:31px;text-align:right;z-index:5;'+(this.ie ? 'alpha(opacity=45);' : 'filter:alpha(opacity=90);-moz-opacity:1;opacity: 0.95;-khtml-opacity: 0.9;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=90);')+'cursor:pointer;display:'+(this.zoom_levels_visible ? 'block' : 'none')+'" name="panelB" id="panelB" onMouseOver="if( !'+this.vname+'.flag_ms_move && !'+this.vname+'.flag_ms_zoom) '+this.vname+'.flag_ms_overs[0]=true;" onMouseOut="'+this.vname+'.flag_ms_overs[0]=false;">';
			tmp_a += '<table cellspacing="1" cellpadding="0" style="background:transparent url('+global_vars_array[0]+'engine/png/fon'+(this.ie ? '_ie' : '')+'.png);" id="baku2"><tr>';
			tmp_a += '<td width="30" align="center" onmouseout="this.style.background=\'none\';" onmouseover="this.style.background=\'#ff9900\';" class=""><img width="20" vspace="3" height="20" border="0" alt="Увеличить" src="'+global_vars_array[0]+'engine/gif/js_plus_bt.gif" onclick="'+this.vname+'.ZoomIn();"  title="Увеличить масштаб"/></td></tr><tr><td align="center"><div id="rightStatusDIV_zoom_scale">';
			
			//this.rightStatusDIV_zoom_scale
			if(this.zoom_levels)
			{
				var tmp_b = 16 / this.zoom_levels.length;
				tmp_a += '<table cellspacing="1" cellpadding="0" class="baku" id="zoomtable">';
				for(var i=this.zoom_start_from;i<this.zoom_levels.length;i++)
				tmp_a += '<tr><td align="center" onmouseout="this.style.background=\'none\';" onmouseover="this.style.background=\'#000000\';" class=""><img width="'+Math.round(tmp_b*i)+'" vspace="1" height="8" border="0" name="zm_s6" src="'+global_vars_array[0]+'engine/gif/_s1.gif" onclick="'+this.vname+'.SetZoomFromIndex('+i+',true);"/><img width="'+Math.round(16-tmp_b*i)+'" vspace="1" height="8" border="0" name="zm_6" src="'+global_vars_array[0]+'engine/gif/_s0.gif" onclick="'+this.vname+'.SetZoomFromIndex('+i+',true);"/></td></tr>';
				tmp_a += '</table>';
			};
			
			tmp_a += '</div></td></tr><tr><td align="center" onmouseout="this.style.background=\'none\';" onmouseover="this.style.background=\'#ff9900\';" class=""><img width="20" vspace="3" height="20" border="0" alt="Уменьшить" src="'+global_vars_array[0]+'engine/gif/js_minus_bt.gif" onclick="'+this.vname+'.ZoomOut();" title="Уменьшить масштаб"/></td>';
			tmp_a += '</tr></table></div>';
			
			//tmp_a = '';

			txt += '<div id="waitDiv" style="border:none;spacing:0px;position:absolute;left:0px;top:0px;z-index:11;width:'+this.map_width+'px;height:20px;visibility:visible;font-size:12px;color:navy;font-weight:bold;" align="center">&nbsp;</div>';
						
			txt += '<div id="rightStatusDIV" style="border:none;spacing:0px;position:absolute;left:'+(this.zoomsRight ? (this.map_width-35) : 2)+'px;top:0px;z-index:12;width:35px;visibility:visible;">'+tmp_a+'<br/><div id="rightStatusDIV_MH" align="center" style="font-size:9px;cursor:pointer;" onclick="if('+this.vname+'.WGSHistoryForm && !'+this.vname+'.WGSHistoryForm.killed) '+this.vname+'.WGSHistoryForm.Close(); else '+this.vname+'.ShowWGSHistory(-1);" title="Показать\\скрыть историю карты\n и сохранное в cookies">история<br/>карты</div></div>';
			txt += '<div id="zoomscaleDIV" style="border:none;spacing:0px;position:absolute;left:0px;top:'+(this.map_height-22+(this.ie?2:0))+'px;z-index:12;width:'+(this.ie ? '250px' : 'auto')+';filter:alpha(opacity=85);-moz-opacity:0.85;opacity: 0.85;-khtml-opacity: 0.85;">&nbsp;</div>';
			if(this.mainDiv) this.mainDiv.innerHTML = txt;
			else throw new Error("mainDIV element not found (use function ClientMap.writeMainDiv)");
			this.coverDiv  = document.getElementById("coverDIV");
			this.rastrProtection  = document.getElementById("rastrProtection");
			this.overMapDiv  = document.getElementById("overMapDiv"); // PUBLIC 
			this.printablePreview  = document.getElementById("printablePreview");
			this.showCirclePreview  = document.getElementById("showCirclePreview");
			this.rastrDiv  = document.getElementById("rastrDIV");
			this.statusDiv = document.getElementById("statusDIV");
			this.rightStatusDiv = document.getElementById("rightStatusDIV");
			this.rightStatusDIV_MH = document.getElementById("rightStatusDIV_MH");			
			this.rightStatusDIV_zoom_scale = document.getElementById("rightStatusDIV_zoom_scale");
			this.zoomscaleDIV = document.getElementById("zoomscaleDIV");
			
			if(this.ns) this.rightStatusDiv.style.opacity = '0.45';
			if(this.ie) this.rightStatusDiv.style.filter = 'alpha(opacity=45);';
			
			this.map_objects_Div = document.getElementById("map_objects_Div");
			
			this.map_layers = new Layers(this.map_objects_Div);
			this.map_layers.setCLMAP(this.vname);
			this.map_layers.setCLMAPObj(this);
			this.map_layers.SetZoom(this.zoom);
			this.MapLayers = this.map_layers;
			
			this.rightStatusDIV_MH.style.opacity = '0.7';
			this.rightStatusDIV_MH.style.filter = 'alpha(opacity=70)';
			this.rightStatusDIV_MH.style.visibility = this.MapHistoryVisible;
						
			this.rastrProtection.style.opacity = '0.85'; // прозрачный крестик
			this.rastrProtection.style.filter = 'alpha(opacity=85)';
			
			this.writeRastr();
		}
		
		ClientMap.prototype.MapHistoryVisible = 'visible';
		ClientMap.prototype.SetMapHistoryVis = function(isVis) 
		{ 
			this.MapHistoryVisible = isVis ? 'visible' : 'hidden'; 
			if(this.rightStatusDIV_MH) 
			{
				this.rightStatusDIV_MH.style.visibility = this.MapHistoryVisible;
			};
		}
		ClientMap.prototype.GetMapHistoryVis = function() { return this.MapHistoryVisible == 'visible'; }
		
		// Перечень масштабов справа?!
		ClientMap.prototype.zoomsRight = true;
		
		ClientMap.prototype.ImageOnLoad = function(sender)
		{
			sender.style.visibility = 'visible';
			
			if(this.cfg_Presize)
			{
				if(nd = document.getElementById('nd_id')) if(nc = document.getElementById('p_'+sender.id)) nd.removeChild(nc);
			
				this.to_sst_c++;
				images_array_xy = this.images_array_x * this.images_array_y;

				if(this.to_sst) clearTimeout(this.to_sst);
				if(this.to_sst_c >= images_array_xy)
					document.getElementById('waitDiv').innerHTML = '&nbsp;'
				else 
					this.to_sst = setTimeout("document.getElementById('waitDiv').innerHTML = '&nbsp;'",3500);
			};
			this.zoomDivs_in_onl++;
		}
		
		ClientMap.prototype.ImageOnError = function(sender)
		{
			sender.style.visibility = 'visible';
			try {
			  sender.src = global_vars_array[0]+'engine/png/nomap.png';
			} catch (e) {};
			
			if(this.cfg_Presize)
			{
				if(nd = document.getElementById('nd_id')) if(nc = document.getElementById('p_'+sender.id)) nd.removeChild(nc);			
				this.to_sst_c++;
			};
		}
		
		ClientMap.prototype.ImageOnAbort = function(sender)
		{
			if(this.cfg_Presize)
			{
				if(nd = document.getElementById('nd_id')) if(nc = document.getElementById('p_'+sender.id)) nd.removeChild(nc);
				this.to_sst_c++;
			};
		}
		
		ClientMap.prototype.LayerImageOnError = function(sender)
		{
			try {
			  sender.src = global_vars_array[0]+'engine/gif/devider.gif';
			} catch (e) {};
		}
		
		// NOW IS PRIVATE & HAS NO TAGS IN CONFIG.XML //
		ClientMap.prototype.support_multi_layers = false;
		ClientMap.prototype.support_multi_layers_count = 0;
		
		// Выводим в поле карты необходимое количество квадратиков
		// PRIVATE
		ClientMap.prototype.writeRastr = function()
		{
			// массив кусочков карты
			this.images_array = new Array();
			// число кусочков карты по оси Y
			this.images_array_y = Math.round((this.map_height+512)/256);
			if(this.map_height % 256 > 9) this.images_array_y++;
			//  число кусочков карты по оси X
			this.images_array_x = Math.round((this.map_width+512)/256);
			if(this.map_width % 256 > 9) this.images_array_x++;
			
			var txt = "";
			for(var y=0;y<this.images_array_y;y++)
			for(var x=0;x<this.images_array_x;x++)
			{
					//txt += ('<img id="i'+y+''+x+'" src="" style="width:256px;height:256px;border:'+(this.debug ? 'dashed 1px black' : 'none')+';position:absolute;" border="0" alt=""/>');
					txt += ('<img id="i'+y+''+x+'" src="'+global_vars_array[0]+'engine/gif/devider.gif" style="width:256px;height:256px;border:'+(this.debug ? 'dashed 1px red' : 'none')+';position:absolute;" border="0" alt="" onload="try {'+this.vname+'.ImageOnLoad(this); } catch (e) {};" onerror="'+this.vname+'.ImageOnError(this)" onabort="'+this.vname+'.ImageOnAbort(this)"/>');
			};
			this.firstboot = true;
			this.save_posx = 0;
			this.save_posy = 0;
			
			if(this.rastrDiv) this.rastrDiv.innerHTML = '<div id="rastrDiv_background" style="position:absolute;left:0px;top:0px;">'+txt+'</div>';
			else throw new Error("rastrDIV element not found (use function ClientMap.writeRastrDiv)");
			
			this.rastrBackground = document.getElementById('rastrDiv_background');
			
			// multilayers++
			if(this.support_multi_layers)
			{
				this.rastrLayers = [];
				var rlc = 0;
				for(var i=0;i<this.support_multi_layers_count;i++)
				{
					this.rastrLayers.push(  {id:rlc,div:document.createElement('div'),images:[],url_func:new Function('xx,yy,zz','return '+this.vname+'.PathImageCustom(xx,yy,zz,'+rlc+')')}  );
					this.rastrLayers[rlc].div.id = 'rastrDiv_layer'+rlc;
					this.rastrLayers[rlc].div.style.position = 'absolute';
					this.rastrLayers[rlc].div.style.left = '0px';
					this.rastrLayers[rlc].div.style.top = '0px';
					this.rastrDiv.appendChild(this.rastrLayers[rlc].div);
					
					txt = '';
					for(var y=0;y<this.images_array_y;y++)
					{ this.rastrLayers[rlc].images[y] = [];
					for(var x=0;x<this.images_array_x;x++)
					{
						var tmp_img = document.createElement('img');
						tmp_img.id = 'i'+y+''+x+'_layer0';
						tmp_img.src = global_vars_array[0]+"engine/gif/devider.gif";
						tmp_img.style.width = "256px";
						tmp_img.style.height = "256px";
						tmp_img.style.border = (this.debug ? 'dashed 1px red' : 'none');
						tmp_img.style.position = 'absolute';
						tmp_img.style.left = '0px';
						tmp_img.style.top = '0px';
						tmp_img.border = '0';					
						tmp_img.onload  = new Function('sender','this.style.visibility=\'visible\';');
						tmp_img.onerror = new Function('sender',this.vname+'.LayerImageOnError(this);');
						tmp_img.onabort = new Function('sender',this.vname+'.LayerImageOnError(this);');
						this.rastrLayers[rlc].div.appendChild(tmp_img);			
						this.rastrLayers[rlc].images[y][x] = tmp_img;
					};};
					rlc++;
				};
			};
			// --multilayers
			
			for(var y=0;y<this.images_array_y;y++)
			{ this.images_array[y] = new Array();
			for(var x=0;x<this.images_array_x;x++)
			{ 
				this.images_array[y][x] = new Object();
				this.images_array[y][x].y = y;
				this.images_array[y][x].x = x;
				this.images_array[y][x].img = document.getElementById('i'+y+''+x);
			};};
			
			// for AroundAreaLoad
				var offset = 0;
				var tmp_txt = '';
				this.images_xyprev = new Array();
				for(var y=0;y<this.images_array_y;y++)
				{
					this.images_xyprev[y+offset] = new Image();
					this.images_xyprev[y+offset+this.images_array_y] = new Image();
				};
				offset = 2*this.images_array_y;
				for(var x=0;x<this.images_array_x;x++)
				{
					this.images_xyprev[x+offset] = new Image();
					this.images_xyprev[x+offset+this.images_array_x] = new Image();
				};
				offset += 2*this.images_array_x;
				this.images_xyprev[0+offset] = new Image();
				this.images_xyprev[1+offset] = new Image();
				this.images_xyprev[2+offset] = new Image();
				this.images_xyprev[3+offset] = new Image();
			////////
		}
		
		// возвращает объект класса Layers от карты
		// return Layers
		ClientMap.prototype.MapLayers = {};
		
		// Устанавливаем размер отображаемой карты
		// PUBLIC
		ClientMap.prototype.SetSize = function(w,h)
		{
			var _ppv = this.PrintableAreaV;
			if(_ppv) this.ShowPrintableArea(false);
			
		    if(this.WGSHistoryForm && !this.WGSHistoryForm.killed) this.WGSHistoryForm.Close();
			
			if(this.ShowCircleAreaVis)
			{
				var mmmw = this.map_width;
				var mmmh = this.map_height;
			};
			
			tmp_cx = this.center_x;
			tmp_cy = this.center_y;
			// обновляем размер карты
			this.map_width = w;
			this.map_height = h;
			
			if(this.mainDiv)
			{
				this.mainDiv.style.width = this.map_width;
				this.mainDiv.style.height = this.map_height;
				
				this.hintDiv.style.width = (this.map_width-(this.ie ? 0 : 2))+'px';
				this.hintDiv.style.top = (this.map_top+this.map_height-18)+'px';
				this.hintCloseDiv.style.top = (this.map_top+this.map_height-15-(this.ie ? 1 : 0))+'px';
				this.hintCloseDiv.style.left = (this.map_left+this.map_width-15-(this.ie ? 1 : 0))+'px';
				if(this.zoomScaleRight)
					this.buttonOptionsDiv.style.top = (this.map_top+this.map_height-36)+'px';
				else
					this.buttonOptionsDiv.style.top = (this.map_top+this.map_height-27)+'px';
				this.buttonOptionsDiv.style.left = (this.map_left+this.map_width-9-(this.ie ? 2 : 1))+'px';
				if(this.zoomScaleRight)
					this.buttonOptionsCfg.style.top = (this.map_top+this.map_height-290-10)+'px';
				else
					this.buttonOptionsCfg.style.top = (this.map_top+this.map_height-290)+'px';
				this.buttonOptionsCfg.style.left = (this.map_left+this.map_width-414-(this.ie ? 2 : 0))+'px';
			};						
			
			if(this.coverDiv)
			{
				this.coverDiv.style.width = this.map_width+512;
				this.coverDiv.style.height = this.map_height+512;
			
				this.coverDiv.style.left = -256;
				this.coverDiv.style.top = -256;
			};
			
			if(this.rastrDiv)
			{
				this.rastrDiv.style.left = -256;
				this.map_objects_Div.style.left = -256;
				this.rastrDiv.style.top = -256;
				this.map_objects_Div.style.top = -256;
			};
			
			if(this.statusDiv) this.statusDiv.style.top = this.map_height-18;
			if(this.rightStatusDiv) this.rightStatusDiv.style.left = this.zoomsRight ? this.map_width-35 : 2;
			if(this.statusDiv) this.statusDiv.style.width = this.map_width + 'px';
			if(this.zoomscaleDIV) this.zoomscaleDIV.style.top = (this.map_height - 22) + (this.ie ? 2 : 0) + 'px';
			
			this.for_clnav_setsize();
			
			// Пересчитываем число квадратиков
			this.writeRastr();
			this.SetMapCenter(tmp_cx,tmp_cy,true);		
			if(this.zoomScaleRight) this.UrlUpdate(true);
			
			if(this.clnav && this.clnav.Attached) this.clnav.MoveAttached();
			if(this.ShowCircleAreaVis) 
			{
				var xm = this.ShowCircleAreaVisX * this.map_width/mmmw;
				var ym = this.ShowCircleAreaVisY * this.map_height/mmmh;
				if(xm < 1 || ym < 1 || xm >= this.map_width || ym >= this.map_height) 
					this.HideCircleArea();
				else
					this.ShowCircleArea(xm,ym);
			};
			if(_ppv) this.ShowPrintableArea(_ppv);
		}
		
		// Режим навигации по карте
		// 1 - Move/Shift
		// 2 - Zoom in
		// 3 - Zoom out
		// 4 - Zoom in point
		// 5 - Scale
		// 6 - Custom
		// 128..255 - Move/Shift Map for Extended Functions
		// PUBLIC
		ClientMap.prototype.NavigateMode = function(mode_no)
		{
			if(mode_no == 'nmShift') mode_no = 1;
			if(mode_no == 'nmZoomIn') mode_no = 2;
			if(mode_no == 'nmZoomOut') mode_no = 3;
			if(mode_no == 'nmZoom') mode_no = 4;
			if(mode_no == 'nmScale') mode_no = 5;
			if(mode_no == 'nmInfo') mode_no = 6;
			if(mode_no == 'nmPoint') mode_no = 7; // Get Point LatLon
			
			var prev = this.nav_mode;
			this.flag_ms_move = false;
			this.flag_ms_zoom = false;
			if(mode_no) this.nav_mode = mode_no;
			if(this.nav_mode  < 2) this.mainDiv.style.cursor = this.ie ? 'default' : "url('"+global_vars_array[0]+"engine/cursors/shift_in.cur'), pointer";
			if(this.nav_mode == 2) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/zoom_ins.cur'), crosshair";
			if(this.nav_mode == 3) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/zoom_out.cur'), crosshair";
			if(this.nav_mode == 4) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/zoom_in.cur'), crosshair";
			if(this.nav_mode == 5) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/scale_dot.cur'), crosshair";
			if(this.nav_mode == 6) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/info_tool.cur'), crosshair";
			if(this.nav_mode > 6)  this.mainDiv.style.cursor  = this.custom_cursor;
			if(this.nav_mode != prev) 
			{
				this.for_paneltools_onNavigationModeChanged(this,this.nav_mode);
				this.onNavigationModeChanged(this,this.nav_mode);				
			};
			return this.nav_mode;
		}
		
		// событие при изменении инструмента
		ClientMap.prototype.onNavigationModeChanged = function(sender,mode_no) {}

		// Установка курсора
		ClientMap.prototype.SetCustomCursor = function(custrom_cursor)
		{
			if(custrom_cursor) { this.custom_cursor = custrom_cursor; return true; };
			return false;
		}

//showKey();

		// Мультискролл - сколько прокрутили мышку, столько раз и зум изменили. Иначе выжидаем таймаут.
		ClientMap.prototype.ScrollMultiZoom = false;
		
		ClientMap.prototype.scrollSleepTime = 750; // was 750 ( 16.03.09 )
		ClientMap.prototype.scrollSleep = false;
		ClientMap.prototype.scrollCounter = 0;
		ClientMap.prototype.scroll_already_centered = false;
		
		ClientMap.prototype.scroll_is_running = false;

		//Получение события: скролл мыши; возвращает true если курсор над картой
		// PRIVATE
		ClientMap.prototype.onScrollEvent = function(_delta) 
		{  						
			if(parseInt(_delta) != _delta) return this.flag_ms_over;
			
			if(this.flag_ms_over && !this.flag_ms_move)
			{			
				delta = _delta;
				if(this.op) delta = _delta * -1;
			
				if((this.zoomIndex - delta) < this.zoom_start_from) return this.flag_ms_over;
				if((this.zoomIndex - delta) >= this.zoom_levels.length-1) return this.flag_ms_over;						
				
				if((!this.scroll_is_running) && this.UseZooming)
				{				
					this.scroll_is_running = true;
					this.scroll_already_centered = false;
					this.scrollSleep_x = this.center_x + this.mouse_x - Math.round(this.map_width/2);
					this.scrollSleep_y = this.center_y + this.mouse_y - Math.round(this.map_height/2);
					this.scrollSleep_z = this.zoom;
					this.scrollSleep_xm = this.mouse_x;
					this.scrollSleep_ym = this.mouse_y;
				};
																						
				for(var i=0;i<this.flag_ms_overs.length;i++) if(i != 1 /*zoom на хинтах*/) if(this.flag_ms_overs[i]) this.flag_ms_over = false;
				if(!this.UseZooming && !this.op) if(this.scrollSleep) return this.flag_ms_over; ////
												
				if(this.UseZooming)
				{													
					this.scrollCounter += delta;
										
					if(Math.abs(this.scrollCounter) > 5) 
					{
						this.scrollCounter -= delta;					
						return this.flag_ms_over;
					};
					
					this.zoomDivs_in(delta,this.scrollSleep_x,this.scrollSleep_y);					
						
					if((this.zoomIndex-this.scrollCounter) >= this.zoom_levels.length) this.scrollCounter = this.zoomIndex-this.zoom_levels.length+1;
					if((this.zoomIndex-this.scrollCounter) < this.zoom_start_from) this.scrollCounter = this.zoomIndex - this.zoom_start_from;
					
					if(this.scrollSleep) clearTimeout(this.scrollSleep);
					this.scrollSleep = setTimeout(this.vname+'.onScrollEvent_End();',this.scrollSleepTime);
					
					return this.flag_ms_over;
				};			
			
				if(!this.ScrollMultiZoom) this.scrollSleep = true;
				var mc = this.GetMapCenter();
				if(global_tmp_var_shift_pressed) this.SetMapCenter(mx.x, mc.y+delta*32);
				if(global_tmp_var_alt_pressed) this.SetMapCenter(mc.x+delta*32, mc.y);
				if(!global_tmp_var_shift_pressed && !global_tmp_var_alt_pressed)
					{
						var sz_x = this.mouse_x-Math.round(this.map_width/2);
						var sz_y = this.mouse_y-Math.round(this.map_height/2);
						sz_x = (mc.x + sz_x)*this.zoom;
						sz_y = (mc.y + sz_y)*this.zoom;
						var boolok = false;		
						var bzoom = this.zoom;
						if(delta > 0) 
						{
							boolok = this.ZoomIn(sz_x,sz_y,true); 
						}
						else 
						{
							boolok = this.ZoomOut(sz_x,sz_y,true);
						};
						if(boolok != bzoom) 
						{
							this.SetMapCenter(parseInt(sz_x/this.zoom)-(this.mouse_x-Math.round(this.map_width/2)),parseInt(sz_y/this.zoom)-(this.mouse_y-Math.round(this.map_height/2)));
							if(this.MapEvents.MapZoomScroll) this.MapEvents.MapZoomScroll(this,this.mouse_x-Math.round(this.map_width/2),this.mouse_y-Math.round(this.map_height/2),delta);
							this.UrlUpdate(true);
							this.for_clnav_ChangeZoom(this,this.zoom);
							this.CallExtPlugins('onzoom',{zoom:this.zoom});
							if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);
						};
					};
				if(!this.ScrollMultiZoom)
				this.scrollSleep = setTimeout('clearTimeout('+this.vname+'.scrollSleep);'+this.vname+'.scrollSleep=false;',this.scrollSleepTime);
			};
			return this.flag_ms_over;			
		}
		
		//private
		ClientMap.prototype.onScrollEvent_End = function()
		{
			clearTimeout(this.scrollSleep);
			this.scrollSleep = false;		
			
			var boolok = false;		
			var bzoom = this.zoom;
			if((this.zoomIndex-this.scrollCounter) >= this.zoom_start_from && (this.zoomIndex-this.scrollCounter) < this.zoom_levels.length)
			if(this.scrollCounter != 0) boolok = this.SetZoomFromIndex(this.zoomIndex-this.scrollCounter);
			if(boolok != bzoom) 
			{
				if(!this.scroll_already_centered)
				{
					this.scroll_already_centered = true;
					
					var sz_x = this.scrollSleep_x*this.scrollSleep_z;
					var sz_y = this.scrollSleep_y*this.scrollSleep_z;
			
					this.SetMapCenter(parseInt(sz_x/this.zoom)-(this.scrollSleep_xm-Math.round(this.map_width/2)),parseInt(sz_y/this.zoom)-(this.scrollSleep_ym-Math.round(this.map_height/2)));					
				};
				if(this.MapEvents.MapZoomScroll) this.MapEvents.MapZoomScroll(this,this.scrollSleep_xm-Math.round(this.map_width/2),this.scrollSleep_ym-Math.round(this.map_height/2),this.scrollSleep);
				this.UrlUpdate(true);
				this.for_clnav_ChangeZoom(this,this.zoom);
				this.CallExtPlugins('onzoom',{zoom:this.zoom});
				if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);							
			};
			this.scrollCounter = 0;
		}
		
		// Private
		ClientMap.prototype.MCXYZHistory = [];
		ClientMap.prototype.MCXYZHistory_count = 30;
		ClientMap.prototype.MCXYZHistory_index = 0;
		ClientMap.prototype.MCXYZHistory_dt = 0;
		
		//Получение события: Мышь движется над полем карты
		// PRIVATE
		ClientMap.prototype.onMouseOverRastrDiv = function(mouse_event)
		{
			this.flag_ms_over = true;
		}
		
		//Получение события: События покидании мыши поля карты
		// PRIVATE
		ClientMap.prototype.onMouseOutRastrDiv = function(mouse_event)
		{
			if(!this.flag_ms_move) this.flag_ms_over = false;
		}
		
		// Отключить контекстные меню карты
		ClientMap.prototype.DisableContextMenus = false;
		
		// Событие при правом клике
		ClientMap.prototype.onContextMenu = function(event)
		{
			if(this.overcfg) return true;
			
			var targ = {}; // targ.tagName;
			if (event.target) { targ = event.target; }
			else if (event.srcElement) { targ = event.srcElement; }
			if (targ.nodeType == 3) { targ = targ.parentNode; }			
			
			// disable ` this.flag_ms_overs `
			// for(var i=0;i<this.flag_ms_overs.length;i++) if(this.flag_ms_overs[i]) this.flag_ms_over = false;
			
			if(this.flag_ms_over && !this.DisableContextMenus)
			{
				var count = this.MapLayers.CheckInPXLsPopup(this.center_x + this.mouse_x-Math.round(this.map_width/2),this.center_y + this.mouse_y-Math.round(this.map_height/2),false,true);
				if(count.total > 0 && count.popup == 0)
				{
					var pm = new TPopupMenu(350);
					pm.setDiv(document.getElementById("windowroot"), true);
					pm.AddItem('Укажите объект который вы хотите выбрать:',function(){},true);
					pm.AddItem('',function(){},true);
					for(var i=0;i<count.objects.length;i++)
					{
						var atext = "";
						if(this.UseHintNoCaption) atext = "<b>" + count.objects[i].name + "</b>"+ (this.UseHintID ? " ("+ count.objects[i].id+")" : "");
						if(count.objects[i].Hint && count.objects[i].Hint.length > 0) atext = count.objects[i].Hint;
						pm.AddItem( atext, count.objects[i].onclick_function, false, count.objects[i]  );
					};
					pm.Popup(this.global.mouse_x,this.global.mouse_y);					
				};
				if(count.total == 0)
				{
					var _cp = {clmap:this,clickpoint:{x: this.mouse_x, y: this.mouse_y}};
					var mitems = [];
					var onpop = function(sender){};					
					if(this.predirect && this.predirect.Map && this.predirect.Map.Popup)
					{
						if(this.predirect.Map.Popup.Items) mitems = this.predirect.Map.Popup.Items;
						if(this.predirect.Map.Popup.onPopup && (typeof(this.predirect.Map.Popup.onPopup) == 'function')) onpop = this.predirect.Map.Popup.onPopup;
					};
					_cp.menuitems = mitems;
					
					onpop(_cp);
					
					var pm = new TPopupMenu(360);
					pm.setDiv(document.getElementById("windowroot"), true);
					pm.AddItem(this.ToString(true),function(){},true);					
					if(mitems.length == 0) pm.AddItem('',function(){},true);
					pm.AddItem('О модуле...', new Function('',this.vname+'.ShowAbout();') );					
					if(mitems.length > 0) pm.AddItem('',function(){},true);
										
					for(var i=0;i<mitems.length;i++)
					{
						if(mitems[i].hidden) continue;
						pm.AddItem(mitems[i].caption,mitems[i].func,(false || mitems[i].disable), _cp );
						if(mitems[i].checked) pm.CheckItem(pm.GetItemsCount()-1);
					};
					
					pm.Popup(this.global.mouse_x,this.global.mouse_y);
					return false;
				};
				return count.total == 0;
			};
			
			if(targ.oncontextmenu) 
			{				
				return targ.oncontextmenu(); // FF преимущественно
			};
			
			if(this.ie) while(targ = targ.parentNode) // наследование в IE
			{
				if(targ.tagName == 'BODY') break;
				if(targ.oncontextmenu) return false;
			};
			
			return true;
		}
		
		//Получение события: о глобальном нажатии кнопки мыши
		// PRIVATE
		ClientMap.prototype.onMouseGlobalDown = function(mouse_event)
		{
			for(var i=0;i<this.flag_ms_overs.length;i++) if(this.flag_ms_overs[i]) this.flag_ms_over = false;
			this.flag_ms_zoom_width = 0;
			this.flag_ms_zoom_height = 0;
			if(this.flag_ms_over)  
			{
				this.click = false;
				
				if(this.nav_mode == 1 || this.nav_mode == 5 || this.nav_mode == 6 || this.nav_mode == 7 || (this.nav_mode > 127 && this.nav_mode < 256) )
				{
					//if(this.ie) this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/hand_move.cur'), pointer";
					this.flag_ms_move = true;
					this.ms_x = mouse_event.x;
					this.ms_y = mouse_event.y;
					this.ms_xs = parseInt(this.coverDiv.style.left);
					this.ms_ys = parseInt(this.coverDiv.style.top);
					this.tmp_var01 = true;
					this.SetMapCrossVisible(true,true);
				};
				if(this.nav_mode == 2)
				{
					this.flag_ms_zoom = true;
					this.zoomDiv.style.width = 2;
					this.zoomDiv.style.height = 2;
					this.zoomDiv.style.visibility = '';
					this.zoomDiv.style.display = 'block';
					this.zoomDiv.style.left = mouse_event.x;
					this.flag_ms_zoom_sx = mouse_event.x;
					this.zoomDiv.style.top  = mouse_event.y;
					this.flag_ms_zoom_sy = mouse_event.y;
				};
				if(this.nav_mode == 3)
				{
					var sz_x = mouse_event.x-Math.round(this.map_width/2)-this.map_left;
					var sz_y = mouse_event.y-Math.round(this.map_height/2)-this.map_top;
					var mc = this.GetMapCenter();
					sz_x = (mc.x + sz_x)*this.zoom;
					sz_y = (mc.y + sz_y)*this.zoom;
					if(this.ZoomOut()) 
					{
						this.SetMapCenter(parseInt(sz_x/this.zoom)-(this.mouse_x-Math.round(this.map_width/2)),parseInt(sz_y/this.zoom));
						if(this.MapEvents.MapZoomOut) this.MapEvents.MapZoomOut(this,mouse_event.x-Math.round(this.map_width/2)-this.map_left,mouse_event.y-Math.round(this.map_height/2)-this.map_top);
					};
				};
				if(this.nav_mode == 4)
				{
					var sz_x = mouse_event.x-Math.round(this.map_width/2)-this.map_left;
					var sz_y = mouse_event.y-Math.round(this.map_height/2)-this.map_top;
					var mc = this.GetMapCenter();
					sz_x = (mc.x + sz_x)*this.zoom;
					sz_y = (mc.y + sz_y)*this.zoom;
					if(this.ZoomIn()) 
					{
						this.SetMapCenter(parseInt(sz_x/this.zoom)-(this.mouse_x-Math.round(this.map_width/2)),parseInt(sz_y/this.zoom)-(this.mouse_y-Math.round(this.map_height/2)));
						if(this.MapEvents.MapZoomInPxls) this.MapEvents.MapZoomInPxls(this,mouse_event.x-Math.round(this.map_width/2)-this.map_left,mouse_event.y-Math.round(this.map_height/2)-this.map_top);
					};
				};				
				
				var pp_tmp_x = this.mouse_x-Math.round(this.map_width/2);
				var pp_tmp_y = this.mouse_y-Math.round(this.map_height/2);
				this.CallExtPlugins('onmousedown',{sender:this,x:pp_tmp_x,y:pp_tmp_y});
				if(this.MapEvents.MouseDown) this.MapEvents.MouseDown(this,pp_tmp_x,pp_tmp_y);
			};
		}
		
		ClientMap.prototype.preMouseDblClick_Interval = 300;
		ClientMap.prototype.preMouseClick_Time = 0;
		ClientMap.prototype.preMouseClick = function(sender,x,y) 
		{
			var now = new Date();    
			if(now.getTime() < this.preMouseClick_Time)
			{
				this.CallExtPlugins('ondblclick',{sender:sender,x:x,y:y});
				if(this.MapEvents.MouseDblClick) this.MapEvents.MouseDblClick(sender,x,y);
				this.preMouseClick_Time = now.getTime();
			}
			else
			{
				this.for_paneltools_MouseClick(sender,x,y);				
				
				// CALL Plugins
				if(this.nav_mode > 5) this.CallExtPlugins('onclick',{sender:sender,x:x,y:y});				
				
				if(this.MapEvents.MouseClick) this.MapEvents.MouseClick(sender,x,y);				
				this.preMouseClick_Time = now.getTime() + this.preMouseDblClick_Interval;				
			};
		}				
		
		//public Set Map Center Dialog
		ClientMap.prototype.ShowSMCDlg = function()
		{
			var dlg = new TDialog();
			dlg.fillStyle = '#FFAA99';
			dlg.clmap = this;
			dlg.init(6,['Установить','Отмена'],280,160);
			dlg.setDefaultButton(0);
			dlg.setDiv(document.getElementById('windowroot'));
			dlg.SetCaption('Установка центра карты');
			var ctr = this.GetMapCenterInLatLon();
			dlg.SetText('&nbsp;<br/><div>Широта: <input type="text" id="cosvinslotnameX" value="'+ctr.lat+'" style="width:100px;" maxlength="15"/></div><div style="position:relative;top:2px;">Долгота: <input type="text" id="cosvinslotnameY" value="'+ctr.lon+'" style="width:100px;" maxlength="15"/></div>');
			dlg.Execute( new Function('sender, choosed_item',this.vname+'.ShowSMCDlgOK(choosed_item)') );
			document.getElementById('cosvinslotnameX').select();
		}
		ClientMap.prototype.ShowSMCDlgOK = function(itm)
		{
			if(itm != 0) return;
			var x = parseFloat(document.getElementById('cosvinslotnameX').value);
			var y = parseFloat(document.getElementById('cosvinslotnameY').value);
			if((x!=0) && (y!=0)) this.SetMapCenterInLatLon(x,y);
		}			
		
		//private
		ClientMap.prototype.GridIsOn = false;
		
		//public not-IE
		ClientMap.prototype.Grid = function(set_on)
		{ 	
			if(this.ie) return;
			
			this.GridIsOn = set_on == true;
			
			if(this.overMapDiv_Grid) 
			{
				this.overMapDiv.removeChild(this.overMapDiv_Grid);
				this.overMapDiv_Grid = false;
			};
			
			if(!this.GridIsOn) return;
			if(this.zoomIndex > 12) return;
			
			var d_lT = this.GetDistanceInMeters( ((this.center_x)*this.zoom),-1*((this.center_y-this.map_height/2)*this.zoom),((this.center_x+1000)*this.zoom),-1*((this.center_y-this.map_height/2)*this.zoom) ) / 1000;
			var d_lB = this.GetDistanceInMeters( ((this.center_x)*this.zoom),-1*((this.center_y+this.map_height/2)*this.zoom),((this.center_x+1000)*this.zoom),-1*((this.center_y+this.map_height/2)*this.zoom) ) / 1000;
			
			var norm = this.Z_Prev[0]/this.Z_Prev[1];
			d_lT = Math.floor(this.Z_Prev[0]/d_lT);
			d_lB = Math.floor(this.Z_Prev[0]/d_lB);
			
			this.overMapDiv_Grid = document.createElement('div');
			this.overMapDiv_Grid.id = 'clmapGrid';
			this.overMapDiv_Grid.style.position = 'absolute';
			this.overMapDiv_Grid.style.left = '0px';
			this.overMapDiv_Grid.style.top = '0px';
			this.overMapDiv_Grid.style.width = this.map_width;
			this.overMapDiv_Grid.style.height = this.map_height;
			
			this.overMapDiv.appendChild(this.overMapDiv_Grid);
			var ppr = Raphael(this.overMapDiv_Grid,this.map_width,this.map_height);
			var p1 = ppr.path().attr( {stroke:'#000','stroke-width':1,'stroke-opacity':0.6} );
			
			var _dT = 0, _dB = 0;
			while((_dT < this.map_width) && (_dB < this.map_width))
			{
				p1.moveTo(this.map_width/2+_dT,0);
				p1.lineTo(this.map_width/2+_dB,this.map_height);
				if(_dT != 0)
				{
					p1.moveTo(this.map_width/2-_dT,0);
					p1.lineTo(this.map_width/2-_dB,this.map_height);
				};
				_dT += d_lT;
				_dB += d_lB;
			};
			var _d = 0;
			while(_d < this.map_height/2)
			{
				p1.moveTo(0,this.map_height/2+_d);
				p1.lineTo(this.map_width,this.map_height/2+_d);
				if(_d != 0)
				{
					p1.moveTo(0,this.map_height/2-_d);
					p1.lineTo(this.map_width,this.map_height/2-_d);
				};
				_d += this.Z_Prev[1];
			};
		}
		
		// События - EVENTЫ
		ClientMap.prototype.MapEvents = new MapEvents(this);		

		function MapEvents(parent) { this.parent = parent; return this;}		
		MapEvents.prototype.type = 'TMapEvents';
		
		// нажимаем мышу на карты; x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MouseDown 		= function(sender,x,y) {}
		// отпускаем мышу на карте; x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MouseUp 		= function(sender,x,y) {}
		// клик; x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MouseClick 		= function(sender,x,y) {}
		// клик; x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MouseDblClick 	= function(sender,x,y) {}
		// Начинаем двигать карту (нажимаем мышку); x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MapMoveBegin	= function(sender,x,y) {}
		// Отпускаем мышу на сдвинутой карте; x, y - величина сдвига карты
		MapEvents.prototype.MapMoved 		= function(sender,x,y) {}
		// Сдвиг карты более чем на квадрат 256x256 пкс.
		MapEvents.prototype.MapMovedSquared	= function(sender) {}
		// Изменен центр карты
		MapEvents.prototype.MapCenterChanged= function(sender, squared, fixed) {}		
		// Движение мыжки над областью карты, ; x, y - координаты мыши относительно центра карты
		MapEvents.prototype.MouseMove 		= function(sender,x,y) { if(sender.debug) window.status = "XY "+ x+":"+y+" MAP "+sender.GetMapCenter().x+":"+sender.GetMapCenter().y+" MAPO "+sender.center_x+":"+sender.center_y;	}
		// Двигаем карту мышой; x, y - величина сдвига карты
		MapEvents.prototype.MapMove 		= function(sender,x,y) { if(sender.debug) window.status = "dXdY "+x+":"+y+" MAP: "+sender.GetMapCenter().x+":"+sender.GetMapCenter().y+" MAPO "+sender.center_x+":"+sender.center_y;	}
		// Отрабатывает изменение зума по навигатору +; wi - ширина нового растра; he - высота нового растра; map_cx, map_cy -центр нового растра 
		MapEvents.prototype.MapZoomIn		= function(sender,wi,he,map_cx,map_cy) {}
		// Отрабатывает изменение зума по навигатору - ; x, y - координаты сдвига относительно центра карты
		MapEvents.prototype.MapZoomOut		= function(sender,x,y) {}
		// Отрабатывает изменение зума по навигатору + без области выбора ; x, y - координаты сдвига относительно центра карты
		MapEvents.prototype.MapZoomInPxls	= function(sender,x,y) {}
		// Отрабатывает изменение зума по скроллу; x, y - координаты сдвига относительно левого верхнего угла карты; direct - направление скролла
		MapEvents.prototype.MapZoomScroll 	= function(sender,x,y,direct) {}
		// Изменение зума карты
		MapEvents.prototype.ChangeZoom		= function(sender,new_zoom) {}
		
		// v 1.2.0.28
		// Мышка замерла над точкой (600мс)
		MapEvents.prototype.MouseIdle		= function(sender,x,y) { }
		// Мышка над картой заснула
		MapEvents.prototype.MouseSleep		= function(sender,x,y) { }
		
		// PRIVATE
		ClientMap.prototype.for_paneltools_MouseClick = function(sender,x,y) {}
		ClientMap.prototype.for_paneltools_MouseMove = function(sender,x,y) {}
		ClientMap.prototype.for_paneltools_onNavigationModeChanged = function(sender,mode_no) {}
		ClientMap.prototype.for_clnav_MapMoved = function(sender,x,y){}
		ClientMap.prototype.for_clnav_MapMove = function(sender,x,y){}
		ClientMap.prototype.for_clnav_ChangeZoom = function(sender,new_zoom){}
		ClientMap.prototype.for_clnav_PreChangeZoom = function(sender) {}
		ClientMap.prototype.for_clnav_setsize = function() {};
		
		// Private
		//ClientMap.prototype.
		
		// ЗАКРЫВАЕМ ЗУМ КАРТЫ
		// PRIVATE
		ClientMap.prototype.EndZoomNavigate = function(wi,he,cx,cy)
		{
			var tmp_x = this.GetMapCenter().x - (Math.round(this.map_width / 2) - (cx - parseInt(this.map_left)));
			var tmp_y = this.GetMapCenter().y - (Math.round(this.map_height / 2) - (cy - parseInt(this.map_top)));
			sz_x = (tmp_x)*this.zoom;
			sz_y = (tmp_y)*this.zoom;
			var new_zoom = wi*this.zoom/this.map_width;
			
			var tmp_zoom = 40030000, tmp_new = 0;
			for(var i=this.zoom_start_from;i<this.zoom_levels.length;i++) 
			if(Math.abs(new_zoom - this.zoom_levels[i]) < tmp_zoom) 
			{
				tmp_zoom = Math.abs(new_zoom - this.zoom_levels[i]);
				tmp_new = this.zoom_levels[i];
			};
			
			if(this.zoom != this.SetZoomFromLevels(tmp_new))
			{
				this.SetMapCenter(parseInt(sz_x/this.zoom),parseInt(sz_y/this.zoom));
				if(this.MapEvents.MapZoomIn) this.MapEvents.MapZoomIn(this,Math.round(wi),Math.round(he),tmp_x,tmp_y);			
			};
		}
		
		ClientMap.prototype.RequestImg = function(url)
		{
			try 
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserAccess");
			}
			catch (e) { /* alert("Permission UniversalBrowserRead denied."); */ };
	
			var httpReq = false;
			if (typeof XMLHttpRequest!='undefined') {
				httpReq = new XMLHttpRequest();
			} else {
				try {
					httpReq = new ActiveXObject("Msxml2.XMLHTTP.4.0");
				} catch (e) {
					try {
						httpReq = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (ee) {
						try {
							httpReq = new ActiveXObject("Microsoft.XMLHTTP");
						} catch (eee) {
							httpReq = false;
						}
					}
				}
			}
			
			httpReq.open("GET", url, true);
			httpReq.send();	
		}
		
		// подгрузка соседних квадратиков карты
		//PRIVATE
		ClientMap.prototype.AroundAreaLoad = function()
		{
			var z_i = this.GetZoomArrayLevel(this.zoom);
				var offset = 0;
				for(var y=0;y<this.images_array_y;y++)
				{
					//this.images_array[y][0]
					this.images_xyprev[y+offset].src = this.zoom_format(this.images_array[y][0].x-1,this.images_array[y][0].y,z_i);
					//this.images_array[y][this.images_array_x-1]
					this.images_xyprev[y+offset+this.images_array_y].src = this.zoom_format(this.images_array[y][this.images_array_x-1].x+1,this.images_array[y][this.images_array_x-1].y,z_i);
				};
				offset = 2*this.images_array_y;
				for(var x=0;x<this.images_array_x;x++)
				{
					//this.images_array[0][x]
					this.images_xyprev[x+offset].src = this.zoom_format(this.images_array[0][x].x,this.images_array[0][x].y-1,z_i);
					//this.images_array[this.images_array_y-1][x]
					this.images_xyprev[x+offset+this.images_array_x].src = this.zoom_format(this.images_array[this.images_array_y-1][x].x,this.images_array[this.images_array_y-1][x].y+1,z_i);
				};
				offset += 2*this.images_array_x;
				this.images_xyprev[0+offset].src = this.zoom_format(this.images_array[0][0].x-1,this.images_array[0][0].y-1,z_i);
				this.images_xyprev[1+offset].src = this.zoom_format(this.images_array[0][this.images_array_x-1].x+1,this.images_array[0][this.images_array_x-1].y-1,z_i);
				this.images_xyprev[2+offset].src = this.zoom_format(this.images_array[this.images_array_y-1][this.images_array_x-1].x+1,this.images_array[this.images_array_y-1][this.images_array_x-1].y+1,z_i);
				this.images_xyprev[3+offset].src = this.zoom_format(this.images_array[this.images_array_y-1][0].x-1,this.images_array[this.images_array_y-1][0].y+1,z_i);
		}
		
		ClientMap.prototype.zoomScaleRight = false;
		
		//private
		ClientMap.prototype.clnav_offset = 0;
		
		// private 
		ClientMap.prototype.Z_Array = [20,50,100,200,400,500,1000,2000,2500,4000,5000,10000,20000,25000,40000,50000,100000,200000,250000,400000,500000,1000000,2000000,2500000,4000000,5000000,10000000];
		ClientMap.prototype.Z_Elements = 4;
		ClientMap.prototype.Z_Prev = [0,0];
		
		// Установка URLa
		//PRIVATE
		ClientMap.prototype.UrlUpdate = function(zoomchanged)
		{				
				if(this.zoom_scale_visible)
				{	
					var z_indexes = [], p_length = 0, z_length = 0;
					var d_length = this.GetDistanceInMeters( ((this.center_x)*this.zoom),-1*(this.center_y*this.zoom),((this.center_x+1000)*this.zoom),-1*(this.center_y*this.zoom) ) / 1000;
					
					for(var i=0;i<this.Z_Array.length;i++)
					{
						var pxls = this.Z_Array[i] / d_length;
						if(pxls >= 48 && pxls <= 140) z_indexes.push(i);
					};
					
					z_length = this.Z_Array[z_indexes[z_indexes.length-1]];
					p_length = Math.floor(z_length / d_length);
					d_length = z_length;

					var changed = (this.Z_Prev[0] != d_length) || (this.Z_Prev[1] != p_length);
					if(changed)
					{					
						var val_ = '<div style="position:relative;top:'+(this.ie ? '-3' : '0')+'px;left:6px;font-size:10px;width:'+p_length+'px;font-family:Times New Roman;color:#000033;" align="center">'+(d_length < 1000 ? (d_length + ' м') : (d_length / 1000) + ' км')+'</div><div style="width:'+p_length+'px;height:'+(this.ie ? 6 : 4)+'px;background:#000000;border:solid 1px #666666;position:relative;top:'+(this.ie ? '-3' : '0')+'px;left:6px;filter:alpha(opacity=75);-moz-opacity:0.75;opacity: 0.75;-khtml-opacity: 0.75;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=75);font-size:4px;overflow:hidden;" onclick="MessageDlg(\'Масштаб карты\',\'<br/>Текущий масштаб карты:<br/><b>В '+p_length+' пикселях '+(d_length < 1000 ? (d_length + ' метров') : (d_length / 1000) + ' километров')+'</b>.\',2);">';
						for(var ii=0;ii<this.Z_Elements;ii++)
						{
							val_ += '<div style="position:absolute;left:'+parseInt(p_length/this.Z_Elements*ii)+'px;top:0px;background:'+(ii % 2 ? 'yellow' : 'black')+';height:4px;width:'+parseInt(p_length/this.Z_Elements+1)+'px;">&nbsp;</div>';
						}
						val_ += '<div style="border:solid 1px #666666;border-bottom:none;border-top:none;position:relative;top:'+(this.ie ? '-14' : '-9')+'px;left:6px;width:'+p_length+'px;height:3px;font-size:3px;">&nbsp;</div></div>';
						this.zoomscaleDIV.innerHTML = val_;
						this.Z_Prev = [d_length,p_length];						
					};					
					
					if(changed || zoomchanged)
					{
						if(this.zoomScaleRight)
						{
							this.zoomscaleDIV.style.left = (this.map_width - this.Z_Prev[1] - 10 - this.clnav_offset) +'px';
							this.zoomscaleDIV.style.top = (this.map_height-37) + (this.ie ? 2 : 0)+ 'px';
							this.buttonOptionsDiv.style.top = (this.map_top+this.map_height-36)+'px';
							this.buttonOptionsCfg.style.top = (this.map_top+this.map_height-290-10)+'px';
						}
						else 
						{
							this.zoomscaleDIV.style.left = 0 + this.clnav_offset;
						};
						if(this.GridIsOn) this.Grid(true);
					};
				};
				this.zoomscaleDIV.style.visibility = this.zoom_scale_visible ? 'visible' : 'hidden';
				
			if(zoomchanged) 
			{
				this.flag_ms_overs[0] = false;
				if(this.zoom_levels && this.rightStatusDIV_zoom_scale)
				{
					var tmp_b = 16 / this.zoom_levels.length;
					var tmp_a = '<table cellspacing="1" cellpadding="0" class="baku" id="zoomtable">';
					for(var i=this.zoom_start_from;i<this.zoom_levels.length;i++)
					{
						tmp_a += '<tr><td align="center" onmouseout="this.style.background=\'none\';" onmouseover="this.style.background=\'#000000\';" class="">';
						if(this.zoom != this.zoom_levels[i])
							tmp_a += '<img width="'+Math.round(tmp_b*i)+'" vspace="1" height="8" border="0" name="zm_s6" src="'+global_vars_array[0]+'engine/gif/_s1.gif" onclick="'+this.vname+'.SetZoomFromIndex('+i+',true);"  title="Масштаб '+(i)+' из '+this.zoom_start_from+'..16"/><img width="'+Math.round(16-tmp_b*i)+'" vspace="1" height="8" border="0" name="zm_6" src="'+global_vars_array[0]+'engine/gif/_s0.gif" onclick="'+this.vname+'.SetZoomFromIndex('+i+',true);" title="Масштаб '+(i)+' из '+this.zoom_start_from+'..16"/>';
						else
							tmp_a += '<img width="16" vspace="1" height="8" border="0" name="zm_s6" src="'+global_vars_array[0]+'engine/png/fon.png" style="background:#ff9900;" title="Текущий масштаб '+(i)+' из '+this.zoom_start_from+'..16"/>';
						tmp_a += '</td></tr>';
					};
					tmp_a += '</table>';
					this.rightStatusDIV_zoom_scale.innerHTML = tmp_a;
				};
				if(this.map_layers) this.map_layers.SetZoom(this.zoom);
			};
			if(this.url_update)
			{
				
				this.url.setHashParam('z',this.GetZoomArrayLevel(this.zoom)); 
				if(this.url_latlon)
				{
					var wgs = this.GetMapCenterInLatLon();
					this.url.setHashParam('lat',wgs.lat); 
					this.url.setHashParam('lon',wgs.lon); 
				}
				else
				{
					this.url.setHashParam('x',Math.round(this.center_x*this.zoom)); 
					this.url.setHashParam('y',Math.round(-1*this.center_y*this.zoom)); 
				};
				this.url.SetLoc();
			};
		}
		
		//private
		ClientMap.prototype.squared_posx = 0;
		ClientMap.prototype.squared_posy = 0;
		ClientMap.prototype.squared_posx_was = 0;
		ClientMap.prototype.squared_posy_was = 0;
		ClientMap.prototype.squared_posx_was_d = 0;
		ClientMap.prototype.squared_posy_was_d = 0;
		
		// private
		ClientMap.prototype.MapCenterPreChanged = function(bymouse,mouse_still_moving)
		{
			var aaa = '0';
			this.squared_posx = this.center_x - this.center_x % 256;
			this.squared_posy = this.center_y - this.center_y % 256;
			// * // * //
			if(bymouse && mouse_still_moving)
			{
				if((this.squared_posx_was_d != this.squared_posx) || (this.squared_posy_was_d != this.squared_posy))
				{
					this.squared_posx_was_d = this.squared_posx;
					this.squared_posy_was_d = this.squared_posy;
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,true,false);
					aaa = 1;
				}
				else 
				{
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,false,false);
					aaa = -1;
				};
			};
			// * // * //
			if(bymouse && !mouse_still_moving)
			{
				if((this.squared_posx_was != this.squared_posx) || (this.squared_posy_was != this.squared_posy))
				{
					this.squared_posx_was = this.squared_posx;
					this.squared_posy_was = this.squared_posy;
					this.CallExtPlugins('onmapmovedSquared',{sender:this});
					if(bymouse && this.MapEvents.MapMovedSquared) this.MapEvents.MapMovedSquared(this);	
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,true,true);
					aaa = 2;
				}
				else
				{
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,false,true);
					aaa = -2;
				};
			};
			// * // * //
			if(!bymouse)
			{
				if((this.squared_posx_was != this.squared_posx) || (this.squared_posy_was != this.squared_posy))
				{
					this.squared_posx_was = this.squared_posx;
					this.squared_posy_was = this.squared_posy;
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,true,true);
					aaa = 3;
				}
				else
				{
					if(this.MapEvents.MapCenterChanged) this.MapEvents.MapCenterChanged(this,false,true);
					aaa = -3;
				}
			};
			// * // * //
			// try
			// {
			// 	document.getElementById("test_div").innerHTML = aaa +' '+ bymouse +' '+ (new Date()).getTime();
			// } catch (e) {}			
			if(aaa == 2) this.AddToWGSHistory();
		}
		
		// private
		ClientMap.prototype.AddToWGSHistory = function()
		{
			if(this.AddToWGSHistoryTO) clearTimeout(this.AddToWGSHistoryTO);
			this.AddToWGSHistoryTO = setTimeout(this.vname+'.AddToWGSHistoryOk();',750);
		}
		
		// private
		ClientMap.prototype.AddToWGSHistoryOk = function()
		{
			clearTimeout(this.AddToWGSHistoryTO);			
			
			if(this.center_x == 0 || this.center_y == 0 || this.zoomIndex < 0) return;
			
			var dt = new Date(); 
			if((dt.getTime()-this.MCXYZHistory_dt) < 750) return;
			this.MCXYZHistory_dt = dt.getTime();
			
			if(this.MCXYZHistory.length == this.MCXYZHistory_count)
				for(var i=1;i<this.MCXYZHistory.length;i++) this.MCXYZHistory[i-1] = this.MCXYZHistory[i];
			
			var xxx = this.ConvertPointToLatLon(this.center_x*this.MapZoom,-1*this.center_y*this.MapZoom);
			dt = dt.getHours()+":"+IntToBase(dt.getMinutes(),10,2)+":"+IntToBase(dt.getSeconds(),10,2);
			
			this.MCXYZHistory[this.MCXYZHistory_index] = {lat:Math.floor(xxx.lat*1000000)/1000000,lon:Math.floor(xxx.lon*1000000)/1000000,z:this.zoomIndex,dt:dt,su:this.Configuration.GetShortURL()};
			if(this.MCXYZHistory_index<(this.MCXYZHistory_count-1)) this.MCXYZHistory_index++;
			
			if(this.WGSHistoryForm && !this.WGSHistoryForm.killed) this.ShowWGSHistory(-1);
		}
		
							// private / public
							ClientMap.prototype.ShowWGSHistory = function(time)
							{
								if(this.WGSorCookiesCurrentActive) { this.SetWGSHistoryCookies(time); return };
								
								// получаем координаты мыши в документе
								var x = this.global.mouse_x;
								var y = this.global.mouse_y - 10;
								
								var form = new MiniPopupTooltip('trup');
								this.WGSHistoryForm = form;
								form.Show(this.map_left+2,this.map_top+2,time);																
								var mydiv = form.DIV;
								mydiv.style.textAlign='left';
								mydiv.style.height = this.map_height - 8;
								mydiv.style.width = '380px';
								
								var mdtmp = document.getElementById('popuptooltiptrup');
								mdtmp.style.opacity = '0.9'
								mdtmp.style.filter = 'alpha(opacity=90)';
								
								mydiv.innerHTML = '<img src="'+global_vars_array[0]+'engine/gif/clock.gif" style="position:absolute;left:6px;top:6px;"/>'+
								'<div style="position:absolute;left:26px;top:4px;font-size:16px;"><b>История просмотра карты</b></div>'+ // заголовок
								'<div id="clmapwgshist_0_div" style="overflow:auto;height:'+(this.map_height-58)+'px;width:365px;position:absolute;left:10px;top:45px;font-size:12px;"></div>'+// вывод списка домов
								'<div style="position:absolute;left:12px;top:24px;font-size:12px;width:auto;color:gray;cursor:defalut;">Верхняя запись является текущем положением</div>'+
								'<img src="'+global_vars_array[0]+'engine/gif/bookmark2_small.gif" style="position:absolute;left:355px;top:25px;cursor:pointer;" onclick="'+this.vname+'.SetWGSHistoryCookies('+time+',false);" title="Показать сохраненные точки в cookies"/>'+
								(time < 0 ? '<div style="position:absolute;left:373px;top:0px;font-size:14px;"><a href="#" onclick="'+this.vname+'.WGSHistoryForm.Close();return false;" style="text-decoration:none;color:black;" title="Закрыть">х</a></div>' : ''); // кнопка закрыть
								
								outdiv = document.getElementById("clmapwgshist_0_div");
								var ctr = 0; // четный/нечетный
								for(var i=this.MCXYZHistory.length-1;i>=0;i--)
								{
									ctr++;
									var first = i == (this.MCXYZHistory.length-1);
									var myx = document.createElement('div');	
									
									myx.innerHTML = '<table id="MCXYZHistoryItm_'+i+'" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;width:100%;"><tr><td>&nbsp;</td><td>&nbsp;<b>Масштаб:</b> ' + this.MCXYZHistory[i].z +'</td><td align="right">'+this.MCXYZHistory[i].dt+'&nbsp;</td></tr>'+
									'<tr><td>&nbsp;&nbsp;'+(this.MCXYZHistory.length-i)+'</td><td>&nbsp;<b>Широта:</b> '+this.MCXYZHistory[i].lat+'°</td><td align="center" style="color:silver;">&nbsp;</td></tr>'+
									'<tr><td>&nbsp;</td><td>&nbsp;<b>Долгота:</b> '+this.MCXYZHistory[i].lon+'°</td><td align="right"><a href="#" onclick="'+this.vname+'.SetWGSHistory_ignored=true;return false;" style="text-decoration:none;font-size:12px;" title="Удалить эту запись"><img src="'+global_vars_array[0]+'engine/png/delete.png" border="0"/></a>&nbsp;</td></tr></table>';
									
									myx.style.cursor = 'pointer';
									myx.normalColor = ctr % 2 ? '#FFFFDD' : 'white';
									myx.style.backgroundColor = myx.normalColor;									
									myx.style.borderBottom = 'solid 1px gray';
									myx.title = first ? 'Текущее положение (0)' : 'Запись истории карты (-'+(this.MCXYZHistory.length-i-1)+')';
									myx.onmouseover = new Function('',this.vname+'.WGSHistoryCColor('+i+',true,'+(ctr % 2)+');');
									myx.onmouseout = new Function('',this.vname+'.WGSHistoryCColor('+i+',false,'+(ctr % 2)+');');
									myx.oncontextmenu = new Function('',this.vname+'.WGSHistoryContext('+i+');return false;');
									myx.onclick = new Function('',this.vname+'.SetWGSHistory('+i+');return false;');
									outdiv.appendChild(myx);
									this.MCXYZHistory[i].div  = myx;
									this.MCXYZHistory[i].mdiv = mydiv;
									this.MCXYZHistory[i].tbl  = document.getElementById("MCXYZHistoryItm_"+i);									
								};
							}
							
							// private
							ClientMap.prototype.WGSHistoryCColor = function(ind,mouseover,ch)
							{
								if(this.MCXYZHistory[ind])
								{
									this.MCXYZHistory[ind].div.style.background = mouseover ? 'navy' : ch ? '#FFFFDD' : 'white';
									this.MCXYZHistory[ind].tbl.style.background = mouseover ? 'navy' : ch ? '#FFFFDD' : 'white';
									this.MCXYZHistory[ind].div.style.color = mouseover ? 'white' : 'black';
									this.MCXYZHistory[ind].tbl.style.color = mouseover ? 'white' : 'black';
								};
							}
							
							//private
							ClientMap.prototype.WGSHistoryContext = function(ind)
							{
								if(!this.WGSPopup)
								{
									this.WGSPopup = new TPopupMenu(300);
									this.WGSPopup.setDiv(document.getElementById("windowroot"), true);
								}
								else this.WGSPopup.ClearItems();
								this.WGSPopup.AddItem('<b>Запись истории в '+this.MCXYZHistory[ind].dt+'</b>',function(){},true);
								this.WGSPopup.AddItem('',function(){},true);
								this.WGSPopup.AddItem('<b>Установить карту</b> в эту точку', new Function('',this.vname+'.SetWGSHistory('+ind+');return false;'), false, this  );
								this.WGSPopup.AddItem('<b>Получить</b> короткую <b>ссылку</b> на эту точку', new Function('',this.vname+'.GetWGSShortHistory('+ind+');return false;'), false, this  );
								this.WGSPopup.AddItem('',function(){},true);
								this.WGSPopup.AddItem('Удалить эту запись из истории', new Function('',this.vname+'.SetWGSHistory_ignored=true;'+this.vname+'.SetWGSHistory('+ind+');return false;'), false, this  );
								this.WGSPopup.AddItem('Очистить историю просмотра карты', new Function('',this.vname+'.SetWGSHistoryClear();return false;'), false, this  );
								this.WGSPopup.Popup(this.global.mouse_x,this.global.mouse_y);
							}
							
							//private
							ClientMap.prototype.GetWGSShortHistory = function(ind)
							{
								var d = new TDialog();
								d.fillStyle = '#FFAA99';
								d.init(2,['OK'],480,130);
								d.setDefaultButton(0);
								d.setDiv(document.getElementById('windowroot'));
								d.SetCaption('История просмотра карты #'+(this.MCXYZHistory.length-ind)+' - получение короткой ссылки');
								var su = 'http://'+document.location.host+document.location.pathname+this.MCXYZHistory[ind].su;
								d.SetText('&nbsp;<br/><a href="'+su+'" target="_blank" style="text-decoration:none;">'+su+'</a>');
								d.Execute()
							}
							
							// private
							ClientMap.prototype.SetWGSHistory_ignored = false;
							ClientMap.prototype.SetWGSHistory = function(ind)
							{
								var tmp_a = [];
								var tmp_i = 0;
								for(var i=0;i<this.MCXYZHistory.length;i++) if(i != ind) tmp_a[tmp_i++] = this.MCXYZHistory[i];
								
								var tmp = this.MCXYZHistory[ind]
								this.MCXYZHistory = tmp_a;	
								this.MCXYZHistory_index--;

								if(this.SetWGSHistory_ignored) 
								{	
									this.SetWGSHistory_ignored = false;									
									this.ShowWGSHistory(-1);
								}
								else
								{
									// this.WGSHistoryForm.Close();
									this.SetZoomFromIndex(tmp.z);
									this.SetMapCenterInLatLon(tmp.lat,tmp.lon);
									this.UrlUpdate();
								};
							}
							
							// private
							ClientMap.prototype.SetWGSHistoryClear = function()
							{
								this.MCXYZHistory = [];
								this.MCXYZHistory_index = 0;
								this.ShowWGSHistory(-1);
							}
							
							//private
							ClientMap.prototype.WGSorCookiesCurrentActive = true;
							ClientMap.prototype.SetWGSHistoryCookies = function(time,kill_is)
							{
								this.WGSorCookiesCurrentActive = true;
								if(this.WGSHistoryForm && !this.WGSHistoryForm.killed) this.WGSHistoryForm.Close();
								if(kill_is) 
								{
									this.WGSorCookiesCurrentActive = false;
									this.ShowWGSHistory(time);
									return;
								};
								
								// получаем координаты мыши в документе
								var x = this.global.mouse_x;
								var y = this.global.mouse_y - 10;
								
								var form = new MiniPopupTooltip('trup');
								this.WGSHistoryForm = form;
								form.Show(this.map_left+2,this.map_top+2,time);
								var mydiv = form.DIV;
								mydiv.style.textAlign='left';
								mydiv.style.height = this.map_height - 8;
								mydiv.style.width = '380px';
								
								var mdtmp = document.getElementById('popuptooltiptrup');
								mdtmp.style.opacity = '0.9'
								mdtmp.style.filter = 'alpha(opacity=90)';
								
								mydiv.innerHTML = '<img src="'+global_vars_array[0]+'engine/gif/bookmark2_small.gif" style="position:absolute;left:6px;top:6px;"/>'+
								'<div style="position:absolute;left:26px;top:4px;font-size:16px;"><b>Сохраненные точки в cookies</b></div>'+ // заголовок
								'<div id="clmapwgshist_0_div" style="overflow:auto;height:'+(this.map_height-58)+'px;width:365px;position:absolute;left:10px;top:45px;font-size:12px;"></div>'+
								'<img src="'+global_vars_array[0]+'engine/gif/clock.gif" style="position:absolute;left:355px;top:25px;cursor:pointer;" onclick="'+this.vname+'.SetWGSHistoryCookies('+time+',true);" title="Показать историю просмотра карты"/>'+
								'<img src="'+global_vars_array[0]+'engine/png/save.png" style="position:absolute;left:335px;top:25px;cursor:pointer;" onclick="'+this.vname+'.CookiesHistorySaveCurrent();" title="Сохранить текущую позицию карты в cookies"/>'+
								(time < 0 ? '<div style="position:absolute;left:373px;top:0px;font-size:14px;"><a href="#" onclick="'+this.vname+'.WGSHistoryForm.Close();return false;" style="text-decoration:none;color:black;" title="Закрыть">х</a></div>' : ''); // кнопка закрыть
								
								outdiv = document.getElementById("clmapwgshist_0_div");
								
								var ctr = 0;
								var mem_slots = this.Configuration.GetCookiesMemorySlots().sort();
								for(var i=0;i<mem_slots.length;i++)
								{
									ctr++;
									var curr_slot = this.Configuration.GetFromCookies(mem_slots[i]);
									var myx = document.createElement('div');
									myx.id = 'CookiesHistoryItm_'+i;

									myx.innerHTML = '<table id="CookiesHistoryItmTbl_'+i+'" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;width:100%;">'+
									'<tr><td>&nbsp;</td><td>&nbsp;<b>Масштаб:</b> ' + curr_slot.zoom +'</td><td align="right" rowspan="2" valign="top"><b>'+mem_slots[i]+'</b>&nbsp;</td></tr>'+
									'<tr><td>&nbsp;&nbsp;'+(i+1)+'</td><td>&nbsp;<b>Широта:</b> '+Math.floor(curr_slot.lat*1000000)/1000000+'°</td></tr>'+
									'<tr><td>&nbsp;</td><td>&nbsp;<b>Долгота:</b> '+Math.floor(curr_slot.lon*1000000)/1000000+'°</td><td align="right"><a href="#" onclick="'+this.vname+'.SetCookiesHistory_ignored=true;return false;" style="text-decoration:none;font-size:12px;" title="Удалить эту запись"><img src="'+global_vars_array[0]+'engine/png/delete.png" border="0"/></a>&nbsp;</td></tr></table>';
									
									myx.style.cursor = 'pointer';
									myx.normalColor = ctr % 2 ? '#FFFFDD' : 'white';
									myx.style.backgroundColor = myx.normalColor;									
									myx.style.borderBottom = 'solid 1px gray';
									myx.title = 'Cookies: "'+mem_slots[i]+'"';
									myx.onmouseover = new Function('',this.vname+'.SetWGSHistoryCookiesColor('+i+',true,'+(ctr % 2)+');');
									myx.onmouseout = new Function('',this.vname+'.SetWGSHistoryCookiesColor('+i+',false,'+(ctr % 2)+');');
									myx.oncontextmenu = new Function('',this.vname+'.CookiesHistoryContext("'+mem_slots[i]+'");return false;');
									myx.onclick = new Function('',this.vname+'.LoadFromCookiesHistoryForm("'+mem_slots[i]+'");return false;');
									outdiv.appendChild(myx);
								};
							}
							
							ClientMap.prototype.LoadFromCookiesHistoryForm = function(slot)
							{
								if(this.SetCookiesHistory_ignored)
								{
									this.SetCookiesHistory_ignored = false;
									this.Configuration.DeleteFromCookies(slot);
									this.SetWGSHistoryCookies(-1);
								}
								else
									this.Configuration.LoadFromCookies(slot);
							}
							
							// private
							ClientMap.prototype.SetWGSHistoryCookiesColor = function(ind,mouseover,ch)
							{
								var iddiv = document.getElementById('CookiesHistoryItm_'+ind);
								var idtbl = document.getElementById('CookiesHistoryItmTbl_'+ind);
								if(iddiv && idtbl)
								{
									iddiv.style.background = mouseover ? 'navy' : ch ? '#FFFFDD' : 'white';
									idtbl.style.background = mouseover ? 'navy' : ch ? '#FFFFDD' : 'white';
									iddiv.style.color = mouseover ? 'white' : 'black';
									idtbl.style.color = mouseover ? 'white' : 'black';
								};
							}
							
							ClientMap.prototype.CookiesHistorySaveCurrent = function()
							{
								var mem_slots = this.Configuration.GetCookiesMemorySlots();
								
								var dlg = new TDialog();
								dlg.fillStyle = '#FFAA99';
								dlg.clmap = this;
								dlg.init(5,['Сохранить','Отмена'],470,150);
								dlg.setDefaultButton(0);
								dlg.setDiv(document.getElementById('windowroot'));
								dlg.SetCaption('Сохранение текущего положения карты в cookies');
								dlg.SetText('&nbsp;<br/>Введите название для сохраненного положения:<br/><input type="text" id="cosvinslotname" value="Положение '+mem_slots.length+'" style="width:350px;" maxlength="30"/>');
								dlg.Execute(new Function('sender, choosed_item',this.vname+'.CookiesHistorySaveCurrentDialogResult(sender, choosed_item)'));
								document.getElementById('cosvinslotname').select();
							}
							
							ClientMap.prototype.CookiesHistorySaveCurrentDialogResult = function(sender, choosed_item) 
							{
								if(choosed_item == 1) return;
								var sln = document.getElementById('cosvinslotname').value;
								this.Configuration.SaveToCookies(sln);
								this.SetWGSHistoryCookies(-1);
							}
							
							ClientMap.prototype.CookiesHistoryContext = function(slot)
							{
								if(!this.WGSPopup)
								{
									this.WGSPopup = new TPopupMenu(300);
									this.WGSPopup.setDiv(document.getElementById("windowroot"), true);
								}
								else this.WGSPopup.ClearItems();
								this.WGSPopup.AddItem('<b>'+slot+'</b> (сookies):',function(){},true);
								this.WGSPopup.AddItem('',function(){},true);
								this.WGSPopup.AddItem('<b>Установить карту</b> в эту точку', new Function('',this.vname+'.LoadFromCookiesHistoryForm("'+slot+'");return false;'), false, this  );
								this.WGSPopup.AddItem('<b>Получить</b> короткую <b>ссылку</b> на эту точку', new Function('',this.vname+'.CookiesHistoryGetShortURL("'+slot+'");return false;'), false, this  );
								this.WGSPopup.AddItem('',function(){},true);
								this.WGSPopup.AddItem('Удалить эту запись из истории', new Function('',this.vname+'.SetCookiesHistory_ignored=true;'+this.vname+'.LoadFromCookiesHistoryForm("'+slot+'");return false;'), false, this  );
								this.WGSPopup.AddItem('Очистить cookies', new Function('',this.vname+'.CookiesHistoryClear();return false;'), false, this  );
								this.WGSPopup.Popup(this.global.mouse_x,this.global.mouse_y);
							}
							
							ClientMap.prototype.CookiesHistoryGetShortURL = function(slot)
							{
								var d = new TDialog();
								d.fillStyle = '#FFAA99';
								d.init(2,['OK'],480,130);
								d.setDefaultButton(0);
								d.setDiv(document.getElementById('windowroot'));
								d.SetCaption('<b>'+slot+'</b> - получение короткой ссылки');
								var curr_slot = this.Configuration.GetFromCookies(slot);
								var su = 'http://'+document.location.host+document.location.pathname+'#u='+curr_slot.val;
								d.SetText('&nbsp;<br/><a href="'+su+'" target="_blank" style="text-decoration:none;">'+su+'</a>');
								d.Execute()
							}
							
							ClientMap.prototype.CookiesHistoryClear = function()
							{
								this.Configuration.ClearCookies();
								this.SetWGSHistoryCookies(-1);
							}
		
		ClientMap.prototype.SetToPrint = function(print,hideProtectionDiv)
		{
			this.PPSave_FF = this.rastrProtection.style.opacity;
			this.PPSave_IE = this.rastrProtection.style.filter;
			this.PPSave_SB = this.UseStatusBar;
			this.PPSave_CA = this.ShowCircleAreaVis; if(this.PPSave_CA) this.HideCircleArea();
			this.UseStatusBar = false;
			this.PPSave_MH = this.GetMapHistoryVis();
			this.SetMapHistoryVis(false);
			if(this.paneltools) this.paneltools.HTMLVisibility('hidden','none');
			if(this.clnav) 
			{
				this.PPSave_MN = this.clnav.realVisible;
				this.clnav.SetVisible(false);
			};
			this.PPSave_SCB = this.ShowConfigButtonIs;
			this.ShowConfigButton(false);
			this.rastrProtection.style.opacity = '0';
			this.rastrProtection.style.filter = 'alpha(opacity=0)';
			this.rightStatusDiv.style.display = 'none';
			this.rightStatusDiv.style.visibility = 'hidden';
			if(hideProtectionDiv)
			{
				this.rastrProtection.style.display = 'none';
				this.rastrProtection.style.visibility = 'hidden';
			};
			this.SetZoomsVisible(false);
			this.ssbTimeHClose();
			if(print) 
			{
				window.print();
				setTimeout(this.vname+'.ClearToPrint();',10000);
			};
			
			this.zoomDiv.style.display = 'none';
		}
		
		ClientMap.prototype.ClearToPrint = function(print)
		{
			if(this.PPSave_CA) this.ShowCircleArea(false,false,true);
			if(this.clnav) this.clnav.SetVisible(this.PPSave_MN);
			this.ShowConfigButton(this.PPSave_SCB);
			if(this.paneltools) this.paneltools.HTMLVisibility('visible','block');
			this.SetMapHistoryVis(this.PPSave_MH);
			this.UseStatusBar = this.PPSave_SB;
			this.SetZoomsVisible(true);
			this.rastrProtection.style.display = 'block';
			this.rastrProtection.style.visibility = '';
			this.rastrProtection.style.opacity = this.PPSave_FF;
			this.rastrProtection.style.filter = this.PPSave_IE;	
			this.rightStatusDiv.style.display = 'block';
			this.rightStatusDiv.style.visibility = '';	
			this.zoomDiv.style.display = 'block';			
		}
		
		//Получение события: о глобальном отпускании книпки мыши
		// PRIVATE
		ClientMap.prototype.onMouseGlobalUp = function(mouse_event)
		{
			if(this.reup) this.reup();
			
			//if(this.nav_mode == 1 || this.nav_mode == 5 || this.nav_mode == 6 || this.nav_mode == 7 || (this.nav_mode > 127 && this.nav_mode < 256) ) if(this.ie) this.mainDiv.style.cursor = "default";
			
			if(this.cdef) 
			{
				if(!this.ie) this.mainDiv.style.cursor = this.cdef;
				this.cdef = false;
				document.getElementById('subcoverDIV').style.visibility = 'hidden';
			};
			this.SetMapCrossVisible(this.MapCrossVisible,true);			
			
			var recalc_center = false;
			if(this.flag_ms_move) 
			{
				this.UrlUpdate();
				//
					while(this.center_x * this.zoom < -40030000) 
					{
						this.center_x += 40030000 / this.zoom;
						recalc_center = true;
					};
					while(this.center_x * this.zoom > 40030000) 
					{
						this.center_x -= 40030000 / this.zoom;
						recalc_center = true;
					};
				//
				var ar1 = -this.ms_x+mouse_event.x;
				var ar2 = -this.ms_y+mouse_event.y;
				this.for_clnav_MapMoved(this,ar1,ar2);
				this.CallExtPlugins('onmapmoved',{sender:this,x:ar1,y:ar2});
				if(this.MapEvents.MapMoved) this.MapEvents.MapMoved(this,ar1,ar2);
				this.MapCenterPreChanged(true,false);
				var tmp_direct_x = (this.mouse_x-this.map_width/2)/Math.abs(this.mouse_x-this.map_width/2)
				var tmp_direct_y = (this.mouse_y-this.map_hei/2)/Math.abs(this.mouse_x-this.map_width/2)
				var tmp_direct_x = this.mouse_x-this.map_width/2;
				tmp_direct_x = tmp_direct_x / Math.abs(tmp_direct_x);
				var tmp_direct_y = this.mouse_y-this.map_height/2;
				tmp_direct_y = tmp_direct_y / Math.abs(tmp_direct_y);
				
				//this.AroundAreaLoad();				
			};
			if(this.flag_ms_zoom)
			{
				this.zoomDiv.style.visibility = 'hidden';
				this.zoomDiv.style.display = 'none';
				this.zoomDiv.style.width = 0;
				this.zoomDiv.style.height = 0;
				this.flag_ms_zoom = false;
				if(this.flag_ms_zoom_width > 10 && this.flag_ms_zoom_height > 10) 
					this.EndZoomNavigate(this.flag_ms_zoom_width,this.flag_ms_zoom_height,this.flag_ms_cx,this.flag_ms_cy);
				else 
				{
					var sz_x = mouse_event.x-Math.round(this.map_width/2)-this.map_left;
					var sz_y = mouse_event.y-Math.round(this.map_height/2)-this.map_top;
					var mc = this.GetMapCenter();
					sz_x2 = (mc.x + sz_x)*this.zoom;
					sz_y2 = (mc.y + sz_y)*this.zoom;
					if(this.ZoomIn()) 
					{
						this.SetMapCenter(parseInt(sz_x2/this.zoom)-sz_x,parseInt(sz_y2/this.zoom)-sz_y);
						if(this.MapEvents.MapZoomInPxls) this.MapEvents.MapZoomInPxls(this,mouse_event.x-Math.round(this.map_width/2)-this.map_left,mouse_event.y-Math.round(this.map_height/2)-this.map_top);
						this.UrlUpdate(true);
						this.for_clnav_ChangeZoom(this,this.zoom);
						this.CallExtPlugins('onzoom',{zoom:this.zoom});
						if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);						
					};				
				};
			};
			
			if(this.flag_ms_over)
			{
				var pl = parseInt(this.map_left);
				var pt = parseInt(this.map_top);
				if(mouse_event.x < pl) this.flag_ms_over = false;
				if(mouse_event.x > pl + this.map_width) this.flag_ms_over = false;
				if(mouse_event.y < pt) this.flag_ms_over = false;
				if(mouse_event.y > pt + this.map_height) this.flag_ms_over = false;
			};
			
			if(this.flag_ms_move) this.ReOpera(); //  Opera Offset						
			
			this.flag_ms_move = false;
			this.ms_xs = parseInt(this.coverDiv.style.left);
			this.ms_ys = parseInt(this.coverDiv.style.top);
			var tmp_c_x = this.mouse_x-Math.round(this.map_width/2);
			var tmp_c_y = this.mouse_y-Math.round(this.map_height/2);
			this.CallExtPlugins('onmouseup',{sender:this,x:tmp_c_x,y:tmp_c_y});
			if(this.MapEvents.MouseUp) this.MapEvents.MouseUp(this,tmp_c_x,tmp_c_y);
			if(this.flag_ms_over) if(!this.click) // if(this.MapEvents.MouseClick) 
			{
				//this.for_paneltools_MouseClick(this,this.mouse_x-Math.round(this.map_width/2),this.mouse_y-Math.round(this.map_height/2)); 
				//this.MapEvents.MouseClick(this,this.mouse_x-Math.round(this.map_width/2),this.mouse_y-Math.round(this.map_height/2)); 				
				if(this.MapLayers && (this.nav_mode != 5)) this.MapLayers.CheckInPXLs(this.center_x + this.mouse_x-Math.round(this.map_width/2),this.center_y + this.mouse_y-Math.round(this.map_height/2),true,!this.MultiSelect);
				if(this.MapLayers && (this.nav_mode == 5)) this.MapLayers.CheckInPXLs(this.center_x + this.mouse_x-Math.round(this.map_width/2),this.center_y + this.mouse_y-Math.round(this.map_height/2),false,!this.MultiSelect);
				this.preMouseClick(this,this.mouse_x-Math.round(this.map_width/2),this.mouse_y-Math.round(this.map_height/2)); 
				this.exitTime = (new Date()).getTime() + 500;
			};
			if(recalc_center)
			{
				this.ReOpera(this.center_x,this.center_y); // Opera Offset
				this.ms_xs = -256 + this.opera_offset_x;
				this.ms_ys = -256 + this.opera_offset_y;
				var mx = this.center_x-this.map_width/2-256;
				var my = this.center_y-this.map_height/2-256;
			
				this.coverDiv.style.left = this.ms_xs-mx;
				this.rastrDiv.style.left = this.ms_xs-mx;
				this.map_objects_Div.style.left = this.ms_xs-mx;
				this.coverDiv.style.top = this.ms_ys-my;
				this.rastrDiv.style.top = this.ms_ys-my;
				this.map_objects_Div.style.top = this.ms_ys-my;
			
				this.RecalculateRastr(mx,my);
			};			
		}
		
		//private
		ClientMap.prototype.remove = function () {}
		ClientMap.prototype.reup = function () {}
		
		//Получение события:  о глобальном сдвиге мыши
		// PRIVATE
		ClientMap.prototype.onMouseGlobalMove = function(mouse_event)
		{			
			var tmp_offset = getScrollXY();
			this.global = {mouse_x:mouse_event.x+tmp_offset.x, mouse_y:mouse_event.y+tmp_offset.y};
			this.mouse_x = mouse_event.x+tmp_offset.x-parseInt(this.map_left);
			this.mouse_y = mouse_event.y+tmp_offset.y-parseInt(this.map_top);
			
			if(this.remove) this.remove();
				
			for(var i=0;i<this.flag_ms_overs.length;i++) if(this.flag_ms_overs[i]) this.flag_ms_move = false;
			if(this.flag_ms_move)
			{			
				if(!(this.cdef))
				{
					if(!this.ie) 
					{
						this.cdef = this.mainDiv.style.cursor;
						this.mainDiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/hand_move.cur'), pointer";
					} else this.cdef = true;
					document.getElementById('subcoverDIV').style.left = (this.center_x+(this.mouse_x-Math.round(this.map_width/2))-9) + 'px';
					document.getElementById('subcoverDIV').style.top = (this.center_y+(this.mouse_y-Math.round(this.map_height/2))-8) + 'px';
					document.getElementById('subcoverDIV').style.visibility = 'visible';
				}
				// this.mouse_x = mouse_event.x-parseInt(this.map_left);
				// this.mouse_y = mouse_event.y-parseInt(this.map_top);
				ok = true;
				if(this.mouse_x >= -1*this.map_left && this.mouse_x <= this.map_width+100 && this.mouse_y >= -1*this.map_top && this.mouse_y <= this.map_height+100) ok = false;
				if(ok) 
				{
					//this.onMouseGlobalUp(mouse_event);
					//return;
				};

				var _x = -this.ms_x+mouse_event.x;
				var _y = -this.ms_y+mouse_event.y;
				
				// if( (this.GetMapCenter().x <= (this.map_minx+this.map_width / 2)) && (_x >= 0)) _x = 0;
				// if( (this.GetMapCenter().x >= (this.map_maxx-this.map_width / 2)) && (_x <= 0)) _x = 0;
				// if( (this.GetMapCenter().y <= (this.map_miny+this.map_height / 2)) && (_y >= 0)) _y = 0;
				// if( (this.GetMapCenter().y >= (this.map_maxy-this.map_height / 2)) && (_y <= 0)) _y = 0;
				
				if(_x != 0) this.coverDiv.style.left = this.ms_xs+_x;
				if(_x != 0) this.rastrDiv.style.left = this.ms_xs+_x;
				if(_x != 0) this.map_objects_Div.style.left = this.ms_xs+_x;
				if(_y != 0) this.coverDiv.style.top = this.ms_ys+_y;
				if(_y != 0) this.rastrDiv.style.top = this.ms_ys+_y;
				if(_y != 0) this.map_objects_Div.style.top = this.ms_ys+_y;
				this.mainDiv.style.backgroundPosition = (this.ms_xs + _x)+' '+(this.ms_ys+_y);
				if(_y != 0 || _x != 0) 
				{
					var plx = -1*(parseInt(this.rastrDiv.style.left)-this.opera_offset_x+256);
					var ply = -1*(parseInt(this.rastrDiv.style.top)-this.opera_offset_y+256);
					
					//document.getElementById('test_div').innerHTML = this.ms_x+'('+_x+')'+' '+this.ms_y+'('+_y+')';
					this.RecalculateRastr(plx,ply);					
					
					if(this.MapEvents.MapMoveBegin && this.tmp_var01) 
					{						
						this.MapEvents.MapMoveBegin(this,this.mouse_x-Math.round(this.map_width/2),this.mouse_y-Math.round(this.map_height/2));
						this.tmp_var01 = false;
					};
					this.for_clnav_MapMove(this,_x,_y);
					if(this.MapEvents.MapMove) this.MapEvents.MapMove(this,_x,_y);									
					this.click = true;
				};
			};
			if(this.flag_ms_zoom && (this.nav_mode == 2))
			{
				
				var tmp_wi = mouse_event.x - this.flag_ms_zoom_sx;
				var tmp_he = mouse_event.y - this.flag_ms_zoom_sy;
				
				var tmp_wh = Math.abs(tmp_wi/tmp_he);
				
				if(!this.zoom_nocrop)
				{
					if(tmp_wh > (this.map_width/this.map_height)) tmp_he = tmp_he*tmp_wh / (this.map_width/this.map_height);
					if(tmp_wh < (this.map_width/this.map_height)) tmp_wi = tmp_wi/tmp_wh * (this.map_width/this.map_height);
				};

				this.flag_ms_zoom_width  = Math.abs(tmp_wi) > 2 ? Math.abs(tmp_wi) : 0;
				this.flag_ms_zoom_height = Math.abs(tmp_he) > 2 ? Math.abs(tmp_he) : 0;
				var curr_x  = this.flag_ms_zoom_sx + (tmp_wi >= 0 ? 0 : tmp_wi);
				if(!this.zoom_nobounds)
				{
					if(curr_x < parseInt(this.map_left)+1) 
					{
						curr_x = parseInt(this.map_left)+1;
						this.flag_ms_zoom_width = Math.abs(this.flag_ms_zoom_sx-curr_x+1)
						if(!this.zoom_nocrop)this.flag_ms_zoom_height = this.flag_ms_zoom_width / (this.map_width/this.map_height);
						if(!this.zoom_nocrop)tmp_he = this.flag_ms_zoom_height * tmp_he/Math.abs(tmp_he);
					};
					if((curr_x+this.flag_ms_zoom_width) > (parseInt(this.map_left)+this.map_width-1)) 
					{
						this.flag_ms_zoom_width = (parseInt(this.map_left)+this.map_width-1)-this.flag_ms_zoom_sx;
						tmp_wi = this.flag_ms_zoom_width;
						if(!this.zoom_nocrop) this.flag_ms_zoom_height = this.flag_ms_zoom_width / (this.map_width/this.map_height);
						if(!this.zoom_nocrop) tmp_he = this.flag_ms_zoom_height * tmp_he/Math.abs(tmp_he);
					};
				};
				var curr_y  = this.flag_ms_zoom_sy + (tmp_he >= 0 ? 0 : tmp_he);
				if(!this.zoom_nobounds)
				{
					if(curr_y < parseInt(this.map_top)+1) 
					{
						curr_y = parseInt(this.map_top)+1;
						this.flag_ms_zoom_height = Math.abs(this.flag_ms_zoom_sy-curr_y+1)
						if(!this.zoom_nocrop) 
						{	
							this.flag_ms_zoom_width = this.flag_ms_zoom_height * (this.map_width/this.map_height);
							tmp_wi = this.flag_ms_zoom_width * tmp_wi/Math.abs(tmp_wi);
							curr_x  = this.flag_ms_zoom_sx + (tmp_wi >= 0 ? 0 : tmp_wi);
						};
					};
					if((curr_y+this.flag_ms_zoom_height) > (parseInt(this.map_top)+this.map_height-1)) 
					{
						this.flag_ms_zoom_height = (parseInt(this.map_top)+this.map_height-1)-this.flag_ms_zoom_sy;
						tmp_he = this.flag_ms_zoom_height;
						if(!this.zoom_nocrop) 
						{
							this.flag_ms_zoom_width = this.flag_ms_zoom_height * (this.map_width/this.map_height);
							tmp_wi = this.flag_ms_zoom_width * tmp_wi/Math.abs(tmp_wi);
							curr_x = this.flag_ms_zoom_sx + (tmp_wi >= 0 ? 0 : tmp_wi);
						};
					};
				};
						
				this.flag_ms_cx = curr_x + Math.round(this.flag_ms_zoom_width / 2);
				this.flag_ms_cy = curr_y + Math.round(this.flag_ms_zoom_height / 2);
				
				if(this.flag_ms_zoom_width < 2) this.flag_ms_zoom_width = 2;
				if(this.flag_ms_zoom_height < 2) this.flag_ms_zoom_height = 2;

				try {
					this.zoomDiv.style.left   = curr_x;
				} catch (e) 
				{
					this.zoomDiv.style.left = 0;
					curr_x = 0;
				};
				try {
					this.zoomDiv.style.top    = curr_y;
				} catch(e)
				{
					this.zoomDiv.style.top = 0;
					curr_y = 0;
				}
				try {
					this.zoomDiv.style.width  = this.flag_ms_zoom_width ? this.flag_ms_zoom_width : 0;
				} catch (e)
				{ 
					this.zoomDiv.style.width = 0;
					this.flag_ms_zoom_width = 0;
				};
				try {
				this.zoomDiv.style.height = this.flag_ms_zoom_height ? this.flag_ms_zoom_height : 0;
				} catch (e)
				{ 
					this.zoomDiv.style.height = 0; 
					this.flag_ms_zoom_height = 0;
				};
			};
			if(this.flag_ms_over);// && !this.flag_ms_move) 
			{
				// this.mouse_x = mouse_event.x-parseInt(this.map_left);
				// this.mouse_y = mouse_event.y-parseInt(this.map_top);
				if(this.mouse_x >= 0 && this.mouse_x <= this.map_width && this.mouse_y >= 0 && this.mouse_y <= this.map_height) 
				if( !this.flag_ms_move && !this.flag_ms_zoom)
				{
					if(this.mouse_x > 0 && this.mouse_y > 0 && this.mouse_x < this.map_width && this.mouse_y < this.map_height)
					{
						this.statusDiv.style.visibility = 'visible';// (this.mouse_y > (this.map_height - 25)) ? '' : 'hidden'; // ALWAYS VISIBLE
						if(this.ns || (navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0))
						{
							if(this.zoomsRight)
								this.rightStatusDiv.style.opacity = (this.mouse_x > (this.map_width - 45)) ? '1' : '0.45';
							else
								this.rightStatusDiv.style.opacity = (this.mouse_x < 45) ? '1' : '0.45';
						}
						else if(this.ie)
						{
							if(this.zoomsRight)
								this.rightStatusDiv.style.filter = (this.mouse_x > (this.map_width - 45)) ? 'alpha(opacity=90);' : 'alpha(opacity=45);';
							else
								this.rightStatusDiv.style.filter = (this.mouse_x < 45) ? 'alpha(opacity=90);' : 'alpha(opacity=45);';
						}
						else
						{
							if(this.zoomsRight)
								this.rightStatusDiv.style.visibility = (this.mouse_x > (this.map_width - 45)) ? 'visible' : 'hidden';
							else
								this.rightStatusDiv.style.visibility = (this.mouse_x < 45) ? 'visible' : 'hidden';
						};
					};
				};
				
				this.IdleClose();
				
				if(!this.flag_ms_move) 
				{										
					if(this.UseHint)
					{	
						if(this.IdleTimeout) clearTimeout(this.IdleTimeout);
						this.IdleTime = 600;
						this.IdleTimeout = setTimeout(this.vname+'.IdleProc()',this.IdleTime);
					};
					var ar1 = this.mouse_x-Math.round(this.map_width/2);
					var ar2 = this.mouse_y-Math.round(this.map_height/2);
					this.for_paneltools_MouseMove(this,ar1,ar2);
					this.MapEvents.MouseMove(this,ar1,ar2);
					
					if(this.MouseSleepTimeout) clearTimeout(this.MouseSleepTimeout);
					this.MouseSleepTimeout = setTimeout(this.vname+'.MouseSleepProc()',this.MouseSleepTime);
				};
			};
		}
		
		//public
		ClientMap.prototype.MouseSleepTime = 2000;
		
		// private
		ClientMap.prototype.MouseSleepProc = function()
		{
			clearTimeout(this.MouseSleepTimeout);
			if(this.flag_ms_over && !this.flag_ms_move && !this.flag_ms_zoom) 
			{
				var tmp_c_x = this.mouse_x-Math.round(this.map_width/2);
				var tmp_c_y = this.mouse_y-Math.round(this.map_height/2);
				this.CallExtPlugins('onsleep',{sender:this,x:tmp_c_x,y:tmp_c_x});
				if(this.MapEvents.MouseSleep) this.MapEvents.MouseSleep(this,tmp_c_x,tmp_c_y);
			};
		}
		
		// Использование всплывающих подсказок
		ClientMap.prototype.UseHint = true;
		ClientMap.prototype.UseHint_OnlyTopItem = false;
		ClientMap.prototype.UseHintID = true;
		ClientMap.prototype.UseHintNoCaption = true;
		
		// Получение текста подсказки
		ClientMap.prototype.GetHintText = function(internal_text,objs)
		{
			return internal_text;
		}
				
		// Таймаут показа хинта
		ClientMap.prototype.IdleProc = function()
		{
			clearTimeout(this.IdleTimeout);
			if(this.flag_ms_over && !this.flag_ms_move && !this.flag_ms_zoom) 
			{
				var tmp_c_x = this.mouse_x-Math.round(this.map_width/2);
				var tmp_c_y = this.mouse_y-Math.round(this.map_height/2);
				this.CallExtPlugins('onidle',{sender:this,x:tmp_c_x,y:tmp_c_x});
				if(this.MapEvents.MouseIdle) this.MapEvents.MouseIdle(this,tmp_c_x,tmp_c_y);
				this.IdleCall();
			};
		}
				
		ClientMap.prototype.ShowMyHintText = "";
		ClientMap.prototype.ShowMyHintIdle = false;
		// Скрываем свой хинт
		ClientMap.prototype.HideMyHint = function() 
		{ 
			this.ShowMyHintText = ""; 
			this.IdleCanClose = true;
			this.IdleClose();
		}		
		// Показываем свой хинт
		ClientMap.prototype.ShowMyHint = function(text,only_set_text)
		{
			if(!this.UseHint) return;
			
			this.ShowMyHintText = text;
			this.ShowMyHintIdle = true;
			if(only_set_text != true)
			{
				this.ShowMyHintIdle = false;
				if(true) // this.nav_mode != 5
				{
					clearTimeout(this.IdleTimeout);
					this.IdleCall();
				};
			};
		}
		
		// Формирование текста хинта
		ClientMap.prototype.IdleText = function()
		{
			if(!this.UseHint) return '';
			var text = '';
			var objs_all = [];
			
			if(this.nav_mode == 1 || this.nav_mode > 4)
			{
				var xy = this.GetMapCenter();
				var ms = this.GetMouseXY();
				x = xy.x + ms.x;
				y = xy.y + ms.y;
				objs_all = this.MapLayers.GetObjectsInPointPXLs(x, y);
				var objs = [];
				for(var i=0;i<objs_all.length;i++) if(objs_all[i].visible) objs[objs.length] = objs_all[i];
				if(objs.length == 1 || (this.UseHint_OnlyTopItem && objs.length > 0)) 
				{
					atext = "";
					if(this.UseHintNoCaption) atext = "<b>" + objs[0].name + "</b>"+ (this.UseHintID ? " ("+ objs[0].id+")" : "");
					if(objs[0].Hint && objs[0].Hint.length > 0) atext = objs[0].Hint;
					if(atext.length > 0) text = "<small style=\"color:#666666;\">Объект карты:</small><br/>&nbsp;"+atext+"&nbsp;"; else text = "";
				};
				if(objs.length > 1 && !this.UseHint_OnlyTopItem)
				{
					atext = "";
					text = "";
					if(this.UseHintNoCaption) 
					{
						text = "<small style=\"color:#666666;\">Верхний объект карты:</small><br/>";
						atext = "&nbsp;<b>" + objs[0].name + "</b>"+ (this.UseHintID ? " ("+ objs[0].id +")" : "") + "&nbsp;<br/>";
					};
					if(objs[0].Hint && objs[0].Hint.length > 0) atext = "&nbsp;"+objs[0].Hint+"&nbsp;<br/>";
					text += atext;
					text += "<small style=\"color:#666666;\">Остальные:</small><br/>";
					for(var i=1;i<objs.length;i++) 
					{
						atext = "";
						if(this.UseHintNoCaption) 
						{
							atext = "&nbsp;- <b>" + objs[i].name + "</b>"+ (this.UseHintID ? " ("+ objs[i].id +")" : "") + "&nbsp;<br/>";
						};
						if(objs[i].Hint && objs[i].Hint.length > 0)
							atext = "&nbsp;- "+objs[i].Hint+"&nbsp;<br/>\n";
						text += atext;
					};
					if (text == "<small style=\"color:#666666;\">Остальные:</small><br/>") text = "";
				};
			};
			if(this.nav_mode == 2) { text = '<small style=\"color:#666666;\">Подсказка:</small><br/>Используйте левую клавишу мышки<br/>для того чтобы приблизить карту.';};
			if(this.nav_mode == 3) { text = '<small style=\"color:#666666;\">Подсказка:</small><br/>Используйте левую клавишу мышки<br/>для того чтобы отдалить карту.';};
			if(this.nav_mode == 4) { text = '<small style=\"color:#666666;\">Подсказка:</small><br/>Используйте левую клавишу мышки<br/>для того чтобы выделить область<br/>карты и приблизить ее.';};
			return this.GetHintText(text,objs_all);
		}
		
		// Показываем хинт
		ClientMap.prototype.IdleCall = function()
		{			
			var text = this.ShowMyHintText.length > 0 ? this.ShowMyHintText : this.IdleText();
			if(text.length > 0)
			{
				if(!(hint = document.getElementById('idlehint')))
				{
					hint = document.createElement('div');
					this.mainDiv.appendChild(hint);
				}
				hint.id = 'idlehint';
				hint.style.overflow = 'visible';
				hint.style.position = 'absolute';
				hint.style.width = 'auto';
				hint.style.height = 'auto';
				hint.style.border = 'solid 1px #999999';
				hint.style.background = '#FEFFE1';
				hint.style.padding = '2px';
				hint.style.zIndex = this.GetNext_zIndex();
				hint.style.left = this.mouse_x + 10 + 'px';
				hint.style.top = this.mouse_y + 10 + 'px';
				hint.style.visibility = 'visible';
				hint.style.display = 'block';
				hint.style.fontFamily = 'Arial,Verdana';
				hint.style.fontSize = '12px';
				if(this.ie)
					hint.style.filter = 'alpha(opacity=80)';
				else
					hint.style.opacity = '0.8';
				hint.innerHTML = text;
				if( /*(this.nav_mode == 5) || */ (this.ShowMyHintText.length == 0) || ((this.ShowMyHintText.length > 0) && this.ShowMyHintIdle)) this.IdleCanClose = true;
			};
		}
		
		// при событии вызова таймаута закрытия хинта
		ClientMap.prototype.IdleClose = function()
		{
			if(this.IdleCanClose)
			{
				this.IdleCanClose = false;
				if(this.IdleTimeoutClose) clearTimeout(this.IdleTimeoutClose);
				this.IdleTimeClose = 300;
				this.IdleTimeoutClose = setTimeout(this.vname+'.IdleProcExit()',this.IdleTimeClose);
			};
		}
		
		// таймаут закрытия хинта
		ClientMap.prototype.IdleProcExit = function()
		{
			clearTimeout(this.IdleTimeoutClose);			
			if(hint = document.getElementById('idlehint'))
			{
				hint.style.visibility = 'hidden';
				hint.style.display = 'none';
			}
		}
		
		// Получение текущих координат мыши над картой; экранные в сдвиге относительного центра карты
		// PUBLIC
		// INVERSED TO MERCATOR
		ClientMap.prototype.GetMouseXY = function()
		{
			return {x: this.mouse_x - this.map_width / 2, y: this.mouse_y - this.map_height / 2};
		}
		
		// Перевод координат (инверсия вертикальной оси)
		ClientMap.prototype.MouseXY_Mercator = function(mouse_x,mouse_y)
		{
			return {x: mouse_x, y: -1 * mouse_y};
		}
		
		// Zoom карты
		// PUBLIC
		ClientMap.prototype.MapZoom = 1;
		
		// Установка уровней зума карты
		// PUBLIC 
		ClientMap.prototype.SetZoomLevels = function(zoom_arr)
		{
		    this.zoom_start_from = 1; // минимальный зум для карты
			this.zoom_levels = zoom_arr ? zoom_arr : const_zooms;
			this.ZoomLevels = this.zoom_levels;
			return this.zoom_levels;
		}
		
		// Массив зумов карты
		// PUBLIC 
		ClientMap.prototype.ZoomLevels = {};
		
		// PRIVATE
		ClientMap.prototype.GetZoomArrayLevel = function(zoomlev)
		{
			var no = -1;
			for(var i=this.zoom_start_from;i<this.zoom_levels.length; i++) if(this.zoom_levels[i] == zoomlev) no = i;
			return no;
		}
		
		// Установка наезда зума карты и возвращение нового значения из ZoomLevels
		// PUBLIC 
		ClientMap.prototype.SetZoomFromLevels = function(zoomlev)
		{
			if(this.flag_ms_move) return this.zoom;
			
			var no = -1;
			for(var i=this.zoom_start_from;i<this.zoom_levels.length; i++) if(this.zoom_levels[i] == zoomlev) no = i;
			if(no == -1) return false;
			
			var mpc = this.GetMapCenter();
			mpc.x = mpc.x * this.zoom;
			mpc.y = mpc.y * this.zoom;
			
			this.InitZoom(this.zoom_levels[no],this.zoom_format,this.zoom_nocrop,this.zoom_nobounds);  // установка зума карты
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
			
			this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom)+256);   // установка центра карты и прорисовка
			this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom));   // установка центра карты и прорисовка
			this.UrlUpdate(true);
			this.for_clnav_ChangeZoom(this,this.zoom);
			this.CallExtPlugins('onzoom',{zoom:this.zoom});
			if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);			
			this.AddToWGSHistory();
			return this.zoom;
		}
		
		// Установка наезда зума карты и возвращение нового значения из ZoomLevels
		// PUBLIC 
		ClientMap.prototype.SetZoomFromIndex = function(zoomind,byscale)
		{
			if(this.flag_ms_move) return this.zoom;
			
			var no = zoomind;
			if(zoomind > (this.zoom_levels.length-1)) return false;
			
			if(byscale)
			{
				//to_t = Math.pow(2,(this.zoomIndex-zoomind));
				//if(to_t != 1 && to_t <= 8 && to_t >= 0.125) this.zoomDivs_in(to_t,this.center_x,this.center_y);
				// -- if(to_t != 1) this.zoomDivs_in(to_t,this.center_x,this.center_y);
				if(Math.abs(this.zoomIndex-zoomind) < 6)
				if(!this.scroll_is_running)
				{
					for(var i=0;i<Math.abs(this.zoomIndex-zoomind);i++)
						this.zoomDivs_in(zoomind > this.zoomIndex ? -1 : 1,this.center_x,this.center_y);
				};
			};
			
			var mpc = this.GetMapCenter();
			mpc.x = mpc.x * this.zoom;
			mpc.y = mpc.y * this.zoom;
			
			this.InitZoom(this.zoom_levels[no],this.zoom_format,this.zoom_nocrop,this.zoom_nobounds);  // установка зума карты
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
			
			this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom)+256);   // установка центра карты и прорисовка
			this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom));   // установка центра карты и прорисовка
			this.UrlUpdate(true);
			this.for_clnav_ChangeZoom(this,this.zoom);
			this.CallExtPlugins('onzoom',{zoom:this.zoom});
			if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);			
			this.AddToWGSHistory();
			return this.zoom;
		}
		
		// INVERSED TO MERCATOR
		ClientMap.prototype.Presize = function(old_,new_,mx,my)
		{
			if(!this.cfg_Presize) return;
			
			if(!this.nd) 
			{
				this.nd = document.createElement('div');
				this.nd.id = 'nd_id';
				this.nd.style.position = 'absolute';
				this.mainDiv.appendChild(this.nd);
			};
			nd = this.nd;
			nd.style.zIndex = 0;
			nd.style.visibility = 'visible';
			nd.style.left = this.rastrDiv.style.left;
			nd.style.top = this.rastrDiv.style.top;
			nd.innerHTML = this.rastrDiv.innerHTML;
			
			if(!mx || !my) 
			{
				mx = this.center_x;
				my = this.center_y;
			}
			else
			{
				mx = mx / old_;
				my = my / old_;
			};

			var ty = old_ / new_;
			var tz = parseInt(ty*256+1)+'px';
			
			for(var i=0;i<nd.childNodes.length;i++)
			if(nd.childNodes[i].src) 
			{
				nd.childNodes[i].id = 'p_'+nd.childNodes[i].id;
				nd.childNodes[i].style.border = 'none';
				nd.childNodes[i].style.width  = tz;
				nd.childNodes[i].style.height = tz;
				
				var l_ = parseInt(nd.childNodes[i].style.left);
				var t_ = parseInt(nd.childNodes[i].style.top);
				
				l_ = mx-(mx-l_)*ty;
				t_ = my-(my-t_)*ty;
				nd.childNodes[i].style.left = l_+'px';
				nd.childNodes[i].style.top = t_+'px';
			};
		}
		
		//public
		ClientMap.prototype.UseZooming = true;
		
		//private
		ClientMap.prototype.zoomDivs_in_val_to = false;

		ClientMap.prototype.tdivs_state_0 = -1;
		ClientMap.prototype.tdivs_states = [];
		
		// private
		ClientMap.prototype.zoomDivs_in = function(_x_in,_x_cx,_y_cy)
		{		
			if(!this.UseZooming) return;
			this.zoomDivs_in_onl = 0;
			
			this.map_objects_Div.style.display = 'none';
			this.overMapDiv.style.display = 'none';
			
			//this.map_objects_Div.style.opacity = '0.01';
			//this.map_objects_Div.style.filter = 'alpha(opacity=1)';
			//this.overMapDiv.style.opacity = '0.01';
			//this.overMapDiv.style.filter = 'alpha(opacity=1)';
			
			
			if(!this.tdiv)
			{
				this.tdivs_state_0 = this.zoomIndex;
				
				this.tdiv_white = document.createElement('div'); // Белая подложка
				this.tdiv_white.style.background = 'url('+global_vars_array[0]+'engine/png/loading.png) #FFFFFF';
				this.tdiv_white.style.width = '100%';
				this.tdiv_white.style.height = '100%';
				this.tdiv_white.style.position = 'absolute';
				this.tdiv_white.style.left = '0px';
				this.tdiv_white.style.top = '0px';
				
				this.tdivs = [];
				this.tdiv = document.createElement('div');
				this.tdiv.style.width = '65535px'; // for normal zooming
				this.tdiv.style.height = '65535px'; // for normal zooming
				this.tdiv.style.position = 'absolute';
				this.tdiv.style.background = 'white';
				
				this.tdiv_msx = this.center_x - _x_cx;
				this.tdiv_msy = this.center_y - _y_cy;
				this.tdiv_offx = this.center_x - this.save_posx;
				this.tdiv_offy = this.center_y - this.save_posy;
				this.tdiv.style.left = Math.floor(this.map_width/2 - this.tdiv_offx);
				this.tdiv.style.top = Math.floor(this.map_height/2 - this.tdiv_offy);
				
					// multi layers++
					if(this.support_multi_layers) 
						for(var i=0;i<this.rastrLayers.length;i++)  
							this.rastrLayers[i].div.style.display = 'none';
					// --multi layers
					
				this.rastrProtection.appendChild(this.tdiv_white); // БЕЛАЯ ПОДЛОЖКА
				this.rastrProtection.appendChild(this.tdiv);
				this.rastrProtection.style.opacity = '1';
				this.rastrProtection.style.filter = 'alpha(opacity=100)';
				
				var txt = '';
				for(var y=0;y<this.images_array_y;y++)
				{
					for(var x=0;x<this.images_array_x;x++) 
					{
						var ii = document.createElement('img');
						try {
						  ii.src = this.images_array[y][x].img.src;
						} catch (e) {};
						ii.width = 256;
						ii.height = 256;
						this.tdiv.appendChild(ii);
						this.tdivs[this.tdivs.length] = ii;
						try {
						  this.images_array[y][x].img.src = global_vars_array[0]+"engine/png/loading.png";
						} catch (e) {};
					};
					this.tdiv.appendChild(document.createElement('br'));
				};				
			};
			
			var fttt = 1;
			if(this.tdivs_states.length > 0) fttt = this.tdivs_states[this.tdivs_states.length-1];
			var ftt0 = this.tdivs_state_0 + _x_in;	
			
			if(ftt0 < this.tdivs_state_0)
			{
				this.tdivs_states.push(fttt*0.9);
				this.tdivs_states.push(fttt*0.8);
				this.tdivs_states.push(fttt*0.7);
				this.tdivs_states.push(fttt*0.6);
				this.tdivs_states.push(fttt*0.5);
			}
			else
			{
				this.tdivs_states.push(fttt*1.2);
				this.tdivs_states.push(fttt*1.4);
				this.tdivs_states.push(fttt*1.6);
				this.tdivs_states.push(fttt*1.8);
				this.tdivs_states.push(fttt*2.0);
			};
			this.tdivs_state_0 = ftt0;
			
			if(!this.zoomDivs_in_val_to) this.zoomDivs_in_val_to = setTimeout(this.vname+'.zoomDivs_in_val(false)',10);
		}
		
		ClientMap.prototype.zoomDivs_in_onl = 0;
		ClientMap.prototype.zoomDivs_in_onlc = 0;
		ClientMap.prototype.tdivs_to = false;
		
		// private
		ClientMap.prototype.zoomDivs_in_val = function(_byself)
		{	
			if(this.tdivs_states.length > 0) 
			{
				this.tdivs_states = this.tdivs_states.reverse();
				var val = this.tdivs_states.pop();
				this.tdivs_states = this.tdivs_states.reverse();
				
				this.tdiv.style.left = Math.floor(this.map_width/2 - this.tdiv_offx*val + this.tdiv_msx*(val-1));
				this.tdiv.style.top = Math.floor(this.map_height/2 - this.tdiv_offy*val + this.tdiv_msy*(val-1));
				if(this.ie)
				{
					this.tdiv.style.zoom = Math.floor(val*100)+'%';
				}
				else
				{
					for(var i=0;i<this.tdivs.length;i++) 
					{
						this.tdivs[i].width = Math.floor(256*val);
						this.tdivs[i].height = Math.floor(256*val);
					};				
				};
				if(this.zoomDivs_in_val_to) clearTimeout(this.zoomDivs_in_val_to);
				this.zoomDivs_in_val_to = setTimeout(this.vname+'.zoomDivs_in_val(true)',50);
			}
			else
			{
				if(this.scrollSleep)
				{
					if(this.zoomDivs_in_val_to) clearTimeout(this.zoomDivs_in_val_to);
					this.zoomDivs_in_val_to = setTimeout(this.vname+'.zoomDivs_in_val(true)',50);
				}
				else
				{
					if(this.tdivs_to) clearTimeout(this.tdivs_to);
					this.zoomDivs_in_onl = 0;
					this.zoomDivs_in_onlc = 0;
					this.tdivs_to = setTimeout(this.vname+'.zoomDivs_in_done();',300); // pause for remove
				};
			};
		}

		// private
		ClientMap.prototype.zoomDivs_in_done = function()
		{
			this.tdivs_to = false;
			
			if(this.zoomDivs_in_onl < 3) // wait when 3 images loaded
			{
				this.zoomDivs_in_onlc++;
				if(this.zoomDivs_in_onlc <= 10) // max loop 10 times
				{
					this.tdivs_to = setTimeout(this.vname+'.zoomDivs_in_done();',200);				
					return;
				};
				this.zoomDivs_in_onlc = 0;
			};
			
			clearTimeout(this.zoomDivs_in_val_to);
			this.zoomDivs_in_val_to = false;
			
					// multi layers++
					if(this.support_multi_layers) 
						for(var i=0;i<this.rastrLayers.length;i++)  
							this.rastrLayers[i].div.style.display = '';
					// --multi layers
					
			this.rastrProtection.removeChild(this.tdiv_white); // БЕЛАЯ ПОДЛОЖКА
			this.rastrProtection.removeChild(this.tdiv);
			this.rastrProtection.style.opacity = '0.85'; // прозрачный крестик
			this.rastrProtection.style.filter = 'alpha(opacity=85)';
			this.map_objects_Div.style.display = 'block';
			this.overMapDiv.style.display = 'block';
			//this.map_objects_Div.style.opacity = '1';
			//this.map_objects_Div.style.filter = 'alpha(opacity=100)';
			//this.overMapDiv.style.opacity = '1';
			//this.overMapDiv.style.filter = 'alpha(opacity=100)';
			this.tdiv = false;
			this.scroll_is_running = false;
		}


		
		// Установка наезда зума карты и возвращение нового значения
		// PUBLIC 
		// INVERSED TO MERCATOR
		ClientMap.prototype.ZoomIn = function(mx,my,dontSetMapCenter)
		{
			if(this.flag_ms_move) return this.zoom;
			
			var no = this.zoom_start_from;
			for(var i=this.zoom_start_from;i<this.zoom_levels.length; i++) if(this.zoom_levels[i] == this.zoom) no = i;
			if(no == this.zoom_start_from) return false;
			// -- this.zoomDivs_in(2,mx ? mx/this.zoom : this.center_x,my ? my/this.zoom : this.center_y);
			if(!this.scroll_is_running) this.zoomDivs_in(1,mx ? mx/this.zoom : this.center_x,my ? my/this.zoom : this.center_y);
			
			//document.getElementById('waitDiv').innerHTML = 'подождите, выполняется загрузка элементов карты...';
			//document.getElementById('waitDiv').style.visibility = 'visible';
			
			var mpc = this.GetMapCenter();
			mpc.x = mpc.x * this.zoom;
			mpc.y = mpc.y * this.zoom;
			
			this.Presize(this.zoom,this.zoom_levels[no-1],mx,my);
			
			this.InitZoom(this.zoom_levels[no-1],this.zoom_format,this.zoom_nocrop,this.zoom_nobounds);  // установка зума карты
			
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
			
			if(!(dontSetMapCenter))
			{
				this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom)+256);   // установка центра карты и прорисовка
				this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom));   // установка центра карты и прорисовка
				this.UrlUpdate(true);
				this.for_clnav_ChangeZoom(this,this.zoom);
				this.CallExtPlugins('onzoom',{zoom:this.zoom});
				if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);				
			};
			this.AddToWGSHistory();
			return this.zoom;
		}
		
		// Установка отъезда зума карты и возвращение нового значения
		// PUBLIC 
		// INVERSED TO MERCATOR
		ClientMap.prototype.ZoomOut = function(mx,my,dontSetMapCenter)
		{
			if(this.flag_ms_move) return this.zoom;
			
			var no = -1;
			
			for(var i=this.zoom_start_from; i < this.zoom_levels.length; i++) if(this.zoom_levels[i] == this.zoom) no = i;
			if(no > this.zoom_levels.length-2) return false;
			// -- this.zoomDivs_in(0.5,mx ? mx/this.zoom : this.center_x,my ? my/this.zoom : this.center_y);
			if(!this.scroll_is_running) this.zoomDivs_in(-1,mx ? mx/this.zoom : this.center_x,my ? my/this.zoom : this.center_y);
			
			//document.getElementById('waitDiv').innerHTML = 'подождите, выполняется загрузка элементов карты...';
			//document.getElementById('waitDiv').style.visibility = 'visible';
			
			var mpc = this.GetMapCenter();
			mpc.x = mpc.x * this.zoom;
			mpc.y = mpc.y * this.zoom;
			
			this.Presize(this.zoom,this.zoom_levels[no+1],mx,my);
			
			this.InitZoom(this.zoom_levels[no+1],this.zoom_format,this.zoom_nocrop,this.zoom_nobounds);  // установка зума карты
			
			this.map_minx = this.map_minx_m / this.zoom;
			this.map_miny = this.map_miny_m / this.zoom;
			this.map_maxx = this.map_maxx_m / this.zoom;
			this.map_maxy = this.map_maxy_m / this.zoom;
			
			if(!(dontSetMapCenter))
			{
				this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom)+256);   // установка центра карты и прорисовка
				this.SetMapCenter(parseInt(mpc.x / this.zoom),parseInt(mpc.y / this.zoom));   // установка центра карты и прорисовка
				this.UrlUpdate(true);
				this.for_clnav_ChangeZoom(this,this.zoom);
				this.CallExtPlugins('onzoom',{zoom:this.zoom});
				if(this.MapEvents.ChangeZoom) this.MapEvents.ChangeZoom(this,this.zoom);				
			};
			this.AddToWGSHistory();
			return this.zoom;
		}
		
		// Установка позиции карты в пикселях; x,y - координаты центра
		// PUBLIC
		// INVERSED TO MERCATOR
		ClientMap.prototype.SetMapCenter = function(tx,ty,p3)
		{
			if(this.flag_ms_move) return this.GetMapCenter();
			
			var x = tx ? tx : 0;
			var y = ty ? ty : 0;
			
			// if (x <= (this.map_minx+this.map_width / 2)) x = this.map_minx+this.map_width / 2;
			// if (x >= (this.map_maxx-this.map_width / 2)) x = this.map_maxx-this.map_width / 2;
			// if (y <= (this.map_miny+this.map_height / 2)) y = this.map_miny+this.map_height / 2;
			// if (y >= (this.map_maxy-this.map_height / 2)) y = this.map_maxy-this.map_height / 2;
			
			this.ReOpera(x,y); // Opera Offset
			
			this.ms_xs = -256 + this.opera_offset_x;
			this.ms_ys = -256 + this.opera_offset_y;
			
			this.center_x = x;
			this.center_y = y;
			
			var mx = x-this.map_width/2-256;
			var my = y-this.map_height/2-256;
			
			this.coverDiv.style.left = this.ms_xs-mx;
			this.rastrDiv.style.left = this.ms_xs-mx;
			this.map_objects_Div.style.left = this.ms_xs-mx;
			this.coverDiv.style.top = this.ms_ys-my;
			this.rastrDiv.style.top = this.ms_ys-my;
			this.map_objects_Div.style.top = this.ms_ys-my;
			this.firstboot = true;
			
			this.RecalculateRastr(mx,my);
			this.for_clnav_MapMoved(this,0,0);
			
			//this.AroundAreaLoad();			
			if(!p3) this.AddToWGSHistory();
			return this.GetMapCenter();
		}
		
		// MERCATOR
		ClientMap.prototype.SetMapCenterInMeters = function(mx,my)
		{			
			var res = this.SetMapCenter(mx / this.zoom, -1 * my / this.zoom);
			return res;
		}
		
		// lat lon
		ClientMap.prototype.SetMapCenterInLatLon = function(lat,lon)
		{
			var mp = this.ConvertLatLonToPoint(lat,lon);
			var res = this.SetMapCenter(mp.x / this.zoom, -1 * mp.y / this.zoom);
			return res;
		}
	
		// Получение текущих координат центра карты в пикселях
		// PUBLIC
		// INVERSED TO MERCATOR
		ClientMap.prototype.GetMapCenter = function(rounded)
		{
			if(rounded)
			{
				var rcx = this.center_x - (this.center_x % 256); //this.save_posx + this.map_width / 2 + 512;
				var rcy = this.center_y - (this.center_y % 256); //this.save_posy + this.map_height / 2 + 256;
				// rr = Gnome(rcx * this.zoom,-1 * rcy * this.zoom,this.zoomIndex)
				// var rct = rr.x+' '+rr.y;
				// try { 
				//	document.getElementById("test_div").innerHTML = rcx+' '+rcy+' '+rct+'<br/>'+this.center_x+' '+this.center_y; 
				//} catch (e) {};
				return {x:rcx,y:rcy};
			};
			return {x:this.center_x,y:this.center_y};
		}		
	
		// MERCATOR
		ClientMap.prototype.GetMapCenterInMeters = function(rounded)
		{
			var res = this.GetMapCenter(rounded);
			res.x = res.x * this.zoom;
			res.y = -1 * res.y * this.zoom;
			return res;
		}
		
		// WGS-84
		ClientMap.prototype.GetMapCenterInLatLon = function(rounded)
		{
			var res = this.GetMapCenter(rounded);
			res.x = res.x * this.zoom;
			res.y = -1 * res.y * this.zoom;
			res = this.ConvertPointToLatLon(res.x,res.y);
			res.lat = parseInt(res.lat * 100000000)/100000000;
			res.lon = parseInt(res.lon * 100000000)/100000000;
			return res;
		}
		
		// Получения расстояния между 2-мя точками
		ClientMap.prototype.GetDistanceInMeters = function(x0,y0,x1,y1)
		{
			var spoint = this.ConvertPointToLatLon(x0,y0);
			var epoint = this.ConvertPointToLatLon(x1,y1);
			return this.GetDistanceInLatLon(spoint.lat,spoint.lon,epoint.lat,epoint.lon);
		}
		
		// Получения расстояния между 2-мя точками
		ClientMap.prototype.GetDistanceInLatLon	 = function(sLat,sLon,eLat,eLon)
		{
			// var pi = 3.14159265358979323;
			var EarthRadius = 6378137.0;
	
			var lon1, lon2, lat1, lat2;
			
			/*
			var dlon, dlat, a, c,  dist;
			
			lon1 = parseFloat (sLon);
			lat1 = parseFloat (sLat);
			lon2 = parseFloat (eLon);
			lat2 = parseFloat (eLat);

			// This algorithm is called Sinnott's Formula
			
			dlon = DegToRad (lon2) - DegToRad (lon1);
			dlat = DegToRad (lat2) - DegToRad (lat1);
			a = Math.pow (Math.sin (dlat/2), 2.0) + Math.cos (lat1) * Math.cos (lat2) * Math.pow (Math.sin (dlon/2), 2.0);
			c = 2 * Math.asin (Math.sqrt (a));
			dist = EarthRadius * c;
			}*/
			
			lon1 = DegToRad (parseFloat (sLon));
			lon2 = DegToRad (parseFloat (eLon));
			lat1 = DegToRad (parseFloat (sLat));
			lat2 = DegToRad (parseFloat (eLat));

			return  EarthRadius * (Math.acos (Math.sin (lat1) * Math.sin (lat2) + Math.cos (lat1) * Math.cos (lat2) * Math.cos (lon1-lon2)));
			return true;
		}
		
		// Получения расстояния между 2-мя точками
		ClientMap.prototype.GetDistanceInLatLon2 = function(sLat,sLon,eLat,eLon)
		{
			// var pi = 3.14159265358979323;
			var EarthRadius = 6378137.0;
	
			var lon1, lon2, lat1, lat2, dist;
			var dlon, dlat, a, c;

			lon1 = parseFloat (sLon);
			lat1 = parseFloat (sLat);
			lon2 = parseFloat (eLon);
			lat2 = parseFloat (eLat);

			/* This algorithm is called Sinnott's Formula */
			dlon = DegToRad (lon2) - DegToRad (lon1);
			dlat = DegToRad (lat2) - DegToRad (lat1);
			a = Math.pow (Math.sin (dlat/2), 2.0) + Math.cos (lat1) * Math.cos (lat2) * Math.pow (Math.sin (dlon/2), 2.0);
			c = 2 * Math.asin (Math.sqrt (a));
			return EarthRadius * c;
		}
		
		// Преобразование метровых координат в Lat Lon result: {Lat,Lon}
		ClientMap.prototype.ConvertPointToLatLon = function(x_meters,y_meters)
		{
			var Easting = x_meters;
			var Northing = y_meters;
			//return ConvertXYToGEO(x_meters,y_meters);
			var PI = 3.14159265358979323;
			var PI_OVER_2 = (PI / 2.0);
			// MAX_LAT = ((PI * 89.5) / 180.0); /* 89.5 degrees in radians         */

			/* Ellipsoid Parameters, default to WGS 84 */
			var Merc_a = 6378137.0;    /* Semi-major axis of ellipsoid in meters */

				/* Mercator projection Parameters */
			var Merc_Origin_Long = 0.0;     /* Longitude of origin in radians    */
			var Merc_False_Northing = 0.0;  /* False northing in meters          */
			var Merc_False_Easting = 0.0;   /* False easting in meters           */
			var Merc_Scale_Factor = 1.0;    /* Scale factor                      */

				/* Isometric to geodetic latitude parameters, default to WGS 84 */
			var Merc_ab = 0.00335655146887969400;
			var Merc_bb = 0.00000657187271079536;
			var Merc_cb = 0.00000001764564338702;
			var Merc_db = 0.00000000005328478445;
	
				/* Maximum variance for easting and northing values for WGS 84.
				*/
			var Merc_Delta_Easting = 20237883.0;
			var Merc_Delta_Northing = 23421740.0;
	
			var dx;     /* Delta easting - Difference in easting (easting-FE)      */
            var dy;     /* Delta northing - Difference in northing (northing-FN)   */
            var xphi;   /* Isometric latitude                                      */
            var Longitude;
            var Latitude;
            var latlong = {lat:0,lon:0};
            var Error_Code = false;

            if ((Easting < (Merc_False_Easting - Merc_Delta_Easting)) || (Easting > (Merc_False_Easting + Merc_Delta_Easting)))
            { /* Easting out of range */
                Error_Code = false;
            }
            if ((Northing < (Merc_False_Northing - Merc_Delta_Northing)) || (Northing > (Merc_False_Northing + Merc_Delta_Northing)))
            { /* Northing out of range */
                Error_Code = false;
            }
            if (!Error_Code)
            { /* no errors */
                dy = Northing - Merc_False_Northing;
                dx = Easting - Merc_False_Easting;
                Longitude = Merc_Origin_Long + dx / (Merc_Scale_Factor * Merc_a);
                xphi = PI / 2 - 2 * Math.atan(1 / Math.exp(dy / (Merc_Scale_Factor * Merc_a)));
                Latitude = xphi + Merc_ab * Math.sin(2 * xphi) + Merc_bb * Math.sin(4 * xphi) + Merc_cb * Math.sin(6 * xphi) + Merc_db * Math.sin(8 * xphi);
                if (Longitude > PI)
                    Longitude -= (2 * PI);
                if (Longitude < -PI)
                    Longitude += (2 * PI);

                // convert radians to degrees before outputting.
                latlong.lat = (Latitude * (180 / PI));
                latlong.lon = (Longitude * (180 / PI));
            }
            else
            {
                latlong.lat = -999;
                latlong.lon = -999;
            }
            return (latlong);
		}
		
		// Преобразование Lat Lon в метровые координаты result: {x,y}
		ClientMap.prototype.ConvertLatLonToPoint = function(lat,lon)
		{
			//return ConvertGEOToXY(lat,lon);
			var r_major = 6378137.000;				
			var r_minor = 6356752.3142;
			var temp = r_minor / r_major;
			var es = 1.0 - (temp * temp);
			var eccent = Math.sqrt(es);
			var phi = DegToRad(lat);
			var sinphi = Math.sin(phi);
			var con = eccent * sinphi;
			var com = .5 * eccent;
			con = Math.pow(((1.0-con)/(1.0+con)), com);
			var ts = Math.tan(.5 * ((Math.PI*0.5) - phi))/con;
			var res = {};
			res.y = 0 - r_major * Math.log(ts);
			res.x = r_major * DegToRad(lon);
			return res;
		}
		

		// Перестраиваем изображения относительно сдвига карты; diffx,diffy - позиция центра карты
		// PRIVATE
		ClientMap.prototype.RecalculateRastr = function(_diffx,_diffy)
		{			
			var diffx = _diffx - this.opera_offset_x;
			var diffy = _diffy - this.opera_offset_y;
			var posx = (diffx-(diffx % 256));
			var posy = (diffy-(diffy % 256));
			var ostx = (-1*(diffx % 256));
			var osty = (-1*(diffy % 256));
			
			var boolflip = false;
			if(parseInt(this.images_array[0][0].img.style.left) == posx && parseInt(this.images_array[0][0].img.style.top) == posy) 
			{
				this.rastrDiv.style.visibility = 'hidden';
					// multi layers++
					if(this.support_multi_layers) 
						for(var i=0;i<this.rastrLayers.length;i++)  
							this.rastrLayers[i].div.style.display = 'none';
					// --multi layers
				boolflip = true;
			};					

			if(this.firstboot || (this.save_posx != posx) || (this.save_posy != posy))
			{
				if(true) //подтягиваем плоскость с конца
				{
					if(posx > this.save_posx)
					for(var y=0;y<this.images_array_y;y++)
					{
						var tmp_img = this.images_array[y][0].img;
							// multi layers++
							var tmp_imgs_l = [];
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									tmp_imgs_l[i] = this.rastrLayers[i].images[y][0];
							// --multi layers
						for(var x=0;x<this.images_array_x-1;x++)		
						{
							this.images_array[y][x].img = this.images_array[y][x+1].img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][x] = this.rastrLayers[i].images[y][x+1];
							// --multi layers
						};	
						this.images_array[y][this.images_array_x-1].img = tmp_img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][this.images_array_x-1] = tmp_imgs_l[i];
							// --multi layers
					};
					if(posx < this.save_posx)
					for(var y=0;y<this.images_array_y;y++)
					{
						var tmp_img = this.images_array[y][this.images_array_x-1].img;
							// multi layers++
							var tmp_imgs_l = [];
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									tmp_imgs_l[i] = this.rastrLayers[i].images[y][this.images_array_x-1];
							// --multi layers
						for(var x=this.images_array_x-1;x>0;x--)		
						{
							this.images_array[y][x].img = this.images_array[y][x-1].img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][x] = this.rastrLayers[i].images[y][x-1];
							// --multi layers
						};	
						this.images_array[y][0].img = tmp_img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][0] = tmp_imgs_l[i];
							// --multi layers
					};
					if(posy > this.save_posy)
					for(var x=0;x<this.images_array_x;x++)
					{
						var tmp_img = this.images_array[0][x].img;
							// multi layers++
							var tmp_imgs_l = [];
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									tmp_imgs_l[i] = this.rastrLayers[i].images[0][x];
							// --multi layers
						for(var y=0;y<this.images_array_y-1;y++)		
						{
							this.images_array[y][x].img = this.images_array[y+1][x].img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][x] = this.rastrLayers[i].images[y+1][x];
							// --multi layers
						};	
						this.images_array[this.images_array_y-1][x].img = tmp_img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[this.images_array_y-1][x] = tmp_imgs_l[i];
							// --multi layers
					};
					if(posy < this.save_posy)
					for(var x=0;x<this.images_array_x;x++)
					{
						var tmp_img = this.images_array[this.images_array_y-1][x].img;
							// multi layers++
							var tmp_imgs_l = [];
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									tmp_imgs_l[i] = this.rastrLayers[i].images[this.images_array_y-1][x];
							// --multi layers
						for(var y=this.images_array_y-1;y>0;y--)		
						{
							this.images_array[y][x].img = this.images_array[y-1][x].img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[y][x] = this.rastrLayers[i].images[y-1][x];
							// --multi layers
						};	
						this.images_array[0][x].img = tmp_img;
							// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++) 
									this.rastrLayers[i].images[0][x] = tmp_imgs_l[i];
							// --multi layers
					};
				};
			
				this.save_posx = posx;
				this.save_posy = posy;	
				
				for(var y=0;y<this.images_array_y;y++)
				for(var x=0;x<this.images_array_x;x++)		
				{	
					this.images_array[y][x].img.style.left = posx + 256*x;
					this.images_array[y][x].img.style.top  = posy + 256*y;
						// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++)
								{
									this.rastrLayers[i].images[y][x].style.left = posx + 256*x;
									this.rastrLayers[i].images[y][x].style.top  = posy + 256*y;
								};
						// --multi layers
				
					var tmp_x = x + ((_diffx-(_diffx % 256))) / 256;
					var tmp_y = y + ((_diffy-(_diffy % 256))) / 256;
				
					this.images_array[y][x].x = tmp_x;
					this.images_array[y][x].y = tmp_y;

					var z_i = this.GetZoomArrayLevel(this.zoom);
					var tmp_img_src = this.zoom_format(this.images_array[y][x].x,this.images_array[y][x].y,z_i);  //+"?random"+Math.round(Math.random()*1000);
				
					if(this.debug) this.images_array[y][x].img.alt = this.images_array[y][x].x+' _ '+this.images_array[y][x].y+' ' + tmp_img_src;					
					if(this.images_array[y][x].img.src != tmp_img_src) 
					{
						this.images_array[y][x].img.src = '';
						this.images_array[y][x].img.style.visibility = 'hidden';
						try {
						  this.images_array[y][x].img.src = tmp_img_src;
						} catch (e) {};
					};
					//this.images_array[y][x].img.style.background = 'url('+tmp_img_src+')';
					
						// multi layers++
							if(this.support_multi_layers) 
								for(var i=0;i<this.rastrLayers.length;i++)
								if(this.rastrLayers[i].url_func)
								{
									tmp_img_src = this.rastrLayers[i].url_func(this.images_array[y][x].x,this.images_array[y][x].y,z_i);
									if(this.rastrLayers[i].images[y][x].src != tmp_img_src)
									{
										this.rastrLayers[i].images[y][x].src = '';
										this.rastrLayers[i].images[y][x].style.visibility = 'hidden';
										try {
										  this.rastrLayers[i].images[y][x].src = tmp_img_src;
										} catch (e) {};
									};
								};
						// --multi layers
				};
			};
			
			this.firstboot = false;
			if(boolflip) 
			{
				this.rastrDiv.style.visibility = '';
					// multi layers++
					if(this.support_multi_layers) 
						for(var i=0;i<this.rastrLayers.length;i++)  
							this.rastrLayers[i].div.style.display = '';
					// --multi layers
			};
			
			this.center_x = _diffx+this.map_width/2+256;
			this.center_y = _diffy+this.map_height/2+256;
			
			//if(!this.flag_ms_move) this.MapCenterPreChanged(false);
			this.MapCenterPreChanged(this.flag_ms_move,true);
		}
		
		// обновление #
		ClientMap.prototype.upURL = function()
		{
			if(this.url_update)
			{
				this.url.setHashParam('z',this.GetZoomArrayLevel(this.zoom)); 
				if(this.url_latlon)
				{
					var wgs = this.GetMapCenterInLatLon();
					this.url.setHashParam('lat',wgs.lat); 
					this.url.setHashParam('lon',wgs.lon); 
				}
				else
				{
					this.url.setHashParam('x',this.center_x*this.zoom); 
					this.url.setHashParam('y',-1*this.center_y*this.zoom); 
				};
				this.url.SetLoc();
			};
		}
		
		// private
		ClientMap.prototype.PrintableAreaX = 640;
		ClientMap.prototype.PrintableAreaY = 450;
		ClientMap.prototype.PrintableAreaV = false;
		ClientMap.prototype.PrintableArea = false;
		
		// public
		ClientMap.prototype.SetPrintableArea = function(wi,he)
		{
			this.PrintableAreaX = wi;
			this.PrintableAreaY = he;
		}
		
		// public
		ClientMap.prototype.ShowPrintableArea = function(visible)
		{
			if(this.PrintableAreaV && visible) this.ShowPrintableArea(false);
			
			this.PrintableAreaV = visible;
			this.flag_ms_overs[4] = this.PrintableAreaV;
			
			if(this.PrintableArea && !visible) for(var i=0;i<6;i++) this.printablePreview.removeChild(this.PrintableAreaArr[i]);
			this.printablePreview.style.display = 'none';
			this.printablePreview.style.visibility = 'hidden';
			this.PrintableArea = false;
			
			if(visible)
			{
				this.PrintableAreaArr = [];
				var _x1 = Math.floor((this.map_width - this.PrintableAreaX)/2);
				var _x2 = this.PrintableAreaX;
				var _x3 = _x1+2;
				var _y1 = Math.floor((this.map_height - this.PrintableAreaY)/2);
				var _y2 = this.PrintableAreaY;
				var _y3 = _y1+2;
				
				this.PrintableAreaArr[0] = document.createElement('div');
				this.PrintableAreaArr[0].style.position = 'absolute';
				this.PrintableAreaArr[0].style.left = 0;
				this.PrintableAreaArr[0].style.top = 0;
				this.PrintableAreaArr[0].style.width = this.map_width;
				this.PrintableAreaArr[0].style.height = _y1;
				this.PrintableAreaArr[0].style.background = 'white';
				this.PrintableAreaArr[0].style.opacity = '0.75';
				this.printablePreview.appendChild(this.PrintableAreaArr[0]);
				
				this.PrintableAreaArr[1] = document.createElement('div');
				this.PrintableAreaArr[1].style.position = 'absolute';
				this.PrintableAreaArr[1].style.left = 0;
				this.PrintableAreaArr[1].style.top = _y1;
				this.PrintableAreaArr[1].style.width = _x1;
				this.PrintableAreaArr[1].style.height = _y2;
				this.PrintableAreaArr[1].style.background = 'white';
				this.PrintableAreaArr[1].style.opacity = '0.75';
				this.printablePreview.appendChild(this.PrintableAreaArr[1]);
				
				this.PrintableAreaArr[2] = document.createElement('div');
				this.PrintableAreaArr[2].style.position = 'absolute';
				this.PrintableAreaArr[2].style.left = _x1+_x2;
				this.PrintableAreaArr[2].style.top = _y1;
				this.PrintableAreaArr[2].style.width = _x3;
				this.PrintableAreaArr[2].style.height = _y2;
				this.PrintableAreaArr[2].style.background = 'white';
				this.PrintableAreaArr[2].style.opacity = '0.75';
				this.printablePreview.appendChild(this.PrintableAreaArr[2]);
				
				this.PrintableAreaArr[3] = document.createElement('div');
				this.PrintableAreaArr[3].style.position = 'absolute';
				this.PrintableAreaArr[3].style.left = 0;
				this.PrintableAreaArr[3].style.top = _y1+_y2;
				this.PrintableAreaArr[3].style.width = this.map_width;
				this.PrintableAreaArr[3].style.height = _y3;
				this.PrintableAreaArr[3].style.background = 'white';
				this.PrintableAreaArr[3].style.opacity = '0.75';
				this.printablePreview.appendChild(this.PrintableAreaArr[3]);
				
				this.PrintableAreaArr[4] = document.createElement('div');
				this.PrintableAreaArr[4].style.position = 'absolute';
				this.PrintableAreaArr[4].style.left = 0;
				this.PrintableAreaArr[4].style.top = _y1-21;
				this.PrintableAreaArr[4].style.width = this.map_width;
				this.PrintableAreaArr[4].innerHTML = '<center><b style="color:navy">Область печати</b></center>';
				this.printablePreview.appendChild(this.PrintableAreaArr[4]);
				
				this.PrintableAreaArr[5] = document.createElement('div');
				this.PrintableAreaArr[5].style.position = 'absolute';
				this.PrintableAreaArr[5].style.border = 'solid 1px gray';
				this.PrintableAreaArr[5].style.left = _x1;
				this.PrintableAreaArr[5].style.top = _y1;
				this.PrintableAreaArr[5].style.width = _x2-(this.ns ? 1 : 0);
				this.PrintableAreaArr[5].style.height = _y2-(this.ns ? 1 : 0);
				this.printablePreview.appendChild(this.PrintableAreaArr[5]);
				
				this.printablePreview.style.display = 'block';
				this.printablePreview.style.visibility = 'visible';
				
				this.PrintableArea = true;
				
				//this.PrintableAreaArr[5].innerHTML = '<img src="engine/gif/_preview_circle.gif" style="opacity:0.85;"/>';
			};
		}
		
		//private
		ClientMap.prototype.ShowCircleAreaVis = false;
		
		// public
		ClientMap.prototype.ShowCircleArea = function(xm,ym,prev)
		{
			if(!xm && xm != 0) xm = this.map_width/2;
			if(!ym && ym != 0) ym = this.map_height/2;
			
			if(this.ShowCircleAreaVis) this.HideCircleArea();
			this.ShowCircleAreaVis = true;
			if(!prev)
			{
				this.ShowCircleAreaVisX = xm;
				this.ShowCircleAreaVisY = ym;
			}
			else
			{
				xm = this.ShowCircleAreaVisX;
				ym = this.ShowCircleAreaVisY;
			};
			
			this.ShowCircleAreaArr = [];
			var _x1 = xm-64;
			var _x2 = 129;
			var _x3 = this.map_width-xm-64+2;
			var _y1 = ym-64;
			var _y2 = 129;
			var _y3 = this.map_height-ym-64+2;
			
				this.ShowCircleAreaArr[0] = document.createElement('div');
				this.ShowCircleAreaArr[0].style.position = 'absolute';
				this.ShowCircleAreaArr[0].style.left = 0;
				this.ShowCircleAreaArr[0].style.top = 0;
				this.ShowCircleAreaArr[0].style.width = this.map_width;
				this.ShowCircleAreaArr[0].style.height = _y1;
				this.ShowCircleAreaArr[0].style.background = 'white';
				this.ShowCircleAreaArr[0].style.opacity = '0.65';
				this.showCirclePreview.appendChild(this.ShowCircleAreaArr[0]);
				
				this.ShowCircleAreaArr[1] = document.createElement('div');
				this.ShowCircleAreaArr[1].style.position = 'absolute';
				this.ShowCircleAreaArr[1].style.left = 0;
				this.ShowCircleAreaArr[1].style.top = _y1;
				this.ShowCircleAreaArr[1].style.width = _x1;
				this.ShowCircleAreaArr[1].style.height = _y2;
				this.ShowCircleAreaArr[1].style.background = 'white';
				this.ShowCircleAreaArr[1].style.opacity = '0.65';
				this.showCirclePreview.appendChild(this.ShowCircleAreaArr[1]);
				
				this.ShowCircleAreaArr[2] = document.createElement('div');
				this.ShowCircleAreaArr[2].style.position = 'absolute';
				this.ShowCircleAreaArr[2].style.left = _x1+_x2;
				this.ShowCircleAreaArr[2].style.top = _y1;
				this.ShowCircleAreaArr[2].style.width = _x3;
				this.ShowCircleAreaArr[2].style.height = _y2;
				this.ShowCircleAreaArr[2].style.background = 'white';
				this.ShowCircleAreaArr[2].style.opacity = '0.65';
				this.showCirclePreview.appendChild(this.ShowCircleAreaArr[2]);
				
				this.ShowCircleAreaArr[3] = document.createElement('div');
				this.ShowCircleAreaArr[3].style.position = 'absolute';
				this.ShowCircleAreaArr[3].style.left = 0;
				this.ShowCircleAreaArr[3].style.top = _y1+_y2;
				this.ShowCircleAreaArr[3].style.width = this.map_width;
				this.ShowCircleAreaArr[3].style.height = _y3;
				this.ShowCircleAreaArr[3].style.background = 'white';
				this.ShowCircleAreaArr[3].style.opacity = '0.65';
				this.showCirclePreview.appendChild(this.ShowCircleAreaArr[3]);
				
				this.ShowCircleAreaArr[4] = document.createElement('div');
				this.ShowCircleAreaArr[4].style.position = 'absolute';
				this.ShowCircleAreaArr[4].style.left = _x1;
				this.ShowCircleAreaArr[4].style.top = _y1;
				this.ShowCircleAreaArr[4].style.width = _x2;//-(this.ns ? 1 : 0);
				this.ShowCircleAreaArr[4].style.height = _y2;//-(this.ns ? 1 : 0);
				this.ShowCircleAreaArr[4].style.background = "url('"+global_vars_array[0]+"engine/gif/_preview_circle.gif') no-repeat";
				this.ShowCircleAreaArr[4].style.opacity = '0.65';
				this.showCirclePreview.appendChild(this.ShowCircleAreaArr[4]);
				
				//this.ShowCircleArea.img = document.createElement('img');
				//this.ShowCircleArea.img.style.opacity = '0.85';
				//this.ShowCircleArea.img.src = 'engine/gif/_preview_circle.gif';
				//this.ShowCircleAreaArr[4].appendChild(this.ShowCircleArea.img);
				
				this.showCirclePreview.style.display = 'block';
				this.showCirclePreview.style.visibility = 'visible';
			this.flag_ms_overs[3] = true;
		}
		
		// public
		ClientMap.prototype.HideCircleArea = function()
		{
			if(this.ShowCircleAreaVis) for(var i=0;i<5;i++) this.showCirclePreview.removeChild(this.ShowCircleAreaArr[i]);
			this.showCirclePreview.style.display = 'none';
			this.showCirclePreview.style.visibility = 'hidden';
			this.ShowCircleAreaVis = false;
			this.flag_ms_overs[3] = false;
		}
		
		/*
			class Configuration
			{
					// получение короткой ссылки (lat,lon,zoom)
					// return #u=TZXXXXXXXXYYYYYYYY
					// ex: http://192.168.0.8/rastr/index3.html#u=05000x42kq000mfmdc,5
				public string GetShortURL()
				
					// загрузка из короткой ссылки, если str не задано, то грузим из урла
					// str = TZXXXXXXXXYYYYYYYY
				public bool SetShortURL(str)
				
					// Сохраняем NavigationTool, Lat, Lon, Zoom в Cookies;
				public SaveToCookies(int memory_slot);
					// Загружаем NavigationTool, Lat, Lon, Zoom из Cookies
				public LoadFromCookies(int memory_slot);
			}
		*/
		
		ClientMap.prototype.Configuration = new Configuration();
		
			function Configuration() { this.clmap = false; this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)'; }
			Configuration.prototype.type = 'ClientMap.Configuration';
		
			// return #u=TZXXXXXXXXYYYYYYYY
			// ex: http://192.168.0.8/rastr/index3.html#u=05000x42kq000mfmdc,5
			Configuration.prototype.GetShortURL = function()
			{
				var wgs = this.clmap.GetMapCenterInLatLon();
				return "#u=0"+EncodeXYZ(wgs.lat,wgs.lon,this.clmap.GetZoomArrayLevel(this.clmap.zoom));
			}
			
			//public
			Configuration.prototype.LatLonZoomToShort = function(lat,lon,zoom)
			{
				return "0"+EncodeXYZ(lat,lon,parseInt(zoom));
			}
			
			//public
			Configuration.prototype.ShortToLatLonZoom = function(short_str)
			{
				return DecodeXYZ(short_str.substr(1,18)); // {lat,lon,zoom}
			}
			
			// str = TZXXXXXXXXYYYYYYYY
			Configuration.prototype.SetShortURL = function(str)
			{
				var par = this.clmap.url.getHashParam("u");
				if(par) this.clmap.url.delHashParam("u");
				if(str != null && str != '') par = str;
				if(par)
				{
					par = par.substr(1,18);
					res = DecodeXYZ(par);
					this.clmap.SetMapCenterInLatLon(res.lat,res.lon);
					this.clmap.SetZoomFromIndex(res.zoom);
					return true;
				};
				return false;
			}	

			// return string[] - номера memory_slots
			Configuration.prototype.GetCookiesMemorySlots = function()
			{
				var myCookie = new ClientCookie('clmap_memslots');
				myCookie.get();
				if(myCookie.value && myCookie.value.length > 0) 
				{					
					var nums = (new Function('','return ['+myCookie.value+'];'))();
					for(var i=0;i<nums.length;i++) if(nums[i] == false) nums[i] = 0; else nums[i] = unescape(nums[i]);
					return nums;
				};
				return [];
			}
			
			// private
			Configuration.prototype.MaxCookiesSaves = 20;
			
			// Сохраняем NavigationTool, Lat, Lon, Zoom в Cookies;
			Configuration.prototype.SaveToCookies = function(memory_slot)
			{
				var mem = this.GetCookiesMemorySlots();
				if(mem.length == this.MaxCookiesSaves) throw new Error("Cookies saves overflow. Maximum available slots is "+this.MaxCookiesSaves);
				
				if(!memory_slot) memory_slot = '0';
				memory_slot = escape(memory_slot);
				var wgs = this.clmap.GetMapCenterInLatLon();
				var myCookie = new ClientCookie('clmap_tzxy_'+memory_slot,this.clmap.nav_mode.toString()+EncodeXYZ(wgs.lat,wgs.lon,this.clmap.GetZoomArrayLevel(this.clmap.zoom)));
				myCookie.MonthTimeout(1);
				myCookie.set();

				var ex = false;
				for(var i=0;i<mem.length;i++) if(mem[i] == unescape(memory_slot)) ex = true;
				if(!ex) mem[mem.length] = memory_slot;
				
				var str = '';
				for(var i=0;i<mem.length;i++) str += ', "'+mem[i]+'"';
				str = str.substr(1,str.length-1);
				var myCookie = new ClientCookie('clmap_memslots',str);
				myCookie.MonthTimeout(1);
				myCookie.set();
				return true;
			}
			
			// Загружаем NavigationTool, Lat, Lon, Zoom из Cookies
			Configuration.prototype.LoadFromCookies = function(memory_slot)
			{
				if(!memory_slot) memory_slot = '0';
				memory_slot = escape(memory_slot);
				var wgs = this.clmap.GetMapCenterInLatLon();
				var myCookie = new ClientCookie('clmap_tzxy_'+memory_slot);
				myCookie.get();
				if(myCookie.value && myCookie.value.length > 0)
				{				
					var val = myCookie.value;					
					var res = DecodeXYZ(val.substr(1,18));
					var nav = parseInt(val.substr(0,1));
					
					this.clmap.SetMapCenterInLatLon(res.lat,res.lon);
					this.clmap.SetZoomFromIndex(res.zoom);
					if(nav != 0) this.clmap.NavigateMode(nav);
				};
			}
			
			//private GetFromCookies
			Configuration.prototype.GetFromCookies = function(memory_slot)
			{
				if(!memory_slot) memory_slot = '0';
				memory_slot = escape(memory_slot);
				var wgs = this.clmap.GetMapCenterInLatLon();
				var myCookie = new ClientCookie('clmap_tzxy_'+memory_slot);
				myCookie.get();
				if(myCookie.value && myCookie.value.length > 0)
				{				
					var val = myCookie.value;					
					var res = DecodeXYZ(val.substr(1,18));
					res.val = val;
					return res;
				};
				return false;
			}
			
			// public 
			Configuration.prototype.DeleteFromCookies = function(memory_slot)
			{
				if(!memory_slot) memory_slot = '0';
				memory_slot = escape(memory_slot);
				
				var mem = this.GetCookiesMemorySlots();
				var ex = false;
				for(var i=0;i<mem.length;i++) if(mem[i] == unescape(memory_slot)) ex = true;
				if(!ex) return false;
								
				var myCookie = new ClientCookie('clmap_tzxy_'+memory_slot);
				myCookie.del();
				
				var str = '';
				for(var i=0;i<mem.length;i++) if(mem[i] != unescape(memory_slot)) str += ',"'+mem[i]+'"';
				str = str.substr(1,str.length-1);
				var myCookie = new ClientCookie('clmap_memslots',str);
				myCookie.MonthTimeout(1);
				if(str.length > 0) myCookie.set(); else myCookie.del();
				return false;
			}
			
			// public
			Configuration.prototype.ClearCookies = function()
			{
				var mem = this.GetCookiesMemorySlots();
				for(var i=0;i<mem.length;i++)
				{
					var myCookie = new ClientCookie('clmap_tzxy_'+escape(mem[i]));
					myCookie.del();
				};
				myCookie = new ClientCookie('clmap_memslots');
				myCookie.del();
			}
		
		// Получение позиции события мышки (для FF)
		// PUBLIC
		ClientMap.prototype.getEventPos = function(evnt)
		{
			var ex, ey;
			if (this.ns || this.km || this.sm) 
			{
				ex=evnt.clientX;
				ey=evnt.clientY;
			}
			else 
			{
				ex=event.clientX;
				ey=event.clientY;
			}
			return {x:ex,y:ey}
		}
		
		// GLOBAL EVENTS
		ClientMap.prototype.GlobalEvents 			= function(){return this;}
		ClientMap.prototype.GlobalEvents.Mouse_Move = function(evnt) {};
		ClientMap.prototype.GlobalEvents.Mouse_Down = function(evnt) {};
		ClientMap.prototype.GlobalEvents.Mouse_Up   = function(evnt) {};
		ClientMap.prototype.GlobalEvents.Key_Down   = function(evnt) {};
		ClientMap.prototype.GlobalEvents.Key_Up     = function(evnt) {};
		
		ClientMap.prototype.GetNext_zIndex = function()
		{
			return this.next_zIndex++;
		}
		
		ClientMap.prototype.get_FF_mouse_event = function() { return {x:global_tmp_ms_x, y:global_tmp_ms_y}; }
		
		// мышка move over mainDIV
		ClientMap.prototype.global_mouse_over = function (obj)
		{
			var sdata = (obj.ns || obj.km || obj.sm )? ClientMap.prototype.get_FF_mouse_event() : event;
			obj.onMouseOverRastrDiv(sdata);
			return false;
		}
		
		// мышка out mainDIV
		ClientMap.prototype.global_mouse_out = function (obj)
		{
			var sdata = (obj.ns || obj.km || obj.sm ) ? ClientMap.prototype.get_FF_mouse_event() : event
			obj.onMouseOutRastrDiv(sdata);
			return false;
		}
		
		
		ClientMap.prototype.Demo = function(ind)
		{
			if (!this.demo_point)
			{
				this.SetMapCenterInLatLon(55.71343496,37.66418109);
				this.SetZoomFromIndex(3);
				var mp = this.ConvertLatLonToPoint(55.71381006,37.66370956);
							
				var id = -1;
				if((id = this.MapLayers.GetLayerID("TestMovement")) < 0) id = this.MapLayers.Add("TestMovement");
				this.demo_point = new THistoryPoint();				
				this.demo_point.init(mp.x,mp.y,'Демонстрационная точка');
				this.demo_point.initHistory(6,this.ie ? '#731A9B' : 'rgba(115,29,155,0.5)');
				this.demo_point.SetInnerHTML('<div id="demo_div" border="0" style="position:absolute;left:-12px;top:-12px;width:24px;height:24px;font-size:12px;color:navy;font-weight:bold;" align="center"><img src="'+global_vars_array[0]+'engine/gif/user.gif"/><br/>Car<br/></div><div id="demo_car_image" style="position:absolute;left:-16px;top:-16px;"></div>');
				this.MapLayers.AddLayerObject(id,this.demo_point);
				this.demo_point.div.style.position = 'absolute';
				this.demo_point.Hint = '<b>Тестовый пользователь</b>';
				this.demo_point.SetVisible(true);
				this.demo_point.SetSelectable(true, function(sender){MessageDlg("ClientMap Demonstration","<div style=\"font-size:14px;width:90%;\" align=\"justify\">Карта автоматически следит за положением это демонстрационного объекта и сдвигает центр, если объект уходит за видимую область. При этом вы можете безпрепядственно двигать карту и менять зум.</div>",2,['OK']);} );
				
				this.demo_image = new RotatedImage();
				this.demo_image.init(document.getElementById('demo_car_image'));
				this.demo_image.LoadImage(global_vars_array[0]+'engine/gif/angle0.gif',32,32);		
			};						
			
			var rte = [55+60*.0071381006,37+60*.0066370956,55.42792,37.39835,55.42736,37.39719,55.42724,37.39687,55.42637,37.39472,55.42628,37.39450,55.42594,37.39354,55.42589,37.39322,55.42223,37.38791,55.42219,37.38780,55.42304,37.37102,55.42355,37.37266,55.42164,37.37281,55.41429,37.37302,55.41410,37.37305,55.40931,37.37417,55.40895,37.37428,55.40061,37.37399,55.39978,37.37326,55.39585,37.37157,55.39577,37.37157,55.39373,37.37159,55.39363,37.37159,55.38442,37.37172,55.38428,37.37172,55.37953,37.37169,55.37939,37.37168,55.37343,37.36884,55.37328,37.36877,55.36962,37.36700,55.36953,37.36697,55.36875,37.36662,55.36868,37.36659,55.36615,37.36539,55.36613,37.36534,55.36664,37.36209,55.36666,37.36197,55.36692,37.36010,55.36695,37.36011,55.36692,37.36010];
			var rta = [0,180,220,235,235,235,235,235,280,280,215,170,180,170,170,170,170,220,220,180,180,180,180,180,180,195,195,195,195,195,195,195,195,195,285,285,285,285,340,105];
			
			var no = 0;
			if(ind) no = ind;
			if(no > rte.length/2) 
			{
				no = 0;
				this.demo_point.ClearHistory();
			};
			
			var ff = this.vname+'.Demo('+(no+1)+');'
			if(no < rte.length/2) 
			{
				x = rte[no*2];
				y = rte[no*2+1];
				x = parseInt(x)+(x-parseInt(x))/60*100;
				y = parseInt(y)+(y-parseInt(y))/60*100;
				var mp = this.ConvertLatLonToPoint(x,y);
				this.demo_point.Move(mp.x,mp.y);
				this.demo_image.SetAngle(rta[no]);
				
				var b = this.MapLayers.Bounds.MapBounds(24,24,24,24);
				var db = this.demo_point.GetBounds();
				if(!this.MapLayers.Bounds.CrossRectangles(b,db)) this.SetMapCenterInMeters(this.demo_point.GetXY().x,this.demo_point.GetXY().y);
			};
			
			setTimeout(ff,no == 0 ? 5000 : 2500);
		}
		
		
		
		//////////////////////
		/*
			class TEventListener
			{
					// конструктор; variable_name - имя переменной хранения класса;
				public TEventListener(string  variable_name)
					
					// Добавление получателя события
				public Function AddEvent(string event_name);
					// удаление события
				public void RemoveEvent(string event_name);
				
					// Добавление получателя события, возвращает имя получателя
				public string AddListen = function(string event_name, Function call_function)
					// Удаление получателя события, call_function_name - имя получателя события
				public bool RemoveListen = function(string event_name, string call_function_name)
			}
		*/
		
		function TEventListener(myname)
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.vname = myname;
			this.events = [];
			return this;
		}
		
		TEventListener.prototype.Call = function(event_name,event_arguments)
		{
			if(this.events[event_name] && this.events[event_name].c.length > 0) 
			for(var i=0;i<this.events[event_name].c.length;i++)
			{
				switch (event_arguments.length)
				{
					case 10: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4],event_arguments[5],event_arguments[6],event_arguments[7],event_arguments[8],event_arguments[9]); break;
					case 9: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4],event_arguments[5],event_arguments[6],event_arguments[7],event_arguments[8]); break;
					case 8: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4],event_arguments[5],event_arguments[6],event_arguments[7]); break;
					case 7: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4],event_arguments[5],event_arguments[6]); break;
					case 6: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4],event_arguments[5]); break;
					case 5: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3],event_arguments[4]); break;
					case 4: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2],event_arguments[3]); break;
					case 3: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1],event_arguments[2]); break;
					case 2: this.events[event_name].c[i].func(event_arguments[0],event_arguments[1]); break;
					case 1: this.events[event_name].c[i].func(event_arguments[0]); break;
					case 0: this.events[event_name].c[i].func(); break;
				};
			};
		}
		
		TEventListener.prototype.AddEvent = function(event_name)
		{			
			this.events[event_name] = {f:new Function('',''+this.vname+".Call('"+event_name+"',arguments);"),c:[]};
			return this.events[event_name].f;
		}		
		
		TEventListener.prototype.RemoveEvent = function(event_name)
		{
			this.events[event_name] = {f:new Function('',''),c:[]};
		}
		
		TEventListener.prototype.AddListen = function(event_name,call_function)
		{
			if(this.events[event_name])
			this.events[event_name].c[this.events[event_name].c.length] = {func:call_function,name:"cfn"+Math.random()};
			else return false;
			return this.events[event_name].c[this.events[event_name].c.length-1].name;
		}
		
		TEventListener.prototype.RemoveListen = function(event_name,call_function_name)
		{
			if(this.events[event_name])
			{
				var tmpe = [];
				var tmpi = 0;
				for(var i=0;i<this.events[event_name].c.length;i++)
				if(this.events[event_name].c[i].name != call_function_name) tmpe[tmpi++] = this.events[event_name].c[i];
				this.events[event_name].c = tmpe;
			} 
			else return false;
			return true;
		}
		
		//////////////////////
		//////////////////////
		//////////////////////
				
					
		// -1 - on document ready; false/0 - now; 1-99999 - timeOut
		function include(path, _to)
		{
			if(!(_to))
				document.write('<script type="text/javascript"  src="'+path+'"></script>');
			else if(_to == -1)
				global_vars_array[4].push(path);
			else 
				setTimeout("LoadJS('"+path+"');",_to);
		}
		
		// -1 - on document ready; false/0 - now; 1-99999 - timeOut
		function includeCSS(path, _to)
		{
			if(!(_to))
				document.write('<link type="text/css" rel="stylesheet" href="'+path+'"/>');
			else if(_to == -1)
				global_vars_array[5].push(path);
			else 
				setTimeout("LoadCSS('"+path+"');",_to);
		}
		
		function includeDone()
		{
			for(var i=0;i<global_vars_array[4].length;i++) LoadJS(global_vars_array[4][i]);				
			global_vars_array[4] = [];
			for(var i=0;i<global_vars_array[5].length;i++) LoadCSS(global_vars_array[5][i]);
			global_vars_array[5] = [];
		}

		// document.onready = function() { setTimeout('includeDone();',2000); };  //  works only w/jQuery	
		document.dkxce_onload = function() { setTimeout('includeDone();',2500); };
		if (document.addEventListener) { document.addEventListener( "DOMContentLoaded", function() //Mozilla, Opera
		{ document.removeEventListener( "DOMContentLoaded", arguments.callee, false ); document.dkxce_onload(); }, false ); }
		else if (document.attachEvent) { document.attachEvent("onreadystatechange", function() { if ( document.readyState === "complete" )  // IE
		{ document.detachEvent( "onreadystatechange", arguments.callee ); document.dkxce_onload(); }; }) }
		else window.onload = function() { includeDone(); }; // always works
		
		
		// замена параметров образца {0}{1}{2}{3}...{n}
		// PRIVATE
		String.prototype.format = function()
		{
			var str = this;
			for(var i=0;i<arguments.length;i++)
			{
				var re = new RegExp('\\{' + (i) + '\\}','gm');
				str = str.replace(re, arguments[i]);
			};
			return str;
		}
		
		// форматирование строки для урла, формат "img_y{y}x{x}_z{z}"
		// PRIVATE
		String.prototype.formatXYZ = function(x,y,z)
		{
			var ax = x;
			var ay = y;
			var az = z;
			//while((ax).toString().length < 4) ax = "0" + ax;
			//while((ay).toString().length < 4) ay = "0" + ay;
			var str = this;
			var re = new RegExp('\\{x\\}','gm');
			str = str.replace(re, ax);
			re = new RegExp('\\{y\\}','gm');
			str = str.replace(re, ay);
			re = new RegExp('\\{z\\}','gm');
			str = str.replace(re, az);
			return str;
		}
		
		function dToTS(d,ts,symb) { var res = d.toString(ts); while(res.length < symb) res = "0"+res; return res; }
		function TS2d(h,ts) {return parseInt(h,ts);} 
		function EncodeXYZ(lat,lon,zoom) { return dToTS(parseInt(zoom),36)+dToTS(parseInt(lat * 1000000),36,8)+dToTS(parseInt(lon * 1000000),36,8); }
		function DecodeXYZ(str) { return {lat:TS2d(str.substr(1,8),36)/1000000,lon:TS2d(str.substr(10,18),36)/1000000,zoom:TS2d(str.substr(0,1),36)}; }
		
		function IntToBase(d,base,digits) 
		{
			var base35 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXY';
			var d2 = d, res = '';
			while(d2 >= base)
			{
				res = base35.charAt(d2 % base) + res;
				d2  = parseInt(d2 / base);
			};
			if(d2 > 0) res = base35.charAt(d2)+res;
			if(res.length == 0) res = '0';
			if(digits) while (res.length < digits) res = '0'+res;
			return res;
		}
				
		function IntToHex(intval,digits) { return IntToBase(intval,16,digits); }
		function IntTo35(intval,digits) { return IntToBase(intval,35,digits); }
		function DegToRad (deg) { var pi = 3.14159265358979323; return (deg / 180.0 * pi); }
				
	function sleep(milliseconds)
	{    
		var now = new Date();    
		var exitTime = now.getTime() + milliseconds;     
		while(true)    
		{        
			now = new Date();        
			if(now.getTime() > exitTime) return;    
		};
	}	
	
	function Gnome(x,y,z)
	{
		var xm = -1*const_e_length; 
		var ym = 1*const_e_length; 
		var zm = z;  // if(zm<13) zm += 4; 
		var inc_c = Math.pow(2,16-zm + 2); 
		var inc_s = const_e_length / inc_c; 
		var xs = xm; 
		var ys = ym;
		//inc_c = Math.pow(2,16-zm); inc_s = const_e_length / inc_c; xs = xm; ys = ym;
		for (var i=0;i<inc_c*2;i++) { xs += inc_s; ys -= inc_s; if(xs <= x) xm = xs; if(ys >= y) ym = ys; };
		var inc_s = const_e_length / Math.pow(2,(16-z)+2);
		return {x:parseInt(xm/inc_s),y:-1*parseInt(ym/inc_s),z:z,l:xm,t:ym};
		//return {x:parseInt(x/inc_s),y:-1*parseInt((y+256*this.clmap.zoom)/inc_s),z:z};
	}
	
	//* END */