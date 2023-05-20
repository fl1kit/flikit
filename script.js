console.time("CodeExecution");

const testContainer = document.getElementById("test-container");
const submitTestButton = document.getElementById("submit-test");
const resultsContainer = document.getElementById("results-container");
const resultsElement = document.getElementById("results");
const resultContainer = document.getElementById("result");
const welcomeContainer = document.getElementById("welcome-container");
const startTestButton = document.getElementById("start-test");


const resultImages = [
  "img/result/result_1.jpg",
  "img/result/result_2.jpg",
  "img/result/result_3.jpg",
  "img/result/result_4.jpg",
  "img/result/result_5.jpg",
  "img/result/result_6.jpg"
];

const questions = [
  {
    id: 1,
    text: "Внимательно рассмотри и запомни картинку.",
    image: "img/question/img_1.jpg",
    type: "radio",
    options: ["Запомнил!"],
    answer: "Запомнил!",
    isCheckable: false,
  },
  {
    id: 2,
    text: "Сколько геометрических фигур было изображено?",
    image: "img/question/img_2.jpg",
    type: "radio",
    options: ["7", "5", "6", "8"],
    answer: "6",
  },
  {
    id: 3,
    text: "Какого цвета был круг?",
    image: "img/question/img_3.jpg",
    type: "radio",
    options: ["Красный", "Желтый", "Синий", "Фиолетовый"],
    answer: "Красный",
  },
  {
    id: 4,
    text: "Какого цвета был квадрат?",
    image: "img/question/img_4.jpg",
    type: "radio",
    options: ["Желтый", "Синий", "Зеленый", "Красный"],
    answer: "Синий",
  },
  {
    id: 5,
    text: "Внимательно рассмотри и запомни фото.",
    image: "img/question/img_5.jpg",
    type: "radio",
    options: ["Запомнил!"],
    answer: "Запомнил!",
    isCheckable: false,
  },
  {
    id: 6,
    text: "Сколько человек было на фото?",
    image: "img/question/img_6.jpg",
    type: "radio",
    options: ["5", "4", "6", "7"],
    answer: "5",
  },
  {
    id: 7,
    text: "Сколько мужчин было на фото?",
    image: "img/question/img_7.jpg",
    type: "radio",
    options: ["3", "2", "4", "1"],
    answer: "2",
  },
  {
    id: 8,
    text: "Назови последовательность в которой расположились люди на фото (слева на право)",
    image: "img/question/img_8.jpg",
    type: "radio",
    options: ["Женщина, Женщина, Женщина, Мужчина, Мужчина", "Мужчина, Женщина, Женщина, Мужчина, Женщина", "Женщина, Женщина, Мужчина, Женщина, Мужчина", "Женщина, Мужчина, Мужчина, Женщина, Женщина"],
    answer: "Женщина, Женщина, Мужчина, Женщина, Мужчина",
  },
  {
    id: 9,
    text: "Запомни имена на картинке.",
    image: "img/question/img_9.jpg",
    type: "radio",
    options: ["Запомнил!"],
    answer: "Запомнил!",
    isCheckable: false,
  },
  {
    id: 10,
    text: "Сколько имен было на картинке?",
    image: "img/question/img_10.jpg",
    type: "radio",
    options: ["3", "6", "4", "5"],
    answer: "5",
  },
  {
    id: 11,
    text: "Какой по счету был Артем? (слева на право)",
    image: "img/question/img_11.jpg",
    type: "radio",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    id: 12,
    text: "Назови обратную последовательность в которой расположились имена (справа на лево)",
    image: "img/question/img_12.jpg",
    type: "radio",
    options: ["Влад, Дима, Артем, Ира, Маша", "Дима, Артем, Влад, Ира, Маша", "Влад, Артем, Дима, Ира, Маша", "Маша, Влад, Дима, Ира, Артем"],
    answer: "Влад, Артем, Дима, Ира, Маша",
  },
  {
    id: 13,
    text: "Внимательно рассмотри и запомни картинку",
    image: "img/question/img_13.jpg",
    type: "radio",
    options: ["Запомнил!"],
    answer: "Запомнил!",
    isCheckable: false,
  },
  {
    id: 14,
    text: "Сколько квадратов было изображено на картинке?",
    image: "img/question/img_14.jpg",
    type: "radio",
    options: ["10", "12", "8", "14"],
    answer: "10",
  },
  {
    id: 15,
    text: "Сколько было синих квадратов?",
    image: "img/question/img_15.jpg",
    type: "radio",
    options: ["2", "3", "4", "1"],
    answer: "3",
  },
  {
    id: 16,
    text: "Сколько было зеленых квадратов?",
    image: "img/question/img_16.jpg",
    type: "radio",
    options: ["2", "3", "4", "1"],
    answer: "2",
  },
  {
    id: 17,
    text: "Квадратов какого цвета было больше всех?",
    image: "img/question/img_17.jpg",
    type: "radio",
    options: ["Синих", "Желтых", "Зеленых", "Красных"],
    answer: "Красных",
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];

const nextButtonContainer = document.createElement("div");
nextButtonContainer.classList.add("next-button-container");
testContainer.appendChild(nextButtonContainer);

const nextButton = document.createElement("button");
nextButton.textContent = "Далее";
nextButton.addEventListener("click", handleNextButtonClick);
nextButtonContainer.appendChild(nextButton);

function renderQuestion(index) {
  try {
    updateQuestionCounter(index);
    testContainer.innerHTML = "";

    if (index < questions.length) {
      const question = questions[index];
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");

      const questionText = document.createElement("h2");
      questionText.textContent = question.text;
      questionElement.appendChild(questionText);

      const questionImage = document.createElement("img");
      questionImage.src = question.image;
      questionImage.alt = "Изображение для вопроса";
      questionElement.appendChild(questionImage);

      const optionsElement = document.createElement("div");
      optionsElement.classList.add("options");

      question.options.forEach((option, idx) => {
        const optionElement = document.createElement("label");
        optionElement.classList.add("option-label");

        const inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.id = `option-${idx}`;
        inputElement.name = `question-${question.id}`;
        inputElement.value = option;
        inputElement.classList.add("option-input");

        const buttonElement = document.createElement("button");
        buttonElement.type = "button";
        buttonElement.textContent = option;
        buttonElement.classList.add("option-button");
        buttonElement.addEventListener("click", () => {
          inputElement.checked = true;
        });

        optionElement.appendChild(inputElement);
        optionElement.appendChild(buttonElement);
        optionsElement.appendChild(optionElement);
      });

      questionElement.appendChild(optionsElement);
      testContainer.appendChild(questionElement);

      if (index < questions.length - 1) {
        const nextButtonContainer = document.createElement("div");
        nextButtonContainer.classList.add("next-button-container");
        nextButtonContainer.style.textAlign = "center"; 

        const nextButton = document.createElement("button");
        nextButton.textContent = "Далее";
        nextButton.addEventListener("click", handleNextButtonClick);
        nextButtonContainer.appendChild(nextButton);

        testContainer.appendChild(nextButtonContainer);
      } else {
        submitTestButton.style.display = "block";
      }
    }
  } catch (error) {
    console.error("Ошибка при рендеринге вопроса:", error);
  }
}

function checkSelectedOption() {
  const selectedOption = document.querySelector(
    `input[name="question-${questions[currentQuestionIndex].id}"]:checked`
  );
  return selectedOption;
}

function handleNextButtonClick() {
  try {
    const selectedOption = checkSelectedOption();
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = selectedOption.value;

      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      alert("Пожалуйста, выберите вариант ответа.");
    }
  } catch (error) {
    console.error("Ошибка при обработке нажатия кнопки Далее:", error);
  }
}

function handleSubmitTestButtonClick() {
  try {
    const selectedOption = checkSelectedOption();
    if (selectedOption) {
      userAnswers[currentQuestionIndex] = selectedOption.value;

      const correctAnswers = calculateResults();
      showResults(correctAnswers);
    } else {
      alert("Пожалуйста, выберите вариант ответа.");
    }
  } catch (error) {
    console.error("Ошибка при обработке нажатия кнопки Отправить тест:", error);
  }
}

function calculateResults() {
  try {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      if (question.isCheckable !== false) {
        const userAnswer = userAnswers[index];
        if (userAnswer === question.answer) {
          correctAnswers++;
        }
      }
    });

    return correctAnswers;
  } catch (error) {
    console.error("Ошибка при подсчете результатов:", error);
  }
}

function countCheckableQuestions() {
  return questions.filter((question) => question.isCheckable !== false).length;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showResults(correctAnswers) {
  try {
    testContainer.style.display = "none";
    submitTestButton.style.display = "none";

    const checkableQuestionsCount = countCheckableQuestions();
    const percentage = Math.round((correctAnswers / checkableQuestionsCount) * 100);

    const randomImage = resultImages[getRandomInt(0, resultImages.length - 1)];
    const resultImage = document.createElement("img");
    resultImage.src = randomImage;
    resultImage.alt = "Результат";
    resultImage.style.width = "300px";
    resultImage.style.height = "300px";
    resultImage.style.marginRight = "20px"; 

    resultsContainer.style.display = "flex";
    resultsContainer.style.justifyContent = "center";
    resultsContainer.style.alignItems = "center";
    resultsContainer.style.flexDirection = "row";

    const resultBox = document.createElement("div");
    resultBox.style.border = "3px solid #333";
    resultBox.style.borderRadius = "15px";
    resultBox.style.padding = "20px";
    resultBox.style.backgroundColor = "#f0f0f0";
    resultBox.style.display = "flex";
    resultBox.style.flexDirection = "row";
    resultBox.style.alignItems = "center";

    resultsElement.textContent = `Вы ответили на ${percentage}%`; 

    const funnyPhrase = document.createElement("p");
    funnyPhrase.style.marginTop = "20px"; 
    if (correctAnswers / checkableQuestionsCount >= 0.8) {
      funnyPhrase.textContent = "Вы отлично справились! Вы настоящий гений!";
    } else if (correctAnswers / checkableQuestionsCount >= 0.5) {
      funnyPhrase.textContent = "Неплохо! Но есть куда стремиться.";
    } else {
      funnyPhrase.textContent = "Попробуйте еще раз, вам обязательно повезет!";
    }

    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }

    resultContainer.appendChild(resultsElement);
    resultContainer.appendChild(funnyPhrase);

    if (!resultContainer.contains(restartButton)) {
      restartButton.textContent = "На главную";
      restartButton.addEventListener("click", restartTest);
      resultContainer.appendChild(restartButton);
    }

    resultBox.appendChild(resultImage);
    resultBox.appendChild(resultContainer);
    resultsContainer.appendChild(resultBox);
  } catch (error) {
    console.error("Ошибка при отображении результатов:", error);
  }
}

const restartButton = document.createElement("button");

function restartTest() {
  resultsContainer.innerHTML = "";
  testContainer.innerHTML = "";
  document.getElementById("question-counter").style.display = "none";
  showHomePage();
  document.querySelector("footer").style.display = "block"; 
  currentQuestionIndex = 0;
}

submitTestButton.addEventListener("click", handleSubmitTestButtonClick);

function handleStartTestButtonClick() {
  welcomeContainer.style.display = "none";
  testContainer.style.display = "block";
  document.getElementById("question-counter").style.display = "block"; 
  renderQuestion(currentQuestionIndex);
}

startTestButton.addEventListener("click", handleStartTestButtonClick);

function showHomePage() {
  resultsContainer.style.display = 'none';
  testContainer.style.display = 'none';
  submitTestButton.style.display = 'none';
  document.getElementById("question-counter").style.display = "none";
  welcomeContainer.style.display = 'flex';
}

startTestButton.addEventListener('click', startTest);

function startTest() {
  try {
    welcomeContainer.style.display = "none";
    testContainer.style.display = "flex";
    submitTestButton.style.display = "none";

    document.querySelector("footer").style.display = "none";
  } catch (error) {
    console.error("Ошибка при начале теста:", error);
  }
}

function updateQuestionCounter(index) {
  const counterElement = document.getElementById("question-counter");
  if (counterElement) {
    counterElement.textContent = `Вопрос ${index + 1} из ${questions.length}`;
    counterElement.style.display = "block";
  } else {
    console.error("Элемент для отображения счетчика вопросов не найден");
  }
}

restartButton.addEventListener('click', function() {
  showHomePage();
  document.querySelector('footer').style.display = 'block';
});

console.timeEnd("CodeExecution");