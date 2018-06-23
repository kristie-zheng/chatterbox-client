class App {
  constructor() {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    this.data;
  }
  

  send(message) {
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
      let id = obj.results[i].objectId;
      var username = obj.results[i].username;
      var roomname = obj.results[i].roomname;
      var text = obj.results[i].text;
      var createdAt = obj.results[i].createdAt;
      var str = `Username: ${username}, Text: ${text}, Created At: ${createdAt}`;
      var $div = $(`<div class = "message"> ${str} </div>`);
      $('#chats').append($div);
    }
  }

  fetch () {
    var optionsObject = { order: '-createdAt', limit: 20};
    $.ajax(
      {
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        data: optionsObject,
        dataType: 'json',
        success: (data) => {
          this.parse(data);
        },
        error: (data) => {
          console.error('couldn\'t fetch', data);
        },
      }, this.optionsObject);
  }


  init() {
    //what does this method do
  }

  clearMessages () {
    //should remove messages from the dom
  }

  renderMessage() {
    //adds messages to the dom
  }

  renderRoom() {
    //adds rooms to the dom
  }
}





// on doc load
// name myFunction
// that button.on click taget the text area and save to a variable 
// pass that to our send








let getInfo = (usr) => {
  var username = usr;
  var a = $("textarea").val();
  while (a[0] === ' ') {
    a = a.slice(1);
  }
  console.log(a);
  var msgContent = $("textarea").val();
  var roomname = $('select').val();
  return {
    username: username,
    text: msgContent,
    roomname: roomname,
    createdAt: (new Date()).toString()
  };
};


// $(document).ready(function () {
//   // for (var i = 0; i < 5; i++) {
//   //   postMessage();
//   // }
//   // fetch();
var app = new App();
app.fetch();
app.send();

// });
