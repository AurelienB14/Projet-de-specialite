import { Plus, MessageSquareText } from 'lucide-react';
import Button from '../ui/Button';

import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../../api/auth';

import Note from '../ui/Note';

import api from '../../api/api'


export default function MyReview() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getCurrentUserId();

        api.get(`/users/${userId}/reviews`)
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (reviews.length === 0) return (
        <div>
            <h3 className='flex items-center gap-4 ml-4'>
                <MessageSquareText size={18} className='text-primary' /> Mes reviews
            </h3>
            <div className='card  flex flex-col items-center text-center gap-4'>
                <MessageSquareText className='text-text-muted' />
                <h2>Pas encore de review</h2>
                <p className='text-text-muted'>Partage ton avis sur les jeux que tu as testés pour aider la communauté.</p>
                <Button variant='ghost' href='/setups'>
                    <Plus size={16} />
                    Écrire un avis</Button>
            </div>
        </div>
    )

    return (
        <div>
            <h3 className='flex items-center gap-4 ml-4'>
                <MessageSquareText size={18} className='text-primary' /> Mes reviews
            </h3>
            <div className='flex flex-col gap-2'>

                {reviews.map(review => (
                    <div key={review.id} className='card flex flex-col gap-4'>
                        <div className='flex gap-4'>
                            <span><Note note={review.note} /></span>
                            <span className='font-bold'>{review.game.nom}</span>
                        </div>
                        <span className='text-text-muted'>
                            {review.commentaire?.length > 200
                                ? review.commentaire.slice(0, 200) + ' ...'
                                : review.commentaire
                            }
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}