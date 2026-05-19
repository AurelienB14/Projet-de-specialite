import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api'
import { Library, MoveRight } from 'lucide-react';



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
            <p>Aucun jeu dans ta bibliothèque</p>
        </div>


    );
    return (
        <div>
            <div className='flex justify-between'>
                <h3 className='flex items-center gap-4 ml-4'>
                    <Library size={18} className='text-primary' /> Ma bibliothèque
                </h3>
                <span className='text-sm text-primary flex items-center gap-1'> Voir tout <MoveRight size={14} /> </span>
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