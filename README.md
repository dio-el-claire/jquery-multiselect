jQuery.multiselect
==================

Overview
--------

jQuery plugin that converts `<select>` input with attribute *multiple* into group of checkboxes with ability to add new values.
Requires jQuery UI styles (jQuery UI JS is not required).

[Example](http://www.std42.ru/jquery-multiselect/)

How to use
----------

Here is simple example:

	<select multiple="on" size="5" name="color">
		<option value="white">White</option>
		<option value="black" selected="selected">Black</option>
		<option value="red">Red</option>
	</select>

	$('select[name="color"]').multiselect();

		or 

	var opts = { ... };
	$('select[name="color"]').multiselect(opts);


Options
-------

* `layout` - Widget layout template
* `item` - List item layout template
* `addText` - Text for *New value* button/link
* `addButton` -  Layout template for the add button so you can also disable then by using the option var opts = { addButton : "" }
* `cancelText` - Text for *Cancel* icon in text field
* `inputTitle` - Text for input tooltip
* `size` - How many items show in widget without scroll (used if select has no *size* attribute)
* `itemHoverClass` - Hover class for list items
* `toggleAddButton` - Hide *New value* button when text field is visible
* `parse` - Function. Parse new list value and return values array. By default - split value by space(s)


