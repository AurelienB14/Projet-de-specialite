import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ email: '', pseudo: '', prenom: '', nom: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
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
        } catch (err: any) {
            setError(err.response?.data?.error ?? 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 border border-white/10">
                <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>

                {error && (
                    <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="prenom"
                        type="text"
                        placeholder="Prénom *"
                        value={form.prenom}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <input
                        name="nom"
                        type="text"
                        placeholder="Nom (optionnel)"
                        value={form.nom}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <input
                        name="pseudo"
                        type="text"
                        placeholder="Pseudo *"
                        value={form.pseudo}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mot de passe *"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-white/50 transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition cursor-pointer"
                    >
                        {loading ? 'Création...' : 'Créer mon compte'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-white/50">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="text-indigo-400 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
