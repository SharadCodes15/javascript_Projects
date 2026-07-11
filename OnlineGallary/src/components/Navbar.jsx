import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='flex justify-between items-center py-4 px-8 bg-slate-800 text-white shadow'>
      <div>
        <Link to='/' className='font-semibold text-2xl tracking-tight'>MediaSearch</Link>
        <div className='text-sm text-slate-300'>Search photos, videos and GIFs</div>
      </div>

      <nav className='flex gap-4'>
        <Link className='px-4 py-2 rounded hover:bg-slate-700 transition' to='/'>Search</Link>
        <Link className='px-4 py-2 rounded hover:bg-slate-700 transition' to='/Collection'>Collection</Link>
      </nav>
    </header>
  )
}

export default Navbar