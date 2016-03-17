var socket = io('http://10.254.48.21:3000');

var caja = {
    top: 50,
    left: 50
};
var miId;
socket.on('createBox', function(id) {
    miId = id; //encodeURIComponent(id);
    $(".row").append("<div class='caja' id='caja_" + miId + "'></div>")
    console.log("#caja_" + miId);
    $("#caja_" + miId).css({
        "top": caja.top + "px",
        "left": caja.left + "px"
    });

    $(document).on("keydown", function(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 40:
                socket.emit("up", caja);
                break;
            case 38:
                socket.emit("down", caja);
                break;
            case 39:
                socket.emit("right", caja);
                break;
            case 37:
                socket.emit("left", caja);
                break;
        }
    });
});

socket.on("createPeople",function(peopleId){
	if($("#caja_" + peopleId).length){
		return 0;
	}
	$(".row").append("<div class='caja' id='caja_" + peopleId + "'></div>")
    console.log("#caja_" + peopleId);
    $("#caja_" + peopleId).css({
        "top": "50px",
        "left": "50px",
        "background-color":"red"
    });
});

socket.on("move", function(data) {
    var position = data.position
    var id = data.id;

    if (id == miId) {
        caja = position
    }
    $("#caja_" + id).css({
        "top": position.top + "px",
        "left": position.left + "px"
    });
});

socket.on("deletePeople",function(id){
	$("#caja_"+id).remove();
});