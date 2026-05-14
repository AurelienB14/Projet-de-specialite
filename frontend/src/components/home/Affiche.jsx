import { useState, useEffect } from "react";
import { getGame } from '../../api/game';

import Button from "../ui/Button";

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Affiche() {

    const [games, setGames] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        Promise.all([1,2,3,4].map(id => getGame(id)))
            .then(results => setGames(results.map(res => res.data)))

    }, []);

    const prev = () => setCurrent(current === 0 ? games.length - 1 : current - 1);
    const next = () => setCurrent(current === games.length - 1 ? 0 : current + 1);

    if (games.lenght === 0) return null;


    return (
        <div>
            <h1>À l'affiche cette semaine</h1>

            <div
                className="affiche"
                style={{
                    backgroundImage: `url(${games[current]?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="chevrons-box flex justify-between w-1/1 -translate-y-50">
                    <button onClick={prev} className="chevrons">
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={next}
                        className="chevrons">
                        <ChevronRight size={24} />
                    </button>

                </div>



                <Button variant="outline" href="/games">Voir tous les jeux</Button>


            </div>

        </div>
    );
}
