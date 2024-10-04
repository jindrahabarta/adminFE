import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AdminNav from '../components/admin/ui/AdminNav'

import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import LogInForm from '../components/admin/forms/LogInForm'

const Admin = () => {
    const { auth } = useContext(AuthContext)

    const location = useLocation()
    if (auth.isVerified && location.pathname === '/admin') {
        return <Navigate to='/admin/dashboard' replace />
    }

    if (auth.isVerified) {
        return (
            <div>
                <AdminNav></AdminNav>
                <div className='flex justify-center h-full'>
                    <div className='md:w-1/2 w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='pt-20'>
            <LogInForm></LogInForm>
        </div>
    )
}

export default Admin
