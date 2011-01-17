(function($) {
	/*
	 * jQuery.multiselect plugin 
	 * 
	 * Form control: allow select several values from list and add new value(s) to list
	 *
	 * Licensed under the BSD License:
	 *   http://www.opensource.org/licenses/bsd-license
	 *
	 * Version: 0.9.0
	 * 
	 * @author Dmitry (dio) Levashov, dio@std42.ru
	 * @example
	 *  html: <select name="my-select" multiple="on"><option .... </select>
	 * js   : $('select[name="my-select"]').multiselect()
	 *  or  
	 * var opts = { ... }; 
	 * $('select[name="my-select"]').multiselect(opts);
	 */
	$.fn.multiselect = function(opts) {
		var o = $.extend({}, $.fn.multiselect.defaults, opts||{});
		
		return this.filter('select[multiple]:not(.mselect-hidden)').each(function() {
			var select = $(this).addClass('mselect-hidden').hide(), 
				size   = select.attr('size') > 0 ? select.attr('size') : o.size,
				items  = (function() {
					var str = '';
					
					select.children('option').each(function(i, option) {
						option = $(option);
						
						str += o.item
							.replace(/%value%/gi,  option.val())
							.replace(/%checked%/i, option.attr('selected') ? 'checked="checked"' : '')
							.replace(/%label%/gi,  option.html());
					})
					return str;
				})(),
				html = o.layout
						.replace(/%items%/gi, items)
						.replace(/%addText%/gi, o.addText)
						.replace(/%cancelText%/gi, o.cancelText)
						.replace(/%inputTitle%/gi, o.inputTitle),
				widget = $(html)
					.insertAfter(this)
					.delegate(':checkbox', 'change', function() {
						var checkbox = $(this);
						select.children('option[value="'+checkbox.val()+'"]').attr('selected', !!checkbox.attr('checked'));
					})
					,
				list = widget.is('.mselect-list') ? widget : widget.find('.mselect-list'),
				buttonAdd = widget.find('.mselect-button-add')
					.click(function(e) {
						e.preventDefault();
						o.toggleAddButton && buttonAdd.hide();
						container.show();
						input.focus();
						if (input.parents('.mselect-list').length) {
							list.scrollTop(list.height());
						}
					})
					.hover(function() {
						buttonAdd.children('.mselect-button-add-icon').toggleClass('ui-state-hover');
					}),
				container = widget.find('.mselect-input-container'),
				input  = container.find(':text.mselect-input')
					.change(function(e) {
						append(input.val());
					})
					.blur(function() {
						reset();
					})
					.bind($.browser.opera ? 'keypress' : 'keydown', function(e) {
						var c = e.keyCode;
						
						if (c == 13 || c == 27) {
							e.preventDefault();
							c == 13 ? input.change() : reset();
						}
					}),
				buttonCancel = container.find('.mselect-button-cancel')
					.mousedown(function(e) {
						input.val('');
					})
					.hover(function() {
						buttonCancel.toggleClass('ui-state-hover');
					}),
				append = function(v) {
					$.each(typeof(o.parse) == 'function' ? o.parse(v) : [$.trim(v)], function(i, v) {
						var item;
						
						if (v && !select.children('[value="'+v+'"]').length) {
							item = $(o.item.replace(/%value%|%label%/gi, v)).find(':checkbox').attr('checked', true).end();

							list.children('.mselect-list-item').length
								? list.children('.mselect-list-item:last').after(item)
								: list.prepend(item);

							select.append('<option value="'+v+'" selected="selected">'+v+'</option>');
						}
					});
					reset();
					list.scrollTop(list.height());
				},
				reset = function() {
					var ch = select.children();
					
					input.val('');
					container.hide();
					buttonAdd.show();
					
					list[list.children().length ? 'show' : 'hide']();
					if (ch.length >= size && !list.hasClass('mselect-fixed')) {
						list.height(list.children('.mselect-list-item:first').outerHeight(true) * size).addClass('mselect-fixed');
						if ($.browser.msie) {
							container.css('margin-right', '1em');
						}
					}
				};
				
				if (o.itemHoverClass) {
					list.delegate('.mselect-list-item', 'hover', function() {
						$(this).toggleClass(o.itemHoverClass);
					});
				}
				reset();

		}).end();
	}
	
	/**
	 * jQuery.multiselect default options
	 *
	 * @type  Object
	 */
	$.fn.multiselect.defaults = {
		/**
		 * Default widget layout template
		 *
		 * @type  String
		 */
		layout : '<div class="ui-widget ui-widget-content ui-corner-all mselect mselect-list">'
					+'%items%'
					+'<a href="#" class="mselect-button-add"><span class="ui-state-default mselect-button-add-icon"><span class="ui-icon ui-icon-plusthick"/></span>%addText%</a>'
					+'<div class="mselect-input-container">'
						+'<input type="text" class="ui-widget-content ui-corner-all mselect-input" title="%inputTitle%"/>'
						+'<a href="#" class="ui-state-default mselect-button-cancel" title="%cancelText%"><span class="ui-icon ui-icon-closethick"/></a>'
					+'</div>'
				+'</div>',
		/**
		 * List item layout template
		 *
		 * @type  String
		 */
		item : '<div  class="mselect-list-item"><label><input type="checkbox" value="%value%" %checked%/>%label%</label></div>',
		/**
		 * Text for "New value" button/link
		 *
		 * @type  String
		 */
		addText : 'New value',
		/**
		 * Text for "Cancel" icon in text field
		 *
		 * @type  String
		 */
		cancelText : 'Cancel',
		/**
		 * Text for input tooltip
		 *
		 * @type  String
		 */
		inputTitle : 'Separate values by space',
		/**
		 * Widget height, owerwrited by select "size" attribute
		 *
		 * @type  Number
		 */
		size : 5,
		/**
		 * Hover class for list items
		 *
		 * @type  String
		 */
		itemHoverClass : 'ui-state-hover',
		/**
		 * Hide "New value" button when text field is visible
		 *
		 * @type  Boolean
		 */
		toggleAddButton : true,
		/**
		 * Parse new list value and return values array
		 * By default - split value by space(s)
		 *
		 * @param   String  user input
		 * @return  Array
		 */
		parse : function(v) { return v.split(/\s+/) }
	}
	
})(jQuery);
