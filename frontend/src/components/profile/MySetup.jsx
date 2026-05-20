import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../../api/auth';

import api from '../../api/api'

import { Cpu, Plus, MoveRight } from 'lucide-react'

import WhiteDivider from '../ui/WhiteDivider'
import Button from '../ui/Button';

export default function MySetup() {

  const [setup, setSetup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCurrentUserId();

    api.get(`/users/${userId}`)
      .then(res => {
        setSetup(res.data.setup);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;


  if (!setup) return (
    <div>
      <h3 className='flex items-center gap-4 ml-4'>
        <Cpu size={18} className='text-primary' /> Mon setup
      </h3>
      <div className='card flex flex-col items-center text-center gap-4'>
        <Cpu className='text-text-muted' />
        <h2>Aucun setup configuré</h2>
        <p className='text-text-muted'>Renseigne ta configuration pour vérifier si tu peux faire tourner un jeu avant de l'acheter.</p>
        <Button variant='ghost' href='/profile/setup'>
          <Plus size={16} />
          Ajouter mon setup</Button>
      </div>
    </div>
  );


  return (
    <div >
      <div className='flex justify-between'>

        <h3 className='flex items-center gap-4 '>
          <Cpu size={18} className='text-primary' /> Mon setup
        </h3>
        <a href='/profile/setup' className='text-sm text-primary flex items-center gap-1'> Modifier<MoveRight size={14} /> </a>

      </div>
      <div className='card  flex flex-col'>

        <div className='flex justify-between w-1/1'>
          <span className='text-text-muted text-sm'>CPU</span>
          <span>{setup.processeur}</span>
        </div>
        <WhiteDivider />
        <div className='flex justify-between w-1/1'>
          <span className='text-text-muted text-sm'>GPU</span>
          <span>{setup.carte_graphique}</span>
        </div>
        <WhiteDivider />

        <div className='flex justify-between w-1/1'>
          <span className='text-text-muted text-sm'>RAM</span>
          <span>{setup.memoire}</span>
        </div>
        <WhiteDivider />

        <div className='flex justify-between w-1/1'>
          <span className='text-text-muted text-sm'>Stockage</span>
          <span>{setup.stockage} Go</span>
        </div>

      </div>


    </div>
  )
}
