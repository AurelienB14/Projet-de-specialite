import { useEffect, useState } from "react";
import { getCurrentUserId } from "../api/auth";
import api from "../api/api";
import Button from "../components/ui/Button";
import Note from "../components/ui/Note";
import AddReview from "../components/review/AddReview";
import { Search, Star, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

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

export default function MyCollection() {
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [reviewGameId, setReviewGameId] = useState(null);
    const [expandedGame, setExpandedGame] = useState(null);
    const [reviews, setReviews] = useState({});
    const [loadingReviews, setLoadingReviews] = useState({});
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [selectedPlateforme, setSelectedPlateforme] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const userId = getCurrentUserId();

    useEffect(() => {
        api.get(`/users/${userId}/games`)
            .then(res => { setUserGames(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const loadReviews = async (gameId) => {
        if (reviews[gameId]) return;
        setLoadingReviews(r => ({ ...r, [gameId]: true }));
        try {
            const res = await api.get(`/games/${gameId}/reviews`);
            setReviews(r => ({ ...r, [gameId]: res.data }));
        } catch {
            setReviews(r => ({ ...r, [gameId]: [] }));
        } finally {
            setLoadingReviews(r => ({ ...r, [gameId]: false }));
        }
    };

    const toggleExpand = (gameId) => {
        if (expandedGame === gameId) {
            setExpandedGame(null);
        } else {
            setExpandedGame(gameId);
            loadReviews(gameId);
        }
    };

    const handleReviewSuccess = (gameId) => {
        // Recharge les avis après ajout
        setReviews(r => ({ ...r, [gameId]: undefined }));
        loadReviews(gameId);
    };

    const gamesFiltres = userGames.filter(ug => {
        const matchSearch = ug.game.nom.toLowerCase().includes(search.toLowerCase());
        const matchCategorie = selectedCategorie === '' || ug.game.categories?.includes(selectedCategorie);
        const matchPlateforme = selectedPlateforme === '' || ug.game.plateformes?.includes(selectedPlateforme);
        const matchStatus = selectedStatus === '' || ug.status === selectedStatus;
        return matchSearch && matchCategorie && matchPlateforme && matchStatus;
    });

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <p className="text-text-muted">Chargement de ta collection...</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Ma collection</h1>
                    <p className="text-text-muted text-sm mt-1">{userGames.length} jeu{userGames.length > 1 ? 'x' : ''} dans ta bibliothèque</p>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="flex items-center gap-2 flex-wrap">
                <Search size={16} className="text-text-muted" />
                <input
                    type="text"
                    placeholder="Rechercher un jeu, une catégorie..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input w-full max-w-md"
                />
                <select className='border p-2 [&>option]:text-white [&>option]:bg-black' value={selectedCategorie} onChange={e => setSelectedCategorie(e.target.value)}>
                    <option value=''>Toutes les catégories</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select className='border p-2 [&>option]:text-white [&>option]:bg-black' value={selectedPlateforme} onChange={e => setSelectedPlateforme(e.target.value)}>
                    <option value=''>Toutes les plateformes</option>
                    {PLATEFORMES.map(plat => <option key={plat} value={plat}>{plat}</option>)}
                </select>
                <select className='border p-2 [&>option]:text-white [&>option]:bg-black' value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                    <option value=''>Tous les statuts</option>
                    <option value='pascommence'>Pas commencé</option>
                    <option value='wishlist'>Wish list</option>
                    <option value='encours'>En cours</option>
                    <option value='termine'>Terminé</option>
                </select>
            </div>

            {/* Résultats vides */}
            {gamesFiltres.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <p className="text-text-muted">Aucun jeu trouvé</p>
                    {search && (
                        <button className="text-sm text-white underline" onClick={() => setSearch("")}>
                            Effacer la recherche
                        </button>
                    )}
                </div>
            )}

            {/* Grille de jeux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gamesFiltres.map(ug => {
                    const gameReviews = reviews[ug.game.id] || [];
                    const avgNote = gameReviews.length
                        ? (gameReviews.reduce((acc, r) => acc + r.note, 0) / gameReviews.length).toFixed(1)
                        : null;
                    const isExpanded = expandedGame === ug.game.id;

                    return (
                        <div key={ug.id} className="card-img flex flex-col overflow-hidden rounded-lg border border-text-muted/20">

                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={ug.game.image}
                                    alt={ug.game.nom}
                                    className="w-full aspect-video object-cover"
                                />
                                {avgNote && (
                                    <div className="absolute top-2 right-2 bg-black/80 rounded-md px-2 py-1 flex items-center gap-1">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-white">{avgNote}</span>
                                    </div>
                                )}
                            </div>

                            {/* Infos */}
                            <div className="p-4 flex flex-col gap-3 flex-1">
                                <div>
                                    <span className="font-bold text-base">{ug.game.nom}</span>
                                    {ug.game.categories?.length > 0 && (
                                        <p className="text-sm text-text-muted mt-0.5">
                                            {ug.game.categories.join(' / ')}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-auto">
                                    <a variant="outlineSecondary" href={`/game/${ug.game.id}`}>Voir le jeu</a>
                                    <button
                                        onClick={() => setReviewGameId(ug.game.id)}
                                        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-white border border-text-muted/30 hover:border-white/50 rounded px-3 py-1 transition-colors"
                                    >
                                        <Star size={13} />
                                        Avis
                                    </button>
                                    <select
                                    className="border p-2 [&>option]:text-white [&>option]:bg-black"
                                    value={ug.status ?? 'pascommence'}
                                    onChange={e => {
                                        const newStatus = e.target.value;
                                        api.put(`/users/${userId}/games/${ug.id}`, { status: newStatus })
                                            .then(() => {
                                                setUserGames(prev => prev.map(g => 
                                                    g.id === ug.id ? { ...g, status: newStatus } : g
                                                ));
                                            });
                                    }}
                                    >
                                        <option value="pascommence">Pas commencé</option>
                                        <option value="whishlist">Whish list</option>
                                        <option value="encours">En cours</option>
                                        <option value="termine">Terminé</option>
                                    </select>
                                </div>

                                {/* Toggle avis */}
                                <button
                                    onClick={() => toggleExpand(ug.game.id)}
                                    className="flex items-center justify-between text-sm text-text-muted hover:text-white transition-colors pt-2 border-t border-text-muted/20"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <MessageSquare size={13} />
                                        {gameReviews.length > 0
                                            ? `${gameReviews.length} avis`
                                            : "Voir les avis"}
                                    </span>
                                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                {/* Liste des avis */}
                                {isExpanded && (
                                    <div className="flex flex-col gap-3 mt-1">
                                        {loadingReviews[ug.game.id] && (
                                            <p className="text-xs text-text-muted">Chargement...</p>
                                        )}
                                        {!loadingReviews[ug.game.id] && gameReviews.length === 0 && (
                                            <p className="text-xs text-text-muted">Aucun avis pour ce jeu.</p>
                                        )}
                                        {gameReviews.map(review => (
                                            <div key={review.id} className="bg-background rounded-md p-3 flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold">
                                                        {review.user?.pseudo || review.user?.username || "Utilisateur"}
                                                    </span>
                                                    <Note note={review.note} max={5} />
                                                </div>
                                                {review.commentaire && (
                                                    <p className="text-xs text-text-muted leading-relaxed">
                                                        {review.commentaire}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal AddReview */}
            {reviewGameId && (
                <AddReview
                    gameId={reviewGameId}
                    onClose={() => setReviewGameId(null)}
                    onSuccess={() => handleReviewSuccess(reviewGameId)}
                />
            )}
        </div>
    );
}