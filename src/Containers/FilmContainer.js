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
        getUnwatchedFilms();
    }, [watchedFilms])

    const getFilms = function(){
        fetch('https://ghibliapi.herokuapp.com/films')
        .then(res=>res.json())
        .then(films => setFilms(films))
    }

    const getUnwatchedFilms = function() {
        console.log("I'm running!")
        let filmsList = [...films]
        let watchedFilmsList = [...watchedFilms]
        let unwatchedFilmsList = [...unwatchedFilms]
        let filmAlreadyEntered = null;
        if(unwatchedFilmsList == 0){
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
            // for(let film of filmsList){
            //     for(let watchedFilm of watchedFilmsList){
            //         if(watchedFilm !== film){
            //             for(let existingUnwatchedFilm of unwatchedFilmsList){
            //                 if(existingUnwatchedFilm !== film){
            //                     unwatchedFilmsList.push(film)
            //                 }
            //                 else{
            //                     console.log("already there")
            //                 }
            //             } 
            //         }
            //     }
            // }
        }
                    
                       


        
                    // if(unwatchedFilmsList == 0){
                     
                    // else{
                    //     console.log("there are unwatched films")
                        // for(let existingFilm of unwatchedFilmsList){
                        //     console.log(existingFilm)
                        //     if(watchedFilm !== existingFilm){
                        //         console.log("didnt find it")
                        //         filmAlreadyEntered = false;
                        //     }
                        //     if(filmAlreadyEntered === false){
                        //         unwatchedFilmsList.push(film)
                        //     }
                        // }
         
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
                console.log("I'm here")
            }
        }
        if(filmExists === false){
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