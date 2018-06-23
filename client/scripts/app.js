class App {
  constructor() {
    this.optionsObject = { order: '-createdAt', limit: 20};
  }

  postMessage() {
    $.ajax({
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
  }
  parse (obj) {
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
  }
  fetch () { 
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', this.optionsObject, function(data) {
      parse(data);
    });
  }

}
















// $(document).ready(function () {
//   // for (var i = 0; i < 5; i++) {
//   //   postMessage();
//   // }
//   // fetch();
var app = new App();

// });
