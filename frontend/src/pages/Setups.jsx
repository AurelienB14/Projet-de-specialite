import { useState, useEffect } from 'react';
import { getCurrentUserId } from '../api/auth';
import api from '../api/api';
import { Cpu, MemoryStick, HardDrive, Monitor, Pencil, Search, SquareCheck, SquareX } from 'lucide-react';
import Button from '../components/ui/Button';
import WhiteDivider from '../components/ui/WhiteDivider';

export default function Setup() {
    const [userSetup, setUserSetup] = useState(null);
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedGame, setSelectedGame] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getCurrentUserId();
        if (!userId) { setLoading(false); return; }

        Promise.all([
            api.get(`/users/${userId}`),
            api.get('/games'),
        ])
            .then(([userRes, gamesRes]) => {
                setUserSetup(userRes.data.setup);
                setGames(gamesRes.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSelectGame = async (game) => {
        setSelectedGame(game);
        setResult(null);
        try {
            const res = await api.get(`/setups/verify-setup/${game.id}`);
            setResult(res.data);
        } catch {
            setResult(null);
        }
    };

    const filteredGames = games.filter(g =>
        g.nom?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return null;

    return (
        <div className='w-full max-w-5xl mx-auto py-8 flex flex-col gap-8'>

            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-3'>
                    <Cpu size={24} className='text-primary' />
                    <h1 className='font-bold'>Vérifier mon setup</h1>
                </div>
                <p className='text-text-muted'>Comparez votre configuration avec les exigences de vos jeux.</p>
            </div>

            <div className='flex gap-8'>
                {/* Mon setup */}
                <div className='w-1/2 flex flex-col gap-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <Monitor size={18} className='text-primary' />
                            <h2 className='font-bold'>Mon setup</h2>
                        </div>
                        <Button variant='ghost' size='sm' href='/setup/edit'>
                            <Pencil size={14} />
                            Modifier
                        </Button>
                    </div>

                    {!userSetup ? (
                        <div className='card flex flex-col items-center gap-4 text-center'>
                            <Cpu size={32} className='text-text-muted' />
                            <p className='text-text-muted'>Aucun setup configuré</p>
                            <Button variant='ghost' href='/login'>Configurer mon setup</Button>
                        </div>
                    ) : (
                        <div className='card flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <Cpu size={18} className='text-primary' />
                                    <div>
                                        <p className='text-xs text-text-muted uppercase tracking-wide'>Processeur</p>
                                        <p className={`font-bold ${result ? (result.cpu.ok ? 'text-primary' : 'text-danger') : ''}`}>
                                            {userSetup.processeur}
                                        </p>
                                    </div>
                                </div>
                                {result && (result.cpu.ok ? <SquareCheck size={18} className='text-primary' /> : <SquareX size={18} className='text-danger' />)}
                            </div>
                            <WhiteDivider />
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <Monitor size={18} className='text-primary' />
                                    <div>
                                        <p className='text-xs text-text-muted uppercase tracking-wide'>Carte graphique</p>
                                        <p className={`font-bold ${result ? (result.gpu.ok ? 'text-primary' : 'text-danger') : ''}`}>
                                            {userSetup.carte_graphique}
                                        </p>
                                    </div>
                                </div>
                                {result && (result.gpu.ok ? <SquareCheck size={18} className='text-primary' /> : <SquareX size={18} className='text-danger' />)}
                            </div>
                            <WhiteDivider />
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <MemoryStick size={18} className='text-primary' />
                                    <div>
                                        <p className='text-xs text-text-muted uppercase tracking-wide'>Mémoire RAM</p>
                                        <p className={`font-bold ${result ? (result.ram.ok ? 'text-primary' : 'text-danger') : ''}`}>
                                            {userSetup.memoire} Go
                                        </p>
                                    </div>
                                </div>
                                {result && (result.ram.ok ? <SquareCheck size={18} className='text-primary' /> : <SquareX size={18} className='text-danger' />)}
                            </div>
                            <WhiteDivider />
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-3'>
                                    <HardDrive size={18} className='text-primary' />
                                    <div>
                                        <p className='text-xs text-text-muted uppercase tracking-wide'>Stockage</p>
                                        <p className='font-bold'>{userSetup.stockage} Go</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Résultat global */}
                    {result && (
                        <div className={result.can_run ? 'card-validate' : 'card-danger'}>
                            <div className='flex items-center gap-4'>
                                {result.can_run
                                    ? <SquareCheck size={20} className='text-primary' />
                                    : <SquareX size={20} className='text-danger' />
                                }
                                <span className='font-bold'>
                                    {result.can_run
                                        ? `Tu peux faire tourner ${selectedGame.nom} !`
                                        : `Ton setup est insuffisant pour ${selectedGame.nom}`
                                    }
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recherche jeux */}
                <div className='w-1/2 flex flex-col gap-4'>
                    <div className='flex items-center gap-3 card'>
                        <Search size={18} className='text-text-muted' />
                        <input
                            className='bg-transparent outline-none w-full'
                            placeholder='Rechercher un jeu...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-2 max-h-96 overflow-y-auto'>
                        {filteredGames.map(game => (
                            <div
                                key={game.id}
                                className={`card flex items-center gap-4 cursor-pointer transition-all ${selectedGame?.id === game.id ? 'border-primary' : 'hover:border-primary'}`}
                                onClick={() => handleSelectGame(game)}
                            >
                                <div className='flex flex-col'>
                                    <span className='font-bold'>{game.nom}</span>
                                    <div className='flex gap-2'>
                                        {game.categories?.slice(0, 2).map(cat => (
                                            <span key={cat} className='text-xs text-text-muted'>{cat}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}