// Подключение функционала "Чертоги Фрилансера"
import {isMobile} from "./functions.js";
// Подключение списка активных модулей
import {flsModules} from "./modules.js";

const $ = document.querySelector.bind(document);
const questions = [
	{
		question: 'Для кого вы ищете учебное заведение?',
		isSelect: false,
		name: 'for whom',
		options: [
			{name: 'Себе', id: 'себе'},
			{name: 'Супругу/супруге', id: 'Супругу/супруге'},
			{name: 'Родственнику', id: 'Родственнику'},
			{name: 'Коллеге', id: 'Коллеге'},
			{name: 'Ребенку', id: 'Ребенку'},
			{name: 'Себе', id: 'себе'},
			{name: 'Другое', id: 'Другое'},
		]
	},
	{
		question: 'В каком городе планируете поступать?',
		isSelect: true,
		options: [
			'Санкт-Петербург',
			'Москва',
			'Новосибирск',
			'Нижний новгород',
			'Ростов-на-Дону',
			'Екатеринбург',
			'Краснодар',
		]
	},
	{
		question: 'Какое образование уже есть?',
		options: [
			'Себе',
			'Супругу/супруге',
			'Родственнику',
			'Коллеге',
			'Ребенку',
			'Другое',
		]
	},
]

let localResult = {};

const quiz = $('.quiz');
const warning = $('.warning');
const btnNext = $('.quiz__next-btn');
const btnPrev = $('.quiz__prev-btn');
const title = $('.quiz__title');
const list = $('.quiz__list');
const total = $('.quiz__total');
let count = 0;
let userScore = 0;



const showQuestions = (index) => {


	list.dataset.currentStep = index;


	title.innerHTML = `${questions[index].question}`;
	list.innerHTML = '';
	if (questions.isSelect === true) {
		questions[index].options.forEach(item => {
			const text = `
			<select name="form[]" class="form">
				<option value="1" selected>Пункт №1</option>
				<option value="2">Пункт №2</option>
				<option value="3">Пункт №3</option>
				<option value="4">Пункт №4</option>
			</select>`
		})
	} else {
		questions[index].options.forEach(item => {
			const text = `<label class="quiz__label" >${item.name}<input class="quiz__input" id="${item.id}" name="${questions[index].name}"  type="radio"></label>`;
			list.insertAdjacentHTML('beforeEnd', text)
		});
	}

	total.innerHTML = `Шаг ${index + 1} / ${questions.length}`;
}

quiz.addEventListener('change', (event) => {
	//логика ответа
	if (event.target.classList.contains('quiz__input')) {
		localResult[event.target.name] = event.target.id
		console.log(localResult);
		btnNext.disabled = false;
		btnPrev.disabled = false;
	}
})
quiz.addEventListener('click', (event) => {
	//логика вперед или назад кнопки
	if (event.target.classList.contains('quiz__next-btn')) {
		const nextStepIndex = +list.dataset.currentStep + 1
		showQuestions(nextStepIndex)

		if (questions.length === nextStepIndex) {
			// переход к результатам
		} else {
			showQuestions(nextStepIndex)
		}

		btnNext.disabled = false;
		btnPrev.disabled = false;

	}

	if (event.target.classList.contains('quiz__prev-btn')) {
		const prevStepIndex = +list.dataset.currentStep - 1
		showQuestions(nextStepIndex)


	}

})

if (typeof questions !== 'undefined' && questions.length > 0) {
	quiz.classList.remove('hidden');
	showQuestions(count);
} else {
	warning.classList.remove('hidden');

}

