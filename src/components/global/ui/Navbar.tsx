import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../../../providers/AuthProvider'

const Navbar = () => {
    const { auth } = useContext(AuthContext)

    const links = [
        {
            path: '/',
            text: 'Home',
        },
        {
            path: '/products',
            text: 'Products',
        },
        {
            path: '/admin',
            text: 'Admin',
        },
    ]

    return (
        <nav className='w-full fixed flex justify-center items-center bg-slate-200 bg-opacity-80 border-b-2 border-slate-500 border-opacity-10 shadow-sm backdrop-blur-sm z-50'>
            <div className='w-full flex max-w-7xl px-4 py-2 justify-between'>
                <div className='flex gap-2 items-center'>
                    {links.map((link) => (
                        <NavLink
                            key={link.text}
                            className={({ isActive }) =>
                                `${
                                    isActive ? 'bg-blue-500' : ''
                                } px-6 py-1 text-white bg-blue-400 hover:bg-blue-500 rounded-md duration-200`
                            }
                            to={link.path}
                        >
                            {link.text}
                        </NavLink>
                    ))}
                </div>
                <div className='flex gap-2 items-center'>
                    {auth.isVerified ? (
                        <div>
                            <p>
                                Logged user: {auth.user.username}, Role:
                                {auth.user.role}
                            </p>
                        </div>
                    ) : (
                        <Link to='/admin'>Log in</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
