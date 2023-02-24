'use strict';

const inputText = document.querySelector('.js-form__input'); 
const searchBtn = document.querySelector('.js-form__searchBtn'); 
const resetBtn = document.querySelector('.js-form__resetBtn'); 
const listElement = document.querySelector('.js-listSearch');
const listElementFav = document.querySelector('.js-listFav');

const urlStart = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; 
let coctailData = []; 
let coctailFav = []; 

const cocktailFavStored = JSON.parse(localStorage.getItem("favCoctails"));; 
if (cocktailFavStored) {
  console.log('SÍ hay FAV coctails en el localStorage'); 
  coctailFav = cocktailFavStored; 
  console.log('cocktailFavStored'); 
  console.log(cocktailFavStored); 
  console.log('coctailFav'); 
  console.log(coctailFav); 
  renderFav(coctailFav); 
}; 

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
  // To add the event to each div
  addEventToCoctail(); 
}

function renderFav(coctailFav){
  listElementFav.innerHTML=''; 
  for (const oneCoctail of coctailFav) {
  console.log('Render fav please')
  listElementFav.appendChild (renderCoctail(oneCoctail)) ;
  }
  localStorage.setItem('favCoctails', JSON.stringify(coctailFav)); 
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
  ev.currentTarget.classList.toggle('selected');
  
  const idSelected = ev.currentTarget.id;
  //To introduce the selected object into coctailSelected (id)
  const coctailSelected = coctailData.find(coctail => coctail.id === idSelected);
  console.log (coctailSelected); 

  // To check if it is already on the favorites array
  const indexCoctail = coctailFav.findIndex(palette => palette.id === idSelected)
  console.log(indexCoctail);
  
  if (indexCoctail === -1) { // Returns -1 if it is not on the fav array
    coctailFav.push(coctailSelected);
  } else { // To eliminate if it is on the fav array
      coctailFav.splice(indexCoctail, 1);
  }
  //Render favorites:
  console.log(coctailFav);
  renderFav(coctailFav);

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
