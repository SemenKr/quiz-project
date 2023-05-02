// Подключение функционала "Чертоги Фрилансера"
import {isMobile} from "./functions.js";
// Подключение списка активных модулей
import {flsModules} from "./modules.js";

const $ = document.querySelector.bind(document);
const questions = [
	{
		question: 'Для кого вы ищете учебное заведение?',
		name: 'for whom',
		id: 1,
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
		id: 1,
		options: [
			{name: 'Санкт-Петербург', id: 1},
			{name: 'Москва', id: 2},
			{name: 'Новосибирск', id: 3},
			{name: 'Нижний новгород', id: 4},
			{name: 'Ростов-на-Дону', id: 5},
			{name: 'Екатеринбург', id: 6},
			{name: 'Краснодар', id: 7},
		]
	},
	{
		question: 'Какое образование уже есть?',
		id: 1,
		options: [
			{name: '9 классов', id: '1'},
			{name: 'Колледж/техникум', id: '2'},
			{name: '11 классов', id: '3'},
			{name: '11 классов', id: '4'},
			{name: 'Училище', id: '5'},
			{name: 'Неоконченное высшее', id: '6'},
			{name: 'Другое', id: '7'},
		]
	},
	{
		question: 'Куда планируете поступать?',
		id: 1,
		options: [
			{name: 'Вуз', id: '1'},
			{name: 'Колледж/техникум', id: '2'},
			{name: 'Училище', id: '3'},
		]
	},
	{
		question: 'Какую форму обучения предпочитаете?',
		id: 1,
		options: [
			{name: 'Очную', id: '1'},
			{name: 'Заочную', id: '2'},
			{name: 'Дистанционную', id: '3'},
		]
	},
	{
		question: 'Рассматриваете платное обучение?',
		id: 1,
		options: [
			{name: 'Нет, только бюджет', id: '1'},
			{name: 'Да, планирую учиться платно', id: '2'},
			{name: 'Возможны оба варианта', id: '3'},

		]
	},
	{
		question: 'Какая специальность интересует?',
		isSelect: true,
		id: 1,
		options: [
			{name: 'Любая', id: 1},
			{name: 'Экономика', id: 2},
			{name: 'Философия', id: 3},
			{name: 'Юриспруденция', id: 4},
			{name: 'Менеджмент', id: 5},
		]
	},
	{
		question: 'Как скоро планируете поступать?',
		id: 1,
		options: [
			{name: 'Как можно быстрее', id: '1'},
			{name: 'Квартал', id: '2'},
			{name: 'Месяц', id: '3'},
			{name: 'Полгода', id: '3'},
			{name: 'Год', id: '3'},

		]
	},
]



const elementFromHTML = (html) => {
	const template = document.createElement('template');

	template.innerHTML = html.trim();

	return template.content.firstElementChild
}

const btnOn = (btn) => {
	btn.disabled = false
}
const btnOff = (btn) => {
	btn.disabled = true
}


const selectWrapper = elementFromHTML(`
<div class="custom-select">
	<span class="custom-arrow"></span>
</div>
`)
const select = elementFromHTML(`

	<select class="quiz__input" name="" id="">

	</select>
`)

const localResult = {};
const quiz = $('.quiz');
const warning = $('.warning');
const btnWrapper = $('.quiz__controls');
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
	total.innerHTML = `Шаг ${index + 1} / ${questions.length}`;
	list.innerHTML = '';

	if (questions[index].isSelect === true) {
		questions[index].options.forEach(item => {
			const text = `<option value="${item.id}">${item.name}</option>`
			select.insertAdjacentHTML('beforeend', text)
		})
		list.appendChild(selectWrapper);
		selectWrapper.appendChild(select);
	} else {
		questions[index].options.forEach(item => {
			const text = `<label class="quiz__label" >${item.name}<input class="quiz__input" id="${item.id}" name="${questions[index].name}"  type="radio"></label>`;
			list.insertAdjacentHTML('beforeEnd', text)
		});
	}

	const questionCount = list.children.length;
	if (questionCount < 4) {
		list.style.gridTemplateColumns = '1fr';
	} else {
		list.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
	}
}

quiz.addEventListener('change', (event) => {
	//логика ответа
	if (event.target.classList.contains('quiz__input')) {
		localResult[event.target.name] = event.target.id
		console.log(localResult);
		btnOn(btnNext)
		btnOn(btnPrev)
	}
})
quiz.addEventListener('click', (event) => {

	const stepIndex = list.dataset.currentStep
	//логика вперед или назад кнопки
	if (event.target.classList.contains('quiz__next-btn')) {
		console.log(questions.length);
		console.log(stepIndex);

		const nextStepIndex = +list.dataset.currentStep + 1

		if (questions.length > stepIndex + 3) {
			showQuestions(nextStepIndex)
			// btnOff(btnNext)
			// btnOff(btnPrev)
		}


		if (questions.length === stepIndex + 3) {
			btnWrapper.classList.add('hidden')

			const form = elementFromHTML(`
				<form action="#">
				<input autocomplete="off" type="text" name="name" data-error="Ошибка" placeholder="Как вас зовут?" class="input">
				<input autocomplete="off" type="tel" name="phone" data-error="Ошибка" placeholder="Номер телефона" class="input">
				<input autocomplete="off" type="email" name="mail" data-error="Ошибка" placeholder="E-mail" class="input">
				<button type="submit">Получить подборку</button>
				<p>Нажимая на кнопку, вы даете согласие на обработку своих <a href="#">Персональных данных</a></p>
			</form>
			`)

			list.appendChild(form)
		} else {
			showQuestions(nextStepIndex)
			// btnOff(btnNext)
			// btnOff(btnPrev)
		}
	}

	if (event.target.classList.contains('quiz__prev-btn')) {
		const prevStepIndex = +list.dataset.currentStep - 1
		showQuestions(prevStepIndex)


	}

})

if (typeof questions !== 'undefined' && questions.length > 0) {
	quiz.classList.remove('hidden');
	showQuestions(count);
} else {
	warning.classList.remove('hidden');

}

