import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/ui/Button';

export default function ArticleForm() {
    const { id } = useParams();
    const [form, setForm] = useState({ title: '', content: '', image: null, tags: [] });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            api.get(`/articles/${id}`)
                .then(res => setForm({
                    title: res.data.title,
                    content: res.data.content,
                    image: null,
                    tags: res.data.tags || [],
                }));
        }
    }, [id]);

    const [tagInput, setTagInput] = useState('');

    const handleTagKeyDown = (e) => {
        if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const tag = tagInput.trim();
            if (tag && !form.tags.includes(tag)) {
                setForm(f => ({ ...f, tags: [...f.tags, tag] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setForm(f => ({ ...f, image: e.target.files[0] }));
        } else {
            setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('content', form.content);
        formData.append('tags', JSON.stringify(form.tags));

        if (form.image) formData.append('image', form.image);

        if (id) {
            await api.put(`/articles/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } else {
            await api.post('/articles', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        }
        setLoading(false);
        navigate('/articles');
    };

    return (
        <div className='w-full max-w-3xl mx-auto py-8 flex flex-col gap-6'>
            <h1>{id ? 'Modifier l\'article' : 'Nouvel article'}</h1>

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
                    <span className='text-text-muted text-sm'>Tags</span>

                    <div className='flex flex-wrap gap-2'>
                        {form.tags.map(tag => (
                            <span size='sm' key={tag} className='border border-primary bg-background-transparent rounded-lg px-2 flex items-center gap-1'>
                                {tag}
                                <button type='button' onClick={() => removeTag(tag)}>×</button>
                            </span>
                        ))}
                    </div>

                    {/* Input */}
                    <input
                        placeholder='Ajoute un tag (espace pour valider)'
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className='input'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Image</span>
                    <input
                        name='image'
                        type='file'
                        accept='image/*'
                        onChange={handleChange}
                        className='input'
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
                    {id ? 'Modifier' : 'Publier'}
                </Button>
            </form>
        </div>
    );
}