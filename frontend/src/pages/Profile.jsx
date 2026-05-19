import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../api/auth';
import api from '../api/api';

import { SquarePen, Settings, LogOut } from 'lucide-react'

import Button from '../components/ui/Button'
import MySetup from '../components/profile/MySetup';
import MyGames from '../components/profile/MyGames';
import MyReview from '../components/profile/MyReview';
import MyActivity from '../components/profile/MyActivity';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        api.get('/me')
            .then(res => setUser(res.data))
            .catch(() => {
                logout();
                navigate('/login');
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Chargement...</p>
        </div>
    );

    if (!user) return null;

    const isAdmin = user.roles?.includes('ROLE_ADMIN');

    return (
        <div className='w-full max-w-4xl mx-auto py-8'>
            <div className='flex items-center gap-8'>

                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-8'>

                            {user.avatar ? (
                                <img
                                    src={`http://localhost:8000/uploads/avatars/${user.avatar}`}
                                    alt={user.pseudo}
                                    style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className=' flex border border-primary border-4 justify-center items-center rounded-full w-20 h-20' >
                                    {user.prenom[0].toUpperCase()}
                                </div>
                            )}
                            <div>

                                <h1>{user.prenom}</h1>
                                <p className='text-text-muted'>
                                    @{user.pseudo}
                                </p>
                                <p className='text-text-muted'>
                                    {user.description}
                                </p>
                            </div>


                        </div>

                    </div>
                    <div className='flex gap-8'>
                        <Button variant='ghost' size='sm'>
                            <SquarePen size={18} />

                            Modifier le profil
                        </Button>

                        <Button variant='ghost'>
                            <Settings size={18} />
                            Paramètres
                        </Button>

                        <Button variant='danger' onClick={handleLogout}>
                            <LogOut />
                            Se déconnecter
                        </Button>
                    </div>

                    <div className='grid grid-cols-2 w-1/1 gap-10'>
                        <MySetup />
                        <MyGames />
                        <MyReview />
                        <MyActivity />

                    </div>
                </div>


                {isAdmin && (
                    <span style={{
                        padding: '4px 12px', fontSize: '0.75rem', borderRadius: '999px',
                        background: 'rgba(245,158,11,0.2)', color: '#fbbf24',
                        border: '1px solid rgba(245,158,11,0.3)'
                    }}>
                        Administrateur
                    </span>
                )}


            </div>


        </div>
    );
}
