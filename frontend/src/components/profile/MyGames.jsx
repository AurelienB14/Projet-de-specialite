import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api'
import { Library, MoveRight, Plus } from 'lucide-react';

import Button from '../ui/Button';


export default function MyGames() {
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getCurrentUserId();

        api.get(`/users/${userId}/games`)
            .then(res => {
                console.log('data:', res.data);

                setUserGames(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (userGames.length === 0) return (
        <div>
            <h3 className='flex items-center gap-4 ml-4'>
                <Library size={18} className='text-primary' /> Ma bibliothèque
            </h3>
            <div className='card flex flex-col items-center text-center gap-4'>
                <Library className='text-text-muted' />
                <h2>La bibliothèque est vide</h2>
                <p className='text-text-muted'>Ajoute des jeux pour compléter ta collection !</p>
                <Button variant='ghost' href='/games'>
                    <Plus  size={16} />
                    Voir les jeux</Button>
            </div>
        </div>


    );
    return (
        <div>
            <div className='flex justify-between'>
                <h3 className='flex items-center gap-4 ml-4'>
                    <Library size={18} className='text-primary' /> Ma bibliothèque
                </h3>
                <a href='/profile/collection' className='text-sm text-primary flex items-center gap-1'> Voir tout <MoveRight size={14} /> </a>
            </div>

            <div className=' flex flex-col gap-3'>
                {userGames.slice(-3).map(ug => (
                    <div className='flex flex-col card-xs ' key={ug.id}>
                        <span>{ug.game.nom}</span>
                        <span className='text-sm text-text-muted'>
                            {ug.game.categories?.join(' / ')}
                        </span>
                    </div>

                ))}
            </div>


        </div>
    );
}