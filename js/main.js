import { quetions } from "./quetions.js";

const refs = {
  testWrapper: document.querySelector("#test"),
  answerResult: document.querySelector(".answer-result"),
  explanationText: document.querySelector(".explanation-text"),
};

let currentQuetion = null;
let currentAnswer = "";
let correctAnswer = "";
let studentScore = 0;

const allQuetionsMarkup = quetions.map(
  ({
    quetion,
    options,
    answer,
    explanation,
    id,
    credit,
  }) => `<li class="test-item" id=${id}><p>${id}. ${quetion}</p>
    <label><input type="radio" name="options-${id}" value="${options[0]}" />
    ${options[0]}</label>
    <label><input type="radio" name="options-${id}" value="${options[1]}" />
    ${options[1]}</label>
    <label><input type="radio" name="options-${id}" value="${options[2]}" />
    ${options[2]}</label>
    <label><input type="radio" name="options-${id}" value="${options[3]}" />
    ${options[3]}</label></li>
    <button type="button" class="next-button" data-count="${id}">next -></button>`
);

refs.testWrapper.innerHTML = allQuetionsMarkup[0];

const testItem = document.querySelector(".test-item");
const nextButton = document.querySelector(".next-button");

testItem.addEventListener("click", ({ target }) => {
  if (target.nodeName !== "INPUT") return;
  currentAnswer = target.value;
  currentQuetion = quetions.find((q) => q.id === target.closest("li").id);
  console.log(currentQuetion);
  if (currentQuetion.answer === currentAnswer) {
    studentScore += currentQuetion.credit;
    refs.answerResult.textContent = "Вітаю! Це правильна відповідь!🤩";
  } else {
    refs.answerResult.textContent = "Нажаль це неправильна відповідь😢";
  }
  refs.explanationText.textContent = currentQuetion.explanation;
  //   setTimeout(
  //     () =>
  //       (refs.testWrapper.innerHTML = allQuetionsMarkup[+currentQuetion.id + 1]),
  //     1000
  //   );
});

nextButton.addEventListener("click", ({ target }) => {
  const currentCount = Number(target.dataset.count);
  refs.testWrapper.innerHTML = allQuetionsMarkup[currentCount];
});
