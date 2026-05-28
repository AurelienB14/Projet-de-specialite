import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/ui/Button';

export default function CreateArticle() {
    const [form, setForm] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await api.post('/articles', form);
        setLoading(false);
        navigate('/articles');
    };

    return (
        <div className='w-full max-w-3xl mx-auto py-8 flex flex-col gap-6'>
            <h1>Nouvel article</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Titre</span>
                    <input
                        name='title'
                        placeholder='Titre de l article'
                        value={form.title}
                        onChange={handleChange}
                        className='input'
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Contenu — supporte le Markdown</span>
                    <textarea
                        name='content'
                        placeholder={'# Titre\n\nUn paragraphe...\n\n## Sous-titre'}
                        value={form.content}
                        onChange={handleChange}
                        rows={15}
                        className='input'
                        required
                    />
                </div>

                <Button type='submit' loading={loading}>
                    Publier l'article
                </Button>
            </form>
        </div>
    );
}