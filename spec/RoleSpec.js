var elem, elems;
beforeEach(function() {
  elem = $(document.createElement('div'));
  elems = $.makeArray($(document.createElement('div')), $(document.createElement('div')));
});

describe('.addRole(value)', function() {
  describe('value', function() {
    describe('is an empty string', function() {
      it('does nothing', function() {
        expect(elem.addRole('')).toBeJqueryObject();
        expect(elem.attr('role')).toBeUndefined();
      });
    });

    describe('is a single role', function() {
      it('adds the role', function() {
        expect(elem.addRole('menu')).toBeJqueryObject();
        expect(elem.addRole('navigation')).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('menu navigation');
      });

      it('does not add the role twice', function() {
        elem.addRole('menu');
        elem.addRole('menu');

        expect(elem.attr('role')).toEqual('menu');
      });
    });

    describe('is a space separated list of roles', function() {
      it('adds the roles', function() {
        expect(elem.addRole('menu navigation')).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('menu navigation');
      });
    });

    describe('is a function', function() {
      it('adds the roles', function() {
        expect(elems.addRole(function(i) {
          return 'item-' + i;
        })).toBeJqueryObject();
        expect(elems.first().attr('role')).toEqual('item-0');
        expect(elems.last().attr('role')).toEqual('item-1');
      });
    });
  });

  it('handles a list of elements', function() {
    elems.addRole('menu');
    elems.last().addRole('navigation');
    expect(elems.first().attr('role')).toEqual('menu');
    expect(elems.last().attr('role')).toEqual('menu navigation');
  });
});

describe('.hasRole(roleName)', function() {
  it('has the role name', function() {
    elem.attr('role', 'menuitem navigation');

    expect(elem.hasRole('menuitem')).toBe(true);
  });

  it('does not have the role name', function() {
    expect(elem.hasRole('menu')).toBe(false);

    elem.attr('role', 'menuitem navigation');

    expect(elem.hasRole('menu')).toBe(false);
  });

  it('handles a list of elements', function() {
    elems.last().attr('role', 'menu');

    expect(elems.hasRole('menu')).toBe(true);
  });
});

describe('.removeRole([roleName])', function() {
  beforeEach(function() {
    elem.attr('role', 'menu navigation');
  });

  describe('no roleName is provided', function() {
    it('removes all roles', function() {
      expect(elem.removeRole()).toBeJqueryObject();
      expect(elem.attr('role')).toEqual('');
    });
  });

  describe('roleName is a single role', function() {
    it('removes the role', function() {
      expect(elem.removeRole('navigation')).toBeJqueryObject();
      expect(elem.attr('role')).not.toMatch('navigation');
    });
  });

  describe('roleName is a space separated list of roles', function() {
    it('removes the roles', function() {
      elem.attr('role', elem.attr('role') + ' search');

      expect(elem.removeRole('navigation menu')).toBeJqueryObject();
      expect(elem.attr('role')).toEqual('search');
    });
  });

  it('handles a list of elements', function() {
    elems.attr('role', 'menu');
    elems.last().attr('role', 'menu navigation');
    expect(elems.removeRole('menu')).toBeJqueryObject();
    expect(elems.attr('role')).toEqual('');
    expect(elems.last().attr('role')).toEqual('navigation');
  });
});

describe('.toggleRole(roleName[, switch])', function() {
  beforeEach(function() {
    elem.attr('role', 'menu navigation');
  });

  describe('roleName', function() {
    describe('is a single role', function() {
      it('adds or removes the role', function() {
        expect(elem.toggleRole('navigation')).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('menu');
      });
    });

    describe('is a space separated list of roles', function() {
      it('adds or removes the roles', function() {
        expect(elem.toggleRole('navigation menu search')).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('search');
      });
    });
  });

  describe('switch', function() {
    describe('is `true`', function() {
      it('adds the role', function() {
        elem.toggleRole('search', true);

        expect(elem.attr('role')).toMatch('search');
      });
    });

    describe('is `false`', function() {
      it('removes the role', function() {
        elem.toggleRole('navigation', false);

        expect(elem.attr('role')).not.toMatch('navigation');
      });
    });
  });
});
