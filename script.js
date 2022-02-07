let buttonToDo = document.querySelector('.button__To__Do__list');
let inputToDo = document.querySelector('.input__To__Do__list');
let buttonSort = document.querySelector('.button__sort__To__Do__list');v 
let formList = document.querySelector('.form__To__Do__list');
let toDoList = document.querySelector('.list');

let arrayToDo = []; //массив листа

buttonToDo.addEventListener('click', clickButtonToDo);// обработчик событий на кнопку добавить "+"
buttonSort.addEventListener('click', clickButtonSort);// обработчик событий на кнопку сортировки 

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
    // arrayToDo.push(newElementDiv); пока не трогать!!!
    buttonDelet.addEventListener('click', clickButtonDelet); // обработчик клика по кнопке удаления 

    // код drag and drop 
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
      //drag and drop закончен
};

function clickButtonSort() { //функция отвечает за запуск функции сортировки элементов при нажатии на кнопку buttonSort
    if(toDoList.style.display == 'block') { // проверка на пустую строку
        buttonSort.classList == 'button__sort__To__Do__list'? sortList():sortListReverse();
    } else {
        return;
    };
};

function sortList() { // сортировка от а до я и a до z
    event.preventDefault();
    let sortInfo = document.querySelectorAll('.list__content');
    let newSortArr = arrayToDo.sort();
    // for(let f = 0; f < arrayToDo.length; f++) { попробовать еще раз отсортировать по стоке из div!!!!!
    //    let mas = arrayToDo.innerText.sort()

    //     console.log(mas[f].innerText)
    // }
    for(let i = 0; i < sortInfo.length; i++) {
        // for(let f = 0; f < arrayToDo.length; f++) {
            // console.log(arrayToDo[f].firstChild) 
            sortInfo[i].innerHTML = newSortArr[i] + " ";
            let buttonDelet = document.createElement('button');
            buttonDelet.innerText = 'X';
            let buttonDeletClass = buttonDelet.classList;
            buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
            sortInfo[i].append(buttonDelet);
        }
        // sortInfo[i].innerHTML = newSortArr[i] + " ";
        // let buttonDelet = document.createElement('button');
        // buttonDelet.innerText = 'X';
        // let buttonDeletClass = buttonDelet.classList;
        // buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
        // sortInfo[i].append(buttonDelet);
    // }
    buttonSort.classList = 'button__sort__To__Do__list__two'
};

function sortListReverse () { //сортировка от я до а от z до a
    event.preventDefault();
    let sortInfo = document.querySelectorAll('.list__content');
    let newSortArr = arrayToDo.sort();
    let newSortArrReverse = newSortArr.reverse();
    for(var i = 0; i < sortInfo.length; i++) {
        sortInfo[i].innerHTML = newSortArrReverse[i] + " ";
        let buttonDelet = document.createElement('button');
        buttonDelet.innerText = 'X';
        let buttonDeletClass = buttonDelet.classList;
        buttonDeletClass.add('del__button');//добавил стиль для кнопки удаления
        sortInfo[i].append(buttonDelet);
    }
    buttonSort.classList = 'button__sort__To__Do__list';
};

function clickButtonDelet() { 
    let elementDiv = document.querySelector('.list__content');
    elementDiv.remove();
    console.log("удалил");
    toDoList.innerText == ''? toDoList.style.display = 'none':toDoList.style.display = 'block';
};