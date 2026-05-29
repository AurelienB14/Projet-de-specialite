import { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUserId, getCurrentUser } from '../api/auth';
import { MoveLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const CATEGORIES = [
    'Action', 'Aventure', 'Battle Royale', 'Compétitif', 'Course',
    'FPS', 'Gestion', 'Monde ouvert', 'Multijoueur', 'Party Game',
    'Plateforme', 'RPG', 'Rythme', 'Sandbox', 'Simulation',
    'Sport', 'Stratégie', 'Survie', 'Tour par tour'
];

const PLATEFORMES = [
    'Android', 'iOS', 'Mac', 'Nintendo Switch', 'PC',
    'PS4', 'PS5', 'Wii U', 'Xbox One', 'Xbox Series'
];

const CreateUpdateGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUserId = getCurrentUserId();

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [age, setAge] = useState('');
    const [ventes, setVentes] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [plateformes, setPlateformes] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [btn, setBtn] = useState('Ajouter');
    const [lienback, setLienback] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const currentUser = getCurrentUser();
    const isAdmin = currentUser?.roles?.includes('ROLE_ADMIN');

    useEffect(() => {
        const gameId = id ?? '0';
        api.get(`/game/createupdate/${gameId}`)
            .then(res => {
                const data = res.data;
                if (id && data.jeu.userid && data.jeu.userid !== currentUserId && !isAdmin) {
                    navigate('/games');
                    return;
                }
                setBtn(data.infos.btn);
                setLienback(data.infos.lienback);
                setNom(data.jeu.nom);
                setDescription(data.jeu.description);
                setDate(data.jeu.date ?? '');
                setAge(data.jeu.age ?? '');
                setVentes(data.jeu.ventes ?? '');
                setImagePreview(data.jeu.image ?? '');
                setCategories(data.jeu.categories ?? []);
                setPlateformes(data.jeu.plateformes ?? []);
                setLoading(false);
            });
    }, [id]);

    const handleCheckbox = (value, list, setList) => {
        if (list.includes(value)) {
            setList(list.filter(v => v !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('age', age);
        formData.append('ventes', ventes);
        formData.append('categories', JSON.stringify(categories));
        formData.append('plateformes', JSON.stringify(plateformes));
        if (image) formData.append('image', image);

        const gameId = id ?? '0';
        api.post(`/game/createupdate/${gameId}`, formData)
            .then(res => {
                if (res.data.success) {
                    navigate('/games');
                } else {
                    setErrors(res.data.verification);
                    setNom(res.data.jeu.nom);
                    setDescription(res.data.jeu.description);
                    setDate(res.data.jeu.date);
                    setAge(res.data.jeu.age);
                    setVentes(res.data.jeu.ventes);
                }
            });
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className='w-full max-w-2xl mx-auto py-8 flex flex-col gap-6'>

            <a href={lienback} className='flex gap-2 text-text-muted items-center'>
                <MoveLeft size={18} /> Retour
            </a>

            <h1 className='font-bold'>{btn} un jeu</h1>

            <div className='flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Nom</span>
                    <input className='input w-full' placeholder='Nom' value={nom} onChange={e => setNom(e.target.value)} />
                    {errors.nom && <p className='text-danger text-sm'>{errors.nom}</p>}
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Description</span>
                    <textarea className='input w-full' rows={4} placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                    {errors.description && <p className='text-danger text-sm'>{errors.description}</p>}
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <span className='text-text-muted text-sm'>Date de sortie</span>
                        <input className='input w-full' placeholder='Année' type='number' value={date} onChange={e => setDate(e.target.value)} />
                        {errors.date && <p className='text-danger text-sm'>{errors.date}</p>}
                    </div>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <span className='text-text-muted text-sm'>Âge minimum</span>
                        <input className='input w-full' placeholder='Âge' type='number' value={age} onChange={e => setAge(e.target.value)} />
                        {errors.age && <p className='text-danger text-sm'>{errors.age}</p>}
                    </div>
                    <div className='flex flex-col gap-2 w-1/3'>
                        <span className='text-text-muted text-sm'>Nombre de ventes</span>
                        <input className='input w-full' placeholder='Ventes' type='number' value={ventes} onChange={e => setVentes(e.target.value)} />
                        {errors.ventes && <p className='text-danger text-sm'>{errors.ventes}</p>}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Catégories</span>
                    <div className='flex flex-wrap gap-2'>
                        {CATEGORIES.map(cat => (
                            <label
                                key={cat}
                                className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-all ${
                                    categories.includes(cat)
                                        ? 'border-primary text-primary'
                                        : 'border-surface-alt text-text-muted'
                                }`}
                            >
                                <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={categories.includes(cat)}
                                    onChange={() => handleCheckbox(cat, categories, setCategories)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Plateformes</span>
                    <div className='flex flex-wrap gap-2'>
                        {PLATEFORMES.map(plat => (
                            <label
                                key={plat}
                                className={`px-3 py-1 rounded-full text-sm cursor-pointer border transition-all ${
                                    plateformes.includes(plat)
                                        ? 'border-primary text-primary'
                                        : 'border-surface-alt text-text-muted'
                                }`}
                            >
                                <input
                                    type='checkbox'
                                    className='hidden'
                                    onChange={() => handleCheckbox(plat, plateformes, setPlateformes)}
                                    checked={plateformes.includes(plat)}
                                />
                                {plat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-text-muted text-sm'>Image</span>
                    <input
                        className='input w-full'
                        type='file'
                        accept='.jpg,.jpeg,.png'
                        onChange={e => {
                            const file = e.target.files?.[0] ?? null;
                            setImage(file);
                            if (file) setImagePreview(URL.createObjectURL(file));
                        }}
                    />
                    {errors.image && <p className='text-danger text-sm'>{errors.image}</p>}
                    {imagePreview && (
                        <img src={imagePreview} alt='preview' className='w-full h-48 object-cover rounded-lg mt-2' />
                    )}
                </div>

                <Button onClick={handleSubmit} type='submit'>
                    {btn}
                </Button>

            </div>
        </div>
    );
};

export default CreateUpdateGame;