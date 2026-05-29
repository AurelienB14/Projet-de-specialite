import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../api/auth';
import api from '../api/api';

import { LogOut, Camera } from 'lucide-react'

import Button from '../components/ui/Button'
import MySetup from '../components/profile/MySetup';
import MyGames from '../components/profile/MyGames';
import MyReview from '../components/profile/MyReview';
import MyActivity from '../components/profile/MyActivity';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const inputRef = useRef(null);


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
                                <div
                                    onClick={() => inputRef.current.click()}
                                    className="flex border border-primary border-4 justify-center items-center rounded-full w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    <input ref={inputRef} name="avatar" type="file" accept="image/*" className="sr-only" />
                                    <Camera />
                                </div>
                            )}
                            <div className='flex flex-col gap-1'>

                                <h1>{user.prenom}</h1>
                                <p className='text-text-muted'>
                                    @{user.pseudo}
                                </p>
                                {isAdmin && (
                                    <Button variant='outlineSecondary' size='sm' >
                                        Administrateur
                                    </Button>
                                )}
                                {user.description ? (
                                    <p className='text-text-muted'>
                                        {user.description}
                                    </p>
                                ) : (
                                    <div className='mt-4'>
                                        <textarea className="text-text-muted w-100" placeholder='Ajoute une description.... ' ></textarea>
                                    </div>
                                )}



                            </div>


                        </div>

                    </div>


                    <div className='grid grid-cols-2 w-1/1 gap-10'>
                        <MySetup />
                        <MyGames />
                        <MyReview />
                        <MyActivity />

                    </div>
                </div>





            </div>
            <div className='flex gap-8'>

                <Button variant='danger' onClick={handleLogout}>
                    <LogOut />
                    Se déconnecter
                </Button>
            </div>

        </div>
    );
}
