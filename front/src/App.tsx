import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    pseudo: string;
    email: string;
    prenom: string;
    nom: string | null;
    avatar: string | null;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <h1>Utilisateurs</h1>
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        {user.avatar && (
                            <img
                                src={`http://localhost:8000/uploads/avatars/${user.avatar}`}
                                alt={user.pseudo}
                                width={60}
                            />
                        )}
                        <h2>{user.pseudo}</h2>
                        <p>{user.prenom} {user.nom}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}