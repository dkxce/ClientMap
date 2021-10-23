/******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// doc exists

		/*
			class TPopupMenu
			{
					// установка дива .. 
				public void setDiv(object div)
					// назначение zIndex'a
				public void Set_zIndex
					// добавление пункта меню
				public int AddItem(string caption, Function onclick, bool disabled);
					// disable/enable пункта меню
				public int EnableItem(intindex, bool enabled);
					// удаление пункта меню
				public void RemoveItem(int index);
					// Число пунктов
				public int GetItemsCount()
					// получение номера пункта меню по заголовку
				public int GetItemIndex(string caption)
					// открытие меню
				public void Popup(int x, int y);
					// скрытие меню
				public void Hide()
					// удалить все пункты
				public void ClearItems()
					//
				public bool IsVisible()
					// убиваем меню
				public void Kill();
					// Передаем событие нажатия мышки
				public void ForwardMouseDown(event)
			}
		*/
		
		try { if(!$) $ = false } catch(e) {$ = false;};
		
		function TPopupMenu(width)
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.iface = 'TPopupMenu'; 
			this.type = 'TPopupMenu'; 
			this.zIndex = 99;
			this.width = width ? width : 220;
			this.height = 20;
			this.id = 'popup_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.parent = null;
			this.elements = [];
			this.mouseover = false;
			
			this.ua = navigator.userAgent;
			this.ns = ((this.ua.indexOf("etscape") > 0) || (this.ua.indexOf("irefox") > 0));
			this.ie = (this.ua.indexOf("MSIE") > 0);
		}
		
		if(((navigator.userAgent.indexOf("etscape") > 0) || (navigator.userAgent.indexOf("irefox") > 0))) document.captureEvents(Event.MOUSEDOWN);
		
		// установка zIndex'a
		TPopupMenu.prototype.Set_zIndex = function(new_index)
		{
			this.zIndex = new_index;
			if(this.framediv) this.framediv.style.zIndex = this.zIndex;
		}
		
		// ицициализация дива
		TPopupMenu.prototype.setDiv = function(div)
		{
			this.parent = div;
			
			this.framediv = document.createElement('div');
			this.framediv.id = this.id+'_frame';
			this.framediv.style.position = 'absolute';
			this.framediv.style.width = this.width+4+'px';
			this.framediv.style.height = 'auto';
			// this.framediv.style.backgroundColor = 'white';
			//this.framediv.style.visibility = 'hidden';
			this.framediv.style.display = 'none';
			this.framediv.style.border = 'solid 0px #666666';
			this.framediv.style.padding = '1px';
			this.framediv.style.zIndex = this.zIndex;
			this.parent.appendChild(this.framediv);
			this.framediv.popupmenu = this;
			
			this.bdiv = document.createElement('div');
			this.bdiv.style.backgroundColor = 'black';
			this.bdiv.style.width = '100%';
			this.bdiv.style.height = '100%';
			this.bdiv.style.opacity = '0.25';
			this.bdiv.style.filter = 'alpha(opacity=25)';
			this.framediv.appendChild(this.bdiv);
			
			this.div = document.createElement('div');
			this.div.id = this.id;
			this.div.style.position = 'absolute';
			this.div.style.left = '-4px';
			this.div.style.top = '-2px';
			this.div.style.width = this.width+'px';
			this.div.style.height = 'auto';
			this.div.style.backgroundColor = '#FCFCFC';
			this.div.style.border = 'solid 1px #666666';
			this.div.style.padding = '2px';
			this.framediv.appendChild(this.div);
			this.div.popupmenu = this;
			
			//SET OWNER FOR CANVAS
			this.div.owner = this;
		}
		
		// перенаправление события
		TPopupMenu.prototype.ForwardMouseDown = function(event)
		{
		}		
		
		// добавление пункта меню
		TPopupMenu.prototype.AddItem = function(caption,onclick,disabled,_sender)
		{
			var tmp_new_item = {cap:caption,todo:function(sender){this.owner_menu.Hide();onclick(sender);},id:'popupitem_'+Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100),div:document.createElement('div'),top:0,height:this.height,visible:true};
			
			var top = this.ie ? 2 : 1;
			for(var i=0;i<this.elements.length;i++) if(this.elements[i].visible) top += this.elements[i].height;
			
			this.elements[this.elements.length] = tmp_new_item;
			this.div.appendChild(tmp_new_item.div);
			
			//SET  FOR CANVAS
			tmp_new_item.div.owner = this;
			
			tmp_new_item.div.style.position = 'absolute';
			tmp_new_item.div.style.left = 2 +'px';
			
			tmp_new_item.div.style.top = top +'px';
			
			tmp_new_item.div.style.width = this.width - (this.ie ? 6 : 23) +'px';
			tmp_new_item.div.style.fontSize = '12px';
			tmp_new_item.div.style.fontFamily = 'Tahoma, MS Sans Serif, Verdana';
			tmp_new_item.div.style.height = this.height +'px';
			tmp_new_item.div.style.padding = '2px 3px 0px 20px';
			tmp_new_item.div.style.backgroundColor = '#FCFCFC';
			tmp_new_item.div.style.overflow = 'hidden';
			tmp_new_item.div.style.cursor = 'default';
			tmp_new_item.div.innerHTML = '&nbsp;';
			tmp_new_item.div.sender = false;
			if(_sender) tmp_new_item.div.sender = _sender;
			
			if(tmp_new_item.cap) 
			{	
				if(disabled)
				{
					tmp_new_item.div.style.color = '#666666';
					tmp_new_item.div.onmouseover = null;
					tmp_new_item.div.onmouseout = null;
					tmp_new_item.div.onclick = null;
				}
				else
				{
					tmp_new_item.div.owner_menu = this;
					tmp_new_item.div.onmouseover = function(){ this.style.backgroundColor = 'navy'; this.style.color = 'white'; this.owner_menu.mouseover = true; };
					tmp_new_item.div.onmouseout = function(){ this.style.backgroundColor = '#FCFCFC'; this.style.color = 'black'; this.owner_menu.mouseover = false; };
					tmp_new_item.div.onclick = new Function('event','this.todo(this.sender ? this.sender : event);');
				};
				tmp_new_item.div.innerHTML = '&nbsp;'+tmp_new_item.cap;
				tmp_new_item.div.todo = tmp_new_item.todo;
			} 
			else 
			{
				tmp_new_item.div.style.width = this.width-5 +'px';
				tmp_new_item.div.innerHTML = '<div style="height:1px;width:'+this.width+'px;background:#666666;font-size:0px;position:absolute;left:0px;top:2px;"></div>';
				tmp_new_item.height = 5;
				tmp_new_item.div.style.height = tmp_new_item.height + 'px';
				tmp_new_item.div.style.padding = '0px';
			};
			tmp_new_item.div.id = tmp_new_item.id;
			
			
			var ttlh = this.ie ? 2 : 1;
			for(var i=0;i<this.elements.length;i++) if(this.elements[i].visible) ttlh += this.elements[i].height;
			this.div.style.height = ttlh+(this.ie ? 4 : 0)+'px';
			this.framediv.style.height = 6+ttlh+(this.ie ? 4 : 0)+'px';
			
			return this.elements.length-1;
		}
		
		//public checked
		TPopupMenu.prototype.CheckItem = function(index)
		{
			if(!this.elements[index]) return;
			
			this.elements[index].div.checked = true;
			this.elements[index].div.style.background = "url('"+global_vars_array[0]+"engine/png/checked.png') 10px 6px no-repeat"
		}
		
		//public unchecked
		TPopupMenu.prototype.UnCheckItem = function(index)
		{
			if(!this.elements[index]) return;
			
			this.elements[index].div.checked = false;
			this.elements[index].div.style.background = this.div.style.backgroundColor;
		}
		
		// public
		TPopupMenu.prototype.GetItemCheckState = function(index)
		{
			return this.elements[index].div.checked == true;
		}
		
		// засеривание пункта
		TPopupMenu.prototype.EnableItem = function(index,enabled)
		{
			if(!this.elements[index]) return -1;
			if(enabled)
			{
				this.elements[index].div.style.color = 'black';
				tmp_new_item.div.owner_menu = this;
				this.elements[index].div.onmouseover = function(){ this.style.backgroundColor = 'navy'; this.style.color = 'white'; this.owner_menu.mouseover = true; };
				this.elements[index].div.onmouseout = function(){ this.style.backgroundColor = '#FCFCFC'; this.style.color = 'black'; this.owner_menu.mouseover = false; };
				this.elements[index].div.onclick = new Function('event','this.todo(event);');
			}
			else
			{
				this.elements[index].div.style.color = '#666666';
				this.elements[index].div.onmouseover = null;
				this.elements[index].div.onmouseout = null;
				this.elements[index].div.onclick = null;
			};
			return enabled ? 1 : 0;
		}
		
		// public
		TPopupMenu.prototype.GetItemsCount = function()
		{
			return this.elements.length;
		}
		
		// public
		TPopupMenu.prototype.ClearItems = function ()
		{
			for(var i=this.elements.length-1;i>=0;i--) this.RemoveItem(i);
		}
		
		// удаление пункта
		TPopupMenu.prototype.RemoveItem = function(index)
		{
			var tmp_elements = []; 
			var ind = 0;
			for(var i=0;i<this.elements.length;i++) 
			if(i == index) {
				this.div.removeChild(this.elements[i].div);
			} else tmp_elements[ind++] = this.elements[i];
			this.elements = tmp_elements;
			
			var ttlh = this.ie ? 2 : 1;
			for(var i=0;i<this.elements.length;i++) if(this.elements[i].visible) ttlh += this.elements[i].height;
			this.div.style.height = ttlh+(this.ie ? 4 : 0)+'px';
			this.framediv.style.height = 6+ttlh+(this.ie ? 4 : 0)+'px';
		}
		
		// установка видимости пункта
		TPopupMenu.prototype.SetItemVisibility = function(index,visible)
		{
			var ttlh = this.ie ? 2 : 1;
			for(var i=0;i<this.elements.length;i++) 
			{
				if(i == index) 
				{
					this.elements[i].visible = visible ? visible : false;
					this.elements[i].div.style.visibility = visible ? '' : 'hidden';
					this.elements[i].div.style.display = visible ? 'block' : 'none';
				};
				this.elements[i].div.style.top = ttlh + 'px';
				if(this.elements[i].visible) ttlh += this.elements[i].height;
			};
			this.div.style.height = ttlh+(this.ie ? 4 : 0)+'px';
			this.framediv.style.height = 6+ttlh+(this.ie ? 4 : 0)+'px';
		}
		
		// получение индекса пункта
		TPopupMenu.prototype.GetItemIndex = function(caption)
		{
			var ind = -1;
			for(var i=0;i<this.elements.length;i++) if(this.elements[i].cap == caption) return i;
			return ind;
		}
		
		// закрытие
		TPopupMenu.prototype.Hide = function()
		{
			//this.framediv.style.visibility = 'hidden';
			this.framediv.style.display = 'none';
			document.onmousedown = this.tmp_onmousedown;
		}
		
		// проверка  видимости
		TPopupMenu.prototype.IsVisible = function()
		{
			//return (this.framediv.style.visibility == 'visible');
			return (this.framediv.style.display == 'block');
		}
		
		// открытие меню
		TPopupMenu.prototype.Popup = function(x,y)
		{
			this.framediv.style.left = x + 'px';
			this.framediv.style.top = y + 'px';
			//this.framediv.style.visibility = 'visible';
			this.tmp_onmousedown = document.onmousedown;
			document.onmousedown = new Function ('','var popupmnu = document.getElementById("'+this.id+'").popupmenu; if(!popupmnu.mouseover) popupmnu.Hide();');
			if($) $(this.framediv).slideDown(200); else this.framediv.style.display = 'block';
		}
		
		// убить
		TPopupMenu.prototype.Kill = function()
		{
			this.elements = [];
			document.getElementById(this.parent.id).removeChild(document.getElementById(this.framediv.id));
		}