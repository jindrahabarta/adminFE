import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from 'js-cookie'

import axios from 'axios'
import { useContext } from 'react'
import styles from '../admin.module.css'
import AuthContext from '../../../providers/AuthProvider'
import UserIco from '../../icons/UserIco'
import PasswordIco from '../../icons/PasswordIco'
import toast from 'react-hot-toast'

type Inputs = {
    username: string
    password: string
}

const LogInForm = () => {
    const { setAuth } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const user = {
            username: data.username,
            password: data.password,
        }

        const auth = axios
            .post('https://adminbe.onrender.com/auth/login', user)
            .then((res) => {
                const refreshToken = res.data.refreshToken

                Cookies.set('auth', res.data.jwt, {
                    expires: 1,
                    secure: true,
                    sameSite: 'Strict',
                })
                Cookies.set('refreshToken', refreshToken, {
                    expires: 1,
                    secure: true,
                    sameSite: 'Strict',
                })

                setAuth({
                    isVerified: true,
                    user: {
                        username: res.data.user.username,
                        role: res.data.user.role,
                    },
                })
            })

        auth.catch((err) => {
            if (err.status === 401) {
                setError('root', { message: 'Wrong user informations' })
            } else {
                setError('root', { message: 'Something went wrong' })
            }
        })

        toast.promise(auth, {
            loading: 'Loginng in',
            success: 'Logged in',
            error: 'Wrong informations',
        })
    }

    return (
        <div className='flex justify-center items-center h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputStyle}>
                    <UserIco className='stroke-gray-400 w-5'></UserIco>
                    <input
                        {...register('username', {
                            required: 'Toto pole je povinné',
                        })}
                        type='text'
                        id='username'
                        placeholder='username'
                        className={styles.input}
                    />
                </div>
                {errors.username && (
                    <p className={styles.error}>{errors.username.message}</p>
                )}
                <div className={styles.inputStyle}>
                    <PasswordIco className='fill-gray-400 w-5'></PasswordIco>
                    <input
                        {...register('password', {
                            required: 'Toto pole je povinné',
                        })}
                        id='password'
                        type='password'
                        placeholder='password'
                        className={styles.input}
                    />
                </div>
                {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                )}
                <div className='flex justify-center mt-2'>
                    <button className={styles.button} type='submit'>
                        Login
                    </button>
                </div>

                {errors.root && (
                    <p className={styles.error}>{errors.root.message}</p>
                )}
            </form>
        </div>
    )
}

export default LogInForm
