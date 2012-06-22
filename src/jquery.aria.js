// Copyright (c) 2012 OrgSync, Inc.
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

// version: 2.1.0
// homepage: https://github.com/orgsync/jquery-aria
// dependency: jQuery, ~> 1.7.1

(function($) {
  $.extend({
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
    aria: function() {
      var args = $.makeArray(arguments);

      if (arguments.length === 2) {
        for(var i = this.length - 1; i >= 0; --i) {
          $.aria.apply($, [this[i]].concat(args));
        }

        return this;
      } else {
        return $.aria.apply($, [this].concat(args));
      }
    },

    removeAria: function() {
      var args = $.makeArray(arguments);

      for(var i = this.length - 1; i >= 0; --i) {
        $.removeAria.apply($, [this[i]].concat(args));
      }

      return this;
    },

    addRole: function(roleName) {
      if (roleName !== '') {
        for (var i = this.length - 1; i >= 0; --i) {
          var elem = this[i];
          var current_roles = elem.getAttribute('role');

          if (current_roles === null) {
            elem.setAttribute('role', roleName);
          } else {
            var roles = roleName.split(/\s+/);
            current_roles = ' ' + current_roles + ' ';

            for (var j = 0, roles_length = roles.length; j < roles_length; ++j) {
              if(current_roles.indexOf(' ' + roles[j] + ' ') === -1) {
                current_roles += roles[j] + ' ';
              }
            }

            elem.setAttribute('role', current_roles.trim());
          }
        }
      }

      return this;
    },

    hasRole: function(roleName) {
      for (var i = this.length - 1; i >= 0; --i) {
        var roles = this[i].getAttribute('role');

        if (roles !== null) {
          roles = ' ' + roles + ' ';

          if (roles.indexOf(' ' + roleName + ' ') !== -1) {
            return true;
          }
        }
      }

      return false;
    },

    removeRole: function(roleName) {
      for (var i = this.length - 1; i >= 0; --i) {
        var elem = this[i];

        if (arguments.length === 0) {
          elem.setAttribute('role', '');
        } else {
          var current_roles = elem.getAttribute('role');

          if (current_roles !== null) {
            current_roles = ' ' + current_roles + ' ';
            var roles = roleName.split(/\s+/);

            for (var j = roles.length - 1; j >= 0; --j) {
              current_roles = current_roles.replace(' ' + roles[j] + ' ', ' ');
            }

            elem.setAttribute('role', current_roles.replace(/\s+/, ' ').trim());
          }
        }
      }

      return this;
    },

    toggleRole: function(roleName, addRole) {
      if (addRole === true) {
        this.addRole(roleName);
      } else if (addRole === false) {
        this.removeRole(roleName);
      } else {
        var current_roles = ' ' + this.attr('role') + ' ';
        var roles = roleName.split(/\s+/);

        for (var i = roles.length - 1; i >= 0; --i) {
          current_roles.indexOf(' ' + roles[i] + ' ') === -1 ?
            this.addRole(roles[i]) :
            this.removeRole(roles[i]);
        }
      }

      return this;
    }
  });
})(jQuery);
