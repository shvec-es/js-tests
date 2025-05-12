import { questions } from "./questions.js";

const refs = {
  testWrapper: document.querySelector("#test"),
  answerResult: document.querySelector(".answer-result"),
  explanationText: document.querySelector(".explanation-text"),
};

let currentIndex = 0;
let studentScore = 0;

function renderQ(index) {
  const { question, options, id } = questions[index];

  refs.testWrapper.innerHTML = `<div class="test-item" id=${id}><h2 class="question">${id}. ${question}</h2>
  ${options
    .map(
      (
        option
      ) => `<label class="options"><input type="radio" name="options" value="${option}" />
     ${option}</label>`
    )
    .join("")}
  </div>
  <button type="button" class="next-button" data-index="${id}" disabled>Next -></button>`;

  document.querySelector(".test-item").addEventListener("click", checkA);
  document.querySelector(".next-button").addEventListener("click", nextQ);
}
renderQ(currentIndex);

function checkA({ target }) {
  if (target.nodeName !== "INPUT") return;

  const currentQuestion = questions[currentIndex];
  const correctInput = [
    ...document.querySelectorAll('input[type="radio"]'),
  ].find((i) => i.value === currentQuestion.answer);
  console.log(correctInput);

  const selectedAnswer = target.value;
  const input = target.closest("input");

  if (currentQuestion.answer === selectedAnswer) {
    studentScore += currentQuestion.credit;
    refs.answerResult.textContent = "Вітаю! Це правильна відповідь!🤩";
    input.classList.add("success");
  } else {
    refs.answerResult.textContent = "Нажаль це неправильна відповідь😢";
    input.classList.add("error");
    correctInput.classList.add("success");
  }
  refs.explanationText.textContent = currentQuestion.explanation;
  document.querySelector(".next-button").disabled = false;
  document
    .querySelectorAll("input[name='options']")
    .forEach((i) => (i.disabled = true));
}

function nextQ() {
  currentIndex++;

  if (currentIndex >= questions.length) {
    const maxScore = questions.reduce((sum, q) => sum + q.credit, 0);
    const level = getLevel(studentScore, maxScore);
    refs.testWrapper.innerHTML =
      "<button onclick=location.reload()>Почати знов!</button>";
    refs.answerResult.textContent = `Вітаю! Ви пройшли тестування🥳 Сума набраних балів = ${studentScore} з ${maxScore} можливих`;
    refs.explanationText.innerHTML = `Твій рівень підготовки - ${level.title}<br>${level.message}`;
    return;
  }
  refs.answerResult.textContent = "";
  refs.explanationText.textContent = "";
  renderQ(currentIndex);
}

function getLevel(score, maxScore) {
  const percent = (score / maxScore) * 100;

  if (percent === 100) {
    return {
      title: "Експерт 💪",
      message: "Фантастично! Ти справжній майстер JavaScript! 🚀",
    };
  }

  if (percent >= 70) {
    return {
      title: "Вище середнього",
      message: "Чудовий результат! Ще трішки — і ти експерт! 🔥",
    };
  }

  if (percent >= 40) {
    return {
      title: "Середній",
      message: "Ти на правильному шляху! Продовжуй практикуватися 💡",
    };
  }

  return {
    title: "Початківець",
    message: "Кожен експерт колись починав. Не здавайся — ти зможеш! 💪",
  };
}
