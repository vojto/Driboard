$(document).ready(function(){
  Board.setup()
});

var Board = function(){
  
}

Board.setup = function(){
  this.board = $("#board")
  this.shots = this.board.find("#shots")
  this.path = this.board.attr('data-path')
  $.getJSON(this.path, function(response){
    $.each(response, function(i, shot){
      Board.add_shot(shot);
    })
  })
  this.setupEvents()
}

Board.add_shot = function(shot){
  var shot_div = $("<div />")
  shot_div.css({width: parseInt(shot.width), height: parseInt(shot.height), position: 'absolute', left: parseInt(shot.left), top: parseInt(shot.top), background: 'url('+shot.image_url+')', zIndex: 3})
  shot_div.css({'-webkit-box-shadow': '#999 0px 2px 3px'})
  shot_div.css({'-moz-box-shadow': '#999 0px 2px 3px'})
  shot_div.appendTo(this.shots)
  shot_div.draggable({stop: function(){
    var top = parseInt(shot_div.css('top').replace('px', ''));
    var left = parseInt(shot_div.css('left').replace('px', ''));
    var data = {
      "_method": "put",
      "shot[top]": top,
      "shot[left]": left
    }
    $.post(shot.path, data)
  }, start: function(e){
    if(e.altKey)
    {
      return false;
    };
  }})
}

Board.setupEvents = function(){
  this.board.bind('mousedown', function(e){
    // console.log(e)
    var target = $(e.target);
    var target_id = target.attr('id');
    if(target_id == "board" || e.altKey) {
      Board.dragging = true;
      Board.save_original_coords();
      Board.dragging_start_coords = {x: e.clientX, y: e.clientY}
    }
  })
  this.board.bind('mouseup', function(){
    Board.dragging = false;
  })
  this.board.bind('mousemove', function(e){
    // console.log(Board.dragging);
    if(Board.dragging)
    {
      var x = e.clientX;
      var y = e.clientY;

      var diff_x = x - Board.dragging_start_coords.x;
      var diff_y = y - Board.dragging_start_coords.y;
      
      var new_y = Board.dragging_original_coords.y+diff_y;
      var new_x = Board.dragging_original_coords.x+diff_x;
      
      Board.shots.css({top: new_y, left: new_x})
    };
    
  })
}

Board.save_original_coords = function(){
  var original_x = parseInt(Board.shots.css('left').replace('px', ''));
  var original_y = parseInt(Board.shots.css('top').replace('px', ''));
  Board.dragging_original_coords = {x: original_x, y: original_y}
}