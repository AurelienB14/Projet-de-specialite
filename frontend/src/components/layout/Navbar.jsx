import { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { isAuthenticated } from '../../api/auth';
import logo from '../../assets/logo.png';

export default function Navbar() {
    const [auth, setAuth] = useState(isAuthenticated());

    useEffect(() => {
        const checkAuth = () => setAuth(isAuthenticated());
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChange', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChange', checkAuth);
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', padding: '12px 0' }}>
            <a href="/">
                <img style={{ width: '120px' }} src={logo} alt="logo" />
            </a>

            <ul style={{ display: 'flex', gap: '80px', listStyle: 'none', margin: 0, padding: 0 }}>
                <a href='/games'>
                    <li>JEUX</li>

                </a>
                <a href='/articles'>
                    <li>ACTUALITÉS</li>
                </a>
                <a href='/setups'>
                    <li>VÉRIFIER MON SETUP</li>

                </a>
            </ul>

            <div>
                <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
                    {auth ? (
                        <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
                            <a href="/profile/collection">
                                <li className="badge-outline">Ma bibliothèque</li>
                            </a>
                            <a href="/profile">
                                <li className="icon-fill"><UserRound /></li>
                            </a>
                        </ul>
                    ) : (
                        
                        
                        <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
                            <a href="/login">
                                <li className="badge-outline">Se connecter</li>
                            </a>
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    );
}
