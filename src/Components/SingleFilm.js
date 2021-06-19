import React from 'react';

const SingleFilm = ({film, onFilmClick}) => {

const handleClick = () => {
    onFilmClick(film)
}

    return (
        <li onClick={handleClick}>{film.title}</li>
    )

}

export default SingleFilm;