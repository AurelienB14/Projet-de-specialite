import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api';

import { Gamepad2, SquareCheck, SquareX } from 'lucide-react';
import WhiteDivider from '../ui/WhiteDivider';


export default function VerifyMySetup() {

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [userSetup, setUserSetup] = useState(null);
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const userId = getCurrentUserId();

        const gamePromise = api.get(`/game/${id}`);
        const userPromise = userId ? api.get(`/users/${userId}`) : Promise.resolve({ data: { setup: null } });
        const verifyPromise = userId ? api.get(`/setups/verify-setup/${id}`).catch(() => ({ data: null })) : Promise.resolve({ data: null });

        Promise.all([gamePromise, userPromise, verifyPromise])
            .then(([gameRes, userRes, verifyRes]) => {
                setGame(gameRes.data);
                setUserSetup(userRes.data.setup);
                setResult(verifyRes.data);
            })
            .finally(() => setLoading(false));
    }, [id]);


    if (loading) return null;
    if (!userSetup) return (
        <div className='flex flex-col w-full'>

            <div className='flex items-center gap-2'>
                <Gamepad2 size={24} className='text-primary' />

                <div className='flex flex-col'>
                    <h2>Configuration minimale requise</h2>

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
    );

    return (
        <div className='flex flex-col gap-8'>


            <div className='flex gap-4'>

                <div className='flex flex-col w-full'>

                    <div className='flex items-center gap-2'>
                        <Gamepad2 size={24} className='text-primary' />

                        <div className='flex flex-col'>
                            <h2>Configuration minimale requise</h2>

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
            </div>

            {result && (
                <div className={result.can_run ? 'card-validate' : 'card-danger'}>
                    <div className='flex items-center gap-8'>
                        {result.can_run ? (
                            <SquareCheck size={24} className='text-primary' />
                        ) : (
                            <SquareX size={24} className='text-danger' />
                        )}
                        <div className='flex flex-col text-left'>
                            <h2 className='font-bold'>
                                {result.can_run ? 'Tu peux faire tourner ce jeu !' : 'Ton setup est insuffisant'}
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}