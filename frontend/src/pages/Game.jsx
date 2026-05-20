import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GameAvis from '../components/game/GameAvis';
import GameToolBar from '../components/game/GameToolBar';

const Game = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDelete = () => {
        if (confirm('Supprimer ce jeu ?')) {
            axios.delete(`http://localhost:8000/api/game/delete/${game.id}`)
                .then(() => navigate('/games'));
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/${id}`)
            .then(res => {
                setGame(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!game) return <p>Jeu introuvable</p>;

    return (
        <div>
            <a href="/games" className='flex text-[40px]'>◄</a>
            <div className="flex flex-row">
                <div className="w-1/2">
                    <img src={game.image} alt={game.nom} className="w-full h-auto object-cover" />
                </div>
                <div className="w-1/2 flex flex-col gap-[10px] items-center">
                    <h2 className='text-center font-bold'>{game.nom}</h2>
                    <p className="text-center">{game.description}</p>
                    <p>Date de sortie : {game.date}</p>
                    <p>Âge minimum : {game.age}</p>
                    <p>Nombre de ventes : {game.ventes}</p>

                    <GameToolBar game={game} />

                    
                </div>
            </div>
            <div className='flex justify-center m-[25px]'>
                <Link to={`/createupdategame/${game.id}`} className='w-[100px] h-[40px] border-[2px] rounded-lg border-black bg-blue-500 cursor-pointer'>
                    <button className='cursor-pointer'>Modifier</button>
                </Link>
                <button
                    onClick={handleDelete}
                    className='w-[100px] h-[40px] border-[2px] rounded-lg border-black bg-red-500 cursor-pointer text-white'>
                    Supprimer
                </button>
            </div>

            <div className='w-1/3'>
                <GameAvis gameId={game.id} />

            </div>

        </div>
    )
}

export default Game