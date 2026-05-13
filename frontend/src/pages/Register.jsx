import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
    const [form, setForm] = useState({ email: '', pseudo: '', prenom: '', nom: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register({
                email: form.email,
                pseudo: form.pseudo,
                prenom: form.prenom,
                nom: form.nom || undefined,
                password: form.password,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error ?? 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '8px 16px', borderRadius: '8px',
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
        color: 'white', outline: 'none', boxSizing: 'border-box'
    };

    return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                width: '100%', maxWidth: '420px', padding: '32px',
                borderRadius: '16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
                    Créer un compte
                </h1>

                {error && (
                    <p style={{ marginBottom: '16px', fontSize: '0.875rem', color: '#f87171', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input name="prenom" type="text" placeholder="Prénom *" value={form.prenom} onChange={handleChange} required style={inputStyle} />
                    <input name="nom" type="text" placeholder="Nom (optionnel)" value={form.nom} onChange={handleChange} style={inputStyle} />
                    <input name="pseudo" type="text" placeholder="Pseudo *" value={form.pseudo} onChange={handleChange} required style={inputStyle} />
                    <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required style={inputStyle} />
                    <input name="password" type="password" placeholder="Mot de passe *" value={form.password} onChange={handleChange} required style={inputStyle} />
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ cursor: 'pointer', opacity: loading ? 0.5 : undefined }}
                    >
                        {loading ? 'Création...' : 'Créer mon compte'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '0.875rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    Déjà un compte ?{' '}
                    <Link to="/login" style={{ color: 'var(--color-primary)' }}>
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
