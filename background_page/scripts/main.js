define([
  'bridge/messenger',
  'window',
  'config'
  ],
  function (messenger, window) {

    messenger.registerContextAsContentScript();
    messenger.onRecieve(function (payload) {
      window.alert(payload);
    });

    messenger.send('Content Script -> Inspected Page: hello!');

    return 'hello';
  });

