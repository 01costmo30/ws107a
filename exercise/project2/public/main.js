$(function() {
  var who;
  var uid;
  var id;
  var connected = false;
  var typing = false;
  var lastTypingTime;

  var socket = io();

  const pad = (str, max) => {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }
  const updateScroll = () => {
    var element = document.getElementById("chatroom");
    element.scrollTop = element.scrollHeight;
  }
  $('#setting').click(function() {
    $('#setmenu').toggle('fast', 'swing');
  })

  $('#logout').click(function() {
    $('#setmenu').toggle('fast', 'swing');
    $('#loginpg').fadeIn();
    $('#theCR').show().css("visibility", "hidden").fadeOut();
    socket.emit('logout', who.id);
    who = null;
    // location.reload();
  })

  $('#login .input').click(function () {
    var u = $('#u').val();
    var p = $('#p').val();
    var send = {
      user: u,
      pass: p
    }
    if (u && p) {
      socket.emit('login', send);
    }
    $('#u').val('');
    $('#p').val('');
  })

  $("#send .input").click(function () {
    var message = $("#send input").val();
    if (message && uid != undefined) {
      const time = new Date();
      const data = {
        content: message,
        send: who.id,
        rece: uid,
        date: {YYYY: time.getFullYear(), mm: time.getMonth(), dd: time.getDate()},
        time: {hour: time.getHours(), minute: time.getMinutes()},
        id: id,
      }
      id++;
      socket.emit('new message', data);
      $("#send input").val('');
    }
  })

  socket.on('new message', (data, cid) => {
    id = cid;
    if (data.send == uid && data.rece == who.id) {
      var chatbox = '<span class="chatbox" id="'+data.id+'">';
      var $img = '<span class="img" style="background-image:url('+"'./pics/"+data.spic+"'"+');"></span>';
      var $uname = $('<span class="uname">').text(data.sname);
      var $br = "<br>";
      var $cont = $('<span class="cont1">').text(data.content);
      var $time = $('<span class="time1">').text(data.time.hour + ":" + pad(data.time.minute, 2));
      var $chatbox = $(chatbox).append($img,$uname,$br,$cont,$time);
      $("#chatroom").append($chatbox);
      updateScroll();
      var cont1 = "#"+data.id+' .cont1';
      var time1 = "#"+data.id+' .time1';
      var w = $(cont1).width();
      var h = $(cont1).height();
      $(time1).css("margin-left",w+26);
      if (w>150) {
        if (!!window.chrome && !!window.chrome.webstore) {
          $(cont1).css("margin-left", "calc(3.8vw + 5px)");
        }
      }
      if (h>28) {
        $(time1).css("line-height",7+3*(((h-28)/14)-1));
      }
    }
  })

  socket.on('message', (data) => {
    if (data.send == who.id && data.rece == uid) {
      var del = '<span class="delete" name="'+data.id+'">';
      var chatbox = '<span class="chatbox" id="'+data.id+'">';
      var $img = '<span class="img" style="background-image:url('+"'./pics/"+data.spic+"'"+');"></span>';
      var $uname = $('<span class="uname">').text(data.sname);
      var $br = "<br>";
      var $del = $(del).text("刪除");
      var $cont = $('<span class="cont">').text(data.content);
      var $time = $('<span class="time">').text(pad(data.time.hour, 2) + ":" + pad(data.time.minute, 2));
      var $chatbox = $(chatbox).append($img,$uname,$br,$cont,$time,$del);
      $("#chatroom").append($chatbox);
      updateScroll();
      var cont = "#"+data.id+' .cont';
      var time = "#"+data.id+' .time';
      var h = $(cont).height();
      var w = $(cont).width();
      if (w>200) {
        $(time).css("margin-left",w-6);
        if (!!window.chrome && !!window.chrome.webstore) {
          $(cont).css("margin-left", "calc(3.8vw + 5px)");
        }
      }else if (w>180&&w<=200) {
        $(time).css("margin-left",w+10);
        if (!!window.chrome && !!window.chrome.webstore) {
          $(cont).css("margin-left", "calc(3.8vw + 5px)");
        }
      }else {
        $(time).css("margin-left",w+26);
      }
      if (h>28) {
        if (!!window.chrome && !!window.chrome.webstore) {
          $(time).css("line-height",7+2.4*(((h-28)/14)-1));
        }else {
          $(time).css("line-height",7+3*(((h-28)/14)-1));
        }
      }
      $(".delete").click(function () {
        var cid = $(this).attr("name");
        socket.emit('delete message', cid);
        $(this).parent().remove();
      })
    }
  })

  socket.on('delete M', (id) => {
    var del = '#'+id;
    $(del).remove();
  })

  socket.on('empty', () => {
    document.getElementById("chatroom").innerHTML = '<span class="clear"></span>';
  })

  socket.on('send error', (err) => {
    alert(err);
  })

  socket.on('sign in', (data, cid) => {
    who = data
    if ((typeof(id) == "undefined" && id == null)||id == 0) {
      id = cid;
    }else {
      id = cid+1;
    };
    $('#loginpg').fadeOut();
    $('#theCR').hide().css("visibility", "visible").fadeIn();
    $('#theCR h1').html("Welcome, "+who.username);
    $('#person').html("<span class='clear'></span>")
    for (let friend of who.friends) {
      var sp = '<span class="friend" name="' + friend.id + '">';
      $friend = $(sp).text(friend.username);
      $('#person').append($friend);
    };
    $("#person .friend").click(function () {
      sid = $(this).attr("name");
      sid = parseInt(sid);
      if (!uid || uid!=sid) {
        uid = sid;
        socket.emit('show message', uid);
      }
      $(".friend").css('color', '#ffffff');
      $(this).css('color', '#08a08a');
    });
  })
})
