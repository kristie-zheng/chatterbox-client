var message = {
  username: '******************************************************************',
  text: 'checking if this shows up',
  roomname: 'whatever'
};

var postMessage = () => {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

var optionsObject = { order: '-createdAt'};

var fetch = () => { 
  $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', optionsObject, function(data) {
    console.log(data);
  });
};

$(document).ready(function () {
  for (var i = 0; i < 1000; i++) {
    setTimeout(fetch, 100);
    if (i % 50 === 0) {
      postMessage();
    }
  }

  
  

});
