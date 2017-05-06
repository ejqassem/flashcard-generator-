const inquirer = require("inquirer");
const mainFile = require("./askUser.js");
const questionArr = mainFile.questionArr;
const questionAnswer = require("./questionAnswer.json");
const fs = require("fs");


var ClozeCard = function(front, back) {
  // if the front of the flash-card does not include the substring, console.log an error message
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

var newCard1 = new ClozeCard(questionAnswer[0].question, questionAnswer[0].answer);
var newCard2 = new ClozeCard(questionAnswer[1].question, questionAnswer[1].answer);
var newCard3 = new ClozeCard(questionAnswer[2].question, questionAnswer[2].answer);


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
          name: "question",
        },
        {
          type: "input",
          message: "Please input the answer to your question",
          name: "answer",
        }

      ]).then(function(data) {
        if(!(data.question.trim()).includes(data.answer.trim())) {
          console.log("========================");
          console.log("Sorry, this isn't a valid flash-card");
          console.log("========================");
          console.log("Get ready to play!");
          // mainFile.askUser(0);
        }
        else {
          var newCard = new ClozeCard(data.question, data.answer);
          console.log("========================");
          console.log("Get ready to play!");
          var userAnswers = {
            questionD: data.question,
            answerD: data.answer
          };
          fs.readFile("./questionAnswer.json", function(err, data) {
            var json = JSON.parse(data);
            json.push(userAnswers);

            fs.writeFile("./questionAnswer.json", JSON.stringify(json) , function(err) {
              if (err) throw err;
            });
          });
          mainFile.askUser(0);
          }

        });
    }
    else {
      mainFile.askUser(0);
    }

  });
};

makeFlashcard();
