<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="<%= app_css_path %>">
  </head>
  <body>
    <div ng-include="'views/main.html'" ng-controller="MainCtrl"></div>
    <script type="text/javascript" src="<%= app_js_path %>"></script>
  </body>
</html>
