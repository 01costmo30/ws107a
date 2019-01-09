$(function() {
  var socket = io('/signup');
  $('#submit').click(function() {
    u = $('#u').val();
    p = $('#p').val();
    un = $('#un').val();
    e = $('#e').val();
    pic = $('#pics').val();
    alert(pic);
    var sand = {
      user: u,
      username: un,
      pass: p,
      mail: e,
      pics: pic
    }
    socket.emit();
  })
  socket.on('sign up', (data) => {

  })
})