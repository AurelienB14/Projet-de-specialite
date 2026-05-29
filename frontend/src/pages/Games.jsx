import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';
import api from '../api/api';

import Button from '../components/ui/Button';
import Note from '../components/ui/Note';
import AddToLibrary from '../components/game/AddToMyGames';
import WhiteDivider from '../components/ui/WhiteDivider';

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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    useEffect(() => {
        if (!isAuthenticated()) return;
        api.get('/me')
            .then(res => setUser(res.data))
            .catch(() => { });
    }, []);

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
        return matchSearch && matchCategorie && matchPlateforme;
    });

    if (loading) return <p>Chargement...</p>;

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-center flex flex-col justify-center gap-1 w-3/4 '>
                <h1 className=''>
                    Tous les jeux vidéos
                </h1>
                <p>
                    Bienvenue sur la page dédiée à la collection de jeux vidéo 🎮 <br />
                    Ici, vous retrouverez la plupart des jeux, classés et ajoutés au fil du temps.
                    La collection mélange plusieurs générations et plateformes, avec autant de classiques que de découvertes plus récentes. <br />
                    N’hésitez pas à parcourir les fiches, comparer les versions, ou encore vérifier votre setup ! ✨<br />
                    <br />
                    Bonne visite dans la collection !
                </p>
            </div>
            <WhiteDivider />

            <div className='flex gap-4 justify-center m-[25px] flex-wrap'>
                <input
                    className='input'
                    placeholder='Rechercher...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select className='input' value={selectedCategorie} onChange={e => setSelectedCategorie(e.target.value)}>
                    <option value=''>Toutes les catégories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select className='input' value={selectedPlateforme} onChange={e => setSelectedPlateforme(e.target.value)}>
                    <option value=''>Toutes les plateformes</option>
                    {PLATEFORMES.map(plat => (
                        <option key={plat} value={plat}>{plat}</option>
                    ))}
                </select>
                {isAdmin && (
                    <Button variant='outlineSecondary' href='/createupdategame'>
                        Ajouter un jeu
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-9 flex-wrap justify-center w-full">
                {gamesFiltres.map(game => (
                    <div
                        className="card-img hover:scale-105 transition-all duration-200 relative flex flex-col gap-4 cursor-pointer"
                        onClick={() => navigate(`/game/${game.id}`)}
                        key={game.id}
                    >
                        <img src={game.image} alt={game.nom} className="w-full h-[200px] object-cover" />
                        <div
                            className='absolute top-2 right-2'
                            onClick={e => e.stopPropagation()}
                        >
                            <AddToLibrary gameId={game.id} variant='icon' />
                        </div>

                        <div className='px-4 py-2'>
                            <div className='flex flex-row justify-between items-center'>
                                <h2>{game.nom}</h2>
                                <p className='text-text-muted text-xs'>Ajouté par {game.pseudo}</p>
                            </div>
                            <div className='flex flex-row flex-wrap gap-5'>
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
    );
};

export default Games;