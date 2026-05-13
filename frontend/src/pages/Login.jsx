import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

import  Button  from '../components/ui/Button'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            window.dispatchEvent(new Event('authChange'));
            navigate('/');
        } catch {
            setError('Email ou mot de passe incorrect.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: '40px 0', display: 'flex', justifyContent: 'center' }}>
            <div className="card">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
                    Connexion
                </h1>

                {error && (
                    <p style={{ marginBottom: '16px', fontSize: '0.875rem', color: '#f87171', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <Button type="submit" disabled={loading} loading={loading}>
                        Se connecter
                    </Button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '0.875rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    Pas encore de compte ?{' '}
                    <Link to="/register" style={{ color: 'var(--color-primary)' }}>
                        Créer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}
