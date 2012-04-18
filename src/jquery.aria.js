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

// https://github.com/orgsync/jquery-aria

// version 1.0.0

(function($) {
  $.extend({
    aria: function(elem, key, value) {
      elem = $(elem);

      if (key === undefined && value === undefined) {
        attributes = {};
        $.each(elem[0].attributes, function(i, value) {
          if (value.nodeName.match(/^aria-/)) {
            attributes[value.nodeName.replace(/^aria-/, '')] = value.nodeValue;
          }
        });

        return attributes;
      } else {
        return elem.attr('aria-' + key, value);
      }
    },

    removeAria: function(elem, key) {
      elem = $(elem);

      if (key === undefined) {
        $.each(elem[0].attributes, function(i, value) {
          if (value.nodeName.match(/^aria-/)) {
            elem.removeAttr('aria-' + value.nodeName.replace(/^aria-/, ''));
          }
        });

        return elem;
      } else {
        return elem.removeAttr('aria-' + key);
      }
    },

    hasAria: function(elem) {
      elem = elem[0] || elem;
      for (var i = elem.attributes.length - 1; i >= 0; --i) {
        if (elem.attributes[i].nodeName.match(/^aria-/)) {
          return true;
        }
      }

      return false;
    }
  });

  $.fn.extend({
    aria: function(key, value) {
      return $.aria(this, key, value);
    },

    removeAria: function(key) {
      return $.removeAria(this, key);
    }
  });
})(jQuery);
