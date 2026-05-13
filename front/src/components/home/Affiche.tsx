import React from 'react'

const Affiche = () => {
  return (
    <div>
            <h1>À l'affiche</h1>

            <div className="affiche">
                <div className='flex flex-col justify-end gap-4'>
                    <span className='badge-outline'>Voir tout les jeux</span>
                    <div className='flex gap-2 justify-center'>
                        <div className='bg-white w-3 h-3 rounded-full'></div>
                        <div className='bg-text-muted w-3 h-3 rounded-full'></div>
                        <div className='bg-text-muted w-3 h-3 rounded-full'></div>
                        <div className='bg-text-muted w-3 h-3 rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Affiche
