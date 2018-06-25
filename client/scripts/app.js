/*jshint esversion: 6 */

var App = function() {
  var obj = {};
  obj.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  obj.rooms = [];
  // obj.username = userName;
  obj.friends = [];
  _.extend(obj, App.methods);
  return obj;
};
  

App.methods = {
  init: function() {
    //what does this method do
  },

  send: function(message) {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log('this is', this);
        app.fetch({ order: '-createdAt', limit: 20}, message.roomname);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function (optionsObj, roomname) {
    if (optionsObj !== undefined) {
      optionsObj.where = {'roomname': roomname};
    }
    var optionsObj = optionsObj || { order: '-createdAt', limit: 20}; //, where: {roomname: //whatever was chosendropdown}
    $.ajax(
      {
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        data: optionsObj,
        dataType: 'json',
        success: (data) => {
          this.data = data;
          console.log(data);
          var chatRooms = [];
          
          for (var i = 0; i < this.data.results.length; i++) {
            if (this.data.results[i].roomname !== undefined && chatRooms.indexOf(this.data.results[i].roomname) === -1) { // come back to this for regex  
              chatRooms.push(this.data.results[i].roomname);
        
            }
          }
          this.rooms = chatRooms;
          console.log(this);
          if (roomname === undefined) {
            this.renderRoom(chatRooms);
          }
          this.renderMessage(data);
        },
        error: (data) => {
          console.error('couldn\'t fetch', data);
        },
      }, optionsObj);
  },

  clearMessages: function(value) {
    $('#chats').empty();
    if (value === 1) {
      $('select').empty();
    }
    //should remove messages from the dom
  },

  renderMessage: function(obj) {
    console.log('the obj is', obj);
    this.clearMessages(); 
    for (var i = 0; i < obj.results.length; i++) { // key === 0 or key === 5
      let id = obj.results[i].objectId;
      var username = obj.results[i].username;
      var roomname = obj.results[i].roomname;
      var text = obj.results[i].text;
      var createdAt = obj.results[i].createdAt;
      var usernamestr = `${username}`;
      var str = `Text: ${text}, Created At: ${createdAt}`;
      
      var $usernameDiv = $(`<div class = 'name'>  ${usernamestr}  </div>`); 
      var $messageDiv = $(`<div class = "message"> ${str} </div>`); 
      var $chatbubble = $('<div class = "chatbubble"></div>'); 
      $chatbubble.append($usernameDiv);
      $chatbubble.append($messageDiv);
      $('#chats').append($chatbubble);

      $('.name').on('click', function() {
        var friendName = $(this).text();
        console.log(this);
        if (app.friends.indexOf(friendName) === -1) {
          app.friends.push($(this).text());
          // $(`.${friendName}`).css('color', 'green');
          // var nameArr = $('.name').text().split(' ')
          $(`.name:contains(${friendName})`).css('font-weight', 'bold');   
        }
        console.log(app.friends);
      });
    }
  },

  renderRoom: function(arrayOfChatrooms) {
    this.clearMessages(1);
    for (var i = 0; i < arrayOfChatrooms.length; i++) {
      $('select').append(`<option value="${arrayOfChatrooms[i]}">${arrayOfChatrooms[i]}</option>`);
    }
    //adds rooms to the dom
  },


  // /*
  // var arrayOfChatrooms = data.*/



 

  // renderMessage () {
  //   //adds messages to the dom
  // }

  trim: function (str) {
    while (str[0] === ' ') {
      str = str.slice(1);
    }
    return str;
  },

  getInfo: function() {
    // console.log(this);
    var username = this.userName;
    var msgContent = $('textarea').val();
    msgContent = this.trim(msgContent);
    var roomname = $('select').val();
    var object = {
      username: username,
      text: msgContent,
      roomname: roomname,
      createdAt: (new Date()).toString()
    };
    return object;
    // send(object);
  },

  logger: function (value) {
    var roomSelection = $('select').val();
    this.fetch({ order: '-createdAt', limit: 20}, roomSelection);
  },

  createRoom: function () {
    var tempRoomName = $('#customRoomName').val();
    var fetchedStuff = fetch();
  }
  
};

var app = App();




// on doc load
// name myFunction
// that button.on click taget the text area and save to a variable 
// pass that to our send








$(document).ready(function () {
  // var app = new App(userName);
  // globalApp = app;

  app.fetch();
  // console.log(globalApp);
  app.init();
  // console.log(app);
  // write a function that will count how many differnt users have that room name

});