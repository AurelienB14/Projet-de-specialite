import Button from "../ui/Button"

import { Cpu } from 'lucide-react'
import AddToLibrary from "./AddToMyGames"

export default function GameToolBar({ game }) {

    return (
        <div className="flex gap-4">

           <AddToLibrary gameId={game.id} />


            <Button variant="ghost" href={`/game/${game.id}/verify-setup`}>
                <Cpu size={18}/>
                Vérifier mon setup
            </Button>
        </div>
    )
}