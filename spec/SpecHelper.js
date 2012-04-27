beforeEach(function() {
  this.addMatchers({
    toBeJqueryObject: function(expected) {
      var actual = this.actual;

      this.message = function () {
        return 'Expected ' + actual + ' to be a jQuery object.';
      }

      return actual && actual.jquery;
    }
  });
});
