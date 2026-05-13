import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 border border-white/10">
                <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>

                {error && (
                    <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition cursor-pointer"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-white/50">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="text-indigo-400 hover:underline">
                        Créer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}
