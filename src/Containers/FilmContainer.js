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
        let filmsList = [...films]
        let watchedFilmsList = [...watchedFilms]
        let unwatchedFilmsList = [...unwatchedFilms]
        for(let film of filmsList){
            for(let watchedFilm of watchedFilmsList){
                if(watchedFilm !== film){
                    unwatchedFilmsList.push(film)
                }        
            }
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
        watchedList.push(foundFilm)
        setWatchedFilms(watchedList)
        getUnwatchedFilms();
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