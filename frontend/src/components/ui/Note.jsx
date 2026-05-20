import { Star } from 'lucide-react'

const Note = ({ note = 0, max = 5}) => {
  return (
    <div className='flex gap-1'>
      {Array.from({ length: max}, (_, index) => (
        <Star 
            key={index}
            size={20}
            fill={index < note ? 'var(--color-yellow)' : 'transparent'}
            color={index < note ? 'var(--color-yellow)' : 'var(--color-yellow)'}
            />
      ))}
    </div>
  )
}

export default Note
