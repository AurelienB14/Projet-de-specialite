import { useEffect, useState } from 'react';
import { logout, isAuthenticated } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

interface User {
    id: number;
    pseudo: string;
    email: string;
    prenom: string;
    nom: string | null;
    avatar: string | null;
    roles: string[];
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
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
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-white/50">Chargement...</p>
        </div>
    );

    if (!user) return null;

    const isAdmin = user.roles.includes('ROLE_ADMIN');

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 border border-white/10 flex flex-col items-center gap-4">

                {user.avatar ? (
                    <img
                        src={`http://localhost:8000/uploads/avatars/${user.avatar}`}
                        alt={user.pseudo}
                        className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold">
                        {user.prenom[0].toUpperCase()}
                    </div>
                )}

                <div className="text-center">
                    <h1 className="text-xl font-bold">{user.pseudo}</h1>
                    <p className="text-white/60 text-sm">{user.prenom}{user.nom ? ` ${user.nom}` : ''}</p>
                    <p className="text-white/40 text-sm mt-1">{user.email}</p>
                </div>

                {isAdmin && (
                    <span className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Administrateur
                    </span>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full py-2 rounded-lg font-semibold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}
