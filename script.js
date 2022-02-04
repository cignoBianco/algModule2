let buttonToDo = document.querySelector('.button__To__Do__list');
let inputToDo = document.querySelector('.input__To__Do__list');
let buttonSort = document.querySelector('.button__sort__To__Do__list');
let formList = document.querySelector('.form__To__Do__list');
let toDoList = document.querySelector('.list');

let arrayToDo = []; //массив листа

buttonToDo.addEventListener('click', clickButtonToDo);
buttonSort.addEventListener('click', clickButtonSort);

function clickButtonToDo(event){
    event.preventDefault();
    if(document.querySelector('.input__To__Do__list').value == '') { // проверка на пустую строку
        return ;
    } else {
        toDoList.style.display = 'block';
    arrayToDo.push(inputToDo.value); //добавляет значение инпута в массив
    console.log(inputToDo.value,document.querySelector('.input__To__Do__list').value)
    addTask(inputToDo.value);
    document.querySelector('.input__To__Do__list').value = ''; // чистит инпут для новой задачи
    };
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
    buttonDelet.addEventListener('click', clickButtonDelet);
    newElementDiv.append(buttonDelet);
    
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
    toDoList.innerText == ''? toDoList.style.display = 'none':toDoList.style.display = 'block';
};