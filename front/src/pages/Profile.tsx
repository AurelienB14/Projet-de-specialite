import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../api/auth';
import axios from 'axios';

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

    useEffect(() => {
        const id = getCurrentUserId();
        if (!id) return;

        axios.get(`http://localhost:8000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (!user) return <p>Non connecté</p>;

    return (
        <div>
            {user.avatar && (
                <img
                    src={`http://localhost:8000/uploads/avatars/${user.avatar}`}
                    alt={user.pseudo}
                />
            )}
            <h1>{user.pseudo}</h1>
            <p>{user.prenom} {user.nom}</p>
            <p>{user.email}</p>
            <p>{user.roles.join(', ')}</p>
        </div>
    );
}