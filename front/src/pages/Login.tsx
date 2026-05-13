import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch {
            setError('Identifiants invalides');
        }
    };
    return (
        <div>
            <h1>Connexion</h1>
            {error && <p className='text-red'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Mot de passe'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}