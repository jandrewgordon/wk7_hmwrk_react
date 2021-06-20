import React from 'react';

const FilmDetails = ({film, films, onWatchedChecked}) => {
    
    const handleChange = (event) => {
        const foundFilm = getFilmByName(event.target.value); 
        onWatchedChecked(foundFilm);  

    }

    const getFilmByName = (filmName) => {
        for(film of films){
            if(film.title === filmName){
                return film
            }
        }
    }
    
    if(film.watched === true){
        return (
            <div>
                <h2>{film.title}</h2>
                <h3>{film.original_title}</h3>
                <p>{film.release_date}</p>
                <p>Director: {film.director}</p>
                <p>{film.description}</p>
                <label name="watched">Watched:</label>
                <input name="watched" type="checkbox" value={film.title} onChange={handleChange} checked></input>
            </div>
        )
    }

    if(film.watched === false){
        return (
            <div>
                <h2>{film.title}</h2>
                <h3>{film.original_title}</h3>
                <p>{film.release_date}</p>
                <p>Director: {film.director}</p>
                <p>{film.description}</p>
                <label name="watched">Watched:</label>
                <input name="watched" type="checkbox" value={film.title} onChange={handleChange}></input>
            </div>
        )
    }

    

}

export default FilmDetails;