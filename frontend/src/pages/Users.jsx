import { useEffect, useState } from 'react';
import { getUsers } from '../api/users';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers()
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <p style={{ color: 'rgba(255,255,255,0.5)' }}>Chargement...</p>;

    return (
        <div>
            <h1 style={{ marginBottom: '24px' }}>Utilisateurs</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {users.map(user => (
                    <div key={user.id} style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '16px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {user.avatar ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/avatars/${user.avatar}`}
                                alt={user.pseudo}
                                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: 'var(--color-primary)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, color: 'var(--color-background)'
                            }}>
                                {user.prenom[0].toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p style={{ fontWeight: 600 }}>{user.pseudo}</p>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                                {user.prenom}{user.nom ? ` ${user.nom}` : ''}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
