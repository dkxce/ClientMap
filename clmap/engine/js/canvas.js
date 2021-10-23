/******************************************
********************************************
	ClientMap Rendering Web Client Module
		    * Milok Zbrozek *
		milokz [doggy] gmail.com
********************************************
*******************************************/

		/*
			uses newExcanvas.js
			
			class TCanvas
			{
				// Инициацлизация размеров
				pubic void initSize(int x, int y, int width, int height);
				
				// Установка
				public void initDiv(object div)
				
				// Перемещение
				public void SetPos(int x, int y)
				
				// Очистка канвы
				public void Clear()
				
				// Заливка
				public void Fill(color)
				
				// Удаление канвы
				public void Kill()
				
				// свойства
				public object CTX
				public object DIV
			}
		
		*/
		// http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes
		
		function TCanvas()
		{
			this.canvas = excanvas(document.createElement("canvas"));
			this.id = Math.round(Math.random()*1000000)+"_"+Math.round(Math.random()*100);
			this.type = 'TCanvas';

			this.div = document.createElement("div");
			this.DIV = this.div;
			this.div.id = 'div_'+this.id;
			if(navigator.userAgent.indexOf('Chrome') < 0) 
				this.canvas.id = 'canvas_'+this.id;
		}
		
		// инициализация размеров
		TCanvas.prototype.initSize = function(x,y,wi,he)
		{
			this.x = x;
			this.y = y;
			this.wi = wi && wi != 0 ? wi : 100;
			this.he = he && he != 0 ? he : 100;
		
			this.canvas.width = this.wi;
            this.canvas.height = this.he; 

			this.div.style.position = 'absolute';
			
			this.div.style.width = this.wi+'px';
			this.div.style.height = this.he+'px'; 
			this.div.style.overflow = 'hidden';
			
			// this.div.style.border = 'dashed 1px navy';
			
			this.ctx = this.canvas.getContext("2d");
			this.CTX = this.ctx;
		}
		
		// Установка
		TCanvas.prototype.initDiv = function(div)
		{
			this.parent = div;
			div.appendChild(this.div);
			this.div.appendChild(this.canvas);
			this.div.style.left = this.x+'px';
			this.div.style.top = this.y+'px';
			
			//SET OWNER
			this.div.owner = this;
			this.canvas.owner = this;
		}
		
		// Перемещение
		TCanvas.prototype.SetPos = function(x,y)
		{
			this.x = x;
			this.y = y;
			this.div.style.left = this.x+'px';
			this.div.style.top = this.y+'px';
		}
		
		TCanvas.prototype.CTX = {};
		
		TCanvas.prototype.DIV = {};
		
		// Очистка
		TCanvas.prototype.Clear = function()
		{
			this.ctx.clearRect(0,0,this.wi,this.he);
		}
		
		// Заливка
		TCanvas.prototype.Fill = function(color)
		{
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0,0,this.wi,this.he);
		}
		
		// Удаление
		TCanvas.prototype.Kill = function()
		{
			if(document.getElementById(this.div.id)) this.parent.removeChild(this.div);
		}