import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUserId } from '../../api/auth';
import api from '../../api/api';
import Button from '../ui/Button';

export default function AddToLibrary({ gameId }) {
    const [userGameId, setUserGameId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
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

        const userId = getCurrentUserId();
        

        if (userGameId) {
            await api.delete(`/users/${userId}/games/${userGameId}`);
            setUserGameId(null);
        } else {
            const res = await api.post(`/users/${userId}/games`, { game_id: gameId });
            setUserGameId(res.data.id);
        }
    };

    if (loading) return null;

    return (
        <Button variant="outlineSecondary" onClick={handleClick}>
            <Heart
                size={18}
                fill={userGameId ? 'currentColor' : 'none'}
                className="text-primary"
            />
            {userGameId ? 'Retirer de mes jeux' : 'Ajouter à mes jeux'}
        </Button>
        
    );
}