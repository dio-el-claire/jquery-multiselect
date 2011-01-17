jQuery-multiselect plugin
=========================

Overview
--------

jQuery plugin. Convert select input with attribute multiple into checkboxes group and allow to add new values.
Required jquery.ui styles (jquery.ui itself not required)

[Example](http://std42.ru/jquery-multiselect/)

How to use
----------

Here’s a simple example:

	<select multiple="on" size="5" name="color">
			<option value="white">White</option>
			<option value="black" selected="selected">Black</option>
			<option value="red">Red</option>
		</select>

		$('select[name="color"]').multiselect();

		or 

		var opts = { ... }
		$('select[name="color"]').multiselect(opts);
	
	
Options
-------

* `layout` - Default widget layout template
* `item` - List item layout template
* `addText` - Text for "New value" button/link
* `cancelText` - Text for "Cancel" icon in text field
* `inputTitle` - Text for input tooltip
* `size` - How many items show in widget without scroll. (Used if select has not "size" attribute)
* `itemHoverClass` - Hover class for list items
* `toggleAddButton` - Hide "New value" button when text field is visible
* `parse` - Function. Parse new list value and return values array. By default - split value by space(s)


