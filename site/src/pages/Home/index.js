import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css'

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadfilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: "bd2b9024d3e7f75e115fde7891db0960",
                    language: "pt-BR",
                    page: 1,
                }
            })
            
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);

        }
        loadfilmes();

    }, [])

        if(loading){
            return(
                <div className="loading">
                    <h2>Carregando filmes....</h2>
                </div>
            )
        }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
