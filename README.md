# Cocktail Search Application

This web application grant you access to a cocktail database. You can search cocktails by its name, mark and unmark them as favorites and storage them for later. These resuts will be kept in the local storage in case you want to retrieve them after closing this website. 

It has been built using HTML, SCSS and Javascript. 

Other resources used are as follows:  
- Adalab web starter kit: The project template developed by Adalab. 
- Font awesome. 
- Google fonts. 
- Font joy 
- CSS Gradient

## HTML Structure Cancel changes

The application has a very simple html structure. It is divided in three main parts: 
- Header: Heading, search input, search button and reset button. 
- Search section: List of search results. 
- Favorites section: List of favourite cocktails marked by the user. 

## SCSS 

The scss follows the same structure of the html file: 

- Header - Display flex. 
- Search section - Display flex. 
- Favorites section - Display grid. 


## Javascritp 

We can differenciate two type of actions on the application: 

- Actions to be made when the page loads: 
- Actions trigger by the user by clicking a button. 

### Actions to be made when the page loads: 

- Retrieve data from local storage. 
- Render the margarita list in case it is storaged on the local storage. 
- Render the favorite list in case it is storaged on the local storage. 
- Fetch data from the  API - https://www.thecocktaildb.com/ -
- Show the reset favorites button in case there are storage favourite cocktails. 

### Actions trigger by the user:
- Show the search list matching the input with the name of the cocktail. 
- Render the search list. 
- Add cocktails to the favorite list. 
- Render the favourite list. 
- Reset the search and the favorite list. 
- Reset the favorite list.
- Scroll the search list.

## Author 

Almudena Lloret Gallego
February 2023

![coctelería](https://user-images.githubusercontent.com/121821529/228499719-dc58096d-c440-4433-9826-ada55a519fbb.jpeg)
