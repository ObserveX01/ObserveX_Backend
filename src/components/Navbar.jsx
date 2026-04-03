import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 lg:px-12 py-6 max-w-7xl mx-auto w-full'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2 hover:opacity-90 transition-opacity'>
        <img src={logo} alt='ObserveX Logo' className='w-10 h-10' />
        <span className='text-2xl font-bold tracking-tight text-white uppercase'>
          observe<span className='text-obs-mint'>X</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className='hidden lg:flex items-center gap-10 text-sm font-bold text-white/90'>
        <Link to='/' className='hover:text-obs-mint transition'>
          Home
        </Link>

        {/* Updated About Link */}
        <Link to='/about' className='hover:text-obs-mint transition'>
          About Us
        </Link>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-4'>
        <Link
          to='/login'
          className='px-6 py-2.5 text-sm font-bold text-obs-dark bg-obs-yellow rounded-lg shadow-lg hover:bg-yellow-400 transition-all active:scale-95'>
          Login
        </Link>

        <Link
          to='/signup'
          className='px-6 py-2.5 text-sm font-bold text-obs-dark bg-obs-yellow rounded-lg shadow-lg hover:bg-yellow-400 transition-all active:scale-95'>
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
