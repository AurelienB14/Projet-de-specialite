import Affiche from '../components/home/Affiche';
import Populaires from '../components/home/Populaires';

export default function Home() {
    return (
        <div className='flex'>
            <div className='w-2/3'>
                <Affiche />
            </div>
            <div className='w-1/3'>
                <Populaires />

            </div>

        </div>
    )
}
