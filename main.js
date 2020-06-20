//nakon ucitavanja dokumenta
$(document).ready(function () {

  console.log('Document ready');

  /*
  Klikom na dugme za pocetak igre se sa ekrana uklanja kontejner start-container u kojem je smjesteno dugme i uvodni tekst za igru
  nakon cega se generise pitanje koristeci funkciju renderQuestion()
  */
  $('#start').click(function () {
    console.log('Start quiz button was clicked');
    $('#start-container').css('display', 'none');
    renderQuestion();
  });
});

/*
Kreiranje pitanja
Svako pitanje ima sliku (i alt tekst/ime slike koji koristi osobama sa poteskocama vida)
Niz mogucih odgovora koji ce biti ponuđeni kada se pitanje bude generisalo
I indeks elementa u nizu koji oznacava tacan odgovor
*/
const questions = [{
  image: "assets/images/monalisa.png",
  imageAlt: "Mona Lisa",
  answers: ["Leonrdo da Vinci", "Johannes Vermeer", "Andy Warhol", "Diego Rodríguez"],
  correctAnswer: 0
},
{
  image: "assets/images/pearl_earring.png",
  imageAlt: "Girl with a Pearl Earring",
  answers: ["Leonrdo da Vinci", "Claude Monet", "Johannes Vermeer", "Van Gogh"],
  correctAnswer: 2
},
{
  image: "assets/images/starry_night.png",
  imageAlt: "The Starry Night",
  answers: ["Pablo Picasso", "Van Gogh", "Rembrandt Harmenszoon", "Leonrdo da Vinci"],
  correctAnswer: 1
},
{
  image: "assets/images/cubes.png",
  imageAlt: "Composition II in Red, Blue, and Yellow",
  answers: ["Salvador Dalí", "Gustav Klimt ", "Frida Kahlo", "Piet Mondrian"],
  correctAnswer: 3
},
{
  image: "assets/images/scream.png",
  imageAlt: "The Scream",
  answers: ["Jackson Pollock", "Claude Monet", "Edvard Munch", "Michelangelo Buonarroti"],
  correctAnswer: 2
},
{
  image: "assets/images/soup.png",
  imageAlt: "Campbell's Soup Can",
  answers: ["Édouard Manet", "Andy Warhol", "Sandro Botticelli", "Piet Mondrian"],
  correctAnswer: 1
},
{
  image: "assets/images/whistlers_mother.png",
  imageAlt: "Whistler's Mother",
  answers: ["Édouard Manet", "Wassily Kandinsky", "Edward Hopper", "James Whistler"],
  correctAnswer: 3
},
{
  image: "assets/images/son_of_man.png",
  imageAlt: "The Son of Man",
  answers: ["René Magritte", "Sandro Botticelli", "Francisco Goya", "Georges Seurat"],
  correctAnswer: 0
},
{
  image: "assets/images/kanagawa.png",
  imageAlt: "The Great Wave off Kanagawa",
  answers: ["Yoshitomo Nara", "Takashi Murakami", "Katsushika Hokusai", "Kitagawa Utamaro"],
  correctAnswer: 2
},
{
  image: "assets/images/american_gothic.png",
  imageAlt: "American Gothic",
  answers: ["Albrecht Dürer", "Grant Wood", "Camille Pissarro", "Winslow Homer"],
  correctAnswer: 1
}
];

//indeks pitanja koje korisnik trenutno odgovara (pocetna vrijednost se postavlja na 0-prvo pitanje)
let currentQuestionIndex = 0;

/*questions.length vraća dužinu niza objekata pitanja, 
s obzirom da se u varijablu sprema indeks zadnjeg pitanja od velicine se oduzima 1 kako bi se dobila tacna duzina niza
Primjer niz od 3 pitanja questions=[a, b, c] ima indekse 0 1 i 2 
Duzina niza je 3, dakle indeks zadnjeg elementa je 3-1=2
*/
let lastQuestionIndex = questions.length - 1;

//inicijalna vrijednost varijable u koju ce se smjestati trenutni rezultat se postavlja na 0
let score = 0;

//funkcija za generisanje pitanja
function renderQuestion() {

  console.log('Rendering question with index', currentQuestionIndex);


  //U varijablu question se smjesta trenutno pitanje (kako bi se izbjegla obaveza indeksiranja prilikom svakog iduceg pozivanja)
  const question = questions[currentQuestionIndex];

  /**
   * Inicijaliziranje varijable questionImage
   * @param {jQuery} #question-image Kontejner u koji ce se smjestiti slika za pitanje
   */
  const questionImage = $('#question-image');
  questionImage.html(`<img class="framed" src="${question.image}" alt="${question.imageAlt}"/>`);

  /**
   * Inicijaliziranje varijable answersElement
   * @param {jQuery} #answers Kontejner u koji ce se smjestiti sva od mogucih odgovora na pitanje
   */
  const answersElement = $('#answers');

  /**
   * Ubacivanje odgovora u kontejner za odgovore (answerElement)
   * @param answer odgovor iz niza odgovora za jedno pitanje
   * @param index indeks odgovora (indeks niza)
   */
  question.answers.forEach((answer, index) => {
    answersElement.append(`<div class="answer" data-answer-index="${index}">${answer}</div>`);
  });

  /**
   * Inicijaliziranje varijable answerElements
   * @param {jQuery} .answer Kontejner u kojem je jedan odgovor
   */
  const answerElements = $('.answer');

  answerElements.click(function () {

    /**
     * Inicijalizacija elementa clickedElement
     * @param {jQuery} this postavlja u varijablu onaj odgovor na koji je kliknuto
     */
    const clickedElement = $(this);
    console.log(`The answer ${clickedElement} was clicked`);

    //funkcija koja onemogućava klik na sve druge odgovore nakon sto je vec odabran jedan od odgovora
    answerElements.off('click');

    /**
     * Inicijalizacija varijable correctAnswer u koju se smjesta indeks tacno odgovora trenutnog pitanja
     * Inicijalizacija varijable actualAnswer
     * @param {jQuery} .this U varijablu se smjesta indeks pitanja na koje je kliknuto (koje je korisnik odabrao)
     * Inicijalizacija varijable isCorrect u koju se smjesta 'true' ili 'false' vrijednost zavisno od rezultata poredenja
     * Porede se indeksi tacnog odgovora i odabranog odgovora
     */
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const actualAnswer = $(this).data('answerIndex');
    const isCorrect = correctAnswer === actualAnswer;

    /*
    Provjera da li je odgovor tacan
    Ako jeste trenutni broj bodova se povecava za 1 
    Boja dugmeta koje oznacava odabran odgovor se mijenja u zelenu
    */
    if (isCorrect) {
      score++;
      clickedElement.css('background-color', "#498659");
    } else { //uslov nije ispunjen, boja dugmeta koje oznacava odabran odgovor se mijenja u crvenu
      clickedElement.css('background-color', "#864b49");
    }

    console.log('Is answered correctly?', isCorrect);

    //funkcija za prelazak na novo pitanje koja se izvrsava 700ms nakon klika na jedan od odgovora
    window.setTimeout(() => {

      //Uklanjanje odgovora i slike
      answerElements.remove();
      $('img').remove();

      /*
      Provjera da li ima jos pitanja
      Ako ima generise se novo pitanje
      */
      if (currentQuestionIndex < lastQuestionIndex) {
        currentQuestionIndex++;
        renderQuestion();
        console.log(currentQuestionIndex);
      } else {//Uslov nije ispunjen (zadnje je pitanje, nema vise pitanja) prikazuje se rezultat pozivom odgovarajuce funkcije
        console.log('Finished quiz');
        score_render();
      }
    }, 700);
  });
}

//racunaje i prikaz ukupnog rezultata
function score_render() {
  /**
   * Promjena vidljivosti elementa za prikaz rezultata
   * @param {jQuery} #score
   */
  $('#score').css("display", "block");

  //izracunavanje postotka tacno odgovorenih pitanja
  let final_score = Math.round(100 * score / questions.length);

  /**
   * Ispis rezultata u paragraf
   * @param {jQuery} #score U kontejner za prikaz rezultata se ubacuje paragraf sa konacnim rezultatom
   */
  $('#score').html(`<p>${final_score}%</p>`);
}