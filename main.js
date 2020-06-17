$(document).ready(function() {

    console.log('AM READY UWU');

    $('#start').click(function() {
        console.log('START QUIZ BUTTON WAS CLICKED UWU');
        $(this).css('display', 'none');
        renderQuestion();
    });
});

//creating questions
const questions = [{
        image: "assets/images/Lake.jpg",
        imageAlt: "Lake idk",
        answers: ["Van Gogh", "Monet", "Rembrandt", "Leonrdo da Vinci"],
        correctAnswer: 1
    },
    {
        image: "assets/images/pearl.jpg",
        imageAlt: "Girl with eaarring idk",
        answers: ["Van Gogh", "Monet", "Rembrandt", "Leonrdo da Vinci"],
        correctAnswer: 2
    },
    {
        image: "assets/images/MonaLisa.jpg",
        imageAlt: "Girl with eaarring idk",
        answers: ["Van Gogh", "Monet", "Rembrandt", "Leonrdo da Vinci"],
        correctAnswer: 3
    }
];

//indeks pitanja koje korisnik trenutno odgovara (početna vrijednost se postavlja na 0-prvo pitanje)
let currentQuestionIndex = 0;
//questions.length vraća dužinu niza objekata pitanja, s obzirom da se u varijablu sprema indeks zadnjeg pitanja od veličine se oduzima 1
//primjer niz od 3 pitanja questions=[a, b, c] ima indekse 0 1 i 2 dakle indeks zadnjeg elementa je 3-1=2
let lastQuestionIndex = questions.length - 1;
let score = 0;

function renderQuestion() {

    console.log('rendering question with index', currentQuestionIndex, 'uwu');
    const question = questions[currentQuestionIndex];
    const questionImage = $('#question-image');
    questionImage.html(`<img src="${question.image}" alt="${question.image}" width="200px"/>`);

    const answersElement = $('#answers');
    question.answers.forEach((answer, index) => {
        answersElement.append(`<div class="answer" data-answer-index="${index}">${answer}</div>`);
    });

    const answerElements = $('.answer');

    answerElements.click(function() {
        console.log('The answer was clicked');
        const clickedElement = $(this);

        answerElements.off('click');

        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        const actualAnswer = $(this).data('answerIndex');
        const isCorrect = correctAnswer === actualAnswer;

        if (isCorrect) {
            score++;
            clickedElement.css('background-color', "green");
        } else {
            clickedElement.css('background-color', "red");
        }

        console.log('The question is answered correctly:', isCorrect);

        window.setTimeout(() => {
            answerElements.remove();
            $('img').remove();
            if (currentQuestionIndex < lastQuestionIndex) {
                currentQuestionIndex++;
                renderQuestion();
                console.log(currentQuestionIndex);
            } else {
                console.log('Finished quiz');
                score_render();
            }
        }, 700);
    });
}

function score_render() {
    $('#score').css("display", "block");
    //calculate the percentage of corectly answered questions
    let final_score = Math.round(100 * score / questions.length);
    $('#score').html(`<p>${final_score}%</p>`);
}