import { useState, useEffect } from "react";
import { getGame } from '../../api/game';
import Note from "../ui/Note";
import Divider from "../ui/Divider";
import { ChevronRight } from "lucide-react";

import { Link } from 'react-router-dom'


export default function Populaires() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        Promise.all([5, 6, 7].map(id => getGame(id)))
            .then(results => setGames(results.map(res => res.data)))
    }, []);

    return (
        <div className=" flex flex-col p-8">

            <h2 className="mb-6">Jeux populaires</h2>

            {games.map(game => (
                <div key={game.id} >
                    <div className="flex justify-between items-center" >

                        <div className="flex flex-col gap-2">
                            <span>{game.nom}</span>
                            <Note note={5} />
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