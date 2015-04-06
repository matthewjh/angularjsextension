define([
  'background/model-impl'
  ], function (model) {
  'use strict';

  var modelImpl;

  beforeEach(function () {
    modelImpl = model.get();
  });

  describe('model', function () {
    it('should have a tabs property that is an empty object', function () {
      expect(modelImpl.tabs).toEqual({});
    });
  });
});
