import {useState, useEffect} from 'react';
import MovieService from '../services/MovieService';
import { Link } from 'react-router-dom';
const MovieList = () => {
    const [movies, setMovies] = useState ([]);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    useEffect(() => {
        retrieveMovies();
    }, []);


    const retrieveMovies = () =>{
        MovieService.getAll()
        .then(responde =>{
            setMovies(responde.data);
            console.log(responde.data);
        })
        .catch(err => {
            alert('Ocurrió un error');
            console.log(err);
        });
    }

    const refreshList = () =>{
        retrieveMovies();
    }


    const setActiveMovie = (movie, index) =>{
        setCurrentMovie(movie);
        setCurrentIndex(index);
    }


    return (
        <div className="row">
            <div className="col-6"> 
            <h4>Películas</h4>
            <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Año</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies&&
                            movies.map((movie,index) => (
                             <tr key={index}>
                                <th>{movie.id}</th>
                                <td>{movie.title}</td>
                                <td>{movie.year}</td>
                                <td>
                                    <i className="bi bi-eye" onClick={() => setActiveMovie(movie, index)}></i>
                                    <Link className="bi bi-pencil" to={'/movies/'+ movie.id}></Link>
                                </td>
                             </tr>
                         ))
                        }
                    </tbody>
                    </table>
            </div>
            <div className="col-6">
                {(currentMovie) ? (
                    <div>
                        <h4>{currentMovie.title}</h4>
                     <div>
                         <label>
                             <strong>Año: </strong>
                          {currentMovie.year}
                         </label>
                     </div>
                    
                     <div>
                         <label>
                             <strong>Sinopsis: </strong>
                          {currentMovie.synopsis}
                         </label>
                     </div>
                     <div>
                        <img className="img-fluid" src ={currentMovie.cover}/>
                     </div>
                        <Link to={'/movies/'+currentMovie.id} className="badge badge-warning">
                            Editar
                        </Link>
                    </div>
                ):(
                    <div>
                        <br />
                    <p>Primero Selecciona una pelicula</p>
                 </div>
                )}  
            </div>
        </div>
    )
    };
    export default MovieList;