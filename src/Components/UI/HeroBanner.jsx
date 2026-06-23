import {Link} from 'react-router-dom';

const HeroBanner = ({pageTitle,pageName,pageDesc}) => {
  return (
    <div className='bg-gradient-to-r from-brand-primary via-brand-purple to-brand-mid backdrop-blur-2xl flex flex-col items-center justify-center pt-20 pb-10 text-center'>
      <h1 className='text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-1 font-serif'>{pageTitle}</h1>
      <p className='text-white/80 text-lg sm:text-xl lg:text-2xl mb-4 px-5'>{pageDesc}</p>
      <div className='flex items-center gap-2 text-lg sm:text-xl lg:text-sm text-white/80 hover:text-white transition-colors ease-in duration-300'>
        <Link to="/">Home</Link>
        <span>{'>'}</span>
        <Link to="/About" >{pageName}</Link>
      </div>
    </div>
  )
}

export default HeroBanner;


export function SportBanner({pageTitle,pageName,pageDesc}) {
  return (
    <div className='bg-linear-to-r from-green-900 via-green-700 to-yellow-500 backdrop-blur-2xl flex flex-col items-center justify-center pt-20 pb-10 text-center'>
      <h1 className='text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-1 font-serif'>{pageTitle}</h1>
      <p className='text-white/60 text-lg sm:text-xl lg:text-2xl mb-4 px-5'>{pageDesc}</p>
      <div className='flex items-center gap-2 text-lg sm:text-xl lg:text-sm text-white/80 hover:text-yellow-500 transition-colors  easeIn  uration-300'>
        <Link to="/">Home</Link>
        <span>{'>'}</span>
        <Link to="/About" >{pageName}</Link>
      </div>
    </div>
  )
}