var inquirer = require("inquirer");
var questionArr = [];

var askUser = function(x) {
  if(x < questionArr.length) {
    inquirer.prompt([
      {
        type: "input",
        message: questionArr[x].partial(),
        name: "userAnswer"
      }
    ]).then(function(data) {
      if(data.userAnswer.trim().toLowerCase() === questionArr[x].Cloze().toLowerCase()) {
        console.log("====================================");
        console.log("Congrats, you picked the right answer!");
        console.log(questionArr[x].fullText());
        console.log("====================================");
      }
      else {
        console.log("====================================");
        console.log("Sorry, that's not the right answer!");
        console.log(questionArr[x].fullText());
        console.log("====================================");
      }
      x++;
      askUser(x);
    });
  }
  else {
    console.log("====================================");
    console.log("Game Over!");
    console.log("====================================");
    inquirer.prompt([
      {
        type: "confirm",
        message: "Would you like to play again?",
        default: true,
        name: "answer"
      }
    ]).then(function(data) {
      if(data.answer) {
        askUser(0);
      }
      else {
        console.log("Thanks for playing!");
      }
    });
  }
};

module.exports.askUser = askUser;
module.exports.questionArr = questionArr;
