define([
  'bridge/Messenger',
  'window',
  'config'
  ],
  function (Messenger, window) {

    var messenger = new Messenger(Messenger.contexts.CONTENT_SCRIPT);

    messenger.onRecieve(function (payload) {
      window.alert(payload);
    });

    messenger.send('Content Script -> Inspected Page: hello!');

    return 'hello';
  });

