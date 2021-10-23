/*******************************************
********************************************
	 ClientMap Panel Tools Web Client Module
	      milokz [doggy] gmail.com
********************************************
*******************************************/
// JScript source code
//
//Панель инструментов
//
//types:1-img;2-radiobutton;3-chekbox;
//aligned:1-line;2-collm;
function PanelTools(name,clmap)
{
	this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
	
	this.Assembly = {Title:'PanelTools',Description:'PanelTools ClientMap Plugin',Company:'milokz@gmail.com',Product:'ClientMap PanelTools',Copyright:'milokz@gmail.com',Trademark:'milokz@gmail.com',Author:'Milok Zbrozek',Version:'1.3 Beta',VersionDate:'16.02.2009'};
	
	this.demo = true;
	this.enable_captions = true;
	this.allow_all_window = false; // allow select node window
	this.fucking_tip = true; // only close tip
	this.fucking_hide = true; // now onclick functions
	
    this.id = name;
    this.type="";
    this.status = 1;
    this.clmap = clmap;
    this.html_workCount;
    this.custom_tool = "";
    this.CS = [{id:1,title:'Инструмент сдвига карты',lock:false,visibility:true},{id:2,title:'Инструмент увеличения карты',lock:false,visibility:true},{id:3,title:'Инструмент уменьшения карты',lock:false,visibility:true},{id:4,title:'Инструмент линейка',lock:true,visibility:false},{id:5,title:'Инструмент справка',lock:true,visibility:false},{id:6,title:'Печать',lock:false,visibility:true}];
    this.arr_status = ["","1","2","3","5","6"];
    this.shear = 0;
    //this.aligned;
    //this.CSWork = '';
    this.track_point = Array();
    this.TrackLineNum=0;
	this.TrackLineArr = [];
    this.Track_length = null;
    this.l = 0;
    this.track_pt = null;
    this.fNoClick = false;
	this.move = false;
	this.UseHint = this.clmap.UseHint;	
	this.left = '';
	this.top = '';
	this.attached = false;
	this.HTA = [];
	this.mClose = function(){};
    return this;//
}	
	//private
	PanelTools.prototype.AddToHTA = function(obj)
	{
		var id_ICT; 
		if((id_ICT = this.clmap.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = this.clmap.MapLayers.Add("Track_ICT");
		for(var i=0;i<this.HTA.length;i++) this.HTA[i].Kill();
		this.HTA = [obj];
	}
    
    PanelTools.prototype.Create = function(attach)
    {
		this.clmap.paneltools = this;
        var parentElement = null;
        if (attach != null)
            attach.appendChild(this.HTMLElement());
        else
            document.body.appendChild(this.HTMLElement());
        if (this.clmap) this.clmap.NavigateMode(this.status);
        this.initCLMAP();
    }
    
    PanelTools.prototype.LT = function(_l,_t)
    {
        if (_l != null && _l != ''){this.left = _l;};
        if (_t != null && _t != ''){this.top = _t;};
    }
    
    PanelTools.prototype.HTMLElement = function()
    {
        var div = document.createElement('div');
		this.div = div;
        div.id = this.id;
        div.className = 'PT';
        div.style.left = this.left;
        div.style.top = this.top;
		
        for (i in this.CS)
        {
            var img1 = document.createElement('img');
            img1.id = 'tool'+this.CS[i].id;
            img1.src = global_vars_array[0]+'engine/img/tool'+(this.CS[i].id == this.status ? this.CS[i].id+'_s' : this.CS[i].id)+'.gif';
            img1.title = this.CS[i].title;
            img1.style.width = 27+'px';
            img1.style.height = 23+'px';
            if (this.CS[i].visibility)
                img1.style.visibility = 'visible';
            else
            {
                img1.style.display = 'none';
                img1.style.visibility = 'hidden';
            };
            var ff = new Function('',this.id+'.SetTool(\''+this.CS[i].id+'\');');
            img1.onclick = ff;
            if (this.CS[i].id == 6)
            {
				var print_tool_6 = this.CS[i];
                ff = new Function('',this.clmap.vname+'.ShowPrintableArea(true);');
                img1.onmouseover = function() { if(!print_tool_6.locked) ff(); };
                ff = new Function('',this.clmap.vname+'.ShowPrintableArea(false);')
                img1.onmouseout = function() { if(!print_tool_6.locked) ff(); };
            };
            if (this.CS[i].lock)
            {
                img1.style.opacity = 0.4;
                img1.style.filter = 'alpha(opacity='+40+');';
            };
            div.appendChild(img1);
        };
        return div;
    }
    
    PanelTools.prototype.initCLMAP = function()
	{
		this.clmap.for_paneltools_MouseClick = new Function('sender,x,y',this.id+'.onClick(sender,x,y);');
		this.clmap.for_paneltools_MouseMove = new Function('sender,x,y',this.id+'.onMove(sender,x,y);');
		this.clmap.for_paneltools_onNavigationModeChanged = new Function('sender,new_tool',this.id+'.onChangeTool(sender,new_tool);');
	}
	
    PanelTools.prototype.SetVisTool = function (tools,vis)
    {
        if (this.id == "") return false;
        if (tools == "" && tools == null)return false;
        if (!document.getElementById('tool'+tools)) return false;
        if (this.status == tools) return false;
        var div = document.getElementById('tool'+tools);
        var e = this.GetElement(tools);
        if (vis)
        {
            div.style.display = '';
            div.style.visibility = 'visible';
        }
        else
        {
            div.style.display = 'none';
            div.style.visibility = 'hidden';
        };
        e.lock = !vis;
        e.visibility = vis;
        this.SetLock(tools,e.lock);
        return true;
    }
    PanelTools.prototype.Style = function(_w,_h,_pos,_left,_top,_overflow,_display,_visibility,_index)
    {
        if (this.id != "")
        {
            if (document.getElementById(this.id))
            {
                var elemS = document.getElementById(this.id).style;
                if (_w != "" && _w != null && _w != 0) elemS.width = _w;
                if (_h != "" && _h != null && _h != 0) elemS.height = _h;
                if (_pos != "" && _pos != null) elemS.position = _pos;
                if (_left != "" && _left != null && _left != 0) elemS.left = _left;
                if (_top != "" && _top != null && _top != 0) elemS.top = _top;
                if (_overflow != "" && _overflow != null) elemS.overflow = _overflow;
                if (_display != "" && _display != null) elemS.display = _display;
                if (_visibility != "" && _visibility != null) elemS.visibility = _visibility;
                if (_index != "" && _index != null && _index != 0) elemS.zIndex = _index;
            };
        };
    }
    PanelTools.prototype.HTMLVisibility = function(_visibility,_display)
    {
        if (this.id != "")
        {
            if (document.getElementById(this.id))
            {
                var elemS = document.getElementById(this.id).style;
                if (_visibility != "" && _visibility != null) elemS.visibility = _visibility;
                if (_display != "" && _display != null) elemS.display = _display;
            };
        };
    }
	
	PanelTools.prototype.onChangeTool = function(sender,new_tool)
	{
	    if (new_tool == 6){return false;};
		if(this.status != new_tool) this.SetTool(new_tool);
	}
	
	PanelTools.prototype.GetElement = function(num)
	{
	    var el = null;
	    for (i in this.CS)
	        if (this.CS[i].id == num)
	        {
	            el = this.CS[i];
	            break;
	        };
	    return el;
	}
	
    PanelTools.prototype.SetTool = function(num)
    {
        var element = this.GetElement(num);
        if (element == null){return false;};
        if (element.lock) return false;
        if (!element.visibility) return false;
		
		if (num == 6)
        {
            var ShortURL = this.clmap.Configuration.GetShortURL();
            this.clmap.ShowPrintableArea(false);
            window.open('print.html'+ShortURL);
            return;
        };

        for (i in this.CS)
            if (document.getElementById("tool"+this.CS[i].id)) document.getElementById("tool"+this.CS[i].id).src = global_vars_array[0]+"engine/img/tool"+this.CS[i].id+".gif";
        if (document.getElementById("tool"+element.id))
        {
            document.getElementById("tool"+element.id).src = global_vars_array[0]+"engine/img/tool"+element.id+"_s.gif"
            this.status = this.arr_status[element.id];
        };
        if (this.clmap && (this.clmap.nav_mode != this.status)) this.clmap.NavigateMode(this.status);
    }
    
    PanelTools.prototype.SetLock = function(tools,state)
    {
        var f1 = 0.99;
        var f2 = 99;
        if (this.id == "") return false;
        if (!document.getElementById('tool'+tools)) return false;
        var elem = document.getElementById('tool'+tools);
        if (this.status == tools) 
		{
			var el = this.GetElement(tools);
			if (el == null) return false;
			elem.onmouseover = function() { this.style.background = state ? '' : 'white'; };
			elem.onmouseout = function() { this.style.background = '' };
			return false;
		};
        if (tools != "" && tools != null && (state || !state))
        {
            var el = this.GetElement(tools);
            el.lock = state;			
            if (el == null) return false;
            if (state)
            {
                f1 = 0.4;
                f2 = 40;
            };
			
            elem.style.opacity = f1;
            elem.style.filter = 'alpha(opacity='+f2+');';
			elem.onmouseover = function() { this.style.background = state ? '' : 'white'; };
			elem.onmouseout = function() { this.style.background = '' };
        };						
        return true;
    }
	
	PanelTools.prototype.onMove = function(sender, x, y)
	{	
		if (this.fNoClick) return;
        if (this.status == 5 && this.move)
        {
			var mc = sender.GetMapCenterInMeters();
            var mz = sender.MapZoom;
			this.track_point[this.moveID].Move(x*mz+mc.x, -1*y*mz+mc.y);			
			
			var id_l; if((id_l = this.clmap.MapLayers.GetLayerID("Track_Line")) < 0) id_l = this.clmap.MapLayers.Add("Track_Line");
			
			// IE SLOW
			if(navigator.userAgent.indexOf("MSIE") < 0)
			{
				if(this.moveID > 0)
				{
					var vtmpn = this.TrackLineArr[this.moveID-1].name;
					//this.clmap.MapLayers.RemoveObjID(this.TrackLineArr[this.moveID-1].id);
					this.TrackLineArr[this.moveID-1].Kill();
					this.TrackLineArr[this.moveID-1] = new TLayerLine();		
					this.TrackLineArr[this.moveID-1].init(this.track_point[this.moveID-1].GetXY().x,this.track_point[this.moveID-1].GetXY().y,this.	track_point[this.moveID].GetXY().x,this.track_point[this.moveID].GetXY().y,2,'rgba(99,0,0,0.6)',vtmpn);			
					this.clmap.MapLayers.AddLayerObject(id_l,this.TrackLineArr[this.moveID-1]);
				};
							
				if(this.moveID < this.track_point.length-1)
				{
					var vtmpn = this.TrackLineArr[this.moveID].name;
					//this.clmap.MapLayers.RemoveObjID(this.TrackLineArr[this.moveID].id);
					this.TrackLineArr[this.moveID].Kill();
					this.TrackLineArr[this.moveID] = new TLayerLine();		
					this.TrackLineArr[this.moveID].init(this.track_point[this.moveID].GetXY().x,this.track_point[this.moveID].GetXY().y,this.	track_point[this.moveID+1].GetXY().x,this.track_point[this.moveID+1].GetXY().y,2,'rgba(99,0,0,0.6)',vtmpn);			
					this.clmap.MapLayers.AddLayerObject(id_l,this.TrackLineArr[this.moveID]);
				};
			};
			
			if(this.moveID == this.track_point.length-1)
			{
				this.Track_length.Move(this.track_point[this.track_point.length-1].GetXY().x+(this.clmap.zoom*10),this.track_point[this.track_point.length-1].GetXY().y+(this.clmap.zoom*10));				
			};
			
			var lll = 0;
			//for(i=1;i<this.track_point.length;i++) lll += this.clmap.GetDistanceInMeters(this.track_point[i-1].GetXY().x,this.track_point[i-1].GetXY().y,this.track_point[i].GetXY().x,this.track_point[i].GetXY().y);
			for(i=1;i<=this.moveID-1;i++) lll += this.clmap.GetDistanceInMeters(this.track_point[i-1].GetXY().x,this.track_point[i-1].GetXY().y,this.track_point[i].GetXY().x,this.track_point[i].GetXY().y);
			for(i=this.moveID;i<this.track_point.length;i++) 
			{
				lll += this.clmap.GetDistanceInMeters(this.track_point[i-1].GetXY().x,this.track_point[i-1].GetXY().y,this.track_point[i].GetXY().x,this.track_point[i].GetXY().y);
				if(this.enable_captions) this.track_point[i].textDiv.innerHTML = this.privateEnCaptions((Math.floor(lll)/1000));
			};
			
			
			this.Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="0'+this.id+'.ShowInfoWindow();">'+(Math.floor(lll)/1000)+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+this.id+'.RemovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+this.id+'.MovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'переместить')+'</a></span>';
		};
	}
	
	PanelTools.prototype.privateEnCaptions = function(text)
	{
		return '&nbsp;<br/><div style="background:#ffffcc;border:dashed 1px gray;padding:2px 2px 2px 2px;margin:0px 0px 0px 11px;">&nbsp;' + text + '<b style="color:#ffffcc;">_</b>км&nbsp;</div>';
	}
	
	PanelTools.prototype.onDialogResult2 = function(sender, result)
	{
		if(sender.myparent.track_point[sender.selected_node].hinttip) sender.myparent.track_point[sender.selected_node].hinttip.Kill();
		if(result == 1)
		{	
			sender.myparent.track_point[sender.current_node].Move(sender.myparent.first_x,sender.myparent.first_y);
			if(sender.selected_node < sender.myparent.track_point-1) sender.myparent.Track_length.Move(sender.myparent.first_x,sender.myparent.first_y);
		};
		if(result == 0)
		{
			var x = sender.myparent.track_point[sender.selected_node].GetXY().x;
			var y = sender.myparent.track_point[sender.selected_node].GetXY().y;
			sender.myparent.track_point[sender.current_node].Move(x,y);		
			sender.myparent.Track_length.Move(x,y);			
		};
		if(result == 2)
		{
			sender.myparent.track_point[sender.current_node].Move(sender.pos.x,sender.pos.y);		
			if(sender.selected_node < sender.myparent.track_point-1) sender.myparent.Track_length.Move(sender.pos.x,sender.pos.y);
		};
		for(i=0;i<sender.myparent.track_point.length-1;i++) if(sender.myparent.track_point[i].hinttip) sender.myparent.track_point[i].hinttip.Kill()
		if(sender.myparent.limeHint) sender.myparent.limeHint.Kill();
		sender.myparent.RemovePoint(-1);
	}
	
	PanelTools.prototype.onDialogResult = function(sender, result)
	{		
		if(result == 1)
		{
			sender.myparent.track_point[sender.selected_node].onclick_function(sender.myparent.track_point[sender.selected_node]);			
		};
		if(result == 0 || result == 2)
		{
			if(sender.myparent.track_point[sender.selected_node] && sender.myparent.track_point[sender.selected_node].hinttip) sender.myparent.track_point[sender.selected_node].hinttip.Kill();
		
			if((id = sender.myparent.clmap.MapLayers.GetLayerID("Track_Point")) < 0) id = sender.myparent.clmap.MapLayers.Add("Track_Point");
     
			if(result == 0)
			{			
				var x = sender.myparent.track_point[sender.selected_node].GetXY().x;
				var y = sender.myparent.track_point[sender.selected_node].GetXY().y;				
			}
			else			
			{
				var x = sender.pos.x;
				var y = sender.pos.y;
			};
	 
			var pnt = new TLayerPoint();
			pnt.init(x, y, 'pnt'+(sender.myparent.track_point.length)+Math.random());
        
			pnt.SetInnerHTML('<div id="scale_point'+sender.myparent.track_point.length+'" border="0" style="position:absolute;left:-8px;top:-8px;width:auto;height:auto;background:url('+global_vars_array[0]+'engine/gif/dot8x8.gif) 4px 4px no-repeat yellow;font-size:10px;color:navy;" align="center">&nbsp;</div>');			
			sender.myparent.track_point.push(pnt); // добавить в масссив
			pnt.Length = Math.floor(sender.myparent.l)/1000;
			pnt.textDiv = document.getElementById("scale_point"+(sender.myparent.track_point.length-1));
			if(this.enable_captions) pnt.textDiv.innerHTML = this.privateEnCaptions(pnt.Length);
			pnt.Hint = sender.myparent.track_point.length == 1 ? "<b>Стартовый узел, 0 км</b>" : "<b>Узел "+(sender.myparent.track_point.length-1)+"</b>, расстояние от начала <b>"+pnt.Length+" км</b>";			
			pnt.myparent = sender.myparent;
			pnt.thisid = sender.myparent.track_point.length - 1;
			var sel_f = function(_pointsender)
			{
				var tmp_f = new Function('','return '+pnt.thisid+' == ('+pnt.myparent.id+'.track_point.length-1);');
				if(tmp_f()) return;
				var Track_length = this.fucking_tip ? new TFuckingTip() : new THintTip();
				Track_length.blockMouse = false;
				_pointsender.myparent.AddToHTA(Track_length);
				pnt.hinttip = Track_length;
                //Track_length.allow_only_one = false; // строго перед инициализацией
                Track_length.init(pnt.GetXY().x,pnt.GetXY().y,140,_pointsender.myparent.demo ? 20 : 36,'red');
				try { Track_length.CloseButtonText = 'Убрать маркер'; } catch (e) {};
                Track_length.SetCaption('Длина');
				var id_ICT; if((id_ICT = sender.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = sender.MapLayers.Add("Track_ICT");
                sender.MapLayers.AddLayerObject(id_ICT,Track_length);
                Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+pnt.myparent.id+'.ShowInfoWindow();">'+pnt.Length+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+pnt.myparent.id+'.RemovePoint('+pnt.thisid+');return false;" style="color:black;" onmouseover="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(pnt.myparent.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+pnt.myparent.id+'.MovePoint('+pnt.thisid+');return false;" style="color:black;" onmouseover="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(pnt.myparent.demo ? '' : 'переместить')+'</a></span>';
				Track_length.DIV.style.overflow = 'hidden';
                Track_length.SetZIndex(255);
				var dot_xy = pnt.GetXY();
				var mb = pnt.myparent.clmap.MapLayers.Bounds.MapBounds();
				var db = pnt.myparent.clmap.MapLayers.Bounds.CrossXYArrayInRect([dot_xy.x],[dot_xy.y],mb);
				if(!db) pnt.myparent.clmap.SetMapCenterInMeters(dot_xy.x,dot_xy.y);				
				return true; // для onPopup
			};
			if(!this.fucking_hide && !this.fucking_tip) pnt.SetSelectable(true,sel_f);
			var pop_f = function(_pointsender,x,y)
			{
				var pm = new TPopupMenu(200);
				pm.setDiv(document.getElementById("windowroot"), true);
				pm.AddItem('<b>Узел '+pnt.thisid+'</b> ('+pnt.Length+' км):',function(){},true);
				pm.AddItem('',function(){},true);
				if(!pnt.myparent.demo) pm.AddItem('Переместить', function(){ pnt.myparent.MovePoint(pnt.thisid); }, false, _pointsender  );
				if(!pnt.myparent.demo) pm.AddItem('Удалить', function(){ pnt.myparent.RemovePoint(pnt.thisid); }, false, _pointsender  );
				pm.Popup(x,y);				
				return true; // глушим popup браузера
			}
			pnt.onPopup = pop_f;
            sender.myparent.clmap.MapLayers.AddLayerObject(id,pnt);
			sender.myparent.RemovePoint(-1);
			return;
		};		
	}
	
    PanelTools.prototype.onClick = function(sender, x, y)
    {
		y=-y;
        if (this.fNoClick) return;
        if (this.status == 5)
        {
		    try { this.mClose() } catch (e) {};
		
			var mc = sender.GetMapCenterInMeters();
            var mz = sender.MapZoom;
			var myx = x*mz + mc.x;
			var myy = y*mz + mc.y;
			
			var objs = sender.MapLayers.GetObjectsInPoint(myx, myy);
			
			if(this.move)
			{				
				this.move = false;
				this.clmap.UseHint = this.UseHint;
				this.status = this.nav_mode_was;
				this.clmap.nav_mode = this.nav_mode_was;
				
				for(i=0;i<objs.length;i++)
				for(x=0;x<this.track_point.length;x++)
				if(objs[i] && objs[i].id == this.track_point[x].id && x != this.moveID)
				{
					var dlg = new TDialog();
					dlg.init(1,['Да','Нет','Поставить рядом'],500,150);
					dlg.setDefaultButton(0);
					dlg.setDiv(document.getElementById('windowroot'));
					dlg.SetCaption('Линейка');
					dlg.SetText('&nbsp;<br/>В этой точке уже существует отметка с именем <b>"Узел '+x+'".</b><br/>Вы действительно хотите переместить <b>Узел '+this.moveID+'</b> в эту точку?');
					dlg.myparent = this;
					dlg.selected_node = x;
					dlg.current_node = this.moveID;
					dlg.pos = {x:myx, y:myy};
					dlg.Execute(this.onDialogResult2);
					return;
				};
				
				this.RemovePoint(-1);
				if(this.moveID < this.track_point.length-1) this.track_point[this.moveID].onclick_function(this.track_point[this.moveID]);
				return;
			};
						
			for(i=0;i<objs.length;i++)
			for(x=0;x<this.track_point.length;x++)
			if(objs[i] && objs[i].id == this.track_point[x].id)
			{
				var dlg = new TDialog();
				dlg.init(1,['Да','Нет','Поставить рядом'],500,150);
				dlg.setDefaultButton(0);
				dlg.setDiv(document.getElementById('windowroot'));
				dlg.SetCaption('Линейка');
				dlg.SetText('&nbsp;<br/>В этой точке уже существует отметка с именем <b>"Узел '+x+'".</b><br/>Вы действительно хотите поставить  новый узел в эту точку?');
				dlg.myparent = this;
				dlg.selected_node = x;
				dlg.pos = {x:myx, y:myy};
				dlg.Execute(this.onDialogResult);
				if(this.track_point[x].hinttip) this.track_point[x].hinttip.Kill();
				return;
			};
									
			if(this.clmap.MapLayers.GetLayerID("Track_Line") < 0) this.clmap.MapLayers.Add("Track_Line");
            if((id = sender.MapLayers.GetLayerID("Track_Point")) < 0) id = sender.MapLayers.Add("Track_Point");
            try
            {var pnt = new TLayerPoint();}
            catch (e)
            {return false;}            
            pnt.init(myx, myy, 'pnt'+(this.track_point.length)+Math.random());
            pnt.SetInnerHTML('<div id="scale_point'+this.track_point.length+'" border="0" style="position:absolute;left:-8px;top:-8px;width:auto;height:auto;background:url('+global_vars_array[0]+'engine/gif/dot8x8.gif) 4px 4px no-repeat;font-size:10px;color:navy;" _oncontextmenu="alert(101);return false;" align="center">&nbsp;</div>');			
            this.track_point.push(pnt); // добавить в масссив			
            if (this.track_point.length > 0)
                this.TrackPaint(sender, "Track_Point", this.track_point[this.track_point.length-1]);			
			pnt.Length = Math.floor(this.l)/1000;
			pnt.textDiv = document.getElementById("scale_point"+(this.track_point.length-1));
			if(this.enable_captions) pnt.textDiv.innerHTML = this.privateEnCaptions(pnt.Length);
			pnt.Hint = this.track_point.length == 1 ? "<b>Стартовый узел, 0 км</b>" : "<b>Узел "+(this.track_point.length-1)+"</b>, расстояние от начала <b>"+pnt.Length+" км</b>";			
			pnt.myparent = this;
			pnt.thisid = this.track_point.length - 1;						
			var sel_f = function(_pointsender)
			{
				var tmp_f = new Function('','return '+pnt.thisid+' == ('+pnt.myparent.id+'.track_point.length-1);');
				if(tmp_f()) return;
				var Track_length = this.fucking_tip ? new TFuckingTip() : new THintTip();
				Track_length.blockMouse = false;
				_pointsender.myparent.AddToHTA(Track_length);
				pnt.hinttip = Track_length;
                //Track_length.allow_only_one = false; // строго перед инициализацией
						var dot_xy = pnt.GetXY();
						var dot_x = dot_xy.x;
						var dot_y = dot_xy.y;
                Track_length.init(dot_xy.x,dot_xy.y,140,pnt.myparent.demo ? 20 : 36,'red');
				try { Track_length.CloseButtonText = 'Убрать маркер'; } catch (e) {};
                Track_length.SetCaption('Длина');
				var id_ICT; if((id_ICT = sender.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = sender.MapLayers.Add("Track_ICT");
                sender.MapLayers.AddLayerObject(id_ICT,Track_length);
                Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+pnt.myparent.id+'.ShowInfoWindow();">'+pnt.Length+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+pnt.myparent.id+'.RemovePoint('+pnt.thisid+');return false;" style="color:black;" onmouseover="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(pnt.myparent.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+pnt.myparent.id+'.MovePoint('+pnt.thisid+');return false;" style="color:black;" onmouseover="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+pnt.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(pnt.myparent.demo ? '' : 'переместить')+'</a></span>';
				Track_length.DIV.style.overflow = 'hidden';
                Track_length.SetZIndex(255);
				var dot_xy = pnt.GetXY();
				var mb = pnt.myparent.clmap.MapLayers.Bounds.MapBounds();
				var db = pnt.myparent.clmap.MapLayers.Bounds.CrossXYArrayInRect([dot_xy.x],[dot_xy.y],mb);
				if(!db) pnt.myparent.clmap.SetMapCenterInMeters(dot_xy.x,dot_xy.y);				
				return true;
			};
			if(!this.fucking_hide && !this.fucking_tip) pnt.SetSelectable(true,sel_f);
			var pop_f = function(_pointsender,x,y)
			{
				var pm = new TPopupMenu(200);
				pm.setDiv(document.getElementById("windowroot"), true);
				pm.AddItem('<b>Узел '+pnt.thisid+'</b> ('+pnt.Length+' км):',function(){},true);
				pm.AddItem('',function(){},true);
				if(!pnt.myparent.demo) pm.AddItem('Переместить', function(){ pnt.myparent.MovePoint(pnt.thisid); }, false, _pointsender  );
				if(!pnt.myparent.demo) pm.AddItem('Удалить', function(){ pnt.myparent.RemovePoint(pnt.thisid); }, false, _pointsender  );
				pm.Popup(x,y);
				return true; // глушим popup браузера
			}
			pnt.onPopup = pop_f;
            return true;
        }
        if (this.status == 6)
        {
            return true;
        }
        return false;
    }
	
	PanelTools.prototype.MovePoint = function(pointNo)
	{
		this.clmap.flag_ms_overs[1] = false;
		
		try { this.mClose() } catch (e) {};
		if(!this.move)
		{			
			this.first_x = this.track_point[pointNo].GetXY().x;
			this.first_y = this.track_point[pointNo].GetXY().y;
			
			this.nav_mode_was = this.status;
			this.move = true;
			if(this.track_point[pointNo] && this.track_point[pointNo].hinttip) this.track_point[pointNo].hinttip.Kill();
			if(this.limeHint) this.limeHint.Kill();
			this.moveID = pointNo;
			//this.SetTool(4);			
			this.clmap.nav_mod = 5;
			this.status = 5;
			this.clmap.UseHint = false;
			if(pointNo == this.track_point.length-1) 
			{
				//this.Track_length.canvas_obj.div.style.visibility = 'hidden';
				this.Track_length.Move(this.track_point[this.track_point.length-1].GetXY().x+(this.clmap.zoom*10),this.track_point[this.track_point.length-1].GetXY().y+(this.clmap.zoom*10));							
			};
			this.clmap.flag_ms_overs[1] = false;
		};
	}
	
	PanelTools.prototype.RemovePoint = function(pointNo)
	{	
		this.clmap.flag_ms_overs[1] = false;
	    try { this.mClose() } catch (e) {};
		
		if(this.track_point.length == 1 && pointNo >= 0) return;		
		
		if(this.track_point[pointNo] && this.track_point[pointNo].hinttip) this.track_point[pointNo].hinttip.Kill();
		if(pointNo >= 0) if(pointNo == this.track_point.length-1) if(this.track_point[pointNo-1] && this.track_point[pointNo-1].hinttip) this.track_point[pointNo-1].hinttip.Kill();
		
		if(this.limeHint) this.limeHint.Kill();
		if(pointNo >= 0) this.track_point[pointNo].Kill();//this.clmap.MapLayers.RemoveObjID(this.track_point[pointNo].id);// this.track_point[pointNo].Kill();
		this.TrackLineNum = 0;
		for(i=0;i<this.TrackLineArr.length;i++) this.TrackLineArr[i].Kill();//this.clmap.MapLayers.RemoveObjID(this.TrackLineArr[i].id);
		this.TrackLineArr = [];						
		
		var tmpa = [];
		for(i=0;i<this.track_point.length;i++) if(i != pointNo) tmpa[tmpa.length] = this.track_point[i];
		this.track_point = tmpa;
		
		var lll = 0;
		for(i=0;i<this.track_point.length;i++)
		{
			if(i > 0) lll += this.clmap.GetDistanceInMeters(this.track_point[i-1].GetXY().x,this.track_point[i-1].GetXY().y,this.track_point[i].GetXY().x,this.track_point[i].GetXY().y);
			
			this.track_point[i].SetInnerHTML('<div id="scale_point'+(i+1)+'" border="0" style="position:absolute;left:-8px;top:-8px;width:auto;height:auto;background:url('+global_vars_array[0]+'engine/gif/dot8x8.gif) 4px 4px no-repeat;font-size:10px;color:navy;" align="center">&nbsp;</div>');	
			this.track_point[i].Length = Math.floor(lll)/1000;
			this.track_point[i].textDiv = document.getElementById("scale_point"+(i+1));
			if(this.enable_captions) this.track_point[i].textDiv.innerHTML = this.privateEnCaptions(this.track_point[i].Length);
			this.track_point[i].Hint = i == 0 ? "<b>Стартовый узел, 0 км</b>" : "<b>Узел "+i+"</b>, расстояние от начала <b>"+this.track_point[i].Length+" км</b>";	   		   this.track_point[i].myparent = this;
			this.track_point[i].thisid = i;
			this.track_point[i].myparent = this;
			var sel_f = function(_pointsender)
			{				
				var tmp_f = new Function('','return '+this.thisid+' == ('+this.myparent.id+'.track_point.length-1);');
				if(tmp_f()) return;
				var Track_length =  this.fucking_tip ? new TFuckingTip() : new THintTip();
				Track_length.blockMouse = false;
				_pointsender.myparent.AddToHTA(Track_length);
				this.hinttip = Track_length;
                //Track_length.allow_only_one = false; // строго перед инициализацией
                Track_length.init(this.GetXY().x,this.GetXY().y,140,_pointsender.myparent.demo ? 20 : 36,'red');
				try { Track_length.CloseButtonText = 'Убрать маркер'; } catch (e) {};
                Track_length.SetCaption('Длина');				
				var id_ICT; if((id_ICT = this.myparent.clmap.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = this.myparent.clmap.MapLayers.Add("Track_ICT");
                this.myparent.clmap.MapLayers.AddLayerObject(id_ICT,Track_length);
                Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+this.myparent.id+'.ShowInfoWindow();">'+this.Length+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+this.myparent.id+'.RemovePoint('+this.thisid+');return false;" style="color:black;" onmouseover="'+this.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.myparent.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+this.myparent.id+'.MovePoint('+this.thisid+');return false;" style="color:black;" onmouseover="'+this.myparent.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.myparent.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.myparent.demo ? '' : 'переместить')+'</a></span>';
				Track_length.DIV.style.overflow = 'hidden';
                Track_length.SetZIndex(255);
				var dot_xy = this.GetXY();
				var mb = this.myparent.clmap.MapLayers.Bounds.MapBounds();
				var db = this.myparent.clmap.MapLayers.Bounds.CrossXYArrayInRect([dot_xy.x],[dot_xy.y],mb);
				if(!db) this.myparent.clmap.SetMapCenterInMeters(dot_xy.x,dot_xy.y);				
				return true;
			};
			if(!this.fucking_hide && !this.fucking_tip) this.track_point[i].SetSelectable(true,sel_f);
			var pop_f = function(_pointsender,x,y)
			{
				var pm = new TPopupMenu(200);
				pm.setDiv(document.getElementById("windowroot"), true);
				pm.AddItem('<b>Узел '+this.thisid+'</b> ('+this.Length+' км):',function(){},true);
				pm.AddItem('',function(){},true);
				if(!this.demo) pm.AddItem('Переместить', function(o){ o.myparent.MovePoint(o.thisid); }, false, this  );
				if(!this.demo) pm.AddItem('Удалить', function(o){ o.myparent.RemovePoint(o.thisid); }, false, this  );
				pm.Popup(x,y);
				return true; // глушим popup браузера
			}
			this.track_point[i].onPopup = pop_f;
			if(i>0) this.RedrawLine(i);
		};		
		this.Track_length.Move(this.track_point[this.track_point.length-1].GetXY().x,this.track_point[this.track_point.length-1].GetXY().y);
		this.Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+this.id+'.ShowInfoWindow();">'+(Math.floor(lll)/1000)+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+this.id+'.RemovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+this.id+'.MovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'переместить')+'</a></span>';
	}
	
	PanelTools.prototype.RedrawLine = function(pointNo)
	{
					var TrackLine = new TLayerLine();					
                    TrackLine.init(this.track_point[pointNo-1].GetXY().x,this.track_point[pointNo-1].GetXY().y,this.track_point[pointNo].GetXY().x,this.track_point[pointNo].GetXY().y,2,'rgba(99,0,0,0.6)','myname'+this.TrackLineNum);
					var id_l; if((id_l = this.clmap.MapLayers.GetLayerID("Track_Line")) < 0) id_l = this.clmap.MapLayers.Add("Track_Line");
                    this.clmap.MapLayers.AddLayerObject(id_l,TrackLine);
					this.TrackLineNum++;
					TrackLine.Length = (Math.floor(this.clmap.GetDistanceInMeters(this.track_point[pointNo-1].GetXY().x,this.track_point[pointNo-1].GetXY().y,this.track_point[pointNo].GetXY().x,this.track_point[pointNo].GetXY().y))/1000);
					TrackLine.Hint = '<b>Отрезок '+(pointNo-1)+'</b>, длина <b>'+TrackLine.Length+'</b> км';
					TrackLine.myparent = this;
					TrackLine.lineIndex = pointNo+1;
					if(!this.fucking_hide && !this.fucking_tip) 
					TrackLine.SetSelectable(true,function(sender)
					{					
						var Track_length = this.fucking_tip ? new TFuckingTip() : new THintTip();
						Track_length.blockMouse = false;
						sender.myparent.AddToHTA(Track_length);
						//Track_length.allow_only_one = false; // строго перед инициализацией
						Track_length.init((sender.myparent.track_point[sender.lineIndex-2].GetXY().x+sender.myparent.track_point[sender.lineIndex-1].GetXY().x)/2,
(sender.myparent.track_point[sender.lineIndex-2].GetXY().y+sender.myparent.track_point[sender.lineIndex-1].GetXY().y)/2,140,36,'lime');
						try { Track_length.CloseButtonText = 'Убрать маркер'; } catch (e) {};
						Track_length.SetCaption('Длина');
						var id_ICT; if((id_ICT = sender.myparent.clmap.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = sender.clmap.MapLayers.Add("Track_ICT");
						sender.myparent.clmap.MapLayers.AddLayerObject(id_ICT,Track_length);
						Track_length.DIV.innerHTML = '<span style="font-size:12px;color:white;">Протяженность</span><br/><b style="color:white;cursor:pointer;" onclick="'+sender.myparent.id+'.ShowInfoWindow();">'+sender.Length+' км</b>';
						Track_length.DIV.style.overflow = 'hidden';
						Track_length.SetZIndex(255);
						sender.myparent.limeHint = Track_length;
							var dot_xy1 = sender.myparent.track_point[sender.lineIndex-2].GetXY();
							var dot_xy2 = sender.myparent.track_point[sender.lineIndex-1].GetXY();
							var mb = sender.myparent.clmap.MapLayers.Bounds.MapBounds();
							var db = sender.myparent.clmap.MapLayers.Bounds.CrossXYArrayInRect([dot_xy1.x,dot_xy2.x],[dot_xy1.y,dot_xy2.y],mb);
							if(!db) sender.myparent.clmap.SetMapCenterInMeters((dot_xy1.x+dot_xy2.x)/2,(dot_xy1.y+dot_xy2.y)/2);
						return true;						
					});					
					this.TrackLineArr[this.TrackLineArr.length] = TrackLine;
	}
	
    PanelTools.prototype.TrackPaint = function(sender, name, pnt)
    {
        var id_l;
        if((id_l = sender.MapLayers.GetLayerID("Track_Line")) < 0) id_l = sender.MapLayers.Add("Track_Line");
        var id_ICT;
        if((id_ICT = sender.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = sender.MapLayers.Add("Track_ICT");
        var id;
        if((id = sender.MapLayers.GetLayerID(name)) > -1)
        {
            sender.MapLayers.AddLayerObject(id,pnt);
            if (this.track_point.length < 2)
            {
                this.Track_length = this.fucking_tip ? new TFuckingTip() : new THintTip();
				this.Track_length.blockMouse = false;
				this.Track_length.allow_only_one = false; // строго перед инициализацией
                this.Track_length.init(pnt.GetXY().x,pnt.GetXY().y,140,this.demo ? 20 : 36,'maroon');
				try { this.Track_length.CloseButtonText = 'Закрыть линейку'; } catch (e) {};
                this.Track_length.SetCaption('Длина');
                sender.MapLayers.AddLayerObject(id_ICT,this.Track_length);
				this.Track_length.DIV.style.overflow = 'hidden';
                this.Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+this.id+'.ShowInfoWindow();">'+this.l+' км</b>';
                this.Track_length.SetZIndex(255);
                this.Track_length.OnKill = new Function('sender', 'try { '+this.id+'.mClose() } catch (e) {}; '+this.id+'.TrackLineArr=[];'+this.id+'TrackLine=0;'+this.id+'.l=0;'+this.id+'.track_point=Array();'+this.id+'.clmap.MapLayers.Remove('+this.id+'.clmap.MapLayers.GetLayerID("'+name+'"));'+this.id+'.clmap.MapLayers.Remove('+this.id+'.clmap.MapLayers.GetLayerID("Track_Line"));'+this.id+'.clmap.MapLayers.Remove('+this.id+'.clmap.MapLayers.GetLayerID("Track_ICT"));');
            };
            if (this.track_point.length > 1)
            {
                try
                {
                    var TrackLine = new TLayerLine();
                    TrackLine.init(this.track_point[this.track_point.length-2].GetXY().x,this.track_point[this.track_point.length-2].GetXY().y,this.track_point[this.track_point.length-1].GetXY().x,this.track_point[this.track_point.length-1].GetXY().y,2,'rgba(99,0,0,0.6)','myname'+this.TrackLineNum);
					this.TrackLineNum++
                    this.TrackLineArr[this.TrackLineArr.length] = TrackLine;
                    if (this.Track_length)
                    {					
                        this.Track_length.Move(pnt.GetXY().x,pnt.GetXY().y);
                        var tmp = this.LengthTrack(this.track_point[this.track_point.length-2].GetXY().x,this.track_point[this.track_point.length-2].GetXY().y,this.track_point[this.track_point.length-1].GetXY().x,this.track_point[this.track_point.length-1].GetXY().y);
                    	this.Track_length.DIV.innerHTML = '<b style="color:white;cursor:pointer;" onclick="'+this.id+'.ShowInfoWindow();">'+Math.floor(tmp)/1000+' км</b><br/><span style="font-size:12px;"><a href="#" onclick="'+this.id+'.RemovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'удалить')+'</a> <a href="#" onclick="'+this.id+'.MovePoint('+(this.track_point.length-1)+');return false;" style="color:black;" onmouseover="'+this.clmap.vname+'.flag_ms_overs[1] = true;" onmouseout="'+this.clmap.vname+'.flag_ms_overs[1] = false;">'+(this.demo ? '' : 'переместить')+'</a></span>'
						this.Track_length.DIV.style.overflow = 'hidden';
                    }
                    sender.MapLayers.AddLayerObject(id_l,TrackLine);
					TrackLine.Length = (Math.floor(this.clmap.GetDistanceInMeters(this.track_point[this.track_point.length-2].GetXY().x,this.track_point[this.track_point.length-2].GetXY().y,this.track_point[this.track_point.length-1].GetXY().x,this.track_point[this.track_point.length-1].GetXY().y))/1000);
					TrackLine.Hint = '<b>Отрезок '+(this.track_point.length-1)+'</b>, длина <b>'+TrackLine.Length+'</b> км';
					TrackLine.myparent = this;
					TrackLine.lineIndex = this.track_point.length;
					if(!this.fucking_hide && !this.fucking_tip) 
					TrackLine.SetSelectable(true,function(sender)
					{
						var Track_length = this.fucking_tip ? new TFuckingTip() : new THintTip();
						Track_length.blockMouse = false;
						sender.myparent.AddToHTA(Track_length);
						Track_length.init((sender.myparent.track_point[sender.lineIndex-2].GetXY().x+sender.myparent.track_point[sender.lineIndex-1].GetXY().x)/2,
(sender.myparent.track_point[sender.lineIndex-2].GetXY().y+sender.myparent.track_point[sender.lineIndex-1].GetXY().y)/2,140,36,'lime');
						try { Track_length.CloseButtonText = 'Убрать маркер'; } catch (e) {};
						Track_length.SetCaption('Длина');
						var id_ICT; if((id_ICT = sender.myparent.clmap.MapLayers.GetLayerID("Track_ICT")) < 0) id_ICT = sender.myparent.clmap.MapLayers.Add("Track_ICT");
						sender.myparent.clmap.MapLayers.AddLayerObject(id_ICT,Track_length);
						Track_length.DIV.innerHTML = '<span style="font-size:12px;color:white;">Протяженность</span><br/><b style="color:white;cursor:pointer;" onclick="'+sender.myparent.id+'.ShowInfoWindow();">'+sender.Length+' км</b>';
						Track_length.DIV.style.overflow = 'hidden';
						Track_length.SetZIndex(255);
						sender.myparent.limeHint = Track_length;
							var dot_xy1 = sender.myparent.track_point[sender.lineIndex-2].GetXY();
							var dot_xy2 = sender.myparent.track_point[sender.lineIndex-1].GetXY();
							var mb = sender.myparent.clmap.MapLayers.Bounds.MapBounds();
							var db = sender.myparent.clmap.MapLayers.Bounds.CrossXYArrayInRect([dot_xy1.x,dot_xy2.x],[dot_xy1.y,dot_xy2.y],mb);
							if(!db) sender.myparent.clmap.SetMapCenterInMeters((dot_xy1.x+dot_xy2.x)/2,(dot_xy1.y+dot_xy2.y)/2);
						return true;
					});
                }
                catch (e) {}
            };
        };
    }
	
	PanelTools.prototype.ShowInfoWindow = function()
	{
		if(!this.allow_all_window) return;
		// получаем координаты мыши в документы
		var x = this.clmap.global.mouse_x;
		var y = this.clmap.global.mouse_y + 35;
								
		// вызываем всплывающий MiniPopupTooltip и получаем DIV для вывода текста
		var form = new MiniPopupTooltip('_panel_tools');
		form.Show(x,y,3000);
		var mydiv = form.DIV;		
		mydiv.style.textAlign='left';
		mydiv.style.height = '125px';
		mydiv.style.width = '325px';
						
		mydiv.innerHTML = '&nbsp;<b style="font-size:14px;">Узлы линейки:</b><br/>'+ // заголовок
								'<div id="scale_mto" style="overflow:auto;height:95px;border:solid 1px silver;width:310px;position:absolute;left:10px;top:25px;"></div>'+// вывод списка домов
								'<div style="position:absolute;left:317px;top:0px;font-size:14px;"><a href="#" onclick="document.getElementById(\''+mydiv.id+'\').close();return false;" style="text-decoration:none;color:black;" title="Закрыть">х</a></div>'; // кнопка закрыть
								
		var outdiv = document.getElementById('scale_mto');
		outdiv.dvs = [];
		
		for(i=0;i<this.track_point.length;i++)
		{
			var myx = document.createElement('div');									
			myx.innerHTML = '&nbsp;'+(i == 0 ? 'Старт' : (i == this.track_point.length-1 ? 'Финиш' : 'Узел <b>'+i+'</b>'))+':&nbsp;&nbsp;<a href="#" onclick="'+this.id+'.track_point['+i+'].onclick_function('+this.id+'.track_point['+i+']);return false;" style="text-decoration:none;font-weight:bold;">'+this.track_point[i].Length+' км</a>' + (i == 0 ? '' : ' <a href="#" onclick="'+this.id+'.TrackLineArr['+(i-1)+'].onclick_function('+this.id+'.TrackLineArr['+(i-1)+']);return false;" style="text-decoration:none;color:black;font-weight:bold;">('+Math.floor((this.track_point[i].Length-this.track_point[i-1].Length)*1000)/1000+' км)</a>');
			myx.style.cursor = 'default';
			myx.normalColor = i % 2 ? '#FFFFFF' : '#FFFFDD';
			myx.style.backgroundColor = myx.normalColor;									
			myx.onmouseover = function() { this.style.background = "#FB3A34"; this.style.color = 'white'; };
			myx.onmouseout = function() { this.style.background = this.normalColor; this.style.color = 'black'; };
			myx.oncontextmenu = new Function('', this.id+'.track_point['+i+'].onPopup('+this.id+'.track_point['+i+'],'+this.id+'.clmap.global.mouse_x,'+this.id+'.clmap.global.mouse_y); return false;' );
			outdiv.appendChild(myx);
			outdiv.dvs[i] = myx; // присваиваем div для каждого дома
		};
		this.mClose = new Function('','clearTimeout(document.getElementById("'+mydiv.parent.id+'").proc.func); document.getElementById("windowroot").removeChild(document.getElementById("'+mydiv.parent.id+'")); '+this.id+'.mClose = function(){};');		
	}
	
    PanelTools.prototype.LengthTrack = function(x1,y1,x2,y2)
    {
        //this.l += (Math.sqrt(Math.pow(Math.abs(x1-x2),2)+Math.pow(Math.abs(y1-y2),2))/1000);
        this.l += this.clmap.GetDistanceInMeters(x1,y1,x2,y2);
        return this.l;
    }
//
//Панель инструментов
//