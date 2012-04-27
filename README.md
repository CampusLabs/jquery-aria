# jQuery ARIA

A jQuery plugin that adds support for [ARIA](http://www.w3.org/WAI/intro/aria) attributes.

This project uses [Semantic Versioning](http://semver.org/).

## Usage

###jQuery.aria(element, key, value)###
  Sets and returns `aria` attribute data.
  
  **Args:**
  
  * element - A DOM element to be checked for `aria` attributes.
  * key - A string naming the ARIA data to set.
  * value - The new `aria` attribute value.
  
  **Returns:** Object
  
  **Example:**
  
    <div id="foo" aria-owns="bar">...</div>
    
    jQuery.aria(document.getElementById('foo'), 'owns'); // => "bar"
    jQuery.aria(); // => {'owns': 'bar'}
    jQuery.aria($('#foo'), 'owns', 'baz'); // sets `aria-owns` to "baz"

###.aria(key, value)###
  An attached function that behaves the same as `jQuery.aria`. 

###jQuery.hasAria(element)####
  Determine whether an element has any jQuery `aria` attributes associated with it.
  
  **Args:**
  
  * element - A DOM element to be checked for `aria` attributes.
  
  **Returns:** Boolean
  
  **Example:**
  
    <div id="foo" aria-owns="bar">...</div>
    
    jQuery.hasAria(document.getElementById('foo')); // => true
    jQuery.hasAria($('#foo')); // => true

###jQuery.removeAria(element [, name])###
  Removes `aria` attributes.
  
  **Args:**
  
  * element - A DOM element to be checked for `aria` attributes.
  * name - A string naming the ARIA data to remove.
  
  **Returns:** jQuery
  
  **Example:**
  
    <div id="foo" aria-owns="bar" aria-haspopup="true">...</div>
    
    jQuery.removeAria(document.getElementById('foo'), 'owns'); // removes the `aria-owns` attribute
    jQuery.removeAria($('#foo')); // removes all `aria` attributes

###.removeAria([name])###
  An attached function that behaves the same as `jQuery.removeAria`.

## License

This is licensed under the MIT license. The license itself can be found in the source.