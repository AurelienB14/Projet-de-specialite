import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUserId, getCurrentUser } from '../api/auth';

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
        axios.get(`http://localhost:8000/api/game/createupdate/${gameId}`)
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
        axios.post(`http://localhost:8000/api/game/createupdate/${gameId}`, formData)
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
        <div className="flex flex-col items-center gap-4 p-8">
            <a href={lienback} className='flex text-[40px]'>◄</a>
            <h1 className="text-2xl font-bold">{btn} un jeu</h1>
            <div className="flex flex-col gap-3 w-[400px]">
                <div>
                    <input className="border w-full p-2" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
                    {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                </div>
                <div>
                    <textarea className="border w-full p-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div>
                    <input className="border w-full p-2" placeholder="Date de sortie" type="number" value={date} onChange={e => setDate(e.target.value)} />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>
                <div>
                    <input className="border w-full p-2" placeholder="Âge minimum" type="number" value={age} onChange={e => setAge(e.target.value)} />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div>
                    <input className="border w-full p-2" placeholder="Nombre de ventes" type="number" value={ventes} onChange={e => setVentes(e.target.value)} />
                    {errors.ventes && <p className="text-red-500 text-sm">{errors.ventes}</p>}
                </div>
                <div>
                    <h4 className="font-bold mb-1">Catégories :</h4>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <label key={cat} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={categories.includes(cat)}
                                    onChange={() => handleCheckbox(cat, categories, setCategories)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                    {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
                </div>
                <div>
                    <h4 className="font-bold mb-1">Plateformes :</h4>
                    <div className="flex flex-wrap gap-2">
                        {PLATEFORMES.map(plat => (
                            <label key={plat} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={plateformes.includes(plat)}
                                    onChange={() => handleCheckbox(plat, plateformes, setPlateformes)}
                                />
                                {plat}
                            </label>
                        ))}
                    </div>
                    {errors.plateformes && <p className="text-red-500 text-sm">{errors.plateformes}</p>}
                </div>
                <div>
                    <input 
                        className="border w-full p-2" 
                        type="file" 
                        accept=".jpg,.jpeg,.png" 
                        onChange={e => {
                            const file = e.target.files?.[0] ?? null;
                            setImage(file);
                            if (file) {
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }} 
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    {imagePreview && <img src={imagePreview} alt="preview" className="w-full h-[200px] object-cover mt-2" />}
                </div>
                <button onClick={handleSubmit} className="bg-black text-white p-2 cursor-pointer">
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default CreateUpdateGame;