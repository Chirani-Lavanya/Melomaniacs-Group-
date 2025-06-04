const questions = [
    {
        question: "Which album has sold the most copies of all time worldwide?",
        optionA: "Pink Floyd - Dark Side of the Moon",
        optionB: "Fleetwood Mac - Rumours",
        optionC: "Michael Jackson - Thriller",
        optionD: "Celine Dion - Falling Into You",
        correctOption: "optionC",
        correctOptionID: "option-three-label",
    },

    {
        question: "How many reeds does an oboe have?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionB",
        correctOptionID: "option-two-label",
    },

    {
        question: "At what age did Wolfgang Amadeus Mozart begin composing music?",
        optionA: "5",
        optionB: "7",
        optionC: "10",
        optionD: "13",
        correctOption: "optionA",
        correctOptionID: "option-one-label",
    },

    {
        question: "Which of the Spice Girls had a solo hit called Bag It Up?",
        optionA: "Victoria Beckham",
        optionB: "Mel C",
        optionC: "Geri Halliwell",
        optionD: "Emma Bunton",
        correctOption: "optionC",
        correctOptionID: "option-three-label",
    },

    {
        question: "Which rapper holds the world record for the most words per minute?",
        optionA: "Twista",
        optionB: "Busta Rhymes",
        optionC: "Eminem",
        optionD: "Tech N9ne",
        correctOption: "optionC",
        correctOptionID: "option-three-label",
    },

    {
        question: "Which singer’s first U.S. number one single was called Vision of Love?",
        optionA: "Whitney Houston",
        optionB: "Diana Ross",
        optionC: "Celine Dion",
        optionD: "Mariah Carey",
        correctOption: "optionD",
        correctOptionID: "option-four-label",
    },

    {
        question: "Which single was the first of Madonna’s to enter the Billboard Hot 100 chart?",
        optionA: "Holiday",
        optionB: "Like A Virgin",
        optionC: "Borderline",
        optionD: "Lucky Star",
        correctOption: "optionA",
        correctOptionID: "option-one-label",
    },

    {
        question: "Stefani Germanotta is the real name for which music superstar?",
        optionA: "Halsey",
        optionB: "Nicki Minaj",
        optionC: "Cardi B",
        optionD: "Lady Gaga",
        correctOption: "optionD",
        correctOptionID: "option-four-label",
    },

    {
        question: "Before Miley Cyrus recorded “Wrecking Ball,” it was offered to which singer?",
        optionA: "Taylor Swift",
        optionB: "Jennifer Lopez",
        optionC: "Beyoncé",
        optionD: "Shakira",
        correctOption: "optionC",
        correctOptionID: "option-three-label",
    },

    {
        question: "In what year did Brian McFadden quit Westlife?",
        optionA: "2003",
        optionB: "2004",
        optionC: "2005",
        optionD: "2006",
        correctOption: "optionB",
        correctOptionID: "option-two-label",
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0
const questionStatus = [];

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]

    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    document.getElementById(questionNumber).style.color = "green"
}
//gets the choosen option value
function getRadioValue(radioArray) {
    var i;
    for (i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            return radioArray[i].value;
        }
    }
    return "";
}
// gets the choosen option number
function getRadioOption(radioArray) {
    var i;
    for (i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            return i;
        }
    }
    return "";
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all radio inputs with name of 'option'

    const choosenOption = getRadioValue(options) //gets the choosen option
    const choosenOptionNumber = getRadioOption(options) // gets the choosen option number(index)

    //checking to make sure a radio input has been checked
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"


    } else if (choosenOption === currentQuestionAnswer) {
        //checks if the answer is correct or wrong

        document.getElementById(currentQuestion.correctOptionID).style.backgroundColor = "green"
        playerScore++
        indexNumber++
        questionStatus[questionNumber] = "Correct";
        questionNumber++

    } else if (choosenOption !== currentQuestionAnswer) {

        //sets the choosen option id to wrong option id(used only when chooesn option is wrong)
        switch (choosenOptionNumber) {
            case 0:
                wrongOptionID = "option-one-label"
                break;
            case 1:
                wrongOptionID = "option-two-label"
                break;
            case 2:
                wrongOptionID = "option-three-label"
                break;
            case 3:
                wrongOptionID = "option-four-label"
                break;
        }

        document.getElementById(wrongOptionID).style.backgroundColor = "red"
        document.getElementById(currentQuestion.correctOptionID).style.backgroundColor = "green"
        wrongAttempt++
        indexNumber++
        questionStatus[questionNumber] = "Incorrect";
        questionNumber++
    }
}

//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)

        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    document.getElementById("option-one-label").style.backgroundColor = ""
    document.getElementById("option-two-label").style.backgroundColor = ""
    document.getElementById("option-three-label").style.backgroundColor = ""
    document.getElementById("option-four-label").style.backgroundColor = ""
}

// unchecking all radio buttons for next question
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function when all questions are answered
function handleEndGame() {
    stopTimer()
    let remark = null
    const playerGrade = (2 * playerScore) - (1 * wrongAttempt);

    // condition check for player remark and remark color
    if (playerGrade <= 8) {
        remark = "Bad Grades, Keep Practicing."
        document.getElementById("grade").style.backgroundColor = "red";
    }
    else if (playerGrade >= 8 && playerGrade < 14) {
        remark = "Average Grades, You can do better."
        document.getElementById("grade").style.backgroundColor = "orange";
    }
    else if (playerGrade >= 14) {
        remark = "Excellent, Keep the good work going."
        document.getElementById("grade").style.backgroundColor = "green";
    }

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('player-score').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

// function to display the question summary
function displaySummary() {
    document.getElementById('score-modal').style.display = "none"
    //data to display in summary
    document.getElementById('Q1').innerHTML = questionStatus[1];
    document.getElementById('Q2').innerHTML = questionStatus[2];
    document.getElementById('Q3').innerHTML = questionStatus[3];
    document.getElementById('Q4').innerHTML = questionStatus[4];
    document.getElementById('Q5').innerHTML = questionStatus[5];
    document.getElementById('Q6').innerHTML = questionStatus[6];
    document.getElementById('Q7').innerHTML = questionStatus[7];
    document.getElementById('Q8').innerHTML = questionStatus[8];
    document.getElementById('Q9').innerHTML = questionStatus[9];
    document.getElementById('Q10').innerHTML = questionStatus[10];
    document.getElementById('summary-modal').style.display = "flex"

}

//back - goes back to score modal
function backToScoreModal() {
    document.getElementById('summary-modal').style.display = "none"
    handleEndGame()
}


//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"

}