'use strict';

const inputText = document.querySelector('.js-form__input'); 
const searchBtn = document.querySelector('.js-form__searchBtn'); 
const resetBtn = document.querySelector('.js-form__resetBtn'); 
const listElement = document.querySelector('.js-listSearch');


const urlStart = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; 
let coctailData = []; 



// Fetch API Margaritas
const cocktailDatatStored = JSON.parse(localStorage.getItem("coctails"));; 
if (cocktailDatatStored) {
  console.log('SÍ hay coctails en el localStorage'); 
  coctailData = cocktailDatatStored; 
  renderCoctailList(coctailData); 
}else{
  console.log('NO hay coctails en el localStorage'); 
  fetch(urlStart)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.drinks);
        coctailData = data.drinks.map((drinks) => ({
          name: drinks.strDrink,
          id: drinks.idDrink,
          image:drinks.strDrinkThumb, 
        }));
          console.log('start');
          console.log(coctailData);
          renderCoctailList(coctailData); 
          console.log('Guardo margaritas en lS')
          localStorage.setItem('coctails', JSON.stringify(coctailData)); 
      });    
}; 


function renderCoctail(coctailData){
    const liElement = document.createElement('li');
    const divElement = document.createElement('div');

    liElement.setAttribute ('class', 'coctail'); 
    divElement.setAttribute ('class', 'coctail__div js-coctail'); 
    divElement.setAttribute ('id', `${coctailData.id}`); 
    
    const imgElement = document.createElement('img');
    imgElement.setAttribute ('src', coctailData.image); 
    imgElement.setAttribute ('class', 'coctail__div__img'); 
    divElement.appendChild(imgElement); 
    const imgCoctail = document.createTextNode(coctailData.image); 
    imgElement.appendChild(imgCoctail); 

    const h3Element = document.createElement('h3');
    h3Element.setAttribute ('class', 'coctail__div__name'); 
    divElement.appendChild(h3Element); 
    const nameCoctail = document.createTextNode(coctailData.name); 
    h3Element.appendChild(nameCoctail); 

  
    liElement.appendChild (divElement); 
    return liElement; 

}

function renderCoctailList(coctailData){
    listElement.innerHTML=''; 
    for (const oneCoctail of coctailData) {
    console.log('Render list please')
    listElement.appendChild (renderCoctail(oneCoctail)) ;
  }
  addEventToCoctail(); 
}


function handleSearchBtn(ev){
  ev.preventDefault; 
  const searchValue= inputText.value; 
  console.log(searchValue); 

  fetch(`${url}${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
    console.log('1');
    console.log(data.drinks);
    coctailData = data.drinks.map((drinks) => ({
    name: drinks.strDrink,
    id: drinks.idDrink,
    image:drinks.strDrinkThumb, 
  }));
    console.log('2');
    console.log(coctailData);
    const searchList = coctailData.filter(coctail => coctail.name.toLowerCase().includes(searchValue.toLowerCase()));
    console.log('3');
    console.log(searchList);
    renderCoctailList(searchList);
    
  });
}

function handleResetBtn(){
  console.log('reset')
  localStorage.removeItem("coctails"); 
} 

function handleFav(ev){
  ev.preventDefault; 
  console.log('ciao'); 
  console.log(ev.currentTarget);
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  console.log('idSelected');
  console.log(idSelected);

}


function addEventToCoctail() {
  const liCoctailData = document.querySelectorAll(".js-coctail");
  for (const li of liCoctailData ) {
      li.addEventListener("click", handleFav);
  }
}



//Eventos 

searchBtn.addEventListener('click', handleSearchBtn); 
resetBtn.addEventListener('click', handleResetBtn); 
