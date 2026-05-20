import { useState } from "react"
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api';

import { X } from 'lucide-react';
import Button from "../ui/Button";
import Note from "../ui/Note";
import WhiteDivider from "../ui/WhiteDivider"
export default function AddReview({ gameId, onClose, onSuccess }) {

    const [form, setForm] = useState({ commentaire: '', note: 0 });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userId = getCurrentUserId();
        await api.post(`/users/${userId}/reviews`, { ...form, game_id: gameId });
        setLoading(false);
        onSuccess?.();
        onClose?.();
    };

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}>
            <div className="w-2/3 p-10 bg-background border border-text-muted flex flex-col  rounded-lg" onClick={e => e.stopPropagation()}>

                <div className="flex justify-between">
                    <h1>Ajouter un avis</h1>
                    <button onClick={onClose} className='text-text-muted hover:text-white'>
                        <X size={20} />
                    </button>
                </div>
                <WhiteDivider />
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div>
                        <span>Note</span>
                        <div>{[1, 2, 3, 4, 5].map(n => (
                            <button key={n} type='button' onClick={() => setForm(f => ({ ...f, note: n }))}>
                                <Note note={form.note >= n ? 1 : 0} max={1} />
                            </button>
                        ))}
                        </div>

                    </div>
                    <div className="flex flex-col">
                        <span>Commentaire</span>
                        <textarea
                            className="input"
                            rows={4}
                            placeholder="Écris ton avis sur le jeu ...."
                            value={form.commentaire}
                            onChange={e => setForm(f => ({ ...f, commentaire: e.target.value }))} />
                    </div>

                    <div>
                        <Button type="submit" loading={loading}>
                            Publier mon avis
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}