import React from 'react';
import SingleFilm from './SingleFilm';

const FilmList = ({films, onFilmClick, dropDownValue, watchedFilms, unwatchedFilms}) => {

    const AllFilms = films.map((film, index)=>{
        return <SingleFilm film={film} index={index} key={index} onFilmClick={onFilmClick}/>
    })

    const WatchedFilms = watchedFilms.map((film, index)=>{
        return <SingleFilm film={film} index={index} key={index} onFilmClick={onFilmClick}/>
    })

    const UnwatchedFilms = unwatchedFilms.map((film, index)=>{
        return <SingleFilm film={film} index={index} key={index} onFilmClick={onFilmClick}/>
    })

    if(dropDownValue === "all"){
        return (
            <ul>
                {AllFilms}
            </ul>
        )
    }
    if(dropDownValue === "watched"){
        return (
            <ul>
                {WatchedFilms}
            </ul>
        )
    }
    if(dropDownValue === "unwatched"){
        return (
            <ul>
                {UnwatchedFilms}
            </ul>
        )
    }

    




}

export default FilmList;