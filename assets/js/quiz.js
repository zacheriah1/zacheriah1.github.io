let questions = ["what is 2+2?","what is the capital of ireland?","whats the 1st game for cape physics?","who was ashes 1st pokemon?","which game do wendigos belong to?"
,"whats the recommended hours of sleep?","how many subs does berleezy have?","which on of these songs did pantera sing?","how many fingers do you have?","whats better?"]

let answers = [["Two","Three","Four","Five"],["Cork","Limerick","Dublin","Killkenny"],["Batman:arkham Knight","Rayman Legends","Spiderman ps4","Spelunky"],["Cyndaquil","Mudkip","Pikachu","Charmander"],["Silent Hill 2","Resident Evil","Minecraft","Until Dawn"],["1hr","3hrs","10hrs","8hrs"],
["2.66m","1.57m","4.56m","3.5m"],["Liberty to the weak","Ransom","Domination","Righteous"],["4","1","10","22"],["Nandos","Astros","Wendys","Burger King"]]

let correctAnswers = ["Four","Dublin","Batman:arkham Knight","Pikachu","Until Dawn","8hrs","2.66m","Domination","10","Astros"]

let questionNumber = 1;
let questionSelection = 0;
let score = 0
let name = ""
let startTime = 0
let nameForm = document.querySelector("#namePromptForm")
let startQuizBtn = document.getElementById("startQuizBtn")
let testHeading = document.querySelector("h2")

document.getElementById("namePromptForm").addEventListener("submit", (event)=> {
event.preventDefault();
  let formData = new FormData(nameForm);
 name = Object.fromEntries(formData).name.toLowerCase();

  testHeading.innerText = "Welcome " + name ;
  nameForm.reset()
startQuizBtn.disabled = false;
});
function loadQuestion() {
  if (questions.length > 0) {
    let questionNumberText = document.getElementById("questionNumber")
    let questionText = document.getElementById("question")
    let ansButtons = document.querySelectorAll(".answer-button")
    questionSelection = Math.floor(Math.random() * questions.length);


    questionNumberText.innerText = "Question Number " + questionNumber
    questionText.innerText = questions[questionSelection]
    ansButtons.forEach((btn, i) => {
    btn.addEventListener("click", handleAnswer)
    btn.innerText = answers[questionSelection][i]
    btn.value = answers[questionSelection][i]
    });
  }
  else {
    let resultsModal = document.getElementsByClassName("results-modal")[0]
    let resultHeadingText = document.getElementById("resultHeading");
    let resultImg = document.getElementById("result")
resultHeadingText.innerText = "Congratulations " + name + ", You got " + score + " out 10 Questions Correct in " + Math.floor((Date.now()-startTime) / 1000) + " seconds"

if(score == 0){
resultImg.src = "assets/images/bronze.png";
}
else if(score < 3){
resultImg.src = "assets/images/silver.png";
}
else if(score < 5){
resultImg.src = "assets/images/gold.png"
}

    resultsModal.style.display = "flex"

    document.getElementById("restartButton").addEventListener("click", ()=> {
location.reload();
    });

  }
}

// Quiz setup
document.getElementById("startQuizBtn").addEventListener("click", (event)=> {
  let quizModal = document.getElementsByClassName("quiz-modal")[0]
  startTime = Date.now();
loadQuestion();
quizModal.style.display = "flex"
});

function handleAnswer() {
  let selectedAnswer = this.value;
  let correctAnswer = correctAnswers[questionSelection];


  if (selectedAnswer == correctAnswer) {
    score++;
    this.classList.add("correct-answer")
  } else {
      this.classList.add("incorrect-answer")
  }

  questionNumber++;  // Move to the next question
  questions.splice(questionSelection, 1)
  answers.splice(questionSelection, 1)
  correctAnswers.splice(questionSelection, 1)

      // Load the next question
  setTimeout(()=>{
          this.classList.remove("correct-answer")
          this.classList.remove("incorrect-answer")
loadQuestion();
  }, 1000);
}
