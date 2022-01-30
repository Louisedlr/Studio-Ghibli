let movies;
let characters;
let locations;


document.addEventListener('DOMContentLoaded', async() =>{
    await getMovieData();
    fillGridMovies();
    selectMovies();
    filmMenuButton();
    selectDisplayMovie();
    
    
    if (window.matchMedia("(max-width: 650px)").matches) {
        const menuIcon=document.querySelector('#icon-menu');
        menuIcon.addEventListener("click", function(){
            var etat = document.querySelector('.left-box').style.display;
            if(etat=="none"){
            document.querySelector('.left-box').style.display="flex";
            }
            else{
            document.querySelector('.left-box').style.display="none";
            }  
         }, false);



    }
    
    await getCharacterData();
    charactersButton();    
    

    
    await getLocationData();
    locationsButton();

    

})

const getMovieData = async() => {

    await fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => response.json())
    .then(data => {movies=data;})

}


const getCharacterData = async() => {

    await fetch('https://ghibliapi.herokuapp.com/people')
    .then(response => response.json())
    .then(data => {characters=data;})

}

const getLocationData = async() => {

    await fetch('https://ghibliapi.herokuapp.com/locations')
    .then(response => response.json())
    .then(data => {locations=data;})

}


const clickMenuDisplay=()=> {
    
    const leftBox=document.querySelector('.left-box');
    
    const etat = leftBox.style.display;
        if(etat=="none"){
        leftBox.style.display="flex";
        }
        else{
        leftBox.style.display="none";
        }  
    
}


const select=document.querySelector('#select-movies');
const grid =document.querySelector('.grid');
const rightBox=document.querySelector('.right-box');
const tabImagesMovies =['Images/Square/0.png', 'Images/Square/1.jpg', 'Images/Square/2.jpg', 'Images/Square/3.jpg', 'Images/Square/4.jpg', 'Images/Square/5.jpg', 'Images/Square/6.jpg', 'Images/Square/7.jpg', 'Images/Square/8.jpg', 'Images/Square/9.jpg', 'Images/Square/10.jpg', 'Images/Square/11.jpg', 'Images/Square/12.jpg', 'Images/Square/13.jpg', 'Images/Square/14.jpg', 'Images/Square/15.jpg', 'Images/Square/16.jpg', 'Images/Square/17.jpg', 'Images/Square/18.jpg', 'Images/Square/19.jpg'];
const nbMovie=20;

const selectMovies = () =>{
    while (select.options[1]){
        select.removeChild(select.options[1])
    }
    select.options[0].text="Chose your film";
    for(let i=0; i<nbMovie; i++){
        const movieOption = document.createElement('option');
        movieOption.value = movies[i].title;
        movieOption.text = movies[i].title;
        select.appendChild(movieOption);
    }
}

const displayNone =(element) => {
    element.style.display = "none";
}


const displayGrid =(element) => {
    rightBox.scrollTo(0,0);
    element.style.display = "grid";
}


const displayFlex=(element) => {
    rightBox.scrollTo(0,0);
    element.style.display="flex";
}


const cleanSelect=() => {
    select.value="";
    select.text="";
}


const divMovie = document.createElement('div');


const cleanDiv=(div) => {

    div.innerHTML='';
}


const createMovieInfo=(movie,srcImg) =>{
    cleanDiv(divMovie);

    rightBox.scrollTo(0,0)

    const returnButton=document.createElement('button');

    const img=document.createElement('img');
    const title=document.createElement('h2');
    const date=document.createElement('h3');
    const director=document.createElement('h3');
    const description=document.createElement('p');


    returnButton.innerHTML="RETURN";
    img.src=srcImg;
    title.innerText = movie.title;
    date.innerText = "Released in " + movie.release_date;
    director.innerText = "By " +movie.director;
    description.innerText = " Description : \n \n" +movie.description;

    
    divMovie.appendChild(img);
    divMovie.appendChild(title);
    divMovie.appendChild(date);
    divMovie.appendChild(director);
    divMovie.appendChild(description);
    divMovie.appendChild(returnButton);
    divMovie.classList.add("movie-info");

    
    rightBox.appendChild(divMovie);

    
    returnButton.addEventListener('click', () =>displayNone(divMovie));
    returnButton.addEventListener('click', () =>displayGrid(grid));
    returnButton.addEventListener('click',() =>displayGrid(select));
    returnButton.addEventListener('click',() => cleanSelect());
}


const fillGridMovies = () =>{
    grid.innerHTML='';
    
    for(let i=0; i<nbMovie; i++){

        const gridMovieElement = document.createElement('div');
        const movieName = document.createElement('h3');
        movieName.innerText=movies[i].title;

        var imageMovie = document.createElement('img');
        imageMovie.classList.add("grid-image");
        imageMovie.src=tabImagesMovies[i];

        gridMovieElement.append(imageMovie);
        gridMovieElement.appendChild(movieName);
        gridMovieElement.classList.add("grid-element");
        grid.appendChild(gridMovieElement);

        imageMovie.addEventListener('click', () =>displayNone (grid));
        imageMovie.addEventListener('click', () =>displayNone (select));
        imageMovie.addEventListener('click', () =>displayFlex(divMovie));
        imageMovie.addEventListener('click', () =>createMovieInfo(movies[i], tabImagesMovies[i]));

    }
    
} 


const selectDisplayMovie =() =>{
    
    const selectedItem = select.options[select.selectedIndex].text;
    

    for (let i=0; i<nbMovie; i++){
        
        if (selectedItem==movies[i].title){
            displayNone(grid);
            displayNone(select);
            displayFlex(divMovie);
            createMovieInfo(movies[i],tabImagesMovies[i]);
        }

    }
}







const filmMenuButton = () =>{
    const filmButton=document.querySelector('#film-menu');
    filmButton.addEventListener('click',() =>displayGrid(grid));
    filmButton.addEventListener('click',() =>fillGridMovies());
    filmButton.addEventListener('click',() =>displayGrid(select));
    filmButton.addEventListener('click',() =>cleanDiv(divMovie));
    filmButton.addEventListener('click',() =>cleanDiv(divCharacter));
    filmButton.addEventListener('click',() =>cleanDiv(divLocation));
    filmButton.addEventListener('click',() =>cleanSelect());
    filmButton.addEventListener('click', () => selectMovies());
    filmButton.addEventListener('click', () => selectDisplayMovie());
}





// CHARACTERS




const nbCharacters=40;
const tabImagesChar =['Images/Char/0.jpg','Images/Char/1.jpg','Images/Char/2.jpg','Images/Char/3.jpg','Images/Char/4.jpg','Images/Char/5.jpg','Images/Char/6.jpg','Images/Char/7.jpg','Images/Char/8.jpg','Images/Char/9.jpg','Images/Char/10.jpg','Images/Char/11.jpg','Images/Char/12.jpg','Images/Char/13.jpg','Images/Char/14.jpg','Images/Char/15.jpg','Images/Char/16.jpg','Images/Char/17.jpg','Images/Char/18.jpg','Images/Char/19.jpg','Images/Char/20.jpg','Images/Char/21.jpg','Images/Char/22.jpg','Images/Char/23.jpg','Images/Char/24.jpg','Images/Char/25.jpg','Images/Char/26.jpg','Images/Char/27.jpg','Images/Char/28.jpg','Images/Char/29.jpg','Images/Char/30.jpg','Images/Char/31.jpg','Images/Char/32.jpg','Images/Char/33.jpg','Images/Char/34.jpg','Images/Char/35.jpg','Images/Char/36.jpg','Images/Char/37.jpg','Images/Char/38.jpg','Images/Char/39.jpg']

const selectCharacters = () =>{
    
    while (select.options[1]){
        select.removeChild(select.options[1])
    }
    select.options[0].text="Chose your character";

    for(let i=0; i<nbCharacters; i++){
        
        const charactersOption = document.createElement('option');
        charactersOption.value = characters[i].name;
        charactersOption.text = characters[i].name;
        select.appendChild(charactersOption);
    }
}


const charactersButton = () =>{
    const charactersButton=document.querySelector('#characters-menu');

    charactersButton.addEventListener('click',() =>displayGrid(grid));
    charactersButton.addEventListener('click',() =>fillGridCharacters());
    charactersButton.addEventListener('click',() =>displayGrid(select));
    charactersButton.addEventListener('click',() =>cleanDiv(divCharacter));
    charactersButton.addEventListener('click',() =>cleanDiv(divMovie));
    charactersButton.addEventListener('click',() =>cleanDiv(divLocation));
    charactersButton.addEventListener('click',() =>cleanSelect());
    charactersButton.addEventListener('click', () => selectCharacters());
    charactersButton.addEventListener('click', () => selectDisplayCharacter());
}


const fillGridCharacters = () =>{
    
    grid.innerHTML='';
    
    for(let i=0; i<nbCharacters; i++){

        const gridCharactersElement = document.createElement('div');
        const name = document.createElement('h3');
        name.innerText=characters[i].name;

        var imageChar = document.createElement('img');
        imageChar.classList.add("grid-image");
        imageChar.src=tabImagesChar[i];

        gridCharactersElement.append(imageChar);
        gridCharactersElement.appendChild(name);
        gridCharactersElement.classList.add("grid-element");
        grid.appendChild(gridCharactersElement);

        imageChar.addEventListener('click', () =>displayNone (grid));
        imageChar.addEventListener('click', () =>displayNone (select));
        imageChar.addEventListener('click', () =>displayFlex(divCharacter));
        imageChar.addEventListener('click', () =>createCharacterInfo(characters[i], tabImagesChar[i]));

    }
    
}

const divCharacter = document.createElement('div');

const createCharacterInfo=(character,srcImg) =>{
    
    cleanDiv(divCharacter);

    rightBox.scrollTo(0,0)

    const returnButton=document.createElement('button');

    const img=document.createElement('img');
    const name=document.createElement('h2');
    const age=document.createElement('p');
    const gender=document.createElement('p');
    const film=document.createElement('p');


    returnButton.innerHTML="RETURN";
    img.src=srcImg;
    name.innerText = character.name;
    age.innerText = "Age : " + character.age;
    gender.innerText = "Gender : " +character.gender;

    const characterFilmLink = character.films[0];
    const link = characterFilmLink.split('/');
    const filmId = link[link.length -1];
    const filmTitle = movies.find(element => element.id === filmId).title;

    film.innerText = " Appears in : " +filmTitle;
    

   
    
    divCharacter.appendChild(img);
    divCharacter.appendChild(name);
    divCharacter.appendChild(age);
    divCharacter.appendChild(gender);
    divCharacter.appendChild(film);
    divCharacter.appendChild(returnButton);
    divCharacter.classList.add("movie-info");

    
    rightBox.appendChild(divCharacter);

    
    returnButton.addEventListener('click', () =>displayNone(divCharacter));
    returnButton.addEventListener('click', () =>displayGrid(grid));
    returnButton.addEventListener('click',() =>displayGrid(select));
    returnButton.addEventListener('click',() => cleanSelect());
}


const selectDisplayCharacter =() =>{
    
    const selectedItem = select.options[select.selectedIndex].text;
    

    for (let i=0; i<nbCharacters; i++){
        
        if (selectedItem==characters[i].name){
            displayNone(grid);
            displayNone(select);
            displayFlex(divCharacter);
            createCharacterInfo(characters[i],tabImagesChar[i]);
        }
        
    }
}



// LOCATIONS


const nbLocations=24;
const tabImagesLocation =['Images/Location/0.jpg','Images/Location/1.jpg','Images/Location/2.jpg','Images/Location/3.jpg','Images/Location/4.jpg','Images/Location/5.jpg','Images/Location/6.jpg','Images/Location/7.jpg','Images/Location/8.jpg','Images/Location/9.jpg','Images/Location/10.jpg','Images/Location/11.jpg','Images/Location/12.jpg','Images/Location/13.jpg','Images/Location/14.jpg','Images/Location/15.jpg','Images/Location/16.jpg','Images/Location/17.jpg','Images/Location/18.jpg','Images/Location/19.jpg','Images/Location/20.jpg','Images/Location/21.jpg','Images/Location/22.jpg','Images/Location/23.jpg']

const selectLocations = () =>{
    
    while (select.options[1]){
        select.removeChild(select.options[1])
    }
    select.options[0].text="Chose your location";

    for(let i=0; i<nbLocations; i++){
        
        const locationsOption = document.createElement('option');
        locationsOption.value = locations[i].name;
        locationsOption.text = locations[i].name;
        select.appendChild(locationsOption);
    }
}



const locationsButton = () =>{
    const locationsButton=document.querySelector('#locations-menu');

    locationsButton.addEventListener('click',() =>displayGrid(grid));
    locationsButton.addEventListener('click',() =>fillGridLocations());
    locationsButton.addEventListener('click',() =>displayGrid(select));
    locationsButton.addEventListener('click',() =>cleanDiv(divCharacter));
    locationsButton.addEventListener('click',() =>cleanDiv(divMovie));
    locationsButton.addEventListener('click',() =>cleanDiv(divLocation));
    locationsButton.addEventListener('click',() =>cleanSelect());
    locationsButton.addEventListener('click', () => selectLocations());
    locationsButton.addEventListener('click', () => selectDisplayLocation());
    
}


const fillGridLocations = () =>{
    
    grid.innerHTML='';
    
    for(let i=0; i<nbLocations; i++){

        const gridLocationsElement = document.createElement('div');
        const name = document.createElement('h3');
        name.innerText=locations[i].name;

        var imageChar = document.createElement('img');
        imageChar.classList.add("grid-image");
        imageChar.src=tabImagesLocation[i];

        gridLocationsElement.append(imageChar);
        gridLocationsElement.appendChild(name);
        gridLocationsElement.classList.add("grid-element");
        grid.appendChild(gridLocationsElement);

        imageChar.addEventListener('click', () =>displayNone (grid));
        imageChar.addEventListener('click', () =>displayNone (select));
        imageChar.addEventListener('click', () =>displayFlex(divLocation));
        imageChar.addEventListener('click', () =>createLocationInfo(locations[i], tabImagesLocation[i]));

    }
    
}

const divLocation = document.createElement('div');

const createLocationInfo=(location,srcImg) =>{
    
    
    cleanDiv(divLocation);

    rightBox.scrollTo(0,0)

    const returnButton=document.createElement('button');

    const img=document.createElement('img');
    const name=document.createElement('h2');



    const film=document.createElement('p');
    const climate=document.createElement('p');
    const terrain=document.createElement('p');


    returnButton.innerHTML="RETURN";
    img.src=srcImg;
    name.innerText = location.name;

    const locationFilmLink = location.films[0];
    const link = locationFilmLink.split('/');
    const filmId = link[link.length -1];
    const filmTitle = movies.find(element => element.id === filmId).title;


    film.innerText = " Appears in : " +filmTitle;
    climate.innerText = "Climate : " +location.climate;
    terrain.innerText = " Terrain : " +location.terrain;
    

   
    
    divLocation.appendChild(img);
    divLocation.appendChild(name);
    divLocation.appendChild(film);
    divLocation.appendChild(climate);
    divLocation.appendChild(terrain);
    divLocation.appendChild(returnButton);
    divLocation.classList.add("movie-info");

    
    rightBox.appendChild(divLocation);

    
    returnButton.addEventListener('click', () =>displayNone(divLocation));
    returnButton.addEventListener('click', () =>displayGrid(grid));
    returnButton.addEventListener('click',() =>displayGrid(select));
    returnButton.addEventListener('click',() => cleanSelect());
}

const selectDisplayLocation =() =>{
    
    const selectedItem = select.options[select.selectedIndex].text;
    

    for (let i=0; i<nbLocations; i++){
        
        if (selectedItem==locations[i].name){
            displayNone(grid);
            displayNone(select);
            displayFlex(divLocation);
            createLocationInfo(locations[i],tabImagesLocation[i]);
        }

    }
}






