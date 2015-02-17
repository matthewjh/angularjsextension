{
  "name": "AngularJS Extension",
  "description": "Pithy description (132 characters or less, no HTML)",
  "version": "0.0.0.1",
  "manifest_version": 2,
  "minimum_chrome_version": "10.0",
  "devtools_page": "/app/devtools_page.html",
  "content_scripts": [
  {
    "matches": ["<all_urls>"],
    "run_at": "document_start",
    "js" : ["background_page/ng-defer-bootstrap.js"]
  },
  {
    "matches": ["<all_urls>"],
    "run_at": "document_end",
    "js" : ["background_page/inject-bridge.js", "<%= bg_js_path %>"]
  }]
}
