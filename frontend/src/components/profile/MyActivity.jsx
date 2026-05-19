import { Activity } from 'lucide-react';

export default function MyActivity() {

    return (
        <div>
            <h3 className='flex items-center gap-4 ml-4'>
                <Activity size={18} className='text-primary' /> Activités récentes
            </h3>
            <div className='card  flex flex-col items-center text-center gap-4'>
                <Activity className='text-text-muted' />
                <h2>Aucune activité</h2>
                <p className='text-text-muted'>Ton activité apparaîtra ici au fur et à mesure que tu utilises la plateforme.</p>
            </div>
        </div>
    )
}