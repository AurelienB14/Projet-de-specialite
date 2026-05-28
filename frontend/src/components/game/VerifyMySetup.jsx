import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api';

import { Gamepad2, User, SquareCheck } from 'lucide-react';
import WhiteDivider from '../ui/WhiteDivider';


export default function VerifyMySetup() {

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [userSetup, setUserSetup] = useState(null);
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const userId = getCurrentUserId();
        Promise.all([
            api.get(`/game/${id}`),
            api.get(`/users/${userId}`),
            api.get(`/setups/verify-setup/${id}`)


        ])
            .then(([gameRes, userRes, verifyRes]) => {
                setGame(gameRes.data);
                setUserSetup(userRes.data.setup);
                setResult(verifyRes.data);

            })
            .finally(() => setLoading(false));

    }, [id]);


    if (loading) return null;

    return (
        <div className='flex flex-col gap-8'>
            {result && (
                <div className='card-validate text-center'>
                    <h2>{result.can_run ? (
                        <div className='flex items-center gap-8'>
                            <SquareCheck size={24} className='text-primary' />

                            <div className='flex flex-col text-left'>
                                <h2 className='text-bold'>Tu peux faire tourner ce jeux ! </h2>
                            </div>

                        </div>
                    ) : (<div>d</div>)}</h2>

                </div>
            )}

            <div className='flex gap-4'>

                <div className='flex flex-col w-1/2'>

                    <div className='flex items-center gap-2'>
                        <Gamepad2 size={24} className='text-primary' />

                        <div className='flex flex-col'>
                            <h2>{game.nom}</h2>
                            <p className='text-xs text-text-muted'>Configuration minimale requise</p>

                        </div>

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
                        <User size={24} className='text-primary' />
                        <div className='flex flex-col'>
                        <h2>Mon setup</h2>
                        <p className='text-xs text-text-muted'>Ma config actuelle</p>

                        </div>
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
        </div>

    );
}