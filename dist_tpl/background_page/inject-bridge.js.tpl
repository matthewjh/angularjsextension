(function () {
  var e = document.createElement('script');

  e.type = "text/javascript";
  e.appendChild(document.createTextNode('(' + (<%= bridge_bootstrap_fn %>).toString() + ')()'));
  document.head.appendChild(e);
})();

