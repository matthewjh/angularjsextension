{
  "name": "AngularJS Extension",
  "description": "Pithy description (132 characters or less, no HTML)",
  "version": "0.0.0.1",
  "manifest_version": 2,
  "minimum_chrome_version": "10.0",
  "devtools_page": "/app/devtools_page.html",
  "background": {
    "scripts": ["background.js"]
  },
  "content_scripts": [
  {
    "matches": ["<all_urls>"],
    "run_at": "document_start",
    "js" : ["content_scripts/ng-defer-bootstrap.js"]
  },
  {
    "matches": ["<all_urls>"],
    "run_at": "document_end",
    "js" : ["content_scripts/inject-bridge.js", "<%= main_content_script_js_path %>"]
  }]
}
