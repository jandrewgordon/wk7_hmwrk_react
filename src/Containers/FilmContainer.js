import React, {useState, useEffect} from 'react';
import FilmList from '../Components/FilmList'
import FilmDetails from '../Components/FilmDetails'
import WatchedDropDown from '../Components/WatchedDropDown';

const FilmContainer = () => {
    const[films, setFilms] = useState([]);
    const[selectedFilm, setSelectedFilm] = useState(null);
    const[dropDownValue, setDropDownValue] = useState("all");
    const[watchedFilms, setWatchedFilms] = useState([]);
    const[unwatchedFilms, setUnwatchedFilms] = useState([]);

    useEffect(() => {
        getFilms(); 
    }, [])

    // useEffect(() => {
    //     setInitialWatchedValue(); 
    // }, [])

    // useEffect(() => {
    //     getUnwatchedFilms();
    // }, [watchedFilms])

    const getFilms = function(){
        fetch('https://ghibliapi.herokuapp.com/films')
        .then(res=>res.json())
        .then(films => setFilms(films))
        .then(setInitialWatchedValue())
    }

    const setInitialWatchedValue = function() {
        console.log("I ran")
        let filmsList = [...films]
        for(let film of filmsList){
            console.log("running over here")
            film.watched = false;   
        }
        setFilms(filmsList);
    }

    const getUnwatchedFilms = function() {
        console.log("I'm running!")
        let filmsList = [...films]
        let watchedFilmsList = [...watchedFilms]
        let unwatchedFilmsList = [...unwatchedFilms]
        let filmAlreadyEntered = null;
        if(unwatchedFilmsList === 0){
            for(let film of filmsList){
                for(let watchedFilm of watchedFilmsList){
                    if(watchedFilm !== film){
                        unwatchedFilmsList.push(film)
                    }
                }
            }
        }
        if(unwatchedFilmsList !== 0){
            console.log("there are already films")

        }
                   
               
         
        setUnwatchedFilms(unwatchedFilmsList)
    }

    const onFilmClick = (film) => {
        setSelectedFilm(film);
    }

    const onDropDownSelect = (value) => {
        setDropDownValue(value);
    }

    const onWatchedChecked = (foundFilm) => {
        let watchedList = [...watchedFilms]
        let filmExists = false;
        for(let film of watchedList){
            if(film.id === foundFilm.id){
                filmExists = true;
            }
        }
        if(filmExists === false){
            foundFilm.watched = true;
            console.log(foundFilm)
            watchedList.push(foundFilm)
            setWatchedFilms(watchedList)            
        }
        
        // getUnwatchedFilms();
    }
    
return (
    <div>
        <WatchedDropDown onDropDownSelect={onDropDownSelect}/>
        <FilmList films={films} onFilmClick={onFilmClick} dropDownValue={dropDownValue} watchedFilms={watchedFilms} unwatchedFilms={unwatchedFilms}/>
        {selectedFilm ? <FilmDetails film={selectedFilm} films={films} onWatchedChecked={onWatchedChecked}/> : null}
    </div>
)

}

export default FilmContainer