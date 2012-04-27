var elem;
beforeEach(function() {
  elem = $(document.createElement('div'));
});

describe('jQuery.aria(element, key, value)', function() {
  describe('no key or value are passed', function() {
    describe('elem contains no aria attibutes', function() {
      it('returns an empty object', function() {
        expect($.aria(elem)).toEqual({});
      });
    });

    describe('elem contains aria attibutes', function() {
      it('returns a hash of aria attibutes', function() {
        elem.attr('aria-haspopup', 'true');

        expect($.aria(elem)).toEqual({haspopup: 'true'});
      });
    });
  });

  describe('no value is passed', function() {
    describe('elem does not contain the attribute', function() {
      it('returns `undefined`', function() {
        expect($.aria(elem, 'haspopup')).toBeUndefined();
      });
    });

    describe('elem does contain the attribute', function() {
      it('returns the attibute value', function() {
        elem.attr('aria-haspopup', 'true');

        expect($.aria(elem, 'haspopup')).toEqual('true');
      });
    });
  });

  describe('both value and key are passed', function() {
    describe('elem does not contain the attribute', function() {
      it('adds the attribute', function() {
        expect($.aria(elem, 'haspopup', 'true')).toBeJqueryObject();
        expect(elem.attr('aria-haspopup')).toEqual('true');
      });
    });

    describe('elem does contain the attribute', function() {
      it('changes the attribute', function() {
        $.aria(elem, 'haspopup', 'true');
        $.aria(elem, 'haspopup', 'false');

        expect(elem.attr('aria-haspopup')).toEqual('false');
      });
    });
  });
});

describe('.aria(key, value)', function() {
  it('handles no variables', function() {
    expect(elem.aria()).toEqual($.aria(elem));
  });

  it('handles only key', function() {
    elem.attr('aria-haspopup', 'true');

    expect(elem.aria('haspopup')).toEqual($.aria(elem, 'haspopup'));
  });

  it('handles key and value', function() {
    elem_1 = $.aria(elem.clone(), 'haspopup', 'true');
    elem_2 = elem.clone().aria('haspopup', 'true');

    expect(elem_1.aria('haspopup')).toEqual($.aria(elem_2, 'haspopup'));
  });
});

describe('jQuery.hasAria(elem)', function() {
  describe('elem is not a jQuery element', function() {
    describe('elem has no aria attributes', function() {
      it('returns `false`', function() {
        elem = document.createElement('div');

        expect($.hasAria(elem)).toBe(false);
      });
    });

    describe('elem has aria attributes', function() {
      it('returns `true`', function() {
        elem = document.createElement('div');
        elem.setAttribute('aria-haspopup', 'true');

        expect($.hasAria(elem)).toBe(true);
      });
    });
  });

  describe('elem is a jQuery element', function() {
    describe('elem has no aria attributes', function() {
      it('returns `false`', function() {
        expect($.hasAria(elem)).toBe(false);
      });
    });

    describe('elem has aria attributes', function() {
      it('returns `true`', function() {
        elem.attr('aria-haspopup', 'true');

        expect($.hasAria(elem)).toBe(true);
      });
    });
  });
});

describe('jQuery.removeAria(element [, name or list])', function() {
  describe('only an element is passed', function() {
    it('removes all aria attributes', function() {
      elem.attr('aria-haspopup', 'true');
      elem.attr('aria-owns', 'foo');

      expect($.removeAria(elem)).toBeJqueryObject();
      expect($.aria(elem)).toEqual({});
    });
  });

  describe('a name is passed', function() {
    it('removes the specific aria attribute', function() {
      elem.attr('aria-haspopup', 'true');
      elem.attr('aria-owns', 'foo');

      expect($.removeAria(elem, 'owns')).toBeJqueryObject();
      expect($.aria(elem)).toEqual({haspopup: 'true'});
    });
  });

  describe('a list is passed', function() {
    describe('the list is a string of space separated names', function() {
      it('removes the specific aria attributes', function() {
        elem.attr('aria-haspopup', 'true');
        elem.attr('aria-owns', 'foo');
        elem.attr('aria-labelledby', 'bar');

        expect($.removeAria(elem, 'owns labelledby')).toBeJqueryObject();
        expect($.aria(elem)).toEqual({haspopup: 'true'});
      });
    });

    describe('the list is an Array', function() {
      it('removes the specific aria attributes', function() {
        elem.attr('aria-haspopup', 'true');
        elem.attr('aria-owns', 'foo');
        elem.attr('aria-labelledby', 'bar');

        expect($.removeAria(elem, ['owns', 'labelledby'])).toBeJqueryObject();
        expect($.aria(elem)).toEqual({haspopup: 'true'});
      });
    });
  });
});

describe('.removeAria([name] [, name])', function() {
  it('handles no variables', function() {
    elem.attr('aria-haspopup', 'true');

    expect(elem.removeAria()).toBeJqueryObject();
    expect($.aria(elem)).toEqual({});
  });

  it('handles a name', function() {
    elem.attr('aria-haspopup', 'true');
    elem.attr('aria-owns', 'foo');

    expect(elem.removeAria('owns')).toBeJqueryObject();
    expect($.aria(elem)).toEqual({haspopup: 'true'});
  });

  it('handles lists', function() {
    elem.attr('aria-haspopup', 'true');
    elem.attr('aria-owns', 'foo');
    elem.attr('aria-labelledby', 'bar');

    expect(elem.removeAria('owns labelledby')).toBeJqueryObject();
    expect($.aria(elem)).toEqual({haspopup: 'true'});
  });
});
