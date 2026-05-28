import { Star } from 'lucide-react'

const Note = ({ note = 0, max = 5 }) => {
  return (
    <div className='flex gap-1'>
      {Array.from({ length: max }, (_, index) => {
        const fill = Math.min(Math.max(note - index, 0), 1);
        return (
          <div key={index} style={{ position: 'relative', width: 20, height: 20 }}>
            <Star size={20} fill='transparent' color='var(--color-yellow)' />
            {fill > 0 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${fill * 100}%`,
                overflow: 'hidden'
              }}>
                <Star size={20} fill='var(--color-yellow)' color='var(--color-yellow)' />
              </div>
            )}
          </div>
        );
      })}
    </div>
  )
}

export default Note