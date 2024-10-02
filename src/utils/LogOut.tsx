import { ReactNode, useContext } from 'react'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../providers/AuthProvider'

const LogOut = ({
    children,
    navigateTo,
}: {
    children: ReactNode
    navigateTo: string
}) => {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        Cookies.remove('auth')
        Cookies.remove('refreshToken')
        localStorage.removeItem('user')
        setAuth({ isVerified: false, user: { username: '' } })
        navigate(navigateTo)
    }

    return <div onClick={logout}>{children}</div>
}

export default LogOut
