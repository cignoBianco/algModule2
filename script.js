let buttonToDo = document.querySelector('.button__To__Do__list');
let inputToDo = document.querySelector('.input__To__Do__list');
let buttonSort = document.querySelector('.button__sort__To__Do__list');
let formList = document.querySelector('.form__To__Do__list');
let toDoList = document.querySelector('.list');
buttonToDo.addEventListener('click', clickButtonToDo);
buttonSort.addEventListener('click', clickButtonSort);

let arrayToDo = []; //массив листа

function clickButtonToDo(event){
    event.preventDefault();
    if(document.querySelector('.input__To__Do__list').value == '') { // проверка на пустую строку
        return 
    } else {
        toDoList.style.display = 'block';
    arrayToDo.push(inputToDo.value); //добавляет значение инпута в массив
    addTask(inputToDo.value);
    document.querySelector('.input__To__Do__list').value = ''; // чистит инпут для новой задачи
    }
}
function addTask(name) { // функция отвечает за добавление и стилизацию блока с поставленной задачей в блок .list
    let newElementDiv = document.createElement('div')
    let newElementDivClass = newElementDiv.classList;
    newElementDivClass.add('list__content');//добавил стилизацию для блока с задачей
    newElementDiv.innerText = name;
    toDoList.append(newElementDiv);
    }
function clickButtonSort() { //функция отвечает за запуск функции сортировки элементов при нажатии на кнопку buttonSort
    if(toDoList.style.display == 'block') { // проверка на пустую строку
        buttonSort.classList == 'button__sort__To__Do__list'? sortList():sortListReverse();
        console.log('нажал');
    } else {
         return
    }
}
function sortList() { // сортировка от а до я и a до z
let sortInfo = document.querySelectorAll('.list__content');
let newSortArr = arrayToDo.sort();
for(var i = 0; i < sortInfo.length; i++) {
    sortInfo[i].innerHTML = newSortArr[i] + " ";
  }
  buttonSort.classList = 'button__sort__To__Do__list__two'
}

function sortListReverse () { //сортировка от я до а от z lj a
let sortInfo = document.querySelectorAll('.list__content');
let newSortArr = arrayToDo.sort();
let newSortArrReverse = newSortArr.reverse();
for(var i = 0; i < sortInfo.length; i++) {
    sortInfo[i].innerHTML = newSortArrReverse[i] + " ";
  }
  buttonSort.classList = 'button__sort__To__Do__list';
}