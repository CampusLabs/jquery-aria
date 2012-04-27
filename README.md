# jQuery ARIA

A jQuery plugin that adds support for [ARIA](http://www.w3.org/WAI/intro/aria) attributes.

This project uses [Semantic Versioning](http://semver.org/).

## Usage

###jQuery.aria(element, key, value)

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

###.aria(key, value)

An attached function that behaves the same as `jQuery.aria`. 

###jQuery.hasAria(element)

Determine whether an element has any jQuery `aria` attributes associated with it.
  
**Args:**
  
  * element - A DOM element to be checked for `aria` attributes.
  
**Returns:** Boolean
  
**Example:**
  
    <div id="foo" aria-owns="bar">...</div>
    
    jQuery.hasAria(document.getElementById('foo')); // => true
    jQuery.hasAria($('#foo')); // => true

###jQuery.removeAria(element [, name or list])

Removes `aria` attributes.
  
**Args:**
  
  * element - A DOM element to be checked for `aria` attributes.
  * name - A string naming the ARIA data to remove.
  * list - A string of space separated names or an Array of names.
  
**Returns:** jQuery
  
**Example:**
  
    <div id="foo" aria-owns="bar" aria-haspopup="true">...</div>
    
    jQuery.removeAria(document.getElementById('foo'), 'owns'); // removes the `aria-owns` attribute
    jQuery.removeAria($('#foo')); // removes all `aria` attributes

###.removeAria([name or list])

An attached function that behaves the same as `jQuery.removeAria`.

###.addRole(roleName)

Adds the specified role(s) to each of the set of matched elements.

**Args:**
  * roleName - A string of one or more space separated role names.

**Returns:** jQuery

**Example:**

    $('.menu').addRole('menu'); // add the "menu" role
    $('.menu').addRole('menu navigation'); // add the "menu" and "navigation" roles

###.hasRole(roleName)

Determine whether any of the matched elements are assigned the given role.

**Args:**
  * roleName - The role name to search for.

**Returns:** Boolean

**Example:**

    <li role="menuitem">Home</li>
    ...
    <li>Foo</li>

    $('li').hasRole('menuitem'); // => true
    $('li').hasRole('menu'); // => false

###.removeRole(roleName)

Remove a single role, multiple roles, or all roles from each element in the set of matched elements.

**Args:**
  * roleName - A string of one or more space separated role names.

**Returns:** jQuery

**Example:**

    $('.menu').removeRole(); // removes all roles
    $('.menu').removeRole('menu'); // remove the "menu" role
    $('.menu').removeRole('menu navigation'); // remove the "menu" and "navigation" roles

###.toggleRole(roleName[, switch])

Add or remove one or more roles from each element in the set of matched elements, depending on either the roles presence or the value of the switch argument.

**Args:**
  * roleName - A string of one or more space separated role names.
  * switch - A boolean value to determine whether the role should be added or removed.

**Returns:** jQuery

**Example:**

    $('.menu').toggleRole(); // remove all roles
    $('.menu').toggleRole('menu'); // toggle the "menu" role
    $('.menu').toggleRole('menu navigation'); // toggle the "menu" and "navigation" roles
    $('.menu').toggleRole('menu', true); // add the "menu" role
    $('.menu').toggleRole('menu', false); // remove the "menu" role

## License

This is licensed under the MIT license. The license itself can be found in the source.