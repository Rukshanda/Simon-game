

 // starter variables
 let btnColors = ['blue' , 'red' , 'green' , 'yellow'];
 let gamePatern = [];
 let userClickedPattern = [];
 let level = 0;
 let started = false;



// when the any key is pressed for the start of the game
// 1:- if the game is not started yet then start the game
// 2:- render out the next level ------ change the text of the h1
// 3:- then call the nextSequence ----- if will generate the random color 
// 4:- and the game is started
 $(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// next sequence
// 1:- generate random number
// 2:- generate randomChosenColor --> the random color
// 3:- push the randomChosenColor result into the empty array --> gamepatern
// 4:- when we press any key the flash will produce and when the new random color is generated
// 5:- then play the sound corresponding to the color
// 6:- after the game is started we want to change the title of h1 to the current level
// 7:- and after every round add the level 
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = btnColors[randomNumber];
    gamePatern.push(randomChosenColour);
    console.log(gamePatern)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    soundPlay(randomChosenColour);
  }


  // when the button is clicked
  // 1:- first define the id of the selected btn
  // 2:- then push that id in the userClickdedPattern array
  // 3:- then call the animationPress when any button is clicked
  // 4:- also play the sound corresponding the color
  // 5:- when the btn is clicked then call the checkAnswer and pass the current index of the pattern clicked by user
  // 6:- think of the current index----
  $('.btn').click(function (){
     let userChosenColour  = $(this).attr('id');
     userClickedPattern.push(userChosenColour);
     console.log(userClickedPattern)
     animationPress(userChosenColour);
     soundPlay(userChosenColour)
     checkAnswer(userClickedPattern.length-1);
  })



   
  // Check answer fn
  // 1:- to check answer we are going to see the currentLevel
  // 2:- if the currentLevel of the gamepatern and the userClickdepattern is same then 
  //     check if the index of the gamepatern is equal to the userClicked pattern
  // then call the nextSequence after 1000 milisecond
  // if it is wrong then play wrong audio , add the class game-over , and change the title of the 
     // h1 to the Game over, Press Any Key to Restart
  // and then remove the game-over class after 200 class
  // and then restart the game   
  function checkAnswer (currentLevel){

    if(gamePatern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePatern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
      soundPlay("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }

  }
 
 
 // animation fn
 // 1:- add the pressed class on the current color selected
 // 2:- and then remove it after 100 mili second
 function animationPress(currentColor){
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
      }, 100);
 }
 
 // sound play fn
 function soundPlay(choosenId){
    var audio = new Audio(`sounds/${choosenId}.mp3`);
    audio.play();

 }



 // start over fn
  function startOver(){
    level = 0;
    gamePatern = [];
    started = false;
  }