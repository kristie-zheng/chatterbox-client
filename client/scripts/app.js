/*jshint esversion: 6 */

var App = function() {
  var obj = {};
  obj.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  obj.rooms = [];
  obj.username = name;
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
        app.fetch(message.roomname);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function (roomname) {
    var optionsObj = { order: '-createdAt', limit: 20}; 
    if (roomname !== undefined) {
      optionsObj.where = {'roomname': roomname};
    }
    $.ajax(
      {
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
        type: 'GET',
        data: optionsObj,
        dataType: 'json',
        success: (data) => {
          this.data = data;
          console.log('here is the fetched data', data);
          // var chatRooms = [];
          
          // for (var i = 0; i < this.data.results.length; i++) {
          //   if (this.data.results[i].roomname !== undefined && chatRooms.indexOf(this.data.results[i].roomname) === -1) { // come back to this for regex  
          //     chatRooms.push(this.data.results[i].roomname);
        
          //   }
          // }
          // this.rooms = chatRooms;
          // console.log(this);
          // if (roomname === undefined) {
          //   this.renderRoom(chatRooms);
          // }
          for (var i = 0; i < data.results.length; i++) {
            this.renderMessage(data.results[i]);
            if (_.contains(this.rooms, data.results[i].roomname) === false) {
              this.rooms.push(data.results[i].roomname); 
            }
          }
          this.selectOtherRoom(this.rooms);
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

  renderMessage: function(message) {
    var username;
    if (message.username === undefined) {
      username = 'unknown user';
    } else {
      username = message.username;
    }
    var roomname = message.roomname;
    var text = message.text;
    var timestamp = message.createdAt;
    var usernamestr = `${username}`;
    var str = `Text: ${text}`;
    var $usernameDiv = $(`<div class = 'username'>  ${usernamestr} </div>`); 
    var $messageDiv = $(`<div class = "message"> ${str} at , ${timestamp} </div>`); 
    var $chatbubble = $('<div class = "chatbubble"></div>'); 
    $chatbubble.append($usernameDiv);
    $chatbubble.append($messageDiv);
    $('#chats').append($chatbubble);
  },

  renderRoom: function(room) {
    $('.roomSelect').append(`<option value="${room}">${room}</option>`);
    // this.clearMessages(1);
    //adds rooms to the dom
  },

  selectOtherRoom: function(rooms) {
    for (var i = 0; i < rooms.length; i++) {
      $('.roomSelect').append(`<option value="${rooms[i]}">${rooms[i]}</option>`);
    }
  },

  handleUsernameClick: function() {
    $('.username').on('click', function() {
      console.log(123);
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
  },

  getInfo: function() {
    var username = app.username;
    var msgContent = $('textarea').val();
    var roomname = $('select').val();
    var msgToPost = {
      username: username,
      text: msgContent,
      roomname: roomname,
    };
    return msgToPost;
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

$(document).ready(function () {
  app.fetch();
  app.init();
});