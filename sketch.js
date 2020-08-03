var userInput, userInputVal, yesButton, noButton, nextButton;

var buttonPosX = 200, buttonPosY = 400;

var userAnswer, quesNumb=0;

var questionList;
var name="Please enter your name";
var emailId="Please enter your Email ID";
var question1="Do you think we need to have free lunch meals \nour school canteen for the kids who are very poor?";
var question2="Would you be willing to contribute a small \namount every month for such a program?";
var question3="How much per month would you be willing to pay? \n(Rs.)";
var outro="Thank you for taking this survey!";

var fontLoad;

var database, playerNode;

function preload() {
    fontLoad = loadFont('simplifica.ttf')
}

function setup() {
    createCanvas(600, 600);

    userAnswer = [];
    questionList = [name, emailId, question1, question2, question3, outro];
    
    database = firebase.database();

    createUserSpace();
}

function draw() {
    background("white");

    yesButton.mousePressed(yesPressed);
    noButton.mousePressed(noPressed);
    nextButton.mousePressed(nextPressed);
    
    dispText();
    changeType();
}

function createUserSpace() {
    userInput = createInput();
    userInput.size(200, 40);
    userInput.position(buttonPosX, buttonPosY);
//    userInput.hide();
    
    nextButton = createButton("CONFIRM");
    nextButton.size(100, 40);
    nextButton.position(250, buttonPosY+ 65);
//    nextButton.hide();
    
    yesButton = createButton("YES");
    yesButton.size(100, 40);
    yesButton.position(buttonPosX, buttonPosY);
    yesButton.hide();
    
    noButton = createButton("NO");
    noButton.size(100, 40);
    noButton.position(buttonPosX+105, buttonPosY);
    noButton.hide();
}

function yesPressed() {
    userAnswer.push("YES");
    quesNumb += 1;
}
function noPressed() {
    userAnswer.push("NO");
    quesNumb += 1;
    
    if (quesNumb === questionList.length-2) {
        quesNumb += 1;
        userAnswer.push('NA')
        
        yesButton.hide();
        noButton.hide();
    }
}
function nextPressed() {
    userAnswer.push(userInput.value());
    userInput.value("")
    quesNumb += 1;
    
    if (quesNumb === 2) {
        yesButton.show();
        noButton.show();
        
        userInput.hide();
        nextButton.hide();
    } else if (quesNumb === questionList.length-1) {
        userInput.hide();
        nextButton.hide();
        createUserNode();
    }
    
    
}

function dispText() {
    if (quesNumb <= questionList.length) {
        fill('black');
        textFont(fontLoad);
        textSize(35);
        textAlign(CENTER)
        text(questionList[quesNumb], width/2, height/2);
    }
}

function changeType() {
    if (quesNumb === questionList.length-2) {
        yesButton.hide();
        noButton.hide();

        userInput.show();
        nextButton.show();
    }
}


function createUserNode() {
    playerNode = 'players/' + userAnswer[0];
    
    database.ref(playerNode).set({
        emailID: userAnswer[1],
        feeling: userAnswer[2],
        wantDonate: userAnswer[3],
        donateAmount: userAnswer[4]    
    })
}