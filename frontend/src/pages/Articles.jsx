import { useEffect, useState } from 'react';
import api from '../api/api';
import { isAuthenticated } from '../api/auth';

import Button from '../components/ui/Button';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState(null);

    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    useEffect(() => {
        api.get(`/articles`)
            .then(res => setArticles(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) return;
        api.get('/me')
            .then(res => setUser(res.data))
            .catch(() => { });
    }, []);

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-center'> Toute l'actualité du jeux vidéo</h1>
            {isAdmin && (
                <a href='/articles/create'>
                    <CirclePlus />
                </a>
            )}
            <div className='grid grid-cols-4 gap-8'>

                {articles.map(article => (
                    <div
                        className='card-img cursor-pointer'
                        onClick={() => navigate(`/articles/${article.id}`)}
                        key={article.id}
                    >
                        <img src={`http://localhost:8000/uploads/articles/${article.image}`} alt={article.title} />
                        <div className='px-4 py-2 w-full flex flex-row gap-[10px] flex-wrap'>
                            {article.tags && article.tags.slice(-2).map(tag => (
                                <Button variant="ghost" size="sm" key={tag}>{tag}</Button>
                            ))}
                        </div>
                        <h3 className='px-4'>{article.title}</h3>
                        <p className='text-text-muted text-sm line-clamp-2 px-4 my-2'>
                            {article.content?.replace(/[#*>`-]/g, '').slice(0, 150)}...
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;