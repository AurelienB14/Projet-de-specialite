import Affiche from '../components/home/Affiche';
import Populaires from '../components/home/Populaires';
import ArticlesVedettes from '../components/home/ArticlesVedettes';

export default function Home() {
    return (
        <div className='flex flex-col gap-8'>

            <div className='flex'>
                <div className='w-2/3'>
                    <Affiche />
                </div>
                <div className='w-1/3'>
                    <Populaires />

                </div>
            </div>
            <div className='flex flex-col gap-1'>
            <h2>Nos derniers articles</h2>
            <ArticlesVedettes />

            </div>

        </div>

    )
}
