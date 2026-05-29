import { useState, useEffect } from "react";
import { getGame } from '../../api/game';
import Note from "../ui/Note";
import Divider from "../ui/Divider";
import { ChevronRight } from "lucide-react";

import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Populaires() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/games')
            .then(res => {
                const sorted = res.data
                    .filter(g => g.note !== null && g.nb_favoris > 0)
                    .sort((a, b) => (b.note * b.nb_favoris) - (a.note * a.nb_favoris))
                    .slice(0, 5);
                setGames(sorted);
            });
    }, []);

    return (
        <div className=" flex flex-col p-8">

            <h2 className="mb-6">Jeux populaires</h2>

            {games.map(game => (
                <div key={game.id} >
                    <div className="flex justify-between items-center" >

                        <div className="flex flex-col gap-2">
                            <span>{game.nom}</span>
                            <Note note={game.note} />
                        </div>
                        <div>
                            <Link to={`/game/${game.id}`} key={game.id}>
                                <ChevronRight className="chevrons" />
                            </Link>
                        </div>

                    </div>
                    <Divider />

                </div>
            ))}
        </div>
    )
}