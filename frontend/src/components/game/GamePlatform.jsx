import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import { MonitorSmartphone } from 'lucide-react'
export default function GamePlateform() {

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/game/${id}`)
            .then(res => {
                setGame(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);


    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Chargement...</p>
        </div>
    );



    return (
        <div >
            <h3 className='flex items-center gap-4 '>
                <MonitorSmartphone size={18} className='text-primary' /> Plateformes
            </h3>
            <div className='card'>
                <div className='w-full flex flex-row gap-3 flex-wrap'>
                    {game.plateformes && game.plateformes.map(plateforme => (
                        <p className='card-outline w-fit' key={plateforme}>{plateforme}</p>
                    ))}
                </div>

            </div>

        </div>
    )
}