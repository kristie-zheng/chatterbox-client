var globalApp;
class App {
  constructor(username) {
    this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
    // this.data;
    this.username = username;
    this.friends = [];
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
  
  renderMessage (obj) {
    console.log(obj);
    this.clearMessages(); 
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

  fetch (optionsObj) {
    var optionsObject = optionsObj || { order: '-createdAt', limit: 10};
    $.ajax(
      {
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        data: optionsObject,
        dataType: 'json',
        success: (data) => {
          this.data = data;
          console.log(data)
          var chatRooms = [];
          
          for (var i = 0; i < this.data.results.length; i++) {
            if (this.data.results[i].roomname !== undefined && chatRooms.indexOf(this.data.results[i].roomname) === -1) { // come back to this for regex  
            chatRooms.push(this.data.results[i].roomname)
            }
          }
          console.log(chatRooms)
          this.renderMessage(data);
        },
        error: (data) => {
          console.error('couldn\'t fetch', data);
        },
      }, optionsObject);
  }

/*
var arrayOfChatrooms = data.*/

  init () {
    //what does this method do
  }

  clearMessages () {
    $('#chats').empty();
    //should remove messages from the dom
  }

  // renderMessage () {
  //   //adds messages to the dom
  // }

  renderRoom() {
    //adds rooms to the dom
  }
}





// on doc load
// name myFunction
// that button.on click taget the text area and save to a variable 
// pass that to our send





let trim = (str) => {
  while (str[0] === ' ') {
    str = str.slice(1);
  }
  return str;
}

let getInfo = () => {
  // console.log(this);
  var username = this.userName;
  var msgContent = $("textarea").val();
  msgContent = trim(msgContent);
  var roomname = $('select').val();
  var object = {
    username: username,
    text: msgContent,
    roomname: roomname,
    createdAt: (new Date()).toString()
  };
  return object;
  // send(object);
};


$(document).ready(function () {
  var app = new App(userName);
  globalApp = app;
  console.log(globalApp)
  app.init();
  console.log(app);


});
//   // for (var i = 0; i < 5; i++) {
//   //   postMessage();
//   // }
//   // fetch();
// var app = new App();
// app.fetch();
// app.send();

// });
