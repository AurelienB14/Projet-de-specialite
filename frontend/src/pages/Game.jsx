import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import GameAvis from '../components/game/GameAvis';
import GameToolBar from '../components/game/GameToolBar';
import VerifyMySetup from '../components/game/VerifyMySetup'
import Button from '../components/ui/Button';
import VerticalDivider from '../components/ui/VerticalDivider';
import GamePlateform from '../components/game/GamePlatform';
import { isAuthenticated } from '../api/auth';
import api from '../api/api';

const Game = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    const handleDelete = () => {
        if (confirm('Supprimer ce jeu ?')) {
            axios.delete(`http://localhost:8000/api/game/delete/${game.id}`)
                .then(() => navigate('/games'));
        }
    }
    useEffect(() => {
        if (!isAuthenticated()) return;
        api.get('/me')
            .then(res => setUser(res.data))
            .catch(() => { });
    }, []);
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
        <div className='flex flex-col gap-4'>

            <div className='relative w-full h-84 overflow-hidden rounded-xl'>
                <img src={game.image} alt={game.nom} className="w-full h-auto object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className='absolute bottom-0 left-0 p-6 flex flex-col items-start'>
                    <h1 className=' font-bold font '>{game.nom}</h1>

                    <div className='w-full flex flex-row gap-[10px]  flex-wrap'>
                        {game.categories && game.categories.map(categorie => (

                            <Button variant="ghost" size="sm" key={categorie}>{categorie}</Button>
                        ))}
                    </div>


                </div>
            </div>



            <div className=''>

                <div className="grid grid-cols-2 gap-22 mt-10">

                    <div className='flex flex-col gap-4'>
                        <GameToolBar game={game} />

                        <div className='flex gap-8 card w-full'>
                            <div className='flex flex-col w-full'>
                                <p className='text-text-muted'>Date de sortie</p>
                                <div className=''>
                                    <p>{game.date}</p>
                                </div>
                            </div>
                            <VerticalDivider />

                            <div className='flex flex-col w-full'>
                                <p className='text-text-muted'>Âge minimum</p>
                                <div className=''>
                                    <p className='font-bold'>{game.age}</p>
                                </div>

                            </div>
                            <VerticalDivider />

                            <div className='flex flex-col w-full'>
                                <p className='text-text-muted'>Nombre de ventes</p>
                                <div className=''>
                                    <p>{game.ventes}</p>
                                </div>

                            </div>

                        </div>


                        <p className=" whitespace-pre-line">{game.description}</p>

                        <GameAvis gameId={game.id} />







                    </div>

                    <div className='flex flex-col gap-8'>
                        <GamePlateform />

                        <VerifyMySetup />

                    </div>

                </div>
            </div>

            {isAdmin && (
                <div className='flex justify-center gap-4'>
                    <Button href={`/createupdategame/${game.id}`}>
                        Modifier
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant='danger'>
                        Supprimer
                    </Button>
                </div>
            )}


            <div className='grid grid-cols-2'>
            </div>


            <div>
            </div>

        </div>
    )
}

export default Game