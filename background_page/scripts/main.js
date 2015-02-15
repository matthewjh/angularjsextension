define([
  'bridge/messenger',
  'window',
  'config'
  ],
  function (messenger, window) {

    messenger.onRecieve(function (event) {
      window.alert(event);
    });

    return 'hello';
  });

