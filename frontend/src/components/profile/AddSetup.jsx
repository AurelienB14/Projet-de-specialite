import { useState } from 'react';
import { getCurrentUserId } from '../../api/auth';
import api from '../../api/api';
import Button from '../ui/Button';

import { Cpu } from 'lucide-react';

export default function MySetup() {


  const [form, setForm] = useState({
    processeur: '',
    memoire: '',
    carte_graphique: '',
    stockage: '',
  })

  const userId = getCurrentUserId();
  console.log('userId', userId);

  const token = localStorage.getItem('token');
  console.log(JSON.parse(atob(token.split('.')[1])));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/setups', { ...form, user_id: userId });
    alert('Setup créé !')
  };

  return (
    <div className='flex flex-col items-center'>
      <Cpu size={24} className='text-primary '/>
      <h1>Mon Setup</h1>
      <div className='card flex flex-col items-center w-2/3'>
        <form onSubmit={handleSubmit} className='flex flex-col  gap-4'>

          <div className='flex flex-col'>
            <span className='ml-2 text-text-muted'>Processeur</span>
            <input name='processeur' placeholder='Processeur' value={form.processeur} onChange={handleChange} className='input' />
          </div>

          <div className='flex flex-col'>
            <span className='ml-2 text-text-muted'>Carte graphique</span>
            <input name='carte_graphique' placeholder='Carte graphique' value={form.carte_graphique} onChange={handleChange} className='input' />
          </div>

          <div className='flex gap-8'>
            <div className='flex flex-col'>
              <span className='ml-2 text-text-muted'>RAM</span>
              <select className='input' name='memoire' placeholder='Mémoire RAM' value={form.memoire} onChange={handleChange}>
                <option value={4}>4 GO</option>
                <option value={8}>8 GO</option>
                <option value={16}>16 GO</option>
                <option value={32}>32 GO</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <span className='ml-2 text-text-muted'>Stockage</span>
              <select className='input' name='stockage' placeholder='Stockage' value={form.stockage} onChange={handleChange}>
                <option value={128}>128 GO</option>
                <option value={256}>256 GO</option>
                <option value={512}>512 GO</option>
                <option value={1000}>1 To</option>
                <option value={2000}>2 To</option>
              </select>
            </div>
          </div>


          <Button type="submit">
            Ajouter ou modifier mon setup
          </Button>
        </form>
      </div>

    </div>
  )
}
