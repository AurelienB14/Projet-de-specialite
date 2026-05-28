import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


import Note from '../components/ui/Note'

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
                    className='border p-2'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select className='border p-2 [&>option]:text-white [&>option]:bg-black' value={selectedCategorie} onChange={e => setSelectedCategorie(e.target.value)}>
                    <option value=''>Toutes les catégories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select className='border p-2 [&>option]:text-white [&>option]:bg-black' value={selectedPlateforme} onChange={e => setSelectedPlateforme(e.target.value)}>
                    <option value=''>Toutes les plateformes</option>
                    {PLATEFORMES.map(plat => (
                        <option key={plat} value={plat}>{plat}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-row gap-[25px] flex-wrap justify-center w-full">
                {gamesFiltres.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id}>
                        <div className="flex flex-col w-[300px] gap-[10px] items-center border-[3px] border-black cursor-pointer hover:scale-105 transition-transform duration-200">
                            <h2 className="text-center font-bold w-full text-sm leading-tight line-clamp-1">{game.nom}</h2>
                            <p>Ajouté par {game.pseudo}</p>
                            {game.note !== null
                                ? <Note note={game.note}/>
                                : <p>Pas de note</p>
                            }
                            <div className='flex flex-row flex-wrap test-center gap-5'>
                                {game.categories?.map((cat, index) => (
                                    <span className='text-xs text-text-muted' key={index}>{cat}</span>
                                ))}     
                            </div>
                            <img src={game.image} alt={game.nom} className="w-full h-[200px] object-cover" />
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