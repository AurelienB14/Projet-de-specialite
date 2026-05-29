import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUserId } from '../../api/auth';
import api from '../../api/api';
import Button from '../ui/Button';

export default function AddToLibrary({ gameId, variant = 'full' }) {
    const [userGameId, setUserGameId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            setLoading(false);
            return;
        }
        const userId = getCurrentUserId();
        api.get(`/users/${userId}/games`)
            .then(res => {
                const found = res.data.find(ug => ug.game.id === gameId);
                if (found) setUserGameId(found.id);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [gameId]);

    const handleClick = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setActionLoading(true);
        const userId = getCurrentUserId();
        try {
            if (userGameId) {
                await api.delete(`/users/${userId}/games/${userGameId}`);
                setUserGameId(null);
            } else {
                const res = await api.post(`/users/${userId}/games`, { game_id: gameId });
                setUserGameId(res.data.id);
            }
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return null;

    const heart = (
        <Heart
            size={18}
            fill={userGameId ? 'currentColor' : 'none'}
            className="text-primary"
        />
    );

    // Variant icon — juste le coeur
    if (variant === 'icon') {
        return (
            <button
                onClick={handleClick}
                disabled={actionLoading}
                className='bg-black/50 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-black/70 transition-all'
            >
                {heart}
            </button>
        );
    }

    // Variant full — avec texte
    return (
        <Button variant="outlineSecondary" onClick={handleClick} disabled={actionLoading}>
            {heart}
            {userGameId ? 'Retirer de mes jeux' : 'Ajouter à mes jeux'}
        </Button>
    );
}