System.registerModule("ui/main.spec.js", [], function() {
  "use strict";
  var __moduleName = "ui/main.spec.js";
  var main = System.get("ui/main.js").default;
  describe('main', (function() {
    it('should should export 6', (function() {
      expect(main).toBe(6);
    }));
  }));
  return {};
});
//# sourceURL=ui/main.spec.js
