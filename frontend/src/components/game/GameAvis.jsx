import { useEffect, useState } from "react";

import api from '../../api/api'

import { Star, Plus } from 'lucide-react'

import Note from '../ui/Note'
import AddReview from "../review/AddReview";
export default function GameAvis({ gameId }) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showReview, setShowReview] = useState(false);


    useEffect(() => {

        api.get(`/games/${gameId}/reviews`)
            .then(res => {
                setReviews(res.data);
                setLoading(false)
            })
            .catch(() => setLoading(false));
    }, [gameId]);

    if (loading) return <p>Chargement...</p>;


    return (
        <div>
            <div className='flex justify-between'>

                <h3 className='flex items-center gap-4 '>
                    <Star size={18} className='text-primary' /> Avis
                </h3>
                <button onClick={() => setShowReview(true)} className='text-sm text-primary flex items-center gap-1'> Ajouter un avis <Plus size={14} /> </button>

                {showReview && (
                    <AddReview
                        gameId={gameId}
                        onClose={() => setShowReview(false)}
                        onSuccess={() => console.log('avis ajouté !')}
                    />
                )}
            </div>

            <div className=" flex flex-col">
                <div className="flex flex-col gap-2" >
                    {reviews.map(review => (
                        <div className="card flex flex-col gap-4" key={review.id}>

                            <div className="flex items-center gap-4">
                                {review.user.avatar ? (
                                    <img
                                        src={`http://localhost:8000/uploads/avatars/${review.user.avatar}`}
                                        alt={review.user.pseudo}
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className=' flex border border-primary border-3 justify-center items-center rounded-full w-15 h-15' >
                                        {review.user.pseudo[0].toUpperCase()}
                                    </div>
                                )}

                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">{review.user.pseudo}</span>
                                    <span className="text-xs text-text-muted">{review.created_at}</span>

                                </div>

                            </div>

                            <span><Note note={review.note} /></span>
                            <span>" {review.commentaire} "</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}