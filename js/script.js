// Создаем функцию filterByType которая принимает параметр type и массив values сформированный с помощью оператора rest и которая...
// перебирает массив values методом filter который создает новый массив при условии, что тип элемента массива(value) равен переменной type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

  // создаем стрелочную функцию hideAllResponseBlocks которая...
  hideAllResponseBlocks = () => {
    // создает массив responseBlocksArray из коллекции "document.querySelectorAll('div.dialog__response-block')"
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
    // перебирает массив responseBlocksArray циклом forEach который вызывает callback функцию которая устанавливает у каждого элемента массива('div.dialog__response-block')
    // css-свойство display со значением 'none'
    responseBlocksArray.forEach(block => block.style.display = 'none');
  },

  // Создаем стрелочную функию showResponseBlock которая принимает на вход пераметры blockSelector, msgText, spanSelector и которая..
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // запускает функию hideAllResponseBlocks
    hideAllResponseBlocks();

    // устанавливает html-елементу(blockSelector) принимаемому первым параметром css-свойство display со значением 'block'
    document.querySelector(blockSelector).style.display = 'block';
    // условие: если передан третий параметр в функцию(spanSelector не undefined или null) то...
    if (spanSelector) {
      // записывает html-елементу(spanSelector) принимаемому третим параметром текст(msgText) принимаемый вторым параметром
      document.querySelector(spanSelector).textContent = msgText;
    }
  },

  // Создаем стрелочную функцию showError которая принимает параметр msgText и запускает функию showResponseBlock с тремя параметрами
  // '.dialog__response-block_error', msgText, '#error'
  showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

  // Создаем стрелочную функцию showResults которая принимает параметр msgText и запускает функию showResponseBlock с тремя параметрами
  // '.dialog__response-block_ok', msgText, '#ok'
  showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

  // Создаем стрелочную функию showNoResults которая запускает функцию showResponseBlock и передаем в качестве агрумента строку '.dialog__response-block_no-results'
  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

  // Создаем стрелочную функию tryFilterByType которая принимает на вход пераметры type, values и которая...
  tryFilterByType = (type, values) => {
    // создает сконструкцию try - catch для отловки ошибок и предотвращения падения скрипта
    try {
      // создает переменную valuesArray которая с помощью встроенной функиции eval выполняет функию filterByType с агрументами type и values и
      // после конвертирует полученный массив из функции filterByType в строку через ", " методом join.
      // если аргумент values(строка) состоит из нескольких слов через запятую то в функию filterByType передается столько агрументов сколько элементов в строке values
      // если в строке values есть слова не разделенные запятой то сработает блок catch т.к. в функию будут переданы агрументы не через запятую
      // в строке values без кавычек могут быть только цифры и слова true/false остальные слова без кавычек воспримутся как переменные которые не определены
      // соответственно если в поле ввода ввести type или values то будет выводится неверная информация
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // создает переменную alertMsg в которую записывается значение после условия тернарного оператора:
      const alertMsg = (valuesArray.length) ?
        // если valuesArray.length(длинна строки valuesArray) не равна 0 то в переменную alertMsg записываем `Данные с типом ${type}: ${valuesArray}`
        `Данные с типом ${type}: ${valuesArray}` :
        // если valuesArray.length(длинна строки valuesArray) равна 0 то в переменную alertMsg записываем `Отсутствуют данные типа ${type}`
        `Отсутствуют данные типа ${type}`;
      // запускает функцию showResponseBlock и передает в качестве агрумента переменную alertMsg
      showResults(alertMsg);
      // в блок catch попадает ошибка если есть
    } catch (e) {
      // в блоке catch запускаем функию showError и передаем в качестве агрумента строку `Ошибка: ${e}`
      showError(`Ошибка: ${e}`);
    }
  };

// Получаем в переменную filterButton кнопку с id filter-btn
const filterButton = document.querySelector('#filter-btn');

//создаем событие по нажатию кнопки filterButton
filterButton.addEventListener('click', e => {
  // Получаем в переменную typeInput выпадающий список с id type
  const typeInput = document.querySelector('#type');
  // Получаем в переменную dataInput поле ввода с id data
  const dataInput = document.querySelector('#data');

  // Условие: проверяем если данные которые введены в поле ввода dataInput равны пустой строке то...
  if (dataInput.value === '') {
    // меняем стандартный вывод required на 'Поле не должно быть пустым!'
    dataInput.setCustomValidity('Поле не должно быть пустым!');
    // запускаем функцию showNoResults
    showNoResults();
    // если в поле ввода dataInput не пустая строка то...
  } else {
    // очищаем состояние ошибки required
    dataInput.setCustomValidity('');
    // отменяем действия браузера по умолчанию при событии 'click' по кнопке filterButton
    e.preventDefault();
    // запускаем функцию tryFilterByType и передаем в качестве агрументов: обрезанные(trim()) значения(value) выпадающего списка typeInput и
    // обрезанные(trim()) введенные данные(value) поле ввода dataInput
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});

