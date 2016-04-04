(function($, io) {
  var socket = io('http://10.254.48.17:3000');
  var miId;


  $(document).on("keydown", function(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 40:
        socket.emit("up");
        break;
      case 38:
        socket.emit("down");
        break;
      case 39:
        socket.emit("right");
        break;
      case 37:
        socket.emit("left");
        break;
    }
  });


  socket.on("connect", function() {
    $(".caja").remove();
  });

  socket.on("createPeople", function(data) {
    console.log("createPeople -->" + JSON.stringify(data));
    if ($("#caja_" + data.id).length) {
      console.log("Ya existe");
      return 0;
    }
    $(".row").append("<div class='caja' id='caja_" + data.id + "'></div>");
    console.log("#caja_" + data.id);
    $("#caja_" + data.id).css({
      "top": data.position.top + "px",
      "left": data.position.left + "px",
      "background-color": data.color
    });
  });

  socket.on("move", function(data) {
    var position = data.position,
      id = data.id;

    $("#caja_" + id).css({
      "top": position.top + "px",
      "left": position.left + "px"
    });
  });

  socket.on("deletePeople", function(id) {
    $("#caja_" + id).remove();
  });

})(jQuery, io);
