$(document).ready(function() {

  jQuery.fn.redraw = function() {
    this.css('display', 'none'); 
    var temp = this[0].offsetHeight;
    this.css('display', '');
    temp = this[0].offsetHeight;
};

  var input;
  var numberOfPlayers;
  var gameOver = 0;
  var firstPlayer = 0;
  var movesCount = 0;
  var firstPlayerMoves = [];
  var secondPlayerMoves = [];
  var player1 = "?";
  var player2 = "?";
  var player1Wins = 0;
  var player2Wins = 0;

  $(document.body).on('click', '#restart', function() {
    firstPlayerMoves = [];
    secondPlayerMoves = [];
    gameOver = 0;
    movesCount = 0;

    $(".unitSquare").empty();
    $(".unitSquare").css("background", "#00aaff");



    document.getElementById('mainScreen').innerHTML = "<div id=mainScreen><div class=boardG><div class=rowSquare><button type=\"button\" class=unitSquare id=\"11\"><button type=\"button\" class= unitSquare id=12><button type=\"button\" class=unitSquare id=13></div><div class=rowSquare><button type=\"button\" class=unitSquare id=21><button type=\"button\" class=unitSquare id=22><button type=\"button\" class=unitSquare id=23></div><div class=rowSquare><button type=\"button\" class=unitSquare id=31><button type=\"button\" class=unitSquare id=32><button type=\"button\" class=unitSquare id=33></div></div>";
    $('.unitSquare').redraw();


    if (firstPlayer == 1 && numberOfPlayers == 1)
      computer();

  });

  $("#reset").on("click", function() {
    firstPlayerMoves = [];
    secondPlayerMoves = [];
    gameOver = 0;
    movesCount = 0;
    player1Wins = 0;
    player2Wins = 0;

    document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
    document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;

    firstPlayer = 0;
    $(".firstPlayer").css("color", "#f44336");
    $(".secondPlayer").css("color", "black");

    document.getElementById('mainScreen').innerHTML = "<div class=instruction>Number of Players?</div><div class=boardC><div class=rowSquare><button type=\”button\” class=selectSquare id=1Player>1 <button type=\”button\” class=selectSquare id=2Player>2</div></div>";
  });

  $(document.body).on('click', '#1Player', function() {
    numberOfPlayers = 1;
    document.getElementById('mainScreen').innerHTML = "<div class=instruction>Player 1: X or O?</div><div class=boardC><div class=rowSquare><button type=\”button\” class=selectSquare id=XPlayer>X <button type=\”button\” class=selectSquare id=OPlayer>O</div></div>";
  });
  $(document.body).on('click', '#2Player', function() {
    numberOfPlayers = 2;
    document.getElementById('mainScreen').innerHTML = "<div class=instruction>Player 1: X or O?</div><div class=boardC><div class=rowSquare><button type=\”button\” class=selectSquare id=XPlayer>X <button type=\”button\” class=selectSquare id=OPlayer>O</div></div>";
  });



  $(document.body).on('click', '#XPlayer', function() {
    player1 = "x";
    player2 = "o";
    $(".firstPlayer").css("color", "#f44336");
    $(".secondPlayer").css("color", "black");
    document.getElementById('mainScreen').innerHTML = "<div id=mainScreen><div class=boardG><div class=rowSquare><button type=\"button\" class=unitSquare id=\"11\"><button type=\"button\" class= unitSquare id=12><button type=\"button\" class=unitSquare id=13></div><div class=rowSquare><button type=\"button\" class=unitSquare id=21><button type=\"button\" class=unitSquare id=22><button type=\"button\" class=unitSquare id=23></div><div class=rowSquare><button type=\"button\" class=unitSquare id=31><button type=\"button\" class=unitSquare id=32><button type=\"button\" class=unitSquare id=33></div></div>";
    $('.unitSquare').redraw();

  });
  $(document.body).on('click', '#OPlayer', function() {
    player1 = "o";
    player2 = "x";
    $(".firstPlayer").css("color", "black");
    $(".secondPlayer").css("color", "#f44336");
    document.getElementById('mainScreen').innerHTML = "<div id=mainScreen><div class=boardG><div class=rowSquare><button type=\"button\" class=unitSquare id=\"11\"><button type=\"button\" class= unitSquare id=12><button type=\"button\" class=unitSquare id=13></div><div class=rowSquare><button type=\"button\" class=unitSquare id=21><button type=\"button\" class=unitSquare id=22><button type=\"button\" class=unitSquare id=23></div><div class=rowSquare><button type=\"button\" class=unitSquare id=31><button type=\"button\" class=unitSquare id=32><button type=\"button\" class=unitSquare id=33></div></div>";
    $('.unitSquare').redraw();

    if (numberOfPlayers == 1)
      computer();


  });


  $(document.body).on('click', '.unitSquare', function() {

    input = $(this).attr("id");

    if (firstPlayer == 0 && !firstPlayerMoves.includes(input) && !secondPlayerMoves.includes(input)) {
      document.getElementById(input).innerHTML = player1;
      $("#" + input).css("background", "#f44336");
      firstPlayerMoves.push(input);
      movesCount++;
      checkWin(firstPlayerMoves);
      firstPlayer = 1;
      $(".firstPlayer").css("color", "black");
      $(".secondPlayer").css("color", "#f44336");
      if (numberOfPlayers == 1)
        computer();
    } else if (numberOfPlayers == 2 && !firstPlayerMoves.includes(input) && !secondPlayerMoves.includes(input)) {
      document.getElementById(input).innerHTML = player2;
      $("#" + input).css("background", "#f44336");
      secondPlayerMoves.push(input);
      movesCount++;
      checkWin(secondPlayerMoves);
      firstPlayer = 0;

      $(".firstPlayer").css("color", "#f44336");
      $(".secondPlayer").css("color", "black");
    }

  });

  function computer() {
    var temp = 11;
    var max = 13;

    while (firstPlayerMoves.includes(temp.toString()) || secondPlayerMoves.includes(temp.toString())) {
      if (temp < max)
        temp++;
      else {
        temp = temp + 8;
        max = max + 10;
      }
    }
    input = temp.toString();
    document.getElementById(input).innerHTML = player2;
    $("#" + input).css("background", "#f44336");
    secondPlayerMoves.push(input);
    movesCount++;
    checkWin(secondPlayerMoves);
    firstPlayer = 0;

    $(".firstPlayer").css("color", "#f44336");
    $(".secondPlayer").css("color", "black");

  }

  function checkWin(playerMoves) {
    if (playerMoves.includes("11") && playerMoves.includes("22") && playerMoves.includes("33")) {
      $("#" + "11").css("background", "#f4c20d");
      $("#" + "22").css("background", "#f4c20d");
      $("#" + "33").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("13") && playerMoves.includes("22") && playerMoves.includes("31")) {
      $("#" + "13").css("background", "#f4c20d");
      $("#" + "22").css("background", "#f4c20d");
      $("#" + "31").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("11") && playerMoves.includes("12") && playerMoves.includes("13")) {
      $("#" + "11").css("background", "#f4c20d");
      $("#" + "12").css("background", "#f4c20d");
      $("#" + "13").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("21") && playerMoves.includes("22") && playerMoves.includes("23")) {
      $("#" + "21").css("background", "#f4c20d");
      $("#" + "22").css("background", "#f4c20d");
      $("#" + "23").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("31") && playerMoves.includes("32") && playerMoves.includes("33")) {
      $("#" + "31").css("background", "#f4c20d");
      $("#" + "32").css("background", "#f4c20d");
      $("#" + "33").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("11") && playerMoves.includes("21") && playerMoves.includes("31")) {
      $("#" + "11").css("background", "#f4c20d");
      $("#" + "21").css("background", "#f4c20d");
      $("#" + "31").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("12") && playerMoves.includes("22") && playerMoves.includes("32")) {
      $("#" + "12").css("background", "#f4c20d");
      $("#" + "22").css("background", "#f4c20d");
      $("#" + "32").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (playerMoves.includes("13") && playerMoves.includes("23") && playerMoves.includes("33")) {
      $("#" + "13").css("background", "#f4c20d");
      $("#" + "23").css("background", "#f4c20d");
      $("#" + "33").css("background", "#f4c20d");
      gameOver = 1;
      if (firstPlayer == 0) {
        player1Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #1 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      } else {
        player2Wins++;
        document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>player #2 Wins!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";
      }
      document.getElementById('firstPlayer').innerHTML = "player #1:" + player1Wins;
      document.getElementById('secondPlayer').innerHTML = "player #2:" + player2Wins;
    } else if (movesCount == 9) {
      gameOver = 1;
      document.getElementById('mainScreen').innerHTML = "<div id=winnerAnnouncer>draw!</div><div class=controlRow><button type=\"button\" class=controlButton id=restart>again?</div>";

    }

  }

});
