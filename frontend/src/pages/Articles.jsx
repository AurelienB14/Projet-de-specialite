import { useEffect, useState } from 'react';
import api from '../api/api';

import { CirclePlus } from 'lucide-react';
const Articles = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        api.get(`/articles`)
            .then(res => {
                setArticles(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <a href='/articles/create'>
                        <CirclePlus />

            </a>
            <div className='grid grid-cols-4'>
                {articles.map(article => (
                    <div className='card' key={article.id}>
                        <h2>{article.title}</h2>

                    </div>
                ))}
            </div>
        </div>

    )

}
export default Articles