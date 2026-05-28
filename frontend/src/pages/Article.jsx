import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../api/api';


const Article = () => {

    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        api.get(`/articles/${id}`)
            .then(res => {
                setArticle(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

        if (!article) return <p>Article introuvable</p>;

    return (
        <div>
            <h1>{article.title}</h1>

            <p>{article.content}</p>
        </div>
    )


}
export default Article