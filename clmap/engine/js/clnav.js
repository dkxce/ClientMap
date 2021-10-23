/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************		
******************************************/
// doc exists

/*
		public class ClientMapNavigator(variable_name,clmap,level_up)
		{
			// инициализация
			public void init(left,top,width,height)
			public void init(left,top,width,height,parent_div)
			//
			public void Move(left,top)
			//
			public void Resize(width,height)
			//
			public void ChangeLevelUp(new_level)
			//
			public void ReloadImages()
			//
			public object GetDiv()
			//
			public void SetVisible(isVisible)
		}
	*/
		try { if(!$) $ = false } catch(e) {$ = false;};
	
		// public
		function ClientMapNavigator(variable_name,clmap,level_up)
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			
			this.vname = variable_name;
			this.clmap = clmap;
			
			this.color_get = 'blue';
			this.border_get = 'solid 1px black';
			this.color_set = 'maroon';
			this.border_set = 'solid 1px navy';
			
			this.level_up = level_up ? level_up : 4;
			if(this.level_up < 3) this.level_up = 3;
			
			this.tmp_lock = false;
			this.sload = true;
		}
		
		
		ClientMapNavigator.prototype.Border = 'solid 1px #464646';
		
		// public
		ClientMapNavigator.prototype.initAttached = function(on_left,on_top,width,height,automode)
		{
			if(automode) this.sload = false;
			this.Attached = true;
			this.minimizeLeft = on_left;
			this.minimizeTop = on_top;
			var x = this.minimizeLeft ? this.clmap.map_left : this.clmap.map_left + this.clmap.map_width - width;
			var y = this.minimizeTop ? this.clmap.map_top : this.clmap.map_top + this.clmap.map_height - height;
			this.init(x,y,width,height,false);
			this.restatus();
			this.rezooms();	
			this.Minimize();	
			this.Minimize();
			if(this.clmap && this.clmap.XMLConfig && this.clmap.XMLConfig.Navigator) 
			{
				if(this.clmap.XMLConfig.Navigator['@minimized']) this.Minimize(true);
				if(this.clmap.XMLConfig.Navigator['@visible'] == false) this.SetVisible(false);
			};	
			if(automode) setTimeout(this.vname+'.sload=true;'+this.vname+'.ReloadImages();',4500);
		}
		
		// public
		ClientMapNavigator.prototype.init = function(left,top,width,height,parent_div)
		{
			this.clmap.clnav = this;
			//this.Border = this.clmap.border;
			
			this.left = left;
			this.top = top;
			this.width = width;
			this.height = height;
			if (this.width > 512) this.width = 512;
			if (this.height >512) this.height = 512;	
			
			// CLNAVDIV
			this.clnavdiv = document.createElement('div');
			this.clnavdiv.id = 'clnav_div_'+Math.round(Math.random()*1000);
			this.clnavdiv.style.position = 'absolute';
			this.clnavdiv.style.left = this.left + 'px';
			this.clnavdiv.style.top = this.top + 'px';
			this.clnavdiv.style.width = '10px';
			this.clnavdiv.style.height = '10px';
			this.clnavdiv.style.zIndex = this.clmap.GetNext_zIndex();
			if(parent_div)
				parent_div.appendChild(this.clnavdiv);
			else
				document.body.appendChild(this.clnavdiv);
			
			// main div
			var mdiv = document.createElement('div');
			mdiv.id = 'clnav_'+Math.round(Math.random()*1000);
			mdiv.style.position = 'absolute'
			mdiv.style.border = this.Border;
			mdiv.style.left = '0px'; // OK
			mdiv.style.top = '0px';
			mdiv.style.width = this.width + 'px';
			mdiv.style.height = this.height + 'px';
			mdiv.style.overflow = 'hidden';
			mdiv.style.backgroundColor = '#EEEEEE';		
			mdiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/cross_empty.cur'), pointer";
			mdiv.style.visibility = 'visible';
			//mdiv.style.opacity = this.idleOpacity / 100;
			//mdiv.style.filter = 'alpha(opacity='+this.idleOpacity+')';
			mdiv.cursor = 1;
			mdiv.onmouseover = new Function('',this.vname+'.MouseOver(true);');
			mdiv.onmouseout = new Function('',this.vname+'.MouseOver(false);');
			mdiv.onmousedown = new Function('',this.vname+'.MMoveD();');
			mdiv.onmouseup = new Function('',this.vname+'.MMoveUmdiv();');
			mdiv.onmousemove = new Function('',this.vname+'.onMmoveM();');
			this.mdiv = mdiv;		
			this.mdiv.SelfObject = this;
			this.clnavdiv.appendChild(this.mdiv);
			
			this.textdiv = document.createElement('div');
			this.textdiv.style.position = 'absolute';
			this.textdiv.style.left = '0px';
			this.textdiv.style.top = '42%';
			this.textdiv.innerHTML = '<center>...загрузка...</center>';
			this.textdiv.style.color = '#999999';
			this.textdiv.style.width = '100%';			
			this.mdiv.appendChild(this.textdiv);
			
			this.init_images();
			this.init_area_black();		
			this.init_final();
			
			this.ChangeLevelUp();
			this.ReloadImages();
		}
		
		// private
		ClientMapNavigator.prototype.init_final = function()
		{
			// defense div
			this.ddiv = document.createElement('div');
			this.ddiv.style.position = 'absolute';
			this.ddiv.style.left = '0px';
			this.ddiv.style.top = '0px';
			this.ddiv.style.width = this.width+'px';
			this.ddiv.style.height = this.height+'0px';
			this.ddiv.innerHTML = '<center>обзорная карта</center>';
			this.ddiv.style.color = 'white';
			this.ddiv.style.opacity = '0.2';
			this.ddiv.style.filter = 'alpha(opacity=20)';
			this.mdiv.appendChild(this.ddiv);
			
			this.closediv = document.createElement('div');
			this.closediv.style.position = 'absolute';
			this.closediv.style.left = this.minimizeLeft ? '0px' : (this.width - 10) + 'px';
			this.closediv.style.top = this.minimizeTop ? '0px' : (this.height - 10) + (this.clmap.ie ? -2 : 0) + 'px';
			this.closediv.style.width = 'auto';
			this.closediv.style.height = 'auto';
			this.closediv.style.fontSize = '12px';
			this.closediv.style.cursor = 'pointer';
			this.closediv.style.border = this.Border;
			this.closediv.style.background = 'gray';
			this.closediv.onclick = new Function('sender',this.vname+'.Minimize(true);');
			this.closediv.onmouseover = new Function('sender',this.vname+'.tmp_lock = true;');
			this.closediv.onmouseout = new Function('sender',this.vname+'.tmp_lock = false;');
			this.closediv.innerHTML = '<img src="'+global_vars_array[0]+'engine/gif/_clnav_'+(this.minimizeLeft ? 'l' : 'r')+(this.minimizeTop ? 'u' : 'd')+'.gif" title="Cвернуть панель обзорной карты"/>';
			this.closediv.style.visibility = this.minimizeVisible ? 'visible' : 'hidden';
			this.clnavdiv.appendChild(this.closediv);
			
			this.clmap.for_clnav_PreChangeZoom = new Function('sender',this.vname+'.ClearSrc();');
			this.clmap.for_clnav_MapMoved = new Function('sender,x,y',this.vname+'.ReloadImages(false);');
			this.clmap.for_clnav_MapMove = new Function('sender,x,y',this.vname+'.MoveRect(x,y);');
			this.clmap.for_clnav_ChangeZoom = new Function('sender,x,y',this.vname+'.ReloadImages(true);');
			this.clmap.for_clnav_setsize = new Function('',this.vname+'.ChangeLevelUp();');
		}
		
		//private
		ClientMapNavigator.prototype.Minimize = function(animated)
		{			
			this.premin = !this.Minimized;
			var txt = this.Minimized ? (this.minimizeLeft ? 'l' : 'r')+(this.minimizeTop ? 'u' : 'd') : (!this.minimizeLeft ? 'l' : 'r')+(!this.minimizeTop ? 'u' : 'd');
			this.closediv.innerHTML = '<img src="'+global_vars_array[0]+'engine/gif/_clnav_'+txt+'.gif" title="'+(this.Minimized ? 'Свернуть панель обзорной карты' : 'Развернуть панель обзорной карты')+'"/>';
			this.Minimized = !this.Minimized;
			
			this.closediv.style.border = this.Minimized ? this.clmap.border : this.Border;
			this.closediv.style.background = this.Minimized ? 'white' : 'gray';
			this.closediv.style.left = this.minimizeLeft ? '0px' : (this.width - 10) + 'px';			
			this.closediv.style.top = this.minimizeTop ? '0px' : (this.height - 10) + (this.clmap.ie ? -2 : 0) + 'px';

			this.rezooms();
			this.restatus();			
			if(animated && this.Attached)
			{
				if(this.Minimized) 
				{
					var params = {width:'0px',height:'0px'};
					if(!this.minimizeTop) params.top = this.height;
					if(!this.minimizeLeft) params.left = this.width;						
					if((navigator.userAgent.indexOf('Chrome') < 0) && (navigator.userAgent.indexOf('Safari') < 0) && ($))
						$(this.mdiv).animate(params,300 );
					else
						this.mdiv.style.display = 'none';
				}
				else
				{
					var params = {width:this.width,height:this.height};
					if(!this.minimizeTop) params.top = 0;
					if(!this.minimizeLeft) params.left = 0;
					if((navigator.userAgent.indexOf('Chrome') < 0) && (navigator.userAgent.indexOf('Safari') < 0) && ($))
						$(this.mdiv).animate(params,300 );
					else
						this.mdiv.style.display = 'block';
				};				
			}
			else 
			{
				this.mdiv.style.display = this.Minimized ? 'none' : 'block';				
				if(this.Minimized)
				{
					this.mdiv.style.width = '0px';
					this.mdiv.style.height = '0px';
					if(!this.minimizeTop) this.mdiv.style.top = this.height;
					if(!this.minimizeLeft) this.mdiv.style.left = this.width;
				}
				else
				{
					this.mdiv.style.width = this.width;
					this.mdiv.style.height = this.height;
					if(!this.minimizeTop) this.mdiv.style.top = 0;
					if(!this.minimizeLeft) this.mdiv.style.left = 0;					
				};
			};
			
			if(this.minimizeLeft && !this.minimizeTop && this.Attached) this.clmap.ssbTimeSC_setText();			
			return false;
		}
		ClientMapNavigator.prototype.Minimized = false;
		ClientMapNavigator.prototype.premin = false;
		
		//public
		// Отображать слева или справа
		ClientMapNavigator.prototype.minimizeLeft = true;
		
		// Отображать сверху или снизу
		ClientMapNavigator.prototype.minimizeTop = false;
		
		// Отображать кнопку сворачивания
		ClientMapNavigator.prototype.minimizeVisible = true;
		
		// Прицеплено к ClientMap'у
		ClientMapNavigator.prototype.Attached = false;
		
		// private
		ClientMapNavigator.prototype.init_images = function()
		{
			// images div
			this.idiv = document.createElement('div');
			this.idiv.style.position = 'absolute';
			this.idiv.style.left = '10px';
			this.idiv.style.top = '10px';
			this.idiv.style.width = '768px';
			this.idiv.style.height = '768px';
			this.idiv.style.backgroundColor = 'white';
			this.idiv.style.visibility = 'visible';
			this.mdiv.appendChild(this.idiv);			
			
			this.imgs = [];
			this.bdivs = [];
			for(var i=0;i<8;i++)
			{
				this.imgs[i] = document.createElement('img');
				this.imgs[i].style.position = 'absolute';
				this.imgs[i].id = 'clnav_'+this.clmap.vname+'_'+i;
				this.imgs[i].style.width = '256px';
				this.imgs[i].style.height = '256px';
				this.idiv.appendChild(this.imgs[i]);
			};
			this.imgs[0].style.left = 0;
			this.imgs[0].style.top = 0;
			this.imgs[1].style.left = 256;
			this.imgs[1].style.top = 0;
			this.imgs[2].style.left = 512;
			this.imgs[2].style.top = 0;
			
			this.imgs[3].style.left = 0;
			this.imgs[3].style.top = 256;
			this.imgs[4].style.left = 512;
			this.imgs[4].style.top = 256;
			
			this.imgs[5].style.left = 0;
			this.imgs[5].style.top = 512;
			this.imgs[6].style.left = 256;
			this.imgs[6].style.top = 512;
			this.imgs[7].style.left = 512;
			this.imgs[7].style.top = 512;
			
			// current center img
			this.img = document.createElement('img');
			this.img.style.position = 'absolute';
			this.img.style.left = 256;
			this.img.style.top = 256;
			this.idiv.appendChild(this.img);
		}
		
		// private
		ClientMapNavigator.prototype.init_area_black = function()
		{
			// current area div
			this.bdiv = document.createElement('div');
			this.bdiv.style.position = 'absolute';
			this.bdiv.style.left = '103px';
			this.bdiv.style.top = '103px';
			this.bdiv.style.width = '100px';
			this.bdiv.style.height = '100px';			
			this.bdiv.style.border = 'solid 1px #333333';
			this.bdiv.style.opacity = '0.6';
			this.bdiv.style.filter = 'alpha(opacity=60)';
			this.bdiv.style.cursor = "pointer";			
			this.mdiv.appendChild(this.bdiv);		
			
			// black source
			this.bsource = document.createElement('div');
			this.bsource.style.position = 'absolute';
			this.bsource.style.left = '0px';
			this.bsource.style.top = '0px';
			this.mdiv.appendChild(this.bsource);
			
			// black area div
			for(var i=0;i<4;i++)
			{
				this.bdivs[i] = document.createElement('div');
				this.bdivs[i].style.position = 'absolute';
				this.bdivs[i].style.backgroundColor = 'black';
				this.bdivs[i].style.opacity = '0.25';
				this.bdivs[i].style.filter = 'alpha(opacity=25)';
				this.bsource.appendChild(this.bdivs[i]);
			};	
		}
		
		// private
		ClientMapNavigator.prototype.onMmoveM = function()
		{
			document.body.focus();
			if(this.mmove_on) return;
			
			w = this.clmap.map_width / Math.pow(2,this.wi) - 1;
			l = this.width/2 - this.clmap.map_width / Math.pow(2,this.wi+1) + this.left;
			h = this.clmap.map_height / Math.pow(2,this.wi) - 1;
			t = this.height/2 - this.clmap.map_height / Math.pow(2,this.wi+1) + this.top;
			this.mouse_0 = this.clmap.global;
			var cur = (this.mouse_0.mouse_x < l || this.mouse_0.mouse_x > (l+w) || this.mouse_0.mouse_y < t || this.mouse_0.mouse_y > (t+h)) ? 1 : 0;
			if(cur == 0 && this.wi1 <= 0 && this.hi1 <= 0) cur = 1;
			if(cur == this.mdiv.cursor) return;
			this.mdiv.title = this.mdiv.cursor == 1 ? 'Видимая область карты' : '';
			this.mdiv.style.cursor = (cur == 1 ) ? "url('"+global_vars_array[0]+"engine/cursors/cross_empty.cur'), pointer" : 'pointer';
			this.mdiv.cursor = cur;
		}
		
		//private
		ClientMapNavigator.prototype.MMoveD = function()
		{			
			if (this.mdiv.cursor == 1) return false;
			if(this.wi1 <= 0 && this.hi1 <= 0) return;
			if(parseInt(this.bdiv.style.width) >= this.width && parseInt(this.bdiv.style.height) >= this.height) return;
			
			this.bdiv.cursor = "url('"+global_vars_array[0]+"engine/cursors/hand_move.cur'), pointer";
			this.bdiv.style.backgroundColor = this.color_set;
			this.bdiv.style.border = this.border_set;
			this.mouse_00 = {mouse_x:parseInt(this.bdiv.style.left),mouse_y:parseInt(this.bdiv.style.top)};
			this.mmove_on = true;

			this.tmpd = document.createElement('div');
			this.tmpd.id = 'move_clnav';
			this.tmpd.style.position = 'absolute';
			this.tmpd.style.left = '0px';
			this.tmpd.style.top = '0px';
			this.tmpd.style.backgroundColor = 'white';
			this.tmpd.style.opacity = '0.01';
			this.tmpd.style.filter = 'alpha(opacity=1)';
			this.tmpd.style.width = this.width;
			this.tmpd.style.height = this.height;
			this.tmpd.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/hand_move.cur'), pointer";
			this.mdiv.appendChild(this.tmpd);
			
			this.clmap.remove = new Function('',this.vname+'.MMove();');
			this.clmap.reup = new Function('',this.vname+'.MMoveU();');
			
			return false;
		}
		
		//private
		ClientMapNavigator.prototype.MMoveU = function()
		{		
			this.clmap.remove = function() {};
			this.clmap.reup = function() {};
			this.mdiv.removeChild(this.tmpd);
			document.body.focus();
			
			this.bdiv.style.cursor = "pointer";
			this.bdiv.style.background = 'none';
			this.bdiv.style.border = 'solid 1px #333333';
			this.mmove_on = false;

			if(!this.mouse_0) this.mouse_0 = this.clmap.global;
			dx = this.clmap.global.mouse_x - this.mouse_0.mouse_x;
			dy = this.clmap.global.mouse_y - this.mouse_0.mouse_y;						
			
			this.ChangeLevelUp();
			var mc = this.clmap.GetMapCenterInMeters();
			this.clmap.SetMapCenterInMeters(mc.x+dx*this.clmap.zoom_levels[this.current_no],mc.y-dy*this.clmap.zoom_levels[this.current_no]);
			this.clmap.UrlUpdate(true);
			this.ReloadImages();
			
			// this.mdiv.style.cursor = "url('"+global_vars_array[0]+"engine/cursors/cross_empty.cur'), pointer";			
			
			return false;
		}
		
		//private
		ClientMapNavigator.prototype.MMoveUmdiv = function()
		{		
			if(!this.mmove_on && !this.tmp_lock)
			{
				var mc = this.clmap.GetMapCenterInMeters();
				dx = this.clmap.global.mouse_x - this.left - this.width/2;
				dy = this.clmap.global.mouse_y - this.top - this.height/2;
				this.clmap.SetMapCenterInMeters(mc.x+dx*this.clmap.zoom_levels[this.current_no],mc.y-dy*this.clmap.zoom_levels[this.current_no]);
				this.ReloadImages();
			};
			return false;
		}
		
		//private
		ClientMapNavigator.prototype.MMove = function()
		{
			if(!this.mmove_on) return false;
			this.bdiv.style.left = this.mouse_00.mouse_x - this.mouse_0.mouse_x + this.clmap.global.mouse_x;
			this.bdiv.style.top = this.mouse_00.mouse_y - this.mouse_0.mouse_y + this.clmap.global.mouse_y;
			return false;
		}
		
		// public 0..100
		ClientMapNavigator.prototype.idleOpacity = 100;
		
		//private
		ClientMapNavigator.prototype.MouseOver = function(isOver)
		{
			// this.mdiv.style.opacity = isOver ? 1 : this.idleOpacity / 100;
			// this.mdiv.style.filter = 'alpha(opacity='+(isOver ? 100 : this.idleOpacity)+')';
			
			/*
			for(var i=0;i<4;i++)
				this.bdivs[i].style.visibility = isOver ? 'hidden' : 'visible';			
			this.bdiv.style.opacity = isOver ? '0.3' : '0.6';
			this.bdiv.style.filter = isOver ? 'alpha(opacity=30)' : 'alpha(opacity=60)';
			this.bdiv.style.background = isOver ? 'blue' : 'none';			
			*/
		}
		
		// public
		ClientMapNavigator.prototype.Move = function(left,top)
		{
			this.left = left;
			this.top = top;
			this.clnavdiv.style.left = this.left + 'px';
			this.clnavdiv.style.top = this.top + 'px';
		}
		
		//private
		ClientMapNavigator.prototype.MoveAttached = function()
		{
			this.left = this.minimizeLeft ? this.clmap.map_left : this.clmap.map_left + this.clmap.map_width - this.width;
			this.top = this.minimizeTop ? this.clmap.map_top : this.clmap.map_top + this.clmap.map_height - this.height;
			this.clnavdiv.style.left = this.left + 'px';
			this.clnavdiv.style.top = this.top + 'px';
			this.rezooms();
		}
		
		
		// public
		ClientMapNavigator.prototype.Resize = function(width,height)
		{
			this.width = width;
			this.height = height;
			if (this.width > 512) this.width = 512;
			if (this.height >512) this.height = 512;
			this.mdiv.style.width = width + 'px';
			this.mdiv.style.height = height + 'px';
			this.ddiv.style.width = width + 'px';
			this.ddiv.style.height = height + 'px';
			
			this.closediv.style.left = this.minimizeLeft ? '0px' : (this.width - 10) + 'px';
			this.closediv.style.top = this.minimizeTop ? '0px' : (this.height - 10) + (this.clmap.ie ? -2 : 0) + 'px';
			
			this.ReloadImages();
		}
		
		// private
		ClientMapNavigator.prototype.ClearSrc = function()
		{
			this.wait = true;
			this.idiv.style.display = 'none';
			// for(var i=0;i<4;i++) this.imgs[i].src = ''; // FF error fixed 14.11.2008 // why???
			setTimeout(this.vname+'.wait = false;'+this.vname+'.ReloadImages(true)',1500);
		}
		
		// public
		ClientMapNavigator.prototype.ChangeLevelUp = function(new_level)
		{
			if(new_level) this.level_up = new_level;
			if(this.level_up < 3) this.level_up = 3;
			
			var no = this.clmap.zoom_start_from;
			for(var i=this.clmap.zoom_start_from;i<this.clmap.zoom_levels.length; i++) if(this.clmap.zoom_levels[i] == this.clmap.zoom) no = i;
			this.map_zoomid = no;
			var no2 = no; 
			if(no2 <= (16 - this.level_up)) no2 += this.level_up; else no2 = 16; 
			var wi = no2 - no; this.wi = wi;
			
			var wi1 = this.width/2 - this.clmap.map_width / Math.pow(2,wi+1);
			var hi1 = this.height/2 - this.clmap.map_height / Math.pow(2,wi+1);
			this.wi1 = wi1; this.hi1 = hi1;
			
			this.bdiv.style.width = this.clmap.map_width / Math.pow(2,wi) - 1 + (this.clmap.ie ? 1 : 0);			
			this.bdiv.style.left = wi1;
			this.bdiv.style.height = this.clmap.map_height / Math.pow(2,wi) - 1;
			this.bdiv.style.top = hi1;
			
			this.bdiv.style.visibility = (wi1 > 0 || hi1 > 0) ? 'visible' : 'hidden';
			
			this.bdivs[0].style.left = '0px';
			this.bdivs[0].style.top = '0px';
			this.bdivs[0].style.width = hi1 > 0 ? this.width : 0;
			this.bdivs[0].style.height = hi1 < 0 /* || wi1 < 0 */ ? 0 : hi1;
			
			var opp = (this.clmap.op ? 1 : 0);
			
			this.bdivs[1].style.left = '0px';
			this.bdivs[1].style.top = hi1;				
			this.bdivs[1].style.width = wi1 < 0 /* || hi1 < 0 */ ? 0 : wi1;
			this.bdivs[1].style.height = this.clmap.map_height / Math.pow(2,wi) + opp;
			this.bdivs[2].style.left = this.width/2 + this.clmap.map_width / Math.pow(2,wi+1) + opp + ((navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0) ? 1 : 0);
			this.bdivs[2].style.top = hi1;
			this.bdivs[2].style.width = wi1 < 0 /* || hi1 < 0 */ ? 0 : wi1;
			this.bdivs[2].style.height = this.clmap.map_height / Math.pow(2,wi) + opp;
			
			this.bdivs[3].style.left = '0px';
			this.bdivs[3].style.top = this.height/2 + this.clmap.map_height / Math.pow(2,wi+1) - (this.clmap.ie ? 1 : 0) - ((navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0) ? 1 : 0);
			this.bdivs[3].style.width = this.width;
			this.bdivs[3].style.height = (hi1 < 0 /* || wi1 < 0 */ ? 0 : hi1) + (this.clmap.op ? 1 : 0) + ((navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0) ? 2 : 0);
		}	

		// private
		ClientMapNavigator.prototype.MoveRect = function(x,y)
		{
			var no = this.map_zoomid;			
			
			this.bdiv.style.left = this.width/2 - this.clmap.map_width / Math.pow(2,this.wi+1) - (x * this.clmap.zoom_levels[no])/this.clmap.zoom_levels[this.current_no];
			this.bdiv.style.top = this.height/2 - this.clmap.map_height / Math.pow(2,this.wi+1) - (y * this.clmap.zoom_levels[no])/this.clmap.zoom_levels[this.current_no];
			
			this.bdiv.style.backgroundColor = this.color_get;
			this.bdiv.style.border = this.border_get;
		}
		
		// public
		ClientMapNavigator.prototype.ReloadImages = function(changezoom)
		{
			if(this.wait) return;
			
			this.idiv.style.display = 'block';
			
			this.bdiv.style.left = this.width/2 - this.clmap.map_width / Math.pow(2,this.wi+1);
			this.bdiv.style.top = this.height/2 - this.clmap.map_height / Math.pow(2,this.wi+1);
			this.bdiv.style.background = 'none';
			this.bdiv.style.border = 'solid 1px #333333';
			
			if(changezoom) this.ChangeLevelUp();
		
			// no = this.clmap.zoom_start_from;
			// for(var i=this.clmap.zoom_start_from;i<this.clmap.zoom_levels.length; i++) if(this.clmap.zoom_levels[i] == this.clmap.zoom) no = i;
			no = this.map_zoomid;
			if(no <= (16 - this.level_up))  no += this.level_up; else no = 16;
			this.current_no = no;
			
			//for(var i=0;i<4;i++) this.bdivs[i].style.visibility = 'visible';
			
			var mc = this.clmap.GetMapCenterInMeters();
			var nn = Gnome(mc.x,mc.y,no);
			
			// SLOAD //
			if(!this.sload) return;
			
			this.img.src= this.clmap.PathImage(nn.x,nn.y,no);
			
			this.idiv.style.left = (nn.l - mc.x)/this.clmap.zoom_levels[no] - 256 + this.width/2;
			this.idiv.style.top = (mc.y - nn.t)/this.clmap.zoom_levels[no] - 256 + this.height/2;
			
			this.imgs[0].src= this.clmap.PathImage(nn.x-1,nn.y-1,no);
			this.imgs[1].src= this.clmap.PathImage(nn.x,nn.y-1,no);
			this.imgs[2].src= this.clmap.PathImage(nn.x+1,nn.y-1,no);
			
			this.imgs[3].src= this.clmap.PathImage(nn.x-1,nn.y,no);
			this.imgs[4].src= this.clmap.PathImage(nn.x+1,nn.y,no);
			
			this.imgs[5].src= this.clmap.PathImage(nn.x-1,nn.y+1,no);
			this.imgs[6].src= this.clmap.PathImage(nn.x,nn.y+1,no);
			this.imgs[7].src= this.clmap.PathImage(nn.x+1,nn.y+1,no);
		}
		
		//public
		ClientMapNavigator.prototype.GetDiv = function()
		{
			return this.mdiv;
		}
		
		//private
		ClientMapNavigator.prototype.restatus = function()
		{
			if(!this.minimizeLeft && !this.minimizeTop && this.Attached && this.clmap.zoomScaleRight)
			{
				var max = 2;
				if(this.realVisible) max = (!this.Minimized) ? this.width + 7 : 16;
				this.clmap.statusDiv.innerHTML = this.clmap.FormatWatermark()+'<img src="'+global_vars_array[0]+'engine/gif/_s1.gif" height="1" width="'+max+'"/>';
				this.clmap.clnav_offset = (!this.Minimized) && this.realVisible ? this.width + 5 : 0;				
				this.clmap.UrlUpdate(true);
			};
			if(this.minimizeLeft && !this.minimizeTop && this.Attached && !this.clmap.zoomScaleRight)
			{				
				this.clmap.clnav_offset = (!this.Minimized) ? (this.realVisible ? this.width : 1) : (this.realVisible ? 10 : 1);
				this.clmap.UrlUpdate(true);
			};
		}
		
		//private
		ClientMapNavigator.prototype.rezooms = function()
		{
			if(!this.minimizeLeft && this.minimizeTop && this.Attached) 
				this.clmap.rightStatusDiv.style.top = !this.Minimized ? (this.realVisible ? this.height : 2) : (this.realVisible ? 10 : 2);
			if(!this.minimizeLeft && !this.minimizeTop && this.Attached) 
			{				
				this.clmap.hintCloseDiv.style.left = (this.clmap.map_left+this.clmap.map_width-15-(this.clmap.ie ? 1 : 0))-(!this.Minimized ? (this.realVisible ? this.width+1 : 0) : (this.realVisible ? 11 : 0))+'px';
			};
		}
		
		// public
		ClientMapNavigator.prototype.SetVisible = function(isVisible)
		{			
			this.realVisible = isVisible;
			this.clnavdiv.style.display = this.realVisible ? 'block' : 'none';
			this.closediv.style.display = this.realVisible ? 'block' : 'none';
			if((navigator.userAgent.indexOf('Chrome') > 0) || (navigator.userAgent.indexOf('Safari') > 0))
			{
				// this.idiv.style.visibility = this.realVisible ? 'hidden' : 'visible';
				//this.clnavdiv.style.visibility = this.realVisible ? 'hidden' : 'visible';
				//this.closediv.style.visibility = this.realVisible ? 'hidden' : 'visible';
			};
			
			if(this.minimizeLeft && !this.minimizeTop && this.Attached) this.clmap.ssbTimeSC_setText();
			
			this.restatus();
			this.rezooms();
			return this.realVisible;
		}
		ClientMapNavigator.prototype.realVisible = true;
		