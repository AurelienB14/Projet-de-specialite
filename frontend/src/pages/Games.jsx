import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                const ids = res.data;
                const requests = ids.map(id =>
                    axios.get(`http://localhost:8000/api/game/${id}`)
                );
                return Promise.all(requests);
            })
            .then(responses => {
                const gamesData = responses.map(res => res.data);
                setGames(gamesData);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <div className='flex justify-center m-[25px]'>
                <Link to={`/createupdategame`}>
                    <button className='w-[100px] h-[40px] border-[2px] rounded-lg border-black bg-green-500 cursor-pointer'>Ajouter</button>
                </Link>
            </div>
            <div className="flex flex-row gap-[25px] flex-wrap justify-center w-full">
                {games.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id}>
                        <div className="flex flex-col w-[300px] gap-[10px] items-center border-[3px] border-black cursor-pointer hover:scale-105 transition-transform duration-200">
                            <h2 className="text-center font-bold w-full text-sm leading-tight line-clamp-1">{game.nom}</h2>
                            <img src={game.image} alt={game.nom} className="w-full h-[200px] object-cover"/>
                            <p className='line-clamp-2 text-center'>{game.description}</p>
                            <p>Date de sortie : {game.date}</p>
                            <p>Âge minimum : {game.age}</p>
                            <p>Nombre de ventes : {game.ventes}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Games