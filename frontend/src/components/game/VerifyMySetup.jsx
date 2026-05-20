import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api';

import { Gamepad2, User } from 'lucide-react';
import WhiteDivider from '../ui/WhiteDivider';

export default function VerifyMySetup() {

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [userSetup, setUserSetup] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const userId = getCurrentUserId();
        Promise.all([
            api.get(`/game/${id}`),
            api.get(`/users/${userId}`),

        ])
            .then(([gameRes, userRes]) => {
                setGame(gameRes.data);
                setUserSetup(userRes.data.setup)
            })
            .finally(() => setLoading(false));

    }, [id]);


    if (loading) return null;

    return (
        <div className='flex gap-4'>

            <div className='flex flex-col w-1/2'>
                <div className='flex items-center gap-2'>
                    <Gamepad2 size={18} className='text-primary' />
                    <h2>{game.nom}</h2>
                </div>
                <div className='card'>
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>Processeur minimum</span>
                        <span>{game?.cpu_min ?? '-'}</span>
                    </div>

                    <WhiteDivider />
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>Carte graphique minimum</span>
                        <span>{game?.gpu_min ?? '-'}</span>
                    </div>

                    <WhiteDivider />
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>RAM minimum</span>
                        <span>{game?.ram_min ?? '-'} Go</span>
                    </div>

                </div>
            </div>


            <div className='flex flex-col  w-1/2'>

                <div className='flex items-center gap-2'>
                    <User size={18} className='text-primary' />
                    <h2>Mon setup</h2>
                </div>
                <div className='card'>
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>Processeur </span>
                        <span>{userSetup.processeur}</span>
                    </div>

                    <WhiteDivider />
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>Carte graphique </span>
                        <span>{userSetup.carte_graphique}</span>
                    </div>

                    <WhiteDivider />
                    <div className='flex justify-between'>
                        <span className='text-text-muted'>RAM </span>
                        <span>{userSetup.memoire} Go</span>
                    </div>

                </div>
            </div>
        </div>

    );
}