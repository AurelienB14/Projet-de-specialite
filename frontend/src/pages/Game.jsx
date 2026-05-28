import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GameAvis from '../components/game/GameAvis';
import GameToolBar from '../components/game/GameToolBar';
import WhiteDivider from '../components/ui/WhiteDivider'
import VerifyMySetup from '../components/game/VerifyMySetup'
import Button from '../components/ui/Button';

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



            <div className="">

                <div className="grid grid-cols-2 gap-22 items-center">

                    <div className='flex flex-col gap-4'>
                        <GameToolBar game={game} />

                        <p className=" whitespace-pre-line">{game.description}</p>
                        <WhiteDivider />



                        <div className='grid grid-cols-3 gap-8'>
                            <div className='flex flex-col'>
                                <p className='text-text-muted'>Date de sortie</p>
                                <div className='card'>
                                    <p>{game.date}</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-text-muted'>Âge minimum</p>
                                <div className='card'>
                                    <p>{game.age}</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-text-muted'>Nombre de ventes</p>
                                <div className='card'>
                                    <p>{game.ventes}</p>
                                </div>
                            </div>
                        </div>


               
                     
                        <h3>Plateformes</h3>
                        <div className='w-full flex flex-row gap-[10px] justify-center flex-wrap'>
                            {game.plateformes && game.plateformes.map(plateforme => (
                                <p key={plateforme}>{plateforme}</p>
                            ))}
                        </div>
                    </div>


                    <VerifyMySetup />

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

            <div className='grid grid-cols-2'>
                <GameAvis gameId={game.id} />
            </div>


            <div>
            </div>

        </div>
    )
}

export default Game