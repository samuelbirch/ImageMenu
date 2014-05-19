/*
---
name: ImageMenu
description: horizontal menu, reveals more of the image as you rollover it.

license: Open Source MIT Licence
authors: Samuel Birch

requires: [Core/Fx.CSS, Core/Fx.Transitions, More/Fx.Elements]
provides: ImageMenu

...
*/


var ImageMenu = new Class({

	Implements: [Options, Events],

	options: {/*
		onOpen: function(){},
		onClose: function(){},
		onClick: function(){},
		onClickOpen: function(){},
		onClickClose: function(){},*/
		openWidth: 200,
		openOnClick: true,
		transition: Fx.Transitions.Quad.easeOut,
		duration: 400,
		open: null,
		border: 0
	},

	initialize: function(elements, options){
		this.elements = $$(elements);
		this.setOptions(options);

		this.widths = {
			closed: this.elements[0].getStyle('width').toInt(),
			openSelected: this.options.openWidth
		};
		this.widths.openOthers = Math.round(((this.widths.closed * this.elements.length) - (this.widths.openSelected + this.options.border)) / (this.elements.length - 1));

		this.fx = new Fx.Elements(this.elements, {
			link: 'cancel',
			duration: this.options.duration,
			transition: this.options.transition
		});

		var self = this;
		
		this.elements.each(function(el, i){

			el.addEvents({

				mouseenter: function(e){
					self.reset(i);
					self.fireEvent('open', [el, i]);
				},
				
				mouseleave: function(e){
					self.reset(self.options.open);
					self.fireEvent('close', [el, i]);
				}

			});

			if (self.options.openOnClick) el.addEvent('click', function(e){
				e.stop();
				self.options.open = (self.options.open == i) ? null : i;
				var event = (self.options.open == i) ? 'Close' : 'Open';
				self.fireEvent('click' + event, [this.href, i])
					.fireEvent('click', [this.href, i]);
			});
			
		});


		if (this.options.open != null){
			var isNumber = typeOf(this.options.open) == 'number',
				open = isNumber ? this.options.open : this.elements.indexOf(document.id(this.options.open));

			this.reset(open);
		}

	},
	
	reset: function(num){

		var isNumber = typeOf(num) == 'number',
			obj = {},
			width;

		if (isNumber){
			width = this.widths.openOthers;
			if ((num + 1) == this.elements.length) width += this.options.border;
		} else {
			width = this.widths.closed;
		}

		this.elements.each(function(el, i){
			var w = width;
			if (i == (this.elements.length - 1)) w = width + 5;
			obj[i] = {width: w};
		}, this);

		if (isNumber) obj[num] = {width: this.widths.openSelected};

		this.fx.start(obj);

	}

});
