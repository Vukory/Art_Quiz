//selecting elements
const start_quiz = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question_image = document.getElementById("question_image");
const answer_a = document.getElementById("A");
const answer_b = document.getElementById("B");
const answer_c = document.getElementById("C");
const answer_d = document.getElementById("D");
const score_container = document.getElementById("score");

//creating questions
let questions = [{
        image: "Assets/Images/Lake.jpg",
        answer_a: "Van Gogh",
        answer_b: "Monet",
        answer_c: "Rembrandt",
        answer_d: "Leonrdo da Vinci",
        correct_answer: "B"
    },
    {
        image: "Assets/Images/pearl.jpg",
        answer_a: "Van Gogh",
        answer_b: "Monet",
        answer_c: "Rembrandt",
        answer_d: "Leonrdo da Vinci",
        correct_answer: "C"
    },
    {
        image: "Assets/Images/MonaLisa.jpg",
        answer_a: "Van Gogh",
        answer_b: "Monet",
        answer_c: "Rembrandt",
        answer_d: "Leonrdo da Vinci",
        correct_answer: "D"
    }
]

let score = 0;

//questions.length vraća dužinu niza objekata pitanja, s obzirom da se u varijablu sprema indeks zadnjeg pitanja od veličine se oduzima 1
//primjer niz od 3 pitanja questions=[a, b, c] ima indekse 0 1 i 2 dakle indeks zadnjeg elementa je 3-1=2
let last_question_index = questions.length - 1;

//indeks pitanja koje korisnik trenutno odgovara (početna vrijednost se postavlja na 0-prvo pitanje)
let current_question_index = 0;

function render_question() {

    let question = questions[current_question_index];
    question_image.innerHTML = "< img src =" + question.image + ">";
    answer_a.innerHTML = question.answer_a;
    answer_b.innerHTML = question.answer_b;
    answer_c.innerHTML = question.answer_c;
    answer_d.innerHTML = question.answer_d;
}

function quiz_start() {
    start_quiz.style.display = "none";
    render_question();
    quiz_progress.style.display = "block";
}

start_quiz.addEventListener("click", quiz_start);

function check_answer(answer) {
    if (questions[current_question_index].correct_answer == answer) {
        score++;
        correct_answer();
    } else {
        wrong_answer();
    }
    if (current_question_index < last_question_index) {
        current_question_index++;
        //display new question
        render_question();
    } else {
        //show score
    }
}

function score_render() {
    score_container.style.display = "block";
    //calculate the percentage of corectly answered questions
    let final_score = Math.round(100 * score / questions.length);
    score_container.innerHTML = "<p>" + final_score + "</p>";
}

function correct_answer() {
    document.getElementById(current_question_index).style.backgroundColor = "green";
}

function wrong_answer() {
    document.getElementById(current_question_index).style.backgroundColor = "red";
}