import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Note from '../components/ui/Note'
import AddToLibrary from '../components/game/AddToMyGames';

const CATEGORIES = [
    'Action', 'Aventure', 'Battle Royale', 'Compétitif', 'Course',
    'FPS', 'Gestion', 'Monde ouvert', 'Multijoueur', 'Party Game',
    'Plateforme', 'RPG', 'Rythme', 'Sandbox', 'Simulation',
    'Sport', 'Stratégie', 'Survie', 'Tour par tour'
];

const PLATEFORMES = [
    'Android', 'iOS', 'Mac', 'Nintendo Switch', 'PC',
    'PS4', 'PS5', 'Wii U', 'Xbox One', 'Xbox Series'
];

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [selectedPlateforme, setSelectedPlateforme] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                setGames(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const gamesFiltres = games.filter(game => {
        const matchSearch = game.nom.toLowerCase().includes(search.toLowerCase());
        const matchCategorie = selectedCategorie === '' || game.categories?.includes(selectedCategorie);
        const matchPlateforme = selectedPlateforme === '' || game.plateformes?.includes(selectedPlateforme);
        return (matchSearch && matchCategorie && matchPlateforme);
    });

    if (loading) return <p>Chargement...</p>;

    return (
        <div>

            <div className='flex justify-center m-[25px]'>
                <Link to={`/createupdategame`}>
                    <button className='w-[100px] h-[40px] border-[2px] rounded-lg border-black bg-green-500 cursor-pointer'>Ajouter</button>
                </Link>
            </div>
            <div className='flex gap-4 justify-center m-[25px] flex-wrap'>
                <input
                    className='input'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select className='input [&>option]:text-white [&>option]:bg-black' value={selectedCategorie} onChange={e => setSelectedCategorie(e.target.value)}>
                    <option value=''>Toutes les catégories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select className='input [&>option]:text-white [&>option]:bg-black' value={selectedPlateforme} onChange={e => setSelectedPlateforme(e.target.value)}>
                    <option value=''>Toutes les plateformes</option>
                    {PLATEFORMES.map(plat => (
                        <option key={plat} value={plat}>{plat}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-3 gap-[25px] flex-wrap justify-center w-full">
                {gamesFiltres.map(game => (
                    <div
                        className="card-img hover:scale-105 transition-all duration-200 relative flex flex-col gap-4 cursor-pointer"
                        onClick={() => navigate(`/game/${game.id}`)}
                        key={game.id}
                    >                            <img src={game.image} alt={game.nom} className="w-full h-[200px] object-cover" />
                        <div
                            className='absolute top-2 right-2'
                            onClick={e => e.stopPropagation()}
                        >
                            <AddToLibrary gameId={game.id} variant='icon' />
                        </div>

                        <div className='px-4 py-2'>
                            <div className='flex flex-row justify-between items-center '>

                                <h2 className="">{game.nom}</h2>
                                <p className='text-text-muted text-xs'>Ajouté par {game.pseudo}</p>


                            </div>
                            <div className='flex flex-row flex-wrap test-center gap-5'>
                                {game.categories?.map((cat, index) => (
                                    <span className='text-xs text-text-muted' key={index}>{cat}</span>
                                ))}
                            </div>

                            <div className='flex flex-col gap-2 my-2'>
                                <p className='line-clamp-2'>{game.description}</p>
                                {game.note !== null
                                    ? <Note note={game.note} />
                                    : <p>Pas de note</p>
                                }

                            </div>


                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Games