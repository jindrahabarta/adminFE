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
        <nav className='fixed w-full flex justify-between items-center px-4 py-2'>
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
                    <p>Logged user: {auth.user.username}</p>
                ) : (
                    <Link to='/admin'>Log in</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
