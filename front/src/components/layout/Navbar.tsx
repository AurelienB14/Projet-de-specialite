import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { UserRound } from 'lucide-react'

import { isAuthenticated } from '../../api/auth';


const Navbar = () => {

  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => setAuth(isAuthenticated());
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChange', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);



  return (
    <div className='flex justify-between items-center gap-10'>
      <a href='/'>
        <img className='w-30' src={logo} />
      </a>

      <ul className='flex gap-20'>
        <li>JEUX</li>
        <li>ACTUALITÉS</li>
        <li>VÉRIFIER MON SETUP</li>
      </ul>
      <div className=''>
        <ul className='flex items-center gap-8'>
          <li className='badge-outline'>Ma bibliothèque</li>

          { auth ? (
            <a href='/profile'>
              <li className='icon-fill'><UserRound /></li>
            </a>
          ) : (
            <a href='/login'>
              <li className='icon-fill'><UserRound /></li>
            </a>
          )}


     
        </ul>
      </div>

    </div>
  )
}

export default Navbar
