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


var parse = (obj) => {
  console.log(obj);

  for (var i = 0; i < obj.results.length; i++) { // key === 0 or key === 5
    var id = obj.results[i].objectId;
    var username = obj.results[i].username;
    var roomname = obj.results[i].roomname;
    var text = obj.results[i].text;
    var createdAt = obj.results[i].createdAt;
    var str = `Username: ${username}, Text: ${text}, Created At: ${createdAt}`;
    var $div = $(`<div class = "message"> ${str} </div>`);
    $('body').append($div);
  }
};

var optionsObject = { order: '-createdAt', limit: 20};

var fetch = () => { 
  $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', optionsObject, function(data) {
    parse(data);
  });
};

// var parse = (obj) => {
//   console.log(obj);
//   for (var i = 0; i < obj.results.length; i++) { // key === 0 or key === 5
//     var id = obj.results[i].objectId;
//     var username = obj.results[i].username;
//     var roomname = obj.results[i].roomname;
//     var text = obj.results[i].text;
//     var createdAt = obj.results[i].createdAt;
//     var str = `Username: ${username}, Text: ${text}, Created At: ${createdAt}`;
//     var $div = $(`<div>${str}</div>`)
//     $('body').append($div);
//   }
// }

$(document).ready(function () {
  for (var i = 0; i < 5; i++) {
    postMessage();
  }
  fetch();
});
