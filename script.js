const questions = [
    {
        question : "Which car company is known for its logo featuring four interlocking rings?",
        answers :[
            {text: "Audi", correct: true},
            {text: "BMW", correct: false},
            {text: "Mercedes-Benz", correct: false},
            {text: "Volkswagen", correct: false}
        ]
    },
    {
        question : "What is the primary difference between a turbocharged engine and a naturally aspirated engine?",
        answers :[
            {text: "Turbocharged engines have more cylinders", correct: false},
            {text: "Turbocharged engines use exhaust gases to increase power", correct: true},
            {text: "Turbocharged engines are only found in diesel cars", correct: false},
            {text: "Turbocharged engines have lower fuel efficiency", correct: false}
        ]
    },
    {
        question : "Which car manufacturer produces the model 'Supra'?",
        answers :[
            {text: "Nissan", correct: false},
            {text: "Toyota", correct: true},
            {text: "Mazda", correct: false},
            {text: "Subaru", correct: false}
        ]
    },
    {
        question : "What is the name of the electrical system that provides power to a hybrid vehicle?",
        answers :[
            {text: "Lithium-Ion Battery System", correct: true},
            {text: "Lead-Acid Battery System", correct: false},
            {text: "Nickel-Metal Hydride System", correct: false},
            {text: "Alkaline Battery System", correct: false}
        ]
    },
    {
        question : "What is the term used for the measure of an engine's power output?",
        answers :[
            {text: "Torque", correct: false},
            {text: "RPM", correct: false},
            {text: "Horsepower", correct: true},
            {text: "Displacement", correct: false}
        ]
    },
    {
        question : "Which car model is known for its distinctive 'gull-wing' doors?",
        answers :[
            {text: "Chevrolet Corvette", correct: false},
            {text: "DeLorean DMC-12", correct: true},
            {text: "Ford GT", correct: false},
            {text: "Porsche 911", correct: false}
        ]
    },
    {
        question : "Which car manufacturer has a prancing horse as its logo?",
        answers :[
            {text: "Lamborghini", correct: false},
            {text: "Ferrari", correct: true},
            {text: "Maserati", correct: false},
            {text: "Aston Martin", correct: false}
        ]
    },
    {
        question : "What is the automotive term for a car's turning radius?",
        answers :[
            {text: "Wheelbase", correct: false},
            {text: "Track width", correct: false},
            {text: "Turning circle", correct: true},
            {text: "Camber angle", correct: false}
        ]
    },
    {
        question : "Which hybrid car was the first mass-produced hybrid vehicle?",
        answers :[
            {text: "Toyota Prius", correct: true},
            {text: "Honda Insight", correct: false},
            {text: "Chevrolet Volt", correct: false},
            {text: "Nissan Leaf", correct: false}
        ]
    },
    {
        question : "What is the term for the force that opposes the motion of a car through the air?",
        answers :[
            {text: "Drag", correct: true},
            {text: "Lift", correct: false},
            {text: "Downforce", correct: false},
            {text: "Thrust", correct: false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    nextButton.addEventListener('click', handleNextButton);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', handleNextButton);

function handleNextButton() {
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', startGame);
}

startGame();