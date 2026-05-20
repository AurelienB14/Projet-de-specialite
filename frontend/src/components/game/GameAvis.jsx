import { useEffect, useState } from "react";

import api from '../../api/api'

import { Star } from 'lucide-react'

import Note from '../ui/Note'

export default function GameAvis({ gameId }) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);


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
            <h3 className='flex items-center gap-4 '>
                <Star size={18} className='text-primary' /> Avis
            </h3>

            <div className=" flex flex-col">
                <div >
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
                                    <div className=' flex border border-primary border-4 justify-center items-center rounded-full w-20 h-20' >
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