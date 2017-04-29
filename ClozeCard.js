var inquirer = require("inquirer");
var mainFile = require("./askUser.js");
var questionArr = mainFile.questionArr;
var questionAnswer = require("./questionAnswer.js");

var ClozeCard = function(front, back) {
  // if the front of the flash-card does not include the substring, console.log the following message
  if(!(front.trim()).includes(back.trim())) {
    console.log("Sorry, this isn't a valid flash-card");
  }
  this.front = front;
  this.back = back;
  this.partial = function() {
    var string   = front;
    var substring = back;
    // replace the answer(back) with ellipses on method call
    return string.replace(substring, "...");
  };
  this.Cloze = function() {
    // display the answer to the user
    return back;
  };
  this.fullText = function() {
    // display the entire question including the answer
    return front;
  };
  // store created flashcard(ClozeCard) in questionArr to reference in inquirer
  questionArr.push(this);
};


// var newCard1 = new ClozeCard("The most expensive car in the world is the Koenigsegg CCXR Trevita", "Koenigsegg CCXR Trevita");
// var newCard2 = new ClozeCard("The fastest car in the world is the Hennessey Venom GT", "Hennessey Venom GT");
// var newCard3 = new ClozeCard("The powerhouse of the cell is the Mitochondria", "Mitochondria");

var newCard1 = new ClozeCard(questionAnswer.questionA, questionAnswer.answerA);
var newCard2 = new ClozeCard(questionAnswer.questionB, questionAnswer.answerB);
var newCard3 = new ClozeCard(questionAnswer.questionC, questionAnswer.answerC);


var makeFlashcard = function() {
  inquirer.prompt([
    {
      type: "confirm",
      message: "Would you like to make a new flashcard",
      name: "confirm"
    }
  ]).then(function(data) {
    if(data.confirm) {
      inquirer.prompt([
        {
          type: "input",
          message: "Please input your new flashcard(full question including answer)",
          name: "question"
        },
        {
          type: "input",
          message: "Please input the answer to your question",
          name: "answer"
        }

      ]).then(function(data) {

        var newCard = new ClozeCard(data.question, data.answer);
        console.log("========================");
        console.log("Get ready to play!");
        mainFile.askUser(0);

      });
    }
    else {
      mainFile.askUser(0);
    }

  });

};

makeFlashcard();
