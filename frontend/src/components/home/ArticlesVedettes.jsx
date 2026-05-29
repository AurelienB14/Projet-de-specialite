import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import api from '../../api/api';

export default function ArticlesVedette() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/articles')
            .then(res => setArticles(res.data.slice(-5).reverse()))
            .catch(err => console.error(err));
    }, []);

    if (articles.length === 0) return null;

    const [featured, ...rest] = articles;

    return (
        <div className='flex flex-col gap-6'>

            {/* Premier article — grand format */}
            <div
                className='flex gap-6 cursor-pointer group'
                onClick={() => navigate(`/articles/${featured.id}`)}
            >
                <img
                    src={`http://localhost:8000/uploads/articles/${featured.image}`}
                    alt={featured.title}
                    className='w-48 h-32 object-cover rounded-lg flex-shrink-0'
                />
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <Flame size={14} className='text-orange-400' />
                        <span className='text-orange-400 text-xs font-bold'>Trending</span>
                        <span className='text-text-muted text-xs'>{featured.created_at}</span>
                    </div>
                    <h2 className='font-bold group-hover:text-primary transition-colors line-clamp-2'>
                        {featured.title}
                    </h2>
                    <p className='text-text-muted text-sm line-clamp-2'>
                        {featured.content?.replace(/[#*>`-]/g, '').slice(0, 150)}...
                    </p>
                    <div className='flex gap-2 mt-auto'>
                        {featured.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className='text-xs text-text-muted border border-surface-alt px-2 py-0.5 rounded-full'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Séparateur */}
            <hr className='border-[var(--color-surface-alt)]' />

            {/* Autres articles */}
            {rest.map((article, i) => (
                <div key={article.id}>
                    <div
                        className='flex gap-6 cursor-pointer group'
                        onClick={() => navigate(`/articles/${article.id}`)}
                    >
                        <img
                            src={`http://localhost:8000/uploads/articles/${article.image}`}
                            alt={article.title}
                            className='w-48 h-32 object-cover rounded-lg flex-shrink-0'
                        />
                        <div className='flex flex-col gap-2'>
                            <span className='text-text-muted text-xs'>{article.created_at}</span>
                            <h2 className='font-bold group-hover:text-primary transition-colors line-clamp-2'>
                                {article.title}
                            </h2>
                            <p className='text-text-muted text-sm line-clamp-2'>
                                {article.content?.replace(/[#*>`-]/g, '').slice(0, 150)}...
                            </p>
                            <div className='flex gap-2 mt-auto'>
                                {article.tags?.slice(0, 2).map(tag => (
                                    <span key={tag} className='text-xs text-text-muted border border-surface-alt px-2 py-0.5 rounded-full'>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {i < rest.length - 1 && <hr className='border-[var(--color-surface-alt)] mt-6' />}
                </div>
            ))}
        </div>
    );
}