let buttonToDo = document.querySelector('.button__To__Do__list');
let inputToDo = document.querySelector('.input__To__Do__list');
let buttonSort = document.querySelector('.button__sort__To__Do__list'); 
let formList = document.querySelector('.form__To__Do__list');
let toDoList = document.querySelector('.list');

let arrayToDo = []; //массив листа

// тут локальное хранилище 
let todos;
function toLocal() {
    // event.preventDefault(); 
    todos = toDoList.innerHTML;
    localStorage.setItem('todos', todos);
    localStorage.setItem('massiv', JSON.stringify(arrayToDo));
}

if(localStorage.getItem('todos')) {
    toDoList.innerHTML = localStorage.getItem('todos');
    let resmas = localStorage.getItem('massiv'); 
    let newMass = JSON.parse(resmas);
    arrayToDo = newMass;
    toDoList.style.display = 'block'; 
    toDoList.innerText == ''? toDoList.style.display = 'none':toDoList.style.display = 'block';
 }
// локальное хранилище закончено

buttonToDo.addEventListener('click', (event) => clickButtonToDo(event));
buttonSort.addEventListener('click', clickButtonSort);
window.addEventListener ("keypress", function (e) {
    if (e.key !== 13)  return;
    clickButtonToDo(e);
    console.log("enter!");
});

function clickButtonToDo(event){
    event.preventDefault();
    if(document.querySelector('.input__To__Do__list').value == '') { // проверка на пустую строку
        event.preventDefault(); return ;
    } else {
        toDoList.style.display = 'block';
    arrayToDo.push(inputToDo.value); //добавляет значение инпута в массив
    addTask(inputToDo.value);
    document.querySelector('.input__To__Do__list').value = ''; // чистит инпут для новой задачи
    };
    toLocal();
};

function addTask(name) { // функция отвечает за добавление и стилизацию блока с поставленной задачей в блок .list
    let newElementDiv = document.createElement('div');
    let buttonDelet = document.createElement('button');
    buttonDelet.type = 'button';
    let buttonDeletClass = buttonDelet.classList;
    let newElementDivClass = newElementDiv.classList;
    newElementDivClass.add('list__content');//добавил стилизацию для блока с задачей
    buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
    newElementDiv.innerText = name;
    buttonDelet.innerText = 'X';
    toDoList.append(newElementDiv);
    newElementDiv.append(buttonDelet);
    buttonDelet.addEventListener('click', clickButtonDelet); // обработчик клика по кнопке удаления
    
    // код drag and drop 
    let taskElements = toDoList.querySelectorAll('.list__content');
    // Перебираем все элементы списка и присваиваем нужное значение
    for (let task of taskElements) {
      task.draggable = true;
    }

    toDoList.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
        toLocal()
      })
      
      toDoList.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
        toLocal()
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
            toLocal()
          return;
          
        }
      
        // Находим элемент, перед которым будем вставлять
        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;
      
        // Вставляем activeElement перед nextElement
        toDoList.insertBefore(activeElement, nextElement);
        toLocal()
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
            toLocal();
        return nextElement;
      };
      toLocal();
      //drag and drop закончен
};

function clickButtonSort() { //функция отвечает за запуск функции сортировки элементов при нажатии на кнопку buttonSort
    if(toDoList.style.display == 'block') { // проверка на пустую строку
        buttonSort.classList == 'button__sort__To__Do__list'? sortList():sortListReverse();
        toLocal();
    } else {
        toLocal();
        return;
    };
};

function sortList() { // сортировка от а до я и a до z
    event.preventDefault();
    let sortInfo = document.querySelectorAll('.list__content');
    arrayToDo.sort((a, b) => {
        if (a < b) {
            return -1;
        };
        if (a > b) {
            return 1;
        };
        return 0;
    });

    for(let i = 0; i < sortInfo.length; i++) {
            sortInfo[i].innerHTML = '';
            sortInfo[i].innerHTML = arrayToDo[i]; //newSortArr[i] + " ";
            let buttonDelet = document.createElement('button');
            buttonDelet.type = 'button';
            buttonDelet.innerText = 'X';
            let buttonDeletClass = buttonDelet.classList;
            buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
            sortInfo[i].append(buttonDelet);
            buttonDelet.addEventListener('click', clickButtonDelet); // обработчик клика по кнопке удаления 
        }
    buttonSort.classList = 'button__sort__To__Do__list__two'
};

function sortListReverse () { //сортировка от я до а от z до a
    event.preventDefault();
    let sortInfo = document.querySelectorAll('.list__content');
    arrayToDo.sort((a, b) => {
        if (a < b) {
            return 1;
        };
        if (a > b) {
            return -1;
        };
        return 0;
    });

    for(var i = 0; i < sortInfo.length; i++) {
        sortInfo[i].innerHTML = '';
        sortInfo[i].innerHTML = arrayToDo[i];
        let buttonDelet = document.createElement('button');
        buttonDelet.type = 'button';
        buttonDelet.innerText = 'X';
        let buttonDeletClass = buttonDelet.classList;
        buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
        sortInfo[i].append(buttonDelet);
        buttonDelet.addEventListener('click', clickButtonDelet); // обработчик клика по кнопке удаления
    };
    buttonSort.classList = 'button__sort__To__Do__list';
    toLocal();
};

function clickButtonDelet() {
    // let elementDiv = document.querySelector('.list__content');
    let elementDiv = this.closest('.list__content');
    elementDiv.remove();
    let str = elementDiv.innerText;
    str = str.split('X').join('');
    console.log(str);
    let elementRemove = arrayToDo.indexOf(str);
    console.log(elementRemove);
    arrayToDo.splice(elementRemove, 1);
    console.log(arrayToDo);
    toDoList.innerText == ''? toDoList.style.display = 'none':toDoList.style.display = 'block';
    toLocal();
};
