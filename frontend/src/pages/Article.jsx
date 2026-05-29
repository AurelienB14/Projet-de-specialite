import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

import api from '../api/api';
import { isAuthenticated, logout } from '../api/auth';
import Button from '../components/ui/Button';
import { MoveLeft } from 'lucide-react';

const Article = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [user, setUser] = useState(null); // ← doit être avant isAdmin

    const isAdmin = user?.roles?.includes('ROLE_ADMIN'); // ← ?. pour éviter l'erreur si user est null

    useEffect(() => {
        api.get(`/articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error(err));
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated()) return; // ← pas de redirect, l'article est public
        api.get('/me')
            .then(res => setUser(res.data))
            .catch(() => logout());
    }, []);

    if (!article) return <p>Chargement...</p>;

    return (
        <div className='markdown flex flex-col gap-4 mx-25'>
            <div className='flex gap-2 text-text-muted cursor-pointer' onClick={() => navigate('/articles')}>
                <MoveLeft />
                <span>Retour aux articles</span>
            </div>

            <div className='relative w-full h-84 overflow-hidden rounded-xl'>
                <img src={`http://localhost:8000/uploads/articles/${article.image}`} alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className='absolute bottom-0 left-0 p-6 flex flex-col items-start'>
                    <h1 className='font-bold'>{article.title}</h1>
                    <div className='w-full flex flex-row gap-[10px] flex-wrap'>
                        {article.tags && article.tags.map(tag => (
                            <Button variant="ghost" size="sm" key={tag}>{tag}</Button>
                        ))}
                    </div>
                </div>
            </div>

            {isAdmin && (
                <Button variant="ghost" href={`/articles/${article.id}/edit`}>
                    Modifier l'article
                </Button>
            )}

            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {article.content}
            </ReactMarkdown>
        </div>
    );
};

export default Article;