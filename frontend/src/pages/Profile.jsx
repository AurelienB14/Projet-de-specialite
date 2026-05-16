import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../api/auth';
import api from '../api/api';

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
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center'>
                {user.avatar ? (
                    <img
                        src={`http://localhost:8000/uploads/avatars/${user.avatar}`}
                        alt={user.pseudo}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }}
                    />
                ) : (
                    <div >
                        {user.prenom[0].toUpperCase()}
                    </div>
                )}

                <div >
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user.pseudo}</h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                        {user.prenom}{user.nom ? ` ${user.nom}` : ''}
                    </p>
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

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '16px', width: '100%', padding: '8px',
                        borderRadius: '8px', fontWeight: 600,
                        border: '1px solid rgba(239,68,68,0.4)', color: '#f87171',
                        background: 'transparent', cursor: 'pointer'
                    }}
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}
