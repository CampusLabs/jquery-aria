var elem, elems;
beforeEach(function() {
  elem = $(document.createElement('div'));
  elems = $.makeArray($(document.createElement('div')), $(document.createElement('div')));
});

describe('.addRole(value)', function() {
  describe('value', function() {
    describe('is an empty String', function() {
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

    describe('is a Function', function() {
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

describe('.removeRole([value])', function() {
  beforeEach(function() {
    elem.attr('role', 'menu navigation');
  });

  describe('value', function() {
    describe('is not provided', function() {
      it('removes all roles', function() {
        expect(elem.removeRole()).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('');
      });
    });

    describe('is a single role', function() {
      it('removes a role', function() {
        expect(elem.removeRole('navigation')).toBeJqueryObject();
        expect(elem.attr('role')).not.toMatch('navigation');
      });
    });

    describe('is a space separated list of roles', function() {
      it('removes the roles', function() {
        elem.attr('role', elem.attr('role') + ' search');

        expect(elem.removeRole('navigation menu')).toBeJqueryObject();
        expect(elem.attr('role')).toEqual('search');
      });
    });

    describe('is a Function', function() {
      it('removes the roles', function() {
        elems.first().addRole('item-0');
        elems.last().addRole('item-1');

        expect(elems.removeRole(function(i) {
          return 'item-' + i;
        })).toBeJqueryObject();
        expect(elems.first().attr('role')).toEqual('');
        expect(elems.last().attr('role')).toEqual('');
      });
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

describe('.toggleRole(value[, switch])', function() {
  beforeEach(function() {
    elem.attr('role', 'menu navigation');
  });

  describe('value', function() {
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

    describe('is a Function', function() {
      it('adds or removes the roles', function() {
        elems.addRole('menu navigation');
        elems.first().addRole('item-0');

        expect(elems.toggleRole(function(i, current_roles) {
          return current_roles + ' search item-' + i;
        })).toBeJqueryObject();
        expect(elems.first().attr('role')).toEqual('search');
        expect(elems.last().attr('role')).toEqual('item-1 search');
      });
    });
  });

  describe('switch', function() {
    describe('is `true`', function() {
      describe('with value as a String', function() {
        it('adds the role', function() {
          elem.toggleRole('search', true);

          expect(elem.attr('role')).toMatch('search');
        });
      });

      describe('with value as a Function', function() {
        it('adds the role', function() {
          elem.addRole('menu navigation');

          elem.toggleRole(function(i, current_roles, add) {
            if (add) {
              return current_roles + ' search item-' + i;
            } else {
              return '';
            }
          }, true);

          expect(elem.attr('role')).toEqual('menu navigation search item-0');
        });
      });
    });

    describe('is `false`', function() {
      describe('with value as a String', function() {
        it('removes the role', function() {
          elem.toggleRole('navigation', false);

          expect(elem.attr('role')).not.toMatch('navigation');
        });
      });

      describe('with value as a Function', function() {
        it('removes the role', function() {
          elem.addRole('menu navigation item-0');

          elem.toggleRole(function(i, current_roles, add) {
            if (add) {
              return '';
            } else {
              return current_roles.split(' ')[0] + ' item-' + i;
            }
          }, false);

          expect(elem.attr('role')).toEqual('navigation');
        });
      });
    });
  });
});
