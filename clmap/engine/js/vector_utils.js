/*******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

// DOC Exists NOT FULL!!!

//  Use raphael.js
//  http://raphaeljs.com/

		// PUBLIC
		function RotatedImage()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.paper = false;
			this.angle = 0;
		}
		
		// PUBLIC
		RotatedImage.prototype.DIV = {};		
		
		// PUBLIC
		RotatedImage.prototype.init = function(div)
		{
			this.parentdiv = div;
			
			this.DIV = document.createElement('div');
			this.DIV.id = 'rotated_image_'+Math.random();
			this.parentdiv.appendChild(this.DIV);
			
			this.iDIV = document.createElement('div');
			this.iDIV.id = this.DIV.id+'i';			
			this.iDIV.style.position = 'absolute';
			this.iDIV.style.left = '0px';
			this.iDIV.style.top = '0px';
			this.DIV.appendChild(this.iDIV);
			
			this.iDIV.SelfObject = this;
			this.DIV.SelfObject = this;
		}		
		
		// PUBLIC
		RotatedImage.prototype.LoadImage = function(url,wi,he)
		{
			this.wi = wi;
			this.he = he;
			this.max_l = Math.floor( Math.sqrt(Math.pow(wi,2)+Math.pow(he,2))+1 );
			this.max_a = Math.atan(this.he/this.wi);
			
			this.plus_x = (this.max_l-wi)/2;
			this.plus_y = (this.max_l-he)/2;
			
			this.paper = Raphael(this.iDIV.id,this.max_l,this.max_l);
			this.image = this.paper.image(url, this.plus_x, this.plus_y, wi, he);
			this.url = url;
			
			this.iDIV.style.left = (-1*this.plus_x)+'px';
			this.iDIV.style.top = (-1*this.plus_y)+'px';
			this.angle = 0;
			this.Rotate(this.angle);
		}
		
		// PUBLIC
		RotatedImage.prototype.Rotate = function(angle)
		{			
			//var pi = 3.141592653589793;
			//var an = this.angle/180 * pi
			
			try { this.image.rotate(angle);	} 
			catch (e)
			{
				if(_ErrorCache && _ErrorCache.Add) 
					_ErrorCache.Add(e,{file:'vector_utils.js','class':'RotatedImage',object:this,line:76});				
				return false;
			};
			this.angle += angle;
			return true;
		}
		
		// PUBLIC
		RotatedImage.prototype.SetAngle = function(angle)
		{
			this.Rotate(-1*this.angle);
			this.Rotate(angle);
		}
		
		// PUBLIC
		RotatedImage.prototype.GetAngle = function()
		{
			return this.angle - parseInt(this.angle / 360) * 360;
		}
		
		///////////
		///////////
		///////////
		///////////
		///////////
		
		//public
		function SpinnerBar()
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.div = false;
			this.small_radius = 12;
			this.big_radius = 30;
			this.number_of_lines = 14;
			this.line_width = 4;
			this.line_color = "#0000FF";
		}
		
		//public
		SpinnerBar.prototype.init = function(small_radius,big_radius,number_of_lines,line_width,line_color)
		{
			this.small_radius = small_radius ? small_radius : 12;
			this.big_radius = big_radius ? big_radius : 30;
			this.number_of_lines = number_of_lines ? number_of_lines : 14;
			this.line_width = line_width ? line_width : 4;
			this.line_color = line_color ? line_color : "#FF0000";
		}
		
		//public
		SpinnerBar.prototype.setDiv = function(div)
		{
			if(typeof(div) == 'string') document.getElementById(div).SelfObject = this; else div.SelfObject = this;
			this.spinner(div, this.small_radius, this.big_radius, this.number_of_lines, this.line_width, this.line_color);
		}
		
		
		//private
		SpinnerBar.prototype.spinner = function(holderid, R1, R2, count, stroke_width, colour) 
		{
                var sectorsCount = count || 12,
                    color = colour || "#fff",
                    width = stroke_width || 15,
                    r1 = Math.min(R1, R2) || 35,
                    r2 = Math.max(R1, R2) || 60,
                    cx = r2 + width,
                    cy = r2 + width,
                    r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),
                    
                    sectors = [],
                    opacity = [],
                    beta = 2 * Math.PI / sectorsCount,

                    pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};					
					Raphael.getColor.reset();
                for (var i = 0; i < sectorsCount; i++) {
                    var alpha = beta * i - Math.PI / 2,
                        cos = Math.cos(alpha),
                        sin = Math.sin(alpha);
                    opacity[i] = 1 / sectorsCount * i;
                    sectors[i] = r.path(pathParams)
                                    .moveTo(cx + r1 * cos, cy + r1 * sin)
                                    .lineTo(cx + r2 * cos, cy + r2 * sin);
                    if (color == "rainbow") {
                        sectors[i].attr("stroke", Raphael.getColor());
                    }
                }
                var tick;
                (function ticker() {
                    opacity.unshift(opacity.pop());
                    for (var i = 0; i < sectorsCount; i++) {
                        sectors[i].attr("opacity", opacity[i]);
                    }
                    r.safari();
					if((holderid.id && document.getElementById(holderid.id)) || (document.getElementById(holderid)));
					tick = setTimeout(ticker, 1000 / sectorsCount);
                })();
                return function () {
                    clearTimeout(tick);
                    r.remove();
                };
        }
		
		
		/////////////
		/////////////
		/////////////
		/////////////
		/////////////
		
		// public
		function TGaugeBar(vname)
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.vname = vname;
			this.value = 0;
		}
		
		// public
		TGaugeBar.prototype.init = function(div,wi,he,color,border_color)
		{
			this.parentdiv = div;
			this.wi = wi && wi > 0 ? wi : 200;
			this.iwi = this.wi - 2;
			this.he = he && he > 0 ? he : 20;
			this.ihe = this.he - 2;
			this.color = color ? color : 'rgb(0,0,170)';
			this.border_color = border_color ? border_color : 'black';
			this.div = document.createElement('div');
			this.div.style.position = 'absolute';
			this.div.style.left = '0px';
			this.div.style.top = '0px';
			this.div.style.width = this.wi;
			this.div.style.height = this.he;
			this.parentdiv.appendChild(this.div);
			this.DIV = this.div;
			this.div.SelfObject = this;
			
			this.canvas = Raphael(this.div,this.wi,this.he);
			this.Canvas = this.canvas;
			this.Canvas.SelfObject = this;
			this.rect = this.canvas.rect(0, 0, this.wi, this.he, 0).attr({fill: "#fff", stroke: this.border_color, "stroke-width": 2});
			this.rect1 = this.canvas.rect(1, 1, 0, this.ihe, 0).attr({fill: this.color, stroke: "#000", "stroke-width": 0});
			this.text1 = this.canvas.text(this.wi/2,this.he/2+4,'0%').attr({'font-size':'14px','fill':'#f00','stroke':'#fff',"stroke-width": 2.5});			
			this.rect2 = this.canvas.rect(1, 1, 0, this.ihe, 0).attr({fill: "#fff", stroke: "#000", "stroke-width": 0});			
			this.text2 = this.canvas.text(this.wi/2,this.he/2+4,'0%').attr({'font-size':'14px','fill':this.color});
			
			this.div.title = this.val + '%';
		}
		
		// public
		TGaugeBar.prototype.Canvas = {};
		
		// public
		TGaugeBar.prototype.DIV = {};
		
		// public
		TGaugeBar.prototype.Percent = function(val)
		{
			if(val == undefined) return this.val;
			this.val = val;
			if(this.val < 0) this.val = 0;
			if(this.val > 100) this.val = 100;
			var pc = val * this.iwi / 100;
			
			this.rect1.attr({width:pc});
			this.rect2.attr({x:pc+1,width:this.iwi-pc-1});			
			
			this.text1.attr({text:this.val+'%'});
			this.text2.attr({text:this.val+'%'});
			
			this.div.title = this.val + '%';
			return this.val;
		}
		
		
		//////////
		//////////
		//////////
		//////////
		//////////
		
		// public
		function TLoadingBar(vname)
		{
			this.author = 'Milok Zbrozek (milokz [doggy] gmail.com)';
			this.vname = vname;
		}
		
		// public
		TLoadingBar.prototype.Canvas = {};
		
		// public
		TLoadingBar.prototype.DIV = {};
		
		// public
		TLoadingBar.prototype.init = function(div,wi,he,color,border_color)
		{
			this.parentdiv = div;
			
			this.wi = wi && wi > 0 ? wi : 202;
			this.iwi = this.wi - 2;
			
			this.he = he && he > 0 ? he : 20;
			this.ihe = this.he - 2;
			
			this.color = color ? color : 'rgb(80,0,150)';
			this.border_color = border_color ? border_color : 'black';
			this.div = document.createElement('div');
			this.div.style.position = 'absolute';
			this.div.style.left = '0px';
			this.div.style.top = '0px';
			this.div.style.width = this.wi;
			this.div.style.height = this.he;
			this.parentdiv.appendChild(this.div);
			this.DIV = this.div;			
			this.div.SelfObject = this;
			
			this.canvas = Raphael(this.div,this.wi,this.he);
			this.Canvas = this.canvas;
			this.Canvas.SelfObject = this;
			this.rect = this.canvas.rect(0, 0, this.wi, this.he, 0).attr({fill: "#fff", stroke: this.border_color, "stroke-width": 2});
			var myrects = [];
			var root = 0;
			var step = this.iwi/100;
			var cwi = 0;
			for(i=0;i<100;i++)
			{
				myrects[i] = this.canvas.rect(1+cwi, 1, step, this.ihe, 0).attr({fill: this.color, stroke: "#000", "stroke-width": 0,'opacity': i/100});
				cwi += step;
			};
						
			$(this.div).everyTime(5, function(ttl) { for(i=0;i<100;i++) { var val = root/100+i/100; if(val > 1) val = 2 - val; if(val<0) val = -1*val; myrects[i].attr('opacity',val); }; if(root<200) root++; else root = 0; } );
			
			this._Text = 'Загрузка';
			this.div.title = this._Text;
			this.text1 = this.canvas.text(this.wi/2,this.he/2+4,this._Text).attr({'font-size':'14px','fill':'#f00','stroke':'#fff',"stroke-width": 2});			
			this.text2 = this.canvas.text(this.wi/2,this.he/2+4,this._Text).attr({'font-size':'14px','fill':this.color});
		}
		
		// public
		TLoadingBar.prototype.Text = function(text)
		{
			if(text) this._Text = text;
			this.text1.attr('text',this._Text);
			this.text2.attr('text',this._Text);
			this.div.title = this._Text;
			return this._Text;
		}