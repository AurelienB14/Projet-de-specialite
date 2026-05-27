import { useEffect, useState } from "react";
import { getCurrentUserId } from "../api/auth";
import api from "../api/api";
import Button from "../components/ui/Button";

export default function MyCollection() {

    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = getCurrentUserId();
        api.get(`/users/${userId}/games`)
            .then(res => {
                console.log('data:', res.data);
                setUserGames(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>

    return (
        <div className="grid grid-cols-3 gap-8">
            {userGames.map(ug => (
                <div key={ug.id} className="w-full">
                    <div className="card-img">
                        <img src={ug.game.image} alt={ug.game.nom} className="w-full h-auto object-cover" />

                        <div className="p-4 flex flex-col w-fit gap-4">
                            <div className="flex flex-col">
                                <span className="font-bold">{ug.game.nom}</span>
                                <span className='text-sm text-text-muted'>
                                    {ug.game.categories?.join(' / ')}
                                </span>

                            </div>
                            <Button variant="outlineSecondary" size="sm" >Voir le jeux</Button>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}