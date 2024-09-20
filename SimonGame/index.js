var correctOrder = [];
var userSelect = [];
var level = 0;
var gameOverCondition = false;
//starting Game;
$(document).on("keydown", function () {
    if ($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key To Restart") {
        var randomBoxClass = chooseRandomBox();
        chosenButtonAnimation(randomBoxClass);
        playSound(randomBoxClass);
        $("h1").text("Level 1");
        correctOrder.push(randomBoxClass);
    }
}
);


function chooseRandomBox() {
    var randomBox = Math.floor(Math.random() * 4);
    var boxClass = "";
    switch (randomBox) {
        case 0:
            boxClass = "green";
            break;
        case 1:
            boxClass = "red";
            break;
        case 2:
            boxClass = "yellow";
            break;
        case 3:
            boxClass = "blue";
            break;

        default:
            break;


    }
    return boxClass;
}

function chosenButtonAnimation(randomBoxClass) {
    $("#" + randomBoxClass).addClass("pressed");
    setTimeout(() => {
        $("#" + randomBoxClass).removeClass("pressed");
    }, 50);

}

function playSound(randomBoxClass) {
    var sound = new Audio("./sounds/" + randomBoxClass + ".mp3");
    sound.play();
}



$(".btn").on("click", function () {
    if ($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key To Restart") {
        gameOver();
    }
    else {
        gameOverCondition = false;
        var clickedButtonID = $(this).attr("id");
        chosenButtonAnimation(clickedButtonID);
        playSound(clickedButtonID);
        userSelect.push(clickedButtonID);

        for (var i = 0; i < userSelect.length; i++) {
            if (userSelect[i] != correctOrder[i]) {
                gameOver();
            }
        }


        if (correctOrder.length === userSelect.length && gameOverCondition === false) {
            //order is correct show next step
            setTimeout(() => {
                level++;
                $("h1").text("Level " + (level + 1));
                var randomBoxClass = chooseRandomBox();
                chosenButtonAnimation(randomBoxClass);
                playSound(randomBoxClass);
                correctOrder.push(randomBoxClass);
                userSelect = [];
            }, 1000);
        }
    }
}
);

function gameOver() {

    $("h1").text("Game Over, Press Any Key To Restart");
    new Audio("./sounds/wrong.mp3").play();

    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200)

    userSelect = [];
    correctOrder = [];
    level = 0;
    gameOverCondition = true;

}

