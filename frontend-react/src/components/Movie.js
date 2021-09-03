
import { useEffect, useState } from "react";
import MovieService from "../services/MovieService";

const Movie = (props) => {
    const initialMovieState ={
id: null,
title: '',
cover: '',
synopsis: '',
year: null,
};


const [currentMovie,setCurrentMovie] = useState (initialMovieState);
const [message,setMessage] = useState ('');

const getMovie = id => {

    MovieService.getById(id)
    .then(response => {
        setCurrentMovie(response.data);
    }).catch(err => {
        alert('Ocurrió un error');
        console.log(err);
    });
}

useEffect(() =>{
    getMovie(props.match.params.id)
}, [props.match.params.id]);

const handleInputChange = event =>{
    const {name, value} = event.target;
    setCurrentMovie({...currentMovie, [name]: value});
}

const updateMovie = () =>{

    MovieService.update(currentMovie.id, currentMovie)
    .then(response => {
        setMessage('La película fue actualizada correctamente');
    }).catch(err => {
        setMessage('Ocurrió un error actualizando la película');
        console.log(err);
    });
}


const deleteMovie = () => {
    if (!window.confirm('Seguro que desea eliminar esta película?')){
        return;
    }
    MovieService.remove(currentMovie.id)
    .then(responde => {
        props.history.push('/movies');
    })
    .catch(err => {
        setMessage('Ocurrió un error al tratar de eliminar la película');
        console.log(err);
    });
}

    return (
        <div className="submit-form">
            {!currentMovie ? (
                <div>
                    <h4>Por favor selecciona una película</h4>
                </div>
            ):(
            <div>  
                <div className="form-group">
                    <label>Título</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    defaultValue={currentMovie.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </div>

                <div className="form-group">
                    <label>Portada</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="cover"
                    required
                    defaultValue={currentMovie.cover}
                    onChange={handleInputChange}
                    name="cover"
                  />
                </div>


                <div className="form-group">
                    <label>Synopsis</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="synopsis"
                    required
                    defaultValue={currentMovie.synopsis}
                    onChange={handleInputChange}
                    name="synopsis"
                  />
                </div>

                <div className="form-group">
                    <label>Año</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="year"
                    required
                    defaultValue={currentMovie.year}
                    onChange={handleInputChange}
                    name="year"
                  />
                </div>
                <button onClick={updateMovie} className="btn btn-success">Actualizar pelicula</button>
                <button onClick={deleteMovie} className="btn btn-danger">Eliminar pelicula</button>
                <div>
                    <p>{message}</p>
                    </div>
            </div>
            )}
        </div>
)

};

export default Movie;