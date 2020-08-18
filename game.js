var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;
var current = 0;

function nextSequence(){
  $("#level-title").text("Level " + level);
  level++;
  current = 0;
  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}


$(".btn").click(function(event){
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();
    if(start){
      userClickedPattern.push(userChosenColor);
      checkAnswer();
    }

});

function animatePress(userChosenColor){
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(function(){
    $("#" + userChosenColor).removeClass("pressed");
  },100);
}

function checkAnswer(){

  if(gamePattern[current] == userClickedPattern[userClickedPattern.length-1]){
    current++;
    if(current == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },100);
    }
  }else{
    var audio = new Audio("sounds/" + "wrong" + ".mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over,Press Any Key to Restart");
      resetAll();
    },200);

  }
}

function resetAll(){
  start = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(document).on("keydown",function(){
    if(!start){
      start = true;
      nextSequence();
    }

});
