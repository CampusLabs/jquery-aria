// Copyright (c) 2013 OrgSync, Inc.
// 
// MIT License
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// version: 2.1.1
// homepage: https://github.com/orgsync/jquery-aria
// dependency: jQuery, ~> 1.7.1

(function($) {
  $.extend({
    // Public: Gets and sets ARIA attributes.
    //
    // elem  - The DOM or jQuery element.
    // key   - The String naming the ARIA attribute to get or set (default: null).
    // value - The value used to set the ARIA attribute (default: null).
    //
    // Examples
    //
    //   // get all
    //   jQuery.aria(element)
    //   # => {owns: 'foo', describedby: 'bar'}
    //
    //   // get
    //   jQuery.aria(element, 'owns')
    //   # => 'foo'
    //
    //   // set
    //   jQuery.aria(element, 'owns', 'baz')
    //   # => jQuery(element)
    //
    // Returns an Object.
    aria: function(elem, key, value) {
      elem = $(elem);

      if (arguments.length === 1) {
        var attributes = {};
        $.each(elem[0].attributes, function(i, value) {
          if (value.nodeName.match(/^aria-/)) {
            attributes[value.nodeName.replace(/^aria-/, '')] = value.nodeValue;
          }
        });

        return attributes;
      } else if (arguments.length === 2) {
        return elem.attr('aria-' + key);
      } else {
        return elem.attr('aria-' + key, value);
      }
    },

    // Public: Removes ARIA attributes.
    //
    // elem - The DOM or jQuery element.
    // key  - The String naming the ARIA attribute to remove (default: null).
    //
    // Examples
    //
    //   jQuery.removeAria(element)
    //   # => jQuery(element)
    //
    //   jQuery.removeAria(element, 'owns')
    //   # => jQuery(element)
    //
    // Returns a jQuery Object.
    removeAria: function(elem, keys) {
      elem = $(elem);

      if (arguments.length === 1) {
        keys = $.map(elem.aria(), function(_, k) {return k;});
      } else if (!$.isArray(keys)) {
        keys = keys.split(/\s+/);
      }

      for (var i = keys.length - 1; i >= 0; --i) {
        elem.removeAttr('aria-' + keys[i]);
      }

      return elem;
    },

    // Public: Checks for the existance of an ARIA attribute.
    //
    // elem - The DOM or jQuery element.
    //
    // Examples
    //
    //   jQuery.hasAria(element, 'owns')
    //   # => true
    //
    // Returns a Boolean.
    hasAria: function(elem) {
      elem = elem[0] || elem;

      for (var i = elem.attributes.length - 1; i >= 0; --i) {
        if (/^aria-/.test(elem.attributes[i].nodeName)) {
          return true;
        }
      }

      return false;
    }
  });

  $.fn.extend({
    // Public: Gets and sets ARIA attributes.
    //
    // key   - The String naming the ARIA attribute to get or set (default: null).
    // value - The value used to set the ARIA attribute (default: null).
    //
    // Examples
    //
    //   // get all
    //   element.aria()
    //   # => {owns: 'foo', describedby: 'bar'}
    //
    //   // get
    //   element.aria('owns')
    //   # => 'foo'
    //
    //   // set
    //   element.aria('owns', 'baz')
    //   # => element
    //
    // Returns an Object.
    aria: function() {
      var i, args = $.makeArray(arguments);

      if (arguments.length === 2) {
        for(i = this.length - 1; i >= 0; --i) {
          $.aria.apply($, [this[i]].concat(args));
        }

        return this;
      } else {
        return $.aria.apply($, [this].concat(args));
      }
    },

    // Public: Removes ARIA attributes.
    //
    // key - The String naming the ARIA attribute to remove (default: null).
    //
    // Examples
    //
    //   elements.removeAria()
    //   # => elements
    //
    //   element.removeAria('owns')
    //   # => element
    //
    // Returns the element(s).
    removeAria: function() {
      var i, args = $.makeArray(arguments);

      for(i = this.length - 1; i >= 0; --i) {
        $.removeAria.apply($, [this[i]].concat(args));
      }

      return this;
    },

    // Public: Adds roles to the ARIA "role" attribute.
    //
    // value - The String or Function returning a String of space separated
    //         roles. Functions are provided the index position of the element
    //         in the set and the existing role name(s) as arguments. Within the
    //         function, `this` refers to the current element in the set.
    //
    // Examples
    //
    //   element.addRole('menu navigation')
    //   # => element
    //
    //   elements.addRole(function(index, current_roles) {
    //     return 'menu navigation';
    //   })
    //   # => elements
    //
    // Returns the element(s).
    addRole: function(value) {
      var roles, i, elem, current_roles, j;

      if ($.isFunction(value)) { 
        return this.each(function(i) { 
          elem = $(this);
          elem.addRole(value.call(this, i, elem.attr('role')));
        }); 
      }

      if (value && typeof value === 'string' && value !== '') {
        roles = value.split(/\s+/);

        for (i = this.length - 1; i >= 0; --i) {
          elem = this[i];
          current_roles = elem.getAttribute('role');

          if (current_roles && current_roles !== '') {
            current_roles = ' ' + current_roles + ' ';

            for (j = 0, roles_length = roles.length; j < roles_length; ++j) {
              if (current_roles.indexOf(' ' + roles[j] + ' ') < 0) {
                current_roles += roles[j] + ' ';
              }
            }

            elem.setAttribute('role', current_roles.trim());
          } else {
            elem.setAttribute('role', value);
          }
        }
      }

      return this;
    },

    // Public: Checks for the existance of a role.
    //
    // role_name - The String containing a role name.
    //
    // Examples
    //
    //   element.hasrole('menu')
    //   # => false
    //
    //   jQuery('div').hasrole('menu')
    //   # => true
    //
    // Returns a Boolean.
    hasRole: function(role_name) {
      var i, roles;

      for (i = this.length - 1; i >= 0; --i) {
        roles = this[i].getAttribute('role');

        if (roles && roles !== '') {
          roles = ' ' + roles + ' ';

          if (roles.indexOf(' ' + role_name + ' ') >= 0) {
            return true;
          }
        }
      }

      return false;
    },

    // Public: Removes roles from the ARIA "role" attribute.
    //
    // value - The String or Function returning a String of space separated
    //         roles. Functions are provided the index position of the element
    //         in the set and the existing role name(s) as arguments. Within the
    //         function, `this` refers to the current element in the set
    //         (default: null).
    //
    // Examples
    //
    //   // remove all roles
    //   element.removeRole()
    //   # => element
    //
    //   element.removeRole('menu navigation')
    //   # => element
    //
    //   elements.removeRole(function(index, current_roles) {
    //     return 'menu navigation';
    //   })
    //   # => elements
    //
    // Returns the element(s).
    removeRole: function(value) {
      var i, elem, current_roles, roles, j;

      if (arguments.length === 0) {
        for (i = this.length - 1; i >= 0; --i) {
          this[i].setAttribute('role', '');
        }

        return this;
      }

      if ($.isFunction(value)) { 
        return this.each(function(i) { 
          elem = $(this);
          elem.removeRole(value.call(this, i, elem.attr('role')));
        }); 
      }

      if (value && typeof value === 'string' && value !== '') {
        roles = value.split(/\s+/);

        for (i = this.length - 1; i >= 0; --i) {
          elem = this[i];

          current_roles = elem.getAttribute('role');

          if (current_roles && current_roles !== '') {
            current_roles = ' ' + current_roles + ' ';

            for (j = roles.length - 1; j >= 0; --j) {
              current_roles = current_roles.replace(' ' + roles[j] + ' ', ' ');
            }

            elem.setAttribute('role', current_roles.replace(/\s+/, ' ').trim());
          }
        }
      }

      return this;
    },

    // Public: Adds or removes roles from the ARIA "role" attribute.
    //
    // value - The String or Function returning a String of space separated
    //         roles. Functions are provided the index position of the element
    //         in the set, the existing role name(s) and the value of the `add`
    //         argument provided in the original function call as arguments.
    //         Within the function, `this` refers to the current element in the
    //         set (default: null).
    // add   - The Boolean indicating the forced addition or removal of roles.
    //         Passing `true` forces the roles to be added. Passing `false`
    //         forces the roles to be removed (default: null).
    //
    // Examples
    //
    //   // add "menu" to all roles
    //   element.toggleRole('menu', true)
    //   # => element
    //
    //   // remove "menu" from all roles
    //   element.toggleRole('menu', false)
    //   # => element
    //
    //   // toggle "menu" role
    //   elements.toggleRole('menu')
    //   # => elements
    //
    //   elements.toggleRole(function(index, current_roles, add) {
    //     return 'menu navigation';
    //   })
    //   # => elements
    //
    // Returns the element(s).
    toggleRole: function(value, add) {
      if ($.isFunction(value)) { 
        return this.each(function(i) { 
          elem = $(this);
          elem.toggleRole(value.call(this, i, elem.attr('role'), add), add);
        }); 
      }

      if (add === true) {
        this.addRole(value);
      } else if (add === false) {
        this.removeRole(value);
      } else {
        var current_roles, roles, i;

        current_roles = ' ' + this.attr('role') + ' ';
        roles = value.split(/\s+/);

        for (i = roles.length - 1; i >= 0; --i) {
          current_roles.indexOf(' ' + roles[i] + ' ') < 0 ?
            this.addRole(roles[i]) :
            this.removeRole(roles[i]);
        }
      }

      return this;
    }
  });
})(jQuery);
