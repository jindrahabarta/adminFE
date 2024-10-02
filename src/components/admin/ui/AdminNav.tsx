import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../admin.module.css'

const AdminNav = () => {
    const links = [
        {
            text: 'Dashboard',
            path: 'dashboard',
        },
        {
            text: 'Add Product',
            path: 'addproduct',
        },
        {
            text: 'Products',
            path: 'products',
        },
        {
            text: 'Categories',
            path: 'categories',
        },
    ]

    return (
        <nav className='flex flex-wrap gap-2 justify-center pb-4'>
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.adminNavBtnActive}`
                            : `${styles.adminNavBtn}`
                    }
                    to={`/admin/${link.path}`}
                >
                    {link.text}
                </NavLink>
            ))}
        </nav>
    )
}

export default AdminNav
