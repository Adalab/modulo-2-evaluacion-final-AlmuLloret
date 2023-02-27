'use strict';

//Variables

const inputText = document.querySelector('.js-form__input');
const searchBtn = document.querySelector('.js-form__searchBtn');
const resetBtn = document.querySelector('.js-form__resetBtn');
const listElement = document.querySelector('.js-listSearch');
const listElementFav = document.querySelector('.js-listFav');
const msgNotFound = document.querySelector('.js-form__msg');
const resetFavBtn = document.querySelector('.js-fav__input');
const leftArrow = document.getElementById('js-leftArrow');
const rightArrow = document.getElementById('js-rightArrow');
const carrousel=document.querySelector('.js-search__container');
const msgFav= document.querySelector('.js-fav__h2'); 
const imgPlaceholder='https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const urlStart = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
let coctailData = [];
let coctailFav = [];

// Funtions 

// To do when the page loads: 
const cocktailFavStored = JSON.parse(localStorage.getItem('favCoctails'));
if (cocktailFavStored) {
  coctailFav = cocktailFavStored;
  renderFav(coctailFav);
}
addFavRstBtn (); 


// Fetch API Margaritas
const cocktailDatatStored = JSON.parse(localStorage.getItem('coctails'));
if (cocktailDatatStored) {
  coctailData = cocktailDatatStored;
  renderCoctailList(coctailData);
} else {
  fetch(urlStart)
    .then((response) => response.json())
    .then((data) => {
      coctailData = data.drinks.map((drinks) => ({
        name: drinks.strDrink,
        id: drinks.idDrink,
        image:drinks.strDrinkThumb,
      }));
      renderCoctailList(coctailData);
      localStorage.setItem('coctails', JSON.stringify(coctailData));
    });
}


//Paints a cocktail with image and data from cocktail json data

function renderCoctail(coctailData){

  // To add the placeholder image if the coctail does not have one.
  if(coctailData.image === null){
    coctailData.image=imgPlaceholder;
  }

  //To paint the div with the coctail image and coctail name:
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

  // Div that contains the name and image
  const div2Element = document.createElement('div');
  div2Element.setAttribute ('class', 'coctail__div__t');
  divElement.appendChild(div2Element);

  const h3Element = document.createElement('h3');
  h3Element.setAttribute ('class', 'coctail__div__t__name');
  div2Element.appendChild(h3Element);
  const nameCoctail = document.createTextNode(coctailData.name);
  h3Element.appendChild(nameCoctail);

  const iElement = document.createElement('i');
  iElement.setAttribute ('class', 'fa-regular fa-star coctail__div__t__icon js-star');
  //iElement.setAttribute ('class', 'hidden');
  div2Element.appendChild(iElement);

  liElement.appendChild (divElement);

  // To check if the coctail is already on the coctailFav array. If so, (!== undefined) it adds the class selected to the div. 
  const alreadyFav = coctailFav.find (oneCoctailFav => coctailData.id===oneCoctailFav.id);
  if (alreadyFav !== undefined){
    //divElement.setAttribute ('class', 'coctail__div js-coctail selected');
    iElement.setAttribute ('class', 'fa-solid fa-star coctail__div__t__icon--selected js-star');
  }
  return liElement;
}

function renderCoctailList(coctailData) {
  listElement.innerHTML=''; 
  for (const oneCoctail of coctailData) {
    listElement.appendChild (renderCoctail(oneCoctail)) ;
  }
  // To add the event to each div
  addEventToCoctail();

}

function renderFav(coctailFav){
  listElementFav.innerHTML='';
  for (const oneCoctail of coctailFav) {
    listElementFav.appendChild (renderCoctail(oneCoctail)) ;
  }
  localStorage.setItem('favCoctails', JSON.stringify(coctailFav));
  // To add the event to each div
  addEventToCoctail();
}

function handleSearchBtn(ev){
  ev.preventDefault();
  const searchValue= inputText.value;
  fetch(`${url}${searchValue}`)
    .then((response) => response.json())
    .then(function(data){
      if (data.drinks !== null){
        coctailData = data.drinks.map((drinks) => ({
          name: drinks.strDrink,
          id: drinks.idDrink,
          image:drinks.strDrinkThumb,
        }));
        const searchList = coctailData.filter(coctail => coctail.name.toLowerCase().includes(searchValue.toLowerCase()));
        renderCoctailList(searchList);
      } else {
        msgNotFound.innerHTML='Este cóctel no lo tenemos, prueba con otro.';
      }});
}

function handleFav(ev){
  ev.preventDefault();

  const idSelected = ev.currentTarget.id;
  //To introduce the selected object into coctailSelected (id)
  const coctailSelected = coctailData.find(coctail => coctail.id === idSelected);
  // To check if it is already on the favorites array
  const indexCoctail = coctailFav.findIndex(palette => palette.id === idSelected); 

  if (indexCoctail === -1) { // Returns -1 if it is not on the fav array
    coctailFav.push(coctailSelected);
  } else { // To eliminate if it is on the fav array
    coctailFav.splice(indexCoctail, 1);
  }
  //To show/hide the reset fav button
  addFavRstBtn ();

  //Render favorites:
  renderFav(coctailFav);
  renderCoctailList(coctailData);
}

//Function to add event to all cocktail's div
function addEventToCoctail() {
  const liCoctailData = document.querySelectorAll('.js-coctail');
  for (const li of liCoctailData ) {
    li.addEventListener('click', handleFav);
  }
}

function handleResetBtn() {
  inputText.value = '';
  localStorage.removeItem('favCoctails');
  coctailFav.length = 0;
  coctailData.length = 0;
  const cocktailDatatStored = JSON.parse(localStorage.getItem('coctails'));
  coctailData = cocktailDatatStored;
  renderCoctailList(coctailData);
  renderFav(coctailFav);
  msgNotFound.innerHTML = '';
  resetFavBtn.classList.remove('fav__input--shown');
  resetFavBtn.classList.add('fav__input');
}

function handleResetFavBtn() {
  localStorage.removeItem('favCoctails');
  coctailFav.length = 0;
  renderFav(coctailFav);
  renderCoctailList(coctailData);
  resetFavBtn.classList.remove('fav__input--shown');
  resetFavBtn.classList.add('fav__input');
  msgFav.innerHTML = 'Selecciona el cóctel para añadirlo a favoritos'; 
}

//function to show/hide the reset fav button
function addFavRstBtn () {
  if (coctailFav.length !== 0){
    resetFavBtn.classList.add('fav__input--shown');
    resetFavBtn.classList.remove('fav__input');
    msgFav.innerHTML = 'Tus favoritos :';
  } else {
    resetFavBtn.classList.remove('fav__input--shown');
    resetFavBtn.classList.add('fav__input');
    msgFav.innerHTML = 'Selecciona el cóctel para añadirlo a favoritos';
  }
}


// Functions to control the carrousel
function handleRightArrow(){
  carrousel.scrollLeft += carrousel.offsetWidth;
}

function handleLeftArrow(){
  carrousel.scrollLeft -= carrousel.offsetWidth;
}


//Events

searchBtn.addEventListener('click', handleSearchBtn);
resetBtn.addEventListener('click', handleResetBtn);
resetFavBtn.addEventListener('click', handleResetFavBtn);
rightArrow.addEventListener('click', handleRightArrow);
leftArrow.addEventListener('click', handleLeftArrow);

