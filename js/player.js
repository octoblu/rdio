'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});

connection.on('ready', function(data){
  console.log('ready', data);
  connection.on('message', function(message){
    console.log(message.topic, message);
    if (message.topic === 'add-playback-token') {
      $('#api').rdio(message.payload.token);
      return;
    }

    if (message.topic === 'play') {
      if (message.payload.key) {
        $('#api').rdio().play(message.payload.key);
        $('#api').rdio().setVolume(1);
        return;
      }
      $('#api').rdio().play();
    }

    if (message.topic === 'pause') {
      $('#api').rdio().pause();
    }

  });
});
