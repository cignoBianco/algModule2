let buttonToDo = document.querySelector('.button__To__Do__list');
let inputToDo = document.querySelector('.input__To__Do__list');
let buttonSort = document.querySelector('.button__sort__To__Do__list');
let formList = document.querySelector('.form__To__Do__list');
let toDoList = document.querySelector('.list');

let arrayToDo = []; //массив листа

buttonToDo.addEventListener('click', (event) => clickButtonToDo(event));
buttonSort.addEventListener('click', clickButtonSort);
window.addEventListener ("keypress", function (e) {
    if (e.keyCode !== 13) return;

    return console.log("enter!");
});

function clickButtonToDo(event){
    event.preventDefault();
    // if(document.querySelector('.input__To__Do__list').value == '') { // проверка на пустую строку
    //     return ;
    // } else {
        toDoList.style.display = 'block';
    arrayToDo.push(inputToDo.value); //добавляет значение инпута в массив
    console.log(inputToDo.value,document.querySelector('.input__To__Do__list').value)
    addTask(inputToDo.value);
    document.querySelector('.input__To__Do__list').value = ''; // чистит инпут для новой задачи
    // };
};

function addTask(name) { // функция отвечает за добавление и стилизацию блока с поставленной задачей в блок .list
    let newElementDiv = document.createElement('div');
    let buttonDelet = document.createElement('button');
    let buttonDeletClass = buttonDelet.classList;
    let newElementDivClass = newElementDiv.classList;
    newElementDivClass.add('list__content');//добавил стилизацию для блока с задачей
    buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
    newElementDiv.innerText = name;
    buttonDelet.innerText = 'X';
    toDoList.append(newElementDiv);
    newElementDiv.append(buttonDelet);
    buttonDelet.addEventListener('click', clickButtonDelet);

    let taskElements = toDoList.querySelectorAll('.list__content');
     
    // Перебираем все элементы списка и присваиваем нужное значение
    for (let task of taskElements) {
      task.draggable = true;
    }

    toDoList.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
      })
      
      toDoList.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
      });

      toDoList.addEventListener(`dragover`, (evt) => {
        // Разрешаем сбрасывать элементы в эту область
        evt.preventDefault();
        
        // Находим перемещаемый элемент
        const activeElement = toDoList.querySelector(`.selected`);
        // Находим элемент, над которым в данный момент находится курсор
        const currentElement = evt.target;
        // Проверяем, что событие сработало:
        // 1. не на том элементе, который мы перемещаем,
        // 2. именно на элементе списка
        const isMoveable = activeElement !== currentElement &&
          currentElement.classList.contains(`list__content`);
      
        // Если нет, прерываем выполнение функции
        if (!isMoveable) {
          return;
        }
      
        // Находим элемент, перед которым будем вставлять
        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;
      
        // Вставляем activeElement перед nextElement
        toDoList.insertBefore(activeElement, nextElement);
      });

      const getNextElement = (cursorPosition, currentElement) => {
        // Получаем объект с размерами и координатами
        const currentElementCoord = currentElement.getBoundingClientRect();
        // Находим вертикальную координату центра текущего элемента
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
      
        // Если курсор выше центра элемента, возвращаем текущий элемент
        // В ином случае — следующий DOM-элемент
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
      
        return nextElement;
      };
    };

function clickButtonSort() { //функция отвечает за запуск функции сортировки элементов при нажатии на кнопку buttonSort
    if(toDoList.style.display == 'block') { // проверка на пустую строку
        buttonSort.classList == 'button__sort__To__Do__list'? sortList():sortListReverse();
    } else {
         return ;
    };
};

function sortList() { // сортировка от а до я и a до z
let sortInfo = document.querySelectorAll('.list__content');
let newSortArr = arrayToDo.sort();
for(var i = 0; i < sortInfo.length; i++) {
    sortInfo[i].innerHTML = newSortArr[i] + " ";
  }
  buttonSort.classList = 'button__sort__To__Do__list__two'
};

function sortListReverse () { //сортировка от я до а от z до a
let sortInfo = document.querySelectorAll('.list__content');
let newSortArr = arrayToDo.sort();
let newSortArrReverse = newSortArr.reverse();
for(var i = 0; i < sortInfo.length; i++) {
    sortInfo[i].innerHTML = newSortArrReverse[i] + " ";
  }
  buttonSort.classList = 'button__sort__To__Do__list';
};

function clickButtonDelet(event) { 
    event.preventDefault();
    let elementDiv = document.querySelector('.list__content');
    elementDiv.remove();
    console.log("удалил");
    toDoList.innerText == ''? toDoList.style.display = 'none':toDoList.style.display = 'block';
};
