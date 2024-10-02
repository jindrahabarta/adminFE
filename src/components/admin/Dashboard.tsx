import { useContext } from 'react'
import AuthContext from '../../providers/AuthProvider'
import LogOut from '../../utils/LogOut'

const Dashboard = () => {
    const { auth } = useContext(AuthContext)

    return (
        <section>
            <h1 className='text-center'>
                Welcome back!{' '}
                <span className='font-bold'>{auth.user.username}</span>
            </h1>
            <div className='flex justify-center'>
                <LogOut navigateTo='/admin'>
                    <button className='bg-blue-500 px-6 py-1 text-white rounded-md hover:bg-blue-600 duration-200 mt-2'>
                        logout
                    </button>
                </LogOut>
            </div>
        </section>
    )
}

export default Dashboard
