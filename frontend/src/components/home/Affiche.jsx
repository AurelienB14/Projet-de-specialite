import { useState, useEffect } from "react";
import { getGames } from '../../api/game' ;

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Affiche() {

    const [games, setGames] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getGames()
            .then(res => setGames(res.data.slice(-4).reverse()))
    }, []);

    const prev = () => setCurrent(current === 0 ? games.length - 1 : current - 1);
    const next = () => setCurrent(current === games.length - 1 ? 0 : current + 1);

    if (games.lenght === 0) return null;


    return (
        <div>
            <h1>À l'affiche</h1>

            <div
                className="affiche"
                style={{
                    backgroundImage: `url(${games[current]?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <button
                    onClick={prev}
                    className="chevrons">
                        <ChevronLeft size={24} />
                </button>
                <button
                    onClick={next}
                    className="chevrons">
                        <ChevronRight size={24} />
                </button>
                <div>
                    <span className="badge-outline">Voir tous les jeux</span>
                </div>

            </div>
            
        </div>
    );
}
