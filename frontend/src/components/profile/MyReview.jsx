import { Plus, MessageSquareText } from 'lucide-react';
import Button from '../ui/Button';

export default function MyReview() {

    return (
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
}